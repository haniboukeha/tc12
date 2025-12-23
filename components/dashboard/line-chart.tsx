"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts"

const data = [
  { month: "Jan", thisYear: 55, lastYear: 50 },
  { month: "Feb", thisYear: 58, lastYear: 52 },
  { month: "Mar", thisYear: 62, lastYear: 58 },
  { month: "Apr", thisYear: 68, lastYear: 62 },
  { month: "May", thisYear: 72, lastYear: 60 },
  { month: "Jun", thisYear: 78, lastYear: 68 },
  { month: "Jul", thisYear: 85, lastYear: 72 },
]

export function LineChart() {
  return (
    <Card className="bg-[#e8ebf5] border-none">
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-800">AI agent accuracy</CardTitle>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-800" />
            <span className="text-gray-600">This year</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            <span className="text-gray-600">Last year</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              ticks={[0, 50, 70, 90]}
              domain={[0, 90]}
            />
            <Line type="monotone" dataKey="thisYear" stroke="#1a1a1a" strokeWidth={2} dot={false} />
            <Line
              type="monotone"
              dataKey="lastYear"
              stroke="#fb923c"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
