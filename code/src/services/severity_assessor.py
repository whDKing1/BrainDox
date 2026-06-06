"""严重度评估器 — 五维度连续评分 + 信息充分性评估

职责：
  - 输入全部已采集的 patient_info 和对话摘要
  - LLM 多维度综合评分（症状负担、功能损害、风险等级、病程、生物因素）
  - 加权合成严重度分数 → mild/moderate/severe
  - 内置信息充分性评估，判断已采集信息是否足以做鉴别诊断

与 Voice Skill 的关系：
  - Voice Skill 是实时流（每条消息都跑）
  - Severity Assessor 是批处理（核心字段齐全后跑一次）
  - 两者独立，解耦"采集节奏"和"严重度判断"

使用：
    from src.services.severity_assessor import assess_severity
    result = assess_severity(patient_info, conversation_history)
    # result.severity_level → "mild" | "moderate" | "severe"
    # result.information_sufficiency → "sufficient" | "insufficient"
"""
from __future__ import annotations
import json
from dataclasses import dataclass, field
import structlog
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from ..config.settings import get_settings

logger = structlog.get_logger(__name__)

# =============================================================================
# 五维度权重（DSM-5 诊断体系对齐）
# =============================================================================
DIMENSION_WEIGHTS = {
    "symptom_burden": 0.30,        # 症状负担：数量+严重度+类型
    "functional_impairment": 0.25, # 功能损害：工作/社交/自理
    "risk_level": 0.25,             # 风险等级：自杀/自伤/伤人
    "chronicity": 0.10,             # 病程：时长+恶化趋势+复发
    "biological_factors": 0.10,     # 生物因素：病史+家族史+用药+物质
}

# 严重度阈值映射
SEVERITY_THRESHOLDS = [
    (0, 30, "mild"),
    (31, 60, "moderate"),
    (61, 100, "severe"),
]

# 边界模糊区间：分数落入此范围内降低置信度
BLUR_ZONES = [
    (27, 33),   # mild↔moderate 边界
    (57, 63),   # moderate↔severe 边界
]

# 信息充分性维度
INFORMATION_DIMENSIONS = [
    "symptom_specificity",      # 症状是否足够具体（亚型/频率/触发因素）
    "symptom_count",            # 症状数量是否支持鉴别诊断
    "negative_findings",        # 是否排除了器质性和其他常见鉴别
    "temporal_pattern",         # 时间模式是否有波动/趋势描述
    "functional_detail",        # 功能损害是否有场景和程度描述
    "discriminative_signal",    # 是否有至少1个可用于鉴别诊断的特征
]


@dataclass
class InformationGap:
    """单个信息不足项"""
    gap_type: str = ""              # symptom_lacks_specificity / missing_negative_finding 等
    current: str = ""               # 当前已有什么信息
    missing_detail: str = ""        # 缺少的具体细节
    why_matters: str = ""           # 为什么这个信息对鉴别诊断重要


@dataclass
class SeverityResult:
    """严重度评估结果"""
    severity_level: str = "mild"                # mild / moderate / severe
    severity_score: float = 0.0                 # 0-100 综合评分
    dimensional_scores: dict = field(default_factory=dict)  # 各维度分项评分
    reasoning: str = ""                         # LLM 推理简述
    confidence: float = 0.0                     # 整体置信度 0-1
    is_blur_zone: bool = False                  # 是否处于边界模糊区
    # 信息充分性
    information_sufficiency: str = "insufficient"  # sufficient / insufficient
    information_gaps: list = field(default_factory=list)  # InformationGap 列表
    minimum_clues_needed: int = 1               # 当前缺口中最少需补充的线索数
    current_clues_count: int = 0               # 当前有效的鉴别线索数


