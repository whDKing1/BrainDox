<script setup lang="ts">
import type { MedicationItem, DDIItem } from '@/types'
import { Pill, AlertTriangle, Info, Activity, FileText, ShieldAlert, ArrowRight, Lightbulb } from 'lucide-vue-next'

const props = defineProps<{
  treatmentPlan: Record<string, unknown> | null
  loading: boolean
}>()

function medications(): MedicationItem[] {
  if (!props.treatmentPlan) return []
  return (props.treatmentPlan.medications as MedicationItem[]) || []
}

function drugInteractions(): DDIItem[] {
  if (!props.treatmentPlan) return []
  return (props.treatmentPlan.drug_interactions as DDIItem[]) || []
}

function nonDrugTreatments(): string[] {
  if (!props.treatmentPlan) return []
  return (props.treatmentPlan.non_drug_treatments as string[]) || []
}

function warnings(): string[] {
  if (!props.treatmentPlan) return []
  return (props.treatmentPlan.warnings as string[]) || []
}

function diagnosisAddressed(): string {
  if (!props.treatmentPlan) return ''
  return (props.treatmentPlan.diagnosis_addressed as string) || ''
}

function severityColor(sev: string): string {
  const map: Record<string, string> = {
    contraindicated: '#ef4444',
    major: '#ef4444',
    moderate: '#f59e0b',
    minor: '#3b82f6',
    beneficial: '#22c55e',
    none: '#64748b',
  }
  return map[sev] || '#64748b'
}

function severityLabel(sev: string): string {
  const map: Record<string, string> = {
    contraindicated: '绝对禁忌',
    major: '严重交互',
    moderate: '中度交互',
    minor: '轻度交互',
    beneficial: '有益协同',
    none: '无交互',
  }
  return map[sev] || sev
}
</script>

<template>
  <div class="treatment-panel">
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <span>正在生成治疗方案...</span>
    </div>

    <template v-else-if="medications().length > 0">
      <div class="panel-header">
        <Pill :size="20" />
        <span>治疗方案</span>
        <span v-if="diagnosisAddressed()" class="dx-tag">针对：{{ diagnosisAddressed() }}</span>
      </div>

      <!-- 药物列表 -->
      <div class="section">
        <div class="section-title">
          <Info :size="14" />
          药物方案
        </div>
        <div v-for="(med, idx) in medications()" :key="idx" class="med-card">
          <div class="med-header">
            <div class="med-name">
              {{ med.generic_name || med.drug_name }}
              <span v-if="med.drug_class" class="class-tag">{{ med.drug_class }}</span>
            </div>
          </div>
          <div class="med-grid">
            <div class="med-field" v-if="med.dosage">
              <span class="field-label">剂量</span>
              <span class="field-value">{{ med.dosage }}</span>
            </div>
            <div class="med-field" v-if="med.frequency">
              <span class="field-label">频次</span>
              <span class="field-value">{{ med.frequency }}</span>
            </div>
            <div class="med-field" v-if="med.route">
              <span class="field-label">途径</span>
              <span class="field-value">{{ med.route }}</span>
            </div>
            <div class="med-field" v-if="med.duration">
              <span class="field-label">疗程</span>
              <span class="field-value">{{ med.duration }}</span>
            </div>
          </div>
          <div v-if="med.titration_schedule" class="med-extra">
            <span class="field-label">滴定方案</span>
            <span class="field-value">{{ med.titration_schedule }}</span>
          </div>
          <div v-if="med.psychiatric_notes" class="med-notes">
            <Lightbulb :size="12" />
            {{ med.psychiatric_notes }}
          </div>
          <div v-if="med.side_effects?.length" class="med-side-effects">
            <AlertTriangle :size="12" />
            <span v-for="(se, i) in med.side_effects" :key="i" class="se-tag">{{ se }}</span>
          </div>
          <div v-if="med.monitoring_requirements" class="med-extra">
            <span class="field-label">监测要求</span>
            <span class="field-value">{{ med.monitoring_requirements }}</span>
          </div>
        </div>
      </div>

      <!-- 药物交互 -->
      <div v-if="drugInteractions().length" class="section">
        <div class="section-title">
          <ShieldAlert :size="14" />
          药物交互检查
        </div>
        <div v-for="(ddi, idx) in drugInteractions()" :key="idx" class="ddi-item">
          <div class="ddi-header">
            <div class="ddi-drugs">
              {{ ddi.drug_a }} <ArrowRight :size="12" /> {{ ddi.drug_b }}
            </div>
            <span class="ddi-severity" :style="{ color: severityColor(ddi.severity || '') }">
              {{ severityLabel(ddi.severity || '') }}
            </span>
          </div>
          <div class="ddi-desc" v-if="ddi.description">{{ ddi.description }}</div>
          <div class="ddi-rec" v-if="ddi.recommendation">{{ ddi.recommendation }}</div>
        </div>
      </div>

      <!-- 非药物治疗 -->
      <div v-if="nonDrugTreatments().length" class="section">
        <div class="section-title">
          <Activity :size="14" />
          非药物治疗
        </div>
        <div class="tag-list">
          <span v-for="(t, idx) in nonDrugTreatments()" :key="idx" class="option-tag">{{ t }}</span>
        </div>
      </div>

      <!-- 警告 -->
      <div v-if="warnings().length" class="warnings-box">
        <AlertTriangle :size="16" />
        <ul>
          <li v-for="(w, idx) in warnings()" :key="idx">{{ w }}</li>
        </ul>
      </div>
    </template>

    <div v-else class="empty-state">
      请先在诊断面板选择一个诊断，再生成治疗方案
    </div>
  </div>
