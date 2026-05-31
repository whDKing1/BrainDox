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
  <img src="https://img.shields.io/badge/GraphRAG-知识图谱-005682?style=for-the-badge" alt="GraphRAG">
  <img src="https://img.shields.io/badge/ICD-10-F00-F99-FF6B6B?style=for-the-badge" alt="ICD-10">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="MIT">
</p>

<p align="center">
  <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fbraindox%2Fbraindox&countColor=%236366f1&labelStyle=upper" alt="访问量">
</p>

<hr>

## 🎯 项目定位

> **BrainDox** 是一个面向精神科临床场景的**多 Agent 决策辅助系统**，覆盖 **接诊 → 诊断 → 治疗 → 编码 → 审计** 全流程。
>
> 核心设计哲学：**知识图谱做精确检索 → LLM 做深度推理 → 医生做最终决策**，三者互补，形成闭环。

### 它解决了什么问题？

| 痛点 | 传统方式 | BrainDox 方案 |
|:---|:---|:---|
| **精神科诊断高度依赖经验** | 年轻医生容易漏诊、误诊 | GraphRAG 检索 top3 候选 + LLM DSM-5 证据链分析 |
| **诊疗方案选择困难** | 查阅指南耗时，容易遗漏 | AI 推荐循证治疗方案，支持动态调整 |
| **病历书写与编码繁琐** | 手动填写，容易出错 | ICD-10 自动编码 + DRG 分组 |
| **诊断不确定性** | 黑盒输出，医生不敢信 | 图路径+推理链全透明展示，医生最终决策 |

### 与纯自动化 Agent 方案的本质区别

