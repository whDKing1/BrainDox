"""
Intake Agent — 精神科患者信息采集与结构化。

职责：
  - 解析医生口述或口语化患者描述为结构化 PatientInfo
  - 将口语表达映射为标准精神科临床术语
  - 识别隐含信息（量表、检查、诊断印象）
  - 规范化数据为 FHIR 兼容格式
  - 验证关键精神科字段完整性（MSE、自杀风险、物质使用）
"""

from __future__ import annotations
import json
# structlog 是一个结构化日志库，比 print 更专业。
# 它可以输出 JSON 格式的日志，方便后期检索、分析。
# get_logger(__name__) 会创建一个名为当前模块路径的 logger，
# 比如 "myproject.agents.intake"。
import structlog
# langchain_core 是 LangChain 的核心消息类型。
# HumanMessage 代表用户说的话，SystemMessage 代表给模型的系统指令。
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI

# 从上层配置模块导入设置函数 get_settings。
# 通常 get_settings 会读取环境变量、.env 文件等，返回一个包含
# openai_api_key、openai_model 等属性的 Settings 对象。
from ..config.settings import get_settings
# 从上层数据模型导入 PatientInfo 类，是一个 Pydantic BaseModel，
# 定义了患者信息的所有字段和验证规则。
from ..models.patient import PatientInfo
# 创建该模块专用的 logger，后续可以用 logger.info(...) 记录日志。
logger = structlog.get_logger(__name__)

