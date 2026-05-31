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

# SYMPTOM_WEIGHTS:
# 症状-疾病关联强度权重（0.0-1.0）。
# 值越高表示该症状对诊断该疾病的贡献越大。
# 未指定的组合默认权重为 1.0（保持向后兼容）。
# 权重依据：DSM-5 诊断标准中该症状对诊断的敏感度/特异度。
SYMPTOM_WEIGHTS: dict[tuple[str, str], float] = {
    # ── 心境症状 ──
    ("depressed_mood", "重性抑郁障碍"): 0.95,
    ("depressed_mood", "持续性抑郁障碍（恶劣心境）"): 0.80,
    ("depressed_mood", "双相II型障碍"): 0.60,
    ("depressed_mood", "适应障碍"): 0.40,
    ("depressed_mood", "物质所致心境障碍"): 0.25,
    ("anhedonia", "重性抑郁障碍"): 0.90,
    ("anhedonia", "双相抑郁"): 0.55,
    ("anhedonia", "精神分裂症阴性症状"): 0.50,
    ("anhedonia", "物质所致心境障碍"): 0.20,
    # ── 焦虑症状 ──
    ("anxiety", "广泛性焦虑障碍"): 0.95,
    ("anxiety", "惊恐障碍"): 0.50,
    ("anxiety", "社交焦虑障碍"): 0.70,
    ("anxiety", "广场恐怖症"): 0.50,
    ("anxiety", "创伤后应激障碍"): 0.55,
    ("anxiety", "适应障碍"): 0.40,
    ("panic_attack", "惊恐障碍"): 0.95,
    ("panic_attack", "广场恐怖症"): 0.60,
    ("panic_attack", "社交焦虑障碍"): 0.35,
    ("panic_attack", "创伤后应激障碍"): 0.40,
    ("panic_attack", "物质所致焦虑障碍"): 0.30,
    # ── 精神病性症状 ──
    ("auditory_hallucination", "精神分裂症"): 0.90,
    ("auditory_hallucination", "分裂情感性障碍"): 0.75,
    ("auditory_hallucination", "短暂精神病性障碍"): 0.50,
    ("auditory_hallucination", "物质所致精神病性障碍"): 0.40,
    ("auditory_hallucination", "伴精神病性特征的重性抑郁障碍"): 0.60,
    ("auditory_hallucination", "伴精神病性特征的双相I型障碍"): 0.55,
    ("delusion", "精神分裂症"): 0.85,
    ("delusion", "分裂情感性障碍"): 0.70,
    ("delusion", "妄想性障碍"): 0.95,
    ("delusion", "伴精神病性特征的双相I型障碍"): 0.60,
    ("delusion", "短暂精神病性障碍"): 0.55,
    ("delusion", "物质所致精神病性障碍"): 0.40,
    ("paranoia", "偏执型精神分裂症"): 0.90,
    ("paranoia", "被害型妄想性障碍"): 0.85,
    ("paranoia", "物质所致精神病性障碍"): 0.35,
    ("paranoia", "偏执型人格障碍"): 0.70,
    # ── 双相症状 ──
    ("mania", "双相I型障碍"): 0.95,
    ("mania", "双相型分裂情感性障碍"): 0.70,
    ("mania", "物质所致心境障碍"): 0.25,
    ("elevated_mood", "双相I型障碍"): 0.85,
    ("elevated_mood", "双相II型障碍"): 0.75,
    ("elevated_mood", "环性心境障碍"): 0.65,
    ("elevated_mood", "物质所致心境障碍"): 0.20,
    ("hypomania", "双相II型障碍"): 0.95,
    ("hypomania", "环性心境障碍"): 0.70,
    ("hypomania", "物质所致心境障碍"): 0.20,
    # ── 强迫症状 ──
    ("obsession", "强迫障碍"): 0.95,
    ("obsession", "躯体变形障碍"): 0.45,
    ("obsession", "囤积障碍"): 0.40,
    ("obsession", "拔毛癖"): 0.20,
    ("compulsion", "强迫障碍"): 0.90,
    ("compulsion", "躯体变形障碍"): 0.40,
    ("compulsion", "囤积障碍"): 0.50,
    ("compulsion", "抓痕障碍"): 0.25,
    # ── 创伤症状 ──
    ("trauma_flashback", "创伤后应激障碍"): 0.95,
    ("trauma_flashback", "急性应激障碍"): 0.70,
    ("trauma_flashback", "复杂性创伤后应激障碍"): 0.85,
    ("trauma_flashback", "分离性身份障碍"): 0.50,
    ("hypervigilance", "创伤后应激障碍"): 0.80,
    ("hypervigilance", "广泛性焦虑障碍"): 0.40,
    ("hypervigilance", "急性应激障碍"): 0.60,
    ("hypervigilance", "偏执型人格障碍"): 0.50,
    ("nightmares", "创伤后应激障碍"): 0.80,
    ("nightmares", "急性应激障碍"): 0.55,
    ("nightmares", "梦魇障碍"): 0.85,
    ("nightmares", "快速眼动睡眠行为障碍"): 0.50,
    # ── 自杀自伤 ──
    ("suicidal_ideation", "重性抑郁障碍"): 0.75,
    ("suicidal_ideation", "边缘型人格障碍"): 0.55,
    ("suicidal_ideation", "双相障碍"): 0.50,
    ("suicidal_ideation", "精神分裂症"): 0.30,
    ("suicidal_ideation", "物质使用障碍"): 0.25,
    # ── 注意/多动 ──
    ("inattention", "注意缺陷多动障碍"): 0.90,
    ("inattention", "双相抑郁"): 0.30,
    ("inattention", "广泛性焦虑障碍"): 0.25,
    ("inattention", "重性抑郁障碍"): 0.30,
    ("hyperactivity", "注意缺陷多动障碍"): 0.85,
    ("hyperactivity", "双相I型障碍躁狂发作"): 0.50,
    ("hyperactivity", "物质所致多动"): 0.20,
    ("impulsivity", "注意缺陷多动障碍"): 0.60,
    ("impulsivity", "双相I型障碍躁狂发作"): 0.55,
    ("impulsivity", "边缘型人格障碍"): 0.70,
    ("impulsivity", "物质使用障碍"): 0.35,
    # ── 睡眠症状 ──
    ("insomnia", "重性抑郁障碍"): 0.60,
    ("insomnia", "广泛性焦虑障碍"): 0.65,
    ("insomnia", "双相障碍"): 0.40,
    ("insomnia", "创伤后应激障碍"): 0.45,
    ("insomnia", "物质使用障碍"): 0.20,
    ("hypersomnia", "伴非典型特征的重性抑郁障碍"): 0.75,
    ("hypersomnia", "双相抑郁"): 0.50,
    ("hypersomnia", "季节性情感障碍"): 0.60,
    ("hypersomnia", "发作性睡病"): 0.80,
    # ── 进食/体重 ──
    ("appetite_loss", "重性抑郁障碍"): 0.55,
    ("appetite_loss", "神经性厌食症"): 0.80,
    ("appetite_loss", "广泛性焦虑障碍"): 0.20,
    ("appetite_increase", "伴非典型特征的重性抑郁障碍"): 0.65,
    ("appetite_increase", "神经性贪食症"): 0.70,
    ("appetite_increase", "暴食障碍"): 0.75,
    ("appetite_increase", "季节性情感障碍"): 0.55,
    # ── 物质使用 ──
    ("substance_craving", "酒精使用障碍"): 0.85,
    ("substance_craving", "阿片类使用障碍"): 0.85,
    ("substance_craving", "兴奋剂使用障碍"): 0.85,
    ("substance_craving", "大麻使用障碍"): 0.80,
    ("substance_craving", "镇静剂使用障碍"): 0.80,
    # ── 社交/阴性 ──
    ("social_withdrawal", "精神分裂症"): 0.60,
    ("social_withdrawal", "社交焦虑障碍"): 0.70,
    ("social_withdrawal", "重性抑郁障碍"): 0.50,
    ("social_withdrawal", "分裂样人格障碍"): 0.65,
    ("social_withdrawal", "回避型人格障碍"): 0.75,
    ("negative_symptoms", "精神分裂症"): 0.85,
    ("negative_symptoms", "分裂情感性障碍"): 0.55,
    ("negative_symptoms", "重性抑郁障碍"): 0.35,
    # ── 认知 ──
    ("cognitive_decline", "阿尔茨海默病所致重度神经认知障碍"): 0.85,
    ("cognitive_decline", "血管性神经认知障碍"): 0.75,
    ("cognitive_decline", "重性抑郁障碍（假性痴呆）"): 0.45,
    ("cognitive_decline", "物质所致神经认知障碍"): 0.40,
    ("memory_loss", "阿尔茨海默病所致重度神经认知障碍"): 0.90,
    ("memory_loss", "血管性神经认知障碍"): 0.70,
    ("memory_loss", "分离性身份障碍"): 0.35,
    ("memory_loss", "物质所致神经认知障碍"): 0.40,
    # ── 其他 ──
    ("catatonia", "精神分裂症伴紧张症"): 0.90,
    ("catatonia", "心境障碍伴紧张症"): 0.70,
    ("catatonia", "躯体疾病所致紧张性障碍"): 0.65,
    ("confusion", "谵妄"): 0.90,
    ("confusion", "阿尔茨海默病所致重度神经认知障碍"): 0.50,
    ("confusion", "物质所致精神病性障碍"): 0.30,
    ("confusion", "双相I型障碍躁狂发作"): 0.25,
    ("tics", "Tourette障碍"): 0.90,
    ("tics", "持续性运动或发声抽动障碍"): 0.75,
    ("tics", "物质所致抽动障碍"): 0.20,
    ("guilt", "重性抑郁障碍"): 0.60,
    ("guilt", "创伤后应激障碍"): 0.35,
    ("guilt", "强迫障碍"): 0.30,
    ("fatigue", "重性抑郁障碍"): 0.55,
    ("fatigue", "广泛性焦虑障碍"): 0.40,
    ("fatigue", "持续性抑郁障碍（恶劣心境）"): 0.50,
    ("fatigue", "躯体症状障碍"): 0.30,
    ("apathy", "精神分裂症阴性症状"): 0.70,
    ("apathy", "重性抑郁障碍"): 0.50,
    ("apathy", "额颞叶神经认知障碍"): 0.65,
    ("apathy", "阿尔茨海默病所致重度神经认知障碍"): 0.40,
    ("irritability", "重性抑郁障碍"): 0.50,
    ("irritability", "双相障碍"): 0.50,
    ("irritability", "广泛性焦虑障碍"): 0.30,
    ("irritability", "创伤后应激障碍"): 0.35,
    ("irritability", "对立违抗障碍"): 0.70,
    ("somatic_complaints", "躯体症状障碍"): 0.85,
    ("somatic_complaints", "疾病焦虑障碍"): 0.60,
    ("somatic_complaints", "转换障碍"): 0.55,
    ("somatic_complaints", "重性抑郁障碍"): 0.30,
    ("somatic_complaints", "广泛性焦虑障碍"): 0.25,
    ("dissociation", "创伤后应激障碍"): 0.60,
    ("dissociation", "分离性身份障碍"): 0.85,
    ("dissociation", "人格解体/现实解体障碍"): 0.80,
    ("dissociation", "急性应激障碍"): 0.50,
    ("emotional_lability", "边缘型人格障碍"): 0.75,
    ("emotional_lability", "双相障碍"): 0.45,
    ("emotional_lability", "创伤后应激障碍"): 0.30,
    ("emotional_lability", "物质使用障碍"): 0.20,
}