```
纯自动化 Agent：
  [输入] → LLM 诊断 → LLM 治疗 → [输出]
            ↑ 黑盒，医生只能接受

BrainDox（人机协同）：
  [输入] → GraphRAG 检索 → LLM 分析 → 医生选择 → 动态治疗 → [输出]
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
│  🩺 精神科临床决策                   场景：[初诊 ▼]      │
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

GraphRAG + LLM 给出透明、可解释的诊断分析，每张卡片包含：

```
┌─────────────────────────────────────────────────────────────────────┐
│  🩺 GraphRAG 鉴别诊断 — 请选择最可能的诊断                       │
├───────────────┬─────────────────┬─────────────────────────────────┤
│               │                 │                                 │
│     🔴 #1     │     🟡 #2       │      🟢 #3                      │
│  重性抑郁障碍  │   双相II型障碍  │    广泛性焦虑障碍               │
│   F32.9       │    F31.81       │     F41.1                       │
│   匹配度 5/6  │    匹配度 3/6   │     匹配度 2/6                  │
│               │                 │                                 │
│  ┌─────────┐  │  ┌───────────┐  │  ┌─────────────────────────┐   │
│  │图检索路径│  │  │ 图检索路径 │  │  │ 图检索路径             │   │
│  └─────────┘  │  └───────────┘  │  └─────────────────────────┘   │
│  情绪低落────┐│  早醒──────┐    │  焦虑─────────────────→ GAD    │
│  快感缺失──┐││  迟滞────┐│    │                                 │
│  早醒────┐├┤│  ┌───────┐││    │                                 │
│  体重下降┐├┤│  │双相II  │││    │                                 │
│  自杀意念├┤││  └───────┘││    │                                 │
│  迟滞───┤├┤│           │││    │                                 │
│  ┌─────┐││││           │││    │                                 │
│  │ MDD │┘┘┘┘           ┘┘     │                                 │
│  └─────┘                      │                                 │
│               │                 │                                 │
│  📋 支持证据   │  📋 支持证据   │  📋 支持证据                   │
│  • 情绪低落    │  • 精神运动   │  • 焦虑症状                    │
│  • 快感缺失    │    性迟滞     │  • 失眠                        │
│  • 早醒        │  • 早醒       │                                 │
│  • 体重下降    │  • 自杀意念   │                                 │
│  • 自杀意念    │                 │                                 │
│               │                 │                                 │
│  ⛔ 不支持证据 │  ⛔ 不支持证据  │  ⛔ 不支持证据                 │
│  (无)          │  • 否认轻躁狂史│  • 缺乏焦虑核心症状           │
│               │                 │  • 自杀意念非典型              │
│  🧠 临床推理   │                 │                                 │
│  核心症状组合  │                 │                                 │
│  +病程6周      │                 │                                 │
│  +功能损害     │                 │                                 │
│  → 符合MDD     │                 │                                 │
│               │                 │                                 │
├───────────────┴─────────────────┴─────────────────────────────────┤
│  已选择：重性抑郁障碍                                               │
│  │▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸│
│          [✅ 确认诊断，继续治疗方案]                                │
└─────────────────────────────────────────────────────────────────────┘
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
│  └────┬─────┘  └─────────┬───────────┘  └────┬─────┘  └───────────────────┘  │
│       │                  │                     │                              │
└───────┼──────────────────┼─────────────────────┼──────────────────────────────┘
        │                  │                     │
   POST /analyze_form  GET 候选数据        POST /confirm_diagnosis
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
│                    ┌─────────▼──────────┐                                    │
│                    │  _pipeline_instances │ ← MemorySaver 缓存                │
│                    │  (thread_id → Pipeline)                                 │
│                    └────────────────────┘                                    │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │           LangGraph Pipeline (StateGraph)                             │   │
│  │                                                                        │   │
│  │    ┌──────────────────┐                                               │   │
│  │    │ SufficiencyCheck │ ← 规则引擎判断信息是否充足                    │   │
│  │    └────────┬─────────┘                                               │   │
│  │             │ 通过                                                     │   │
│  │    ┌────────▼─────────┐                                               │   │
│  │    │  Diagnosis Agent │ ← LLM 提取症状 + GraphRAG 检索 + DSM-5 分析  │   │
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
│  │  ┌─────────────────┐  ┌────────────────┐  ┌──────────────────────┐  │   │
│  │  │ GraphRAG Service│  │ ICD-10 Service │  │ Drug Interaction Svc│  │   │
│  │  │ (Neo4j / 离线)   │  │ (PostgreSQL)   │  │ (DDI 检查)          │  │   │
│  │  └────────┬────────┘  └────────────────┘  └──────────────────────┘  │   │
│  │           │                                                          │   │
│  │  ┌────────▼────────┐                                                 │   │
│  │  │ SYMPTOM_        │                                                 │   │
│  │  │ DISEASE_MAP     │ ← 57 个标准化症状键 → 70+ 精神疾病映射         │   │
│  │  │ SYMPTOM_ALIAS   │ ← 60+ 中文别名映射（LLM 降级兜底）             │   │
│  │  │ DISEASE_ICD10   │ ← ICD-10 编码映射表                            │   │
│  │  └─────────────────┘                                                 │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────┐          │
│  │  ClinicalState (Pydantic)                                    │          │
│  │  patient_info | diagnosis | candidate_diseases[]              │          │
│  │  selected_disease | human_review_status | treatment_plan     │          │
│  │  coding_result | audit_result | errors[]                      │          │
│  └──────────────────────────────────────────────────────────────┘          │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────┐          │
│  │  配置层 (.env)                                                 │          │
│  │  OPENAI_API_KEY | OPENAI_MODEL | OPENAI_BASE_URL             │          │
│  │  NEO4J_URI | NEO4J_PASSWORD | LOG_LEVEL                      │          │
│  └──────────────────────────────────────────────────────────────┘          │
└──────────────────────────────────────────────────────────────────────────────┘
```

### LangGraph 状态图

```
                    ┌──────────────┐
                    │ START (表单)  │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │  sufficiency │
                    │    _check    │ ← 规则引擎：BLOCK(症状/主诉) vs WARN(风险)
                    └──────┬───────┘
                           │
              ┌────────────┴────────────┐
              │                         │
      ┌───────▼───────┐       ┌────────▼────────┐
      │   diagnosis   │       │      END        │ ← 信息不足阻断
      │     agent     │       │                 │
      └───────┬───────┘       └─────────────────┘
              │
      ┌───────▼───────┐
      │   ⏸ HITL     │ ← interrupt_before=["treatment"]
      │   等待医生选择 │    human_review_status: awaiting_diagnosis
      └───────┬───────┘
              │ 医生 POST /confirm_diagnosis → resume
              │ selected_disease 写入 state
      ┌───────▼───────┐
      │   treatment   │ ← 基于 selected_disease 动态调整
      │    agent      │
      └───────┬───────┘
              │
      ┌───────▼───────┐
      │    coding     │ ← ICD-10 编码
      │    agent      │
      └───────┬───────┘
              │
      ┌───────▼───────┐
      │    audit      │ ← HIPAA 合规
      │    agent      │
      └───────┬───────┘
              │
         ┌────▼────┐
         │   END   │
         └─────────┘
