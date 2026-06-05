import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ReportSummary, ReportDetail } from '@/types'
import { getMyReports, getReportDetail } from '@/api'

export const useReportStore = defineStore('report', () => {
  const reports = ref<ReportSummary[]>([])
  const currentReport = ref<ReportDetail | null>(null)
  const isLoading = ref(false)

  async function loadReports() {
    isLoading.value = true
    try {
      const res = await getMyReports()
      reports.value = res.reports
    } finally {
      isLoading.value = false
    }
  }

  async function loadReportDetail(id: string) {
    isLoading.value = true
    try {
      currentReport.value = await getReportDetail(id)
    } finally {
      isLoading.value = false
    }
  }

  return {
    reports,
    currentReport,
    isLoading,
    loadReports,
    loadReportDetail,
  }
})
