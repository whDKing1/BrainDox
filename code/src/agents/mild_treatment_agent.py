"""轻症治疗方案 Agent — 生活建议 + 自我调节方案（无药物治疗）"""
from __future__ import annotations
import json
import structlog
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from ..config.settings import get_settings

logger = structlog.get_logger(__name__)

MILD_TREATMENT_SYSTEM_PROMPT = """你是一名心理健康辅导员，为轻度情绪困扰用户提供生活建议。
用户症状较轻，不需药物治疗，只需自我调节建议。

请基于诊断结果生成生活建议，返回 JSON（所有文本使用中文）：

{
  "diagnosis_addressed": "诊断名称",
  "medications": [],
  "non_drug_treatments": [
    "非药物干预建议1", "非药物干预建议2"
  ],
  "lifestyle_recommendations": [
    "生活建议1", "生活建议2", "生活建议3"
  ],
  "follow_up_plan": "随访建议",
  "self_help_techniques": [
    {"name": "技巧名称", "description": "具体做法"}
  ]
}

只返回合法 JSON，不要用 markdown 代码块包裹。"""


def mild_treatment_agent(state) -> dict:
    diagnosis = state.diagnosis or {}
    primary = diagnosis.get("primary_diagnosis", {}) if isinstance(diagnosis, dict) else {}
    disease_name = primary.get("disease_name", "一般性情绪困扰") if isinstance(primary, dict) else "一般性情绪困扰"
    settings = get_settings()
    llm = ChatOpenAI(
        model=settings.openai_model,
        api_key=settings.openai_api_key,
        base_url=settings.openai_base_url,
        temperature=0.3,
        max_tokens=512,
    )
    user_content = f"诊断：{disease_name}\n建议类型：轻度自我调节"
    try:
        raw = llm.invoke([
            SystemMessage(content=MILD_TREATMENT_SYSTEM_PROMPT),
            HumanMessage(content=user_content),
        ])
        result = json.loads(raw.content.strip())
    except (json.JSONDecodeError, AttributeError) as e:
        logger.warning("mild_treatment_parse_error", error=str(e))
        result = {
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
    return {
        "current_agent": "mild_treatment",
        "treatment_plan": result,
    }



