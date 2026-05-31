<script setup lang="ts">
import { ref, computed } from 'vue'
import { Brain, Send, AlertTriangle, Stethoscope, Pill, ClipboardList, ShieldCheck, Activity, UserPlus, RefreshCw, Info } from 'lucide-vue-next'
import { NButton, NInput, NSpace, NSelect } from 'naive-ui'
import type { AnalyzeResponse, StageInfo, PipelineStage } from '@/types'
import { analyzePatientForm, confirmDiagnosis } from '@/api'
import PipelineStepper from '@/components/PipelineStepper.vue'
import TreatmentPanel from '@/components/TreatmentPanel.vue'
import CodingPanel from '@/components/CodingPanel.vue'
import AuditPanel from '@/components/AuditPanel.vue'

const selectedScenario = ref<'new_visit' | 'followup'>('new_visit')

const form = ref({
  chief_complaint: '情绪低落、兴趣丧失、早醒、体重下降伴自杀意念，持续约一个半月',
  symptoms: '情绪低落, 兴趣丧失, 早醒, 体重下降, 被动自杀意念, 精神运动性迟滞',
  suicide_risk: '低风险 - 被动自杀意念，无具体计划，无既往尝试，家属可监护',
  substance_use: '否认吸烟、饮酒及药物滥用史',
  name: '',
  age: 25,
  gender: '女',
  medical_history: '',
  family_history: '',
})

const suicideRiskOptions = [
  { label: '无风险', value: '无风险 - 否认自杀意念及行为' },
  { label: '低风险 - 被动意念', value: '低风险 - 被动自杀意念，无具体计划，无既往尝试，家属可监护' },
  { label: '中风险 - 主动意念', value: '中风险 - 主动自杀意念，有模糊计划，无既往尝试，保护因素尚可' },
  { label: '高风险 - 有计划', value: '高风险 - 主动自杀意念，有具体计划，手段可及，或既往自杀未遂史' },
  { label: '极高风险 - 即刻', value: '极高风险 - 即刻自杀风险，已制定详细计划并准备实施，需紧急干预' },
]

const substanceUseOptions = [
  { label: '否认物质使用', value: '否认吸烟、饮酒及药物滥用史' },
  { label: '社交性饮酒', value: '社交性饮酒，每周1-2次，每次1-2单位，否认酗酒史' },
  { label: '每日吸烟', value: '每日吸烟，约半包/天，持续X年' },
  { label: '酒精依赖', value: '酒精依赖：每日饮酒，约X两/天，晨起饮酒，曾因饮酒导致工作/家庭问题' },
  { label: '药物滥用', value: '药物滥用史（需进一步详细询问种类、用量、频次）' },
  { label: '未评估', value: '未评估 - 需在接诊中进一步询问' },
]

const genderOptions = [
  { label: '女', value: '女' },
  { label: '男', value: '男' },
  { label: '未知', value: '未知' },
]

const analyzing = ref(false)
const result = ref<AnalyzeResponse | null>(null)
const error = ref<string | null>(null)
const activeStage = ref<string>('intake')
const currentThreadId = ref('default')
const awaitingDiagnosisSelection = ref(false)
const pendingConfirmDisease = ref('')

const isFollowup = computed(() => result.value?.scenario === 'followup' || selectedScenario.value === 'followup')
const awaitingDiagnosis = computed(() => result.value?.human_review_status === 'awaiting_diagnosis')
const candidateAnalyses = computed<Array<Record<string, unknown>>>(() => {
  const dx = result.value?.diagnosis as Record<string, unknown> | null
  return (dx?.candidate_analyses as Array<Record<string, unknown>>) || []
})

