"""对话管理服务 — 三层意图体系 + Empathic Voice Skill + Severity Assessor + 统一 Pipeline

流程:
    用户消息
    → 层1: Intent Classifier 前置路由（危机/闲聊/咨询 → 快捷通道）
    → 层2: Voice Skill 多轮共情对话（intent+emotion 双维策略）
    → 核心字段齐全 → 层3: Intent Guardrail 意图护栏
    → Severity Assessor 五维度评分 + 信息充分性评估
    → 统一 Pipeline 诊断 → 报告分层

面试亮点:
    - 三层级联意图体系：前置路由 → 策略选择 → 诊断护栏
    - Severity Assessor：LLM 五维度连续评分替代规则引擎
    - 信息充分性评估：不是数字段，而是判临床价值
"""
from __future__ import annotations
import json
import structlog
from uuid import UUID
from sqlalchemy.orm import Session
from langgraph.checkpoint.memory import MemorySaver
from langchain_openai import ChatOpenAI
from ..config.settings import get_settings
from ..db.models import Conversation, Message, DiagnosisResult, Report
from ..graph.pipeline_compiler import build_unified_pipeline
from ..services.report_service import build_report_content
from ..services.intent_service import classify_intent
from ..services.severity_assessor import assess_severity, SeverityResult
from ..skills.empathic_voice import EmpathicVoiceSkill, ConversationState

logger = structlog.get_logger(__name__)

_settings = get_settings()
_llm_instance: ChatOpenAI | None = None


def _get_llm() -> ChatOpenAI:
    """获取 LLM 实例"""
    global _llm_instance
    if _llm_instance is None:
        _llm_instance = ChatOpenAI(
            model=_settings.openai_model,
            api_key=_settings.openai_api_key,
            base_url=_settings.openai_base_url,
            temperature=0.3,
            max_tokens=512,
        )
    return _llm_instance


async def process_user_message(
    conversation_id: str | None,
    content: str,
    user_id: UUID,
    db: Session,
) -> dict:
    """
    处理用户消息的主入口。

    返回格式:
        {
            "conversation_id": str,
            "reply": {"content": str, "type": str, ...},
            "stage": str,
            "is_diagnosis_ready": bool,
            "intent": str,
        }
    """
    # ---- 0. 层1: 意图前置路由 ----
    intent_result = classify_intent(content)
    intent = intent_result.get("intent", "倾诉")
    logger.info("chat_service.intent_routed", intent=intent)

    # 危机 → 直接快捷通道
    if intent == "危机":
        result = _handle_crisis_channel(content, conversation_id, user_id, db, intent_result)
        # ---- 安全告警：异步发射危机通知（不阻塞主流程）----
        import asyncio
        from .crisis_alert import send_crisis_alert
        conv_id = result.get("conversation_id", "")
        triggered = intent_result.get("risk_flags", [])
        asyncio.create_task(send_crisis_alert(conv_id, content, triggered_keywords=triggered, user_id=str(user_id)))
        return result

    # 闲聊/咨询 → 轻量回复通道
    if intent in ("闲聊", "咨询"):
        return _handle_trivial_channel(content, conversation_id, user_id, db, intent, intent_result)

    # 拒绝 → 温和退出口
    if intent == "拒绝":
        return _handle_refusal_channel(content, conversation_id, user_id, db)

    # ---- 1. 获取或创建会话 ----
    if conversation_id:
        conv = db.query(Conversation).filter(
            Conversation.id == conversation_id,
            Conversation.user_id == user_id,
        ).first()
        if not conv:
            raise ValueError("会话不存在")
        if conv.status in ("completed", "awaiting_review"):
            raise ValueError("会话已结束，请开始新的对话")
    else:
        conv = Conversation(user_id=user_id, status="active", stage="guiding")
        db.add(conv)
        db.commit()
        db.refresh(conv)

    # ---- 2. 保存用户消息 ----
    user_msg = Message(
        conversation_id=conv.id, sender_type="user", content=content,
    )
    db.add(user_msg)
    db.commit()

    # ---- 3. 恢复或创建 Voice Skill 状态 ----
    if conv.voice_state and isinstance(conv.voice_state, dict):
        state = ConversationState.from_dict(conv.voice_state)
    else:
        state = ConversationState()

    # ---- 4. 注入当前意图 → Voice Skill（层2：intent+emotion 双维策略） ----
    state.current_intent = intent

    # ---- 5. 调用 Voice Skill ----
    skill = EmpathicVoiceSkill(llm=_get_llm())
    voice_resp = await skill.process_message(content, state)

    # ---- 6. 持久化 Voice State ----
    conv.stage = voice_resp.stage
    conv.voice_state = state.to_dict()
    db.commit()

    # ---- 7. 保存 AI 回复 ----
    ai_msg = Message(
        conversation_id=conv.id, sender_type="ai",
        content=voice_resp.message,
        metadata_={
            "stage": voice_resp.stage,
            "emotion": voice_resp.current_emotion,
            "intent": intent,
        },
    )
    db.add(ai_msg)
    db.commit()

    # ---- 8. 核心字段齐全 → 层3: 意图护栏 → 严重度评估 → 诊断 ----
    if voice_resp.is_diagnosis_ready:
        return await _run_diagnosis_flow(conv, state, voice_resp, db)

    # ---- 9. 还在对话中 → 返回共情回复 ----
    return {
        "conversation_id": str(conv.id),
        "reply": {"content": voice_resp.message, "type": "text"},
        "stage": voice_resp.stage,
        "is_diagnosis_ready": False,
        "intent": intent,
    }


