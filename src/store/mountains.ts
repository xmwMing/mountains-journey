import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../config/supabase'
import { useAuthStore } from './auth'
import type { Peak, Checkin, PeakWithCheckin } from '../types'

export const useMountainsStore = defineStore('mountains', () => {
  const authStore = useAuthStore()
  const peaks = ref<Peak[]>([])
  const checkins = ref<Checkin[]>([])
  const selectedPeak = ref<Peak | null>(null)
  const isLoading = ref(false)
  const searchQuery = ref('')
  const cityFilter = ref('')
  const provinceFilter = ref('')

  // 使用真实用户数据
  const user = computed(() => authStore.user)

  const filteredPeaks = computed<Peak[]>(() => {
    return peaks.value.filter(peak => {
      // 根据名称搜索
      const matchesName = !searchQuery.value ||
        peak.name.toLowerCase().includes(searchQuery.value.toLowerCase())

      // 根据省份筛选
      const matchesProvince = !provinceFilter.value ||
        (peak.province && peak.province.toLowerCase().includes(provinceFilter.value.toLowerCase()))

      // 根据城市筛选
      const matchesCity = !cityFilter.value ||
        (peak.city && peak.city.toLowerCase().includes(cityFilter.value.toLowerCase()))

      return matchesName && matchesProvince && matchesCity
    })
  })

  const peaksWithCheckin = computed<PeakWithCheckin[]>(() => {
    return filteredPeaks.value.map(peak => {
      // 获取当前用户的所有打卡记录
      const userCheckins = checkins.value.filter(
        c => c.peakId === peak.id && c.userId === user.value?.id
      )

      // 获取最新的打卡记录
      const latestCheckin = userCheckins.length > 0
        ? userCheckins.reduce((latest, current) => {
            return new Date(current.checkinTime) > new Date(latest.checkinTime) ? current : latest
          })
        : undefined

      return {
        ...peak,
        checkedIn: userCheckins.length > 0,
        checkinTime: latestCheckin?.checkinTime,
        checkinCount: userCheckins.length,
        lastCheckinTime: latestCheckin?.checkinTime
      }
    })
  })

  const checkedInPeaks = computed(() => {
    return peaksWithCheckin.value.filter(p => p.checkedIn)
  })

  const stats = computed(() => {
    const totalPeaks = peaks.value.length
    const checkedInCount = checkedInPeaks.value.length
    const totalAltitude = checkedInPeaks.value.reduce((sum, p) => sum + p.altitude, 0)
    const checkinRate = totalPeaks > 0 ? (checkedInCount / totalPeaks) * 100 : 0

    return {
      totalPeaks,
      checkedInCount,
      totalAltitude,
      checkinRate
    }
  })

  async function loadPeaks() {
    isLoading.value = true
    try {
      const { data, error } = await supabase.from('peaks').select('*')
      if (error) {
        console.error('Error loading peaks:', error.message, error.details)
        throw error
      }

      // Process peaks data to ensure location format is correct
      const processedPeaks = (data as any[]).map(peak => {
        let location = peak.location

        // Ensure location is an object with lat and lng
        if (typeof location === 'string') {
          try {
            location = JSON.parse(location)
          } catch (e) {
            console.error('Failed to parse location string:', location)
            location = { lat: 0, lng: 0 }
          }
        } else if (!location || typeof location !== 'object') {
          location = { lat: 0, lng: 0 }
        }

        return {
          ...peak,
          location: {
            lat: parseFloat(location.lat) || 0,
            lng: parseFloat(location.lng) || 0
          },
          // Ensure altitude is a number
          altitude: parseInt(peak.altitude) || 0,
          // Ensure difficulty is a number
          difficulty: parseInt(peak.difficulty) || 1,
          // Add province field if available
          province: peak.province || '',
          // Add city field if available
          city: peak.city || ''
        }
      })

      peaks.value = processedPeaks as Peak[]
    } catch (error) {
      console.error('Failed to load peaks:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function loadCheckins() {
    if (!user.value) return

    isLoading.value = true
    try {
      const { data, error } = await supabase
        .from('checkins')
        .select('*')
        .eq('user_id', user.value.id)
      if (error) {
        console.error('Error loading checkins:', error.message, error.details)
        throw error
      }

      // 将 Supabase 返回的 snake_case 数据转换为 camelCase
      const camelCaseCheckins = (data as any[]).map(checkin => {
        return {
          id: checkin.id,
          userId: checkin.user_id,
          peakId: checkin.peak_id,
          checkinTime: new Date(checkin.checkin_time),
          location: checkin.location
        }
      })

      checkins.value = camelCaseCheckins as Checkin[]
    } catch (error) {
      console.error('Failed to load checkins:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function checkin(peakId: string, location: { lat: number; lng: number }) {
    if (!user.value) return

    const newCheckin: Checkin = {
      id: `checkin-${Date.now()}`,
      userId: user.value.id,
      peakId,
      checkinTime: new Date(),
      location
    }

    try {
      // Convert to snake_case for Supabase
      const snakeCaseCheckin = {
        id: newCheckin.id,
        user_id: newCheckin.userId,
        peak_id: newCheckin.peakId,
        checkin_time: newCheckin.checkinTime,
        location: newCheckin.location
      }

      const { error } = await supabase
        .from('checkins')
        .insert(snakeCaseCheckin)
      if (error) {
        console.error('Error adding checkin:', error.message, error.details)
        throw error
      }
      checkins.value.push(newCheckin)
    } catch (error) {
      console.error('Failed to add checkin:', error)
    }
  }

  // 删除指定的打卡记录
  async function deleteCheckin(checkinId: string) {
    if (!user.value) return

    try {
      // 从Supabase删除该记录
      const { error } = await supabase
        .from('checkins')
        .delete()
        .eq('id', checkinId)

      if (error) {
        console.error('Error deleting checkin:', error.message, error.details)
        throw error
      }

      // 从本地状态中删除该记录
      const index = checkins.value.findIndex(c => c.id === checkinId)
      if (index !== -1) {
        checkins.value.splice(index, 1)
      }
    } catch (error) {
      console.error('Failed to delete checkin:', error)
    }
  }

  function selectPeak(peak: Peak) {
    selectedPeak.value = peak
  }

  function clearSelectedPeak() {
    selectedPeak.value = null
  }

  // 确保init只执行一次
  let initialized = false

  async function init() {
    if (initialized) return

    initialized = true
    await Promise.all([loadPeaks(), loadCheckins()])
  }

  // 搜索相关方法
  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function setProvinceFilter(province: string) {
    provinceFilter.value = province
    // 当省份筛选变化时，重置城市筛选
    cityFilter.value = ''
  }

  function setCityFilter(city: string) {
    cityFilter.value = city
  }

  function resetFilters() {
    searchQuery.value = ''
    provinceFilter.value = ''
    cityFilter.value = ''
  }

  // 获取所有唯一省份列表，用于筛选
  const provinces = computed(() => {
    const provinceSet = new Set<string>()
    peaks.value.forEach(peak => {
      if (peak.province) {
        provinceSet.add(peak.province)
      }
    })
    return Array.from(provinceSet).sort()
  })

  // 获取所有唯一城市列表，用于筛选
  const cities = computed(() => {
    const citySet = new Set<string>()
    peaks.value.forEach(peak => {
      // 如果设置了省份筛选，只显示该省份的城市
      if (peak.city && (!provinceFilter.value || peak.province === provinceFilter.value)) {
        citySet.add(peak.city)
      }
    })
    return Array.from(citySet).sort()
  })

  return {
    peaks,
    checkins,
    selectedPeak,
    isLoading,
    peaksWithCheckin,
    checkedInPeaks,
    stats,
    searchQuery,
    provinceFilter,
    cityFilter,
    provinces,
    cities,
    selectPeak,
    clearSelectedPeak,
    checkin,
    deleteCheckin,
    setSearchQuery,
    setProvinceFilter,
    setCityFilter,
    resetFilters,
    init
  }
})