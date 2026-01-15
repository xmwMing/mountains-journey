<template>
  <nav class="navbar">
    <div class="nav-brand">
      <span class="logo">🏔️</span>
      <span class="brand-name">山行记</span>
    </div>
    <div class="nav-links">
      <router-link to="/" class="nav-link" active-class="active">地图</router-link>
      <router-link to="/stats" class="nav-link" active-class="active">统计</router-link>
    </div>
    <div class="user-info">
      <span class="user-name">{{ user?.name }}</span>
      <button class="logout-btn" @click="handleLogout">登出</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const user = authStore.user

async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo {
  font-size: 28px;
}

.brand-name {
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-link:hover {
  background: #f0f0f0;
  color: #333;
}

.nav-link.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 80px;
}

.logout-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
}

.logout-btn:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
}

.logout-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar {
    padding: 10px 12px;
  }

  .nav-brand {
    gap: 6px;
  }

  .logo {
    font-size: 24px;
  }

  .brand-name {
    font-size: 16px;
  }

  .nav-links {
    gap: 10px;
  }

  .nav-link {
    font-size: 12px;
    padding: 4px 8px;
  }

  .user-info {
    gap: 8px;
  }

  .user-name {
    /* 在手机上不再隐藏用户名，显示简短形式 */
    font-size: 12px;
    max-width: 60px;
  }

  .logout-btn {
    padding: 4px 8px;
    font-size: 11px;
  }
}
</style>