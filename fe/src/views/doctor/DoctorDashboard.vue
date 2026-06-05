<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Stethoscope, FileText, Clock, CheckCircle, XCircle,
  Activity, LogOut, AlertCircle, Hourglass, Brain, Mail, Send, RefreshCw,
} from 'lucide-vue-next'
import { NButton, NTag, NSpace } from 'naive-ui'
import {
  getDoctorPendingReports, getDoctorStats, getDoctorReportDetail,
  getDoctorReportEmailStatus, resendDoctorReportEmail,
} from '@/api'
import type { DoctorPendingReport, DoctorStats, DoctorReportDetailData } from '@/types'

const router = useRouter()

const reports = ref<DoctorPendingReport[]>([])
const stats = ref<DoctorStats | null>(null)
const loading = ref(false)
const selectedReport = ref<DoctorReportDetailData | null>(null)
const showDetail = ref(false)
const reviewLoading = ref(false)
const reviewComment = ref('')
const reviewAction = ref<'approved' | 'rejected'>('approved')
const actionResult = ref<string | null>(null)

const emailLogs = ref<Array<{ id: string; recipient_email: string; status: string; error_message: string | null; sent_at: string | null; created_at: string | null }>>([])
const emailLoading = ref(false)
const resendLoading = ref(false)

const doctorName = ref(localStorage.getItem('doctor_name') || '医生')

const typeLabels: Record<string, string> = { mild: '轻症', moderate: '中症', severe: '重症' }
const typeColors: Record<string, string> = { mild: 'success', moderate: 'warning', severe: 'error' }

onMounted(async () => {
  await loadData()
})

async function loadData() {
  loading.value = true
  try {
    const [r, s] = await Promise.all([
      getDoctorPendingReports(),
      getDoctorStats(),
    ])
    reports.value = r.reports
    stats.value = s
  } catch {
    // ignore
  } finally {
    loading.value = false
  }
}

async function openDetail(id: string) {
  showDetail.value = false
  selectedReport.value = null
  emailLogs.value = []
  try {
    selectedReport.value = await getDoctorReportDetail(id)
    showDetail.value = true
    reviewComment.value = ''
    actionResult.value = null
    loadEmailStatus(id)
  } catch {
    // ignore
  }
}

async function loadEmailStatus(reportId: string) {
  emailLoading.value = true
  try {
    const res = await getDoctorReportEmailStatus(reportId)
    emailLogs.value = res.email_logs
  } catch {
    emailLogs.value = []
  } finally {
    emailLoading.value = false
  }
}

async function handleResendEmail() {
  if (!selectedReport.value) return
  resendLoading.value = true
  try {
    const res = await resendDoctorReportEmail(selectedReport.value.id)
    actionResult.value = res.message
    setTimeout(() => loadEmailStatus(selectedReport.value!.id), 2000)
  } catch (e: unknown) {
    actionResult.value = e instanceof Error ? e.message : '重发失败'
  } finally {
    resendLoading.value = false
  }
}

