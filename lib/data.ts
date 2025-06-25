import type { PermissionEvent, WebsiteInsight, Alert, PrivacyScore } from "@/types"

export const mockPrivacyScore: PrivacyScore = {
  score: 73,
  trend: "up",
  lastUpdated: new Date(),
}

export const mockPermissionEvents: PermissionEvent[] = [
  {
    id: "1",
    domain: "youtube.com",
    permission: "microphone",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    duration: 45,
    deviceType: "desktop",
    status: "granted",
  },
  {
    id: "2",
    domain: "instagram.com",
    permission: "location",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    deviceType: "mobile",
    status: "granted",
  },
  {
    id: "3",
    domain: "zoom.us",
    permission: "camera",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    duration: 120,
    deviceType: "desktop",
    status: "granted",
  },
  {
    id: "4",
    domain: "spotify.com",
    permission: "notifications",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    deviceType: "desktop",
    status: "denied",
  },
]

export const mockWebsiteInsights: WebsiteInsight[] = [
  {
    id: "1",
    domain: "youtube.com",
    trackerCount: 12,
    permissionUsage: 8,
    lastActivity: new Date(Date.now() - 1000 * 60 * 30),
    riskScore: 65,
    visitCount: 45,
    permissions: mockPermissionEvents.filter((e) => e.domain === "youtube.com"),
  },
  {
    id: "2",
    domain: "instagram.com",
    trackerCount: 18,
    permissionUsage: 15,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60),
    riskScore: 82,
    visitCount: 23,
    permissions: mockPermissionEvents.filter((e) => e.domain === "instagram.com"),
  },
  {
    id: "3",
    domain: "zoom.us",
    trackerCount: 6,
    permissionUsage: 12,
    lastActivity: new Date(Date.now() - 1000 * 60 * 120),
    riskScore: 45,
    visitCount: 8,
    permissions: mockPermissionEvents.filter((e) => e.domain === "zoom.us"),
  },
]

export const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "Excessive Location Access",
    description: "Instagram accessed your location 4 times in 10 minutes in the background",
    domain: "instagram.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isRead: false,
    actions: ["snooze", "mark-safe", "escalate"],
  },
  {
    id: "2",
    type: "warning",
    title: "New Tracker Detected",
    description: "YouTube is using 3 new tracking methods since your last visit",
    domain: "youtube.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    isRead: false,
    actions: ["snooze", "mark-safe"],
  },
]

export const topDomains = [
  { domain: "instagram.com", events: 15 },
  { domain: "youtube.com", events: 12 },
  { domain: "zoom.us", events: 8 },
]
