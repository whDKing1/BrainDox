# =============================================================================
# GraphRAG 服务 —— 医学知识图谱检索（精神科）
# =============================================================================
# 本文件是项目 RAG（检索增强生成）的核心实现，采用 GraphRAG 架构：
#   传统 RAG：向量数据库做语义相似度搜索，只能找到“表面相似”的文本片段
#   GraphRAG：用知识图谱（Neo4j）存储实体和关系，支持“症状→疾病→治疗”多跳推理
#
# 双模式运行：
#   生产模式：连接 Neo4j 图数据库，执行 Cypher 查询，支持多跳推理
#   离线模式：使用内置的 SYMPTOM_DISEASE_MAP / DISEASE_ICD10_MAP 字典，
#             Neo4j 不可用时自动降级，确保演示和测试不中断
#
# 核心入口：
#   get_graphrag_service() —— 全局单例工厂函数
#   find_diseases_by_symptoms() —— 根据精神科症状列表匹配候选精神疾病并排名
# =============================================================================

"""
GraphRAG service — Medical knowledge graph retrieval for psychiatry.

Integrates with Neo4j to provide:
  - Psychiatric symptom-to-disease relationship queries
  - Disease-to-treatment pathway lookups
  - Multi-hop reasoning across medical ontologies (UMLS, SNOMED, ICD)
  - Evidence retrieval for clinical decision support
"""

from __future__ import annotations
from typing import Optional
import structlog

from ..config.settings import get_settings

logger = structlog.get_logger(__name__)

# =============================================================================
# 预置知识库 —— 离线/演示模式
# =============================================================================

