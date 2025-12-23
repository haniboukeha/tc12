"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GeometricBackground } from "@/components/geometric-background"
import { DoxaLogo } from "@/components/doxa-logo"

export default function SignInPage() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // 🔐 Identifiants mock
  const ADMIN = { username: "admin", password: "admin123" }
  const PERSONNEL = { username: "staff", password: "staff123" }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // ❌ Champs vides
    if (!username || !password) {
      setError("Please enter both username and password.")
      return
    }

    setError("")

    // ✅ CAS 1 : ADMIN
    if (username === ADMIN.username && password === ADMIN.password) {
      router.push("/AdminDashboard")
      return
    }

    // ✅ CAS 2 : PERSONNEL
    if (username === PERSONNEL.username && password === PERSONNEL.password) {
      router.push("/dashboardPersonnel")
      return
    }

    // ✅ CAS 3 : TOUS LES AUTRES (clients)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen relative bg-cream flex items-center justify-center p-4">
      <GeometricBackground />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <DoxaLogo />

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-sm text-gray-600">Log in to your account</p>
          </div>

          {/* ❌ Message d’erreur */}
          {error && <p className="mb-4 text-sm text-red-600 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`h-12 ${error ? "border-red-500" : ""}`}
              />
            </div>

            {/* Password + "Mot de passe oublié" */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`h-12 ${error ? "border-red-500" : ""}`}
              />
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
            >
              Sign In
            </Button>

            {/* Sign Up */}
            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-accent hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
