import type {
  AnalyzeRequest,
  FormAnalyzeRequest,
  AnalyzeResponse,
} from '@/types'

const BASE_URL = '/api/v1'

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || `HTTP ${res.status}`)
  }
  return res.json()
}

export function analyzePatient(req: AnalyzeRequest): Promise<AnalyzeResponse> {
  return request<AnalyzeResponse>('/clinical/analyze', {
    method: 'POST',
    body: JSON.stringify(req),
  })
}

export function analyzePatientForm(req: FormAnalyzeRequest): Promise<AnalyzeResponse> {
  return request<AnalyzeResponse>('/clinical/analyze_form', {
    method: 'POST',
    body: JSON.stringify(req),
  })
}

export function confirmDiagnosis(threadId: string, selectedDisease: string): Promise<AnalyzeResponse> {
  return request<AnalyzeResponse>('/clinical/confirm_diagnosis', {
    method: 'POST',
    body: JSON.stringify({ thread_id: threadId, selected_disease: selectedDisease }),
  })
}
