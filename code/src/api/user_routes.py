"""用户端 API — 硬编码登录/对话/报告"""
import os
import uuid
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Query, BackgroundTasks
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from sqlalchemy import desc
from ..db.session import get_db
from ..db.models import Report, Conversation, Message, EmailLog
from ..services.auth_service import (
    authenticate_user, create_token, get_current_user, get_settings, SimpleUser, find_user_info,
)
from ..services.chat_service import process_user_message
from ..services.email_service import send_report_email_async

router = APIRouter(tags=["User"])


class LoginRequest(BaseModel):
    email: str = Field(..., max_length=255)
    password: str = Field(..., min_length=1)


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


class UserProfileResponse(BaseModel):
    id: str
    email: str
    name: str
    role: str
    created_at: str


class ReportSummary(BaseModel):
    id: str
    report_type: str
    status: str
    created_at: str


class ReportListResponse(BaseModel):
    reports: list[ReportSummary]
    total: int


@router.post("/auth/login", response_model=AuthResponse)
def login(req: LoginRequest):
    user = authenticate_user(email=req.email, password=req.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="邮箱或密码错误")
    settings = get_settings()
    token = create_token(user.id, user.role, settings.jwt_patient_expire_hours)
    return AuthResponse(
        access_token=token,
        user={"id": str(user.id), "email": user.email, "name": user.name, "role": user.role},
    )


@router.get("/profile", response_model=UserProfileResponse)
def get_profile(current_user: SimpleUser = Depends(get_current_user)):
    return UserProfileResponse(
        id=str(current_user.id),
        email=current_user.email,
        name=current_user.name,
        role=current_user.role,
        created_at="2026-01-01T00:00:00",
    )


@router.get("/reports", response_model=ReportListResponse)
def get_my_reports(
    page: int = 1,
    page_size: int = 20,
    current_user: SimpleUser = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    query = db.query(Report).filter(Report.user_id == current_user.id).order_by(desc(Report.created_at))
    total = query.count()
    reports = query.offset((page - 1) * page_size).limit(page_size).all()
    return ReportListResponse(
        reports=[
            ReportSummary(
                id=str(r.id), report_type=r.report_type, status=r.status,
                created_at=r.created_at.isoformat() if r.created_at else "",
            ) for r in reports
        ],
        total=total,
    )


@router.get("/reports/{report_id}", response_model=dict)
def get_report_detail(
    report_id: str,
    current_user: SimpleUser = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    report = db.query(Report).filter(Report.id == report_id, Report.user_id == current_user.id).first()
    if not report:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="报告不存在")
    doctor_name = find_user_info(report.doctor_id).name if report.doctor_id and find_user_info(report.doctor_id) else None
    return {
        "id": str(report.id), "report_type": report.report_type, "status": report.status,
        "content": report.content, "doctor_name": doctor_name, "doctor_comment": report.doctor_comment,
        "pdf_url": report.pdf_url,
        "emailed_at": report.emailed_at.isoformat() if report.emailed_at else None,
        "created_at": report.created_at.isoformat() if report.created_at else None,
    }


@router.get("/reports/{report_id}/pdf")
def download_report_pdf(
    report_id: str,
    current_user: SimpleUser = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    report = db.query(Report).filter(Report.id == report_id, Report.user_id == current_user.id).first()
    if not report:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="报告不存在")
    if not report.pdf_url or not os.path.exists(report.pdf_url):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="PDF 文件尚未生成")
    return FileResponse(path=report.pdf_url, filename=f"report_{report_id}.pdf", media_type="application/pdf")


@router.post("/reports/{report_id}/resend-email")
def request_resend_email(
    report_id: str,
    background_tasks: BackgroundTasks,
    current_user: SimpleUser = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    report = db.query(Report).filter(Report.id == report_id, Report.user_id == current_user.id).first()
    if not report:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="报告不存在")
    if report.status != "approved":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="报告尚未审核通过")
    if not report.pdf_url or not os.path.exists(report.pdf_url):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="PDF 文件尚未生成")
    email_log = EmailLog(
        report_id=report.id, recipient_email=current_user.email, status="pending",
    )
    db.add(email_log)
    db.commit()
    background_tasks.add_task(
        _resend_email_task,
        email_log_id=str(email_log.id), recipient_email=current_user.email,
        patient_name=current_user.name, pdf_path=report.pdf_url, report_id=str(report.id),
    )
    return {"message": "邮件重发请求已提交"}


def _resend_email_task(email_log_id: str, recipient_email: str, patient_name: str, pdf_path: str, report_id: str) -> None:
    from ..db.session import SessionLocal
    import asyncio
    try:
        sent = asyncio.run(send_report_email_async(
            recipient_email=recipient_email, patient_name=patient_name,
            pdf_path=pdf_path, report_id=report_id,
        ))
    except Exception:
        sent = False
    db = SessionLocal()
    try:
        log = db.query(EmailLog).filter(EmailLog.id == email_log_id).first()
        if log:
            log.status = "sent" if sent else "failed"
            log.error_message = None if sent else "发送失败"
            log.sent_at = datetime.now() if sent else None
            db.commit()
        if sent:
            r = db.query(Report).filter(Report.id == report_id).first()
            if r:
                r.emailed_at = datetime.now()
                db.commit()
    finally:
        db.close()


class ChatSendRequest(BaseModel):
    conversation_id: str | None = Field(None, description="已有会话ID，null则创建新会话")
    content: str = Field(..., min_length=1, max_length=2000)


class ChatSendResponse(BaseModel):
    conversation_id: str
    reply: dict
    stage: str = ""
    route: str | None = None
    is_diagnosis_ready: bool = False


@router.post("/chat/send", response_model=ChatSendResponse)
async def send_message(
    req: ChatSendRequest,
    current_user: SimpleUser = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        result = await process_user_message(
            conversation_id=req.conversation_id, content=req.content,
            user_id=current_user.id, db=db,
        )
        return ChatSendResponse(
            conversation_id=result["conversation_id"],
            reply=result["reply"],
            stage=result.get("stage", ""),
            route=result.get("route"),
            is_diagnosis_ready=result.get("is_diagnosis_ready", False),
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


class MessageResponse(BaseModel):
    id: str
    sender_type: str
    content: str
    metadata: dict
    created_at: str


class ConversationResponse(BaseModel):
    id: str
    status: str
    stage: str = ""
    severity_level: str | None
    intent_category: str | None
    created_at: str
    messages: list[MessageResponse]


@router.get("/chat/history", response_model=list[ConversationResponse])
def get_chat_history(
    current_user: SimpleUser = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    conversations = (
        db.query(Conversation)
        .filter(Conversation.user_id == current_user.id)
        .order_by(desc(Conversation.created_at))
        .limit(20)
        .all()
    )
    result = []
    for conv in conversations:
        messages = db.query(Message).filter(Message.conversation_id == conv.id).order_by(Message.created_at).all()
        result.append(ConversationResponse(
            id=str(conv.id), status=conv.status, stage=conv.stage or "guiding",
            severity_level=conv.severity_level, intent_category=conv.intent_category,
            created_at=conv.created_at.isoformat() if conv.created_at else "",
            messages=[
                MessageResponse(
                    id=str(m.id), sender_type=m.sender_type, content=m.content,
                    metadata=m.metadata_ if m.metadata_ else {},
                    created_at=m.created_at.isoformat() if m.created_at else "",
                ) for m in messages
            ],
        ))
    return result
