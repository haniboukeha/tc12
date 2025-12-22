"use client"

import type React from "react"

import Link from "next/link"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { GeometricBackground } from "@/components/geometric-background"
import { DoxaLogo } from "@/components/doxa-logo"

export default function VerificationPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Verification code:", code.join(""))
  }

  return (
    <div className="min-h-screen relative bg-cream flex items-center justify-center p-4">
      <GeometricBackground />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <DoxaLogo />

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create an Account</h1>
            <p className="text-sm text-gray-600">Create a account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="#"
                />
              ))}
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90">
              Confirmer
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-accent hover:underline font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
