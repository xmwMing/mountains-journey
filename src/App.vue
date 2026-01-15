<template>
  <div v-if="authStore.isLoading" class="loading">
    <div class="loading-spinner"></div>
    <p>加载中...</p>
  </div>
  <router-view v-else />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMountainsStore } from './store/mountains'
import { useAuthStore } from './store/auth'

const authStore = useAuthStore()
const mountainsStore = useMountainsStore()

onMounted(async () => {
  // 设置会话监听器
  authStore.setupSessionListener()

  // 初始化认证状态
  await authStore.init()

  // 如果用户已登录，加载数据
  if (authStore.isAuthenticated) {
    mountainsStore.init()
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #f5f5f5;
}

#app {
  width: 100%;
  height: 100vh;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading p {
  font-size: 18px;
  color: #555;
}
</style>