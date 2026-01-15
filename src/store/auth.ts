import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { supabase } from '../config/supabase';
import type { User } from '../types';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const isInitialized = ref(false);
  const error = ref<string | null>(null);
  const isLoggingIn = ref(false);
  const isRegistering = ref(false);

  // 初始化用户信息
  async function init() {
    if (isInitialized.value) return;

    isLoading.value = true;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user) {
        user.value = {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata.name || '用户',
          createdAt: new Date(session.user.created_at)
        };
      }
      isInitialized.value = true;
    } catch (e) {
      console.error('Error initializing auth:', e);
      isInitialized.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  // 监听会话变化
  function setupSessionListener() {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        // 用户已登录或会话已恢复
        user.value = {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata.name || '用户',
          createdAt: new Date(session.user.created_at)
        };
      } else {
        // 用户已登出或会话已过期
        user.value = null;
      }
    });
  }

  // 登录
  async function login(email: string, password: string) {
    isLoggingIn.value = true;
    error.value = null;
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      if (data.user) {
        user.value = {
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata.name || '用户',
          createdAt: new Date(data.user.created_at)
        };
      }

      return true;
    } catch (e: any) {
      error.value = e.message;
      console.error('Login error:', e);
      return false;
    } finally {
      isLoggingIn.value = false;
    }
  }

  // 注册
  async function register(email: string, password: string, name: string) {
    isRegistering.value = true;
    error.value = null;
    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });

      if (authError) throw authError;

      // 发送验证邮件
      if (email) {
        await supabase.auth.resend({ email, type: 'signup' });
      }

      return true;
    } catch (e: any) {
      error.value = e.message;
      console.error('Register error:', e);
      return false;
    } finally {
      isRegistering.value = false;
    }
  }

  // 登出
  async function logout() {
    isLoading.value = true;
    try {
      await supabase.auth.signOut();
      user.value = null;
      return true;
    } catch (e) {
      console.error('Logout error:', e);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  // 重新发送验证邮件
  async function resendVerificationEmail(email: string) {
    try {
      const { error } = await supabase.auth.resend({
        email,
        type: 'signup'
      });

      if (error) throw error;
      return true;
    } catch (e: any) {
      error.value = e.message;
      console.error('Resend verification error:', e);
      return false;
    }
  }

  const isAuthenticated = computed(() => !!user.value);

  return {
    user,
    isLoading,
    isInitialized,
    isLoggingIn,
    isRegistering,
    error,
    isAuthenticated,
    init,
    login,
    register,
    logout,
    resendVerificationEmail,
    setupSessionListener
  };
});
