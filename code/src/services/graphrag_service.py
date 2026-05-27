# =============================================================================
# GraphRAG 服务 —— 医学知识图谱检索
# =============================================================================
# 本文件是项目 RAG（检索增强生成）的核心实现，采用 GraphRAG 架构：
#   传统 RAG：向量数据库做语义相似度搜索，只能找到"表面相似"的文本片段
#   GraphRAG：用知识图谱（Neo4j）存储实体和关系，支持"症状→疾病→治疗"多跳推理
#
# 双模式运行：
#   生产模式：连接 Neo4j 图数据库，执行 Cypher 查询，支持多跳推理
#   离线模式：使用内置的 SYMPTOM_DISEASE_MAP / DISEASE_ICD10_MAP 字典，
#             Neo4j 不可用时自动降级，确保演示和测试不中断
#
# 核心入口：
#   get_graphrag_service() —— 全局单例工厂函数
#   find_diseases_by_symptoms() —— 根据症状列表匹配候选疾病并排名
# =============================================================================

"""
GraphRAG service — Medical knowledge graph retrieval.

Integrates with Neo4j to provide:
  - Symptom-to-disease relationship queries
  - Disease-to-treatment pathway lookups
  - Multi-hop reasoning across medical ontologies (UMLS, SNOMED, ICD)
  - Evidence retrieval for clinical decision support
"""

from __future__ import annotations
from typing import Optional
import structlog

from ..config.settings import get_settings

logger = structlog.get_logger(__name__)

# =============================================================================
# 预置知识库 —— 离线/演示模式
# =============================================================================

# SYMPTOM_DISEASE_MAP:
# 一个字典，键是症状名称（小写、下划线分隔），值是与该症状相关联的可能疾病列表。
# 这是简化版的医学知识图谱，在无法连接 Neo4j 时使用。
# 真实场景中，这些数据来自 UMLS、SNOMED 等大型本体，通过 Neo4j 的多跳查询获得。
SYMPTOM_DISEASE_MAP = {
    "headache": ["Migraine", "Tension Headache", "Subarachnoid Hemorrhage", "Meningitis", "Intracranial Hypertension", "Brain Tumor", "Giant Cell Arteritis", "Cerebral Venous Sinus Thrombosis"],
    "seizure": ["Epilepsy", "Brain Tumor", "Ischemic Stroke", "Intracerebral Hemorrhage", "Meningitis", "Encephalitis", "CNS Vasculitis", "Hyponatremia"],
    "limb_weakness": ["Ischemic Stroke", "Intracerebral Hemorrhage", "Guillain-Barre Syndrome", "Multiple Sclerosis", "Spinal Cord Compression", "Myasthenia Gravis", "ALS", "Cervical Myelopathy"],
    "numbness": ["Multiple Sclerosis", "Peripheral Neuropathy", "Spinal Cord Compression", "Ischemic Stroke", "Vitamin B12 Deficiency", "Cervical Radiculopathy", "Transverse Myelitis"],
    "tremor": ["Parkinson Disease", "Essential Tremor", "Wilson Disease", "Multiple Sclerosis", "Cerebellar Degeneration", "Hyperthyroidism", "Drug-induced Tremor"],
    "visual_disturbance": ["Optic Neuritis", "Multiple Sclerosis", "Pituitary Tumor", "Intracranial Hypertension", "Migraine with Aura", "Temporal Arteritis", "Stroke"],
    "dizziness": ["BPPV", "Vestibular Neuritis", "Meniere Disease", "Posterior Circulation Stroke", "Vestibular Migraine", "Cerebellar Stroke", "Orthostatic Hypotension"],
    "speech_difficulty": ["Ischemic Stroke", "Intracerebral Hemorrhage", "Migraine with Aura", "Brain Tumor", "ALS", "Multiple Sclerosis"],
    "confusion": ["Encephalitis", "Meningitis", "Hepatic Encephalopathy", "Wernicke Encephalopathy", "Seizure Post-ictal", "Subdural Hematoma", "Alzheimer Disease"],
    "gait_disturbance": ["Parkinson Disease", "Normal Pressure Hydrocephalus", "Cerebellar Degeneration", "Multiple Sclerosis", "Spinal Cord Compression", "Vitamin B12 Deficiency", "Peripheral Neuropathy"],
    "memory_loss": ["Alzheimer Disease", "Vascular Dementia", "Frontotemporal Dementia", "Lewy Body Dementia", "Wernicke-Korsakoff Syndrome", "Normal Pressure Hydrocephalus", "Hypothyroidism"],
    "neck_stiffness": ["Meningitis", "Subarachnoid Hemorrhage", "Cervical Spondylosis", "Encephalitis", "Cerebral Malaria"],
    "facial_droop": ["Ischemic Stroke", "Bell Palsy", "Intracerebral Hemorrhage", "Lyme Disease", "Guillain-Barre Syndrome"],
    "double_vision": ["Myasthenia Gravis", "Multiple Sclerosis", "Brainstem Stroke", "Cavernous Sinus Thrombosis", "Wernicke Encephalopathy", "Third Nerve Palsy"],
    "muscle_cramps": ["ALS", "Peripheral Neuropathy", "Multiple Sclerosis", "Spinal Muscular Atrophy", "Electrolyte Imbalance", "Motor Neuron Disease"],
    "sensory_loss": ["Multiple Sclerosis", "Spinal Cord Compression", "Peripheral Neuropathy", "Ischemic Stroke", "Vitamin B12 Deficiency", "Transverse Myelitis", "Syringomyelia"],
    "involuntary_movements": ["Huntington Disease", "Tardive Dyskinesia", "Wilson Disease", "Sydenham Chorea", "Drug-induced Movement Disorder", "Parkinson Disease"],
    "loss_of_consciousness": ["Epilepsy", "Subarachnoid Hemorrhage", "Cardiac Syncope", "Intracerebral Hemorrhage", "Meningitis", "Encephalitis", "Basilar Migraine"],
}

