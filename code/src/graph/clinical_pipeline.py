"""
LangGraph clinical decision pipeline orchestrator.

Wires the five agents into a sequential pipeline with conditional routing:

    Intake -> Diagnosis --(needs_more_info? && retries < 2)--> Intake (loop back)
                       \--(ready || retries >= 2)-----------> Treatment -> Coding -> Audit -> END

The diagnosis loop is capped at MAX_DIAGNOSIS_RETRIES (2) to prevent infinite
loops caused by LLM hallucinations.

Human-in-the-loop mode (interrupt_before=["treatment"]):
    Intake -> Diagnosis --(ready)--> [⏸ PAUSED] --> (doctor reviews) --> Treatment -> Coding -> Audit -> END

When interrupt_before=["treatment"] is set, the pipeline pauses after Diagnosis
completes and before Treatment begins. The doctor can:
  - Approve the diagnosis → pipeline resumes from Treatment.
  - Modify the diagnosis → pipeline resumes from Treatment with updated diagnosis.
This is the key safety mechanism for clinical AI: no treatment plan is generated
without human confirmation of the diagnosis.
"""

from __future__ import annotations
# StateGraph：LangGraph 提供的“状态图”类。它允许我们用节点 (Node) 和边 (Edge)
# 来定义工作流，并在节点之间自动传递一个共享状态对象。
# END：特殊节点，表示图的终止。当流程到达 END 时，整个执行结束。
from langgraph.graph import StateGraph, END
# MemorySaver：一个检查点 (checkpointer) 的实现，将状态存储在内存中。
# 检查点允许 LangGraph 在工作流中的任意步骤保存快照，从而支持：
#   - 暂停/继续（例如等待人工输入）
#   - 循环流程的状态恢复
#   - 错误重试
from langgraph.checkpoint.memory import MemorySaver
# 导入自定义的状态定义类 ClinicalState。
# 这通常是一个 TypedDict 或 Pydantic 模型，定义了图中所有节点共享的字段及其类型。
# 例如：raw_input, patient_info, diagnosis, treatment_plan 等。
from .state import ClinicalState, MAX_DIAGNOSIS_RETRIES
from ..agents.intake_agent import intake_agent
from ..agents.diagnosis_agent import diagnosis_agent
from ..agents.treatment_agent import treatment_agent
from ..agents.coding_agent import coding_agent
from ..agents.audit_agent import audit_agent



# =============================================================================
# 条件路由函数
# =============================================================================
def _route_after_diagnosis(state: ClinicalState) -> str:
    """
    诊断代理后的条件边判断逻辑。

    两层判断：
      1. 首先检查重试次数是否已达上限（MAX_DIAGNOSIS_RETRIES）。
         如果已达上限，无论 LLM 如何判定，都强制进入 treatment，
         这是确定性的兜底机制，防止 LLM 幻觉导致的无限回环。
      2. 如果未达上限，再根据 Diagnosis Agent 设置的 needs_more_info
         标志决定：true → 回退 intake 补充信息，false → 继续 treatment。

    这种"先硬后软"的判断顺序确保了：LLM 的语义判断只在安全边界内生效，
    一旦触及硬上限，编排层直接接管控制权。
    """
    # 第一层：硬上限检查 —— 确定性兜底，不依赖 LLM
    if state.diagnosis_retry_count >= MAX_DIAGNOSIS_RETRIES:
        return "treatment"
    # 第二层：LLM 语义判断 —— 在安全边界内由 LLM 决定
    if state.needs_more_info:
        return "intake"
    return "treatment"

