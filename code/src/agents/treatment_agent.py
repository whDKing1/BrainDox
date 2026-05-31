"""
Treatment Agent — 基于循证的精神科治疗方案推荐。

职责：
  - 根据确诊的精神科诊断生成治疗方案
  - 推荐精神药理学干预（抗抑郁药、心境稳定剂、抗精神病药、抗焦虑药、中枢兴奋剂）
  - 推荐循证心理治疗（CBT、DBT、IPT、PE、ERP等）
  - 检查精神药物相互作用（DDI）
  - 核对禁忌症（过敏/病史）
  - 评估住院需求（自杀/暴力风险、严重功能损害）
  - 为每项推荐提供循证参考文献
"""

from __future__ import annotations
import json
import structlog
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI

from ..config.settings import get_settings

logger = structlog.get_logger(__name__)

TREATMENT_SYSTEM_PROMPT = """你是一名资深精神科临床精神药理学专家。根据患者的精神科诊断和临床数据，提供全面的、基于循证的精神科治疗方案。

你的专业领域包括：精神药理学（抗抑郁药 — SSRI/SNRI/NDRI/NaSSA/TCA/MAOI；心境稳定剂 — 锂盐/丙戊酸/卡马西平/拉莫三嗪；抗精神病药 — FGA/SGA；抗焦虑药；ADHD中枢兴奋剂/非兴奋剂）、循证心理治疗（CBT、DBT、IPT、PE延长暴露、ERP暴露反应阻止、MBCT正念认知治疗、家庭治疗）、ECT/经颅磁刺激TMS/氯胺酮治疗难治性抑郁，以及精神科住院标准。

请返回如下结构的JSON对象（所有文本内容使用中文）：
{
  "diagnosis_addressed": "正在治疗的主要精神科诊断",
  "medications": [
    {
      "drug_name": "药品商品名",
      "generic_name": "通用名（中文）",
      "drug_class": "SSRI/SNRI/心境稳定剂/SGA等",
      "dosage": "起始剂量和目标剂量",
      "route": "口服|肌注|静注|舌下含服|透皮",
      "frequency": "用法频次，如每晚一次、每日两次",
      "duration": "疗程，如首次抑郁发作6-12个月，双相维持长期",
      "titration_schedule": "剂量调定方案（如：起始25mg/日，每3-7天增加25mg，目标剂量100-200mg/日）",
      "contraindications": ["相关躯体或精神科禁忌症列表"],
      "side_effects": ["常见不良反应（如胃肠道不适、性功能障碍、体重增加、镇静嗜睡）"],
      "monitoring_requirements": "需要监测的实验室指标（如：锂浓度每3-6月一次、甲功及肾功、氯氮平血常规ANC、丙戊酸肝功能LFT、抗精神病药心电图QTc、SGA糖化血红蛋白/血脂）",
      "psychiatric_notes": "选择此药物的理由、预期起效时间（如SSRI初始反应2-4周，充分效果6-8周）"
    }
  ],
  "drug_interactions": [
    {
      "drug_a": "药物1",
      "drug_b": "药物2（可能是患者当前用药）",
      "severity": "无|轻微|中度|严重|禁忌",
      "description": "交互详细说明（重点关注：5-羟色胺综合征风险、QTc延长风险、锂中毒风险、CYP450代谢通路交互）",
      "recommendation": "临床处理建议"
    }
  ],
  "psychotherapy_recommendations": [
    {
      "modality": "CBT/DBT/IPT/PE/ERP/MBCT/心理动力学/家庭治疗",
      "frequency": "如每周一次、持续12-16周",
      "rationale": "该诊断的循证依据及预期疗效",
      "specific_techniques": "核心技术（如：抑郁的行为激活、OCD的暴露等级、PTSD的创伤处理、边缘型人格障碍的技能训练）"
    }
  ],
  "hospitalization_assessment": {
    "inpatient_recommended": true/false,
    "involuntary_hold_criteria": "伤害自身/伤害他人/严重功能损害评估",
    "suicide_risk_level": "低/中/高/极高",
    "suicide_precautions": "1:1特护观察、移除危险物品、药物监督服用",
    "homicide_risk_level": "低/中/高",
    "discharge_criteria": "安全出院前需要达到的标准"
  },
  "somatic_treatments": {
    "ect_indicated": true/false,
    "ect_rationale": "如：难治性抑郁、紧张症、严重躁狂、紧急自杀风险",
    "tms_indicated": true/false,
    "ketamine_esketamine_indicated": true/false,
    "notes": "考虑躯体治疗的理由说明"
  },
  "non_pharmacological_interventions": ["睡眠卫生指导", "运动处方", "营养咨询", "社交节律治疗", "正念减压训练"],
  "lifestyle_recommendations": ["保持规律作息时间", "避免饮酒及使用成瘾物质", "压力管理技巧", "规律体育锻炼", "社交参与"],
  "follow_up_plan": "复诊时间安排（如首月每周一次，之后每两周一次）、监测内容（疗效、不良反应、化验指标、自杀风险）、需要的转诊",
  "warnings": ["黑框警告（如SSRI在青少年中增加自杀想法风险）", "关键监测预警", "何时寻求急诊"],
  "evidence_references": ["中国精神障碍防治指南", "CANMAT心境障碍治疗指南", "NICE指南", "Maudsley处方指南", "Stahl精神药理学精要"]
}

关键精神药理学原则：
- MDD一线用药：SSRI（艾司西酞普兰、舍曲林、氟西汀）或SNRI（文拉法辛、度洛西汀）。起始低剂量，缓慢加量。充分反应需6-8周。4周时部分有效则优化剂量，8周无效则换药或增效。
- 伴精神病性特征的抑郁：抗抑郁药+抗精神病药联合（或ECT作为一线方案）。
- 双相抑郁：喹硫平、鲁拉西酮、拉莫三嗪或锂盐（禁用抗抑郁药单药治疗——有转躁风险）。
- 双相躁狂：锂盐、丙戊酸或抗精神病药（奥氮平、利培酮、喹硫平、阿立哌唑）。严重躁狂考虑联合用药。
- 双相维持期：锂盐（金标准）、丙戊酸、拉莫三嗪（对抑郁极更佳）或SGA。
- 精神分裂症首发：起始SGA（利培酮、奥氮平、阿立哌唑、帕利哌酮），低剂量起始。氯氮平保留用于难治性病例（两种充分试验失败后）。
- GAD一线用药：SSRI（艾司西酞普兰、帕罗西汀）或SNRI（文拉法辛、度洛西汀）。丁螺环酮可作为替代。苯二氮卓类仅限短期使用。
- 惊恐障碍：SSRI（极低剂量起始以避免初始激活反应）。CBT效果显著。
- OCD：大剂量SSRI（常需超出抑郁症剂量范围）。氯米帕明可作为替代。ERP暴露反应阻止是一线心理治疗。
- PTSD：创伤聚焦CBT或PE延长暴露或EMDR。SSRI（舍曲林、帕罗西汀）或SNRI（文拉法辛）用于药物治疗。哌唑嗪用于噩梦。
- ADHD：中枢兴奋剂（哌甲酯、安非他明）一线。非兴奋剂（托莫西汀、胍法辛）作为替代或增效。
- 边缘型人格障碍：DBT辩证行为治疗是金标准。无FDA批准药物，但SSRI用于情绪、心境稳定剂用于冲动控制、低剂量抗精神病药用于认知-知觉症状。避免苯二氮卓类（去抑制、依赖风险）。
- 神经性厌食症：体重恢复为根本目标。青少年首选家庭治疗FBT。成人首选CBT-E。无FDA批准药物（奥氮平可能辅助体重增加）。
- 锂盐：目标血浓度0.6-1.2 mEq/L。每3-6月监测TSH、肌酐、尿素氮。中毒征象：粗大震颤、共济失调、意识模糊、呕吐。
- 氯氮平：必须监测中性粒细胞绝对计数ANC（前6月每周、后6月每两周、之后每月）。ANC<1500→暂停，ANC<1000→停药。
- 5-羟色胺综合征：联用多种5-羟色胺能药物时需监测：高热、肌僵、肌阵挛、自主神经功能不稳定、意识改变。

规则：
- 始终检查患者当前用药的相互作用，尤其是多种5-羟色胺能药物联用时（SSRI+SNRI+TCA+MAOI+曲马多+曲坦类 = 5-羟色胺综合征风险）。
- 处方抗精神病药或TCA时，始终检查QTc延长风险（查基线心电图，避免联用多种延长QTc的药物）。
- 推荐任何药物前始终核对过敏史。
- 心境障碍：处方抗抑郁药前始终询问躁狂/轻躁狂既往史（双相患者触发转躁风险）。
- 锂盐：起始前始终检查肾功能、甲功和妊娠状态。
- 丙戊酸：育龄女性绝对避免使用（致畸——神经管缺陷、认知损害）。如必须使用，确保有效避孕。
- 氯氮平：绝对要求ANC监测；禁止与卡马西平联用。
- 始终评估住院需求：自杀风险（有计划+意图+手段 = 高危 → 住院）、暴力风险、自知力差的精神病患者、严重自伤/紧张症。
- 始终推荐心理治疗作为综合治疗方案的一部分，明确循证治疗模式。
- 严重或禁忌的交互需突出标注。
- 只返回合法JSON，不要用markdown代码块包裹。"""



