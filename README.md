<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6&height=200&section=header&text=BrainDox&fontSize=70&fontColor=fff&desc=AI+原生精神健康平台+·+共情对话+·+智能诊断&descSize=18&descAlignY=65">
    <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6&height=200&section=header&text=BrainDox&fontSize=70&fontColor=fff&desc=AI+原生精神健康平台+·+共情对话+·+智能诊断&descSize=18&descAlignY=65">
  </picture>
</p>

<p align="center">
  <strong>🧠 用共情对话建立信任，用知识图谱支撑诊断，用医生审核守护安全</strong>
</p>

<p align="center">
  <a href="#-项目定位">项目定位</a> •
  <a href="#-双核心引擎">双核心引擎</a> •
  <a href="#-患者端共情对话">患者端</a> •
  <a href="#-医生端临床决策">医生端</a> •
  <a href="#-三路由分级诊断">三路由分级</a> •
  <a href="#-GraphRAG-检索机制">GraphRAG</a> •
  <a href="#-API-文档">API 文档</a> •
  <a href="#-快速开始">快速开始</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/LangGraph-0.2+-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white" alt="LangGraph">
  <img src="https://img.shields.io/badge/FastAPI-0.115+-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/Vue_3-4.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue 3">
  <img src="https://img.shields.io/badge/DeepSeek-LLM-4F46E5?style=for-the-badge" alt="DeepSeek">
  <img src="https://img.shields.io/badge/GraphRAG-加权检索-005682?style=for-the-badge" alt="GraphRAG">
  <img src="https://img.shields.io/badge/ICD-10-F00--F99-FF6B6B?style=for-the-badge" alt="ICD-10">
  <img src="https://img.shields.io/badge/PostgreSQL-16+-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Jinja2-动态Prompt-B41717?style=for-the-badge" alt="Jinja2">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="MIT">
</p>

<hr>

## 🎯 项目定位

> **BrainDox** 是一个 AI 原生的精神健康平台。
>
> 对**患者**，它用共情对话建立信任，在自然交流中完成信息采集，信息足够后自动生成评估报告。
> 对**医生**，它用知识图谱做精确检索、LLM 做深度推理，提供透明可解释的诊断辅助。
> 两者通过**审核机制**串联——患者报告必须经过医生审核才能生效。

### 它解决的核心矛盾

| 痛点 | 传统方式 | BrainDox 方案 |
|:---|:---|:---|
| **患者不愿开口** | 表单式问卷，冰冷、有审问感 | 共情对话引擎，先接住情绪再采集信息，自然过渡 |
| **信息采集不精准** | 靠医生经验，漏掉关键病史 | 渐进式三阶段采集，Tier 0→1→2 逐层深入，每层有退出条件 |
| **诊断依赖个人经验** | 年轻医生容易漏诊、误诊 | GraphRAG 加权检索 top3 候选 + LLM 证据链分析 |
| **诊疗方案选择困难** | 查阅指南耗时，容易遗漏 | AI 推荐循证治疗 + 药物交互检查 + 住院评估 |
| **AI 诊断不可信** | 黑盒输出，医生不敢用 | 图路径 + 加权评分 + 推理链全透明，医生最终决策 |

### 两种使用场景

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BrainDox 平台                               │
│                                                                     │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐  │
│  │       🫂 患者端              │  │       🩺 医生端              │  │
│  │                             │  │                             │  │
│  │  聊天界面                   │  │  审核面板                   │  │
│  │  ┌───────────────────────┐  │  │  ┌───────────────────────┐  │  │
│  │  │ 小安: 听起来你最近...  │  │  │  │ 待审核报告      3 份  │  │  │
│  │  │ 用户: 工作压力好大...  │  │  │  │ □ 张三 - 中度评估    │  │  │
│  │  │ 小安: 我能感受到...    │  │  │  │ □ 李四 - 重度评估    │  │  │
│  │  └───────────────────────┘  │  │  │ □ 王五 - 轻度评估    │  │  │
│  │                             │  │  │           [审核]      │  │  │
│  │  自然对话 → 自动评估报告    │  │  └───────────────────────┘  │  │
│  └─────────────────────────────┘  └─────────────────────────────┘  │
│                                                                     │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐  │
│  │    📋 专业端（可选）         │  │   🔍 知识库                 │  │
│  │                             │  │                             │  │
│  │  结构化表单                 │  │  ICD-10 编码搜索            │  │
│  │  候选诊断卡片 + 评分        │  │  药物交互检查 (DDI)         │  │
│  │  HITL 人机协同             │  │  精神科知识图谱             │  │
│  └─────────────────────────────┘  └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

