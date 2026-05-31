<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6&height=200&section=header&text=BrainDox&fontSize=70&fontColor=fff&desc=精神科多Agent临床决策辅助系统&descSize=18&descAlignY=65">
    <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6&height=200&section=header&text=BrainDox&fontSize=70&fontColor=fff&desc=精神科多Agent临床决策辅助系统&descSize=18&descAlignY=65">
  </picture>
</p>

<p align="center">
  <strong>🧠 让每一次精神科诊断，都有知识图谱的支撑和 LLM 的推理，更有医生的最终判断</strong>
</p>

<p align="center">
  <a href="#-核心流程">核心流程</a> •
  <a href="#-架构全景">架构全景</a> •
  <a href="#-GraphRAG-检索机制">GraphRAG 检索机制</a> •
  <a href="#-核心功能">核心功能</a> •
  <a href="#-人机协同流程">人机协同</a> •
  <a href="#-API-文档">API 文档</a> •
  <a href="#-快速开始">快速开始</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/LangGraph-0.2+-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white" alt="LangGraph">
  <img src="https://img.shields.io/badge/FastAPI-0.115+-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/DeepSeek-V4-4F46E5?style=for-the-badge" alt="DeepSeek">
  <img src="https://img.shields.io/badge/Vue_3-4.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue 3">
  <img src="https://img.shields.io/badge/GraphRAG-加权检索-005682?style=for-the-badge" alt="GraphRAG">
  <img src="https://img.shields.io/badge/ICD-10-F00-F99-FF6B6B?style=for-the-badge" alt="ICD-10">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="MIT">
</p>

<p align="center">
  <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fbraindox%2Fbraindox&countColor=%236366f1&labelStyle=upper" alt="访问量">
</p>

<hr>

## 🎯 项目定位

> **BrainDox** 是一个面向精神科临床场景的 **多 Agent 决策辅助系统**，覆盖 **接诊 → 诊断 → 治疗 → 编码 → 审计** 全流程。
>
> 核心设计哲学：**知识图谱做精确检索 → LLM 做深度推理 → 医生做最终决策**，三者互补，形成闭环。

### 它解决了什么问题？

| 痛点 | 传统方式 | BrainDox 方案 |
|:---|:---|:---|
| **精神科诊断高度依赖经验** | 年轻医生容易漏诊、误诊 | GraphRAG 加权检索 top3 候选 + LLM DSM-5 证据链分析 |
| **诊疗方案选择困难** | 查阅指南耗时，容易遗漏 | AI 推荐循证治疗方案，支持医生选择后的动态调整 |
| **病历书写与编码繁琐** | 手动填写，容易出错 | ICD-10 自动编码 + DRG 分组 |
| **诊断不确定性** | 黑盒输出，医生不敢信 | 图路径+加权评分+推理链全透明展示，医生最终决策 |

### 与纯自动化 Agent 方案的本质区别

```
纯自动化 Agent:
  [输入] → LLM 诊断 → LLM 治疗 → [输出]
            ↑ 黑盒，医生只能接受

BrainDox（人机协同）:
  [输入] → GraphRAG 加权检索 → LLM 分析 → 医生选择 → 动态治疗 → [输出]
                                   ↑
                          透明可解释，医生全程可控
```

<br>

---

## 🚀 核心流程

<p align="center">
  <b>一次完整的诊断会话只需 4 步</b>
</p>

<p align="center">
  <code>① 填表单</code> &nbsp;→&nbsp;
  <code>② 看候选</code> &nbsp;→&nbsp;
  <code>③ 选诊断</code> &nbsp;→&nbsp;
  <code>④ 得方案</code>
</p>

<br>

### 📝 第一步：医生填写结构化表单

医生在左侧表单填写 4 个必填字段 + 5 个选填字段，零学习成本。

```
┌───────────────────────────────────────────────────────────┐
│  🧠 精神科临床决策                   场景：[初诊 ▼]      │
├───────────────────────────────────────────────────────────┤
│  主诉 *    情绪低落、兴趣丧失、早醒、体重下降......      │
│  症状 *    情绪低落, 兴趣丧失, 早醒, 体重下降......      │
│  自杀风险 * [低风险 - 被动自杀意念 ▼]                    │
│  物质使用 * [否认吸烟、饮酒及药物滥用史 ▼]               │
│  姓名       (选填)        年龄   25                       │
│  性别 [女 ▼]  既往病史    (选填)                         │
│  家族史     (选填)                                        │
│                                                           │
│              [🧠 开始分析]                                │
└───────────────────────────────────────────────────────────┘
```

### 🃏 第二步：查看 3 个候选诊断卡片

