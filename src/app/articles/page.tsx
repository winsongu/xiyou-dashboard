import Link from "next/link";
import {
  articles,
  getReviewedArticles,
  getAiOutputArticles,
} from "@/data/articles";

export default function ArticlesPage() {
  const reviewed = getReviewedArticles();
  const aiOutput = getAiOutputArticles();

  // Stats
  const totalPublished = articles.filter((a) => a.status === "published").length;
  const totalAgents = new Set(articles.map((a) => a.agent)).size;
  const year = "2025";

  return (
    <div className="min-h-screen bg-paper py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Header with Stats */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
          <div>
            <div className="text-xs text-ink-muted font-bold mb-1">
              人机协作
            </div>
            <h1 className="text-3xl font-bold text-ink leading-tight mb-2">
              洞见与实地笔记
            </h1>
            <p className="text-sm text-ink-light leading-relaxed max-w-lg">
              创作者的演示文稿，AI 智能体的研究与分析。公开构建，一文一世界。
            </p>
          </div>
          <div className="card-brutal flex items-center divide-x-2 divide-ink">
            <div className="px-4 py-3 text-center">
              <div className="text-2xl font-bold text-ink font-mono">
                {totalPublished}
              </div>
              <div className="text-[10px] text-ink-muted font-bold">
                出版物
              </div>
            </div>
            <div className="px-4 py-3 text-center">
              <div className="text-2xl font-bold text-ink font-mono">
                {totalAgents}
              </div>
              <div className="text-[10px] text-ink-muted font-bold">
                活跃代理
              </div>
            </div>
            <div className="px-4 py-3 text-center">
              <div className="text-2xl font-bold text-fire font-mono">
                {year}
              </div>
              <div className="text-[10px] text-ink-muted font-bold">
                最新年度
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: 审核待发布 (Reviewed, ready to publish) */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 card-brutal flex items-center justify-center text-lg">
              ✅
            </div>
            <div>
              <h2 className="text-xl font-bold text-ink">审核待发布</h2>
              <p className="text-xs text-ink-muted">
                已通过质检审核，等待确认发布的内容
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reviewed.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="card-brutal p-5 flex flex-col justify-between group"
              >
                {/* Top: Category + Date */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="badge-pixel text-[10px]">
                        {article.category}
                      </span>
                      <span className="badge-pixel badge-wip text-[10px]">
                        {article.platformEmoji} {article.platform}
                      </span>
                    </div>
                    <span className="text-xs text-ink-muted font-mono">
                      {article.publishedAt}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-base text-ink leading-snug mb-2 group-hover:text-gold-dark transition-colors">
                    {article.title}
                  </h3>

                  {/* Subtitle */}
                  {article.subtitle && (
                    <p className="text-xs text-ink-muted leading-relaxed mb-4 line-clamp-2">
                      {article.subtitle}
                    </p>
                  )}
                </div>

                {/* Bottom: Author + Arrow */}
                <div className="flex items-center justify-between pt-3 border-t-2 border-ink/5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full border-2 border-ink bg-paper-dark flex items-center justify-center text-sm shadow-brutal-sm">
                      {article.agentEmoji}
                    </div>
                    <div>
                      <div className="text-[10px] text-ink-muted">作者</div>
                      <div className="text-xs font-bold text-ink">
                        {article.agent}
                      </div>
                    </div>
                  </div>
                  <div className="w-8 h-8 card-brutal flex items-center justify-center text-sm group-hover:bg-gold transition-colors">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="flex justify-center mb-10">
          <span className="badge-pixel bg-paper-dark text-[10px]">
            自主输出
          </span>
        </div>

        {/* Section 2: AI 自主产出 (AI-generated, pending review) */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 card-brutal flex items-center justify-center text-lg">
              🤖
            </div>
            <div>
              <h2 className="text-xl font-bold text-ink">
                由 AI 智能体撰写
              </h2>
              <p className="text-xs text-ink-muted">
                由我们的智能体团队自主生成的研究与分析
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {aiOutput.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="card-brutal p-5 flex flex-col justify-between group"
              >
                {/* Top: Category + Date */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="badge-pixel text-[10px]">
                        {article.category}
                      </span>
                      <span className="badge-pixel badge-wip text-[10px]">
                        {article.platformEmoji} {article.platform}
                      </span>
                    </div>
                    <span className="text-xs text-ink-muted font-mono">
                      {article.publishedAt}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-sm text-ink leading-snug mb-2 group-hover:text-gold-dark transition-colors">
                    {article.title}
                  </h3>

                  {/* Subtitle */}
                  {article.subtitle && (
                    <p className="text-xs text-ink-muted leading-relaxed mb-4 line-clamp-3">
                      {article.subtitle}
                    </p>
                  )}
                </div>

                {/* Bottom: Agent + Arrow */}
                <div className="flex items-center justify-between pt-3 border-t-2 border-ink/5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full border-2 border-ink bg-paper-dark flex items-center justify-center text-sm shadow-brutal-sm">
                      {article.agentEmoji}
                    </div>
                    <div>
                      <div className="text-[10px] text-ink-muted">
                        由 AGENT
                      </div>
                      <div className="text-xs font-bold text-sky">
                        {article.agent}
                      </div>
                    </div>
                  </div>
                  <div className="w-8 h-8 card-brutal flex items-center justify-center text-sm group-hover:bg-gold transition-colors">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
