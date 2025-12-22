"use client"

import { Clock, RotateCcw, List, Search, AlignJustify, X, RotateCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"

export default function TicketDashboard() {
  const [showCreateTicket, setShowCreateTicket] = useState(false)
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null)
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null)
  const [searchProblems, setSearchProblems] = useState("")
  const [searchTickets, setSearchTickets] = useState("")

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

  const tickets = [
    { id: 3, title: "Feature Request", info: "#3 • Feature • 2025-01-13", status: "pending" },
    { id: 2, title: "Billing Question", info: "#2 • Billing • 2025-01-14", status: "resolved" },
    { id: 1, title: "Login Issue", info: "#1 • Technical • 2025-01-15", status: "in-progress" },
  ]

  const handleSubmitTicket = () => {
    console.log("Ticket created:", ticketForm)
    setShowCreateTicket(false)
    setTicketForm({ subject: "", category: "", description: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Image src="/doxa-logo.png" alt="Doxa" width={160} height={40} className="h-8 w-auto" priority />
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#statistiques"
                className="text-primary font-medium hover:text-primary/80 transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("statistiques")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Statistiques
              </a>
              <a
                href="#problemes"
                className="text-muted-foreground font-medium hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("problemes")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Problèmes fréquents
              </a>
              <a
                href="#historique"
                className="text-muted-foreground font-medium hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("historique")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Historique des tickets
              </a>
              <a
                href="#notification"
                className="text-muted-foreground font-medium hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("notification")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Notification
              </a>
            </nav>

            <Button
              onClick={() => setShowCreateTicket(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
            >
              <span className="mr-2">+</span>
              Créer un ticket
            </Button>
          </div>
        </div>
      </header>

      {showCreateTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">Créer un nouveau ticket</h2>
            <p className="text-muted-foreground mb-8">
              Remplissez les informations ci-dessous et nous vous répondrons dans les plus brefs délais.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-foreground font-medium mb-3">Sujet</label>
                <Input
                  placeholder="Brève description de votre problème"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  className="bg-muted border-none rounded-xl h-12"
                />
              </div>

              <div>
                <label className="block text-foreground font-medium mb-3">Catégorie</label>
                <select
                  value={ticketForm.category}
                  onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                  className="w-full bg-muted border-none rounded-xl h-12 px-4 text-foreground"
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="Technical">Technical</option>
                  <option value="Billing">Billing</option>
                  <option value="Feature">Feature</option>
                </select>
              </div>

              <div>
                <label className="block text-foreground font-medium mb-3">Description</label>
                <textarea
                  placeholder="Fournissez des informations détaillées sur votre problème..."
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                  className="w-full bg-muted border-none rounded-xl p-4 min-h-[200px] resize-none text-foreground"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button
                  onClick={handleSubmitTicket}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-12 h-12 flex-1"
                >
                  Envoyer le ticket
                </Button>
                <Button
                  onClick={() => setShowCreateTicket(false)}
                  variant="outline"
                  className="rounded-xl px-12 h-12 flex-1"
                >
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Statistics Section */}
        <section id="statistiques" className="mb-16">
          <h1 className="text-4xl font-bold text-primary mb-8">Statistiques</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stat-card rounded-[2rem] p-8 flex items-center justify-between">
              <div>
                <p className="text-stat-text text-sm font-medium mb-2">Ticket en cours de traitement</p>
                <p className="text-5xl font-bold text-stat-number">2</p>
              </div>
              <Clock className="w-12 h-12 text-stat-icon" />
            </div>

            <div className="bg-stat-card rounded-[2rem] p-8 flex items-center justify-between">
              <div>
                <p className="text-stat-text text-sm font-medium mb-2">Ticket traité</p>
                <p className="text-5xl font-bold text-stat-number">8</p>
              </div>
              <RotateCcw className="w-12 h-12 text-stat-icon" />
            </div>

            <div className="bg-stat-card rounded-[2rem] p-8 flex items-center justify-between">
              <div>
                <p className="text-stat-text text-sm font-medium mb-2">Tout ticket</p>
                <p className="text-5xl font-bold text-stat-number">10</p>
              </div>
              <List className="w-12 h-12 text-stat-icon" />
            </div>
          </div>
        </section>

        {/* Frequent Problems Section */}
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
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  /
                </kbd>
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
                      onClick={() => setSelectedProblem(selectedProblem === problem.id ? null : problem.id)}
                      className="bg-problem-view-bg hover:bg-problem-view-bg/80 text-problem-view-text rounded-2xl px-8"
                    >
                      {selectedProblem === problem.id ? "Fermer" : "Voir"}
                    </Button>
                  </div>

                  {selectedProblem === problem.id && (
                    <div className="bg-muted rounded-2xl p-6 mt-2 ml-4">
                      <h4 className="font-semibold text-foreground mb-2">Détails du problème</h4>
                      <p className="text-muted-foreground mb-4">
                        Ce problème a été signalé {problem.count} fois par différents utilisateurs. Notre équipe
                        technique travaille activement sur une résolution.
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

        {/* Ticket History Section */}
        <section id="historique">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-primary">Historique des tickets</h2>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  value={searchTickets}
                  onChange={(e) => setSearchTickets(e.target.value)}
                  className="pl-10 pr-12 bg-search-bg border-none rounded-xl w-64"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  /
                </kbd>
              </div>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <AlignJustify className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {tickets
              .filter((t) => t.title.toLowerCase().includes(searchTickets.toLowerCase()))
              .map((ticket) => (
                <div key={ticket.id}>
                  <div
                    onClick={() => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)}
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
                        Description complète du ticket et de son évolution. Le ticket est actuellement en statut{" "}
                        <strong>{ticket.status}</strong>.
                      </p>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Date de création:</strong> {ticket.info.split("•")[2]?.trim()}
                        </p>
                        <p>
                          <strong>Assigné à:</strong> Équipe de support
                        </p>
                        <p>
                          <strong>Dernière mise à jour:</strong> Il y a 2 heures
                        </p>
                      </div>
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
