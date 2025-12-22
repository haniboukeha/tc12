"use client"

interface FormInputProps {
  id: string
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}

export default function FormInput({ id, label, type, placeholder, value, onChange, required = false }: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent"
      />
    </div>
  )
}
