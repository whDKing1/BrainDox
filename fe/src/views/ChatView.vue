<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Brain, Send, MessageSquare, Plus, LogOut, FileText,
  AlertTriangle, Heart, Activity, Clock
} from 'lucide-vue-next'
import { NButton, NInput, NTag } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chat'

const router = useRouter()
const auth = useAuthStore()
const chat = useChatStore()

const inputText = ref('')
const messagesEnd = ref<HTMLDivElement | null>(null)
const lastResponse = ref<{ diagnosis?: Record<string, unknown>; treatment?: Record<string, unknown>; has_report?: boolean; report_id?: string } | null>(null)

const severityLabel: Record<string, string> = {
  L0: '正常', L1: '轻度', L2: '中度', L3: '重度', L4: '危急',
  mild: '轻度', moderate: '中度', severe: '重度',
}

function severityTagType(level: string): 'default' | 'success' | 'warning' | 'error' {
  const map: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
    L0: 'default', L1: 'success', L2: 'warning', L3: 'error', L4: 'error',
    mild: 'success', moderate: 'warning', severe: 'error',
  }
  return map[level] || 'default'
}

const stageLabels: Record<string, string> = {
  guiding: '初步了解',
  branch_mild: '轻度评估',
  branch_moderate: '中度评估',
  branch_severe: '重点评估',
  diagnosing: '分析中',
  completed: '已完成',
}

function logout() {
  auth.logout()
  router.push('/login')
}

function viewReports() {
  router.push('/reports')
}

function viewReportDetail(reportId?: string) {
  if (reportId) router.push(`/reports/${reportId}`)
}

onMounted(async () => {
  if (!auth.token) {
    router.push('/login')
    return
  }
  try {
    await chat.loadHistory()
    if (chat.conversations.length > 0) {
      chat.selectConversation(chat.conversations[0].id)
    }
  } catch {
    // ignore
  }
})

async function handleSend() {
  const text = inputText.value.trim()
  if (!text || chat.isProcessing) return
  inputText.value = ''
  lastResponse.value = null
  try {
    const res = await chat.sendMessage(text)
    if (res.reply && 'has_report' in res.reply) {
      lastResponse.value = res.reply as { diagnosis?: Record<string, unknown>; treatment?: Record<string, unknown>; has_report?: boolean; report_id?: string }
    }
  } catch {
    // error handled in store
  }
  await nextTick()
  messagesEnd.value?.scrollIntoView({ behavior: 'smooth' })
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}
</script>

<template>
  <div class="chat-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo-row">
          <Brain :size="24" class="logo-icon" />
          <span class="logo-text">BrainDox</span>
        </div>
      </div>
      <div class="sidebar-actions">
        <NButton ghost block @click="chat.startNewChat()" class="new-chat-btn">
          <template #icon><Plus :size="16" /></template>
          新对话
        </NButton>
        <NButton ghost block @click="viewReports" class="new-chat-btn">
          <template #icon><FileText :size="16" /></template>
          我的报告
        </NButton>
      </div>
      <div class="conv-list">
        <div
          v-for="conv in chat.conversations"
          :key="conv.id"
          :class="['conv-item', { active: conv.id === chat.currentConvId }]"
          @click="chat.selectConversation(conv.id)"
        >
          <MessageSquare :size="16" class="conv-icon" />
          <div class="conv-info">
            <div class="conv-status">
              <NTag v-if="conv.severity_level" :type="severityTagType(conv.severity_level)" size="tiny" style="margin-right:4px">
                {{ severityLabel[conv.severity_level] || conv.severity_level }}
              </NTag>
              <span class="conv-date">{{ formatTime(conv.created_at) }}</span>
            </div>
            <div class="conv-intent">{{ stageLabels[conv.stage] || conv.intent_category || '对话' }}</div>
          </div>
        </div>
      </div>
      <div class="sidebar-footer">
        <div class="user-info">
          <span class="user-name">{{ auth.user?.name || '用户' }}</span>
          <span class="user-role">{{ auth.user?.role === 'doctor' ? '医生' : '用户' }}</span>
        </div>
        <button class="logout-btn" @click="logout" title="退出登录">
          <LogOut :size="18" />
        </button>
      </div>
    </aside>

    <main class="chat-main">
      <div class="chat-header">
        <div class="header-left">
          <h2>{{ chat.currentConversation ? '当前对话' : '新对话' }}</h2>
          <NTag v-if="chat.severityLevel" :type="severityTagType(chat.severityLevel)" size="small">
            <template #icon>
              <Activity :size="14" />
            </template>
            {{ severityLabel[chat.severityLevel] }}
          </NTag>
        </div>
      </div>

      <div class="messages-area">
        <div v-if="chat.currentMessages.length === 0" class="welcome">
          <Brain :size="48" class="welcome-icon" />
          <h2>您好，我是 BrainDox 心理健康助手</h2>
          <p>请告诉我您最近的情况，我会为您提供专业的心理评估和建议。</p>
          <div class="suggestions">
            <button class="suggestion-chip" @click="inputText = '我最近总是睡不好，心情很差'">我最近总是睡不好，心情很差</button>
            <button class="suggestion-chip" @click="inputText = '最近工作压力很大，感觉焦虑'">最近工作压力很大，感觉焦虑</button>
            <button class="suggestion-chip" @click="inputText = '我想了解一下焦虑症和抑郁症的区别'">焦虑症和抑郁症的区别</button>
          </div>
        </div>

        <div v-for="msg in chat.currentMessages" :key="msg.id" :class="['msg-row', msg.sender_type]">
          <div v-if="msg.sender_type === 'ai'" class="avatar ai-avatar">
            <Brain :size="20" />
          </div>
          <div v-if="msg.sender_type === 'user'" class="avatar user-avatar">
            <Heart :size="20" />
          </div>
          <div :class="['msg-bubble', msg.sender_type]">
            <div class="msg-text">{{ msg.content }}</div>
            <div class="msg-time">{{ formatTime(msg.created_at) }}</div>
          </div>
        </div>

        <div v-if="lastResponse && lastResponse.has_report" class="report-notice">
          <FileText :size="18" />
          <span>评估报告已生成，等待医生审核</span>
          <div>
            <NButton size="tiny" quaternary @click="viewReports">查看报告</NButton>
            <NButton v-if="lastResponse.report_id" size="tiny" quaternary @click="viewReportDetail(lastResponse.report_id)">报告详情</NButton>
          </div>
        </div>

        <div ref="messagesEnd" />
      </div>

      <div class="input-area">
        <NInput
          v-model:value="inputText"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 4 }"
          placeholder="请描述您的情况..."
          :disabled="chat.isProcessing"
          @keydown.enter.prevent="!chat.isProcessing && handleSend()"
        />
        <NButton
          :loading="chat.isProcessing"
          :disabled="!inputText.trim()"
          type="primary"
          circle
          @click="handleSend"
        >
          <template #icon><Send :size="18" /></template>
        </NButton>
      </div>
    </main>
  </div>
