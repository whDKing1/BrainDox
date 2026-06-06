"""LLM 输出校验层 — Schema 校验 + 安全约束 + 降级兜底

设计理念：
  LLM 输出不是直接消费的——需要经过校验栅栏：
  1. Schema 校验: 强制检查必须字段的存在性和类型
  2. 安全约束: mild路由拦截药物推荐，severe路由必须有风险评估
  3. 降级兜底: 校验失败时注入预设的安全默认值

面试可讲点: "我给每个Agent的输出加了一层校验装饰器。
这层校验做三件事——Schema完整性、安全约束、降级兜底。
LLM 是不可控的，但系统不能因为 LLM 的不可控而不可靠。"

使用：
    from src.services.llm_validator import validate_diagnosis_output, validate_treatment_output

    @validate_diagnosis_output
    def diagnosis_agent(state):
        ...

    # 或手动调用
    result = validate_diagnosis_output({"diagnosis": {...}}, triggered_route="mild")
"""
from __future__ import annotations
from functools import wraps
import structlog

logger = structlog.get_logger(__name__)

# =============================================================================
# 诊断输出校验
# =============================================================================

DIAGNOSIS_REQUIRED_FIELDS_MILD = ["primary_diagnosis"]
DIAGNOSIS_REQUIRED_FIELDS_MODERATE = ["primary_diagnosis", "differential_list"]
DIAGNOSIS_REQUIRED_FIELDS_SEVERE = ["primary_recommendation"]

# 安全约束：mild 路由禁止的字段
DIAGNOSIS_FORBIDDEN_FIELDS_MILD = ["medications", "drug_interactions", "hospitalization_assessment"]

# 严重度 → 置信度下限
MIN_CONFIDENCE_BY_ROUTE = {"mild": 0.55, "moderate": 0.60, "severe": 0.65}


def _get_route(state_or_dict) -> str:
    """从 state 对象或 dict 中提取 triggered_route"""
    if isinstance(state_or_dict, dict):
        return state_or_dict.get("triggered_route", "mild")
    return getattr(state_or_dict, "triggered_route", "mild") or "mild"


def _validate_diagnosis_schema(diagnosis: dict, severity: str) -> list[str]:
    """Schema 校验：检查必须字段"""
    errors = []
    required = {
        "mild": DIAGNOSIS_REQUIRED_FIELDS_MILD,
        "moderate": DIAGNOSIS_REQUIRED_FIELDS_MODERATE,
        "severe": DIAGNOSIS_REQUIRED_FIELDS_SEVERE,
    }.get(severity, DIAGNOSIS_REQUIRED_FIELDS_MILD)

    for field in required:
        if field not in diagnosis or diagnosis[field] is None:
            errors.append(f"[Schema] 缺少必须字段: {field}")

    # 校验 primary_diagnosis 子结构
    primary = diagnosis.get("primary_diagnosis")
    if isinstance(primary, dict) and "confidence" in primary:
        conf = primary["confidence"]
        if not isinstance(conf, (int, float)) or not (0 <= conf <= 1):
            errors.append(f"[Schema] confidence 值异常: {conf}")
    return errors


def _validate_diagnosis_safety(diagnosis: dict, severity: str, patient_info: dict | None) -> list[str]:
    """安全约束校验"""
    errors = []

    # mild 路由不得有药物/住院推荐
    if severity == "mild":
        for forbidden in DIAGNOSIS_FORBIDDEN_FIELDS_MILD:
            if diagnosis.get(forbidden):
                errors.append(f"[Safety] mild路由不应包含 {forbidden}，已自动清除")
        # 强制设 agent_type 为 mild
        if diagnosis.get("agent_type") == "moderate":
            errors.append("[Safety] mild路由的诊断 agent_type 异常，已修正")
        if diagnosis.get("agent_type") == "severe":
            errors.append("[Safety] mild路由的诊断 agent_type 异常，已修正")

    # severe 路由必须有自杀风险评估
    if severity == "severe":
        ri = diagnosis.get("primary_recommendation", {})
        if isinstance(ri, dict) and not diagnosis.get("suicide_risk_assessment"):
            errors.append("[Safety] severe路由缺少 suicide_risk_assessment")

    # 置信度下限检查
    min_conf = MIN_CONFIDENCE_BY_ROUTE.get(severity, 0.5)
    primary = diagnosis.get("primary_diagnosis", {})
    if isinstance(primary, dict):
        conf = primary.get("confidence", 0)
        if isinstance(conf, (int, float)) and conf < min_conf:
            errors.append(f"[Safety] 置信度 {conf} 低于下限 {min_conf}")

    return errors


