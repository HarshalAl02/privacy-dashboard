import { PrivacyScoreCard } from "@/components/dashboard/privacy-score"
import { TopDomainsCard } from "@/components/dashboard/top-domains"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockPrivacyScore, topDomains } from "@/lib/data"
import { Activity, Shield, AlertTriangle, Globe } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Privacy Control Center</h1>
          <p className="text-gray-400 mt-1">Monitor and control your browser privacy in real-time</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Last updated</p>
          <p className="text-sm text-white">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Top row - Privacy Score and Top Domains */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PrivacyScoreCard score={mockPrivacyScore} />
        </div>
        <div className="lg:col-span-2">
          <TopDomainsCard domains={topDomains} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Today's Events</CardTitle>
            <Activity className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">47</div>
            <p className="text-xs text-green-400">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Blocked Trackers</CardTitle>
            <Shield className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">23</div>
            <p className="text-xs text-green-400">+8% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-red-400">2 critical, 1 warning</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Monitored Sites</CardTitle>
            <Globe className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">156</div>
            <p className="text-xs text-gray-400">Across all devices</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "2 min ago", event: "YouTube accessed microphone", type: "warning" },
              { time: "5 min ago", event: "Instagram requested location", type: "critical" },
              { time: "12 min ago", event: "Zoom camera session ended", type: "info" },
              { time: "18 min ago", event: "Spotify notifications blocked", type: "success" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-700/50">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    activity.type === "critical"
                      ? "bg-red-400"
                      : activity.type === "warning"
                        ? "bg-yellow-400"
                        : activity.type === "success"
                          ? "bg-green-400"
                          : "bg-blue-400",
                  )}
                />
                <div className="flex-1">
                  <p className="text-sm text-white">{activity.event}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
