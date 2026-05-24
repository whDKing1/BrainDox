# 04 — GraphRAG知识图谱

## 目录

- [1. 什么是GraphRAG](#1-什么是graphrag)
- [2. GraphRAG与传统RAG的对比](#2-graphrag与传统rag的对比)
- [3. 医学知识图谱的三层结构](#3-医学知识图谱的三层结构)
- [4. Neo4j在项目中的角色](#4-neo4j在项目中的角色)
- [5. Cypher查询示例](#5-cypher查询示例)
- [6. 内置知识库说明](#6-内置知识库说明)
- [7. U-Retrieval技术](#7-u-retrieval技术)
- [8. 生产环境扩展方案](#8-生产环境扩展方案)

---

## 1. 什么是GraphRAG

### 1.1 RAG基础概念

> **什么是RAG（Retrieval-Augmented Generation）**：检索增强生成。简单来说，就是在LLM回答问题之前，先从外部知识库中检索相关信息，然后把检索到的信息和问题一起喂给LLM，这样LLM的回答会更准确、更有依据。

传统的RAG流程：

```
用户问题 → 向量化 → 在向量数据库中搜索相似文档 → 把文档+问题一起给LLM → LLM回答
```

### 1.2 GraphRAG的核心思想

**GraphRAG**是RAG的进化版本，区别在于：它不是用向量数据库存储文档片段，而是用**图数据库（如Neo4j）**存储知识的**实体和关系**。

```
传统RAG：  "肺炎是一种常见的呼吸系统感染..."（一段文本）
GraphRAG：  (发热) --[是症状]--> (肺炎) --[编码为]--> (J18.1) --[属于]--> (呼吸系统疾病)
                                                                              ↑
                                                                    这些是实体和关系！
```

> **小白解读**：传统RAG就像在图书馆找书——找到相关的段落，念给LLM听。GraphRAG就像在一张"关系网"上导航——沿着实体之间的关系边走，找到所有相关联的知识。

### 1.3 为什么医疗场景需要GraphRAG

医学知识有一个显著特点：**高度结构化的实体关系**。

```
症状 ──关联──→ 疾病 ──编码为──→ ICD-10 ──分组为──→ DRGs
 ↓                ↓                                  ↓
检查项          治疗方案                              医保报销
 ↓                ↓
正常/异常      药物 ──交互──→ 另一种药物
```

这种层层关联的知识结构，用图数据库表示比用向量数据库更自然、更精确。

---

## 2. GraphRAG与传统RAG的对比

### 2.1 详细对比表

| 维度 | 传统RAG（向量检索） | GraphRAG（图检索） |
|------|------------------|-------------------|
| **存储形式** | 文档切片 → 向量嵌入 | 实体 + 关系 → 图结构 |
| **存储工具** | 向量数据库（Pinecone、Chroma、FAISS） | 图数据库（Neo4j、Amazon Neptune） |
| **检索方式** | 语义相似度搜索（cosine similarity） | 图遍历 + 多跳推理（Cypher查询） |
| **检索精度** | 模糊匹配（可能返回不太相关的结果） | 精确匹配（沿着关系边走） |
| **多跳推理** | 不支持（只能找到直接相似的文档） | 天然支持（从A→B→C→D多跳查询） |
| **可解释性** | 低（为什么这段文本被检索出来？） | 高（沿着哪条路径找到的一目了然） |
| **知识更新** | 需要重新嵌入和索引 | 增删节点和关系即可 |
| **适用场景** | 开放式问答、文档搜索 | 实体关系推理、医学诊断、供应链 |
| **构建成本** | 低（文档切分+嵌入即可） | 高（需要提取实体和关系） |

### 2.2 一个具体的例子

**问题**：患者有发热、咳嗽、胸痛，可能是什么病？

**传统RAG的做法**：

```
1. 将"发热 咳嗽 胸痛"向量化
2. 在向量数据库中搜索最相似的文档片段
3. 可能找到："肺炎是一种常见的呼吸道感染，症状包括发热、咳嗽..."
4. 把文档片段和问题一起给LLM
5. LLM回答："可能是肺炎"
```

**GraphRAG的做法**：

```
1. 识别症状实体：[发热, 咳嗽, 胸痛]
2. 在知识图谱中查询每个症状关联的疾病：
   - 发热 → [肺炎, 流感, COVID-19, 败血症, UTI]
   - 咳嗽 → [肺炎, 支气管炎, 哮喘, COPD, 肺癌]
   - 胸痛 → [心梗, 肺炎, 肺栓塞, 气胸, GERD]
3. 计算交集和排名：
   - 肺炎：匹配3/3个症状 → 最高排名
   - 流感：匹配1/3 → 较低
4. 把排名列表 + 患者信息给LLM
5. LLM结合临床推理给出最终诊断
```

GraphRAG的优势：**有明确的推理路径**，可以解释为什么得出这个诊断。

---

## 3. 医学知识图谱的三层结构

本项目参考Medical-Graph-RAG（ACL 2025）的三层知识架构：

### 3.1 三层架构总览

```
┌─────────────────────────────────────────────────┐
│           第三层：受控词汇层                       │
│  UMLS | SNOMED-CT | ICD-10 | RxNorm | LOINC     │
│  标准化的医学术语和编码体系                         │
├─────────────────────────────────────────────────┤
│           第二层：医学文献层                       │
│  PubMed(3600万篇) | S2ORC | Cochrane Library     │
│  循证医学证据和临床指南                             │
├─────────────────────────────────────────────────┤
│           第一层：临床数据层                       │
│  MIMIC-IV(电子病历) | 院内数据 | 患者记录           │
│  真实的临床数据和病例                               │
└─────────────────────────────────────────────────┘
```

### 3.2 第一层：临床数据层

| 数据源 | 说明 | 规模 |
|--------|------|------|
| **MIMIC-IV** | MIT维护的开放重症监护数据库 | 超过38万次住院记录 |
| 院内EMR | 医院电子病历系统的结构化数据 | 因机构而异 |
| 临床试验数据 | ClinicalTrials.gov的试验结果 | 48万+试验 |

在知识图谱中，临床数据表示为：

```
(患者A) --[入院诊断]--> (社区获得性肺炎)
(患者A) --[表现症状]--> (发热)
(患者A) --[实验室结果]--> (WBC 15000)
(社区获得性肺炎) --[治疗方案]--> (左氧氟沙星)
```

### 3.3 第二层：医学文献层

| 数据源 | 说明 | 规模 |
|--------|------|------|
| **PubMed** | 全球最大的生物医学文献库 | 3600万+文献 |
| **S2ORC** | Semantic Scholar开放研究语料库 | 2亿+论文 |
| Cochrane Library | 系统评价和循证医学数据库 | 8000+系统评价 |

### 3.4 第三层：受控词汇层

> **什么是受控词汇**：医学领域有很多标准化的术语体系，确保全球的医生说的"同一种病"用的是"同一个名字"。

| 术语体系 | 全称 | 用途 | 规模 |
|---------|------|------|------|
| **UMLS** | 统一医学语言系统 | 连接不同的医学术语体系 | 400万+概念 |
| **SNOMED-CT** | 系统化医学临床术语 | 最全面的临床术语 | 35万+概念 |
| **ICD-10** | 国际疾病分类 | 疾病编码（用于报销） | 7万+编码 |
| **RxNorm** | 药物标准命名 | 药物名称标准化 | 药物通用名/商品名 |
| **LOINC** | 检验项目标准编码 | 实验室检查编码 | 9万+检验项 |

在知识图谱中，受控词汇构成了"骨架"：

```
(肺炎) --[UMLS CUI]--> (C0032285)
(肺炎) --[ICD-10]--> (J18.9)
(肺炎) --[SNOMED-CT]--> (233604007)
(左氧氟沙星) --[RxNorm]--> (82122)
```

---

## 4. Neo4j在项目中的角色

### 4.1 什么是Neo4j

> **Neo4j**是全球最流行的图数据库。它用"节点"和"关系"来存储数据，非常适合表达医学知识中的复杂关系网络。

```
关系型数据库（MySQL）:  表格 + 行 + 列 + JOIN
图数据库（Neo4j）:     节点 + 关系 + 属性
```

### 4.2 项目中的图Schema

```
(:Disease {name, icd10_code, description})
    --[:HAS_SYMPTOM {frequency}]-->
(:Symptom {name, body_system})

(:Disease)
    --[:TREATED_BY {evidence_level}]-->
(:Treatment {name, type})

(:Treatment)
    --[:USES_DRUG {dosage, route}]-->
(:Drug {name, generic_name, rxnorm_code})

(:Drug)
    --[:INTERACTS_WITH {severity, description}]-->
(:Drug)

(:Disease)
    --[:CODED_AS]-->
(:ICD10Code {code, description, category})

(:ICD10Code)
    --[:GROUPS_TO]-->
(:DRGGroup {code, description, weight, mean_los})
```

### 4.3 在线模式 vs 离线模式

| 模式 | 说明 | 数据来源 | 适用场景 |
|------|------|---------|---------|
| **离线模式**（默认） | 使用内置的Python字典 | `SYMPTOM_DISEASE_MAP`、`DISEASE_ICD10_MAP` | 开发测试、面试演示 |
| **在线模式** | 连接真实的Neo4j实例 | Neo4j中的知识图谱数据 | 生产环境 |

```python
# 切换模式
service = GraphRAGService(use_neo4j=False)  # 离线模式（默认）
service = GraphRAGService(use_neo4j=True)   # 在线模式（需要Neo4j运行）
```

---

## 5. Cypher查询示例

> **什么是Cypher**：Neo4j的查询语言，类似于SQL但专门用于图数据。它用ASCII艺术风格表达图模式：`(节点)--[关系]-->(节点)`。

### 5.1 症状→疾病查询

```cypher
-- 查找与"发热"相关的所有疾病
MATCH (s:Symptom {name: "fever"})-[:IS_SYMPTOM_OF]->(d:Disease)
RETURN d.name AS disease, d.icd10_code AS icd10
ORDER BY d.name

-- 结果示例：
-- | disease    | icd10  |
-- |------------|--------|
-- | COVID-19   | U07.1  |
-- | Influenza  | J11.1  |
-- | Pneumonia  | J18.9  |
-- | Sepsis     | A41.9  |
```

### 5.2 多症状交集查询（鉴别诊断）

```cypher
-- 同时有"发热"和"咳嗽"的疾病（交集）
MATCH (s1:Symptom {name: "fever"})-[:IS_SYMPTOM_OF]->(d:Disease),
      (s2:Symptom {name: "cough"})-[:IS_SYMPTOM_OF]->(d)
RETURN d.name AS disease, d.icd10_code AS icd10, count(*) AS match_count
ORDER BY match_count DESC

-- 查找匹配多个症状的疾病并排名
WITH ["fever", "cough", "chest_pain"] AS symptoms
MATCH (s:Symptom)-[:IS_SYMPTOM_OF]->(d:Disease)
WHERE s.name IN symptoms
RETURN d.name AS disease, 
       count(DISTINCT s) AS matched_symptoms,
       collect(s.name) AS matching_symptoms
ORDER BY matched_symptoms DESC
LIMIT 10
```

### 5.3 疾病→治疗方案查询

```cypher
-- 查找肺炎的推荐治疗方案
MATCH (d:Disease {name: "Pneumonia"})-[:TREATED_BY]->(t:Treatment)-[:USES_DRUG]->(drug:Drug)
RETURN t.name AS treatment, drug.name AS drug_name, drug.generic_name AS generic,
       t.evidence_level AS evidence
ORDER BY t.evidence_level DESC
```

### 5.4 药物交互路径查询

```cypher
-- 检查两种药物之间是否有交互
MATCH (d1:Drug {name: "warfarin"})-[i:INTERACTS_WITH]-(d2:Drug {name: "aspirin"})
RETURN d1.name, d2.name, i.severity, i.description

-- 查找一个患者所有当前药物的交互
WITH ["metformin", "lisinopril", "warfarin"] AS current_drugs
MATCH (d1:Drug)-[i:INTERACTS_WITH]-(d2:Drug)
WHERE d1.name IN current_drugs AND d2.name IN current_drugs AND d1.name < d2.name
RETURN d1.name AS drug_a, d2.name AS drug_b, i.severity, i.description
```

### 5.5 多跳推理查询

```cypher
-- 从症状出发，经过疾病，到达ICD-10编码和DRGs分组（3跳查询）
MATCH path = (s:Symptom {name: "chest_pain"})
              -[:IS_SYMPTOM_OF]->(d:Disease)
              -[:CODED_AS]->(icd:ICD10Code)
              -[:GROUPS_TO]->(drg:DRGGroup)
RETURN s.name, d.name, icd.code, drg.code, drg.weight
ORDER BY drg.weight DESC
```

---

## 6. 内置知识库说明

### 6.1 SYMPTOM_DISEASE_MAP

离线模式下的症状→疾病映射表（`python/src/services/graphrag_service.py`中定义）：

| 症状 | 关联疾病（按常见程度排序） |
|------|------------------------|
| fever（发热） | Influenza, Pneumonia, COVID-19, Sepsis, Malaria, UTI |
| cough（咳嗽） | Pneumonia, Bronchitis, Asthma, COPD, Lung Cancer, COVID-19 |
| headache（头痛） | Migraine, Tension Headache, Meningitis, Hypertension, Brain Tumor |
| chest_pain（胸痛） | Acute MI, Angina, Pulmonary Embolism, Pneumothorax, GERD |
| abdominal_pain（腹痛） | Appendicitis, Cholecystitis, Pancreatitis, Peptic Ulcer, IBS |
| shortness_of_breath（呼吸困难） | Asthma, COPD, Heart Failure, Pneumonia, Pulmonary Embolism |
| fatigue（疲劳） | Anemia, Hypothyroidism, Depression, Diabetes, Heart Failure |
| nausea（恶心） | Gastroenteritis, Pregnancy, Appendicitis, Migraine, Hepatitis |
| dizziness（头晕） | BPPV, Hypotension, Anemia, Stroke, Arrhythmia |
| joint_pain（关节痛） | Rheumatoid Arthritis, Osteoarthritis, Gout, SLE, Lyme Disease |

### 6.2 DISEASE_ICD10_MAP

疾病→ICD-10编码映射表：

| 疾病名称 | ICD-10编码 | 编码描述 |
|---------|-----------|---------|
| Pneumonia | J18.9 | Pneumonia, unspecified organism |
| Influenza | J11.1 | Influenza with other respiratory manifestations |
| COVID-19 | U07.1 | COVID-19, virus identified |
| Acute MI | I21.9 | Acute myocardial infarction, unspecified |
| Asthma | J45.909 | Unspecified asthma, uncomplicated |
| Type 2 Diabetes | E11.9 | Type 2 diabetes mellitus without complications |
| Hypertension | I10 | Essential (primary) hypertension |
| Heart Failure | I50.9 | Heart failure, unspecified |
| COPD | J44.1 | COPD with acute exacerbation |
| Appendicitis | K35.80 | Unspecified acute appendicitis |
| Migraine | G43.909 | Migraine, unspecified |
| Anemia | D64.9 | Anemia, unspecified |
| UTI | N39.0 | Urinary tract infection |
| Depression | F32.9 | Major depressive disorder |
| Sepsis | A41.9 | Sepsis, unspecified organism |

### 6.3 检索算法

离线模式下的检索算法非常直观：

```python
def find_diseases_by_symptoms(self, symptoms: list[str]) -> list[dict]:
    disease_scores = {}
    for symptom in symptoms:
        key = symptom.lower().replace(" ", "_")
        for disease in SYMPTOM_DISEASE_MAP.get(key, []):
            disease_scores[disease] = disease_scores.get(disease, 0) + 1

    # 按匹配症状数量降序排列
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
```

**算法说明**：
1. 遍历每个症状，找到关联的疾病列表
2. 对每个疾病计数：被多少个症状关联到
3. 按计数降序排列——匹配越多症状的疾病排名越高

---

## 7. U-Retrieval技术

### 7.1 什么是U-Retrieval

U-Retrieval是Medical-Graph-RAG论文提出的双向检索策略，形如字母"U"：

```
         全局图谱
        /        \
 Top-down         Bottom-up
 (自顶向下)       (自底向上)
      \            /
       查询结果汇合
```

### 7.2 Top-down（自顶向下）

从全局视角出发，先确定大的疾病类别，再逐步缩小范围：

```
全部疾病 → 呼吸系统疾病 → 肺部感染 → 肺炎 → 社区获得性肺炎(J18.1)
```

**特点**：不会遗漏大类别下的疾病，但可能不够精确。

### 7.3 Bottom-up（自底向上）

从具体的症状/检查结果出发，沿着关系边向上追溯：

```
WBC 15000↑ → 感染征象 → 细菌感染 → 肺炎
发热39.2°C → 感染征象 → 细菌感染 → 肺炎
右下肺实变 → 肺部影像异常 → 肺实质病变 → 肺炎
```

**特点**：基于具体证据推理，精确但可能遗漏没有直接证据支持的疾病。

### 7.4 双向融合

U-Retrieval将两种策略的结果**融合排名**，取长补短：

```python
def u_retrieval(symptoms, lab_results, imaging):
    # Top-down: 基于症状组合确定候选疾病大类
    top_down_candidates = graph.query("""
        MATCH (s:Symptom)-[:IS_SYMPTOM_OF]->(d:Disease)-[:BELONGS_TO]->(cat:Category)
        WHERE s.name IN $symptoms
        RETURN cat.name, collect(d.name) AS diseases
    """, symptoms=symptoms)

    # Bottom-up: 基于具体检查结果追溯
    bottom_up_candidates = graph.query("""
        MATCH (l:LabResult)-[:INDICATES]->(sign:ClinicalSign)-[:SUGGESTS]->(d:Disease)
        WHERE l.name IN $labs AND l.is_abnormal = true
        RETURN d.name, collect(sign.name) AS evidence_chain
    """, labs=lab_results)

    # 融合排名
    return merge_and_rank(top_down_candidates, bottom_up_candidates)
```

---

## 8. 生产环境扩展方案

### 8.1 从离线模式到在线模式

| 步骤 | 说明 | 工作量 |
|------|------|--------|
| 1. 部署Neo4j集群 | Docker单机 → Neo4j Aura（云）或自建集群 | 1天 |
| 2. 导入UMLS数据 | 将UMLS Metathesaurus导入Neo4j | 2-3天 |
| 3. 导入SNOMED-CT | 导入临床术语和关系 | 1-2天 |
| 4. 建立ICD-10↔SNOMED映射 | SNOMED-CT有官方的ICD-10映射表 | 1天 |
| 5. 切换GraphRAGService | `use_neo4j=True`，实现Cypher查询 | 2-3天 |

### 8.2 数据来源获取

| 数据源 | 获取方式 | 费用 | 许可 |
|--------|---------|------|------|
| UMLS | [uts.nlm.nih.gov](https://uts.nlm.nih.gov) 注册下载 | 免费 | 需签协议 |
| SNOMED-CT | 通过NLM的UMLS分发 | 免费（美国用户） | 许可国不同 |
| ICD-10-CM | [CMS官网](https://www.cms.gov/medicare/coding/icd10) | 免费 | 公共领域 |
| RxNorm | [NLM下载](https://www.nlm.nih.gov/research/umls/rxnorm/) | 免费 | 公共领域 |
| MIMIC-IV | [PhysioNet](https://physionet.org/content/mimiciv/) | 免费 | 需通过培训 |

### 8.3 性能优化建议

| 优化方向 | 方案 | 效果 |
|---------|------|------|
| 索引优化 | 为常用查询的属性创建Neo4j索引 | 查询速度提升10-100x |
| 结果缓存 | Redis缓存高频查询结果 | 减少Neo4j负载 |
| 图投影 | 使用Neo4j GDS（Graph Data Science）预计算常用路径 | 多跳查询加速 |
| 分片 | Neo4j Fabric实现跨分片查询 | 支持超大规模图谱 |

```cypher
-- 创建索引示例
CREATE INDEX symptom_name FOR (s:Symptom) ON (s.name);
CREATE INDEX disease_icd10 FOR (d:Disease) ON (d.icd10_code);
CREATE INDEX drug_name FOR (d:Drug) ON (d.name);
```

### 8.4 与Diagnosis Agent的集成方式

```python
# 生产环境中的Diagnosis Agent增强流程
def diagnosis_agent_with_graphrag(state):
    patient_info = state.patient_info
    symptoms = [s["name"] for s in patient_info.get("symptoms", [])]

    # 1. GraphRAG检索候选疾病
    graphrag = get_graphrag_service()
    candidates = graphrag.find_diseases_by_symptoms(symptoms)

    # 2. 将候选列表注入LLM Prompt
    candidate_text = "\n".join([
        f"- {c['disease']} (ICD-10: {c['icd10_code']}, 匹配{c['symptom_match_count']}个症状)"
        for c in candidates[:10]
    ])

    enhanced_prompt = f"""
    Based on the knowledge graph, the following diseases match the patient's symptoms:
    {candidate_text}

    Consider these candidates along with your own medical knowledge.
    """

    # 3. LLM结合候选列表进行最终诊断
    response = llm.invoke([SystemMessage(...), HumanMessage(enhanced_prompt)])
    return {"diagnosis": parse(response)}
```

---

> **下一篇**：[05-FHIR-API集成](05-FHIR-API集成.md) — 了解FHIR R4标准以及如何将系统数据映射为FHIR资源
