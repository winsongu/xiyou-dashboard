"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { kanbanItems as initialItems } from "@/data/kanban";
import { agents } from "@/data/agents";
import type { KanbanItem, KanbanStatus } from "@/lib/types";

const statusColumns: {
  status: KanbanStatus;
  icon: string;
  color: string;
  countColor: string;
}[] = [
  { status: "待办", icon: "○", color: "text-ink-muted", countColor: "text-ink-muted" },
  { status: "进行中", icon: "◐", color: "text-sky", countColor: "text-sky" },
  { status: "审核中", icon: "◉", color: "text-gold-dark", countColor: "text-gold-dark" },
  { status: "已完成", icon: "●", color: "text-jade", countColor: "text-jade" },
];

function KanbanCard({ item }: { item: KanbanItem }) {
  return (
    <div className="card-brutal p-4 bg-white">
      {/* Platform Icon + Priority */}
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-lg">{item.platformEmoji}</span>
        {item.priority === "high" && (
          <span className="w-2.5 h-2.5 rounded-full bg-fire" />
        )}
      </div>

      {/* Title */}
      <h3 className="font-bold text-sm text-ink leading-snug mb-3">
        {item.title}
      </h3>

      {/* Bottom: Agent + Due */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{item.agentEmoji}</span>
          <span className="text-[10px] font-bold text-ink-light">
            {item.agent}
          </span>
        </div>
        {item.dueLabel && (
          <div className="flex items-center gap-1 text-[10px] text-ink-muted">
            <span>📅</span>
            <span>{item.dueLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SortableCard({ item }: { item: KanbanItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, data: { status: item.status } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <KanbanCard item={item} />
    </div>
  );
}

function DroppableColumn({
  colStatus,
  items,
  icon,
  color,
  countColor,
}: {
  colStatus: KanbanStatus;
  items: KanbanItem[];
  icon: string;
  color: string;
  countColor: string;
}) {
  const { setNodeRef } = useSortable({
    id: `column-${colStatus}`,
    data: { type: "column", status: colStatus },
    disabled: true,
  });

  return (
    <div className="flex flex-col" ref={setNodeRef}>
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <span className={`text-base ${color}`}>{icon}</span>
          <span className="font-bold text-sm text-ink">{colStatus}</span>
        </div>
        <span className={`text-sm font-bold font-mono ${countColor}`}>
          {items.length}
        </span>
      </div>

      {/* Cards */}
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3 min-h-[120px]">
          {items.map((item) => (
            <SortableCard key={item.id} item={item} />
          ))}

          {items.length === 0 && (
            <div className="text-center text-xs text-ink-muted py-8 border-2 border-dashed border-ink/10 rounded">
              拖拽卡片到此处
            </div>
          )}

          {/* Add Task Placeholder */}
          <button className="w-full py-3 text-xs text-ink-muted border-2 border-dashed border-ink/15 rounded hover:border-ink/30 hover:text-ink-light transition-colors">
            + 添加任务
          </button>
        </div>
      </SortableContext>
    </div>
  );
}

export default function KanbanPage() {
  const [items, setItems] = useState<KanbanItem[]>(initialItems);
  const [activeItem, setActiveItem] = useState<KanbanItem | null>(null);
  const [filterAgent, setFilterAgent] = useState<string>("全部");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Get unique agents from items for filter
  const agentList = [
    { name: "全部", emoji: "" },
    ...agents
      .filter((a) => items.some((i) => i.agent === a.name))
      .map((a) => ({ name: a.name, emoji: a.emoji })),
  ];

  function handleDragStart(event: DragStartEvent) {
    const draggedItem = items.find((i) => i.id === event.active.id);
    if (draggedItem) setActiveItem(draggedItem);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveItem(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    let targetStatus: KanbanStatus | null = null;

    if (typeof over.id === "string" && over.id.startsWith("column-")) {
      targetStatus = over.id.replace("column-", "") as KanbanStatus;
    } else {
      const overItem = items.find((i) => i.id === over.id);
      if (overItem) targetStatus = overItem.status;
    }

    if (targetStatus) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === activeId ? { ...item, status: targetStatus } : item
        )
      );
    }
  }

  function getItemsByStatus(status: KanbanStatus): KanbanItem[] {
    return items
      .filter((i) => i.status === status)
      .filter((i) => filterAgent === "全部" || i.agent === filterAgent);
  }

  // Stats (based on all items, not filtered)
  const stats = {
    total: items.length,
    todo: items.filter((i) => i.status === "待办").length,
    inProgress: items.filter((i) => i.status === "进行中").length,
    reviewing: items.filter((i) => i.status === "审核中").length,
    done: items.filter((i) => i.status === "已完成").length,
  };

  return (
    <div className="min-h-screen bg-paper py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-ink">任务看板</h1>
            <p className="text-sm text-ink-muted mt-1">
              团队协作与任务进度追踪
            </p>
          </div>
          <button className="btn-pixel btn-pixel-fire text-sm">
            + 新建任务
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          <div className="card-brutal px-4 py-3 text-center">
            <div className="text-2xl font-bold text-ink font-mono">
              {stats.total}
            </div>
            <div className="text-[10px] text-ink-muted font-bold">总任务</div>
          </div>
          <div className="card-brutal px-4 py-3 text-center">
            <div className="text-2xl font-bold text-ink-muted font-mono">
              {stats.todo}
            </div>
            <div className="text-[10px] text-ink-muted font-bold">待办</div>
          </div>
          <div className="card-brutal px-4 py-3 text-center">
            <div className="text-2xl font-bold text-sky font-mono">
              {stats.inProgress}
            </div>
            <div className="text-[10px] text-ink-muted font-bold">进行中</div>
          </div>
          <div className="card-brutal px-4 py-3 text-center">
            <div className="text-2xl font-bold text-gold-dark font-mono">
              {stats.reviewing}
            </div>
            <div className="text-[10px] text-ink-muted font-bold">审核中</div>
          </div>
          <div className="card-brutal px-4 py-3 text-center">
            <div className="text-2xl font-bold text-fire font-mono">
              {stats.done}
            </div>
            <div className="text-[10px] text-ink-muted font-bold">已完成</div>
          </div>
        </div>

        {/* Agent Filter */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          <span className="text-xs text-ink-muted font-bold whitespace-nowrap">
            🔍 筛选：
          </span>
          {agentList.map((agent) => (
            <button
              key={agent.name}
              onClick={() => setFilterAgent(agent.name)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold
                border-2 rounded-sm transition-all whitespace-nowrap
                ${
                  filterAgent === agent.name
                    ? "bg-ink text-white border-ink shadow-brutal-sm"
                    : "border-ink/20 text-ink-light hover:border-ink hover:bg-white"
                }
              `}
            >
              {agent.emoji && <span className="text-sm">{agent.emoji}</span>}
              <span>{agent.name}</span>
            </button>
          ))}
        </div>

        {/* Kanban Columns with DnD */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statusColumns.map((col) => (
              <DroppableColumn
                key={col.status}
                colStatus={col.status}
                items={getItemsByStatus(col.status)}
                icon={col.icon}
                color={col.color}
                countColor={col.countColor}
              />
            ))}
          </div>

          <DragOverlay>
            {activeItem ? (
              <div className="w-[250px] rotate-2 opacity-90">
                <KanbanCard item={activeItem} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