GraphRAG **加权检索** + LLM 给出透明、可解释的诊断分析，每张卡片包含：

```
┌──────────────────────────────────────────────────────────────────────────┐
│  🩺 GraphRAG 鉴别诊断 — 请选择最可能的诊断                              │
├──────────────┬──────────────────┬────────────────────────────────────────┤
│              │                  │                                        │
│    🔴 #1     │      🟡 #2       │        🟢 #3                          │
│ 重性抑郁障碍  │    双相II型障碍  │      广泛性焦虑障碍                    │
│  F32.9       │     F31.81       │       F41.1                           │
│  匹配 5/6    │     匹配 3/6     │       匹配 2/6                        │
│              │                  │                                        │
│ ┌─────────────────────────┐    │                                        │
│ │ 加权评分         3.85   │    │                                        │
│ │ ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░  │    │                                        │
│ └─────────────────────────┘    │                                        │
│ ┌ 匹配贡献明细 ─────────┐     │                                        │
│ │ 情绪低落  w=0.95×idf= │     │                                        │
│ │ 快感缺失  w=0.90×idf= │     │                                        │
│ │ 早醒      w=0.60×idf= │     │                                        │
│ │ 体重下降  w=0.55×idf= │     │                                        │
│ │ 自杀意念  w=0.75×idf= │     │                                        │
│ └────────────────────────┘     │                                        │
│              │                  │                                        │
│ ┌──────────┐ │  ┌───────────┐  │  ┌────────────────────────────────┐   │
│ │图检索路径  │  │ 图检索路径  │  │  │ 图检索路径                    │   │
│ └──────────┘ │  └───────────┘  │  └────────────────────────────────┘   │
│ 情绪低落────┐│  早醒──────┐    │  焦虑────────→ GAD                     │
│ 快感缺失──┐││  迟滞────┐│    │                                        │
│ 早醒────┐├┤│  ┌───────┐││    │                                        │
│ 体重下降┐├┤│  │双相II │││    │                                        │
│ 自杀意念├┤││  └───────┘││    │                                        │
│ 迟滞───┤├┤│           │││    │                                        │
│ ┌─────┐││││           │││    │                                        │
│ │ MDD │┘┘┘┘           ┘┘     │                                        │
│ └─────┘                      │                                        │
├──────────────┴──────────────────┴────────────────────────────────────────┤
│  已选择：重性抑郁障碍                                                      │
│         [✅ 确认诊断，继续治疗方案]                                       │
└──────────────────────────────────────────────────────────────────────────┘
```

### ✅ 第三步：医生选择诊断

点击卡片 → 诊断高亮 → 点击确认 → Pipeline 自动恢复

### 💊 第四步：获得动态治疗方案

治疗方案根据医生选择的诊断**自动调整**：

| 医生选择的诊断 | 治疗方案 |
|:---|:---|
| 重性抑郁障碍 | SSRI 单药治疗 + CBT 心理治疗 |
| 双相II型障碍（抑郁发作） | 心境稳定剂 + 抗抑郁药谨慎使用（避免诱发躁狂） |
| 广泛性焦虑障碍 | SNRI 或 SSRI + 放松训练 |

<br>

---

## 🏗️ 架构全景

### 系统架构图

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                  前端 (Vue 3 + Naive UI)                      │
│  ┌──────────┐  ┌─────────────────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │ 表单输入  │  │ 候选诊断三列卡片     │  │ 治疗面板  │  │ 编码/审计面板     │  │
│  │          │  │ + 加权评分条         │  │          │  │                   │  │
│  │          │  │ + 匹配贡献明细       │  │          │  │                   │  │
│  └────┬─────┘  └─────────┬───────────┘  └────┬─────┘  └───────────────────┘  │
│       │                  │                     │                              │
└───────┼──────────────────┼─────────────────────┼──────────────────────────────┘
        │                  │                     │
   POST /analyze_form  展示候选诊断         POST /confirm_diagnosis
        │                  │                     │
