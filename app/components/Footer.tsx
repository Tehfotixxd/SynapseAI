export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-6 border-t border-primary/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold cyberpunk-text ai-text">SynapseAI</h3>
            <p className="text-sm text-muted-foreground">Advanced Crypto Intelligence and 3D Visualization</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="cyberpunk-text hover:text-secondary">
              Terms
            </a>
            <a href="#" className="cyberpunk-text hover:text-secondary">
              Privacy
            </a>
            <a href="#" className="cyberpunk-text hover:text-secondary">
              Security
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <span className="cyberpunk-text">$</span> echo "
          <span className="cyberpunk-text ai-text">© {new Date().getFullYear()} SynapseAI. All rights reserved.</span>"
        </div>
      </div>
    </footer>
  )
}

