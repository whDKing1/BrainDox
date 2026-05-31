"""
Drug interaction checking service — Psychiatric medications.

Checks for:
  - Drug-drug interactions (DDI) for psychotropic medications
  - Drug-allergy contraindications
  - Drug-condition contraindications
  - Serotonin syndrome / Neuroleptic Malignant Syndrome risk
"""

from __future__ import annotations
import structlog

logger = structlog.get_logger(__name__)

# 精神科药物交互数据库
DDI_DATABASE = [
    {
        "drug_a": "fluoxetine",
        "drug_b": "selegiline",
        "severity": "contraindicated",
        "description": "SSRI与MAOI联用可导致5-羟色胺综合征（高热、肌阵挛、自主神经不稳、意识改变），可能致命",
        "recommendation": "绝对禁忌；停用氟西汀后至少等待5周（代谢产物半衰期长）再启用MAOI；停用MAOI后至少等待14天再启用SSRI",
    },
    {
        "drug_a": "sertraline",
        "drug_b": "phenelzine",
        "severity": "contraindicated",
        "description": "SSRI与MAOI联用可导致严重5-羟色胺综合征",
        "recommendation": "绝对禁忌；停用舍曲林后至少等待2周再启用MAOI；停用MAOI后至少等待14天再启用SSRI",
    },
    {
        "drug_a": "paroxetine",
        "drug_b": "tranylcypromine",
        "severity": "contraindicated",
        "description": "SSRI与MAOI联用可导致5-羟色胺综合征",
        "recommendation": "绝对禁忌；至少2周洗脱期（帕罗西汀半衰期较短）",
    },
    {
        "drug_a": "escitalopram",
        "drug_b": "selegiline",
        "severity": "contraindicated",
        "description": "SSRI与MAOI联用可导致5-羟色胺综合征",
        "recommendation": "绝对禁忌；至少2周洗脱期",
    },
    {
        "drug_a": "citalopram",
        "drug_b": "phenelzine",
        "severity": "contraindicated",
        "description": "SSRI与MAOI联用可导致5-羟色胺综合征",
        "recommendation": "绝对禁忌；至少2周洗脱期",
    },
    {
        "drug_a": "venlafaxine",
        "drug_b": "phenelzine",
        "severity": "contraindicated",
        "description": "SNRI与MAOI联用可导致严重5-羟色胺综合征",
        "recommendation": "绝对禁忌；停用文拉法辛后至少等待1周再启用MAOI",
    },
    {
        "drug_a": "duloxetine",
        "drug_b": "tranylcypromine",
        "severity": "contraindicated",
        "description": "SNRI与MAOI联用可导致5-羟色胺综合征",
        "recommendation": "绝对禁忌；至少2周洗脱期",
    },
    {
        "drug_a": "clomipramine",
        "drug_b": "phenelzine",
        "severity": "contraindicated",
        "description": "TCA与MAOI联用可导致严重5-羟色胺综合征和高血压危象",
        "recommendation": "绝对禁忌；需充分洗脱期",
    },
    {
        "drug_a": "lithium",
        "drug_b": "ibuprofen",
        "severity": "major",
        "description": "NSAIDs（包括布洛芬）减少肾脏锂清除率，可使血锂浓度升高25-60%，增加锂中毒风险",
        "recommendation": "避免联用；如必须使用NSAID，需监测血锂浓度并可能减少锂剂量30-50%",
    },
    {
        "drug_a": "lithium",
        "drug_b": "naproxen",
        "severity": "major",
        "description": "NSAIDs减少肾脏锂清除率，升高血锂浓度",
        "recommendation": "避免联用或密切监测血锂浓度并调整剂量",
    },
    {
        "drug_a": "lithium",
        "drug_b": "diclofenac",
        "severity": "major",
        "description": "NSAIDs减少肾脏锂清除率，升高血锂浓度",
        "recommendation": "避免联用或密切监测血锂浓度并调整剂量",
    },
    {
        "drug_a": "lithium",
        "drug_b": "lisinopril",
        "severity": "major",
        "description": "ACE抑制剂减少肾脏锂清除率，可使血锂浓度升高20-70%，增加锂中毒风险",
        "recommendation": "避免联用；如必须使用，密切监测血锂浓度，通常需减少锂剂量50%",
    },
    {
        "drug_a": "lithium",
        "drug_b": "hydrochlorothiazide",
        "severity": "major",
        "description": "噻嗪类利尿剂减少肾脏锂清除率，显著升高血锂浓度，可导致锂中毒",
        "recommendation": "避免联用；如必须使用噻嗪类利尿剂，需密切监测血锂浓度并大幅减少锂剂量",
    },
    {
        "drug_a": "lithium",
        "drug_b": "furosemide",
        "severity": "moderate",
        "description": "袢利尿剂对锂清除率影响小于噻嗪类，但仍可能升高血锂浓度",
        "recommendation": "监测血锂浓度；袢利尿剂优于噻嗪类利尿剂",
    },
    {
        "drug_a": "lithium",
        "drug_b": "olanzapine",
        "severity": "moderate",
        "description": "锂与奥氮平联用可能增加神经毒性风险（锂相关神经毒性、NMS样症状）",
        "recommendation": "监测神经系统症状（意识改变、僵硬、发热）；可联用但需谨慎",
    },
    {
        "drug_a": "lithium",
        "drug_b": "haloperidol",
        "severity": "moderate",
        "description": "锂与高效价抗精神病药联用有罕见的神经毒性报告（谵妄、脑病、不可逆神经损伤）",
        "recommendation": "谨慎使用，监测神经系统症状；避免高剂量联用",
    },
    {
        "drug_a": "lithium",
        "drug_b": "carbamazepine",
        "severity": "moderate",
        "description": "锂与卡马西平联用增加神经毒性风险（共济失调、头晕、嗜睡）",
        "recommendation": "监测神经系统不良反应；是有效的双相障碍联合治疗方案",
    },
    {
        "drug_a": "lithium",
        "drug_b": "valproic_acid",
        "severity": "minor",
        "description": "锂与丙戊酸是双相障碍经典联合治疗方案，通常安全有效",
        "recommendation": "可安全联用；定期监测血锂浓度和肝功能",
    },
    {
        "drug_a": "valproic_acid",
        "drug_b": "lamotrigine",
        "severity": "major",
        "description": "丙戊酸抑制拉莫三嗪葡萄糖醛酸化代谢，使拉莫三嗪血浓度升高约2倍，显著增加Stevens-Johnson综合征/TEN风险",
        "recommendation": "拉莫三嗪起始剂量减半至25mg隔日一次；维持剂量减半；极缓慢递增剂量",
    },
    {
        "drug_a": "carbamazepine",
        "drug_b": "lamotrigine",
        "severity": "moderate",
        "description": "卡马西平诱导葡萄糖醛酸化，使拉莫三嗪血浓度降低约40%",
        "recommendation": "可能需要增加拉莫三嗪剂量；缓慢递增",
    },
    {
        "drug_a": "carbamazepine",
        "drug_b": "valproic_acid",
        "severity": "major",
        "description": "丙戊酸抑制卡马西平环氧化物代谢，使活性代谢物卡马西平-10,11-环氧化物蓄积，可能引起毒性",
        "recommendation": "监测卡马西平毒性症状（头晕、复视、共济失调）；必要时监测环氧化物水平",
    },
    {
        "drug_a": "carbamazepine",
        "drug_b": "oral_contraceptive",
        "severity": "major",
        "description": "卡马西平强诱导CYP3A4，显著降低口服避孕药效果，导致避孕失败",
        "recommendation": "推荐使用额外屏障避孕措施或更换为非酶诱导性药物（如丙戊酸、拉莫三嗪）",
    },
    {
        "drug_a": "carbamazepine",
        "drug_b": "quetiapine",
        "severity": "moderate",
        "description": "卡马西平诱导CYP3A4，可使喹硫平血浓度降低80%以上",
        "recommendation": "喹硫平剂量可能需要大幅增加（3-5倍）才能达到治疗效果",
    },
    {
        "drug_a": "carbamazepine",
        "drug_b": "olanzapine",
        "severity": "moderate",
        "description": "卡马西平诱导CYP1A2，使奥氮平血浓度降低约30-50%",
        "recommendation": "可能需要增加奥氮平剂量；监测临床反应",
    },
    {
        "drug_a": "carbamazepine",
        "drug_b": "risperidone",
        "severity": "moderate",
        "description": "卡马西平诱导CYP3A4，使利培酮血浓度降低约50%",
        "recommendation": "可能需要增加利培酮剂量；监测临床反应",
    },
    {
        "drug_a": "clozapine",
        "drug_b": "carbamazepine",
        "severity": "contraindicated",
        "description": "两种药物均可能引起粒细胞缺乏症，联用风险显著增加；且卡马西平降低氯氮平血浓度",
        "recommendation": "绝对禁忌；避免任何形式的联用",
    },
    {
        "drug_a": "clozapine",
        "drug_b": "benzodiazepine",
        "severity": "major",
        "description": "氯氮平与苯二氮䓬类药物联用有罕见但致命的呼吸抑制和循环衰竭（猝死）报告",
        "recommendation": "谨慎联用；氯氮平起始治疗期间避免使用苯二氮䓬类药物；监测呼吸",
    },
    {
        "drug_a": "clozapine",
        "drug_b": "cigarette_smoking",
        "severity": "major",
        "description": "吸烟诱导CYP1A2，可使氯氮平血浓度降低约50%；戒烟后CYP1A2活性迅速恢复，可能导致氯氮平中毒",
        "recommendation": "吸烟者需较高氯氮平剂量；戒烟时必须立即减少氯氮平剂量30-40%并监测血浓度",
    },
    {
        "drug_a": "clozapine",
        "drug_b": "caffeine",
        "severity": "minor",
        "description": "咖啡因竞争CYP1A2，可能轻度升高氯氮平血浓度",
        "recommendation": "保持稳定的咖啡因摄入量；突然改变咖啡因摄入可能影响氯氮平血浓度",
    },
    {
        "drug_a": "quetiapine",
        "drug_b": "phenytoin",
        "severity": "major",
        "description": "苯妥英诱导CYP3A4，可使喹硫平血浓度降低80%以上",
        "recommendation": "可能需要大幅增加喹硫平剂量或更换抗癫痫药",
    },
    {
        "drug_a": "aripiprazole",
        "drug_b": "carbamazepine",
        "severity": "major",
        "description": "卡马西平诱导CYP3A4，使阿立哌唑血浓度降低约70%",
        "recommendation": "阿立哌唑剂量可能需要加倍；监测临床疗效",
    },
    {
        "drug_a": "aripiprazole",
        "drug_b": "fluoxetine",
        "severity": "moderate",
        "description": "氟西汀抑制CYP2D6，使阿立哌唑血浓度升高约50%",
        "recommendation": "阿立哌唑剂量可能需要减少50%；监测不良反应",
    },
    {
        "drug_a": "risperidone",
        "drug_b": "fluoxetine",
        "severity": "moderate",
        "description": "氟西汀抑制CYP2D6，使利培酮血浓度升高约75%",
        "recommendation": "可能需要减少利培酮剂量；监测锥体外系症状和泌乳素水平",
    },
    {
        "drug_a": "haloperidol",
        "drug_b": "lithium",
        "severity": "moderate",
        "description": "锂与高效价抗精神病药联用有罕见的神经毒性报告",
        "recommendation": "谨慎使用；监测神经系统症状；避免高剂量联用",
    },
    {
        "drug_a": "haloperidol",
        "drug_b": "fluoxetine",
        "severity": "moderate",
        "description": "氟西汀抑制CYP2D6，可使氟哌啶醇血浓度升高约20-30%",
        "recommendation": "监测锥体外系症状；可能需要调整剂量",
    },
    {
        "drug_a": "sertraline",
        "drug_b": "warfarin",
        "severity": "moderate",
        "description": "舍曲林轻度抑制CYP2C9，可能增强华法林抗凝效果",
        "recommendation": "监测INR；含曲林是SSRI中与华法林相互作用最小的选择之一",
    },
    {
        "drug_a": "fluoxetine",
        "drug_b": "warfarin",
        "severity": "moderate",
        "description": "氟西汀抑制CYP2C9，可能增强华法林抗凝效果，增加出血风险",
        "recommendation": "监测INR；考虑更换为舍曲林或艾司西酞普兰",
    },
    {
        "drug_a": "sertraline",
        "drug_b": "tramadol",
        "severity": "major",
        "description": "5-羟色胺能药物联用可增加5-羟色胺综合征风险（SSRI+曲马多双重5-HT增强）",
        "recommendation": "监测5-羟色胺综合征症状；可能需避免联用或使用非5-HT能镇痛药",
    },
    {
        "drug_a": "fluoxetine",
        "drug_b": "sumatriptan",
        "severity": "moderate",
        "description": "SSRI与曲普坦类联用理论上增加5-羟色胺综合征风险，但大型研究显示风险低",
        "recommendation": "可谨慎联用；告知患者5-羟色胺综合征早期症状",
    },
    {
        "drug_a": "trazodone",
        "drug_b": "fluoxetine",
        "severity": "moderate",
        "description": "氟西汀抑制CYP2D6，可能升高曲唑酮血浓度；两者均有5-HT活性",
        "recommendation": "监测过度镇静和5-羟色胺综合征；调整剂量",
    },
    {
        "drug_a": "mirtazapine",
        "drug_b": "clonidine",
        "severity": "moderate",
        "description": "米氮平为α2受体拮抗剂，可拮抗可乐定的降压作用",
        "recommendation": "避免联用；监测血压；考虑更换降压药",
    },
    {
        "drug_a": "bupropion",
        "drug_b": "selegiline",
        "severity": "major",
        "description": "安非他酮与MAOI联用可能引起高血压危象",
        "recommendation": "避免联用；充分洗脱期",
    },
    {
        "drug_a": "bupropion",
        "drug_b": "fluoxetine",
        "severity": "moderate",
        "description": "氟西汀抑制CYP2B6，可使安非他酮血浓度升高",
        "recommendation": "监测安非他酮不良反应（焦虑、失眠、惊厥阈值降低）",
    },
    {
        "drug_a": "escitalopram",
        "drug_b": "omeprazole",
        "severity": "minor",
        "description": "奥美拉唑可能轻度升高艾司西酞普兰血浓度（CYP2C19抑制）",
        "recommendation": "通常无需调整剂量；高剂量联用时注意",
    },
    {
        "drug_a": "citalopram",
        "drug_b": "omeprazole",
        "severity": "moderate",
        "description": "奥美拉唑抑制CYP2C19，可使西酞普兰血浓度升高",
        "recommendation": "西酞普兰最大剂量应从40mg减少至20mg；QTc监测",
    },
    {
        "drug_a": "olanzapine",
        "drug_b": "fluvoxamine",
        "severity": "major",
        "description": "氟伏沙明强效抑制CYP1A2，可使奥氮平血浓度升高约100-200%",
        "recommendation": "需显著减少奥氮平剂量（通常减半）；监测体重增加和代谢不良反应",
    },
    {
        "drug_a": "clozapine",
        "drug_b": "fluvoxamine",
        "severity": "major",
        "description": "氟伏沙明强效抑制CYP1A2，可使氯氮平血浓度升高5-10倍",
        "recommendation": "极大增加中毒风险；如需联用，需极低剂量氯氮平并密切监测血浓度",
    },
    {
        "drug_a": "quetiapine",
        "drug_b": "fluvoxamine",
        "severity": "major",
        "description": "氟伏沙明抑制CYP3A4，可使喹硫平血浓度显著升高",
        "recommendation": "需减少喹硫平剂量；监测镇静和低血压",
    },
    {
        "drug_a": "ziprasidone",
        "drug_b": "ketoconazole",
        "severity": "moderate",
        "description": "酮康唑抑制CYP3A4，可使齐拉西酮血浓度升高",
        "recommendation": "监测QTc间期；齐拉西酮本身可延长QTc",
    },
]