# SYMPTOM_DISEASE_MAP:
# 精神科症状-疾病映射表。
# 键是精神科症状名称（小写、下划线分隔），值是与该症状相关联的可能精神疾病列表。
# 涵盖 DSM-5 主要诊断分类：心境障碍、焦虑障碍、精神分裂症谱系、创伤及应激障碍、
# 进食障碍、物质使用障碍、人格障碍、神经发育障碍等。
SYMPTOM_DISEASE_MAP = {
    "depressed_mood": ["重性抑郁障碍", "双相II型障碍", "持续性抑郁障碍（恶劣心境）", "适应障碍", "物质所致心境障碍"],
    "anhedonia": ["重性抑郁障碍", "双相抑郁", "精神分裂症阴性症状", "物质所致心境障碍"],
    "anxiety": ["广泛性焦虑障碍", "惊恐障碍", "社交焦虑障碍", "广场恐怖症", "创伤后应激障碍", "适应障碍"],
    "panic_attack": ["惊恐障碍", "广场恐怖症", "社交焦虑障碍", "创伤后应激障碍", "物质所致焦虑障碍"],
    "auditory_hallucination": ["精神分裂症", "分裂情感性障碍", "短暂精神病性障碍", "物质所致精神病性障碍", "伴精神病性特征的重性抑郁障碍", "伴精神病性特征的双相I型障碍"],
    "visual_hallucination": ["精神分裂症", "谵妄", "物质所致精神病性障碍", "路易体痴呆", "Charles Bonnet综合征"],
    "delusion": ["精神分裂症", "分裂情感性障碍", "妄想性障碍", "伴精神病性特征的双相I型障碍", "短暂精神病性障碍", "物质所致精神病性障碍"],
    "paranoia": ["偏执型精神分裂症", "被害型妄想性障碍", "物质所致精神病性障碍", "偏执型人格障碍"],
    "mania": ["双相I型障碍", "双相型分裂情感性障碍", "物质所致心境障碍"],
    "elevated_mood": ["双相I型障碍", "双相II型障碍", "环性心境障碍", "物质所致心境障碍"],
    "hypomania": ["双相II型障碍", "环性心境障碍", "物质所致心境障碍"],
    "obsession": ["强迫障碍", "躯体变形障碍", "囤积障碍", "拔毛癖"],
    "compulsion": ["强迫障碍", "躯体变形障碍", "囤积障碍", "抓痕障碍"],
    "trauma_flashback": ["创伤后应激障碍", "急性应激障碍", "复杂性创伤后应激障碍", "分离性身份障碍"],
    "hypervigilance": ["创伤后应激障碍", "急性应激障碍", "广泛性焦虑障碍", "偏执型人格障碍"],
    "nightmares": ["创伤后应激障碍", "急性应激障碍", "梦魇障碍", "快速眼动睡眠行为障碍"],
    "suicidal_ideation": ["重性抑郁障碍", "双相障碍", "边缘型人格障碍", "精神分裂症", "物质使用障碍"],
    "self_harm": ["边缘型人格障碍", "重性抑郁障碍", "神经性厌食症", "创伤后应激障碍"],
    "inattention": ["注意缺陷多动障碍", "双相抑郁", "广泛性焦虑障碍", "重性抑郁障碍"],
    "hyperactivity": ["注意缺陷多动障碍", "双相I型障碍躁狂发作", "物质所致多动"],
    "impulsivity": ["注意缺陷多动障碍", "双相I型障碍躁狂发作", "边缘型人格障碍", "物质使用障碍"],
    "social_withdrawal": ["精神分裂症", "社交焦虑障碍", "重性抑郁障碍", "分裂样人格障碍", "回避型人格障碍"],
    "negative_symptoms": ["精神分裂症", "分裂情感性障碍", "重性抑郁障碍", "分裂样人格障碍"],
    "cognitive_decline": ["阿尔茨海默病所致重度神经认知障碍", "血管性神经认知障碍", "重性抑郁障碍（假性痴呆）", "物质所致神经认知障碍"],
    "insomnia": ["重性抑郁障碍", "广泛性焦虑障碍", "双相障碍", "创伤后应激障碍", "物质使用障碍"],
    "hypersomnia": ["伴非典型特征的重性抑郁障碍", "双相抑郁", "季节性情感障碍", "发作性睡病"],
    "appetite_loss": ["重性抑郁障碍", "神经性厌食症", "精神分裂症", "广泛性焦虑障碍"],
    "appetite_increase": ["伴非典型特征的重性抑郁障碍", "神经性贪食症", "暴食障碍", "季节性情感障碍"],
    "weight_loss": ["神经性厌食症", "重性抑郁障碍", "物质使用障碍", "躯体症状障碍"],
    "weight_gain": ["神经性贪食症", "暴食障碍", "药物所致体重增加"],
    "substance_craving": ["酒精使用障碍", "阿片类使用障碍", "兴奋剂使用障碍", "大麻使用障碍", "镇静剂使用障碍"],
    "irritability": ["重性抑郁障碍", "双相障碍", "广泛性焦虑障碍", "创伤后应激障碍", "对立违抗障碍"],
    "emotional_lability": ["边缘型人格障碍", "双相障碍", "创伤后应激障碍", "物质使用障碍"],
    "dissociation": ["创伤后应激障碍", "分离性身份障碍", "人格解体/现实解体障碍", "急性应激障碍"],
    "somatic_complaints": ["躯体症状障碍", "疾病焦虑障碍", "转换障碍", "重性抑郁障碍", "广泛性焦虑障碍"],
    "apathy": ["精神分裂症阴性症状", "重性抑郁障碍", "额颞叶神经认知障碍", "阿尔茨海默病所致重度神经认知障碍"],
    "disorganized_speech": ["精神分裂症", "分裂情感性障碍", "短暂精神病性障碍", "物质所致精神病性障碍"],
    "catatonia": ["精神分裂症伴紧张症", "心境障碍伴紧张症", "躯体疾病所致紧张性障碍"],
    "tics": ["Tourette障碍", "持续性运动或发声抽动障碍", "物质所致抽动障碍"],
    "repetitive_behavior": ["强迫障碍", "孤独症谱系障碍", "刻板运动障碍", "Tourette障碍"],
    "confusion": ["谵妄", "阿尔茨海默病所致重度神经认知障碍", "物质所致精神病性障碍", "双相I型障碍躁狂发作"],
    "memory_loss": ["阿尔茨海默病所致重度神经认知障碍", "血管性神经认知障碍", "分离性身份障碍", "物质所致神经认知障碍"],
    "guilt": ["重性抑郁障碍", "创伤后应激障碍", "强迫障碍"],
    "fatigue": ["重性抑郁障碍", "广泛性焦虑障碍", "持续性抑郁障碍（恶劣心境）", "躯体症状障碍"],
    "psychomotor_retardation": ["重性抑郁障碍", "双相抑郁", "精神分裂症阴性症状", "帕金森病所致神经认知障碍"],
    "psychomotor_agitation": ["重性抑郁障碍伴激越", "双相I型障碍躁狂发作", "广泛性焦虑障碍", "创伤后应激障碍"],
    "early_morning_awakening": ["重性抑郁障碍", "广泛性焦虑障碍", "双相障碍"],
    "middle_insomnia": ["重性抑郁障碍", "广泛性焦虑障碍"],
    "difficulty_falling_asleep": ["广泛性焦虑障碍", "重性抑郁障碍", "创伤后应激障碍"],
}

