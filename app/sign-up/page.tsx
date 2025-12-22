"use client"

import { useState } from "react"
import AuthLayout from "@/components/layout/AuthLayout"
import SignUpStep1 from "@/features/auth/components/SignUpStep1"
import SignUpStep2 from "@/features/auth/components/SignUpStep2"
import SignUpStep3 from "@/features/auth/components/SignUpStep3"
import type { SignUpStep1Data, SignUpStep2Data } from "@/features/auth/types/auth.types"

export default function SignUpPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)

  const [step1Data, setStep1Data] = useState<SignUpStep1Data>({
    nom: "",
    prenom: "",
    telephone: "",
  })

  const [step2Data, setStep2Data] = useState<SignUpStep2Data>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  const [confirmationCode, setConfirmationCode] = useState(["", "", "", "", "", ""])

  const handleGoogleSignUp = () => {
    console.log("Google sign up clicked")
  }

  const handleStep1Next = () => {
    console.log("Step 1 data:", step1Data)
    setStep(2)
  }

  const handleStep2Next = () => {
    console.log("Sign up data:", { ...step1Data, ...step2Data })
    setStep(3)
  }

  const handleConfirm = () => {
    console.log("Confirmation code:", confirmationCode.join(""))
  }

  return (
    <AuthLayout title="Create an Account" subtitle="Create a account to continue">
      {step === 1 && (
        <SignUpStep1
          data={step1Data}
          onDataChange={(data) => setStep1Data({ ...step1Data, ...data })}
          onNext={handleStep1Next}
        />
      )}

      {step === 2 && (
        <SignUpStep2
          data={step2Data}
          onDataChange={(data) => setStep2Data({ ...step2Data, ...data })}
          onNext={handleStep2Next}
          onGoogleSignUp={handleGoogleSignUp}
        />
      )}

      {step === 3 && (
        <SignUpStep3 code={confirmationCode} onCodeChange={setConfirmationCode} onConfirm={handleConfirm} />
      )}

      <p className="text-sm text-gray-500">
        Already have an account?{" "}
        <a href="/" className="text-[#4285F4] hover:underline">
          Login
        </a>
      </p>
    </AuthLayout>
  )
}
