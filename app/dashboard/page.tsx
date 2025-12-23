"use client"

import {
  Clock,
  RotateCcw,
  List,
  X,
  RotateCw,
  Check,
  Send,
  User,
  Settings,
  LogOut,
  Search,
  AlignJustify,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function TicketDashboard() {
  const router = useRouter()

  const [showCreateTicket, setShowCreateTicket] = useState(false)
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null)
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null)
  const [searchProblems, setSearchProblems] = useState("")
  const [searchTickets, setSearchTickets] = useState("")
  const [showInbox, setShowInbox] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const [currentUser, setCurrentUser] = useState<{ name: string; email: string }>({
    name: "Admin User",
    email: "admin@doxa.com",
  })

  const [currentUserTickets, setCurrentUserTickets] = useState([
    { id: 3, title: "Feature Request", info: "#3 • Feature • 2025-01-13", status: "pending" },
    { id: 2, title: "Billing Question", info: "#2 • Billing • 2025-01-14", status: "resolved" },
    { id: 1, title: "Login Issue", info: "#1 • Technical • 2025-01-15", status: "in-progress" },
  ])

  const [currentUserInbox, setCurrentUserInbox] = useState([
    { id: 1, subject: "Login Problem", client: "John Doe", createdAt: "2025-01-15", priority: "Haute" },
    { id: 2, subject: "Payment issue", client: "Jane Doe", createdAt: "2025-01-14", priority: "Moyenne" },
    { id: 3, subject: "Feature request", client: "Alice", createdAt: "2025-01-13", priority: "Basse" },
  ])

  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    description: "",
  })

  const problems = [
    { id: 1, count: 45, title: "Login authentication timeout", category: "Technical" },
    { id: 2, count: 93, title: "Payment processing delays", category: "Billing" },
    { id: 3, count: 10, title: "Mobile app crashes on startup", category: "Technical" },
  ]

  const handleSubmitTicket = () => {
    const newTicket = {
      id: currentUserTickets.length + 1,
      title: ticketForm.subject || "New Ticket",
      info: `#${currentUserTickets.length + 1} • ${ticketForm.category} • ${new Date()
        .toISOString()
        .slice(0, 10)}`,
      status: "pending",
    }
    setCurrentUserTickets([newTicket, ...currentUserTickets])
    setShowCreateTicket(false)
    setTicketForm({ subject: "", category: "", description: "" })
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <header className="border-b border-border bg-card relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Image src="/doxa-logo.png" alt="Doxa" width={160} height={40} className="h-8 w-auto" priority />
              <nav className="hidden md:flex items-center gap-8">
                {["Statistiques", "Problèmes fréquents", "Historique des tickets", "Notification"].map(
                  (label, idx) => (
                    <a
                      key={idx}
                      href={`#${label.replace(/\s/g, "").toLowerCase()}`}
                      className="text-muted-foreground font-medium hover:text-foreground transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                        document
                          .getElementById(label.replace(/\s/g, "").toLowerCase())
                          ?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      {label}
                    </a>
                  ),
                )}
              </nav>
            </div>

            <div className="flex items-center gap-4 relative">
              <Button
                onClick={() => setShowInbox(!showInbox)}
                className="text-indigo-600 hover:text-indigo-700 transition-colors"
                variant="ghost"
              >
                <Send className="h-5 w-5" />
              </Button>

              <Button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="text-indigo-600 hover:text-indigo-700 transition-colors"
                variant="ghost"
              >
                <User className="h-5 w-5" />
              </Button>

              <Link href="/createTicket">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                  <span className="mr-2">+</span> Créer un ticket
                </Button>
              </Link>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-gray-200 bg-white shadow-xl">
                  <div className="border-b border-gray-200 p-4">
                    <p className="font-semibold text-gray-900">{currentUser.name}</p>
                    <p className="text-sm text-gray-600">{currentUser.email}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => {
                        setCurrentUser({ name: "", email: "" })
                        router.push("/profile")
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-black-600 transition-colors hover:bg-black-50"
                    >
                      
                      <span>profile</span>
                    </button>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={() => {
                        setCurrentUser({ name: "", email: "" })
                        router.push("/")
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-red-600 transition-colors hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Se déconnecter</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Statistics */}
        <section id="statistiques" className="mb-16">
          <h1 className="text-4xl font-bold text-primary mb-8">Statistiques</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stat-card rounded-[2rem] p-8 flex items-center justify-between">
              <div>
                <p className="text-stat-text text-sm font-medium mb-2">Ticket en cours de traitement</p>
                <p className="text-5xl font-bold text-stat-number">
                  {currentUserTickets.filter((t) => t.status === "in-progress").length}
                </p>
              </div>
              <Clock className="w-12 h-12 text-stat-icon" />
            </div>
            <div className="bg-stat-card rounded-[2rem] p-8 flex items-center justify-between">
              <div>
                <p className="text-stat-text text-sm font-medium mb-2">Ticket traité</p>
                <p className="text-5xl font-bold text-stat-number">
                  {currentUserTickets.filter((t) => t.status === "resolved").length}
                </p>
              </div>
              <RotateCcw className="w-12 h-12 text-stat-icon" />
            </div>
            <div className="bg-stat-card rounded-[2rem] p-8 flex items-center justify-between">
              <div>
                <p className="text-stat-text text-sm font-medium mb-2">Tout ticket</p>
                <p className="text-5xl font-bold text-stat-number">{currentUserTickets.length}</p>
              </div>
              <List className="w-12 h-12 text-stat-icon" />
            </div>
          </div>
        </section>

        {/* Frequent Problems */}
        <section id="problemes" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-primary">Problèmes fréquents</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  value={searchProblems}
                  onChange={(e) => setSearchProblems(e.target.value)}
                  className="pl-10 pr-12 bg-search-bg border-none rounded-xl w-64"
                />
              </div>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <AlignJustify className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {problems
              .filter((p) => p.title.toLowerCase().includes(searchProblems.toLowerCase()))
              .map((problem) => (
                <div key={problem.id}>
                  <div className="bg-problem-card rounded-[2rem] p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="bg-problem-badge rounded-2xl w-16 h-16 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">{problem.count}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{problem.title}</h3>
                        <p className="text-sm text-muted-foreground">{problem.category}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() =>
                        setSelectedProblem(selectedProblem === problem.id ? null : problem.id)
                      }
                      className="bg-problem-view-bg hover:bg-problem-view-bg/80 text-problem-view-text rounded-2xl px-8"
                    >
                      {selectedProblem === problem.id ? "Fermer" : "Voir"}
                    </Button>
                  </div>
                  {selectedProblem === problem.id && (
                    <div className="bg-muted rounded-2xl p-6 mt-2 ml-4">
                      <h4 className="font-semibold text-foreground mb-2">Détails du problème</h4>
                      <p className="text-muted-foreground mb-4">
                        Ce problème a été signalé {problem.count} fois par différents utilisateurs.
                      </p>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Catégorie:</strong> {problem.category}
                        </p>
                        <p>
                          <strong>Priorité:</strong> Haute
                        </p>
                        <p>
                          <strong>Statut:</strong> En cours de résolution
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </section>

        {/* Ticket History */}
        <section id="historique">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-primary">Historique des tickets</h2>
          </div>

          <div className="space-y-4">
            {currentUserTickets
              .filter((t) => t.title.toLowerCase().includes(searchTickets.toLowerCase()))
              .map((ticket) => (
                <div key={ticket.id}>
                  <div
                    onClick={() =>
                      setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)
                    }
                    className="bg-problem-card rounded-[2rem] p-6 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-2xl w-16 h-16 flex items-center justify-center ${
                          ticket.status === "pending"
                            ? "bg-pending-icon"
                            : ticket.status === "resolved"
                            ? "bg-resolved-icon"
                            : "bg-progress-icon"
                        }`}
                      >
                        {ticket.status === "pending" && <X className="w-8 h-8 text-white" />}
                        {ticket.status === "resolved" && <RotateCw className="w-8 h-8 text-white" />}
                        {ticket.status === "in-progress" && <Check className="w-8 h-8 text-white" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{ticket.title}</h3>
                        <p className="text-sm text-muted-foreground">{ticket.info}</p>
                      </div>
                    </div>
                    <span
                      className={`px-6 py-2 rounded-full text-sm font-medium ${
                        ticket.status === "pending"
                          ? "bg-pending-badge text-pending-text"
                          : ticket.status === "resolved"
                          ? "bg-resolved-badge text-resolved-text"
                          : "bg-progress-badge text-progress-text"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  {selectedTicket === ticket.id && (
                    <div className="bg-muted rounded-2xl p-6 mt-2 ml-4">
                      <h4 className="font-semibold text-foreground mb-2">Détails du ticket</h4>
                      <p className="text-muted-foreground mb-4">
                        Description complète du ticket et de son évolution. Statut: <strong>{ticket.status}</strong>.
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  )
}
