"""
Neo4j 知识图谱种子数据导入脚本

将 graphrag_service.py 中的 SYMPTOM_DISEASE_MAP、SYMPTOM_WEIGHTS、
SYMPTOM_ALIASES 和 DISEASE_ICD10_MAP 导入 Neo4j，构建三节点链式图结构：

    (:Symptom) -[:INDICATES]-> (:Disease) -[:HAS_CODE]-> (:ICD10Code)

新增改进：
  - Symptom 节点增加 aliases 属性（同义词列表）
  - INDICATES 关系增加 weight 属性（0.0-1.0 关联强度）

运行时自动从 .env 读取 Neo4j 连接配置。
使用 MERGE 避免重复创建，可安全多次执行。
"""
from neo4j import GraphDatabase
from src.services.graphrag_service import (
    SYMPTOM_DISEASE_MAP,
    SYMPTOM_WEIGHTS,
    SYMPTOM_ALIASES,
    DISEASE_ICD10_MAP,
)
from src.config.settings import get_settings


def seed_knowledge_graph():
    """将症状-疾病-ICD10编码映射导入Neo4j图数据库"""
    settings = get_settings()
    uri = f"bolt://{settings.neo4j_uri.replace('bolt://', '')}" if "bolt://" not in settings.neo4j_uri else settings.neo4j_uri
    driver = GraphDatabase.driver(
        uri,
        auth=(settings.neo4j_user, settings.neo4j_password),
    )
    disease_count = 0
    icd10_count = 0
    symptom_count = 0
    indicates_count = 0

    with driver.session() as session:
        # ── 清理旧数据（可选，首次运行可注释掉） ──
        session.run("MATCH (n) DETACH DELETE n")

        # ── 唯一性约束 ──
        session.run("CREATE CONSTRAINT IF NOT EXISTS FOR (s:Symptom) REQUIRE s.name IS UNIQUE")
        session.run("CREATE CONSTRAINT IF NOT EXISTS FOR (d:Disease) REQUIRE d.name IS UNIQUE")
        session.run("CREATE CONSTRAINT IF NOT EXISTS FOR (c:ICD10Code) REQUIRE c.code IS UNIQUE")

        # ── 1. 创建 Disease + ICD10Code 节点 + HAS_CODE 关系 ──
        for disease_name, icd10_info in DISEASE_ICD10_MAP.items():
            code = icd10_info["code"]
            desc = icd10_info["desc"]
            session.run(
                "MERGE (d:Disease {name: $disease_name}) "
                "MERGE (c:ICD10Code {code: $code}) "
                "SET c.description = $desc "
                "MERGE (d)-[:HAS_CODE]->(c)",
                disease_name=disease_name, code=code, desc=desc,
            )
            disease_count += 1
            icd10_count += 1 if code else 0

        # ── 2. 创建 Symptom 节点（含同义词）+ INDICATES 关系（含权重） ──
        for symptom_name, diseases in SYMPTOM_DISEASE_MAP.items():
            aliases = SYMPTOM_ALIASES.get(symptom_name, [])
            session.run(
                "MERGE (s:Symptom {name: $symptom_name}) "
                "SET s.aliases = $aliases",
                symptom_name=symptom_name, aliases=aliases,
            )
            symptom_count += 1
            for disease_name in diseases:
                # 确保疾病存在（有些在 DISEASE_ICD10_MAP 中没有对应条目）
                session.run(
                    "MERGE (d:Disease {name: $disease_name})",
                    disease_name=disease_name,
                )
                weight = SYMPTOM_WEIGHTS.get((symptom_name, disease_name), 1.0)
                result = session.run(
                    "MATCH (s:Symptom {name: $symptom_name}) "
                    "MATCH (d:Disease {name: $disease_name}) "
                    "MERGE (s)-[r:INDICATES]->(d) "
                    "SET r.weight = $weight "
                    "RETURN count(*) AS created",
                    symptom_name=symptom_name, disease_name=disease_name, weight=weight,
                )
                indicates_count += 1

    driver.close()
    # ── 汇总 ──
    print(f"✅ Symptom nodes:  {symptom_count} (含 aliases)")
    print(f"✅ Disease nodes:  {disease_count}")
    print(f"✅ ICD10Code nodes: {icd10_count}")
    print(f"✅ INDICATES edges: {indicates_count} (含 weight)")


if __name__ == "__main__":
    seed_knowledge_graph()
