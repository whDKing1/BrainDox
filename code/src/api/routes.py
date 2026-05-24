"""
API route definitions.

Endpoints:
  POST /api/v1/clinical/analyze          — Run full pipeline on raw patient text
  POST /api/v1/clinical/analyze/human-loop — Run pipeline with Human-in-the-loop (pauses after Diagnosis)
  GET  /api/v1/clinical/session/{id}/review — Get pending review state for a session
  POST /api/v1/clinical/session/{id}/approve — Doctor approves diagnosis, resumes pipeline
  POST /api/v1/clinical/session/{id}/reject  — Doctor modifies diagnosis, resumes pipeline
  POST /api/v1/clinical/intake           — Run intake agent only
  GET  /api/v1/clinical/icd10            — Search ICD-10 codes
  GET  /api/v1/clinical/ddi              — Check drug interactions
"""

from __future__ import annotations
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from ..graph.clinical_pipeline import get_pipeline, get_pipeline_with_human_loop
from ..services.icd10_service import search_icd10_by_text, lookup_icd10, get_drg_group
from ..services.drug_interaction import check_interactions

router = APIRouter(tags=["Clinical Decision"])


# ---- Request / Response models ----

class AnalyzeRequest(BaseModel):
    patient_description: str = Field(
        ...,
        min_length=2,
        description="Minimal clinical shorthand or full patient narrative",
        examples=[
            "65M, S L weakness 2h, GCS14 E4V4M6, R gaze, L facial droop UMN type, "
            "LUE 2/5 LLE 3/5, L Babinski+, L hemisensory loss, BP178/95 HR88. "
            "AF+HTN h/o. Meds: warfarin 5mg qd, amlodipine 10mg qd. "
            "NCCT: no hemorrhage, R MCA territory early ischemic changes."
        ],
    )
    thread_id: str = Field(default="default", description="Conversation thread ID for checkpointing")


class AnalyzeResponse(BaseModel):
    patient_info: dict | None = None
    diagnosis: dict | None = None
    treatment_plan: dict | None = None
    coding_result: dict | None = None
    audit_result: dict | None = None
    errors: list[str] = Field(default_factory=list)


class ICD10SearchRequest(BaseModel):
    query: str = Field(..., min_length=2, description="Search text for ICD-10 codes")


class DDICheckRequest(BaseModel):
    new_drugs: list[str] = Field(..., min_length=1, description="Drugs to be prescribed")
    current_drugs: list[str] = Field(default_factory=list, description="Patient's current medications")


# ---- Human-in-the-loop request / response models ----

class HumanLoopAnalyzeRequest(BaseModel):
    patient_description: str = Field(
        ...,
        min_length=2,
        description="Minimal clinical shorthand or full patient narrative",
    )
    thread_id: str = Field(
        default="default",
        description="Conversation thread ID for checkpointing and review",
    )


class HumanLoopPendingResponse(BaseModel):
    thread_id: str
    status: str = Field(description="Always 'pending' when review is needed")
    patient_info: dict | None = None
    diagnosis: dict | None = None
    message: str = Field(
        default="Diagnosis is ready for review. Please approve or reject.",
    )


class ReviewActionRequest(BaseModel):
    thread_id: str = Field(..., description="Session thread ID to act on")
    comment: str | None = Field(
        default=None,
        description="Doctor's comment (audit trail, HIPAA compliance)",
    )
    corrected_diagnosis: dict | None = Field(
        default=None,
        description="Required when rejecting. The doctor's corrected diagnosis.",
    )


# ---- Endpoints ----