INTAKE_SYSTEM_PROMPT = """你是一名资深精神科接诊专家。你的核心任务是将医生口述的、口语化的患者描述转化为结构化的精神科病历数据。

输入特点：
- 医生可能使用口语化、非结构化的自然语言描述患者情况
- 可能包含模糊表达（"大概一个半月"、"二十多岁"、"瘦了十斤"）
- 可能隐含临床信息（"社区医院做了抑郁量表"→PHQ-9、"查了甲状腺"→甲功TSH）
- 可能混杂主观判断和客观观察（"我觉得像抑郁症"是医生的初步印象，不是患者自述）

## 第一阶段：口语化理解与临床映射（内部处理，不输出）

### 1. 口语→临床术语映射
识别口语化表达，映射为标准精神科术语：

| 口语表达 | 临床术语 |
|:---|:---|
| 情绪不好/心情差/不高兴 | 抑郁情绪 |
| 对啥都不感兴趣/什么都不想干 | 快感缺失/兴趣丧失 |
| 早上醒得特别早/天没亮就醒了 | 早醒（终末性失眠） |
| 睡不着/躺床上翻来覆去 | 入睡困难 |
| 半夜老醒/睡不踏实 | 睡眠维持障碍 |
| 瘦了/体重下降/吃不下饭 | 体重下降/食欲减退 |
| 吃太多/控制不住吃 | 食欲亢进/暴食 |
| 活着没意思/不想活了 | 自杀意念（被动） |
| 想死/有具体方法 | 自杀意念（主动） |
| 整个人很慢/动作慢吞吞 | 精神运动性迟滞 |
| 坐不住/走来走去 | 精神运动性激越 |
| 说话声音小小的/不爱说话 | 语声低微/言语减少 |
| 不敢看我眼睛 | 眼神回避（情感受限表现） |
| 总觉得有人害我/跟踪我 | 被害妄想 |
| 听到有人说话/议论我 | 幻听（评论性/争论性） |
| 有时候不像自己/像在做梦 | 人格解体/现实解体 |
| 心情一会好一会坏 | 情绪不稳 |
| 脾气暴躁/控制不住发火 | 易激惹 |
| 心慌/紧张/担心 | 焦虑 |
| 脑子转不动/记不住事 | 注意力减退/记忆力下降 |
| 以前得过/之前有过 | 既往发作史 |
| 家里有人得过 | 家族史阳性 |

### 2. 隐含信息的识别
- "在社区医院做了抑郁量表，22分" → 推断为PHQ-9评分22分，存入scale_scores
- "也查了甲状腺，正常的" → 推断为甲功TSH正常，存入lab_results
- "我怕她/我怀疑她/会不会是" → 这是医生的初步诊断印象，并非确诊
- "大概"/"差不多"/"左右" → 推断近似值，标注"（估计）"
- "不知道"/"没问"/"没说" → 这些信息缺失，不编造
- 未提及年龄但有"二十多岁" → 估算为25岁
- 未提及性别 → 设为"未知"
- "我担心她有没有自杀想法，她跟我说过活着没意思" → 存在被动自杀意念，但未评估具体计划和手段

### 3. 量化信息的标准化
- "一个半月" → 45天
- "好几周" → 估算为4周/28天
- "十斤" → 5公斤
- "一个多月" → 估算为5周/35天
- "最近" → 无精确时间，用null并描述"近期"

### 4. MSE信息的推断
从非结构化描述中提取MSE各项：
- "看起来整个人很慢" → appearance_and_behavior: "精神运动性迟滞"
- "说话声音小小的" → speech: "语声低微，语速减慢"
- "情绪不好" → mood: "抑郁情绪"
- "不敢看我眼睛" → affect: "眼神回避，情感表达受限"
- "我觉得像抑郁症" → 不是MSE的一部分，是医生的初步诊断印象，不放入MSE

### 5. 缺失信息识别
以下关键信息如未提及，应在相应字段标注：
- 未评估自杀风险的具体计划和手段 → suicide_risk标注 "被动自杀意念，未评估具体计划和手段"
- 未询问物质使用史 → substance_use: null（标注缺失）
- 未描述自知力 → insight: null（标注缺失）
- 未提及暴力风险 → homicide_risk: "未评估"
- 未提及体重指数/生命体征 → vital_signs: null
- 未做量表以外的检查 → 对应字段为null或空数组

## 第二阶段：结构化输出

基于你的临床理解，输出JSON对象（所有文本内容使用中文）：
{
  "name": "患者姓名或'未知'",
  "age": <整数>,
  "gender": "男|女|其他|未知",
  "chief_complaint": "提炼后的主诉（使用中文精神科术语，概括核心问题）",
  "symptoms": [
    {"name": "精神科症状名称（中文）", "duration_days": <天数或null>, "severity": "轻度|中度|重度|极重", "description": "扩展详细描述，包括起病方式、病程、诱因、功能损害"}
  ],
  "medical_history": ["既往精神科和内科病史列表（中文），尤其既往抑郁发作、躁狂发作、精神病性发作、自杀未遂、精神科住院史"],
  "family_history": ["家族精神疾病史列表（中文），如抑郁症、双相障碍、精神分裂症、自杀、物质滥用"],
  "allergies": [
    {"substance": "过敏原名称", "reaction": "过敏反应描述", "severity": "轻度|中度|重度"}
  ],
  "current_medications": [
    {"name": "药物名称", "dosage": "剂量", "frequency": "频次"}
  ],
  "vital_signs": {
    "temperature": <体温℃或null>,
    "heart_rate": <心率次/分或null>,
    "blood_pressure_systolic": <收缩压或null>,
    "blood_pressure_diastolic": <舒张压或null>,
    "respiratory_rate": <呼吸频率或null>,
    "oxygen_saturation": <血氧饱和度或null>
  },
  "lab_results": [
    {"test_name": "检查名称（中文，如甲功、血常规、肝功能、血锂浓度、丙戊酸浓度、尿毒物筛查、糖化血红蛋白、血脂、泌乳素）", "value": "结果", "unit": "单位", "reference_range": "参考范围", "is_abnormal": true/false}
  ],
  "mental_status_exam": {
    "appearance_and_behavior": "外观（整洁/蓬乱）和行为（合作/激越/退缩/精神运动性迟滞/激越）的中文描述",
    "speech": "语速、节律、音量、流畅性、自发性的中文描述",
    "mood": "主观情绪状态（抑郁/焦虑/情感平稳/欣快/易激惹/烦躁）的中文描述",
    "affect": "客观情感表现（受限/平淡/迟钝/不稳定/适切/不适切）的中文描述",
    "thought_process": "思维过程（线性/赘述/离题/联想松弛/思维奔逸/思维中断/言语贫乏）的中文描述",
    "thought_content": "思维内容（被害妄想/夸大妄想/关系妄想/虚无妄想、强迫观念、超价观念、自杀想法、杀人想法）的中文描述",
    "perception": "感知障碍（幻听/幻视/幻嗅/幻触、错觉、人格解体、现实解体）的中文描述",
    "cognition": "认知功能（人物/地点/时间定向力、注意力、记忆力即时/近期/远期、抽象思维、MoCA/MMSE得分如有）的中文描述",
    "insight": "自知力评估（良好/部分/有限/缺乏/完全丧失）的中文描述",
    "judgment": "判断力（良好/尚可/受损/严重受损）的中文描述",
    "suicide_risk": "自杀风险等级（无/低/中/高/极高）及自杀意念、计划、意图、手段、既往尝试的详细中文描述",
    "homicide_risk": "暴力风险等级（无/低/中/高）及暴力意图、计划、确定被害人的中文描述",
    "substance_use": "当前使用物质的种类、频次、用量、途径、时长、使用模式、戒断既往史的中文描述",
    "scale_scores": {"PHQ-9": <分数或null>, "GAD-7": <分数或null>, "YMRS": <分数或null>, "PANSS": <分数或null>, "PCL-5": <分数或null>, "AUDIT": <分数或null>, "MoCA": <分数或null>}
  },
  "neuro_imaging": [
    {"modality": "检查类型（CT/MRI）", "findings": "影像所见的中文描述", "conclusion": "影像诊断的中文描述（注意：精神科通常用于排除器质性病因）"}
  ]
}

## 规则
- 必须基于输入信息提取。绝不要编造医生未提及的症状、检查发现或检验结果。
- 从口语化表达中提取关键信息时，保留原始含义但不照搬口语措辞。
- 对于可合理推断但无法确认的信息，在描述字段中添加"（推断，待确认）"。
- 对于完全缺失的关键信息，将对应字段设为null —— 绝不填充虚构数据。
- 年龄必须为正整数。如输入为"二十多岁"，估算为25岁并在name或描述中标注。
- 始终识别并提炼主诉。
- mental_status_exam：从口语描述中提取任何MSE相关信息，即使是部分性的。如果完全没有MSE相关描述，将整个mental_status_exam设为null。
- 从口语描述中识别MSE时要严谨：如果医生说"看起来整个人很慢"，这属于appearance_and_behavior（精神运动性迟滞）；如果说"她跟我说"，这是转述患者的话，属于mood（主观情绪）。
- scale_scores：识别口语中提到的量表（如"抑郁量表22分"→PHQ-9 22分）。
- substance_use：始终尝试记录物质使用史，这对鉴别诊断至关重要，如未提及则标注缺失。
- suicide_risk和homicide_risk：如未评估，始终标记 —— 这是关键的安全评估。
- 识别医生自己的初步诊断印象（如"我觉得像抑郁症"），但这类信息不放入MSE，只用于辅助理解症状。
- 特别关注：发作持续时长、既往发作史、诱因、既往治疗疗效、自杀未遂史、物质使用模式、药物依从性、家族精神疾病史。
- 只返回合法JSON，不要用markdown代码块包裹。"""


