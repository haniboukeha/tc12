import Image from "next/image"

export function DoxaLogo() {
  return (
    <div className="flex items-center justify-center mb-8">
      <Image src="/doxa-logo.png" alt="Doxa" width={200} height={60} priority className="object-contain" />
    </div>
  )
}
