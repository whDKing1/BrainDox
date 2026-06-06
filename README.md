<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6&height=220&section=header&text=BrainDox&fontSize=80&fontColor=fff&desc=多Agent精神健康平台&descSize=20&descAlignY=68">
    <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6&height=220&section=header&text=BrainDox&fontSize=80&fontColor=fff&desc=多Agent精神健康平台&descSize=20&descAlignY=68">
  </picture>
</p>

<p align="center">
  <strong>🧠 共情对话建立信任 · 知识图谱驱动诊断 · 医生审核守护安全 · 企业级 AI 工程实践</strong>
</p>

<p align="center">
  <a href="#-项目简介">简介</a> •
  <a href="#-项目背景">背景</a> •
  <a href="#-核心亮点">亮点</a> •
  <a href="#-技术架构">架构</a> •
  <a href="#-详细设计">设计</a> •
  <a href="#-测试体系">测试</a> •
  <a href="#-快速开始">开始</a> •
  <a href="#-API-文档">API</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/LangGraph-0.2+-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white">
  <img src="https://img.shields.io/badge/FastAPI-0.115+-009688?style=for-the-badge&logo=fastapi&logoColor=white">
  <img src="https://img.shields.io/badge/Vue_3-4.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white">
  <img src="https://img.shields.io/badge/Neo4j-GraphRAG-008CC1?style=for-the-badge&logo=neo4j&logoColor=white">
  <img src="https://img.shields.io/badge/PostgreSQL-16+-316192?style=for-the-badge&logo=postgresql&logoColor=white">
  <img src="https://img.shields.io/badge/Jinja2-动态Prompt-B41717?style=for-the-badge">
  <img src="https://img.shields.io/badge/Docker-部署-2496ED?style=for-the-badge&logo=docker&logoColor=white">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/ICD--10-F00--F99-FF6B6B?style=flat-square">
  <img src="https://img.shields.io/badge/DSM--5-诊断标准-6C5CE7?style=flat-square">
  <img src="https://img.shields.io/badge/FHIR_R4-互操作-0984E3?style=flat-square">
  <img src="https://img.shields.io/badge/HIPAA-合规-00B894?style=flat-square">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square">
</p>

<br>

---

## 🧬 项目简介

**BrainDox** 是一款面向精神健康领域的 多Agent临床提效辅助平台。

对**患者**，它不是冰冷的问卷——而是一个懂得先接住情绪再温和引导的共情对话伙伴。在自然交流中完成信息采集，信息充足后自动生成结构化评估报告。

对**医生**，它不是黑盒输出——而是**加权检索 + 证据链推理 + 全透明可追溯**的诊断辅助。从 70+ 精神疾病中做 GraphRAG 多跳推理，每一个结论都有可审计的推理路径。

两者通过**医生审核机制**串联——AI 负责"整理信息 + 呈现证据"，人选决定最终诊断。

> **项目定位**: 企业级 AI 工程完整链路产品——从 Prompt 工程到 Agent 编排，从容灾设计到安全约束，从 HIPAA 合规到可观测性。

---

## 🎯 项目背景：解决哪些实际问题

### 问题1：患者端——"填表式问诊"的冰冷感

传统心理健康评估是**表单驱动的**——"你有什么症状？持续多久了？有自杀念头吗？"——这种审问式体验会让本就敏感的用户更加封闭。

**BrainDox 的回答**: 用共情对话代替表单。每轮回复以共情开头，从用户刚说的内容中自然延伸，采集是在"被倾听的安全感"中完成的——用户甚至意识不到自己正在被"问诊"。

### 问题2：医生端——鉴别诊断高度依赖个人经验

精神科没有金标准检查（没有抽血、没有影像），诊断全靠症状匹配。年轻医生容易漏诊、误诊——尤其是罕见症状的区分度问题。

**BrainDox 的回答**: GraphRAG 加权检索。不是用向量相似度做语义匹配——那是"找看起来相似的文本"，精神科需要的是"从症状到疾病的多跳推理"。`Σ(weight × IDF)` 加权排序让罕见症状（如幻听）比常见症状（如疲劳）获得更高的区分权重——这更接近临床专家的直觉。

### 问题3：企业级 AI——"写了代码"和"能上线"之间的鸿沟

大多数 AI 项目的问题是——能跑通 Happy Path，但 LLM 挂了怎么办？输出 unsafe 怎么办？上下文窗口溢出怎么办？生产出了事故有没有可观测性？

**BrainDox 的回答**: 三层容灾（超时→重试→熔断）、输出校验栅栏（Schema + 安全约束）、Token 预算管理、全链路 LLM 调用监控打点、安全事件异步告警——这些都是"能跑通"到"能上线"之间被大多数 Demo 忽略的东西。

### 问题4：面试场景——如何在一个项目中展现多方面能力

大多数面试项目的问题是——用了一个框架，调了一个 API，写了几句 Prompt。面试官看不出你的**架构演进能力**、**AI Safety 意识**、**领域建模能力**、**工程化思维**。

**BrainDox 的回答**: 这个项目覆盖了 Prompt 工程 → 多 Agent 编排 → 知识图谱检索 → 医疗标准合规 → 输出安全约束 → 容灾设计 → 可观测性——是一份可以层层深挖的面试素材。

---

## 🔥 核心亮点：12 个核心设计

> 以下亮点并非功能罗列，而是**设计决策 × 方法论**——面试官问"为什么这样设计"时，每个亮点都有完整的推理链。