# =============================================================================
# 核心：构建并编译临床决策管道
# =============================================================================
def build_clinical_pipeline(checkpointer=None, interrupt_before=None):
    """
    构建完整的 LangGraph 工作流，并编译为可调用的图应用。

    这个过程分为三步：
      1. 创建 StateGraph 并注册所有节点（代理）。
      2. 定义节点之间的连接关系（普通边和条件边）。
      3. 配置检查点并将图编译为可执行对象。

    参数:
        checkpointer: 可选，外部提供的检查点实现。若未提供，则默认使用内存检查点。
                      在生产环境中应替换为持久化检查点（如 PostgresSaver）。
        interrupt_before: 可选，字符串列表，指定在哪些节点执行前暂停。
                          例如 ["treatment"] 表示 Diagnosis 完成后、Treatment 开始前暂停，
                          等待人工确认诊断结果。这是 Human-in-the-loop 的核心机制。
                          传入 None 或不传则全自动执行，不暂停。
    返回:
        编译后的 LangGraph 应用，可以直接调用 invoke/stream 等方法运行工作流。
    """
    # -------------------------------------------------------------------------
    # 1. 创建状态图对象
    # -------------------------------------------------------------------------
    # StateGraph 是 LangGraph 的核心类，它接收一个状态类型 (ClinicalState)
    # 来定义整个图共享的数据结构。所有节点的输入输出都会经过这个类型的验证。
    workflow = StateGraph(ClinicalState)

    # -------------------------------------------------------------------------
    # 2. 注册节点 (Nodes)
    # -------------------------------------------------------------------------
    # 每个节点都有一个唯一的字符串名称，对应一个 Python 函数。
    # 这个函数必须接受 state 并返回一个字典（部分状态更新）。
    # 添加节点并不会立即执行任何代码，只是在图的“世界”里登记了这些组件。
    workflow.add_node("intake", intake_agent)
    workflow.add_node("diagnosis", diagnosis_agent)
    workflow.add_node("treatment", treatment_agent)
    workflow.add_node("coding", coding_agent)
    workflow.add_node("audit", audit_agent)

    # -------------------------------------------------------------------------
    # 3. 定义流程的边 (Edges) 与 路由逻辑
    # -------------------------------------------------------------------------

    # 3.1 设置入口点：整个工作流从 "intake" 节点开始执行。
    # 当我们调用 pipeline.invoke(initial_state) 时，会先合并初始状态，然后从入口点运行。
    workflow.set_entry_point("intake")
    # 3.2 普通边 (Normal Edge)：
    # 从 "intake" 执行完毕后，无条件转移到 "diagnosis"。
    # 这类边意味着执行顺序是确定的、不可改变的。
    workflow.add_edge("intake", "diagnosis")

    # 3.3 条件边 (Conditional Edge)：
    # 从 "diagnosis" 执行完毕后，根据 _route_after_diagnosis 函数的返回值决定下一个节点。
    # add_conditional_edges 的三个参数：
    #   - 源节点： "diagnosis"
    #   - 路由函数： _route_after_diagnosis，它接收当前 state，返回一个字符串（目标节点）
    #   - 映射字典： 将路由函数可能返回的所有字符串映射到实际的节点名称。
    #     这样做的好处是：路由函数只需要返回逻辑上的“意图”（如 "intake"），
    #     而具体跳转到哪个节点由映射决定，方便后期修改。
    workflow.add_conditional_edges(
        "diagnosis",
        _route_after_diagnosis,
        {
            "intake": "intake",# 如果再问信息，回到 intake
            "treatment": "treatment",# 否则继续 treatment
        },
    )

    # 3.4 后续的普通边：定义线性流程。
    workflow.add_edge("treatment", "coding")
    workflow.add_edge("coding", "audit")
    # 3.5 终止边：审计完成后，流程结束。
    workflow.add_edge("audit", END)

    # -------------------------------------------------------------------------
    # 4. 配置检查点 (Checkpointer)
    # -------------------------------------------------------------------------
    # 如果调用者没有提供 checkpointer，就使用内存存储。
    # 内存检查点：进程重启后状态丢失，仅适合开发调试。
    # 生产环境应使用基于数据库的检查点（如 PostgresSaver）以持久化状态。
    if checkpointer is None:
        checkpointer = MemorySaver()

    # 编译图：将上面的节点、边和检查点信息编译成一个可执行的 CompiledGraph 对象。
    # 编译后的对象就像一个"应用"，我们可以直接调用它的 invoke/stream 等方法。
    #
    # interrupt_before 参数：如果调用者传入了节点名列表（如 ["treatment"]），
    # LangGraph 会在这些节点执行前自动暂停，保存检查点，等待外部通过
    # invoke(None, config) 恢复执行。这是 Human-in-the-loop 的底层实现。
    compile_kwargs = {"checkpointer": checkpointer}
    if interrupt_before is not None:
        compile_kwargs["interrupt_before"] = interrupt_before
    return workflow.compile(**compile_kwargs)


