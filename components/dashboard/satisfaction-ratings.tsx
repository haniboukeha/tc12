import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

const months = [
  { name: "jan", stars: 3 },
  { name: "feb", stars: 3 },
  { name: "mar", stars: 4 },
  { name: "apr", stars: 3 },
]

export function SatisfactionRatings() {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium text-gray-800">client satisfaction</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {months.map((month) => (
            <div key={month.name} className="flex items-center gap-6">
              <span className="text-sm text-gray-700 w-8 font-medium">{month.name}</span>
              <div className="flex-1 flex items-center gap-1.5 border-2 border-dashed border-blue-300 rounded-lg px-3 py-2.5 bg-blue-50/40">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < month.stars ? "fill-blue-500 text-blue-500" : "fill-none text-blue-300"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
