"""
PipelineCompiler — 根据医生选择的场景动态编译LangGraph执行图。

设计原则：
  - 初诊图：Intake → SufficiencyCheck → Diagnosis → Treatment → Coding → Audit
  - 复诊图：FollowupIntake → Treatment → Coding → Audit
  - SufficiencyCheck 是纯规则引擎，在诊断前检查关键字段完整性
  - 两张图共享ClinicalState数据结构，保证输出格式一致。

面试可聊点：
  "信息充足性检查放在诊断前而非诊断后——这是确定性规则引擎，不消耗LLM Token。
  确定性检查用规则引擎，推理类任务用LLM，各司其职。"
"""

from __future__ import annotations
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from .state import ClinicalState, MAX_DIAGNOSIS_RETRIES
from ..agents.intake_agent import intake_agent
from ..agents.diagnosis_agent import diagnosis_agent
from ..agents.treatment_agent import treatment_agent
from ..agents.coding_agent import coding_agent
from ..agents.audit_agent import audit_agent
from ..agents.followup_intake_agent import followup_intake_agent

# =============================================================================
# 信息充足性检查 — 纯规则引擎，插入 Intake → Diagnosis 之间
#
# 两级检查设计（面试可讲点）：
#   硬底线(BLOCK)：症状列表/主诉缺失 → 阻断Pipeline，LLM无法做鉴别诊断的硬前提
#   软提示(WARN)： 自杀风险/物质使用史缺失 → 显示警告但继续诊断，临床现实常缺失
# =============================================================================

# 硬底线字段：(路径, 中文名) — 缺失则阻断Pipeline
BLOCK_FIELDS = [
    ("symptoms", "症状列表"),
    ("chief_complaint", "主诉"),
]

# 软提示字段：(路径, 中文名) — 缺失仅告警，不阻断
WARN_FIELDS = [
    ("mental_status_exam.suicide_risk", "自杀风险评估"),
    ("mental_status_exam.substance_use", "物质使用史"),
]

BLOCK_PREFIX = "【阻断】"
WARN_PREFIX = "【提示】"
FAIL_PREFIX = "【错误】"


def _get_nested(d: dict, path: str):
    """从嵌套字典中按点号路径取值，如 d.mental_status_exam.suicide_risk"""
    keys = path.split(".")
    val = d
    for k in keys:
        if isinstance(val, dict):
            val = val.get(k)
        else:
            return None
    return val


def check_info_sufficiency(state: ClinicalState) -> dict:
    """
    信息充足性检查节点（纯规则引擎，不调用LLM）。

    两级检查：
      BLOCK_FIELDS 缺失 → 【阻断】前缀 → needs_more_info=true → 路由到END
      WARN_FIELDS  缺失 → 【提示】前缀 → needs_more_info=true → 路由到diagnosis（仅告警）
    """
    patient_info = state.patient_info
    if not patient_info:
        existing_errors = state.errors or []
        failure_msg = f"{FAIL_PREFIX}Intake Agent 解析失败，未生成结构化病历（请检查后端日志）"
        new_count = state.diagnosis_retry_count + 1
        return {
            "needs_more_info": True,
            "diagnosis_retry_count": new_count,
            "current_agent": "sufficiency_check",
            "errors": existing_errors + [failure_msg],
        }

    block_missing: list[str] = []
    warn_missing: list[str] = []

    for path, label in BLOCK_FIELDS:
        val = _get_nested(patient_info, path)
        if val is None or (isinstance(val, (list, str)) and len(val) == 0):
            block_missing.append(f"{BLOCK_PREFIX}{label}")

    for path, label in WARN_FIELDS:
        val = _get_nested(patient_info, path)
        is_missing = False
        if val is None:
            is_missing = True
        elif isinstance(val, str) and val.strip() in ("", "未评估", "缺失", "未知", "未提及"):
            is_missing = True
        if is_missing:
            warn_missing.append(f"{WARN_PREFIX}{label}")

    all_missing = block_missing + warn_missing
    if all_missing:
        new_count = state.diagnosis_retry_count + 1
        return {
            "needs_more_info": True,
            "diagnosis_retry_count": new_count,
            "current_agent": "sufficiency_check",
            "errors": state.errors + all_missing,
        }

    return {
        "needs_more_info": False,
        "current_agent": "sufficiency_check",
    }


def _route_after_sufficiency(state: ClinicalState) -> str:
    """
    充足性检查后的路由：
      - 信息充足 → diagnosis
      - 有【阻断】缺失 且 未达上限 → END（暂停，等医生补充）
      - 仅有【提示】缺失 → diagnosis（仅前端告警，不阻断流程）
      - 已达上限 → 强制进入 diagnosis
    """
    if not state.needs_more_info:
        return "diagnosis"
    if state.diagnosis_retry_count >= MAX_DIAGNOSIS_RETRIES:
        return "diagnosis"
    has_block = any(e.startswith(BLOCK_PREFIX) for e in (state.errors or []))
    if has_block:
        return END
    return "diagnosis"


# =============================================================================
# 诊断后路由函数
# =============================================================================
def _route_after_diagnosis(state: ClinicalState) -> str:
    """诊断后直接进入 treatment（信息充足性已在诊断前保证）"""
    return "treatment"


