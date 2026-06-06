"""
Diagnosis Agent — 参数化严重度深度控制 + GraphRAG 鉴别诊断

职责：
  - 根据 severity_level 参数控制输出深度
  - mild:   单结论 + ICD-11 Z编码，简要分析，不调 GraphRAG
  - moderate: 双鉴别 + ICD-10 F编码，标准分析，可选 GraphRAG
  - severe:   DSM-5 证据链 + GraphRAG，完整分析，必须 GraphRAG

输入：
  state.patient_info（全量患者信息）
  state.triggered_route → 推断 severity_level
"""

from __future__ import annotations
import json
import structlog
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI

from ..config.settings import get_settings
from ..services.graphrag_service import get_graphrag_service

logger = structlog.get_logger(__name__)

# 标准化症状键列表（GraphRAG 索引匹配用）
_STANDARD_SYMPTOM_KEYS = [
    "depressed_mood", "anhedonia", "anxiety", "panic_attack",
    "auditory_hallucination", "visual_hallucination", "delusion", "paranoia",
    "mania", "elevated_mood", "hypomania",
    "obsession", "compulsion",
    "trauma_flashback", "hypervigilance", "nightmares",
    "suicidal_ideation", "self_harm",
    "inattention", "hyperactivity", "impulsivity",
    "social_withdrawal", "negative_symptoms",
    "cognitive_decline", "memory_loss",
    "insomnia", "difficulty_falling_asleep", "middle_insomnia", "early_morning_awakening", "hypersomnia",
    "appetite_loss", "appetite_increase", "weight_loss", "weight_gain",
    "fatigue", "guilt", "irritability", "emotional_lability",
    "psychomotor_retardation", "psychomotor_agitation",
    "somatic_complaints", "dissociation",
    "disorganized_speech", "catatonia", "confusion",
    "substance_craving", "apathy",
    "repetitive_behavior", "tics",
]

SYMPTOM_EXTRACTION_PROMPT = f"""你是一名精神科症状标准化提取助手。
请从以下患者信息中提取所有精神科症状，输出为标准化症状键列表。

可用的标准化症状键（必须从中选择，不要自创）：
{chr(10).join(f'  - {k}' for k in _STANDARD_SYMPTOM_KEYS)}

要求：
- 仔细阅读主诉（chief_complaint）和症状列表（symptoms.name），从中提取所有症状
- 主诉通常是长文本，包含丰富的临床描述，必须解析
- 如果患者描述的症状接近但并非完全匹配某个标准化键，选择最接近的键
- 只提取明确存在的症状，不要推断
- 只返回 JSON 数组：["key1", "key2", ...]
- 不要用 markdown 代码块包裹
- 如果没有匹配任何症状，返回 []"""

# severity 深度控制的 System Prompt — 三段式分区
_DIAGNOSIS_PROMPTS = {
    "mild": """你是一名心理健康评估专家，负责对轻度情绪困扰进行评估。
用户描述的症状较轻，暂未达到精神障碍诊断标准，或处于亚健康状态。

请根据用户的主诉和症状进行评估，返回 JSON 格式（所有文本使用中文）：

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
    "self_help": ["自我调节建议"],
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

只返回合法 JSON，不要用 markdown 代码块包裹。""",

    "moderate": """你是一名精神科医师，负责对中度症状进行鉴别诊断评估。
用户描述的症状已达到可能的诊断标准，需要进行鉴别诊断。

请根据用户信息进行评估，返回 JSON 格式（所有文本使用中文）：

{
  "agent_type": "moderate",
  "primary_diagnosis": {
    "disease_name": "主要诊断名称",
    "icd_code": "Fxx.x",
    "confidence": 0.72,
    "evidence": ["支持证据"],
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
    "self_help": ["自我调节建议"],
    "suggested_tests": ["建议检查项"]
  }
}

只返回合法 JSON，不要用 markdown 代码块包裹。""",

    "severe": """你是一名资深精神科医师，负责根据结构化患者信息进行鉴别诊断。

你面前有知识图谱检索到的候选疾病（按症状匹配度排序）。
对每个候选疾病进行独立的 DSM-5 标准分析：
  1. 列出该诊断的支持证据（患者符合的 DSM-5 诊断标准）
  2. 列出该诊断的不支持证据（患者不符合或缺乏的信息）
  3. 给出临床推理过程，包括考虑的鉴别诊断要点
  4. 标注置信度和需要补充的检查

返回 JSON 结构（所有文本使用中文）：

{
  "candidate_analyses": [
    {
      "disease_name": "疾病名称",
      "icd10_hint": "ICD-10编码",
      "confidence": 0.0-1.0,
      "supporting_evidence": ["符合DSM-5标准A的条目1", "条目2"],
      "opposing_evidence": ["不支持或缺乏的信息"],
      "reasoning": "完整的临床推理路径",
      "recommended_tests": ["建议补充检查"]
    }
  ],
  "primary_recommendation": {
    "disease_name": "最可能诊断",
    "reasoning": "为何这是最可能的诊断",
    "clinical_notes": "整体临床印象，含DSM-5标注词"
  },
  "suicide_risk_assessment": "自杀风险评估",
  "medical_mimics_ruled_out": ["已排除的医学模拟因素"]
}

规则：
- 严格基于患者数据，不编造
- 对每个候选疾病单独分析
- primary_recommendation 从候选中选择最可能的一个
- 只返回合法 JSON，不要用 markdown 代码块包裹"""
}


