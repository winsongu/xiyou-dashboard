import Link from "next/link";
import { articles } from "@/data/articles";

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-paper py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-ink flex items-center gap-2">
            📝 内容库
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            Insights & Field Notes · 团队产出的文章与内容
          </p>
        </div>

        {/* Articles Grid - VoxYZ Insights Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="card-brutal overflow-hidden group"
            >
              {/* Cover Image */}
              <div className="aspect-[16/9] bg-ink overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.coverImages[0]?.url}
                  alt={article.coverImages[0]?.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <span className="badge-pixel bg-ink text-white text-[10px]">
                    {article.category}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="text-lg">{article.platformEmoji}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Date */}
                <div className="text-[10px] text-ink-muted font-mono mb-2">
                  {article.publishedAt} · {article.readTime}
                </div>

                {/* Title */}
                <h2 className="font-bold text-sm text-ink leading-snug mb-2 group-hover:text-gold-dark transition-colors line-clamp-2">
                  {article.title}
                </h2>

                {/* Subtitle */}
                {article.subtitle && (
                  <p className="text-xs text-ink-muted leading-relaxed mb-3 line-clamp-2">
                    {article.subtitle}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-ink/5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{article.agentEmoji}</span>
                    <span className="text-[10px] font-bold text-ink-light">
                      {article.agent}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {article.qualityScore && (
                      <span
                        className={`text-[10px] font-mono font-bold ${
                          article.qualityScore >= 85
                            ? "text-jade"
                            : "text-gold-dark"
                        }`}
                      >
                        Q:{article.qualityScore}
                      </span>
                    )}
                    <span className="text-[10px] text-ink-muted">
                      {article.status === "published"
                        ? "✅"
                        : article.status === "review"
                        ? "🔍"
                        : "📝"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
