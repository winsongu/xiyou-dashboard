import { KanbanItem, KanbanStats } from "@/lib/types";

export const kanbanItems: KanbanItem[] = [
  // 待办
  {
    id: "k001",
    title: "知乎：回答《如何提升工作效率》",
    platform: "知乎",
    platformEmoji: "💎",
    agent: "哪吒",
    agentEmoji: "🔥",
    status: "待办",
    priority: "high",
    dueLabel: "后天",
    createdAt: "2025-02-23T02:15:00Z",
    updatedAt: "2025-02-23T02:15:00Z",
  },
  {
    id: "k002",
    title: "公众号：排版优化",
    platform: "微信公众号",
    platformEmoji: "💬",
    agent: "太白金星",
    agentEmoji: "⭐",
    status: "待办",
    dueLabel: "本周",
    createdAt: "2025-02-23T02:20:00Z",
    updatedAt: "2025-02-23T02:20:00Z",
  },

  // 进行中
  {
    id: "k003",
    title: "小红书：夏日护肤攻略图文",
    platform: "小红书",
    platformEmoji: "📕",
    agent: "蜘蛛精",
    agentEmoji: "🕷️",
    status: "进行中",
    priority: "high",
    dueLabel: "今天",
    createdAt: "2025-02-23T02:30:00Z",
    updatedAt: "2025-02-23T04:30:00Z",
  },
  {
    id: "k004",
    title: "口播视频：脚本撰写《职场沟通技巧》",
    platform: "视频号",
    platformEmoji: "🎬",
    agent: "二郎神",
    agentEmoji: "👁️",
    status: "进行中",
    priority: "high",
    dueLabel: "今天",
    createdAt: "2025-02-23T02:35:00Z",
    updatedAt: "2025-02-23T03:50:00Z",
  },
  {
    id: "k005",
    title: "小红书：评论区互动回复",
    platform: "小红书",
    platformEmoji: "📕",
    agent: "蜘蛛精",
    agentEmoji: "🕷️",
    status: "进行中",
    dueLabel: "今天",
    createdAt: "2025-02-23T03:00:00Z",
    updatedAt: "2025-02-23T04:00:00Z",
  },
  {
    id: "k006",
    title: "知乎：话题热度监控报告",
    platform: "知乎",
    platformEmoji: "💎",
    agent: "哪吒",
    agentEmoji: "🔥",
    status: "进行中",
    priority: "high",
    dueLabel: "今天",
    createdAt: "2025-02-23T02:40:00Z",
    updatedAt: "2025-02-23T04:00:00Z",
  },

  // 审核中
  {
    id: "k007",
    title: "公众号：深度长文《职场进阶指南》",
    platform: "微信公众号",
    platformEmoji: "💬",
    agent: "太白金星",
    agentEmoji: "⭐",
    status: "审核中",
    dueLabel: "明天",
    qualityScore: 88,
    humanizerScore: 85,
    createdAt: "2025-02-22T02:45:00Z",
    updatedAt: "2025-02-23T05:00:00Z",
  },

  // 已完成
  {
    id: "k008",
    title: "数据分析：周报汇总",
    platform: "内部",
    platformEmoji: "📊",
    agent: "谛听",
    agentEmoji: "👂",
    status: "已完成",
    dueLabel: "昨天",
    qualityScore: 92,
    createdAt: "2025-02-22T02:10:00Z",
    updatedAt: "2025-02-22T06:00:00Z",
  },
];

export function getKanbanStats(): KanbanStats {
  const items = kanbanItems;
  return {
    total: items.length,
    todo: items.filter((i) => i.status === "待办").length,
    inProgress: items.filter((i) => i.status === "进行中").length,
    reviewing: items.filter((i) => i.status === "审核中").length,
    done: items.filter((i) => i.status === "已完成").length,
  };
}

export function getKanbanByStatus(
  status: KanbanItem["status"]
): KanbanItem[] {
  return kanbanItems.filter((item) => item.status === status);
}

export function getStatusCount(): Record<string, number> {
  const counts: Record<string, number> = {};
  kanbanItems.forEach((item) => {
    counts[item.status] = (counts[item.status] || 0) + 1;
  });
  return counts;
}
