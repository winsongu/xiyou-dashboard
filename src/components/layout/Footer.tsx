export default function Footer() {
  return (
    <footer className="border-t-3 border-ink bg-paper-dark mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🐵</span>
            <span className="font-bold text-sm text-ink">西游编队</span>
            <span className="text-xs text-ink-muted">
              Powered by OpenClaw
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-ink-muted">
            <span>🏗️ Built with Next.js + Tailwind</span>
            <span>|</span>
            <span>📡 Mock Data v0.1</span>
            <span>|</span>
            <span>🎮 Pixel Art Style</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
