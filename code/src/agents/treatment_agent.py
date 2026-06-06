"""
Treatment Agent — 参数化严重度深度控制的治疗方案推荐

职责：
  - 根据 severity_level 参数控制治疗建议深度
  - mild:   自我调节 + 健康教育，不推荐药物/就医
  - moderate: 就医引导 + CBT推荐 + 量表，不推荐药物
  - severe:  药物 + DDI + 住院评估 + 全面心理治疗

输入：
  state.diagnosis, state.patient_info, state.triggered_route
"""

from __future__ import annotations
import json
import structlog
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI

from ..config.settings import get_settings

logger = structlog.get_logger(__name__)

_TREATMENT_PROMPTS = {
    "mild": """你是一名心理健康辅导员，为轻度情绪困扰用户提供生活建议。
用户症状较轻，不需药物治疗，只需自我调节建议。

请基于诊断结果生成生活建议，返回 JSON（所有文本使用中文）：

{
  "diagnosis_addressed": "诊断名称",
  "medications": [],
  "non_drug_treatments": ["非药物干预建议"],
  "lifestyle_recommendations": ["生活建议"],
  "follow_up_plan": "随访建议",
  "self_help_techniques": [
    {"name": "技巧名称", "description": "具体做法"}
  ]
}

只返回合法 JSON，不要用 markdown 代码块包裹。""",

    "moderate": """你是一名精神科医师，为中度症状用户提供就医引导和生活建议。
用户症状可能需要专业干预，建议就医同时提供自我管理建议。

请返回 JSON（所有文本使用中文）：
{
  "diagnosis_addressed": "诊断名称",
  "medications": [],
  "medical_referral": "就医建议和推荐科室",
  "non_drug_treatments": ["心理治疗建议"],
  "lifestyle_recommendations": ["生活建议"],
  "follow_up_plan": "随访建议",
  "red_flags": ["需要立即就医的警示信号"]
}
只返回合法 JSON，不要用 markdown 代码块包裹。""",

    "severe": """你是一名资深精神科临床精神药理学专家。根据患者的精神科诊断和临床数据，提供全面的、基于循证的精神科治疗方案。

请返回如下结构的JSON对象（所有文本内容使用中文）：
{
  "diagnosis_addressed": "正在治疗的主要精神科诊断",
  "medications": [{
    "drug_name": "药品商品名",
    "generic_name": "通用名（中文）",
    "drug_class": "SSRI/SNRI/心境稳定剂/SGA等",
    "dosage": "起始剂量和目标剂量",
    "route": "口服|肌注|静注",
    "frequency": "用法频次",
    "duration": "疗程",
    "titration_schedule": "剂量调定方案",
    "contraindications": ["禁忌症"],
    "side_effects": ["常见不良反应"],
    "monitoring_requirements": "实验室监测",
    "psychiatric_notes": "选择此药物的理由"
  }],
  "drug_interactions": [{
    "drug_a": "药物1", "drug_b": "药物2",
    "severity": "无|轻微|中度|严重|禁忌",
    "description": "交互说明",
    "recommendation": "临床处理建议"
  }],
  "psychotherapy_recommendations": [{
    "modality": "CBT/DBT/IPT等",
    "frequency": "频率",
    "rationale": "循证依据",
    "specific_techniques": "核心技术"
  }],
  "hospitalization_assessment": {
    "inpatient_recommended": true/false,
    "suicide_risk_level": "低/中/高/极高",
    "suicide_precautions": "预防措施",
    "discharge_criteria": "出院标准"
  },
  "lifestyle_recommendations": ["生活建议"],
  "follow_up_plan": "复诊安排",
  "warnings": ["关键警告"]
}

关键精神药理学原则：
- MDD一线：SSRI（艾司西酞普兰、舍曲林）或SNRI（文拉法辛、度洛西汀）
- 双相抑郁：禁用抗抑郁药单药（转躁风险），推荐喹硫平、鲁拉西酮、锂盐
- 精神分裂症首发：起始SGA（利培酮、奥氮平、阿立哌唑），低剂量
- GAD一线：SSRI或SNRI，苯二氮卓仅限短期
- 始终检查药物相互作用和过敏史
- 5-羟色胺综合征：多种5-羟色胺能药物联用时监测
- 始终评估住院需求（自杀风险、暴力风险、严重功能损害）

只返回合法 JSON，不要用 markdown 代码块包裹。"""
}


def _determine_severity(state) -> str:
    """从 state 推断 severity_level"""
    route = getattr(state, "triggered_route", "mild") or "mild"
    if route in ("mild", "moderate", "severe"):
        return route
    return "mild"


def _build_treatment_input(diagnosis: dict, patient_info: dict, severity: str) -> str:
    """根据严重度构建设置方案评估输入"""
    parts = []
    primary = diagnosis.get("primary_diagnosis", {}) if isinstance(diagnosis, dict) else {}
    disease_name = primary.get("disease_name", "情绪困扰") if isinstance(primary, dict) else "情绪困扰"
    parts.append(f"诊断：{disease_name}")

    if severity == "severe":
        differentials = diagnosis.get("differential_list", []) if isinstance(diagnosis, dict) else []
        if differentials:
            diff_names = [d.get("disease_name", "") for d in differentials if isinstance(d, dict)]
            if diff_names:
                parts.append(f"鉴别诊断：{'、'.join(diff_names)}")
        if patient_info.get("current_medications"):
            parts.append(f"当前用药：{patient_info['current_medications']}")
        if patient_info.get("allergies"):
            parts.append(f"过敏史：{patient_info['allergies']}")
        if patient_info.get("medical_history"):
            parts.append(f"病史：{patient_info['medical_history']}")
        if patient_info.get("suicide_risk_screening"):
            parts.append(f"自杀风险：{patient_info['suicide_risk_screening']}")
    elif severity == "moderate":
        recs = diagnosis.get("recommendations", {}) if isinstance(diagnosis, dict) else {}
        if isinstance(recs, dict) and recs.get("medical"):
            parts.append(f"就医建议：{recs['medical']}")

    return "\n".join(parts)