# =============================================================================
# 初诊Pipeline构建
# =============================================================================
def build_new_visit_pipeline(checkpointer=None, interrupt_before=None):
    """
    构建初诊Pipeline：Intake → SufficiencyCheck → Diagnosis → Treatment → Coding → Audit

    信息充足性检查在诊断前，用纯规则引擎而非LLM。
    SufficiencyCheck 检查 patient_info 中 suicide_risk、substance_use 等关键字段。
    不充足时暂停返回给医生，充足时进入 Diagnosis。

    参数:
        checkpointer: 检查点实现，默认内存。
        interrupt_before: 中断节点列表。
    返回:
        编译后的LangGraph应用。
    """
    workflow = StateGraph(ClinicalState)

    workflow.add_node("intake", intake_agent)
    workflow.add_node("sufficiency_check", check_info_sufficiency)
    workflow.add_node("diagnosis", diagnosis_agent)
    workflow.add_node("treatment", treatment_agent)
    workflow.add_node("coding", coding_agent)
    workflow.add_node("audit", audit_agent)

    workflow.set_entry_point("intake")
    workflow.add_edge("intake", "sufficiency_check")
    workflow.add_conditional_edges(
        "sufficiency_check",
        _route_after_sufficiency,
        {"diagnosis": "diagnosis", END: END},
    )
    workflow.add_edge("diagnosis", "treatment")
    workflow.add_edge("treatment", "coding")
    workflow.add_edge("coding", "audit")
    workflow.add_edge("audit", END)

    if checkpointer is None:
        checkpointer = MemorySaver()
    compile_kwargs = {"checkpointer": checkpointer}
    if interrupt_before is not None:
        compile_kwargs["interrupt_before"] = interrupt_before
    return workflow.compile(**compile_kwargs)


# =============================================================================
# 表单模式初诊Pipeline — 前端表单输入，跳过Intake
# =============================================================================
def build_new_visit_from_form(checkpointer=None):
    """
    构建表单模式初诊Pipeline：

    SufficiencyCheck → Diagnosis → (HITL中断，等待医生选择诊断)
        → Treatment → Coding → Audit

    与 build_new_visit_pipeline 的区别：
      - 无 Intake 节点：patient_info 由前端表单 + 后端规则引擎直接构造
      - interrupt_before=["treatment"]：诊断完成后暂停，等医生选择确诊疾病
    """
    workflow = StateGraph(ClinicalState)

    workflow.add_node("sufficiency_check", check_info_sufficiency)
    workflow.add_node("diagnosis", diagnosis_agent)
    workflow.add_node("treatment", treatment_agent)
    workflow.add_node("coding", coding_agent)
    workflow.add_node("audit", audit_agent)

    workflow.set_entry_point("sufficiency_check")
    workflow.add_conditional_edges(
        "sufficiency_check",
        _route_after_sufficiency,
        {"diagnosis": "diagnosis", END: END},
    )
    workflow.add_edge("diagnosis", "treatment")
    workflow.add_edge("treatment", "coding")
    workflow.add_edge("coding", "audit")
    workflow.add_edge("audit", END)

    if checkpointer is None:
        checkpointer = MemorySaver()
    return workflow.compile(checkpointer=checkpointer, interrupt_before=["treatment"])


# =============================================================================
# 复诊Pipeline构建
# =============================================================================
def build_followup_pipeline(checkpointer=None):
    """
    构建复诊Pipeline：3-Agent精简链路。

    FollowupIntake → Treatment → Coding → Audit → END

    复诊跳过初诊Intake（不需要完整MSE/人口学）和Diagnosis（诊断已明确）。
    FollowupIntake只提取调药相关结构：诊断+用药+变化+副作用+调药意图。

    参数:
        checkpointer: 检查点实现，默认内存。
    返回:
        编译后的LangGraph应用。
    """
    workflow = StateGraph(ClinicalState)

    workflow.add_node("followup_intake", followup_intake_agent)
    workflow.add_node("treatment", treatment_agent)
    workflow.add_node("coding", coding_agent)
    workflow.add_node("audit", audit_agent)

    workflow.set_entry_point("followup_intake")
    workflow.add_edge("followup_intake", "treatment")
    workflow.add_edge("treatment", "coding")
    workflow.add_edge("coding", "audit")
    workflow.add_edge("audit", END)

    if checkpointer is None:
        checkpointer = MemorySaver()
    return workflow.compile(checkpointer=checkpointer)


def build_followup_pipeline_with_human_loop(checkpointer=None):
    """复诊HITL Pipeline（保留接口兼容）。"""
    workflow = StateGraph(ClinicalState)

    workflow.add_node("followup_intake", followup_intake_agent)
    workflow.add_node("treatment", treatment_agent)
    workflow.add_node("coding", coding_agent)
    workflow.add_node("audit", audit_agent)

    workflow.set_entry_point("followup_intake")
    workflow.add_edge("followup_intake", "treatment")
    workflow.add_edge("treatment", "coding")
    workflow.add_edge("coding", "audit")
    workflow.add_edge("audit", END)

    if checkpointer is None:
        checkpointer = MemorySaver()
    return workflow.compile(checkpointer=checkpointer, interrupt_before=["treatment"])


# =============================================================================
# Pipeline编译器统一入口
# =============================================================================
def compile_pipeline(scenario: str, human_loop: bool = False):
    """
    根据场景和HITL配置动态编译Pipeline。

    参数:
        scenario: "new_visit" | "followup"
        human_loop: 是否在treatment前启用人工审核
    返回:
        编译后的LangGraph应用。
    """
    if scenario == "followup":
        if human_loop:
            return build_followup_pipeline_with_human_loop()
        return build_followup_pipeline()

    if human_loop:
        return build_new_visit_pipeline(interrupt_before=["treatment"])
    return build_new_visit_pipeline()


# 向后兼容别名
get_pipeline = build_new_visit_pipeline
get_pipeline_with_human_loop = lambda: build_new_visit_pipeline(interrupt_before=["treatment"])
get_followup_pipeline = build_followup_pipeline
get_followup_pipeline_with_human_loop = build_followup_pipeline_with_human_loop
