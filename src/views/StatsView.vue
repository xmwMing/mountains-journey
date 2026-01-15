<template>
  <div class="stats-view">
    <Navbar />

    <div class="stats-content">
      <div class="stats-overview">
        <div class="stat-card">
          <div class="stat-icon">🏔️</div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.checkedInCount }}</div>
            <div class="stat-label">已打卡山峰</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.checkinRate.toFixed(1) }}%</div>
            <div class="stat-label">打卡占比</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">⬆️</div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.totalAltitude }}m</div>
            <div class="stat-label">累计爬升</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">📍</div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.totalPeaks }}</div>
            <div class="stat-label">山峰总数</div>
          </div>
        </div>
      </div>

      <div class="charts-container">
        <div class="chart-card">
          <h3>已打卡山峰海拔排名TOP10</h3>
          <div ref="barChartRef" class="chart"></div>
        </div>

        <div class="chart-card full-width">
          <h3>打卡时间轴</h3>
          <div ref="timelineChartRef" class="chart"></div>
        </div>
      </div>

      <!-- 已打卡山峰模块 -->
      <div class="checked-peaks-section">
        <h3>已打卡山峰</h3>
        <div class="checked-peaks-grid">
          <div
            v-for="peak in checkedInPeaks"
            :key="peak.id"
            class="checked-peak-item"
          >
            {{ peak.name }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useMountainsStore } from '../store/mountains'
import * as echarts from 'echarts'
import Navbar from '../components/Navbar.vue'

const store = useMountainsStore()
const stats = computed(() => store.stats)
const checkedInPeaks = computed(() => store.checkedInPeaks)

const barChartRef = ref<HTMLElement>()
const timelineChartRef = ref<HTMLElement>()

let barChart: echarts.ECharts | null = null
let timelineChart: echarts.ECharts | null = null

function initBarChart() {
    if (!barChartRef.value) return

    barChart = echarts.init(barChartRef.value)

    // 只显示前10名山峰
    const sortedPeaks = [...checkedInPeaks.value].sort((a, b) => b.altitude - a.altitude).slice(0, 10)

    const option = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: sortedPeaks.map(p => p.name),
        axisLabel: {
          interval: 0,
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        name: '海拔（米）'
      },
      series: [
        {
          name: '海拔',
          type: 'bar',
          data: sortedPeaks.map(p => p.altitude),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          }
        }
      ]
    }

    barChart.setOption(option)
  }

function initTimelineChart() {
  if (!timelineChartRef.value) return

  timelineChart = echarts.init(timelineChartRef.value)

  const sortedCheckins = [...store.checkins].sort((a, b) =>
    new Date(a.checkinTime).getTime() - new Date(b.checkinTime).getTime()
  )

  const option = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: sortedCheckins.map(c => {
        const peak = store.peaks.find(p => p.id === c.peakId)
        return peak?.name || ''
      })
    },
    yAxis: {
      type: 'value',
      name: '海拔（米）'
    },
    series: [
      {
        name: '海拔',
        type: 'line',
        data: sortedCheckins.map(c => {
          const peak = store.peaks.find(p => p.id === c.peakId)
          return peak?.altitude || 0
        }),
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(102, 126, 234, 0.5)' },
            { offset: 1, color: 'rgba(102, 126, 234, 0.1)' }
          ])
        },
        itemStyle: {
          color: '#667eea'
        }
      }
    ]
  }

  timelineChart.setOption(option)
}

onMounted(() => {
  setTimeout(() => {
    initBarChart()
    initTimelineChart()
  }, 100)

  window.addEventListener('resize', () => {
    barChart?.resize()
    timelineChart?.resize()
  })
})
</script>

<style scoped>
.stats-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
  width: 100%;
}

.stats-content {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.stats-overview,
.charts-container,
.peaks-list {
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.stats-overview {
  margin-top: 20px;
  margin-bottom: 30px;
}

.charts-container {
  margin-bottom: 30px;
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 48px;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chart-card.full-width {
  grid-column: 1 / -1;
}

.chart-card h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #333;
}

.chart {
  width: 100%;
  height: 300px;
}

/* 已打卡山峰模块样式 */
.checked-peaks-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.checked-peaks-section h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #333;
}

.checked-peaks-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.checked-peak-item {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  padding: 8px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: transform 0.2s, box-shadow 0.2s;
  flex: 0 0 auto;
  max-width: calc(25% - 6px);
}

.checked-peak-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .checked-peak-item {
    max-width: calc(33.333% - 6px);
  }
}

@media (max-width: 768px) {
  .checked-peak-item {
    max-width: calc(50% - 4px);
  }
}

@media (max-width: 480px) {
  .checked-peak-item {
    max-width: calc(100% - 0px);
  }
}
</style>