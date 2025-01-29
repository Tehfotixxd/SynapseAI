import { motion, AnimatePresence } from "framer-motion"

export default function AIAssistant({ response }: { response: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-2 cyberpunk-text ai-text">SynapseAI Output</h2>
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card p-4 rounded-lg cyberpunk-border"
          >
            <span className="cyberpunk-text ai-text">$ {response}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