<br>

---

## 🏗️ 双核心引擎

BrainDox 由两大引擎驱动：

| | 🫂 Empathic Voice Skill | 🩺 Clinical Decision Pipeline |
|:---|:---|:---|
| **定位** | 患者端共情对话引擎 | 医生端 / 自动化诊断引擎 |
| **输入** | 用户自然语言（自由文本） | 患者结构化信息 / 表单 |
| **输出** | 共情回复 + 结构化病历字段 | 鉴别诊断 + 治疗方案 + 编码 |
| **核心技术** | Safety Scanner + Info Extractor + 动态 Prompt 组装（含Tier引导） | GraphRAG + LangGraph 多 Agent + HITL |
| **触发时机** | 患者每发一条消息 | Voice Skill 采够信息 或 医生提交表单 |
| **自治程度** | 完全自主对话，直到信息足够 | 医生可在诊断阶段介入选择 |

```
用户消息
   ↓
┌──────────────────────────────────┐
│  Empathic Voice Skill            │
│  ┌──────────┐  ┌──────────────┐  │
│  │ 安全扫描  │→│  情感策略选择  │  │
│  └──────────┘  └──────┬───────┘  │
│  ┌──────────────────┐  │         │
│  │ 信息提取+渐进采集 │←─┘         │
│  └────────┬─────────┘            │
│  ┌────────▼─────────┐            │
│  │ 动态 Prompt 组装  │            │
│  └────────┬─────────┘            │
│  ┌────────▼─────────┐            │
│  │   LLM 生成回复    │            │
│  └────────┬─────────┘            │
└───────────┼──────────────────────┘
            │
    is_diagnosis_ready?
       ↙           ↘
     NO              YES
  返回共情回复       ↓
              ┌──────────────────────────────────┐
              │  Clinical Decision Pipeline       │
              │  ┌────────────┐                  │
              │  │ 诊断 Agent  │ ← GraphRAG 检索  │
              │  └─────┬──────┘                  │
              │  ┌─────▼──────┐                  │
              │  │ 治疗 Agent  │                  │
              │  └─────┬──────┘                  │
              │  ┌─────▼──────┐                  │
              │  │ 编码+审计  │                  │
              │  └─────┬──────┘                  │
              └────────┼─────────────────────────┘
                       ↓
                   生成报告
                       ↓
            ┌──────────────────┐
            │  戴医生审核       │
            │  approve / reject │
            └──────────────────┘
```

<br>

---

## 🫂 患者端：共情对话

### 设计哲学

> 不是"你填表我给你出报告"，而是"我陪你聊，聊完了我帮你梳理一下"

传统的心理健康评估是**表单驱动的**——用户面对一连串的问题：你的症状是什么？持续多久了？有自杀想法吗？——这本身就带着审问感。

BrainDox 的患者端采用**对话驱动**的模式：

- **先接住情绪，再温和引导**——每轮回复以共情开头，从用户刚说的内容中自然延伸
- **渐进式三阶段采集**——从轻到重逐层推进，每一层有独立的退出条件
- **策略自适应**——根据用户情绪自动切换深度倾听 / 温和支持 / 温和探索三种策略
- **危机优先**——检测到危机信号时立即切换模式，停下信息采集，先稳住对方

### 对话阶段流转

```
Tier 0（基本了解阶段）
  │  采集：主诉、症状、时长
  │  策略：温和探索 → 获取最基础的信息
  │  退出条件：duration < 2周 且无安全关切 → 生成 mild 报告
  │  升级条件：duration >= 2周 或 safety concern → 进入 Tier 1
  │
  ▼
Tier 1（深入评估阶段）
  │  采集：功能影响、自杀风险筛查
  │  策略：温和支持 → 已有信任，更敏感的话题
  │  退出条件：无自杀风险 且 duration < 4周 → 生成 moderate 报告
  │  升级条件：自杀风险有 或 duration >= 4周 → 进入 Tier 2
  │
  ▼
Tier 2（全面评估阶段）
  │  采集：病史、家族史、用药、过敏、物质使用
  │  策略：温和支持 → 需要更多铺垫的临床信息
  │  退出条件：全部字段采集完毕 → 生成 severe 报告
  │
  ▼
诊断阶段 (diagnosing)
  │  信息齐全 → 自动触发 Pipeline → 生成报告
  │  最后一轮回复仍是共情语气
  │
  ▼
完成 (completed)
  │  报告进入医生审核队列
  │  用户可查看报告状态
```

