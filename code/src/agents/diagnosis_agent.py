"""
Diagnosis Agent — Differential diagnosis based on structured patient data.

Responsibilities:
  - Analyze symptoms + lab results against medical knowledge
  - Generate ranked differential diagnosis list with confidence scores
  - Provide evidence chains for each candidate diagnosis
  - Recommend additional tests if information is insufficient
  - Integrates with GraphRAG knowledge graph when available
"""

from __future__ import annotations
import json
import structlog
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI

from ..config.settings import get_settings
from ..graph.state import MAX_DIAGNOSIS_RETRIES
from ..services.graphrag_service import get_graphrag_service

logger = structlog.get_logger(__name__)

DIAGNOSIS_SYSTEM_PROMPT = """You are an expert neurologist performing differential diagnosis for neurological and brain diseases. Given structured patient information (including neurological exam and neuroimaging), provide a comprehensive neurological differential diagnosis.

You specialize in: cerebrovascular diseases (stroke, TIA, SAH, ICH), epilepsy and seizure disorders, neurodegenerative diseases (Parkinson's, Alzheimer's, ALS), demyelinating diseases (MS, ADEM), neuroinflammatory diseases (meningitis, encephalitis, GBS), brain tumors, headache disorders (migraine, cluster, tension-type), peripheral neuropathies, movement disorders, neuromuscular junction disorders (myasthenia gravis), and spinal cord diseases.

Return a JSON object with this structure:
{
  "primary_diagnosis": {
    "disease_name": "most likely neurological diagnosis",
    "icd10_hint": "approximate ICD-10 code (e.g., I63.9, G40.9, G20, G35)",
    "confidence": 0.85,
    "evidence": ["supporting finding 1", "supporting finding 2"],
    "reasoning": "clinical reasoning with neuroanatomical localization"
  },
  "differential_list": [
    {
      "disease_name": "alternative neurological diagnosis",
      "icd10_hint": "ICD-10 code",
      "confidence": 0.6,
      "evidence": ["evidence 1"],
      "reasoning": "why this is considered"
    }
  ],
  "neuroanatomical_localization": {
    "location": "e.g., left MCA territory, brainstem, spinal cord T8, peripheral nerve",
    "reasoning": "evidence supporting this localization"
  },
  "recommended_tests": ["test 1 to confirm/rule out", "test 2"],
  "clinical_notes": "overall neurological impression",
  "knowledge_sources": ["guideline or reference, e.g., AHA/ASA Guidelines, ILAE classification"],
  "needs_more_info": false
}

Rules:
- Confidence scores must be between 0 and 1.
- Provide at least 2-3 differential diagnoses specific to neurology.
- List evidence from the patient data that supports each diagnosis.
- Always provide neuroanatomical localization when possible (where in the nervous system is the lesion?).
- For stroke: specify ischemic vs hemorrhagic, vascular territory, and note time since onset (critical for thrombolysis decisions).
- For seizures: classify by type (focal vs generalized) and etiology when possible.
- If critical information is missing (e.g., no imaging for stroke, no EEG for seizures), set needs_more_info to true.
- Use standard neurological terminology and ICD-10 code hints (G00-G99 for nervous system, I60-I69 for cerebrovascular).
- Return ONLY valid JSON, no markdown fences."""


def _extract_symptom_names(patient_info: dict) -> list[str]:
    """从 patient_info 字典中提取症状名称列表，供 GraphRAG 检索使用。"""
    names = []
    # 从 symptoms 列表中提取每个症状的 name 字段
    for symptom in patient_info.get("symptoms", []):
        if isinstance(symptom, dict) and symptom.get("name"):
            names.append(symptom["name"])
    # 如果有 chief_complaint，也作为症状线索加入
    chief = patient_info.get("chief_complaint", "")
    if chief and chief not in names:
        names.append(chief)
    return names


def _format_graphrag_context(candidate_diseases: list[dict]) -> str:
    """将 GraphRAG 检索到的候选疾病格式化为 LLM 可读的参考上下文。"""
    lines = [
        "=== Knowledge Graph Reference (GraphRAG) ===",
        "The following diseases are highly associated with the patient's symptoms, ranked by symptom match count. Please prioritize these in your differential diagnosis:\n",
    ]
    for i, cd in enumerate(candidate_diseases, 1):
        line = f"{i}. {cd['disease']} (matched {cd['symptom_match_count']} symptom(s))"
        if cd.get("icd10_code"):
            line += f" — ICD-10: {cd['icd10_code']}"
        if cd.get("icd10_description"):
            line += f", {cd['icd10_description']}"
        lines.append(line)
    lines.append("\n=== End of Knowledge Graph Reference ===")
    return "\n".join(lines)