const stages = computed<StageInfo[]>(() => {
  if (selectedScenario.value === 'followup') {
    return [
      { key: 'intake', label: '复诊信息', icon: '', description: '诊断+用药+变化', status: result.value?.patient_info ? 'completed' : activeStage.value === 'intake' ? 'active' : 'pending' },
      { key: 'treatment', label: '治疗方案推荐', icon: '', description: '调药建议 + DDI检查', status: result.value?.treatment_plan ? 'completed' : activeStage.value === 'treatment' ? 'active' : 'pending' },
      { key: 'coding', label: 'ICD-10编码', icon: '', description: 'F00-F99编码 + DRG分组', status: result.value?.coding_result ? 'completed' : activeStage.value === 'coding' ? 'active' : 'pending' },
      { key: 'audit', label: '合规审计', icon: '', description: 'PHI检测 + 合规检查', status: result.value?.audit_result ? 'completed' : activeStage.value === 'audit' ? 'active' : 'pending' },
    ]
  }
  return [
    { key: 'diagnosis', label: '鉴别诊断', icon: '', description: 'GraphRAG检索+DSM-5分析', status: result.value?.diagnosis ? 'completed' : activeStage.value === 'diagnosis' ? 'active' : 'pending' },
    { key: 'treatment', label: '治疗方案推荐', icon: '', description: '药理学+心理治疗+DDI检查', status: result.value?.treatment_plan ? 'completed' : activeStage.value === 'treatment' ? 'active' : 'pending' },
    { key: 'coding', label: 'ICD-10编码', icon: '', description: 'F00-F99编码 + DRG分组', status: result.value?.coding_result ? 'completed' : activeStage.value === 'coding' ? 'active' : 'pending' },
    { key: 'audit', label: '合规审计', icon: '', description: 'PHI检测 + 合规检查', status: result.value?.audit_result ? 'completed' : activeStage.value === 'audit' ? 'active' : 'pending' },
  ]
})

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

const formValid = computed(() => {
  return form.value.chief_complaint.trim() &&
    form.value.symptoms.trim() &&
    form.value.suicide_risk.trim() &&
    form.value.substance_use.trim()
})

async function handleAnalyze() {
  if (!formValid.value) return
  analyzing.value = true
  error.value = null
  result.value = null
  currentThreadId.value = `session-${Date.now()}`
  activeStage.value = 'diagnosis'
  awaitingDiagnosisSelection.value = false
  pendingConfirmDisease.value = ''

  try {
    const res = await analyzePatientForm({
      chief_complaint: form.value.chief_complaint,
      symptoms: form.value.symptoms,
      suicide_risk: form.value.suicide_risk,
      substance_use: form.value.substance_use,
      name: form.value.name || undefined,
      age: form.value.age || undefined,
      gender: form.value.gender || undefined,
      medical_history: form.value.medical_history || undefined,
      family_history: form.value.family_history || undefined,
      scenario: selectedScenario.value,
      thread_id: currentThreadId.value,
    })
    result.value = res
    if (res.human_review_status === 'awaiting_diagnosis') {
      awaitingDiagnosisSelection.value = true
    }
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : '分析失败'
  } finally {
    analyzing.value = false
  }
}

function selectCandidateDisease(diseaseName: string) {
  pendingConfirmDisease.value = diseaseName
}

async function confirmDiagnosisSelection() {
  if (!pendingConfirmDisease.value || !currentThreadId.value) return
  analyzing.value = true
  awaitingDiagnosisSelection.value = false
  try {
    const res = await confirmDiagnosis(currentThreadId.value, pendingConfirmDisease.value)
    result.value = res
    activeStage.value = 'treatment'
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : '诊断确认失败'
  } finally {
    analyzing.value = false
  }
}

function handleClickStage(key: string) {
  activeStage.value = key
}

function selectScenario(scenario: 'new_visit' | 'followup') {
  selectedScenario.value = scenario
  result.value = null
  error.value = null
}

const blockItems = computed<string[]>(() => {
  if (!result.value?.errors) return []
  return result.value.errors.filter(e => e.startsWith('【阻断】'))
})
const warnItems = computed<string[]>(() => {
  if (!result.value?.errors) return []
  return result.value.errors.filter(e => e.startsWith('【提示】'))
})
const failItems = computed<string[]>(() => {
  if (!result.value?.errors) return []
  return result.value.errors.filter(e => e.startsWith('【错误】'))
})
const isIntakeFailure = computed(() => failItems.value.length > 0)
const hasBlockItems = computed(() => blockItems.value.length > 0)
const allMissingItems = computed<string[]>(() => [...failItems.value, ...blockItems.value, ...warnItems.value])

