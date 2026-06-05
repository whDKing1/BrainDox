"""对话管理服务 — Empathic Voice Skill 编排 + Pipeline 触发 + 报告生成

流程:
    用户消息 → Voice Skill 多轮共情对话
    → 信息充足 (is_diagnosis_ready=True)
    → Pipeline 执行诊断 → 生成报告
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
from ..graph.pipeline_compiler import build_pipeline_by_route
from ..services.report_service import build_report_content
from ..skills.empathic_voice import EmpathicVoiceSkill, ConversationState

logger = structlog.get_logger(__name__)

_settings = get_settings()
_llm_instance: ChatOpenAI | None = None


def _get_llm() -> ChatOpenAI:
    """获取 LLM 实例（Voice Skill 和 Pipeline 共用）"""
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
            "route": str | None,
            "is_diagnosis_ready": bool,
        }
    """
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

    # ---- 4. 调用 Voice Skill ----
    skill = EmpathicVoiceSkill(llm=_get_llm())
    voice_resp = await skill.process_message(content, state)

    # ---- 5. 持久化 Voice State ----
    conv.stage = voice_resp.stage
    conv.voice_state = state.to_dict()
    db.commit()

    # ---- 6. 保存 AI 回复 ----
    ai_msg = Message(
        conversation_id=conv.id, sender_type="ai",
        content=voice_resp.message,
        metadata_={
            "stage": voice_resp.stage,
            "route": voice_resp.route,
            "emotion": voice_resp.current_emotion,
        },
    )
    db.add(ai_msg)
    db.commit()

    # ---- 7. 信息充足 → 进入诊断 ----
    if voice_resp.is_diagnosis_ready:
        return await _run_diagnosis_pipeline(
            conv=conv, state=state, patient_info=voice_resp.patient_info,
            route=voice_resp.route or "mild", db=db,
        )

    # ---- 8. 还在对话中 → 返回共情回复 ----
    return {
        "conversation_id": str(conv.id),
        "reply": {"content": voice_resp.message, "type": "text"},
        "stage": voice_resp.stage,
        "route": voice_resp.route,
        "is_diagnosis_ready": False,
    }


