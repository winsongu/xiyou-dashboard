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
import { kanbanItems as initialItems, kanbanStats } from "@/data/kanban";
import type { KanbanItem, KanbanStatus } from "@/lib/types";

const statusColumns: { status: KanbanStatus; emoji: string; color: string }[] =
  [
    { status: "待领取", emoji: "📥", color: "bg-paper-dark" },
    { status: "生产中", emoji: "⚡", color: "bg-sky/20" },
    { status: "待审", emoji: "🔍", color: "bg-gold/20" },
    { status: "已通过", emoji: "✅", color: "bg-jade/20" },
    { status: "打回", emoji: "🔙", color: "bg-fire/20" },
    { status: "升级", emoji: "⬆️", color: "bg-purple/20" },
  ];

function getVerdictBadge(verdict?: string) {
  if (!verdict) return null;
  const map: Record<string, { label: string; cls: string }> = {
    PASS: { label: "PASS", cls: "badge-pass" },
    POLISH: { label: "POLISH", cls: "badge-upgrade" },
    REVISE: { label: "REVISE", cls: "badge-review" },
    REJECT: { label: "REJECT", cls: "badge-reject" },
  };
  const v = map[verdict];
  if (!v) return null;
  return <span className={`badge-pixel ${v.cls} text-[10px]`}>{v.label}</span>;
}

function KanbanCard({ item }: { item: KanbanItem }) {
  return (
    <div className="card-brutal p-3 bg-white">
      {/* Platform & Agent */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg">{item.platformEmoji}</span>
        <div className="flex items-center gap-1">
          <span className="text-sm">{item.agentEmoji}</span>
          <span className="text-[10px] font-bold text-ink-light">
            {item.agent}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-bold text-xs text-ink leading-snug mb-2 line-clamp-3">
        {item.title}
      </h3>

      {/* Scores */}
      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
        <span className="text-ink-muted">B:{item.briefScore}</span>
        {item.qualityScore && (
          <span
            className={
              item.qualityScore >= 85
                ? "text-jade font-bold"
                : item.qualityScore >= 70
                ? "text-gold-dark"
                : "text-fire"
            }
          >
            Q:{item.qualityScore}
          </span>
        )}
        {item.humanizerScore && (
          <span className="text-sky">H:{item.humanizerScore}</span>
        )}
        {getVerdictBadge(item.reviewVerdict)}
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
  emoji,
  color,
}: {
  colStatus: KanbanStatus;
  items: KanbanItem[];
  emoji: string;
  color: string;
}) {
  const { setNodeRef } = useSortable({
    id: `column-${colStatus}`,
    data: { type: "column", status: colStatus },
    disabled: true,
  });

  return (
    <div className="flex flex-col" ref={setNodeRef}>
      {/* Column Header */}
      <div
        className={`card-brutal ${color} px-3 py-2 mb-3 flex items-center justify-between`}
      >
        <span className="font-bold text-sm">
          {emoji} {colStatus}
        </span>
        <span className="badge-pixel text-[10px]">{items.length}</span>
      </div>

      {/* Cards */}
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3 min-h-[100px]">
          {items.map((item) => (
            <SortableCard key={item.id} item={item} />
          ))}

          {items.length === 0 && (
            <div className="text-center text-xs text-ink-muted py-8 border-2 border-dashed border-ink/10 rounded">
              拖拽卡片到此处
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

export default function KanbanPage() {
  const [items, setItems] = useState<KanbanItem[]>(initialItems);
  const [activeItem, setActiveItem] = useState<KanbanItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragStart(event: DragStartEvent) {
    const draggedItem = items.find((i) => i.id === event.active.id);
    if (draggedItem) setActiveItem(draggedItem);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveItem(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;

    // Determine target column
    let targetStatus: KanbanStatus | null = null;

    if (typeof over.id === "string" && over.id.startsWith("column-")) {
      targetStatus = over.id.replace("column-", "") as KanbanStatus;
    } else {
      // Dropped on another card — find that card's status
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
    return items.filter((i) => i.status === status);
  }

  return (
    <div className="min-h-screen bg-paper py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-ink flex items-center gap-2">
              📋 生产看板
            </h1>
            <p className="text-sm text-ink-muted mt-1">
              {kanbanStats.date} · 立项 {kanbanStats.topicsProposed} · 通过{" "}
              {kanbanStats.topicsPassed} ·{" "}
              <span className="text-gold-dark font-bold">
                ↔ 可拖拽调整状态
              </span>
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex gap-2">
            <div className="card-brutal px-3 py-2 text-center">
              <div className="text-lg font-bold text-jade">
                {kanbanStats.avgQuality}
              </div>
              <div className="text-[10px] text-ink-muted font-bold">
                均质量分
              </div>
            </div>
            <div className="card-brutal px-3 py-2 text-center">
              <div className="text-lg font-bold text-sky">
                {kanbanStats.avgHumanizer}
              </div>
              <div className="text-[10px] text-ink-muted font-bold">
                均去味分
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Columns with DnD */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {statusColumns.map((col) => (
              <DroppableColumn
                key={col.status}
                colStatus={col.status}
                items={getItemsByStatus(col.status)}
                emoji={col.emoji}
                color={col.color}
              />
            ))}
          </div>

          <DragOverlay>
            {activeItem ? (
              <div className="w-[200px] rotate-2 opacity-90">
                <KanbanCard item={activeItem} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
