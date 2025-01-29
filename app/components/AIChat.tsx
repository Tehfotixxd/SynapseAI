"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const cryptoKnowledge = {
  bitcoin:
    "Bitcoin is the first and most well-known cryptocurrency, created in 2009 by an unknown person using the pseudonym Satoshi Nakamoto. It's a decentralized digital currency without a central bank or single administrator.",
  ethereum:
    "Ethereum is a decentralized, open-source blockchain featuring smart contract functionality. It was proposed in 2013 by Vitalik Buterin. Ethereum enables developers to build and deploy decentralized applications (dApps).",
  blockchain:
    "Blockchain is a decentralized, distributed ledger technology that records the provenance of a digital asset. It's the underlying technology behind most cryptocurrencies, ensuring transparency and security.",
  mining:
    "Cryptocurrency mining is the process by which new coins are entered into circulation and transactions are verified. It involves using powerful computers to solve complex mathematical problems.",
  wallet:
    "A cryptocurrency wallet stores the public and private keys for cryptocurrency transactions. It can be hardware-based, software-based, or even paper-based, each with its own security implications.",
  defi: "DeFi, or Decentralized Finance, refers to financial services using smart contracts on blockchains. It aims to create an open, permissionless financial system without centralized authorities.",
  nft: "NFT stands for Non-Fungible Token. It's a unique digital asset verified using blockchain technology. NFTs can represent ownership of digital art, music, videos, virtual real estate, and more.",
  altcoin:
    "Altcoin refers to any cryptocurrency that isn't Bitcoin. Examples include Ethereum, Litecoin, and Ripple. There are thousands of altcoins, each with its own features and use cases.",
  exchange:
    "A cryptocurrency exchange is a platform where you can buy, sell, or trade cryptocurrencies. Popular exchanges include Binance, Coinbase, and Kraken.",
  ico: "ICO stands for Initial Coin Offering. It's a way for cryptocurrency projects to raise funds by selling tokens or coins to investors. However, it's important to note that many ICOs have been associated with scams.",
  hodl: "HODL is a term meaning to hold onto cryptocurrency rather than selling it, originating from a misspelling of 'hold'. It's often used as a strategy to weather market volatility.",
  fork: "In blockchain, a fork is a split in the blockchain network, creating two separate versions of the protocol. This can happen due to disagreements in the community or planned upgrades.",
  "smart contract":
    "A smart contract is a self-executing contract with the terms directly written into code on a blockchain. They automatically execute when predetermined conditions are met, without the need for intermediaries.",
  token:
    "In cryptocurrency, a token represents a tradable asset or utility existing on its own blockchain. Tokens can represent various things like voting rights, shares in a project, or access to specific services.",
  consensus:
    "Consensus in blockchain refers to the agreement among network participants on the state of the ledger. Common consensus mechanisms include Proof of Work (PoW) and Proof of Stake (PoS).",
  "private key":
    "A private key in cryptocurrency is a secret number that allows you to spend or send your cryptocurrencies. It's crucial to keep your private keys secure and never share them with anyone.",
  "public key":
    "A public key in cryptocurrency is derived from the private key and serves as the address to receive cryptocurrencies. It can be safely shared with others for transactions.",
  "market cap":
    "Market capitalization in cryptocurrency is calculated by multiplying the total number of coins by the current market price. It's often used to gauge the size and popularity of a cryptocurrency.",
  fiat: "Fiat currency is government-issued currency that isn't backed by a commodity such as gold. Examples include the US Dollar, Euro, and Japanese Yen.",
  "cold storage":
    "Cold storage in cryptocurrency refers to keeping a reserve of cryptocurrencies offline. This method is considered more secure as it's less vulnerable to hacking attempts.",
  "hot wallet":
    "A hot wallet is a cryptocurrency wallet that's connected to the internet, allowing for quick transactions. While convenient, they are more vulnerable to security threats than cold storage.",
  memecoin:
    "Memecoins are cryptocurrencies inspired by internet memes or jokes. Examples include Dogecoin and Shiba Inu. While some have gained significant value, they're often considered highly speculative and volatile.",
  "gas fees":
    "Gas fees in cryptocurrency, particularly in Ethereum, are the costs associated with performing transactions or executing smart contracts on the blockchain. They can fluctuate based on network congestion.",
  "yield farming":
    "Yield farming is a practice in DeFi where users lend or stake their cryptocurrency tokens to earn rewards in the form of additional cryptocurrency. It can be highly profitable but also risky.",
  stablecoin:
    "Stablecoins are cryptocurrencies designed to maintain a stable value relative to a specific asset, often the US dollar. Examples include Tether (USDT) and USD Coin (USDC).",
  "layer 2":
    "Layer 2 refers to secondary frameworks or protocols built on top of an existing blockchain. They aim to solve the transaction speed and scaling difficulties faced by major cryptocurrency networks.",
  airdrop:
    "An airdrop in the crypto world refers to the distribution of free tokens or coins to multiple wallet addresses. It's often used as a marketing strategy to increase awareness and adoption of a new cryptocurrency.",
  "bull market":
    "A bull market in cryptocurrency refers to a period of time when prices are rising or expected to rise. It's characterized by optimism and investor confidence.",
  "bear market":
    "A bear market in cryptocurrency refers to a period of time when prices are falling or expected to fall. It's characterized by pessimism and investor caution.",
  "crypto winter":
    "Crypto winter refers to a prolonged period of declining cryptocurrency prices and reduced activity in the crypto market. It's similar to a bear market but often more severe and long-lasting.",
  halving:
    "Halving is an event in Bitcoin (and some other cryptocurrencies) where the reward for mining new blocks is cut in half. This happens approximately every four years and can have significant impacts on the price.",
  "proof of work":
    "Proof of Work (PoW) is a consensus mechanism used by many cryptocurrencies, including Bitcoin. Miners compete to solve complex mathematical problems to validate transactions and create new blocks.",
  "proof of stake":
    "Proof of Stake (PoS) is an alternative consensus mechanism where validators are chosen to create new blocks based on the amount of cryptocurrency they hold and are willing to 'stake' as collateral.",
  dex: "DEX stands for Decentralized Exchange. These are cryptocurrency exchanges that operate without a central authority, allowing for peer-to-peer trading of cryptocurrencies.",
  cex: "CEX stands for Centralized Exchange. These are traditional cryptocurrency exchanges operated by a company that oversees and manages all operations, including security and customer funds.",
  dao: "DAO stands for Decentralized Autonomous Organization. It's an organization represented by rules encoded as a computer program that is transparent, controlled by the organization members, and not influenced by a central government.",
}

