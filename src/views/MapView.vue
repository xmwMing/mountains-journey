<template>
  <div class="map-view">
    <Navbar />
    <AmapView />
  </div>
</template>

<script setup lang="ts">
import AmapView from '../components/AmapView.vue'
import Navbar from '../components/Navbar.vue'
import { useAuthStore } from '../store/auth'
import { useMountainsStore } from '../store/mountains'
import { onMounted, watch } from 'vue'

const authStore = useAuthStore()
const mountainsStore = useMountainsStore()

// 监听用户登录状态变化，初始化山峰数据
watch(() => authStore.isAuthenticated, (isAuthenticated) => {
  if (isAuthenticated) {
    mountainsStore.init()
  }
})

// 组件挂载时初始化数据
onMounted(() => {
  if (authStore.isAuthenticated) {
    mountainsStore.init()
  }
})
</script>

<style scoped>
.map-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>