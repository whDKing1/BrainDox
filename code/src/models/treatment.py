"""Treatment plan data models."""

from __future__ import annotations
from enum import Enum
from pydantic import BaseModel, Field


class DrugInteractionSeverity(str, Enum):
    NONE = "none"
    MINOR = "minor"
    MODERATE = "moderate"
    MAJOR = "major"
    CONTRAINDICATED = "contraindicated"


class PrescribedMedication(BaseModel):
    drug_name: str
    generic_name: str = ""
    dosage: str
    route: str = "oral"
    frequency: str
    duration: str
    contraindications: list[str] = Field(default_factory=list)
    side_effects: list[str] = Field(default_factory=list)


class DrugInteraction(BaseModel):
    drug_a: str
    drug_b: str
    severity: DrugInteractionSeverity
    description: str
    recommendation: str


class TreatmentPlan(BaseModel):
    """Complete treatment plan output."""
    diagnosis_addressed: str
    medications: list[PrescribedMedication] = Field(default_factory=list)
    drug_interactions: list[DrugInteraction] = Field(default_factory=list)
    non_drug_treatments: list[str] = Field(default_factory=list)
    lifestyle_recommendations: list[str] = Field(default_factory=list)
    follow_up_plan: str = ""
    warnings: list[str] = Field(default_factory=list)
    evidence_references: list[str] = Field(default_factory=list)


class ICD10Code(BaseModel):
    code: str
    description: str
    confidence: float = Field(ge=0.0, le=1.0)
    category: str = ""


class DRGGroup(BaseModel):
    drg_code: str
    description: str
    weight: float = 1.0
    mean_los: float = Field(default=0.0, description="Mean length of stay in days")


class CodingResult(BaseModel):
    """ICD-10 coding and DRGs grouping output."""
    primary_icd10: ICD10Code
    secondary_icd10_codes: list[ICD10Code] = Field(default_factory=list)
    drg_group: Optional[DRGGroup] = None
    coding_notes: str = ""
    coding_confidence: float = Field(ge=0.0, le=1.0, default=0.0)


class AuditRecord(BaseModel):
    """HIPAA audit trail record."""
    timestamp: str
    user_id: str = "system"
    action: str
    resource_type: str
    resource_id: str = ""
    detail: str = ""
    outcome: str = "success"
    ip_address: str = ""


class ComplianceCheck(BaseModel):
    check_name: str
    passed: bool
    detail: str = ""


class AuditResult(BaseModel):
    """Complete audit and compliance output."""
    hipaa_compliant: bool = False
    compliance_checks: list[ComplianceCheck] = Field(default_factory=list)
    phi_fields_found: list[str] = Field(default_factory=list)
    phi_fields_masked: list[str] = Field(default_factory=list)
    audit_trail: list[AuditRecord] = Field(default_factory=list)
    recommendations: list[str] = Field(default_factory=list)
    overall_risk_level: str = "low"


# Fix forward reference
from typing import Optional  # noqa: E402
