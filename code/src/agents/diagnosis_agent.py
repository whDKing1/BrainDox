"""
Diagnosis Agent — 精神科鉴别诊断，基于结构化患者数据 + GraphRAG 候选。

职责：
  - LLM 从患者信息（含主诉长文本）中提取标准化症状键 → GraphRAG 检索
  - GraphRAG 检索 top3 候选疾病（含图检索路径）
  - LLM 分析每个候选的 DSM-5 证据链
  - 输出结构化分析供前端展示给医生选择
  - 医生选择后路由到对应治疗方案
"""

from __future__ import annotations
import json
import structlog
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI

from ..config.settings import get_settings
from ..services.graphrag_service import get_graphrag_service

logger = structlog.get_logger(__name__)

# 构建供 LLM 参考的所有标准化症状键列表（来自 SYMPTOM_DISEASE_MAP）
# 这些是 LLM 提取症状时的标准化输出选项
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
- 如果患者描述的症状接近但并非完全匹配某个标准化键，选择最接近的键（例如"睡不着"→"difficulty_falling_asleep"）
- 只提取明确存在的症状，不要推断没有的症状
- 只返回 JSON 数组：["key1", "key2", ...]
- 不要用 markdown 代码块包裹
- 如果没有匹配任何症状，返回 []
"""


def _extract_symptom_names(patient_info: dict) -> list[str]:
    """从 patient_info 字典中提取症状名称列表，供 GraphRAG 检索使用。"""
    names = []
    for symptom in patient_info.get("symptoms", []):
        if isinstance(symptom, dict) and symptom.get("name"):
            names.append(symptom["name"])
    chief = patient_info.get("chief_complaint", "")
    if chief and chief not in names:
        names.append(chief)
    return names


def _extract_symptoms_via_llm(patient_info: dict) -> list[str]:
    """
    使用 LLM 从患者信息（含主诉长文本）中提取标准化症状键列表。

    相比规则方法 _extract_symptom_names() 的优势：
      - 能理解主诉中的自然语言描述（"睡不着"→"difficulty_falling_asleep"）
      - 能从长文本中抽取多个症状，而非把整段文本当做一个症状
      - 输出直接是 SYMPTOM_DISEASE_MAP 的键，绕过别名映射

    返回：标准化症状键列表（如 ["depressed_mood", "anhedonia", "insomnia"]）
    """
    patient_json = json.dumps(patient_info, ensure_ascii=False, indent=2)
    settings = get_settings()
    llm = ChatOpenAI(
        model=settings.openai_model,
        api_key=settings.openai_api_key,
        base_url=settings.openai_base_url or None,
        temperature=0.0,
    )
    try:
        response = llm.invoke([
            SystemMessage(content=SYMPTOM_EXTRACTION_PROMPT),
            HumanMessage(content=f"患者信息：\n{patient_json}"),
        ])
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

DIAGNOSIS_SYSTEM_PROMPT = """你是一名资深精神科医师，负责根据结构化患者信息进行鉴别诊断。

你面前有 3 个知识图谱检索到的候选疾病（按症状匹配度排序）。
对每个候选疾病，你需要进行独立的 DSM-5 标准分析：
  1. 列出该诊断的支持证据（患者符合的 DSM-5 诊断标准）
  2. 列出该诊断的不支持证据（患者不符合或缺乏的信息）
  3. 给出临床推理过程，包括考虑的鉴别诊断要点
  4. 标注置信度和需要补充的检查

