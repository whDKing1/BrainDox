"""
API route definitions.

Endpoints:
  POST /api/v1/clinical/analyze_form       — 表单提交，运行Pipeline（HITL诊断选择）
  POST /api/v1/clinical/confirm_diagnosis  — 医生确认选择的诊断，恢复Pipeline
  POST /api/v1/clinical/icd10/search       — 搜索ICD-10编码
  GET  /api/v1/clinical/icd10/{code}       — 查询ICD-10编码
  POST /api/v1/clinical/ddi/check          — 药物交互检查
"""

from __future__ import annotations
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from ..graph.pipeline_compiler import compile_pipeline, build_new_visit_from_form
from ..services.icd10_service import search_icd10_by_text, lookup_icd10, get_drg_group
from ..services.drug_interaction import check_interactions

router = APIRouter(tags=["Clinical Decision"])

# Pipeline 实例缓存（按 thread_id），用于 HITL 恢复
_pipeline_instances: dict[str, object] = {}


# =============================================================================
# Request / Response 模型
# =============================================================================

class AnalyzeRequest(BaseModel):
    patient_description: str = Field(
        ...,
        min_length=2,
        description="精神科临床速记",
    )
    scenario: str = Field(
        default="new_visit",
        description="new_visit=初诊, followup=复诊",
    )
    human_loop: bool = Field(
        default=False,
        description="是否启用Human-in-the-Loop诊断审核",
    )
    thread_id: str = Field(default="default", description="会话线程ID")


class AnalyzeResponse(BaseModel):
    scenario: str = Field(description="执行的场景")
    patient_info: dict | None = None
    diagnosis: dict | None = None
    treatment_plan: dict | None = None
    coding_result: dict | None = None
    audit_result: dict | None = None
    needs_more_info: bool = Field(default=False, description="诊断判定信息不足，需医生补充后重新提交")
    retry_count: int = Field(default=0, description="当前已重试次数（达上限后强制继续）")
    candidate_diseases: list[dict] = Field(default_factory=list, description="GraphRAG top3 候选疾病（含图路径）")
    human_review_status: str = Field(default="none", description="HITL 状态")
    selected_disease: str = Field(default="", description="医生选择的诊断")
    errors: list[str] = Field(default_factory=list)


class ICD10SearchRequest(BaseModel):
    query: str = Field(..., min_length=2)


class DDICheckRequest(BaseModel):
    new_drugs: list[str] = Field(..., min_length=1)
    current_drugs: list[str] = Field(default_factory=list)


# =============================================================================
# 表单提交模型 — 前端表单直接提交结构化数据
# =============================================================================
class FormAnalyzeRequest(BaseModel):
    chief_complaint: str = Field(..., min_length=2, description="主诉（必填）")
    symptoms: str = Field(..., min_length=1, description="症状名称，逗号分隔（必填）")
    suicide_risk: str = Field(..., description="自杀风险评估（必填）")
    substance_use: str = Field(..., description="物质使用史（必填）")
    name: str = Field(default="未填", description="患者姓名（选填）")
    age: int = Field(default=0, description="年龄（选填）")
    gender: str = Field(default="未知", description="性别（选填）")
    medical_history: str = Field(default="", description="既往病史，逗号分隔（选填）")
    family_history: str = Field(default="", description="家族史，逗号分隔（选填）")
    scenario: str = Field(default="new_visit", description="new_visit=初诊, followup=复诊")
    thread_id: str = Field(default="default", description="会话线程ID")


class ConfirmDiagnosisRequest(BaseModel):
    thread_id: str = Field(..., description="要恢复的会话线程ID")
    selected_disease: str = Field(..., min_length=1, description="医生选择的诊断疾病名称")


def build_patient_info_from_form(req: FormAnalyzeRequest) -> dict:
    """
    纯规则引擎：将前端表单数据构造为 patient_info 字典。
    不调用 LLM，确定性转换。

    返回的字典结构与 Intake Agent 产出兼容，下游 Diagnosis Agent 无感知差异。
    """
    symptom_list = [
        {"name": s.strip(), "duration_days": None, "severity": "moderate", "description": ""}
        for s in req.symptoms.split(",") if s.strip()
    ]

    medical_list = [m.strip() for m in req.medical_history.split(",") if m.strip()] if req.medical_history else []
    family_list = [f.strip() for f in req.family_history.split(",") if f.strip()] if req.family_history else []

    gender = req.gender.strip().lower()
    if gender in ("女", "女性", "female"):
        gender = "female"
    elif gender in ("男", "男性", "male"):
        gender = "male"
    else:
        gender = "unknown"

    return {
        "name": req.name.strip() or "未填",
        "age": req.age or 0,
        "gender": gender,
        "chief_complaint": req.chief_complaint.strip(),
        "symptoms": symptom_list,
        "medical_history": medical_list,
        "family_history": family_list,
        "allergies": [],
        "current_medications": [],
        "vital_signs": None,
        "lab_results": [],
        "mental_status_exam": {
            "appearance_and_behavior": "",
            "speech": "",
            "mood": "",
            "affect": "",
            "thought_process": "",
            "thought_content": "",
            "perception": "",
            "cognition": "",
            "insight": "",
            "judgment": "",
            "suicide_risk": req.suicide_risk.strip(),
            "homicide_risk": "",
            "substance_use": req.substance_use.strip(),
            "scale_scores": {},
        },
        "neuro_imaging": [],
    }


