"""
Shared state definition for the clinical decision pipeline.

This is the central data structure that flows through all agents in the
LangGraph pipeline. Each agent reads from and writes to specific fields.
"""

from __future__ import annotations

# typing 模块提供了高级类型注解工具。
# Annotated: 允许为类型添加额外的元数据。在 LangGraph 中，它用于给字段附加“reducer”函数。
# Any: 表示任意类型，灵活性高，但丧失类型安全。
# Optional: 是 Union[X, None] 的简写，表示字段可以是 X 类型或 None。
from typing import Annotated, Any, Literal, Optional
# pydantic 是数据验证和设置管理的库。
# BaseModel: 所有 Pydantic 模型的基类，提供了数据校验、序列化等功能。
# Field: 用于为模型字段添加默认值、描述等元数据，类似 dataclass 的 field()。
from pydantic import BaseModel, Field
# 从 LangGraph 消息管理模块导入 add_messages，它是一个特殊的 reducer 函数，
# 用于将新消息追加到已有的消息列表中（而不是替换）。
from langgraph.graph.message import add_messages
# 导入 LangChain 的基础消息类型，定义对话中的消息格式。
from langchain_core.messages import BaseMessage

from ..models.patient import PatientInfo
from ..models.diagnosis import DifferentialDiagnosis
from ..models.treatment import (
    TreatmentPlan,
    CodingResult,
    AuditResult,
)

# =============================================================================
# 自定义 Reducer 函数：_merge_lists
# =============================================================================
def _merge_lists(existing: list, new: list) -> list:
    """
    列表合并 reducer，用于状态更新时的列表字段聚合。

    在 LangGraph 中，当多个节点都可能向同一个列表字段（如 errors）追加数据时，
    我们不能简单地用新列表覆盖旧列表，而需要将新增项“合并”进去。
    这个函数作为 Annotated 的元数据，告诉 LangGraph：当更新这个字段时，
    请用这个函数将新值（new）与现有值（existing）合并，而不是直接替换。

    参数:
        existing: 当前状态中该字段已有的列表。
        new: 节点函数返回的字典中该字段的新列表。

    返回:
        合并后的完整列表。
    """
    return existing + new

# =============================================================================
# 诊断回环最大重试次数
# =============================================================================
# 当 Diagnosis Agent 反复认为信息不足（needs_more_info=true）时，
# 不能无限回退到 Intake Agent，否则 LLM 幻觉可能导致死循环。
# 这个常量定义了硬上限：超过此次数后，编排层强制跳过回退，直接进入 Treatment。
# 与 Java/Go 版本中的 MAX_DIAGNOSIS_RETRIES 保持一致。
MAX_DIAGNOSIS_RETRIES = 2

