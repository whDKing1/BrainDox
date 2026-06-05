"""医生端 API — 硬编码登录/审核/统计"""
import os
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from sqlalchemy import desc
from ..db.session import get_db
from ..db.models import Report, DoctorReview, ReportFile, EmailLog
from ..services.auth_service import (
    authenticate_doctor, create_token, get_current_doctor, get_settings, SimpleUser, find_user_info,
)
from ..services.pdf_service import generate_report_pdf
from ..services.email_service import send_report_email_async

router = APIRouter(tags=["Doctor"])


class DoctorLoginRequest(BaseModel):
    email: str = Field(..., max_length=255)
    password: str = Field(..., min_length=1)


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


class ReviewRequest(BaseModel):
    report_id: str = Field(..., min_length=1)
    action: str = Field(..., pattern="^(approved|rejected|return_for_revision)$")
    comment: str = ""


class PendingReportItem(BaseModel):
    id: str
    report_type: str
    status: str
    created_at: str
    patient_name: str
    patient_email: str
    ai_summary: str


class PendingListResponse(BaseModel):
    reports: list[PendingReportItem]
    total: int


class StatsResponse(BaseModel):
    pending_count: int
    reviewed_today: int
    approval_rate: float
    total_reviewed: int


@router.post("/doctor/auth/login", response_model=AuthResponse)
def doctor_login(req: DoctorLoginRequest):
    user = authenticate_doctor(email=req.email, password=req.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="医生账号不存在或密码错误")
    settings = get_settings()
    token = create_token(user.id, user.role, settings.jwt_doctor_expire_minutes)
    return AuthResponse(
        access_token=token,
        user={"id": str(user.id), "email": user.email, "name": user.name, "role": user.role},
    )


def _get_patient_info(user_id):
    info = find_user_info(user_id)
    if info:
        return info.name, info.email
    return "未知", ""


@router.get("/doctor/reports/pending", response_model=PendingListResponse)
def get_pending_reports(
    page: int = 1,
    page_size: int = 20,
    current_user: SimpleUser = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    query = db.query(Report).filter(Report.status == "pending_review").order_by(desc(Report.created_at))
    total = query.count()
    reports = query.offset((page - 1) * page_size).limit(page_size).all()
    items = []
    for r in reports:
        pname, pemail = _get_patient_info(r.user_id)
        ai_summary = ""
        if r.content and isinstance(r.content, dict):
            diag = r.content.get("diagnosis", {})
            primary = diag.get("primary", {}) if isinstance(diag, dict) else {}
            ai_summary = primary.get("disease_name", "") if isinstance(primary, dict) else ""
        items.append(PendingReportItem(
            id=str(r.id), report_type=r.report_type, status=r.status,
            created_at=r.created_at.isoformat() if r.created_at else "",
            patient_name=pname, patient_email=pemail, ai_summary=ai_summary,
        ))
    return PendingListResponse(reports=items, total=total)


@router.get("/doctor/reports/{report_id}", response_model=dict)
def get_report_detail(
    report_id: str,
    current_user: SimpleUser = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="报告不存在")
    pname, pemail = _get_patient_info(report.user_id)
    dname = find_user_info(report.doctor_id).name if report.doctor_id and find_user_info(report.doctor_id) else None
    return {
        "id": str(report.id), "report_type": report.report_type, "status": report.status,
        "content": report.content,
        "patient": {"id": str(report.user_id), "name": pname, "email": pemail},
        "doctor_name": dname, "doctor_comment": report.doctor_comment,
        "created_at": report.created_at.isoformat() if report.created_at else None,
    }


@router.post("/doctor/reviews", status_code=status.HTTP_201_CREATED)
def submit_review(
    req: ReviewRequest,
    background_tasks: BackgroundTasks,
    current_user: SimpleUser = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    report = db.query(Report).filter(Report.id == req.report_id).first()
    if not report:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="报告不存在")
    if report.status != "pending_review":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="报告状态不是待审核")
    review = DoctorReview(
        report_id=report.id, doctor_id=current_user.id,
        action=req.action, comment=req.comment,
    )
    report.status = "approved" if req.action == "approved" else "rejected"
    report.doctor_id = current_user.id
    report.doctor_comment = req.comment
    if report.content and isinstance(report.content, dict):
        dr = report.content.get("doctor_review", {})
        if isinstance(dr, dict):
            dr["status"] = report.status
            dr["doctor_name"] = current_user.name
            from datetime import datetime
            dr["reviewed_at"] = datetime.now().isoformat()
            dr["comment"] = req.comment
            report.content["doctor_review"] = dr
    db.add(review)
    db.commit()
    db.refresh(report)
    task_id = None
    if req.action == "approved":
        pname, pemail = _get_patient_info(report.user_id)
        report_content = report.content or {}
        pdf_path = generate_report_pdf(
            report_id=str(report.id),
            content={**report_content, "status": "approved", "report_type": report.report_type},
            patient_name=pname, doctor_name=current_user.name, doctor_comment=req.comment,
        )
        report.pdf_url = pdf_path
        report_file = ReportFile(
            report_id=report.id, file_path=pdf_path,
            file_size=os.path.getsize(pdf_path) if os.path.exists(pdf_path) else 0,
        )
        db.add(report_file)
        db.commit()
        if pemail:
            import uuid as _uuid
            task_id = str(_uuid.uuid4())
            email_log = EmailLog(
                report_id=report.id, recipient_email=pemail, status="pending",
            )
            db.add(email_log)
            db.commit()
            background_tasks.add_task(
                _async_send_email,
                task_id=str(report.id), email_log_id=str(email_log.id),
                recipient_email=pemail, patient_name=pname,
                pdf_path=pdf_path, report_id=str(report.id),
            )
    return {
        "report_id": str(report.id), "status": report.status,
        "reviewed_at": review.reviewed_at.isoformat() if review.reviewed_at else None,
        "pdf_generated": report.pdf_url is not None, "task_id": task_id,
    }