async def _run_diagnosis_pipeline(
    conv: Conversation,
    state: ConversationState,
    patient_info: dict,
    route: str,
    db: Session,
) -> dict:
    """执行诊断 Pipeline 并生成报告"""
    patient_info = dict(patient_info) if patient_info else {}

    # 构造 raw_input（取最近一条用户消息）
    raw_input = ""
    if state.conversation_history:
        user_msgs = [m["content"] for m in state.conversation_history if m["role"] == "user"]
        raw_input = user_msgs[-1] if user_msgs else ""

    # 确保 symptoms 是 list[dict] 格式
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

    # 将 Voice Skill 采集的扁平字段映射为 mental_status_exam（Pipeline 需要）
    mse = {}
    if patient_info.get("suicide_risk_screening"):
        mse["suicide_risk"] = patient_info["suicide_risk_screening"]
    if patient_info.get("substance_use"):
        mse["substance_use"] = patient_info["substance_use"]
    patient_info["mental_status_exam"] = mse

    # 构建 intent_result（兼容旧的 Pipeline 输入格式）
    severity_map = {"mild": "L1", "moderate": "L2", "severe": "L3"}
    intent_result = {
        "intent": "求助",
        "severity_level": severity_map.get(route, "L1"),
        "confidence": 0.85,
        "risk_flags": ["自杀风险"] if patient_info.get("suicide_risk_screening") == "有" else [],
        "triggered_route": route,
    }

    # ---- 执行 Pipeline ----
    pipeline = build_pipeline_by_route(route)
    try:
        pipeline_result = pipeline.invoke(
            {
                "raw_input": raw_input,
                "patient_info": patient_info,
                "intent_result": intent_result,
                "triggered_route": route,
                "conversation_history": state.conversation_history,
            },
            config={"configurable": {"thread_id": str(conv.id)}},
        )
        diagnosis_result = pipeline_result.get("diagnosis", {}) or {}
        treatment_result = pipeline_result.get("treatment_plan", {}) or {}
    except Exception as e:
        logger.error("pipeline_execution_error", error=str(e), route=route)
        diagnosis_result = {
            "agent_type": route,
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

    # ---- 生成 AI 回复 ----
    primary = diagnosis_result.get("primary_diagnosis", {}) if isinstance(diagnosis_result, dict) else {}
    disease_name = primary.get("disease_name", "") if isinstance(primary, dict) else ""
    if route == "mild":
        reply_text = _build_mild_closing(diagnosis_result, treatment_result)
    elif route == "moderate":
        reply_text = _build_moderate_closing(diagnosis_result, treatment_result)
    else:
        reply_text = _build_severe_closing(diagnosis_result, treatment_result)
    ai_msg = Message(
        conversation_id=conv.id, sender_type="ai",
        content=reply_text,
        metadata_={
            "stage": "diagnosing",
            "route": route,
            "diagnosis": diagnosis_result,
            "treatment": treatment_result,
            "has_report": True,
        },
    )
    db.add(ai_msg)
    db.commit()

    # ---- 保存 DiagnosisResult ----
    diag_record = DiagnosisResult(
        conversation_id=conv.id,
        severity_level=intent_result["severity_level"],
        agent_type=route,
        primary_diagnosis=diagnosis_result.get("primary_diagnosis", {}) if isinstance(diagnosis_result, dict) else {},
        differential_list=diagnosis_result.get("differential_list", []) if isinstance(diagnosis_result, dict) else [],
        clinical_notes=diagnosis_result.get("conclusion", "") if isinstance(diagnosis_result, dict) else "",
    )
    db.add(diag_record)
    db.commit()
    db.refresh(diag_record)

    # ---- 生成 Report ----
    report_content = build_report_content(
        patient_info=patient_info,
        diagnosis=diagnosis_result,
        treatment_plan=treatment_result,
        severity_level=intent_result["severity_level"],
        triggered_route=route,
    )
    report = Report(
        conversation_id=conv.id,
        user_id=conv.user_id,
        report_type={"mild": "mild", "moderate": "moderate", "severe": "severe"}.get(route, "mild"),
        status="pending_review",
        content=report_content,
    )
    db.add(report)
    conv.status = "awaiting_review"
    conv.stage = "completed"
    conv.severity_level = intent_result["severity_level"]
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
        "route": route,
        "is_diagnosis_ready": True,
    }


def _build_mild_closing(diagnosis: dict, treatment: dict) -> str:
    """轻度分支的结语 — 温和、鼓励、不给压力"""
    primary = diagnosis.get("primary_diagnosis", {}) if isinstance(diagnosis, dict) else {}
    disease_name = primary.get("disease_name", "轻度情绪困扰") if isinstance(primary, dict) else "轻度情绪困扰"
    self_help = treatment.get("self_help_techniques", []) if isinstance(treatment, dict) else []
    technique_names = [t.get("name", "") for t in self_help if isinstance(t, dict)]
    tip_text = f"你可以试试{'、'.join(technique_names[:2])}" if technique_names else "建议你保持规律作息、适当运动、与亲友交流"
    return (
        f"感谢你跟我聊了这么多。根据我们的对话，你目前的情况属于轻度范畴。"
        f"这不是什么严重的问题，更像是在提醒你需要停下来照顾一下自己了。\n\n"
        f"{tip_text}。这些不是'任务'，是你可以随时取用的工具。"
        f"如果过一两周感觉没什么变化，或者变得更糟了，再回来找我，好吗？"
    )


def _build_moderate_closing(diagnosis: dict, treatment: dict) -> str:
    """中度分支的结语 — 认真但不吓人"""
    primary = diagnosis.get("primary_diagnosis", {}) if isinstance(diagnosis, dict) else {}
    disease_name = primary.get("disease_name", "值得关注的情绪状态") if isinstance(primary, dict) else "值得关注的情绪状态"
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


def _build_severe_closing(diagnosis: dict, treatment: dict) -> str:
    """重度分支的结语 — 严肃但给予希望"""
    primary = diagnosis.get("primary_diagnosis", {}) if isinstance(diagnosis, dict) else {}
    disease_name = primary.get("disease_name", "需要专业干预的情况") if isinstance(primary, dict) else "需要专业干预的情况"
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