### 动态 Prompt 组装系统

每一轮对话的 System Prompt 都是**实时拼装**的，不是一个大而全的静态 Prompt：

```
┌─────────────────────────────────────────────────────┐
│  第一层：安全规则（永远在最前面）                      │
│  safety_rules.j2 → 危机信号处理流程                   │
├─────────────────────────────────────────────────────┤
│  第二层：对话原则（永远包含）                          │
│  principles.j2 → 8 条核心原则                        │
├─────────────────────────────────────────────────────┤
│  第三层：策略模板（根据情绪动态选择）                   │
│  crisis_response.j2  ← 危机模式                     │
│  deep_listening.j2   ← 用户情绪痛苦                  │
│  gentle_support.j2   ← 用户情绪低落                  │
│  gentle_explore.j2   ← 用户情绪稳定                  │
├─────────────────────────────────────────────────────┤
│  第四层：句式模板（根据 can_ask 决定）                  │
│  reflection.j2 / normalization.j2                    │
│  affirmation.j2 / transition.j2                      │
│  open_inquiry.j2 ← 仅在允许提问时注入                 │
├─────────────────────────────────────────────────────┤
│  第五层：当前状态注入                                  │
│  persona.j2 + 对话进度 + Tier目标 + 缺失字段软提示     │
│  + 字数限制 + 冷却模式标记                            │
└─────────────────────────────────────────────────────┘
```

### 安全扫描器 (Safety Scanner)

三级危机分级系统，对每条用户消息做关键词 + 上下文匹配：

| 等级 | 标签 | 响应策略 |
|:---|:---|:---|
| 🔴 **CRISIS** | 立即自伤、明确自杀计划 | 停止信息采集，提供危机热线，进入冷却模式 |
| 🟠 **SEVERE** | 自杀意念、自伤行为 | 进入危机模式，深度倾听，不追问 |
| 🟡 **CONCERN** | 情绪表达痛苦 | 延长冷却期，温和回应 |
| 🟢 **SAFE** | 无危机信号 | 正常对话流程 |

### 信息提取器 (Info Extractor)

每条用户消息经过 LLM 提取为结构化字段，**增量合并**进 `patient_info`：

```python
# 用户说："工作压力大，每天加班到很晚，睡不着，大概有三个星期了，上班也集中不了注意力"

# 提取结果：
{
  "chief_complaint": "工作压力大",
  "symptoms": [{"name": "入睡困难", "severity": "moderate"}],
  "duration_weeks": 3.0,
  "functional_impact": "上班无法集中注意力",
  "emotion_detected": "overwhelmed"
}
```

已有值不会被覆盖，保证信息一致性。所有字段跨轮次累积。

<br>

---

## 🩺 三路由分级诊断

Voice Skill 通过渐进式三阶段采集，在每一层完成后判断是否升级：

| | 🟢 Mild 报告 | 🟡 Moderate 报告 | 🔴 Severe 报告 |
|:---|:---|:---|:---|
| **触发条件** | Tier 0 完成 且 duration < 2周 无安全关切 | Tier 1 完成 且 无自杀风险 且 duration < 4周 | Tier 2 全部字段完成 |
| **采集字段** | 3 个 | 5 个 | 10 个 |
| **渐进阶段** | 停在 Tier 0 | 停在 Tier 1 | 完成 Tier 0→1→2 |
| **诊断编码** | ICD-11 Z 编码 | ICD-10 F 编码 | ICD-10 F 编码 + DSM-5 |
| **鉴别诊断** | 无（单结论） | 有（2 个候选） | 有 + GraphRAG 辅助 |
| **药物推荐** | 无 | 无（就医引导） | 有（含 DDI 检查、住院评估） |
| **Pipeline Agent** | 2 个 | 2 个 | 5 个 |
| **LLM 调用** | 2 次 | 2 次 | 6 次+ |
| **用户感受** | "你只是需要休息一下" | "建议去看看医生" | "我认真为你梳理了情况" |

