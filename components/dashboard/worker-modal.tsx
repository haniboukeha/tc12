"use client"

import { X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Worker = {
  name: string
  role: string
  status: "active" | "busy" | "offline"
  ticketsResolved: number
  avgResponseTime: string
  satisfaction: number
}

export function WorkerModal({ worker, onClose }: { worker: Worker; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md m-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Worker Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <Avatar className="w-16 h-16">
              <AvatarImage src={`/.jpg?height=64&width=64&query=${worker.name}`} />
              <AvatarFallback className="text-2xl">{worker.name[0]}</AvatarFallback>
            </Avatar>
            <div
              className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                worker.status === "active" ? "bg-green-500" : worker.status === "busy" ? "bg-yellow-500" : "bg-gray-400"
              }`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{worker.name}</h3>
            <p className="text-sm text-gray-600">{worker.role}</p>
            <p className="text-xs text-gray-500 capitalize mt-1">
              Status:{" "}
              <span
                className={`font-medium ${
                  worker.status === "active"
                    ? "text-green-600"
                    : worker.status === "busy"
                      ? "text-yellow-600"
                      : "text-gray-600"
                }`}
              >
                {worker.status}
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Tickets Resolved</p>
            <p className="text-2xl font-semibold text-gray-800">{worker.ticketsResolved.toLocaleString()}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Avg Response Time</p>
              <p className="text-lg font-semibold text-gray-800">{worker.avgResponseTime}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Satisfaction Rate</p>
              <p className="text-lg font-semibold text-gray-800">{worker.satisfaction}%</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-xs text-blue-600 font-medium mb-2">Performance Summary</p>
            <p className="text-sm text-gray-700">
              {worker.name} is performing{" "}
              {worker.satisfaction >= 95 ? "exceptionally well" : worker.satisfaction >= 90 ? "very well" : "well"} with
              a {worker.satisfaction}% customer satisfaction rate and has resolved{" "}
              {worker.ticketsResolved.toLocaleString()} tickets.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
