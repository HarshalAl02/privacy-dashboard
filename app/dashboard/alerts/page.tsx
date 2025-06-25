"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, CheckCircle, XCircle, Bell, Settings } from "lucide-react"
import { mockAlerts } from "@/lib/data"
import type { Alert } from "@/types"

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [filter, setFilter] = useState<"all" | "unread" | "critical" | "warning">("all")

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true
    if (filter === "unread") return !alert.isRead
    if (filter === "critical") return alert.type === "critical"
    if (filter === "warning") return alert.type === "warning"
    return true
  })

  const handleMarkAsRead = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, isRead: true } : alert)))
  }

  const handleSnooze = (alertId: string) => {
    // In a real app, this would snooze the alert for a specified time
    console.log("Snoozing alert:", alertId)
  }

  const handleMarkSafe = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }

  const handleEscalate = (alertId: string) => {
    // In a real app, this would escalate the alert
    console.log("Escalating alert:", alertId)
  }

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return <XCircle className="w-5 h-5 text-red-400" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case "info":
        return <Bell className="w-5 h-5 text-blue-400" />
      default:
        return <Bell className="w-5 h-5 text-gray-400" />
    }
  }

  const getAlertBadgeColor = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "info":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const unreadCount = alerts.filter((alert) => !alert.isRead).length
  const criticalCount = alerts.filter((alert) => alert.type === "critical").length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Privacy Alerts</h1>
          <p className="text-gray-400 mt-1">Monitor and respond to privacy threats and suspicious activity</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-red-500/20 text-red-400">
            {criticalCount} critical
          </Badge>
          <Badge variant="secondary" className="bg-gray-700 text-gray-300">
            {unreadCount} unread
          </Badge>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            <Settings className="w-4 h-4 mr-2" />
            Alert Settings
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{criticalCount}</div>
            <div className="text-sm text-gray-400">Critical Alerts</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{alerts.filter((a) => a.type === "warning").length}</div>
            <div className="text-sm text-gray-400">Warnings</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <Bell className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{unreadCount}</div>
            <div className="text-sm text-gray-400">Unread</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{alerts.filter((a) => a.isRead).length}</div>
            <div className="text-sm text-gray-400">Resolved</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            {[
              { key: "all", label: "All Alerts", count: alerts.length },
              { key: "unread", label: "Unread", count: unreadCount },
              { key: "critical", label: "Critical", count: criticalCount },
              { key: "warning", label: "Warnings", count: alerts.filter((a) => a.type === "warning").length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  filter === tab.key ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700",
                )}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-gray-400">No alerts match your current filter</p>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={cn(
                "bg-gray-800 border-gray-700 transition-all duration-200",
                !alert.isRead && "border-l-4 border-l-blue-500",
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Alert Icon */}
                  <div className="flex-shrink-0 mt-1">{getAlertIcon(alert.type)}</div>

                  {/* Alert Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
                      <Badge className={cn("text-xs border", getAlertBadgeColor(alert.type))}>
                        {alert.type.toUpperCase()}
                      </Badge>
                      {!alert.isRead && (
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 text-xs">
                          NEW
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-300 mb-3">{alert.description}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimeAgo(alert.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>Domain:</span>
                        <span className="text-white font-medium">{alert.domain}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0">
                    <div className="flex flex-col space-y-2">
                      {!alert.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(alert.id)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Mark as Read
                        </Button>
                      )}

                      <div className="flex space-x-2">
                        {alert.actions.includes("snooze") && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSnooze(alert.id)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            Snooze
                          </Button>
                        )}

                        {alert.actions.includes("mark-safe") && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMarkSafe(alert.id)}
                            className="border-green-600 text-green-400 hover:bg-green-600/20"
                          >
                            Mark Safe
                          </Button>
                        )}

                        {alert.actions.includes("escalate") && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEscalate(alert.id)}
                            className="border-red-600 text-red-400 hover:bg-red-600/20"
                          >
                            Escalate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