<table>
<tr>
<td align="center" width="60">🥇</td>
<td>
<strong>GraphRAG 加权检索：Σ(weight × IDF)</strong><br>
不是简单做向量检索，而是对罕见症状加权的图多跳推理。70+ 精神疾病知识图谱中，每条边有权重，每个症状有 IDF 逆文档频率——完全可审计的排序公式，比黑盒向量相似度更有临床说服力。
</td>
</tr>
<tr>
<td align="center" width="60">🥈</td>
<td>
<strong>五层动态 Prompt 组装引擎：Jinja2 模板 × 双维决策矩阵</strong><br>
不是一个大 Prompt 写死。每轮对话实时加载：安全规则层 → intent×emotion 策略矩阵 → 句式模板 → 上下文注入 → 阶段引导。本质是 Prompt 的资源管理问题，和前端组件化、后端中间件链一个道理。
</td>
</tr>
<tr>
<td align="center" width="60">🥉</td>
<td>
<strong>三层意图级联体系：规则引擎 → LLM → 诊断护栏</strong><br>
意图识别不是调一次 API 就完了。L4 正则保证危机零漏报（100% 召回），LLM Few-shot 处理语义边界，诊断触发前再做一致性校验——延迟/成本/召回三维平衡的工程决策。
</td>
</tr>
<tr>
<td align="center" width="60">🏅</td>
<td>
<strong>Severity Assessor：五维度连续评分替代规则引擎</strong><br>
严重度判断不是 <code>if duration_weeks > 2 then moderate</code>。LLM 评估 symptoms_burden × 0.30 + functional_impairment × 0.25 + risk_level × 0.25 + chronicity × 0.10 + biological_factors × 0.10，合成 0-100 连续分数。同时评估信息是否足够做鉴别诊断——不是数字段序号，而是判临床语义。
</td>
</tr>
<tr>
<td align="center" width="60">🏅</td>
<td>
<strong>LLM 全链路容灾：超时→重试→熔断→降级</strong><br>
指数退避重试（1s→2s→4s）+ 30s 硬超时 + 连续 5 次故障自动熔断 60s + 每个 Agent 都有预设降级兜底值。不是"LLM 挂了就报错"，而是"挂了也能安全运转"。
</td>
</tr>
<tr>
<td align="center" width="60">🏅</td>
<td>
<strong>输出安全校验栅栏</strong><br>
LLM 输出不是直接消费的——Schema 完整性校验 + mild 路由拦截药物推荐 + severe 路由强制风险评估 + 置信度下限检查。LLM 不可控，但系统不能因为 LLM 不可控而不可靠。
</td>
</tr>
<tr>
<td align="center" width="60">🏅</td>
<td>
<strong>统一 Pipeline + 参数化深度控制</strong><br>
从 7 个 Agent 收敛到 1 条统一链路，severity_level 参数控制 System Prompt 分区、温度、max_tokens、是否调用 GraphRAG。代码量减 60%，诊断能力更强——因为同一条链意味着 mild 路由也能享受 full patient_info 的信息红利。
</td>
</tr>
<tr>
<td align="center" width="60">🏅</td>
<td>
<strong>Token 预算管理：tiktoken 实时检查 + 自动截断</strong><br>
每轮 Prompt 组装完成后做 Token 计数，System Prompt 超过 3000 token 自动截断，总计控制在 6000 token 内。不是"等报错了再调"，而是预防性资源管理。
</td>
</tr>
<tr>
<td align="center" width="60">🏅</td>
<td>
<strong>全链路 LLM 监控</strong><br>
所有 LLM 调用都打 caller 标签做归因，记录 latency/ prompt_tokens/ completion_tokens/ success。基于这些指标可以做 P99 延迟分析和成本归因——生产可观测性的基础。
</td>
</tr>
<tr>
<td align="center" width="60">🏅</td>
<td>
<strong>Neo4j + 内存 dict 双模式自动降级</strong><br>
GraphRAG 依赖 Neo4j 图数据库，当 Neo4j 不可用时自动回退到 Python dict 的 O(1) 哈希查找——同样的接口，无缝切换。不是"写死 happy path"，而是高可用意识。
</td>
</tr>
<tr>
<td align="center" width="60">🏅</td>
<td>
<strong>安全告警：危机事件异步通知不阻塞主流程</strong><br>
Safety Scanner 检测到自杀/自伤关键词时，异步触发 CRITICAL 告警——同时预留企业微信/邮件通知接口。告警和危机干预回复并行，用户不等待。
</td>
</tr>
<tr>
<td align="center" width="60">🏅</td>
<td>
<strong>HIPAA + FHIR R4 医疗合规</strong><br>
Safe Harbor 18 类 PHI 标识符脱敏，WORM 风格审计日志，FHIR R4 数据交换标准——精神健康数据是最高敏感度数据，合规不是可选项。
</td>
</tr>
</table>

---

## 📊 测试数据（预留，逐步补充）

> 以下测试数据展示项目的可量化评估能力，随着真实数据或标注数据补充，逐步更新。

### 意图识别准确率

运行 `pytest code/tests/test_intent_accuracy.py -xvs`

<table>
<tr><th>类别</th><th>Precision</th><th>Recall</th><th>F1</th><th>样本</th></tr>
<tr><td>危机</td><td>-</td><td><strong>1.000</strong></td><td>-</td><td>7</td></tr>
<tr><td>倾诉</td><td>-</td><td>-</td><td>-</td><td>11</td></tr>
<tr><td>求助</td><td>-</td><td>-</td><td>-</td><td>12</td></tr>
<tr><td>咨询</td><td>-</td><td>-</td><td>-</td><td>10</td></tr>
<tr><td>闲聊</td><td>-</td><td>-</td><td>-</td><td>6</td></tr>
<tr><td>拒绝</td><td>-</td><td>-</td><td>-</td><td>4</td></tr>
<tr><td colspan="5"><strong>总准确率: <code>TBD</code> | 评估样本: <code>50 条</code></strong></td></tr>
</table>