# 精神科药物类别映射
DRUG_CLASS_MAP = {
    "fluoxetine": "ssri",
    "sertraline": "ssri",
    "paroxetine": "ssri",
    "escitalopram": "ssri",
    "citalopram": "ssri",
    "fluvoxamine": "ssri",
    "venlafaxine": "snri",
    "duloxetine": "snri",
    "desvenlafaxine": "snri",
    "milnacipran": "snri",
    "amitriptyline": "tca",
    "nortriptyline": "tca",
    "imipramine": "tca",
    "clomipramine": "tca",
    "doxepin": "tca",
    "bupropion": "ndri",
    "mirtazapine": "nassa",
    "trazodone": "sari",
    "vilazodone": "spari",
    "vortioxetine": "multimodal_antidepressant",
    "phenelzine": "maoi",
    "tranylcypromine": "maoi",
    "selegiline": "maoi",
    "rasagiline": "maoi",
    "isocarboxazid": "maoi",
    "haloperidol": "fga",
    "chlorpromazine": "fga",
    "fluphenazine": "fga",
    "perphenazine": "fga",
    "trifluoperazine": "fga",
    "olanzapine": "sga",
    "risperidone": "sga",
    "paliperidone": "sga",
    "quetiapine": "sga",
    "aripiprazole": "sga",
    "brexpiprazole": "sga",
    "cariprazine": "sga",
    "lurasidone": "sga",
    "ziprasidone": "sga",
    "clozapine": "sga",
    "asenapine": "sga",
    "lithium": "mood_stabilizer",
    "valproate": "mood_stabilizer",
    "valproic_acid": "mood_stabilizer",
    "carbamazepine": "mood_stabilizer",
    "lamotrigine": "mood_stabilizer",
    "oxcarbazepine": "mood_stabilizer",
    "diazepam": "benzodiazepine",
    "lorazepam": "benzodiazepine",
    "clonazepam": "benzodiazepine",
    "alprazolam": "benzodiazepine",
    "oxazepam": "benzodiazepine",
    "temazepam": "benzodiazepine",
    "midazolam": "benzodiazepine",
    "zolpidem": "z_drug",
    "eszopiclone": "z_drug",
    "zopiclone": "z_drug",
    "buspirone": "anxiolytic",
    "hydroxyzine": "antihistamine",
    "propranolol": "beta_blocker",
    "atenolol": "beta_blocker",
    "prazosin": "alpha_blocker",
    "methylphenidate": "stimulant",
    "atomoxetine": "snri",
    "dexamfetamine": "stimulant",
    "lisdexamfetamine": "stimulant",
    "guanfacine": "alpha2_agonist",
    "clonidine": "alpha2_agonist",
    "ibuprofen": "nsaid",
    "naproxen": "nsaid",
    "diclofenac": "nsaid",
    "celecoxib": "nsaid",
    "indomethacin": "nsaid",
    "lisinopril": "ace_inhibitor",
    "enalapril": "ace_inhibitor",
    "ramipril": "ace_inhibitor",
    "hydrochlorothiazide": "thiazide_diuretic",
    "furosemide": "loop_diuretic",
    "warfarin": "anticoagulant",
    "tramadol": "opioid_analgesic",
    "sumatriptan": "triptan",
    "rizatriptan": "triptan",
    "omeprazole": "ppi",
    "ketoconazole": "antifungal",
    "prednisone": "corticosteroid",
    "prednisolone": "corticosteroid",
    "dexamethasone": "corticosteroid",
    "oral_contraceptive": "hormonal_contraceptive",
}