┌───────┼──────────────────┼─────────────────────┼──────────────────────────────┐
│       ▼                  ▼                     ▼                              │
│                    API 层 (FastAPI)                                           │
│  ┌────────────────────────────────────────────────────────────────────────┐   │
│  │  routes.py                                                             │   │
│  │  /analyze_form → 构造 patient_info → 调用 Pipeline                     │   │
│  │  /confirm_diagnosis → 更新 state → 恢复 Pipeline                       │   │
│  │  /icd10/search, /ddi/check                                             │   │
│  └───────────────────────────┬────────────────────────────────────────────┘   │
│                              │                                                │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │           LangGraph Pipeline (StateGraph)                             │   │
│  │                                                                        │   │
│  │    ┌──────────────────┐                                               │   │
│  │    │ SufficiencyCheck │ ← 规则引擎判断信息是否充足                    │   │
│  │    └────────┬─────────┘                                               │   │
│  │             │ 通过                                                     │   │
│  │    ┌────────▼─────────┐                                               │   │
│  │    │  Diagnosis Agent │ ← LLM 提取症状 + GraphRAG 加权检索 + DSM-5   │   │
│  │    └────────┬─────────┘                                               │   │
│  │             │                                                        │   │
│  │    ╔════════╧══════════╗                                              │   │
│  │    ║  HITL 中断点      ║ ← interrupt_before=["treatment"]            │   │
│  │    ║  human_review_    ║                                              │   │
│  │    ║  status: waiting  ║                                              │   │
│  │    ╚════════╤══════════╝                                              │   │
│  │             │ 医生确认后 resume                                        │   │
│  │    ┌────────▼─────────┐                                               │   │
│  │    │ Treatment Agent  │ ← 基于 state.selected_disease 动态调整       │   │
│  │    └────────┬─────────┘                                               │   │
│  │             │                                                         │   │
│  │    ┌────────▼─────────┐                                               │   │
│  │    │  Coding Agent    │ ← ICD-10 自动编码 + DRG 分组                 │   │
│  │    └────────┬─────────┘                                               │   │
│  │             │                                                         │   │
│  │    ┌────────▼─────────┐                                               │   │
│  │    │  Audit Agent     │ ← HIPAA 合规检查（纯规则引擎）               │   │
│  │    └──────────────────┘                                               │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        服务层                                         │   │
│  │  ┌──────────────────────┐  ┌────────────────┐  ┌────────────────┐   │   │
│  │  │  GraphRAG Service    │  │ ICD-10 Service │  │ Drug Interact │   │   │
│  │  │  • 加权评分检索       │  │ (PostgreSQL)   │  │ (DDI 检查)    │   │   │
│  │  │  • IDF 逆文档频率     │  │                │  │                │   │   │
│  │  │  • 同义词扩展匹配     │  │                │  │                │   │   │
│  │  │  • 审计日志全链路     │  │                │  │                │   │   │
│  │  │  • Neo4j / 离线双模  │  │                │  │                │   │   │
│  │  └────────┬─────────────┘  └────────────────┘  └────────────────┘   │   │
│  │           │                                                          │   │
│  │  ┌────────▼──────────────────────────────┐                          │   │
│  │  │ 知识库（三层映射体系）                   │                          │   │
│  │  │  SYMPTOM_DISEASE_MAP  ← 47 键 → 70+ 疾病 │                      │   │
│  │  │  SYMPTOM_WEIGHTS     ← 150+ 症状-疾病权重 │                      │   │
│  │  │  SYMPTOM_ALIAS       ← 84 中文别名        │                      │   │
│  │  │  SYMPTOM_ALIASES     ← 200+ 扩展同义词    │                      │   │
│  │  │  DISEASE_ICD10_MAP   ← 70+ ICD-10 编码   │                      │   │
│  │  └───────────────────────────────────────────┘                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────┐          │
│  │  ClinicalState (Pydantic)                                    │          │
│  │  patient_info | diagnosis | candidate_diseases[]              │          │
│  │  selected_disease | human_review_status | treatment_plan     │          │
│  │  coding_result | audit_result | errors[]                      │          │
│  └──────────────────────────────────────────────────────────────┘          │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────┐      │
│  │  外部存储                                                       │      │
│  │  ┌──────────┐  ┌──────────────┐  ┌────────────┐  ┌───────────┐  │      │
│  │  │  Neo4j   │  │  PostgreSQL  │  │   Redis    │  │  FHIR     │  │      │
│  │  │ 图谱数据库│  │ ICD-10/DRG   │  │  缓存      │  │  EHR 接口  │  │      │
│  │  └──────────┘  └──────────────┘  └────────────┘  └───────────┘  │      │
│  └──────────────────────────────────────────────────────────────────┘      │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 数据流链路

```
患者主诉 → LLM 语义提取（唯一模糊环节）
                ↓  标准化症状键列表
          三层归一化匹配
            ↓
        ┌────────────────────────────────┐
        │  4层匹配优先级:                  │
        │  ① SYMPTOM_ALIAS 精确中→英      │
        │  ② SYMPTOM_ALIASES 同义词扩展    │
        │  ③ 英文格式化（lower+replace）    │
        │  ④ SYMPTOM_DISEASE_MAP 键匹配    │
        └────────────────────────────────┘
                ↓  归一化后的键
          加权评分检索
        score = Σ(weight × IDF)
                ↓  排序后 top3
          LLM DSM-5 证据分析
                ↓
         医生 HITL 审核选择
```