# =============================================================================
# 便捷单例模式 —— 避免重复构建管道
# =============================================================================
# _pipeline 是模块级的缓存变量，用于保存编译后的管道对象。
# 如果每次都重新 build_pipeline，不仅浪费性能，更重要的是会创建新的内存检查点，
# 导致之前的状态全部丢失，无法支持循环或暂停恢复。
_pipeline = None


def get_pipeline():
    """
        获取全局唯一的编译管道实例（单例模式）。

        第一次调用时构建并缓存，后续调用直接返回已有实例。
        这保证了在整个应用生命周期内，状态管理是一致的。
        """
    # 声明我们要修改外部的全局变量 _pipeline
    global _pipeline
    if _pipeline is None:
        _pipeline = build_clinical_pipeline()
    return _pipeline


# =============================================================================
# Human-in-the-loop 管道（带人工审核中断）
# =============================================================================
# _pipeline_human_loop 是带 interrupt_before=["treatment"] 的管道单例。
# 与 _pipeline 的区别：Diagnosis 完成后自动暂停，等待医生确认。
# 两个管道共享同一个 MemorySaver 实例时，状态可以互通；
# 但这里使用独立的单例，避免全自动模式和人工审核模式的状态互相干扰。
_pipeline_human_loop = None


def build_clinical_pipeline_with_human_loop(checkpointer=None):
    """
    构建带 Human-in-the-loop 的临床决策管道。

    与 build_clinical_pipeline 的唯一区别：在 compile 时传入
    interrupt_before=["treatment"]，使得 Diagnosis 完成后自动暂停。

    为什么中断点选在 Treatment 之前而不是 Diagnosis 之前？
      - Diagnosis 之前中断没有意义——此时还没有诊断结果，医生无事可审。
      - Treatment 之前中断是最佳时机——诊断结果已生成，医生可以：
          1. 确认诊断 → 批准，Pipeline 继续生成治疗方案。
          2. 修改诊断 → 拒绝并提交修正，Pipeline 基于新诊断重新生成治疗方案。
      - 如果在 Coding 或 Audit 之前中断，医生需要审核的内容太多（治疗方案+编码），
        认知负担过大，且治疗方案一旦生成后再改诊断会导致下游全部重算，浪费算力。

    使用方式（API 层）：
      # 第一步：启动 Pipeline，它会在 Diagnosis 后自动暂停
      result = pipeline.invoke(
          {"raw_input": "患者描述..."},
          config={"configurable": {"thread_id": "session-001"}},
      )
      # 此时 result 中只有 patient_info 和 diagnosis，treatment_plan 等为 None

      # 第二步：医生查看诊断结果后批准
      pipeline.update_state(config, {"human_review_status": "approved"})
      result = pipeline.invoke(None, config)  # 从 Treatment 继续

      # 或者：医生修改诊断后批准
      pipeline.update_state(config, {
          "diagnosis": corrected_diagnosis,
          "human_review_status": "approved",
          "human_review_comment": "建议加做D-二聚体排除肺栓塞",
      })
      result = pipeline.invoke(None, config)  # 基于修正诊断继续

    参数:
        checkpointer: 可选，检查点实现。默认使用内存检查点。
    返回:
        编译后的 LangGraph 应用，在 Treatment 之前会自动暂停。
    """
    return build_clinical_pipeline(
        checkpointer=checkpointer,
        interrupt_before=["treatment"],
    )


def get_pipeline_with_human_loop():
    """
    获取带 Human-in-the-loop 的全局唯一管道实例（单例模式）。

    第一次调用时构建并缓存，后续调用直接返回已有实例。
    与 get_pipeline() 返回的实例相互独立。
    """
    global _pipeline_human_loop
    if _pipeline_human_loop is None:
        _pipeline_human_loop = build_clinical_pipeline_with_human_loop()
    return _pipeline_human_loop