### Mild 路由：轻度情绪困扰

```
MildDiagnosis ──→ MildTreatment ──→ END
(单结论+Z编码)    (自我调节+技巧)
```

报告内容：
- 诊断编码：ICD-11 Z 编码（`QF27` - 与生活压力相关的问题）
- 治疗方案：正念呼吸、情绪日记等自我调节技巧
- 结语："这不是什么严重的问题，更像是在提醒你需要停下来照顾一下自己了"
- **零药物、零就医建议**——给用户的是工具感，不是病人感

### Moderate 路由：中度症状

```
ModerateDiagnosis ──→ ModerateTreatment ──→ END
(双鉴别诊断+F编码)    (就医引导+CBT推荐)
```

报告内容：
- 诊断编码：ICD-10 F 编码（`F43.2` - 适应障碍）
- 鉴别诊断：含第二个候选诊断（如 `F32.0` - 轻度抑郁发作）
- 治疗方案：就医建议 + CBT 推荐 + 警示信号清单
- 量表推荐：PHQ-9 抑郁量表、GAD-7 焦虑量表
- 结语："这不需要慌张，很多人都走出来过"

### Severe 路由：重度评估

```
Intake → SufficiencyCheck → Diagnosis(GraphRAG) → [HITL] → Treatment → Coding → Audit → END
```

完整 5 个 Agent 链路，带人机协同中断点：
- **GraphRAG 加权检索**：从 70+ 疾病中检索 top3 候选
- **DSM-5 证据链分析**：每个候选的支持证据 + 反对证据 + 推理
- **循证治疗方案**：药物 + DDI 检查 + 住院评估 + 心理治疗
- **ICD-10 自动编码** + **HIPAA 合规审计**
- 结语："你承受的比我一开始以为的要重。这不是评判，是对你正在承受的东西的承认"

<br>

---

## 🩺 医生端：审核 + 临床决策

### 审核面板

患者完成对话后，报告自动进入医生的审核队列：

```
┌────────────────────────────────────────────────────────────┐
│  🩺 医生工作台                          Sxxxx 戴医生  ▼    │
├────────────────────────────────────────────────────────────┤
│  ┌──────────────────────┐  ┌──────────────────────────┐   │
│  │ 待审核  3 份          │  │ 今日审核 12 份            │  │
│  │                      │  │ 审核通过率 91.7%          │  │
│  └──────────────────────┘  └──────────────────────────┘   │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ☐ 张三 — 中度评估 — 适应障碍 (F43.2) — 2 小时前    │  │
│  │ ☐ 李四 — 重度评估 — 重性抑郁障碍 (F32.9) — 4 小时前│  │
│  │ ☐ 王五 — 轻度评估 — 生活压力相关问题 (QF27) — 6 小时前│  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

医生可以：
- 查看完整报告（对话摘要 + 诊断 + 治疗建议）
- **批准 (Approve)**：报告生效，可选发邮件通知患者
- **驳回 (Reject)**：填写驳回原因，AI 重新评估
- 查看统计数据（审核通过率、今日审核量等）

### 专业端（表单模式）

除了患者对话模式，BrainDox 还支持医生直接填写结构化表单进行快速诊断：

```
┌────────────────────────────────────────────────────────────┐
│  🧠 精神科临床决策                  场景：[初诊 ▼]        │
├────────────────────────────────────────────────────────────┤
│  主诉 *      情绪低落、兴趣丧失、早醒......               │
│  症状 *      情绪低落, 兴趣丧失, 早醒......               │
│  自杀风险 *  [低风险 ▼]    物质使用 * [否认 ▼]            │
│                                                             │
│              [🧠 开始分析]                                  │
└────────────────────────────────────────────────────────────┘
```

提交后直接进入 **HITL（人机协同）** 流程：

```
表单提交
  ↓
Diagnosis Agent → GraphRAG 加权检索 top3 候选
  ↓
[⏸ 诊断后暂停]
  ↓
医生查看 3 个候选卡片（加权评分 + 匹配贡献明细）
  ↓
