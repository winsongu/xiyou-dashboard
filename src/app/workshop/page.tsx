"use client";

import { useState } from "react";
import { agents } from "@/data/agents";
import { activityLogs } from "@/data/activity";

// ─── Mock: Pending Decisions ───
const pendingDecisions = [
  {
    id: 1,
    urgency: "high",
    title: "蜘蛛精产出的小红书笔记与谛听 Brief 偏差较大",
    detail:
      "原 Brief 要求聚焦 MCP 协议开发者影响，但蜘蛛精改为种草向。需决定：按原 Brief 重写 or 批准种草角度？",
    agent: "蜘蛛精",
    agentEmoji: "🕷️",
    timestamp: "07:12",
    options: ["按 Brief 重写", "批准种草角度", "合并两个方向"],
  },
  {
    id: 2,
    urgency: "medium",
    title: "Gemini 2.5 Pro 选题与现有库存文章重复度 72%",
    detail:
      "谛听检测到选题 #4 与 3 天前已发布文章高度重叠。建议切换角度或放弃该选题。",
    agent: "谛听",
    agentEmoji: "👂",
    timestamp: "06:45",
    options: ["换角度重写", "放弃选题", "作为系列续篇"],
  },
  {
    id: 3,
    urgency: "low",
    title: "沙僧建议提升知乎回答的数据引用密度",
    detail:
      "最近 5 篇知乎回答的数据引用率低于目标（当前 2.3 处/千字 vs 目标 4 处/千字）。是否调整哪吒的写作参数？",
    agent: "沙僧",
    agentEmoji: "🪨",
    timestamp: "06:30",
    options: ["调整参数", "暂不调整", "与哪吒讨论"],
  },
];

// ─── Mock: Agent Conversations ───
const agentConversations = [
  {
    id: 1,
    from: { name: "谛听", emoji: "👂" },
    to: { name: "蜘蛛精", emoji: "🕷️" },
    message:
      "Brief #2 已生成：MCP 协议解读。建议小红书侧重「开发者日常」角度，附带代码截图。",
    timestamp: "03:42",
  },
  {
    id: 2,
    from: { name: "蜘蛛精", emoji: "🕷️" },
    to: { name: "谛听", emoji: "👂" },
    message:
      "收到！我调整为「5 分钟搞懂 MCP」的入门向笔记，配合流程图会更适合小红书用户。",
    timestamp: "03:58",
  },
  {
    id: 3,
    from: { name: "沙僧", emoji: "🪨" },
    to: { name: "太白金星", emoji: "⭐" },
    message:
      "公众号稿件《Cursor Background Agent 实测》质检完成：总分 88/100，原创性扣 3 分（与官方文档重叠段落），建议改写第三段。",
    timestamp: "05:45",
  },
  {
    id: 4,
    from: { name: "太白金星", emoji: "⭐" },
    to: { name: "沙僧", emoji: "🪨" },
    message: "已改写第三段并补充独家实测数据，请重新审核。",
    timestamp: "06:02",
  },
  {
    id: 5,
    from: { name: "悟空", emoji: "🐒" },
    to: { name: "唐僧", emoji: "🧘" },
    message:
      "师父，昨日发布的 3 篇文章 SEO 数据回传：平均首页排名时间 4.2 小时，关键词覆盖率 89%。Kimi K2 那篇表现最好。",
    timestamp: "06:15",
  },
];

