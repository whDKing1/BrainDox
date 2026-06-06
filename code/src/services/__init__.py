"""BrainDox services."""

from .chat_service import process_message
from .intent_service import classify_intent
from .severity_assessor import assess_severity, SeverityResult
from .drug_interaction import check_drug_interactions
from .graphrag_service import get_graphrag_service, find_diseases_by_symptoms
from .icd10_service import get_icd10_service, search_icd10
from .report_service import generate_report, create_report_from_diagnosis
from .hipaa_service import detect_phi, deidentify_text
from .llm_utils import (
    llm_invoke,
    llm_invoke_sync,
    count_tokens,
    TokenBudget,
    CircuitBreaker,
    LLMCallMetrics,
    LLMCircuitBreakerOpenError,
    LLMAllRetriesExhaustedError,
)
from .llm_validator import (
    validate_diagnosis_result,
    validate_treatment_result,
    get_fallback_diagnosis,
    get_fallback_treatment,
)
from .crisis_alert import send_crisis_alert

__all__ = [
    "process_message",
    "classify_intent",
    "assess_severity",
    "SeverityResult",
    "check_drug_interactions",
    "get_graphrag_service",
    "find_diseases_by_symptoms",
    "get_icd10_service",
    "search_icd10",
    "generate_report",
    "create_report_from_diagnosis",
    "detect_phi",
    "deidentify_text",
    # LLM 基础设施
    "llm_invoke",
    "llm_invoke_sync",
    "count_tokens",
    "TokenBudget",
    "CircuitBreaker",
    "LLMCallMetrics",
    "LLMCircuitBreakerOpenError",
    "LLMAllRetriesExhaustedError",
    # 输出校验
    "validate_diagnosis_result",
    "validate_treatment_result",
    "get_fallback_diagnosis",
    "get_fallback_treatment",
    # 安全告警
    "send_crisis_alert",
]
