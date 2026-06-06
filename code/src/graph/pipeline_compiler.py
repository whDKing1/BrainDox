"""
PipelineCompiler — 统一诊断 Pipeline 编译器

设计原则：
  - 统一 Pipeline：Diagnosis → Treatment → END
  - severity_level 作为 state.triggered_route 参数注入
  - 不再有三条独立 Pipeline（mild/modernate/severe），
    只有一条 Pipeline，内部根据 severity 控制深度

对比旧架构：
  旧: build_mild_pipeline / build_moderate_pipeline / build_new_visit_pipeline
      + build_pipeline_by_route（4个函数）
  新: build_unified_pipeline（1个函数）
  区别不在链条，在参数——同样的链，不同的输出深度
"""

from __future__ import annotations
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from .state import ClinicalState
from ..agents.intake_agent import intake_agent
from ..agents.diagnosis_agent import diagnosis_agent
from ..agents.treatment_agent import treatment_agent


def build_unified_pipeline(checkpointer=None, interrupt_before=None):
    """构建统一诊断 Pipeline：Diagnosis → Treatment → END

    参数:
        checkpointer: 检查点实现，默认内存。
        interrupt_before: 中断节点列表。
    返回:
        编译后的 LangGraph 应用。
    """
    workflow = StateGraph(ClinicalState)

    workflow.add_node("diagnosis", diagnosis_agent)
    workflow.add_node("treatment", treatment_agent)

    workflow.set_entry_point("diagnosis")
    workflow.add_edge("diagnosis", "treatment")
    workflow.add_edge("treatment", END)

    if checkpointer is None:
        checkpointer = MemorySaver()
    compile_kwargs = {"checkpointer": checkpointer}
    if interrupt_before is not None:
        compile_kwargs["interrupt_before"] = interrupt_before
    return workflow.compile(**compile_kwargs)


# =============================================================================
# 向后兼容：保留旧接口别名
# =============================================================================

def build_pipeline_by_route(triggered_route: str = "mild", checkpointer=None):
    """[兼容] 统一入口，所有路由使用同一条 Pipeline"""
    return build_unified_pipeline(checkpointer)


def build_new_visit_pipeline(checkpointer=None, interrupt_before=None):
    """[兼容] 旧接口别名"""
    return build_unified_pipeline(checkpointer, interrupt_before)


def build_mild_pipeline(checkpointer=None):
    """[兼容] 旧接口别名"""
    return build_unified_pipeline(checkpointer)


def build_moderate_pipeline(checkpointer=None):
    """[兼容] 旧接口别名"""
    return build_unified_pipeline(checkpointer)