# SYMPTOM_ALIASES:
# 每个标准化症状键对应的更多同义词/变体（用于图谱检索扩展）。
# 与 SYMPTOM_ALIAS（中文→键的精确映射）不同，此表用于模糊扩展检索。
SYMPTOM_ALIASES: dict[str, list[str]] = {
    "depressed_mood": ["沮丧", "悲伤", "消沉", "哀伤", "忧郁"],
    "anhedonia": ["无愉快感", "快乐缺失", "麻木"],
    "anxiety": ["担忧", "惶恐", "心神不宁"],
    "panic_attack": ["窒息感", "濒死感", "失控感"],
    "auditory_hallucination": ["幻听", "评论性幻听", "命令性幻听"],
    "visual_hallucination": ["幻视", "视幻觉"],
    "delusion": ["幻觉", "系统性妄想", "非系统性妄想"],
    "paranoia": ["被监视感", "被跟踪感", "关系妄想"],
    "mania": ["躁狂发作", "狂躁", "精力旺盛"],
    "elevated_mood": ["欣快", "过度乐观", "兴高采烈"],
    "hypomania": ["轻躁狂发作"],
    "obsession": ["反复念头", "闯入性思维", "强迫观念"],
    "compulsion": ["反复动作", "强迫仪式", "反复检查"],
    "trauma_flashback": ["创伤再体验", "闯入性回忆"],
    "hypervigilance": ["警觉性增高", "易受惊吓"],
    "nightmares": ["恐怖梦境", "梦魇"],
    "suicidal_ideation": ["自杀念头", "死亡念头", "结束生命"],
    "self_harm": ["自残", "割腕", "伤害自己"],
    "inattention": ["注意力下降", "易分心"],
    "hyperactivity": ["静不下来", "不停活动"],
    "impulsivity": ["冲动行为", "不计后果"],
    "social_withdrawal": ["回避社交", "自我封闭", "离群索居"],
    "negative_symptoms": ["意志减退", "思维贫乏", "社交回避"],
    "cognitive_decline": ["认知功能下降", "思维迟缓"],
    "insomnia": ["难以入睡", "睡眠障碍", "睡眠差"],
    "hypersomnia": ["睡眠过多", "白天嗜睡"],
    "appetite_loss": ["食欲减退", "不思饮食"],
    "appetite_increase": ["食欲亢进", "贪食"],
    "weight_loss": ["体重减轻", "变瘦"],
    "weight_gain": ["体重增加", "发胖"],
    "substance_craving": ["渴求感", "成瘾渴求", "戒断渴求"],
    "irritability": ["易怒", "脾气暴躁", "愤怒"],
    "emotional_lability": ["情绪波动大", "喜怒无常"],
    "dissociation": ["神游", "恍惚", "不真实感"],
    "somatic_complaints": ["躯体不适", "疼痛", "身体难受"],
    "apathy": ["漠不关心", "缺乏动力", "懒散"],
    "disorganized_speech": ["思维散漫", "语言混乱", "语无伦次"],
    "catatonia": ["木僵", "蜡样屈曲", "违拗"],
    "tics": ["不自主抽动", "肌肉跳动"],
    "repetitive_behavior": ["重复动作", "刻板行为"],
    "confusion": ["意识混浊", "神志不清"],
    "memory_loss": ["遗忘", "记性差", "近记忆力下降"],
    "guilt": ["自罪感", "自责"],
    "fatigue": ["精力减退", "疲倦", "没精神"],
    "psychomotor_retardation": ["动作迟缓", "反应迟钝"],
    "psychomotor_agitation": ["坐立不安", "搓手顿足"],
    "early_morning_awakening": ["清晨早醒", "凌晨醒来"],
    "middle_insomnia": ["睡中易醒", "夜间醒"],
    "difficulty_falling_asleep": ["入睡困难", "躺床难眠"],
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

    支持四层匹配（按优先级）：
      1. SYMPTOM_ALIAS 精确映射（中文→键）
      2. SYMPTOM_ALIASES 同义词扩展（倒查键）
      3. 英文标准化（小写 + 下划线）
      4. SYMPTOM_DISEASE_MAP 直接键匹配
    若完全无法匹配则返回 None。
    """
    s = symptom.strip()
    # 1. 中文别名精确映射
    if s in SYMPTOM_ALIAS:
        return SYMPTOM_ALIAS[s]
    # 2. 同义词扩展映射（倒查 SYMPTOM_ALIASES）
    for key, aliases in SYMPTOM_ALIASES.items():
        if s in aliases:
            return key
    # 3. 英文键标准化
    key = s.lower().replace(" ", "_").replace("-", "_")
    # 4. 直接键匹配
    if key in SYMPTOM_DISEASE_MAP:
        return key
    return None


def _get_symptom_weight(symptom_key: str, disease_name: str) -> float:
    """获取症状-疾病关联权重，未定义的组合返回默认值 1.0。"""
    return SYMPTOM_WEIGHTS.get((symptom_key, disease_name), 1.0)


def _compute_symptom_idf() -> dict[str, float]:
    """计算每个症状的 IDF（逆文档频率）。

    IDF = log(总疾病数 / 关联该症状的疾病数) + 1
    罕见但特异的症状（如 catatonia, tics）获得高 IDF 值，
    常见非特异症状（如 depressed_mood, anxiety）获得低 IDF 值。
    """
    all_diseases: set[str] = set()
    disease_count_per_symptom: dict[str, int] = {}
    for symptom_key, diseases in SYMPTOM_DISEASE_MAP.items():
        disease_set = set(diseases)
        all_diseases.update(disease_set)
        disease_count_per_symptom[symptom_key] = len(disease_set)
    total = len(all_diseases)
    if total == 0:
        return {}
    import math
    return {
        key: math.log(total / count) + 1.0
        for key, count in disease_count_per_symptom.items()
    }


# 模块级缓存：IDF 表只需计算一次
_SYMPTOM_IDF: dict[str, float] = _compute_symptom_idf()

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

        使用加权评分 + IDF 加权排序：
          score = sum(weight(symptom, disease) * idf(symptom) for each matched symptom)

        返回 top_k 个候选疾病，每个包含：
          - disease, icd10_code, icd10_description, symptom_match_count
          - matched_symptoms: 命中该疾病的症状列表（图路径链）
          - total_symptoms: 输入的原始症状总数（归一化后）
          - weighted_score: 加权总分
        """
        normalized_keys = []
        for s in symptoms:
            key = _normalize_symptom(s)
            if key:
                normalized_keys.append(key)
        if not normalized_keys:
            logger.info("graphrag.no_symptoms_matched", raw_symptoms=symptoms)
            return []

        disease_score: dict[str, float] = {}
        disease_symptom_map: dict[str, list[dict]] = {}
        for sym_key in normalized_keys:
            idf = _SYMPTOM_IDF.get(sym_key, 1.0)
            for disease in SYMPTOM_DISEASE_MAP.get(sym_key, []):
                weight = _get_symptom_weight(sym_key, disease)
                contribution = weight * idf
                disease_score[disease] = disease_score.get(disease, 0.0) + contribution
                if disease not in disease_symptom_map:
                    disease_symptom_map[disease] = []
                disease_symptom_map[disease].append({
                    "symptom": sym_key.replace("_", " "),
                    "weight": weight,
                    "idf": round(idf, 3),
                    "contribution": round(contribution, 3),
                })

        ranked = sorted(disease_score.items(), key=lambda x: x[1], reverse=True)
        full_list = []
        for disease, score in ranked[:top_k]:
            icd = DISEASE_ICD10_MAP.get(disease, {})
            matched_details = disease_symptom_map.get(disease, [])
            full_list.append({
                "disease": disease,
                "icd10_code": icd.get("code", ""),
                "icd10_description": icd.get("desc", ""),
                "symptom_match_count": len(matched_details),
                "total_symptoms": len(normalized_keys),
                "weighted_score": round(score, 3),
                "matched_symptoms": [m["symptom"] for m in matched_details],
                "match_details": matched_details,
            })

        logger.info(
            "graphrag.find_diseases_with_paths",
            keys=normalized_keys,
            results=[f"{r['disease']}(score={r['weighted_score']})" for r in full_list],
        )
        # 审计日志：记录完整的查询链路
        logger.info(
            "graphrag.audit_query",
            input_symptoms=symptoms,
            normalized_keys=normalized_keys,
            idf_values={k: round(v, 3) for k, v in _SYMPTOM_IDF.items() if k in normalized_keys},
            top_results=[r["disease"] for r in full_list],
            top_scores=[r["weighted_score"] for r in full_list],
        )
        return full_list

    def _find_diseases_neo4j(self, symptoms: list[str]) -> list[dict]:
        """使用 Cypher 在 Neo4j 中执行 Symptom→Disease→ICD10Code 三跳查询（加权评分）。"""
        normalized = []
        for s in symptoms:
            key = _normalize_symptom(s)
            if key:
                normalized.append(key)
        if not normalized:
            return []
        with self._driver.session() as session:
            result = session.run(
                "MATCH (s:Symptom)-[r:INDICATES]->(d:Disease) "
                "WHERE s.name IN $symptoms "
                "OPTIONAL MATCH (d)-[:HAS_CODE]->(c:ICD10Code) "
                "RETURN d.name AS disease, c.code AS icd10_code, c.description AS icd10_desc, "
                "COUNT(DISTINCT s) AS symptom_match_count, "
                "SUM(COALESCE(r.weight, 1.0)) AS weighted_score "
                "ORDER BY weighted_score DESC",
                symptoms=normalized,
            )
            results = []
            for record in result:
                data = record.data()
                if data.get("icd10_code") is None:
                    data["icd10_code"] = ""
                if data.get("icd10_desc") is None:
                    data["icd10_desc"] = ""
                if data.get("weighted_score") is None:
                    data["weighted_score"] = 0.0
                results.append(data)
            logger.info("graphrag.neo4j_query", symptoms=normalized, results=[r["disease"] for r in results[:5]])
            return results

    def _find_diseases_offline(self, symptoms: list[str]) -> list[dict]:
        """离线模式：使用内置 SYMPTOM_DISEASE_MAP 加权评分 + IDF 加权。"""
        disease_score: dict[str, float] = {}
        disease_count: dict[str, int] = {}
        for symptom in symptoms:
            key = _normalize_symptom(symptom)
            if not key:
                continue
            idf = _SYMPTOM_IDF.get(key, 1.0)
            for disease in SYMPTOM_DISEASE_MAP.get(key, []):
                weight = _get_symptom_weight(key, disease)
                disease_score[disease] = disease_score.get(disease, 0.0) + (weight * idf)
                disease_count[disease] = disease_count.get(disease, 0) + 1
        ranked = sorted(disease_score.items(), key=lambda x: x[1], reverse=True)
        results = []
        for disease, score in ranked:
            icd = DISEASE_ICD10_MAP.get(disease, {})
            results.append({
                "disease": disease,
                "symptom_match_count": disease_count.get(disease, 0),
                "weighted_score": round(score, 3),
                "icd10_code": icd.get("code", ""),
                "icd10_description": icd.get("desc", ""),
            })
        # 审计日志
        logger.info("graphrag.offline_query", symptoms=symptoms, results=[r["disease"] for r in results[:5]])
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
