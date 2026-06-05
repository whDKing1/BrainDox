<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Brain, ArrowLeft, FileText, CheckCircle, AlertCircle, Hourglass, Download, Mail } from 'lucide-vue-next'
import { NTag, NButton } from 'naive-ui'
import { useReportStore } from '@/stores/report'

const route = useRoute()
const router = useRouter()
const reportStore = useReportStore()

const statusMap: Record<string, { label: string; type: 'info' | 'success' | 'error' | 'warning' }> = {
  draft: { label: '草稿', type: 'warning' },
  pending_review: { label: '待审核', type: 'info' },
  approved: { label: '已确认生效', type: 'success' },
  rejected: { label: '已退回', type: 'error' },
}
const typeLabels: Record<string, string> = { mild: '轻症评估', moderate: '中症评估', severe: '重症评估' }
const typeColors: Record<string, string> = { mild: 'success', moderate: 'warning', severe: 'error' }

const report = computed(() => reportStore.currentReport)
const statusInfo = computed(() => statusMap[report.value?.status || ''] || { label: '未知', type: 'default' as const })

onMounted(async () => {
  const id = route.params.id as string
  if (id) {
    await reportStore.loadReportDetail(id)
  }
})

function goBack() { router.push('/reports') }
</script>

<template>
  <div class="detail-page">
    <header class="detail-header">
      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="20" />
      </button>
      <div class="header-center">
        <Brain :size="20" class="logo-icon" />
        <h1>评估报告</h1>
      </div>
    </header>

    <div v-if="!report" class="loading">加载中...</div>

    <div v-else class="detail-content">
      <div class="status-card">
        <div class="status-left">
          <NTag v-if="report.report_type" :type="(typeColors[report.report_type] || 'default') as any" size="small">
            {{ typeLabels[report.report_type] || report.report_type }}
          </NTag>
          <NTag :type="statusInfo.type as any" size="small">
            {{ statusInfo.label }}
          </NTag>
        </div>
        <div class="status-time">{{ new Date(report.created_at).toLocaleString('zh-CN') }}</div>
      </div>

      <div v-if="report.content?.summary" class="card">
        <h3>评估结论</h3>
        <p class="conclusion-text">{{ report.content.summary.conclusion || '暂无' }}</p>
        <div class="meta-row">
          <span class="meta-label">严重度评估：</span>
          <span class="meta-value">{{ report.content.summary.severity_assessment }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">主诉：</span>
          <span class="meta-value">{{ report.content.summary.chief_complaint }}</span>
        </div>
      </div>

      <div v-if="report.content?.diagnosis?.primary" class="card">
        <h3>诊断信息</h3>
        <div class="diag-primary">
          <div class="diag-name">{{ report.content.diagnosis.primary.disease_name || '暂无' }}</div>
          <div class="diag-meta">
            <span class="code">{{ report.content.diagnosis.primary.icd_code }}</span>
            <NTag size="tiny" type="info">
              置信度 {{ Math.round((report.content.diagnosis.primary.confidence || 0) * 100) }}%
            </NTag>
          </div>
        </div>
        <div v-if="report.content.diagnosis.differentials && report.content.diagnosis.differentials.length > 0" class="diag-diffs">
          <h4>鉴别诊断</h4>
          <div v-for="(d, i) in report.content.diagnosis.differentials" :key="i" class="diff-item">
            <span class="diff-name">{{ d.disease_name }}</span>
            <span class="diff-code">{{ d.icd_code }}</span>
            <span class="diff-note">{{ d.key_differentiator }}</span>
          </div>
        </div>
      </div>

      <div v-if="report.content?.recommendations" class="card">
        <h3>建议</h3>
        <div v-if="report.content.recommendations.lifestyle && report.content.recommendations.lifestyle.length > 0">
          <h4>生活方式</h4>
          <ul>
            <li v-for="(item, i) in report.content.recommendations.lifestyle" :key="i">{{ item }}</li>
          </ul>
        </div>
        <div v-if="report.content.recommendations.psychotherapy && report.content.recommendations.psychotherapy.length > 0">
          <h4>心理干预</h4>
          <ul>
            <li v-for="(item, i) in report.content.recommendations.psychotherapy" :key="i">{{ item }}</li>
          </ul>
        </div>
        <div v-if="report.content.follow_up" class="follow-up">
          <h4>随访计划</h4>
          <p>{{ report.content.follow_up }}</p>
        </div>
      </div>

      <div v-if="report.content?.doctor_review" class="card review-card">
        <h3>医生审核</h3>
        <div v-if="report.status === 'approved'" class="review-approved">
          <CheckCircle :size="20" />
          <span>已由 {{ report.content.doctor_review.doctor_name || '医生' }} 审核确认</span>
        </div>
        <div v-if="report.doctor_comment" class="review-comment">
          <p>{{ report.doctor_comment }}</p>
        </div>
      </div>

      <div class="disclaimer">
        本报告由AI辅助生成，经执业医师审核确认后生效。仅供参考，不构成最终诊断。
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-page {
  min-height: 100vh;
  background: #f5f6fa;
}
.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  color: #666;
}
.back-btn:hover { background: #f0f0f0; }
.header-center { display: flex; align-items: center; gap: 10px; }
.header-center h1 { font-size: 18px; font-weight: 600; margin: 0; }
.logo-icon { color: #7c8cf8; }
.loading { text-align: center; padding: 60px; color: #999; }
.detail-content {
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.status-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #eee;
}
.status-left { display: flex; gap: 8px; }
.status-time { font-size: 13px; color: #888; }
.card {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #eee;
}
.card h3 { font-size: 16px; font-weight: 600; margin: 0 0 12px; color: #1a1a2e; }
.card h4 { font-size: 14px; font-weight: 500; margin: 12px 0 8px; color: #555; }
.conclusion-text { font-size: 16px; color: #7c8cf8; font-weight: 500; }
.meta-row { display: flex; gap: 8px; margin-top: 8px; font-size: 14px; }
.meta-label { color: #888; white-space: nowrap; }
.meta-value { color: #333; }
.diag-primary { display: flex; flex-direction: column; gap: 8px; }
.diag-name { font-size: 16px; font-weight: 600; color: #333; }
.diag-meta { display: flex; gap: 8px; align-items: center; }
.code { font-family: monospace; color: #7c8cf8; font-size: 14px; }
.diff-item { display: flex; gap: 8px; align-items: center; padding: 6px 0; font-size: 14px; }
.diff-name { font-weight: 500; }
.diff-code { color: #7c8cf8; font-family: monospace; }
.diff-note { color: #888; }
.card ul { margin: 0; padding-left: 20px; }
.card li { font-size: 14px; line-height: 1.8; color: #444; }
.follow-up p { font-size: 14px; color: #444; line-height: 1.6; }
.review-card { border-left: 3px solid #7c8cf8; }
.review-approved { display: flex; align-items: center; gap: 8px; color: #52c41a; font-weight: 500; }
.review-comment { margin-top: 8px; padding: 12px; background: #f9f9fb; border-radius: 6px; }
.review-comment p { margin: 0; font-size: 14px; color: #555; }
.disclaimer {
  text-align: center;
  font-size: 12px;
  color: #bbb;
  padding: 20px;
}
</style>
