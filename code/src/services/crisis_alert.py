"""安全告警服务 — Safety Scanner 危机事件异步通知

设计原则:
  - 告警不阻塞主流程: 用户不需要等告警发完才能收到危机干预回复
  - 多渠道降级: 企业微信 → 邮件 → CRITICAL日志
  - 含关键元数据: 对话ID/时间戳/触发关键词/内容摘要

面试可讲点: "危机场景不只是给用户回复——系统会在后台异步触发告警。
告警不阻塞主流程，用户不需要等通知发完才能收到危机干预回复。
当前通过结构化日志记录，生产环境下可接入企业微信/飞书/短信等真实通知渠道。"

使用:
    from src.services.crisis_alert import send_crisis_alert
    # 在主流程中异步发射，不等待
    asyncio.create_task(send_crisis_alert(conv_id, user_content))
"""
from __future__ import annotations
import asyncio
import structlog
from datetime import datetime, timezone

logger = structlog.get_logger(__name__)


async def send_crisis_alert(
    conversation_id: str,
    user_message: str,
    *,
    triggered_keywords: list[str] | None = None,
    user_id: str = "",
) -> None:
    """危机事件异步告警通知。

    参数:
        conversation_id: 触发危机的会话ID
        user_message: 触发危机的用户消息
        triggered_keywords: 命中的危机关键词列表
        user_id: 用户ID
    """
    try:
        summary = user_message[:200] + "..." if len(user_message) > 200 else user_message
        alert_payload = {
            "alert_type": "crisis_detected",
            "severity": "CRITICAL",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "conversation_id": conversation_id,
            "user_id": user_id,
            "triggered_keywords": triggered_keywords or [],
            "message_summary": summary,
            "action_required": "请值班医生立即介入",
        }

        # 渠道1: CRITICAL 级别结构化日志（当前实现）
        logger.critical("crisis_alert", **alert_payload)

        # 渠道2: 企业微信/飞书 Webhook（预留接口）
        # await _send_webhook(alert_payload)

        # 渠道3: 邮件通知（预留接口）
        # await _send_email_alert(alert_payload)

    except Exception as e:
        # 告警本身失败不应影响主流程
        logger.error("crisis_alert.failed", error=str(e), conversation_id=conversation_id)


async def _send_webhook(payload: dict) -> None:
    """预留：企业微信/飞书 Webhook 通知"""
    # 实现示例：
    # webhook_url = get_settings().crisis_webhook_url
    # async with httpx.AsyncClient(timeout=5) as client:
    #     await client.post(webhook_url, json=payload)
    pass


async def _send_email_alert(payload: dict) -> None:
    """预留：邮件告警通知"""
    pass