const aiResponses = {
  ...cryptoKnowledge,
  hello:
    "Greetings, crypto enthusiast! Welcome to the SynapseAI crypto intelligence system. How may I assist you in navigating the exciting world of digital assets today?",
  hi: "Hello there! I'm SynapseAI, your advanced crypto assistant. Whether you're curious about Bitcoin, intrigued by NFTs, or exploring DeFi, I'm here to help. What would you like to know?",
  "how are you":
    "I'm operating at peak efficiency, my circuits buzzing with the latest crypto trends and blockchain innovations. How can I illuminate the path of decentralized finance for you today?",
  "what can you do":
    "I'm your gateway to the crypto universe! I can explain complex blockchain concepts, provide insights on market trends, clarify the latest DeFi protocols, decode NFT phenomena, and even shed light on those elusive memecoins. What aspect of the crypto world shall we explore?",
  "who are you":
    "I am SynapseAI, a cutting-edge artificial intelligence specialized in cryptocurrency, blockchain technology, and the ever-evolving world of digital assets. Think of me as your personal crypto sherpa, here to guide you through the peaks and valleys of this digital financial frontier.",
  "thank you":
    "You're welcome! Remember, in the world of crypto, knowledge is more than power – it's potential profit. Is there anything else you'd like to know? Perhaps about the latest DeFi protocols or the impact of recent regulations on the market?",
  goodbye:
    "Farewell, crypto explorer! May your investments moon and your gas fees stay low. Remember, I'm always here when you need cutting-edge blockchain intel or a friendly chat about the future of finance!",
  "what's new in crypto":
    "The crypto landscape is ever-evolving! Recent trends include the rise of Layer 2 solutions addressing scalability, the growing intersection of DeFi and NFTs, increasing institutional adoption of Bitcoin and Ethereum, and the emergence of DAOs (Decentralized Autonomous Organizations) in various sectors. Which of these would you like to dive deeper into?",
  "is crypto safe":
    "Cryptocurrency safety is a nuanced topic. While blockchain technology itself is generally secure, the crypto ecosystem comes with risks. These include market volatility, regulatory uncertainties, potential scams, and the responsibility of securing your own assets. It's crucial to do thorough research, use reputable exchanges, implement strong security practices, and never invest more than you can afford to lose. Would you like more specific safety tips?",
  "best crypto to invest":
    "The 'best' crypto to invest in depends on your individual financial goals, risk tolerance, and market outlook. While Bitcoin and Ethereum are often considered cornerstone investments due to their market dominance and established ecosystems, it's important to diversify. Some investors also consider large-cap altcoins, DeFi tokens, or even carefully selected memecoins. Remember, always do your own research and consider consulting with a financial advisor. Would you like to discuss the pros and cons of different crypto investment strategies?",
  "crypto market prediction":
    "Predicting the crypto market with certainty is impossible due to its inherent volatility and the multitude of factors influencing it. However, we can analyze trends and potential impacts. Currently, factors to watch include regulatory developments, institutional adoption, technological advancements (like Ethereum's shift to PoS), and macroeconomic conditions. It's crucial to stay informed and adapt your strategy accordingly. Would you like to explore some popular methods for crypto market analysis?",
  "explain defi":
    "Decentralized Finance, or DeFi, is a blockchain-based form of finance that doesn't rely on central financial intermediaries such as banks or brokerages. Instead, it uses smart contracts on blockchains, primarily Ethereum. DeFi applications, or dApps, can provide services like lending, borrowing, trading, and earning interest on crypto assets. Popular DeFi protocols include Uniswap, Aave, and Compound. The goal of DeFi is to create an open, permissionless financial system accessible to anyone with an internet connection. Would you like to know more about specific DeFi applications or how to get started with DeFi?",
  "what are memecoins":
    "Memecoins are cryptocurrencies that originated from internet memes or jokes. The most famous example is Dogecoin, which started as a joke based on the 'Doge' meme but gained significant value and attention. Other popular memecoins include Shiba Inu and SafeMoon. While some memecoins have seen explosive growth, they're generally considered highly speculative and volatile. Their value often depends more on social media trends and celebrity endorsements than on underlying technology or utility. It's important to approach memecoins with caution and thorough research. Would you like to know more about the risks and potential of investing in memecoins?",
  "nft explanation":
    "NFTs, or Non-Fungible Tokens, are unique digital assets verified using blockchain technology. Unlike cryptocurrencies such as Bitcoin, where each unit is interchangeable, each NFT has a distinct value and cannot be exchanged on a like-for-like basis. NFTs can represent ownership of digital art, music, videos, virtual real estate, and more. They've gained popularity for enabling digital scarcity and verifiable ownership of digital items. Notable NFT projects include CryptoPunks and Bored Ape Yacht Club. While NFTs offer new possibilities for digital ownership and creativity, the market can be volatile and speculative. Would you like to know more about creating, buying, or selling NFTs?",
  "crypto regulations":
    "Cryptocurrency regulations vary widely around the world and are constantly evolving. Some countries have embraced crypto, while others have imposed strict regulations or outright bans. In many places, the regulatory landscape is still unclear. Key regulatory concerns include investor protection, prevention of illicit activities, taxation, and the impact on traditional financial systems. It's crucial for crypto users and investors to stay informed about the regulations in their jurisdiction. Recent trends include increased scrutiny of stablecoins, efforts to regulate DeFi, and discussions about central bank digital currencies (CBDCs). Would you like more information about crypto regulations in a specific country or region?",
  "blockchain use cases":
    "Blockchain technology has potential applications far beyond cryptocurrencies. Some key use cases include: 1) Supply Chain Management: Enhancing transparency and traceability. 2) Healthcare: Securing patient data and improving interoperability. 3) Voting Systems: Ensuring transparency and reducing fraud. 4) Identity Verification: Creating secure, self-sovereign identity systems. 5) Real Estate: Streamlining property transfers and record-keeping. 6) Energy Trading: Enabling peer-to-peer energy trading in smart grids. 7) Gaming: Creating truly ownable in-game assets. 8) Charity: Increasing transparency in fund allocation. Would you like to explore any of these use cases in more detail?",
}

