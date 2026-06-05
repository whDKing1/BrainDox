"""
FastAPI application entry point.

Provides REST API for the clinical decision pipeline.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import router as clinical_router
from .user_routes import router as user_router
from .doctor_routes import router as doctor_router
from ..services.graphrag_service import get_graphrag_service
from ..db.session import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    try:
        service = get_graphrag_service()
        await service.connect()
        yield
        service.close()
    except Exception:
        yield


app = FastAPI(
    title="BrainDox - 心理健康智能分诊与辅助诊断系统",
    description=(
        "Enterprise-grade multi-agent system for clinical decision support. "
        "Five specialized agents collaborate through a LangGraph pipeline: "
        "Intake, Diagnosis, Treatment, Coding, and Audit."
    ),
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(clinical_router, prefix="/api/v1")
app.include_router(user_router, prefix="/api/v1")
app.include_router(doctor_router, prefix="/api/v1")


@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "braindox", "version": "2.0.0"}