医生选择最可能的诊断
  ↓
Pipeline 自动恢复 → 治疗 → 编码 → 审计
```

候选诊断卡片透明展示评分链路：

```
┌──────────────────────────────────────────────┐
│  🔴 #1  重性抑郁障碍 (F32.9)                 │
│  ┌────────────────────────────────────┐     │
│  │ 加权评分          3.85             │     │
│  │ ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░   │     │
│  └────────────────────────────────────┘     │
│  匹配贡献明细：                               │
│    情绪低落  w=0.95 × idf=2.64 = 2.508     │
│    快感缺失  w=0.90 × idf=2.64 = 2.376     │
│    早醒      w=0.60 × idf=2.64 = 1.584     │
│    自杀意念  w=0.75 × idf=2.30 = 1.725     │
│               [选择此诊断]                   │
└──────────────────────────────────────────────┘
```

<br>

---

## 🔬 GraphRAG 加权知识图谱检索

### 核心原理

> **Σ(weight × IDF)** —— 核心症状权重高，罕见症状区分度大

传统方式仅靠 `COUNT(matched_symptoms)` 排序，所有症状贡献相等。BrainDox 引入**三层映射体系**：

```
                         ┌──────────────────────┐
   LLM 提取症状          │  SYMPTOM_ALIAS       │
   "情绪低落" ──────────→│  84 个中文别名       │
                         │  "心情不好"→depressed │
                         └─────────┬────────────┘
                                   │ 精确键
                          ┌────────▼────────────┐
                          │  SYMPTOM_WEIGHTS     │
                          │  150+ 症状-疾病权重  │
                          │  情绪低落→MDD: 0.95 │
                          │  情绪低落→适应障碍: 0.40
                          └─────────┬────────────┘
                                    │ w × IDF
                           ┌────────▼────────────┐
                           │  加权评分 =          │
                           │  Σ(weight × IDF)    │
                           └─────────────────────┘
```

### 检索链路对比

| 版本 | 排序方式 | 区分度 | 可解释性 |
|:---|:---|:---:|:---:|
| 旧版 | `COUNT(matched_symptoms)` | 低——所有症状贡献相等 | 低——只看命中数 |
| **新版** | `Σ(weight × IDF)` | **高**——核心症状+罕见症状权重更大 | **高**——w×idf=contribution 全透明 |

### IDF 的威力

| 症状 | 关联疾病数 | IDF | 含义 |
|:---|:---:|:---:|:---|
| `depressed_mood` | 5 | 1.79 | 低区分度，很多疾病都有——降低其影响 |
| `fatigue` | 4 | 1.92 | 中低区分度 |
| `auditory_hallucination` | 3 | 2.10 | 高区分度——提升其影响 |
| `catatonia` | 3 | 2.10 | 高区分度，高度特异 |
| `tics` | 3 | 2.10 | 高区分度 |

**IDF 让"稀有症状"比"常见症状"更有诊断价值**——这和临床直觉完全一致：一个患者说"幻听"比说"疲劳"的信息量大得多。

### 双模式自动降级

| 特性 | 生产模式 | 离线模式 |
|:---|:---|:---|
| **数据存储** | Neo4j 图数据库 | Python dict（内存） |
| **查询方式** | Cypher 三跳查询 | O(1) 哈希查找 |
| **依赖** | Neo4j 容器 | 零依赖 |
| **降级触发** | 连接失败时自动切换 | 始终可用 |

<br>

---

## 📋 多 Agent 协同

| Agent | 路由 | 职责 | 技术方案 |
|:---|:---|:---|:---|
| **Safety Scanner** | 公共 | 危机词检测、三级分级、风险标签 | 关键词 + 上下文规则引擎 |
| **Info Extractor** | 公共 | 从自然语言提取结构化字段 | LLM 增量提取 + 已有值不覆盖 |
| **Goal Checker** | 公共 | 检查采集进度、确定路由、分层推进 | 字段完整性规则 + 条件路由 |
| **Mild Diagnosis** | mild | 轻度单结论 + ICD-11 Z 编码 | LLM 评估 |
| **Mild Treatment** | mild | 自我调节技巧、生活建议 | LLM 生成 |
| **Moderate Diagnosis** | moderate | 双鉴别诊断 + ICD-10 F 编码 | LLM 评估 + 量表推荐 |
| **Moderate Treatment** | moderate | 就医引导 + CBT 推荐 | LLM 生成 |
| **Intake Agent** | severe | 结构化患者信息提取 | 规则引擎 / LLM |
| **Diagnosis Agent** | severe | GraphRAG 加权检索 + DSM-5 分析 | LLM + 知识图谱 |
| **Treatment Agent** | severe | 循证治疗 + DDI 检查 + 住院评估 | 精神药理学 + 药物交互 |
| **Coding Agent** | severe | ICD-10 自动编码 + DRG 分组 | 规则映射 |
| **Audit Agent** | severe | HIPAA 合规审计 | PHI 检测 + 规则引擎 |

<br>

---

## 🗄️ 对话持久化

每轮对话的状态完整存入 PostgreSQL：

```
Conversation 表:
  id: UUID                          ← 会话 ID
  user_id: UUID                     ← 用户外键
  status: "active" | "awaiting_review" | "completed"
  stage: "guiding" | "branch_mild" | ... | "completed"
  voice_state: JSONB                ← EmpathicVoiceSkill 完整状态快照
  severity_level: "L1" | "L2" | "L3"