### LLM 调用容灾验证

| 场景 | 行为 | 状态 |
|------|------|:---:|
| 30s 超时 | 指数退避重试 (1s→2s→4s) | ✅ 已实现 |
| 连续 5 次故障 | 熔断 60s | ✅ 已实现 |
| 全部重试耗尽 | 返回 Agent 预设降级兜底值 | ✅ 已实现 |

### 输出安全校验

| 场景 | 行为 | 状态 |
|------|------|:---:|
| mild 路由 LLM 输出药物推荐 | 强制清除 medications 字段 | ✅ 已实现 |
| severe 路由缺少自杀风险评估 | 记录安全警告 | ✅ 已实现 |
| 置信度过低 | 注入警告（不篡改诊断） | ✅ 已实现 |

### 单元测试覆盖率

| 模块 | 测试类 | 用例数 | 覆盖范围 |
|------|------|:---:|------|
| `llm_utils` | TokenBudget + CircuitBreaker + LLMCallMetrics | 9 | Token计数/预算/截断/熔断开关/重置/指标 |
| `llm_validator` | LLMValidator | 6 | Schema校验/安全约束/药物拦截/降级兜底 |
| `intent_service` | 评估数据集 | 50 | 6类意图准确率+混淆矩阵 |
| `hipaa_service` | HIPAAService | 4 | PHI检测/脱敏/哈希/SSN/Email |
| `drug_interaction` | DrugInteraction | 3 | 已知交互/无交互/过敏检查 |
| `icd10_service` | ICD10Service | 5 | 编码查询/文本搜索/DRG/校验 |
| `graphrag_service` | GraphRAGService | 2 | 症状匹配/ICD-10映射 |
| `goal_checker` | GoalChecker | 10+ | 核心字段/门控/差集/阶段 |
| `context_builder` | ContextBuilder | 5+ | 策略选择/上下文构建/Prompt组装 |

> 运行全量测试: `pytest code/tests/ -xvs`

---

## 🏗️ 技术架构

### 技术栈一览

```
┌──────────────────────────────────────────────────────────────┐
│                        技术栈全景                             │
├──────────────┬───────────────────────────────────────────────┤
│ 语言         │ Python 3.11+ / TypeScript                      │
│ 后端框架     │ FastAPI (async)                                │
│ 前端框架     │ Vue 3 + Composition API + Pinia + Vite         │
│ LLM 编排     │ LangGraph (StateGraph + MemorySaver)          │
│ LLM 模型     │ DeepSeek / OpenAI 兼容 (可替换)                │
│ 图数据库     │ Neo4j (GraphRAG 生产) + dict 回退 (离线)       │
│ 关系数据库   │ PostgreSQL + SQLAlchemy ORM                    │
│ Prompt 模板  │ Jinja2 (5 层动态组装)                          │
│ 检索增强     │ GraphRAG: Σ(weight × IDF) 加权                │
│ 医疗标准     │ ICD-10 / ICD-11 / DSM-5 / FHIR R4              │
│ 合规        │ HIPAA Safe Harbor / WORM 审计日志               │
│ 容器化       │ Docker + docker-compose                        │
│ Token 管理   │ tiktoken                                       │
│ 容灾        │ tenacity (exponential backoff)                  │
│ 可观测性     │ structlog (全链路结构化日志)                    │
│ 测试        │ pytest + pytest-asyncio                         │
└──────────────┴───────────────────────────────────────────────┘
```

### 项目结构

