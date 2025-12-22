"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GeometricBackground } from "@/components/geometric-background"
import { DoxaLogo } from "@/components/doxa-logo"

export default function SignUpPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    phone: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  const handleNext = () => {
    console.log("[v0] Moving to step 2, data:", {
      nom: formData.nom,
      prenom: formData.prenom,
      phone: formData.phone,
      username: formData.username,
    })
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Sign up submission:", formData)
    // Redirect to verification
    window.location.href = "/verification"
  }

  return (
    <div className="min-h-screen relative bg-cream flex items-center justify-center p-4">
      <GeometricBackground />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <DoxaLogo />

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create an Account</h1>
            <div className="relative">
              <p className="text-sm text-gray-600 pb-2">Create a account to continue</p>
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: step === 1 ? "50%" : "100%" }}
                />
              </div>
            </div>
          </div>

          {step === 1 ? (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="nom" className="text-sm font-medium text-gray-700">
                  Nom
                </Label>
                <Input
                  id="nom"
                  type="text"
                  placeholder="ghost"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prenom" className="text-sm font-medium text-gray-700">
                  Prénom
                </Label>
                <Input
                  id="prenom"
                  type="text"
                  placeholder="hamid"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Numero de telephone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0555555555"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="h-12"
                />
              </div>

              <Button
                type="button"
                onClick={handleNext}
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
              >
                Next
              </Button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-accent hover:underline font-medium">
                  Login
                </Link>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address:
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="esteban_schiller@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirme Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                  I accept terms and conditions
                </Label>
              </div>

              <Button type="submit" className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90">
                Sign Up
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="w-full h-12 text-base font-medium border-2 hover:bg-gray-50 bg-transparent"
              >
                Retour
              </Button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-accent hover:underline font-medium">
                  Login
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