SEVERITY_PROMPT = """你是一名资深精神科临床评估专家。请根据提供的患者信息进行多维度严重度评估。

【评估维度】
对以下五个维度分别评分（0-100，0=完全没有问题，100=极重度）：

1. symptom_burden（症状负担）：症状数量（1-2个=低分，5+=高分）、严重度（轻度/中度/重度）、类型（纯情绪=低，精神病性=高）
2. functional_impairment（功能损害）：工作/学习受损程度、社交功能、日常生活自理能力
3. risk_level（风险等级）：自杀意念/计划/行为、自伤风险、伤人风险
4. chronicity（病程）：持续时间（几天=低，数月=高）、恶化趋势、复发模式
5. biological_factors（生物因素）：精神科病史、家族史、器质性因素、物质使用

【信息充分性评估】
同时评估当前信息是否足以做鉴别诊断。检查以下维度：
- 症状是否足够具体（亚型、频率、触发因素、伴随特征）
- 症状数量是否支持鉴别诊断
- 是否排除了器质性因素和其他常见鉴别
- 时间模式是否有波动/趋势描述
- 功能损害是否有场景和程度描述
- 是否有至少1个可用于鉴别诊断的高特异性特征

如果信息不足以做鉴别诊断，在 information_gaps 中列出每个缺口及追问方向。

【评分参考】
- 轻度(mild, 0-30): 有困扰但日常生活基本正常，暂未达到诊断标准
- 中度(moderate, 31-60): 很可能达到诊断标准，功能部分受损，建议就医
- 重度(severe, 61-100): 需要专业干预，可能需药物+住院评估

【规则】
- 自杀意念/计划/行为 → risk_level 至少 60
- 幻听/幻视/妄想等精神病性症状 → symptom_burden 至少 70
- 完全失能（不能工作/不能自理）→ functional_impairment 至少 80
- 如果信息不足以判断某维度，给出保守估计并降低置信度

返回合法 JSON（不要 markdown 代码块包裹）：
{
  "severity_level": "mild|moderate|severe",
  "severity_score": 0-100,
  "dimensional_scores": {
    "symptom_burden": 0-100,
    "functional_impairment": 0-100,
    "risk_level": 0-100,
    "chronicity": 0-100,
    "biological_factors": 0-100
  },
  "reasoning": "综合推理简述",
  "confidence": 0.0-1.0,
  "information_sufficiency": "sufficient|insufficient",
  "information_gaps": [
    {
      "gap_type": "symptom_lacks_specificity|symptom_count|missing_negative_finding|missing_temporal_pattern|functional_detail|discriminative_signal",
      "current": "当前已知信息",
      "missing_detail": "缺少什么具体细节",
      "why_matters": "为什么对鉴别诊断重要"
    }
  ],
  "minimum_clues_needed": 数字,
  "current_clues_count": 数字
}"""


def _compute_severity_score(dimensional_scores: dict) -> float:
    """加权合成严重度总分"""
    total = 0.0
    for dim, weight in DIMENSION_WEIGHTS.items():
        total += dimensional_scores.get(dim, 0) * weight
    return round(total, 1)


def _map_severity_level(score: float) -> tuple[str, bool]:
    """将分数映射为严重度等级，同时判断是否位于边界模糊区"""
    for lo, hi, level in SEVERITY_THRESHOLDS:
        if lo <= score <= hi:
            in_blur = any(lo <= score <= hi for lo, hi in BLUR_ZONES)
            return level, in_blur
    return "mild", False


def _format_patient_context(patient_info: dict) -> str:
    """将 patient_info 格式化为 LLM 可读的评估上下文"""
    lines = []
    if patient_info.get("chief_complaint"):
        lines.append(f"主诉：{patient_info['chief_complaint']}")
    symptoms = patient_info.get("symptoms", [])
    if symptoms:
        for s in symptoms:
            if isinstance(s, dict):
                parts = [s.get("name", "")]
                if s.get("severity"):
                    parts.append(f"（{s['severity']}）")
                if s.get("description"):
                    parts.append(f"- {s['description']}")
                lines.append("".join(parts))
    if patient_info.get("duration_weeks") is not None:
        lines.append(f"持续时间：约{patient_info['duration_weeks']}周")
    if patient_info.get("functional_impact"):
        lines.append(f"功能影响：{patient_info['functional_impact']}")
    if patient_info.get("suicide_risk_screening"):
        lines.append(f"自杀风险筛查：{patient_info['suicide_risk_screening']}")
    if patient_info.get("medical_history"):
        lines.append(f"病史：{patient_info['medical_history']}")
    if patient_info.get("family_history"):
        lines.append(f"家族史：{patient_info['family_history']}")
    if patient_info.get("current_medications"):
        lines.append(f"当前用药：{patient_info['current_medications']}")
    if patient_info.get("allergies"):
        lines.append(f"过敏史：{patient_info['allergies']}")
    if patient_info.get("substance_use"):
        lines.append(f"物质使用：{patient_info['substance_use']}")
    return "\n".join(lines) if lines else "暂无结构化信息"


