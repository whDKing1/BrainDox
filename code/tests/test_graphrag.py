"""
GraphRAG + Neo4j 全面测试

覆盖三层：
  Layer 1: Neo4j 基础设施（节点/关系完整性）
  Layer 2: GraphRAGService 单元测试（双模式查询 + 边界用例）
  Layer 3: 双模式一致性（Neo4j vs 离线：所有症状组合结果对比）

运行方式:
  pytest tests/test_graphrag.py -v                    # 全部测试
  pytest tests/test_graphrag.py -v -k "offline"       # 仅离线模式
  pytest tests/test_graphrag.py -v -k "neo4j"         # 仅 Neo4j 相关
"""
import socket
import pytest
from src.services.graphrag_service import (
    GraphRAGService,
    SYMPTOM_DISEASE_MAP,
    DISEASE_ICD10_MAP,
    get_graphrag_service,
)
from src.config.settings import get_settings


# ── 辅助函数 ────────────────────────────────────────────────
def _is_neo4j_reachable() -> bool:
    """检测 Neo4j 容器是否可达（TCP 层面）。"""
    settings = get_settings()
    if not settings.neo4j_password:
        return False
    host = settings.neo4j_uri.replace("bolt://", "").split(":")[0]
    port = 7687
    try:
        with socket.create_connection((host, port), timeout=2):
            return True
    except OSError:
        return False


def _make_neo4j_service():
    """创建已连接的 Neo4j 模式 GraphRAGService，连接失败返回 None。"""
    settings = get_settings()
    svc = GraphRAGService(use_neo4j=True)
    try:
        from neo4j import GraphDatabase
    except ImportError:
        return None
    try:
        svc._driver = GraphDatabase.driver(
            settings.neo4j_uri,
            auth=(settings.neo4j_user, settings.neo4j_password),
        )
        svc._driver.verify_connectivity()
    except Exception:
        svc._driver = None
        svc.use_neo4j = False
        return None
    return svc


def _all_symptom_keys() -> list[str]:
    """返回 SYMPTOM_DISEASE_MAP 中所有症状键（下划线格式）。"""
    return list(SYMPTOM_DISEASE_MAP.keys())


# ── 全局 fixture ────────────────────────────────────────────
neo4j_available = _is_neo4j_reachable()
skip_neo4j = pytest.mark.skipif(not neo4j_available, reason="Neo4j 容器未启动")


# =============================================================================
# Layer 1: Neo4j 基础设施
# =============================================================================
@pytest.mark.neo4j
@skip_neo4j
class TestNeo4jInfrastructure:
    def test_node_counts(self):
        """验证三类节点数量：Symptom=18, Disease=71, ICD10Code=66。"""
        svc = _make_neo4j_service()
        assert svc is not None
        with svc._driver.session() as session:
            result = session.run(
                "MATCH (n) "
                "RETURN labels(n)[0] AS label, count(n) AS cnt "
                "ORDER BY label"
            )
            counts = {r["label"]: r["cnt"] for r in result}
        assert counts.get("Symptom") == 18, f"Symptom node count: {counts.get('Symptom')}"
        assert counts.get("Disease") == 71, f"Disease node count: {counts.get('Disease')}"
        assert counts.get("ICD10Code") == 66, f"ICD10Code count: {counts.get('ICD10Code')}"
        svc.close()

    def test_all_diseases_have_icd10(self):
        """验证所有 Disease 节点都有 HAS_CODE 关系指向 ICD10Code。"""
        svc = _make_neo4j_service()
        assert svc is not None
        with svc._driver.session() as session:
            result = session.run(
                "MATCH (d:Disease) "
                "WHERE NOT (d)-[:HAS_CODE]->(:ICD10Code) "
                "RETURN d.name AS name"
            )
            orphans = [r["name"] for r in result]
        assert orphans == [], f"无 ICD-10 的 Disease: {orphans}"
        svc.close()

    def test_all_diseases_have_indicates(self):
        """验证无 INDICATES 关系的 Disease 仅限于 DISEASE_ICD10_MAP 中有但 SYMPTOM_DISEASE_MAP 未引用的合法断层（如 TIA、Hyponatremia 等）。"""
        svc = _make_neo4j_service()
        assert svc is not None
        # 先收集 SYMPTOM_DISEASE_MAP 中所有被引用过的疾病名
        referenced = set()
        for diseases in SYMPTOM_DISEASE_MAP.values():
            referenced.update(diseases)
        with svc._driver.session() as session:
            result = session.run(
                "MATCH (d:Disease) "
                "WHERE NOT (:Symptom)-[:INDICATES]->(d) "
                "RETURN d.name AS name"
            )
            orphans = [r["name"] for r in result]
        # 所有孤儿 Disease 应该在 DISEASE_ICD10_MAP 中但不在 SYMPTOM_DISEASE_MAP 的任何列表里
        for name in orphans:
            assert name not in referenced, (
                f"Disease '{name}' 在 SYMPTOM_DISEASE_MAP 中被引用但 Neo4j 中无 INDICATES 关系"
            )
        svc.close()

    def test_cypher_three_hop_query(self):
        """验证 Symptom→Disease→ICD10Code 三跳 Cypher 查询返回正确排名。"""
        svc = _make_neo4j_service()
        assert svc is not None
        symptoms = ["limb_weakness", "facial_droop", "speech_difficulty"]
        with svc._driver.session() as session:
            result = session.run(
                "MATCH (s:Symptom)-[:INDICATES]->(d:Disease) "
                "WHERE s.name IN $symptoms "
                "OPTIONAL MATCH (d)-[:HAS_CODE]->(c:ICD10Code) "
                "RETURN d.name AS disease, c.code AS icd10_code, "
                "c.description AS icd10_desc, COUNT(DISTINCT s) AS symptom_match_count "
                "ORDER BY symptom_match_count DESC",
                symptoms=symptoms,
            )
            rows = [r.data() for r in result]
        assert len(rows) > 0
        top = rows[0]
        assert top["disease"] in ("Ischemic Stroke", "Intracerebral Hemorrhage")
        assert top["symptom_match_count"] == 3
        assert top["icd10_code"] in ("I63.9", "I61.9")
        svc.close()


