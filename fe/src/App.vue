<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

onMounted(async () => {
  await auth.init()
  if (!auth.token && !route.path.startsWith('/doctor')) {
    router.push('/login')
  }
})
</script>

<template>
  <router-view />
</template>