```

<br>

---

## 🧠 核心功能

### 1. 结构化表单输入

取代传统的 LLM 自由文本提取方式，医生直接填写结构化表单：

| 字段 | 必填 | 说明 | 前端组件 |
|:---|:---:|:---|:---:|
| 主诉 | ✅ | 患者主诉全文，LLM 从中提取症状键 | `<NInput type="textarea">` |
| 症状 | ✅ | 逗号分隔的症状名称列表 | `<NInput type="textarea">` |
| 自杀风险评估 | ✅ | 5 级下拉选择（无风险→极高风险） | `<NSelect>` |
| 物质使用史 | ✅ | 6 种预设选项 | `<NSelect>` |
| 姓名/年龄/性别 | ❌ | 基本信息 | `<NInput>` / `<NSelect>` |
| 既往病史/家族史 | ❌ | 逗号分隔 | `<NInput type="textarea">` |

### 2. GraphRAG 知识图谱检索

**双模式架构**：Neo4j 图数据库（生产） / 离线 Python 字典（演示），自动切换、零配置降级。

**检索链路**：

```
患者数据 ──→ LLM 提取标准化症状键（方案A）
                  │
                  ↓
          [depressed_mood, anhedonia, insomnia, ...]
                  │
                  ↓
          SYMPTOM_DISEASE_MAP 投票计数
                  │
                  ↓
          MDD (5票) > 双相II (3票) > GAD (2票) > ...
                  │
                  ↓
          返回 top3 候选 + 图路径链 ──→ 前端展示
