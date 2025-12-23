import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface MetricsCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  bgColor?: string
}

export function MetricsCard({ title, value, change, trend, bgColor = "bg-white" }: MetricsCardProps) {
  return (
    <Card className={`${bgColor} border-none shadow-sm`}>
      <CardContent className="p-6">
        <p className="text-sm text-gray-600 mb-2">{title}</p>
        <div className="flex items-end justify-between">
          <span className="text-3xl font-semibold text-gray-800">{value}</span>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>{change}</span>
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
