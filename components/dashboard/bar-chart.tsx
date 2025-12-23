"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts"

const data = [
  { name: "Industry", value: 400 },
  { name: "Finance", value: 800 },
  { name: "Retail", value: 950 },
  { name: "Education", value: 750 },
  { name: "Health", value: 500 },
  { name: "Marketing", value: 850 },
]

const COLORS = ["#7c9aed", "#5fd4a8", "#1a1a1a", "#6db3f5", "#b8a3de", "#6dd68f"]

export function BarChart() {
  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-800">category plus retendante</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              ticks={[0, 250, 500, 1000]}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Bar key={`bar-${index}`} dataKey="value" fill={COLORS[index]} />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
