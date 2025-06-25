"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Eye, Camera, Mic, MapPin } from "lucide-react"
import Link from "next/link"

export function LandingHero() {
  const [animatedPermissions, setAnimatedPermissions] = useState<string[]>([])

  useEffect(() => {
    const permissions = ["camera", "microphone", "location"]
    let index = 0

    const interval = setInterval(() => {
      setAnimatedPermissions((prev) => {
        const newPerms = [...prev, permissions[index]]
        index = (index + 1) % permissions.length
        return newPerms.slice(-3)
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center">
          {/* Logo/Brand */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">PrivacyGuard</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Your browser sees
            <br />
            <span className="text-red-400">more than you know</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Take control of your digital privacy. Monitor, analyze, and protect your browser sessions in real-time.
          </p>

          {/* Animated browser simulation */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="bg-gray-800 rounded-lg p-4 w-96 shadow-2xl border border-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1 bg-gray-700 rounded px-3 py-1 text-sm text-gray-300">https://example.com</div>
                </div>

                <div className="space-y-2">
                  {animatedPermissions.map((permission, index) => (
                    <div
                      key={`${permission}-${index}`}
                      className="flex items-center space-x-3 p-2 bg-red-500/20 border border-red-500/30 rounded animate-pulse"
                    >
                      {permission === "camera" && <Camera className="w-4 h-4 text-red-400" />}
                      {permission === "microphone" && <Mic className="w-4 h-4 text-red-400" />}
                      {permission === "location" && <MapPin className="w-4 h-4 text-red-400" />}
                      <span className="text-sm text-red-300">
                        {permission === "camera" && "Camera access requested"}
                        {permission === "microphone" && "Microphone access requested"}
                        {permission === "location" && "Location access requested"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating permission icons */}
              <div className="absolute -top-4 -right-4 animate-bounce">
                <Eye className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              Install Extension
            </Button>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg"
              >
                Try Dashboard
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex justify-center items-center space-x-8 text-gray-400">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10K+</div>
              <div className="text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50M+</div>
              <div className="text-sm">Threats Blocked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