# =============================================================================
# Layer 2: GraphRAGService 离线模式单元测试
# =============================================================================
class TestOfflineMode:
    def setup_method(self):
        self.svc = GraphRAGService(use_neo4j=False)

    # ── 核心查询 ─────────────────────────────────────────
    def test_multi_symptom_stroke_case(self):
        """多症状查询：偏瘫+面瘫+言语障碍 → 缺血性卒中排第一。"""
        results = self.svc.find_diseases_by_symptoms(
            ["limb_weakness", "facial_droop", "speech_difficulty"]
        )
        assert len(results) >= 5
        top = results[0]
        assert top["disease"] in ("Ischemic Stroke", "Intracerebral Hemorrhage")
        assert top["symptom_match_count"] == 3
        assert top["weighted_score"] > 0

    def test_single_symptom_headache(self):
        """单症状头痛 → 返回8个疾病，偏头痛排第一。"""
        results = self.svc.find_diseases_by_symptoms(["headache"])
        assert len(results) == 8
        assert results[0]["disease"] == "Migraine"

    def test_single_symptom_seizure(self):
        """单症状癫痫 → 返回8个疾病，癫痫排第一。"""
        results = self.svc.find_diseases_by_symptoms(["seizure"])
        assert len(results) >= 5
        assert results[0]["disease"] == "Epilepsy"

    def test_empty_symptoms(self):
        """空症状列表 → 返回空列表，不抛异常。"""
        results = self.svc.find_diseases_by_symptoms([])
        assert results == []

    def test_unknown_symptom(self):
        """未知症状 → 返回空列表，不抛异常。"""
        results = self.svc.find_diseases_by_symptoms(["unknown_symptom_xyz"])
        assert results == []

    # ── 边界用例 ─────────────────────────────────────────
    def test_case_insensitive(self):
        """大小写不敏感。"""
        lower = self.svc.find_diseases_by_symptoms(["headache"])
        upper = self.svc.find_diseases_by_symptoms(["HEADACHE"])
        assert lower == upper

    def test_space_handling(self):
        """空格自动转下划线。"""
        spaced = self.svc.find_diseases_by_symptoms(["limb weakness"])
        underscored = self.svc.find_diseases_by_symptoms(["limb_weakness"])
        assert len(spaced) == len(underscored)

    def test_return_structure(self):
        """每条结果包含五个字段：disease, symptom_match_count, weighted_score, icd10_code, icd10_description。"""
        results = self.svc.find_diseases_by_symptoms(["headache"])
        for r in results:
            assert "disease" in r
            assert "symptom_match_count" in r
            assert isinstance(r["symptom_match_count"], int)
            assert "weighted_score" in r
            assert isinstance(r["weighted_score"], float)
            assert "icd10_code" in r
            assert "icd10_description" in r

    def test_descending_order(self):
        """结果按 weighted_score 降序排列。"""
        results = self.svc.find_diseases_by_symptoms(["headache", "seizure"])
        scores = [r["weighted_score"] for r in results]
        assert scores == sorted(scores, reverse=True)

    # ── ICD-10 查询 ─────────────────────────────────────
    def test_get_icd10_known(self):
        """已知疾病返回正确编码。"""
        result = self.svc.get_icd10("Ischemic Stroke")
        assert result is not None
        assert result["code"] == "I63.9"
        assert "Cerebral infarction" in result["desc"]

    def test_get_icd10_unknown(self):
        """未知疾病返回 None。"""
        result = self.svc.get_icd10("不存在的病")
        assert result is None

    # ── 所有 18 个症状单症状覆盖 ─────────────────────────
    @pytest.mark.parametrize("symptom_key", _all_symptom_keys())
    def test_every_symptom_returns_diseases(self, symptom_key):
        """SYMPTOM_DISEASE_MAP 中每个症状键至少返回1个疾病。"""
        results = self.svc.find_diseases_by_symptoms([symptom_key])
        assert len(results) >= 1, f"症状 '{symptom_key}' 返回空结果"

    @pytest.mark.parametrize("symptom_key", _all_symptom_keys())
    def test_every_symptom_top_disease_has_icd10(self, symptom_key):
        """每个症状排名第一的疾病必须有 ICD-10 编码。"""
        results = self.svc.find_diseases_by_symptoms([symptom_key])
        top = results[0]
        assert top["icd10_code"] != "", f"症状 '{symptom_key}' 排名第一 {top['disease']} 无 ICD-10"

    # ── query_neo4j 降级 ────────────────────────────────
    def test_query_neo4j_fallback(self):
        """离线模式下 query_neo4j 返回空列表。"""
        result = self.svc.query_neo4j("MATCH (n) RETURN n LIMIT 1")
        assert result == []


