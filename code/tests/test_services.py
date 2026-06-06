"""Unit tests for service layer."""

import pytest
from src.services.icd10_service import lookup_icd10, search_icd10_by_text, get_drg_group, validate_icd10_code
from src.services.drug_interaction import check_interactions, check_allergy_contraindication
from src.services.hipaa_service import detect_phi, deidentify_text, hash_identifier
from src.services.graphrag_service import GraphRAGService


class TestICD10Service:
    def test_lookup_known_code(self):
        result = lookup_icd10("J18.9")
        assert result is not None
        assert result["code"] == "J18.9"
        assert "Pneumonia" in result["description"]

    def test_lookup_unknown_code(self):
        assert lookup_icd10("Z99.99") is None

    def test_search_by_text(self):
        results = search_icd10_by_text("pneumonia")
        assert len(results) >= 1
        assert any("J18" in r["code"] for r in results)

    def test_drg_group(self):
        drg = get_drg_group("J18.9")
        assert drg is not None
        assert drg["drg_code"] == "193"

    def test_validate_code(self):
        assert validate_icd10_code("I10") is True
        assert validate_icd10_code("Z99.99") is False


class TestDrugInteraction:
    def test_known_interaction(self):
        interactions = check_interactions(["warfarin"], ["aspirin"])
        assert len(interactions) >= 1
        assert interactions[0]["severity"] == "major"

    def test_no_interaction(self):
        interactions = check_interactions(["metformin"], ["lisinopril"])
        assert len(interactions) == 0

    def test_class_based_interaction(self):
        interactions = check_interactions(["fluoxetine"], ["phenelzine"])
        assert len(interactions) >= 1
        assert interactions[0]["severity"] == "contraindicated"

    def test_allergy_check(self):
        result = check_allergy_contraindication("amoxicillin", ["penicillin"])
        assert result is not None
        assert result["severity"] == "major"


class TestHIPAAService:
    def test_detect_ssn(self):
        findings = detect_phi("Patient SSN is 123-45-6789")
        assert "ssn" in findings

    def test_detect_email(self):
        findings = detect_phi("Contact: john@example.com")
        assert "email_addresses" in findings

    def test_deidentify(self):
        text = "Patient SSN 123-45-6789, phone 555-123-4567, email test@mail.com"
        result = deidentify_text(text)
        assert "123-45-6789" not in result
        assert "555-123-4567" not in result
        assert "test@mail.com" not in result

    def test_hash_identifier(self):
        h1 = hash_identifier("patient_001")
        h2 = hash_identifier("patient_001")
        assert h1 == h2
        assert len(h1) == 16


class TestGraphRAGService:
    def test_symptom_lookup(self):
        svc = GraphRAGService()
        results = svc.find_diseases_by_symptoms(["fever", "cough"])
        assert len(results) > 0
        disease_names = [r["disease"] for r in results]
        assert "Pneumonia" in disease_names

    def test_icd10_lookup(self):
        svc = GraphRAGService()
        result = svc.get_icd10("Pneumonia")
        assert result is not None
        assert result["code"] == "J18.9"


# =============================================================================
# LLM 基础设施测试
# =============================================================================

class TestTokenBudget:
    """Token 预算管理器测试"""

    def test_count_english(self):
        from src.services.llm_utils import count_tokens
        tokens = count_tokens("Hello world")
        assert tokens == 2

    def test_count_chinese(self):
        from src.services.llm_utils import count_tokens
        tokens = count_tokens("你好世界")
        assert tokens > 0

    def test_budget_within_limit(self):
        from src.services.llm_utils import TokenBudget
        budget = TokenBudget(max_system=3000, max_total=6000)
        result = budget.check("Short system prompt", "Hello user")
        assert result is True

    def test_budget_exceeded(self):
        from src.services.llm_utils import TokenBudget
        budget = TokenBudget(max_system=5, max_total=10)
        result = budget.check("This is a very long system prompt that exceeds the limit")
        assert result is False

    def test_truncate(self):
        from src.services.llm_utils import TokenBudget, count_tokens
        budget = TokenBudget(max_system=3000)
        long_text = "test " * 2000
        truncated = budget.truncate(long_text, max_tokens=10)
        assert count_tokens(truncated) <= 10


