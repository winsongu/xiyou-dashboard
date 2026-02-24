"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "首页", emoji: "🏠" },
  { href: "/kanban", label: "看板", emoji: "📋" },
  { href: "/intel", label: "情报站", emoji: "👂" },
  { href: "/workshop", label: "工坊", emoji: "⚒️" },
  { href: "/team", label: "团队", emoji: "👥" },
  { href: "/about", label: "关于", emoji: "📖" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-paper border-b-3 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl" role="img" aria-label="monkey">
              🐵
            </span>
            <span className="font-bold text-lg text-ink tracking-tight">
              西游编队
            </span>
            <span className="hidden sm:inline-block text-xs bg-gold text-ink px-2 py-0.5 border-2 border-ink font-bold rounded-sm shadow-brutal-sm">
              v0.1
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-1.5 px-3 py-2 text-sm font-bold
                    border-2 rounded-sm transition-all duration-100
                    ${
                      isActive
                        ? "bg-gold border-ink shadow-brutal-sm text-ink"
                        : "border-transparent text-ink-light hover:border-ink hover:bg-white hover:shadow-brutal-sm"
                    }
                  `}
                >
                  <span className="text-base">{item.emoji}</span>
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-ink-light">
            <span className="status-dot status-dot-online" />
            <span>系统正常</span>
            <span className="text-ink-muted">|</span>
            <span>8 Agents</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
