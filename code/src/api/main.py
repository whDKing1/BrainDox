"""
FastAPI application entry point.

Provides REST API for the clinical decision pipeline.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import router
from ..services.graphrag_service import get_graphrag_service


@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用生命周期：启动时连接 Neo4j，关闭时释放连接。"""
    service = get_graphrag_service()
    await service.connect()
    yield
    service.close()


app = FastAPI(
    title="Multi-Agent Clinical Decision Support System",
    description=(
        "Enterprise-grade multi-agent system for clinical decision support. "
        "Five specialized agents collaborate through a LangGraph pipeline: "
        "Intake, Diagnosis, Treatment, Coding, and Audit."
    ),
    version="1.0.0",
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

app.include_router(router, prefix="/api/v1")


@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "clinical-decision-system", "version": "1.0.0"}
