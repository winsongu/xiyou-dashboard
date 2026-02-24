import { kanbanItems, kanbanStats, getStatusCount } from "@/data/kanban";
import type { KanbanStatus } from "@/lib/types";

const statusColumns: { status: KanbanStatus; emoji: string; color: string }[] =
  [
    { status: "待领取", emoji: "📥", color: "bg-paper-dark" },
    { status: "生产中", emoji: "⚡", color: "bg-sky/20" },
    { status: "待审", emoji: "🔍", color: "bg-gold/20" },
    { status: "已通过", emoji: "✅", color: "bg-jade/20" },
    { status: "打回", emoji: "🔙", color: "bg-fire/20" },
    { status: "升级", emoji: "⬆️", color: "bg-purple/20" },
  ];

function getVerdictBadge(verdict?: string) {
  if (!verdict) return null;
  const map: Record<string, { label: string; cls: string }> = {
    PASS: { label: "PASS", cls: "badge-pass" },
    POLISH: { label: "POLISH", cls: "badge-upgrade" },
    REVISE: { label: "REVISE", cls: "badge-review" },
    REJECT: { label: "REJECT", cls: "badge-reject" },
  };
  const v = map[verdict];
  if (!v) return null;
  return <span className={`badge-pixel ${v.cls} text-[10px]`}>{v.label}</span>;
}

export default function KanbanPage() {
  const counts = getStatusCount();

  return (
    <div className="min-h-screen bg-paper py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-ink flex items-center gap-2">
              📋 生产看板
            </h1>
            <p className="text-sm text-ink-muted mt-1">
              {kanbanStats.date} · 立项 {kanbanStats.topicsProposed} · 通过{" "}
              {kanbanStats.topicsPassed}
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex gap-2">
            <div className="card-brutal px-3 py-2 text-center">
              <div className="text-lg font-bold text-jade">
                {kanbanStats.avgQuality}
              </div>
              <div className="text-[10px] text-ink-muted font-bold">
                均质量分
              </div>
            </div>
            <div className="card-brutal px-3 py-2 text-center">
              <div className="text-lg font-bold text-sky">
                {kanbanStats.avgHumanizer}
              </div>
              <div className="text-[10px] text-ink-muted font-bold">
                均去味分
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {statusColumns.map((col) => {
            const items = kanbanItems.filter((i) => i.status === col.status);
            return (
              <div key={col.status} className="flex flex-col">
                {/* Column Header */}
                <div
                  className={`card-brutal ${col.color} px-3 py-2 mb-3 flex items-center justify-between`}
                >
                  <span className="font-bold text-sm">
                    {col.emoji} {col.status}
                  </span>
                  <span className="badge-pixel text-[10px]">
                    {counts[col.status] || 0}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <div key={item.id} className="card-brutal p-3">
                      {/* Platform & Agent */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg">{item.platformEmoji}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm">{item.agentEmoji}</span>
                          <span className="text-[10px] font-bold text-ink-light">
                            {item.agent}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-xs text-ink leading-snug mb-2 line-clamp-3">
                        {item.title}
                      </h3>

                      {/* Scores */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                        <span className="text-ink-muted">
                          B:{item.briefScore}
                        </span>
                        {item.qualityScore && (
                          <span
                            className={
                              item.qualityScore >= 85
                                ? "text-jade font-bold"
                                : item.qualityScore >= 70
                                ? "text-gold-dark"
                                : "text-fire"
                            }
                          >
                            Q:{item.qualityScore}
                          </span>
                        )}
                        {item.humanizerScore && (
                          <span className="text-sky">
                            H:{item.humanizerScore}
                          </span>
                        )}
                        {getVerdictBadge(item.reviewVerdict)}
                      </div>
                    </div>
                  ))}

                  {items.length === 0 && (
                    <div className="text-center text-xs text-ink-muted py-8 border-2 border-dashed border-ink/10 rounded">
                      暂无内容
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