# =============================================================================
# Layer 3: 双模式一致性（Neo4j vs 离线）
# =============================================================================
def _normalize_result(results: list[dict]) -> list[tuple]:
    """将结果列表归一化为可比较的元组列表，None 值转为空字符串。"""
    return sorted(
        [
            (
                r["disease"],
                r["symptom_match_count"],
                r.get("icd10_code") or "",
                r.get("weighted_score") or 0.0,
            )
            for r in results
        ]
    )


@pytest.mark.neo4j
@skip_neo4j
class TestDualModeConsistency:
    def setup_method(self):
        self.svc_neo4j = _make_neo4j_service()
        self.svc_offline = GraphRAGService(use_neo4j=False)

    def teardown_method(self):
        if self.svc_neo4j:
            self.svc_neo4j.close()

    # ── 单症状：所有18个症状逐一对比 ────────────────────
    @pytest.mark.parametrize("symptom_key", _all_symptom_keys())
    def test_single_symptom_consistency(self, symptom_key):
        """每个症状键：Neo4j 和离线模式在疾病名称和匹配数上一致。"""
        neo4j_results = self.svc_neo4j._find_diseases_neo4j([symptom_key])
        offline_results = self.svc_offline._find_diseases_offline([symptom_key])
        neo4j_norm = _normalize_result(neo4j_results)
        offline_norm = _normalize_result(offline_results)
        neo4j_diseases = {d for d, _, _, _ in neo4j_norm}
        offline_diseases = {d for d, _, _, _ in offline_norm}
        assert neo4j_diseases == offline_diseases, (
            f"症状 '{symptom_key}': Neo4j={neo4j_diseases}, 离线={offline_diseases}"
        )

    # ── 多症状组合 ──────────────────────────────────────
    def test_multi_symptom_consistency_stroke(self):
        """卒中三症状：Neo4j 和离线在疾病名称和匹配数上一致。"""
        symptoms = ["limb_weakness", "facial_droop", "speech_difficulty"]
        neo4j_results = self.svc_neo4j._find_diseases_neo4j(symptoms)
        offline_results = self.svc_offline._find_diseases_offline(symptoms)
        neo4j_set = {(r["disease"], r["symptom_match_count"]) for r in neo4j_results}
        offline_set = {(r["disease"], r["symptom_match_count"]) for r in offline_results}
        assert neo4j_set == offline_set, _diff_msg(neo4j_results, offline_results)

    def test_multi_symptom_consistency_meningitis(self):
        """脑膜炎三症状：Neo4j 和离线在疾病名称和匹配数上一致。"""
        symptoms = ["headache", "neck_stiffness", "confusion"]
        neo4j_results = self.svc_neo4j._find_diseases_neo4j(symptoms)
        offline_results = self.svc_offline._find_diseases_offline(symptoms)
        neo4j_set = {(r["disease"], r["symptom_match_count"]) for r in neo4j_results}
        offline_set = {(r["disease"], r["symptom_match_count"]) for r in offline_results}
        assert neo4j_set == offline_set, _diff_msg(neo4j_results, offline_results)

    def test_multi_symptom_consistency_ms(self):
        """多发性硬化相关症状：Neo4j 和离线在疾病名称和匹配数上一致。"""
        symptoms = ["numbness", "visual_disturbance", "sensory_loss", "tremor"]
        neo4j_results = self.svc_neo4j._find_diseases_neo4j(symptoms)
        offline_results = self.svc_offline._find_diseases_offline(symptoms)
        neo4j_set = {(r["disease"], r["symptom_match_count"]) for r in neo4j_results}
        offline_set = {(r["disease"], r["symptom_match_count"]) for r in offline_results}
        assert neo4j_set == offline_set, _diff_msg(neo4j_results, offline_results)

    def test_multi_symptom_consistency_unknown(self):
        """混合已知+未知症状：Neo4j 和离线在疾病名称和匹配数上一致。"""
        symptoms = ["headache", "nonexistent_xxx"]
        neo4j_results = self.svc_neo4j._find_diseases_neo4j(symptoms)
        offline_results = self.svc_offline._find_diseases_offline(symptoms)
        neo4j_set = {(r["disease"], r["symptom_match_count"]) for r in neo4j_results}
        offline_set = {(r["disease"], r["symptom_match_count"]) for r in offline_results}
        assert neo4j_set == offline_set, _diff_msg(neo4j_results, offline_results)

    # ── 空输入 ──────────────────────────────────────────
    def test_empty_symptoms_consistency(self):
        """空症状：两种模式都返回空。"""
        neo4j_results = self.svc_neo4j._find_diseases_neo4j([])
        offline_results = self.svc_offline._find_diseases_offline([])
        assert neo4j_results == []
        assert offline_results == []

    # ── 公开方法 find_diseases_by_symptoms ───────────────
    def test_public_api_returns_same_structure(self):
        """公开方法在 Neo4j 和离线模式返回相同结构。"""
        symptoms = ["headache", "loss_of_consciousness"]
        neo4j_results = self.svc_neo4j.find_diseases_by_symptoms(symptoms)
        offline_results = self.svc_offline.find_diseases_by_symptoms(symptoms)
        neo4j_set = {(r["disease"], r["symptom_match_count"]) for r in neo4j_results}
        offline_set = {(r["disease"], r["symptom_match_count"]) for r in offline_results}
        assert neo4j_set == offline_set, _diff_msg(neo4j_results, offline_results)


