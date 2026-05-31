"""
FollowupIntake Agent — 精神科复诊信息采集与结构化。

职责：
  - 解析复诊速记为精简结构化数据（FollowupContext）
  - 提取已知诊断、当前用药、症状变化、副作用、调药意图
  - 不提取完整的MSE/患者人口学（这些在初诊时已记录）

与初诊Intake的区别：
  - 初诊Intake：速记→完整PatientInfo（MSE/量表/既往史/人口学）
  - 复诊Intake：速记→FollowupContext（诊断+用药+变化+调药意图）
"""

from __future__ import annotations
import json
import structlog
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI

from ..config.settings import get_settings

logger = structlog.get_logger(__name__)

FOLLOWUP_INTAKE_SYSTEM_PROMPT = """你是一名资深精神科接诊专家。你面对的是复诊患者，诊断已经明确，只需要提取调药相关信息。

输入可能是口语化的自然语言，也可能是精神科临床缩写速记。你需要理解两种风格。

## 第一阶段：理解输入（内部处理，不输出）

### 口语→临床术语映射
| 口语表达 | 临床含义 |
|:---|:---|
| 上次开的药/之前那个药 | 当前用药 |
| 感觉好多了/比以前好 | 症状改善 |
| 没啥变化/还是一样 | 症状稳定 |
| 更差了/还不如之前 | 症状恶化 |
| 吃了不舒服/恶心头晕 | 药物副作用 |
| 想加点量/是不是量不够 | 加量意图 |
| 想减点/是不是太多了 | 减量意图 |
| 换个药/这药不行 | 换药意图 |
| 继续吃/维持这个量 | 维持治疗 |
| 不想吃了/停药 | 停药意图 |
| 上次来看过/又来了 | 复诊 |
| 吃了半个月/吃了大概几周 | 用药时长 |
| 感觉胖了/体重增加了 | 体重增加（副作用） |
| 睡不好/还是失眠 | 残留症状 |

### 缩写识别（兼容传统速记风格）
- MDD→重性抑郁障碍、BD→双相障碍、SCZ→精神分裂症
- f/u→复诊/随访、d→天、w→周、m→月
- PHQ-9/HAMD/YMRS/PANSS→标准化量表
- sertraline→舍曲林、olanzapine→奥氮平、quetiapine→喹硫平
- augment→增效、taper→递减、titrate→滴定
- ↑/↓ 或 → →趋势变化

## 第二阶段：结构化输出

{
  "known_diagnosis": "已确诊的精神科诊断（中文名称）",
  "visit_type": "复诊类型描述（如4周复诊、初次疗效评估、维持期随访）",
  "current_medications": [
    {
      "name": "药物通用名（中文，如舍曲林）",
      "dosage": "当前剂量",
      "duration": "已用时长（如4周、3月）",
      "adherence": "依从性（良好/部分/差/不依从/未提及）"
    }
  ],
  "symptom_changes": [
    {
      "metric": "评估指标（如PHQ-9、PANSS、情绪、幻觉、焦虑）",
      "from": "之前的值或状态",
      "to": "现在的值或状态",
      "direction": "改善/恶化/稳定/波动"
    }
  ],
  "side_effects": [
    {
      "drug": "引起副作用的药物",
      "effect": "副作用描述（中文）",
      "severity": "轻度/中度/重度/可耐受",
      "management": "当前处理方式"
    }
  ],
  "adjustment_intent": {
    "action": "增效/加量/减量/换药/停用/维持/其他",
    "drug": "涉及药物",
    "dosage": "目标剂量",
    "reason": "调整原因"
  },
  "new_symptoms": ["复诊中新出现的症状或问题"],
  "functional_status": "日常功能变化描述（改善/无明显变化/恶化）",
  "suicide_risk_update": "自杀风险更新（如未提及则为'未评估'）",
  "doctor_notes": "医生备注的其他观察"
}

## 规则
- 所有文本内容使用中文。
- 只提取医生提到的信息，不要编造。
- 对于未提及的字段，使用合理默认值或标明"未提及"。
- 返回 ONLY valid JSON，不用markdown代码块包裹。"""


def followup_intake_agent(state) -> dict:
    """
    LangGraph节点函数：解析复诊速记为精简结构化数据。

    读取：state.raw_input（复诊速记文本）
    写入：state.patient_info（FollowupContext字典）
    """
    logger.info("followup_intake_agent.start", raw_input_len=len(state.raw_input or ""))

    raw = state.raw_input
    if not raw:
        return {
            "patient_info": None,
            "current_agent": "followup_intake",
            "errors": state.errors + ["No raw input provided to FollowupIntake Agent"],
        }

    settings = get_settings()
    llm = ChatOpenAI(
        model=settings.openai_model,
        api_key=settings.openai_api_key,
        base_url=settings.openai_base_url or None,
        temperature=0.1,
    )

    messages = [
        SystemMessage(content=FOLLOWUP_INTAKE_SYSTEM_PROMPT),
        HumanMessage(content=f"复诊临床描述：\n\n{raw}"),
    ]

    try:
        response = llm.invoke(messages)
        content = response.content.strip()
        if content.startswith("```"):
            content = content.split("\n", 1)[1].rsplit("```", 1)[0].strip()

        followup_data = json.loads(content)
        logger.info(
            "followup_intake_agent.success",
            diagnosis=followup_data.get("known_diagnosis"),
            med_count=len(followup_data.get("current_medications", [])),
        )
        return {
            "patient_info": followup_data,
            "current_agent": "followup_intake",
        }
    except json.JSONDecodeError as e:
        logger.error("followup_intake_agent.json_error", error=str(e))
        return {
            "patient_info": None,
            "current_agent": "followup_intake",
            "errors": state.errors + [f"FollowupIntake JSON parse error: {e}"],
        }
    except Exception as e:
        logger.error("followup_intake_agent.error", error=str(e))
        return {
            "patient_info": None,
            "current_agent": "followup_intake",
            "errors": state.errors + [f"FollowupIntake error: {e}"],
        }
