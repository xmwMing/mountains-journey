<template>
  <div class="peak-search">
    <div class="search-input-group">
      <input
        type="text"
        v-model="localSearchQuery"
        placeholder="搜索山峰名称..."
        class="search-input"
        @input="handleSearch"
      />
      <select
        v-model="localProvinceFilter"
        class="province-select"
        @change="handleProvinceFilter"
      >
        <option value="">所有省份</option>
        <option v-for="province in provinces" :key="province" :value="province">
          {{ province }}
        </option>
      </select>
      <select
        v-model="localCityFilter"
        class="city-select"
        @change="handleCityFilter"
      >
        <option value="">所有城市</option>
        <option v-for="city in cities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
      <button
        class="reset-btn"
        @click="handleReset"
        :disabled="!localSearchQuery && !localProvinceFilter && !localCityFilter"
      >
        重置
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useMountainsStore } from '../store/mountains'

const store = useMountainsStore()

// 本地状态，用于双向绑定
const localSearchQuery = ref(store.searchQuery)
const localProvinceFilter = ref(store.provinceFilter)
const localCityFilter = ref(store.cityFilter)

// 监听store中的状态变化，更新本地状态
watch(() => store.searchQuery, (newQuery) => {
  localSearchQuery.value = newQuery
})

watch(() => store.provinceFilter, (newProvince) => {
  localProvinceFilter.value = newProvince
})

watch(() => store.cityFilter, (newCity) => {
  localCityFilter.value = newCity
})

// 计算属性
const provinces = computed(() => store.provinces)
const cities = computed(() => store.cities)

// 处理搜索
function handleSearch() {
  store.setSearchQuery(localSearchQuery.value)
}

// 处理省份筛选
function handleProvinceFilter() {
  store.setProvinceFilter(localProvinceFilter.value)
}

// 处理城市筛选
function handleCityFilter() {
  store.setCityFilter(localCityFilter.value)
}

// 处理重置
function handleReset() {
  store.resetFilters()
  localSearchQuery.value = ''
  localProvinceFilter.value = ''
  localCityFilter.value = ''
}
</script>

<style scoped>
.peak-search {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 1000;
  width: 100%;
  max-width: 500px;
}

.search-input-group {
  display: flex;
  gap: 12px;
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  align-items: center;
}

.search-input {
  flex: 1;
  min-width: 150px;
  padding: 10px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  outline: none;
}

.search-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.province-select {
  padding: 10px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  min-width: 120px;
}

.province-select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.city-select {
  padding: 10px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  min-width: 120px;
}

.city-select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.reset-btn {
  padding: 10px 16px;
  border: 2px solid #667eea;
  border-radius: 8px;
  background: white;
  color: #667eea;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  min-width: 80px;
}

.reset-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
}

.reset-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .peak-search {
    top: 10px;
    left: 0px;
    right: 10px;
    max-width: none;
  }

  .search-input-group {
    gap: 6px;
    padding: 8px;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .search-input {
    flex: 1;
    min-width: 100px;
    padding: 8px 12px;
    font-size: 12px;
  }

  .province-select,
  .city-select {
    min-width: 80px;
    padding: 8px 12px;
    font-size: 12px;
  }

  .reset-btn {
    min-width: 60px;
    padding: 8px 12px;
    font-size: 12px;
  }

  /* 隐藏滚动条，但保留滚动功能 */
  .search-input-group::-webkit-scrollbar {
    display: none;
  }

  .search-input-group {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
</style>