def _async_send_email(task_id: str, email_log_id: str, recipient_email: str, patient_name: str, pdf_path: str, report_id: str) -> None:
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
            log.error_message = None if sent else "后台发送失败"
            log.sent_at = __import__("datetime").datetime.now() if sent else None
            db.commit()
        if sent:
            report = db.query(Report).filter(Report.id == task_id).first()
            if report:
                report.emailed_at = __import__("datetime").datetime.now()
                db.commit()
    finally:
        db.close()


@router.get("/doctor/stats", response_model=StatsResponse)
def get_stats(
    current_user: SimpleUser = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    from datetime import datetime
    today_start = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    pending_count = db.query(Report).filter(Report.status == "pending_review").count()
    reviewed_today = (
        db.query(DoctorReview)
        .filter(DoctorReview.doctor_id == current_user.id, DoctorReview.reviewed_at >= today_start)
        .count()
    )
    total_reviewed = db.query(DoctorReview).filter(DoctorReview.doctor_id == current_user.id).count()
    approved_count = db.query(DoctorReview).filter(
        DoctorReview.doctor_id == current_user.id, DoctorReview.action == "approved",
    ).count()
    approval_rate = (approved_count / total_reviewed * 100) if total_reviewed > 0 else 0.0
    return StatsResponse(
        pending_count=pending_count, reviewed_today=reviewed_today,
        approval_rate=round(approval_rate, 1), total_reviewed=total_reviewed,
    )


class EmailStatusResponse(BaseModel):
    report_id: str
    email_logs: list[dict]


@router.get("/doctor/reports/{report_id}/email-status", response_model=EmailStatusResponse)
def get_report_email_status(
    report_id: str,
    current_user: SimpleUser = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="报告不存在")
    logs = db.query(EmailLog).filter(EmailLog.report_id == report.id).order_by(desc(EmailLog.created_at)).all()
    return EmailStatusResponse(
        report_id=report_id,
        email_logs=[{
            "id": str(log.id), "recipient_email": log.recipient_email,
            "status": log.status, "error_message": log.error_message,
            "sent_at": log.sent_at.isoformat() if log.sent_at else None,
            "created_at": log.created_at.isoformat() if log.created_at else None,
        } for log in logs],
    )


class ResendEmailRequest(BaseModel):
    report_id: str = Field(..., min_length=1)


@router.post("/doctor/reports/resend-email")
def resend_report_email(
    req: ResendEmailRequest,
    background_tasks: BackgroundTasks,
    current_user: SimpleUser = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    report = db.query(Report).filter(Report.id == req.report_id).first()
    if not report:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="报告不存在")
    if report.status != "approved":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="仅已确认的报告可重发邮件")
    if not report.pdf_url or not os.path.exists(report.pdf_url):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="PDF 文件不存在，请重新生成")
    pname, pemail = _get_patient_info(report.user_id)
    if not pemail:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="患者邮箱不存在")
    import uuid as _uuid
    task_id = str(_uuid.uuid4())
    email_log = EmailLog(report_id=report.id, recipient_email=pemail, status="pending")
    db.add(email_log)
    db.commit()
    background_tasks.add_task(
        _async_send_email,
        task_id=str(report.id), email_log_id=str(email_log.id),
        recipient_email=pemail, patient_name=pname,
        pdf_path=report.pdf_url, report_id=str(report.id),
    )
    return {"task_id": task_id, "message": "邮件已加入发送队列"}
