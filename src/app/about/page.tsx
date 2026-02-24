export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="card-brutal-gold p-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🐵</span>
            <div>
              <h1 className="text-2xl font-bold text-ink">关于西游编队</h1>
              <p className="text-sm text-ink-light">
                AI Agent 内容生产指挥部
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Mission */}
          <div className="card-brutal p-6">
            <h2 className="font-bold text-lg text-ink mb-3 flex items-center gap-2">
              🎯 使命
            </h2>
            <p className="text-sm text-ink-light leading-relaxed">
              西游编队是一个由 8 位 AI Agent 组成的自动化内容生产团队，以《西游记》取经团队为原型，
              7×24 小时不间断运转。从情报扫描、选题评分、内容创作、AI去味到质量审核，
              形成完整的内容生产流水线。
            </p>
          </div>

          {/* Tech Stack */}
          <div className="card-brutal p-6">
            <h2 className="font-bold text-lg text-ink mb-3 flex items-center gap-2">
              🛠️ 技术栈
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  name: "底座引擎",
                  value: "OpenClaw",
                  emoji: "🔧",
                  desc: "多 Agent 编排框架",
                },
                {
                  name: "前端",
                  value: "Next.js 15",
                  emoji: "⚡",
                  desc: "App Router + RSC",
                },
                {
                  name: "样式",
                  value: "Tailwind v4",
                  emoji: "🎨",
                  desc: "Neo-Brutalist 设计",
                },
                {
                  name: "部署",
                  value: "Vercel",
                  emoji: "▲",
                  desc: "全球 CDN + Edge",
                },
                {
                  name: "AI 模型",
                  value: "Kimi K2",
                  emoji: "🧠",
                  desc: "MoE 千亿参数",
                },
                {
                  name: "通信",
                  value: "Telegram",
                  emoji: "📱",
                  desc: "Bot API + Webhook",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="card-brutal p-3 flex items-start gap-2"
                >
                  <span className="text-xl">{item.emoji}</span>
                  <div>
                    <div className="font-bold text-xs text-ink">
                      {item.value}
                    </div>
                    <div className="text-[10px] text-ink-muted">
                      {item.name} · {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="card-brutal p-6">
            <h2 className="font-bold text-lg text-ink mb-3 flex items-center gap-2">
              ⏰ 每日作息
            </h2>
            <div className="terminal-feed p-4 text-xs">
              <div className="terminal-line py-1">
                <span className="terminal-timestamp">02:00</span>{" "}
                <span className="terminal-agent">👂 谛听</span>{" "}
                <span className="terminal-action-info">
                  信源扫描启动 · 36 个信源
                </span>
              </div>
              <div className="terminal-line py-1">
                <span className="terminal-timestamp">02:30</span>{" "}
                <span className="terminal-agent">👂 谛听</span>{" "}
                <span className="terminal-action-success">
                  日报 TOP 10 + Brief 生成
                </span>
              </div>
              <div className="terminal-line py-1">
                <span className="terminal-timestamp">03:30</span>{" "}
                <span className="terminal-agent">🕷️ 蜘蛛精</span>{" "}
                <span className="terminal-action-info">
                  小红书笔记生产
                </span>
              </div>
              <div className="terminal-line py-1">
                <span className="terminal-timestamp">04:00</span>{" "}
                <span className="terminal-agent">⭐ 太白金星</span>{" "}
                <span className="terminal-action-info">
                  微信公众号长文撰写
                </span>
              </div>
              <div className="terminal-line py-1">
                <span className="terminal-timestamp">04:30</span>{" "}
                <span className="terminal-agent">🔥 哪吒 / 🐒 悟空</span>{" "}
                <span className="terminal-action-info">
                  知乎回答 / 视频脚本
                </span>
              </div>
              <div className="terminal-line py-1">
                <span className="terminal-timestamp">05:00</span>{" "}
                <span className="terminal-agent">🪨 沙僧</span>{" "}
                <span className="terminal-action-info">AI 去味处理</span>
              </div>
              <div className="terminal-line py-1">
                <span className="terminal-timestamp">05:30</span>{" "}
                <span className="terminal-agent">👁️ 二郎神</span>{" "}
                <span className="terminal-action-warning">
                  五维质量审核
                </span>
              </div>
              <div className="terminal-line py-1">
                <span className="terminal-timestamp">06:30</span>{" "}
                <span className="terminal-agent">🧘 唐僧</span>{" "}
                <span className="terminal-action-success">
                  每日站会 · 任务分配
                </span>
              </div>
            </div>
          </div>

          {/* Version */}
          <div className="card-brutal p-4 text-center">
            <div className="text-xs text-ink-muted font-mono">
              西游编队 Dashboard v0.1.0 · Mock Data
            </div>
            <div className="text-xs text-ink-muted font-mono mt-1">
              Powered by OpenClaw · Built with ❤️ by 飞月 AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
