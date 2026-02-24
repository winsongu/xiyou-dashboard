import { notFound } from "next/navigation";
import Link from "next/link";
import { articles, getArticleById } from "@/data/articles";
import ImageCarousel from "@/components/ui/ImageCarousel";
import ArticleContent from "@/components/ui/ArticleContent";

export function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-paper py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          href="/articles"
          className="btn-pixel mb-6 text-xs inline-flex items-center"
        >
          ← 返回内容库
        </Link>

        {/* Article Header */}
        <header className="mb-6">
          {/* Meta Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="badge-pixel text-[10px]">
              {article.category}
            </span>
            <span className="badge-pixel badge-wip text-[10px]">
              {article.platformEmoji} {article.platform}
            </span>
            <span className="badge-pixel text-[10px]">
              {article.status === "published"
                ? "✅ 已发布"
                : article.status === "review"
                ? "🔍 审核中"
                : "📝 草稿"}
            </span>
            {article.section === "ai-output" && (
              <span className="badge-pixel badge-upgrade text-[10px]">
                🤖 AI 产出
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-ink leading-tight mb-2">
            {article.title}
          </h1>

          {/* Subtitle */}
          {article.subtitle && (
            <p className="text-base text-ink-light leading-relaxed mb-4">
              {article.subtitle}
            </p>
          )}

          {/* Author & Meta */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-sm border-2 border-ink bg-paper-dark flex items-center justify-center text-lg shadow-brutal-sm">
                {article.agentEmoji}
              </div>
              <div>
                <div className="font-bold text-xs text-ink">
                  {article.agent}
                </div>
                <div className="text-[10px] text-ink-muted">
                  {article.publishedAt} · {article.readTime}
                </div>
              </div>
            </div>

            {/* Scores */}
            <div className="flex gap-2">
              {article.qualityScore && (
                <div className="card-brutal px-2 py-1 text-center">
                  <div
                    className={`text-sm font-bold font-mono ${
                      article.qualityScore >= 85
                        ? "text-jade"
                        : article.qualityScore >= 70
                        ? "text-gold-dark"
                        : "text-fire"
                    }`}
                  >
                    {article.qualityScore}
                  </div>
                  <div className="text-[9px] text-ink-muted">质量</div>
                </div>
              )}
              {article.humanizerScore && (
                <div className="card-brutal px-2 py-1 text-center">
                  <div className="text-sm font-bold font-mono text-sky">
                    {article.humanizerScore}
                  </div>
                  <div className="text-[9px] text-ink-muted">去味</div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Cover Carousel */}
        <ImageCarousel images={article.coverImages} />

        {/* Article Body */}
        <article className="card-brutal p-6 sm:p-8 mb-8">
          <ArticleContent blocks={article.content} />
        </article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="badge-pixel bg-paper-dark text-[10px]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        <div className="card-brutal p-6">
          <h3 className="font-bold text-sm text-ink mb-4">📚 更多文章</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {articles
              .filter((a) => a.id !== article.id)
              .slice(0, 4)
              .map((related) => (
                <Link
                  key={related.id}
                  href={`/articles/${related.id}`}
                  className="card-brutal p-3 hover:bg-gold/5 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{related.agentEmoji}</span>
                    <span className="text-[10px] text-ink-muted">
                      {related.agent} · {related.publishedAt}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-ink line-clamp-2">
                    {related.title}
                  </h4>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
