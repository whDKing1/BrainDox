# 05 — FHIR-API集成

## 目录

- [1. FHIR R4标准简介](#1-fhir-r4标准简介)
- [2. 为什么选择FHIR](#2-为什么选择fhir)
- [3. FHIR核心概念](#3-fhir核心概念)
- [4. 项目中的FHIR资源映射](#4-项目中的fhir资源映射)
- [5. FHIR Resource JSON示例](#5-fhir-resource-json示例)
- [6. SMART on FHIR认证流程](#6-smart-on-fhir认证流程)
- [7. 与医院HIS系统对接方案](#7-与医院his系统对接方案)
- [8. fhir.resources Python库使用](#8-fhirresources-python库使用)

---

## 1. FHIR R4标准简介

### 1.1 什么是FHIR

> **FHIR（Fast Healthcare Interoperability Resources）**是由HL7国际组织制定的医疗数据交换标准。你可以把它理解为"医疗行业的REST API标准"——它定义了医疗数据应该用什么格式存储和传输。

**版本历史**：

| 版本 | 发布年份 | 状态 |
|------|---------|------|
| DSTU1 | 2014 | 已废弃 |
| DSTU2 | 2015 | 仍有使用 |
| STU3 | 2017 | 过渡版本 |
| **R4** | 2019 | **当前标准**（本项目使用） |
| R4B | 2022 | 小幅更新 |
| R5 | 2023 | 最新版 |

### 1.2 FHIR的核心理念

FHIR的设计哲学是：把医疗数据拆分成一个个标准化的"资源（Resource）"，每个资源有固定的结构。资源之间通过引用（Reference）关联。

```
传统医疗系统：
  医院A的数据格式 ≠ 医院B的数据格式 ≠ 保险公司的数据格式
  → 数据无法互通

FHIR标准：
  医院A、医院B、保险公司 → 都用FHIR标准格式
  → 数据可以无缝交换
```

> **小白解读**：想象全国的火车站用不同的轨距，火车无法互通。FHIR就是统一的"标准轨距"——所有医疗系统用同样的数据格式，就能互相"通车"了。

### 1.3 FHIR与其他医疗标准的关系

| 标准 | 定位 | 与FHIR的关系 |
|------|------|-------------|
| **HL7 v2** | 医疗消息标准（1987年） | FHIR的前辈，基于管道符分隔的文本格式 |
| **HL7 v3/CDA** | 临床文档架构 | XML格式，复杂度高，FHIR是其简化版 |
| **DICOM** | 医学影像标准 | 专注影像数据，可与FHIR互补 |
| **ICD-10** | 疾病编码标准 | FHIR用它作为Condition的编码系统 |
| **SNOMED-CT** | 临床术语标准 | FHIR用它作为临床概念的编码系统 |
| **LOINC** | 检验项目编码 | FHIR用它作为Observation的编码系统 |

---

## 2. 为什么选择FHIR

### 2.1 互操作性（Interoperability）

互操作性是FHIR最核心的价值——让不同的医疗信息系统能够"说同一种语言"。

| 场景 | 没有FHIR | 有FHIR |
|------|---------|--------|
| 转院时传递病历 | 手动打印/扫描，格式各异 | 系统自动通过FHIR API传递结构化数据 |
| 保险理赔 | 编码不一致，需要人工核对 | 标准ICD-10编码 + FHIR Claim资源 |
| 远程问诊 | 各平台数据孤岛 | 统一的FHIR Patient/Condition资源 |
| 公共卫生报告 | 数据汇总困难 | 标准化的FHIR Bundle批量提交 |

### 2.2 法规要求

- **美国**：21st Century Cures Act（2024年起强制要求医疗系统支持FHIR R4 API）
- **欧盟**：European Health Data Space（EHDS）推荐FHIR作为数据交换格式
- **中国**：卫健委在推进HL7 FHIR中国本地化标准（FHIR CN Core）

### 2.3 对本项目的价值

| 价值 | 说明 |
|------|------|
| **面试加分** | 展示你理解医疗信息化的行业标准 |
| **数据可移植** | 系统输出的数据可以被任何支持FHIR的系统读取 |
| **生态兼容** | 可以对接HAPI FHIR Server、Amazon HealthLake、Google Cloud Healthcare API |
| **未来扩展** | 为对接真实医院系统（HIS/EMR）打下基础 |

---

## 3. FHIR核心概念

### 3.1 资源（Resource）

FHIR的基本数据单元叫"资源"。每种资源代表一类医疗数据：

| 资源类型 | 中文名 | 说明 | 本项目使用 |
|---------|--------|------|-----------|
| **Patient** | 患者 | 患者人口学信息（姓名、年龄、性别等） | ✅ |
| **Condition** | 病情/诊断 | 诊断结果、临床状况 | ✅ |
| **MedicationRequest** | 用药请求 | 处方/用药计划 | ✅ |
| Observation | 观察/检查结果 | 实验室检验、生命体征 | 扩展方向 |
| Encounter | 就诊 | 门诊/住院就诊记录 | 扩展方向 |
| AllergyIntolerance | 过敏不耐受 | 过敏信息 | 嵌入Patient |
| Procedure | 操作/手术 | 手术、治疗操作记录 | 扩展方向 |
| DiagnosticReport | 诊断报告 | 综合检验报告 | 扩展方向 |
| Claim | 理赔 | 保险理赔请求 | 扩展方向 |

### 3.2 资源结构

每个FHIR资源都是一个JSON对象，必须包含 `resourceType` 字段：

```json
{
  "resourceType": "Patient",     // ← 必须字段，标识资源类型
  "id": "patient-001",           // 资源ID
  "meta": {                      // 元数据
    "versionId": "1",
    "lastUpdated": "2026-04-06T10:30:00Z"
  },
  // ... 该资源类型特有的字段 ...
}
```

### 3.3 引用（Reference）

资源之间通过Reference字段关联：

```json
{
  "resourceType": "Condition",
  "subject": {
    "reference": "Patient/patient-001"    // ← 引用Patient资源
  },
  "code": {
    "coding": [{"system": "http://hl7.org/fhir/sid/icd-10-cm", "code": "J18.1"}]
  }
}
```

### 3.4 编码系统（CodeableConcept）

FHIR使用 `CodeableConcept` 来表示编码信息：

```json
{
  "code": {
    "coding": [
      {
        "system": "http://hl7.org/fhir/sid/icd-10-cm",   // 编码系统URI
        "code": "J18.1",                                   // 编码值
        "display": "Lobar pneumonia"                       // 显示名称
      }
    ],
    "text": "Community-Acquired Pneumonia"                  // 原始文本
  }
}
```

常用编码系统URI：

| 编码系统 | URI |
|---------|-----|
| ICD-10-CM | `http://hl7.org/fhir/sid/icd-10-cm` |
| SNOMED-CT | `http://snomed.info/sct` |
| LOINC | `http://loinc.org` |
| RxNorm | `http://www.nlm.nih.gov/research/umls/rxnorm` |

---

## 4. 项目中的FHIR资源映射

### 4.1 PatientInfo → FHIR Patient

| 内部字段 | FHIR Patient字段 | 说明 |
|---------|-----------------|------|
| `name` | `name[0].text` | 患者姓名 |
| `age` | `birthDate`（反算出生年） | FHIR用出生日期表示年龄 |
| `gender` | `gender` | male/female/other/unknown |
| `patient_id` | `id` | 资源ID |
| `allergies` | `_allergies`（扩展字段） | 嵌入到Patient资源中 |

**转换代码**（`python/src/services/fhir_service.py`）：

```python
def patient_to_fhir(patient_info: dict) -> dict:
    gender_map = {"male": "male", "female": "female", "other": "other", "unknown": "unknown"}
    gender = gender_map.get(patient_info.get("gender", "unknown"), "unknown")
    birth_year = date.today().year - patient_info.get("age", 0)

    resource = {
        "resourceType": "Patient",
        "id": patient_info.get("patient_id", ""),
        "name": [{"use": "official", "text": patient_info.get("name", "Unknown")}],
        "gender": gender,
        "birthDate": f"{birth_year}-01-01",
    }

    allergies = patient_info.get("allergies", [])
    if allergies:
        resource["_allergies"] = [
            {"resourceType": "AllergyIntolerance",
             "substance": a.get("substance", ""),
             "reaction": a.get("reaction", "")}
            for a in allergies
        ]
    return resource
```

### 4.2 Diagnosis → FHIR Condition

| 内部字段 | FHIR Condition字段 | 说明 |
|---------|-------------------|------|
| `primary_diagnosis.disease_name` | `code.text` 和 `code.coding[0].display` | 诊断名称 |
| `primary_diagnosis.icd10_hint` | `code.coding[0].code` | ICD-10编码 |
| `primary_diagnosis.reasoning` | `note[0].text` | 临床推理说明 |
| （引用Patient） | `subject.reference` | 关联到哪个患者 |

**转换代码**：

```python
def diagnosis_to_fhir_condition(diagnosis: dict, patient_id: str = "") -> dict:
    primary = diagnosis.get("primary_diagnosis", {})
    return {
        "resourceType": "Condition",
        "subject": {"reference": f"Patient/{patient_id}"},
        "code": {
            "coding": [{
                "system": "http://hl7.org/fhir/sid/icd-10-cm",
                "code": primary.get("icd10_hint", ""),
                "display": primary.get("disease_name", ""),
            }],
            "text": primary.get("disease_name", ""),
        },
        "note": [{"text": primary.get("reasoning", "")}],
    }
```

### 4.3 Medication → FHIR MedicationRequest

| 内部字段 | FHIR MedicationRequest字段 | 说明 |
|---------|--------------------------|------|
| `drug_name` | `medicationCodeableConcept.text` | 药物名称 |
| `generic_name` | `medicationCodeableConcept.coding[0].display` | 通用名 |
| `dosage` | `dosageInstruction[0].doseAndRate[0].doseQuantity.value` | 剂量 |
| `route` | `dosageInstruction[0].route.text` | 给药途径 |
| `frequency` | `dosageInstruction[0].timing.code.text` | 用药频率 |

**转换代码**：

```python
def medication_to_fhir(medication: dict, patient_id: str = "") -> dict:
    return {
        "resourceType": "MedicationRequest",
        "status": "active",
        "intent": "order",
        "subject": {"reference": f"Patient/{patient_id}"},
        "medicationCodeableConcept": {
            "text": medication.get("drug_name", ""),
            "coding": [{"display": medication.get("generic_name", "")}],
        },
        "dosageInstruction": [{
            "text": f"{medication.get('dosage', '')} {medication.get('route', 'oral')} {medication.get('frequency', '')}",
            "timing": {"code": {"text": medication.get("frequency", "")}},
            "route": {"text": medication.get("route", "oral")},
            "doseAndRate": [{"doseQuantity": {"value": medication.get("dosage", "")}}],
        }],
    }
```

---

## 5. FHIR Resource JSON示例

### 5.1 Patient资源完整示例

```json
{
  "resourceType": "Patient",
  "id": "patient-001",
  "meta": {
    "versionId": "1",
    "lastUpdated": "2026-04-06T10:30:00Z",
    "profile": ["http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient"]
  },
  "name": [
    {
      "use": "official",
      "text": "Unknown",
      "family": "Unknown",
      "given": ["Unknown"]
    }
  ],
  "gender": "male",
  "birthDate": "1981-01-01",
  "address": [
    {
      "use": "home",
      "state": "CA",
      "country": "US"
    }
  ],
  "communication": [
    {
      "language": {
        "coding": [{"system": "urn:ietf:bcp:47", "code": "en-US"}]
      }
    }
  ]
}
```

### 5.2 Condition资源完整示例

```json
{
  "resourceType": "Condition",
  "id": "condition-001",
  "clinicalStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
        "code": "active"
      }
    ]
  },
  "verificationStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
        "code": "confirmed"
      }
    ]
  },
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/condition-category",
          "code": "encounter-diagnosis",
          "display": "Encounter Diagnosis"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://hl7.org/fhir/sid/icd-10-cm",
        "code": "J18.1",
        "display": "Lobar pneumonia, unspecified organism"
      }
    ],
    "text": "Community-Acquired Pneumonia"
  },
  "subject": {
    "reference": "Patient/patient-001"
  },
  "onsetDateTime": "2026-04-03",
  "note": [
    {
      "text": "Classic presentation of bacterial pneumonia with radiographic confirmation"
    }
  ]
}
```

### 5.3 MedicationRequest资源完整示例

```json
{
  "resourceType": "MedicationRequest",
  "id": "medrx-001",
  "status": "active",
  "intent": "order",
  "subject": {
    "reference": "Patient/patient-001"
  },
  "medicationCodeableConcept": {
    "coding": [
      {
        "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
        "code": "82122",
        "display": "levofloxacin"
      }
    ],
    "text": "Levofloxacin"
  },
  "dosageInstruction": [
    {
      "text": "750mg oral once daily for 5 days",
      "timing": {
        "repeat": {
          "frequency": 1,
          "period": 1,
          "periodUnit": "d",
          "boundsDuration": {"value": 5, "unit": "days"}
        }
      },
      "route": {
        "coding": [
          {"system": "http://snomed.info/sct", "code": "26643006", "display": "Oral route"}
        ]
      },
      "doseAndRate": [
        {
          "doseQuantity": {"value": 750, "unit": "mg", "system": "http://unitsofmeasure.org", "code": "mg"}
        }
      ]
    }
  ]
}
```

---

## 6. SMART on FHIR认证流程

### 6.1 什么是SMART on FHIR

> **SMART on FHIR**（Substitutable Medical Applications and Reusable Technologies）是一套基于OAuth 2.0的认证和授权框架，专门为FHIR API设计。它解决的核心问题是：谁有权限访问哪些患者数据。

### 6.2 认证流程

```
┌───────────┐     1. 请求授权     ┌───────────────┐
│  本系统    │ ──────────────────→ │  FHIR授权服务器 │
│ (SMART App)│                    │ (Authorization │
│           │ ←──────────────────  │   Server)     │
└───────────┘   2. 返回授权码      └───────────────┘
      │                                    │
      │  3. 用授权码换取access_token         │
      │ ──────────────────────────────────→ │
      │ ←───────────────────────────────── │
      │    4. 返回access_token              │
      │                                    │
      ▼                                    │
┌───────────┐                     ┌───────────────┐
│  本系统    │  5. 带token请求数据  │  FHIR资源服务器 │
│           │ ──────────────────→ │ (Resource     │
│           │ ←──────────────────  │   Server)     │
└───────────┘   6. 返回FHIR资源    └───────────────┘
```

### 6.3 Scope（权限范围）

SMART on FHIR使用scope来控制权限粒度：

| Scope | 含义 | 示例 |
|-------|------|------|
| `patient/Patient.read` | 读取当前患者信息 | 获取患者姓名、年龄 |
| `patient/Condition.read` | 读取当前患者的诊断 | 获取诊断历史 |
| `patient/MedicationRequest.write` | 为当前患者写入用药 | 创建处方 |
| `user/Patient.read` | 读取用户有权限的所有患者 | 医生查看其所有患者 |
| `system/*.read` | 系统级别读取所有数据 | 后台批处理任务 |

### 6.4 本项目中的实现

当前版本未实现完整的SMART on FHIR认证，但提供了向外部FHIR服务器推送资源的功能：

```python
async def push_to_fhir_server(resource: dict) -> Optional[dict]:
    settings = get_settings()
    url = f"{settings.fhir_server_url}/{resource.get('resourceType', '')}"

    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(url, json=resource)
        resp.raise_for_status()
        return resp.json()
```

---

## 7. 与医院HIS系统对接方案

### 7.1 对接架构

```
┌─────────────┐          ┌──────────────┐          ┌─────────────┐
│ 医院HIS/EMR │ ←──────→ │  FHIR服务器   │ ←──────→ │  本系统      │
│ (Epic/Cerner)│  HL7 v2  │ (HAPI FHIR)  │  REST   │ (FastAPI)   │
│             │  or FHIR  │              │  FHIR   │             │
└─────────────┘          └──────────────┘          └─────────────┘
```

### 7.2 常用FHIR服务器

| FHIR服务器 | 说明 | 适用场景 |
|-----------|------|---------|
| **HAPI FHIR** | 开源Java实现，最流行 | 本地开发和测试 |
| **Microsoft Azure FHIR** | Azure云服务 | 企业级云部署 |
| **Amazon HealthLake** | AWS医疗数据湖 | AWS生态 |
| **Google Cloud Healthcare API** | GCP医疗API | GCP生态 |

### 7.3 对接流程

| 步骤 | 操作 | 说明 |
|------|------|------|
| 1 | 部署FHIR服务器 | 使用HAPI FHIR或云服务 |
| 2 | 配置SMART on FHIR认证 | 注册本系统为SMART App |
| 3 | 数据映射 | 将Pipeline输出映射为FHIR资源 |
| 4 | 推送资源 | 调用FHIR API创建Patient/Condition/MedicationRequest |
| 5 | 订阅更新 | FHIR Subscription机制实时接收HIS数据变更 |

---

## 8. fhir.resources Python库使用

### 8.1 什么是fhir.resources

`fhir.resources`是一个Python库，基于Pydantic v2实现了所有FHIR R4资源类型的数据模型。它提供了类型安全的FHIR资源构造和验证。

```bash
pip install fhir.resources
```

### 8.2 基本使用

```python
from fhir.resources.patient import Patient
from fhir.resources.condition import Condition
from fhir.resources.medicationrequest import MedicationRequest

# 创建Patient资源
patient = Patient(
    id="patient-001",
    name=[{"use": "official", "text": "John Smith"}],
    gender="male",
    birthDate="1981-01-01",
)
print(patient.json(indent=2))  # 输出标准FHIR JSON

# 创建Condition资源
condition = Condition(
    subject={"reference": "Patient/patient-001"},
    code={
        "coding": [
            {"system": "http://hl7.org/fhir/sid/icd-10-cm", "code": "J18.1", "display": "Lobar pneumonia"}
        ],
        "text": "Community-Acquired Pneumonia",
    },
)

# 创建MedicationRequest
med_request = MedicationRequest(
    status="active",
    intent="order",
    subject={"reference": "Patient/patient-001"},
    medicationCodeableConcept={
        "text": "Levofloxacin",
        "coding": [{"display": "levofloxacin"}],
    },
)
```

### 8.3 数据验证

fhir.resources自动验证数据是否符合FHIR规范：

```python
# 正确的数据 — 验证通过
patient = Patient(gender="male", name=[{"text": "Test"}])

# 错误的数据 — 抛出ValidationError
try:
    patient = Patient(gender="invalid_value")  # gender必须是male/female/other/unknown
except Exception as e:
    print(f"验证失败: {e}")
```

### 8.4 与本项目的集成

```python
# 将Pipeline输出转为标准FHIR资源
from fhir.resources.patient import Patient as FHIRPatient

def pipeline_result_to_fhir_bundle(state):
    resources = []

    # 1. Patient
    if state.patient_info:
        fhir_patient = patient_to_fhir(state.patient_info)
        resources.append(fhir_patient)

    # 2. Condition
    if state.diagnosis:
        fhir_condition = diagnosis_to_fhir_condition(state.diagnosis)
        resources.append(fhir_condition)

    # 3. MedicationRequest(s)
    if state.treatment_plan:
        for med in state.treatment_plan.get("medications", []):
            fhir_med = medication_to_fhir(med)
            resources.append(fhir_med)

    # 4. 组装为FHIR Bundle
    bundle = {
        "resourceType": "Bundle",
        "type": "collection",
        "entry": [{"resource": r} for r in resources],
    }
    return bundle
```

> **FHIR Bundle**是一种容器资源，可以把多个FHIR资源打包在一起传输。在本项目中，一次Pipeline执行的输出可以打包成一个Bundle，包含Patient + Condition + MedicationRequest。

---

> **下一篇**：[06-HIPAA合规设计](06-HIPAA合规设计.md) — 深入了解HIPAA法规、Safe Harbor去标识化、PHI检测和审计日志设计
