"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "AI agent", value: 85.1 },
  { name: "Agent", value: 14.9 },
]

const COLORS = ["#4c6ef5", "#a5b4fc"]

export function DonutChart() {
  return (
    <Card className="bg-[#e8ebf5] border-none">
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-800">AI agent vs Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-8">
          <div className="w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={0} dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {data.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-sm text-gray-700">{entry.name}</span>
                <span className="text-sm font-medium text-gray-800 ml-auto">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
