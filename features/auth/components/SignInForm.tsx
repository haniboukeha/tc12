"use client"

import { useState, type FormEvent } from "react"
import FormInput from "@/components/form/FormInput"
import PrimaryButton from "@/components/buttons/PrimaryButton"
import GoogleButton from "./GoogleButton"
import type { SignInFormData } from "../types/auth.types"

interface SignInFormProps {
  onSubmit: (data: SignInFormData) => void
  onGoogleSignIn: () => void
}

export default function SignInForm({ onSubmit, onGoogleSignIn }: SignInFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password")
      return
    }
    onSubmit({ username, password })
  }

  return (
    <>
      <GoogleButton onClick={onGoogleSignIn} text="Sign up with Google" />

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <FormInput
          id="username"
          label="Username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={setUsername}
          required
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="••••••"
          value={password}
          onChange={setPassword}
          required
        />

        <PrimaryButton type="submit">Sign In</PrimaryButton>
      </form>

      <p className="text-sm text-gray-500">
        Already dont have an account?{" "}
        <a href="/sign-up" className="text-[#4285F4] hover:underline">
          Sign up
        </a>
      </p>
    </>
  )
}