```

**57 个标准化症状键覆盖**：

```
心境症状:    depressed_mood, anhedonia, mania, hypomania, elevated_mood, irritability
焦虑症状:    anxiety, panic_attack, hypervigilance
精神病性症状: auditory_hallucination, visual_hallucination, delusion, paranoia, disorganized_speech
失眠症状:    insomnia, difficulty_falling_asleep, middle_insomnia, early_morning_awakening, hypersomnia
躯体症状:    appetite_loss, appetite_increase, weight_loss, weight_gain, fatigue, psychomotor_retardation
认知症状:    cognitive_decline, memory_loss, inattention, confusion, apathy
创伤症状:    trauma_flashback, nightmares, dissociation
强迫症状:    obsession, compulsion
冲动症状:    impulsivity, self_harm, suicidal_ideation, substance_craving
社交症状:    social_withdrawal, negative_symptoms
... 共 57 个
```

如果 LLM 提取失败（API 不可用/余额不足），自动降级到规则别名映射（`SYMPTOM_ALIAS`），不影响流程。

### 3. LLM 鉴别诊断分析

DeepSeek 对每个候选疾病执行独立 DSM-5 标准分析：

```json
{
  "candidate_analyses": [
    {
      "disease_name": "重性抑郁障碍",
      "icd10_hint": "F32.9",
      "confidence": 0.85,
      "supporting_evidence": [
        "情绪低落持续6周，符合标准A1",
        "快感缺失，符合标准A2",
        "早醒，符合标准A4（睡眠障碍）",
        "体重下降，符合标准A3（食欲/体重变化）",
        "被动自杀意念，符合标准A9（死亡念头）",
        "精神运动性迟滞，符合标准A5",
        "社会功能下降，符合标准B",
        "非物质/躯体疾病所致，符合标准C"
      ],
      "opposing_evidence": [],
      "reasoning": "患者满足 DSM-5 MDD 诊断标准 A 中 6/9 项症状（≥5项阈值），包含核心症状情绪低落和快感缺失。病程6周（≥2周阈值），伴显著功能损害（标准B），排除物质/躯体病因（标准C），排除躁狂发作（标准D），排除分裂情感障碍（标准E）。临床表现典型，支持证据充分，无实质性的不支持证据。",
      "recommended_tests": ["甲状腺功能复查", "维生素B12水平"]
    }
  ],
  "primary_recommendation": {
    "disease_name": "重性抑郁障碍",
    "reasoning": "6项DSM-5症状满足，匹配度高，无矛盾证据",
    "clinical_notes": "重性抑郁障碍，单次发作，中度（F32.1），伴被动自杀意念"
  },
  "suicide_risk_assessment": "低风险 - 被动自杀意念，无具体计划，无手段，保护因素存在（家属监护）",
  "medical_mimics_ruled_out": ["甲状腺功能减退（左甲状腺素替代，TSH正常）"]
}
```

### 4. 人机协同（HITL）

**Pipeline 中断机制**：

```python
# pipeline_compiler.py - 诊断后自动中断
workflow.compile(
    checkpointer=checkpointer,
    interrupt_before=["treatment"],  # ← 在 treatment 前暂停
)
```

**医生确认后恢复**：

```python
# routes.py - 诊断确认端点
pipeline.update_state(config, {
    "selected_disease": req.selected_disease,
    "human_review_status": "diagnosis_selected",
})
result = pipeline.invoke(None, config=config)  # 恢复执行
```

### 5. 动态治疗方案

| 诊断 | 药物治疗 | 心理治疗 | 其他干预 |
|:---|:---|:---|:---|
| 重性抑郁障碍 | SSRI（艾司西酞普兰 10mg） | CBT | 运动处方 |
| 双相II型抑郁 | 拉莫三嗪 + 谨慎使用SSRI | IPSRT | 睡眠节律管理 |
| 广泛性焦虑障碍 | 帕罗西汀 20mg / 文拉法辛 75mg | CBT（暴露治疗） | 放松训练 |
| PTSD | 舍曲林 50-200mg / 帕罗西汀 | PE 或 CPT | 安全计划 |
| 精神分裂症 | 奥氮平 10mg / 利培酮 4mg | 社交技能训练 | 职业康复 |

### 6. ICD-10 自动编码 + DRG 分组

| ICD-10 范围 | 类别 | 示例 |
|:---|:---|:---|
| F30-F39 | 心境障碍 | F32.9 重性抑郁障碍, F31.81 双相II型障碍 |
| F40-F48 | 焦虑/应激障碍 | F41.1 广泛性焦虑障碍, F43.10 PTSD |
| F20-F29 | 精神分裂症谱系 | F20.9 精神分裂症, F25.9 分裂情感性障碍 |
| F90-F98 | 儿童期起病障碍 | F90.9 ADHD, F84.0 ASD |
| F60-F69 | 人格障碍 | F60.3 边缘型人格障碍 |
| F50-F59 | 进食障碍 | F50.01 神经性厌食症 |

### 7. HIPAA 合规审计

纯规则引擎，零 LLM 调用，确保 100% 确定性：

```
合规检查项（8项）：
  1.  PHI 泄露扫描    → [✅] 无 PHI 泄露
  2.  静态数据加密     → [✅] 已加密
  3.  传输数据加密     → [✅] HTTPS
  4.  RBAC 访问控制    → [✅] 已实施
  5.  审计日志记录     → [✅] 不可变日志
  6.  最小必要原则     → [✅] 合规
  7.  违规通知就绪     → [✅] 已配置
  8.  数据保留策略     → [✅] 保留6年
  ─────────────────────────────────
  总体风险等级：[✅ 低风险]
