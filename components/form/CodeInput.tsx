"use client"

import { useRef, type KeyboardEvent } from "react"

interface CodeInputProps {
  code: string[]
  onChange: (code: string[]) => void
  length?: number
}

export default function CodeInput({ code, onChange, length = 6 }: CodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    onChange(newCode)

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleCodeKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex justify-center gap-3">
      {code.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleCodeChange(index, e.target.value)}
          onKeyDown={(e) => handleCodeKeyDown(index, e)}
          className="w-12 h-14 bg-gray-50 border border-gray-200 rounded-lg text-center text-xl font-medium text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
          placeholder="#"
        />
      ))}
    </div>
  )
}
