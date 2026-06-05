<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Brain, FileText, ArrowLeft, Clock, CheckCircle, AlertCircle, Hourglass } from 'lucide-vue-next'
import { NTag } from 'naive-ui'
import { useReportStore } from '@/stores/report'

const router = useRouter()
const reportStore = useReportStore()

const statusMap: Record<string, { label: string; type: 'info' | 'success' | 'error' | 'warning'; icon: unknown }> = {
  draft: { label: '草稿', type: 'warning', icon: Clock },
  pending_review: { label: '待审核', type: 'info', icon: Hourglass },
  approved: { label: '已确认', type: 'success', icon: CheckCircle },
  rejected: { label: '已退回', type: 'error', icon: AlertCircle },
}

const typeLabels: Record<string, string> = { mild: '轻症评估', moderate: '中症评估', severe: '重症评估' }
const typeColors: Record<string, string> = { mild: 'success', moderate: 'warning', severe: 'error' }

onMounted(() => {
  reportStore.loadReports()
})

function goBack() { router.push('/chat') }
function viewDetail(id: string) { router.push(`/reports/${id}`) }
</script>

<template>
  <div class="report-page">
    <header class="page-header">
      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="20" />
      </button>
      <div class="header-left">
        <Brain :size="24" class="logo-icon" />
        <h1>我的报告</h1>
      </div>
    </header>
    <div class="report-list">
      <div v-if="reportStore.reports.length === 0" class="empty">
        <FileText :size="48" class="empty-icon" />
        <p>暂无评估报告</p>
        <p class="sub">完成对话评估后，报告将在此处显示</p>
      </div>
      <div
        v-for="r in reportStore.reports"
        :key="r.id"
        class="report-card"
        @click="viewDetail(r.id)"
      >
        <div class="card-left">
          <div class="card-type">
            <NTag :type="(typeColors[r.report_type] || 'default') as any" size="small">
              {{ typeLabels[r.report_type] || r.report_type }}
            </NTag>
            <NTag :type="(statusMap[r.status]?.type || 'default') as any" size="small">
              {{ statusMap[r.status]?.label || r.status }}
            </NTag>
          </div>
          <div class="card-date">{{ new Date(r.created_at).toLocaleString('zh-CN') }}</div>
        </div>
        <div class="card-arrow">
          <ArrowLeft :size="16" style="transform: rotate(180deg)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.report-page {
  min-height: 100vh;
  background: #f5f6fa;
}
.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
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
.header-left { display: flex; align-items: center; gap: 10px; }
.header-left h1 { font-size: 20px; font-weight: 600; margin: 0; }
.logo-icon { color: #7c8cf8; }
.report-list {
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.empty {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}
.empty-icon { margin-bottom: 12px; }
.empty p { margin: 0 0 4px; font-size: 16px; }
.empty .sub { font-size: 14px; color: #bbb; }
.report-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #fff;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #eee;
}
.report-card:hover { border-color: #7c8cf8; box-shadow: 0 2px 8px rgba(124,140,248,0.12); }
.card-left { display: flex; flex-direction: column; gap: 8px; }
.card-type { display: flex; gap: 8px; }
.card-date { font-size: 13px; color: #888; }
.card-arrow { color: #ccc; }
</style>