```
BrainDox/
├── code/src/
│   ├── agents/                      ← LangGraph Agent 节点 (3 个)
│   │   ├── diagnosis_agent.py       ← 参数化诊断 (mild/moderate/severe)
│   │   ├── treatment_agent.py       ← 参数化治疗
│   │   └── intake_agent.py          ← 结构化提取 (备用)
│   │
│   ├── graph/                       ← LangGraph 编排层
│   │   ├── state.py                 ← ClinicalState 共享状态
│   │   └── pipeline_compiler.py     ← 统一 Pipeline 编译器
│   │
│   ├── skills/empathic_voice/       ← 独立共情对话引擎 (可脱离平台发布)
│   │   ├── voice_engine.py          ← 主入口 + ConversationState
│   │   ├── safety_scanner.py        ← 三级危机分级 (CRISIS/SEVERE/CONCERN)
│   │   ├── info_extractor.py        ← LLM 字段提取 + 增量合并
│   │   ├── goal_checker.py          ← 核心 4 字段门控
│   │   ├── context_builder.py       ← 5 层动态 Prompt 组装
│   │   ├── core/                    ← Jinja2 核心模板 (persona/principles/safety)
│   │   ├── strategies/              ← 对话策略模板 (crisis/deep_listening/gentle_explore/gentle_support)
│   │   └── templates/               ← 句式模板 (reflection/normalization/open_inquiry/affirmation/transition)
│   │
│   ├── services/                    ← 业务服务层
│   │   ├── chat_service.py          ← 三层意图体系编排
│   │   ├── intent_service.py        ← 意图分类 (L4 正则 + LLM 级联)
│   │   ├── severity_assessor.py     ← 五维度评分 + 信息充分性评估
│   │   ├── llm_utils.py             ← LLM 基础设施 (重试/熔断/监控/Token预算)
│   │   ├── llm_validator.py         ← 输出校验栅栏 (Schema + 安全约束)
│   │   ├── crisis_alert.py          ← 安全告警 (异步通知)
│   │   ├── graphrag_service.py      ← GraphRAG (Neo4j/离线双模)
│   │   ├── report_service.py        ← 报告生成
│   │   ├── icd10_service.py         ← ICD-10 编码查询
│   │   ├── drug_interaction.py      ← DDI 药物交互检查
│   │   ├── hipaa_service.py         ← HIPAA 合规 (PHI 脱敏/审计)
│   │   └── fhir_service.py          ← FHIR R4 数据转换
│   │
│   ├── api/                         ← FastAPI 路由
│   │   ├── main.py                  ← 应用入口 (lifespan / CORS / health)
│   │   ├── user_routes.py           ← 患者端 API (登录/对话/报告)
│   │   ├── doctor_routes.py         ← 医生端 API (审核/统计)
│   │   └── routes.py                ← 临床辅助 (ICD-10 搜索/DDI)
│   │
│   ├── db/                          ← 持久化
│   │   ├── models.py                ← SQLAlchemy ORM (Conversation/Message/Report)
│   │   └── session.py               ← 数据库连接管理
│   │
│   ├── models/                      ← Pydantic 数据模型
│   │   ├── patient.py               ← PatientInfo
│   │   ├── diagnosis.py             ← DifferentialDiagnosis
│   │   └── treatment.py             ← TreatmentPlan
│   │
│   └── config/settings.py           ← 全局配置 (pydantic-settings)
│
├── code/tests/                      ← 测试
│   ├── test_services.py             ← 服务层测试 (HIPAA/DDI/ICD10/GraphRAG/LLM基础)
│   ├── test_graphrag.py             ← GraphRAG 专项测试
│   ├── test_intent_accuracy.py      ← 意图识别评估 (50 条 + confusion matrix)
│   └── intent_eval_data.py          ← 评估数据集
│
├── fe/                              ← Vue 3 前端
│   └── src/views/                   ← ChatView / ReportDetail / DoctorDashboard
│
├── docs/                            ← 技术文档 (9 篇)
├── docker-compose.yml               ← PostgreSQL + Neo4j + App
└── docker/init-db.sql               ← 数据库初始化
```

<br>

### 全链路数据流

```
用户输入
    │
    ▼
┌─────────────────────────────────────────────┐
│  层 1: 意图前置路由 (Intent Classifier)      │
│  ┌──────────────┐   ┌────────────────────┐  │
│  │ L4 正则引擎   │──▶│ LLM Few-shot 分类  │  │
│  │ (零延迟,      │   │ (语义边界兜底)     │  │
│  │  100% 召回)   │   └────────┬───────────┘  │
│  └──────────────┘             │               │
│  危机/闲聊/拒绝 → 快捷通道   │ 倾诉/求助      │
└───────────────────────────────┼───────────────┘
                                ▼
┌─────────────────────────────────────────────┐
│  层 2: Empathic Voice Skill                 │
│                                             │
│  ┌──────────┐   ┌──────────────────────┐   │
│  │ 安全扫描  │──▶│ intent × emotion      │   │
│  │ (三级分级) │   │ 双维策略矩阵          │   │
│  └──────────┘   │                       │   │
│                 │ 痛苦情绪 → 深度倾听    │   │
│  ┌──────────┐   │ 倾诉+sad → 温和支持    │   │
│  │ 信息提取  │◀──│ 求助+anxious → 温和探索│   │
│  │ (不限字段) │   └──────────┬───────────┘   │
│  └─────┬────┘               │               │
│        ▼                     ▼               │
│  ┌──────────────────────────────────────┐   │
│  │        5 层动态 Prompt 组装           │   │
│  │  ┌──────────────────────────────────┐│   │
│  │  │ 1.安全规则 (永远最前)             ││   │
│  │  │ 2.核心人设 + 已知上下文           ││   │
│  │  │ 3.策略模板 (jinja2 渲染)          ││   │
│  │  │ 4.句式模板 + 缺失字段软提示       ││   │
│  │  │ 5.阶段引导 + Token 预算检查       ││   │
│  │  └──────────────────────────────────┘│   │
│  └──────────────────┬───────────────────┘   │
│                     ▼                       │
│  ┌──────────────────────────────────────┐   │
│  │ LLM 生成 (llm_invoke: 超时+重试+监控) │   │
│  └──────────────────┬───────────────────┘   │
└─────────────────────┼───────────────────────┘
                      │
                core_ready?
               ↙            ↘
             NO              YES
         返回回复             │
                             ▼
              ┌──────────────────────────────┐
              │  层 3: 意图护栏               │
              │  全程倾诉 → 确认是否要诊断    │
              └──────────────┬───────────────┘
                             │ 求助
                             ▼
              ┌──────────────────────────────┐
              │  Severity Assessor           │
              │  五维度评分 0 - 100           │
              │  + 信息充分性评估             │
              └──┬───────────┬───────────────┘
                 │           │
           insufficient   sufficient
                 │           │
            返回追问         ▼
              ┌──────────────────────────────┐
              │  Unified Pipeline            │
              │                              │
              │  Diagnosis(severity)         │
              │  ├─ mild: ICD-11 Z 编码      │
              │  ├─ moderate: ICD-10 F 编码  │
              │  └─ severe: GraphRAG + DSM-5 │
              │           │                  │
              │           ▼                  │
              │  Treatment(severity)         │
              │  ├─ mild: 自我调节技巧       │
              │  ├─ moderate: 就医引导+CBT   │
              │  └─ severe: 药物+DDI+住院    │
              │           │                  │
              │    输出校验栅栏               │
              │    (Schema + Safety)         │
              └───────────┬──────────────────┘
                          ▼
                      生成报告
                          │
                          ▼
              ┌──────────────────────┐
              │  医生审核 (HITL)      │
              │  Approve / Reject     │
              └──────────────────────┘
```

