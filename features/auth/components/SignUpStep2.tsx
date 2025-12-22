"use client"

import type { FormEvent } from "react"
import FormInput from "@/components/form/FormInput"
import PrimaryButton from "@/components/buttons/PrimaryButton"
import GoogleButton from "./GoogleButton"
import type { SignUpStep2Data } from "../types/auth.types"

interface SignUpStep2Props {
  data: SignUpStep2Data
  onDataChange: (data: Partial<SignUpStep2Data>) => void
  onNext: () => void
  onGoogleSignUp: () => void
}

export default function SignUpStep2({ data, onDataChange, onNext, onGoogleSignUp }: SignUpStep2Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!data.email.trim() || !data.username.trim() || !data.password.trim() || !data.confirmPassword.trim()) {
      alert("Please fill in all fields")
      return
    }
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    if (!data.acceptTerms) {
      alert("Please accept the terms and conditions")
      return
    }
    onNext()
  }

  return (
    <>
      <GoogleButton onClick={onGoogleSignUp} text="Sign up with Google" />

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        <FormInput
          id="email"
          label="Email address"
          type="email"
          placeholder="example@gmail.com"
          value={data.email}
          onChange={(value) => onDataChange({ email: value })}
          required
        />

        <FormInput
          id="username"
          label="Username"
          type="text"
          placeholder="Username"
          value={data.username}
          onChange={(value) => onDataChange({ username: value })}
          required
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="••••••"
          value={data.password}
          onChange={(value) => onDataChange({ password: value })}
          required
        />

        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••"
          value={data.confirmPassword}
          onChange={(value) => onDataChange({ confirmPassword: value })}
          required
        />

        <div className="flex items-center gap-2">
          <input
            id="terms"
            type="checkbox"
            checked={data.acceptTerms}
            onChange={(e) => onDataChange({ acceptTerms: e.target.checked })}
            className="w-4 h-4 text-[#4285F4] border-gray-300 rounded focus:ring-[#4285F4]"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I accept terms and conditions
          </label>
        </div>

        <PrimaryButton type="submit">Sign Up</PrimaryButton>
      </form>
    </>
  )
}
