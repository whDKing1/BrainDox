"""
API route definitions.

Endpoints:
  POST /api/v1/clinical/icd10/search       — 搜索ICD-10编码
  GET  /api/v1/clinical/icd10/{code}       — 查询ICD-10编码
  POST /api/v1/clinical/ddi/check          — 药物交互检查
"""

from __future__ import annotations
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from ..services.icd10_service import search_icd10_by_text, lookup_icd10, get_drg_group
from ..services.drug_interaction import check_interactions

router = APIRouter(tags=["Clinical Decision"])


# =============================================================================
# Request 模型
# =============================================================================

class ICD10SearchRequest(BaseModel):
    query: str = Field(..., min_length=2)


class DDICheckRequest(BaseModel):
    new_drugs: list[str] = Field(..., min_length=1)
    current_drugs: list[str] = Field(default_factory=list)


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
