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

export default function SignUpPage() {
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [error, setError] = useState("")

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

  /* ---------------- STEP 1 ---------------- */
  const handleNext = () => {
    const { nom, prenom, phone, username } = formData

    if (!nom || !prenom || !phone || !username) {
      setError("Please fill in all fields before continuing.")
      return
    }

    setError("")
    setStep(2)
  }

  /* ---------------- STEP 2 ---------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { email, password, confirmPassword, acceptTerms } = formData

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (!acceptTerms) {
      setError("You must accept the terms and conditions.")
      return
    }

    setError("")
    console.log("Sign up data:", formData)

    // ✅ redirection seulement si tout est valide
    router.push("/verification")
  }

  return (
    <div className="min-h-screen relative bg-cream flex items-center justify-center p-4">
      <GeometricBackground />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <DoxaLogo />

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create an Account</h1>
            <p className="text-sm text-gray-600">Create an account to continue</p>

            <div className="h-1 bg-gray-200 rounded-full mt-3">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: step === 1 ? "50%" : "100%" }}
              />
            </div>
          </div>

          {/* ❌ Message d’erreur */}
          {error && <p className="mb-4 text-sm text-red-600 text-center">{error}</p>}

          {step === 1 ? (
            <div className="space-y-5">
              <InputField label="Nom" value={formData.nom} onChange={(v) => setFormData({ ...formData, nom: v })} />
              <InputField label="Prénom" value={formData.prenom} onChange={(v) => setFormData({ ...formData, prenom: v })} />
              <InputField
  label="Numéro de téléphone"
  value={formData.phone}
  onChange={(v) => {
    const onlyNumbers = v.replace(/\D/g, "")
    setFormData({ ...formData, phone: onlyNumbers })
  }}
/>

              <InputField label="Username" value={formData.username} onChange={(v) => setFormData({ ...formData, username: v })} />

              <Button onClick={handleNext} className="w-full h-12">
                Next
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField label="Email" type="email" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} />
              <InputField label="Password" type="password" value={formData.password} onChange={(v) => setFormData({ ...formData, password: v })} />
              <InputField label="Confirm Password" type="password" value={formData.confirmPassword} onChange={(v) => setFormData({ ...formData, confirmPassword: v })} />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                />
                <Label>I accept terms and conditions</Label>
              </div>

              <Button type="submit" className="w-full h-12">
                Sign Up
              </Button>

              <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full h-12">
                Retour
              </Button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-accent font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---------- Petit composant input réutilisable ---------- */
function InputField({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="h-12" />
    </div>
  )
}
