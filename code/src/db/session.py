from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from ..config.settings import get_settings

settings = get_settings()

DB_URL = (
    f"postgresql+pg8000://{settings.postgres_user}:{settings.postgres_password}"
    f"@{settings.postgres_host}:{settings.postgres_port}/{settings.postgres_db}"
)

engine = create_engine(DB_URL, pool_pre_ping=True, pool_size=10, max_overflow=20)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    from uuid import UUID
    from datetime import datetime
    Base.metadata.create_all(bind=engine)
    from .models import User
    db = SessionLocal()
    try:
        _upsert_user(db, User, "2669705213@qq.com", "dwh", "patient", datetime.now(), UUID("00000000-0000-0000-0000-000000000001"))
        _upsert_user(db, User, "doctor@braindox.com", "戴医生", "doctor", datetime.now(), UUID("00000000-0000-0000-0000-000000000002"))
        db.commit()
    finally:
        db.close()


def _upsert_user(db, model, email, name, role, now, fallback_id):
    """按邮箱查找已有用户并更新信息，不修改ID（避免FK约束冲突）。不存在则创建。"""
    existing = db.query(model).filter(model.email == email).first()
    if existing:
        existing.name = name
        existing.role = role
    else:
        db.add(model(
            id=fallback_id, email=email, password_hash="hardcoded",
            name=name, role=role, created_at=now,
        ))
