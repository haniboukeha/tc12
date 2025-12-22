"use client"

import AuthLayout from "@/components/layout/AuthLayout"
import SignInForm from "@/features/auth/components/SignInForm"
import type { SignInFormData } from "@/features/auth/types/auth.types"

export default function SignInPage() {
  const handleSignIn = (data: SignInFormData) => {
    console.log("Sign in attempted with:", data)
  }

  const handleGoogleSignIn = () => {
    console.log("Google sign in clicked")
  }

  return (
    <AuthLayout title="Sign In" subtitle="Create a account to continue">
      <SignInForm onSubmit={handleSignIn} onGoogleSignIn={handleGoogleSignIn} />
    </AuthLayout>
  )
}
