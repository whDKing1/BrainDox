import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types'
import { loginUser, getProfile } from '@/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('access_token'))
  const isInitialized = ref(false)

  async function init() {
    if (token.value) {
      try {
        const profile = await getProfile()
        user.value = profile
      } catch {
        token.value = null
        localStorage.removeItem('access_token')
      }
    }
    isInitialized.value = true
  }

  async function login(email: string, password: string) {
    const res = await loginUser({ email, password })
    token.value = res.access_token
    user.value = res.user
    localStorage.setItem('access_token', res.access_token)
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('access_token')
  }

  return {
    user,
    token,
    isInitialized,
    init,
    login,
    logout,
  }
})
