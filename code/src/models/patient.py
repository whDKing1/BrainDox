"""Patient data models aligned with FHIR R4 standard."""

from __future__ import annotations
from datetime import date, datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class Gender(str, Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"
    UNKNOWN = "unknown"


class Severity(str, Enum):
    MILD = "mild"
    MODERATE = "moderate"
    SEVERE = "severe"
    CRITICAL = "critical"


class Symptom(BaseModel):
    name: str
    duration_days: Optional[float] = Field(None, description="Duration in days (e.g., 0.0833 for 2 hours, 1.5 for 36 hours)")
    severity: Optional[Severity] = Severity.MODERATE
    description: Optional[str] = None


class Allergy(BaseModel):
    substance: str
    reaction: Optional[str] = None
    severity: Severity = Severity.MODERATE


class Medication(BaseModel):
    name: str
    dosage: Optional[str] = None
    frequency: Optional[str] = None
    start_date: Optional[date] = None


class VitalSigns(BaseModel):
    temperature: Optional[float] = Field(None, description="Body temperature in Celsius")
    heart_rate: Optional[int] = Field(None, description="Beats per minute")
    blood_pressure_systolic: Optional[int] = None
    blood_pressure_diastolic: Optional[int] = None
    respiratory_rate: Optional[int] = None
    oxygen_saturation: Optional[float] = None


class LabResult(BaseModel):
    test_name: str
    value: str
    unit: Optional[str] = None
    reference_range: Optional[str] = None
    is_abnormal: bool = False


class NeurologicalExam(BaseModel):
    """Neurological examination findings."""
    consciousness_level: Optional[str] = Field(None, description="GCS score or description (e.g., alert, lethargic, stupor, coma)")
    pupil_response: Optional[str] = Field(None, description="Pupil size and light reflex (e.g., equal and reactive, left dilated and fixed)")
    motor_strength: Optional[dict] = Field(None, description="Limb muscle strength by MRC grade 0-5, e.g., {left_arm: 4, right_arm: 5, left_leg: 3, right_leg: 5}")
    pathological_reflexes: list[str] = Field(default_factory=list, description="Pathological reflexes present (e.g., Babinski, Hoffmann, Chaddock)")
    cranial_nerves: Optional[dict] = Field(None, description="Cranial nerve exam findings, e.g., {CN_II: normal, CN_VII_left: UMN_type_weakness}")
    sensory_exam: Optional[str] = Field(None, description="Sensory findings (e.g., hemianesthesia, glove-and-stocking, dermatomal)")
    coordination: Optional[str] = Field(None, description="Cerebellar function (e.g., finger-to-nose, heel-to-shin, Romberg)")
    gait: Optional[str] = Field(None, description="Gait pattern (e.g., spastic, ataxic, shuffling, steppage)")
    meningeal_signs: list[str] = Field(default_factory=list, description="Meningeal irritation signs (e.g., neck_stiffness, Kernig, Brudzinski)")
    speech: Optional[str] = Field(None, description="Speech assessment (e.g., fluent aphasia, dysarthria, normal)")


class NeuroImaging(BaseModel):
    """Neuroimaging study results."""
    modality: str = Field("", description="Imaging modality (CT, MRI, DSA, MRA, CTA)")
    findings: str = Field("", description="Imaging findings")
    conclusion: str = Field("", description="Imaging diagnosis/conclusion")


class PatientInfo(BaseModel):
    """Core patient information for neurology intake processing."""
    patient_id: Optional[str] = None
    name: str
    age: int
    gender: Gender
    chief_complaint: str
    symptoms: list[Symptom] = Field(default_factory=list)
    medical_history: list[str] = Field(default_factory=list)
    family_history: list[str] = Field(default_factory=list)
    allergies: list[Allergy] = Field(default_factory=list)
    current_medications: list[Medication] = Field(default_factory=list)
    vital_signs: Optional[VitalSigns] = None
    lab_results: list[LabResult] = Field(default_factory=list)
    neurological_exam: Optional[NeurologicalExam] = None
    neuro_imaging: list[NeuroImaging] = Field(default_factory=list)
    raw_input: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