# SYMPTOM_ALIAS: 中文症状名 → 英文键名映射
# 使表单输入的中文症状名能匹配到 SYMPTOM_DISEASE_MAP 的英文键
SYMPTOM_ALIAS = {
    "情绪低落": "depressed_mood",
    "抑郁情绪": "depressed_mood",
    "心情不好": "depressed_mood",
    "不开心": "depressed_mood",
    "兴趣丧失": "anhedonia",
    "快感缺失": "anhedonia",
    "没兴趣": "anhedonia",
    "提不起劲": "anhedonia",
    "焦虑": "anxiety",
    "紧张": "anxiety",
    "担心": "anxiety",
    "不安": "anxiety",
    "惊恐发作": "panic_attack",
    "心慌": "panic_attack",
    "突发恐惧": "panic_attack",
    "幻听": "auditory_hallucination",
    "听到声音": "auditory_hallucination",
    "幻视": "visual_hallucination",
    "看到东西": "visual_hallucination",
    "妄想": "delusion",
    "被害妄想": "paranoia",
    "疑心": "paranoia",
    "躁狂": "mania",
    "兴奋": "mania",
    "情绪高涨": "elevated_mood",
    "轻躁狂": "hypomania",
    "强迫思维": "obsession",
    "反复想": "obsession",
    "控制不住想": "obsession",
    "强迫行为": "compulsion",
    "反复做": "compulsion",
    "闪回": "trauma_flashback",
    "反复回忆": "trauma_flashback",
    "过度警觉": "hypervigilance",
    "一惊一乍": "hypervigilance",
    "噩梦": "nightmares",
    "做噩梦": "nightmares",
    "自杀意念": "suicidal_ideation",
    "想死": "suicidal_ideation",
    "不想活": "suicidal_ideation",
    "自伤": "self_harm",
    "划手": "self_harm",
    "注意力不集中": "inattention",
    "走神": "inattention",
    "多动": "hyperactivity",
    "坐不住": "hyperactivity",
    "冲动": "impulsivity",
    "社交退缩": "social_withdrawal",
    "不愿见人": "social_withdrawal",
    "阴性症状": "negative_symptoms",
    "情感淡漠": "apathy",
    "什么都不想做": "apathy",
    "认知下降": "cognitive_decline",
    "记性差": "cognitive_decline",
    "失眠": "insomnia",
    "入睡困难": "difficulty_falling_asleep",
    "早醒": "early_morning_awakening",
    "醒得早": "early_morning_awakening",
    "中段失眠": "middle_insomnia",
    "嗜睡": "hypersomnia",
    "睡得多": "hypersomnia",
    "食欲不振": "appetite_loss",
    "不想吃饭": "appetite_loss",
    "食欲增加": "appetite_increase",
    "吃得多": "appetite_increase",
    "体重下降": "weight_loss",
    "消瘦": "weight_loss",
    "体重增加": "weight_gain",
    "变胖": "weight_gain",
    "物质渴求": "substance_craving",
    "想喝酒": "substance_craving",
    "易激惹": "irritability",
    "容易发火": "irritability",
    "烦躁": "irritability",
    "情绪不稳": "emotional_lability",
    "情绪波动": "emotional_lability",
    "解离": "dissociation",
    "不真实感": "dissociation",
    "躯体不适": "somatic_complaints",
    "身体不舒服": "somatic_complaints",
    "言语紊乱": "disorganized_speech",
    "胡言乱语": "disorganized_speech",
    "紧张症": "catatonia",
    "不动": "catatonia",
    "抽动": "tics",
    "眨眼": "tics",
    "重复行为": "repetitive_behavior",
    "意识模糊": "confusion",
    "糊涂": "confusion",
    "记忆下降": "memory_loss",
    "健忘": "memory_loss",
    "内疚": "guilt",
    "罪恶感": "guilt",
    "疲劳": "fatigue",
    "乏力": "fatigue",
    "精神运动性迟滞": "psychomotor_retardation",
    "反应慢": "psychomotor_retardation",
    "精神运动性激越": "psychomotor_agitation",
    "坐立不安": "psychomotor_agitation",
    "被动自杀意念": "suicidal_ideation",
    "主动自杀意念": "suicidal_ideation",
}


