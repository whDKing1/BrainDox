import type {
  AnalyzeRequest,
  FormAnalyzeRequest,
  AnalyzeResponse,
  AuthResponse,
  ChatSendRequest,
  ChatSendResponse,
  ConversationItem,
  ReportSummary,
  ReportDetail,
  DoctorPendingReport,
  DoctorStats,
  DoctorReportDetailData,
  DoctorPendingListResponse,
} from '@/types'

const BASE_URL = '/api/v1'

function getToken(): string | null {
  return localStorage.getItem('access_token')
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  const res = await fetch(`${BASE_URL}${url}`, { headers, ...options })
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

export function registerUser(data: { email: string; password: string; name: string }): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function loginUser(data: { email: string; password: string }): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function getProfile(): Promise<{ id: string; email: string; name: string; role: string; created_at: string }> {
  return request('/profile')
}

export function sendChatMessage(data: ChatSendRequest): Promise<ChatSendResponse> {
  return request<ChatSendResponse>('/chat/send', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function getChatHistory(): Promise<ConversationItem[]> {
  return request<ConversationItem[]>('/chat/history')
}

export function getMyReports(): Promise<{ reports: ReportSummary[]; total: number }> {
  return request('/reports')
}

export function getReportDetail(reportId: string): Promise<ReportDetail> {
  return request(`/reports/${reportId}`)
}

export function doctorLogin(data: { email: string; password: string }): Promise<AuthResponse> {
  return request<AuthResponse>('/doctor/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function getDoctorPendingReports(page: number = 1): Promise<DoctorPendingListResponse> {
  return request<DoctorPendingListResponse>(`/doctor/reports/pending?page=${page}&page_size=20`)
}

export function getDoctorReportDetail(reportId: string): Promise<DoctorReportDetailData> {
  return request<DoctorReportDetailData>(`/doctor/reports/${reportId}`)
}

export function getDoctorStats(): Promise<DoctorStats> {
  return request<DoctorStats>('/doctor/stats')
}

export function getDoctorReportEmailStatus(reportId: string): Promise<{ report_id: string; email_logs: Array<{ id: string; recipient_email: string; status: string; error_message: string | null; sent_at: string | null; created_at: string | null }> }> {
  return request(`/doctor/reports/${reportId}/email-status`)
}

export function resendDoctorReportEmail(reportId: string): Promise<{ task_id: string; message: string }> {
  return request('/doctor/reports/resend-email', {
    method: 'POST',
    body: JSON.stringify({ report_id: reportId }),
  })
}