# =============================================================================
# 层1: 前置路由快捷通道
# =============================================================================

def _handle_crisis_channel(
    content: str, conversation_id: str | None, user_id: UUID, db: Session, intent_result: dict,
) -> dict:
    """危机通道：跳过 Voice Skill，直接危机干预"""
    conv = _get_or_create_conversation(conversation_id, user_id, db)

    user_msg = Message(conversation_id=conv.id, sender_type="user", content=content)
    db.add(user_msg)

    reply_text = (
        "我能感受到你现在的状态很不好。如果你有伤害自己的想法，请务必记住："
        "你不是一个人在面对这些。\n\n"
        "请立即拨打 12355（24小时免费心理援助热线），或者联系你身边可以信任的人。\n\n"
        "我在这里陪着你，但关于你的安全，专业的人能给你更好的帮助。"
    )
    ai_msg = Message(
        conversation_id=conv.id, sender_type="ai", content=reply_text,
        metadata_={"stage": "crisis", "intent": "危机"},
    )
    db.add(ai_msg)
    conv.status = "completed"
    conv.stage = "completed"
    conv.severity_level = "L4"
    db.commit()

    return {
        "conversation_id": str(conv.id),
        "reply": {"content": reply_text, "type": "text"},
        "stage": "crisis",
        "is_diagnosis_ready": False,
        "intent": "危机",
    }


def _handle_trivial_channel(
    content: str, conversation_id: str | None, user_id: UUID, db: Session,
    intent: str, intent_result: dict,
) -> dict:
    """闲聊/咨询通道：轻量回复，不触发 Voice Skill 和诊断"""
    conv = _get_or_create_conversation(conversation_id, user_id, db)

    user_msg = Message(conversation_id=conv.id, sender_type="user", content=content)
    db.add(user_msg)

    if intent == "咨询":
        reply_text = "你提的问题可能涉及专业领域。如果你需要了解更多心理健康相关知识，我会尽力回答。或者你也可以跟我说说你现在的感受。"
    else:
        reply_text = "你好呀。如果你想聊聊最近的心情或者遇到的事情，我随时在这里。"
    ai_msg = Message(
        conversation_id=conv.id, sender_type="ai", content=reply_text,
        metadata_={"stage": "guiding", "intent": intent},
    )
    db.add(ai_msg)
    conv.stage = "guiding"
    db.commit()

    return {
        "conversation_id": str(conv.id),
        "reply": {"content": reply_text, "type": "text"},
        "stage": "guiding",
        "is_diagnosis_ready": False,
        "intent": intent,
    }


