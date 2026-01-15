<template>
  <div class="checkin-history">
    <div class="history-header">
      <h2>打卡记录</h2>
      <button class="close-btn" @click="emit('close')">×</button>
    </div>

    <!-- 记录列表 -->
    <div v-if="checkins.length > 0" class="checkin-list">
      <div
        v-for="checkin in sortedCheckins"
        :key="checkin.id"
        class="checkin-item"
      >
        <div class="checkin-time">{{ formatDate(checkin.checkinTime) }}</div>
        <button
          class="delete-btn"
          @click="showDeleteConfirm(checkin.id)"
          :disabled="isDeleting"
        >
          <span v-if="isDeleting">删除中...</span>
          <span v-else>删除</span>
        </button>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <p>暂无打卡记录</p>
    </div>

    <button class="back-btn" @click="emit('close')">返回</button>

    <!-- 删除确认弹窗 -->
    <div v-if="showConfirmModal" class="confirm-modal-overlay">
      <div class="confirm-modal">
        <div class="confirm-header">确认删除</div>
        <div class="confirm-content">
          <p>确定要删除这条打卡记录吗？</p>
        </div>
        <div class="confirm-buttons">
          <button class="cancel-btn" @click="cancelDelete">取消</button>
          <button class="confirm-btn" @click="confirmDelete" :disabled="isDeleting">
            <span v-if="isDeleting">删除中...</span>
            <span v-else>确认删除</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Checkin } from '../types'

const props = defineProps<{
  checkins: Checkin[]
}>()

const emit = defineEmits<{
  close: []
  'delete-checkin': [checkinId: string]
}>()

const isDeleting = ref(false)
const showConfirmModal = ref(false)
const confirmCheckinId = ref<string>('')

// 按时间倒序排序打卡记录
const sortedCheckins = computed(() => {
  return [...props.checkins].sort((a, b) => {
    return new Date(b.checkinTime).getTime() - new Date(a.checkinTime).getTime()
  })
})

// 格式化日期
function formatDate(date: Date): string {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 显示删除确认弹窗
function showDeleteConfirm(checkinId: string) {
  confirmCheckinId.value = checkinId
  showConfirmModal.value = true
}

// 取消删除
function cancelDelete() {
  showConfirmModal.value = false
  confirmCheckinId.value = ''
}

// 确认删除
async function confirmDelete() {
  if (!confirmCheckinId.value) return

  isDeleting.value = true
  try {
    emit('delete-checkin', confirmCheckinId.value)
    showConfirmModal.value = false
    confirmCheckinId.value = ''
  } finally {
    isDeleting.value = false
  }
}
</script>

<style scoped>
.checkin-history {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: slideIn 0.3s ease-out;
  max-width: 500px;
  width: 100%;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.history-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.checkin-list {
  padding: 16px 20px;
  max-height: 300px;
  overflow-y: auto;
}

.checkin-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background: #f9fafb;
  margin-bottom: 12px;
  transition: background-color 0.2s;
}

.checkin-item:hover {
  background: #f3f4f6;
}

.checkin-time {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  flex: 1;
}

.delete-btn {
  padding: 8px 12px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-btn:hover:not(:disabled) {
  background: #dc2626;
}

.delete-btn:disabled {
  background: #a0a0a0;
  cursor: not-allowed;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
}

.back-btn {
  width: calc(100% - 40px);
  margin: 0 20px 20px;
  padding: 12px;
  background: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn:hover {
  background: #e0e0e0;
  border-color: #ccc;
}
/* 删除确认弹窗样式 */
.confirm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3); /* 降低背景透明度，更柔和 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1500;
  animation: fadeIn 0.4s ease-out; /* 减慢动画速度 */
}

.confirm-modal {
  background: white;
  border-radius: 16px; /* 更大的圆角，更柔和 */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); /* 更柔和的阴影 */
  width: 90%;
  max-width: 400px;
  animation: slideInUp 0.4s ease-out; /* 改为上滑动画，更自然 */
  overflow: hidden;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px); /* 从下方滑入，更自然 */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.confirm-header {
  background: #f9fafb; /* 改为浅灰色背景，去掉刺眼的红色渐变 */
  color: #374151;
  padding: 20px;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
}

.confirm-content {
  padding: 28px 20px;
  text-align: center;
}

.confirm-content p {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #4b5563;
  line-height: 1.5;
}

.confirm-content .warning-text {
  color: #ef4444;
  font-size: 14px;
  margin-top: 8px;
  font-weight: 500;
}

.confirm-buttons {
  display: flex;
  gap: 16px;
  padding: 16px 20px 20px;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.confirm-buttons button {
  flex: 1;
  padding: 12px 20px;
  border: 1px solid transparent;
  border-radius: 10px; /* 更大的圆角 */
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
}

.cancel-btn {
  background: white;
  color: #6b7280;
  border-color: #e5e7eb;
}

.cancel-btn:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
  transform: translateY(-1px); /* 轻微上移效果 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.confirm-btn {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
  background: #ef4444; /* 去掉渐变，使用纯色 */
}

.confirm-btn:hover:not(:disabled) {
  background: #dc2626;
  border-color: #dc2626;
  transform: translateY(-1px); /* 轻微上移效果 */
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2); /* 更柔和的阴影 */
}

.confirm-btn:disabled {
  background: #9ca3af;
  border-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>