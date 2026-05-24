"""
FastAPI application entry point.

Provides REST API for the clinical decision pipeline.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import router

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