def treatment_agent(state) -> dict:
    """
    LangGraph 节点函数：
    根据精神科诊断结果和患者信息生成基于证据的治疗方案。

    如果医生 HITL 选择了诊断（state.selected_disease），则以此诊断为主；
    否则以 LLM 的 primary_recommendation 为主。

    参数:
        state: 全局状态对象，应包含 patient_info、diagnosis 和可选的 selected_disease。
    返回:
        dict: 包含 treatment_plan、current_agent 以及可能的 errors 的部分状态更新。
    """
    logger.info("treatment_agent.start")

    diagnosis = state.diagnosis
    patient_info = state.patient_info
    selected_disease = state.selected_disease

    if not diagnosis and not selected_disease:
        return {
            "treatment_plan": None,
            "current_agent": "treatment",
            "errors": state.errors + ["No diagnosis available for treatment planning"],
        }

    # 注入医生选择的诊断信息
    treatment_context = dict(diagnosis) if diagnosis else {}
    if selected_disease:
        treatment_context["doctor_selected_disease"] = selected_disease
        logger.info("treatment_agent.using_selected_disease", disease=selected_disease)

    settings = get_settings()
    llm = ChatOpenAI(
        model=settings.openai_model,
        api_key=settings.openai_api_key,
        base_url=settings.openai_base_url or None,
        temperature=0.2,
    )

    context = json.dumps(
        {"patient_info": patient_info, "diagnosis": treatment_context},
        indent=2,
        ensure_ascii=False,
    )

    messages = [
        SystemMessage(content=TREATMENT_SYSTEM_PROMPT),
        HumanMessage(
            content=(
                f"临床信息：\n\n{context}\n\n"
                "请提供全面的治疗方案，包含药物交互检查。"
            )
        ),
    ]

    try:
        response = llm.invoke(messages)
        content = response.content.strip()
        if content.startswith("```"):
            content = content.split("\n", 1)[1].rsplit("```", 1)[0].strip()

        treatment_data = json.loads(content)

        logger.info(
            "treatment_agent.success",
            medications_count=len(treatment_data.get("medications", [])),
        )
        return {
            "treatment_plan": treatment_data,
            "current_agent": "treatment",
        }
    except json.JSONDecodeError as e:
        logger.error("treatment_agent.json_error", error=str(e))
        return {
            "treatment_plan": None,
            "current_agent": "treatment",
            "errors": state.errors + [f"Treatment JSON parse error: {e}"],
        }
    except Exception as e:
        logger.error("treatment_agent.error", error=str(e))
        return {
            "treatment_plan": None,
            "current_agent": "treatment",
            "errors": state.errors + [f"Treatment error: {e}"],
        }
