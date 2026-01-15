import { createRouter, createWebHistory } from 'vue-router'
import MapView from '../views/MapView.vue'
import StatsView from '../views/StatsView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../store/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/',
      name: 'map',
      component: MapView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// 路由守卫
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()

  // 如果认证尚未初始化，先初始化认证
  if (!authStore.isInitialized) {
    await authStore.init()
  }

  // 如果路由需要认证，且用户未登录，重定向到登录页
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router