const hasReachedRetryLimit = computed(() => {
  return (result.value?.retry_count || 0) >= 2
})

function formatPrefix(item: string): string {
  return item.replace('【错误】', '✕ ').replace('【阻断】', '[必须] ').replace('【提示】', '[建议] ')
}
</script>

<template>
  <div class="app-root">
    <header class="app-header">
      <div class="header-left">
        <div class="logo-icon">
          <Brain :size="28" />
        </div>
        <h1 class="logo-text">BrainDox</h1>
        <span class="logo-sub">精神科临床辅助决策系统</span>
      </div>
      <div class="header-right">
        <span class="header-badge">Multi-Agent Pipeline</span>
      </div>
    </header>

    <main class="app-main" :class="{ 'has-result': result }">
      <!-- 输入区 -->
      <div :class="['input-area', { 'compact': result }]">
        <!-- 场景选择 -->
        <div class="scenario-select-row">
          <div class="scenario-label">就诊场景</div>
          <div class="scenario-buttons">
            <button
              :class="['scenario-btn', { active: selectedScenario === 'new_visit' }]"
              :disabled="analyzing"
              @click="selectScenario('new_visit')"
            >
              <UserPlus :size="18" />
              <span class="btn-label">初诊评估</span>
              <span class="btn-desc">新患者首次就诊</span>
            </button>
            <button
              :class="['scenario-btn', { active: selectedScenario === 'followup' }]"
              :disabled="analyzing"
              @click="selectScenario('followup')"
            >
              <RefreshCw :size="18" />
              <span class="btn-label">复诊调药</span>
              <span class="btn-desc">已确诊患者随访调整方案</span>
            </button>
          </div>
        </div>

        <div class="form-grid">
          <div class="form-field full">
            <label class="form-label required">主诉</label>
            <NInput v-model:value="form.chief_complaint" type="textarea" placeholder="例如：情绪低落、兴趣丧失、早醒、体重下降伴自杀意念，持续约一个半月" :autosize="{ minRows: 1, maxRows: 3 }" :disabled="analyzing" />
          </div>
          <div class="form-field full">
            <label class="form-label required">症状列表（逗号分隔）</label>
            <NInput v-model:value="form.symptoms" placeholder="例如：情绪低落, 兴趣丧失, 早醒, 体重下降" :disabled="analyzing" />
          </div>
          <div class="form-field half">
            <label class="form-label required">自杀风险评估</label>
            <NSelect v-model:value="form.suicide_risk" :options="suicideRiskOptions" filterable :disabled="analyzing" />
          </div>
          <div class="form-field half">
            <label class="form-label required">物质使用史</label>
            <NSelect v-model:value="form.substance_use" :options="substanceUseOptions" filterable :disabled="analyzing" />
          </div>
          <div class="form-field third">
            <label class="form-label">姓名</label>
            <NInput v-model:value="form.name" placeholder="选填" :disabled="analyzing" />
          </div>
          <div class="form-field third">
            <label class="form-label">年龄</label>
            <NInput v-model:value="form.age" placeholder="选填" :disabled="analyzing" />
          </div>
          <div class="form-field third">
            <label class="form-label">性别</label>
            <NSelect v-model:value="form.gender" :options="genderOptions" :disabled="analyzing" />
          </div>
          <div class="form-field half">
            <label class="form-label">既往病史（逗号分隔）</label>
            <NInput v-model:value="form.medical_history" placeholder="选填" :disabled="analyzing" />
          </div>
          <div class="form-field half">
            <label class="form-label">家族史（逗号分隔）</label>
            <NInput v-model:value="form.family_history" placeholder="选填" :disabled="analyzing" />
          </div>
        </div>

        <div class="input-actions">
          <NButton type="primary" size="large" @click="handleAnalyze" :loading="analyzing" :disabled="!formValid">
            <template #icon><Send :size="18" /></template>
            开始分析
          </NButton>
        </div>
      </div>

      <!-- Intake Agent 解析失败 — patient_info 为空，上游抛错 -->
      <div v-if="result && result.needs_more_info && isIntakeFailure && !hasReachedRetryLimit" class="needs-more-banner error">
        <div class="banner-icon">
          <AlertTriangle :size="22" />
        </div>
        <div class="banner-content">
          <div class="banner-title">Intake Agent 解析失败，未生成结构化病历</div>
          <ul class="banner-missing">
            <li v-for="(item, i) in allMissingItems" :key="i">{{ formatPrefix(item) }}</li>
          </ul>
          <div class="banner-hint">可能原因：LLM 返回格式异常、JSON 解析失败或 Pydantic 验证未通过。请检查后端日志获取详细错误，或尝试修改输入文本后重新提交。</div>
        </div>
        <div class="banner-action">
          <NButton type="error" size="medium" @click="handleAnalyze" :loading="analyzing">
            <template #icon>
              <RefreshCw :size="16" />
            </template>
            重新分析
          </NButton>
        </div>
      </div>

      <!-- 信息不足：硬阻断 — 有【阻断】字段，Pipeline已停止 -->
      <div v-if="result && result.needs_more_info && !isIntakeFailure && hasBlockItems && !hasReachedRetryLimit" class="needs-more-banner">
        <div class="banner-icon">
          <AlertTriangle :size="22" />
        </div>
        <div class="banner-content">
          <div class="banner-title">关键信息缺失，需要医生补充后重新提交</div>
          <ul v-if="allMissingItems.length" class="banner-missing">
            <li v-for="(item, i) in allMissingItems" :key="i" :class="{ warn: item.startsWith('【提示】') }">
              {{ formatPrefix(item) }}
            </li>
          </ul>
          <div class="banner-hint">补充后请点击下方按钮重新提交分析</div>
        </div>
        <div class="banner-action">
          <NButton type="warning" size="medium" @click="handleAnalyze" :loading="analyzing">
            <template #icon>
              <RefreshCw :size="16" />
            </template>
            补充后重新分析
          </NButton>
        </div>
      </div>

      <!-- 信息不足：软提示 — 仅【提示】字段，Pipeline已继续执行诊断 -->
      <div v-if="result && result.needs_more_info && !isIntakeFailure && !hasBlockItems && !hasReachedRetryLimit" class="needs-more-banner info">
        <div class="banner-icon">
          <Info :size="22" />
        </div>
        <div class="banner-content">
          <div class="banner-title">以下信息建议补充，但不影响当前诊断流程</div>
          <ul v-if="allMissingItems.length" class="banner-missing">
            <li v-for="(item, i) in allMissingItems" :key="i">
              {{ formatPrefix(item) }}
            </li>
          </ul>
          <div class="banner-hint">诊断已基于现有信息完成，补充后可重新分析获得更精确结果</div>
        </div>
        <div class="banner-action">
          <NButton text size="medium" @click="handleAnalyze" :loading="analyzing">
            <template #icon>
              <RefreshCw :size="14" />
            </template>
            补充后重新分析
          </NButton>
        </div>
      </div>

      <!-- 已达重试上限 -->
      <div v-if="result && result.needs_more_info && hasReachedRetryLimit" class="needs-more-banner error">
        <div class="banner-icon">
          <AlertTriangle :size="22" />
        </div>
        <div class="banner-content">
          <div class="banner-title">已达重试上限（{{ result.retry_count }}/2 次）</div>
          <div class="banner-sub">系统将基于现有信息强制给出诊断结论和治疗方案</div>
        </div>
      </div>

      <!-- 结果区：左右分栏 -->
      <div v-if="result" class="result-area">
        <aside class="left-panel">
          <PipelineStepper
            :stages="stages"
            :active-stage="activeStage"
            :scenario="selectedScenario"
            @click-stage="handleClickStage"
          />
        </aside>

        <section class="right-panel">

          <!-- 候选诊断选择区 — 等待医生 HITL 选择 -->
          <div v-if="activeStage === 'diagnosis' && awaitingDiagnosis && result.candidate_diseases && result.candidate_diseases.length" class="candidate-diseases-panel">
            <div class="panel-header">
              <Stethoscope :size="20" />
              <span>GraphRAG 鉴别诊断 — 请选择最可能的诊断</span>
            </div>
            <div class="candidate-grid">
              <div
                v-for="(cd, i) in result.candidate_diseases"
                :key="i"
                :class="['candidate-card', { selected: pendingConfirmDisease === cd.disease }]"
                @click="selectCandidateDisease(cd.disease)"
              >
                <div class="candidate-header">
                  <div class="candidate-index">{{ i + 1 }}</div>
                  <div class="candidate-name">{{ cd.disease }}</div>
                  <div class="candidate-icd" v-if="cd.icd10_code">{{ cd.icd10_code }}</div>
                  <div class="candidate-match">匹配 {{ cd.symptom_match_count }}/{{ cd.total_symptoms }}</div>
                </div>

                <!-- 图检索路径 -->
                <div class="graph-path" v-if="cd.matched_symptoms && cd.matched_symptoms.length">
                  <div class="path-label">图检索路径</div>
                  <div class="path-chain">
                    <span v-for="(sym, si) in cd.matched_symptoms" :key="si" class="path-node">
                      <span class="symptom-badge">{{ sym }}</span>
                      <span v-if="si < cd.matched_symptoms.length - 1" class="path-arrow">→</span>
                    </span>
                    <span class="path-node"><span class="disease-badge">{{ cd.disease }}</span></span>
                  </div>
                </div>

                <!-- LLM 推理分析 -->
                <div class="candidate-analysis" v-if="candidateAnalyses[i]">
                  <div class="analysis-section" v-if="candidateAnalyses[i].supporting_evidence">
                    <div class="analysis-label">支持证据</div>
                    <ul>
                      <li v-for="(ev, ei) in candidateAnalyses[i].supporting_evidence" :key="ei">{{ ev }}</li>
                    </ul>
                  </div>
                  <div class="analysis-section" v-if="candidateAnalyses[i].opposing_evidence && candidateAnalyses[i].opposing_evidence.length">
                    <div class="analysis-label opposing">不支持证据</div>
                    <ul>
                      <li v-for="(ev, ei) in candidateAnalyses[i].opposing_evidence" :key="ei">{{ ev }}</li>
                    </ul>
                  </div>
                  <div class="analysis-reasoning" v-if="candidateAnalyses[i].reasoning">
                    <div class="analysis-label">临床推理路径</div>
                    <p>{{ candidateAnalyses[i].reasoning }}</p>
                  </div>
                </div>
                <div v-else-if="!result.diagnosis" class="analysis-placeholder">
                  <p>LLM 分析暂不可用，请基于图检索路径和您的临床判断选择诊断</p>
                </div>
              </div>
            </div>

            <div class="confirm-bar">
              <span class="confirm-hint" v-if="!pendingConfirmDisease">请点击选择诊断，再点击确认</span>
              <span class="confirm-hint" v-else>已选择：{{ pendingConfirmDisease }}</span>
              <NButton type="primary" size="large" :disabled="!pendingConfirmDisease" :loading="analyzing" @click="confirmDiagnosisSelection">
                <template #icon><Send :size="18" /></template>
                确认诊断，继续治疗方案
              </NButton>
            </div>
          </div>

          <!-- 诊断分析完成（非选中状态） -->
          <div v-if="activeStage === 'diagnosis' && !awaitingDiagnosis && result.diagnosis" class="stage-wrapper">
            <div class="intake-panel">
              <div class="panel-header">
                <Stethoscope :size="20" />
                <span>诊断已确认：{{ result.selected_disease }}</span>
                <span class="panel-badge">已完成</span>
              </div>
              <pre class="json-view">{{ JSON.stringify(result.diagnosis, null, 2) }}</pre>
            </div>
          </div>

          <!-- 降级：诊断完成但无候选也无 LLM 分析 -->
          <div v-if="activeStage === 'diagnosis' && awaitingDiagnosis && (!result.candidate_diseases || !result.candidate_diseases.length)" class="intake-panel">
            <div class="panel-header">
              <AlertTriangle :size="20" />
              <span>知识图谱检索未返回匹配结果</span>
            </div>
            <div class="empty-state">
              <p>未能从症状知识图谱中匹配到候选疾病，可能原因：</p>
              <ul>
                <li>症状描述过于笼统或非典型</li>
                <li>知识库中暂未收录该症状组合</li>
              </ul>
              <p style="margin-top:12px;">请确认后继续，或手动填写诊断结论后提交</p>
            </div>
            <div class="confirm-bar" style="margin-top:12px;">
              <span class="confirm-hint">如需继续，请选择一个诊断</span>
              <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                <NInput v-model:value="pendingConfirmDisease" placeholder="手动输入诊断名称" style="width:220px" />
                <NButton type="primary" size="medium" :disabled="!pendingConfirmDisease" :loading="analyzing" @click="confirmDiagnosisSelection">
                  <template #icon><Send :size="16" /></template>
                  确认并继续
                </NButton>
              </div>
            </div>
          </div>

          <div v-if="activeStage === 'treatment'" class="stage-wrapper">
            <TreatmentPanel
              :treatment-plan="result.treatment_plan"
              :loading="false"
            />
          </div>

          <div v-if="activeStage === 'coding'" class="stage-wrapper">
            <CodingPanel v-if="result.coding_result" :coding-result="result.coding_result" />
            <div v-else class="intake-panel">
              <div class="panel-header">
                <ClipboardList :size="20" />
                <span>ICD-10 编码</span>
                <span class="panel-badge warn">数据缺失</span>
              </div>
              <div class="empty-state">
                <AlertTriangle :size="20" />
                <p>编码结果未生成，可能是上游诊断或治疗失败导致</p>
              </div>
            </div>
          </div>

          <div v-if="activeStage === 'audit'" class="stage-wrapper">
            <AuditPanel v-if="result.audit_result" :audit-result="result.audit_result" />
            <div v-else class="intake-panel">
              <div class="panel-header">
                <ShieldCheck :size="20" />
                <span>合规审计</span>
                <span class="panel-badge warn">数据缺失</span>
              </div>
              <div class="empty-state">审计结果未生成</div>
            </div>
          </div>
        </section>
      </div>

      <div v-if="error" class="error-box">
        <AlertTriangle :size="16" />
        {{ error }}
      </div>
    </main>
  </div>
