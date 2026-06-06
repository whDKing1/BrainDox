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
