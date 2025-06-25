import { Shield, Activity, BarChart3, Bell, Settings, Eye } from "lucide-react"

const features = [
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Watch live as websites access your camera, microphone, and location data.",
  },
  {
    icon: BarChart3,
    title: "Privacy Analytics",
    description: "Detailed insights into tracking patterns and permission usage across all your browsing.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get notified when suspicious activity is detected or privacy thresholds are exceeded.",
  },
  {
    icon: Shield,
    title: "Privacy Score",
    description: "Daily privacy score that shows how well you're protecting your digital footprint.",
  },
  {
    icon: Settings,
    title: "Granular Control",
    description: "Fine-tune your privacy settings and customize what data you want to monitor.",
  },
  {
    icon: Eye,
    title: "Website Insights",
    description: "Deep dive into individual websites to understand their tracking behavior and risk levels.",
  },
]

export function LandingFeatures() {
  return (
    <div className="py-24 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Complete Privacy Intelligence</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to understand and control your browser privacy in one powerful dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