def _format_history_summary(conversation_history: list[dict]) -> str:
    """提取对话摘要，只保留最近 N 轮核心内容"""
    if not conversation_history:
        return "无历史对话"
    recent = conversation_history[-8:]
    lines = []
    for msg in recent:
        role = "用户" if msg.get("role") == "user" else "AI"
        content = msg.get("content", "")
        if len(content) > 200:
            content = content[:200] + "..."
        lines.append(f"[{role}] {content}")
    return "\n".join(lines)


def assess_severity(
    patient_info: dict,
    conversation_history: list[dict] | None = None,
) -> SeverityResult:
    """
    严重度评估入口。

    参数:
        patient_info: 已采集的全量患者信息
        conversation_history: 对话历史 [{role, content}, ...] 可选

    返回:
        SeverityResult: 包含严重度等级、分项评分、信息充分性
    """
    patient_context = _format_patient_context(patient_info)
    history_summary = _format_history_summary(conversation_history or [])

    settings = get_settings()
    llm = ChatOpenAI(
        model=settings.openai_model,
        api_key=settings.openai_api_key,
        base_url=settings.openai_base_url or None,
        temperature=0.0,
    )

    user_content = (
        f"【患者结构化信息】\n{patient_context}\n\n"
        f"【对话历史摘要】\n{history_summary}"
    )

    try:
        from .llm_utils import llm_invoke_sync
        raw = llm_invoke_sync(
            llm,
            [SystemMessage(content=SEVERITY_PROMPT), HumanMessage(content=user_content)],
            caller="severity_assessor",
            timeout=60,
        )
        content = raw.content.strip()
        if content.startswith("```"):
            content = content.split("\n", 1)[1].rsplit("```", 1)[0].strip()
        data = json.loads(content)

        severity_level = data.get("severity_level", "mild")
        dimensional_scores = data.get("dimensional_scores", {})
        computed_score = _compute_severity_score(dimensional_scores)
        llm_score = float(data.get("severity_score", computed_score))
        # 优先使用加权合成分数，若LLM评分差异过大则用LLM的
        final_score = llm_score if abs(llm_score - computed_score) > 15 else computed_score
        mapped_level, is_blur = _map_severity_level(final_score)
        # 以 LLM 判断为准（LLM 可能基于规则引擎无法感知的语义判断）
        final_level = severity_level if severity_level in ("mild", "moderate", "severe") else mapped_level

        gaps_raw = data.get("information_gaps", [])
        gaps = [
            InformationGap(
                gap_type=g.get("gap_type", ""),
                current=g.get("current", ""),
                missing_detail=g.get("missing_detail", ""),
                why_matters=g.get("why_matters", ""),
            )
            for g in gaps_raw
            if isinstance(g, dict)
        ]

        logger.info(
            "severity_assessor.complete",
            severity_level=final_level,
            score=final_score,
            info_sufficiency=data.get("information_sufficiency"),
            gaps_count=len(gaps),
        )

        return SeverityResult(
            severity_level=final_level,
            severity_score=final_score,
            dimensional_scores=dimensional_scores,
            reasoning=data.get("reasoning", ""),
            confidence=float(data.get("confidence", 0.5)),
            is_blur_zone=is_blur,
            information_sufficiency=data.get("information_sufficiency", "insufficient"),
            information_gaps=gaps,
            minimum_clues_needed=int(data.get("minimum_clues_needed", 1)),
            current_clues_count=int(data.get("current_clues_count", 0)),
        )

    except (json.JSONDecodeError, KeyError, AttributeError, ValueError) as e:
        logger.error("severity_assessor.parse_error", error=str(e))
        return SeverityResult(
            severity_level="mild",
            severity_score=20.0,
            confidence=0.3,
            information_sufficiency="insufficient",
            reasoning=f"评估解析失败，降级为保守估计: {e}",
        )