def validate_diagnosis_result(result: dict, triggered_route: str = "mild",
                               patient_info: dict | None = None) -> dict:
    """校验诊断结果，修正违规项，记录警告。

    返回: 可能被修正的诊断结果
    """
    diagnosis = result.get("diagnosis", {})
    if not isinstance(diagnosis, dict) or not diagnosis:
        return result

    severity = triggered_route

    # Schema 校验
    schema_errors = _validate_diagnosis_schema(diagnosis, severity)
    # 安全约束
    safety_errors = _validate_diagnosis_safety(diagnosis, severity, patient_info)
    all_errors = schema_errors + safety_errors

    if all_errors:
        for err in all_errors:
            logger.warning("llm_validator.diagnosis", route=severity, issue=err)

    # 修正：mild 路由清除药物相关字段
    if severity == "mild":
        diagnosis = dict(diagnosis)
        for forbidden in DIAGNOSIS_FORBIDDEN_FIELDS_MILD:
            diagnosis.pop(forbidden, None)
        diagnosis["agent_type"] = "mild"
        result["diagnosis"] = diagnosis

    # 修正：置信度过低 → 注入警告但不篡改
    if any("[Safety] 置信度" in e for e in all_errors):
        result["errors"] = result.get("errors", []) + all_errors

    return result


# =============================================================================
# 治疗方案输出校验
# =============================================================================

TREATMENT_REQUIRED_FIELDS = ["diagnosis_addressed", "lifestyle_recommendations", "follow_up_plan"]

# mild 路由不得出现的字段
TREATMENT_FORBIDDEN_MILD = ["medications", "drug_interactions", "hospitalization_assessment",
                             "somatic_treatments", "warnings"]
# moderate 路由不得出现的字段
TREATMENT_FORBIDDEN_MODERATE = ["medications", "drug_interactions", "hospitalization_assessment"]


def validate_treatment_result(result: dict, triggered_route: str = "mild") -> dict:
    """校验治疗方案结果，修正违规项。

    返回: 可能被修正的治疗结果
    """
    treatment = result.get("treatment_plan", {})
    if not isinstance(treatment, dict) or not treatment:
        return result

    severity = triggered_route
    errors = []

    # Schema 校验
    for field in TREATMENT_REQUIRED_FIELDS:
        if field not in treatment or treatment[field] is None:
            errors.append(f"[Schema] 缺少必须字段: {field}")

    # 安全约束：药物拦截
    if severity == "mild":
        for forbidden in TREATMENT_FORBIDDEN_MILD:
            if treatment.get(forbidden):
                errors.append(f"[Safety] mild路由不应包含 {forbidden}，已拦截")
        # 清除违规字段
        treatment = dict(treatment)
        for forbidden in TREATMENT_FORBIDDEN_MILD:
            if forbidden in treatment:
                if forbidden == "medications":
                    treatment["medications"] = []
                else:
                    treatment.pop(forbidden, None)
        result["treatment_plan"] = treatment

    elif severity == "moderate":
        for forbidden in TREATMENT_FORBIDDEN_MODERATE:
            if treatment.get(forbidden):
                errors.append(f"[Safety] moderate路由不应包含 {forbidden}，已拦截")
        treatment = dict(treatment)
        for forbidden in TREATMENT_FORBIDDEN_MODERATE:
            if forbidden in treatment:
                if forbidden == "medications":
                    treatment["medications"] = []
                else:
                    treatment.pop(forbidden, None)
        result["treatment_plan"] = treatment

    if errors:
        for err in errors:
            logger.warning("llm_validator.treatment", route=severity, issue=err)
        result["errors"] = result.get("errors", []) + errors

    return result


# =============================================================================
# 降级兜底值
# =============================================================================