# DISEASE_ICD10_MAP:
# 将疾病名称映射到 ICD-10 编码及官方描述。
# 每个疾病对应一个字典，包含 code（ICD-10 代码）和 desc（官方描述）。
# 例如：肺炎对应 J18.9 “未指明的肺炎”。
DISEASE_ICD10_MAP = {
    "Ischemic Stroke": {"code": "I63.9", "desc": "Cerebral infarction, unspecified"},
    "Intracerebral Hemorrhage": {"code": "I61.9", "desc": "Nontraumatic intracerebral hemorrhage, unspecified"},
    "Subarachnoid Hemorrhage": {"code": "I60.9", "desc": "Nontraumatic subarachnoid hemorrhage, unspecified"},
    "TIA": {"code": "G45.9", "desc": "Transient cerebral ischemic attack, unspecified"},
    "Migraine": {"code": "G43.909", "desc": "Migraine, unspecified, not intractable"},
    "Tension Headache": {"code": "G44.209", "desc": "Tension-type headache, unspecified, not intractable"},
    "Epilepsy": {"code": "G40.909", "desc": "Epilepsy, unspecified, not intractable"},
    "Parkinson Disease": {"code": "G20", "desc": "Parkinson disease"},
    "Multiple Sclerosis": {"code": "G35", "desc": "Multiple sclerosis"},
    "Alzheimer Disease": {"code": "G30.9", "desc": "Alzheimer disease, unspecified"},
    "Guillain-Barre Syndrome": {"code": "G61.0", "desc": "Guillain-Barre syndrome"},
    "Myasthenia Gravis": {"code": "G70.00", "desc": "Myasthenia gravis without (acute) exacerbation"},
    "Meningitis": {"code": "G03.9", "desc": "Meningitis, unspecified"},
    "Encephalitis": {"code": "G04.90", "desc": "Encephalitis and encephalomyelitis, unspecified"},
    "Brain Tumor": {"code": "C71.9", "desc": "Malignant neoplasm of brain, unspecified"},
    "Bell Palsy": {"code": "G51.0", "desc": "Bell palsy"},
    "BPPV": {"code": "H81.10", "desc": "Benign paroxysmal vertigo, unspecified ear"},
    "ALS": {"code": "G12.21", "desc": "Amyotrophic lateral sclerosis"},
    "Peripheral Neuropathy": {"code": "G64", "desc": "Other disorders of peripheral nervous system"},
    "Essential Tremor": {"code": "G25.0", "desc": "Essential tremor"},
    "Huntington Disease": {"code": "G10", "desc": "Huntington disease"},
    "Wilson Disease": {"code": "E83.01", "desc": "Wilson disease"},
    "Normal Pressure Hydrocephalus": {"code": "G91.2", "desc": "Normal pressure hydrocephalus"},
    "Spinal Cord Compression": {"code": "G95.19", "desc": "Other vascular myelopathies"},
    "Optic Neuritis": {"code": "G36.0", "desc": "Neuromyelitis optica"},
    "Vascular Dementia": {"code": "F01.50", "desc": "Vascular dementia without behavioral disturbance"},
    "Frontotemporal Dementia": {"code": "G31.09", "desc": "Other frontotemporal degeneration"},
    "Lewy Body Dementia": {"code": "G31.83", "desc": "Dementia with Lewy bodies"},
    "Cerebral Venous Sinus Thrombosis": {"code": "I63.6", "desc": "Cerebral infarction due to cerebral venous thrombosis"},
    "CNS Vasculitis": {"code": "I67.7", "desc": "Cerebral arteritis, not elsewhere classified"},
    "Transverse Myelitis": {"code": "G37.3", "desc": "Acute transverse myelitis in demyelinating disease"},
    "Wernicke Encephalopathy": {"code": "E51.2", "desc": "Wernicke encephalopathy"},
    "Subdural Hematoma": {"code": "S06.5X9", "desc": "Traumatic subdural hemorrhage"},
    "Syringomyelia": {"code": "G95.0", "desc": "Syringomyelia and syringobulbia"},
    "Cervical Myelopathy": {"code": "M47.12", "desc": "Other spondylosis with myelopathy, cervical region"},
    "Cerebellar Degeneration": {"code": "G31.2", "desc": "Degeneration of nervous system due to alcohol"},
    "Meniere Disease": {"code": "H81.09", "desc": "Meniere disease, unspecified ear"},
    "Vestibular Neuritis": {"code": "H81.2", "desc": "Vestibular neuronitis"},
    "Giant Cell Arteritis": {"code": "M31.5", "desc": "Giant cell arteritis with polymyalgia rheumatica"},
    "Intracranial Hypertension": {"code": "G93.2", "desc": "Benign intracranial hypertension"},
    "Hyponatremia": {"code": "E87.1", "desc": "Hypo-osmolality and hyponatremia"},
    "Vitamin B12 Deficiency": {"code": "E53.8", "desc": "Deficiency of other specified B group vitamins"},
    "Cervical Radiculopathy": {"code": "M54.12", "desc": "Radiculopathy, cervical region"},
    "Hyperthyroidism": {"code": "E05.90", "desc": "Thyrotoxicosis, unspecified without thyrotoxic crisis or storm"},
    "Drug-induced Tremor": {"code": "G25.1", "desc": "Drug-induced tremor"},
    "Pituitary Tumor": {"code": "D35.2", "desc": "Benign neoplasm of pituitary gland"},
    "Migraine with Aura": {"code": "G43.109", "desc": "Migraine with aura, not intractable, without status migrainosus"},
    "Temporal Arteritis": {"code": "M31.5", "desc": "Giant cell arteritis with polymyalgia rheumatica"},
    "Stroke": {"code": "I64", "desc": "Stroke, not specified as hemorrhage or infarction"},
    "Posterior Circulation Stroke": {"code": "I63.9", "desc": "Cerebral infarction, unspecified"},
    "Vestibular Migraine": {"code": "G43.801", "desc": "Vestibular migraine, not intractable, without status migrainosus"},
    "Cerebellar Stroke": {"code": "I63.9", "desc": "Cerebral infarction, unspecified"},
    "Orthostatic Hypotension": {"code": "I95.1", "desc": "Orthostatic hypotension"},
    "Hepatic Encephalopathy": {"code": "K72.90", "desc": "Hepatic failure, unspecified without coma"},
    "Seizure Post-ictal": {"code": "R56.8", "desc": "Other and unspecified convulsions"},
    "Wernicke-Korsakoff Syndrome": {"code": "F10.26", "desc": "Alcohol dependence with alcohol-induced persisting amnestic disorder"},
    "Hypothyroidism": {"code": "E03.9", "desc": "Hypothyroidism, unspecified"},
    "Cervical Spondylosis": {"code": "M47.812", "desc": "Spondylosis without myelopathy or radiculopathy, cervical region"},
    "Cerebral Malaria": {"code": "B50.0", "desc": "Plasmodium falciparum malaria with cerebral complications"},
    "Lyme Disease": {"code": "A69.20", "desc": "Lyme disease, unspecified"},
    "Brainstem Stroke": {"code": "I63.9", "desc": "Cerebral infarction, unspecified"},
    "Cavernous Sinus Thrombosis": {"code": "G08", "desc": "Intracranial and intraspinal phlebitis and thrombophlebitis"},
    "Third Nerve Palsy": {"code": "H49.00", "desc": "Third [oculomotor] nerve palsy, unspecified eye"},
    "Spinal Muscular Atrophy": {"code": "G12.9", "desc": "Spinal muscular atrophy, unspecified"},
    "Electrolyte Imbalance": {"code": "E87.8", "desc": "Other disorders of electrolyte and fluid balance, not elsewhere classified"},
    "Motor Neuron Disease": {"code": "G12.20", "desc": "Motor neuron disease, unspecified"},
    "Tardive Dyskinesia": {"code": "G24.01", "desc": "Drug induced subacute dyskinesia"},
    "Sydenham Chorea": {"code": "I02.0", "desc": "Rheumatic chorea with heart involvement"},
    "Drug-induced Movement Disorder": {"code": "G25.70", "desc": "Drug induced movement disorder, unspecified"},
    "Cardiac Syncope": {"code": "R55", "desc": "Syncope and collapse"},
    "Basilar Migraine": {"code": "G43.109", "desc": "Migraine with aura, not intractable, without status migrainosus"},
}