def _handle_refusal_channel(
    content: str, conversation_id: str | None, user_id: UUID, db: Session,
) -> dict:
    """拒绝通道：温和退出，不追问"""
    conv = _get_or_create_conversation(conversation_id, user_id, db)

    user_msg = Message(conversation_id=conv.id, sender_type="user", content=content)
    db.add(user_msg)

    reply_text = "没关系。什么时候你想说了，我都在这里。不着急。"
    ai_msg = Message(
        conversation_id=conv.id, sender_type="ai", content=reply_text,
        metadata_={"stage": "guiding", "intent": "拒绝"},
    )
    db.add(ai_msg)
    conv.stage = "guiding"
    db.commit()

    return {
        "conversation_id": str(conv.id),
        "reply": {"content": reply_text, "type": "text"},
        "stage": "guiding",
        "is_diagnosis_ready": False,
        "intent": "拒绝",
    }


def _get_or_create_conversation(
    conversation_id: str | None, user_id: UUID, db: Session,
) -> Conversation:
    """获取或创建会话"""
    if conversation_id:
        conv = db.query(Conversation).filter(
            Conversation.id == conversation_id,
            Conversation.user_id == user_id,
        ).first()
        if conv:
            return conv
        raise ValueError("会话不存在")
    conv = Conversation(user_id=user_id, status="active", stage="guiding")
    db.add(conv)
    db.commit()
    db.refresh(conv)
    return conv


# =============================================================================
# 诊断流程：意图护栏 → Severity Assessor → 统一 Pipeline
# =============================================================================

async def _run_diagnosis_flow(
    conv: Conversation,
    state: ConversationState,
    voice_resp,
    db: Session,
) -> dict:
    """核心字段齐全后的完整诊断流程

    1. 层3: Intent Guardrail — 意图一致性校验
    2. Severity Assessor — 五维度评分 + 信息充分性评估
    3. insufficient → 返回追问，继续对话
    4. sufficient → 统一 Pipeline 诊断
    """
    patient_info = dict(voice_resp.patient_info) if voice_resp.patient_info else {}

    # ---- 层3: 意图护栏 ----
    full_intent = classify_intent(
        "", conversation_history=state.conversation_history,
    )
    if full_intent.get("intent") == "倾诉":
        # 用户全程倾诉，先确认意愿
        guardrail_reply = (
            "聊了这么多，我大概了解了你的情况。"
            "需要我帮你整理一下，看看接下来怎么办吗？"
        )
        ai_msg = Message(
            conversation_id=conv.id, sender_type="ai",
            content=guardrail_reply,
            metadata_={"stage": "diagnosis_pending", "intent": "倾诉", "guardrail": True},
        )
        db.add(ai_msg)
        db.commit()
        return {
            "conversation_id": str(conv.id),
            "reply": {"content": guardrail_reply, "type": "text"},
            "stage": "diagnosis_pending",
            "is_diagnosis_ready": False,
            "intent": "倾诉",
            "guardrail_triggered": True,
        }

    # ---- Severity Assessor: 五维度评分 + 信息充分性评估 ----
    severity_result = assess_severity(patient_info, state.conversation_history)
    logger.info(
        "chat_service.severity_assessed",
        severity=severity_result.severity_level,
        score=severity_result.severity_score,
        info_sufficiency=severity_result.information_sufficiency,
        gaps=len(severity_result.information_gaps),
    )

    # ---- 信息不充分 → 返回追问，不进入诊断 ----
    if severity_result.information_sufficiency == "insufficient" and state.assessor_retries < 2:
        state.assessor_retries += 1
        state.missing_clues = [
            {"gap_type": g.gap_type, "missing_detail": g.missing_detail, "why_matters": g.why_matters}
            for g in severity_result.information_gaps[:3]
        ]
        conv.voice_state = state.to_dict()
        conv.stage = "guiding"
        # 重新走 Voice Skill 生成含精准追问的回复
        skill = EmpathicVoiceSkill(llm=_get_llm())
        inquiry_voice = await skill.process_message(
            "[系统提示：根据评估结果，还需进一步了解以下信息。请自然地追问。]", state,
        )
        ai_msg = Message(
            conversation_id=conv.id, sender_type="ai",
            content=inquiry_voice.message,
            metadata_={
                "stage": "guiding",
                "intent": state.current_intent,
                "assessor_retry": state.assessor_retries,
                "missing_clues": state.missing_clues,
            },
        )
        db.add(ai_msg)
        conv.voice_state = state.to_dict()
        db.commit()
        return {
            "conversation_id": str(conv.id),
            "reply": {"content": inquiry_voice.message, "type": "text"},
            "stage": "guiding",
            "is_diagnosis_ready": False,
            "intent": state.current_intent,
            "assessor_info": {"sufficiency": "insufficient", "retries": state.assessor_retries},
        }

    # ---- 信息充分 → 进入统一 Pipeline 诊断 ----
    severity_level = severity_result.severity_level
    return await _execute_unified_pipeline(
        conv=conv, state=state, patient_info=patient_info,
        severity_level=severity_level, severity_score=severity_result.severity_score,
        db=db,
    )


