"""精神科患者数据模型 — 对齐FHIR R4标准。"""

from __future__ import annotations
from datetime import date, datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class Gender(str, Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"
    UNKNOWN = "unknown"

    @classmethod
    def _missing_(cls, value):
        """Pydantic 验证 Gender 枚举时，如果值不在已定义枚举中，走模糊匹配兜底。
        覆盖中文值（如 "女"→FEMALE, "男"→MALE）防止 LLM 按 Prompt 输出中文导致 ValidationError。"""
        if isinstance(value, str):
            v = value.strip().lower()
            if v in ("女", "女性", "female"):
                return cls.FEMALE
            if v in ("男", "男性", "male"):
                return cls.MALE
            if v in ("其他", "other"):
                return cls.OTHER
            if v in ("未知", "unknown"):
                return cls.UNKNOWN
        return cls.UNKNOWN


class Severity(str, Enum):
    MILD = "mild"
    MODERATE = "moderate"
    SEVERE = "severe"
    CRITICAL = "critical"


class Symptom(BaseModel):
    name: str
    duration_days: Optional[float] = Field(None, description="持续时间（天，如0.0833=2小时，1.5=36小时）")
    severity: Optional[Severity] = Severity.MODERATE
    description: Optional[str] = None


class Allergy(BaseModel):
    substance: str
    reaction: Optional[str] = None
    severity: Severity = Severity.MODERATE


class Medication(BaseModel):
    name: str
    dosage: Optional[str] = None
    frequency: Optional[str] = None
    start_date: Optional[date] = None


class VitalSigns(BaseModel):
    temperature: Optional[float] = Field(None, description="体温（摄氏度）")
    heart_rate: Optional[int] = Field(None, description="心率（次/分）")
    blood_pressure_systolic: Optional[int] = None
    blood_pressure_diastolic: Optional[int] = None
    respiratory_rate: Optional[int] = None
    oxygen_saturation: Optional[float] = None


class LabResult(BaseModel):
    test_name: str
    value: str
    unit: Optional[str] = None
    reference_range: Optional[str] = None
    is_abnormal: bool = False


class MentalStatusExam(BaseModel):
    """精神状况检查（Mental Status Examination, MSE）"""
    appearance_and_behavior: Optional[str] = Field(None, description="外观与行为（整洁/蓬乱、合作/敌对、精神运动性激越/迟滞）")
    speech: Optional[str] = Field(None, description="言语评估（语速：加快/减慢、音量：洪亮/低语、流畅性、言语贫乏）")
    mood: Optional[str] = Field(None, description="主观情绪状态（抑郁/欣快/焦虑/易激惹/淡漠/高涨）")
    affect: Optional[str] = Field(None, description="客观情感表现（适切/平淡/迟钝/不稳定，范围：宽广/受限/迟钝/平淡）")
    thought_process: Optional[str] = Field(None, description="思维过程（松散/脱轨/言语贫乏/思维奔逸/思维中断/赘述）")
    thought_content: Optional[str] = Field(None, description="思维内容（妄想-被害/关系/夸大/虚无/宗教；强迫观念；超价观念；自杀想法；杀人想法）")
    perception: Optional[str] = Field(None, description="感知障碍（幻觉-听/视/嗅/触；错觉；人格解体；现实解体）")
    cognition: Optional[str] = Field(None, description="认知功能（定向力：人物/地点/时间；注意力；记忆力-即时/近期/远期；抽象思维）")
    insight: Optional[str] = Field(None, description="自知力（良好/部分/缺乏；对疾病和精神症状的认识程度）")
    judgment: Optional[str] = Field(None, description="判断力（良好/受损；测试时及日常生活中做合理决定的能力）")
    suicide_risk: Optional[str] = Field(None, description="自杀风险评估（无/低/中/高/极高风险；自杀意念/计划/意图/既往尝试）")
    homicide_risk: Optional[str] = Field(None, description="暴力/杀人风险评估（无/低/中/高；幻想/意图/计划）")
    substance_use: Optional[str] = Field(None, description="物质使用情况（当前使用物质/频次/量/途径/使用模式）")
    scale_scores: Optional[dict] = Field(None, description="标准化评定量表分数（PHQ-9/HAMD/YMRS/PANSS/BPRS/GAD-7/PCL-5/AUDIT等）")


class NeuroImaging(BaseModel):
    """神经影像学检查结果（用于排除器质性病因）"""
    modality: str = Field("", description="影像学检查类型（CT/MRI/DSA/MRA/CTA）")
    findings: str = Field("", description="影像学所见")
    conclusion: str = Field("", description="影像学诊断/结论")


class PatientInfo(BaseModel):
    """精神科患者信息模型"""
    patient_id: Optional[str] = None
    name: str = Field(default="未提取")
    age: int = Field(default=0)
    gender: Gender = Field(default=Gender.UNKNOWN)
    chief_complaint: str = Field(default="未提取")
    symptoms: list[Symptom] = Field(default_factory=list)
    medical_history: list[str] = Field(default_factory=list)
    family_history: list[str] = Field(default_factory=list)
    allergies: list[Allergy] = Field(default_factory=list)
    current_medications: list[Medication] = Field(default_factory=list)
    vital_signs: Optional[VitalSigns] = None
    lab_results: list[LabResult] = Field(default_factory=list)
    mental_status_exam: Optional[MentalStatusExam] = None
    neuro_imaging: list[NeuroImaging] = Field(default_factory=list)
    raw_input: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
