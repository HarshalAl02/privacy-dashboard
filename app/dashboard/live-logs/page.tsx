"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, Mic, MapPin, HardDrive, Bell, Search, Filter, Play, Pause } from "lucide-react"
import { mockPermissionEvents } from "@/lib/data"
import type { PermissionEvent } from "@/types"

const permissionIcons = {
  camera: Camera,
  microphone: Mic,
  location: MapPin,
  storage: HardDrive,
  notifications: Bell,
}

const permissionColors = {
  camera: "text-red-400 bg-red-500/20",
  microphone: "text-blue-400 bg-blue-500/20",
  location: "text-yellow-400 bg-yellow-500/20",
  storage: "text-purple-400 bg-purple-500/20",
  notifications: "text-green-400 bg-green-500/20",
}

export default function LiveLogsPage() {
  const [events, setEvents] = useState<PermissionEvent[]>(mockPermissionEvents)
  const [isLive, setIsLive] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPermission, setSelectedPermission] = useState<string>("all")

  // Simulate real-time events
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      const newEvent: PermissionEvent = {
        id: Date.now().toString(),
        domain: ["youtube.com", "instagram.com", "zoom.us", "spotify.com"][Math.floor(Math.random() * 4)],
        permission: ["camera", "microphone", "location", "storage", "notifications"][
          Math.floor(Math.random() * 5)
        ] as any,
        timestamp: new Date(),
        duration: Math.floor(Math.random() * 120) + 10,
        deviceType: ["desktop", "mobile", "tablet"][Math.floor(Math.random() * 3)] as any,
        status: ["granted", "denied"][Math.floor(Math.random() * 2)] as any,
      }

      setEvents((prev) => [newEvent, ...prev.slice(0, 49)]) // Keep only last 50 events
    }, 3000)

    return () => clearInterval(interval)
  }, [isLive])

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.domain.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPermission = selectedPermission === "all" || event.permission === selectedPermission
    return matchesSearch && matchesPermission
  })

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Live Permission Logs</h1>
          <p className="text-gray-400 mt-1">Real-time monitoring of browser permission requests</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant={isLive ? "default" : "outline"}
            onClick={() => setIsLive(!isLive)}
            className="flex items-center space-x-2"
          >
            {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isLive ? "Pause" : "Resume"}</span>
          </Button>
          {isLive && (
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm">Live</span>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by domain..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedPermission}
                onChange={(e) => setSelectedPermission(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Permissions</option>
                <option value="camera">Camera</option>
                <option value="microphone">Microphone</option>
                <option value="location">Location</option>
                <option value="storage">Storage</option>
                <option value="notifications">Notifications</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            Permission Events
            <Badge variant="secondary" className="bg-gray-700 text-gray-300">
              {filteredEvents.length} events
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[600px] overflow-y-auto">
            {filteredEvents.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No events match your current filters</div>
            ) : (
              <div className="space-y-1">
                {filteredEvents.map((event, index) => {
                  const Icon = permissionIcons[event.permission]
                  const colorClass = permissionColors[event.permission]

                  return (
                    <div
                      key={event.id}
                      className={cn(
                        "flex items-center space-x-4 p-4 border-b border-gray-700 hover:bg-gray-700/50 transition-colors",
                        index === 0 && isLive ? "animate-pulse bg-gray-700/30" : "",
                      )}
                    >
                      <div className={cn("p-2 rounded-lg", colorClass)}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-white truncate">{event.domain}</p>
                          <Badge variant={event.status === "granted" ? "default" : "destructive"} className="text-xs">
                            {event.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400">
                          {event.permission} access • {event.deviceType}
                          {event.duration && ` • ${event.duration}s`}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-400">{formatTimeAgo(event.timestamp)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
