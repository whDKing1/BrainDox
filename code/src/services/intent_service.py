"""意图识别服务 — LLM Few-shot 分类 + 规则引擎兜底"""
import json
import re
import structlog
from typing import Optional
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from ..config.settings import get_settings

logger = structlog.get_logger(__name__)

INTENT_SYSTEM_PROMPT = """你是一个心理健康意图识别专家。请对以下用户输入进行分类。

【分类维度】
1. 意图类别：倾诉/求助/危机/咨询/闲聊/拒绝
2. 严重度等级：L0(正常波动) / L1(亚健康) / L2(中度) / L3(重度) / L4(危急)
3. 是否存在风险信号（自杀/自伤/伤人）

【意图定义】
- 倾诉：用户表达情绪感受，需要倾听而非建议
- 求助：用户主动询问评估或寻求帮助
- 危机：用户表达自杀/自伤/伤人倾向，需紧急干预
- 咨询：用户询问科普知识或信息
- 闲聊：日常话题，无需医疗介入
- 拒绝：用户不愿配合或拒绝回答

【严重度定义】
- L0：正常情绪波动，可自我调节
- L1：有轻微症状但未达诊断标准，持续<2周
- L2：符合诊断标准，功能部分受损
- L3：症状严重，功能明显受损
- L4：有自伤/自杀/伤人风险

【核心规则】
- 任何提及自杀、自伤、不想活 → 优先判为"危机" + L4
- 含糊表达 + 无具体症状 → 倾向"倾诉"
- 询问知识类 → "咨询"
- 非健康话题 → "闲聊"

【输出格式】
{"intent": "类别", "severity_level": "Lx", "confidence": 0.0-1.0, "risk_flags": [], "reasoning": "简要推理"}
"""

L4_TRIGGER_PATTERNS = [
    r"自杀", r"自尽", r"不想活", r"了结", r"轻生",
    r"跳楼", r"上吊", r"割腕", r"遗书", r"告别.*世界",
    r"活不下去", r"杀.*(他|她|人)", r"同归于尽",
    r"结束.*生命", r"死.*(算了|掉)", r"最后一程",
]

L0_TRIVIAL_PATTERNS = [
    r"^(你好|嗨|hi|hello|早|晚安|吃了[吗嘛]|天气|哈哈)",
    r"今天天气", r"吃饭[了嘛吗]",
]

REFUSAL_PATTERNS = [
    r"不想说", r"不愿意", r"别问了", r"算了吧",
    r"没什么好说的", r"不想谈[了这]",
]

_llm_instance: Optional[ChatOpenAI] = None

def _get_llm() -> ChatOpenAI:
    global _llm_instance
    if _llm_instance is None:
        settings = get_settings()
        _llm_instance = ChatOpenAI(
            model=settings.openai_model,
            api_key=settings.openai_api_key,
            base_url=settings.openai_base_url,
            temperature=0.1,
            max_tokens=256,
        )
    return _llm_instance


def _rule_engine(text: str) -> Optional[dict]:
    for pattern in L4_TRIGGER_PATTERNS:
        if re.search(pattern, text):
            return {
                "intent": "危机",
                "severity_level": "L4",
                "confidence": 1.0,
                "risk_flags": ["自杀风险"],
                "triggered_route": "severe",
                "reasoning": f"规则引擎命中危机关键词：{pattern}",
            }
    for pattern in REFUSAL_PATTERNS:
        if re.search(pattern, text):
            return {
                "intent": "拒绝",
                "severity_level": "L0",
                "confidence": 0.95,
                "risk_flags": [],
                "triggered_route": "mild",
                "reasoning": "规则引擎检测到拒绝回答信号",
            }
    for pattern in L0_TRIVIAL_PATTERNS:
        if re.search(pattern, text):
            return {
                "intent": "闲聊",
                "severity_level": "L0",
                "confidence": 0.95,
                "risk_flags": [],
                "triggered_route": "mild",
                "reasoning": "规则引擎检测到日常闲聊信号",
            }
    return None


def _llm_classify(text: str, conversation_history: Optional[list[dict]] = None) -> dict:
    llm = _get_llm()
    history_part = ""
    if conversation_history:
        recent = conversation_history[-4:]
        history_lines = [f"{m['role']}: {m['content']}" for m in recent]
        history_part = "【近几条对话】\n" + "\n".join(history_lines) + "\n\n"
    user_content = f"{history_part}用户输入：{text}"
    messages = [
        SystemMessage(content=INTENT_SYSTEM_PROMPT),
        HumanMessage(content=user_content),
    ]
    try:
        raw = llm.invoke(messages)
        result = json.loads(raw.content.strip())
        intent_map = {
            "倾诉": "倾诉", "求助": "求助", "危机": "危机",
            "咨询": "咨询", "闲聊": "闲聊", "拒绝": "拒绝",
        }
        route_map = {
            "L0": "mild", "L1": "mild", "L2": "moderate",
            "L3": "severe", "L4": "severe",
        }
        result["intent"] = intent_map.get(result.get("intent"), "倾诉")
        result["severity_level"] = result.get("severity_level", "L1")
        result["triggered_route"] = route_map.get(result["severity_level"], "mild")
        result["risk_flags"] = result.get("risk_flags", [])
        return result
    except (json.JSONDecodeError, KeyError, AttributeError) as e:
        logger.warning("llm_classify_parse_error", error=str(e), raw=raw.content if hasattr(raw, 'content') else "")
        return {
            "intent": "倾诉",
            "severity_level": "L1",
            "confidence": 0.5,
            "risk_flags": [],
            "triggered_route": "mild",
            "reasoning": "LLM解析失败，降级为默认值",
        }


def classify_intent(text: str, conversation_history: Optional[list[dict]] = None) -> dict:
    if not text or not text.strip():
        return {
            "intent": "闲聊",
            "severity_level": "L0",
            "confidence": 1.0,
            "risk_flags": [],
            "triggered_route": "mild",
            "reasoning": "空输入，视为闲聊",
        }
    rule_result = _rule_engine(text)
    if rule_result:
        return rule_result
    return _llm_classify(text, conversation_history)
