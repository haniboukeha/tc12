"use client"

import type { FormEvent } from "react"
import FormInput from "@/components/form/FormInput"
import PrimaryButton from "@/components/buttons/PrimaryButton"
import type { SignUpStep1Data } from "../types/auth.types"

interface SignUpStep1Props {
  data: SignUpStep1Data
  onDataChange: (data: Partial<SignUpStep1Data>) => void
  onNext: () => void
}

export default function SignUpStep1({ data, onDataChange, onNext }: SignUpStep1Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!data.nom.trim() || !data.prenom.trim() || !data.telephone.trim()) {
      alert("Please fill in all fields")
      return
    }
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
      <FormInput
        id="nom"
        label="Nom"
        type="text"
        placeholder="ghost"
        value={data.nom}
        onChange={(value) => onDataChange({ nom: value })}
        required
      />

      <FormInput
        id="prenom"
        label="Prenom"
        type="text"
        placeholder="hamad"
        value={data.prenom}
        onChange={(value) => onDataChange({ prenom: value })}
        required
      />

      <FormInput
        id="telephone"
        label="Numero de telephone"
        type="tel"
        placeholder="0555555555"
        value={data.telephone}
        onChange={(value) => onDataChange({ telephone: value })}
        required
      />

      <PrimaryButton type="submit">Next</PrimaryButton>
    </form>
  )
}
