import { workflowSteps, activityLogs } from "@/data/activity";

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

export default function WorkshopPage() {
  return (
    <div className="min-h-screen bg-paper py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-ink flex items-center gap-2">
            ⚒️ 工坊
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            内容生产流水线 · 实时活动监控
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Workflow Pipeline */}
          <div className="card-brutal overflow-hidden">
            <div className="bg-gold px-4 py-3 border-b-3 border-ink">
              <h2 className="font-bold text-sm text-ink">
                🔄 生产流水线
              </h2>
            </div>

            <div className="p-4">
              <div className="relative">
                {workflowSteps.map((step, idx) => (
                  <div key={step.id} className="flex gap-4 mb-4 last:mb-0">
                    {/* Step Connector */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-sm border-3 border-ink flex items-center justify-center text-lg shadow-brutal-sm ${
                          step.status === "completed"
                            ? "bg-jade text-white"
                            : step.status === "active"
                            ? "bg-gold text-ink animate-float"
                            : "bg-paper-dark text-ink-muted"
                        }`}
                      >
                        {step.agentEmoji}
                      </div>
                      {idx < workflowSteps.length - 1 && (
                        <div
                          className={`w-0.5 h-8 ${
                            step.status === "completed"
                              ? "bg-jade"
                              : "bg-ink/10"
                          }`}
                        />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-ink">
                          {step.name}
                        </h3>
                        <span
                          className={`badge-pixel text-[10px] ${
                            step.status === "completed"
                              ? "badge-pass"
                              : step.status === "active"
                              ? "badge-wip"
                              : "badge-pending"
                          }`}
                        >
                          {step.status === "completed"
                            ? "完成"
                            : step.status === "active"
                            ? "进行中"
                            : "待执行"}
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted mt-0.5">
                        {step.agent} · {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Terminal */}
          <div className="card-brutal overflow-hidden flex flex-col">
            <div className="bg-ink text-jade px-4 py-3 border-b border-[#3a3a3a]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-fire" />
                <span className="w-3 h-3 rounded-full bg-gold" />
                <span className="w-3 h-3 rounded-full bg-jade" />
                <span className="text-xs text-ink-muted ml-2 font-mono">
                  openclaw-activity-feed
                </span>
              </div>
            </div>

            <div className="terminal-feed flex-1 border-0 rounded-none min-h-[400px] max-h-[600px]">
              <div className="p-2">
                {activityLogs.map((log) => (
                  <div key={log.id} className="terminal-line flex gap-2 py-1.5">
                    <span className="terminal-timestamp whitespace-nowrap text-xs">
                      [{formatTime(log.timestamp)}]
                    </span>
                    <span className="terminal-agent whitespace-nowrap text-xs">
                      {log.agentEmoji} {log.agent}
                    </span>
                    <span
                      className={`${getActionClass(log.type)} font-bold text-xs`}
                    >
                      {log.action}
                    </span>
                    {log.detail && (
                      <span className="text-[#aaa] text-xs truncate">
                        {log.detail}
                      </span>
                    )}
                  </div>
                ))}
                <div className="terminal-line py-1">
                  <span className="text-jade animate-cursor">▌</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Summary */}
        <div className="mt-6 card-brutal p-6">
          <h2 className="font-bold text-lg text-ink mb-4 flex items-center gap-2">
            📊 今日概览
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="card-brutal p-4 text-center bg-jade/5">
              <div className="text-3xl font-bold text-jade font-mono">3</div>
              <div className="text-xs text-ink-muted font-bold mt-1">
                已通过
              </div>
            </div>
            <div className="card-brutal p-4 text-center bg-sky/5">
              <div className="text-3xl font-bold text-sky font-mono">3</div>
              <div className="text-xs text-ink-muted font-bold mt-1">
                生产中
              </div>
            </div>
            <div className="card-brutal p-4 text-center bg-gold/5">
              <div className="text-3xl font-bold text-gold-dark font-mono">
                1
              </div>
              <div className="text-xs text-ink-muted font-bold mt-1">
                待审核
              </div>
            </div>
            <div className="card-brutal p-4 text-center bg-fire/5">
              <div className="text-3xl font-bold text-fire font-mono">1</div>
              <div className="text-xs text-ink-muted font-bold mt-1">
                已打回
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
