export interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

export interface PrivacyScore {
  score: number
  trend: "up" | "down" | "stable"
  lastUpdated: Date
}

export interface PermissionEvent {
  id: string
  domain: string
  permission: "camera" | "microphone" | "location" | "storage" | "notifications"
  timestamp: Date
  duration?: number
  deviceType: "desktop" | "mobile" | "tablet"
  status: "granted" | "denied" | "prompt"
}

export interface WebsiteInsight {
  id: string
  domain: string
  favicon?: string
  trackerCount: number
  permissionUsage: number
  lastActivity: Date
  riskScore: number
  visitCount: number
  permissions: PermissionEvent[]
}

export interface Alert {
  id: string
  type: "warning" | "critical" | "info"
  title: string
  description: string
  domain: string
  timestamp: Date
  isRead: boolean
  actions: ("snooze" | "mark-safe" | "escalate")[]
}

export interface Settings {
  riskThresholds: {
    low: number
    medium: number
    high: number
  }
  dataTypes: {
    camera: boolean
    microphone: boolean
    location: boolean
    storage: boolean
    notifications: boolean
  }
  emailReports: boolean
  retentionDays: number
}
