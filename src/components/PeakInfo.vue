<template>
  <div class="peak-info">
    <div class="peak-header">
      <h2>{{ peak.name }}</h2>
      <button class="close-btn" @click="$emit('close')">×</button>
    </div>

    <div v-if="peak.imageUrl" class="peak-image">
      <img :src="peak.imageUrl" :alt="peak.name" />
    </div>

    <div class="peak-details">
      <div class="detail-item">
        <span class="label">海拔高度</span>
        <span class="value">{{ peak.altitude }}米</span>
      </div>

      <div class="detail-item">
        <span class="label">攀爬难度</span>
        <div class="difficulty">
          <span
            v-for="i in 5"
            :key="i"
            class="star"
            :class="{ active: i <= peak.difficulty }"
          >★</span>
        </div>
      </div>

      <div class="detail-item">
        <span class="label">地理位置</span>
        <span class="value">{{ peak.province }}{{ peak.city }}</span>
      </div>

      <!-- 打卡信息 -->
      <div class="detail-item">
        <span class="label">打卡次数</span>
        <span class="value">{{ peak.checkinCount }}次</span>
      </div>

      <div v-if="peak.lastCheckinTime" class="detail-item">
        <span class="label">最近打卡</span>
        <span class="value">{{ formatDate(peak.lastCheckinTime) }}</span>
      </div>

      <div class="description">
        <h3>简介</h3>
        <p>{{ peak.description }}</p>
      </div>
    </div>

    <div class="peak-actions">
      <!-- 未打卡时显示打卡按钮 -->
      <button
        v-if="!peak.checkedIn"
        class="checkin-btn"
        @click="$emit('checkin', peak.id)"
      >
        打卡
      </button>
      <!-- 已打卡时显示打卡操作按钮组 -->
      <div v-else class="checked-actions">
        <button class="repeat-checkin-btn" @click="$emit('checkin', peak.id)">
          再次打卡
        </button>
        <button class="view-checkins-btn" @click="$emit('view-checkins', peak.id)">
          查看打卡记录
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PeakWithCheckin } from '../types'

// 格式化日期函数
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

defineProps<{
  peak: PeakWithCheckin
}>()

defineEmits<{
  close: []
  checkin: [peakId: string]
  'view-checkins': [peakId: string]
}>()
</script>

<style scoped>
.peak-info {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.peak-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.peak-header h2 {
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

.peak-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.peak-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.peak-details {
  padding: 20px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.detail-item:last-child {
  border-bottom: none;
}

.label {
  color: #666;
  font-size: 14px;
}

.value {
  color: #333;
  font-weight: 500;
}

.difficulty {
  display: flex;
  gap: 2px;
}

.star {
  color: #ddd;
  font-size: 20px;
}

.star.active {
  color: #fbbf24;
}

.description {
  margin-top: 16px;
}

.description h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #333;
}

.description p {
  margin: 0;
  color: #666;
  line-height: 1.6;
  font-size: 14px;
}

.peak-actions {
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
}

.checkin-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.checkin-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.checked-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.repeat-checkin-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.repeat-checkin-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.view-checkins-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.view-checkins-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
}
</style>