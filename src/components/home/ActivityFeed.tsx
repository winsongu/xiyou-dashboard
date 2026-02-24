import { activityLogs } from "@/data/activity";
import Link from "next/link";

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function getActionClass(type: string): string {
  const map: Record<string, string> = {
    success: "terminal-action-success",
    warning: "terminal-action-warning",
    error: "terminal-action-error",
    info: "terminal-action-info",
  };
  return map[type] ?? "terminal-action-info";
}

export default function ActivityFeed() {
  const recentLogs = activityLogs.slice(0, 8);

  return (
    <section className="px-4 sm:px-6 mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-bold text-ink">⚡ 实时活动</h2>
          <Link
            href="/workshop"
            className="text-xs text-sky font-bold hover:underline"
          >
            查看工坊 →
          </Link>
        </div>

        <div className="terminal-feed max-h-[320px]">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-3 py-2 bg-ink border-b border-[#3a3a3a]">
            <span className="w-3 h-3 rounded-full bg-fire" />
            <span className="w-3 h-3 rounded-full bg-gold" />
            <span className="w-3 h-3 rounded-full bg-jade" />
            <span className="text-xs text-ink-muted ml-2 font-mono">
              openclaw-activity-feed — bash
            </span>
          </div>

          {/* Log Lines */}
          <div className="p-2">
            {recentLogs.map((log) => (
              <div key={log.id} className="terminal-line flex gap-2 py-1">
                <span className="terminal-timestamp whitespace-nowrap">
                  [{formatTime(log.timestamp)}]
                </span>
                <span className="terminal-agent whitespace-nowrap">
                  {log.agentEmoji} {log.agent}
                </span>
                <span className={`${getActionClass(log.type)} font-bold`}>
                  {log.action}
                </span>
                {log.detail && (
                  <span className="text-[#aaa] truncate">{log.detail}</span>
                )}
              </div>
            ))}
            <div className="terminal-line py-1">
              <span className="text-jade animate-cursor">▌</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