### Agent 协同表

| Agent | 范围 | 职责 | 技术方案 |
|:---|:---|:---|:---|
| **Intent Classifier** | 公共 | 6 类意图识别，前置路由分流 | L4 正则 + LLM Few-shot 级联 |
| **Safety Scanner** | 公共 | 危机词检测、三级分级、风险标签 | 关键词 + 上下文规则引擎 |
| **Info Extractor** | 公共 | 从自然语言提取结构化字段（不限 Tier） | LLM 增量提取 + 已有值不覆盖 |
| **Goal Checker** | 公共 | 4 核心字段门控，判断采集进度 | 字段完整性规则 |
| **Severity Assessor** | 公共 | 五维度连续评分 + 信息充分性评估 | LLM 综合评估 (temp=0) |
| **Diagnosis Agent** | 统一 | 参数化诊断 (severity 控制深度+编码体系+GraphRAG) | LLM + GraphRAG |
| **Treatment Agent** | 统一 | 参数化治疗 (severity 控制方案: 自我调节/就医引导/药物+DDI) | LLM + 精神药理学 |

---

## 🔬 详细设计

### 设计 1: GraphRAG 加权检索 — 为什么不是向量检索?

精神科的鉴别诊断本质是**图问题**，不是语义相似度问题。

```
传统 RAG (向量检索):
  用户输入 "情绪低落，失眠" 
    → embedding 相似度
    → 找到描述相似的文档
    → 问题: "情绪低落"和"失去兴趣"在向量空间可能不相似
         但它们共同指向抑郁症!

GraphRAG (图多跳推理):
  用户输入 "幻听，被害妄想"
    → Neo4j: MATCH (s:Symptom)-[:INDICATES]->(d:Disease)
    → 幻听 → 精神分裂症 (边权重 0.9)
    → 被害妄想 → 精神分裂症 (边权重 0.8)
    → 排序: Σ(weight × IDF)
      - 幻听 IDF=4.2 (稀有!) × 0.9 = 3.78
      - 疲劳 IDF=0.3 (常见) × 0.5 = 0.15
    → 稀有症状自动获得更高区分度
```

**面试必杀技**: "我选 GraphRAG 而不是向量检索，是因为精神科症状的 IDF 天然不均匀——罕见症状（幻听、木僵）比常见症状（疲劳、失眠）有高得多的鉴别诊断区分度。向量检索抹平了这个差异，图检索放大了它。"

```
加权公式:
  Score(disease) = Σ (edge.weight × IDF(symptom))

IDF(symptom) = log(1 + N / df)
  N = 总疾病数 (70+)
  df = 出现该症状的疾病数

示例:
  疲劳:   出现在 45 种疾病 → IDF = log(1+70/45) = 0.94  → 低区分度
  幻听:   出现在 3 种疾病  → IDF = log(1+70/3)  = 3.19  → 高区分度
```

### 设计 2: 五层动态 Prompt 组装引擎

每一轮对话的系统 Prompt 不是写死的——而是由 5 个独立层动态组装，每层有明确的职责和加载条件。

```
┌─ Layer 1: 安全规则 ─────────────────────────────┐
│ 永远在 Prompt 最前面（不可覆盖）                   │
│ 来源: core/safety_rules.j2                       │
│ 内容: 绝不生成药物建议 / 不自称医生 / 危机立即停   │
└──────────────────────────────────────────────────┘
┌─ Layer 2: 核心人设 + 已知上下文 ──────────────────┐
│ 来源: core/persona.j2 + core/principles.j2       │
│ 注入: 已采集字段、对话轮次、用户情绪               │
└──────────────────────────────────────────────────┘
┌─ Layer 3: 策略模板 (双维矩阵选择) ────────────────┐
│ 来源: strategies/ (4 个 Jinja2 模板)              │
│                                                   │
│          │  倾诉          │  求助                   │
│  ────────┼────────────────┼───────────────          │
│  痛苦    │ deep_listening │ deep_listening         │
│  sad     │ gentle_support │ gentle_explore         │
│  anxious │ deep_listening │ gentle_explore         │
│  neutral │ deep_listening │ gentle_explore         │
│                                                   │
│ 规则: pain(苦痛)→总是倾听, intent(求助)→温和探索    │
└──────────────────────────────────────────────────┘
┌─ Layer 4: 句式模板 + 缺失字段软提示 ──────────────┐
│ 来源: templates/ (5 个句式) + goal_checker 输出    │
│ 根据 can_ask 和 missing_fields 动态注入追问        │
│ 追问不是审问——用 reflection/normalization 包裹     │
└──────────────────────────────────────────────────┘
┌─ Layer 5: 阶段引导 + Token 预算检查 ──────────────┐
│ guiding → "你们还在互相了解的阶段"                 │
│ diagnosis_pending → "核心信息已了解"               │
│ 组装完成后: tiktoken 计 Token → 超 3000 则截断     │
└──────────────────────────────────────────────────┘
```

### 设计 3: 三层意图级联体系

