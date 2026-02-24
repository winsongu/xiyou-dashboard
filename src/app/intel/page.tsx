"use client";

import { useState } from "react";
import Link from "next/link";
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

// Brief 摘要 mock data — 为每个选题生成简要分析
const briefSummaries: Record<number, { summary: string; keywords: string[]; suggestedAngle: string }> = {
  1: {
    summary: "Anthropic 内部代号 Opus Next 曝光，消息源为 The Information 独家。多模态能力提升显著，预计支持实时视频理解和更长上下文。市场反应积极，竞品压力增大。",
    keywords: ["Claude 4", "多模态", "Opus Next", "Anthropic"],
    suggestedAngle: "深度对比现有模型能力，预测对 AI 编程和内容创作领域的影响",
  },
  2: {
    summary: "OpenAI 正式宣布在其 API 中支持 MCP 协议，这是继 Anthropic 之后的又一行业巨头。MCP 正在成为 AI Agent 生态的事实标准，类似于早期的 HTTP 协议。",
    keywords: ["MCP", "协议标准", "AI Agent", "生态"],
    suggestedAngle: "从开发者视角解读 MCP 对 AI 应用开发的影响",
  },
  3: {
    summary: "Cursor 推出后台自动编程功能，基于云端 VM 运行。用户可以提交任务后离开，Agent 自动完成编码、测试和部署。需要 Pro 订阅。",
    keywords: ["Cursor", "Background Agent", "AI 编程", "自动化"],
    suggestedAngle: "实测体验 + 与 GitHub Copilot Workspace 对比",
  },
  4: {
    summary: "Google 发布 Gemini 2.5 Pro，在 LMArena 全品类排名第一。支持 100 万 Token 上下文，定价较高但在长文档理解场景有独特优势。",
    keywords: ["Gemini", "Google", "100万Token", "基准测试"],
    suggestedAngle: "100 万 Token 实测 + 与 Claude 3.5 的性价比对比",
  },
  5: {
    summary: "月之暗面开源 Kimi K2，千亿级 MoE 架构，代码能力突出。中国首个达到 GPT-4 级别的开源模型，社区反响热烈。",
    keywords: ["Kimi K2", "开源", "MoE", "中国AI"],
    suggestedAngle: "开源模型崛起对中国 AI 创业者的机遇",
  },
  6: {
    summary: "Hacker News 热门讨论，对比三个主流 AI Agent 框架。LangGraph 适合复杂工作流，CrewAI 适合多角色协作，AutoGen 适合研究场景。",
    keywords: ["LangGraph", "CrewAI", "AutoGen", "Agent框架"],
    suggestedAngle: "实战横评 + 各框架最佳使用场景推荐",
  },
  7: {
    summary: "OpenAI 以 30 亿美元收购 Windsurf（原 Codeium），加速其 AI IDE 布局。此举将与 Cursor 形成直接竞争。",
    keywords: ["Windsurf", "收购", "OpenAI", "AI IDE"],
    suggestedAngle: "AI IDE 格局剧变：收购背后的战略意图",
  },
  8: {
    summary: "arXiv 最新论文提出 GraphRAG 与向量检索混合架构，在知识密集型任务上表现优于纯向量检索。实现成本较高但效果显著。",
    keywords: ["GraphRAG", "向量检索", "RAG 2.0", "知识图谱"],
    suggestedAngle: "通俗解读 + 动手实践教程",
  },
  9: {
    summary: "Notion AI 推出自动化工作流功能，允许用户设置触发器和动作链。被视为对 Zapier、Make 等自动化平台的直接挑战。",
    keywords: ["Notion", "自动化", "工作流", "SaaS"],
    suggestedAngle: "Notion AI vs Zapier：哪个更适合内容团队",
  },
  10: {
    summary: "Cognition AI 发布 Devin 2.0，软件工程能力提升 3 倍。支持更复杂的多文件编辑和自主调试。仍需人类监督关键决策。",
    keywords: ["Devin 2.0", "自主编程", "Cognition AI", "Agent"],
    suggestedAngle: "Devin 2.0 实测：自主编程 Agent 的进化之路",
  },
};