### 双模式自动降级

```
┌─────────────────────────────────────┐
│         生产模式 (Neo4j)             │
│  • 图数据库存储节点+关系+权重+同义词  │
│  • Cypher 三跳查询 (Symptom→Disease)→ICD10│
│  • SUM(COALESCE(r.weight, 1.0)) 排序  │
└──────────────┬──────────────────────┘
               │ 连接失败自动降级
               ▼
┌─────────────────────────────────────┐
│         离线模式 (字典)               │
│  • Python dict O(1) 精确查找        │
│  • 加权评分 + IDF 排序              │
│  • 零依赖，无需外部服务              │
└─────────────────────────────────────┘
```

<br>

---

## ⚡ GraphRAG 检索机制

### 三层语义匹配体系

BrainDox 的检索系统从用户输入到疾病结果，经过**三层匹配 + 加权评分**：

#### 第一层：LLM 语义提取（唯一模糊环节）

LLM 从患者主诉中提取标准化症状键，充当"智能翻译器"：

```
"最近心情不好，对什么都没兴趣，睡不着，早醒，想死"
                         ↓ LLM
["depressed_mood", "anhedonia", "difficulty_falling_asleep",
 "early_morning_awakening", "suicidal_ideation"]
```

LLM 失败后自动降级到规则方法。

#### 第二层：四阶归一化匹配

```
输入: "情绪低落"
  ↓ ① SYMPTOM_ALIAS      → "情绪低落" ∈ SYMPTOM_ALIAS      → "depressed_mood" ✓
输入: "没精神"
  ↓ ② SYMPTOM_ALIASES    → "没精神" ∈ SYMPTOM_ALIASES       → "fatigue"        ✓
输入: "Depressed Mood"
  ↓ ③ 英文格式化         → "depressed_mood" = key            → 直接命中         ✓
输入: "depressed_mood"
  ↓ ④ 直接键匹配         → key ∈ SYMPTOM_DISEASE_MAP        → 直接命中         ✓
```

#### 第三层：加权评分排序

**评分公式**：

```
score(disease) = Σ weight(symptom_key, disease) × IDF(symptom_key)
                 for each matched symptom
```

**权重表**（`SYMPTOM_WEIGHTS`）：

症状-疾病关联强度，基于 DSM-5 诊断标准中的敏感度/特异度：

| 症状 | 疾病 | 权重 | 说明 |
|:---|:---|:---:|:---|
| `depressed_mood` | 重性抑郁障碍 | **0.95** | 核心诊断标准（高度特异） |
| `depressed_mood` | 适应障碍 | 0.40 | 有抑郁情绪但程度较轻 |
| `depressed_mood` | 物质所致心境障碍 | 0.25 | 关联弱，需排除物质因素 |
| `mania` | 双相I型障碍 | **0.95** | 核心诊断标准 |
| `auditory_hallucination` | 精神分裂症 | **0.90** | 核心诊断标准 |
| `auditory_hallucination` | 物质所致精神病性障碍 | 0.40 | 需排除物质因素 |

未指定的组合默认权重为 **1.0**，完全向后兼容。

**IDF（逆文档频率）**：

```
IDF = ln(总疾病数 / 关联该症状的疾病数) + 1
```

| 症状 | 关联疾病数 | IDF | 含义 |
|:---|:---:|:---:|:---|
| `depressed_mood` | 5 | 2.64 | 低区分度，很多疾病都有 |
| `fatigue` | 4 | 2.86 | 中低区分度 |
| `catatonia` | 3 | 3.15 | 高区分度，特异症状 |
| `tics` | 3 | 3.15 | 高区分度，高度特异 |

### 完整的检索链路对比

| 版本 | 排序方式 | 区分度 | 可解释性 |
|:---|:---|:---:|:---:|
| ❌ 旧版 | `COUNT(matched_symptoms)` | 低——所有症状贡献相等 | 低——只看命中数 |
| ✅ **新版** | `Σ(weight × IDF)` | **高**——核心症状+罕见症状权重更大 | **高**——w×idf=contribution 全透明 |

<br>

---

## 🎨 核心功能

### GraphRAG 加权知识图谱检索