请返回如下 JSON 结构（所有文本使用中文）：

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
- 置信度必须在 0 到 1 之间
- 严格基于患者数据，不编造
- 对每个候选疾病单独分析
- primary_recommendation 从 3 个候选中选择最可能的一个
- 只返回合法 JSON，不要用 markdown 代码块包裹
"""


def _extract_symptom_names(patient_info: dict) -> list[str]:
    """从 patient_info 字典中提取症状名称列表，供 GraphRAG 检索使用。"""
    names = []
    for symptom in patient_info.get("symptoms", []):
        if isinstance(symptom, dict) and symptom.get("name"):
            names.append(symptom["name"])
    chief = patient_info.get("chief_complaint", "")
    if chief and chief not in names:
        names.append(chief)
    return names


def _format_graphrag_context(candidates_with_paths: list[dict]) -> str:
    """将 GraphRAG 检索到的候选疾病格式化为 LLM 可读的参考上下文（含图路径）。"""
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


def diagnosis_agent(state) -> dict:
    """
    LangGraph节点：从患者信息 + GraphRAG 候选生成鉴别诊断分析。

    读取：state.patient_info
    写入：state.diagnosis, state.candidate_diseases, state.human_review_status, state.current_agent

    完成后设置 human_review_status="awaiting_diagnosis"，
    Pipeline 在此中断，等待医生从3个候选中选择。
    """
    logger.info("diagnosis_agent.start")

    patient_info = state.patient_info
    if not patient_info:
        logger.warning("diagnosis_agent.no_patient_info")
        return {
            "diagnosis": None,
            "current_agent": "diagnosis",
            "errors": state.errors + ["No patient info available for diagnosis"],
        }

    settings = get_settings()
    llm = ChatOpenAI(
        model=settings.openai_model,
        api_key=settings.openai_api_key,
        base_url=settings.openai_base_url or None,
        temperature=0.2,
    )

    # 1. GraphRAG 检索 top3 候选（含图路径）
    # 优先使用 LLM 从患者信息（含主诉长文本）提取标准化症状键
    # LLM 能理解自然语言（"睡不着"→"difficulty_falling_asleep"），绕过别名映射
    symptom_keys = _extract_symptoms_via_llm(patient_info)
    if not symptom_keys:
        # LLM 提取失败（API/网络/JSON 解析），降级到规则方法
        raw_names = _extract_symptom_names(patient_info)
        if raw_names:
            graphrag_service = get_graphrag_service()
            candidates_with_paths = graphrag_service.find_diseases_with_paths(raw_names, top_k=3)
        else:
            candidates_with_paths = []
        logger.info("diagnosis_agent.symptom_extraction_rule", raw=raw_names, count=len(candidates_with_paths))
    else:
        # LLM 提取成功，标准化键绕过别名映射直接匹配
        graphrag_service = get_graphrag_service()
        candidates_with_paths = graphrag_service.find_diseases_with_paths(symptom_keys, top_k=3)
        logger.info("diagnosis_agent.symptom_extraction_llm_ok", keys=symptom_keys, count=len(candidates_with_paths))

    # 2. 构建带图路径的 Prompt
    graphrag_context = ""
    if candidates_with_paths:
        graphrag_context = _format_graphrag_context(candidates_with_paths)
        logger.info("diagnosis_agent.graphrag_hits", count=len(candidates_with_paths))

    patient_json = json.dumps(patient_info, ensure_ascii=False, indent=2)
    full_prompt = f"{DIAGNOSIS_SYSTEM_PROMPT}\n\n{graphrag_context}\n\n患者结构化数据：\n{patient_json}" if graphrag_context else f"{DIAGNOSIS_SYSTEM_PROMPT}\n\n患者结构化数据：\n{patient_json}"

    messages = [
        SystemMessage(content=full_prompt),
        HumanMessage(content="请基于上述患者数据和知识图谱候选，进行鉴别诊断分析。"),
    ]

    # 3. LLM 调用
    try:
        response = llm.invoke(messages)
        content = response.content.strip()
        if content.startswith("```"):
            content = content.split("\n", 1)[1].rsplit("```", 1)[0].strip()

        diagnosis_data = json.loads(content)

        logger.info("diagnosis_agent.success", primary=diagnosis_data.get("primary_recommendation", {}).get("disease_name"))

        return {
            "diagnosis": diagnosis_data,
            "candidate_diseases": candidates_with_paths,
            "human_review_status": "awaiting_diagnosis",
            "current_agent": "diagnosis",
        }

    except json.JSONDecodeError as e:
        logger.error("diagnosis_agent.json_error", error=str(e))
        return {
            "diagnosis": None,
            "candidate_diseases": candidates_with_paths,
            "human_review_status": "awaiting_diagnosis",
            "current_agent": "diagnosis",
            "errors": state.errors + [f"Diagnosis JSON parse error: {e}"],
        }
    except Exception as e:
        logger.error("diagnosis_agent.error", error=str(e))
        return {
            "diagnosis": None,
            "candidate_diseases": candidates_with_paths,
            "human_review_status": "awaiting_diagnosis",
            "current_agent": "diagnosis",
            "errors": state.errors + [f"Diagnosis error: {e}"],
        }
