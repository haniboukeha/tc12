"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)

  const services = [
    {
      title: "BUSINESS & OPÉRATIONS",
      icon: "💼",
      items: [
        "Gestion de Projets",
        "Collaboration & Communication",
        "Gestion de Documents",
      ],
    },
    {
      title: "JURIDIQUE",
      icon: "⚖️",
      items: [
        "Gestion de Contrats",
        "Gestion de Pratique Légale",
        "Conformité & Gestion des Risques",
      ],
    },
    {
      title: "VENTES & MARKETING",
      icon: "📈",
      items: [
        "Automatisation Marketing",
        "Email Marketing",
        "Gestion des Réseaux Sociaux",
      ],
    },
  ]

  const nextService = () => {
    setActiveServiceIndex((prev) => (prev + 1) % services.length)
  }

  const prevService = () => {
    setActiveServiceIndex((prev) => (prev - 1 + services.length) % services.length)
  }

  const scrollToContact = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    e.preventDefault()
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-[#DEE6FC]">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-[#DEE6FC] px-6 py-4 flex items-center justify-between max-w-7xl mx-auto z-50 shadow-sm">
        <img src="/doxa-logo-full.png" alt="Doxa" className="h-10 w-auto" />

        <nav className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-[#000050] font-bold hover:opacity-70">
            À propos
          </a>
          <a href="#services" className="text-[#000050] font-bold hover:opacity-70">
            Nos services
          </a>
          <a
            href="#contact"
            onClick={scrollToContact}
            className="text-[#000050] font-bold hover:opacity-70"
          >
            Nous contacter
          </a>
        </nav>

        {/* ✅ Bouton → app/page.tsx */}
        <Link href="/">
          <Button className="bg-[#1A1B5D] hover:bg-[#252675] text-white rounded-xl px-8">
            S'inscrire
          </Button>
        </Link>
      </header>

      {/* HERO */}
      <section className="px-6 pt-32 pb-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="/hero-illustration.png"
            alt="Doxa illustration"
            className="w-full h-auto"
          />

          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-[#000050]">Doxa</h1>
            <p className="text-[#000050] leading-relaxed">
              Doxa simplifie la gestion de projets collaboratifs en temps réel.
            </p>

            <Button
              onClick={scrollToContact}
              className="bg-[#1A1B5D] hover:bg-[#252675] text-white rounded-xl px-8"
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#000050] mb-12">
          NOS SERVICES
        </h2>

        <div className="flex items-center gap-4">
          <button onClick={prevService}>
            <ChevronLeft className="text-[#000050]" />
          </button>

          <div className="flex-1 overflow-hidden">
            <div
              className="flex transition-transform duration-300 gap-4"
              style={{ transform: `translateX(-${activeServiceIndex * 100}%)` }}
            >
              {services.map((service, i) => (
                <Card
                  key={i}
                  className="min-w-full p-6 bg-white/60 rounded-3xl"
                >
                  <h3 className="font-bold text-[#000050] mb-2">
                    {service.icon} {service.title}
                  </h3>

                  <ul className="space-y-1">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="text-[#000050] text-sm">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          <button onClick={nextService}>
            <ChevronRight className="text-[#000050]" />
          </button>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-16 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#000050] mb-12">
          NOUS CONTACTER
        </h2>
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#000050]">
              Nom complet
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1B5D]"
              placeholder="Votre nom"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#000050]">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1B5D]"
              placeholder="Votre email"
            />
          </div>

          <div className="space-y-2">
            <label  className="block text-sm font-medium text-[#000050]">
              Message
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1B5D]"
              rows={4}
              placeholder="Votre message"
            />
          </div>

          <Button
            type="submit"
            className="bg-[#1A1B5D] hover:bg-[#252675] text-white rounded-xl px-8"
          >
            Envoyer
          </Button>
        </form>
      </section>
    </div>
  )
}
