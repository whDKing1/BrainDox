# 03 — Agent设计原理

## 目录

- [1. Agent的定义和设计原则](#1-agent的定义和设计原则)
- [2. Intake Agent：患者信息采集](#2-intake-agent患者信息采集)
- [3. Diagnosis Agent：鉴别诊断](#3-diagnosis-agent鉴别诊断)
- [4. Treatment Agent：治疗方案推荐](#4-treatment-agent治疗方案推荐)
- [5. Coding Agent：ICD-10编码与DRGs分组](#5-coding-agenticd-10编码与drgs分组)
- [6. Audit Agent：HIPAA合规审计](#6-audit-agenthipaa合规审计)
- [7. Agent间通信机制](#7-agent间通信机制)
- [8. Agent的可测试性设计](#8-agent的可测试性设计)

---

## 1. Agent的定义和设计原则

### 1.1 Agent的三要素

在本项目中，每个Agent都由以下三个部分组成：

```
┌──────────────────────────────────────────┐
│                Agent                      │
├──────────────────────────────────────────┤
│  1. System Prompt（角色定义）              │
│     → 告诉LLM它的角色、任务、输出格式      │
│                                          │
│  2. LLM调用逻辑                           │
│     → 构造消息 → 调用OpenAI → 解析JSON响应  │
│                                          │
│  3. 状态读写                              │
│     → 从State读取输入 → 处理 → 写回输出     │
└──────────────────────────────────────────┘
```

> **注意**：Audit Agent是例外——它不调用LLM，使用纯规则引擎（正则表达式）。

### 1.2 设计原则

| 原则 | 说明 | 为什么重要 |
|------|------|-----------|
| **单一职责** | 每个Agent只做一件事 | 降低复杂度，提高LLM输出质量 |
| **输入输出明确** | 每个Agent有固定的读取字段和写入字段 | 便于理解数据流和调试 |
| **幂等性** | 相同输入产生相同输出（在temperature很低的情况下近似） | 可重复测试 |
| **优雅降级** | 出错时记录错误而不是抛异常 | 不阻塞后续Agent执行 |
| **JSON输出** | 所有Agent都要求LLM输出纯JSON | 便于程序解析和验证 |
| **低temperature** | 使用0.1-0.2的低temperature | 医疗场景需要高确定性 |

### 1.3 Agent函数签名

所有Agent遵循统一的LangGraph Node函数签名：

```python
def agent_name(state: ClinicalState) -> dict:
    """
    参数: state — 完整的ClinicalState对象
    返回: dict — 要更新的State字段（只返回变更部分）
    """
    # 1. 从state读取输入
    input_data = state.some_field

    # 2. 处理逻辑（调用LLM或规则引擎）
    result = process(input_data)

    # 3. 返回要写入State的字段
    return {
        "output_field": result,
        "current_agent": "agent_name",
    }
```

---

## 2. Intake Agent：患者信息采集

### 2.1 职责概览

| 项目 | 说明 |
|------|------|
| **角色类比** | 问诊护士 |
| **职责** | 将自由文本形式的患者描述，解析为结构化的JSON数据 |
| **读取** | `state.raw_input`（原始患者描述文本） |
| **写入** | `state.patient_info`（结构化PatientInfo字典） |
| **LLM调用** | 是，temperature=0.1 |
| **核心挑战** | 从非结构化自然语言中准确提取所有关键信息 |

### 2.2 System Prompt设计

```
You are an expert medical intake specialist. Your job is to extract 
structured patient information from the provided clinical narrative.

Extract the following fields as a JSON object:
{
  "name": "patient name or 'Unknown'",
  "age": <integer>,
  "gender": "male|female|other|unknown",
  "chief_complaint": "main reason for visit",
  "symptoms": [
    {"name": "...", "duration_days": <int or null>, 
     "severity": "mild|moderate|severe|critical", "description": "..."}
  ],
  "medical_history": ["list of past conditions"],
  "family_history": ["list of family conditions"],
  "allergies": [
    {"substance": "name", "reaction": "description", "severity": "mild|moderate|severe"}
  ],
  "current_medications": [
    {"name": "drug name", "dosage": "dose", "frequency": "how often"}
  ],
  "vital_signs": {
    "temperature": <float or null>, "heart_rate": <int or null>,
    "blood_pressure_systolic": <int or null>, "blood_pressure_diastolic": <int or null>,
    "respiratory_rate": <int or null>, "oxygen_saturation": <float or null>
  },
  "lab_results": [
    {"test_name": "name", "value": "result", "unit": "unit", 
     "reference_range": "range", "is_abnormal": true/false}
  ]
}

Rules:
- If a field is not mentioned, use reasonable defaults or null.
- Age must be a positive integer. If unclear, estimate from context.
- Always identify the chief complaint even if not explicitly stated.
- Return ONLY valid JSON, no markdown fences.
```

**Prompt设计要点**：

1. **角色设定**：告诉LLM它是"医学intake specialist"，激活相关知识
2. **完整JSON Schema**：给出每个字段的名称、类型和可选值，确保输出结构一致
3. **Rules部分**：处理边界情况（字段缺失、年龄不确定等）
4. **去格式化**：明确要求"Return ONLY valid JSON, no markdown fences"

### 2.3 FHIR对齐

Intake Agent的输出字段设计参考了FHIR R4的Patient资源标准：

| 输出字段 | FHIR对应资源 | 说明 |
|---------|------------|------|
| `name`, `age`, `gender` | Patient | 患者人口学信息 |
| `allergies` | AllergyIntolerance | 过敏信息 |
| `current_medications` | MedicationStatement | 当前用药 |
| `vital_signs` | Observation（vital-signs） | 生命体征 |
| `lab_results` | Observation（laboratory） | 实验室结果 |

### 2.4 输出Schema示例

```json
{
  "name": "Unknown",
  "age": 45,
  "gender": "male",
  "chief_complaint": "Fever for 3 days with productive cough and chest pain",
  "symptoms": [
    {"name": "fever", "duration_days": 3, "severity": "moderate", "description": "Temperature 39.2°C"},
    {"name": "productive cough", "duration_days": 3, "severity": "moderate", "description": "Yellow sputum"},
    {"name": "chest pain", "duration_days": null, "severity": "moderate", "description": "Right-sided, worsens with breathing"}
  ],
  "medical_history": ["type 2 diabetes", "hypertension"],
  "allergies": [{"substance": "penicillin", "reaction": "rash", "severity": "moderate"}],
  "current_medications": [
    {"name": "metformin", "dosage": "500mg", "frequency": "BID"},
    {"name": "lisinopril", "dosage": "10mg", "frequency": "daily"}
  ],
  "vital_signs": {"temperature": 39.2, "heart_rate": 102, "blood_pressure_systolic": 130},
  "lab_results": [
    {"test_name": "WBC", "value": "15000", "unit": "/μL", "is_abnormal": true},
    {"test_name": "CRP", "value": "85", "unit": "mg/L", "is_abnormal": true}
  ]
}
```

---

## 3. Diagnosis Agent：鉴别诊断

### 3.1 职责概览

| 项目 | 说明 |
|------|------|
| **角色类比** | 诊断医生 |
| **职责** | 分析结构化患者信息，生成带置信度的鉴别诊断列表 |
| **读取** | `state.patient_info` |
| **写入** | `state.diagnosis`、`state.needs_more_info` |
| **LLM调用** | 是，temperature=0.2 |
| **核心挑战** | 在信息不完整时做出合理判断，同时检测是否需要补充信息 |

### 3.2 GraphRAG集成

Diagnosis Agent可以集成GraphRAG知识图谱来增强诊断质量。知识图谱通过症状-疾病映射提供候选疾病列表：

```python
# 从知识图谱中检索候选疾病
symptoms = ["fever", "cough", "chest_pain"]
candidates = graphrag_service.find_diseases_by_symptoms(symptoms)
# 结果: [{disease: "Pneumonia", match_count: 3}, {disease: "Acute MI", match_count: 1}, ...]
```

LLM在做诊断时会参考知识图谱的候选列表，但不完全依赖——LLM自身的医学知识可以捕捉到知识图谱中未覆盖的疾病。

### 3.3 置信度计算

Diagnosis Agent要求LLM为每个诊断候选给出0到1的置信度评分：

| 置信度范围 | 含义 | 行动建议 |
|-----------|------|---------|
| 0.8 - 1.0 | 高置信度，强有力的证据支持 | 可以直接进入治疗 |
| 0.5 - 0.8 | 中等置信度，需要进一步检查确认 | 推荐补充检查 |
| 0.3 - 0.5 | 低置信度，可能性存在但证据不足 | 列为鉴别诊断 |
| < 0.3 | 极低置信度 | 仅供参考 |

### 3.4 信息不足检测

当Diagnosis Agent认为患者信息不足时，会设置 `needs_more_info = true`：

```json
{
  "primary_diagnosis": {
    "disease_name": "Insufficient data for diagnosis",
    "confidence": 0.2
  },
  "needs_more_info": true,
  "recommended_tests": ["Complete blood count", "Chest X-ray", "Blood culture"]
}
```

Pipeline的条件路由检测到这个标志后，会将流程回退到Intake Agent。最多重试2次，防止无限循环。

### 3.5 输出Schema示例

```json
{
  "primary_diagnosis": {
    "disease_name": "Community-Acquired Pneumonia",
    "icd10_hint": "J18.1",
    "confidence": 0.88,
    "evidence": [
      "Productive cough with yellow sputum for 3 days",
      "Fever 39.2°C",
      "WBC 15,000/μL (elevated)",
      "CRP 85 mg/L (elevated)",
      "Chest X-ray: right lower lobe infiltrate"
    ],
    "reasoning": "Classic presentation of bacterial pneumonia with radiographic confirmation"
  },
  "differential_list": [
    {
      "disease_name": "Acute Bronchitis",
      "icd10_hint": "J20.9",
      "confidence": 0.35,
      "evidence": ["Productive cough", "Fever"],
      "reasoning": "Less likely given chest X-ray showing lobar consolidation"
    }
  ],
  "recommended_tests": ["Blood culture", "Sputum culture", "Procalcitonin"],
  "clinical_notes": "High confidence bacterial pneumonia.",
  "knowledge_sources": ["Harrison's Internal Medicine", "IDSA/ATS CAP Guidelines"]
}
```

---

## 4. Treatment Agent：治疗方案推荐

### 4.1 职责概览

| 项目 | 说明 |
|------|------|
| **角色类比** | 临床药剂师 |
| **职责** | 根据诊断和患者信息，生成循证治疗方案，自动检查药物交互和过敏禁忌 |
| **读取** | `state.patient_info`、`state.diagnosis` |
| **写入** | `state.treatment_plan` |
| **LLM调用** | 是，temperature=0.2 |
| **核心挑战** | 在推荐药物时必须考虑患者的过敏史和当前用药的交互 |

### 4.2 药物交互检查（DDI）

DDI（Drug-Drug Interaction）是Treatment Agent的核心安全特性。系统内置了10种常见的重大药物交互规则：

| 药物A | 药物B | 严重级别 | 风险 |
|-------|-------|---------|------|
| 华法林 warfarin | 阿司匹林 aspirin | major（主要） | 出血风险增加 |
| 二甲双胍 metformin | 碘造影剂 contrast_dye | major | 乳酸酸中毒风险 |
| SSRI类 | MAOI类 | contraindicated（禁忌） | 5-HT综合征，可致死 |
| ACE抑制剂 | 补钾制剂 | moderate（中等） | 高钾血症风险 |
| 辛伐他汀 simvastatin | 胺碘酮 amiodarone | major | 横纹肌溶解风险 |

Treatment Agent的Prompt明确要求："ALWAYS check the patient's current medications for interactions" 和 "ALWAYS check allergies before recommending any drug"。

### 4.3 循证医学推荐

Treatment Agent基于循证医学原则推荐治疗方案。Prompt中要求：

- 引用临床指南（如IDSA/ATS CAP Guidelines）
- 注明药物的循证等级
- 提供非药物治疗选项
- 制定随访计划

### 4.4 剂量验证

虽然当前版本主要依赖LLM的医学知识进行剂量推荐，但System Prompt中包含了剂量验证规则：

- 肝肾功能不全时需调整剂量
- 老年患者通常需要减量
- 体重极端值时需要按体重计算
- 必须考虑给药途径（口服、静脉、肌注等）

### 4.5 输出Schema示例

```json
{
  "diagnosis_addressed": "Community-Acquired Pneumonia",
  "medications": [
    {
      "drug_name": "Levofloxacin",
      "generic_name": "levofloxacin",
      "dosage": "750mg",
      "route": "oral",
      "frequency": "once daily",
      "duration": "5 days",
      "contraindications": ["Tendon rupture risk"],
      "side_effects": ["Nausea", "Diarrhea", "Dizziness"]
    }
  ],
  "drug_interactions": [
    {
      "drug_a": "levofloxacin",
      "drug_b": "metformin",
      "severity": "minor",
      "description": "Fluoroquinolones may affect blood glucose",
      "recommendation": "Monitor blood glucose closely"
    }
  ],
  "non_drug_treatments": ["Rest", "Adequate hydration", "Chest physiotherapy"],
  "lifestyle_recommendations": ["Avoid smoking", "Influenza vaccination after recovery"],
  "follow_up_plan": "Reassess in 48-72 hours. Repeat chest X-ray in 6 weeks.",
  "warnings": ["Patient has penicillin allergy - avoid beta-lactam antibiotics"],
  "evidence_references": ["IDSA/ATS CAP Guidelines 2019"]
}
```

---

## 5. Coding Agent：ICD-10编码与DRGs分组

### 5.1 职责概览

| 项目 | 说明 |
|------|------|
| **角色类比** | 医学编码员（CCS认证） |
| **职责** | 将诊断和治疗信息映射为ICD-10-CM编码，计算DRGs分组 |
| **读取** | `state.diagnosis`、`state.treatment_plan` |
| **写入** | `state.coding_result` |
| **LLM调用** | 是，temperature=0.1（编码必须精确） |
| **核心挑战** | ICD-10有7万+编码，需要精确匹配到4-7位级别 |

### 5.2 ICD-10编码规则

> **什么是ICD-10**：国际疾病分类第10版（International Classification of Diseases），全球通用的疾病编码标准。医院用它做病案统计、保险理赔、DRGs分组。

ICD-10-CM编码格式：

```
X99.999
│  │   │
│  │   └── 4-7位：子分类（越长越精确）
│  └────── 2-3位：类目
└───────── 第1位：章节字母（A-Z）

示例：
J18.1 → J=呼吸系统 | 18=肺炎 | .1=大叶性肺炎
E11.9 → E=内分泌 | 11=2型糖尿病 | .9=无并发症
I10   → I=循环系统 | 10=原发性高血压（无子分类）
```

### 5.3 DRGs分组算法

> **什么是DRGs**：疾病诊断相关分组（Diagnosis Related Groups），一种按病种付费的医保支付方式。每个DRG组有一个"权重"，权重越高，医保报销金额越高。

```
患者诊断（ICD-10） + 手术/操作 + 合并症/并发症
        ↓
    DRG分组
        ↓
    权重(weight) × 基础费率 = 报销金额
```

系统内置的DRGs分组对照表：

| ICD-10前缀 | DRG编码 | DRG描述 | 权重 | 平均住院日 |
|-----------|---------|---------|------|-----------|
| J18 | 193 | Simple Pneumonia & Pleurisy w MCC | 1.4 | 4.5天 |
| I21 | 280 | Acute Myocardial Infarction w MCC | 2.1 | 5.2天 |
| I50 | 291 | Heart Failure & Shock w MCC | 1.6 | 5.0天 |
| A41 | 871 | Septicemia w MCC | 2.3 | 6.5天 |
| K35 | 343 | Appendectomy w/o CC/MCC | 1.5 | 2.5天 |

### 5.4 编码质量评估

Coding Agent输出的`coding_confidence`反映编码的质量：

| 置信度 | 含义 | 场景 |
|--------|------|------|
| > 0.9 | 高置信度，诊断描述与ICD-10编码精确匹配 | 常见疾病，描述完整 |
| 0.7 - 0.9 | 中等置信度，基本匹配但可能有更精确的编码 | 需要人工复核 |
| < 0.7 | 低置信度，编码可能不准确 | 罕见疾病或描述模糊 |

### 5.5 输出Schema示例

```json
{
  "primary_icd10": {
    "code": "J18.1",
    "description": "Lobar pneumonia, unspecified organism",
    "confidence": 0.92,
    "category": "Respiratory system diseases"
  },
  "secondary_icd10_codes": [
    {"code": "E11.9", "description": "Type 2 diabetes without complications", "confidence": 0.95},
    {"code": "I10", "description": "Essential hypertension", "confidence": 0.95}
  ],
  "drg_group": {
    "drg_code": "193",
    "description": "Simple Pneumonia & Pleurisy w MCC",
    "weight": 1.4,
    "mean_los": 4.5
  },
  "coding_notes": "Primary code J18.1 based on lobar consolidation on chest X-ray.",
  "coding_confidence": 0.90
}
```

---

## 6. Audit Agent：HIPAA合规审计

### 6.1 职责概览

| 项目 | 说明 |
|------|------|
| **角色类比** | 合规审计官 |
| **职责** | 扫描全Pipeline输出中的PHI，执行HIPAA合规检查，生成审计日志 |
| **读取** | 全部state字段（patient_info、diagnosis、treatment_plan、coding_result） |
| **写入** | `state.audit_result` |
| **LLM调用** | **否！** 纯规则引擎 |
| **核心挑战** | 确保不遗漏任何PHI（受保护健康信息），同时避免误报 |

### 6.2 为什么Audit Agent不用LLM

这是一个**故意的设计决策**：

| 原因 | 详细说明 |
|------|---------|
| **确定性** | 合规检查必须100%可重复，LLM每次输出可能不同 |
| **可审计** | 监管机构要求合规逻辑可解释、可复现——正则表达式满足此要求 |
| **速度** | 正则匹配毫秒级完成，LLM需要2-5秒 |
| **成本** | 不消耗API Token |
| **无幻觉** | LLM可能"幻觉"出不存在的PHI，或遗漏真实的PHI |

> **面试高频题**：面试官常问"你的系统中哪些部分适合用LLM，哪些部分不适合？" Audit Agent就是一个绝佳的反面例子。

### 6.3 PHI检测（正则模式匹配）

Audit Agent使用9种核心正则模式检测PHI：

| PHI类型 | 正则模式 | 匹配示例 |
|---------|---------|---------|
| 姓名 name | `\b[A-Z][a-z]+ [A-Z][a-z]+\b` | John Smith |
| 出生日期 date_of_birth | `\b\d{4}[-/]\d{2}[-/]\d{2}\b` | 1980-01-15 |
| 电话 phone | `\b\d{3}[-.]?\d{3}[-.]?\d{4}\b` | 555-123-4567 |
| 邮箱 email | `\b[\w.+-]+@[\w-]+\.[\w.-]+\b` | john@hospital.com |
| 社会安全号 ssn | `\b\d{3}-\d{2}-\d{4}\b` | 123-45-6789 |
| 病历号 mrn | `\bMRN[:\s]?\d+\b` | MRN:12345 |
| IP地址 ip_address | `\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b` | 192.168.1.1 |
| 邮编 zip_code | `\b\d{5}(-\d{4})?\b` | 10001 |
| 地址 address | 街道名称模式 | 123 Main Street |

### 6.4 数据脱敏策略

检测到PHI后，使用以下策略脱敏：

| PHI类型 | 脱敏方式 | 原值 | 脱敏后 |
|---------|---------|------|--------|
| SSN | 替换 | 123-45-6789 | ***-**-**** |
| 电话 | 替换 | 555-123-4567 | ***-***-**** |
| 邮箱 | 替换 | john@hospital.com | ****@****.*** |
| IP地址 | 替换 | 192.168.1.1 | ***.***.***.*** |
| 病历号 | 替换 | MRN:12345 | [MRN_REDACTED] |

### 6.5 审计日志（WORM存储）

> **什么是WORM**：Write Once Read Many（一次写入多次读取），指数据写入后不可修改和删除。HIPAA要求审计日志必须保留至少6年。

每次Pipeline执行，Audit Agent会生成以下审计记录：

```json
{
  "audit_trail": [
    {
      "timestamp": "2026-04-06T08:30:00Z",
      "user_id": "system",
      "action": "phi_scan",
      "resource_type": "pipeline_output",
      "detail": "Scanned 4 sections",
      "outcome": "success"
    },
    {
      "timestamp": "2026-04-06T08:30:00Z",
      "user_id": "system",
      "action": "data_masking",
      "resource_type": "pipeline_output",
      "detail": "Masked 2 PHI types",
      "outcome": "success"
    },
    {
      "timestamp": "2026-04-06T08:30:00Z",
      "user_id": "system",
      "action": "compliance_assessment",
      "resource_type": "pipeline",
      "detail": "Overall: NEEDS_REVIEW, risk=medium",
      "outcome": "success"
    }
  ]
}
```

### 6.6 Audit Agent的8项合规检查

| # | 检查项 | 说明 | 检查方式 |
|---|--------|------|---------|
| 1 | `phi_scan` | 扫描所有输出是否包含PHI | 正则表达式匹配 |
| 2 | `data_encryption_at_rest` | 静态数据是否加密（AES-256） | 配置项验证 |
| 3 | `data_encryption_in_transit` | 传输数据是否加密（TLS） | 配置项验证 |
| 4 | `access_control_rbac` | 是否有基于角色的访问控制 | 配置项验证 |
| 5 | `audit_logging` | 审计日志是否启用 | 配置项验证 |
| 6 | `minimum_necessary_rule` | 是否遵循最小必要原则 | 检查patient_info是否存在 |
| 7 | `breach_notification_ready` | 是否具备泄露通知能力 | 配置项验证 |
| 8 | `data_retention_policy` | 是否有数据保留策略（≥6年） | 配置项验证 |

---

## 7. Agent间通信机制

### 7.1 通信方式：共享状态

Agent之间**不直接通信**，而是通过ClinicalState这个"共享黑板"间接传递数据：

```
Intake Agent ──写入 patient_info──→ ClinicalState ──读取 patient_info──→ Diagnosis Agent
```

### 7.2 为什么不用消息队列

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|---------|
| **共享状态（本项目）** | 简单、直观、LangGraph原生支持 | 所有Agent必须在同一进程 | 单实例Pipeline |
| 消息队列（Kafka等） | 解耦、可分布式部署 | 复杂、延迟高 | 微服务化后 |
| RPC直接调用 | 低延迟 | 强耦合 | 不推荐 |

当前阶段选择共享状态是因为：
1. 5个Agent在同一次HTTP请求中顺序执行，不需要分布式
2. LangGraph原生支持State，无需额外基础设施
3. 开发调试最简单——打印State就能看到全部数据

### 7.3 条件路由通信

Diagnosis Agent通过State中的 `needs_more_info` 字段与Pipeline路由器"通信"：

```python
# Diagnosis Agent设置标志
return {"diagnosis": data, "needs_more_info": True}

# Pipeline路由函数检查标志
def _route_after_diagnosis(state):
    if state.needs_more_info:
        return "intake"    # 回到Intake
    return "treatment"     # 继续到Treatment
```

---

## 8. Agent的可测试性设计

### 8.1 测试策略分层

| 层级 | 测试类型 | 是否需要LLM | 运行速度 |
|------|---------|------------|---------|
| 服务层 | 单元测试 | **否** | 毫秒级 |
| Agent层 | 集成测试 | **是** | 秒级（需调用API） |
| Pipeline层 | 端到端测试 | **是** | 10秒+（完整Pipeline） |

### 8.2 服务层测试（不需要LLM）

```python
# tests/test_services.py
class TestICD10Service:
    def test_search_pneumonia(self):
        results = icd10_service.search("pneumonia")
        assert len(results) > 0
        assert results[0]["code"] == "J18.1"

class TestDrugInteraction:
    def test_warfarin_aspirin(self):
        interactions = drug_service.check_interactions(
            new_drugs=["warfarin"], current_drugs=["aspirin"]
        )
        assert interactions[0]["severity"] == "major"

class TestHIPAAService:
    def test_detect_ssn(self):
        findings = hipaa_service.detect_phi("SSN: 123-45-6789")
        assert "ssn" in findings
```

### 8.3 Agent层Mock测试

对于依赖LLM的Agent，可以Mock LLM响应进行测试：

```python
# 使用unittest.mock替代LLM调用
from unittest.mock import patch

@patch('src.agents.intake_agent.ChatOpenAI')
def test_intake_agent(mock_llm):
    mock_llm.return_value.invoke.return_value.content = '{"name": "Test", "age": 30, ...}'

    from src.graph.state import ClinicalState
    state = ClinicalState(raw_input="30-year-old female with headache")
    result = intake_agent(state)

    assert result["patient_info"]["age"] == 30
```

### 8.4 内置测试案例

系统提供5个标准临床案例用于端到端测试：

| 案例ID | 患者描述 | 预期主诊断 | 预期ICD-10 |
|--------|---------|-----------|-----------|
| case_001 | 45岁男性，发热+咳痰+胸痛 | 社区获得性肺炎 | J18.1 |
| case_002 | 62岁女性，胸痛放射左臂 | STEMI心梗 | I21.0 |
| case_003 | 28岁女性，疲劳+体重增加 | 甲减（桥本） | E03.9 |
| case_004 | 55岁男性，气短+双下肢水肿 | 心力衰竭 | I50.9 |
| case_005 | 35岁男性，右下腹痛12小时 | 急性阑尾炎 | K35.80 |

---

> **下一篇**：[04-GraphRAG知识图谱](04-GraphRAG知识图谱.md) — 深入理解GraphRAG如何增强诊断，Neo4j知识图谱的设计和查询