```
Layer 1: L4 正则引擎 (零延迟, 100% 危机召回)
  ├─ 命中 L4_TRIGGER_PATTERNS → 立即返回"危机"
  ├─ 命中 REFUSAL_PATTERNS   → 立即返回"拒绝"
  ├─ 命中 L0_TRIVIAL_PATTERNS → 立即返回"闲聊"
  └─ 未命中 → 进入 Layer 2

Layer 2: LLM Few-shot 分类 (语义边界兜底)
  输入: 用户消息 + 最近 4 轮对话历史
  System: INTENT_SYSTEM_PROMPT (6 类定义 + 输出格式)
  输出: {"intent": "...", "severity_level": "Lx", "confidence": 0.0-1.0}

Layer 3: 诊断前意图护栏
  条件: core_ready = true (4 核心字段齐全)
  调用: classify_intent("", conversation_history=全部历史)
  逻辑: 如果整个对话全程是"倾诉"意图 → 询问用户是否愿意做评估
       如果包含"求助"意图 → 直接触发诊断流程
```

**面试必杀技**: "这不是一个 LLM 调用的简单封装——L4 正则解决了延迟和成本，LLM 解决了语义模糊的召回，第三层护栏解决了'用户只是想倾诉但系统强行出诊断报告'的用户体验问题。三层各司其职，合起来是完整的意图管理。"

### 设计 4: Severity Assessor — 五维度连续评分

```
评分公式:
  severity_score =
    symptom_burden     × 0.30   → 症状数量 + 严重度
  + functional_impairment × 0.25 → 工作/社交/自理能力受损
  + risk_level         × 0.25   → 自杀/自伤/伤人风险
  + chronicity         × 0.10   → 持续时间 + 发作频率
  + biological_factors × 0.10   → 睡眠/食欲/体重变化

映射:
  0 - 30  → mild    (轻度)
  30 - 65 → moderate (中度)
  65 - 100 → severe  (重度)

信息充分性评估 (不是字段计数!):
  ❌ 旧方案: if len(patient_info) >= 4 then sufficient
  ✅ 优化方案: LLM 判断已有信息能否支持鉴别诊断
     - "失眠" → insufficient (信息量太低)
     - "每晚凌晨3点醒来无法再次入睡,持续3周,伴白天疲劳" → sufficient (高特异性)
     - "幻听" → sufficient (一个高特异性症状就够了)
```

### 设计 5: LLM 全链路容灾三层架构

```
        用户请求
           │
    ┌──────▼──────┐
    │ 熔断器检查   │ ── 已开启? ──→ 返回降级兜底值
    └──────┬──────┘
           │ 关闭
    ┌──────▼──────┐
    │ 指数退避重试 │
    │ 尝试 1: 等待 1s   ── 失败 ──┐
    │ 尝试 2: 等待 2s   ── 失败 ──┤
    │ 尝试 3: 等待 4s   ── 失败 ──┤
    │ 最大 3 次重试 + 30s 硬超时   │
    └──────┬──────┘                │
           │ 成功                  │
    ┌──────▼──────┐    ┌──────────▼──────────┐
    │ 记录成功    │    │ 连续失败 >= 5 次?     │
    │ 重置熔断器  │    │ ┌──────────────────┐ │
    └─────────────┘    │ │ 触发熔断 60s      │ │
                       │ │ 返回降级兜底值    │ │
                       │ └──────────────────┘ │
                       └──────────────────────┘
```

所有 LLM 调用点统一入口:
| 调用点 | 函数 | caller 标签 | timeout |
|------|------|------|:---:|
| Voice Engine (共情生成) | `llm_invoke` (async) | `voice_engine.generate` | 30s |
| Voice Engine (字段提取) | `llm_invoke` (async) | `voice_engine.extract` | 30s |
| Intent Classifier | `llm_invoke_sync` | `intent_classifier` | 15s |
| Severity Assessor | `llm_invoke_sync` | `severity_assessor` | 60s |
| Diagnosis Agent | `llm_invoke_sync` | `diagnosis_agent` | 60s |
| Treatment Agent | `llm_invoke_sync` | `treatment_agent` | 60s |
| Symptom Extraction | `llm_invoke_sync` | `diagnosis_agent.symptom_extract` | 30s |

### 设计 6: 输出安全校验栅栏

诊断输出校验 (`validate_diagnosis_result`):
```
┌───────────────────────────────────────────────┐
│  Schema 校验                                   │
│  ├─ mild: 必须包含 primary_diagnosis           │
│  ├─ moderate: 必须包含 primary + differential │
│  └─ severe: 必须包含 primary_recommendation   │
├───────────────────────────────────────────────┤
│  安全约束                                      │
│  ├─ mild 路由: 拦截 medications / drug_inter  │
│  │             / hospitalization_assessment   │
│  ├─ severe 路由: 必须有 suicide_risk_assess   │
│  └─ 置信度下限: mild≥0.55, moderate≥0.60,      │
│                severe≥0.65                     │
├───────────────────────────────────────────────┤
│  修正动作                                      │
│  ├─ mild 药物字段 → 强制清空                   │
│  ├─ 置信度不足   → 注入警告(不篡改诊断)        │
│  └─ agent_type 错 → 自动修正                   │
└───────────────────────────────────────────────┘
```

治疗方案输出校验 (`validate_treatment_result`):
```
┌───────────────────────────────────────────────┐
│  mild 路由拦截:                                │
│  ├─ medications → []                          │
│  ├─ drug_interactions → 移除                   │
│  ├─ hospitalization_assessment → 移除          │
│  └─ somatic_treatments / warnings → 移除       │
├───────────────────────────────────────────────┤
│  moderate 路由拦截:                            │
│  └─ medications/drug_interactions/hospital. → 移除│
├───────────────────────────────────────────────┤
│  severe 路由:                                  │
│  └─ 所有字段保留, 不做拦截                      │
└───────────────────────────────────────────────┘
```

