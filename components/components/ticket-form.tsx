"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function TicketForm() {
  const [subject, setSubject] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  return (
    <Card className="p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-foreground mb-6">Votre ticket</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium text-foreground">
            Sujet
          </Label>
          <Input
            id="subject"
            placeholder="Brève description du problème"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="bg-muted/50 border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium text-foreground">
            Catégorie
          </Label>
          <Input
            id="category"
            placeholder="une catégorie selectionnée"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-muted/50 border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-foreground">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Des informations détaillées sur le problème..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-muted/50 border-border min-h-[180px] resize-none"
          />
        </div>
      </div>
    </Card>
  )
}
