<script setup lang="ts">
import { ref } from 'vue'
import type { DiagnosisCandidate } from '@/types'
import { Stethoscope, TrendingUp, ChevronDown, ChevronUp, Lightbulb, Target, FileText } from 'lucide-vue-next'

const props = defineProps<{
  diagnosis: Record<string, unknown> | null
  loading: boolean
}>()

defineEmits<{
  selectDisease: [disease: DiagnosisCandidate]
}>()

const expandedIdx = ref<number | null>(0)

function primaryDiagnosis(): DiagnosisCandidate | null {
  const d = props.diagnosis
  if (!d) return null
  const pd = d.primary_diagnosis as Record<string, unknown> | undefined
  if (!pd) return null
  return {
    disease_name: (pd.disease_name as string) || '',
    icd10_hint: (pd.icd10_hint as string) || '',
    confidence: (pd.confidence as number) || 0,
    evidence: (pd.evidence as string[]) || [],
    reasoning: (pd.reasoning as string) || '',
  }
}

function differentialList(): DiagnosisCandidate[] {
  const d = props.diagnosis
  if (!d) return []
  const list = d.differential_list as Record<string, unknown>[] | undefined
  if (!list) return []
  return list.map(item => ({
    disease_name: (item.disease_name as string) || '',
    icd10_hint: (item.icd10_hint as string) || '',
    confidence: (item.confidence as number) || 0,
    evidence: (item.evidence as string[]) || [],
    reasoning: (item.reasoning as string) || '',
  }))
}

function allCandidates(): DiagnosisCandidate[] {
  const p = primaryDiagnosis()
  const d = differentialList()
  if (p) return [p, ...d]
  return d
}

function confidenceColor(val: number): string {
  if (val >= 0.85) return '#4ade80'
  if (val >= 0.7) return '#facc15'
  return '#f87171'
}

function confidenceLabel(val: number): string {
  if (val >= 0.85) return '高置信度'
  if (val >= 0.7) return '中置信度'
  return '低置信度'
}

function toggle(idx: number) {
  expandedIdx.value = expandedIdx.value === idx ? null : idx
}
</script>

<template>
  <div class="diagnosis-panel">
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <span>正在分析症状，生成鉴别诊断...</span>
    </div>

    <template v-else-if="allCandidates().length > 0">
      <div class="panel-header">
        <Stethoscope :size="20" />
        <span>鉴别诊断</span>
      </div>

      <div
        v-for="(d, idx) in allCandidates()"
        :key="idx"
        :class="['disease-card', { 'primary': idx === 0, 'expanded': expandedIdx === idx }]"
      >
        <div class="card-bar" :style="{ background: confidenceColor(d.confidence) }"></div>
        <div class="card-main" @click="toggle(idx)">
          <div class="card-rank">
            <span v-if="idx === 0" class="rank-badge">首选</span>
            <span v-else class="rank-num">#{{ idx + 1 }}</span>
          </div>
          <div class="card-info">
            <div class="disease-name">{{ d.disease_name }}</div>
            <div class="disease-meta">
              <span v-if="d.icd10_hint" class="icd-tag">{{ d.icd10_hint }}</span>
              <span class="confidence-tag" :style="{ color: confidenceColor(d.confidence) }">
                {{ (d.confidence * 100).toFixed(0) }}%
              </span>
              <span class="confidence-label">{{ confidenceLabel(d.confidence) }}</span>
            </div>
          </div>
          <div class="card-arrow">
            <ChevronDown v-if="expandedIdx !== idx" :size="16" />
            <ChevronUp v-else :size="16" />
          </div>
        </div>

        <div v-if="expandedIdx === idx" class="card-detail">
          <div class="detail-section">
            <div class="detail-title">
              <Target :size="14" />
              支持证据
            </div>
            <ul class="evidence-list">
              <li v-for="(ev, i) in d.evidence" :key="i">{{ ev }}</li>
            </ul>
          </div>

          <div class="detail-section">
            <div class="detail-title">
              <Lightbulb :size="14" />
              推理思路
            </div>
            <p class="reasoning-text">{{ d.reasoning }}</p>
          </div>

          <div class="card-actions">
            <button class="btn-select" @click.stop="$emit('selectDisease', d)">
              选择此诊断，继续制定治疗方案
            </button>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="empty-state">
      暂无诊断结果
    </div>
  </div>
</template>

<style scoped>
.diagnosis-panel {
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
@keyframes spin {
  to { transform: rotate(360deg); }
}
.empty-state {
  padding: 40px 20px;
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
}

/* 疾病卡片 */
.disease-card {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;
  transition: border-color 0.2s;
}
.disease-card:hover {
  border-color: #334155;
}
.disease-card.primary {
  border-color: rgba(99, 102, 241, 0.3);
}
.disease-card.expanded {
  border-color: #6366f1;
}
.card-bar {
  height: 3px;
}
.card-main {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  cursor: pointer;
}
.card-rank {
  flex-shrink: 0;
}
.rank-badge {
  font-size: 11px;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 3px 10px;
  border-radius: 6px;
}
.rank-num {
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
}
.card-info {
  flex: 1;
  min-width: 0;
}
.disease-name {
  font-size: 15px;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 4px;
}
.disease-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}
.icd-tag {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(148, 163, 184, 0.1);
  color: #94a3b8;
  font-family: 'JetBrains Mono', monospace;
}
.confidence-tag {
  font-size: 12px;
  font-weight: 700;
}
.confidence-label {
  font-size: 11px;
  color: #64748b;
}
.card-arrow {
  color: #64748b;
  flex-shrink: 0;
}

/* 展开详情 */
.card-detail {
  padding: 0 18px 18px;
  border-top: 1px solid #1e293b;
  margin-top: 0;
  padding-top: 16px;
}
.detail-section {
  margin-bottom: 14px;
}
.detail-title {
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}
.evidence-list {
  list-style: none;
  padding: 0;
}
.evidence-list li {
  font-size: 12px;
  color: #94a3b8;
  padding: 3px 0;
  padding-left: 16px;
  position: relative;
  line-height: 1.5;
}
.evidence-list li::before {
  content: '•';
  position: absolute;
  left: 2px;
  color: #6366f1;
}
.reasoning-text {
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.6;
}
.card-actions {
  margin-top: 16px;
}
.btn-select {
  width: 100%;
  padding: 10px 0;
  border: none;
  border-radius: 8px;
  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(99, 102, 241, 0.25);
  color: #818cf8;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-select:hover {
  background: rgba(99, 102, 241, 0.2);
  border-color: #6366f1;
}
</style>