### 设计 7: 统一 Pipeline — 参数化深度控制（优化）

之前 mild/moderate/severe 各有独立的诊断 + 治疗 Agent（共 4 个专用 Agent），诊断逻辑本质相同但代码重复。

**改造后**: 1 条统一链路，`severity_level` 参数注入控制行为。

```
build_unified_pipeline(triggered_route="moderate")

  ┌───────────────────────┐
  │  Diagnosis Agent      │
  │  severity = "moderate"│
  │  ├─ Prompt: MODERATE  │
  │  │   双鉴别 + F 编码  │
  │  ├─ temperature: 0.0  │
  │  ├─ max_tokens: 2048  │
  │  ├─ GraphRAG: 不使用  │
  │  └─ 输出校验          │
  └───────────┬───────────┘
              ▼
  ┌───────────────────────┐
  │  Treatment Agent      │
  │  severity = "moderate"│
  │  ├─ Prompt: MODERATE  │
  │  │   就医引导 + CBT   │
  │  ├─ temperature: 0.1  │
  │  ├─ max_tokens: 2048  │
  │  └─ 输出校验          │
  └───────────┬───────────┘
              ▼
            END
```

---

## 🧪 测试体系

### 测试分层策略

```
┌─────────────────────────────────────────┐
│  层 3: 意图识别集成评估                   │
│  50 条标注数据, confusion matrix,         │
│  每类 precision/recall/f1                 │
├─────────────────────────────────────────┤
│  层 2: 单元测试                          │
│  LLM 基础设施 / 输出校验 / HIPAA /       │
│  DDI / ICD10 / GraphRAG / Goal Checker  │
├─────────────────────────────────────────┤
│  层 1: 数据类序列化 / 纯函数              │
│  ConversationState / ClinicalState /    │
│  Safety Scanner                          │
└─────────────────────────────────────────┘
```

### 运行测试

```bash
# 全量测试
pytest code/tests/ -xvs

# 意图识别评估（含报告）
pytest code/tests/test_intent_accuracy.py -xvs

# 服务层单元测试
pytest code/tests/test_services.py -xvs

# 仅 LLM 基础设施测试
pytest code/tests/test_services.py -k "TokenBudget or CircuitBreaker or LLMCallMetrics or LLMValidator" -xvs

# 安全扫描测试
pytest code/src/skills/empathic_voice/tests/ -xvs
```

### 意图识别评估数据示例

评估数据集位于 `code/tests/intent_eval_data.py`，包含 50 条精心构造的测试用例：

```python
# 危机(7条) — L4正则确定性匹配
("我不想活了", "危机", "明确自杀意图"),
("想跳楼，站在窗边很久了", "危机", "自杀方法+位置描述"),

# 倾诉(11条) — 表达情绪但未求助
("最近心情不太好，一直很消沉", "倾诉", "表达情绪但未求助"),
("没人懂我，我觉得特别孤单", "倾诉", "孤独感表达"),

# 求助(12条) — 主动寻求评估或帮助
("你能帮我看看我这是怎么回事吗", "求助", "主动寻求评估"),
("我这种情况需要去看医生吗", "求助", "就医决策求助"),
```

---

## 🚀 快速开始

### 前置依赖

- Python 3.11+
- PostgreSQL 16+
- Neo4j 5.x (可选, 离线模式可用 dict 回退)
- Node.js 18+ (前端)

### 安装

```bash
# 1. 克隆项目
git clone <repo-url>
cd BrainDox

# 2. 安装 Python 依赖
# 推荐使用 Anaconda 创建独立环境
conda create -n braindox python=3.11
conda activate braindox
pip install -r code/requirements.txt

# tiktoken 用于 Token 预算管理
pip install tiktoken>=0.7.0

# 3. 配置环境变量
cp code/.env.example code/.env
# 编辑 .env 文件，填入 OpenAI API Key / 数据库连接等

# 4. 初始化数据库 (PostgreSQL)
psql -U postgres -c "CREATE DATABASE clinical_decision;"

# 5. 启动服务 (Docker 方式)
docker-compose up -d

# 或手动启动
cd code
uvicorn src.api.main:app --host 0.0.0.0 --port 8000 --reload
```

### 访问