</template>

<style scoped>
.treatment-panel {
  padding: 24px 20px;
  height: 100%;
  overflow-y: auto;
}
.panel-header {
  font-size: 16px;
  font-weight: 600;
  color: #e2e8f0;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.dx-tag {
  font-size: 11px;
  font-weight: 400;
  color: #818cf8;
  background: rgba(99, 102, 241, 0.1);
  padding: 2px 10px;
  border-radius: 20px;
}
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 60px 20px;
  color: #64748b;
  font-size: 13px;
}
.loading-spinner {
  width: 32px;
  height: 32px;
  border: 2px solid #1e293b;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.empty-state {
  padding: 40px 20px;
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
}

.section {
  margin-bottom: 20px;
}
.section-title {
  font-size: 13px;
  font-weight: 600;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

.med-card {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 10px;
}
.med-header {
  margin-bottom: 10px;
}
.med-name {
  font-size: 15px;
  font-weight: 600;
  color: #e2e8f0;
}
.class-tag {
  font-size: 10px;
  font-weight: 400;
  color: #818cf8;
  background: rgba(99, 102, 241, 0.1);
  padding: 1px 8px;
  border-radius: 4px;
  margin-left: 8px;
}
.med-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 8px;
}
.med-field {
  display: flex;
  gap: 6px;
}
.med-extra {
  display: flex;
  gap: 6px;
  margin-top: 6px;
}
.field-label {
  font-size: 11px;
  color: #64748b;
  flex-shrink: 0;
}
.field-value {
  font-size: 11px;
  color: #94a3b8;
}
.med-notes {
  font-size: 11px;
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.06);
  border: 1px solid rgba(251, 191, 36, 0.12);
  border-radius: 6px;
  padding: 8px 10px;
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  line-height: 1.5;
}
.med-side-effects {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  flex-wrap: wrap;
  color: #f87171;
  font-size: 11px;
}
.se-tag {
  background: rgba(248, 113, 113, 0.08);
  border: 1px solid rgba(248, 113, 113, 0.15);
  padding: 2px 8px;
  border-radius: 4px;
}
.ddi-item {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 8px;
}
.ddi-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.ddi-drugs {
  font-size: 12px;
  color: #e2e8f0;
  display: flex;
  align-items: center;
  gap: 6px;
}
.ddi-severity {
  font-size: 11px;
  font-weight: 700;
}
.ddi-desc {
  font-size: 11px;
  color: #94a3b8;
  line-height: 1.5;
  margin-bottom: 4px;
}
.ddi-rec {
  font-size: 11px;
  color: #818cf8;
  line-height: 1.5;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.option-tag {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(148, 163, 184, 0.08);
  border: 1px solid rgba(148, 163, 184, 0.12);
  color: #94a3b8;
}
.warnings-box {
  background: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.15);
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #f87171;
}
.warnings-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.warnings-box li {
  font-size: 12px;
  padding: 2px 0;
  line-height: 1.5;
}
</style>
