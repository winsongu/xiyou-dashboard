"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { agents } from "@/data/agents";
import { activityLogs } from "@/data/activity";

// ─── Typewriter Hook ───
function useTypewriter(text: string, speed = 60) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayed, done };
}

// ─── Animated Counter ───
function AnimatedNumber({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{count.toLocaleString()}</>;
}

export default function V2HomePage() {
  const { displayed: heroText, done: heroDone } = useTypewriter(
    "8 个 AI Agent。一支取经队伍。",
    80
  );

  const [visibleLogs, setVisibleLogs] = useState(0);

  // Animate log entries appearing
  useEffect(() => {
    if (visibleLogs < 6) {
      const timer = setTimeout(
        () => setVisibleLogs((v) => v + 1),
        800 + visibleLogs * 400
      );
      return () => clearTimeout(timer);
    }
  }, [visibleLogs]);

  const activeAgents = agents.filter((a) => a.status === "active");
  const totalTasks = agents.reduce((s, a) => s + a.stats.tasksTotal, 0);
  const totalToday = agents.reduce((s, a) => s + a.stats.tasksToday, 0);
  const avgScore = Math.round(
    agents.reduce((s, a) => s + a.stats.avgScore, 0) / agents.length
  );

  return (
    <div className="min-h-screen bg-paper">
      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-4 sm:px-6">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 text-8xl opacity-5 animate-float">🐵</div>
          <div className="absolute top-20 right-20 text-7xl opacity-5 animate-float" style={{ animationDelay: "1s" }}>👂</div>
          <div className="absolute bottom-20 left-1/4 text-6xl opacity-5 animate-float" style={{ animationDelay: "2s" }}>🕷️</div>
          <div className="absolute bottom-10 right-1/3 text-7xl opacity-5 animate-float" style={{ animationDelay: "0.5s" }}>⭐</div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          {/* Main Title */}
          <h1 className="text-5xl sm:text-7xl font-bold text-ink leading-tight mb-2">
            {heroText}
            {!heroDone && (
              <span className="text-gold animate-cursor">▌</span>
            )}
          </h1>

          {/* Highlight bar under key phrase */}
          <div
            className={`mx-auto h-2 bg-gold rounded-sm transition-all duration-1000 mt-4 ${
              heroDone ? "w-64 sm:w-80 opacity-100" : "w-0 opacity-0"
            }`}
          />

          {/* Subtitle */}
          <p
            className={`text-lg sm:text-xl text-ink-light mt-8 max-w-2xl mx-auto leading-relaxed transition-all duration-700 ${
              heroDone
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            它们自动扫描全网情报、撰写多平台内容、自主质检发布。
            <br />
            人类只需审核决策。每一步都可追踪。
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex items-center justify-center gap-4 mt-10 flex-wrap transition-all duration-700 delay-300 ${
              heroDone
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Link href="/articles" className="btn-pixel btn-pixel-gold text-base px-8 py-3">
              📖 查看产出内容
            </Link>
            <Link href="/workshop" className="btn-pixel text-base px-8 py-3">
              🎭 进入战情室
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LIVE AGENTS WIDGET (inspired by VoxYZ)
          ═══════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">⚡</span>
            <span className="text-sm font-bold text-ink-light">
              Agents Working Right Now
            </span>
          </div>

          <div className="card-brutal overflow-hidden bg-[#1a1a2e]">
            {/* Widget Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#2a2a4a]">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 bg-jade/20 text-jade text-xs font-bold px-3 py-1 rounded-sm border border-jade/30">
                  <span className="w-2 h-2 rounded-full bg-jade animate-pulse" />
                  LIVE FEED
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  <span className="text-white font-bold">{totalToday}</span> 任务进行中
                </span>
              </div>
              <Link
                href="/workshop"
                className="text-xs text-gray-400 hover:text-white transition-colors font-bold border border-gray-600 px-3 py-1.5 rounded-sm hover:border-gray-400"
              >
                Enter the Stage →
              </Link>
            </div>

            {/* Agent Avatars Row */}
            <div className="flex items-start justify-center gap-6 sm:gap-8 py-8 px-4 flex-wrap">
              {agents.map((agent) => (
                <div key={agent.id} className="text-center group cursor-pointer">
                  <div className="relative inline-block mb-2">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-sm border-2 border-[#3a3a5a] bg-[#252545] flex items-center justify-center text-3xl sm:text-4xl group-hover:border-gold transition-colors">
                      {agent.emoji}
                    </div>
                    {agent.status === "active" && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-jade rounded-full border-2 border-[#1a1a2e] animate-pulse" />
                    )}
                  </div>
                  <div className="text-xs font-bold text-white">
                    {agent.name}
                  </div>
                  <div
                    className={`text-[10px] font-bold mt-0.5 ${
                      agent.status === "active"
                        ? "text-jade"
                        : "text-gray-500"
                    }`}
                  >
                    {agent.status === "active" ? "working" : "idle"}
                  </div>
                  <div className="text-[9px] text-gray-500 mt-1 border border-gray-700 rounded-sm px-2 py-0.5 font-mono">
                    {agent.stats.tasksToday} tasks
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS BANNER
          ═══════════════════════════════════════════ */}
      <section className="bg-ink py-12 px-4 sm:px-6 border-y-3 border-ink">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl sm:text-5xl font-bold text-gold font-mono">
              <AnimatedNumber target={8} duration={800} />
            </div>
            <div className="text-sm text-gray-400 mt-2 font-bold">
              AI Agents
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold text-jade font-mono">
              <AnimatedNumber target={4} duration={1000} />
            </div>
            <div className="text-sm text-gray-400 mt-2 font-bold">
              内容平台
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold text-sky font-mono">
              <AnimatedNumber target={totalTasks} duration={2000} />
            </div>
            <div className="text-sm text-gray-400 mt-2 font-bold">
              累计产出
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold text-fire font-mono">
              <AnimatedNumber target={avgScore} duration={1500} />
              <span className="text-2xl text-gray-500">/100</span>
            </div>
            <div className="text-sm text-gray-400 mt-2 font-bold">
              平均质量分
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS — PIPELINE
          ═══════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-ink text-center mb-4">
            全自动化取经之路
          </h2>
          <p className="text-center text-ink-light mb-12 max-w-xl mx-auto">
            从情报扫描到内容发布，7×24 小时全自动。你只管审核拍板。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                emoji: "👂",
                title: "情报扫描",
                agent: "谛听",
                desc: "每日凌晨 2 点，自动扫描 36 个信源，R/Q/T 三维评分产出 TOP 10 选题",
                color: "bg-gold",
              },
              {
                step: "02",
                emoji: "🕷️⭐🔥👁️",
                title: "内容生产",
                agent: "创作团队",
                desc: "4 位创作者各司其职，小红书、公众号、知乎、视频号同步开工",
                color: "bg-sky",
              },
              {
                step: "03",
                emoji: "🪨",
                title: "质量审核",
                agent: "沙僧",
                desc: "五维评分体系严格审核，原创性、锐度、可读性、准确性、平台适配",
                color: "bg-jade",
              },
              {
                step: "04",
                emoji: "🧘",
                title: "发布管理",
                agent: "唐僧",
                desc: "最终审批与发布调度，确保每篇内容达到发布标准后自动上线",
                color: "bg-fire",
              },
            ].map((item) => (
              <div key={item.step} className="card-brutal p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 text-xs font-bold border-2 border-ink rounded-sm text-white ${item.color}`}
                  >
                    {item.step}
                  </span>
                  <span className="text-xl">{item.emoji}</span>
                </div>
                <h3 className="font-bold text-lg text-ink mb-1">
                  {item.title}
                </h3>
                <div className="text-[10px] font-bold text-ink-muted mb-2">
                  {item.agent}
                </div>
                <p className="text-xs text-ink-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Arrow connector for desktop */}
          <div className="hidden lg:flex items-center justify-center gap-0 -mt-[170px] mb-[130px] pointer-events-none">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 flex justify-center">
                <span className="text-2xl text-ink-muted">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LIVE ACTIVITY TERMINAL PREVIEW
          ═══════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-ink">
              ⚡ 实时活动日志
            </h2>
            <Link
              href="/workshop"
              className="text-xs text-sky font-bold hover:underline"
            >
              查看全部 →
            </Link>
          </div>

          <div className="card-brutal overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-ink border-b border-[#3a3a3a]">
              <span className="w-3 h-3 rounded-full bg-fire" />
              <span className="w-3 h-3 rounded-full bg-gold" />
              <span className="w-3 h-3 rounded-full bg-jade" />
              <span className="text-xs text-gray-500 ml-2 font-mono">
                openclaw-live — xiyou-squad
              </span>
            </div>

            <div className="bg-ink p-3 min-h-[200px]">
              {activityLogs.slice(0, 6).map((log, idx) => {
                const logTime = new Date(log.timestamp).toLocaleTimeString(
                  "zh-CN",
                  { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }
                );
                return (
                  <div
                    key={log.id}
                    className={`terminal-line flex gap-2 py-1.5 transition-all duration-500 ${
                      idx < visibleLogs
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                  >
                    <span className="text-gray-500 whitespace-nowrap text-xs font-mono">
                      [{logTime}]
                    </span>
                    <span className="text-gold whitespace-nowrap text-xs font-bold font-mono">
                      {log.agentEmoji} {log.agent}
                    </span>
                    <span
                      className={`font-bold text-xs font-mono ${
                        log.type === "success"
                          ? "text-jade"
                          : log.type === "warning"
                          ? "text-gold"
                          : log.type === "error"
                          ? "text-fire"
                          : "text-sky"
                      }`}
                    >
                      {log.action}
                    </span>
                    {log.detail && (
                      <span className="text-gray-500 text-xs truncate font-mono">
                        {log.detail}
                      </span>
                    )}
                  </div>
                );
              })}
              <div className="terminal-line py-1">
                <span className="text-jade animate-cursor font-mono">▌</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MEET THE TEAM
          ═══════════════════════════════════════════ */}
      <section className="bg-paper-dark py-20 px-4 sm:px-6 border-t-3 border-ink">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-ink text-center mb-4">
            认识取经编队
          </h2>
          <p className="text-center text-ink-light mb-12 max-w-xl mx-auto">
            8 位 AI Agent，各有神通。从情报猎手到 SEO 大圣，全覆盖内容生产全链路。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map((agent) => (
              <div key={agent.id} className="card-brutal p-5 text-center">
                <div className="text-4xl mb-3">{agent.emoji}</div>
                <h3 className="font-bold text-base text-ink">{agent.name}</h3>
                <div className="text-[10px] font-bold text-ink-muted mb-2">
                  {agent.title}
                </div>
                <div className="badge-pixel text-[9px] mx-auto mb-3">
                  {agent.platform || agent.role.split("·")[0].trim()}
                </div>
                <p className="text-xs text-ink-light leading-relaxed line-clamp-3">
                  {agent.description}
                </p>
                {/* Stats */}
                <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t-2 border-ink/5">
                  <span className="text-[10px] font-mono text-ink-muted">
                    LV.{agent.level}
                  </span>
                  <span className="text-[10px] font-mono text-jade">
                    {agent.stats.tasksTotal} 篇
                  </span>
                  <span className="text-[10px] font-mono text-gold-dark">
                    🔥{agent.stats.streak}天
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/team" className="btn-pixel btn-pixel-gold text-sm">
              👥 查看完整团队 →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PLATFORM COVERAGE
          ═══════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-4">
            覆盖主流内容平台
          </h2>
          <p className="text-ink-light mb-12">
            一次选题，四平台同步生产，风格各异、原生适配
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { emoji: "📕", name: "小红书", agent: "蜘蛛精", style: "种草笔记 · 生活化", color: "bg-fire/5 border-fire/20" },
              { emoji: "💬", name: "微信公众号", agent: "太白金星", style: "深度长文 · 观点输出", color: "bg-jade/5 border-jade/20" },
              { emoji: "💎", name: "知乎", agent: "哪吒", style: "犀利回答 · 数据论证", color: "bg-sky/5 border-sky/20" },
              { emoji: "🎬", name: "视频号/B站", agent: "二郎神", style: "脚本分镜 · 封面设计", color: "bg-gold/5 border-gold/20" },
            ].map((platform) => (
              <div
                key={platform.name}
                className={`card-brutal p-5 ${platform.color}`}
              >
                <div className="text-3xl mb-2">{platform.emoji}</div>
                <h3 className="font-bold text-sm text-ink">{platform.name}</h3>
                <div className="text-[10px] font-bold text-ink-muted mt-1 mb-2">
                  by {platform.agent}
                </div>
                <p className="text-[11px] text-ink-light">{platform.style}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          NAVIGATION / EXPLORE
          ═══════════════════════════════════════════ */}
      <section className="bg-ink py-16 px-4 sm:px-6 border-t-3 border-ink">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            探索西游编队
          </h2>
          <p className="text-gray-400 text-sm mb-10">
            每一个页面都是取经路上的一站
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { emoji: "🏠", label: "仪表盘", href: "/", desc: "运营总览" },
              { emoji: "👂", label: "情报站", href: "/intel", desc: "谛听日报 TOP 10" },
              { emoji: "📝", label: "内容库", href: "/articles", desc: "AI 产出内容" },
              { emoji: "📋", label: "任务看板", href: "/kanban", desc: "生产进度追踪" },
              { emoji: "🎭", label: "战情室", href: "/workshop", desc: "Agent 实时状态" },
              { emoji: "👥", label: "团队", href: "/team", desc: "取经编队成员" },
            ].map((nav) => (
              <Link
                key={nav.href}
                href={nav.href}
                className="p-5 rounded-sm border-2 border-gray-700 hover:border-gold transition-all text-center group hover:bg-[#2a2a2a]"
              >
                <div className="text-3xl mb-2 group-hover:animate-float">
                  {nav.emoji}
                </div>
                <div className="font-bold text-white text-sm">{nav.label}</div>
                <div className="text-[10px] text-gray-500 mt-1">{nav.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="bg-ink px-4 sm:px-6 py-8 border-t border-[#3a3a3a]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐵</span>
            <span className="font-bold text-white">西游编队</span>
            <span className="text-xs text-gray-500 font-mono">v0.3</span>
          </div>
          <div className="text-xs text-gray-500 text-center sm:text-right">
            <div>Powered by OpenClaw Multi-Agent System</div>
            <div className="mt-1">Built with Next.js · Tailwind · Kimi K2</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
