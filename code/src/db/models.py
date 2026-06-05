"""SQLAlchemy ORM 模型 — 心理健康平台核心数据表"""
import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, Boolean, DateTime, Enum, ForeignKey, JSON, Integer, BigInteger
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from .session import Base


class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(100), nullable=False)
    role = Column(String(20), nullable=False, default="patient")
    phone = Column(String(20), nullable=True)
    avatar_url = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.now, nullable=False)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

    conversations = relationship("Conversation", back_populates="user")
    reports = relationship("Report", back_populates="user", foreign_keys="Report.user_id")
    reviews = relationship("DoctorReview", back_populates="doctor")


class Conversation(Base):
    __tablename__ = "conversations"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    status = Column(String(20), nullable=False, default="active")
    severity_level = Column(String(5), nullable=True)
    intent_category = Column(String(50), nullable=True)
    stage = Column(String(30), nullable=False, default="guiding", comment="对话阶段: guiding(Tier0)/branch_moderate(Tier1)/branch_severe(Tier2)/diagnosing/completed")
    voice_state = Column(JSON, nullable=True, comment="EmpathicVoiceSkill ConversationState.to_dict()")
    started_at = Column(DateTime, default=datetime.now, nullable=False)
    ended_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.now, nullable=False, index=True)

    user = relationship("User", back_populates="conversations")
    messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")
    intent_classifications = relationship("IntentClassification", back_populates="conversation")
    diagnosis_results = relationship("DiagnosisResult", back_populates="conversation")
    reports = relationship("Report", back_populates="conversation")


class Message(Base):
    __tablename__ = "messages"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    conversation_id = Column(UUID(as_uuid=True), ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False, index=True)
    sender_type = Column(String(10), nullable=False)
    content = Column(Text, nullable=False)
    metadata_ = Column("metadata", JSON, default=dict)
    created_at = Column(DateTime, default=datetime.now, nullable=False, index=True)

    conversation = relationship("Conversation", back_populates="messages")


class IntentClassification(Base):
    __tablename__ = "intent_classifications"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    conversation_id = Column(UUID(as_uuid=True), ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False)
    message_id = Column(UUID(as_uuid=True), ForeignKey("messages.id", ondelete="SET NULL"), nullable=True)
    intent = Column(String(50), nullable=False)
    severity_level = Column(String(5), nullable=False)
    confidence_scores = Column(JSON, default=dict)
    triggered_route = Column(String(20), nullable=False)
    created_at = Column(DateTime, default=datetime.now, nullable=False)

    conversation = relationship("Conversation", back_populates="intent_classifications")


class DiagnosisResult(Base):
    __tablename__ = "diagnosis_results"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    conversation_id = Column(UUID(as_uuid=True), ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False)
    severity_level = Column(String(5), nullable=False)
    agent_type = Column(String(20), nullable=False)
    primary_diagnosis = Column(JSON, nullable=False)
    differential_list = Column(JSON, default=list)
    clinical_notes = Column(Text, nullable=True)
    raw_llm_output = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.now, nullable=False)

    conversation = relationship("Conversation", back_populates="diagnosis_results")


class TreatmentPlan(Base):
    __tablename__ = "treatment_plans"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    diagnosis_id = Column(UUID(as_uuid=True), ForeignKey("diagnosis_results.id", ondelete="CASCADE"), nullable=False)
    medications = Column(JSON, default=list)
    non_drug_treatments = Column(JSON, default=list)
    lifestyle_recommendations = Column(JSON, default=list)
    follow_up_plan = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.now, nullable=False)


class Report(Base):
    __tablename__ = "reports"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    conversation_id = Column(UUID(as_uuid=True), ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    doctor_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    report_type = Column(String(10), nullable=False)
    status = Column(String(20), nullable=False, default="draft", index=True)
    content = Column(JSON, nullable=False)
    doctor_comment = Column(Text, nullable=True)
    pdf_url = Column(String(500), nullable=True)
    emailed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.now, nullable=False)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

    user = relationship("User", back_populates="reports", foreign_keys=[user_id])
    conversation = relationship("Conversation", back_populates="reports")
    files = relationship("ReportFile", back_populates="report", cascade="all, delete-orphan")
    reviews = relationship("DoctorReview", back_populates="report")
    email_logs = relationship("EmailLog", back_populates="report")


class ReportFile(Base):
    __tablename__ = "report_files"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    report_id = Column(UUID(as_uuid=True), ForeignKey("reports.id", ondelete="CASCADE"), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_size = Column(Integer, nullable=True)
    md5_hash = Column(String(64), nullable=True)
    created_at = Column(DateTime, default=datetime.now, nullable=False)

    report = relationship("Report", back_populates="files")


class DoctorReview(Base):
    __tablename__ = "doctor_reviews"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    report_id = Column(UUID(as_uuid=True), ForeignKey("reports.id", ondelete="CASCADE"), nullable=False)
    doctor_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    action = Column(String(20), nullable=False)
    comment = Column(Text, nullable=True)
    reviewed_at = Column(DateTime, default=datetime.now, nullable=False)

    report = relationship("Report", back_populates="reviews")
    doctor = relationship("User", back_populates="reviews")


class EmailLog(Base):
    __tablename__ = "email_logs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    report_id = Column(UUID(as_uuid=True), ForeignKey("reports.id", ondelete="CASCADE"), nullable=False)
    recipient_email = Column(String(255), nullable=False)
    status = Column(String(20), nullable=False, default="pending")
    error_message = Column(Text, nullable=True)
    sent_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.now, nullable=False)

    report = relationship("Report", back_populates="email_logs")
