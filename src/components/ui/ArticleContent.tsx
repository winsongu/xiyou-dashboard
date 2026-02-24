import type { ArticleBlock } from "@/data/articles";

function RenderBlock({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "heading":
      if (block.level === 2) {
        return (
          <h2 className="text-xl font-bold text-ink mt-8 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-gold rounded-sm inline-block" />
            {block.text}
          </h2>
        );
      }
      return (
        <h3 className="text-lg font-bold text-ink mt-6 mb-3">{block.text}</h3>
      );

    case "paragraph":
      return (
        <p className="text-sm text-ink-light leading-relaxed mb-4">
          {block.text}
        </p>
      );

    case "image":
      return (
        <figure className="my-6">
          <div className="card-brutal overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.url}
              alt={block.alt}
              className="w-full h-auto"
            />
          </div>
          {block.caption && (
            <figcaption className="text-center text-[11px] text-ink-muted mt-2 font-medium">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "quote":
      return (
        <blockquote className="my-6 card-brutal border-l-4 border-l-gold bg-gold/5 p-4">
          <p className="text-sm text-ink italic leading-relaxed">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.author && (
            <cite className="text-xs text-ink-muted mt-2 block not-italic">
              — {block.author}
            </cite>
          )}
        </blockquote>
      );

    case "code":
      return (
        <div className="my-6 card-brutal overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-ink border-b border-[#3a3a3a]">
            <span className="w-2.5 h-2.5 rounded-full bg-fire" />
            <span className="w-2.5 h-2.5 rounded-full bg-gold" />
            <span className="w-2.5 h-2.5 rounded-full bg-jade" />
            <span className="text-[10px] font-mono text-ink-muted ml-2">
              {block.language}
            </span>
          </div>
          <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 overflow-x-auto text-xs font-mono leading-relaxed">
            <code>{block.code}</code>
          </pre>
        </div>
      );

    case "list":
      if (block.ordered) {
        return (
          <ol className="my-4 space-y-2 pl-1">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-ink-light">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-sm bg-gold/20 border border-gold-dark text-[10px] font-bold text-ink shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="my-4 space-y-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink-light">
              <span className="text-gold-dark mt-0.5 shrink-0">▸</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "callout":
      return (
        <div className="my-6 card-brutal bg-gold/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{block.emoji}</span>
            <span className="font-bold text-sm text-ink">{block.title}</span>
          </div>
          <p className="text-sm text-ink-light leading-relaxed">{block.text}</p>
        </div>
      );

    case "divider":
      return (
        <div className="my-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-ink/10" />
          <span className="text-xs text-ink-muted">✦ ✦ ✦</span>
          <div className="h-px flex-1 bg-ink/10" />
        </div>
      );

    default:
      return null;
  }
}

export default function ArticleContent({
  blocks,
}: {
  blocks: ArticleBlock[];
}) {
  return (
    <div className="article-content">
      {blocks.map((block, idx) => (
        <RenderBlock key={idx} block={block} />
      ))}
    </div>
  );
}
