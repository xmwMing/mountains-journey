<template>
  <div class="auth-form-container">
    <div class="auth-form">
      <h2>{{ isLogin ? '登录' : '注册' }}</h2>

      <!-- 错误信息显示 -->
      <div v-if="authStore.error" class="error-message">
        {{ authStore.error }}
      </div>

      <!-- 验证提示信息 -->
      <div v-if="showVerifyPrompt" class="verify-section">
        <p class="verify-message">
          您的邮箱已注册但尚未验证，请检查邮箱并点击验证链接。
        </p>
        <button
          @click="handleResendVerification"
          class="resend-btn"
          :disabled="authStore.isLoading"
        >
          <span v-if="authStore.isLoading">发送中...</span>
          <span v-else>重新发送验证邮件</span>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="form">
        <!-- 注册时显示用户名输入 -->
        <div v-if="!isLogin" class="form-group">
          <label for="name">用户名</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            placeholder="请输入用户名"
            required
            :disabled="authStore.isLoggingIn || authStore.isRegistering"
          />
        </div>

        <!-- 邮箱输入 -->
        <div class="form-group">
          <label for="email">邮箱</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            placeholder="请输入邮箱"
            required
            :disabled="authStore.isLoggingIn || authStore.isRegistering"
          />
        </div>

        <!-- 密码输入 -->
        <div class="form-group">
          <label for="password">密码</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="请输入密码"
            required
            :disabled="authStore.isLoggingIn || authStore.isRegistering"
          />
        </div>

        <!-- 提交按钮 -->
        <button
          type="submit"
          class="submit-btn"
          :disabled="authStore.isLoggingIn || authStore.isRegistering"
        >
          <span v-if="authStore.isLoggingIn || authStore.isRegistering">处理中...</span>
          <span v-else>{{ isLogin ? '登录' : '注册' }}</span>
        </button>
      </form>

      <!-- 切换登录/注册 -->
      <div class="toggle-auth">
        <span v-if="isLogin">还没有账号？</span>
        <span v-else>已有账号？</span>
        <button @click="toggleAuth" class="toggle-btn">
          {{ isLogin ? '立即注册' : '立即登录' }}
        </button>
      </div>

      <!-- 注册成功，等待验证 -->
      <div v-if="showRegisterSuccess" class="success-message">
        <p>我们已向您的邮箱发送了验证链接，请检查邮箱并点击验证链接后再登录。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const router = useRouter();

const authStore = useAuthStore();
const isLogin = ref(true);

// 控制显示状态
const showVerifyPrompt = ref(false);
const showRegisterSuccess = ref(false);

const formData = ref({
  name: '',
  email: '',
  password: ''
});

// 切换登录/注册模式
function toggleAuth() {
  isLogin.value = !isLogin.value;
  authStore.error = null;
  showVerifyPrompt.value = false;
  showRegisterSuccess.value = false;
  // 重置表单
  formData.value = {
    name: '',
    email: '',
    password: ''
  };
}

// 处理表单提交
async function handleSubmit() {
  authStore.error = null;
  showVerifyPrompt.value = false;
  showRegisterSuccess.value = false;

  if (isLogin.value) {
    // 登录
    const success = await authStore.login(formData.value.email, formData.value.password);
    if (success) {
      // 登录成功后跳转到主页面
      router.push({ name: 'map' });
    } else if (authStore.error) {
      // 使用类型断言解决TypeScript类型推断问题
      const errorMessage = authStore.error as string;
      if (errorMessage.includes('Email not confirmed')) {
        // 登录失败且是因为邮箱未验证，显示验证提示
        showVerifyPrompt.value = true;
      }
    }
  } else {
    // 注册
    const success = await authStore.register(
      formData.value.email,
      formData.value.password,
      formData.value.name
    );
    if (success) {
      // 注册成功后显示成功信息
      showRegisterSuccess.value = true;
    }
  }
}

// 处理重新发送验证邮件
async function handleResendVerification() {
  authStore.error = null;
  const success = await authStore.resendVerificationEmail(formData.value.email);
  if (success) {
    authStore.error = '验证邮件已重新发送，请检查您的邮箱';
    showVerifyPrompt.value = false;
  }
}
</script>

<style scoped>
.auth-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
  background-color: #f5f5f5;
}

.auth-form {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.auth-form h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.error-message {
  background-color: #fee;
  color: #d32f2f;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #555;
}

.form-group input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}

.form-group input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.submit-btn {
  background-color: #42b883;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  background-color: #35495e;
}

.submit-btn:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

.toggle-auth {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.toggle-btn {
  background: none;
  border: none;
  color: #42b883;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 0;
  text-decoration: underline;
  transition: color 0.3s;
}

.toggle-btn:hover {
  color: #35495e;
}

.verify-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
  padding: 20px;
}

.verify-message {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  margin: 0;
}

.resend-btn {
  background-color: #42b883;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.resend-btn:hover:not(:disabled) {
  background-color: #35495e;
}

.resend-btn:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

.back-btn {
  background-color: #f5f5f5;
  color: #666;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.back-btn:hover:not(:disabled) {
  background-color: #e0e0e0;
  border-color: #ccc;
}

.back-btn:disabled {
  background-color: #f5f5f5;
  color: #aaa;
  border-color: #eee;
  cursor: not-allowed;
}

.success-message {
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  padding: 20px;
  color: #333;
}

.success-message p {
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
}
</style>