"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Bug, AlertCircle, Menu, X, Bell } from "lucide-react"
import { MetricsCard } from "@/components/dashboard/metrics-card"
import { DonutChart } from "@/components/dashboard/donut-chart"
import { BarChart } from "@/components/dashboard/bar-chart"
import { LineChart } from "@/components/dashboard/line-chart"
import { SatisfactionRatings } from "@/components/dashboard/satisfaction-ratings"
import { WorkerModal } from "@/components/dashboard/worker-modal"
import { NotificationModal } from "@/components/dashboard/notification-modal"
import { useState } from "react"

type Worker = {
  name: string
  role: string
  status: "active" | "busy" | "offline"
  ticketsResolved: number
  avgResponseTime: string
  satisfaction: number
}

type Notification = {
  id: string
  type: "bug" | "alert" | "info"
  message: string
  timestamp: string
  details: string
}

export default function DashboardPage() {
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)

  const workers: Worker[] = [
    {
      name: "Fatima",
      role: "Senior Agent",
      status: "active",
      ticketsResolved: 1243,
      avgResponseTime: "8.2s",
      satisfaction: 94,
    },
    {
      name: "Said",
      role: "AI Specialist",
      status: "active",
      ticketsResolved: 987,
      avgResponseTime: "6.5s",
      satisfaction: 96,
    },
    {
      name: "Imane",
      role: "Support Agent",
      status: "busy",
      ticketsResolved: 756,
      avgResponseTime: "9.8s",
      satisfaction: 91,
    },
    {
      name: "Mehrez",
      role: "Team Lead",
      status: "active",
      ticketsResolved: 1521,
      avgResponseTime: "7.1s",
      satisfaction: 98,
    },
    {
      name: "Salima",
      role: "Support Agent",
      status: "offline",
      ticketsResolved: 634,
      avgResponseTime: "10.2s",
      satisfaction: 88,
    },
    {
      name: "Ania",
      role: "Senior Agent",
      status: "active",
      ticketsResolved: 1089,
      avgResponseTime: "8.9s",
      satisfaction: 92,
    },
  ]

  const notifications: Notification[] = [
    {
      id: "1",
      type: "bug",
      message: "You fixed a bug.",
      timestamp: "Just now",
      details:
        "Fixed critical authentication issue in login flow. The bug was causing users to be logged out unexpectedly after 5 minutes of inactivity.",
    },
    {
      id: "2",
      type: "bug",
      message: "You fixed a bug.",
      timestamp: "12 hours ago",
      details:
        "Resolved database connection timeout issue that was affecting 15% of users. Implemented connection pooling to prevent future occurrences.",
    },
    {
      id: "3",
      type: "alert",
      message: "Satisfaction is below 75%",
      timestamp: "Today, 11:37 AM",
      details:
        "Customer satisfaction rate has dropped to 72% in the last 24 hours. Main issues reported: slow response times and unresolved technical questions. Immediate action required.",
    },
  ]

  return (
    <div className="flex min-h-screen bg-[#FFF3EC] relative overflow-hidden">
      <div className="fixed bottom-0 left-0 w-48 h-48 pointer-events-none z-0">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <pattern
              id="stripes"
              x="0"
              y="0"
              width="15"
              height="15"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-45)"
            >
              <line x1="0" y1="0" x2="0" y2="15" stroke="#2c3e82" strokeWidth="6" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#stripes)" />
        </svg>
      </div>

      <div className="fixed bottom-0 right-0 w-72 h-72 pointer-events-none z-0">
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <radialGradient id="dotGradient">
              <stop offset="0%" stopColor="#2c3e82" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#2c3e82" stopOpacity="0.4" />
            </radialGradient>
          </defs>
          {Array.from({ length: 7 }).map((_, row) =>
            Array.from({ length: 7 }).map((_, col) => {
              const x = 80 + col * 32
              const y = 80 + row * 32
              const size = 4 + (row + col) * 0.4
              return <circle key={`${row}-${col}`} cx={x} cy={y} r={size} fill="url(#dotGradient)" />
            }),
          )}
        </svg>
      </div>

      {leftSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setLeftSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 sm:w-72 lg:w-48 bg-[#e8ebf5] p-4 sm:p-6 lg:p-4 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${leftSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        overflow-y-auto
      `}
      >
        <button
          onClick={() => setLeftSidebarOpen(false)}
          className="lg:hidden absolute top-3 right-3 p-2 hover:bg-black/5 rounded-lg transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6 lg:mb-8">
          <div className="w-5 h-5 bg-gray-800 rounded-full" />
          <span className="font-medium text-gray-800 text-sm">UserAdmin</span>
        </div>

        <nav className="flex-1 space-y-4">
          <div>
            <div className="text-xs text-gray-500 mb-2 font-medium">Dashboards</div>
            <button className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-white rounded-lg px-3 py-2 w-full hover:bg-white/90 transition-colors">
              <div className="w-3 h-3 bg-blue-600 rounded-full" />
              <span>Overview</span>
            </button>
          </div>
        </nav>

        <div className="mt-auto pt-4">
          <img src="/images/bcdc21e8-54c3-4aa3-ba9c-4b6ba4b3b3b4.png" alt="Doxa" className="h-6 w-auto" />
        </div>
      </aside>

      <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 w-full lg:w-auto min-w-0 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 lg:mb-8 gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setLeftSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-white/80 rounded-lg transition-colors flex-shrink-0"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl lg:text-2xl font-semibold text-gray-800 truncate">Overview</h1>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="relative hidden sm:block w-48 lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search" className="pl-9 bg-white/80 border-gray-200 text-sm h-9 rounded-lg" />
              </div>
              <button
                onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                className="xl:hidden p-2 hover:bg-white rounded-lg transition-colors"
                aria-label="Toggle notifications"
              >
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-6 lg:mb-8">
            <MetricsCard title="solved tickets" value="7,265" change="+11.01%" trend="up" bgColor="bg-[#e8ebf5]" />
            <MetricsCard title="average response time" value="9,3s" change="+6.08%" trend="up" bgColor="bg-[#9097c4]" />
            <MetricsCard title="with ai agent" value="6,071" change="83.56%" trend="up" bgColor="bg-[#e8ebf5]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 mb-6 lg:mb-8">
            <DonutChart />
            <BarChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
            <SatisfactionRatings />
            <LineChart />
          </div>
        </div>
      </main>

      {rightSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setRightSidebarOpen(false)}
          aria-label="Close notifications"
        />
      )}

      <aside
        className={`
        fixed xl:static inset-y-0 right-0 z-50
        w-full xs:w-80 sm:w-96 xl:w-64 bg-white border-l border-gray-200 p-4 sm:p-6 xl:p-5
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${rightSidebarOpen ? "translate-x-0" : "translate-x-full xl:translate-x-0"}
      `}
      >
        <button
          onClick={() => setRightSidebarOpen(false)}
          className="xl:hidden absolute top-3 right-3 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
          aria-label="Close notifications"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-4 text-base">Notifications</h3>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => setSelectedNotification(notification)}
                className="flex gap-3 w-full text-left hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
              >
                {notification.type === "bug" ? (
                  <Bug className="w-4 h-4 text-gray-600 flex-shrink-0 mt-1" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-gray-600 flex-shrink-0 mt-1" />
                )}
                <div className="min-w-0">
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{notification.timestamp}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-4 text-base">Workers</h3>
          <div className="space-y-2">
            {workers.map((worker) => (
              <button
                key={worker.name}
                onClick={() => setSelectedWorker(worker)}
                className="flex items-center gap-3 w-full hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
              >
                <div className="relative flex-shrink-0">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={`/.jpg?height=32&width=32&query=${worker.name}`} />
                    <AvatarFallback className="text-xs">{worker.name[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                      worker.status === "active"
                        ? "bg-green-500"
                        : worker.status === "busy"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                    }`}
                  />
                </div>
                <span className="text-sm text-gray-700">{worker.name}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {selectedWorker && <WorkerModal worker={selectedWorker} onClose={() => setSelectedWorker(null)} />}

      {selectedNotification && (
        <NotificationModal notification={selectedNotification} onClose={() => setSelectedNotification(null)} />
      )}
    </div>
  )
}
