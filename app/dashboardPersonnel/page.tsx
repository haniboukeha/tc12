"use client"

import { AlertCircle, Send, User, Search, AlertTriangle, X, CheckCircle, Inbox, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

type Ticket = {
  id: string
  subject: string
  category: string
  priority: string
  createdAt: string
  client: string
  assignedTo: string
  status: string
  description: string
}

const sampleTickets: Ticket[] = [
  {
    id: "1042",
    subject: "Problème de facturation — double prélèvement",
    category: "Facturation",
    priority: "Haute",
    createdAt: "22/12/2025 à 14:12",
    client: "Amine B.",
    assignedTo: "Sarah K. (Agent support)",
    status: "Traité",
    description: `Bonjour,

J'ai constaté un double prélèvement de 49,99 € sur mon abonnement Pro pour le mois de décembre.

Les deux paiements ont été effectués à des dates différentes mais concernent le même service, sans modification ni renouvellement de l'abonnement de mon côté.

Je vous remercie de bien vouloir vérifier cette situation et de procéder au remboursement du montant prélevé en trop.

Vous trouverez en pièces jointes la facture ainsi que le relevé bancaire correspondant.

Cordialement,`,
  },
  {
    id: "421",
    subject: "Question sur la facturation",
    category: "Facturation",
    priority: "Moyenne",
    createdAt: "23/12/2025 à 10:30",
    client: "Jean Dupont",
    assignedTo: "Marc L. (Agent support)",
    status: "En cours",
    description: `Bonjour,

Je souhaiterais obtenir des précisions sur ma dernière facture.

Pourriez-vous m'expliquer les différents postes facturés ?

Merci d'avance.`,
  },
  {
    id: "392",
    subject: "Problème de connexion",
    category: "Technique",
    priority: "Haute",
    createdAt: "23/12/2025 à 09:15",
    client: "Marie Martin",
    assignedTo: "Sophie R. (Agent technique)",
    status: "En attente",
    description: `Bonjour,

Depuis ce matin, je ne parviens plus à me connecter à mon compte.

Le message d'erreur indique "Identifiants incorrects" alors que je suis certain d'utiliser les bons identifiants.

Pouvez-vous m'aider ?

Cordialement,`,
  },
  {
    id: "345",
    subject: "Demande de fonctionnalité",
    category: "Amélioration",
    priority: "Basse",
    createdAt: "22/12/2025 à 16:45",
    client: "Pierre Leclerc",
    assignedTo: "Non assigné",
    status: "Nouveau",
    description: `Bonjour,

Serait-il possible d'ajouter une fonction d'export en PDF ?

Cela faciliterait grandement mon travail quotidien.

Merci pour votre considération.`,
  },
]

export default function TicketDashboard() {
  const [showInbox, setShowInbox] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center">
                <Image src="/doxa-logo.png" alt="Doxa" width={120} height={40} className="h-8 w-auto" />
              </div>
              <nav className="flex items-center gap-6">
                <button
                  onClick={() => scrollToSection("tickets-non-traites")}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Tickets non traités
                </button>
                <button
                  onClick={() => scrollToSection("tickets-traites")}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Tickets traités
                </button>
                <button
                  onClick={() => scrollToSection("notification")}
                  className="relative text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Notification
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-4 relative">
              <button
                onClick={() => setShowInbox(!showInbox)}
                className="text-indigo-600 hover:text-indigo-700 transition-colors"
                aria-label="Message inbox"
              >
                <Send className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="text-indigo-600 hover:text-indigo-700 transition-colors"
                aria-label="Profile menu"
              >
                <User className="h-5 w-5" />
              </button>

              {showInbox && (
                <div className="absolute right-0 top-12 z-50 w-[500px] rounded-2xl border border-gray-200 bg-white shadow-xl">
                  <div className="border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Inbox className="h-5 w-5 text-indigo-600" />
                        <h3 className="font-semibold text-gray-900">Message Inbox</h3>
                      </div>
                      <button onClick={() => setShowInbox(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto p-6">
                    <div className="space-y-3">
                      {sampleTickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          onClick={() => setSelectedTicket(ticket)}
                          className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:bg-indigo-50 hover:border-indigo-300"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-indigo-600">#{ticket.id}</span>
                                <span
                                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                    ticket.priority === "Haute"
                                      ? "bg-red-100 text-red-700"
                                      : ticket.priority === "Moyenne"
                                        ? "bg-orange-100 text-orange-700"
                                        : "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  {ticket.priority}
                                </span>
                              </div>
                              <p className="mt-1 font-medium text-gray-900">{ticket.subject}</p>
                              <p className="mt-1 text-xs text-gray-600">Client: {ticket.client}</p>
                              <p className="mt-0.5 text-xs text-gray-500">{ticket.createdAt}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {showProfileMenu && (
                <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-gray-200 bg-white shadow-xl">
                  <div className="border-b border-gray-200 p-4">
                    <p className="font-semibold text-gray-900">Admin User</p>
                    <p className="text-sm text-gray-600">admin@doxa.com</p>
                  </div>
                  <div className="p-2">
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-gray-700 transition-colors hover:bg-gray-100">
                      <User className="h-4 w-4" />
                      <span>Mon profil</span>
                    </button>
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-gray-700 transition-colors hover:bg-gray-100">
                      <Settings className="h-4 w-4" />
                      <span>Paramètres</span>
                    </button>
                    <hr className="my-2 border-gray-200" />
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-red-600 transition-colors hover:bg-red-50">
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

      <main className="container mx-auto px-6 py-8">
        {selectedTicket && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelectedTicket(null)}
          >
            <div
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-gray-900">Ticket #{selectedTicket.id} — Vue détaillée</h2>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="rounded-2xl bg-gray-100 p-6">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">Informations générales</h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex gap-2">
                      <span className="font-medium">Sujet :</span>
                      <span>{selectedTicket.subject}</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">Catégorie :</span>
                      <span>{selectedTicket.category}</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">Priorité :</span>
                      <span>{selectedTicket.priority}</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">Créé le :</span>
                      <span>{selectedTicket.createdAt}</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">Client :</span>
                      <span>{selectedTicket.client}</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">Assigné à :</span>
                      <span>{selectedTicket.assignedTo}</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">État actuel :</span>
                      <span>{selectedTicket.status}</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-gray-100 p-6">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">Description</h3>
                  <div className="whitespace-pre-line text-gray-800 leading-relaxed">{selectedTicket.description}</div>
                </div>

                <div className="flex gap-4 justify-end">
                  <Button
                    onClick={() => setSelectedTicket(null)}
                    className="rounded-lg bg-gray-200 px-6 text-gray-700 hover:bg-gray-300"
                  >
                    Fermer
                  </Button>
                  <Button className="rounded-lg bg-indigo-600 px-6 text-white hover:bg-indigo-700">
                    Traiter le ticket
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Section */}
        <section id="notification" className="mb-12 scroll-mt-24">
          <h2 className="mb-6 text-3xl font-bold text-indigo-600">Notification</h2>
          <div className="space-y-4 rounded-3xl bg-gray-100 p-8">
            {[
              { text: "L'IA n'a pas pu traiter le ticket n°4 – Litige de facturation", time: "Il y a 2 minutes" },
              { text: "L'IA a besoin de clarifications pour le ticket n°5", time: "Il y a 50 minutes" },
              { text: "Ticket prioritaire élevé n°6 en attente de réponse", time: "Il y a 1 heure" },
            ].map((notification, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-2xl border border-gray-300 bg-gray-200 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-500 bg-white">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{notification.text}</p>
                    <p className="text-sm text-gray-600">{notification.time}</p>
                  </div>
                </div>
                <Button className="rounded-lg bg-red-400 px-6 text-white hover:bg-red-500">Traité</Button>
              </div>
            ))}
          </div>
        </section>

        {/* Tickets non traités Section */}
        <section id="tickets-non-traites" className="mb-12 scroll-mt-24">
          <h2 className="mb-6 text-3xl font-bold text-indigo-600">Tickets non traités</h2>
          <div className="flex gap-6">
            <div className="flex w-72 flex-col items-center justify-center rounded-3xl bg-indigo-100 p-8">
              <p className="mb-2 text-sm font-medium text-gray-700">Tickets non traités</p>
              <div className="flex items-center gap-4">
                <span className="text-7xl font-bold text-indigo-600">20</span>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-red-500 bg-white">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-3 rounded-3xl bg-indigo-100 p-6 max-h-64 overflow-y-auto">
              {sampleTickets
                .filter(
                  (ticket) =>
                    ticket.status === "Nouveau" || ticket.status === "En cours" || ticket.status === "En attente",
                )
                .map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className="flex items-center gap-3 text-sm cursor-pointer hover:bg-indigo-200 rounded-lg p-2 transition-colors"
                  >
                    <div className="h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Ticket prioritaire élevé n°{ticket.id} en attente de réponse
                      </p>
                      <p className="text-xs text-gray-600">{ticket.createdAt}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Tickets traités Section */}
        <section id="tickets-traites" className="mb-12 scroll-mt-24">
          <h2 className="mb-6 text-3xl font-bold text-indigo-600">Tickets traités</h2>
          <div className="grid grid-cols-3 gap-6">
            {sampleTickets
              .filter((ticket) => ticket.status === "Traité" || ticket.status === "En attente")
              .map((ticket, i) => {
                const Icon = ticket.priority === "Haute" ? AlertCircle : CheckCircle
                const isPending = ticket.status === "En attente"
                return (
                  <div key={i} className="rounded-3xl bg-indigo-100 p-8 text-center">
                    <p className="text-5xl font-bold text-indigo-600">{ticket.id}</p>
                    <p className="mt-2 text-sm font-medium text-gray-700">{ticket.status}</p>
                    <Icon className="h-6 w-6 text-gray-900 mt-4" />
                  </div>
                )
              })}
          </div>
        </section>

        {/* Historique des tickets Section */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-indigo-600">Historique des tickets</h2>
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="h-9 w-full rounded-full border border-gray-300 bg-gray-100 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
          <div className="space-y-4">
            {sampleTickets.map((ticket, i) => {
              const Icon = ticket.priority === "Haute" ? AlertCircle : CheckCircle
              const isPending = ticket.status === "En attente"
              return (
                <div
                  key={i}
                  onClick={() => setSelectedTicket(ticket)}
                  className="flex items-center justify-between rounded-2xl border border-gray-300 bg-gray-100 p-4 cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${isPending ? "bg-red-400" : "bg-green-400"}`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{ticket.subject}</p>
                      <p className="text-sm text-gray-600">{ticket.id}</p>
                    </div>
                  </div>
                  <Button
                    className={`rounded-full px-6 ${
                      isPending
                        ? "bg-red-400 text-white hover:bg-red-500"
                        : "bg-green-400 text-white hover:bg-green-500"
                    }`}
                  >
                    {isPending ? "pending" : "in-progress"}
                  </Button>
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