```

<br>

---

## 🔄 人机协同流程

### 完整交互时序

```
 医生                  前端                  API                 Pipeline
  │                    │                    │                    │
  │  填写表单           │                    │                    │
  │──────────────────>│                    │                    │
  │                    │  POST /analyze_form│                    │
  │                    │───────────────────>│                    │
  │                    │                    │  invoke()          │
  │                    │                    │───────────────────>│
  │                    │                    │                    │
  │                    │                    │    ┌────────────────┤
  │                    │                    │    │SufficiencyCheck│
  │                    │                    │    │       ↓        │
  │                    │                    │    │ Diagnosis     │
  │                    │                    │    │  Agent        │
  │                    │                    │    │   LLM提取症状  │
  │                    │                    │    │   GraphRAG检索 │
  │                    │                    │    │   DSM-5分析   │
  │                    │                    │    └───────┬────────┘
  │                    │                    │            │
  │                    │                    │    ╔════════╧═══════╗
  │                    │                    │    ║  HITL 中断     ║
  │                    │                    │    ║ interrupt_before║
  │                    │                    │    ╚════════════════╝
  │                    │                    │                    │
  │                    │    返回候选诊断     │                    │
  │                    │<───────────────────│                    │
  │  展示3张诊断卡片    │                    │                    │
  │<──────────────────│                    │                    │
  │                    │                    │                    │
  │  点击选择MDD       │                    │                    │
  │──────────────────>│                    │                    │
  │                    │ POST /confirm_     │                    │
  │                    │   diagnosis        │                    │
  │                    │───────────────────>│                    │
  │                    │                    │ update_state()     │
  │                    │                    │───────────────────>│
  │                    │                    │ invoke(None)       │
  │                    │                    │───────────────────>│
  │                    │                    │                    │
  │                    │                    │   ┌────────────────┤
  │                    │                    │   │  Treatment     │
  │                    │                    │   │  (基于选择调整)  │
  │                    │                    │   │     ↓          │
  │                    │                    │   │  Coding        │
  │                    │                    │   │     ↓          │
  │                    │                    │   │  Audit         │
  │                    │                    │   └───────┬────────┘
  │                    │                    │            │
  │                    │    返回完整结果     │            │
  │                    │<───────────────────│            │
  │  展示治疗/编码/     │                    │            │
  │  审计面板           │                    │            │
  │<──────────────────│                    │            │
```

### HITL 状态机

```
         ┌──────────────────────────────────────────────────┐
         │                                                  │
         │    init       diagnosis         selected         │
         │    ────→    ──────────→    ────────────→         │
         │   none      awaiting_        diagnosis_          │
         │             diagnosis        selected            │
         │                                    │             │
         │                                    ↓             │
         │                              pending             │
         │                             /        \           │
         │                            ↓          ↓          │
         │                       approved    rejected       │
         │                                                  │
         └──────────────────────────────────────────────────┘
