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
