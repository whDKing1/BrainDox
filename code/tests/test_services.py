"""Unit tests for service layer."""

import pytest
from src.services.icd10_service import lookup_icd10, search_icd10_by_text, get_drg_group, validate_icd10_code
from src.services.drug_interaction import check_interactions, check_allergy_contraindication
from src.services.hipaa_service import detect_phi, deidentify_text, hash_identifier
from src.services.graphrag_service import GraphRAGService


class TestICD10Service:
    def test_lookup_known_code(self):
        result = lookup_icd10("J18.9")
        assert result is not None
        assert result["code"] == "J18.9"
        assert "Pneumonia" in result["description"]

    def test_lookup_unknown_code(self):
        assert lookup_icd10("Z99.99") is None

    def test_search_by_text(self):
        results = search_icd10_by_text("pneumonia")
        assert len(results) >= 1
        assert any("J18" in r["code"] for r in results)

    def test_drg_group(self):
        drg = get_drg_group("J18.9")
        assert drg is not None
        assert drg["drg_code"] == "193"

    def test_validate_code(self):
        assert validate_icd10_code("I10") is True
        assert validate_icd10_code("Z99.99") is False


class TestDrugInteraction:
    def test_known_interaction(self):
        interactions = check_interactions(["warfarin"], ["aspirin"])
        assert len(interactions) >= 1
        assert interactions[0]["severity"] == "major"

    def test_no_interaction(self):
        interactions = check_interactions(["metformin"], ["lisinopril"])
        assert len(interactions) == 0

    def test_class_based_interaction(self):
        interactions = check_interactions(["fluoxetine"], ["phenelzine"])
        assert len(interactions) >= 1
        assert interactions[0]["severity"] == "contraindicated"

    def test_allergy_check(self):
        result = check_allergy_contraindication("amoxicillin", ["penicillin"])
        assert result is not None
        assert result["severity"] == "major"


class TestHIPAAService:
    def test_detect_ssn(self):
        findings = detect_phi("Patient SSN is 123-45-6789")
        assert "ssn" in findings

    def test_detect_email(self):
        findings = detect_phi("Contact: john@example.com")
        assert "email_addresses" in findings

    def test_deidentify(self):
        text = "Patient SSN 123-45-6789, phone 555-123-4567, email test@mail.com"
        result = deidentify_text(text)
        assert "123-45-6789" not in result
        assert "555-123-4567" not in result
        assert "test@mail.com" not in result

    def test_hash_identifier(self):
        h1 = hash_identifier("patient_001")
        h2 = hash_identifier("patient_001")
        assert h1 == h2
        assert len(h1) == 16


class TestGraphRAGService:
    def test_symptom_lookup(self):
        svc = GraphRAGService()
        results = svc.find_diseases_by_symptoms(["fever", "cough"])
        assert len(results) > 0
        disease_names = [r["disease"] for r in results]
        assert "Pneumonia" in disease_names

    def test_icd10_lookup(self):
        svc = GraphRAGService()
        result = svc.get_icd10("Pneumonia")
        assert result is not None
        assert result["code"] == "J18.9"
