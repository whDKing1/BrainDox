"""用户认证服务 — 硬编码密码验证 + JWT"""
from datetime import datetime, timedelta, timezone
from uuid import UUID
import jwt as pyjwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from ..config.settings import get_settings
from ..db.session import SessionLocal

settings = get_settings()
security = HTTPBearer()


class SimpleUser:
    def __init__(self, id_: UUID, email: str, name: str, role: str):
        self.id = id_
        self.email = email
        self.name = name
        self.role = role
        self.is_active = True


def create_token(user_id: UUID, role: str, expire_hours: int = 168) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=expire_hours)
    payload = {"sub": str(user_id), "role": role, "exp": expire, "iat": datetime.now(timezone.utc)}
    return pyjwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def decode_token(token: str) -> dict:
    try:
        return pyjwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
    except pyjwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token 已过期")
    except pyjwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token 无效")


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> SimpleUser:
    payload = decode_token(credentials.credentials)
    user_id = payload.get("sub")
    role = payload.get("role", "patient")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token 无效")
    info = _find_user_by_id(user_id)
    if info:
        return info
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="用户不存在")


def get_current_doctor(current_user: SimpleUser = Depends(get_current_user)) -> SimpleUser:
    if current_user.role not in ("doctor", "admin"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="仅医生可执行此操作")
    return current_user


def authenticate_user(email: str, password: str) -> SimpleUser | None:
    """硬编码密码验证，DB查真实ID"""
    if email == "2669705213@qq.com" and password == "123456":
        return _resolve_user(email, "dwh", "patient")
    return None


def authenticate_doctor(email: str, password: str) -> SimpleUser | None:
    """硬编码密码验证，DB查真实ID"""
    if email == "doctor@braindox.com" and password == "123456":
        return _resolve_user(email, "戴医生", "doctor")
    return None


def find_user_info(user_id) -> SimpleUser | None:
    """按UUID查用户信息，用于报告详情展示"""
    info = _find_user_by_id(str(user_id))
    if info:
        return info
    return _find_user_by_email("2669705213@qq.com", "dwh", "patient") if str(user_id) == "00000000-0000-0000-0000-000000000001" else None


def _resolve_user(email: str, name: str, role: str) -> SimpleUser:
    """从DB按邮箱查真实ID，失败则用fallback"""
    db = SessionLocal()
    try:
        from ..db.models import User
        u = db.query(User).filter(User.email == email).first()
        if u:
            return SimpleUser(u.id, u.email, u.name, u.role)
    finally:
        db.close()
    return SimpleUser(UUID("00000000-0000-0000-0000-000000000001"), email, name, role)


def _find_user_by_id(uid: str) -> SimpleUser | None:
    """从DB按UUID查用户"""
    db = SessionLocal()
    try:
        from ..db.models import User
        from uuid import UUID
        u = db.query(User).filter(User.id == UUID(uid)).first()
        if u:
            return SimpleUser(u.id, u.email, u.name, u.role)
    finally:
        db.close()
    return None


def _find_user_by_email(email: str, name: str, role: str) -> SimpleUser | None:
    """从DB按邮箱查用户"""
    db = SessionLocal()
    try:
        from ..db.models import User
        u = db.query(User).filter(User.email == email).first()
        if u:
            return SimpleUser(u.id, u.email, u.name, u.role)
    finally:
        db.close()
    return None