async function submitReview() {
  if (!selectedReport.value) return
  reviewLoading.value = true
  actionResult.value = null
  try {
    const res = await fetch(`/api/v1/doctor/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify({
        report_id: selectedReport.value.id,
        action: reviewAction.value,
        comment: reviewComment.value,
      }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.detail || '操作失败')
    actionResult.value = reviewAction.value === 'approved' ? '已确认通过，PDF 已生成' : '已退回'
    showDetail.value = false
    selectedReport.value = null
    await loadData()
  } catch (e: unknown) {
    actionResult.value = e instanceof Error ? e.message : '操作失败'
  } finally {
    reviewLoading.value = false
  }
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`
}

function logout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('doctor_name')
  router.push('/doctor/login')
}
</script>

<template>
  <div class="doctor-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <Stethoscope :size="24" class="logo-icon" />
        <span class="logo-text">BrainDox</span>
        <span class="logo-badge">医生端</span>
      </div>
      <nav class="nav">
        <div class="nav-item active">
          <FileText :size="18" />
          <span>待审核报告</span>
          <span v-if="stats" class="badge">{{ stats.pending_count }}</span>
        </div>
      </nav>
      <div v-if="stats" class="stats-panel">
        <div class="stat-item">
          <span class="stat-label">今日已审</span>
          <span class="stat-value">{{ stats.reviewed_today }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">通过率</span>
          <span class="stat-value">{{ stats.approval_rate }}%</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">累计审核</span>
          <span class="stat-value">{{ stats.total_reviewed }}</span>
        </div>
      </div>
      <div class="sidebar-footer">
        <div class="doctor-info">
          <Brain :size="16" />
          <span>{{ doctorName }}</span>
        </div>
        <button class="logout-btn" @click="logout" title="退出">
          <LogOut :size="16" />
        </button>
      </div>
    </aside>

    <main class="main-content">
      <header class="content-header">
        <div class="header-left">
          <h2>待审核报告</h2>
          <span v-if="stats" class="header-count">共 {{ stats.pending_count }} 份</span>
        </div>
        <NButton quaternary @click="loadData" :loading="loading">
          <template #icon><Activity :size="16" /></template>
          刷新
        </NButton>
      </header>

      <div v-if="actionResult" :class="['action-toast', actionResult.includes('确认') ? 'success' : 'info']">
        {{ actionResult }}
        <button class="toast-close" @click="actionResult = null">✕</button>
      </div>

      <div v-if="loading && reports.length === 0" class="loading-state">加载中...</div>

      <div v-else-if="reports.length === 0" class="empty-state">
        <CheckCircle :size="48" class="empty-icon" />
        <h3>所有报告已审核完成</h3>
        <p>暂无待审核的报告</p>
      </div>

      <div v-else class="report-grid">
        <div
          v-for="r in reports"
          :key="r.id"
          class="report-card"
          @click="openDetail(r.id)"
        >
          <div class="card-header">
            <NTag :type="(typeColors[r.report_type] || 'default') as any" size="small">
              {{ typeLabels[r.report_type] || r.report_type }}
            </NTag>
            <span class="card-time">{{ formatTime(r.created_at) }}</span>
          </div>
          <div class="card-body">
            <div class="patient-name">{{ r.patient_name }}</div>
            <div class="ai-summary">{{ r.ai_summary || '暂无AI诊断摘要' }}</div>
          </div>
          <div class="card-footer">
            <span class="card-email">{{ r.patient_email }}</span>
            <NButton size="tiny" quaternary>查看详情 →</NButton>
          </div>
        </div>
      </div>

      <!-- Detail Modal -->
      <div v-if="showDetail && selectedReport" class="modal-overlay" @click.self="showDetail = false">
        <div class="modal-content">
          <header class="modal-header">
            <h3>报告审核</h3>
            <button class="close-btn" @click="showDetail = false">✕</button>
          </header>

          <div class="modal-body">
            <section class="detail-section">
              <h4>患者信息</h4>
              <div class="info-grid">
                <div class="info-item"><span class="label">姓名</span><span>{{ selectedReport.patient?.name || '未知' }}</span></div>
                <div class="info-item"><span class="label">邮箱</span><span>{{ selectedReport.patient?.email || '' }}</span></div>
                <div class="info-item"><span class="label">报告类型</span><NTag :type="(typeColors[selectedReport.report_type] || 'default') as any" size="small">{{ typeLabels[selectedReport.report_type] }}</NTag></div>
                <div class="info-item"><span class="label">提交时间</span><span>{{ formatTime(selectedReport.created_at || '') }}</span></div>
              </div>
            </section>

            <section v-if="selectedReport.content?.summary" class="detail-section">
              <h4>评估结论</h4>
              <p class="conclusion">{{ selectedReport.content.summary.conclusion || '暂无' }}</p>
              <p class="small-text">严重度：{{ selectedReport.content.summary.severity_assessment }} | 主诉：{{ selectedReport.content.summary.chief_complaint }}</p>
            </section>

            <section v-if="selectedReport.content?.diagnosis" class="detail-section">
              <h4>AI 诊断建议</h4>
              <div class="diag-box">
                <div class="diag-row">
                  <span class="diag-name">{{ selectedReport.content.diagnosis.primary?.disease_name }}</span>
                  <span class="diag-code">{{ selectedReport.content.diagnosis.primary?.icd_code }}</span>
                  <NTag size="tiny" type="info">置信度 {{ Math.round((selectedReport.content.diagnosis.primary?.confidence || 0) * 100) }}%</NTag>
                </div>
              </div>
              <div v-if="selectedReport.content.diagnosis.differentials && selectedReport.content.diagnosis.differentials.length > 0" class="diff-list">
                <div v-for="(d, i) in selectedReport.content.diagnosis.differentials" :key="i" class="diff-item">
                  <span class="diff-name">{{ d.disease_name }}</span>
                  <span class="diff-code">{{ d.icd_code }}</span>
                  <span class="diff-note">{{ d.key_differentiator }}</span>
                </div>
              </div>
            </section>

            <section v-if="selectedReport.content?.recommendations" class="detail-section">
              <h4>AI 建议</h4>
              <div v-if="selectedReport.content.recommendations.lifestyle && selectedReport.content.recommendations.lifestyle.length > 0">
                <p class="section-sub">生活方式：</p>
                <ul><li v-for="(item, i) in selectedReport.content.recommendations.lifestyle" :key="i">{{ item }}</li></ul>
              </div>
              <div v-if="selectedReport.content.recommendations.psychotherapy && selectedReport.content.recommendations.psychotherapy.length > 0">
                <p class="section-sub">心理干预：</p>
                <ul><li v-for="(item, i) in selectedReport.content.recommendations.psychotherapy" :key="i">{{ item }}</li></ul>
              </div>
              <div v-if="selectedReport.content.follow_up">
                <p class="section-sub">随访计划：</p>
                <p>{{ selectedReport.content.follow_up }}</p>
              </div>
            </section>

            <section v-if="emailLogs.length > 0 || selectedReport.status === 'approved'" class="detail-section email-section">
              <h4>邮件发送状态</h4>
              <div v-if="emailLoading" class="email-loading">加载中...</div>
              <div v-else-if="emailLogs.length === 0 && selectedReport.status === 'approved'" class="email-empty">
                暂无发送记录
              </div>
              <div v-else class="email-log-list">
                <div v-for="log in emailLogs" :key="log.id" class="email-log-item">
                  <Mail :size="14" />
                  <span class="email-recipient">{{ log.recipient_email }}</span>
                  <NTag v-if="log.status === 'sent'" type="success" size="tiny">已发送</NTag>
                  <NTag v-else-if="log.status === 'pending'" type="warning" size="tiny">发送中</NTag>
                  <NTag v-else type="error" size="tiny">失败</NTag>
                  <span v-if="log.sent_at" class="email-time">{{ formatTime(log.sent_at) }}</span>
                  <span v-if="log.error_message" class="email-error">{{ log.error_message }}</span>
                </div>
              </div>
              <div class="email-actions">
                <NButton size="small" quaternary @click="loadEmailStatus(selectedReport!.id)" :loading="emailLoading">
                  <template #icon><RefreshCw :size="14" /></template>刷新状态
                </NButton>
                <NButton v-if="selectedReport.status === 'approved'" size="small" secondary @click="handleResendEmail" :loading="resendLoading">
                  <template #icon><Send :size="14" /></template>重发邮件
                </NButton>
              </div>
            </section>

            <section class="detail-section review-section">
              <h4>审核操作</h4>
              <div class="action-tabs">
                <button :class="['action-tab', { active: reviewAction === 'approved' }]" @click="reviewAction = 'approved'">
                  <CheckCircle :size="16" /> 确认通过
                </button>
                <button :class="['action-tab', { active: reviewAction === 'rejected' }]" @click="reviewAction = 'rejected'">
                  <XCircle :size="16" /> 退回
                </button>
              </div>
              <div class="comment-area">
                <label>审核意见：</label>
                <textarea v-model="reviewComment" placeholder="请填写审核意见..." rows="3"></textarea>
              </div>
              <div class="action-info" v-if="reviewAction === 'approved'">
                确认通过后，系统将异步生成 PDF 报告并发送至患者邮箱，不会阻塞当前操作。
              </div>
              <div class="action-info danger" v-if="reviewAction === 'rejected'">
                退回后，用户端将收到补充信息的通知。
              </div>
              <NButton
                :loading="reviewLoading"
                :type="reviewAction === 'approved' ? 'primary' : 'warning'"
                block
                size="large"
                @click="submitReview"
              >
                {{ reviewAction === 'approved' ? '确认通过' : '退回报告' }}
              </NButton>
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.doctor-layout { display: flex; height: 100vh; background: #f0f2f5; }

/* Sidebar */
.sidebar {
  width: 240px;
  background: #1a1a2e;
  color: #fff;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}
.sidebar-header {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.logo-icon { color: #7c8cf8; }
.logo-text { font-size: 18px; font-weight: 700; flex: 1; }
.logo-badge { font-size: 10px; padding: 2px 6px; background: #7c8cf8; border-radius: 4px; }
.nav { padding: 12px; flex: 1; }
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 12px; border-radius: 8px; cursor: pointer;
  transition: background 0.2s;
}
.nav-item.active { background: rgba(124,140,248,0.2); }
.nav-item:hover { background: rgba(255,255,255,0.08); }
.badge { margin-left: auto; background: #7c8cf8; padding: 2px 8px; border-radius: 10px; font-size: 12px; }
.stats-panel {
  margin: 0 12px 12px;
  padding: 12px;
  background: rgba(255,255,255,0.06);
  border-radius: 8px;
  display: flex;
  gap: 8px;
}
.stat-item { flex: 1; text-align: center; display: flex; flex-direction: column; gap: 4px; }
.stat-label { font-size: 11px; opacity: 0.6; }
.stat-value { font-size: 16px; font-weight: 700; color: #7c8cf8; }
.sidebar-footer {
  padding: 16px;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.doctor-info { display: flex; align-items: center; gap: 8px; font-size: 14px; opacity: 0.8; }
.logout-btn { background: none; border: none; color: rgba(255,255,255,0.5); cursor: pointer; padding: 6px; border-radius: 6px; }
.logout-btn:hover { color: #fff; background: rgba(255,255,255,0.1); }

/* Main */
.main-content { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow-y: auto; }
.content-header {
  padding: 20px 24px;
  background: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-left { display: flex; align-items: center; gap: 12px; }
.header-left h2 { font-size: 20px; font-weight: 600; margin: 0; }
.header-count { font-size: 14px; color: #888; }
.action-toast {
  margin: 12px 24px 0;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
.action-toast.success { background: #f6ffed; border: 1px solid #b7eb8f; color: #52c41a; }
.action-toast.info { background: #fff7e6; border: 1px solid #ffd591; color: #fa8c16; }
.toast-close { background: none; border: none; cursor: pointer; font-size: 14px; opacity: 0.5; }
.loading-state, .empty-state { text-align: center; padding: 80px 20px; color: #999; }
.empty-icon { color: #52c41a; margin-bottom: 12px; }
.empty-state h3 { margin: 0 0 4px; font-size: 18px; color: #333; }
.empty-state p { margin: 0; font-size: 14px; }

/* Report grid */
.report-grid {
  padding: 20px 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}
.report-card {
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
  border: 1px solid #eee;
  transition: all 0.2s;
}
.report-card:hover { border-color: #7c8cf8; box-shadow: 0 4px 12px rgba(124,140,248,0.12); }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.card-time { font-size: 12px; color: #888; }
.card-body { margin-bottom: 12px; }
.patient-name { font-size: 16px; font-weight: 600; color: #1a1a2e; margin-bottom: 4px; }
.ai-summary { font-size: 13px; color: #666; }
.card-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid #f0f0f0; }
.card-email { font-size: 12px; color: #aaa; }

/* Modal */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.modal-content {
  width: 700px;
  max-height: 85vh;
  background: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.modal-header {
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.modal-header h3 { margin: 0; font-size: 18px; }
.close-btn { background: none; border: none; font-size: 20px; cursor: pointer; padding: 4px 8px; border-radius: 4px; }
.close-btn:hover { background: #f0f0f0; }
.modal-body { padding: 24px; overflow-y: auto; }
.detail-section { margin-bottom: 20px; }
.detail-section h4 { font-size: 15px; font-weight: 600; margin: 0 0 10px; color: #1a1a2e; }
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.info-item { display: flex; gap: 8px; font-size: 14px; align-items: center; }
.info-item .label { color: #888; min-width: 60px; }
.conclusion { font-size: 16px; color: #7c8cf8; font-weight: 500; margin: 0 0 4px; }
.small-text { font-size: 13px; color: #888; margin: 0; }
.diag-box {
  padding: 12px;
  background: #f8f9ff;
  border-radius: 8px;
  border: 1px solid #eef0ff;
}
.diag-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.diag-name { font-weight: 600; font-size: 15px; }
.diag-code { font-family: monospace; color: #7c8cf8; }
.diff-list { margin-top: 8px; }
.diff-item { display: flex; gap: 8px; align-items: center; padding: 4px 0; font-size: 13px; }
.diff-name { font-weight: 500; }
.diff-code { color: #7c8cf8; font-family: monospace; }
.diff-note { color: #888; }
.section-sub { font-weight: 500; font-size: 14px; margin: 8px 0 4px; color: #555; }
.detail-section ul { margin: 0; padding-left: 20px; }
.detail-section li { font-size: 14px; line-height: 1.8; color: #444; }
.review-section { border-top: 2px solid #eee; padding-top: 20px; }
.email-section { border-top: 1px solid #f0f0f0; padding-top: 16px; }
.email-loading, .email-empty { font-size: 13px; color: #999; padding: 8px 0; }
.email-log-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px; }
.email-log-item { display: flex; align-items: center; gap: 8px; font-size: 13px; padding: 6px 8px; background: #fafafa; border-radius: 6px; flex-wrap: wrap; }
.email-recipient { flex: 1; color: #555; }
.email-time { font-size: 12px; color: #999; }
.email-error { font-size: 12px; color: #ff4d4f; }
.email-actions { display: flex; gap: 8px; }
.action-tabs { display: flex; gap: 8px; margin-bottom: 12px; }
.action-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}
.action-tab.active.approved, .action-tab:first-child.active { border-color: #52c41a; color: #52c41a; background: #f6ffed; }
.action-tab.active.rejected, .action-tab:last-child.active { border-color: #ff4d4f; color: #ff4d4f; background: #fff2f0; }
.comment-area { margin-bottom: 12px; }
.comment-area label { font-size: 14px; font-weight: 500; display: block; margin-bottom: 6px; color: #333; }
.comment-area textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;
}
.comment-area textarea:focus { outline: none; border-color: #7c8cf8; }
.action-info {
  padding: 10px 12px;
  background: #f0f5ff;
  border-radius: 6px;
  font-size: 13px;
  color: #5a6ad8;
  margin-bottom: 12px;
}
.action-info.danger { background: #fff2f0; color: #ff4d4f; }
</style>
