import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('@/views/ChatView.vue'),
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('@/views/ReportListView.vue'),
  },
  {
    path: '/reports/:id',
    name: 'ReportDetail',
    component: () => import('@/views/ReportDetailView.vue'),
  },
  {
    path: '/doctor/login',
    name: 'DoctorLogin',
    component: () => import('@/views/doctor/DoctorLoginView.vue'),
  },
  {
    path: '/doctor/dashboard',
    name: 'DoctorDashboard',
    component: () => import('@/views/doctor/DoctorDashboard.vue'),
  },
  {
    path: '/',
    redirect: '/chat',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