```

<br>

---

## 📂 项目结构

```
📁 BrainDox/
│
├── 📁 code/                          # 后端代码（Python + FastAPI）
│   ├── 📁 src/
│   │   ├── 📁 api/                   # API 层
│   │   │   ├── 📄 main.py            # FastAPI 入口 + lifespan
│   │   │   └── 📄 routes.py          # 所有 REST 端点定义
│   │   │
│   │   ├── 📁 agents/                # Agent 层
│   │   │   ├── 📄 diagnosis_agent.py # 🎯 LLM症状提取 + GraphRAG + DSM-5分析 + HITL
│   │   │   ├── 📄 treatment_agent.py # 💊 动态治疗方案（基于 selected_disease）
│   │   │   ├── 📄 coding_agent.py    # 📋 ICD-10 编码 + DRG 分组
│   │   │   └── 📄 audit_agent.py     # 🔒 HIPAA 合规（纯规则引擎）
│   │   │
│   │   ├── 📁 graph/                 # LangGraph 编排层
│   │   │   ├── 📄 state.py           # ClinicalState（Pydantic 共享状态）
│   │   │   └── 📄 pipeline_compiler.py # StateGraph 编译 + HITL interrupt_before
│   │   │
│   │   ├── 📁 services/              # 服务层
│   │   │   ├── 📄 graphrag_service.py # 🧠 GraphRAG 检索 + SYMPTOM_DISEASE_MAP + SYMPTOM_ALIAS
│   │   │   ├── 📄 drug_interaction.py # 💊 DDI 药物交互检查
│   │   │   ├── 📄 icd10_service.py   # 📋 ICD-10 搜索服务
│   │   │   └── 📄 hipaa_service.py   # 🔒 PHI 脱敏 + 合规检查
│   │   │
│   │   ├── 📁 models/                # 数据模型
│   │   │   ├── 📄 patient.py         # PatientInfo, Gender（含 _missing_ 钩子）
│   │   │   └── 📄 diagnosis.py       # DiagnosisResult
│   │   │
│   │   ├── 📁 config/
│   │   │   └── 📄 settings.py        # .env 配置读取
│   │   │
│   │   └── 📁 __init__.py
│   │
│   ├── 📄 .env                       # 环境变量（API Key、数据库配置）
│   └── 📄 requirements.txt           # Python 依赖
│
├── 📁 fe/                            # 前端代码（Vue 3 + Naive UI）
│   ├── 📁 src/
│   │   ├── 📄 App.vue                # 🏠 主组件：表单 + 候选卡片 + 治疗/编码/审计面板
│   │   │
│   │   ├── 📁 api/
│   │   │   └── 📄 index.ts           # API 客户端（analyzeForm + confirmDiagnosis）
│   │   │
│   │   ├── 📁 types/
│   │   │   └── 📄 index.ts           # TypeScript 类型定义
│   │   │
│   │   ├── 📁 components/            # 子组件
│   │   │   ├── 📄 PipelineStepper.vue # 步骤进度条
│   │   │   ├── 📄 TreatmentPanel.vue  # 治疗方案展示
│   │   │   ├── 📄 CodingPanel.vue     # ICD-10 编码展示
│   │   │   └── 📄 AuditPanel.vue      # 合规审计展示
│   │   │
│   │   └── 📄 test-data.ts           # 初诊/复诊测试用例
│   │
│   ├── 📄 vite.config.ts             # Vite 配置（proxy → 后端）
│   └── 📄 package.json
│
├── 📄 README.md                      # 📄 本文件
└── 📄 LICENSE                        # MIT 许可证
```

<br>

---

## 💻 技术栈

<p align="center">
  <table>
    <tr>
      <td align="center" width="120">
        <img src="https://skillicons.dev/icons?i=python" width="40"><br>
        <sub>Python 3.11</sub>
      </td>
      <td align="center" width="120">
        <img src="https://skillicons.dev/icons?i=fastapi" width="40"><br>
        <sub>FastAPI</sub>
      </td>
      <td align="center" width="120">
        <img src="https://skillicons.dev/icons?i=vue" width="40"><br>
        <sub>Vue 3</sub>
      </td>
      <td align="center" width="120">
        <img src="https://skillicons.dev/icons?i=ts" width="40"><br>
        <sub>TypeScript</sub>
      </td>
      <td align="center" width="120">
        <img src="https://skillicons.dev/icons?i=neo4j" width="40"><br>
        <sub>Neo4j</sub>
      </td>
      <td align="center" width="120">
        <img src="https://skillicons.dev/icons?i=vite" width="40"><br>
        <sub>Vite</sub>
      </td>
    </tr>
  </table>
</p>

| 层次 | 技术选型 | 用途 |
|:---|:---|:---|
| **🎯 LLM 推理** | DeepSeek V4 | 症状提取（temperature=0.0，确定性）、诊断分析（temperature=0.2，创造性） |
| **🔗 Pipeline 编排** | LangGraph 0.2+ | StateGraph + 条件路由 + `interrupt_before` HITL |
| **🌐 API 服务** | FastAPI 0.115+ | RESTful API + Swagger 文档 + 自动校验 |
| **🧠 知识图谱** | Neo4j 5.x / 离线字典 | 症状→疾病双模式检索，自动降级 |
| **🎨 前端** | Vue 3 + Naive UI | 表单输入 → 候选三列卡片 → 治疗/编码/审计面板 |
| **📦 数据校验** | Pydantic v2 | ClinicalState 共享状态 + 请求/响应模型 |
| **💾 状态持久化** | MemorySaver | Pipeline 中断/恢复，_pipeline_instances 缓存 |
| **🐍 包管理** | UV | 快速虚拟环境 + 依赖安装 |
| **🔧 开发工具** | Vite | 前端热重载开发服务器 + 代理转发 |

<br>

---

## 📡 API 文档

### 端点总览

| 方法 | 路径 | 说明 | 请求体 / 参数 |
|:---|:---|:---|:---|
| <code>POST&nbsp;🚀</code> | `/api/v1/clinical/analyze_form` | **提交表单启动 Pipeline** | `FormAnalyzeRequest` |
| <code>POST&nbsp;✅</code> | `/api/v1/clinical/confirm_diagnosis` | **医生确认诊断，恢复 Pipeline** | `ConfirmDiagnosisRequest` |
| <code>POST&nbsp;🔍</code> | `/api/v1/clinical/icd10/search` | ICD-10 文本搜索 | `{query: string}` |
| <code>GET&nbsp;📋</code> | `/api/v1/clinical/icd10/{code}` | ICD-10 编码查询 | 路径参数 |
| <code>POST&nbsp;💊</code> | `/api/v1/clinical/ddi/check` | 药物交互检查 | `DrugInteractionRequest` |
| <code>GET&nbsp;❤️</code> | `/health` | 健康检查 | 无 |

### 1. 表单分析

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
  "patient_info": { "name": "未填", "age": 25, "gender": "female", ... },
  "diagnosis": { "candidate_analyses": [...], "primary_recommendation": {...}, ... },
  "candidate_diseases": [
    {
      "disease": "重性抑郁障碍",
      "icd10_code": "F32.9",
      "icd10_description": "重性抑郁障碍，单次发作，未特定",
      "symptom_match_count": 5,
      "total_symptoms": 6,
      "matched_symptoms": ["depressed mood", "anhedonia", ...]
    }
  ],
  "human_review_status": "awaiting_diagnosis",
  "selected_disease": "",
  "needs_more_info": false,
  "retry_count": 0,
  "errors": []
}
```

