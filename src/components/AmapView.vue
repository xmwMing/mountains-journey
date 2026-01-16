<template>
  <div class="map-container">
    <div id="map" class="map"></div>
    <!-- 搜索组件 -->
    <PeakSearch />
    <!-- 山峰信息面板，当未显示打卡记录时显示 -->
    <div v-if="selectedPeakWithCheckin && !showCheckinHistory" class="peak-info-panel">
      <PeakInfo
        :peak="selectedPeakWithCheckin"
        @close="handleClose"
        @checkin="handleCheckin"
        @view-checkins="handleViewCheckins"
      />
    </div>
    <!-- 打卡记录面板，当显示打卡记录时显示 -->
    <div v-if="selectedPeakWithCheckin && showCheckinHistory" class="peak-info-panel">
      <CheckinHistory
        :checkins="selectedCheckins"
        @close="handleCloseCheckinHistory"
        @delete-checkin="handleDeleteCheckin"
      />
    </div>
    <!-- 打卡成功提示 -->
    <div v-if="showCheckinSuccess" class="checkin-success-toast">
      <div class="success-icon">✓</div>
      <div class="success-text">打卡成功！</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useMountainsStore } from '../store/mountains'
import PeakInfo from './PeakInfo.vue'
import CheckinHistory from './CheckinHistory.vue'
import PeakSearch from './PeakSearch.vue'
import type { Peak } from '../types'

const store = useMountainsStore()
const selectedPeak = ref<Peak | null>(null)
const selectedPeakWithCheckin = computed(() => {
  if (!selectedPeak.value) return null
  return store.peaksWithCheckin.find(p => p.id === selectedPeak.value?.id) || null
})
const showCheckinHistory = ref(false)

// 获取当前山峰的所有打卡记录
const selectedCheckins = computed(() => {
  if (!selectedPeak.value) return []
  return store.checkins.filter(c => c.peakId === selectedPeak.value?.id)
})

// 打卡成功提示状态
const showCheckinSuccess = ref(false)

let map: any = null
let markers: any[] = []

declare global {
  interface Window {
    AMap: any
  }
}

