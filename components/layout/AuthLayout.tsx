"use client"

import type { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e5e5e5] p-4">
      <div className="w-full max-w-[400px] bg-white rounded-[40px] border-[3px] border-[#4285F4] p-8 shadow-sm">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">{title}</h1>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