def _normalize_drug(name: str) -> list[str]:
    """Return possible drug/class identifiers for matching."""
    lower = name.lower().strip()
    candidates = [lower]
    if lower in DRUG_CLASS_MAP:
        candidates.append(DRUG_CLASS_MAP[lower])
    return candidates


def check_interactions(new_drugs: list[str], current_drugs: list[str]) -> list[dict]:
    """
    检查精神科药物之间的交互作用。
    返回交互记录列表。
    """
    interactions = []

    all_new = []
    for d in new_drugs:
        all_new.extend(_normalize_drug(d))

    all_current = []
    for d in current_drugs:
        all_current.extend(_normalize_drug(d))

    for ddi in DDI_DATABASE:
        a, b = ddi["drug_a"], ddi["drug_b"]
        if (a in all_new and b in all_current) or (b in all_new and a in all_current):
            interactions.append(ddi)
        elif a in all_new and b in all_new:
            interactions.append(ddi)

    if interactions:
        logger.warning("ddi.found", count=len(interactions))
    return interactions


def check_allergy_contraindication(drug: str, allergies: list[str]) -> dict | None:
    """检查精神科药物是否与已知过敏冲突。"""
    drug_lower = drug.lower()
    for allergy in allergies:
        allergy_lower = allergy.lower()
        if drug_lower in allergy_lower or allergy_lower in drug_lower:
            return {
                "drug": drug,
                "allergy": allergy,
                "severity": "contraindicated",
                "recommendation": f"禁止处方 {drug} — 患者对 {allergy} 过敏",
            }
        if "penicillin" in allergy_lower and drug_lower in ("amoxicillin", "ampicillin"):
            return {
                "drug": drug,
                "allergy": allergy,
                "severity": "major",
                "recommendation": f"交叉过敏风险: {drug} 与青霉素过敏（约10%交叉反应率）",
            }
    return None
