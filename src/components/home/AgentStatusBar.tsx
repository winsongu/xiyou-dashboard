import { agents } from "@/data/agents";
import Link from "next/link";

export default function AgentStatusBar() {
  return (
    <section className="px-4 sm:px-6 mb-8 overflow-visible">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-bold text-ink">👥 编队状态</h2>
          <Link
            href="/team"
            className="text-xs text-sky font-bold hover:underline"
          >
            查看全部 →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pb-1 pr-1">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="card-brutal p-3 text-center group cursor-pointer"
            >
              {/* Avatar */}
              <div className="relative inline-block mb-2">
                <span className="text-3xl">{agent.emoji}</span>
                <span
                  className={`
                    absolute -bottom-0.5 -right-0.5
                    status-dot
                    ${agent.status === "active" ? "status-dot-online" : ""}
                    ${agent.status === "idle" ? "status-dot-idle" : ""}
                    ${agent.status === "error" ? "status-dot-error" : ""}
                  `}
                />
              </div>

              {/* Name & Role */}
              <div className="font-bold text-sm text-ink">{agent.name}</div>
              <div className="text-[10px] text-ink-muted truncate">
                {agent.platform || agent.role.split("·")[0]}
              </div>

              {/* HP Bar */}
              <div className="mt-2">
                <div className="progress-pixel">
                  <div
                    className="progress-pixel-fill"
                    style={{
                      width: `${agent.hp}%`,
                      background:
                        agent.hp > 70
                          ? "var(--color-jade)"
                          : agent.hp > 40
                          ? "var(--color-gold)"
                          : "var(--color-fire)",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[9px] font-mono text-ink-muted">
                    HP
                  </span>
                  <span className="text-[9px] font-mono text-ink-muted">
                    {agent.hp}%
                  </span>
                </div>
              </div>

              {/* Today Stats */}
              <div className="mt-1 text-[10px] font-mono text-ink-light">
                今日: {agent.stats.tasksToday} 篇
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