### 2. 诊断确认

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

### 3. 快速测试

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

# 2. 查看是否返回候选疾病
$response.candidate_diseases

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

## 📊 症状-疾病映射表（部分）

| 症状 | 可能关联的精神疾病 |
|:---|:---|
| 情绪低落 | MDD、双相II型障碍、恶劣心境、适应障碍 |
| 快感缺失 | MDD、双相抑郁、精神分裂症阴性症状 |
| 焦虑 | GAD、惊恐障碍、社交焦虑障碍、PTSD |
| 幻听 | 精神分裂症、分裂情感性障碍、短暂精神病性障碍 |
| 躁狂 | 双相I型障碍、双相型分裂情感性障碍 |
| 强迫思维/行为 | OCD、躯体变形障碍、囤积障碍 |
| 闪回 | PTSD、急性应激障碍、分离性身份障碍 |
| 自杀意念 | MDD、双相障碍、边缘型人格障碍 |
| 注意力不集中 | ADHD、双相抑郁、GAD |
| 失眠 | MDD、GAD、双相障碍、PTSD |

<br>

---

## 🔮 路线图

- [x] 结构化表单输入（替代 LLM 自由文本提取）
- [x] GraphRAG 知识图谱 top3 候选检索
- [x] LLM 逐个候选 DSM-5 分析
- [x] 人机协同 HITL（诊断后中断，医生选择）
- [x] 动态治疗方案（基于 selected_disease）
- [x] ICD-10 编码 + DRG 分组
- [x] HIPAA 合规审计
- [ ] 复诊场景（用药变化追踪 + 调药建议）
- [ ] 电子病历系统对接（HL7 FHIR）
- [ ] 向量语义检索替代别名映射（方案C）
- [ ] 概率打分模型替代简单投票（方案D）
- [ ] 多语言支持（英文、日文）

<br>

---

## 🤝 贡献指南

欢迎提交 Issue 和 PR！

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交改动：`git commit -m 'feat: add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 创建 Pull Request

请确保代码通过所有诊断检查（0 errors、0 warnings）。

<br>

---

## ⚠️ 已知限制

| 限制 | 说明 | 缓解措施 |
|:---|:---|:---|
| **SYMPTOM_DISEASE_MAP 覆盖有限** | 约 57 个标准化症状键，罕见症状无法匹配 | LLM 提取失败时降级到 60+ 中文别名映射 |
| **Neo4j 空库不降级** | 配置了密码但数据库无数据时 Cypher 返回空 | `find_diseases_with_paths` 已绕过 Neo4j，直接走离线字典 |
| **单 LLM 故障点** | 症状提取和诊断分析共用 API Key | 前端仍可显示 GraphRAG 候选（不含 LLM 推理） |

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
