import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TopDomainsProps {
  domains: Array<{
    domain: string
    events: number
  }>
}

export function TopDomainsCard({ domains }: TopDomainsProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Top Active Domains Today</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {domains.map((domain, index) => (
          <div key={domain.domain} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-300">{index + 1}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{domain.domain}</p>
                <p className="text-xs text-gray-400">{domain.events} events</p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className={cn(
                "text-xs",
                domain.events > 10
                  ? "bg-red-500/20 text-red-400"
                  : domain.events > 5
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-green-500/20 text-green-400",
              )}
            >
              {domain.events > 10 ? "High" : domain.events > 5 ? "Medium" : "Low"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
