// 西游编队 - 核心类型定义

export interface Agent {
  id: string;
  name: string;
  emoji: string;
  role: string;
  title: string; // RPG 职位
  platform?: string;
  model: string;
  cronTime?: string;
  status: "active" | "idle" | "error";
  hp: number; // 0-100
  mp: number; // 0-100
  exp: number;
  level: number;
  stats: {
    tasksToday: number;
    tasksTotal: number;
    avgScore: number;
    streak: number; // 连续天数
  };
  skills: string[];
  description: string;
}

export type KanbanStatus = "待办" | "进行中" | "审核中" | "已完成";

export interface KanbanItem {
  id: string;
  title: string;
  platform: string;
  platformEmoji: string;
  agent: string;
  agentEmoji: string;
  status: KanbanStatus;
  priority?: "high" | "normal" | "low";
  dueLabel?: string; // e.g. "今天", "明天", "后天", "本周"
  qualityScore?: number;
  humanizerScore?: number;
  createdAt: string;
  updatedAt: string;
}

export interface KanbanStats {
  total: number;
  todo: number;
  inProgress: number;
  reviewing: number;
  done: number;
}

export interface IntelItem {
  rank: number;
  title: string;
  source: string;
  sourceEmoji: string;
  score: {
    R: number; // Relevance
    Q: number; // Quality
    T: number; // Timeliness
    total: number;
  };
  category: string;
  briefGenerated: boolean;
  articleId?: string; // 关联文章 ID，有值则可点击查看详情
  platformFit: {
    xhs: number;
    wx: number;
    zhihu: number;
    video: number;
  };
}

export interface SourceStatus {
  name: string;
  emoji: string;
  status: "online" | "offline" | "error";
  lastScan: string;
  articlesFound: number;
  duration: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  agent: string;
  agentEmoji: string;
  action: string;
  detail?: string;
  type: "info" | "success" | "warning" | "error";
}

export interface WorkflowStep {
  id: string;
  name: string;
  agent: string;
  agentEmoji: string;
  status: "completed" | "active" | "pending";
  description: string;
}

export interface GovernanceRule {
  code: string;
  title: string;
  description: string;
  category: "quality" | "process" | "security" | "collaboration";
}

export interface DailyReport {
  date: string;
  decisionsNeeded: string[];
  achievements: string[];
  intel: string[];
  alternativeTopics: string[];
  issues: string[];
  teamStatus: { agent: string; status: string }[];
}