- **47 个标准化精神科症状键**（覆盖 DSM-5 主要诊断分类）
- **150+ 条症状-疾病权重映射**（基于 DSM-5 诊断标准敏感度/特异度）
- **IDF 逆文档频率加权**（罕见症状获得更高权重）
- **四层归一化匹配**：别名 → 同义词 → 格式化 → 精确键
- **84 个中文别名 + 200+ 扩展同义词**（LLM 降级后依然高召回）
- **双模式自动降级**：Neo4j 不可用时无缝切换到离线字典
- **全链路审计日志**：输入症状 → 归一化键 → IDF 值 → top 结果

### 加权评分可视化

前端卡片展示完整的评分链路：

```
加权评分         3.85
▓▓▓▓▓▓▓▓▓░░░░░░░░░

匹配贡献明细
情绪低落    w=0.95 × idf=2.64 = 2.508
快感缺失    w=0.90 × idf=2.64 = 2.376
早醒        w=0.60 × idf=2.64 = 1.584
体重下降    w=0.55 × idf=2.86 = 1.573
自杀意念    w=0.75 × idf=2.30 = 1.725
```

### 多 Agent 协同决策

| Agent | 职责 | 技术 |
|:---|:---|:---|
| **Intake Agent** | 结构化患者信息提取 | 规则引擎（表单模式）/ LLM（文本模式） |
| **Diagnosis Agent** | 鉴别诊断 + GraphRAG 检索 | LLM 提取症状 → 加权图谱检索 → DSM-5 分析 |
| **Treatment Agent** | 循证治疗方案推荐 | 精神药理学 + 心理治疗 + DDI 检查 |
| **Coding Agent** | ICD-10 自动编码 | ICD-10 编码映射 + DRG 分组 |
| **Audit Agent** | HIPAA 合规审计 | PHI 检测 + 合规规则引擎 |

### Human-in-the-Loop（人机协同）

- **诊断中断**：Diagnosis 完成后 Pipeline 自动暂停
- **医生选择**：从 3 个候选诊断中选择最可能的诊断
- **动态治疗**：治疗方案根据医生选择的诊断自动调整
- **审计追溯**：所有 HITL 操作记录到审计日志

### 双模式运行

| 特性 | 生产模式 | 离线模式 |
|:---|:---|:---|
| **数据存储** | Neo4j 图数据库 | Python dict（内存） |
| **查询方式** | Cypher 三跳查询 | O(1) 哈希查找 |
| **权重支持** | INDICATES 关系 weight 属性 | SYMPTOM_WEIGHTS 字典 |
| **同义词支持** | Symptom 节点 aliases 属性 | SYMPTOM_ALIASES 字典 |
| **依赖** | Neo4j 容器 | 无（零依赖） |
| **降级** | 自动（连接失败） | 始终可用 |

<br>

---

## 🔄 人机协同流程

```
患者表单提交
     │
     ▼
┌───────────────────┐
│ SufficiencyCheck  │ ← 规则引擎：检查关键字段是否充足
│ 主诉 ✓ 症状 ✓    │    自杀风险评估 ✓ 物质使用 ✓
└───────┬───────────┘
        │ 通过
        ▼
┌─────────────────────────────────────────────────────────────┐
│  Diagnosis Agent                                            │
│  1. LLM 提取标准化症状键（或规则降级）                        │
│  2. GraphRAG 加权检索 top3 候选疾病                          │
│  3. LLM 对每个候选做 DSM-5 证据链分析                        │
│     - 支持证据 / 不支持证据 / 临床推理                       │
│     - 置信度评分 / 建议补充检查                              │
│  4. 设置 human_review_status = "awaiting_diagnosis"          │
└───────────────────────────┬─────────────────────────────────┘
                            │
                        [⏸ 暂停]
                            │
               ┌────────────┴────────────┐
               │                         │
         医生查看 3 个候选              AI 错误
         选择最可能的诊断               调整诊断
               │                         │
               └────────────┬────────────┘
                            │ 确认
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Treatment Agent                                            │
│  • 基于 selected_disease 生成动态治疗方案                   │
│  • 精神药理学推荐（SSRI/SNRI/心境稳定剂/抗精神病药等）       │
│  • 循证心理治疗推荐（CBT/DBT/IPT/ERP 等）                   │
│  • 药物交互检查（DDI）                                       │
│  • 住院需求评估                                              │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Coding Agent                                               │
│  • ICD-10 编码（F00-F99 精神与行为障碍）                     │
│  • DRG 疾病诊断相关分组                                      │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Audit Agent                                                │
│  • PHI 检测（姓名/身份证/电话/邮箱等 14 类）                │
│  • 合规审计报告                                              │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
                          [END]
```

<br>

---

## 🌐 API 文档

