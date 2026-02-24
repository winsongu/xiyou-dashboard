import { agents } from "@/data/agents";

function StatBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-mono text-ink-muted w-6">{label}</span>
      <div className="progress-pixel flex-1">
        <div
          className="progress-pixel-fill"
          style={{ width: `${(value / max) * 100}%`, background: color }}
        />
      </div>
      <span className="text-[10px] font-mono font-bold text-ink-light w-8 text-right">
        {value}
      </span>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-paper py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-ink flex items-center gap-2">
            👥 团队
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            西游编队 · 8 位 AI Agent · RPG 状态面板
          </p>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {agents.map((agent) => (
            <div key={agent.id} className="card-brutal overflow-hidden">
              {/* Card Header - Status Color */}
              <div
                className={`px-4 py-2 border-b-3 border-ink ${
                  agent.status === "active"
                    ? "bg-jade/20"
                    : agent.status === "idle"
                    ? "bg-gold/20"
                    : "bg-fire/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-ink-light">
                    {agent.title}
                  </span>
                  <span
                    className={`status-dot ${
                      agent.status === "active"
                        ? "status-dot-online"
                        : agent.status === "idle"
                        ? "status-dot-idle"
                        : "status-dot-error"
                    }`}
                  />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                {/* Avatar & Name */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-sm border-3 border-ink bg-paper-dark flex items-center justify-center text-3xl shadow-brutal-sm">
                    {agent.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-ink">{agent.name}</h3>
                    <p className="text-xs text-ink-muted">{agent.role}</p>
                  </div>
                </div>

                {/* HP / MP Bars */}
                <div className="space-y-1.5 mb-3">
                  <StatBar
                    label="HP"
                    value={agent.hp}
                    max={100}
                    color={
                      agent.hp > 70
                        ? "var(--color-jade)"
                        : agent.hp > 40
                        ? "var(--color-gold)"
                        : "var(--color-fire)"
                    }
                  />
                  <StatBar
                    label="MP"
                    value={agent.mp}
                    max={100}
                    color="var(--color-sky)"
                  />
                  <StatBar
                    label="EXP"
                    value={agent.exp % 1000}
                    max={1000}
                    color="var(--color-purple)"
                  />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="text-center bg-paper-dark rounded-sm px-2 py-1.5 border border-ink/10">
                    <div className="text-sm font-bold font-mono text-ink">
                      {agent.stats.tasksToday}
                    </div>
                    <div className="text-[9px] text-ink-muted">今日</div>
                  </div>
                  <div className="text-center bg-paper-dark rounded-sm px-2 py-1.5 border border-ink/10">
                    <div className="text-sm font-bold font-mono text-ink">
                      {agent.stats.tasksTotal}
                    </div>
                    <div className="text-[9px] text-ink-muted">累计</div>
                  </div>
                  <div className="text-center bg-paper-dark rounded-sm px-2 py-1.5 border border-ink/10">
                    <div className="text-sm font-bold font-mono text-jade">
                      {agent.stats.avgScore}
                    </div>
                    <div className="text-[9px] text-ink-muted">均分</div>
                  </div>
                  <div className="text-center bg-paper-dark rounded-sm px-2 py-1.5 border border-ink/10">
                    <div className="text-sm font-bold font-mono text-fire">
                      {agent.stats.streak}d
                    </div>
                    <div className="text-[9px] text-ink-muted">连续</div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1">
                  {agent.skills.map((skill) => (
                    <span
                      key={skill}
                      className="badge-pixel text-[9px] bg-paper-dark"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-[11px] text-ink-muted mt-3 leading-relaxed">
                  {agent.description}
                </p>

                {/* Meta */}
                <div className="mt-3 pt-2 border-t-2 border-dashed border-ink/10 flex items-center justify-between text-[10px] font-mono text-ink-muted">
                  <span>🤖 {agent.model}</span>
                  {agent.cronTime && <span>⏰ {agent.cronTime}</span>}
                  {agent.platform && <span>📱 {agent.platform}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Collaboration Matrix */}
        <div className="card-brutal overflow-hidden">
          <div className="bg-gold px-4 py-3 border-b-3 border-ink">
            <h2 className="font-bold text-sm text-ink">
              🔗 协作矩阵 · 谁把活交给谁
            </h2>
          </div>
          <div className="overflow-x-auto p-4">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left font-bold text-ink-muted">
                    →
                  </th>
                  {agents.map((a) => (
                    <th
                      key={a.id}
                      className="px-2 py-2 text-center font-bold"
                    >
                      <span className="text-lg">{a.emoji}</span>
                      <div className="text-[9px] text-ink-muted mt-0.5">
                        {a.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {agents.map((from) => (
                  <tr key={from.id} className="border-t border-ink/5">
                    <td className="px-2 py-2 font-bold">
                      <span className="text-lg">{from.emoji}</span>
                      <span className="text-[9px] text-ink-muted ml-1">
                        {from.name}
                      </span>
                    </td>
                    {agents.map((to) => {
                      // Define collaboration relationships
                      const collabMap: Record<string, string[]> = {
                        diting: ["tangseng"],
                        tangseng: [
                          "zhizhujing",
                          "taibai",
                          "nezha",
                          "wukong",
                        ],
                        zhizhujing: ["shaseng"],
                        taibai: ["shaseng"],
                        nezha: ["shaseng"],
                        wukong: ["shaseng"],
                        shaseng: ["erlangshen"],
                        erlangshen: ["tangseng"],
                      };
                      const hasRelation =
                        collabMap[from.id]?.includes(to.id) ?? false;

                      return (
                        <td
                          key={to.id}
                          className="px-2 py-2 text-center"
                        >
                          {from.id === to.id ? (
                            <span className="text-ink-muted">—</span>
                          ) : hasRelation ? (
                            <span className="inline-block w-6 h-6 rounded-sm bg-jade/20 border border-jade text-[10px] leading-6 font-bold text-jade">
                              ✓
                            </span>
                          ) : (
                            <span className="text-ink-muted/30">·</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