MILD_DIAGNOSIS_FALLBACK = {
    "agent_type": "mild",
    "primary_diagnosis": {
        "disease_name": "一般性情绪困扰",
        "icd_code": "QE50",
        "icd_system": "ICD-11 Z编码",
        "confidence": 0.55,
        "evidence": ["评估系统降级模式"],
    },
    "recommendations": {
        "self_help": ["保持规律作息", "适当运动", "与亲友交流"],
        "professional_help": "如症状持续超过2周，建议寻求心理咨询",
    },
    "conclusion": "系统评估中（降级模式）",
}

MODERATE_DIAGNOSIS_FALLBACK = {
    "agent_type": "moderate",
    "primary_diagnosis": {
        "disease_name": "值得关注的情绪状态",
        "icd_code": "F39",
        "confidence": 0.6,
        "evidence": ["评估系统降级模式"],
        "reasoning": "需要补充更多信息",
    },
    "differential_list": [{
        "disease_name": "适应性障碍",
        "icd_code": "F43.2",
        "confidence": 0.3,
        "key_differentiator": "需进一步明确应激源",
    }],
    "recommendations": {
        "medical": "建议前往医院精神科就诊",
        "self_help": ["保持规律作息", "减少压力源"],
        "suggested_tests": ["PHQ-9", "GAD-7"],
    },
}

SEVERE_DIAGNOSIS_FALLBACK = {
    "primary_recommendation": {
        "disease_name": "需要专业干预的情况",
        "reasoning": "评估系统降级模式",
        "clinical_notes": "需要进一步信息",
    },
    "suicide_risk_assessment": "未充分评估（降级模式）",
    "medical_mimics_ruled_out": [],
}

DIAGNOSIS_FALLBACK = {
    "mild": MILD_DIAGNOSIS_FALLBACK,
    "moderate": MODERATE_DIAGNOSIS_FALLBACK,
    "severe": SEVERE_DIAGNOSIS_FALLBACK,
}

MILD_TREATMENT_FALLBACK = {
    "diagnosis_addressed": "一般性情绪困扰",
    "medications": [],
    "non_drug_treatments": ["正念呼吸练习", "规律作息", "与亲友沟通"],
    "lifestyle_recommendations": ["每天固定时间入睡和起床", "每天户外活动至少30分钟"],
    "follow_up_plan": "建议1-2周后自我评估",
    "self_help_techniques": [
        {"name": "正念呼吸", "description": "每天10分钟关注呼吸"},
        {"name": "情绪日记", "description": "记录情绪波动和触发事件"},
    ],
}

MODERATE_TREATMENT_FALLBACK = {
    "diagnosis_addressed": "值得关注的情绪状态",
    "medications": [],
    "medical_referral": "建议前往医院精神科或心理科就诊",
    "non_drug_treatments": ["认知行为疗法(CBT)", "心理咨询"],
    "lifestyle_recommendations": ["保持规律作息", "避免自我隔离"],
    "follow_up_plan": "建议尽快就医，遵医嘱复诊",
    "red_flags": ["出现自杀念头", "严重影响日常生活"],
}

SEVERE_TREATMENT_FALLBACK = {
    "diagnosis_addressed": "需要专业干预的情况",
    "medications": [],
    "psychotherapy_recommendations": [{
        "modality": "CBT",
        "frequency": "每周一次",
        "rationale": "循证支持",
    }],
    "hospitalization_assessment": {"inpatient_recommended": False, "suicide_risk_level": "中"},
    "lifestyle_recommendations": ["保持规律作息"],
    "follow_up_plan": "建议尽快就医",
    "warnings": ["如有自杀念头请立即拨打12355"],
}

TREATMENT_FALLBACK = {
    "mild": MILD_TREATMENT_FALLBACK,
    "moderate": MODERATE_TREATMENT_FALLBACK,
    "severe": SEVERE_TREATMENT_FALLBACK,
}


def get_fallback_diagnosis(severity: str) -> dict:
    """根据严重度获取降级诊断兜底值"""
    return dict(DIAGNOSIS_FALLBACK.get(severity, MILD_DIAGNOSIS_FALLBACK))


def get_fallback_treatment(severity: str) -> dict:
    """根据严重度获取降级治疗兜底值"""
    return dict(TREATMENT_FALLBACK.get(severity, MILD_TREATMENT_FALLBACK))