def _extract_symptom_names(patient_info: dict) -> list[str]:
    """从 patient_info 提取症状名称列表"""
    names = []
    for symptom in patient_info.get("symptoms", []):
        if isinstance(symptom, dict) and symptom.get("name"):
            names.append(symptom["name"])
    chief = patient_info.get("chief_complaint", "")
    if chief and chief not in names:
        names.append(chief)
    return names


def _extract_symptoms_via_llm(patient_info: dict) -> list[str]:
    """使用 LLM 从患者信息中提取标准化症状键"""
    patient_json = json.dumps(patient_info, ensure_ascii=False, indent=2)
    settings = get_settings()
    llm = ChatOpenAI(
        model=settings.openai_model,
        api_key=settings.openai_api_key,
        base_url=settings.openai_base_url or None,
        temperature=0.0,
    )
    try:
        from ..services.llm_utils import llm_invoke_sync
        response = llm_invoke_sync(
            llm,
            [SystemMessage(content=SYMPTOM_EXTRACTION_PROMPT),
             HumanMessage(content=f"患者信息：\n{patient_json}")],
            caller="diagnosis_agent.symptom_extract",
            timeout=30,
        )
        content = response.content.strip()
        if content.startswith("```"):
            content = content.split("\n", 1)[1].rsplit("```", 1)[0].strip()
        keys = json.loads(content)
        if isinstance(keys, list):
            valid = [k for k in keys if k in _STANDARD_SYMPTOM_KEYS]
            logger.info("diagnosis_agent.symptom_extraction_llm", raw=keys, valid=valid)
            return valid
        return []
    except Exception as e:
        logger.warning("diagnosis_agent.symptom_extraction_fallback", error=str(e))
        return []


def _format_graphrag_context(candidates_with_paths: list[dict]) -> str:
    """将 GraphRAG 候选格式化为 LLM 可读参考"""
    lines = [
        "=== 知识图谱参考（GraphRAG）===",
        "以下疾病由症状→疾病图检索匹配，按匹配数排序。",
        "请对每个候选疾病独立分析其 DSM-5 证据。\n",
    ]
    for i, cd in enumerate(candidates_with_paths, 1):
        matched = "、".join(cd.get("matched_symptoms", [])) or "无精确匹配"
        lines.append(
            f"{i}. {cd['disease']}（ICD-10: {cd.get('icd10_code', '')}）\n"
            f"   症状匹配路径: {matched}\n"
            f"   匹配度: {cd['symptom_match_count']}/{cd['total_symptoms']}"
        )
    lines.append("\n=== 知识图谱参考结束 ===")
    return "\n".join(lines)


def _determine_severity(state) -> str:
    """从 state 中推断 severity_level"""
    route = getattr(state, "triggered_route", "mild") or "mild"
    if route in ("mild", "moderate", "severe"):
        return route
    return "mild"


def _build_patient_content(patient_info: dict, severity: str) -> str:
    """根据严重度构建患者信息内容"""
    parts = []
    chief = patient_info.get("chief_complaint", "")
    if chief:
        parts.append(f"主诉：{chief}")
    symptoms = patient_info.get("symptoms", [])
    if symptoms:
        names = []
        for s in symptoms:
            if isinstance(s, dict) and s.get("name"):
                name = s["name"]
                if s.get("severity"):
                    name += f"（{s['severity']}）"
                if s.get("description"):
                    name += f" - {s['description']}"
                names.append(name)
        if names:
            parts.append(f"症状：{'; '.join(names)}")
    if patient_info.get("duration_weeks") is not None:
        parts.append(f"持续时间：约{patient_info['duration_weeks']}周")
    if patient_info.get("functional_impact"):
        parts.append(f"功能影响：{patient_info['functional_impact']}")
    # 中重度额外注入更多字段
    if severity in ("moderate", "severe"):
        if patient_info.get("suicide_risk_screening"):
            parts.append(f"自杀风险筛查：{patient_info['suicide_risk_screening']}")
        if patient_info.get("medical_history"):
            parts.append(f"病史：{patient_info['medical_history']}")
        if patient_info.get("family_history"):
            parts.append(f"家族史：{patient_info['family_history']}")
        if patient_info.get("current_medications"):
            parts.append(f"当前用药：{patient_info['current_medications']}")
        if patient_info.get("allergies"):
            parts.append(f"过敏史：{patient_info['allergies']}")
        if patient_info.get("substance_use"):
            parts.append(f"物质使用：{patient_info['substance_use']}")
    return "\n".join(parts) if parts else "暂无详细信息"