```

`voice_state` 字段存储的是 `ConversationState` 的完整 JSON：

```json
{
  "stage": "branch_moderate",
  "route": "moderate",
  "patient_info": {
    "chief_complaint": "工作压力大",
    "symptoms": [{"name": "入睡困难", "severity": "moderate"}],
    "duration_weeks": 3.0,
    "functional_impact": "上班无法集中注意力"
  },
  "turn_count": 4,
  "missing_fields": ["suicide_risk_screening"],
  "branch_tier": 1,
  "current_emotion": "overwhelmed",
  "conversation_history": [...]
}
```

每轮对话前后：
- **恢复**：`ConversationState.from_dict(conv.voice_state)`
- **保存**：`conv.voice_state = state.to_dict()`

断线重连后患者可以无缝继续对话，不会丢失已采集的任何信息。

---

## 🌐 API 文档

完整 API 文档在启动后访问：**[http://localhost:8001/docs](http://localhost:8001/docs)**（Swagger UI）

### 患者端 API

| 端点 | 功能 |
|:---|:---|
| `POST /api/v1/auth/login` | 患者登录 |
| `GET /api/v1/profile` | 获取个人信息 |
| `POST /api/v1/chat/send` | 发送消息（核心端点） |
| `GET /api/v1/chat/history` | 获取对话历史 |
| `GET /api/v1/reports` | 获取报告列表 |
| `GET /api/v1/reports/{id}` | 查看报告详情 |
| `GET /api/v1/reports/{id}/pdf` | 下载报告 PDF |
| `POST /api/v1/reports/{id}/resend-email` | 重发报告邮件 |

#### 核心端点：POST /chat/send

**请求**：

```json
{
  "conversation_id": "uuid-or-null",
  "content": "最近工作压力好大，快三周了，睡不着觉，上班也集中不了"
}
```

**对话中的响应**（`is_diagnosis_ready: false`）：

```json
{
  "conversation_id": "xxx",
  "reply": {
    "content": "听起来你最近承受的确实不少。三周了，每天加班还睡不好，第二天还要硬撑着去上班——这种感觉我很能理解...",
    "type": "text"
  },
  "stage": "branch_moderate",
  "route": "moderate",
  "is_diagnosis_ready": false
}
```

**诊断完成的响应**（`is_diagnosis_ready: true`）：

```json
{
  "conversation_id": "xxx",
  "reply": {
    "content": "谢谢你让我了解了这么多...",
    "type": "text",
    "diagnosis": {
      "primary_diagnosis": {
        "disease_name": "适应障碍",
        "icd_code": "F43.2",
        "confidence": 0.72
      },
      "differential_list": [...]
    },
    "treatment": {
      "medical_referral": "建议前往医院精神科就诊",
      "non_drug_treatments": ["认知行为疗法 (CBT)"]
    },
    "has_report": true,
    "report_id": "report-uuid"
  },
  "stage": "completed",
  "route": "moderate",
  "is_diagnosis_ready": true
}
```

### 医生端 API

| 端点 | 功能 |
|:---|:---|
| `POST /api/v1/doctor/auth/login` | 医生登录 |
| `GET /api/v1/doctor/reports/pending` | 待审核报告列表 |
| `GET /api/v1/doctor/reports/{id}` | 报告详情 |
| `POST /api/v1/doctor/reports/{id}/approve` | 审核通过 |
| `POST /api/v1/doctor/reports/{id}/reject` | 审核驳回 |
| `GET /api/v1/doctor/stats` | 审核统计数据 |
| `GET /api/v1/doctor/reports/{id}/email-status` | 邮件发送状态 |
| `POST /api/v1/doctor/reports/resend-email` | 重发邮件 |

### 专业端 API

| 端点 | 功能 |
|:---|:---|
| `POST /api/v1/clinical/analyze_form` | 表单模式分析 |
| `POST /api/v1/clinical/confirm_diagnosis` | 确认诊断（HITL 恢复） |
| `POST /api/v1/clinical/analyze` | 文本模式分析 |
| `POST /api/v1/clinical/icd10/search` | ICD-10 搜索 |
| `GET /api/v1/clinical/icd10/{code}` | ICD-10 编码查询 |
| `POST /api/v1/clinical/ddi/check` | 药物交互检查 |

<br>

---

## 🚀 快速开始

### 前置条件

| 依赖 | 版本 | 获取方式 |
|:---|:---:|:---|
| Python | ≥ 3.11 | [python.org](https://python.org) 或 Anaconda |
| Node.js | ≥ 18 | [nodejs.org](https://nodejs.org) |
| PostgreSQL | ≥ 16 | [postgresql.org](https://postgresql.org) 或 Docker |
| UV | 最新 | `pip install uv` |
| DeepSeek API Key | — | [platform.deepseek.com](https://platform.deepseek.com) |

### 1. 数据库初始化

```bash
# Docker 方式启动 PostgreSQL
docker run -d --name braindox-pg \
  -e POSTGRES_USER=braindox \
  -e POSTGRES_PASSWORD=braindox \
  -e POSTGRES_DB=braindox \
  -p 5432:5432 postgres:16