async def _execute_unified_pipeline(
    conv: Conversation,
    state: ConversationState,
    patient_info: dict,
    severity_level: str,
    severity_score: float,
    db: Session,
) -> dict:
    """执行统一 Pipeline 诊断 + 报告生成"""
    patient_info = dict(patient_info) if patient_info else {}

    # 构造 raw_input
    raw_input = ""
    if state.conversation_history:
        user_msgs = [m["content"] for m in state.conversation_history if m["role"] == "user"]
        raw_input = user_msgs[-1] if user_msgs else ""

    # 确保 symptoms 是 list[dict]
    symptoms = patient_info.get("symptoms", [])
    if isinstance(symptoms, str):
        symptoms = [{"name": symptoms, "severity": "moderate"}]
    elif isinstance(symptoms, list):
        symptoms = [
            s if isinstance(s, dict) else {"name": str(s), "severity": "moderate"}
            for s in symptoms
        ]
    else:
        symptoms = []
    patient_info["symptoms"] = symptoms

    # 执行统一 Pipeline
    pipeline = build_unified_pipeline()
    try:
        pipeline_result = pipeline.invoke(
            {
                "raw_input": raw_input,
                "patient_info": patient_info,
                "triggered_route": severity_level,
                "conversation_history": state.conversation_history,
            },
            config={"configurable": {"thread_id": str(conv.id)}},
        )
        diagnosis_result = pipeline_result.get("diagnosis", {}) or {}
        treatment_result = pipeline_result.get("treatment_plan", {}) or {}
    except Exception as e:
        logger.error("pipeline_execution_error", error=str(e), severity=severity_level)
        diagnosis_result = {
            "agent_type": severity_level,
            "primary_diagnosis": {
                "disease_name": "评估中",
                "icd_code": "",
                "confidence": 0.5,
                "evidence": ["系统评估中"],
            },
        }
        treatment_result = {
            "diagnosis_addressed": "评估中",
            "lifestyle_recommendations": ["建议保持规律作息和健康生活方式"],
            "follow_up_plan": "建议进一步评估",
        }

    # 根据严重度生成 AI 结语
    reply_text = _build_closing_by_severity(severity_level, diagnosis_result, treatment_result)
    ai_msg = Message(
        conversation_id=conv.id, sender_type="ai",
        content=reply_text,
        metadata_={
            "stage": "completed",
            "severity": severity_level,
            "severity_score": severity_score,
            "diagnosis": diagnosis_result,
            "treatment": treatment_result,
            "has_report": True,
        },
    )
    db.add(ai_msg)
    db.commit()

    # 保存 DiagnosisResult
    diag_record = DiagnosisResult(
        conversation_id=conv.id,
        severity_level={"mild": "L1", "moderate": "L2", "severe": "L3"}.get(severity_level, "L1"),
        agent_type=severity_level,
        primary_diagnosis=diagnosis_result.get("primary_diagnosis", {}) if isinstance(diagnosis_result, dict) else {},
        differential_list=diagnosis_result.get("differential_list", []) if isinstance(diagnosis_result, dict) else [],
        clinical_notes=diagnosis_result.get("conclusion", "") if isinstance(diagnosis_result, dict) else "",
    )
    db.add(diag_record)
    db.commit()
    db.refresh(diag_record)

    # 生成 Report
    route_severity = {"mild": "L1", "moderate": "L2", "severe": "L3"}.get(severity_level, "L1")
    report_content = build_report_content(
        patient_info=patient_info,
        diagnosis=diagnosis_result,
        treatment_plan=treatment_result,
        severity_level=route_severity,
        triggered_route=severity_level,
    )
    report = Report(
        conversation_id=conv.id,
        user_id=conv.user_id,
        report_type={"mild": "mild", "moderate": "moderate", "severe": "severe"}.get(severity_level, "mild"),
        status="pending_review",
        content=report_content,
    )
    db.add(report)
    conv.status = "awaiting_review"
    conv.stage = "completed"
    conv.severity_level = route_severity
    conv.voice_state = state.to_dict()
    db.commit()

    return {
        "conversation_id": str(conv.id),
        "reply": {
            "content": reply_text,
            "type": "text",
            "diagnosis": diagnosis_result,
            "treatment": treatment_result,
            "has_report": True,
            "report_id": str(report.id),
        },
        "stage": "completed",
        "severity": severity_level,
        "severity_score": severity_score,
        "is_diagnosis_ready": True,
    }