class GraphRAGService:
    """
    Medical knowledge graph retrieval service.

    In production, this connects to Neo4j and performs Cypher queries.
    For demo/testing, uses the built-in knowledge maps above.

    设计要点：
    - 使用 Neo4j 图形数据库存储复杂的医疗本体（如 UMLS、SNOMED）。
    - 当 Neo4j 不可用时，自动降级为本地预置词典，确保演示或测试不中断。
    - 通过症状匹配进行疾病检索，并返回 ICD-10 编码以辅助编码代理。
    """

    def __init__(self, use_neo4j: bool = False):
        """
        初始化服务。
        参数:
            use_neo4j: 是否尝试连接 Neo4j。即使设为 True，连接失败也会自动降级（fallback）。
        """
        self.use_neo4j = use_neo4j
        self._driver = None


    async def connect(self):
        """
        同步连接到 Neo4j 数据库（使用同步驱动，与 find_diseases_by_symptoms 保持一致）。
        如果 use_neo4j 为 True，尝试建立连接并验证连通性。
        连接失败则自动降级为离线模式。
        """
        if self.use_neo4j:
            try:
                from neo4j import GraphDatabase
                settings = get_settings()
                self._driver = GraphDatabase.driver(
                    settings.neo4j_uri,
                    auth=(settings.neo4j_user, settings.neo4j_password),
                )
                self._driver.verify_connectivity()
                logger.info("graphrag.neo4j_connected")
            except Exception as e:
                logger.warning("graphrag.neo4j_fallback", error=str(e))
                self.use_neo4j = False
                self._driver = None

    def find_diseases_by_symptoms(self, symptoms: list[str]) -> list[dict]:
        """
        根据症状列表查找候选疾病（双模式：Neo4j 优先，离线兜底）。

        Neo4j 模式：一条 Cypher 完成 Symptom→Disease→ICD10Code 三跳查询。
        离线模式：使用内置 SYMPTOM_DISEASE_MAP 投票计数 + DISEASE_ICD10_MAP 补全编码。

        返回:
            列表，每项包含 disease, symptom_match_count, icd10_code, icd10_description。
        """
        if self.use_neo4j and self._driver:
            try:
                return self._find_diseases_neo4j(symptoms)
            except Exception as e:
                logger.warning("graphrag.neo4j_query_failed_fallback", error=str(e))
        return self._find_diseases_offline(symptoms)

    def _find_diseases_neo4j(self, symptoms: list[str]) -> list[dict]:
        """使用 Cypher 在 Neo4j 中执行 Symptom→Disease→ICD10Code 三跳查询。"""
        normalized = [s.lower().replace(" ", "_") for s in symptoms]
        with self._driver.session() as session:
            result = session.run(
                "MATCH (s:Symptom)-[:INDICATES]->(d:Disease) "
                "WHERE s.name IN $symptoms "
                "OPTIONAL MATCH (d)-[:HAS_CODE]->(c:ICD10Code) "
                "RETURN d.name AS disease, c.code AS icd10_code, c.description AS icd10_desc, "
                "COUNT(DISTINCT s) AS symptom_match_count "
                "ORDER BY symptom_match_count DESC",
                symptoms=normalized,
            )
            results = []
            for record in result:
                data = record.data()
                if data.get("icd10_code") is None:
                    data["icd10_code"] = ""
                if data.get("icd10_desc") is None:
                    data["icd10_desc"] = ""
                results.append(data)
            return results

    def _find_diseases_offline(self, symptoms: list[str]) -> list[dict]:
        """离线模式：使用内置 SYMPTOM_DISEASE_MAP 投票计数。"""
        disease_scores: dict[str, int] = {}
        for symptom in symptoms:
            key = symptom.lower().replace(" ", "_")
            for disease in SYMPTOM_DISEASE_MAP.get(key, []):
                disease_scores[disease] = disease_scores.get(disease, 0) + 1
        ranked = sorted(disease_scores.items(), key=lambda x: x[1], reverse=True)
        results = []
        for disease, score in ranked:
            icd = DISEASE_ICD10_MAP.get(disease, {})
            results.append({
                "disease": disease,
                "symptom_match_count": score,
                "icd10_code": icd.get("code", ""),
                "icd10_description": icd.get("desc", ""),
            })
        return results

    def get_icd10(self, disease_name: str) -> Optional[dict]:
        """
        根据疾病名称查找对应的 ICD-10 信息。
        如果疾病不在映射表中，返回 None。
        """
        return DISEASE_ICD10_MAP.get(disease_name)

    def query_neo4j(self, cypher: str, params: dict = None) -> list[dict]:
        """在 Neo4j 中执行 Cypher 查询（同步）。若 driver 未初始化则降级返回空列表。"""
        if not self._driver:
            logger.warning("graphrag.neo4j_not_connected")
            return []
        with self._driver.session() as session:
            result = session.run(cypher, params or {})
            return [record.data() for record in result]

    def close(self):
        """关闭 Neo4j 驱动连接，释放资源。"""
        if self._driver:
            self._driver.close()
            self._driver = None

# =============================================================================
# 单例模式：全局唯一的 GraphRAGService 实例
# =============================================================================

# 模块级变量，保存实例。初始为 None。
_service: Optional[GraphRAGService] = None


def get_graphrag_service() -> GraphRAGService:
    """
    获取全局唯一的 GraphRAGService 实例（单例模式）。
    读取配置中的 neo4j_password：有值则自动启用 Neo4j 模式，否则使用离线字典。
    """
    global _service
    if _service is None:
        settings = get_settings()
        use_neo4j = bool(settings.neo4j_password)
        _service = GraphRAGService(use_neo4j=use_neo4j)
        logger.info("graphrag.mode", use_neo4j=use_neo4j)
    return _service
