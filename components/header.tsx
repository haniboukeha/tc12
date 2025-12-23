import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Image from "next/image"

export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center">
              <Image src="/images/image.png" alt="Doxa" width={120} height={40} className="h-10 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/statistiques"
                className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                Statistiques
              </Link>
              <Link
                href="/problemes"
                className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                Problèmes fréquents
              </Link>
              <Link
                href="/historique"
                className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                Historique des tickets
              </Link>
              <Link
                href="/notification"
                className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                Notification
              </Link>
            </nav>
          </div>

          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
            <Plus className="h-4 w-4" />
            Créer un ticket
          </Button>
        </div>
      </div>
    </header>
  )
}
