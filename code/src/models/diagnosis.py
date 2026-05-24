"""Diagnosis data models."""

from __future__ import annotations
from pydantic import BaseModel, Field


class DiagnosisCandidate(BaseModel):
    """A single candidate diagnosis with confidence and evidence."""
    disease_name: str
    icd10_hint: str = Field(default="", description="Preliminary ICD-10 code hint")
    confidence: float = Field(ge=0.0, le=1.0, description="Confidence score 0-1")
    evidence: list[str] = Field(default_factory=list, description="Supporting evidence")
    reasoning: str = ""


class DifferentialDiagnosis(BaseModel):
    """Complete differential diagnosis output."""
    primary_diagnosis: DiagnosisCandidate
    differential_list: list[DiagnosisCandidate] = Field(default_factory=list)
    recommended_tests: list[str] = Field(default_factory=list)
    clinical_notes: str = ""
    knowledge_sources: list[str] = Field(default_factory=list)
