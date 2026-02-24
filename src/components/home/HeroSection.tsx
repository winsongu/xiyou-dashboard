import { agents } from "@/data/agents";
import { kanbanStats } from "@/data/kanban";

export default function HeroSection() {
  const activeAgents = agents.filter((a) => a.status === "active").length;
  const totalAgents = agents.length;

  return (
    <section className="relative overflow-hidden bg-paper py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Card */}
        <div className="card-brutal-gold p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl animate-float">🐵</span>
                <h1
                  className="text-3xl sm:text-4xl font-bold text-ink"
                  style={{ fontFamily: "var(--font-pixel)" }}
                >
                  西游编队
                </h1>
              </div>
              <p className="text-ink-light text-lg font-medium mt-1">
                AI Agent 内容生产指挥部 · 7×24 自动化取经之路
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-3">
              <div className="card-brutal p-3 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-ink">
                  {activeAgents}/{totalAgents}
                </div>
                <div className="text-xs text-ink-muted font-bold">
                  在线 Agent
                </div>
              </div>
              <div className="card-brutal p-3 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-jade">
                  {kanbanStats.topicsPassed}
                </div>
                <div className="text-xs text-ink-muted font-bold">
                  今日通过
                </div>
              </div>
              <div className="card-brutal p-3 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-sky">
                  {kanbanStats.topicsProposed}
                </div>
                <div className="text-xs text-ink-muted font-bold">
                  今日立项
                </div>
              </div>
              <div className="card-brutal p-3 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-gold-dark">
                  {kanbanStats.avgQuality}
                </div>
                <div className="text-xs text-ink-muted font-bold">
                  平均质量
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pixel Divider */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-0.5 flex-1 bg-ink opacity-10" />
          <span className="text-xs font-mono text-ink-muted px-2">
            ▸ CRON 02:00 - 07:00 · 日常任务进行中
          </span>
          <div className="h-0.5 flex-1 bg-ink opacity-10" />
        </div>
      </div>
    </section>
  );
}