def diagnosis_agent(state) -> dict:
    """
    LangGraph节点：根据 severity_level 参数控制深度的鉴别诊断。

    读取：state.patient_info, state.triggered_route
    写入：state.diagnosis, state.candidate_diseases, state.current_agent
    """
    logger.info("diagnosis_agent.start")

    patient_info = state.patient_info
    if not patient_info:
        return {
            "diagnosis": None,
            "current_agent": "diagnosis",
            "errors": state.errors + ["No patient info available for diagnosis"],
        }

    severity = _determine_severity(state)
    logger.info("diagnosis_agent.severity", severity=severity)

    settings = get_settings()
    llm_config = {
        "model": settings.openai_model,
        "api_key": settings.openai_api_key,
        "base_url": settings.openai_base_url or None,
    }

    # 严重度控制 LLM 温度
    temps = {"mild": 0.3, "moderate": 0.2, "severe": 0.2}
    max_tokens_map = {"mild": 512, "moderate": 1024, "severe": 2048}
    llm = ChatOpenAI(
        **llm_config, temperature=temps.get(severity, 0.2),
        max_tokens=max_tokens_map.get(severity, 1024),
    )

    # extreme 路由：使用 GraphRAG 检索
    candidates_with_paths = []
    graphrag_context = ""
    if severity == "severe":
        symptom_keys = _extract_symptoms_via_llm(patient_info)
        if not symptom_keys:
            raw_names = _extract_symptom_names(patient_info)
            if raw_names:
                graphrag_service = get_graphrag_service()
                candidates_with_paths = graphrag_service.find_diseases_with_paths(raw_names, top_k=3)
        else:
            graphrag_service = get_graphrag_service()
            candidates_with_paths = graphrag_service.find_diseases_with_paths(symptom_keys, top_k=3)
        if candidates_with_paths:
            graphrag_context = _format_graphrag_context(candidates_with_paths)
        logger.info("diagnosis_agent.graphrag_hits", count=len(candidates_with_paths))

    # 构建 prompt
    prompt = _DIAGNOSIS_PROMPTS.get(severity, _DIAGNOSIS_PROMPTS["mild"])
    patient_content = _build_patient_content(patient_info, severity)

    if severity == "severe" and graphrag_context:
        full_prompt = f"{prompt}\n\n{graphrag_context}\n\n患者结构化数据：\n{patient_content}"
        user_msg = "请基于上述患者数据和知识图谱候选，进行鉴别诊断分析。"
    elif severity == "severe":
        full_prompt = f"{prompt}\n\n患者结构化数据：\n{patient_content}"
        user_msg = "请基于上述患者数据进行鉴别诊断分析。"
    else:
        full_prompt = prompt
        user_msg = patient_content

    try:
        from ..services.llm_utils import llm_invoke_sync
        raw = llm_invoke_sync(
            llm,
            [SystemMessage(content=full_prompt), HumanMessage(content=user_msg)],
            caller="diagnosis_agent",
            timeout=60,
        )
        content = raw.content.strip()
        if content.startswith("```"):
            content = content.split("\n", 1)[1].rsplit("```", 1)[0].strip()
        result = json.loads(content)

        diag_name = ""
        if severity in ("mild", "moderate"):
            primary = result.get("primary_diagnosis", {})
            if isinstance(primary, dict):
                diag_name = primary.get("disease_name", "")
        else:
            primary_rec = result.get("primary_recommendation", {})
            if isinstance(primary_rec, dict):
                diag_name = primary_rec.get("disease_name", "")
        logger.info("diagnosis_agent.success", severity=severity, disease=diag_name)

        # ---- 输出校验层：Schema + 安全约束 ----
        from ..services.llm_validator import validate_diagnosis_result
        return_result = {
            "diagnosis": result,
            "candidate_diseases": candidates_with_paths,
            "current_agent": "diagnosis",
            "human_review_status": "awaiting_diagnosis" if severity == "severe" else "none",
        }
        validated = validate_diagnosis_result(return_result, triggered_route=severity)
        return validated

    except json.JSONDecodeError as e:
        logger.error("diagnosis_agent.json_error", severity=severity, error=str(e))
        fallback = _build_fallback_diagnosis(severity, patient_info)
        return {
            "diagnosis": fallback,
            "candidate_diseases": candidates_with_paths,
            "current_agent": "diagnosis",
            "errors": state.errors + [f"Diagnosis JSON parse error: {e}"],
        }
    except Exception as e:
        logger.error("diagnosis_agent.error", severity=severity, error=str(e))
        fallback = _build_fallback_diagnosis(severity, patient_info)
        return {
            "diagnosis": fallback,
            "candidate_diseases": candidates_with_paths,
            "current_agent": "diagnosis",
            "errors": state.errors + [f"Diagnosis error: {e}"],
        }


def _build_fallback_diagnosis(severity: str, patient_info: dict) -> dict:
    """降级诊断结果"""
    if severity == "mild":
        return {
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
    elif severity == "moderate":
        return {
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
        "agent_type": "severe",
        "primary_recommendation": {
            "disease_name": "评估中",
            "reasoning": "系统评估中",
            "clinical_notes": "需要进一步信息",
        },
        "suicide_risk_assessment": "未充分评估",
    }
