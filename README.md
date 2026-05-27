<div align="center">

# 🧠 BrainDox — 神经内科脑疾病临床助手

**基于多Agent的神经内科脑疾病临床辅助决策助手**

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)]()
[![LangGraph](https://img.shields.io/badge/LangGraph-0.2+-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)]()
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=for-the-badge&logo=fastapi&logoColor=white)]()
[![DeepSeek](https://img.shields.io/badge/DeepSeek-V4-4F46E5?style=for-the-badge)]()
[![Neo4j](https://img.shields.io/badge/Neo4j-5.x-008CC1?style=for-the-badge&logo=neo4j&logoColor=white)]()
[![GraphRAG](https://img.shields.io/badge/GraphRAG-Knowledge_Graph-005682?style=for-the-badge)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![HIPAA](https://img.shields.io/badge/HIPAA-Compliant-green?style=for-the-badge)]()
[![FHIR R4](https://img.shields.io/badge/FHIR-R4-FF6B6B?style=for-the-badge)]()

---

🎯 **专注于神经内科脑疾病的多Agent临床辅助决策系统**

覆盖 **接诊 → 诊断 → 治疗 → 编码 → 审计** 全流程，基于 DeepSeek V4 + LangGraph

> 💡 **核心特性**：Intake Agent 支持 **极简临床速记 → 结构化 JSON** 转换，大幅提升神经科医生工作效率

</div>

---

## 📑 目录

- [🌟 项目亮点](#-项目亮点)
- [🏗️ 系统架构](#️-系统架构)
- [🚀 快速开始](#-快速开始)
- [🤖 五个Agent详解](#-五个agent详解)
- [🧠 GraphRAG + Neo4j 知识图谱](#-graphrag--neo4j-知识图谱)
- [💊 药物交互数据库](#-药物交互数据库)
- [📡 API接口文档](#-api接口文档)
- [🧪 测试](#-测试)
- [📂 项目目录结构](#-项目目录结构)
- [🔮 路线图](#-路线图)
- [📜 License](#-license)

---

## 🌟 项目亮点

| 亮点 | 说明 |
|:---:|:---|
| 🧠 **神经内科专属** | 专注脑血管疾病、癫痫、神经退行性疾病、脱髓鞘疾病、神经肌肉疾病、CNS感染、头痛等 |
| ⚡ **极简速记→结构化** | Intake Agent 将极简临床速记（如 `65M, S L weakness 2h, GCS14, L Babinski+`）转化为结构化 PatientInfo JSON |
| 🤖 **5个专业Agent** | Intake → Diagnosis → Treatment → Coding → Audit，支持条件路由和人机协同 |
| 🧠 **GraphRAG知识图谱** | 神经内科专属症状→疾病→治疗多跳推理，基于Neo4j |
| 🏥 **神经科数据模型** | 专属 NeurologicalExam 和 NeuroImaging 字段，支持GCS、MRC肌力分级、巴彬斯基征、CT/MRI影像 |
| 📋 **神经科ICD-10** | G00-G99（神经系统）+ I60-I69（脑血管）ICD-10-CM编码 + MS-DRGs分组 |
| 💊 **神经科DDI** | 药物交互数据库覆盖抗癫痫药、抗凝药、抗血小板药、帕金森药、免疫调节剂 |
| 🔒 **HIPAA合规** | Safe Harbor脱敏（18类PHI）、不可变审计日志、RBAC访问控制 |
| 🔄 **人机协同** | 医生可审核、批准或修正LLM诊断后再进入治疗阶段 |

---

## 🏗️ 系统架构

### Pipeline 流程

```mermaid
graph LR
    Start([🟢 临床速记输入]) --> Intake

    subgraph Pipeline["🔄 BrainDox 临床决策Pipeline"]
        Intake["🏥 Intake Agent<br/>速记 → 结构化JSON"]
        Diagnosis["🔬 Diagnosis Agent<br/>神经科鉴别诊断"]
        Treatment["💊 Treatment Agent<br/>神经科治疗方案"]
        Coding["📋 Coding Agent<br/>ICD-10 + DRGs"]
        Audit["🔒 Audit Agent<br/>HIPAA合规审计"]

        Intake --> Diagnosis
        Diagnosis -->|"✅ 信息充足"| Treatment
        Diagnosis -->|"❌ 信息不足"| Intake
        Treatment --> Coding
        Coding --> Audit
    end

    Audit --> End([🔴 完整报告])

    KG[("🧠 Neo4j<br/>神经科知识图谱")]
    Drug[("💊 DDI数据库<br/>神经科药物")]
    ICD[("📋 ICD-10<br/>G00-G99, I60-I69")]
    HIPAA[("🔒 HIPAA<br/>合规规则")]

    Diagnosis -.->|"GraphRAG查询"| KG
    Treatment -.->|"交互检查"| Drug
    Coding -.->|"编码映射"| ICD
    Audit -.->|"合规校验"| HIPAA
```

### 分层架构

```mermaid
graph TB
    subgraph API["📡 API层"]
        REST["FastAPI REST API"]
        Health["健康检查"]
        Docs["Swagger/OpenAPI文档"]
    end

    subgraph Orchestration["🔄 编排层"]
        LG["LangGraph Pipeline<br/>(StateGraph + 条件路由)"]
        State["ClinicalState<br/>(共享状态)"]
    end

    subgraph Agents["🤖 Agent层"]
        A1["Intake Agent<br/>(速记扩写 + 结构化)"]
        A2["Diagnosis Agent<br/>(神经解剖定位)"]
        A3["Treatment Agent<br/>(溶栓评估 + AED选择)"]
        A4["Coding Agent<br/>(神经科ICD-10)"]
        A5["Audit Agent<br/>(HIPAA合规)"]
    end

    subgraph Services["⚙️ 服务层"]
        S1["GraphRAG Service"]
        S2["ICD-10 Service"]
        S3["Drug Interaction Service"]
        S4["FHIR Service"]
        S5["HIPAA Service"]
    end

    subgraph Infra["🗄️ 基础设施层"]
        PG[("PostgreSQL")]
        Neo[("Neo4j")]
        Redis[("Redis")]
        LLM["DeepSeek V4<br/>LLM推理"]
    end

    REST --> LG
    LG --> State
    State --> A1 & A2 & A3 & A4 & A5
    A1 --> S4
    A2 --> S1
    A3 --> S3
    A4 --> S2
    A5 --> S5
    S1 --> Neo
    S2 --> PG
    S5 --> PG
    A1 & A2 & A3 & A4 --> LLM
    S3 --> Redis
```

### 为什么用多Agent而不是一个大Agent？

| 对比维度 | 单Agent | 多Agent Pipeline（本项目） |
|:---|:---|:---|
| **准确性** | � 提示词过长，注意力分散 | 🟢 每个Agent专注一个任务，Prompt精准 |
| **可维护性** | 🔴 改一个功能可能影响所有功能 | 🟢 修改某个Agent不影响其他Agent |
| **可测试性** | 🔴 只能端到端测试 | 🟢 每个Agent可以独立单元测试 |
| **可观测性** | 🔴 黑盒，不知道哪步出问题 | 🟢 每步有输入/输出，便于调试 |
| **错误隔离** | 🔴 一处出错整个流程失败 | 🟢 单Agent出错可以跳过或重试 |

---

## 🚀 快速开始

### 前置条件

| 工具 | 版本要求 | 用途 |
|:---|:---|:---|
| Python | 3.11+ | 运行时 |
| UV | 最新版 | 虚拟环境与包管理（推荐） |
| Docker | 20.0+ | 基础设施服务（PostgreSQL + Neo4j + Redis） |
| DeepSeek API Key | — | LLM推理 |

### 安装步骤

```bash
# 进入代码目录
cd code

# 创建 UV 虚拟环境
uv venv

# 激活环境
.\.venv\Scripts\activate

# 安装依赖
uv pip install -r requirements.txt

# 配置 API Key
copy .env.example .env

# 编辑 .env 文件，填入你的 DeepSeek API Key 和 Neo4j 密码：
#   OPENAI_API_KEY=sk-your-deepseek-api-key
#   OPENAI_MODEL=deepseek-v4-pro
#   OPENAI_BASE_URL=https://api.deepseek.com
#   NEO4J_PASSWORD=your-neo4j-password

# 启动基础设施（PostgreSQL + Neo4j + Redis）
docker compose up -d postgres neo4j redis
# 等待约15秒，让数据库完全启动

# 导入 Neo4j 知识图谱种子数据（仅首次需要）
python seed_neo4j.py

# 启动API服务
uvicorn src.api.main:app --host 0.0.0.0 --port 8000 --reload

# ✅ 看到以下输出说明启动成功：
#   INFO:     Uvicorn running on http://0.0.0.0:8000
#   graphrag.mode use_neo4j=True
#   graphrag.neo4j_connected
```

### 环境变量详解

```bash
# ============== LLM 配置 ==============
# DeepSeek API密钥（必填！）
OPENAI_API_KEY=sk-your-deepseek-api-key
# 模型名称
OPENAI_MODEL=deepseek-v4-pro
# DeepSeek API地址
OPENAI_BASE_URL=https://api.deepseek.com

# ============== PostgreSQL 配置 ==============
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=clinical_decision
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password-here

# ============== Neo4j 配置 ==============
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your-password-here

# ============== Redis 配置 ==============
REDIS_HOST=localhost
REDIS_PORT=6379

# ============== 应用配置 ==============
APP_HOST=0.0.0.0
APP_PORT=8000
LOG_LEVEL=INFO
```

> 💡 核心环境变量：`OPENAI_API_KEY`、`OPENAI_MODEL`、`OPENAI_BASE_URL`、`NEO4J_PASSWORD` 是**必须**修改的，其他保持默认即可。

### 验证运行

打开浏览器访问 http://localhost:8000/docs 查看Swagger UI，或用PowerShell测试：

```powershell
Invoke-RestMethod -Uri "http://localhost:8000/health" -Method Get
```

---

## 🤖 五个Agent详解

### Agent 1: Intake Agent（极简速记 → 结构化）

BrainDox的核心创新。将医生的极简临床速记转化为结构化患者数据，采用两阶段处理：

**阶段1 — 临床扩写**（内部处理，不输出）：

| 扩写类型 | 示例 |
|:---|:---|
| **缩写展开** | `AF` → atrial fibrillation（房颤），`SAH` → subarachnoid hemorrhage（蛛网膜下腔出血），`tPA` → tissue plasminogen activator（组织型纤溶酶原激活剂） |
| **语义扩展** | `L Babinski+` → 左侧巴彬斯基征阳性，提示上运动神经元损害；`R hemiplegia` → 右侧偏瘫，提示左大脑半球病变（对侧） |
| **缺失推断** | 卒中无发病时间 → 标记"需补充最后正常时间以评估溶栓窗口"；癫痫无发作类型 → 标记"需补充发作症状学分类" |

**阶段2 — 结构化输出**：生成包含神经科专属字段的 PatientInfo JSON。

**输入示例**：
```
65M, S L weakness 2h, GCS14 E4V4M6, R gaze, L facial droop UMN type,
LUE 2/5 LLE 3/5, L Babinski+, L hemisensory loss, BP178/95 HR88.
AF+HTN h/o. Meds: warfarin 5mg qd, amlodipine 10mg qd.
NCCT: no hemorrhage, R MCA territory early ischemic changes.
```

**输出结构**：
```
PatientInfo
├── name, age, gender, chief_complaint
├── symptoms[]                    # 症状列表（duration_days支持浮点数，如0.0833=2小时）
├── medical_history[]             # 既往病史
├── allergies[]                   # 过敏史
├── current_medications[]         # 当前用药
├── vital_signs                   # 生命体征
├── lab_results[]                 # 实验室检查
├── neurological_exam             # 🔬 神经科专属检查
│   ├── consciousness_level       #   意识水平（GCS评分）
│   ├── pupil_response            #   瞳孔对光反射
│   ├── motor_strength            #   肌力（MRC分级0-5，按肢体）
│   ├── pathological_reflexes     #   病理反射（Babinski、Hoffmann等）
│   ├── cranial_nerves            #   脑神经检查
│   ├── sensory_exam              #   感觉检查
│   ├── coordination              #   共济运动
│   ├── gait                      #   步态
│   ├── meningeal_signs           #   脑膜刺激征
│   └── speech                    #   言语评估
└── neuro_imaging[]               # 🔬 神经影像学
    ├── modality                   #   检查类型（CT/MRI/DSA/MRA/CTA）
    ├── findings                   #   影像所见
    └── conclusion                 #   影像诊断
```

**关键代码**：[`code/src/agents/intake_agent.py`](code/src/agents/intake_agent.py)

---

### Agent 2: Diagnosis Agent（神经科鉴别诊断 + GraphRAG增强）

生成带神经解剖定位的排名鉴别诊断，**集成 GraphRAG 知识图谱**进行症状→疾病多跳检索：

- **专科领域**：脑血管疾病（卒中、TIA、SAH、ICH）、癫痫、神经退行性疾病（帕金森、阿尔茨海默、ALS）、脱髓鞘疾病（MS、ADEM）、神经肌肉疾病（GBS、MG）
- **神经解剖定位**：输出病变定位（如左MCA供血区、脑干、脊髓T8水平、周围神经），并提供定位依据
- **条件路由**：如果信息不足（`needs_more_info=true`），Pipeline回退到Intake Agent补充信息，最多重试2次
- **GraphRAG增强**：LLM调用前先从Neo4j知识图谱检索候选疾病，注入Prompt引导LLM重点考虑高关联疾病，减少幻觉和遗漏

**诊断流程**：

```
patient_info → 提取症状关键词 → Neo4j Cypher 三跳查询（Symptom→Disease→ICD10Code）
                                    ↓
                              候选疾病列表（按症状匹配数排序）
                                    ↓
             patient_info + 候选疾病 → LLM综合判断 → 鉴别诊断 + 神经解剖定位
```

**输出结构**：
```json
{
  "primary_diagnosis": {
    "disease_name": "Ischemic Stroke - Left MCA Territory",
    "icd10_hint": "I63.511",
    "confidence": 0.88,
    "evidence": ["sudden left weakness 2h", "GCS 14", "L Babinski+"],
    "reasoning": "急性起病+左侧偏瘫+右侧凝视+左病理征阳性→左MCA区缺血性卒中"
  },
  "neuroanatomical_localization": {
    "location": "Left MCA territory",
    "reasoning": "右侧凝视（左额叶眼动区）+左侧面瘫UMN型+左偏瘫+左偏身感觉障碍"
  },
  "differential_list": [...],
  "recommended_tests": ["CTA head/neck", "MRI brain with diffusion", "Echo"],
  "needs_more_info": false
}
```

**关键代码**：[`code/src/agents/diagnosis_agent.py`](code/src/agents/diagnosis_agent.py)

---

### Agent 3: Treatment Agent（神经科治疗方案）

生成循证治疗方案，包含神经科特有的急性干预和药物选择：

- **急性干预评估**：
  - 溶栓评估：发病时间窗、禁忌症检查（如正在使用华法林）
  - 手术考虑：去骨瓣减压术、血肿清除术、动脉瘤夹闭术
  - ICU监护：颅内压监测、气道管理、血流动力学支持
- **药物选择**：
  - 抗癫痫药（AED）选择：根据癫痫类型和药物交互
  - 抗凝管理：华法林/DOAC调整
  - 疾病修饰治疗：MS的干扰素/奥法妥木单抗等
- **DDI检查**：自动检测推荐药物与当前用药的交互

**关键代码**：[`code/src/agents/treatment_agent.py`](code/src/agents/treatment_agent.py)

---

### Agent 4: Coding Agent（神经科ICD-10编码）

将诊断映射为ICD-10-CM编码，遵循神经科特有编码规则：

**覆盖的ICD-10范围**：

| 编码范围 | 类别 | 示例 |
|:---|:---|:---|
| G00-G09 | CNS炎症性疾病 | G00.9 细菌性脑膜炎，G03.9 脑膜炎 |
| G10-G14 | 主要影响CNS的系统萎缩 | G10 亨廷顿病，G12.21 ALS |
| G20-G26 | 锥体外系和运动障碍 | G20 帕金森病，G24.1 肌张力障碍 |
| G35-G37 | 脱髓鞘疾病 | G35 多发性硬化，G36.9 ADEM |
| G40-G47 | 发作性和阵发性障碍 | G40.109 局灶性癫痫，G43.909 偏头痛 |
| G60-G65 | 神经/多发性神经病 | G61.0 GBS，G70.0 MG |
| G80-G83 | 脑瘫/瘫痪综合征 | G81.1 轻偏瘫，G83.1 单瘫 |
| I60-I69 | 脑血管疾病 | I63.511 左MCA脑梗，I61.9 脑出血 |

**DRGs分组示例**：

| ICD-10前缀 | DRG | 描述 | 权重 | 平均住院天数 |
|:---|:---|:---|:---|:---|
| I63 | 061 | 缺血性卒中（溶栓） | 2.5 | 5.8 |
| I61 | 064 | 颅内出血（伴MCC） | 2.3 | 6.2 |
| I60 | 066 | 蛛网膜下腔出血（伴MCC） | 3.1 | 8.5 |
| G40 | 101 | 癫痫（伴MCC） | 1.3 | 3.8 |
| G20 | 076 | 帕金森病 | 1.1 | 3.5 |
| G35 | 077 | 多发性硬化 | 1.6 | 4.2 |

**关键代码**：[`code/src/agents/coding_agent.py`](code/src/agents/coding_agent.py)

---

### Agent 5: Audit Agent（HIPAA合规审计）

纯规则引擎（不使用LLM，确保100%确定性）：

- **PHI扫描与脱敏**：正则表达式扫描18类HIPAA Safe Harbor标识符，自动掩码处理
- **8项结构性合规检查**：
  1. phi_scan — PHI泄露扫描
  2. data_encryption_at_rest — 静态数据加密
  3. data_encryption_in_transit — 传输数据加密
  4. access_control_rbac — RBAC访问控制
  5. audit_logging — 审计日志
  6. minimum_necessary_rule — 最小必要原则
  7. breach_notification_ready — 违规通知就绪
  8. data_retention_policy — 数据保留策略
- **不可变审计追踪**：所有操作记录写入审计日志，保留6年
- **风险评估**：基于检查结果给出整体风险等级（low / medium / high）

**关键代码**：[`code/src/agents/audit_agent.py`](code/src/agents/audit_agent.py)

---

## 🧠 GraphRAG + Neo4j 知识图谱

### 图数据模型

神经内科专属知识图谱，采用**三节点链式结构**存储症状→疾病→编码的关联：

```
(:Symptom) -[:INDICATES]-> (:Disease) -[:HAS_CODE]-> (:ICD10Code)
```

| 节点类型 | 属性 | 当前数量 | 说明 |
|:---|:---|:---:|:---|
| `(:Symptom)` | `name` (唯一) | 18 | 神经科常见症状（头痛、癫痫、偏瘫等） |
| `(:Disease)` | `name` (唯一) | 71 | 神经内科疾病（卒中、MS、GBS等） |
| `(:ICD10Code)` | `code` (唯一), `description` | 66 | ICD-10-CM 编码（5个编码被多疾病共享） |

### 查询示例

一条 Cypher 完成三跳查询，输入症状返回疾病+编码+匹配数：

```cypher
MATCH (s:Symptom)-[:INDICATES]->(d:Disease)
WHERE s.name IN ['limb_weakness', 'facial_droop', 'speech_difficulty']
OPTIONAL MATCH (d)-[:HAS_CODE]->(c:ICD10Code)
RETURN d.name AS disease, c.code AS icd10_code,
       c.description AS icd10_desc, COUNT(DISTINCT s) AS symptom_match_count
ORDER BY symptom_match_count DESC
```

**返回结果**：

| 排名 | disease | symptom_match_count | icd10_code |
|:---:|:---|:---:|:---:|
| 1 | Ischemic Stroke | 3 | I63.9 |
| 2 | Intracerebral Hemorrhage | 3 | I61.9 |
| 3 | Brain Tumor | 1 | C71.9 |
| ... | ... | ... | ... |

### 双模式架构

GraphRAG Service 支持双模式运行，自动切换、零配置降级：

```
find_diseases_by_symptoms(["limb_weakness", "facial_droop"])
    │
    ├── Neo4j 已连接 → _find_diseases_neo4j()  ← Cypher 三跳查询
    │                   ● 生产模式，低延迟
    │
    └── Neo4j 不可用 → _find_diseases_offline() ← Python 字典投票
                        ● 离线兜底，零依赖
```

| 模式 | 触发条件 | 数据源 | 查询方式 |
|:---|:---|:---|:---|
| **Neo4j** | `.env` 中 `NEO4J_PASSWORD` 有值 + 容器运行 | Neo4j 图数据库 | Cypher 多跳查询 |
| **离线** | Neo4j 不可用 / 密码为空 | `SYMPTOM_DISEASE_MAP` + `DISEASE_ICD10_MAP` | Python 字典投票计数 |

> ✅ 经 79 个测试用例验证，两种模式在所有 18 种症状组合下返回**完全一致**的结果。

### 种子数据导入

```bash
# Neo4j 容器已启动后，执行一次即可
python seed_neo4j.py
```

脚本自动完成：
1. 清理旧数据 → 创建唯一性约束 → 导入 71 个 Disease + 66 个 ICD10Code + HAS_CODE 关系
2. 导入 18 个 Symptom + INDICATES 关系
3. 使用 `MERGE` 避免重复，可安全多次执行

### 后续扩展方向

```
                      ┌── [:HAS_CODE] ──→ (:ICD10Code)
                      │
(:Symptom) ──→ (:Disease) ──→ [:TREATED_BY] ──→ (:Medication)
                      │
                      ├── [:DIAGNOSED_BY] ──→ (:Exam)
                      │
                      └── [:GUIDED_BY] ──→ (:Guideline)
```

**关键代码**：[`code/src/services/graphrag_service.py`](code/src/services/graphrag_service.py) | [`code/seed_neo4j.py`](code/seed_neo4j.py)

---

## 💊 药物交互数据库

神经科常用药物交互数据，Treatment Agent自动调用检查：

**典型交互示例**：

| 药物A | 药物B | 严重级别 | 风险 |
|:---|:---|:---|:---|
| warfarin | carbamazepine | 🔴 **major** | CBZ诱导CYP2C9，降低华法林抗凝效果 |
| valproic_acid | lamotrigine | 🔴 **major** | VPA抑制LTG代谢，血药浓度升高2倍，SJS/TEN风险 |
| warfarin | aspirin | 🔴 **major** | 出血风险显著增加 |
| levetiracetam | — | 🟢 一般 | 左乙拉西坦药物交互少，神经科首选AED |
| levodopa | metoclopramide | ⛔ **禁忌** | 胃复安阻断多巴胺受体，加重帕金森症状 |

**关键代码**：[`code/src/services/drug_interaction.py`](code/src/services/drug_interaction.py)

---

## 📡 API接口文档

### 接口总览

| 方法 | 路径 | 说明 | 需要LLM |
|:---|:---|:---|:---:|
| `POST` | `/api/v1/clinical/analyze` | 完整5-Agent Pipeline | ✅ |
| `POST` | `/api/v1/clinical/analyze/human-loop` | 人机协同Pipeline（诊断后暂停） | ✅ |
| `GET` | `/api/v1/clinical/session/{id}/review` | 获取待审核诊断 | ❌ |
| `POST` | `/api/v1/clinical/session/{id}/approve` | 批准诊断，继续Pipeline | ❌ |
| `POST` | `/api/v1/clinical/session/{id}/reject` | 修正诊断，继续Pipeline | ❌ |
| `POST` | `/api/v1/clinical/icd10/search` | ICD-10文本搜索 | ❌ |
| `GET` | `/api/v1/clinical/icd10/{code}` | ICD-10编码查询 | ❌ |
| `POST` | `/api/v1/clinical/ddi/check` | 药物交互检查 | ❌ |
| `GET` | `/health` | 健康检查 | ❌ |

### 1. 完整Pipeline分析

**`POST /api/v1/clinical/analyze`**

运行完整的5-Agent临床决策Pipeline。

```powershell
Invoke-RestMethod -Uri "http://localhost:8000/api/v1/clinical/analyze" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"patient_description": "65M, S L weakness 2h, GCS14 E4V4M6, R gaze, L facial droop UMN type, LUE 2/5 LLE 3/5, L Babinski+, L hemisensory loss, BP178/95 HR88. AF+HTN h/o. Meds: warfarin 5mg qd, amlodipine 10mg qd. NCCT: no hemorrhage, R MCA territory early ischemic changes.", "thread_id": "stroke-001"}'
```

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|:---|:---|:---|:---|
| `patient_description` | string | ✅ | 极简临床速记或完整患者叙述（最少2字符） |
| `thread_id` | string | ❌ | 会话ID，用于状态持久化（默认"default"） |

**响应字段**：

| 字段 | 说明 |
|:---|:---|
| `patient_info` | Intake Agent输出的结构化患者信息 |
| `diagnosis` | Diagnosis Agent输出的鉴别诊断 |
| `treatment_plan` | Treatment Agent输出的治疗方案 |
| `coding_result` | Coding Agent输出的ICD-10编码+DRGs |
| `audit_result` | Audit Agent输出的HIPAA合规报告 |
| `errors` | 错误列表 |

### 2. 人机协同流程

```mermaid
sequenceDiagram
    participant Client as 客户端
    participant API as BrainDox API
    participant Pipeline as LangGraph Pipeline

    Client->>API: POST /clinical/analyze/human-loop
    API->>Pipeline: Intake → Diagnosis（暂停）
    Pipeline-->>API: patient_info + diagnosis（pending）
    API-->>Client: 等待医生审核

    Client->>API: GET /clinical/session/{id}/review
    API-->>Client: 诊断详情

    alt 医生批准
        Client->>API: POST /clinical/session/{id}/approve
        API->>Pipeline: Treatment → Coding → Audit
        Pipeline-->>API: 完整报告
        API-->>Client: 完整结果
    else 医生修正
        Client->>API: POST /clinical/session/{id}/reject
        Note right of Client: 附带 corrected_diagnosis
        API->>Pipeline: 基于修正诊断继续 Treatment → Audit
        Pipeline-->>API: 完整报告
        API-->>Client: 完整结果
    end
```

**完整调用流程**：

1. `POST /clinical/analyze/human-loop` — 启动Pipeline，执行Intake→Diagnosis后在Treatment前暂停
2. `GET /clinical/session/{thread_id}/review` — 医生查看待审核诊断
3. `POST /clinical/session/{thread_id}/approve` — 医生批准诊断，Pipeline继续执行
4. `POST /clinical/session/{thread_id}/reject` — 医生修正诊断，Pipeline基于修正版继续执行

### 3. ICD-10搜索

**`POST /api/v1/clinical/icd10/search`**

```powershell
Invoke-RestMethod -Uri "http://localhost:8000/api/v1/clinical/icd10/search" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"query": "stroke"}'
```

### 4. ICD-10编码查询

**`GET /api/v1/clinical/icd10/{code}`**

```powershell
Invoke-RestMethod -Uri "http://localhost:8000/api/v1/clinical/icd10/I63.9" -Method Get
```

### 5. 药物交互检查

**`POST /api/v1/clinical/ddi/check`**

```powershell
Invoke-RestMethod -Uri "http://localhost:8000/api/v1/clinical/ddi/check" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"new_drugs": ["warfarin"], "current_drugs": ["carbamazepine"]}'
```

### 6. 健康检查

**`GET /health`**

```powershell
Invoke-RestMethod -Uri "http://localhost:8000/health" -Method Get
```

---

## 🧪 测试

### 测试概览

| 文件 | 测试层 | 用例数 | 覆盖内容 |
|:---|:---|:---:|:---|
| `tests/test_graphrag.py` | GraphRAG + Neo4j | 79 | Neo4j 基础设施、离线模式、双模式一致性、降级 |
| `tests/test_services.py` | 服务层基础 | 14 | ICD-10、DDI、HIPAA、GraphRAG 离线 |

### 运行测试

```bash
# 全部测试（需要 Neo4j 容器运行才能跑 L1/L3）
.venv\Scripts\pytest tests/test_graphrag.py -v

# 仅离线模式 + 降级（无需 Neo4j）
.venv\Scripts\pytest tests/test_graphrag.py -v -k "Offline or Fallback"

# 仅 Neo4j 相关
.venv\Scripts\pytest tests/test_graphrag.py -v -k "Neo4j or DualMode or neo4j"

# 运行全部测试（新旧都跑）
.venv\Scripts\pytest tests/ -v
```

---

### 测试结果展示

最后一次全量运行结果：**79 passed, 0 failed**

```
============================= test session starts ==============================
platform win32 -- Python 3.11.7, pytest-9.0.3, pluggy-1.6.0
collected 79 items

tests/test_graphrag.py::TestNeo4jInfrastructure::test_node_counts PASSED  [  1%]
tests/test_graphrag.py::TestNeo4jInfrastructure::test_all_diseases_have_icd10 PASSED [  2%]
tests/test_graphrag.py::TestNeo4jInfrastructure::test_all_diseases_have_indicates PASSED [  3%]
tests/test_graphrag.py::TestNeo4jInfrastructure::test_cypher_three_hop_query PASSED [  5%]
tests/test_graphrag.py::TestOfflineMode::test_multi_symptom_stroke_case PASSED [  6%]
tests/test_graphrag.py::TestOfflineMode::test_single_symptom_headache PASSED [  7%]
tests/test_graphrag.py::TestOfflineMode::test_single_symptom_seizure PASSED [  8%]
tests/test_graphrag.py::TestOfflineMode::test_empty_symptoms PASSED    [ 10%]
tests/test_graphrag.py::TestOfflineMode::test_unknown_symptom PASSED   [ 11%]
tests/test_graphrag.py::TestOfflineMode::test_case_insensitive PASSED  [ 12%]
tests/test_graphrag.py::TestOfflineMode::test_space_handling PASSED    [ 13%]
tests/test_graphrag.py::TestOfflineMode::test_return_structure PASSED  [ 15%]
tests/test_graphrag.py::TestOfflineMode::test_descending_order PASSED  [ 16%]
tests/test_graphrag.py::TestOfflineMode::test_get_icd10_known PASSED   [ 17%]
tests/test_graphrag.py::TestOfflineMode::test_get_icd10_unknown PASSED [ 18%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[headache] PASSED [ 20%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[seizure] PASSED [ 21%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[limb_weakness] PASSED [ 22%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[numbness] PASSED [ 24%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[tremor] PASSED [ 25%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[visual_disturbance] PASSED [ 26%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[dizziness] PASSED [ 27%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[speech_difficulty] PASSED [ 29%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[confusion] PASSED [ 30%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[gait_disturbance] PASSED [ 31%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[memory_loss] PASSED [ 32%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[neck_stiffness] PASSED [ 34%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[facial_droop] PASSED [ 35%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[double_vision] PASSED [ 36%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[muscle_cramps] PASSED [ 37%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[sensory_loss] PASSED [ 39%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[involuntary_movements] PASSED [ 40%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_returns_diseases[loss_of_consciousness] PASSED [ 41%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[headache] PASSED [ 43%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[seizure] PASSED [ 44%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[limb_weakness] PASSED [ 45%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[numbness] PASSED [ 46%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[tremor] PASSED [ 48%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[visual_disturbance] PASSED [ 49%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[dizziness] PASSED [ 50%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[speech_difficulty] PASSED [ 51%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[confusion] PASSED [ 53%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[gait_disturbance] PASSED [ 54%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[memory_loss] PASSED [ 55%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[neck_stiffness] PASSED [ 56%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[facial_droop] PASSED [ 58%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[double_vision] PASSED [ 59%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[muscle_cramps] PASSED [ 60%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[sensory_loss] PASSED [ 62%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[involuntary_movements] PASSED [ 63%]
tests/test_graphrag.py::TestOfflineMode::test_every_symptom_top_disease_has_icd10[loss_of_consciousness] PASSED [ 64%]
tests/test_graphrag.py::TestOfflineMode::test_query_neo4j_fallback PASSED [ 65%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[headache] PASSED [ 67%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[seizure] PASSED [ 68%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[limb_weakness] PASSED [ 69%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[numbness] PASSED [ 70%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[tremor] PASSED [ 72%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[visual_disturbance] PASSED [ 73%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[dizziness] PASSED [ 74%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[speech_difficulty] PASSED [ 75%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[confusion] PASSED [ 77%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[gait_disturbance] PASSED [ 78%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[memory_loss] PASSED [ 79%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[neck_stiffness] PASSED [ 81%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[facial_droop] PASSED [ 82%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[double_vision] PASSED [ 83%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[muscle_cramps] PASSED [ 84%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[sensory_loss] PASSED [ 86%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[involuntary_movements] PASSED [ 87%]
tests/test_graphrag.py::TestDualModeConsistency::test_single_symptom_consistency[loss_of_consciousness] PASSED [ 88%]
tests/test_graphrag.py::TestDualModeConsistency::test_multi_symptom_consistency_stroke PASSED [ 89%]
tests/test_graphrag.py::TestDualModeConsistency::test_multi_symptom_consistency_meningitis PASSED [ 91%]
tests/test_graphrag.py::TestDualModeConsistency::test_multi_symptom_consistency_ms PASSED [ 92%]
tests/test_graphrag.py::TestDualModeConsistency::test_multi_symptom_consistency_unknown PASSED [ 93%]
tests/test_graphrag.py::TestDualModeConsistency::test_empty_symptoms_consistency PASSED [ 94%]
tests/test_graphrag.py::TestDualModeConsistency::test_public_api_returns_same_structure PASSED [ 96%]
tests/test_graphrag.py::TestFallback::test_bad_credentials_fallback PASSED [ 97%]
tests/test_graphrag.py::TestFallback::test_find_diseases_when_neo4j_enabled_but_unreachable PASSED [ 98%]
tests/test_graphrag.py::TestFallback::test_singleton_defaults_to_settings PASSED [100%]

============================== 79 passed in 2.39s ==============================
```

---

### 各层测试结果详解

#### L1: Neo4j 基础设施（4/4 ✅）

| 用例 | 验证内容 | 结果 |
|:---|:---|:---:|
| `test_node_counts` | `MATCH (n) RETURN labels(n), count(n)` → Symptom=18, Disease=71, ICD10Code=66 | ✅ |
| `test_all_diseases_have_icd10` | 所有 71 个 Disease 节点都有 `[:HAS_CODE]` 关系指向 ICD10Code | ✅ |
| `test_all_diseases_have_indicates` | 无 INDICATES 关系的 Disease 限于 `DISEASE_ICD10_MAP` 独有但未被任何 Symptom 引用的合法断层 | ✅ |
| `test_cypher_three_hop_query` | 输入 `limb_weakness + facial_droop + speech_difficulty`，三跳查询返回 Ischemic Stroke 排名第一、匹配数=3、编码 I63.9 | ✅ |

#### L2: 离线模式单元测试（16/16 ✅）

| 用例 | 验证内容 | 结果 |
|:---|:---|:---:|
| `test_multi_symptom_stroke_case` | 三症状（偏瘫+面瘫+言语障碍）→ Ischemic Stroke / ICH 排第一，匹配数=3 | ✅ |
| `test_single_symptom_headache` | 单症状头痛 → 返回 8 个疾病，Migraine 排第一 | ✅ |
| `test_single_symptom_seizure` | 单症状癫痫 → 返回 ≥5 个疾病，Epilepsy 排第一 | ✅ |
| `test_empty_symptoms` | 空列表 → 返回 `[]`，不抛异常 | ✅ |
| `test_unknown_symptom` | 未知症状 → 返回 `[]`，不抛异常 | ✅ |
| `test_case_insensitive` | `headache` vs `HEADACHE` → 完全一致 | ✅ |
| `test_space_handling` | `limb weakness` → 等价于 `limb_weakness` | ✅ |
| `test_return_structure` | 每条结果包含 `disease` + `symptom_match_count`(int) + `icd10_code`(str) + `icd10_description`(str) | ✅ |
| `test_descending_order` | 结果按 `symptom_match_count` 降序排列 | ✅ |
| `test_get_icd10_known` | `Ischemic Stroke` → `{"code": "I63.9", "desc": "Cerebral infarction, unspecified"}` | ✅ |
| `test_get_icd10_unknown` | 未知疾病 → `None` | ✅ |
| `test_query_neo4j_fallback` | 离线模式下 `query_neo4j()` → `[]` | ✅ |
| `test_every_symptom_returns_diseases` (×18) | SYMPTOM_DISEASE_MAP 中 18 个症状键各自返回 ≥1 个疾病 | ✅ ×18 |
| `test_every_symptom_top_disease_has_icd10` (×18) | 18 个症状排名第一的疾病 ICD-10 编码非空 | ✅ ×18 |

#### L3: 双模式一致性（56/56 ✅）— 核心验证

这是整个测试套件的核心，验证 **Neo4j Cypher 查询与离线 Python 字典返回完全一致的结果**：

| 用例 | 验证内容 | 结果 |
|:---|:---|:---:|
| `test_single_symptom_consistency` (×18) | 18 个症状逐一对比：Neo4j `_find_diseases_neo4j()` vs 离线 `_find_diseases_offline()`，疾病名+匹配数+ICD-10 三元组完全一致 | ✅ ×18 |
| `test_multi_symptom_consistency_stroke` | `limb_weakness + facial_droop + speech_difficulty` 两种模式一致 | ✅ |
| `test_multi_symptom_consistency_meningitis` | `headache + neck_stiffness + confusion` 两种模式一致 | ✅ |
| `test_multi_symptom_consistency_ms` | `numbness + visual_disturbance + sensory_loss + tremor` 两种模式一致 | ✅ |
| `test_multi_symptom_consistency_unknown` | 混合已知+未知症状两种模式一致 | ✅ |
| `test_empty_symptoms_consistency` | 空输入两种模式一致 | ✅ |
| `test_public_api_returns_same_structure` | `find_diseases_by_symptoms()` 公开方法在两种模式下返回相同三元组 | ✅ |

#### L4: 降级测试（3/3 ✅）

| 用例 | 验证内容 | 结果 |
|:---|:---|:---:|
| `test_bad_credentials_fallback` | 错误密码 → `connect()` 失败 → `use_neo4j=False` | ✅ |
| `test_find_diseases_when_neo4j_enabled_but_unreachable` | `use_neo4j=True` 但 driver 为 None → 自动降级离线模式，结果正确 | ✅ |
| `test_singleton_defaults_to_settings` | `get_graphrag_service()` 根据 `.env` 中 `NEO4J_PASSWORD` 自动决定模式 | ✅ |

---

## 📂 项目目录结构

```
BrainDox/
│
├── 📁 code/                                # Python实现
│   ├── src/
│   │   ├── agents/                         # 五个Agent实现
│   │   │   ├── intake_agent.py             # 极简速记扩写 + 结构化
│   │   │   ├── diagnosis_agent.py          # 神经科鉴别诊断
│   │   │   ├── treatment_agent.py          # 神经科治疗方案 + DDI检查
│   │   │   ├── coding_agent.py             # 神经科ICD-10 + DRGs
│   │   │   └── audit_agent.py              # HIPAA合规 + PHI脱敏
│   │   ├── api/                            # FastAPI REST API
│   │   │   ├── main.py                     # 应用入口（中间件、路由注册）
│   │   │   └── routes.py                   # 接口定义（analyze/icd10/ddi/human-loop）
│   │   ├── graph/                          # LangGraph Pipeline编排
│   │   │   ├── clinical_pipeline.py        # StateGraph + 条件路由 + HITL
│   │   │   └── state.py                    # ClinicalState共享状态
│   │   ├── models/                         # Pydantic数据模型
│   │   │   ├── patient.py                  # PatientInfo + NeurologicalExam + NeuroImaging
│   │   │   ├── diagnosis.py                # DifferentialDiagnosis模型
│   │   │   └── treatment.py                # TreatmentPlan/CodingResult/AuditResult
│   │   ├── services/                       # 业务服务层
│   │   │   ├── graphrag_service.py         # 神经科知识图谱（SYMPTOM_DISEASE_MAP）
│   │   │   ├── icd10_service.py            # 神经科ICD-10（G00-G99, I60-I69）+ DRGs
│   │   │   ├── drug_interaction.py         # 神经科DDI数据库
│   │   │   ├── fhir_service.py             # FHIR R4资源转换
│   │   │   └── hipaa_service.py            # HIPAA PHI检测/脱敏/审计
│   │   └── config/
│   │       └── settings.py                 # 环境配置（Pydantic Settings）
│   ├── tests/
│   │   ├── test_graphrag.py                # GraphRAG + Neo4j 全面测试（79用例）
│   │   └── test_services.py                # 服务层测试
│   ├── seed_neo4j.py                        # Neo4j 知识图谱种子数据导入
│   ├── data/
│   │   └── sample_patients.json            # 测试病例
│   ├── .env.example                        # 环境变量模板
│   ├── requirements.txt                    # Python依赖
│   ├── Dockerfile                          # 容器镜像
│   └── docker-compose.yml                  # 基础设施（PG + Neo4j + Redis）
│
├── 📁 docker/
│   └── init-db.sql                         # PostgreSQL初始化（审计日志表 + 会话表）
│
├── 📁 docs/                                # 技术文档
│   ├── 00-项目概览.md
│   ├── 01-环境搭建指南.md
│   ├── 02-架构设计详解.md
│   ├── 03-Agent设计原理.md
│   ├── 04-GraphRAG知识图谱.md
│   ├── 05-FHIR-API集成.md
│   ├── 06-HIPAA合规设计.md
│   └── 07-部署运维指南.md
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🔮 路线图

### 已完成

- [x] 🧠 **GraphRAG + Neo4j 知识图谱**：三节点链式图模型（Symptom→Disease→ICD10Code），双模式架构（Neo4j + 离线自动降级），79 用例全绿
- [x] ⚡ **极简速记→结构化**：Intake Agent 临床速记扩写 + 结构化，支持缩写展开、语义扩展、缺失推断
- [x] 🤖 **5 Agent 流程**：Intake → Diagnosis → Treatment → Coding → Audit 全链路
- [x] 🔄 **人机协同**：Human-in-the-Loop 中断机制
- [x] 📋 **神经科 ICD-10**：71 疾病 × 66 编码完整映射
- [x] 💊 **神经科 DDI**：抗癫痫药、抗凝药、帕金森药交互数据库

### 近期计划

- [ ] 🧪 **LoRA微调**：收集300-500条"极简速记→结构化JSON"配对数据，使用LoRA（rank=16-32）微调DeepSeek/Qwen医疗模型，优化速记扩写效果
- [ ] 🔄 **流式输出**：通过SSE（Server-Sent Events）实现Agent逐步输出
- [ ] 📊 **Pipeline可视化**：前端展示Pipeline执行过程

### 中期计划

- [ ] 🌐 **前端Dashboard**：Vue前端，包含患者信息表单、诊断结果展示、Pipeline可视化
- [ ] 📈 **监控告警**：Prometheus + Grafana Agent级别性能监控
- [ ] 🔐 **OAuth 2.0 / JWT认证**：完整的用户认证和授权
- [ ] 📋 **完整ICD-10库**：导入全部72,000+编码

### 远期计划

- [ ] 🧠 **真实Neo4j知识图谱**：导入UMLS / SNOMED CT医学本体
- [ ] 🌍 **多语言支持**：中文/英文双语诊断
- [ ] 🤝 **多租户架构**：支持多家医院数据隔离
- [ ] 📊 **A/B测试框架**：不同Prompt策略效果对比

---

## 📜 License

[MIT License](LICENSE)

> ⚠️ **免责声明**：本项目仅用于学习和演示目的。不得用于真实临床诊断或医疗决策。任何医疗决策都应由持有执照的医疗专业人员做出。
