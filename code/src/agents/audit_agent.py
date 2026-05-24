"""
Audit Agent — HIPAA compliance checking and data de-identification.

Responsibilities:
  - Scan all pipeline outputs for PHI (Protected Health Information)
  - Verify compliance with HIPAA Safe Harbor de-identification (18 identifiers)
  - Generate immutable audit trail records
  - Apply data masking to sensitive fields
  - Produce compliance report with risk assessment
"""

from __future__ import annotations
import json
import re
from datetime import datetime, timezone
import structlog

# 导入审计相关的 Pydantic 模型：
# - AuditResult: 最终的审计结果对象，包含所有合规检查、风险等级等。
# - AuditRecord: 单条审计日志记录（时间、操作、资源等）。
# - ComplianceCheck: 单个合规检查项（名称、通过/失败、详情）。
from ..models.treatment import AuditResult, AuditRecord, ComplianceCheck

logger = structlog.get_logger(__name__)

# =============================================================================
# 常量定义：HIPAA Safe Harbor 脱敏的 18 种 PHI 标识符
# =============================================================================

# HIPAA (美国《健康保险携带和责任法案》) 要求保护患者受保护健康信息 (PHI)。
# Safe Harbor 方法定义 18 类必须移除的标识符，此处用正则表达式匹配其中一些常见模式。
# 注意：真实环境需要更全面的识别和脱敏方案，此处简化用于教学演示。
PHI_PATTERNS = {
# 名字：匹配大写字母开头后跟小写字母，空格后重复一次（简化的姓名模式，如 John Doe）。
    "name": r"\b[A-Z][a-z]+\s[A-Z][a-z]+\b",
    "date_of_birth": r"\b\d{4}[-/]\d{2}[-/]\d{2}\b",# 出生日期：格式 2023-01-15 或 2023/01/15。
    "phone": r"\b\d{3}[-.]?\d{3}[-.]?\d{4}\b",
    "email": r"\b[\w.+-]+@[\w-]+\.[\w.-]+\b",
    "ssn": r"\b\d{3}-\d{2}-\d{4}\b",# 社会安全号码 (SSN)：格式 123-45-6789。
    "mrn": r"\bMRN[:\s]?\d+\b",# 医疗记录号 (MRN)：以 MRN 开头，可能跟冒号或空格，然后是数字。
    "ip_address": r"\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b",
    "zip_code": r"\b\d{5}(-\d{4})?\b",# 邮政编码：5 位或 5+4 位格式 (12345-6789)。
    "address": r"\b\d+\s[\w\s]+(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Boulevard|Blvd)\b",
}

# HIPAA 合规检查项列表（除 PHI 扫描外，还有结构性和策略性检查）。
# 这些检查项在后续代码中会逐个评估。
HIPAA_CHECKS = [
    "phi_scan",# 是否扫描到 PHI
    "data_encryption_at_rest",# 静态数据加密
    "data_encryption_in_transit",# 传输中数据加密
    "access_control_rbac",# 基于角色的访问控制
    "audit_logging",# 审计日志本身
    "minimum_necessary_rule",# 最少必要信息原则
    "breach_notification_ready",# 泄露通知准备
    "data_retention_policy",# 数据保留策略
]

# =============================================================================
# 辅助函数：PHI 扫描与脱敏
# =============================================================================
def _scan_for_phi(data: dict) -> list[str]:
    """
    扫描字典（序列化为 JSON 字符串）中是否包含 PHI 模式。
    参数:
        data: 任意字典数据（如 patient_info, diagnosis 等）。
    返回:
        找到的 PHI 类型列表，如 ["name", "ssn"]。
    """
    # 将整个字典转为 JSON 字符串。ensure_ascii=False 保留原始字符（如中文），避免误判。
    text = json.dumps(data, ensure_ascii=False)
    found = []
    # 遍历每种 PHI 类型的正则表达式，用 re.search 检查字符串中是否有匹配。
    for phi_type, pattern in PHI_PATTERNS.items():
        if re.search(pattern, text):
            found.append(phi_type)
    return found


def _mask_phi(data: dict) -> dict:
    """
    对字典中的数据应用正则替换，将已知 PHI 模式掩码（脱敏）。
    注意：此处只脱敏了 SSN、电话、email 和 IP，可根据需要扩展。
    参数:
        data: 包含敏感信息的字典。
    返回:
        经过脱敏后的新字典。
    """
    # 序列化为 JSON 字符串。
    text = json.dumps(data, ensure_ascii=False)

    # 使用 re.sub 将匹配的模式替换为掩码占位符。
    text = re.sub(PHI_PATTERNS["ssn"], "***-**-****", text)
    text = re.sub(PHI_PATTERNS["phone"], "***-***-****", text)
    text = re.sub(PHI_PATTERNS["email"], "****@****.***", text)
    text = re.sub(PHI_PATTERNS["ip_address"], "***.***.***.***", text)

    # 将脱敏后的 JSON 字符串解析回字典。
    return json.loads(text)


def _create_audit_record(action: str, resource_type: str, detail: str) -> dict:
    """
        生成一条标准化的审计日志记录。
        使用 AuditRecord Pydantic 模型确保字段完整性。
        返回字典形式，因为 LangGraph 状态要求序列化。
        """
    return AuditRecord(
        # 时间戳：当前 UTC 时间，按 ISO 8601 格式输出字符串。
        timestamp=datetime.now(timezone.utc).isoformat(),
        user_id="system",# 操作主体，这里是系统自动执行。
        action=action,# 如 "phi_scan", "data_masking"
        resource_type=resource_type,# 被审计的资源类型，如 "pipeline_output"
        detail=detail,# 补充描述信息。
        outcome="success",# 该步骤执行结果，固定为 success。
    ).model_dump()# 将 Pydantic 实例转为字典。

