"""
FHIR R4 service — Convert internal models to/from FHIR resources.

Provides helper functions to:
  - Convert PatientInfo to FHIR Patient resource
  - Convert DiagnosisCandidate to FHIR Condition resource
  - Convert PrescribedMedication to FHIR MedicationRequest
  - Communicate with external FHIR servers
"""

from __future__ import annotations
from datetime import date
from typing import Optional
import httpx
import structlog

from ..config.settings import get_settings

logger = structlog.get_logger(__name__)


def patient_to_fhir(patient_info: dict) -> dict:
    """Convert internal PatientInfo dict to FHIR R4 Patient resource."""
    gender_map = {"male": "male", "female": "female", "other": "other", "unknown": "unknown"}
    gender = gender_map.get(patient_info.get("gender", "unknown"), "unknown")

    birth_year = date.today().year - patient_info.get("age", 0)

    resource = {
        "resourceType": "Patient",
        "id": patient_info.get("patient_id", ""),
        "name": [
            {
                "use": "official",
                "text": patient_info.get("name", "Unknown"),
            }
        ],
        "gender": gender,
        "birthDate": f"{birth_year}-01-01",
    }

    allergies = patient_info.get("allergies", [])
    if allergies:
        resource["_allergies"] = [
            {
                "resourceType": "AllergyIntolerance",
                "substance": a.get("substance", ""),
                "reaction": a.get("reaction", ""),
            }
            for a in allergies
        ]

    return resource


def diagnosis_to_fhir_condition(diagnosis: dict, patient_id: str = "") -> dict:
    """Convert a diagnosis dict to FHIR R4 Condition resource."""
    primary = diagnosis.get("primary_diagnosis", {})
    return {
        "resourceType": "Condition",
        "subject": {"reference": f"Patient/{patient_id}"},
        "code": {
            "coding": [
                {
                    "system": "http://hl7.org/fhir/sid/icd-10-cm",
                    "code": primary.get("icd10_hint", ""),
                    "display": primary.get("disease_name", ""),
                }
            ],
            "text": primary.get("disease_name", ""),
        },
        "note": [{"text": primary.get("reasoning", "")}],
    }


def medication_to_fhir(medication: dict, patient_id: str = "") -> dict:
    """Convert a prescribed medication to FHIR R4 MedicationRequest."""
    return {
        "resourceType": "MedicationRequest",
        "status": "active",
        "intent": "order",
        "subject": {"reference": f"Patient/{patient_id}"},
        "medicationCodeableConcept": {
            "text": medication.get("drug_name", ""),
            "coding": [
                {
                    "display": medication.get("generic_name", medication.get("drug_name", "")),
                }
            ],
        },
        "dosageInstruction": [
            {
                "text": f"{medication.get('dosage', '')} {medication.get('route', 'oral')} {medication.get('frequency', '')}",
                "timing": {"code": {"text": medication.get("frequency", "")}},
                "route": {"text": medication.get("route", "oral")},
                "doseAndRate": [{"doseQuantity": {"value": medication.get("dosage", "")}}],
            }
        ],
    }


async def push_to_fhir_server(resource: dict) -> Optional[dict]:
    """POST a FHIR resource to the configured FHIR server."""
    settings = get_settings()
    url = f"{settings.fhir_server_url}/{resource.get('resourceType', '')}"

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(url, json=resource)
            resp.raise_for_status()
            logger.info("fhir.push_success", resource_type=resource.get("resourceType"))
            return resp.json()
    except httpx.HTTPError as e:
        logger.warning("fhir.push_failed", error=str(e))
        return None
