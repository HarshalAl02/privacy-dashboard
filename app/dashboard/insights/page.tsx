"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Search, Globe, AlertTriangle, BarChart3 } from "lucide-react"
import { mockWebsiteInsights } from "@/lib/data"
import type { WebsiteInsight } from "@/types"
import { WebsiteDetailModal } from "@/components/dashboard/website-detail-modal"

export default function InsightsPage() {
  const [insights, setInsights] = useState<WebsiteInsight[]>(mockWebsiteInsights)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"riskScore" | "visitCount" | "lastActivity">("riskScore")
  const [selectedInsight, setSelectedInsight] = useState<WebsiteInsight | null>(null)

  const filteredInsights = insights
    .filter((insight) => insight.domain.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "riskScore") return b.riskScore - a.riskScore
      if (sortBy === "visitCount") return b.visitCount - a.visitCount
      if (sortBy === "lastActivity") return b.lastActivity.getTime() - a.lastActivity.getTime()
      return 0
    })

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-400 bg-red-500/20 border-red-500/30"
    if (score >= 60) return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
    return "text-green-400 bg-green-500/20 border-green-500/30"
  }

  const getRiskLabel = (score: number) => {
    if (score >= 80) return "High Risk"
    if (score >= 60) return "Medium Risk"
    return "Low Risk"
  }

  const formatLastActivity = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Website Insights</h1>
          <p className="text-gray-400 mt-1">Analyze privacy risks and tracking behavior across all visited sites</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-gray-700 text-gray-300">
            {filteredInsights.length} websites analyzed
          </Badge>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search websites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 text-sm"
              >
                <option value="riskScore">Risk Score</option>
                <option value="visitCount">Visit Count</option>
                <option value="lastActivity">Last Activity</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Website Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInsights.map((insight) => (
          <Dialog key={insight.id}>
            <DialogTrigger asChild>
              <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-blue-400" />
                      <CardTitle className="text-sm font-medium text-white truncate">{insight.domain}</CardTitle>
                    </div>
                    <Badge className={cn("text-xs border", getRiskColor(insight.riskScore))}>
                      {getRiskLabel(insight.riskScore)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Risk Score */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Risk Score</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full transition-all duration-500",
                            insight.riskScore >= 80
                              ? "bg-red-500"
                              : insight.riskScore >= 60
                                ? "bg-yellow-500"
                                : "bg-green-500",
                          )}
                          style={{ width: `${insight.riskScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white">{insight.riskScore}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Trackers</p>
                      <p className="text-white font-medium">{insight.trackerCount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Permissions</p>
                      <p className="text-white font-medium">{insight.permissionUsage}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Visits</p>
                      <p className="text-white font-medium">{insight.visitCount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Last Active</p>
                      <p className="text-white font-medium">{formatLastActivity(insight.lastActivity)}</p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    {insight.riskScore >= 80 && <AlertTriangle className="w-4 h-4 text-red-400" />}
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-800 border-gray-700">
              <WebsiteDetailModal insight={insight} />
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {filteredInsights.length === 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-8 text-center">
            <Globe className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No websites match your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
