"""邮件发送服务 — SMTP 发送 + 自动重试 + 异步队列"""
from __future__ import annotations
import asyncio
import smtplib
import structlog
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.utils import formataddr
from email import encoders
from typing import Optional
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from ..config.settings import get_settings

logger = structlog.get_logger(__name__)

MAX_RETRIES = 3


def _build_message(recipient_email: str, patient_name: str, pdf_path: str, report_id: str) -> MIMEMultipart | None:
    settings = get_settings()
    msg = MIMEMultipart()
    msg["From"] = formataddr(("BrainDox 心理健康平台", settings.smtp_from_email))
    msg["To"] = recipient_email
    msg["Subject"] = f"BrainDox 心理健康评估报告（{report_id[:8].upper()}）"
    body = f"""尊敬的 {patient_name}，您好：

您的心理健康评估报告（编号：REP-{report_id[:8].upper()}）已完成医生审核，请查收附件。

本报告由 AI 辅助评估、执业医师审核确认。仅供参考，不构成正式诊断。

如有任何疑问，请咨询就诊医院的临床医生。

祝您身心健康！

BrainDox 心理健康平台
{settings.smtp_from_email}
"""
    msg.attach(MIMEText(body, "plain", "utf-8"))
    try:
        with open(pdf_path, "rb") as f:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(f.read())
            encoders.encode_base64(part)
            part.add_header("Content-Disposition", f"attachment; filename=report_{report_id}.pdf")
            msg.attach(part)
        return msg
    except FileNotFoundError:
        logger.error("pdf_file_not_found", path=pdf_path)
        return None


@retry(
    stop=stop_after_attempt(MAX_RETRIES),
    wait=wait_exponential(multiplier=2, min=2, max=30),
    retry=retry_if_exception_type((smtplib.SMTPException, ConnectionError, TimeoutError)),
    before_sleep=lambda retry_state: logger.warning(
        "email_retry", attempt=retry_state.attempt_number,
        max_attempts=MAX_RETRIES,
    ),
)
def _smtp_send(msg: MIMEMultipart, recipient_email: str) -> bool:
    settings = get_settings()
    if not settings.smtp_host:
        logger.warning("smtp_not_configured", recipient=recipient_email)
        return False
    server = smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=30)
    try:
        if settings.smtp_use_tls:
            server.starttls()
        if settings.smtp_user and settings.smtp_password:
            server.login(settings.smtp_user, settings.smtp_password)
        server.send_message(msg)
        logger.info("email_sent_success", recipient=recipient_email)
        return True
    finally:
        try:
            server.quit()
        except Exception:
            pass


def send_report_email(
    recipient_email: str,
    patient_name: str,
    pdf_path: str,
    report_id: str,
) -> bool:
    if not pdf_path:
        logger.error("email_send_failed_no_pdf", report_id=report_id)
        return False
    msg = _build_message(recipient_email, patient_name, pdf_path, report_id)
    if msg is None:
        return False
    try:
        return _smtp_send(msg, recipient_email)
    except Exception as e:
        logger.error("email_send_all_retries_failed", recipient=recipient_email, error=str(e))
        return False


async def send_report_email_async(
    recipient_email: str,
    patient_name: str,
    pdf_path: str,
    report_id: str,
) -> bool:
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(
        None,
        send_report_email,
        recipient_email,
        patient_name,
        pdf_path,
        report_id,
    )
