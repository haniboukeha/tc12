"use client"

import type React from "react"

interface PrimaryButtonProps {
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  children: React.ReactNode
  disabled?: boolean
}

export default function PrimaryButton({ onClick, type = "button", children, disabled = false }: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full py-3 bg-[#4285F4] text-white rounded-lg font-medium hover:bg-[#3367D6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  )
}
