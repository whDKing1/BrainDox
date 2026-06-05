"""中症诊断 Agent — L2 双鉴别诊断"""
from __future__ import annotations
import json
import structlog
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from ..config.settings import get_settings

logger = structlog.get_logger(__name__)

MODERATE_DIAGNOSIS_SYSTEM_PROMPT = """你是一名精神科医师，负责对中度症状进行鉴别诊断评估。
用户描述的症状已达到可能的诊断标准，需要进行鉴别诊断。

请根据用户的主诉和症状进行评估，返回 JSON 格式结果（所有文本使用中文）：

{
  "agent_type": "moderate",
  "primary_diagnosis": {
    "disease_name": "主要诊断名称",
    "icd_code": "Fxx.x",
    "confidence": 0.72,
    "evidence": ["支持证据1", "支持证据2"],
    "reasoning": "诊断推理过程"
  },
  "differential_list": [
    {
      "disease_name": "鉴别诊断名称",
      "icd_code": "Fxx.x",
      "confidence": 0.20,
      "key_differentiator": "与主要诊断的关键区分点"
    }
  ],
  "recommendations": {
    "medical": "就医建议",
    "self_help": ["自我调节建议1", "自我调节建议2"],
    "suggested_tests": ["建议检查项"]
  }
}

只返回合法 JSON，不要用 markdown 代码块包裹。"""


def moderate_diagnosis_agent(state) -> dict:
    patient_info = state.patient_info or {}
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
        max_tokens=1024,
    )
    user_content = f"主诉：{chief}\n症状：{symptom_text}"
    try:
        raw = llm.invoke([
            SystemMessage(content=MODERATE_DIAGNOSIS_SYSTEM_PROMPT),
            HumanMessage(content=user_content),
        ])
        result = json.loads(raw.content.strip())
        logger.info("moderate_diagnosis_complete", disease=result.get("primary_diagnosis", {}).get("disease_name"))
    except (json.JSONDecodeError, AttributeError) as e:
        logger.warning("moderate_diagnosis_parse_error", error=str(e))
        result = {
            "agent_type": "moderate",
            "primary_diagnosis": {
                "disease_name": "未特定情绪障碍",
                "icd_code": "F39",
                "confidence": 0.6,
                "evidence": ["用户描述的情绪和睡眠问题"],
                "reasoning": "症状达到一定严重程度但缺乏足够信息确定具体诊断",
            },
            "differential_list": [
                {
                    "disease_name": "适应性障碍",
                    "icd_code": "F43.2",
                    "confidence": 0.25,
                    "key_differentiator": "需要明确是否存在特定压力事件",
                }
            ],
            "recommendations": {
                "medical": "建议前往医院精神科做进一步评估",
                "self_help": ["保持规律作息", "减少压力源", "适当运动"],
                "suggested_tests": ["PHQ-9抑郁量表", "GAD-7焦虑量表"],
            },
        }
    return {
        "current_agent": "moderate_diagnosis",
        "diagnosis": result,
        "triggered_route": "moderate",
    }
