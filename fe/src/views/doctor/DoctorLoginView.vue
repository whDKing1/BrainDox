<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Stethoscope, Mail, Lock, LogIn } from 'lucide-vue-next'
import { NButton, NInput } from 'naive-ui'
import { doctorLogin } from '@/api'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function handleLogin() {
  if (!email.value || !password.value) {
    errorMsg.value = '请填写邮箱和密码'
    return
  }
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await doctorLogin({ email: email.value, password: password.value })
    localStorage.setItem('access_token', res.access_token)
    localStorage.setItem('doctor_name', res.user.name)
    router.push('/doctor/dashboard')
  } catch (e: unknown) {
    errorMsg.value = e instanceof Error ? e.message : '登录失败'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="doctor-login-page">
    <div class="login-card">
      <div class="logo-area">
        <Stethoscope :size="48" class="logo-icon" />
        <h1>BrainDox</h1>
        <p class="subtitle">医生端 · 审核工作台</p>
      </div>
      <form @submit.prevent="handleLogin" class="form">
        <div class="field">
          <label>医生邮箱</label>
          <NInput v-model:value="email" placeholder="请输入医生账号邮箱" :disabled="loading">
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
        <p class="hint">仅限已注册的医生账号登录</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.doctor-login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}
.login-card {
  width: 400px;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}
.logo-area { text-align: center; margin-bottom: 32px; }
.logo-icon { color: #667eea; }
.logo-area h1 { font-size: 28px; font-weight: 700; margin: 12px 0 4px; color: #1a1a2e; }
.subtitle { font-size: 14px; color: #888; margin: 0; }
.form { display: flex; flex-direction: column; gap: 16px; }
.field label { font-size: 14px; font-weight: 500; color: #333; margin-bottom: 6px; display: block; }
.error { color: #e74c3c; font-size: 14px; text-align: center; margin: 0; }
.hint { text-align: center; font-size: 12px; color: #bbb; margin: 0; }
</style>
