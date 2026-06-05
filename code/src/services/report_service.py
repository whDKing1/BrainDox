"""报告生成服务 — 根据诊断和治疗结果生成结构化草稿报告"""
from __future__ import annotations
import json
from datetime import datetime
from typing import Optional


def build_report_content(
    patient_info: Optional[dict],
    diagnosis: Optional[dict],
    treatment_plan: Optional[dict],
    severity_level: str = "L1",
    triggered_route: str = "mild",
) -> dict:
    report_type_map = {"mild": "mild", "moderate": "moderate", "severe": "severe"}
    report_type = report_type_map.get(triggered_route, "mild")
    primary = {}
    differentials = []
    if diagnosis and isinstance(diagnosis, dict):
        primary = diagnosis.get("primary_diagnosis", {})
        diff_list = diagnosis.get("differential_list", [])
        if isinstance(diff_list, list):
            differentials = diff_list
    disease_name = ""
    icd_code = ""
    confidence = 0.0
    if isinstance(primary, dict):
        disease_name = primary.get("disease_name", "")
        icd_code = primary.get("icd_code", "")
        confidence = primary.get("confidence", 0.0)
    chief = ""
    if patient_info and isinstance(patient_info, dict):
        chief = patient_info.get("chief_complaint", "")
    recs_lifestyle = []
    recs_psychotherapy = []
    recs_medication = []
    follow_up = ""
    if treatment_plan and isinstance(treatment_plan, dict):
        lifestyle = treatment_plan.get("lifestyle_recommendations", [])
        if isinstance(lifestyle, list):
            recs_lifestyle = lifestyle
        non_drug = treatment_plan.get("non_drug_treatments", [])
        if isinstance(non_drug, list):
            recs_psychotherapy = non_drug
        meds = treatment_plan.get("medications", [])
        if isinstance(meds, list):
            recs_medication = [m.get("drug_name", m) if isinstance(m, dict) else m for m in meds]
        follow_up = treatment_plan.get("follow_up_plan", "")
    severity_labels = {"L0": "正常波动", "L1": "轻度", "L2": "中度", "L3": "重度", "L4": "危急"}
    conclusion = ""
    if isinstance(primary, dict):
        conclusion = f"评估结论：{disease_name}（{icd_code}），置信度{int(confidence*100)}%"
    return {
        "summary": {
            "chief_complaint": chief,
            "severity_assessment": severity_labels.get(severity_level, "未评估"),
            "conclusion": conclusion,
        },
        "diagnosis": {
            "primary": {
                "disease_name": disease_name,
                "icd_code": icd_code,
                "confidence": confidence,
            },
            "differentials": [
                {
                    "disease_name": d.get("disease_name", ""),
                    "icd_code": d.get("icd_code", ""),
                    "confidence": d.get("confidence", 0),
                    "key_differentiator": d.get("key_differentiator", ""),
                }
                for d in differentials if isinstance(d, dict)
            ],
        },
        "recommendations": {
            "lifestyle": recs_lifestyle,
            "psychotherapy": recs_psychotherapy,
            "medication": recs_medication,
        },
        "follow_up": follow_up,
        "doctor_review": {
            "status": "pending",
            "doctor_name": None,
            "reviewed_at": None,
            "comment": None,
        },
    }