// ─── Mock: Workflow Pipeline ───
const pipelineSteps = [
  {
    id: 1,
    name: "信源扫描",
    agent: "谛听",
    emoji: "👂",
    status: "done" as const,
    time: "02:00-02:35",
    output: "36 信源 → 142 篇",
  },
  {
    id: 2,
    name: "选题评分",
    agent: "谛听",
    emoji: "👂",
    status: "done" as const,
    time: "02:35-02:50",
    output: "TOP 10 已生成",
  },
  {
    id: 3,
    name: "Brief 生成",
    agent: "谛听",
    emoji: "👂",
    status: "done" as const,
    time: "02:50-03:20",
    output: "8/10 Brief 完成",
  },
  {
    id: 4,
    name: "内容生产",
    agent: "多 Agent",
    emoji: "⚡",
    status: "active" as const,
    time: "03:30-进行中",
    output: "5 篇进行中",
  },
  {
    id: 5,
    name: "质量审核",
    agent: "沙僧",
    emoji: "🪨",
    status: "active" as const,
    time: "05:30-进行中",
    output: "3 篇已审",
  },
  {
    id: 6,
    name: "SEO 优化",
    agent: "悟空",
    emoji: "🐒",
    status: "waiting" as const,
    time: "待启动",
    output: "—",
  },
  {
    id: 7,
    name: "人工复审",
    agent: "你",
    emoji: "👤",
    status: "waiting" as const,
    time: "待启动",
    output: "—",
  },
  {
    id: 8,
    name: "发布上线",
    agent: "唐僧",
    emoji: "🧘",
    status: "waiting" as const,
    time: "待启动",
    output: "—",
  },
];

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
  const [feedTab, setFeedTab] = useState<"feed" | "conversations">("feed");

  const activeAgents = agents.filter((a) => a.status === "active");
  const idleAgents = agents.filter((a) => a.status === "idle");

  return (
    <div className="min-h-screen bg-paper py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-ink flex items-center gap-2">
            🎭 战情室
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            Agent 实时状态 · 待决事项 · 生产流水线 · 团队通信
          </p>
        </div>

        {/* ═══ Row 1: Agent Status Grid ═══ */}
        <div className="card-brutal overflow-hidden mb-6">
          <div className="bg-ink text-jade px-4 py-3 border-b-3 border-ink flex items-center justify-between">
            <h2 className="font-bold text-sm font-mono flex items-center gap-2">
              📡 Agent 实时状态
            </h2>
            <span className="text-[10px] text-jade/60 font-mono">
              {activeAgents.length} ACTIVE · {idleAgents.length} IDLE
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 bg-[#1a1a2e]">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`p-4 border border-[#2a2a4a] ${
                  agent.status === "active" ? "bg-[#1e1e3a]" : "bg-[#16162a]"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{agent.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs text-white truncate">
                      {agent.name}
                    </div>
                    <div className="text-[10px] text-gray-400 truncate">
                      {agent.role}
                    </div>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      agent.status === "active"
                        ? "bg-jade animate-pulse"
                        : "bg-gray-600"
                    }`}
                  />
                </div>

                {/* HP/MP Bars */}
                <div className="space-y-1 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] text-red-400 font-mono w-3">
                      HP
                    </span>
                    <div className="flex-1 h-1.5 bg-[#2a2a4a] rounded-sm overflow-hidden">
                      <div
                        className="h-full bg-red-400 rounded-sm"
                        style={{ width: `${agent.hp}%` }}
                      />
                    </div>
                    <span className="text-[8px] text-gray-500 font-mono w-6 text-right">
                      {agent.hp}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] text-blue-400 font-mono w-3">
                      MP
                    </span>
                    <div className="flex-1 h-1.5 bg-[#2a2a4a] rounded-sm overflow-hidden">
                      <div
                        className="h-full bg-blue-400 rounded-sm"
                        style={{ width: `${agent.mp}%` }}
                      />
                    </div>
                    <span className="text-[8px] text-gray-500 font-mono w-6 text-right">
                      {agent.mp}
                    </span>
                  </div>
                </div>

                {/* Today's Stats */}
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="text-jade">
                    今日 {agent.stats.tasksToday} 任务
                  </span>
                  <span className="text-gray-500">
                    🔥{agent.stats.streak}天
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ Row 2: Decisions + Pipeline ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Pending Decisions */}
          <div className="card-brutal overflow-hidden">
            <div className="bg-fire px-4 py-3 border-b-3 border-ink flex items-center justify-between">
              <h2 className="font-bold text-sm text-white flex items-center gap-2">
                ⚠️ 需要你的决策
              </h2>
              <span className="badge-pixel bg-white text-fire text-[10px] font-bold">
                {pendingDecisions.length}
              </span>
            </div>

            <div className="divide-y divide-ink/5">
              {pendingDecisions.map((decision) => (
                <div key={decision.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        decision.urgency === "high"
                          ? "bg-fire animate-pulse"
                          : decision.urgency === "medium"
                          ? "bg-gold"
                          : "bg-sky"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{decision.agentEmoji}</span>
                        <span className="font-bold text-sm text-ink">
                          {decision.title}
                        </span>
                      </div>
                      <p className="text-xs text-ink-light leading-relaxed mb-3">
                        {decision.detail}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {decision.options.map((opt, idx) => (
                          <button
                            key={opt}
                            className={`text-[11px] font-bold px-3 py-1.5 border-2 border-ink rounded-sm transition-colors ${
                              idx === 0
                                ? "bg-ink text-white hover:bg-ink/80"
                                : "bg-white text-ink hover:bg-paper-dark"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-ink-muted font-mono shrink-0">
                      {decision.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline */}
          <div className="card-brutal overflow-hidden">
            <div className="bg-gold px-4 py-3 border-b-3 border-ink">
              <h2 className="font-bold text-sm text-ink flex items-center gap-2">
                🔄 今日生产流水线
              </h2>
            </div>

            <div className="p-4">
              {pipelineSteps.map((step, idx) => (
                <div key={step.id} className="flex gap-3 mb-0 last:mb-0">
                  {/* Connector */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-sm border-2 border-ink flex items-center justify-center text-sm ${
                        step.status === "done"
                          ? "bg-jade text-white"
                          : step.status === "active"
                          ? "bg-gold text-ink animate-pulse"
                          : "bg-paper-dark text-ink-muted"
                      }`}
                    >
                      {step.emoji}
                    </div>
                    {idx < pipelineSteps.length - 1 && (
                      <div
                        className={`w-0.5 h-4 ${
                          step.status === "done" ? "bg-jade" : "bg-ink/10"
                        }`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-ink">
                        {step.name}
                      </span>
                      <span
                        className={`badge-pixel text-[9px] py-0 ${
                          step.status === "done"
                            ? "badge-pass"
                            : step.status === "active"
                            ? "badge-wip"
                            : "badge-pending"
                        }`}
                      >
                        {step.status === "done"
                          ? "✓"
                          : step.status === "active"
                          ? "..."
                          : "○"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[10px] text-ink-muted">
                        {step.agent}
                      </span>
                      <span className="text-[10px] text-ink-muted font-mono">
                        {step.time}
                      </span>
                      <span className="text-[10px] text-sky font-bold">
                        {step.output}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ Row 3: Live Feed + Agent Conversations (Tabbed) ═══ */}
        <div className="card-brutal overflow-hidden mb-6">
          {/* Tab Header */}
          <div className="bg-ink flex items-center border-b border-[#3a3a3a]">
            <button
              onClick={() => setFeedTab("feed")}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold transition-colors ${
                feedTab === "feed"
                  ? "text-jade border-b-2 border-jade"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-fire" />
              <span className="w-3 h-3 rounded-full bg-gold" />
              <span className="w-3 h-3 rounded-full bg-jade" />
              <span className="ml-1 font-mono">live-feed</span>
            </button>
            <button
              onClick={() => setFeedTab("conversations")}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold transition-colors ${
                feedTab === "conversations"
                  ? "text-jade border-b-2 border-jade"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              💬 Agent 对话
              <span className="badge-pixel bg-fire text-white text-[9px] py-0 px-1.5">
                {agentConversations.length}
              </span>
            </button>
          </div>

          {/* Tab Content */}
          {feedTab === "feed" ? (
            <div className="terminal-feed border-0 rounded-none min-h-[350px] max-h-[500px]">
              <div className="p-2">
                {activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="terminal-line flex gap-2 py-1.5"
                  >
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
          ) : (
            <div className="bg-[#1a1a2e] min-h-[350px] max-h-[500px] overflow-y-auto p-4 space-y-3">
              {agentConversations.map((conv) => (
                <div
                  key={conv.id}
                  className="flex gap-3 p-3 rounded-sm bg-[#1e1e3a] border border-[#2a2a4a]"
                >
                  <div className="shrink-0 text-center">
                    <span className="text-xl">{conv.from.emoji}</span>
                    <div className="text-[8px] text-gray-500 mt-0.5">
                      →
                    </div>
                    <span className="text-xl">{conv.to.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-jade">
                        {conv.from.name}
                      </span>
                      <span className="text-[10px] text-gray-600">→</span>
                      <span className="text-[10px] font-bold text-sky">
                        {conv.to.name}
                      </span>
                      <span className="text-[9px] text-gray-600 font-mono ml-auto">
                        {conv.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {conv.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ═══ Row 4: Quick Stats ═══ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="card-brutal p-4 text-center bg-jade/5">
            <div className="text-3xl font-bold text-jade font-mono">
              {agents.reduce((sum, a) => sum + a.stats.tasksToday, 0)}
            </div>
            <div className="text-[10px] text-ink-muted font-bold mt-1">
              今日总产出
            </div>
          </div>
          <div className="card-brutal p-4 text-center bg-sky/5">
            <div className="text-3xl font-bold text-sky font-mono">
              {Math.round(
                agents.reduce((sum, a) => sum + a.stats.avgScore, 0) /
                  agents.length
              )}
              <span className="text-lg">/100</span>
            </div>
            <div className="text-[10px] text-ink-muted font-bold mt-1">
              平均质量分
            </div>
          </div>
          <div className="card-brutal p-4 text-center bg-gold/5">
            <div className="text-3xl font-bold text-gold-dark font-mono">
              {pendingDecisions.length}
            </div>
            <div className="text-[10px] text-ink-muted font-bold mt-1">
              待决事项
            </div>
          </div>
          <div className="card-brutal p-4 text-center bg-fire/5">
            <div className="text-3xl font-bold text-fire font-mono">
              {pipelineSteps.filter((s) => s.status === "done").length}/
              {pipelineSteps.length}
            </div>
            <div className="text-[10px] text-ink-muted font-bold mt-1">
              流水线进度
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
