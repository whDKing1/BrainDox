"""中症治疗方案 Agent — 就医引导 + 生活建议"""
from __future__ import annotations
import json
import structlog
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from ..config.settings import get_settings

logger = structlog.get_logger(__name__)

MODERATE_TREATMENT_SYSTEM_PROMPT = """你是一名精神科医师，为中度症状用户提供就医引导和生活建议。
用户症状可能需要专业干预，建议就医同时提供自我管理建议。

请返回 JSON（所有文本使用中文）：
{
  "diagnosis_addressed": "诊断名称",
  "medications": [],
  "medical_referral": "就医建议和推荐科室",
  "non_drug_treatments": ["心理治疗建议"],
  "lifestyle_recommendations": ["生活建议1", "生活建议2"],
  "follow_up_plan": "随访建议",
  "red_flags": ["需要立即就医的警示信号"]
}
只返回合法 JSON，不要用 markdown 代码块包裹。"""


def moderate_treatment_agent(state) -> dict:
    diagnosis = state.diagnosis or {}
    primary = diagnosis.get("primary_diagnosis", {}) if isinstance(diagnosis, dict) else {}
    disease_name = primary.get("disease_name", "情绪障碍") if isinstance(primary, dict) else "情绪障碍"
    recs = diagnosis.get("recommendations", {}) if isinstance(diagnosis, dict) else {}
    medical_advice = recs.get("medical", "") if isinstance(recs, dict) else ""
    settings = get_settings()
    llm = ChatOpenAI(
        model=settings.openai_model,
        api_key=settings.openai_api_key,
        base_url=settings.openai_base_url,
        temperature=0.3,
        max_tokens=512,
    )
    user_content = f"诊断：{disease_name}\n就医建议：{medical_advice}"
    try:
        raw = llm.invoke([
            SystemMessage(content=MODERATE_TREATMENT_SYSTEM_PROMPT),
            HumanMessage(content=user_content),
        ])
        result = json.loads(raw.content.strip())
    except (json.JSONDecodeError, AttributeError) as e:
        logger.warning("moderate_treatment_parse_error", error=str(e))
        result = {
            "diagnosis_addressed": disease_name,
            "medications": [],
            "medical_referral": f"建议前往医院精神科或心理科就诊。{medical_advice}",
            "non_drug_treatments": ["认知行为疗法(CBT)对当前症状有效", "如有需要可考虑心理咨询"],
            "lifestyle_recommendations": ["保持规律作息", "避免自我隔离，维持社交活动", "记录症状变化以便就医时提供给医生"],
            "follow_up_plan": "建议尽快就医，遵医嘱复诊",
            "red_flags": ["出现自杀念头", "症状严重影响日常生活", "持续超过2周无改善"],
        }
    return {
        "current_agent": "moderate_treatment",
        "treatment_plan": result,
    }
