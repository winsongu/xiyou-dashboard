import { intelItems, sourceStatuses } from "@/data/intel";

function ScoreBar({ value, max = 10 }: { value: number; max?: number }) {
  const pct = (value / max) * 100;
  return (
    <div className="progress-pixel w-16">
      <div
        className="progress-pixel-fill"
        style={{
          width: `${pct}%`,
          background:
            value >= 8
              ? "var(--color-jade)"
              : value >= 5
              ? "var(--color-gold)"
              : "var(--color-fire)",
        }}
      />
    </div>
  );
}

function PlatformStars({ count }: { count: number }) {
  return (
    <span className="text-[10px]">
      {"⭐".repeat(count)}
      {"☆".repeat(5 - count)}
    </span>
  );
}

export default function IntelPage() {
  return (
    <div className="min-h-screen bg-paper py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-ink flex items-center gap-2">
            👂 情报站
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            谛听日报 · TOP 10 选题 · R/Q/T 三维评分
          </p>
        </div>

        {/* TOP 10 Table */}
        <div className="card-brutal overflow-hidden mb-8">
          <div className="bg-gold px-4 py-3 border-b-3 border-ink">
            <h2 className="font-bold text-sm flex items-center gap-2 text-ink">
              🏆 谛听日报 TOP 10 — 2025-02-23
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-ink/10 bg-paper-dark">
                  <th className="text-left px-4 py-2 text-xs font-bold text-ink-muted">
                    #
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-bold text-ink-muted">
                    选题
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-bold text-ink-muted">
                    信源
                  </th>
                  <th className="text-center px-4 py-2 text-xs font-bold text-ink-muted">
                    R
                  </th>
                  <th className="text-center px-4 py-2 text-xs font-bold text-ink-muted">
                    Q
                  </th>
                  <th className="text-center px-4 py-2 text-xs font-bold text-ink-muted">
                    T
                  </th>
                  <th className="text-center px-4 py-2 text-xs font-bold text-ink-muted">
                    总分
                  </th>
                  <th className="text-center px-4 py-2 text-xs font-bold text-ink-muted">
                    Brief
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-bold text-ink-muted">
                    平台适配
                  </th>
                </tr>
              </thead>
              <tbody>
                {intelItems.map((item, idx) => (
                  <tr
                    key={item.rank}
                    className={`border-b border-ink/5 hover:bg-gold/5 transition-colors ${
                      idx < 3 ? "bg-gold/5" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-sm border-2 border-ink ${
                          idx === 0
                            ? "bg-gold text-ink"
                            : idx === 1
                            ? "bg-paper-dark text-ink"
                            : idx === 2
                            ? "bg-[#cd7f32] text-white"
                            : "bg-white text-ink-light"
                        }`}
                      >
                        {item.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-ink text-xs leading-snug max-w-xs">
                        {item.title}
                      </div>
                      <span className="text-[10px] text-ink-muted">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs">
                        {item.sourceEmoji} {item.source}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-mono font-bold">
                          {item.score.R}
                        </span>
                        <ScoreBar value={item.score.R} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-mono font-bold">
                          {item.score.Q}
                        </span>
                        <ScoreBar value={item.score.Q} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-mono font-bold">
                          {item.score.T}
                        </span>
                        <ScoreBar value={item.score.T} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`text-sm font-bold font-mono ${
                          item.score.total >= 27
                            ? "text-jade"
                            : item.score.total >= 24
                            ? "text-gold-dark"
                            : "text-ink-light"
                        }`}
                      >
                        {item.score.total}/30
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.briefGenerated ? (
                        <span className="badge-pixel badge-pass text-[10px]">
                          ✓
                        </span>
                      ) : (
                        <span className="text-ink-muted text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5 text-[10px]">
                        <div className="flex items-center gap-1">
                          <span>📕</span>
                          <PlatformStars count={item.platformFit.xhs} />
                        </div>
                        <div className="flex items-center gap-1">
                          <span>💬</span>
                          <PlatformStars count={item.platformFit.wx} />
                        </div>
                        <div className="flex items-center gap-1">
                          <span>💎</span>
                          <PlatformStars count={item.platformFit.zhihu} />
                        </div>
                        <div className="flex items-center gap-1">
                          <span>🎬</span>
                          <PlatformStars count={item.platformFit.video} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Source Status */}
        <div className="card-brutal overflow-hidden">
          <div className="bg-ink text-jade px-4 py-3 border-b-3 border-ink">
            <h2 className="font-bold text-sm font-mono flex items-center gap-2">
              📡 信源状态
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
            {sourceStatuses.map((source) => (
              <div
                key={source.name}
                className={`card-brutal p-3 flex items-center justify-between ${
                  source.status === "error" ? "bg-fire/5" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`status-dot ${
                      source.status === "online"
                        ? "status-dot-online"
                        : source.status === "error"
                        ? "status-dot-error"
                        : "status-dot-idle"
                    }`}
                  />
                  <div>
                    <div className="font-bold text-xs">
                      {source.emoji} {source.name}
                    </div>
                    <div className="text-[10px] text-ink-muted font-mono">
                      耗时 {source.duration}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-mono text-ink">
                    {source.articlesFound}
                  </div>
                  <div className="text-[10px] text-ink-muted">篇</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
