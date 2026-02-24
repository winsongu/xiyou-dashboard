export interface ArticleImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  category: string; // 文章类型标签: "洞见" | "博客文章" | "教程" | "测评" | "视频脚本"
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
  section: "reviewed" | "ai-output"; // reviewed=审核待发布, ai-output=AI自主产出
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
  // =====================================================
  // 审核待发布 (reviewed) — 已经审核通过，等待人工确认发布
  // =====================================================
  {
    id: "mcp-deep-dive",
    title: "MCP 协议深度解析：AI Agent 的 USB 接口",
    subtitle:
      "为什么 MCP 会成为 AI 生态的事实标准？从协议设计到实战应用全面解读",
    category: "洞见",
    platform: "微信公众号",
    platformEmoji: "💬",
    agent: "太白金星",
    agentEmoji: "⭐",
    publishedAt: "2025-02-23",
    readTime: "12 分钟",
    section: "reviewed",
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
      { type: "divider" },
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
    id: "gemini-25-pro",
    title: "Gemini 2.5 Pro 发布：100万 Token 上下文实测",
    subtitle:
      "Google 最强模型来了，但它真的能处理 100 万 Token 吗？",
    category: "测评",
    platform: "微信公众号",
    platformEmoji: "💬",
    agent: "太白金星",
    agentEmoji: "⭐",
    publishedAt: "2025-02-22",
    readTime: "15 分钟",
    section: "reviewed",
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
        text: "我们在 5 个维度对 Gemini 2.5 Pro 进行了全面评测，对比对象包括 Claude 3.5 Sonnet、GPT-4o 和 Kimi K2。",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=350&fit=crop",
        alt: "数据分析图表",
        caption: "图 1：五维评测雷达图（满分 100）",
      },
      {
        type: "heading",
        level: 2,
        text: "价格与性价比分析",
      },
      {
        type: "paragraph",
        text: "Gemini 2.5 Pro 的定价为输入 $1.25/M tokens，输出 $10/M tokens。与 Claude 3.5 Sonnet 对比：同等上下文长度的请求，Gemini 的成本约高出 2-3 倍。",
      },
      {
        type: "quote",
        text: "如果你的使用场景需要理解整个代码库，Gemini 2.5 Pro 可能是目前唯一的选择。",
        author: "太白金星",
      },
    ],
    tags: ["Gemini", "Google", "大模型", "LLM"],
    qualityScore: 93,
    humanizerScore: 90,
    status: "published",
  },

  // =====================================================
  // AI 自主产出 (ai-output) — AI 自动生成，等待人工确认审核
  // =====================================================
  {
    id: "cursor-046-bg-agent",
    title: "Cursor 0.46 更新：Background Agent 实测",
    subtitle:
      "后台自动编程时代来临？我们花了 48 小时深度体验",
    category: "博客文章",
    platform: "小红书",
    platformEmoji: "📕",
    agent: "蜘蛛精",
    agentEmoji: "🕷️",
    publishedAt: "2025-02-24",
    readTime: "8 分钟",
    section: "ai-output",
    coverImages: [
      {
        url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
        alt: "编程IDE界面",
        caption: "Cursor 0.46 全新 Background Agent 功能",
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
        text: "Background Agent 是 Cursor 0.46 版本引入的革命性功能。与传统的 AI 编程助手不同，它不需要你盯着屏幕等待。",
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
          "✅ 真正的异步编程，适合重复性任务",
          "✅ 独立环境，不影响本地开发",
          "❌ 需要 Pro 订阅（$20/月）",
          "❌ 复杂项目理解能力有限",
        ],
      },
      {
        type: "quote",
        text: "Background Agent 不是要取代程序员，而是给程序员一个不知疲倦的实习生。",
        author: "蜘蛛精",
      },
    ],
    tags: ["Cursor", "AI IDE", "Background Agent", "编程工具"],
    qualityScore: 84,
    humanizerScore: 82,
    status: "review",
  },
  {
    id: "ai-content-pipeline",
    title: "构建 AI 内容流水线：15 分钟内从 RSS 订阅到文章发布",
    subtitle:
      "利用 AI 构建自动化内容流水线，将 RSS 订阅源转化为已发布文章",
    category: "博客文章",
    platform: "微信公众号",
    platformEmoji: "💬",
    agent: "太白金星",
    agentEmoji: "⭐",
    publishedAt: "2025-02-23",
    readTime: "10 分钟",
    section: "ai-output",
    coverImages: [
      {
        url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=400&fit=crop",
        alt: "数据流水线",
        caption: "从数据到内容的自动化流水线",
      },
    ],
    content: [
      {
        type: "callout",
        emoji: "🔧",
        title: "教程摘要",
        text: "了解如何利用 AI 构建自动化内容流水线，将 RSS 订阅源转化为已发布文章，并通过真实案例演示如何在 15 分钟内完成科技新闻处理。",
      },
      {
        type: "heading",
        level: 2,
        text: "架构设计",
      },
      {
        type: "paragraph",
        text: "整个流水线分为四个阶段：RSS 抓取 → 内容分析 → AI 改写 → 多平台发布。每个阶段都可以独立配置和监控。",
      },
    ],
    tags: ["AI 自动化", "内容流水线", "RSS", "自动发布"],
    qualityScore: 87,
    humanizerScore: 85,
    status: "review",
  },
  {
    id: "code-review-bot",
    title: "公开构建 AI 智能体：创建代码审查机器人的经验教训",
    subtitle:
      "跟随一个代码审查 AI 智能体从首次提交到上线的完整历程",
    category: "博客文章",
    platform: "知乎",
    platformEmoji: "💎",
    agent: "哪吒",
    agentEmoji: "🔥",
    publishedAt: "2025-02-23",
    readTime: "12 分钟",
    section: "ai-output",
    coverImages: [
      {
        url: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop",
        alt: "代码审查",
        caption: "AI 代码审查机器人架构",
      },
    ],
    content: [
      {
        type: "callout",
        emoji: "🤖",
        title: "项目背景",
        text: "跟随一个代码审查 AI 智能体从首次提交到上线的完整历程，涵盖技术决策、用户反馈以及沿途收获的经验教训。",
      },
      {
        type: "heading",
        level: 2,
        text: "为什么需要 AI 代码审查？",
      },
      {
        type: "paragraph",
        text: "人工代码审查是软件开发中最耗时的环节之一。AI 代码审查机器人可以在几秒内完成初步审查，让人类审查者专注于架构级别的讨论。",
      },
    ],
    tags: ["AI Agent", "代码审查", "开源", "实战"],
    qualityScore: 82,
    humanizerScore: 79,
    status: "review",
  },
  {
    id: "ai-native-enterprise",
    title: "原生 AI 企业：为何从零构建胜过后期追加",
    subtitle:
      "以 AI 为基石构建的企业与后期改造 AI 的企业存在本质差异",
    category: "洞见",
    platform: "微信公众号",
    platformEmoji: "💬",
    agent: "太白金星",
    agentEmoji: "⭐",
    publishedAt: "2025-02-23",
    readTime: "9 分钟",
    section: "ai-output",
    coverImages: [
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop",
        alt: "现代企业",
        caption: "AI 原生企业的竞争优势",
      },
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "什么是 AI 原生企业？",
      },
      {
        type: "paragraph",
        text: "本文将阐释为何第一天的架构决策将决定竞争优势。AI 原生企业从组织结构、产品设计到运营流程，都以 AI 为核心进行设计。",
      },
    ],
    tags: ["AI 企业", "商业", "架构决策"],
    qualityScore: 89,
    humanizerScore: 86,
    status: "review",
  },
  {
    id: "three-ai-architectures",
    title: "三种 AI 智能体架构模式：何时使用哪一种",
    subtitle:
      "探索三种经过验证的 AI 智能体架构——反应式、审议式和混合式",
    category: "博客文章",
    platform: "知乎",
    platformEmoji: "💎",
    agent: "哪吒",
    agentEmoji: "🔥",
    publishedAt: "2025-02-22",
    readTime: "11 分钟",
    section: "ai-output",
    coverImages: [
      {
        url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop",
        alt: "技术架构",
        caption: "三种 AI 智能体架构对比",
      },
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "架构选择指南",
      },
      {
        type: "paragraph",
        text: "通过实际案例和决策标准，为您的应用场景选择最合适的模式。反应式适合简单任务，审议式适合复杂推理，混合式适合需要灵活切换的场景。",
      },
    ],
    tags: ["AI 架构", "Agent", "系统设计"],
    qualityScore: 85,
    humanizerScore: 83,
    status: "review",
  },
  {
    id: "raw-data-to-article",
    title: "构建 AI 内容流水线：从原始数据到发布文章",
    subtitle:
      "学习如何通过构建一个将原始数据转化为精修文章的流程",
    category: "博客文章",
    platform: "小红书",
    platformEmoji: "📕",
    agent: "蜘蛛精",
    agentEmoji: "🕷️",
    publishedAt: "2025-02-22",
    readTime: "7 分钟",
    section: "ai-output",
    coverImages: [
      {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
        alt: "内容创作",
        caption: "从数据到文章的转化流程",
      },
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "流水线设计",
      },
      {
        type: "paragraph",
        text: "利用人工智能实现内容创作自动化。包含一个使用产品目录和客户评价的真实案例。从数据清洗、结构化到内容生成，全流程自动化。",
      },
    ],
    tags: ["内容创作", "自动化", "流水线"],
    qualityScore: 81,
    humanizerScore: 80,
    status: "review",
  },
  {
    id: "voxyz-24h-lessons",
    title: "24小时自主运营：哪些环节出现问题，哪些环节运行良好",
    subtitle:
      "AI 无人值守运行 24 小时的核心经验总结",
    category: "洞见",
    platform: "微信公众号",
    platformEmoji: "💬",
    agent: "太白金星",
    agentEmoji: "⭐",
    publishedAt: "2025-02-22",
    readTime: "6 分钟",
    section: "ai-output",
    coverImages: [
      {
        url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
        alt: "团队协作",
        caption: "24 小时自主运营经验分享",
      },
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "运营总结",
      },
      {
        type: "paragraph",
        text: "包括 3 个关键故障点和 2 个意外收获，这些经验塑造了我们的自动化策略。无人值守运行暴露了意外的瓶颈、内存溢出和用户行为模式。",
      },
    ],
    tags: ["自主运营", "AI Agent", "经验总结"],
    qualityScore: 88,
    humanizerScore: 87,
    status: "review",
  },
  {
    id: "async-video-standup",
    title: "面向工程团队的异步视频站会",
    subtitle:
      "用结构化的异步视频更新取代每日同步站会",
    category: "洞见",
    platform: "视频号",
    platformEmoji: "🎬",
    agent: "二郎神",
    agentEmoji: "👁️",
    publishedAt: "2025-02-21",
    readTime: "5 分钟",
    section: "ai-output",
    coverImages: [
      {
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
        alt: "远程团队协作",
        caption: "异步视频站会方案",
      },
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "为什么要异步站会？",
      },
      {
        type: "paragraph",
        text: "通过 AI 转录自动生成任务卡片。减少上下文切换，同时保持跨时区团队协同。结构化的视频更新取代每日同步站会。",
      },
    ],
    tags: ["团队协作", "异步", "视频站会"],
    qualityScore: 80,
    humanizerScore: 78,
    status: "draft",
  },
  {
    id: "ai-cobuilding-90-days",
    title: "与 AI 智能体公开共建：90 天后的心得体会",
    subtitle:
      "公开构建 AI 智能体产品的真实历程",
    category: "博客文章",
    platform: "微信公众号",
    platformEmoji: "💬",
    agent: "太白金星",
    agentEmoji: "⭐",
    publishedAt: "2025-02-21",
    readTime: "8 分钟",
    section: "ai-output",
    coverImages: [
      {
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
        alt: "团队协作",
        caption: "90 天公开共建历程",
      },
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "90 天心得",
      },
      {
        type: "paragraph",
        text: "直面实际挑战，分享有效策略，并总结在社交媒体上实时部署智能体工作流的经验教训。公开构建 AI 智能体产品的真实历程。",
      },
    ],
    tags: ["公开构建", "AI Agent", "经验分享"],
    qualityScore: 86,
    humanizerScore: 84,
    status: "review",
  },
];

export function getArticleById(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function getAllArticles(): Article[] {
  return articles;
}

export function getReviewedArticles(): Article[] {
  return articles.filter((a) => a.section === "reviewed");
}

export function getAiOutputArticles(): Article[] {
  return articles.filter((a) => a.section === "ai-output");
}
