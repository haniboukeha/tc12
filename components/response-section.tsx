"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

interface SatisfactionData {
  rating: number
  feedback: string
  timestamp: Date
  ticketId?: string
}

export function ResponseSection() {
  const [rating, setRating] = useState<number | null>(null)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const [status, setStatus] = useState<"thinking" | "complete">("thinking")
  const [feedback, setFeedback] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleRatingClick = (star: number) => {
    setRating(star)
  }

  const handleSubmitFeedback = () => {
    if (rating === null) {
      alert("Veuillez sélectionner une note avant de soumettre")
      return
    }

    const data: SatisfactionData = {
      rating,
      feedback,
      timestamp: new Date(),
      // ticketId will be added when connected to backend
    }

    console.log("[v0] Complete satisfaction data for backend:", data)
    setIsSubmitted(true)

    // TODO: Send to backend when ready
    // Example: await fetch('/api/satisfaction', { method: 'POST', body: JSON.stringify(data) })
  }

  return (
    <div className="mt-16 space-y-8">
      {status === "thinking" && (
        <div className="flex items-center gap-2 text-gray-500">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
          <span>AI is thinking…</span>
        </div>
      )}

      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-foreground">Response</h4>
        <Card className="p-6 bg-muted/30">
          <p className="text-muted-foreground">Solution for your problem</p>
        </Card>
      </div>

      <div className="space-y-6">
        <p className="text-lg font-medium text-foreground text-center">
          How was your satisfaction with the response ??
        </p>

        <Textarea
          placeholder="Solution for your problem"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="min-h-[120px] bg-muted/30 border-none resize-none"
          disabled={isSubmitted}
        />

        <div className="flex items-center justify-center gap-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingClick(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(null)}
              className="transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Rate ${star} stars`}
              disabled={isSubmitted}
            >
              <Star
                className={`h-12 w-12 transition-all ${
                  (hoveredStar !== null && star <= hoveredStar) ||
                  (hoveredStar === null && rating !== null && star <= rating)
                    ? "fill-yellow-400 text-yellow-500 drop-shadow-md"
                    : "fill-gray-300 text-gray-400 stroke-[1.5]"
                }`}
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <Button
            onClick={handleSubmitFeedback}
            disabled={isSubmitted}
            className="px-8 py-2 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            {isSubmitted ? "Feedback Submitted" : "Submit Feedback"}
          </Button>
        </div>

        {isSubmitted && (
          <p className="text-center text-sm text-green-600 mt-4">
            Merci pour votre retour ! Votre évaluation de {rating} {rating === 1 ? "étoile" : "étoiles"} a été
            enregistrée.
          </p>
        )}
      </div>
    </div>
  )
}