def _normalize_symptom(symptom: str) -> str | None:
    """将症状名标准化为 SYMPTOM_DISEASE_MAP 的键。

    先查中文别名映射，再尝试英文标准化（小写 + 下划线）。
    若完全无法匹配则返回 None。
    """
    s = symptom.strip()
    # 中文别名映射
    if s in SYMPTOM_ALIAS:
        return SYMPTOM_ALIAS[s]
    # 英文键标准化
    key = s.lower().replace(" ", "_").replace("-", "_")
    if key in SYMPTOM_DISEASE_MAP:
        return key
    return None

# DISEASE_ICD10_MAP:
# 精神科疾病-ICD-10编码映射表。
# 全部使用 F 码（精神与行为障碍 F00-F99）作为主要编码，
# 部分疾病使用 G 码（神经系统）或 E 码（内分泌）作为交叉引用。
DISEASE_ICD10_MAP = {
    "重性抑郁障碍": {"code": "F32.9", "desc": "重性抑郁障碍，单次发作，未特定"},
    "复发性重性抑郁障碍": {"code": "F33.9", "desc": "重性抑郁障碍，复发性，未特定"},
    "持续性抑郁障碍（恶劣心境）": {"code": "F34.1", "desc": "恶劣心境障碍"},
    "双相I型障碍": {"code": "F31.9", "desc": "双相障碍，未特定"},
    "双相障碍": {"code": "F31.9", "desc": "双相障碍，未特定"},
    "双相I型障碍躁狂发作": {"code": "F31.10", "desc": "双相障碍，当前躁狂发作不伴精神病性特征，未特定"},
    "伴精神病性特征的双相I型障碍": {"code": "F31.2", "desc": "双相障碍，当前躁狂发作伴精神病性特征"},
    "双相II型障碍": {"code": "F31.81", "desc": "双相II型障碍"},
    "双相抑郁": {"code": "F31.30", "desc": "双相障碍，当前抑郁发作，轻度或中度"},
    "环性心境障碍": {"code": "F34.0", "desc": "环性心境障碍"},
    "精神分裂症": {"code": "F20.9", "desc": "精神分裂症，未特定"},
    "偏执型精神分裂症": {"code": "F20.0", "desc": "偏执型精神分裂症"},
    "精神分裂症阴性症状": {"code": "F20.5", "desc": "残留型精神分裂症"},
    "分裂情感性障碍": {"code": "F25.9", "desc": "分裂情感性障碍，未特定"},
    "双相型分裂情感性障碍": {"code": "F25.0", "desc": "分裂情感性障碍，双相型"},
    "短暂精神病性障碍": {"code": "F23", "desc": "短暂精神病性障碍"},
    "妄想性障碍": {"code": "F22", "desc": "妄想性障碍"},
    "被害型妄想性障碍": {"code": "F22", "desc": "妄想性障碍"},
    "伴精神病性特征的重性抑郁障碍": {"code": "F32.3", "desc": "重性抑郁障碍，单次发作，伴精神病性特征"},
    "重性抑郁障碍（假性痴呆）": {"code": "F32.9", "desc": "重性抑郁障碍，单次发作，未特定"},
    "伴非典型特征的重性抑郁障碍": {"code": "F32.89", "desc": "其他特定的抑郁发作"},
    "物质所致精神病性障碍": {"code": "F19.159", "desc": "其他精神活性物质所致精神病性障碍"},
    "物质所致心境障碍": {"code": "F19.94", "desc": "其他精神活性物质所致抑郁障碍"},
    "物质所致焦虑障碍": {"code": "F19.980", "desc": "其他精神活性物质所致焦虑障碍"},
    "物质所致多动": {"code": "F14.921", "desc": "可卡因中毒伴谵妄"},
    "物质所致神经认知障碍": {"code": "F19.97", "desc": "其他精神活性物质所致持续性痴呆"},
    "物质所致抽动障碍": {"code": "F19.921", "desc": "其他精神活性物质所致谵妄"},
    "广泛性焦虑障碍": {"code": "F41.1", "desc": "广泛性焦虑障碍"},
    "惊恐障碍": {"code": "F41.0", "desc": "惊恐障碍（发作性阵发性焦虑）"},
    "广场恐怖症": {"code": "F40.00", "desc": "伴惊恐障碍的广场恐怖症"},
    "社交焦虑障碍": {"code": "F40.10", "desc": "社交恐怖症，未特定"},
    "强迫障碍": {"code": "F42.9", "desc": "强迫障碍，未特定"},
    "躯体变形障碍": {"code": "F45.22", "desc": "躯体变形障碍"},
    "囤积障碍": {"code": "F42.3", "desc": "囤积障碍"},
    "拔毛癖": {"code": "F63.3", "desc": "拔毛癖"},
    "抓痕障碍": {"code": "F42.4", "desc": "抓痕（皮肤搔抓）障碍"},
    "创伤后应激障碍": {"code": "F43.10", "desc": "创伤后应激障碍，未特定"},
    "复杂性创伤后应激障碍": {"code": "F43.10", "desc": "创伤后应激障碍，未特定"},
    "急性应激障碍": {"code": "F43.0", "desc": "急性应激反应"},
    "适应障碍": {"code": "F43.20", "desc": "适应障碍，未特定"},
    "分离性身份障碍": {"code": "F44.81", "desc": "分离性身份障碍"},
    "人格解体/现实解体障碍": {"code": "F48.1", "desc": "人格解体-现实解体综合征"},
    "转换障碍": {"code": "F44.9", "desc": "分离（转换）性障碍，未特定"},
    "躯体症状障碍": {"code": "F45.9", "desc": "躯体形式障碍，未特定"},
    "疾病焦虑障碍": {"code": "F45.21", "desc": "疑病障碍"},
    "神经性厌食症": {"code": "F50.00", "desc": "神经性厌食症，未特定"},
    "神经性贪食症": {"code": "F50.2", "desc": "神经性贪食症"},
    "暴食障碍": {"code": "F50.81", "desc": "暴食障碍"},
    "酒精使用障碍": {"code": "F10.20", "desc": "酒精使用障碍，中度或重度"},
    "阿片类使用障碍": {"code": "F11.20", "desc": "阿片类使用障碍，中度或重度"},
    "兴奋剂使用障碍": {"code": "F15.20", "desc": "其他兴奋剂使用障碍，中度或重度"},
    "大麻使用障碍": {"code": "F12.20", "desc": "大麻使用障碍，中度或重度"},
    "镇静剂使用障碍": {"code": "F13.20", "desc": "镇静、催眠或抗焦虑药使用障碍，中度或重度"},
    "物质使用障碍": {"code": "F19.20", "desc": "其他精神活性物质使用障碍，中度或重度"},
    "边缘型人格障碍": {"code": "F60.3", "desc": "边缘型人格障碍"},
    "偏执型人格障碍": {"code": "F60.0", "desc": "偏执型人格障碍"},
    "分裂样人格障碍": {"code": "F60.1", "desc": "分裂样人格障碍"},
    "回避型人格障碍": {"code": "F60.6", "desc": "回避型人格障碍"},
    "注意缺陷多动障碍": {"code": "F90.9", "desc": "注意缺陷多动障碍，未特定"},
    "孤独症谱系障碍": {"code": "F84.0", "desc": "孤独症障碍"},
    "Tourette障碍": {"code": "F95.2", "desc": "Tourette障碍"},
    "对立违抗障碍": {"code": "F91.3", "desc": "对立违抗障碍"},
    "阿尔茨海默病所致重度神经认知障碍": {"code": "F02.81", "desc": "分类于他处的其他疾病所致痴呆，伴行为紊乱"},
    "阿尔茨海默病": {"code": "G30.9", "desc": "阿尔茨海默病，未特定"},
    "血管性神经认知障碍": {"code": "F01.50", "desc": "不伴行为紊乱的血管性痴呆"},
    "谵妄": {"code": "F05", "desc": "已知生理状况所致谵妄"},
    "精神分裂症伴紧张症": {"code": "F20.2", "desc": "紧张型精神分裂症"},
    "心境障碍伴紧张症": {"code": "F06.1", "desc": "已知生理状况所致紧张性障碍"},
    "躯体疾病所致紧张性障碍": {"code": "F06.1", "desc": "已知生理状况所致紧张性障碍"},
    "梦魇障碍": {"code": "F51.5", "desc": "梦魇障碍"},
    "额颞叶神经认知障碍": {"code": "F02.A0", "desc": "额颞叶神经认知障碍"},
    "季节性情感障碍": {"code": "F33.9", "desc": "重性抑郁障碍，复发性，未特定"},
    "持续性运动或发声抽动障碍": {"code": "F95.1", "desc": "持续性（慢性）运动或发声抽动障碍"},
    "刻板运动障碍": {"code": "F98.4", "desc": "刻板运动障碍"},
    "药物所致体重增加": {"code": "E66.9", "desc": "肥胖症，未特定"},
    "路易体痴呆": {"code": "F02.80", "desc": "分类于他处的其他疾病所致痴呆"},
    "Charles Bonnet综合征": {"code": "R44.1", "desc": "幻视"},
    "快速眼动睡眠行为障碍": {"code": "G47.52", "desc": "快速眼动睡眠行为障碍"},
    "发作性睡病": {"code": "G47.419", "desc": "不伴猝倒的发作性睡病"},
}