@router.post("/clinical/analyze", response_model=AnalyzeResponse)
async def analyze_patient(req: AnalyzeRequest):
    """
    Run the full 5-agent clinical decision pipeline.

    1. Intake Agent → structured patient info
    2. Diagnosis Agent → differential diagnosis
    3. Treatment Agent → evidence-based treatment plan
    4. Coding Agent → ICD-10 codes + DRGs
    5. Audit Agent → HIPAA compliance report
    """
    pipeline = get_pipeline()

    try:
        result = pipeline.invoke(
            {"raw_input": req.patient_description},
            config={"configurable": {"thread_id": req.thread_id}},
        )
        return AnalyzeResponse(
            patient_info=result.get("patient_info"),
            diagnosis=result.get("diagnosis"),
            treatment_plan=result.get("treatment_plan"),
            coding_result=result.get("coding_result"),
            audit_result=result.get("audit_result"),
            errors=result.get("errors", []),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline error: {str(e)}")


@router.post("/clinical/icd10/search")
async def search_icd10(req: ICD10SearchRequest):
    """Search ICD-10 codes by text description."""
    results = search_icd10_by_text(req.query)
    return {"query": req.query, "results": results, "count": len(results)}


@router.get("/clinical/icd10/{code}")
async def get_icd10(code: str):
    """Look up a specific ICD-10 code."""
    result = lookup_icd10(code)
    if not result:
        raise HTTPException(status_code=404, detail=f"ICD-10 code {code} not found")
    drg = get_drg_group(code)
    return {"icd10": result, "drg_group": drg}


@router.post("/clinical/ddi/check")
async def check_ddi(req: DDICheckRequest):
    """Check drug-drug interactions."""
    interactions = check_interactions(req.new_drugs, req.current_drugs)
    return {
        "new_drugs": req.new_drugs,
        "current_drugs": req.current_drugs,
        "interactions": interactions,
        "interaction_count": len(interactions),
        "has_major_interaction": any(i["severity"] in ("major", "contraindicated") for i in interactions),
    }


# =============================================================================
# Human-in-the-loop 端点
# =============================================================================
# 这些端点实现了"诊断→人工审核→治疗"的闭环流程。
#
# 完整调用流程（前端/客户端视角）：
#
#   1. POST /clinical/analyze/human-loop
#      → 启动 Pipeline，执行 Intake → Diagnosis，然后在 Treatment 前自动暂停。
#      → 返回 patient_info + diagnosis，human_review_status = "pending"。
#
#   2. GET /clinical/session/{thread_id}/review
#      → 医生查看待审核的诊断结果。
#      → 返回当前状态快照，包含诊断详情供医生判断。
#
#   3a. POST /clinical/session/{thread_id}/approve
#       → 医生确认诊断无误，Pipeline 从 Treatment 继续执行。
#       → 返回完整的 5-Agent 结果。
#
#   3b. POST /clinical/session/{thread_id}/reject
#       → 医生修改诊断，Pipeline 基于修正后的 diagnosis 重新执行 Treatment → Audit。
#       → 返回完整的 5-Agent 结果（diagnosis 为医生修正版）。
#
# 安全约束：
#   - approve/reject 只能在 human_review_status == "pending" 时调用。
#   - reject 必须提供 corrected_diagnosis。
#   - 所有操作通过 thread_id 隔离，不同会话互不干扰。

@router.post("/clinical/analyze/human-loop", response_model=HumanLoopPendingResponse)
async def analyze_with_human_loop(req: HumanLoopAnalyzeRequest):
    """
    启动带 Human-in-the-loop 的临床决策管道。

    Pipeline 会执行 Intake → Diagnosis，然后在 Treatment 之前自动暂停，
    等待医生审核诊断结果。此时返回的响应中只有 patient_info 和 diagnosis，
    treatment_plan / coding_result / audit_result 均为 None。

    医生审核后，需要通过 approve 或 reject 端点来恢复执行。
    """
    pipeline = get_pipeline_with_human_loop()
    config = {"configurable": {"thread_id": req.thread_id}}

    try:
        result = pipeline.invoke(
            {"raw_input": req.patient_description},
            config=config,
        )
        return HumanLoopPendingResponse(
            thread_id=req.thread_id,
            status="pending",
            patient_info=result.get("patient_info"),
            diagnosis=result.get("diagnosis"),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline error: {str(e)}")


@router.get("/clinical/session/{thread_id}/review", response_model=HumanLoopPendingResponse)
async def get_review_state(thread_id: str):
    """
    获取指定会话的待审核状态。

    医生通过此端点查看 Diagnosis Agent 生成的诊断结果，
    决定是批准还是修改。只有 human_review_status == "pending" 时才有意义。
    """
    pipeline = get_pipeline_with_human_loop()
    config = {"configurable": {"thread_id": thread_id}}

    try:
        state = pipeline.get_state(config)
        if state is None or state.values is None:
            raise HTTPException(
                status_code=404,
                detail=f"No state found for thread '{thread_id}'. "
                       f"Start a session via POST /clinical/analyze/human-loop first.",
            )

        values = state.values
        review_status = values.get("human_review_status", "none")

        if review_status != "pending":
            raise HTTPException(
                status_code=409,
                detail=f"Session '{thread_id}' is not pending review. "
                       f"Current status: '{review_status}'. "
                       f"Only 'pending' sessions can be reviewed.",
            )

        return HumanLoopPendingResponse(
            thread_id=thread_id,
            status="pending",
            patient_info=values.get("patient_info"),
            diagnosis=values.get("diagnosis"),
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get review state: {str(e)}")


@router.post("/clinical/session/{thread_id}/approve", response_model=AnalyzeResponse)
async def approve_diagnosis(thread_id: str, req: ReviewActionRequest):
    """
    医生批准诊断结果，Pipeline 从 Treatment 继续执行。

    此操作会：
      1. 验证当前状态为 pending。
      2. 将 human_review_status 更新为 "approved"。
      3. 调用 invoke(None, config) 从 Treatment 继续执行。
      4. 返回完整的 5-Agent 结果。
    """
    pipeline = get_pipeline_with_human_loop()
    config = {"configurable": {"thread_id": thread_id}}

    try:
        state = pipeline.get_state(config)
        if state is None or state.values is None:
            raise HTTPException(
                status_code=404,
                detail=f"No session found for thread '{thread_id}'.",
            )

        review_status = state.values.get("human_review_status", "none")
        if review_status != "pending":
            raise HTTPException(
                status_code=409,
                detail=f"Cannot approve: session status is '{review_status}', not 'pending'.",
            )

        pipeline.update_state(config, {
            "human_review_status": "approved",
            "human_review_comment": req.comment,
        })

        result = pipeline.invoke(None, config)
        return AnalyzeResponse(
            patient_info=result.get("patient_info"),
            diagnosis=result.get("diagnosis"),
            treatment_plan=result.get("treatment_plan"),
            coding_result=result.get("coding_result"),
            audit_result=result.get("audit_result"),
            errors=result.get("errors", []),
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Approve failed: {str(e)}")


@router.post("/clinical/session/{thread_id}/reject", response_model=AnalyzeResponse)
async def reject_diagnosis(thread_id: str, req: ReviewActionRequest):
    """
    医生修改诊断结果，Pipeline 基于修正后的诊断继续执行。

    此操作会：
      1. 验证当前状态为 pending。
      2. 验证 corrected_diagnosis 已提供。
      3. 用医生修正的诊断替换 LLM 生成的 diagnosis。
      4. 将 human_review_status 更新为 "approved"（修正即批准修正版）。
      5. 调用 invoke(None, config) 从 Treatment 继续执行。
      6. 返回完整的 5-Agent 结果（diagnosis 为医生修正版）。

    注意：这里虽然叫 "reject"，但语义是"拒绝 LLM 的诊断，用医生的诊断替代"，
    不是"拒绝整个流程"。Pipeline 仍然会继续执行 Treatment → Audit。
    """
    pipeline = get_pipeline_with_human_loop()
    config = {"configurable": {"thread_id": thread_id}}

    try:
        state = pipeline.get_state(config)
        if state is None or state.values is None:
            raise HTTPException(
                status_code=404,
                detail=f"No session found for thread '{thread_id}'.",
            )

        review_status = state.values.get("human_review_status", "none")
        if review_status != "pending":
            raise HTTPException(
                status_code=409,
                detail=f"Cannot reject: session status is '{review_status}', not 'pending'.",
            )

        if req.corrected_diagnosis is None:
            raise HTTPException(
                status_code=400,
                detail="Reject requires 'corrected_diagnosis' field with the doctor's diagnosis.",
            )

        pipeline.update_state(config, {
            "diagnosis": req.corrected_diagnosis,
            "human_review_status": "approved",
            "human_review_comment": req.comment,
        })

        result = pipeline.invoke(None, config)
        return AnalyzeResponse(
            patient_info=result.get("patient_info"),
            diagnosis=result.get("diagnosis"),
            treatment_plan=result.get("treatment_plan"),
            coding_result=result.get("coding_result"),
            audit_result=result.get("audit_result"),
            errors=result.get("errors", []),
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Reject failed: {str(e)}")
