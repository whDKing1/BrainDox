<script setup lang="ts">
import { ClipboardList, FileText, Tag } from 'lucide-vue-next'

const props = defineProps<{
  codingResult: Record<string, unknown> | null
}>()

function primaryIcd10(): Record<string, unknown> | null {
  return (props.codingResult?.primary_icd10 as Record<string, unknown>) || null
}

function secondaryIcd10(): Record<string, unknown>[] {
  return (props.codingResult?.secondary_icd10_codes as Record<string, unknown>[]) || []
}

function drgGroup(): Record<string, unknown> | null {
  return (props.codingResult?.drg_group as Record<string, unknown>) || null
}

function codingNotes(): string {
  return (props.codingResult?.coding_notes as string) || ''
}
</script>

<template>
  <div class="coding-panel" v-if="codingResult">
    <div class="panel-header">
      <ClipboardList :size="20" />
      <span>ICD-10 编码 & DRG</span>
    </div>

    <div v-if="primaryIcd10()" class="code-card primary">
      <div class="code-label">主要诊断编码</div>
      <div class="code-main">
        <span class="code-value">{{ primaryIcd10()?.code }}</span>
        <span class="code-confidence">{{ ((primaryIcd10()?.confidence as number || 0) * 100).toFixed(0) }}%</span>
      </div>
      <div class="code-desc">{{ primaryIcd10()?.description }}</div>
      <div class="code-cat">{{ primaryIcd10()?.category }}</div>
    </div>

    <div v-if="secondaryIcd10().length" class="sub-section">
      <div class="sub-title">次要编码</div>
      <div v-for="(sc, idx) in secondaryIcd10()" :key="idx" class="code-card">
        <div class="code-main">
          <span class="code-value">{{ sc.code }}</span>
          <span class="code-confidence small">{{ ((sc.confidence as number || 0) * 100).toFixed(0) }}%</span>
        </div>
        <div class="code-desc">{{ sc.description }}</div>
      </div>
    </div>

    <div v-if="drgGroup()" class="drg-card">
      <div class="drg-header">
        <FileText :size="14" />
        DRG 分组
      </div>
      <div class="drg-body">
        <div class="drg-code">{{ drgGroup()?.drg_code }}</div>
        <div class="drg-desc">{{ drgGroup()?.description }}</div>
        <div class="drg-meta">
          <span>权重 {{ drgGroup()?.weight }}</span>
          <span>平均住院 {{ drgGroup()?.mean_los }} 天</span>
        </div>
      </div>
    </div>

    <div v-if="codingNotes()" class="notes-box">
      {{ codingNotes() }}
    </div>
  </div>
</template>

<style scoped>
.coding-panel {
  padding: 24px 20px;
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
.code-card {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 10px;
}
.code-card.primary {
  border-color: rgba(99, 102, 241, 0.3);
}
.code-label {
  font-size: 10px;
  color: #818cf8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}
.code-main {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}
.code-value {
  font-size: 18px;
  font-weight: 700;
  color: #e2e8f0;
  font-family: 'JetBrains Mono', monospace;
}
.code-confidence {
  font-size: 11px;
  font-weight: 600;
  color: #4ade80;
}
.code-confidence.small {
  font-size: 10px;
}
.code-desc {
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.4;
}
.code-cat {
  font-size: 10px;
  color: #64748b;
  margin-top: 4px;
}
.sub-section {
  margin-bottom: 12px;
}
.sub-title {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
  padding-left: 2px;
}
.drg-card {
  background: rgba(16, 185, 129, 0.04);
  border: 1px solid rgba(16, 185, 129, 0.15);
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 12px;
}
.drg-header {
  font-size: 12px;
  color: #34d399;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}
.drg-code {
  font-size: 20px;
  font-weight: 700;
  color: #34d399;
  font-family: 'JetBrains Mono', monospace;
}
.drg-desc {
  font-size: 13px;
  color: #94a3b8;
  margin: 4px 0;
}
.drg-meta {
  display: flex;
  gap: 16px;
  font-size: 11px;
  color: #64748b;
}
.notes-box {
  font-size: 12px;
  color: #64748b;
  background: rgba(148, 163, 184, 0.05);
  border-radius: 8px;
  padding: 12px 14px;
  line-height: 1.6;
}
</style>