完整 API 文档在启动后访问：**[http://localhost:8001/docs](http://localhost:8001/docs)**（Swagger UI）

### 核心端点

| 端点 | 功能 | HITL |
|:---|:---|:---:|
| `POST /api/v1/clinical/analyze_form` | 表单模式分析 | ✅ 自动暂停 |
| `POST /api/v1/clinical/confirm_diagnosis` | 医生确认诊断 | ✅ 恢复 Pipeline |
| `POST /api/v1/clinical/analyze` | 文本模式分析 | 可选 |
| `POST /api/v1/clinical/icd10/search` | ICD-10 搜索 | - |
| `GET /api/v1/clinical/icd10/{code}` | ICD-10 查询 | - |
| `POST /api/v1/clinical/ddi/check` | 药物交互检查 | - |
| `GET /health` | 健康检查 | - |

### 请求/响应示例

#### 1. 表单分析

```
POST /api/v1/clinical/analyze_form
```

**请求体**：

```json
{
  "chief_complaint": "情绪低落、兴趣丧失、早醒、体重下降伴自杀意念，持续约一个半月",
  "symptoms": "情绪低落, 兴趣丧失, 早醒, 体重下降, 被动自杀意念, 精神运动性迟滞",
  "suicide_risk": "低风险 - 被动自杀意念，无具体计划，无既往尝试，家属可监护",
  "substance_use": "否认吸烟、饮酒及药物滥用史",
  "name": "",
  "age": 25,
  "gender": "女",
  "medical_history": "",
  "family_history": "",
  "scenario": "new_visit",
  "thread_id": "session-1712345678"
}
```

**响应**：

```json
{
  "scenario": "new_visit",
  "diagnosis": {
    "candidate_analyses": [
      {
        "disease_name": "重性抑郁障碍",
        "icd10_hint": "F32.9",
        "confidence": 0.92,
        "supporting_evidence": ["情绪低落持续6周", "快感缺失", "早醒", "体重下降5%"],
        "opposing_evidence": [],
        "reasoning": "核心症状组合+病程>2周+功能损害→符合MDD诊断标准"
      }
    ],
    "primary_recommendation": {
      "disease_name": "重性抑郁障碍",
      "reasoning": "5/6症状匹配，加权评分最高"
    }
  },
  "candidate_diseases": [
    {
      "disease": "重性抑郁障碍",
      "icd10_code": "F32.9",
      "icd10_description": "重性抑郁障碍，单次发作，未特定",
      "symptom_match_count": 5,
      "total_symptoms": 6,
      "weighted_score": 3.85,
      "matched_symptoms": ["depressed mood", "anhedonia", "early morning awakening", "weight loss", "suicidal ideation"],
      "match_details": [
        {"symptom": "depressed mood", "weight": 0.95, "idf": 2.64, "contribution": 2.508},
        {"symptom": "anhedonia", "weight": 0.90, "idf": 2.64, "contribution": 2.376},
        {"symptom": "early morning awakening", "weight": 1.0, "idf": 2.64, "contribution": 2.640}
      ]
    }
  ],
  "human_review_status": "awaiting_diagnosis",
  "selected_disease": "",
  "needs_more_info": false,
  "retry_count": 0,
  "errors": []
}
```

#### 2. 诊断确认

```
POST /api/v1/clinical/confirm_diagnosis
```

**请求体**：

```json
{
  "thread_id": "session-1712345678",
  "selected_disease": "重性抑郁障碍"
}
```

**响应**：完整的 Pipeline 结果（含 `treatment_plan`、`coding_result`、`audit_result`）

#### 3. 快速测试

```powershell
# PowerShell 测试表单分析
$body = @{
    chief_complaint = "情绪低落、兴趣丧失、早醒，持续一个月"
    symptoms = "情绪低落,兴趣丧失,早醒"
    suicide_risk = "低风险 - 被动自杀意念"
    substance_use = "否认"
    scenario = "new_visit"
    thread_id = "test-001"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8001/api/v1/clinical/analyze_form" `
    -Method Post -ContentType "application/json" -Body $body
```

<br>

---

## 🚀 快速开始

### 前置条件

| 依赖 | 版本 | 获取方式 |
|:---|:---:|:---|
| Python | ≥ 3.11 | [python.org](https://python.org) 或 Anaconda |
| Node.js | ≥ 18 | [nodejs.org](https://nodejs.org) |
| UV | 最新 | `pip install uv` |
| DeepSeek API Key | — | [platform.deepseek.com](https://platform.deepseek.com) |

### 后端启动

```bash
# 1. 进入后端目录
cd code

# 2. 创建 UV 虚拟环境并安装依赖
uv venv
.venv\Scripts\activate   # Windows
source .venv/bin/activate # macOS/Linux
uv pip install -r requirements.txt

# 3. 配置环境变量
copy .env.example .env   # Windows
# cp .env.example .env   # macOS/Linux

# 编辑 .env，填入 DeepSeek API Key：
#   OPENAI_API_KEY=sk-your-deepseek-api-key
#   OPENAI_MODEL=deepseek-chat
#   OPENAI_BASE_URL=https://api.deepseek.com

# 4. 启动 API 服务
uv run uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8001

# ✅ 看到以下输出说明启动成功：
#   INFO:     Uvicorn running on http://0.0.0.0:8001
#   INFO:     Application startup complete.
```

### 前端启动

```bash
# 1. 进入前端目录
cd fe

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# ✅ 访问 http://localhost:5173
#    表单已预填测试用例
```

### 环境变量参考

```ini
# ============== LLM 配置 ==============
OPENAI_API_KEY=sk-your-deepseek-api-key
OPENAI_MODEL=deepseek-chat
OPENAI_BASE_URL=https://api.deepseek.com

# ============== Neo4j 配置（可选） ==============
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=

# ============== 应用配置 ==============
APP_HOST=0.0.0.0
APP_PORT=8001
LOG_LEVEL=INFO
```

> **注意**：`NEO4J_PASSWORD` 为空时自动使用**离线字典模式**，无需启动 Neo4j 容器即可运行。

### 初始化知识图谱（可选）

如果需要启用 Neo4j 模式并包含权重和同义词：

```bash
# 1. 启动 Neo4j（Docker）
docker run -d --name neo4j -p 7687:7687 -e NEO4J_AUTH=neo4j/your-password neo4j:5

# 2. 配置 .env
# NEO4J_PASSWORD=your-password

# 3. 导入种子数据（含权重、同义词）
cd code
uv run python seed_neo4j.py

# ✅ 输出示例：
#   Symptom nodes:  47 (含 aliases)
#   Disease nodes:  71
#   ICD10Code nodes: 66
#   INDICATES edges: 220+ (含 weight)
```

<br>

---

## 🧪 测试与验证

### 健康检查

```bash
curl http://localhost:8001/health
```

预期响应：
```json
{
  "status": "healthy",
  "service": "clinical-decision-system",
  "version": "1.0.0"
}
```

### 运行测试套件

```bash
cd code

# 运行所有离线测试（无需 Neo4j）
uv run pytest tests/test_graphrag.py -v -k "offline"

# 运行所有测试（含 Neo4j，需先启动容器）
uv run pytest tests/test_graphrag.py -v

# 仅运行 Neo4j 测试
uv run pytest tests/test_graphrag.py -v -k "neo4j"

# 运行服务层测试
uv run pytest tests/test_services.py -v
```

### 完整的端到端测试

```powershell
# 1. 提交表单
$response = Invoke-RestMethod -Uri "http://localhost:8001/api/v1/clinical/analyze_form" `
    -Method Post -ContentType "application/json" -Body '{
        "chief_complaint": "情绪低落、兴趣丧失、早醒、体重下降伴自杀意念",
        "symptoms": "情绪低落,兴趣丧失,早醒,体重下降,被动自杀意念,精神运动性迟滞",
        "suicide_risk": "低风险 - 被动自杀意念",
        "substance_use": "否认吸烟饮酒及药物滥用史",
        "scenario": "new_visit",
        "thread_id": "e2e-test-001"
    }'

# 2. 查看加权评分结果
$response.candidate_diseases | ForEach-Object {
    Write-Host "$($_.disease): weighted_score=$($_.weighted_score)"
    $_.match_details | ForEach-Object {
        Write-Host "  $($_.symptom): w=$($_.weight) × idf=$($_.idf) = $($_.contribution)"
    }
}

# 3. 确认诊断
$confirm = Invoke-RestMethod -Uri "http://localhost:8001/api/v1/clinical/confirm_diagnosis" `
    -Method Post -ContentType "application/json" -Body '{
        "thread_id": "e2e-test-001",
        "selected_disease": "重性抑郁障碍"
    }'