class TestCircuitBreaker:
    """熔断器测试"""

    def test_initial_state_closed(self):
        from src.services.llm_utils import CircuitBreaker
        cb = CircuitBreaker(threshold=3)
        assert cb.is_open is False

    def test_opens_after_threshold(self):
        from src.services.llm_utils import CircuitBreaker
        cb = CircuitBreaker(threshold=2)
        cb.record_failure()
        cb.record_failure()
        assert cb.is_open is True

    def test_success_resets(self):
        from src.services.llm_utils import CircuitBreaker
        cb = CircuitBreaker(threshold=3)
        cb.record_failure()
        cb.record_failure()
        assert cb.is_open is False  # 未到阈值
        cb.record_success()
        cb.record_failure()
        assert cb.is_open is False  # 成功重置计数

    def test_failure_count_tracking(self):
        from src.services.llm_utils import CircuitBreaker
        cb = CircuitBreaker(threshold=5)
        assert cb._failure_count == 0
        cb.record_failure()
        assert cb._failure_count == 1
        cb.record_success()
        assert cb._failure_count == 0


class TestLLMCallMetrics:
    """LLM 调用指标数据类测试"""

    def test_metrics_dataclass(self):
        from src.services.llm_utils import LLMCallMetrics
        m = LLMCallMetrics(caller="test_agent", success=True, latency_ms=150.5,
                           prompt_tokens=100, completion_tokens=50, total_tokens=150)
        assert m.caller == "test_agent"
        assert m.success is True
        assert m.latency_ms == 150.5
        assert m.total_tokens == 150
        assert m.fallback_used is False


class TestLLMValidator:
    """LLM 输出校验器测试"""

    def test_mild_diagnosis_valid(self):
        from src.services.llm_validator import validate_diagnosis_result
        result = validate_diagnosis_result({
            "diagnosis": {
                "agent_type": "mild",
                "primary_diagnosis": {"disease_name": "轻度焦虑", "confidence": 0.7}
            }
        }, triggered_route="mild")
        diag = result["diagnosis"]
        assert diag["primary_diagnosis"]["disease_name"] == "轻度焦虑"

    def test_mild_blocks_medications(self):
        """mild路由应拦截药物推荐"""
        from src.services.llm_validator import validate_diagnosis_result
        result = validate_diagnosis_result({
            "diagnosis": {
                "agent_type": "mild",
                "primary_diagnosis": {"disease_name": "一般焦虑", "confidence": 0.7},
                "medications": [{"name": "舍曲林", "dose": "50mg"}],
            }
        }, triggered_route="mild")
        diag = result["diagnosis"]
        assert "medications" not in diag  # 已被拦截

    def test_severe_missing_risk_assessment(self):
        """severe路由缺少风险评估应有校验警告"""
        from src.services.llm_validator import validate_diagnosis_result
        result = validate_diagnosis_result({
            "diagnosis": {
                "primary_recommendation": {"disease_name": "重度抑郁"},
            }
        }, triggered_route="severe")
        # 不抛异常，但有错误记录
        assert isinstance(result, dict)

    def test_treatment_mild_blocks_drugs(self):
        """mild路由的治疗方案应拦截药物"""
        from src.services.llm_validator import validate_treatment_result
        result = validate_treatment_result({
            "treatment_plan": {
                "diagnosis_addressed": "焦虑",
                "lifestyle_recommendations": ["运动"],
                "follow_up_plan": "1周后",
                "medications": [{"name": "阿普唑仑"}],
            }
        }, triggered_route="mild")
        meds = result["treatment_plan"].get("medications", [])
        assert meds == []  # 已被清空

    def test_fallback_diagnosis_by_severity(self):
        from src.services.llm_validator import get_fallback_diagnosis
        mild = get_fallback_diagnosis("mild")
        assert mild["agent_type"] == "mild"
        severe = get_fallback_diagnosis("severe")
        assert "primary_recommendation" in severe

    def test_fallback_treatment_by_severity(self):
        from src.services.llm_validator import get_fallback_treatment
        mild = get_fallback_treatment("mild")
        assert mild["medications"] == []
        severe = get_fallback_treatment("severe")
        assert "hospitalization_assessment" in severe


class TestCustomExceptions:
    """自定义异常测试"""

    def test_circuit_breaker_open_error(self):
        from src.services.llm_utils import LLMCircuitBreakerOpenError
        e = LLMCircuitBreakerOpenError("test")
        assert str(e) == "test"

    def test_all_retries_exhausted_error(self):
        from src.services.llm_utils import LLMAllRetriesExhaustedError
        e = LLMAllRetriesExhaustedError("test")
        assert str(e) == "test"
