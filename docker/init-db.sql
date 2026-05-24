-- Clinical Decision Support System — Database Initialization

CREATE TABLE IF NOT EXISTS audit_logs (
    id              BIGSERIAL PRIMARY KEY,
    timestamp       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id         VARCHAR(128) NOT NULL DEFAULT 'system',
    action          VARCHAR(64) NOT NULL,
    resource_type   VARCHAR(64) NOT NULL,
    resource_id     VARCHAR(256) DEFAULT '',
    detail          TEXT DEFAULT '',
    outcome         VARCHAR(32) DEFAULT 'success',
    ip_address      VARCHAR(45) DEFAULT ''
);

CREATE INDEX idx_audit_logs_timestamp ON audit_logs (timestamp);
CREATE INDEX idx_audit_logs_user_id ON audit_logs (user_id);
CREATE INDEX idx_audit_logs_resource ON audit_logs (resource_type, resource_id);

CREATE TABLE IF NOT EXISTS clinical_sessions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id       VARCHAR(128) NOT NULL,
    raw_input       TEXT,
    patient_info    JSONB,
    diagnosis       JSONB,
    treatment_plan  JSONB,
    coding_result   JSONB,
    audit_result    JSONB,
    errors          JSONB DEFAULT '[]',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sessions_thread ON clinical_sessions (thread_id);
CREATE INDEX idx_sessions_created ON clinical_sessions (created_at);

-- HIPAA: 6-year retention is enforced at application level
COMMENT ON TABLE audit_logs IS 'HIPAA-compliant immutable audit trail. Retain for minimum 6 years.';
COMMENT ON TABLE clinical_sessions IS 'Clinical pipeline session results. Contains PHI — access controlled.';
