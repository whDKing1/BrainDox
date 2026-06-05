"""意图识别 Agent — 对话意图分类 + 严重度分层"""
from __future__ import annotations
import structlog
from ..services.intent_service import classify_intent
from ..graph.state import ClinicalState

logger = structlog.get_logger(__name__)


def intent_agent(state: ClinicalState) -> dict:
    """意图识别 Agent：分析用户输入并返回意图分类 + 严重度分层"""
    raw_input = state.raw_input or ""
    conversation_history = state.conversation_history if hasattr(state, 'conversation_history') else None
    result = classify_intent(raw_input, conversation_history)
    triggered_route = result.get("triggered_route", "mild")
    logger.info(
        "intent_classified",
        intent=result["intent"],
        severity=result["severity_level"],
        route=triggered_route,
        confidence=result.get("confidence"),
    )
    return {
        "current_agent": "intent",
        "intent_result": result,
        "triggered_route": triggered_route,
    }
