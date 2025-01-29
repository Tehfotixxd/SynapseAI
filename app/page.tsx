"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import AIChat from "./components/AIChat"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Button } from "@/components/ui/button"
import AIAssistant from "./components/ai-assistant"

const Scene3D = dynamic(() => import("./components/Scene3D"), { ssr: false })

export default function Home() {
  const [showChat, setShowChat] = useState(false)
  const [aiResponse, setAiResponse] = useState("")
  const [chatInteraction, setChatInteraction] = useState(false)

  useEffect(() => {
    if (aiResponse) {
      setChatInteraction(true)
      const timer = setTimeout(() => setChatInteraction(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [aiResponse])

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center cyberpunk-text ai-text">
          SynapseAI: Advanced Crypto Intelligence
        </h1>
        <p className="text-xl mb-8 text-center cyberpunk-text ai-text">CA: TBA</p>
        <p className="text-center mb-8 cyberpunk-text">
          SynapseAI is an advanced artificial intelligence platform specialized in cryptocurrencies and blockchain
          technology. Designed to provide real-time analysis, market predictions, and education on crypto assets. As an
          open-source project, we invite developers from around the world to contribute and evolve this AI for the
          benefit of the crypto community.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden cyberpunk-border bg-card">
            <div className="p-4 h-[500px]">
              <Scene3D setAiResponse={setAiResponse} chatInteraction={chatInteraction} />
            </div>
          </div>
          <div className="rounded-lg overflow-hidden cyberpunk-border bg-card">
            <div className="p-4 h-[500px] flex flex-col">
              <AIAssistant response={aiResponse} />
              <div className="mt-auto">
                {showChat ? (
                  <AIChat setAiResponse={setAiResponse} />
                ) : (
                  <Button onClick={() => setShowChat(true)} className="w-full cyberpunk-button">
                    Initialize SynapseAI Chat
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

