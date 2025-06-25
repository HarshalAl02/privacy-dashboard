"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, Bell, Database, Trash2, Download, Upload } from "lucide-react"
import type { Settings } from "@/types"

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    riskThresholds: {
      low: 30,
      medium: 60,
      high: 80,
    },
    dataTypes: {
      camera: true,
      microphone: true,
      location: true,
      storage: false,
      notifications: true,
    },
    emailReports: true,
    retentionDays: 90,
  })

  const [email, setEmail] = useState("john@example.com")

  const handleThresholdChange = (type: keyof Settings["riskThresholds"], value: number[]) => {
    setSettings((prev) => ({
      ...prev,
      riskThresholds: {
        ...prev.riskThresholds,
        [type]: value[0],
      },
    }))
  }

  const handleDataTypeToggle = (type: keyof Settings["dataTypes"]) => {
    setSettings((prev) => ({
      ...prev,
      dataTypes: {
        ...prev.dataTypes,
        [type]: !prev.dataTypes[type],
      },
    }))
  }

  const handleRetentionChange = (value: number[]) => {
    setSettings((prev) => ({
      ...prev,
      retentionDays: value[0],
    }))
  }

  const exportData = () => {
    console.log("Exporting data...")
  }

  const clearHistory = () => {
    console.log("Clearing history...")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Configure your privacy monitoring preferences and thresholds</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Privacy Thresholds */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Risk Score Thresholds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-gray-300">Low Risk Threshold</Label>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {settings.riskThresholds.low}
                </Badge>
              </div>
              <Slider
                value={[settings.riskThresholds.low]}
                onValueChange={(value) => handleThresholdChange("low", value)}
                max={100}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-gray-400 mt-1">Scores below this value are considered low risk</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-gray-300">Medium Risk Threshold</Label>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  {settings.riskThresholds.medium}
                </Badge>
              </div>
              <Slider
                value={[settings.riskThresholds.medium]}
                onValueChange={(value) => handleThresholdChange("medium", value)}
                max={100}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-gray-400 mt-1">Scores between low and this value are medium risk</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-gray-300">High Risk Threshold</Label>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">{settings.riskThresholds.high}</Badge>
              </div>
              <Slider
                value={[settings.riskThresholds.high]}
                onValueChange={(value) => handleThresholdChange("high", value)}
                max={100}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-gray-400 mt-1">Scores above this value are considered high risk</p>
            </div>
          </CardContent>
        </Card>

        {/* Data Collection */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Data Collection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {Object.entries(settings.dataTypes).map(([type, enabled]) => (
                <div key={type} className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300 capitalize">{type} Access</Label>
                    <p className="text-xs text-gray-400">Monitor {type} permission requests</p>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={() => handleDataTypeToggle(type as keyof Settings["dataTypes"])}
                  />
                </div>
              ))}
            </div>

            <Separator className="bg-gray-700" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-gray-300">Data Retention</Label>
                <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                  {settings.retentionDays} days
                </Badge>
              </div>
              <Slider
                value={[settings.retentionDays]}
                onValueChange={handleRetentionChange}
                min={7}
                max={365}
                step={7}
                className="w-full"
              />
              <p className="text-xs text-gray-400 mt-1">How long to keep privacy data before automatic deletion</p>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Email Reports</Label>
                <p className="text-xs text-gray-400">Receive weekly privacy summary reports</p>
              </div>
              <Switch
                checked={settings.emailReports}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, emailReports: checked }))}
              />
            </div>

            <div>
              <Label className="text-gray-300">Email Address</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-gray-700 border-gray-600 text-white"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-300">Alert Types</Label>
              {[
                { key: "critical", label: "Critical Threats", enabled: true },
                { key: "warnings", label: "Privacy Warnings", enabled: true },
                { key: "reports", label: "Weekly Reports", enabled: false },
                { key: "updates", label: "Product Updates", enabled: false },
              ].map((alert) => (
                <div key={alert.key} className="flex items-center justify-between">
                  <Label className="text-gray-400">{alert.label}</Label>
                  <Switch defaultChecked={alert.enabled} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                onClick={exportData}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 justify-start"
              >
                <Download className="w-4 h-4 mr-2" />
                Export All Data
              </Button>

              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 justify-start">
                <Upload className="w-4 h-4 mr-2" />
                Import Settings
              </Button>

              <Separator className="bg-gray-700" />

              <Button
                variant="outline"
                onClick={clearHistory}
                className="border-red-600 text-red-400 hover:bg-red-600/20 justify-start"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All History
              </Button>
            </div>

            <div className="p-3 bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-400">
                <strong className="text-gray-300">Storage Used:</strong> 45.2 MB of privacy data
              </p>
              <p className="text-xs text-gray-400 mt-1">
                <strong className="text-gray-300">Last Backup:</strong> 2 days ago
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Section */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Account & Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Account Information</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-gray-300">Full Name</Label>
                  <Input defaultValue="John Doe" className="mt-1 bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <Label className="text-gray-300">Email</Label>
                  <Input defaultValue="john@example.com" className="mt-1 bg-gray-700 border-gray-600 text-white" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Privacy Controls</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Share Anonymous Analytics</Label>
                  <Switch defaultChecked={false} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Allow Usage Tracking</Label>
                  <Switch defaultChecked={false} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Marketing Communications</Label>
                  <Switch defaultChecked={false} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
