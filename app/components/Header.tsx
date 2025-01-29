import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Send } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-background border-b border-primary/20">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold cyberpunk-text ai-text">SynapseAI</div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild className="cyberpunk-text hover:bg-primary/20">
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild className="cyberpunk-text hover:bg-primary/20">
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" asChild className="cyberpunk-text hover:bg-primary/20">
              <Link href="/contact">Contact</Link>
            </Button>
            <a
              href="https://github.com/Tehfotixxd/SynapseAI"
              target="_blank"
              rel="noopener noreferrer"
              className="cyberpunk-text hover:text-secondary"
            >
              <Github size={24} />
            </a>
            <a
              href="https://t.me/SynapseAIPortal"
              target="_blank"
              rel="noopener noreferrer"
              className="cyberpunk-text hover:text-secondary"
            >
              <Send size={24} />
            </a>
            <a
              href="https://x.com/synapseAISolana"
              target="_blank"
              rel="noopener noreferrer"
              className="cyberpunk-text hover:text-secondary"
            >
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

