<script setup lang="ts">
import { ShieldCheck, Check, X, AlertTriangle } from 'lucide-vue-next'

const props = defineProps<{
  auditResult: Record<string, unknown> | null
}>()

function complianceChecks(): Record<string, unknown>[] {
  return (props.auditResult?.compliance_checks as Record<string, unknown>[]) || []
}

function phiFound(): string[] {
  return (props.auditResult?.phi_fields_found as string[]) || []
}

function phiMasked(): string[] {
  return (props.auditResult?.phi_fields_masked as string[]) || []
}

function riskLevel(): string {
  return (props.auditResult?.overall_risk_level as string) || 'low'
}

function isCompliant(): boolean {
  return !!(props.auditResult?.hipaa_compliant)
}

function riskColor(level: string): string {
  const map: Record<string, string> = {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#ef4444',
  }
  return map[level] || '#64748b'
}
</script>

<template>
  <div class="audit-panel" v-if="auditResult">
    <div class="panel-header">
      <ShieldCheck :size="20" />
      <span>合规审计</span>
      <span :class="['compliance-badge', isCompliant() ? 'pass' : 'fail']">
        {{ isCompliant() ? '通过' : '未通过' }}
      </span>
    </div>

    <div class="checks-list">
      <div v-for="(check, idx) in complianceChecks()" :key="idx" class="check-item">
        <Check v-if="check.passed" :size="14" class="icon-pass" />
        <X v-else :size="14" class="icon-fail" />
        <div class="check-info">
          <div class="check-name">{{ check.check_name }}</div>
          <div v-if="check.detail" class="check-detail">{{ check.detail }}</div>
        </div>
      </div>
    </div>

    <div v-if="phiFound().length" class="phi-box">
      <AlertTriangle :size="14" />
      <div>
        <div class="phi-title">PHI 检测</div>
        <div class="phi-tags">
          <span v-for="(p, idx) in phiFound()" :key="idx" class="phi-tag found">{{ p }}</span>
        </div>
        <div v-if="phiMasked().length" class="phi-masked">
          已脱敏：{{ phiMasked().join(', ') }}
        </div>
      </div>
    </div>

    <div class="risk-bar" :style="{ background: riskColor(riskLevel()) }">
      风险等级：{{ riskLevel() === 'low' ? '低' : riskLevel() === 'medium' ? '中' : '高' }}
    </div>
  </div>
</template>

<style scoped>
.audit-panel {
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
.compliance-badge {
  font-size: 11px;
  padding: 2px 10px;
  border-radius: 20px;
  font-weight: 600;
}
.compliance-badge.pass {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}
.compliance-badge.fail {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.checks-list {
  margin-bottom: 16px;
}
.check-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #1e293b;
}
.icon-pass { color: #22c55e; flex-shrink: 0; margin-top: 2px; }
.icon-fail { color: #ef4444; flex-shrink: 0; margin-top: 2px; }
.check-name {
  font-size: 12px;
  color: #e2e8f0;
}
.check-detail {
  font-size: 11px;
  color: #64748b;
  margin-top: 2px;
}
.phi-box {
  background: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.15);
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  gap: 10px;
  color: #f87171;
  margin-bottom: 14px;
}
.phi-title {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
}
.phi-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 6px;
}
.phi-tag {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(248, 113, 113, 0.12);
}
.phi-masked {
  font-size: 10px;
  color: #fca5a5;
}
.risk-bar {
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  opacity: 0.9;
}
</style>
