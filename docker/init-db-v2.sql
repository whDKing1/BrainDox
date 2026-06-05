-- BrainDox v2.0 — 心理健康平台新增表结构
-- 基于 v1.0 的 audit_logs 和 clinical_sessions 表增量迁移

-- ============================================================
-- 1. 用户表
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    name            VARCHAR(100) NOT NULL,
    role            VARCHAR(20) NOT NULL DEFAULT 'patient'
                    CHECK (role IN ('patient', 'doctor', 'admin')),
    phone           VARCHAR(20),
    avatar_url      VARCHAR(500),
    is_active       BOOLEAN DEFAULT true NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ============================================================
-- 2. 会话表
-- ============================================================
CREATE TABLE IF NOT EXISTS conversations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status          VARCHAR(20) NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active', 'awaiting_review', 'completed', 'closed')),
    severity_level  VARCHAR(5) CHECK (severity_level IN ('L0', 'L1', 'L2', 'L3', 'L4')),
    intent_category VARCHAR(50),
    started_at      TIMESTAMP DEFAULT NOW(),
    ended_at        TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_conv_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conv_status ON conversations(status);
CREATE INDEX IF NOT EXISTS idx_conv_created ON conversations(created_at);

-- ============================================================
-- 3. 消息表
-- ============================================================
CREATE TABLE IF NOT EXISTS messages (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_type     VARCHAR(10) NOT NULL CHECK (sender_type IN ('user', 'ai', 'system')),
    content         TEXT NOT NULL,
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_msg_conv_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_msg_created ON messages(created_at);

-- ============================================================
-- 4. 意图分类结果表
-- ============================================================
CREATE TABLE IF NOT EXISTS intent_classifications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    message_id      UUID REFERENCES messages(id) ON DELETE SET NULL,
    intent          VARCHAR(50) NOT NULL,
    severity_level  VARCHAR(5) NOT NULL CHECK (severity_level IN ('L0', 'L1', 'L2', 'L3', 'L4')),
    confidence_scores JSONB DEFAULT '{}',
    triggered_route VARCHAR(20) NOT NULL CHECK (triggered_route IN ('mild', 'moderate', 'severe')),
    created_at      TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- 5. 诊断结果表
-- ============================================================
CREATE TABLE IF NOT EXISTS diagnosis_results (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    severity_level  VARCHAR(5) NOT NULL CHECK (severity_level IN ('L0', 'L1', 'L2', 'L3', 'L4')),
    agent_type      VARCHAR(20) NOT NULL CHECK (agent_type IN ('mild', 'moderate', 'severe')),
    primary_diagnosis JSONB NOT NULL,
    differential_list JSONB DEFAULT '[]',
    clinical_notes  TEXT,
    raw_llm_output  TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- 6. 治疗方案表
-- ============================================================
CREATE TABLE IF NOT EXISTS treatment_plans (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    diagnosis_id            UUID NOT NULL REFERENCES diagnosis_results(id) ON DELETE CASCADE,
    medications             JSONB DEFAULT '[]',
    non_drug_treatments     JSONB DEFAULT '[]',
    lifestyle_recommendations JSONB DEFAULT '[]',
    follow_up_plan          TEXT,
    created_at              TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- 7. 报告表
-- ============================================================
CREATE TABLE IF NOT EXISTS reports (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    doctor_id       UUID REFERENCES users(id) ON DELETE SET NULL,
    report_type     VARCHAR(10) NOT NULL CHECK (report_type IN ('mild', 'moderate', 'severe')),
    status          VARCHAR(20) NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft', 'pending_review', 'approved', 'rejected')),
    content         JSONB NOT NULL,
    doctor_comment  TEXT,
    pdf_url         VARCHAR(500),
    emailed_at      TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_report_user_id ON reports(user_id);
CREATE INDEX IF NOT EXISTS idx_report_doctor_id ON reports(doctor_id);
CREATE INDEX IF NOT EXISTS idx_report_status ON reports(status);

-- ============================================================
-- 8. 报告文件表
-- ============================================================
CREATE TABLE IF NOT EXISTS report_files (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id       UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    file_path       VARCHAR(500) NOT NULL,
    file_size       INTEGER,
    md5_hash        VARCHAR(64),
    created_at      TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- 9. 医生审核记录表
-- ============================================================
CREATE TABLE IF NOT EXISTS doctor_reviews (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id       UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    doctor_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action          VARCHAR(20) NOT NULL CHECK (action IN ('approved', 'rejected', 'return_for_revision')),
    comment         TEXT,
    reviewed_at     TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- 10. 邮件发送日志表
-- ============================================================
CREATE TABLE IF NOT EXISTS email_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id       UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    recipient_email VARCHAR(255) NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'sent', 'failed')),
    error_message   TEXT,
    sent_at         TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW()
);
