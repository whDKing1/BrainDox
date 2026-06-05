export interface AnalyzeRequest {
  patient_description: string
  scenario: string
  human_loop: boolean
  thread_id: string
}

export interface FormAnalyzeRequest {
  chief_complaint: string
  symptoms: string
  suicide_risk: string
  substance_use: string
  name?: string
  age?: number
  gender?: string
  medical_history?: string
  family_history?: string
  scenario: string
  thread_id: string
}

export interface AnalyzeResponse {
  scenario: string
  patient_info: Record<string, unknown> | null
  diagnosis: Record<string, unknown> | null
  treatment_plan: Record<string, unknown> | null
  coding_result: Record<string, unknown> | null
  audit_result: Record<string, unknown> | null
  needs_more_info: boolean
  retry_count: number
  candidate_diseases: Array<{
    disease: string
    icd10_code: string
    icd10_description: string
    symptom_match_count: number
    total_symptoms: number
    weighted_score: number
    matched_symptoms: string[]
    match_details: Array<{
      symptom: string
      weight: number
      idf: number
      contribution: number
    }>
  }>
  human_review_status: string
  selected_disease: string
  errors: string[]
}

export type PipelineStage = 'intake' | 'diagnosis' | 'treatment' | 'coding' | 'audit'

export interface StageInfo {
  key: PipelineStage
  label: string
  icon: string
  description: string
  status: 'pending' | 'active' | 'completed' | 'skipped'
}

export interface DiagnosisCandidate {
  disease_name: string
  icd10_hint?: string
  confidence: number
  evidence: string[]
  reasoning: string
}

export interface MedicationItem {
  drug_name?: string
  generic_name?: string
  drug_class?: string
  dosage?: string
  route?: string
  frequency?: string
  duration?: string
  titration_schedule?: string
  contraindications?: string[]
  side_effects?: string[]
  monitoring_requirements?: string
  psychiatric_notes?: string
}

export interface DDIItem {
  drug_a?: string
  drug_b?: string
  severity?: string
  description?: string
  recommendation?: string
}

export interface User {
  id: string
  email: string
  name: string
  role: string
  created_at?: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export interface ChatSendRequest {
  conversation_id: string | null
  content: string
}

export interface ChatSendResponse {
  conversation_id: string
  reply: {
    content: string
    type: string
    diagnosis?: Record<string, unknown>
    treatment?: Record<string, unknown>
    has_report?: boolean
    report_id?: string
  }
  stage: string
  route: string | null
  is_diagnosis_ready: boolean
}

export interface MessageItem {
  id: string
  sender_type: 'user' | 'ai' | 'system'
  content: string
  metadata: Record<string, unknown>
  created_at: string
}

export interface ConversationItem {
  id: string
  status: string
  stage: string
  severity_level: string | null
  intent_category: string | null
  created_at: string
  messages: MessageItem[]
}

export interface ReportSummary {
  id: string
  report_type: string
  status: string
  created_at: string
}

export interface ReportDetail {
  id: string
  report_type: string
  status: string
  content: {
    summary?: {
      chief_complaint?: string
      severity_assessment?: string
      conclusion?: string
    }
    diagnosis?: {
      primary?: { disease_name?: string; icd_code?: string; confidence?: number }
      differentials?: Array<{ disease_name?: string; icd_code?: string; confidence?: number; key_differentiator?: string }>
    }
    recommendations?: {
      lifestyle?: string[]
      psychotherapy?: string[]
      medication?: string[]
    }
    follow_up?: string
    doctor_review?: {
      status?: string
      doctor_name?: string | null
      reviewed_at?: string | null
      comment?: string | null
    }
  }
  doctor_name: string | null
  doctor_comment: string | null
  pdf_url: string | null
  emailed_at: string | null
  created_at: string
}

export interface DoctorPendingReport {
  id: string
  report_type: string
  status: string
  created_at: string
  patient_name: string
  patient_email: string
  ai_summary: string
}

export interface DoctorPendingListResponse {
  reports: DoctorPendingReport[]
  total: number
}

export interface DoctorStats {
  pending_count: number
  reviewed_today: number
  approval_rate: number
  total_reviewed: number
}

export interface DoctorReportDetailData {
  id: string
  report_type: string
  status: string
  content: {
    summary?: { chief_complaint?: string; severity_assessment?: string; conclusion?: string }
    diagnosis?: {
      primary?: { disease_name?: string; icd_code?: string; confidence?: number }
      differentials?: Array<{ disease_name?: string; icd_code?: string; confidence?: number; key_differentiator?: string }>
    }
    recommendations?: { lifestyle?: string[]; psychotherapy?: string[]; medication?: string[] }
    follow_up?: string
    doctor_review?: { status?: string; doctor_name?: string | null; reviewed_at?: string | null; comment?: string | null }
  }
  patient?: { id?: string; name?: string; email?: string }
  doctor_name: string | null
  doctor_comment: string | null
  created_at: string
}