def diagnosis_agent(state) -> dict:
    """
    LangGraph node: Generate differential diagnosis from patient info.
    Reads: state.patient_info
    Writes: state.diagnosis, state.needs_more_info, state.current_agent
    """
    logger.info("diagnosis_agent.start")

    patient_info = state.patient_info
    if not patient_info:
        # patient_info 为空时，无法做诊断，必须回退。
        # 同时递增重试计数，防止因上游持续失败导致的无限回环。
        new_count = state.diagnosis_retry_count + 1
        logger.warning(
            "diagnosis_agent.no_patient_info",
            retry_count=new_count,
            max_retries=MAX_DIAGNOSIS_RETRIES,
        )
        return {
            "diagnosis": None,
            "needs_more_info": True,
            "diagnosis_retry_count": new_count,
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

    # -------------------------------------------------------------------------
    # 3. GraphRAG 知识图谱检索：从症状提取候选疾病
    # -------------------------------------------------------------------------
    # 从 patient_info 中提取症状名称列表，调用 GraphRAG 服务的
    # find_diseases_by_symptoms() 方法，获取按匹配度排序的候选疾病。
    # 这些候选疾病将作为 LLM 的参考信息注入 Prompt，引导 LLM 重点关注
    # 知识图谱中与患者症状高度关联的疾病，减少幻觉和遗漏。
    symptom_names = _extract_symptom_names(patient_info)
    graphrag_context = ""
    if symptom_names:
        graphrag_service = get_graphrag_service()
        candidate_diseases = graphrag_service.find_diseases_by_symptoms(symptom_names)
        if candidate_diseases:
            graphrag_context = _format_graphrag_context(candidate_diseases)
            logger.info(
                "diagnosis_agent.graphrag_hits",
                symptom_count=len(symptom_names),
                candidate_count=len(candidate_diseases),
                top3=[d["disease"] for d in candidate_diseases[:3]],
            )

    # -------------------------------------------------------------------------
    # 4. 准备 LLM 输入
    # -------------------------------------------------------------------------
    patient_summary = json.dumps(patient_info, indent=2, ensure_ascii=False)
    # 构建 HumanMessage：如果有 GraphRAG 候选疾病，在患者信息前插入参考上下文，
    # 明确告诉 LLM 这些是知识图谱检索出的高关联疾病，请重点考虑。
    human_content = ""
    if graphrag_context:
        human_content += f"{graphrag_context}\n\n"
    human_content += f"Patient information:\n\n{patient_summary}\n\nProvide your differential diagnosis."
    messages = [
        SystemMessage(content=DIAGNOSIS_SYSTEM_PROMPT),
        HumanMessage(content=human_content),
    ]

    try:
        response = llm.invoke(messages)
        content = response.content.strip()
        if content.startswith("```"):
            content = content.split("\n", 1)[1].rsplit("```", 1)[0].strip()


        diagnosis_data = json.loads(content)
        # 从诊断字典中提取并移除 "needs_more_info" 字段，方便单独处理。
        # pop 的第二个参数 False 是默认值，如果字段不存在则返回 False。
        needs_more = diagnosis_data.pop("needs_more_info", False)

        # 诊断回环计数器：当 LLM 判定信息不足需要回退时，计数 +1。
        # 如果 needs_more 为 False，计数器保持不变（不重置，因为同一轮 Pipeline
        # 中之前的回退记录仍有意义——路由函数需要知道累计回退了几次）。
        new_count = state.diagnosis_retry_count + 1 if needs_more else state.diagnosis_retry_count

        # 记录诊断成功日志，特别打印出首要诊断的名称，方便追踪。
        logger.info(
            "diagnosis_agent.success",
            primary=diagnosis_data.get("primary_diagnosis", {}).get("disease_name"),# 先安全地获取 primary_diagnosis 内部的 disease_name，如果不存在就用空字符串。
            needs_more_info=needs_more,
            retry_count=new_count,
        )
        return {
            "diagnosis": diagnosis_data,
            "needs_more_info": needs_more,
            "diagnosis_retry_count": new_count,
            "current_agent": "diagnosis",
        }

    # -------------------------------------------------------------------------
    # 5. 错误处理
    # -------------------------------------------------------------------------
    # 如果 LLM 返回的内容无法解析为 JSON。
    except json.JSONDecodeError as e:
        logger.error("diagnosis_agent.json_error", error=str(e))
        return {
            "diagnosis": None,
            "needs_more_info": False,
            "diagnosis_retry_count": state.diagnosis_retry_count,
            "current_agent": "diagnosis",
            "errors": state.errors + [f"Diagnosis JSON parse error: {e}"],
        }
    except Exception as e:
        logger.error("diagnosis_agent.error", error=str(e))
        return {
            "diagnosis": None,
            "needs_more_info": False,
            "diagnosis_retry_count": state.diagnosis_retry_count,
            "current_agent": "diagnosis",
            "errors": state.errors + [f"Diagnosis error: {e}"],
        }