# =============================================================================
# 核心：临床管道共享状态 — ClinicalState
# =============================================================================
class ClinicalState(BaseModel):
    """
    管道全局共享状态，所有代理按顺序读取和修改此状态。

    这个类继承自 Pydantic 的 BaseModel，确保了：
    - 所有字段都有明确的类型、默认值和验证。
    - 整个生命周期的状态数据都符合预定义的格式。
    - 可以方便地序列化为 JSON（如用于检查点保存）。

    数据流示意：
        raw_input (用户输入)
            -> IntakeAgent -> patient_info (结构化患者信息)
        patient_info
            -> DiagnosisAgent -> diagnosis (诊断结果), needs_more_info (是否需要更多信息)
        diagnosis + patient_info
            -> TreatmentAgent -> treatment_plan (治疗方案)
        treatment_plan + diagnosis
            -> CodingAgent -> coding_result (编码结果)
        all outputs
            -> AuditAgent -> audit_result (审计报告)
    """

    # =========================================================================
    # 输入字段
    # =========================================================================
    raw_input: str = Field(default="", description="Raw patient description text")

    # 这个字段相当于管道的入口，用户提供的原始患者描述文本会被存储在这里。

    # =========================================================================
    # Intake Agent 输出
    # =========================================================================
    patient_info: Optional[dict] = Field(
        default=None, description="Structured patient info from IntakeAgent"
    )

    # 虽然从 typing 导入了 PatientInfo 模型，但实际状态中存储的是字典（model_dump 的结果）。
    # 这是因为 LangGraph 要求状态可序列化，Pydantic 对象需要显式转换为字典。
    # 使用 Optional[dict] 表示该字段可能为 None，在流程中逐步填充。

    # =========================================================================
    # Diagnosis Agent 输出
    # =========================================================================
    diagnosis: Optional[dict] = Field(
        default=None, description="Differential diagnosis from DiagnosisAgent"
    )
    # 存储鉴别诊断结果，同样以字典形式保存。
    needs_more_info: bool = Field(
        default=False,
        description="Flag set by DiagnosisAgent when more info is needed",
    )
    # diagnosis_retry_count：诊断回环计数器。
    # 每次 Diagnosis Agent 返回 needs_more_info=true 时，该计数 +1。
    # 编排层的路由函数会检查此值：当 >= MAX_DIAGNOSIS_RETRIES 时，
    # 即使 needs_more_info 仍为 true，也强制路由到 treatment，
    # 从而防止 LLM 幻觉导致的无限回退死循环。
    # 初始值为 0，每次 Pipeline 调用从零开始计数。
    diagnosis_retry_count: int = Field(
        default=0,
        description="Number of times diagnosis has requested more info (capped at MAX_DIAGNOSIS_RETRIES)",
    )

    # =========================================================================
    # Human-in-the-loop 人工审核状态
    # =========================================================================
    # human_review_status 追踪诊断结果的人工审核生命周期：
    #
    #   "none"      — 初始状态，Pipeline 尚未到达审核点，或未启用 Human-in-the-loop。
    #   "pending"   — Pipeline 已在 Diagnosis 之后暂停，等待医生审核诊断结果。
    #                  此时 treatment_plan / coding_result / audit_result 均为 None。
    #   "approved"  — 医生已确认诊断结果，Pipeline 从 Treatment 继续执行。
    #   "rejected"  — 医生修改了诊断结果，Pipeline 基于修正后的 diagnosis 重新执行
    #                  Treatment → Coding → Audit。
    #
    # 这个字段是 Human-in-the-loop 流程的核心状态机。API 层根据此字段判断：
    #   - 是否可以向医生展示待审核的诊断结果（pending 时展示）。
    #   - 是否可以接受医生的批准/拒绝操作（只有 pending 状态才能操作）。
    #   - Pipeline 是否已完成全部流程（approved/rejected 且 audit_result 非空）。
    human_review_status: Literal["none", "pending", "approved", "rejected"] = Field(
        default="none",
        description="Human review lifecycle: none → pending → approved|rejected",
    )
    # human_review_comment：医生在审核时留下的备注。
    # 例如："诊断基本正确，但建议加做D-二聚体排除肺栓塞"。
    # 这个字段会被写入审计日志，满足 HIPAA 的可追溯性要求。
    human_review_comment: Optional[str] = Field(
        default=None,
        description="Doctor's comment during human review (audit trail)",
    )

    # ---- Treatment Agent output ----
    treatment_plan: Optional[dict] = Field(
        default=None, description="Treatment plan from TreatmentAgent"
    )

    # ---- Coding Agent output ----
    coding_result: Optional[dict] = Field(
        default=None, description="ICD-10 / DRGs result from CodingAgent"
    )

    # ---- Audit Agent output ----
    audit_result: Optional[dict] = Field(
        default=None, description="Compliance report from AuditAgent"
    )

    # =========================================================================
    # 共享元数据字段（跨越多个代理使用）
    # =========================================================================

    # messages 字段：使用 Annotated 附加了一个特殊的 reducer 函数 add_messages。
    # add_messages 是 LangGraph 提供的标准消息列表合并器，它会智能地将新消息追加到
    # 现有消息列表，并处理相同 ID 的消息替换等复杂逻辑。
    # 这类似于 _merge_lists 但更智能，专为聊天消息设计。
    messages: Annotated[list[BaseMessage], add_messages] = Field(
        default_factory=list, description="Conversation message history"
    )
    # 解释 Annotated：
    # - 类型部分是 list[BaseMessage]，表明这是一个 BaseMessage 对象列表。
    # - 元数据部分是 add_messages，告诉 LangGraph 在更新此字段时不要直接替换，
    #   而是用 add_messages 函数将新消息列表与现有列表合并。
    # 这样，即使多个节点都添加消息，也不会丢失历史。

    # errors 字段：记录整个管道中发生的所有错误。
    # 使用 Annotated 附加了我们自定义的 reducer 函数 _merge_lists。
    # 这样，当某个节点返回 {"errors": ["new error"]} 时，新错误会被追加到现有列表，
    # 而不是覆盖，从而保留完整的错误历史。
    errors: list[str] = Field(
        default_factory=list, description="Errors encountered during pipeline"
    )
    current_agent: str = Field(
        default="", description="Name of the currently executing agent"
    )
