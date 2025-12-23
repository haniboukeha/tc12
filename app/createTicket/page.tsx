import { Header } from "@/components/header"
import { TicketForm } from "@/components/ticket-form"
import { ResponseSection } from "@/components/response-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <TicketForm />
        <ResponseSection />
      </main>
    </div>
  )
}
