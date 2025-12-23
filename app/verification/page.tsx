"use client"

import type React from "react"
import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { GeometricBackground } from "@/components/geometric-background"
import { DoxaLogo } from "@/components/doxa-logo"

export default function VerificationPage() {
  const router = useRouter()

  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < code.length - 1) {
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

    // ❌ vérifier si un champ est vide
    if (code.some((digit) => digit === "")) {
      setError("Please enter the 6-digit verification code.")
      return
    }

    setError("")
    const verificationCode = code.join("")
    console.log("Verification code:", verificationCode)

    // ✅ redirection seulement si tout est rempli
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen relative bg-cream flex items-center justify-center p-4">
      <GeometricBackground />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <DoxaLogo />

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create an Account</h1>
            <p className="text-sm text-gray-600">Enter the verification code</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-14 text-center text-2xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-2
                    ${
                      error
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-primary focus:ring-primary/20"
                    }`}
                  placeholder="#"
                />
              ))}
            </div>

            {/* ❌ Message d’erreur */}
            {error && <p className="text-center text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
            >
              Confirm
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