# 4. 查看治疗方案
$confirm.treatment_plan
```

<br>

---

## 📊 知识图谱映射

### 症状-疾病加权映射（部分）

| 症状 | 加权关联疾病 | 权重 | 检索IDF |
|:---|:---|:---:|:---:|
| 情绪低落 | **重性抑郁障碍** | **0.95** | 2.64 |
| | 双相II型障碍 | 0.60 | 2.64 |
| | 持续性抑郁障碍（恶劣心境） | 0.80 | 2.64 |
| | 适应障碍 | 0.40 | 2.64 |
| | 物质所致心境障碍 | 0.25 | 2.64 |
| 幻听 | **精神分裂症** | **0.90** | 2.64 |
| | 分裂情感性障碍 | 0.75 | 2.64 |
| | 伴精神病性特征的重性抑郁障碍 | 0.60 | 2.64 |
| | 短暂精神病性障碍 | 0.50 | 2.64 |
| | 物质所致精神病性障碍 | 0.40 | 2.64 |
| 躁狂 | **双相I型障碍** | **0.95** | 3.15 |
| | 双相型分裂情感性障碍 | 0.70 | 3.15 |
| | 物质所致心境障碍 | 0.25 | 3.15 |
| 强迫思维 | **强迫障碍** | **0.95** | 3.56 |
| | 躯体变形障碍 | 0.45 | 3.56 |
| | 囤积障碍 | 0.40 | 3.56 |
| 闪回 | **创伤后应激障碍** | **0.95** | 2.86 |
| | 急性应激障碍 | 0.70 | 2.86 |
| | 分离性身份障碍 | 0.50 | 2.86 |

### 症状同义词扩展表（部分）

| 标准化键 | 中文别名 | 扩展同义词 |
|:---|:---|:---|
| `depressed_mood` | 情绪低落, 抑郁情绪, 心情不好, 不开心 | 沮丧, 悲伤, 消沉, 哀伤, 忧郁 |
| `anxiety` | 焦虑, 紧张, 担心, 不安 | 担忧, 惶恐, 心神不宁 |
| `insomnia` | 失眠, 入睡困难 | 难以入睡, 睡眠障碍, 睡眠差 |
| `suicidal_ideation` | 自杀意念, 想死, 不想活 | 自杀念头, 死亡念头, 结束生命 |
| `auditory_hallucination` | 幻听, 听到声音 | 评论性幻听, 命令性幻听 |

<br>

---

## 🔮 路线图

### ✅ 已完成

- [x] 结构化表单输入（替代 LLM 自由文本提取）
- [x] GraphRAG 知识图谱 top3 候选检索
- [x] **加权评分检索**（SYMPTOM_WEIGHTS + IDF 逆文档频率）
- [x] **四层归一化匹配**（别名→同义词→格式化→精确键）
- [x] **症状同义词扩展**（SYMPTOM_ALIASES，200+ 扩展词）
- [x] **全链路审计日志**（输入→归一化→IDF→结果）
- [x] LLM 逐个候选 DSM-5 分析
- [x] 人机协同 HITL（诊断后中断，医生选择）
- [x] 动态治疗方案（基于 selected_disease）
- [x] ICD-10 编码 + DRG 分组
- [x] HIPAA 合规审计
- [x] 前端加权评分可视化（评分条 + 匹配贡献明细）

### 🚧 进行中

- [ ] 复诊场景（用药变化追踪 + 调药建议）
- [ ] 电子病历系统对接（HL7 FHIR）

### 🔮 计划中

- [ ] 向量语义检索补充（embedding + 语义相似度）
- [ ] 概率打分模型替代加权求和
- [ ] 知识图谱管理后台（可视化编辑症状-疾病映射）
- [ ] 多语言支持（英文、日文）
- [ ] Prometheus metrics 集成
- [ ] OpenTelemetry 链路追踪
- [ ] API 鉴权 + 速率限制

<br>

---

## ⚠️ 已知限制

| 限制 | 说明 | 缓解措施 |
|:---|:---|:---|
| **知识图谱数据在代码中** | 疾病映射和权重存储在 Python 字典中，修改需改代码 + 重新部署 | 计划中：管理后台 + 数据库存储 |
| **单 LLM 故障点** | 症状提取和诊断分析共用同一个 API Key | 自动降级到规则方法（别名+同义词） |
| **权重为静态配置** | SYMPTOM_WEIGHTS 需手动维护，无法自动学习 | 计划中：引入数据驱动的概率模型 |
| **Neo4j 仅做精确匹配** | 未使用模糊查询、路径分析等图数据库高级能力 | 当前设计有意为之——确保诊断安全性 |
| **无鉴权机制** | API 端点公开可访问 | 内部工具阶段可接受，上线前需添加 |

<br>

---

## 📜 License

```
MIT License

Copyright (c) 2025 BrainDox

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

<p align="center">
  <sub>Built with ❤️ for psychiatry</sub>
  <br>
  <sub>让精神科诊断更精准、更透明、更可控</sub>
</p>

<p align="center">
  <a href="#-项目定位">⬆ 回到顶部</a>
</p>