class GraphRAGService:
    """
    精神科知识图谱检索服务。

    生产模式：连接 Neo4j 图数据库，执行症状→精神疾病→ICD-10编码三跳查询。
    离线模式：使用内置 PSYCH_SYMPTOM_DISEASE_MAP / DISEASE_ICD10_MAP 字典。

    设计要点：
    - 使用 Neo4j 图形数据库存储复杂的精神医学本体（如 UMLS、SNOMED）。
    - 当 Neo4j 不可用时，自动降级为本地预置词典，确保演示或测试不中断。
    - 通过精神科症状匹配进行疾病检索，并返回 ICD-10 编码以辅助编码代理。
    """

    def __init__(self, use_neo4j: bool = False):
        """
        初始化服务。
        参数:
            use_neo4j: 是否尝试连接 Neo4j。即使设为 True，连接失败也会自动降级（fallback）。
        """
        self.use_neo4j = use_neo4j
        self._driver = None


    async def connect(self):
        """
        同步连接到 Neo4j 数据库（使用同步驱动，与 find_diseases_by_symptoms 保持一致）。
        如果 use_neo4j 为 True，尝试建立连接并验证连通性。
        连接失败则自动降级为离线模式。
        """
        if self.use_neo4j:
            try:
                from neo4j import GraphDatabase
                settings = get_settings()
                self._driver = GraphDatabase.driver(
                    settings.neo4j_uri,
                    auth=(settings.neo4j_user, settings.neo4j_password),
                )
                self._driver.verify_connectivity()
                logger.info("graphrag.neo4j_connected")
            except Exception as e:
                logger.warning("graphrag.neo4j_fallback", error=str(e))
                self.use_neo4j = False
                self._driver = None

    def find_diseases_by_symptoms(self, symptoms: list[str]) -> list[dict]:
        """
        根据精神科症状列表查找候选精神疾病（双模式：Neo4j 优先，离线兜底）。

        Neo4j 模式：一条 Cypher 完成 Symptom→Disease→ICD10Code 三跳查询。
        离线模式：使用内置 SYMPTOM_DISEASE_MAP 投票计数 + DISEASE_ICD10_MAP 补全编码。

        返回:
            列表，每项包含 disease, symptom_match_count, icd10_code, icd10_description。
        """
        if self.use_neo4j and self._driver:
            try:
                return self._find_diseases_neo4j(symptoms)
            except Exception as e:
                logger.warning("graphrag.neo4j_query_failed_fallback", error=str(e))
        return self._find_diseases_offline(symptoms)

    def find_diseases_with_paths(self, symptoms: list[str], top_k: int = 3) -> list[dict]:
        """
        检索候选疾病并附带图检索路径（症状→疾病），供前端展示 GraphRAG 推理链路。

        直接基于 SYMPTOM_DISEASE_MAP 投票计数 + 路径构建，不依赖 find_diseases_by_symptoms，
        避免 Neo4j/离线模式切换导致的空白结果。

        返回 top_k 个候选疾病，每个包含：
          - disease, icd10_code, icd10_description, symptom_match_count
          - matched_symptoms: 命中该疾病的症状列表（图路径链）
          - total_symptoms: 输入的原始症状总数（归一化后）
        """
        normalized_keys = []
        for s in symptoms:
            key = _normalize_symptom(s)
            if key:
                normalized_keys.append(key)
        if not normalized_keys:
            return []

        disease_scores: dict[str, int] = {}
        disease_symptom_map: dict[str, list[str]] = {}
        for sym_key in normalized_keys:
            for disease in SYMPTOM_DISEASE_MAP.get(sym_key, []):
                disease_scores[disease] = disease_scores.get(disease, 0) + 1
                if disease not in disease_symptom_map:
                    disease_symptom_map[disease] = []
                disease_symptom_map[disease].append(sym_key.replace("_", " "))

        ranked = sorted(disease_scores.items(), key=lambda x: x[1], reverse=True)
        full_list = []
        for disease, score in ranked[:top_k]:
            icd = DISEASE_ICD10_MAP.get(disease, {})
            full_list.append({
                "disease": disease,
                "icd10_code": icd.get("code", ""),
                "icd10_description": icd.get("desc", ""),
                "symptom_match_count": score,
                "total_symptoms": len(normalized_keys),
                "matched_symptoms": disease_symptom_map.get(disease, []),
            })
        logger.info("graphrag.find_diseases_with_paths", keys=normalized_keys, results=[f"{r['disease']}({r['symptom_match_count']})" for r in full_list])
        return full_list

    def _find_diseases_neo4j(self, symptoms: list[str]) -> list[dict]:
        """使用 Cypher 在 Neo4j 中执行 Symptom→Disease→ICD10Code 三跳查询。"""
        normalized = []
        for s in symptoms:
            key = _normalize_symptom(s)
            if key:
                normalized.append(key)
        if not normalized:
            return []
        with self._driver.session() as session:
            result = session.run(
                "MATCH (s:Symptom)-[:INDICATES]->(d:Disease) "
                "WHERE s.name IN $symptoms "
                "OPTIONAL MATCH (d)-[:HAS_CODE]->(c:ICD10Code) "
                "RETURN d.name AS disease, c.code AS icd10_code, c.description AS icd10_desc, "
                "COUNT(DISTINCT s) AS symptom_match_count "
                "ORDER BY symptom_match_count DESC",
                symptoms=normalized,
            )
            results = []
            for record in result:
                data = record.data()
                if data.get("icd10_code") is None:
                    data["icd10_code"] = ""
                if data.get("icd10_desc") is None:
                    data["icd10_desc"] = ""
                results.append(data)
            return results

    def _find_diseases_offline(self, symptoms: list[str]) -> list[dict]:
        """离线模式：使用内置 SYMPTOM_DISEASE_MAP 投票计数。"""
        disease_scores: dict[str, int] = {}
        for symptom in symptoms:
            key = _normalize_symptom(symptom)
            if not key:
                continue
            for disease in SYMPTOM_DISEASE_MAP.get(key, []):
                disease_scores[disease] = disease_scores.get(disease, 0) + 1
        ranked = sorted(disease_scores.items(), key=lambda x: x[1], reverse=True)
        results = []
        for disease, score in ranked:
            icd = DISEASE_ICD10_MAP.get(disease, {})
            results.append({
                "disease": disease,
                "symptom_match_count": score,
                "icd10_code": icd.get("code", ""),
                "icd10_description": icd.get("desc", ""),
            })
        return results

    def get_icd10(self, disease_name: str) -> Optional[dict]:
        """
        根据精神疾病名称查找对应的 ICD-10 信息。
        如果疾病不在映射表中，返回 None。
        """
        return DISEASE_ICD10_MAP.get(disease_name)

    def query_neo4j(self, cypher: str, params: dict = None) -> list[dict]:
        """在 Neo4j 中执行 Cypher 查询（同步）。若 driver 未初始化则降级返回空列表。"""
        if not self._driver:
            logger.warning("graphrag.neo4j_not_connected")
            return []
        with self._driver.session() as session:
            result = session.run(cypher, params or {})
            return [record.data() for record in result]

    def close(self):
        """关闭 Neo4j 驱动连接，释放资源。"""
        if self._driver:
            self._driver.close()
            self._driver = None

# =============================================================================
# 单例模式：全局唯一的 GraphRAGService 实例
# =============================================================================

# 模块级变量，保存实例。初始为 None。
_service: Optional[GraphRAGService] = None


def get_graphrag_service() -> GraphRAGService:
    """
    获取全局唯一的 GraphRAGService 实例（单例模式）。
    读取配置中的 neo4j_password：有值则自动启用 Neo4j 模式，否则使用离线字典。
    """
    global _service
    if _service is None:
        settings = get_settings()
        use_neo4j = bool(settings.neo4j_password)
        _service = GraphRAGService(use_neo4j=use_neo4j)
        logger.info("graphrag.mode", use_neo4j=use_neo4j)
    return _service