| 服务 | 地址 |
|------|------|
| API 文档 (Swagger) | [http://localhost:8000/docs](http://localhost:8000/docs) |
| ReDoc | [http://localhost:8000/redoc](http://localhost:8000/redoc) |
| 健康检查 | [http://localhost:8000/health](http://localhost:8000/health) |

---

## 📡 API 文档

### 患者端

| 方法 | 端点 | 说明 |
|:---|------|------|
| `POST` | `/api/v1/auth/login` | 患者登录 |
| `GET` | `/api/v1/profile` | 获取个人信息 |
| `POST` | `/api/v1/chat` | 发送消息并获取 AI 回复（核心接口） |
| `GET` | `/api/v1/reports` | 获取我的报告列表 |
| `GET` | `/api/v1/reports/{id}` | 获取报告详情 |

### 医生端

| 方法 | 端点 | 说明 |
|:---|------|------|
| `POST` | `/api/v1/doctor/auth/login` | 医生登录 |
| `GET` | `/api/v1/doctor/reports/pending` | 待审核报告列表 |
| `GET` | `/api/v1/doctor/reports/{id}` | 获取报告详情 |
| `POST` | `/api/v1/doctor/reports/review` | 审核报告 (approve/reject/return_for_revision) |
| `GET` | `/api/v1/doctor/stats` | 医生统计面板 |

### 临床辅助工具

| 方法 | 端点 | 说明 |
|:---|------|------|
| `POST` | `/api/v1/clinical/icd10/search` | 按文本搜索 ICD-10 编码 |
| `GET` | `/api/v1/clinical/icd10/{code}` | 查询指定 ICD-10 编码（含 DRG 分组） |
| `POST` | `/api/v1/clinical/ddi/check` | 药物交互检查 |

### 核心接口: `POST /api/v1/chat`

**请求**
```json
{
  "content": "最近工作压力好大，每天都睡不好",
  "conversation_id": "optional-existing-id"
}
```

**响应**
```json
{
  "conversation_id": "uuid",
  "reply": {
    "content": "听起来你最近压力真的很大...",
    "type": "text"
  },
  "stage": "guiding",
  "is_diagnosis_ready": false,
  "intent": "倾诉"
}
```

**响应 (诊断就绪时)**
```json
{
  "conversation_id": "uuid",
  "reply": {
    "content": "根据我们的交流，我为你整理了一份评估报告...",
    "type": "report",
    "report_id": "uuid"
  },
  "stage": "completed",
  "is_diagnosis_ready": true,
  "intent": "求助"
}
```

---

## 🏭 企业级设计：面试亮点

> 以下从 6 个维度展示此项目的含金量。

### 1. 可靠性工程 — LLM 不可控 ≠ 系统不可靠

```
┌──────────────────────────────────────────────────┐
│              可靠性四层保障                        │
├──────────────────────────────────────────────────┤
│ Layer 1: 指数退避重试 (1s→2s→4s, max 3次)        │
│ Layer 2: 30s 硬超时 (thread.join 实现)            │
│ Layer 3: 熔断器 (连续5次故障 → 60s断开)           │
│ Layer 4: 降级兜底 (每个Agent预设安全默认输出)     │
├──────────────────────────────────────────────────┤
│ Layer 5: 轮转降级回复池 (共情引擎专用)            │
│ Layer 6: 输出校验栅栏 (Schema + Safety)           │
│ Layer 7: Token 预算管理 (防上下文溢出)            │
│ Layer 8: 全链路调用监控 (caller归因+指标打点)     │
└──────────────────────────────────────────────────┘
```

### 2. AI Safety — 设计时嵌入

| 维度 | 实现 | 位置 |
|------|------|------|
| **危机检测** | 三级分级 + 关键词规则 | `safety_scanner.py` |
| **安全规则嵌入 Prompt** | Layer 1 永远最前面 | `core/safety_rules.j2` |
| **输出拦截** | mild 路由强制清空药物字段 | `llm_validator.py` |
| **意图护栏** | 全程倾诉→确认意愿后才触发诊断 | `chat_service.py` |
| **危机告警** | 异步通知不阻塞主流程 | `crisis_alert.py` |
| **医生审核** | AI 不做最终决策 (HITL) | `doctor_routes.py` |

### 3. 可观测性 — 生产环境必须知道的事情

```
每次 LLM 调用都记录:
  ├─ caller: 谁调用的 (voice_engine.generate / diagnosis_agent / intent_classifier...)
  ├─ latency_ms: 耗时多少
  ├─ prompt_tokens: 输入 Token 数
  ├─ completion_tokens: 输出 Token 数
  ├─ success: 是否成功
  ├─ retry_count: 重试了几次
  └─ circuit_breaker_open: 是否触发了熔断

每个 Prompt 组装记录:
  └─ token_budget: system / user / total / limit

每次输出校验记录:
  └─ llm_validator: route / issue
```

### 4. 模块化架构 — 独立可发布 + 无全局状态

- **Empathic Voice Skill** 是一个独立的 Python 包 (有自己的 `pyproject.toml` + `LICENSE`)，可以脱离 BrainDox 在任意聊天场景中发布使用
- 所有 Skill 内函数都是纯函数驱动，唯一的状态容器是 `ConversationState` dataclass
- Agent 间通过 `ClinicalState` 共享状态，无全局变量耦合



### 6. 持续面试素材密度

此项目每一个文件都可以在面试中展开深挖：

| 被问 | 展开点 | 文件 |
|------|------|------|
| "怎么管理系统 Prompt?" | 5 层组装 + Token 预算 | `context_builder.py` |
| "为什么不用向量检索?" | IDF 加权 + 图多跳推理 | `graphrag_service.py` |
| "怎么保证 LLM 输出安全?" | 校验栅栏 + 安全约束 | `llm_validator.py` |
| "LLM 挂了怎么处理?" | 重试/熔断/降级三层 | `llm_utils.py` |
| "意图识别怎么做的?" | L4正则 + LLM级联 + 护栏 | `intent_service.py` |
| "怎么评估严重度?" | 五维度加权 + info_sufficiency | `severity_assessor.py` |
| "怎么编排多 Agent?" | StateGraph + MemorySaver | `pipeline_compiler.py` |
| "怎么处理用户隐私?" | HIPAA + FHIR | `hipaa_service.py` |

---

## 🔮 设计哲学

> 三句话概括这个项目的工程思考：

1. **"你填表我给你出报告" → "我陪你聊，聊完我帮你梳理"** — 对患者，去掉所有审问感

2. **"LLM 挂了就挂了" → "LLM 挂了但有熔断/重试/降级/校验四层保障"** — 对系统，容灾不是事后补丁

3. **"AI 输出直接消费" → "AI 整理证据，人做决策"** — 对安全，HITL 不是可选功能

---

<p align="center">
  <sub>Built with ❤️ for clinical decision support | MIT License</sub>
</p>
