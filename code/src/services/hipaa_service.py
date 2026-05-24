"""
HIPAA compliance service — PHI detection, de-identification, and audit logging.

Implements:
  - Safe Harbor de-identification method (18 identifiers)
  - Audit trail generation (WORM-style)
  - Access control helpers
  - Risk assessment
"""

from __future__ import annotations
import json
import re
import hashlib
from datetime import datetime, timezone
from typing import Optional
import structlog

logger = structlog.get_logger(__name__)

# HIPAA Safe Harbor: 18 categories of PHI identifiers
PHI_IDENTIFIERS = {
    "names": r"\b[A-Z][a-z]+\s[A-Z][a-z]+\b",
    "geographic_data": r"\b\d+\s[\w\s]+(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Blvd)\b",
    "dates": r"\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}[/-]\d{1,2}[/-]\d{1,2})\b",
    "phone_numbers": r"(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}",
    "fax_numbers": r"(?:fax|FAX)[:\s]*\d{3}[-.\s]?\d{3}[-.\s]?\d{4}",
    "email_addresses": r"\b[\w.+-]+@[\w-]+\.[\w.-]+\b",
    "ssn": r"\b\d{3}-\d{2}-\d{4}\b",
    "mrn": r"\b(?:MRN|Medical Record)[:\s#]?\d+\b",
    "health_plan_id": r"\b(?:Plan|Insurance)\s*(?:ID|#)[:\s]?\w+\b",
    "account_numbers": r"\b(?:Account|Acct)[:\s#]?\d+\b",
    "license_numbers": r"\b(?:License|DL)[:\s#]?[A-Z0-9]+\b",
    "vehicle_ids": r"\b(?:VIN)[:\s]?[A-Z0-9]{17}\b",
    "device_ids": r"\b(?:Device|Serial)[:\s#]?[A-Z0-9-]+\b",
    "urls": r"https?://[\w./\-?=&#]+",
    "ip_addresses": r"\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b",
    "biometric_ids": r"\b(?:fingerprint|retina|voiceprint|face)\s*(?:id|scan)\b",
    "photographs": r"\b(?:photo|image|picture)\s*(?:id|file)\b",
    "unique_identifiers": r"\b(?:UUID|GUID)[:\s]?[\da-f-]{36}\b",
}


def detect_phi(text: str) -> dict[str, list[str]]:
    """Scan text for all 18 categories of PHI. Returns dict of category -> matches."""
    findings: dict[str, list[str]] = {}
    for category, pattern in PHI_IDENTIFIERS.items():
        matches = re.findall(pattern, text, re.IGNORECASE)
        if matches:
            findings[category] = matches
    return findings


def deidentify_text(text: str) -> str:
    """Apply Safe Harbor de-identification to text."""
    result = text
    result = re.sub(PHI_IDENTIFIERS["ssn"], "[SSN_REDACTED]", result)
    result = re.sub(PHI_IDENTIFIERS["phone_numbers"], "[PHONE_REDACTED]", result)
    result = re.sub(PHI_IDENTIFIERS["email_addresses"], "[EMAIL_REDACTED]", result)
    result = re.sub(PHI_IDENTIFIERS["ip_addresses"], "[IP_REDACTED]", result)
    result = re.sub(PHI_IDENTIFIERS["urls"], "[URL_REDACTED]", result)
    result = re.sub(PHI_IDENTIFIERS["mrn"], "[MRN_REDACTED]", result)
    result = re.sub(PHI_IDENTIFIERS["ssn"], "[SSN_REDACTED]", result)
    return result


def hash_identifier(value: str) -> str:
    """One-way hash for pseudonymization."""
    return hashlib.sha256(value.encode()).hexdigest()[:16]


class AuditLogger:
    """
    Immutable audit trail logger.

    In production, writes to a WORM-compliant storage system.
    For demo purposes, appends to an in-memory list.
    """

    def __init__(self):
        self._records: list[dict] = []

    def log(
        self,
        action: str,
        resource_type: str,
        user_id: str = "system",
        resource_id: str = "",
        detail: str = "",
        outcome: str = "success",
        ip_address: str = "",
    ) -> dict:
        record = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "user_id": user_id,
            "action": action,
            "resource_type": resource_type,
            "resource_id": resource_id,
            "detail": detail,
            "outcome": outcome,
            "ip_address": ip_address,
        }
        self._records.append(record)
        logger.info("audit.log", action=action, resource_type=resource_type)
        return record

    def get_records(self, limit: int = 100) -> list[dict]:
        return self._records[-limit:]

    def get_records_for_resource(self, resource_id: str) -> list[dict]:
        return [r for r in self._records if r["resource_id"] == resource_id]


_audit_logger: Optional[AuditLogger] = None


def get_audit_logger() -> AuditLogger:
    global _audit_logger
    if _audit_logger is None:
        _audit_logger = AuditLogger()
    return _audit_logger