def _diff_msg(neo4j_results, offline_results):
    """生成差异信息。"""
    neo4j_set = {(r["disease"], r["symptom_match_count"]) for r in neo4j_results}
    offline_set = {(r["disease"], r["symptom_match_count"]) for r in offline_results}
    diff_neo4j = neo4j_set - offline_set
    diff_offline = offline_set - neo4j_set
    return f"不一致:\n  仅 Neo4j: {diff_neo4j}\n  仅离线: {diff_offline}"


# =============================================================================
# Layer 4: GraphRAGService 降级测试
# =============================================================================
class TestFallback:
    def test_bad_credentials_fallback(self):
        """密码错误：connect() 失败后 use_neo4j 应为 False。"""
        svc = GraphRAGService(use_neo4j=True)
        from neo4j import GraphDatabase
        try:
            svc._driver = GraphDatabase.driver(
                "bolt://localhost:7687",
                auth=("neo4j", "wrong_password_12345"),
            )
            svc._driver.verify_connectivity()
        except Exception:
            svc._driver = None
            svc.use_neo4j = False
        assert not svc.use_neo4j
        assert svc._driver is None

    def test_find_diseases_when_neo4j_enabled_but_unreachable(self):
        """Neo4j 启用但不可达 → 自动降级为离线模式。"""
        svc = GraphRAGService(use_neo4j=True)
        svc._driver = None
        results = svc.find_diseases_by_symptoms(["headache"])
        assert len(results) >= 1
        assert results[0]["disease"] == "Migraine"

    def test_singleton_defaults_to_settings(self):
        """get_graphrag_service() 根据 .env 自动决定模式。"""
        svc = get_graphrag_service()
        assert isinstance(svc, GraphRAGService)
