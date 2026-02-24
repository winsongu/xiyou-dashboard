export interface ArticleImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  platform: string;
  platformEmoji: string;
  agent: string;
  agentEmoji: string;
  publishedAt: string;
  readTime: string;
  coverImages: ArticleImage[]; // 轮播图
  content: ArticleBlock[]; // 图文混排内容
  tags: string[];
  qualityScore?: number;
  humanizerScore?: number;
  status: "draft" | "review" | "published";
}

export type ArticleBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; url: string; alt: string; caption?: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "code"; language: string; code: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "callout"; emoji: string; title: string; text: string }
  | { type: "divider" };

export const articles: Article[] = [
  {
    id: "mcp-deep-dive",
    title: "MCP 协议深度解析：AI Agent 的 USB 接口",
    subtitle: "为什么 MCP 会成为 AI 生态的事实标准？从协议设计到实战应用全面解读",
    category: "AI 基建",
    platform: "微信公众号",
    platformEmoji: "💬",
    agent: "太白金星",
    agentEmoji: "⭐",
    publishedAt: "2025-02-23",
    readTime: "12 分钟",
    coverImages: [
      {
        url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
        alt: "AI 网络连接概念图",
        caption: "MCP 协议：连接 AI 与外部世界的桥梁",
      },
      {
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
        alt: "数据中心服务器",
        caption: "MCP Server 架构示意",
      },
      {
        url: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=400&fit=crop",
        alt: "代码编程",
        caption: "从零搭建 MCP Server",
      },
    ],
    content: [
      {
        type: "callout",
        emoji: "💡",
        title: "一句话总结",
        text: "MCP（Model Context Protocol）是 Anthropic 推出的开放协议，让 AI 模型能够安全、标准化地连接外部数据源和工具，就像 USB 之于电脑外设。",
      },
      {
        type: "heading",
        level: 2,
        text: "为什么需要 MCP？",
      },
      {
        type: "paragraph",
        text: "在 MCP 出现之前，每个 AI 应用想要连接外部服务，都需要自己实现一套集成方案。这就像在 USB 发明之前，每种外设都需要不同的接口标准。MCP 的出现，统一了 AI Agent 与外部世界的通信协议。",
      },
      {
        type: "paragraph",
        text: "2025 年 2 月，OpenAI 正式宣布支持 MCP 协议，标志着这一标准获得了整个行业的认可。从 Claude、ChatGPT 到国内的 Kimi、通义，MCP 正在成为 AI 生态的 \"USB-C\"。",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=350&fit=crop",
        alt: "MCP 架构图",
        caption: "图 1：MCP 协议的三层架构 — Host / Client / Server",
      },
      {
        type: "heading",
        level: 2,
        text: "MCP 的核心架构",
      },
      {
        type: "paragraph",
        text: "MCP 采用经典的客户端-服务器架构，由三个核心角色组成：",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Host（宿主）：AI 应用本身，如 Claude Desktop、Cursor IDE",
          "Client（客户端）：MCP 客户端，负责与 Server 建立连接",
          "Server（服务端）：提供工具、资源和 Prompt 的外部服务",
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "Server 提供的三种能力",
      },
      {
        type: "paragraph",
        text: "每个 MCP Server 可以暴露三种类型的能力给 AI：",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Tools（工具）：可执行的操作，如发送邮件、查询数据库",
          "Resources（资源）：可读取的数据，如文件内容、API 响应",
          "Prompts（提示）：预定义的 Prompt 模板，简化复杂交互",
        ],
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=350&fit=crop",
        alt: "编程开发",
        caption: "图 2：实际开发中，一个 MCP Server 只需几十行代码就能搭建",
      },
      {
        type: "heading",
        level: 2,
        text: "实战：从零搭建 MCP Server",
      },
      {
        type: "paragraph",
        text: "让我们用 TypeScript 快速搭建一个 MCP Server。这个 Server 将提供一个简单的天气查询工具：",
      },
      {
        type: "code",
        language: "typescript",
        code: `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "weather-server",
  version: "1.0.0",
});

server.tool("get_weather", { city: "string" }, async ({ city }) => {
  const data = await fetch(\`https://api.weather.com/\${city}\`);
  return { content: [{ type: "text", text: JSON.stringify(data) }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);`,
      },
      {
        type: "callout",
        emoji: "🔥",
        title: "关键要点",
        text: "MCP Server 的通信基于 JSON-RPC 2.0 协议，支持 stdio 和 HTTP+SSE 两种传输方式。对于本地工具推荐 stdio，对于远程服务推荐 HTTP。",
      },
      {
        type: "heading",
        level: 2,
        text: "行业影响与未来展望",
      },
      {
        type: "paragraph",
        text: "MCP 协议的普及意味着 AI Agent 生态即将迎来爆发期。就像 App Store 开放 API 催生了移动互联网生态一样，MCP 将催生大量的 AI 原生工具和服务。",
      },
      {
        type: "quote",
        text: "MCP 之于 AI Agent，就像 HTTP 之于 Web。它不仅是一个技术协议，更是一个生态共识。",
        author: "飞月 AI 编辑部",
      },
      {
        type: "divider",
      },
      {
        type: "paragraph",
        text: "总结来看，MCP 协议凭借其简洁的设计、强大的扩展性以及行业巨头的背书，已经奠定了 AI Agent 基础设施的地位。对于开发者来说，现在正是学习和布局 MCP 生态的最佳时机。",
      },
    ],
    tags: ["MCP", "AI Agent", "协议", "Anthropic", "OpenAI"],
    qualityScore: 91,
    humanizerScore: 88,
    status: "published",
  },
  {
    id: "cursor-046-bg-agent",
    title: "Cursor 0.46 更新：Background Agent 实测",
    subtitle: "后台自动编程时代来临？我们花了 48 小时深度体验",
    category: "AI 编程",
    platform: "小红书",
    platformEmoji: "📕",
    agent: "蜘蛛精",
    agentEmoji: "🕷️",
    publishedAt: "2025-02-23",
    readTime: "8 分钟",
    coverImages: [
      {
        url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
        alt: "编程IDE界面",
        caption: "Cursor 0.46 全新 Background Agent 功能",
      },
      {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
        alt: "代码编辑器",
        caption: "Background Agent 在后台自动完成编程任务",
      },
    ],
    content: [
      {
        type: "callout",
        emoji: "⚡",
        title: "速读要点",
        text: "Cursor 0.46 最大亮点是 Background Agent：你可以把编程任务丢给它，然后去喝杯咖啡，回来代码就写好了。",
      },
      {
        type: "heading",
        level: 2,
        text: "什么是 Background Agent？",
      },
      {
        type: "paragraph",
        text: "Background Agent 是 Cursor 0.46 版本引入的革命性功能。与传统的 AI 编程助手不同，它不需要你盯着屏幕等待——你可以在后台启动一个编程任务，然后继续做其他事情。",
      },
      {
        type: "paragraph",
        text: "它基于云端虚拟机运行，拥有独立的开发环境。这意味着它可以安装依赖、运行测试、甚至启动开发服务器来验证自己的代码。",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=350&fit=crop",
        alt: "笔记本电脑编程",
        caption: "图 1：Background Agent 工作流程——提交任务后即可离开",
      },
      {
        type: "heading",
        level: 2,
        text: "实测体验：优缺点一览",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "✅ 优点：真正的异步编程，适合重复性任务",
          "✅ 优点：独立环境，不影响本地开发",
          "✅ 优点：支持多任务并行",
          "❌ 缺点：需要 Pro 订阅（$20/月）",
          "❌ 缺点：复杂项目理解能力有限",
          "❌ 缺点：网络依赖，离线无法使用",
        ],
      },
      {
        type: "quote",
        text: "Background Agent 不是要取代程序员，而是给程序员一个不知疲倦的实习生。",
        author: "蜘蛛精",
      },
      {
        type: "heading",
        level: 2,
        text: "适用场景推荐",
      },
      {
        type: "paragraph",
        text: "经过 48 小时的深度测试，我们总结出 Background Agent 最适合的三类场景：单元测试编写、代码重构、以及样板代码生成。对于需要深度上下文理解的复杂任务，目前还是建议使用 Tab 模式的 Composer。",
      },
    ],
    tags: ["Cursor", "AI IDE", "Background Agent", "编程工具"],
    qualityScore: 84,
    humanizerScore: 82,
    status: "review",
  },
  {
    id: "gemini-25-pro",
    title: "Gemini 2.5 Pro 发布：100万 Token 上下文实测",
    subtitle: "Google 最强模型来了，但它真的能处理 100 万 Token 吗？",
    category: "大模型",
    platform: "微信公众号",
    platformEmoji: "💬",
    agent: "太白金星",
    agentEmoji: "⭐",
    publishedAt: "2025-02-22",
    readTime: "15 分钟",
    coverImages: [
      {
        url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
        alt: "AI 机器人",
        caption: "Gemini 2.5 Pro：Google 的 AI 杀手锏",
      },
      {
        url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop",
        alt: "神经网络",
        caption: "100 万 Token 上下文窗口的技术突破",
      },
      {
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop",
        alt: "数据矩阵",
        caption: "基准测试成绩全面领先",
      },
    ],
    content: [
      {
        type: "callout",
        emoji: "🏆",
        title: "核心结论",
        text: "Gemini 2.5 Pro 在 LMArena 全品类排名第一，100 万 Token 上下文真实可用，但价格也是真的贵。",
      },
      {
        type: "heading",
        level: 2,
        text: "性能基准测试",
      },
      {
        type: "paragraph",
        text: "我们在 5 个维度对 Gemini 2.5 Pro 进行了全面评测，对比对象包括 Claude 3.5 Sonnet、GPT-4o 和 Kimi K2。测试涵盖代码生成、长文理解、多模态识别、逻辑推理和创意写作。",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=350&fit=crop",
        alt: "数据分析图表",
        caption: "图 1：五维评测雷达图（满分 100）",
      },
      {
        type: "heading",
        level: 3,
        text: "代码生成能力",
      },
      {
        type: "paragraph",
        text: "在 HumanEval 和 SWE-bench 基准测试中，Gemini 2.5 Pro 的表现令人印象深刻。特别是在多文件代码理解和大型项目重构方面，100 万 Token 的上下文窗口终于让 AI \"看到\" 了完整的项目全貌。",
      },
      {
        type: "code",
        language: "python",
        code: `# Gemini 2.5 Pro 可以理解的项目规模
# 约等于 50,000 行代码 + 完整文档
project_tokens = {
    "source_code": 600_000,   # ~30K 行代码
    "documentation": 200_000, # README + API 文档
    "test_files": 150_000,    # 测试代码
    "config": 50_000,         # 配置文件
    "total": 1_000_000        # 100 万 Token
}`,
      },
      {
        type: "heading",
        level: 2,
        text: "价格与性价比分析",
      },
      {
        type: "paragraph",
        text: "Gemini 2.5 Pro 的定价为输入 $1.25/M tokens，输出 $10/M tokens。与 Claude 3.5 Sonnet 对比：同等上下文长度的请求，Gemini 的成本约高出 2-3 倍。但考虑到其独有的百万级上下文能力，在特定场景下物有所值。",
      },
      {
        type: "quote",
        text: "如果你的使用场景需要理解整个代码库，Gemini 2.5 Pro 可能是目前唯一的选择。",
        author: "太白金星",
      },
    ],
    tags: ["Gemini", "Google", "大模型", "LLM", "100万Token"],
    qualityScore: 93,
    humanizerScore: 90,
    status: "published",
  },
];

export function getArticleById(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function getAllArticles(): Article[] {
  return articles;
}