function loadAMapScript() {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap)
      return
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    const amapKey = import.meta.env.VITE_AMAP_KEY || '4515b43a0f631ac743fc939ca74b5f0e' // 默认密钥用于开发环境
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${amapKey}`
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

function initMap() {
  if (!window.AMap) return

  map = new window.AMap.Map('map', {
    zoom: 4,
    center: [105.0, 35.0],
    viewMode: '2D'
  })

  // 地图加载完成后
  map.on('complete', () => {
    // 初始加载标记
    addMarkers()
  })
}

// 监听数据变化，更新标记
watch(() => store.peaksWithCheckin, () => {
  addMarkers()
}, { deep: true })

function addMarkers() {
  // 确保map已初始化且可用
  if (!map || !window.AMap) return

  try {
    // 清除现有标记
    if (markers.length > 0) {
      map.remove(markers)
      markers = []
    }

    // 遍历山峰数据，添加标记
    store.peaksWithCheckin.forEach(peak => {
      // 确保peak有location属性
      if (!peak.location || !peak.location.lng || !peak.location.lat) return

      try {
        // 为每个山峰创建标记
        const marker = new window.AMap.Marker({
          position: [peak.location.lng, peak.location.lat],
          title: peak.name,
          content: createMarkerContent(peak),
          offset: new window.AMap.Pixel(-15, -30)
        })

        // 添加点击事件
        marker.on('click', () => {
          selectedPeak.value = peak
          store.selectPeak(peak)
          // 取消自动定位，不再调用map.panTo()
        })

        // 添加标记到数组和地图
        markers.push(marker)
      } catch (error) {
        console.error('Error creating marker for peak:', peak.name, error)
      }
    })

    // 批量添加标记到地图
    if (markers.length > 0) {
      map.add(markers)
    }
  } catch (error) {
    console.error('Error in addMarkers:', error)
  }
}

function createMarkerContent(peak: any) {
  // 确保peak有checkedIn属性，默认为false
  const isCheckedIn = Boolean(peak.checkedIn)
  const color = isCheckedIn ? '#22c55e' : '#ef4444'
  return `
    <div style="
      width: 30px;
      height: 30px;
      background: ${color};
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        transform: rotate(45deg);
        color: white;
        font-weight: bold;
        font-size: 12px;
      ">${peak.altitude}</div>
    </div>
  `
}

function updateMarkers() {
  // 确保map已初始化且可用
  if (!map || !window.AMap) return

  try {
    if (markers.length > 0) {
      map.remove(markers)
      markers = []
    }
    addMarkers()
  } catch (error) {
    console.error('Error in updateMarkers:', error)
  }
}

function handleClose() {
  selectedPeak.value = null
  store.clearSelectedPeak()
  showCheckinHistory.value = false
}

function handleCheckin(peakId: string) {
  if (selectedPeak.value) {
    store.checkin(peakId, selectedPeak.value.location)
    updateMarkers()
    handleClose()

    // 显示打卡成功提示
    showCheckinSuccess.value = true

    // 2秒后自动隐藏提示
    setTimeout(() => {
      showCheckinSuccess.value = false
    }, 2000)
  }
}

// 处理查看打卡记录
function handleViewCheckins(_peakId: string) {
  showCheckinHistory.value = true
}

// 处理关闭打卡记录面板
function handleCloseCheckinHistory() {
  showCheckinHistory.value = false
}

// 处理删除打卡记录
function handleDeleteCheckin(checkinId: string) {
  store.deleteCheckin(checkinId)
  updateMarkers()
}

// 监听搜索结果和筛选条件，根据需求自动选中山峰
watch([() => store.peaksWithCheckin, () => store.searchQuery, () => store.cityFilter], ([newPeaks, searchQuery, cityFilter]) => {
  if (newPeaks.length === 1 && newPeaks[0]) {
    // 当只有城市筛选（无名称搜索）且结果唯一时，自动选中
    if (cityFilter && !searchQuery) {
      const peak = newPeaks[0]
      selectedPeak.value = peak
      store.selectPeak(peak)
      // 取消自动定位，不再调用map.panTo()和map.setZoom()
    }
    // 当有名称搜索时，无论是否有城市筛选，都自动选中唯一结果
    else if (searchQuery) {
      const peak = newPeaks[0]
      selectedPeak.value = peak
      store.selectPeak(peak)
      // 取消自动定位，不再调用map.panTo()和map.setZoom()
    }
    // 其他情况（如多个城市多个山峰，但筛选后只剩一个），不自动选中
  } else if (newPeaks.length > 1) {
    // 多个结果时，不自动选中，保持当前选中状态
    // 如果当前选中的山峰不在搜索结果中，则清除选中
    if (selectedPeak.value && !newPeaks.find(p => p.id === selectedPeak.value?.id)) {
      selectedPeak.value = null
      store.clearSelectedPeak()
    }
  } else {
    // 没有结果时，清除选中
    selectedPeak.value = null
    store.clearSelectedPeak()
  }

  // 重置筛选条件后，清除选中状态并重置地图视图
  if (!cityFilter && !searchQuery) {
    selectedPeak.value = null
    store.clearSelectedPeak()
    // 重置地图到初始状态
    if (map && window.AMap) {
      map.setZoom(4) // 重置缩放级别到初始值
      map.setCenter([105.0, 35.0]) // 重置中心位置到初始值
    }
  }
}, { deep: true })

onMounted(async () => {
  try {
    await loadAMapScript()
    initMap()
    // 手动调用一次，确保数据加载后显示标记
    addMarkers()
  } catch (error) {
    console.error('Failed to load AMap:', error)
  }
})

onUnmounted(() => {
  if (map) {
    map.destroy()
  }
})
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
}

.map {
  width: 100%;
  height: 100%;
}

.peak-info-panel {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  max-width: 600px;
  width: 100%;
  max-width: calc(100% - 40px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .peak-info-panel {
    bottom: 10px;
    left: 10px;
    right: 10px;
    transform: none;
    max-width: none;
    width: calc(100% - 20px);
  }
}

/* 打卡成功提示样式 */
.checkin-success-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 2000;
  animation: slideInScale 0.3s ease-out, fadeOut 0.3s ease-in 1.7s forwards;
}

/* 动画效果 */
@keyframes slideInScale {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}

/* 成功图标样式 */
.success-icon {
  width: 40px;
  height: 40px;
  background: #22c55e;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  animation: pulse 0.6s ease-in-out 0.3s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

/* 成功文本样式 */
.success-text {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
}
</style>