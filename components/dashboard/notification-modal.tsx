"use client"

import { X, Bug, AlertCircle, Info } from "lucide-react"

type Notification = {
  id: string
  type: "bug" | "alert" | "info"
  message: string
  timestamp: string
  details: string
}

export function NotificationModal({ notification, onClose }: { notification: Notification; onClose: () => void }) {
  const icons = {
    bug: Bug,
    alert: AlertCircle,
    info: Info,
  }

  const Icon = icons[notification.type]

  const bgColors = {
    bug: "bg-blue-50",
    alert: "bg-red-50",
    info: "bg-gray-50",
  }

  const iconColors = {
    bug: "text-blue-600",
    alert: "text-red-600",
    info: "text-gray-600",
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md m-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Notification Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className={`${bgColors[notification.type]} rounded-lg p-4 mb-4`}>
          <div className="flex gap-3 mb-3">
            <Icon className={`w-6 h-6 ${iconColors[notification.type]} flex-shrink-0`} />
            <div>
              <p className="font-medium text-gray-800">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Details</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{notification.details}</p>
          </div>

          {notification.type === "alert" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-xs font-medium text-yellow-800 mb-1">Action Required</p>
              <p className="text-sm text-yellow-700">
                This alert requires immediate attention. Please review the issue and take appropriate action.
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 transition-colors">
              Mark as Read
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 rounded-lg py-2 text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