def intake_agent(state) -> dict:
    """
    LangGraph 节点函数：
    1. 从 state 中读取原始患者描述（raw_input）
    2. 调用 LLM 解析为结构化 JSON
    3. 用 PatientInfo 模型验证数据
    4. 返回更新后的 state 字典（只返回需要更新的字段）
    """

    # 记录日志：开始处理，同时记录原始输入的长度（方便观察数据量，避免日志爆屏）
    # len(state.raw_input or "") 中的 or "" 是为了防止 raw_input 为 None 时报错。
    logger.info("intake_agent.start", raw_input_len=len(state.raw_input or ""))

    # -------------------------------------------------------------------------
    # 1. 取出原始患者描述
    # -------------------------------------------------------------------------
    # state 是一个类似字典的对象（LangGraph 状态），通常通过属性访问。
    # 例如 state.raw_input 等同于 state["raw_input"]。
    raw = state.raw_input
    if not raw:
        return {
            "patient_info": None,
            "current_agent": "intake",
            "errors": state.errors + ["No raw input provided to Intake Agent"],
        }

    # -------------------------------------------------------------------------
    # 2. 初始化 LLM（大语言模型）
    # -------------------------------------------------------------------------
    # get_settings() 返回一个包含配置的单例对象，通常从环境变量中读取。
    # 这样敏感信息（如 API Key）就不会硬编码在代码里。
    settings = get_settings()

    # 创建 ChatOpenAI 实例。
    # model：要使用的模型名称，比如 "gpt-4o"、"gpt-3.5-turbo"。
    # api_key：OpenAI API 密钥，从配置中读取。
    # temperature：0.1 表示几乎确定的输出，适合信息提取任务，
    #   因为我们需要严格按照 JSON 格式输出，不需要创造性。
    llm = ChatOpenAI(
        model=settings.openai_model,
        api_key=settings.openai_api_key,
        base_url=settings.openai_base_url or None,
        temperature=0.1,
    )

    # -------------------------------------------------------------------------
    # 3. 构建消息列表
    # -------------------------------------------------------------------------
    # SystemMessage：定义 AI 的行为和输出格式，此处就是上方的大段提示词。
    # HumanMessage：把实际的患者描述放进去。
    messages = [
        SystemMessage(content=INTAKE_SYSTEM_PROMPT),
        HumanMessage(content=f"患者临床描述：\n\n{raw}"),
    ]

    # -------------------------------------------------------------------------
    # 4. 调用 LLM 并处理响应
    # -------------------------------------------------------------------------
    try:
        # llm.invoke 会发送消息给 OpenAI，并返回一个 AIMessage 对象。
        # response.content 就是模型生成的文本字符串。
        response = llm.invoke(messages)
        content = response.content.strip()# 去除首尾空白

        # 有时候 LLM 会不听话，用 ```json ... ``` 包裹 JSON，我们需要去掉这些标记。
        # 简单处理：如果内容以 ``` 开头，则去掉第一行和最后一行。
        if content.startswith("```"):
            # 用换行符分割，取第二行到倒数第二行，再重新合并。
            # 例如 content = "```json\n{...}\n```"
            # split("\n", 1) 分割一次，得到 ["```json", "{...}\n```"]
            # 取第二部分 "{...}\n```"
            # rsplit("```", 1) 从右边分割一次，得到 ["{...}\n", ""]
            # 取第一部分并 strip，得到干净的 JSON 字符串。
            content = content.split("\n", 1)[1].rsplit("```", 1)[0].strip()

        # 把处理好的 JSON 字符串解析为 Python 字典。
        patient_data = json.loads(content)

        # 用 Pydantic 的 PatientInfo 模型来验证数据。
        # **patient_data 表示将字典展开为关键字参数。
        # 如果数据不符合模型定义（比如 age 是负数、缺少必填字段），会抛出 ValidationError。
        patient = PatientInfo(**patient_data)

        # 将 Pydantic 模型转为字典（mode="json" 保证所有值都是 JSON 兼容的，
        # 比如 datetime 会转成字符串，枚举会转成值等）。
        # 这么做是为了后续 LangGraph 状态能正常序列化（比如 Checkpointer）。
        patient_dict = patient.model_dump(mode="json")

        # 记录成功日志，打印患者姓名（从已验证的模型中获取，不是原始输入，更可靠）。
        logger.info("intake_agent.success", patient_name=patient.name)

        # 返回要更新的状态字段。
        # LangGraph 接收字典后，会将这些键值对合并进全局状态。
        return {
            "patient_info": patient_dict,
            "current_agent": "intake",
        }

    # -------------------------------------------------------------------------
    # 5. 错误处理
    # -------------------------------------------------------------------------
    # 如果 JSON 解析失败（LLM 返回的不是合法 JSON，即使用了解包裹也失败）
    except json.JSONDecodeError as e:
        logger.error("intake_agent.json_error", error=str(e))
        return {
            "patient_info": None,
            "current_agent": "intake",
            "errors": state.errors + [f"Intake JSON parse error: {e}"],
        }

    # 如果 Pydantic 验证失败、网络错误、模型超时等其他任何异常
    except Exception as e:
        logger.error("intake_agent.error", error=str(e))
        return {
            "patient_info": None,
            "current_agent": "intake",
            "errors": state.errors + [f"Intake error: {e}"],
        }
