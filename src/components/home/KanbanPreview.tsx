import { kanbanItems } from "@/data/kanban";
import Link from "next/link";

function getStatusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    已通过: "badge-pass",
    待审: "badge-review",
    生产中: "badge-wip",
    打回: "badge-reject",
    待领取: "badge-pending",
    升级: "badge-upgrade",
  };
  return map[status] ?? "badge-pending";
}

function getVerdictLabel(verdict?: string): string | null {
  if (!verdict) return null;
  const map: Record<string, string> = {
    PASS: "✅ PASS",
    POLISH: "🔧 POLISH",
    REVISE: "📝 REVISE",
    REJECT: "❌ REJECT",
  };
  return map[verdict] ?? verdict;
}

export default function KanbanPreview() {
  // Show latest 6 items
  const previewItems = kanbanItems.slice(0, 6);

  return (
    <section className="px-4 sm:px-6 mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-bold text-ink">📋 看板速览</h2>
          <Link
            href="/kanban"
            className="text-xs text-sky font-bold hover:underline"
          >
            查看全部 →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {previewItems.map((item) => (
            <div key={item.id} className="card-brutal p-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span
                  className={`badge-pixel ${getStatusBadgeClass(item.status)}`}
                >
                  {item.status}
                </span>
                <span className="text-lg">{item.platformEmoji}</span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-sm text-ink leading-snug mb-3 line-clamp-2">
                {item.title}
              </h3>

              {/* Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{item.agentEmoji}</span>
                  <span className="text-xs font-bold text-ink-light">
                    {item.agent}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
                  <span>Brief: {item.briefScore}/30</span>
                  {item.qualityScore && (
                    <span
                      className={
                        item.qualityScore >= 85
                          ? "text-jade"
                          : item.qualityScore >= 70
                          ? "text-gold-dark"
                          : "text-fire"
                      }
                    >
                      Q:{item.qualityScore}
                    </span>
                  )}
                </div>
              </div>

              {/* Verdict */}
              {item.reviewVerdict && (
                <div className="mt-2 pt-2 border-t-2 border-dashed border-ink/10">
                  <span className="text-xs font-mono font-bold">
                    {getVerdictLabel(item.reviewVerdict)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
