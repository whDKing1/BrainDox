import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ConversationItem, MessageItem, ChatSendResponse } from '@/types'
import { sendChatMessage, getChatHistory } from '@/api'

export const useChatStore = defineStore('chat', () => {
  const conversations = ref<ConversationItem[]>([])
  const currentConvId = ref<string | null>(null)
  const isProcessing = ref(false)
  const severityLevel = ref<string | null>(null)

  const currentMessages = computed<MessageItem[]>(() => {
    const conv = conversations.value.find(c => c.id === currentConvId.value)
    return conv?.messages || []
  })

  const currentConversation = computed(() => {
    return conversations.value.find(c => c.id === currentConvId.value) || null
  })

  async function loadHistory() {
    try {
      conversations.value = await getChatHistory()
    } catch {
      conversations.value = []
    }
  }

  async function sendMessage(content: string) {
    isProcessing.value = true
    try {
      const res = await sendChatMessage({
        conversation_id: currentConvId.value,
        content,
      })
      currentConvId.value = res.conversation_id
      severityLevel.value = res.route || null
      await loadHistory()
      return res
    } finally {
      isProcessing.value = false
    }
  }

  function selectConversation(id: string) {
    currentConvId.value = id
    severityLevel.value = null
  }

  function startNewChat() {
    currentConvId.value = null
    severityLevel.value = null
  }

  return {
    conversations,
    currentConvId,
    isProcessing,
    severityLevel,
    currentMessages,
    currentConversation,
    loadHistory,
    sendMessage,
    selectConversation,
    startNewChat,
  }
})