</template>

<style scoped>
.chat-layout {
  display: flex;
  height: 100vh;
  background: #f5f6fa;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: #1a1a2e;
  color: #fff;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}
.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.logo-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo-icon { color: #7c8cf8; }
.logo-text { font-size: 20px; font-weight: 700; }
.sidebar-actions {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.new-chat-btn {
  color: #ccc !important;
  border-color: rgba(255,255,255,0.2) !important;
}
.new-chat-btn:hover { color: #fff !important; border-color: #7c8cf8 !important; }
.conv-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}
.conv-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 4px;
}
.conv-item:hover { background: rgba(255,255,255,0.08); }
.conv-item.active { background: rgba(124,140,248,0.2); }
.conv-icon { flex-shrink: 0; opacity: 0.6; }
.conv-info { flex: 1; min-width: 0; }
.conv-status { display: flex; align-items: center; gap: 4px; margin-bottom: 2px; }
.conv-date { font-size: 11px; opacity: 0.5; }
.conv-intent { font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sidebar-footer {
  padding: 16px;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-info { display: flex; flex-direction: column; gap: 2px; }
.user-name { font-size: 14px; font-weight: 600; }
.user-role { font-size: 12px; opacity: 0.5; }
.logout-btn {
  background: none;
  border: none;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
}
.logout-btn:hover { color: #fff; background: rgba(255,255,255,0.1); }

/* Main chat */
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.chat-header {
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-left { display: flex; align-items: center; gap: 12px; }
.header-left h2 { font-size: 18px; font-weight: 600; margin: 0; }

/* Messages */
.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.welcome {
  text-align: center;
  padding: 60px 20px;
  max-width: 500px;
  margin: auto;
}
.welcome-icon {
  color: #7c8cf8;
  margin-bottom: 16px;
}
.welcome h2 { font-size: 22px; margin: 0 0 8px; color: #1a1a2e; }
.welcome p { color: #888; margin: 0 0 24px; }
.suggestions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.suggestion-chip {
  padding: 10px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  color: #555;
  transition: all 0.2s;
}
.suggestion-chip:hover {
  border-color: #7c8cf8;
  color: #7c8cf8;
  background: #f0f2ff;
}
.msg-row {
  display: flex;
  gap: 12px;
  max-width: 75%;
}
.msg-row.user { align-self: flex-end; flex-direction: row-reverse; }
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.ai-avatar { background: #eef0ff; color: #7c8cf8; }
.user-avatar { background: #7c8cf8; color: #fff; }
.msg-bubble {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
}
.msg-bubble.ai {
  background: #fff;
  color: #333;
  border: 1px solid #eee;
  border-top-left-radius: 4px;
}
.msg-bubble.user {
  background: #7c8cf8;
  color: #fff;
  border-top-right-radius: 4px;
}
.msg-time {
  font-size: 11px;
  opacity: 0.5;
  margin-top: 4px;
}
.report-notice {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f0f2ff;
  border: 1px solid #d0d5ff;
  border-radius: 8px;
  color: #5a6ad8;
  font-size: 14px;
  align-self: center;
}

/* Input area */
.input-area {
  padding: 16px 24px;
  background: #fff;
  border-top: 1px solid #eee;
  display: flex;
  gap: 12px;
  align-items: flex-end;
}
.input-area :deep(.n-input) { flex: 1; }
</style>
