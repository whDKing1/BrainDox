# 06 — HIPAA合规设计

## 目录

- [1. HIPAA法规概述](#1-hipaa法规概述)
- [2. Safe Harbor去标识化方法](#2-safe-harbor去标识化方法)
- [3. 项目中的合规实现](#3-项目中的合规实现)
- [4. Audit Agent的8项合规检查详解](#4-audit-agent的8项合规检查详解)
- [5. 合规性测试方案](#5-合规性测试方案)
- [6. 违规处罚案例](#6-违规处罚案例)

---

## 1. HIPAA法规概述

### 1.1 什么是HIPAA

> **HIPAA（Health Insurance Portability and Accountability Act）**，即美国《健康保险便利与责任法案》，1996年由美国国会通过。它是所有涉及美国患者健康数据的信息系统必须遵守的法律。

**一句话总结**：HIPAA规定了谁可以访问患者健康信息、如何保护这些信息、泄露了怎么办。

> **小白解读**：想象你的银行有义务保护你的资金安全一样，处理患者健康数据的医疗系统也有法律义务保护患者的隐私数据。HIPAA就是这套"数据保护法"。

### 1.2 HIPAA的四大规则

| 规则 | 英文名 | 核心内容 | 与本项目的关系 |
|------|--------|---------|--------------|
| **隐私规则** | Privacy Rule | 定义什么是PHI、谁可以访问、患者有哪些权利 | ✅ PHI检测和脱敏 |
| **安全规则** | Security Rule | 技术保障（加密、访问控制、审计日志） | ✅ 8项合规检查 |
| **泄露通知规则** | Breach Notification Rule | 数据泄露后必须通知受影响个人 | ✅ 泄露通知就绪检查 |
| **执行规则** | Enforcement Rule | 违规处罚和执行程序 | 了解即可 |

### 1.3 什么是PHI

> **PHI（Protected Health Information）**，即受保护的健康信息。指的是能够直接或间接识别个人身份的健康数据。

PHI = **个人身份信息** + **健康信息**

```
"John Smith, 45岁, 诊断为肺炎"  ← 这是PHI（有姓名+健康信息）
"45岁男性, 诊断为肺炎"           ← 这不是PHI（无法识别个人身份）
```

### 1.4 关键概念

| 概念 | 英文 | 说明 |
|------|------|------|
| **Covered Entity** | 受规管实体 | 医院、保险公司、医疗信息交换机构——直接受HIPAA管辖 |
| **Business Associate** | 商业伙伴 | 为受规管实体提供服务的第三方（如本系统）——也受HIPAA管辖 |
| **BAA** | Business Associate Agreement | 商业伙伴协议——使用本系统前必须签署 |
| **Minimum Necessary** | 最小必要原则 | 只收集和使用完成任务所必需的最少PHI |
| **De-identification** | 去标识化 | 移除PHI使数据无法关联到个人 |

---

## 2. Safe Harbor去标识化方法

### 2.1 两种去标识化方法

HIPAA定义了两种去标识化方法：

| 方法 | 说明 | 难度 | 本项目使用 |
|------|------|------|-----------|
| **Safe Harbor** | 移除/泛化18类特定标识符 | 较简单，有明确的checklist | ✅ |
| **Expert Determination** | 由统计学专家评估重识别风险 | 复杂，需要专业人员 | ❌ |

Safe Harbor方法更适合自动化实现，因为它有明确的18项checklist。

### 2.2 18项PHI标识符完整列表

| # | 标识符类型 | 英文名 | 具体说明 | 处理方式 | 示例 |
|---|-----------|--------|---------|---------|------|
| 1 | **姓名** | Names | 全名、姓氏、名字 | 移除或假名化 | John Smith → [NAME_REDACTED] |
| 2 | **地理信息** | Geographic data | 州以下的地理细分（街道、城市、邮编前3位人口<2万的） | 移除细节，保留州 | 123 Main St, Boston MA → MA |
| 3 | **日期** | Dates | 所有日期（出生日期、入院日期、手术日期等），89岁以上只保留"≥90" | 只保留年份 | 1980-03-15 → 1980 |
| 4 | **电话号码** | Phone numbers | 所有电话号码 | 完全移除 | 555-123-4567 → [PHONE_REDACTED] |
| 5 | **传真号码** | Fax numbers | 所有传真号码 | 完全移除 | — |
| 6 | **电子邮件** | Email addresses | 所有邮箱地址 | 完全移除 | john@hospital.com → [EMAIL_REDACTED] |
| 7 | **社会安全号** | SSN | 社会安全号码（类似中国身份证号） | 完全移除 | 123-45-6789 → [SSN_REDACTED] |
| 8 | **病历号** | Medical record numbers | 医院病历号 | 假名化（哈希） | MRN:12345 → MRN:a1b2c3 |
| 9 | **健康计划ID** | Health plan beneficiary numbers | 保险计划受益人编号 | 假名化 | — |
| 10 | **账号** | Account numbers | 银行账号等 | 假名化 | — |
| 11 | **证件号** | Certificate/license numbers | 驾照号、执照号等 | 完全移除 | — |
| 12 | **车辆标识** | Vehicle identifiers and serial numbers | 车辆识别号（VIN） | 完全移除 | — |
| 13 | **设备标识** | Device identifiers and serial numbers | 医疗设备序列号 | 假名化 | — |
| 14 | **URL** | Web Universal Resource Locators | 网页地址 | 完全移除 | — |
| 15 | **IP地址** | Internet Protocol address numbers | 网络地址 | 完全移除 | 192.168.1.1 → [IP_REDACTED] |
| 16 | **生物标识** | Biometric identifiers | 指纹、视网膜扫描、声纹 | 完全移除 | — |
| 17 | **面部照片** | Full face photographic images | 全脸照片 | 完全移除 | — |
| 18 | **其他唯一标识** | Any other unique identifying number, characteristic, or code | 任何其他能唯一标识个人的编码 | 假名化 | — |

### 2.3 三种处理方式详解

| 方式 | 说明 | 可逆性 | 示例 |
|------|------|--------|------|
| **移除（Redaction）** | 用占位符替换PHI | 不可逆 | `123-45-6789` → `[SSN_REDACTED]` |
| **假名化（Pseudonymization）** | 用哈希值替换PHI | 单向（可查表验证） | `John Smith` → `a1b2c3d4e5f6` |
| **泛化（Generalization）** | 降低数据精度 | 不可逆 | `1980-03-15` → `1980` |

本项目中的假名化使用SHA-256哈希：

```python
def hash_identifier(value: str) -> str:
    """单向哈希，用于假名化"""
    return hashlib.sha256(value.encode()).hexdigest()[:16]

# 示例：
hash_identifier("John Smith")  # → "ef2d127de37b942b"
```

---

## 3. 项目中的合规实现

### 3.1 PHI检测（正则模式匹配）

系统使用正则表达式检测18类PHI中的核心9种（`python/src/agents/audit_agent.py`）：

```python
PHI_PATTERNS = {
    "name":          r"\b[A-Z][a-z]+\s[A-Z][a-z]+\b",
    "date_of_birth": r"\b\d{4}[-/]\d{2}[-/]\d{2}\b",
    "phone":         r"\b\d{3}[-.]?\d{3}[-.]?\d{4}\b",
    "email":         r"\b[\w.+-]+@[\w-]+\.[\w.-]+\b",
    "ssn":           r"\b\d{3}-\d{2}-\d{4}\b",
    "mrn":           r"\bMRN[:\s]?\d+\b",
    "ip_address":    r"\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b",
    "zip_code":      r"\b\d{5}(-\d{4})?\b",
    "address":       r"\b\d+\s[\w\s]+(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Boulevard|Blvd)\b",
}
```

**检测流程**：

```python
def _scan_for_phi(data: dict) -> list[str]:
    text = json.dumps(data, ensure_ascii=False)  # 将整个字典序列化为字符串
    found = []
    for phi_type, pattern in PHI_PATTERNS.items():
        if re.search(pattern, text):             # 正则匹配
            found.append(phi_type)
    return found
```

### 3.2 数据脱敏

检测到PHI后，使用正则替换进行脱敏：

```python
def _mask_phi(data: dict) -> dict:
    text = json.dumps(data, ensure_ascii=False)

    # 替换各类PHI
    text = re.sub(PHI_PATTERNS["ssn"],        "***-**-****",       text)
    text = re.sub(PHI_PATTERNS["phone"],      "***-***-****",      text)
    text = re.sub(PHI_PATTERNS["email"],      "****@****.***",     text)
    text = re.sub(PHI_PATTERNS["ip_address"], "***.***.***.***",   text)

    return json.loads(text)
```

**脱敏效果示例**：

| 原始数据 | 脱敏后 |
|---------|--------|
| `"ssn": "123-45-6789"` | `"ssn": "***-**-****"` |
| `"phone": "555-123-4567"` | `"phone": "***-***-****"` |
| `"email": "john@hospital.com"` | `"email": "****@****.***"` |
| `"ip": "192.168.1.1"` | `"ip": "***.***.***.***"` |

### 3.3 审计日志（WORM存储）

> **什么是WORM**：Write Once Read Many（一次写入多次读取）。数据写入后不可修改和删除，只能追加新记录。HIPAA要求审计日志至少保留6年。

**审计日志记录结构**：

```python
class AuditRecord(BaseModel):
    timestamp: str      # ISO 8601时间戳，如"2026-04-06T08:30:00Z"
    user_id: str        # 操作用户ID
    action: str         # 操作类型（phi_scan、data_masking、compliance_assessment）
    resource_type: str  # 资源类型（pipeline_output、pipeline）
    detail: str         # 操作详情
    outcome: str        # 结果（success、failure）
```

**PostgreSQL存储**（`docker/init-db.sql`）：

```sql
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id VARCHAR(100) NOT NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id VARCHAR(255),
    detail TEXT,
    outcome VARCHAR(20) DEFAULT 'success',
    ip_address INET
);

-- HIPAA要求：添加注释说明保留策略
COMMENT ON TABLE audit_logs IS 
  'HIPAA-compliant immutable audit trail. Retain for minimum 6 years.';

-- 生产环境建议：使用数据库策略防止DELETE和UPDATE
-- REVOKE DELETE, UPDATE ON audit_logs FROM application_user;
```

### 3.4 RBAC访问控制

> **什么是RBAC**：Role-Based Access Control（基于角色的访问控制）。不同角色的用户只能访问自己权限范围内的数据。

| 角色 | 可访问的数据 | 可执行的操作 |
|------|------------|------------|
| **医生（Doctor）** | 自己患者的全部数据 | 运行Pipeline、查看诊断和治疗 |
| **护士（Nurse）** | 自己科室患者的基本信息 | 查看患者信息（不含诊断细节） |
| **编码员（Coder）** | 编码结果 | 查看和修正ICD-10编码 |
| **管理员（Admin）** | 审计日志 | 查看审计记录（不含PHI原文） |
| **系统（System）** | 全部数据 | Pipeline内部处理 |

当前版本中RBAC设计为建议方案，生产环境需实现完整的JWT认证和中间件拦截。

### 3.5 传输加密（TLS）

所有API通信必须通过HTTPS（TLS 1.2+）加密：

```python
# 生产环境FastAPI配置
uvicorn src.api.main:app --host 0.0.0.0 --port 443 \
  --ssl-keyfile /path/to/key.pem \
  --ssl-certfile /path/to/cert.pem
```

### 3.6 静态加密（AES-256）

存储在PostgreSQL和Neo4j中的数据应启用静态加密：

| 组件 | 加密方案 |
|------|---------|
| PostgreSQL | pgcrypto扩展 或 云服务商的存储加密（如AWS RDS加密） |
| Neo4j | Neo4j Enterprise的静态加密功能 |
| Redis | Redis 7.0+支持TLS和静态加密 |
| 文件系统 | 操作系统级别的磁盘加密（如LUKS、BitLocker） |

---

## 4. Audit Agent的8项合规检查详解

### 4.1 检查总览

| # | 检查项 | 英文名 | 检查内容 | 默认结果 |
|---|--------|--------|---------|---------|
| 1 | PHI扫描 | `phi_scan` | 是否存在未脱敏的PHI | 动态检测 |
| 2 | 静态加密 | `data_encryption_at_rest` | 存储的数据是否加密 | 通过（配置级） |
| 3 | 传输加密 | `data_encryption_in_transit` | 数据传输是否使用TLS | 通过（配置级） |
| 4 | 访问控制 | `access_control_rbac` | 是否有RBAC权限控制 | 通过（配置级） |
| 5 | 审计日志 | `audit_logging` | 审计日志是否启用 | 通过（已启用） |
| 6 | 最小必要 | `minimum_necessary_rule` | 是否只处理必要的数据 | 检查patient_info非空 |
| 7 | 泄露通知 | `breach_notification_ready` | 是否具备泄露通知能力 | 通过（配置级） |
| 8 | 数据保留 | `data_retention_policy` | 是否有数据保留策略(≥6年) | 通过（配置级） |

### 4.2 检查1：PHI扫描（动态检测）

这是唯一一项需要实际扫描数据的检查：

```python
# 聚合所有Pipeline输出
all_data = {}
for field_name in ("patient_info", "diagnosis", "treatment_plan", "coding_result"):
    val = getattr(state, field_name, None)
    if val:
        all_data[field_name] = val

# 扫描PHI
phi_found = _scan_for_phi(all_data)

# 生成检查结果
compliance_checks.append(ComplianceCheck(
    check_name="phi_scan",
    passed=len(phi_found) == 0,
    detail=f"Found {len(phi_found)} PHI types: {', '.join(phi_found)}" if phi_found else "No PHI detected",
))
```

**如果发现PHI**，Audit Agent会：
1. 记录发现的PHI类型
2. 自动执行脱敏
3. 将PHI扫描标记为"未通过"
4. 风险等级提升为"medium"或"high"

### 4.3 检查2-4：加密和访问控制

这三项检查在当前版本中是配置级检查（假定基础设施已正确配置）：

```python
structural_checks = {
    "data_encryption_at_rest": True,      # 假定PostgreSQL已启用加密
    "data_encryption_in_transit": True,    # 假定使用HTTPS
    "access_control_rbac": True,          # 假定已配置RBAC
}
```

生产环境应替换为实际验证逻辑（如检查TLS证书、检查数据库加密配置等）。

### 4.4 检查5：审计日志

验证审计日志功能是否启用。在本系统中，Audit Agent自身就是审计日志的生产者——它在执行过程中会创建审计记录。

### 4.5 检查6：最小必要原则

```python
"minimum_necessary_rule": state.patient_info is not None,
```

检查Pipeline是否收集了处理所需的最小必要数据。如果patient_info为空（即Intake Agent失败），则认为最小必要原则未满足——因为后续Agent无法正常工作。

### 4.6 风险评级逻辑

```python
all_passed = all(c["passed"] for c in compliance_checks)
risk_level = "low" if all_passed else ("medium" if len(phi_found) <= 2 else "high")
```

| 风险等级 | 条件 | 建议行动 |
|---------|------|---------|
| **low** | 所有8项检查通过 | 正常运营 |
| **medium** | 有检查未通过，但PHI泄露≤2种 | 审查并修复不通过的项目 |
| **high** | 有检查未通过，且PHI泄露>2种 | 立即停止处理，启动泄露响应流程 |

---

## 5. 合规性测试方案

### 5.1 PHI检测测试

```python
class TestHIPAAService:
    def test_detect_ssn(self):
        """测试SSN检测"""
        findings = detect_phi("Patient SSN: 123-45-6789")
        assert "ssn" in findings

    def test_detect_email(self):
        """测试邮箱检测"""
        findings = detect_phi("Contact: john@hospital.com")
        assert "email_addresses" in findings

    def test_no_phi_in_clean_text(self):
        """测试干净文本不应该检测到PHI"""
        findings = detect_phi("45-year-old male with fever")
        # 注意：年龄描述中的数字可能匹配某些模式，需要调整正则

    def test_deidentify_ssn(self):
        """测试SSN脱敏"""
        result = deidentify_text("SSN: 123-45-6789")
        assert "123-45-6789" not in result
        assert "[SSN_REDACTED]" in result

    def test_hash_pseudonymization(self):
        """测试假名化"""
        h1 = hash_identifier("John Smith")
        h2 = hash_identifier("John Smith")
        h3 = hash_identifier("Jane Doe")
        assert h1 == h2      # 同一输入产生相同哈希
        assert h1 != h3      # 不同输入产生不同哈希
        assert len(h1) == 16  # 固定长度
```

### 5.2 Audit Agent端到端测试

```python
def test_audit_agent_detects_phi():
    """测试Audit Agent能够检测到Pipeline输出中的PHI"""
    state = ClinicalState(
        raw_input="test",
        patient_info={"name": "John Smith", "age": 45},
        diagnosis={"primary_diagnosis": {"disease_name": "Pneumonia"}},
    )
    result = audit_agent(state)
    audit = result["audit_result"]

    assert audit["hipaa_compliant"] == False    # 因为有PHI（姓名）
    assert "name" in audit["phi_fields_found"]  # 检测到姓名
    assert len(audit["compliance_checks"]) == 8 # 8项检查
    assert len(audit["audit_trail"]) >= 2       # 至少有PHI扫描和合规评估记录

def test_audit_agent_clean_data():
    """测试干净数据通过审计"""
    state = ClinicalState(
        raw_input="test",
        patient_info={"age": 45, "gender": "male"},
        diagnosis={"primary_diagnosis": {"disease_name": "Pneumonia"}},
    )
    result = audit_agent(state)
    audit = result["audit_result"]

    # 没有PHI时所有检查应该通过
    assert audit["overall_risk_level"] == "low"
```

### 5.3 合规Checklist

在将系统部署到生产环境前，需要完成以下Checklist：

| # | 检查项 | 状态（当前） | 生产要求 |
|---|--------|------------|---------|
| 1 | PHI正则检测 | ✅ 已实现（9种模式） | 扩展到全部18种 |
| 2 | 自动数据脱敏 | ✅ 已实现（4种模式） | 扩展到全部18种 |
| 3 | 审计日志 | ✅ 已实现（内存存储） | 切换到PostgreSQL持久化 |
| 4 | 传输加密TLS | ⚠️ 开发模式HTTP | 必须启用HTTPS |
| 5 | 静态加密 | ⚠️ 未配置 | 启用数据库加密 |
| 6 | RBAC访问控制 | ⚠️ 未实现 | 实现JWT认证+角色权限 |
| 7 | BAA签署 | ❌ N/A | 与使用方签署BAA |
| 8 | 安全审计 | ❌ 未执行 | 聘请第三方安全审计 |
| 9 | 泄露响应计划 | ⚠️ 仅标记就绪 | 制定详细的泄露响应SOP |
| 10 | 员工培训 | ❌ N/A | HIPAA合规培训 |

---

## 6. 违规处罚案例

### 6.1 处罚等级

HIPAA违规处罚分为四个等级：

| 等级 | 违规情形 | 单次罚款 | 年度上限 |
|------|---------|---------|---------|
| **Tier 1** | 不知情的违规（Unknowing） | $100 - $50,000 | $25,000 |
| **Tier 2** | 有合理原因的违规（Reasonable Cause） | $1,000 - $50,000 | $100,000 |
| **Tier 3** | 故意忽视但已纠正（Willful Neglect, Corrected） | $10,000 - $50,000 | $250,000 |
| **Tier 4** | 故意忽视且未纠正（Willful Neglect, Not Corrected） | $50,000 | **$1,500,000** |

### 6.2 真实案例

| 年份 | 机构 | 违规原因 | 罚款金额 |
|------|------|---------|---------|
| 2023 | Banner Health | 黑客入侵导致390万患者数据泄露 | $1,250,000 |
| 2023 | L.A. Care Health Plan | 未实施安全措施保护PHI | $1,300,000 |
| 2022 | Oklahoma State University | 研究数据库暴露27万多患者数据 | $875,000 |
| 2021 | Excellus Health Plan | 数据泄露影响964万人 | $5,100,000 |
| 2020 | Premera Blue Cross | 黑客入侵影响1040万人 | $6,850,000 |
| 2018 | Anthem | 数据泄露影响7880万人 | **$16,000,000** |

> **关键教训**：即使是大型医疗机构也可能因为基本的安全疏忽（如未加密、弱密码、未打补丁）遭受巨额罚款。这就是为什么本项目要在架构层面就内置HIPAA合规检查。

### 6.3 常见违规模式

| 模式 | 说明 | 本项目的预防措施 |
|------|------|----------------|
| 未加密的PHI传输 | 通过HTTP明文传输患者数据 | 要求使用HTTPS/TLS |
| 缺乏访问控制 | 任何人都能访问所有数据 | RBAC角色权限设计 |
| 缺乏审计日志 | 无法追溯谁在什么时候访问了什么数据 | WORM审计日志 |
| PHI泄露到日志 | 在应用日志中打印了患者真实姓名、SSN等 | Audit Agent自动检测和脱敏 |
| 数据保留过短 | 审计日志保留不足6年 | 数据保留策略（≥6年） |
| 未签BAA | 使用第三方服务未签署商业伙伴协议 | 生产部署前必须签署BAA |

### 6.4 面试中如何讲述HIPAA

面试官可能会问："你的系统如何保证HIPAA合规？"

推荐回答框架：

```
1. [概念] HIPAA要求保护18类PHI标识符
2. [检测] 我们的Audit Agent使用正则表达式扫描9种核心PHI模式
3. [脱敏] 检测到PHI后自动执行替换/哈希脱敏
4. [审计] 每次Pipeline执行都生成不可变的审计日志记录
5. [设计决策] Audit Agent故意不使用LLM，因为合规检查需要100%确定性
6. [局限性] 当前是演示版本，生产环境还需要TLS加密、RBAC实现、BAA签署等
```

---

> **上一篇**：[05-FHIR-API集成](05-FHIR-API集成.md) — FHIR R4标准和资源映射
>
> **文档系列完结**。如需更多深入内容，请参考 `interview/` 目录下的面试准备材料。
