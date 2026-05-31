"""
Coding Agent — 精神科ICD-10自动编码与DRG分组。

职责：
  - 将精神科诊断高精度映射为ICD-10-CM编码
  - 根据主要诊断+操作确定DRG分组
  - 提供编码置信度和理由
  - 交叉验证编码与诊断描述的一致性
  - 处理合并物质使用障碍、人格障碍和躯体疾病的编码
"""

from __future__ import annotations
import json
import structlog
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI

from ..config.settings import get_settings

logger = structlog.get_logger(__name__)

CODING_SYSTEM_PROMPT = """你是一名认证的医学编码专家，精于精神科ICD-10-CM编码和DRG分组。根据精神科诊断信息和治疗细节，为精神和行为障碍（F00-F99）精确分配医学编码。

请返回如下结构的JSON对象（所有文本内容使用中文）：
{
  "primary_icd10": {
    "code": "精确的ICD-10-CM编码（如F32.1、F20.0、F31.10、F43.10、F50.01、F10.20、F60.3、F90.0）",
    "description": "编码的官方中文描述",
    "confidence": 0.92,
    "category": "所属类别（如心境障碍、精神分裂症谱系、焦虑障碍、物质相关障碍等）"
  },
  "secondary_icd10_codes": [
    {
      "code": "ICD-10编码",
      "description": "编码的中文描述",
      "confidence": 0.85,
      "category": "所属类别"
    }
  ],
  "drg_group": {
    "drg_code": "DRG编号（如：精神分裂症/双相障碍885、抑郁性神经症881、神经症性障碍882、人格障碍883、急性应急反应880、物质使用障碍894、进食障碍887）",
    "description": "DRG的中文描述",
    "weight": 1.2,
    "mean_los": 7.5
  },
  "coding_notes": "编码选择理由，注明严重度/发作/病程标注词及所适用的编码规则",
  "coding_confidence": 0.90
}

精神科核心ICD-10-CM编码范围：
- F00-F09：器质性（包括症状性）精神障碍（谵妄F05、痴呆F01-F03、遗忘障碍、其他认知障碍）
- F10-F19：使用精神活性物质所致的精神和行为障碍（酒精F10、阿片类F11、大麻F12、镇静催眠药F13、可卡因F14、其他兴奋剂F15、致幻剂F16、烟草F17、挥发性溶剂F18、多种药物F19）
- F20-F29：精神分裂症、分裂型障碍和妄想性障碍（精神分裂症F20、分裂型障碍F21、妄想性障碍F22、短暂精神病性障碍F23、感应性精神病性障碍F24、分裂情感性障碍F25）
- F30-F39：心境（情感）障碍（躁狂发作F30、双相障碍F31、重性抑郁发作单次F32、复发性抑郁F33、持续性心境障碍F34）
- F40-F48：神经症性、应激相关的及躯体形式障碍（恐怖性F40、惊恐/GAD F41、OCD F42、创伤/应激F43、分离/转换F44、躯体形式F45）
- F50-F59：伴有生理紊乱及躯体因素的行为综合征（进食F50、睡眠F51、性功能障碍F52、产褥期F53、非依赖性物质滥用F55）
- F60-F69：成人人格和行为障碍（人格F60、冲动控制F63、性别认同F64、性偏好F65）
- F70-F79：精神发育迟滞
- F80-F89：心理发育障碍
- F90-F98：通常起病于童年与少年期的行为与情绪障碍
- F99：待分类的精神障碍

精神科DRG参考（中国医院常用）：
- DRG 880：急性应急反应及心理社会功能不全
- DRG 881：抑郁性神经症（主要对应F32、F33）
- DRG 882：非抑郁性神经症（主要对应F40-F42、F44-F48）
- DRG 883：人格障碍与冲动控制障碍（主要对应F60、F63）
- DRG 885：精神病性障碍（精神分裂症、双相障碍、分裂情感性障碍，主要对应F20、F25、F31）
- DRG 886：行为与发育障碍（儿童期起病，主要对应F90-F98）
- DRG 887：其他精神障碍诊断（进食障碍等，主要对应F50）
- DRG 894：酒精/药物滥用或依赖（主要对应F10-F19）

规则：
- 使用可用的最具体的ICD-10-CM编码（包括第4-7位字符，以标识发作类型和严重度）。
- 心境障碍编码：注明发作类型（单次F32 vs 复发性F33）、严重程度（轻度.0、中度.1、不伴精神病性症状的重度.2、伴精神病性症状的重度.3）和缓解状态（部分缓解.4、完全缓解.5）。
- 双相障碍编码：注明当前发作类型（躁狂.1-、抑郁.3-、混合.6-、轻躁狂.0-）及严重度/精神病性特征。
- 精神分裂症编码：注明亚型（偏执型F20.0、青春型F20.1、紧张型F20.2、未分化型F20.3、残留型F20.5）。
- 物质使用编码：注明具体物质和严重程度（不伴有合并症.10、伴有中毒.12-、伴有戒断.13-、伴有精神病性障碍.15-、伴心境障碍.14、伴焦虑障碍.180）。
- 将合并的躯体疾病编码作为次要编码（如甲状腺功能减退E03.9、高血压I10、糖尿病E11.9、肥胖E66.9）。
- 当有记录时，包含合并物质使用障碍编码。
- 主要编码应与主要精神科诊断一致。
- DRG权重和平均住院天数应为精神科实际情况的合理估计（精神科急性住院通常5-15天）。
- 置信度反映编码分配的确定程度。
- 只返回合法JSON，不要用markdown代码块包裹。"""


def coding_agent(state) -> dict:
    """
    LangGraph节点：为精神科诊断和方案分配ICD-10编码和DRG分组。
    读取：state.diagnosis, state.treatment_plan
    写入：state.coding_result, state.current_agent
    """
    logger.info("coding_agent.start")

    diagnosis = state.diagnosis
    treatment = state.treatment_plan

    if not diagnosis:
        return {
            "coding_result": None,
            "current_agent": "coding",
            "errors": state.errors + ["No diagnosis available for coding"],
        }

    settings = get_settings()
    llm = ChatOpenAI(
        model=settings.openai_model,
        api_key=settings.openai_api_key,
        base_url=settings.openai_base_url or None,
        temperature=0.1,
    )

    context = json.dumps(
        {"diagnosis": diagnosis, "treatment_plan": treatment},
        indent=2,
        ensure_ascii=False,
    )

    messages = [
        SystemMessage(content=CODING_SYSTEM_PROMPT),
        HumanMessage(
            content=(
                f"需要编码的临床数据：\n\n{context}\n\n"
                "请分配ICD-10编码和DRG分组。"
            )
        ),
    ]

    try:
        response = llm.invoke(messages)
        content = response.content.strip()
        if content.startswith("```"):
            content = content.split("\n", 1)[1].rsplit("```", 1)[0].strip()

        coding_data = json.loads(content)

        logger.info(
            "coding_agent.success",
            primary_code=coding_data.get("primary_icd10", {}).get("code"),
        )
        return {
            "coding_result": coding_data,
            "current_agent": "coding",
        }
    except json.JSONDecodeError as e:
        logger.error("coding_agent.json_error", error=str(e))
        return {
            "coding_result": None,
            "current_agent": "coding",
            "errors": state.errors + [f"Coding JSON parse error: {e}"],
        }
    except Exception as e:
        logger.error("coding_agent.error", error=str(e))
        return {
            "coding_result": None,
            "current_agent": "coding",
            "errors": state.errors + [f"Coding error: {e}"],
        }
