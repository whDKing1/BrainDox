<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Brain, Mail, Lock, LogIn } from 'lucide-vue-next'
import { NButton, NInput } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function handleSubmit() {
  if (!email.value || !password.value) {
    errorMsg.value = '请填写邮箱和密码'
    return
  }
  loading.value = true
  errorMsg.value = ''
  try {
    await auth.login(email.value, password.value)
    router.push('/chat')
  } catch (e: unknown) {
    errorMsg.value = e instanceof Error ? e.message : '登录失败'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <div class="logo-area">
        <Brain :size="48" class="logo-icon" />
        <h1>BrainDox</h1>
        <p class="subtitle">心理健康智能评估平台</p>
        <p class="hint">邮箱: 2669705213@qq.com / 密码: 123456</p>
      </div>
      <form @submit.prevent="handleSubmit" class="form">
        <div class="field">
          <label>邮箱</label>
          <NInput v-model:value="email" placeholder="请输入邮箱" :disabled="loading">
            <template #prefix><Mail :size="16" /></template>
          </NInput>
        </div>
        <div class="field">
          <label>密码</label>
          <NInput v-model:value="password" type="password" placeholder="请输入密码" :disabled="loading" show-password-on="click">
            <template #prefix><Lock :size="16" /></template>
          </NInput>
        </div>
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        <NButton attr-type="submit" :loading="loading" type="primary" block size="large">
          <template #icon><LogIn :size="18" /></template>
          登录
        </NButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.login-card {
  width: 400px;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}
.logo-area { text-align: center; margin-bottom: 32px; }
.logo-icon { color: #667eea; }
.logo-area h1 { font-size: 28px; font-weight: 700; margin: 12px 0 4px; color: #1a1a2e; }
.subtitle { font-size: 14px; color: #888; margin: 0; }
.hint { font-size: 12px; color: #bbb; margin: 8px 0 0; }
.form { display: flex; flex-direction: column; gap: 16px; }
.field label { font-size: 14px; font-weight: 500; color: #333; margin-bottom: 6px; display: block; }
.error { color: #e74c3c; font-size: 14px; text-align: center; margin: 0; }
</style>