export default function IntelPage() {
  const [expandedRank, setExpandedRank] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-paper py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-ink flex items-center gap-2">
            👂 情报站
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            谛听日报 · TOP 10 选题 · 点击展开详情 · R/Q/T 三维评分
          </p>
        </div>

        {/* TOP 10 — Card List (mobile friendly + clickable) */}
        <div className="card-brutal overflow-hidden mb-8">
          <div className="bg-gold px-4 py-3 border-b-3 border-ink flex items-center justify-between">
            <h2 className="font-bold text-sm flex items-center gap-2 text-ink">
              🏆 谛听日报 TOP 10 — 2025-02-23
            </h2>
            <span className="text-[10px] text-ink-light font-bold">
              点击展开详情
            </span>
          </div>

          <div className="divide-y divide-ink/5">
            {intelItems.map((item, idx) => {
              const isExpanded = expandedRank === item.rank;
              const brief = briefSummaries[item.rank];

              return (
                <div key={item.rank}>
                  {/* Main Row — Always clickable */}
                  <div
                    onClick={() =>
                      setExpandedRank(isExpanded ? null : item.rank)
                    }
                    className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-gold/5 ${
                      idx < 3 ? "bg-gold/5" : ""
                    } ${isExpanded ? "bg-gold/10" : ""}`}
                  >
                    {/* Rank */}
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-sm border-2 border-ink shrink-0 mt-0.5 ${
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

                    {/* Title + Meta */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-ink leading-snug">
                        {item.title}
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-[10px] text-ink-muted">
                          {item.sourceEmoji} {item.source}
                        </span>
                        <span className="badge-pixel text-[9px] py-0">
                          {item.category}
                        </span>
                        {item.briefGenerated && (
                          <span className="badge-pixel badge-pass text-[9px] py-0">
                            Brief ✓
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Score + Arrow */}
                    <div className="flex items-center gap-3 shrink-0">
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
                      <span
                        className={`text-xs transition-transform ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      >
                        ▸
                      </span>
                    </div>
                  </div>

                  {/* Expanded Detail */}
                  {isExpanded && brief && (
                    <div className="px-4 pb-4 pt-1 bg-paper-dark/50">
                      <div className="card-brutal p-4 bg-white">
                        {/* Score Detail */}
                        <div className="flex items-center gap-4 mb-4 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-ink-muted w-10">
                              R 相关
                            </span>
                            <ScoreBar value={item.score.R} />
                            <span className="text-xs font-mono font-bold">
                              {item.score.R}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-ink-muted w-10">
                              Q 质量
                            </span>
                            <ScoreBar value={item.score.Q} />
                            <span className="text-xs font-mono font-bold">
                              {item.score.Q}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-ink-muted w-10">
                              T 时效
                            </span>
                            <ScoreBar value={item.score.T} />
                            <span className="text-xs font-mono font-bold">
                              {item.score.T}
                            </span>
                          </div>
                        </div>

                        {/* Summary */}
                        <div className="mb-3">
                          <h4 className="text-xs font-bold text-ink mb-1">
                            📋 Brief 摘要
                          </h4>
                          <p className="text-xs text-ink-light leading-relaxed">
                            {brief.summary}
                          </p>
                        </div>

                        {/* Suggested Angle */}
                        <div className="mb-3">
                          <h4 className="text-xs font-bold text-ink mb-1">
                            💡 建议切角
                          </h4>
                          <p className="text-xs text-sky leading-relaxed font-medium">
                            {brief.suggestedAngle}
                          </p>
                        </div>

                        {/* Keywords */}
                        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                          {brief.keywords.map((kw) => (
                            <span
                              key={kw}
                              className="badge-pixel bg-paper-dark text-[9px]"
                            >
                              #{kw}
                            </span>
                          ))}
                        </div>

                        {/* Platform Fit */}
                        <div className="flex items-center gap-4 mb-3 text-[10px]">
                          <span className="font-bold text-ink-muted">
                            平台适配:
                          </span>
                          <span>📕 <PlatformStars count={item.platformFit.xhs} /></span>
                          <span>💬 <PlatformStars count={item.platformFit.wx} /></span>
                          <span>💎 <PlatformStars count={item.platformFit.zhihu} /></span>
                          <span>🎬 <PlatformStars count={item.platformFit.video} /></span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-2 border-t-2 border-ink/5 flex-wrap">
                          {item.articleId ? (
                            <Link
                              href={`/articles/${item.articleId}`}
                              className="btn-pixel btn-pixel-gold text-xs"
                            >
                              📖 查看已产出文章 →
                            </Link>
                          ) : item.briefGenerated ? (
                            <button className="btn-pixel btn-pixel-gold text-xs">
                              ⚡ 分配生产任务
                            </button>
                          ) : (
                            <button className="btn-pixel text-xs">
                              📝 生成 Brief
                            </button>
                          )}
                          {item.sourceUrl && (
                            <a
                              href={item.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-pixel text-xs"
                              onClick={(e) => e.stopPropagation()}
                            >
                              🔗 查看内容源 ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
