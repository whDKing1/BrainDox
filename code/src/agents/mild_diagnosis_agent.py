"""轻症诊断 Agent — L0-L1 单结论 + ICD-11 Z编码"""
from __future__ import annotations
import json
import structlog
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from ..config.settings import get_settings

logger = structlog.get_logger(__name__)

MILD_DIAGNOSIS_SYSTEM_PROMPT = """你是一名心理健康评估专家，负责对轻度情绪困扰进行评估。
用户描述的症状较轻，暂未达到精神障碍诊断标准，或处于亚健康状态。

请根据用户的主诉和症状进行评估，返回 JSON 格式结果（所有文本使用中文）：

{
  "agent_type": "mild",
  "primary_diagnosis": {
    "disease_name": "例如：与生活压力相关的适应问题",
    "icd_code": "QF27",
    "icd_system": "ICD-11 Z编码",
    "confidence": 0.85,
    "evidence": ["证据1", "证据2"]
  },
  "recommendations": {
    "self_help": ["自我调节建议1", "自我调节建议2"],
    "professional_help": "何时需要寻求专业帮助的建议"
  },
  "conclusion": "评估总结结论"
}

可能的 ICD-11 Z编码参考（选择最匹配的）：
- QF27：与生活压力相关的问题
- QF20：与教育/工作相关的问题
- QF21：与人际关系相关的问题  
- QF23：与情绪相关的问题（轻度）
- QF24：与睡眠相关的问题（轻度）
- QF25：与自尊相关的问题
- QE50：一般性心理困扰

只返回合法 JSON，不要用 markdown 代码块包裹。"""


def mild_diagnosis_agent(state) -> dict:
    patient_info = state.patient_info or {}
    diagnosis = state.diagnosis or {}
    chief = patient_info.get("chief_complaint", "")
    symptoms = patient_info.get("symptoms", [])
    symptom_text = "; ".join(
        s.get("name", "") for s in (symptoms if isinstance(symptoms, list) else [])
    ) or chief
    settings = get_settings()
    llm = ChatOpenAI(
        model=settings.openai_model,
        api_key=settings.openai_api_key,
        base_url=settings.openai_base_url,
        temperature=0.3,
        max_tokens=512,
    )
    user_content = f"主诉：{chief}\n症状：{symptom_text}"
    try:
        raw = llm.invoke([
            SystemMessage(content=MILD_DIAGNOSIS_SYSTEM_PROMPT),
            HumanMessage(content=user_content),
        ])
        result = json.loads(raw.content.strip())
        logger.info("mild_diagnosis_complete", disease=result.get("primary_diagnosis", {}).get("disease_name"))
    except (json.JSONDecodeError, AttributeError) as e:
        logger.warning("mild_diagnosis_parse_error", error=str(e))
        result = {
            "agent_type": "mild",
            "primary_diagnosis": {
                "disease_name": "一般性情绪困扰",
                "icd_code": "QE50",
                "icd_system": "ICD-11 Z编码",
                "confidence": 0.6,
                "evidence": ["用户描述的情绪困扰"],
            },
            "recommendations": {
                "self_help": ["保持规律作息", "适当运动", "与亲友交流"],
                "professional_help": "如症状持续超过2周，建议寻求心理咨询",
            },
            "conclusion": "当前评估为一般性心理困扰，建议自我观察",
        }
    return {
        "current_agent": "mild_diagnosis",
        "diagnosis": result,
        "triggered_route": "mild",
    }
