"use client"

import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"
import { Globe, Camera, Mic, MapPin, HardDrive, Bell } from "lucide-react"
import type { WebsiteInsight } from "@/types"

interface WebsiteDetailModalProps {
  insight: WebsiteInsight
}

const permissionIcons = {
  camera: Camera,
  microphone: Mic,
  location: MapPin,
  storage: HardDrive,
  notifications: Bell,
}

const COLORS = ["#3B82F6", "#EF4444", "#F59E0B", "#10B981", "#8B5CF6"]

export function WebsiteDetailModal({ insight }: WebsiteDetailModalProps) {
  // Mock data for charts
  const accessPatternData = [
    { time: "00:00", accesses: 2 },
    { time: "04:00", accesses: 1 },
    { time: "08:00", accesses: 8 },
    { time: "12:00", accesses: 12 },
    { time: "16:00", accesses: 15 },
    { time: "20:00", accesses: 9 },
  ]

  const permissionData = [
    { name: "Camera", value: 30, color: "#EF4444" },
    { name: "Microphone", value: 25, color: "#3B82F6" },
    { name: "Location", value: 20, color: "#F59E0B" },
    { name: "Storage", value: 15, color: "#8B5CF6" },
    { name: "Notifications", value: 10, color: "#10B981" },
  ]

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-400"
    if (score >= 60) return "text-yellow-400"
    return "text-green-400"
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-2 text-white">
          <Globe className="w-5 h-5 text-blue-400" />
          <span>{insight.domain}</span>
          <Badge className={cn("ml-2", getRiskColor(insight.riskScore))}>Risk Score: {insight.riskScore}</Badge>
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gray-700 border-gray-600">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{insight.trackerCount}</div>
              <div className="text-sm text-gray-400">Trackers</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-700 border-gray-600">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{insight.visitCount}</div>
              <div className="text-sm text-gray-400">Total Visits</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-700 border-gray-600">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{insight.permissionUsage}</div>
              <div className="text-sm text-gray-400">Permissions</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-700 border-gray-600">
            <CardContent className="p-4 text-center">
              <div className={cn("text-2xl font-bold", getRiskColor(insight.riskScore))}>
                {insight.riskScore >= 80 ? "High" : insight.riskScore >= 60 ? "Medium" : "Low"}
              </div>
              <div className="text-sm text-gray-400">Risk Level</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Access Pattern Chart */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white text-sm">Access Pattern (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={accessPatternData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                  />
                  <Line type="monotone" dataKey="accesses" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Permission Usage Chart */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white text-sm">Permission Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={permissionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {permissionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Permission Events */}
        <Card className="bg-gray-700 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white text-sm">Recent Permission Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {insight.permissions.map((permission) => {
                const Icon = permissionIcons[permission.permission]
                return (
                  <div key={permission.id} className="flex items-center space-x-3 p-2 bg-gray-600 rounded-lg">
                    <Icon className="w-4 h-4 text-blue-400" />
                    <div className="flex-1">
                      <p className="text-sm text-white capitalize">{permission.permission} access</p>
                      <p className="text-xs text-gray-400">
                        {permission.timestamp.toLocaleTimeString()} • {permission.deviceType}
                      </p>
                    </div>
                    <Badge variant={permission.status === "granted" ? "default" : "destructive"} className="text-xs">
                      {permission.status}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            Block Site
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            Add to Whitelist
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Configure Permissions</Button>
        </div>
      </div>
    </>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