def _build_closing_by_severity(severity: str, diagnosis: dict, treatment: dict) -> str:
    """根据严重度生成不同的结语"""
    primary = diagnosis.get("primary_diagnosis", {}) if isinstance(diagnosis, dict) else {}
    disease_name = primary.get("disease_name", "情绪困扰") if isinstance(primary, dict) else "情绪困扰"

    if severity == "mild":
        self_help = treatment.get("self_help_techniques", []) if isinstance(treatment, dict) else []
        technique_names = [t.get("name", "") for t in self_help if isinstance(t, dict)]
        tip_text = f"你可以试试{'、'.join(technique_names[:2])}" if technique_names else "建议你保持规律作息、适当运动、与亲友交流"
        return (
            f"感谢你跟我聊了这么多。根据我们的对话，你目前的情况属于轻度范畴。"
            f"这不是什么严重的问题，更像是在提醒你需要停下来照顾一下自己了。\n\n"
            f"{tip_text}。这些不是'任务'，是你可以随时取用的工具。"
            f"如果过一两周感觉没什么变化，或者变得更糟了，再回来找我，好吗？"
        )
    elif severity == "moderate":
        differentials = diagnosis.get("differential_list", []) if isinstance(diagnosis, dict) else []
        diff_text = ""
        if differentials:
            diff_name = differentials[0].get("disease_name", "") if isinstance(differentials[0], dict) else ""
            if diff_name:
                diff_text = f"同时也不能排除{diff_name}的可能。"
        medical = treatment.get("medical_referral", "建议前往医院精神科就诊") if isinstance(treatment, dict) else "建议前往医院精神科就诊"
        return (
            f"谢谢你让我了解了这么多。我想认真跟你说一下我目前看到的情况。\n\n"
            f"你描述的状态已经持续了一段时间，也对你的生活产生了实际影响。"
            f"根据评估，这比较接近'{disease_name}'。{diff_text}\n\n"
            f"这不需要慌张。很多人都在类似的阶段得到过帮助并走了出来。"
            f"我建议你可以考虑{medical}，让专业的人帮你做一次更全面的评估。\n\n"
            f"我已经为你整理了一份报告草稿，里面有我们的对话摘要和具体建议。"
            f"如果医生那边给出反馈，我会通知你。"
        )
    else:
        return (
            f"我跟你的这段对话让我有些担心。不是那种'你完了'的担心——"
            f"而是'你承受的比我一开始以为的要重'的担心。\n\n"
            f"根据我的评估，你的情况已经达到了需要专业干预的程度（{disease_name}）。"
            f"这听起来可能有点吓人，但请你理解：这不是对你的评判，而是对你正在承受的东西的承认。\n\n"
            f"我已经为你生成了一份详细的评估报告，接下来的步骤是让戴医生来审核。"
            f"他会根据你的具体情况给出下一步的建议。请等我一下，好吗？\n\n"
            f"如果你在等待期间感到特别难受，请记住可以随时拨打 12355（24小时免费心理援助热线），"
            f"或者让我帮你联系戴医生。你不是一个人在面对这些。"
        )
