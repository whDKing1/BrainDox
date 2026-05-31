<script setup lang="ts">
import type { StageInfo } from '@/types'
import { Activity, Brain, Stethoscope, Pill, ClipboardList, ShieldCheck } from 'lucide-vue-next'

const props = defineProps<{
  stages: StageInfo[]
  activeStage: string
  scenario: string
}>()

defineEmits<{
  clickStage: [key: string]
}>()

function stageIcon(key: string) {
  const map: Record<string, unknown> = {
    intake: Brain,
    diagnosis: Stethoscope,
    treatment: Pill,
    coding: ClipboardList,
    audit: ShieldCheck,
  }
  return map[key] || Activity
}

function statusClass(status: string) {
  return `status-${status}`
}
</script>

<template>
  <div class="stepper-panel">
    <h3 class="panel-title">
      <Activity :size="18" />
      临床决策路径
    </h3>

    <div
      v-for="stage in stages"
      :key="stage.key"
      :class="['stage-item', statusClass(stage.status), { 'cursor-pointer': stage.status === 'completed' }]"
      @click="stage.status === 'completed' && $emit('clickStage', stage.key)"
    >
      <div class="stage-icon-wrap">
        <component :is="stageIcon(stage.key)" :size="16" />
      </div>
      <div class="stage-line"></div>
      <div class="stage-content">
        <div class="stage-label">{{ stage.label }}</div>
        <div class="stage-desc">{{ stage.description }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stepper-panel {
  padding: 24px 20px;
}
.panel-title {
  font-size: 14px;
  font-weight: 600;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.stage-item {
  display: flex;
  align-items: flex-start;
  gap: 0;
  position: relative;
  padding-bottom: 28px;
}
.stage-item:last-child {
  padding-bottom: 0;
}
.stage-item:last-child .stage-line {
  display: none;
}
.stage-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #1e293b;
  border: 1px solid #334155;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  flex-shrink: 0;
  z-index: 1;
  transition: all 0.3s;
}
.status-active .stage-icon-wrap {
  background: rgba(99, 102, 241, 0.15);
  border-color: #6366f1;
  color: #818cf8;
  box-shadow: 0 0 12px rgba(99, 102, 241, 0.2);
}
.status-completed .stage-icon-wrap {
  background: rgba(34, 197, 94, 0.1);
  border-color: #22c55e;
  color: #4ade80;
}
.status-skipped .stage-icon-wrap {
  opacity: 0.3;
}
.stage-line {
  position: absolute;
  left: 17px;
  top: 36px;
  bottom: 0;
  width: 1px;
  background: #1e293b;
}
.status-completed .stage-line {
  background: #22c55e;
}
.status-active .stage-line {
  background: linear-gradient(to bottom, #6366f1, #1e293b);
}
.stage-content {
  margin-left: 14px;
  flex: 1;
}
.stage-label {
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 2px;
}
.status-pending .stage-label,
.status-skipped .stage-label {
  color: #475569;
}
.stage-desc {
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
}
.cursor-pointer {
  cursor: pointer;
}
.cursor-pointer:hover .stage-icon-wrap {
  box-shadow: 0 0 16px rgba(34, 197, 94, 0.25);
}
</style>
