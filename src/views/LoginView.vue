<template>
  <div class="login-view">
    <header class="login-header">
      <h1>山行记</h1>
      <p>探索祖国大好河山，记录你的登山足迹</p>
    </header>
    <main class="login-main">
      <AuthForm />
    </main>
    <footer class="login-footer">
      <p>&copy; 2024 山行记应用. 保留所有权利.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import AuthForm from '../components/AuthForm.vue';
</script>

<style scoped>
.login-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-header {
  text-align: center;
  padding: 40px 20px 20px;
  background-color: #42b883;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login-header h1 {
  font-size: 2.5rem;
  margin: 0;
  font-weight: 700;
}

.login-header p {
  margin: 10px 0 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.login-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-footer {
  text-align: center;
  padding: 20px;
  background-color: #35495e;
  color: white;
  font-size: 0.9rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .login-header h1 {
    font-size: 2rem;
  }

  .login-header {
    padding: 30px 20px 15px;
  }
}
</style>