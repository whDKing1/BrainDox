"""Application configuration loaded from environment variables."""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # LLM
    openai_api_key: str = ""
    openai_model: str = "gpt-4o-mini"
    openai_base_url: str = ""

    # PostgreSQL
    postgres_host: str = "localhost"
    postgres_port: int = 5432
    postgres_db: str = "clinical_decision"
    postgres_user: str = "postgres"
    postgres_password: str = ""

    # Neo4j
    neo4j_uri: str = "bolt://localhost:7687"
    neo4j_user: str = "neo4j"
    neo4j_password: str = ""

    # Redis
    redis_host: str = "localhost"
    redis_port: int = 6379

    # FHIR
    fhir_server_url: str = "http://localhost:8080/fhir"

    # App
    app_host: str = "0.0.0.0"
    app_port: int = 8000
    log_level: str = "INFO"

    # JWT
    jwt_secret_key: str = "braindox-jwt-secret-change-in-production"
    jwt_algorithm: str = "HS256"
    jwt_patient_expire_hours: int = 168
    jwt_doctor_expire_minutes: int = 240

    # Email (SMTP)
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_from_email: str = ""
    smtp_use_tls: bool = True

    # PDF
    pdf_storage_path: str = "./reports"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    return Settings()
