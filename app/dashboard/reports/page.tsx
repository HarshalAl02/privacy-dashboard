"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"
import { Download, Calendar, TrendingUp, Shield, AlertTriangle, Globe, FileText } from "lucide-react"

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")

  // Mock data for charts
  const privacyTrendData = [
    { date: "2024-01-01", score: 65, threats: 12, blocked: 8 },
    { date: "2024-01-02", score: 68, threats: 15, blocked: 11 },
    { date: "2024-01-03", score: 72, threats: 9, blocked: 7 },
    { date: "2024-01-04", score: 70, threats: 18, blocked: 14 },
    { date: "2024-01-05", score: 75, threats: 6, blocked: 5 },
    { date: "2024-01-06", score: 73, threats: 11, blocked: 9 },
    { date: "2024-01-07", score: 78, threats: 4, blocked: 4 },
  ]

  const permissionBreakdownData = [
    { name: "Camera", value: 35, color: "#EF4444" },
    { name: "Microphone", value: 28, color: "#3B82F6" },
    { name: "Location", value: 22, color: "#F59E0B" },
    { name: "Storage", value: 10, color: "#8B5CF6" },
    { name: "Notifications", value: 5, color: "#10B981" },
  ]

  const topThreatsData = [
    { domain: "instagram.com", threats: 45, blocked: 38 },
    { domain: "youtube.com", threats: 32, blocked: 28 },
    { domain: "facebook.com", threats: 28, blocked: 22 },
    { domain: "tiktok.com", threats: 24, blocked: 20 },
    { domain: "twitter.com", threats: 18, blocked: 15 },
  ]

  const generateReport = () => {
    // In a real app, this would generate and download a PDF report
    console.log("Generating report for:", timeRange)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Privacy Reports</h1>
          <p className="text-gray-400 mt-1">Comprehensive analytics and insights into your privacy protection</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          <Button onClick={generateReport} className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Privacy Score</p>
                <p className="text-2xl font-bold text-green-400">73</p>
                <p className="text-xs text-green-400 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5% vs last period
                </p>
              </div>
              <Shield className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Threats Detected</p>
                <p className="text-2xl font-bold text-red-400">247</p>
                <p className="text-xs text-red-400">+12% vs last period</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Threats Blocked</p>
                <p className="text-2xl font-bold text-blue-400">198</p>
                <p className="text-xs text-green-400">80% success rate</p>
              </div>
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Sites Monitored</p>
                <p className="text-2xl font-bold text-purple-400">156</p>
                <p className="text-xs text-gray-400">Across all devices</p>
              </div>
              <Globe className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Privacy Score Trend */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Privacy Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={privacyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
                <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Permission Breakdown */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Permission Usage Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={permissionBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {permissionBreakdownData.map((entry, index) => (
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
            <div className="grid grid-cols-2 gap-2 mt-4">
              {permissionBreakdownData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-300">{item.name}</span>
                  <span className="text-sm text-gray-400">({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threats vs Blocked */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Threats Detected vs Blocked</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={privacyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
                <Bar dataKey="threats" fill="#EF4444" name="Threats" />
                <Bar dataKey="blocked" fill="#10B981" name="Blocked" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Threat Sources */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Top Threat Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topThreatsData.map((item, index) => (
                <div key={item.domain} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-white">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{item.domain}</p>
                      <p className="text-xs text-gray-400">{item.threats} threats detected</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {Math.round((item.blocked / item.threats) * 100)}% blocked
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Actions */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Generate Custom Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Weekly Summary
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Monthly Analysis
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Quarterly Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