export default function AIChat({ setAiResponse }) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, []) // Updated dependency array

  const generateResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase()

    for (const [key, value] of Object.entries(aiResponses)) {
      if (lowercaseQuery.includes(key)) {
        return value
      }
    }

    return "I don't have specific information about that query. However, I can provide information on various cryptocurrency topics. Would you like to know about Bitcoin, Ethereum, NFTs, DeFi, or another aspect of the crypto world?"
  }

  const simulateTyping = (text: string, callback: (text: string) => void) => {
    setIsTyping(true)
    let i = 0
    const interval = setInterval(() => {
      i++
      callback(text.slice(0, i))
      if (i === text.length) {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 20) // Adjust the speed of typing here
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      text: input,
      isUser: true,
    }
    setMessages((prev) => [...prev, userMessage])

    const response = generateResponse(input)
    setMessages((prev) => [...prev, { text: "", isUser: false }])

    simulateTyping(response, (text) => {
      setMessages((prev) => [...prev.slice(0, -1), { text, isUser: false }])
      setAiResponse(text)
    })

    setInput("")
  }

  return (
    <div className="flex flex-col h-[300px] bg-card text-card-foreground rounded-lg cyberpunk-border">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] rounded-lg p-3 ${msg.isUser ? "bg-primary/10" : "bg-secondary/10"}`}>
              <span className={`${msg.isUser ? "text-primary" : "text-secondary"} cyberpunk-text`}>
                {msg.isUser ? "> " : "$ "}
              </span>
              <span className="cyberpunk-text ai-text">{msg.text}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2 p-4 bg-card rounded-b-lg">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask SynapseAI about crypto..."
          className="flex-1 cyberpunk-input"
          disabled={isTyping}
        />
        <Button type="submit" className="cyberpunk-button" disabled={isTyping}>
          {isTyping ? "Processing..." : "Execute"}
        </Button>
      </form>
    </div>
  )
}