</template>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: #060912;
  color: #e2e8f0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
#app { min-height: 100vh; }
</style>

<style scoped>
.app-root {
  min-height: 100vh;
  background: linear-gradient(180deg, #060912 0%, #0a0f1a 100%);
  display: flex;
  flex-direction: column;
}
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 28px;
  background: rgba(10, 15, 26, 0.9);
  border-bottom: 1px solid #1a1f2e;
  flex-shrink: 0;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.logo-icon {
  width: 40px; height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex; align-items: center; justify-content: center;
  color: white;
}
.logo-text {
  font-size: 20px; font-weight: 700;
  background: linear-gradient(135deg, #e2e8f0, #94a3b8);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.logo-sub {
  font-size: 12px; color: #64748b;
  padding-left: 12px; border-left: 1px solid #1e293b;
}
.header-badge {
  font-size: 11px; padding: 5px 12px; border-radius: 20px;
  background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2);
  color: #818cf8; font-weight: 500;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 32px 0 0 0;
  transition: padding 0.4s;
}
.app-main.has-result {
  padding: 20px 0 0 0;
}

.input-area {
  max-width: 860px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  transition: all 0.4s;
}
.input-area.compact {
  max-width: 100%;
  padding: 0 28px;
  margin-bottom: 16px;
}

/* 场景选择按钮 */
.scenario-select-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.scenario-label {
  font-size: 13px;
  color: #64748b;
  flex-shrink: 0;
}
.scenario-buttons {
  display: flex;
  gap: 10px;
  flex: 1;
}
.scenario-btn {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-radius: 12px;
  border: 1px solid #1e293b;
  background: #0a0f1a;
  color: #64748b;
  cursor: pointer;
  transition: all 0.25s;
  text-align: left;
}
.scenario-btn:hover:not(:disabled) {
  border-color: #334155;
  color: #94a3b8;
}
.scenario-btn.active {
  border-color: #6366f1;
  background: rgba(99, 102, 241, 0.08);
  color: #818cf8;
  box-shadow: 0 0 16px rgba(99, 102, 241, 0.1);
}
.scenario-btn.active .btn-label {
  color: #e2e8f0;
}
.scenario-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-label {
  font-size: 14px;
  font-weight: 600;
  color: #94a3b8;
}
.btn-desc {
  font-size: 11px;
  color: #475569;
  margin-left: auto;
}

.input-actions { padding-top: 10px; }

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.form-field { min-width: 0; }
.form-field.full { grid-column: 1 / -1; }
.form-field.half { grid-column: span 1; }
.form-field.third { grid-column: span 1; }
.form-label {
  display: block;
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 4px;
}
.form-label.required::after {
  content: ' *';
  color: #f87171;
}
.form-field :deep(.n-input) {
  --n-color: #0a0f1a !important;
  --n-text-color: #e2e8f0 !important;
  --n-border: 1px solid #1e293b !important;
  --n-border-radius: 8px !important;
}
.form-field :deep(.n-base-selection) {
  --n-color: #0a0f1a !important;
  --n-text-color: #e2e8f0 !important;
  --n-border: 1px solid #1e293b !important;
  --n-border-radius: 8px !important;
}

@media (max-width: 600px) {
  .form-field.half, .form-field.third { grid-column: 1 / -1; }
}

/* 信息不足提示 */
.needs-more-banner {
  max-width: 860px;
  margin: 16px auto 0 auto;
  padding: 16px 20px;
  border-radius: 12px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: rgba(251, 191, 36, 0.06);
  border: 1px solid rgba(251, 191, 36, 0.2);
}
.needs-more-banner.info {
  background: rgba(59, 130, 246, 0.06);
  border-color: rgba(59, 130, 246, 0.2);
}
.needs-more-banner.error {
  background: rgba(239, 68, 68, 0.06);
  border-color: rgba(239, 68, 68, 0.2);
}
.banner-icon {
  color: #fbbf24;
  padding-top: 2px;
  flex-shrink: 0;
}
.needs-more-banner.info .banner-icon {
  color: #60a5fa;
}
.needs-more-banner.error .banner-icon {
  color: #f87171;
}
.banner-content {
  flex: 1;
  min-width: 0;
}
.banner-title {
  font-size: 14px;
  font-weight: 600;
  color: #fbbf24;
  margin-bottom: 4px;
}
.needs-more-banner.info .banner-title {
  color: #60a5fa;
}
.needs-more-banner.error .banner-title {
  color: #f87171;
}
.banner-sub {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 8px;
}
.banner-missing {
  list-style: none;
  padding: 0;
  margin-bottom: 8px;
}
.banner-missing li {
  font-size: 12px;
  color: #94a3b8;
  padding: 2px 0;
  padding-left: 16px;
  position: relative;
}
.banner-missing li::before {
  content: '•';
  position: absolute;
  left: 2px;
  color: #fbbf24;
}
.banner-missing li.warn {
  color: #64748b;
}
.banner-missing li.warn::before {
  color: #60a5fa;
}
.needs-more-banner.error .banner-missing li {
  color: #fca5a5;
}
.needs-more-banner.error .banner-missing li::before {
  color: #f87171;
}
.banner-hint {
  font-size: 11px;
  color: #64748b;
}
.banner-action {
  flex-shrink: 0;
  padding-top: 2px;
}

.result-area {
  display: flex;
  flex: 1;
  margin-top: 16px;
  border-top: 1px solid #1a1f2e;
  overflow: hidden;
}
.left-panel {
  width: 280px;
  flex-shrink: 0;
  border-right: 1px solid #1a1f2e;
  background: #080c16;
  overflow-y: auto;
}
.right-panel {
  flex: 1;
  overflow-y: auto;
  background: #0a0f1a;
}

/* 候选诊断卡片 */
.candidate-diseases-panel {
  padding: 24px 20px;
  height: 100%;
}
.candidate-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 16px;
}
.candidate-card {
  background: #0f1420;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
}
.candidate-card:hover {
  border-color: #334155;
  background: #131a2a;
}
.candidate-card.selected {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  background: #181e30;
}
.candidate-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}
.candidate-index {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: #6366f1;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.candidate-name {
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
}
.candidate-icd {
  font-size: 11px;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  padding: 1px 6px;
  border-radius: 4px;
}
.candidate-match {
  font-size: 11px;
  color: #94a3b8;
  margin-left: auto;
}
.graph-path {
  margin-bottom: 12px;
  padding: 10px;
  background: rgba(59, 130, 246, 0.04);
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.1);
}
.path-label {
  font-size: 10px;
  color: #60a5fa;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}
.path-chain {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}
.path-node {
  display: inline-flex;
  align-items: center;
}
.symptom-badge {
  font-size: 11px;
  color: #93c5fd;
  background: rgba(59, 130, 246, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}
.path-arrow {
  color: #475569;
  margin: 0 2px;
  font-size: 12px;
}
.disease-badge {
  font-size: 11px;
  color: #a5b4fc;
  background: rgba(99, 102, 241, 0.15);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}
.candidate-analysis {
  font-size: 12px;
}
.analysis-section {
  margin-bottom: 8px;
}
.analysis-label {
  font-size: 10px;
  color: #34d399;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.analysis-label.opposing {
  color: #f87171;
}
.analysis-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.analysis-section ul li {
  color: #94a3b8;
  padding: 1px 0;
  padding-left: 12px;
  position: relative;
  font-size: 11px;
  line-height: 1.5;
}
.analysis-section ul li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #34d399;
}
.analysis-section ul li::before.opposing::before {
  color: #f87171;
}
.analysis-reasoning {
  background: rgba(251, 191, 36, 0.04);
  border-radius: 6px;
  padding: 8px;
  margin-top: 4px;
}
.analysis-reasoning p {
  color: #94a3b8;
  font-size: 11px;
  line-height: 1.6;
  margin: 0;
}
.analysis-placeholder {
  background: rgba(251, 191, 36, 0.04);
  border-radius: 6px;
  padding: 10px;
  text-align: center;
}
.analysis-placeholder p {
  color: #64748b;
  font-size: 11px;
  margin: 0;
}
.confirm-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding: 16px 20px;
  background: #0f1420;
  border: 1px solid #1e293b;
  border-radius: 12px;
}
.confirm-hint {
  font-size: 13px;
  color: #94a3b8;
}

.intake-panel {
  padding: 24px 20px;
  height: 100%;
  overflow-y: auto;
}
.panel-header {
  font-size: 16px; font-weight: 600; color: #e2e8f0;
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 16px;
}
.panel-badge {
  font-size: 10px; padding: 2px 8px; border-radius: 4px;
  background: rgba(34, 197, 94, 0.1); color: #4ade80;
}
.panel-badge.warn {
  background: rgba(239, 68, 68, 0.1); color: #f87171;
}
.stage-wrapper {
  height: 100%;
  overflow-y: auto;
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 20px;
  color: #94a3b8;
  font-size: 13px;
  text-align: center;
}
.json-view {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; line-height: 1.6;
  color: #94a3b8;
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 10px;
  padding: 16px;
  white-space: pre-wrap; word-break: break-word;
  max-height: calc(100vh - 280px);
  overflow-y: auto;
}
.error-box {
  display: flex; align-items: center; gap: 8px;
  margin: 16px auto; max-width: 800px;
  padding: 12px 16px;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 10px; color: #f87171; font-size: 13px;
}
</style>