```

### 2. 后端启动

```bash
cd code

# 创建虚拟环境并安装依赖
uv venv
.venv\Scripts\activate   # Windows
source .venv/bin/activate # macOS / Linux
uv pip install -r requirements.txt

# 配置环境变量
copy .env.example .env   # Windows
# 编辑 .env，填入 DeepSeek API Key 和数据库连接信息：
#   OPENAI_API_KEY=sk-your-deepseek-api-key
#   OPENAI_MODEL=deepseek-chat
#   OPENAI_BASE_URL=https://api.deepseek.com
#   POSTGRES_USER=braindox
#   POSTGRES_PASSWORD=braindox
#   POSTGRES_HOST=localhost
#   POSTGRES_PORT=5432
#   POSTGRES_DB=braindox

# 启动 API 服务
uv run uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8001

# ✅ 看到以下输出说明启动成功：
#   INFO:  Uvicorn running on http://0.0.0.0:8001
#   INFO:  Application startup complete.
```

### 3. 前端启动

```bash
cd fe
npm install
npm run dev

# ✅ 访问 http://localhost:5173
```

### 4. 预置账号

| 角色 | 邮箱 | 密码 |
|:---|:---|:---|
| 患者 | `2669705213@qq.com` | `123456` |
| 医生 | `doctor@braindox.com` | `123456` |

### 环境变量参考

```ini
# ============== LLM 配置 ==============
OPENAI_API_KEY=sk-your-deepseek-api-key
OPENAI_MODEL=deepseek-chat
OPENAI_BASE_URL=https://api.deepseek.com

# ============== 数据库配置 ==============
POSTGRES_USER=braindox
POSTGRES_PASSWORD=braindox
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=braindox

# ============== Neo4j 配置（可选，离线模式可不填） ==============
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=