# =============================================================================
# 临床分析端点 — 主入口
# =============================================================================
@router.post("/clinical/analyze", response_model=AnalyzeResponse)
async def analyze_patient(req: AnalyzeRequest):
    """
    精神科临床决策分析主入口。

    医生选择初诊/复诊后直接执行对应Pipeline：
      初诊：Intake → Diagnosis → Treatment → Coding → Audit
      复诊：FollowupIntake → Treatment → Coding → Audit
    """
    try:
        pipeline = compile_pipeline(req.scenario, human_loop=req.human_loop)
        result = pipeline.invoke(
            {
                "raw_input": req.patient_description,
                "scenario": req.scenario,
            },
            config={"configurable": {"thread_id": req.thread_id}},
        )
        return AnalyzeResponse(
            scenario=req.scenario,
            patient_info=result.get("patient_info"),
            diagnosis=result.get("diagnosis"),
            treatment_plan=result.get("treatment_plan"),
            coding_result=result.get("coding_result"),
            audit_result=result.get("audit_result"),
            needs_more_info=result.get("needs_more_info", False),
            retry_count=result.get("diagnosis_retry_count", 0),
            errors=result.get("errors", []),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline error: {str(e)}")


@router.post("/clinical/analyze_form", response_model=AnalyzeResponse)
async def analyze_patient_form(req: FormAnalyzeRequest):
    """
    精神科临床决策分析 — 表单模式。

    医生在前端填写结构化表单，后端规则引擎构造 patient_info，
    跳过 Intake Agent，直接进入 SufficiencyCheck → Diagnosis → (HITL暂停) 链路。

    Pipeline 在 Diagnosis 后自动暂停（interrupt_before=["treatment"]），
    等待医生从 3 个候选诊断中选择。
    """
    try:
        patient_info = build_patient_info_from_form(req)
        pipeline = build_new_visit_from_form()
        _pipeline_instances[req.thread_id] = pipeline
        result = pipeline.invoke(
            {
                "patient_info": patient_info,
                "scenario": req.scenario,
            },
            config={"configurable": {"thread_id": req.thread_id}},
        )
        return AnalyzeResponse(
            scenario=req.scenario,
            patient_info=result.get("patient_info"),
            diagnosis=result.get("diagnosis"),
            treatment_plan=result.get("treatment_plan"),
            coding_result=result.get("coding_result"),
            audit_result=result.get("audit_result"),
            needs_more_info=result.get("needs_more_info", False),
            retry_count=result.get("diagnosis_retry_count", 0),
            candidate_diseases=result.get("candidate_diseases", []),
            human_review_status=result.get("human_review_status", "none"),
            selected_disease=result.get("selected_disease", ""),
            errors=result.get("errors", []),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline error: {str(e)}")


@router.post("/clinical/confirm_diagnosis", response_model=AnalyzeResponse)
async def confirm_diagnosis(req: ConfirmDiagnosisRequest):
    """
    医生确认选择的诊断，恢复 Pipeline 继续执行 Treatment → Coding → Audit。

    Pipeline 在 Diagnosis 后暂停（human_review_status=awaiting_diagnosis），
    医生在前端选择候选诊断后调用此端点：
      1. 设置 selected_disease 和 human_review_status=diagnosis_selected
      2. 恢复 Pipeline 执行
      3. 返回完整的 Treatment/Coding/Audit 结果
    """
    pipeline = _pipeline_instances.get(req.thread_id)
    if not pipeline:
        raise HTTPException(status_code=404, detail=f"No active pipeline for thread {req.thread_id}")

    config = {"configurable": {"thread_id": req.thread_id}}
    try:
        pipeline.update_state(config, {
            "selected_disease": req.selected_disease,
            "human_review_status": "diagnosis_selected",
        })
        result = pipeline.invoke(None, config=config)
        return AnalyzeResponse(
            scenario=result.get("scenario", "new_visit"),
            patient_info=result.get("patient_info"),
            diagnosis=result.get("diagnosis"),
            treatment_plan=result.get("treatment_plan"),
            coding_result=result.get("coding_result"),
            audit_result=result.get("audit_result"),
            needs_more_info=result.get("needs_more_info", False),
            retry_count=result.get("diagnosis_retry_count", 0),
            candidate_diseases=result.get("candidate_diseases", []),
            human_review_status=result.get("human_review_status", "none"),
            selected_disease=result.get("selected_disease", ""),
            errors=result.get("errors", []),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline resume error: {str(e)}")


# =============================================================================
# ICD-10 查询端点
# =============================================================================
@router.post("/clinical/icd10/search")
async def search_icd10(req: ICD10SearchRequest):
    """按文本描述搜索ICD-10编码。"""
    results = search_icd10_by_text(req.query)
    return {"query": req.query, "results": results, "count": len(results)}


@router.get("/clinical/icd10/{code}")
async def get_icd10(code: str):
    """查询指定ICD-10编码。"""
    result = lookup_icd10(code)
    if not result:
        raise HTTPException(status_code=404, detail=f"ICD-10 code {code} not found")
    drg = get_drg_group(code)
    return {"icd10": result, "drg_group": drg}


# =============================================================================
# 药物交互查询端点
# =============================================================================
@router.post("/clinical/ddi/check")
async def check_ddi(req: DDICheckRequest):
    """检查精神科药物交互。"""
    interactions = check_interactions(req.new_drugs, req.current_drugs)
    return {
        "new_drugs": req.new_drugs,
        "current_drugs": req.current_drugs,
        "interactions": interactions,
        "interaction_count": len(interactions),
        "has_major_interaction": any(
            i["severity"] in ("major", "contraindicated") for i in interactions
        ),
    }
