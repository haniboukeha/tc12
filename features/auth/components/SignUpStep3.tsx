"use client"

import type { FormEvent } from "react"
import CodeInput from "@/components/form/CodeInput"
import PrimaryButton from "@/components/buttons/PrimaryButton"

interface SignUpStep3Props {
  code: string[]
  onCodeChange: (code: string[]) => void
  onConfirm: () => void
}

export default function SignUpStep3({ code, onCodeChange, onConfirm }: SignUpStep3Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (code.some((digit) => !digit.trim())) {
      alert("Please enter the complete confirmation code")
      return
    }
    onConfirm()
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-700">Username</label>
      </div>

      <CodeInput code={code} onChange={onCodeChange} length={6} />

      <PrimaryButton type="submit">Confirmer</PrimaryButton>
    </form>
  )
}