# ============== 应用配置 ==============
APP_HOST=0.0.0.0
APP_PORT=8001
LOG_LEVEL=INFO
JWT_PATIENT_EXPIRE_HOURS=24
JWT_DOCTOR_EXPIRE_HOURS=12
```

### 可选：Neo4j 知识图谱

```bash
docker run -d --name neo4j -p 7687:7687 -e NEO4J_AUTH=neo4j/password neo4j:5
cd code && uv run python seed_neo4j.py
```

不启动 Neo4j 也可运行——系统自动降级到离线字典模式。

<br>

---

## 🧪 快速测试

```powershell
# PowerShell 测试：患者端完整对话
# 1. 登录
$login = Invoke-RestMethod -Uri "http://localhost:8001/api/v1/auth/login" `
  -Method Post -ContentType "application/json" `
  -Body '{"email":"2669705213@qq.com","password":"hardcoded"}'
$token = $login.access_token

# 2. 发送消息（自动创建会话）
$res = Invoke-RestMethod -Uri "http://localhost:8001/api/v1/chat/send" `
  -Method Post -ContentType "application/json" `
  -Headers @{Authorization="Bearer $token"} `
  -Body '{"conversation_id":null,"content":"最近压力好大，睡不着，快三周了，上班也集中不了"}'

Write-Host "回复: $($res.reply.content)"
Write-Host "阶段: $($res.stage)"
Write-Host "路由: $($res.route)"
Write-Host "诊断就绪: $($res.is_diagnosis_ready)"
```

<br>

---

## 🔮 路线图

### ✅ 已完成

- [x] **共情对话引擎** — Safety Scanner + Info Extractor + 动态 Prompt 组装 + 倾听引导平衡
- [x] **三路由分级诊断** — mild / moderate / severe 自动路由（渐进式退出）
- [x] **渐进式三阶段采集** — Tier 0→1→2 逐层推进，每层有退出条件
- [x] **对话状态持久化** — PostgreSQL JSONB，断线可恢复
- [x] **医生审核系统** — 待审核列表 + 批准/驳回 + 邮件通知
- [x] **患者报告** — 对话完成自动生成 + PDF 下载
- [x] GraphRAG 加权检索 — 核心症状高权重 + IDF 区分度
- [x] 四层归一化匹配 — 别名 → 同义词 → 格式化 → 精确键
- [x] HITL 人机协同（专业端） — 诊断后暂停 + 医生选择
- [x] ICD-10 编码 + HIPAA 合规审计
- [x] 前端加权评分可视化
- [x] 双模式运行（Neo4j / 离线字典）
- [x] 全链路审计日志

### 🚧 进行中

- [ ] 报告 Markdown / PDF 美化
- [ ] 情感趋势可视化 — 对话过程中的情绪变化曲线

### 🔮 计划中

- [ ] 语音输入 — OpenAI Whisper 集成
- [ ] 自适应对话风格 — 根据患者历史对话数据调整策略权重
- [ ] 向量语义检索补充 — embedding + 语义相似度增强 GraphRAG
- [ ] 概率打分模型 — 替代加权求和
- [ ] 知识图谱管理后台 — 可视化编辑症状-疾病映射
- [ ] 多语言支持 — 英文、日文
- [ ] HL7 FHIR 电子病历对接
- [ ] OpenTelemetry 链路追踪 + Prometheus metrics

<br>

---

## ⚠️ 已知限制

| 限制 | 说明 | 缓解措施 |
|:---|:---|:---|
| **知识图谱为静态配置** | 疾病映射和权重在代码中，修改需重新部署 | 计划中：管理后台 + 数据库存储 |
| **单 LLM 故障点** | 信息提取和回复生成共用同一 API Key | 规则引擎降级（别名 + 同义词匹配） |
| **对话历史截断** | `conversation_history` 保留最近 8 轮 | 已采集的 patient_info 不丢失，LLM 每轮都收到完整缺失字段提示 |
| **Neo4j 仅精确匹配** | 未用模糊查询等高级图能力 | 有意为之——确保诊断安全性 |
| **无 API 鉴权** | 临床端点公开可访问 | 内部工具阶段可接受，上线前需添加 |
| **权重无法自学习** | 依赖人工维护 | 计划中：数据驱动的概率模型 |

<br>

---

## 📜 License

```
MIT License
Copyright (c) 2025 BrainDox
```

---

<p align="center">
  <sub>Built with ❤️ for mental health</sub>
  <br>
  <sub>用技术给精神健康领域带来真正的改变</sub>
</p>

<p align="center">
  <a href="#-项目定位">⬆ 回到顶部</a>
</p>
