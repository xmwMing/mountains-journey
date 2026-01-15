export interface Peak {
  id: string
  name: string
  city?: string
  province?: string
  location: {
    lat: number
    lng: number
  }
  altitude: number
  difficulty: number
  description: string
  imageUrl?: string
}

export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
}

export interface Checkin {
  id: string
  userId: string
  peakId: string
  checkinTime: Date
  location: {
    lat: number
    lng: number
  }
}

export interface PeakWithCheckin extends Peak {
  checkedIn: boolean
  checkinTime?: Date
  checkinCount: number
  lastCheckinTime?: Date
}