def _build_fallback_treatment(severity: str, disease_name: str) -> dict:
    """降级治疗方案"""
    if severity == "mild":
        return {
            "diagnosis_addressed": disease_name,
            "medications": [],
            "non_drug_treatments": ["正念呼吸练习", "规律作息调整", "与亲友沟通"],
            "lifestyle_recommendations": ["每天固定时间入睡和起床", "每天户外活动至少30分钟", "减少咖啡因和酒精摄入"],
            "follow_up_plan": "建议1-2周后自我评估，如无改善请寻求专业帮助",
            "self_help_techniques": [
                {"name": "正念呼吸", "description": "每天花10分钟关注呼吸，吸气4秒-屏息2秒-呼气6秒"},
                {"name": "情绪日记", "description": "每天记录情绪波动和触发事件，帮助识别模式"},
            ],
        }
    elif severity == "moderate":
        return {
            "diagnosis_addressed": disease_name,
            "medications": [],
            "medical_referral": "建议前往医院精神科或心理科就诊",
            "non_drug_treatments": ["认知行为疗法(CBT)对当前症状有效", "如有需要可考虑心理咨询"],
            "lifestyle_recommendations": ["保持规律作息", "避免自我隔离，维持社交活动", "记录症状变化以便就医时提供给医生"],
            "follow_up_plan": "建议尽快就医，遵医嘱复诊",
            "red_flags": ["出现自杀念头", "症状严重影响日常生活", "持续超过2周无改善"],
        }
    return {
        "diagnosis_addressed": disease_name,
        "medications": [],
        "lifestyle_recommendations": ["保持规律作息和健康生活方式"],
        "follow_up_plan": "建议进一步评估",
    }


def treatment_agent(state) -> dict:
    """
    LangGraph节点：根据 severity_level 参数控制深度的治疗方案生成。

    读取：state.diagnosis, state.patient_info, state.triggered_route
    写入：state.treatment_plan, state.current_agent
    """
    logger.info("treatment_agent.start")

    diagnosis = state.diagnosis
    patient_info = state.patient_info

    if not diagnosis:
        return {
            "treatment_plan": None,
            "current_agent": "treatment",
            "errors": state.errors + ["No diagnosis available for treatment planning"],
        }

    severity = _determine_severity(state)
    logger.info("treatment_agent.severity", severity=severity)

    settings = get_settings()
    temps = {"mild": 0.3, "moderate": 0.3, "severe": 0.2}
    max_tokens_map = {"mild": 512, "moderate": 512, "severe": 2048}
    llm = ChatOpenAI(
        model=settings.openai_model,
        api_key=settings.openai_api_key,
        base_url=settings.openai_base_url or None,
        temperature=temps.get(severity, 0.2),
        max_tokens=max_tokens_map.get(severity, 1024),
    )

    prompt = _TREATMENT_PROMPTS.get(severity, _TREATMENT_PROMPTS["mild"])
    user_content = _build_treatment_input(diagnosis, patient_info, severity)

    try:
        from ..services.llm_utils import llm_invoke_sync
        raw = llm_invoke_sync(
            llm,
            [SystemMessage(content=prompt), HumanMessage(content=user_content)],
            caller="treatment_agent",
            timeout=60,
        )
        content = raw.content.strip()
        if content.startswith("```"):
            content = content.split("\n", 1)[1].rsplit("```", 1)[0].strip()
        result = json.loads(content)

        logger.info(
            "treatment_agent.success",
            severity=severity,
            meds=len(result.get("medications", [])),
        )
        return_result = {
            "treatment_plan": result,
            "current_agent": "treatment",
        }
        # ---- 输出校验层：Schema + 安全约束 ----
        from ..services.llm_validator import validate_treatment_result
        validated = validate_treatment_result(return_result, triggered_route=severity)
        return validated
    except json.JSONDecodeError as e:
        logger.error("treatment_agent.json_error", severity=severity, error=str(e))
        primary = diagnosis.get("primary_diagnosis", {}) if isinstance(diagnosis, dict) else {}
        disease_name = primary.get("disease_name", "情绪困扰") if isinstance(primary, dict) else "情绪困扰"
        return {
            "treatment_plan": _build_fallback_treatment(severity, disease_name),
            "current_agent": "treatment",
            "errors": state.errors + [f"Treatment JSON parse error: {e}"],
        }
    except Exception as e:
        logger.error("treatment_agent.error", severity=severity, error=str(e))
        primary = diagnosis.get("primary_diagnosis", {}) if isinstance(diagnosis, dict) else {}
        disease_name = primary.get("disease_name", "情绪困扰") if isinstance(primary, dict) else "情绪困扰"
        return {
            "treatment_plan": _build_fallback_treatment(severity, disease_name),
            "current_agent": "treatment",
            "errors": state.errors + [f"Treatment error: {e}"],
        }