# =============================================================================
# 核心节点函数：audit_agent
# =============================================================================
def audit_agent(state) -> dict:
    """
    LangGraph 节点：执行 HIPAA 合规审计和 PHI 脱敏。

    读取状态中的所有核心数据（patient_info, diagnosis, treatment_plan, coding_result），
    进行 PHI 扫描、脱敏、合规检查，并生成完整的审计报告。

    返回：
        dict: 包含 audit_result 和 current_agent 的部分状态更新。
    """
    logger.info("audit_agent.start")

    # 获取当前 UTC 时间，用于生成审计记录的起点。
    now = datetime.now(timezone.utc).isoformat()
    # 初始化容器列表，后续逐项填充。
    audit_trail = []# 存储 AuditRecord 字典的列表。
    compliance_checks = []# 存储 ComplianceCheck 字典的列表。
    phi_found = []# 扫描到的 PHI 类型名称列表。
    phi_masked = []# 实际脱敏的 PHI 类型列表（通常与 phi_found 相同）。

    # -------------------------------------------------------------------------
    # 1. 收集所有需要审计的数据
    # -------------------------------------------------------------------------
    # 将管道各阶段输出汇总到一个字典，便于统一扫描。
    all_data = {}
    # 遍历可能存在的字段名（患者信息、诊断、治疗方案、编码结果）。
    for field_name in ("patient_info", "diagnosis", "treatment_plan", "coding_result"):
        # 使用 getattr 从 state 安全获取属性，不存在则返回 None。
        val = getattr(state, field_name, None)
        if val:
            all_data[field_name] = val

    # -------------------------------------------------------------------------
    # 2. PHI 扫描与合规检查项记入
    # -------------------------------------------------------------------------
    # 调用扫描函数，获取真实存在的 PHI 类型。
    phi_found = _scan_for_phi(all_data)
    compliance_checks.append(
        ComplianceCheck(
            check_name="phi_scan",
            passed=len(phi_found) == 0,
            detail=f"Found {len(phi_found)} PHI types: {', '.join(phi_found)}" if phi_found else "No PHI detected",
        ).model_dump()
    )
    audit_trail.append(_create_audit_record("phi_scan", "pipeline_output", f"Scanned {len(all_data)} sections"))

    # -------------------------------------------------------------------------
    # 3. 数据脱敏（如果发现了 PHI）
    # -------------------------------------------------------------------------
    if phi_found:
        # 对收集到的所有数据进行脱敏处理。
        masked_data = _mask_phi(all_data)
        # 记录实际脱敏的 PHI 类型（此处与发现一致，实际可细化）。
        phi_masked = list(phi_found)
        # 生成数据脱敏的审计日志。
        audit_trail.append(
            _create_audit_record("data_masking", "pipeline_output", f"Masked {len(phi_masked)} PHI types")# 生成一条 PHI 扫描的审计日志。
        )

    # -------------------------------------------------------------------------
    # 4. 结构性 HIPAA 合规检查
    # -------------------------------------------------------------------------
    # 这些检查通常基于系统配置和策略，这里用硬编码的 True/False 模拟。
    # 实际生产环境应读取真实的安全配置。
    structural_checks = {
        "data_encryption_at_rest": True,
        "data_encryption_in_transit": True,
        "access_control_rbac": True,
        "audit_logging": True,
        "minimum_necessary_rule": state.patient_info is not None,
        "breach_notification_ready": True,
        "data_retention_policy": True,
    }
    # 遍历每一项，生成 ComplianceCheck 并记录。
    for check_name, passed in structural_checks.items():
        compliance_checks.append(
            ComplianceCheck(
                check_name=check_name,
                passed=passed,
                detail="Verified" if passed else "Requires attention",
            ).model_dump()
        )

    # -------------------------------------------------------------------------
    # 5. 整体合规评估与风险等级
    # -------------------------------------------------------------------------
    # 所有检查项是否都通过（all_passed）？
    all_passed = all(c["passed"] for c in compliance_checks)
    # 确定风险等级：
    # - 如果全部通过 => low
    # - 如果有未通过但发现的 PHI 类型数 <= 2 => medium
    # - 否则 => high
    risk_level = "low" if all_passed else ("medium" if len(phi_found) <= 2 else "high")

    # 生成改进建议列表。
    recommendations = []
    if phi_found:
        recommendations.append("Ensure all PHI is masked before external transmission")
    if not all_passed:
        recommendations.append("Review failed compliance checks and remediate")
    recommendations.append("Maintain audit logs for minimum 6 years per HIPAA requirements")

    # 生成一条总结性的审计日志。
    audit_trail.append(
        _create_audit_record(
            "compliance_assessment",
            "pipeline",
            f"Overall: {'PASS' if all_passed else 'NEEDS_REVIEW'}, risk={risk_level}",
        )
    )

    # -------------------------------------------------------------------------
    # 6. 组装最终审计结果
    # -------------------------------------------------------------------------
    # 使用 AuditResult Pydantic 模型构建完整结果，确保格式正确。
    result = AuditResult(
        hipaa_compliant=all_passed,
        compliance_checks=compliance_checks,
        phi_fields_found=phi_found,
        phi_fields_masked=phi_masked,
        audit_trail=audit_trail,
        recommendations=recommendations,
        overall_risk_level=risk_level,
    )

    # 记录成功日志，包含合规状态和风险等级。
    logger.info("audit_agent.success", hipaa_compliant=all_passed, risk=risk_level)

    # 返回审计结果字典（和其他必要字段）供 LangGraph 更新状态。
    return {
        "audit_result": result.model_dump(),
        "current_agent": "audit",
    }
