'use client';

/**
 * ============================================================
 * Sync Engine Demo
 * ============================================================
 *
 * Interactive demo showing the sync engine in action.
 * Features:
 * - Create, update, delete tasks (like Linear issues)
 * - String search/filter across tasks
 * - Status and priority filtering
 * - Real-time sync status indicator
 * - Sync ID display (shows the global version)
 *
 * This demonstrates the core concepts from Linear's sync engine:
 * - Optimistic updates (UI updates instantly)
 * - Transactions (mutations are packaged and sent to server)
 * - Delta sync (server broadcasts changes via syncId)
 * - Offline resilience (pending transactions queue)
 */

import { useState, useCallback } from 'react';
import { useSyncEngine, useModel, useSearch } from '@/sync/hooks';
import '@/sync/models'; // Register models
import {
  createTaskData,
  TaskStatus,
  TaskPriority,
  PRIORITY_LABELS,
  STATUS_LABELS,
} from '@/sync/models/task';
import type { TaskStatusType, TaskPriorityType } from '@/sync/models/task';
import type { SyncRecord } from '@/sync/core/types';

// ============================================================
// Status Badge Component
// ============================================================

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    [TaskStatus.TODO]:
      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    [TaskStatus.IN_PROGRESS]:
      'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    [TaskStatus.DONE]:
      'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    [TaskStatus.CANCELLED]:
      'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  };

  const icons: Record<string, string> = {
    [TaskStatus.TODO]: '\u25CB', // ○
    [TaskStatus.IN_PROGRESS]: '\u25D4', // ◔
    [TaskStatus.DONE]: '\u25CF', // ●
    [TaskStatus.CANCELLED]: '\u2715', // ✕
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${colors[status] ?? colors[TaskStatus.TODO]}`}
    >
      <span>{icons[status] ?? icons[TaskStatus.TODO]}</span>
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

// ============================================================
// Priority Badge Component
// ============================================================

function PriorityBadge({ priority }: { priority: number }) {
  const colors: Record<number, string> = {
    [TaskPriority.NONE]: 'text-gray-400',
    [TaskPriority.LOW]: 'text-blue-500',
    [TaskPriority.MEDIUM]: 'text-yellow-500',
    [TaskPriority.HIGH]: 'text-orange-500',
    [TaskPriority.URGENT]: 'text-red-500',
  };

  const bars = priority || 0;

  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs ${colors[priority] ?? colors[0]}`}
      title={PRIORITY_LABELS[priority] ?? 'No priority'}
    >
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`inline-block h-3 w-0.5 rounded-full ${
            i <= bars ? 'bg-current' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        />
      ))}
    </span>
  );
}

// ============================================================
// Sync Status Indicator
// ============================================================

function SyncStatusIndicator({
  status,
  syncId,
}: {
  status: string;
  syncId: number;
}) {
  const statusConfig: Record<string, { color: string; label: string }> = {
    idle: { color: 'bg-green-500', label: 'Synced' },
    bootstrapping: { color: 'bg-yellow-500', label: 'Loading...' },
    syncing: { color: 'bg-blue-500', label: 'Syncing...' },
    pushing: { color: 'bg-blue-500', label: 'Saving...' },
    error: { color: 'bg-red-500', label: 'Error' },
    offline: { color: 'bg-gray-500', label: 'Offline' },
  };

  const config = statusConfig[status] ?? statusConfig.idle;

  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex items-center gap-1.5">
        <span
          className={`inline-block h-2 w-2 rounded-full ${config.color} ${
            status === 'syncing' || status === 'pushing' ? 'animate-pulse' : ''
          }`}
        />
        <span className="text-gray-600 dark:text-gray-400">{config.label}</span>
      </div>
      <span className="font-mono text-xs text-gray-400">v{syncId}</span>
    </div>
  );
}

// ============================================================
// Task Row Component
// ============================================================

function TaskRow({
  record,
  onUpdate,
  onDelete,
}: {
  record: SyncRecord;
  onUpdate: (id: string, changes: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(record.data.title as string);

  const handleSaveTitle = () => {
    if (editTitle.trim() && editTitle !== record.data.title) {
      onUpdate(record.id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };

  const cycleStatus = () => {
    const order: TaskStatusType[] = [
      TaskStatus.TODO,
      TaskStatus.IN_PROGRESS,
      TaskStatus.DONE,
    ];
    const currentIndex = order.indexOf(record.data.status as TaskStatusType);
    const nextStatus = order[(currentIndex + 1) % order.length];
    onUpdate(record.id, { status: nextStatus });
  };

  const cyclePriority = () => {
    const current = (record.data.priority as number) ?? 0;
    const next = current >= 4 ? 0 : current + 1;
    onUpdate(record.id, { priority: next });
  };

  return (
    <div className="group flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-4 py-3 transition-all hover:border-gray-200 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
      {/* Status toggle */}
      <button
        onClick={cycleStatus}
        className="shrink-0 transition-transform hover:scale-110"
        title="Click to cycle status"
      >
        <StatusBadge status={record.data.status as string} />
      </button>

      {/* Title */}
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSaveTitle}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveTitle();
              if (e.key === 'Escape') {
                setEditTitle(record.data.title as string);
                setIsEditing(false);
              }
            }}
            className="w-full rounded border border-blue-300 bg-transparent px-1 py-0.5 text-sm outline-none focus:ring-1 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <button
            onClick={() => {
              setEditTitle(record.data.title as string);
              setIsEditing(true);
            }}
            className={`w-full truncate text-left text-sm ${
              record.data.status === TaskStatus.DONE
                ? 'text-gray-400 line-through dark:text-gray-600'
                : 'text-gray-900 dark:text-gray-100'
            }`}
          >
            {record.data.title as string}
          </button>
        )}
        {(record.data.description as string) && (
          <p className="mt-0.5 truncate text-xs text-gray-400">
            {record.data.description as string}
          </p>
        )}
      </div>

      {/* Priority */}
      <button
        onClick={cyclePriority}
        className="shrink-0 transition-transform hover:scale-110"
        title="Click to cycle priority"
      >
        <PriorityBadge priority={record.data.priority as number} />
      </button>

      {/* Sync ID indicator */}
      <span className="shrink-0 font-mono text-[10px] text-gray-300 dark:text-gray-700">
        #{record.syncId}
      </span>

      {/* Delete button */}
      <button
        onClick={() => onDelete(record.id)}
        className="shrink-0 rounded p-1 text-gray-300 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 dark:text-gray-700 dark:hover:bg-red-900/20 dark:hover:text-red-400"
        title="Delete task"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
        </svg>
      </button>
    </div>
  );
}

// ============================================================
// Create Task Form
// ============================================================

function CreateTaskForm({
  onCreate,
}: {
  onCreate: (data: Record<string, unknown>) => void;
}) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<TaskStatusType>(TaskStatus.TODO);
  const [priority, setPriority] = useState<TaskPriorityType>(TaskPriority.NONE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreate(
      createTaskData({
        title: title.trim(),
        status,
        priority,
      })
    );
    setTitle('');
    setStatus(TaskStatus.TODO);
    setPriority(TaskPriority.NONE);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Create a new task..."
        className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-900 dark:placeholder:text-gray-600"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatusType)}
        className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs dark:border-gray-700 dark:bg-gray-900"
      >
        {Object.entries(STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <select
        value={priority}
        onChange={(e) =>
          setPriority(Number(e.target.value) as TaskPriorityType)
        }
        className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs dark:border-gray-700 dark:bg-gray-900"
      >
        {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={!title.trim()}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Add
      </button>
    </form>
  );
}

// ============================================================
// Architecture Diagram
// ============================================================

function ArchitectureDiagram() {
  return (
    <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        How it works (inspired by Linear)
      </h3>
      <pre className="overflow-x-auto text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
        {`
  CLIENT (Browser)                          SERVER (API Routes)
  ┌──────────────────────────────┐          ┌─────────────────────────┐
  │                              │          │                         │
  │  ┌────────────────────────┐  │  push    │  ┌───────────────────┐  │
  │  │  Object Pool (Memory)  │◄─┼──────────┼──│  Server Store     │  │
  │  │  Map<key, SyncRecord>  │──┼──────────┼──│  (syncId counter) │  │
  │  └────────┬───────────────┘  │  delta   │  └───────────────────┘  │
  │           │                  │          │    ▲                     │
  │           ▼                  │          │    │ syncLog             │
  │  ┌────────────────────────┐  │          │    │ (ordered WAL)      │
  │  │  IndexedDB             │  │          │                         │
  │  │  - Records per model   │  │  pull    │  Each action gets a     │
  │  │  - Pending TX queue    │  │◄─────────│  monotonically          │
  │  │  - lastSyncId          │  │  delta   │  increasing syncId      │
  │  └────────────────────────┘  │          │                         │
  │                              │          │  Conflict resolution:   │
  │  Write: Optimistic update    │          │  Last-Write-Wins (LWW)  │
  │  Read: From Object Pool      │          │                         │
  └──────────────────────────────┘          └─────────────────────────┘
`}
      </pre>
    </div>
  );
}

// ============================================================
// Main Demo Component
// ============================================================

export function SyncDemo() {
  const { status, isReady, syncId } = useSyncEngine();
  const { records, create, update, remove } = useModel('Task');
  const { query, setQuery, results } = useSearch('Task', 'title');

  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter records
  const displayRecords = (query.trim() ? results : records).filter(
    (r) => statusFilter === 'all' || r.data.status === statusFilter
  );

  // Sort: in_progress first, then todo, then done, then cancelled
  const statusOrder: Record<string, number> = {
    [TaskStatus.IN_PROGRESS]: 0,
    [TaskStatus.TODO]: 1,
    [TaskStatus.DONE]: 2,
    [TaskStatus.CANCELLED]: 3,
  };

  const sortedRecords = [...displayRecords].sort((a, b) => {
    const aOrder = statusOrder[a.data.status as string] ?? 99;
    const bOrder = statusOrder[b.data.status as string] ?? 99;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return (b.updatedAt ?? 0) - (a.updatedAt ?? 0);
  });

  // Counts
  const counts = {
    all: records.length,
    [TaskStatus.TODO]: records.filter((r) => r.data.status === TaskStatus.TODO)
      .length,
    [TaskStatus.IN_PROGRESS]: records.filter(
      (r) => r.data.status === TaskStatus.IN_PROGRESS
    ).length,
    [TaskStatus.DONE]: records.filter((r) => r.data.status === TaskStatus.DONE)
      .length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl px-4 pb-32 pt-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Sync Engine
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Built from scratch, inspired by{' '}
                <a
                  href="https://github.com/wzhudev/reverse-linear-sync-engine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline decoration-blue-500/30 transition-colors hover:text-blue-600"
                >
                  Linear&apos;s sync engine
                </a>
              </p>
            </div>
            <SyncStatusIndicator status={status} syncId={syncId} />
          </div>
        </div>

        {/* Architecture diagram */}
        <div className="mb-6">
          <ArchitectureDiagram />
        </div>

        {/* Loading state */}
        {!isReady && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-500" />
              <p className="text-sm text-gray-500">
                Bootstrapping sync engine...
              </p>
            </div>
          </div>
        )}

        {isReady && (
          <>
            {/* Create task */}
            <div className="mb-6">
              <CreateTaskForm onCreate={create} />
            </div>

            {/* Search + Filter bar */}
            <div className="mb-4 flex items-center gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tasks by title..."
                  className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-900 dark:placeholder:text-gray-600"
                />
              </div>

              {/* Status filter tabs */}
              <div className="flex rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                {[
                  { key: 'all', label: 'All', count: counts.all },
                  {
                    key: TaskStatus.TODO,
                    label: 'Todo',
                    count: counts[TaskStatus.TODO],
                  },
                  {
                    key: TaskStatus.IN_PROGRESS,
                    label: 'Active',
                    count: counts[TaskStatus.IN_PROGRESS],
                  },
                  {
                    key: TaskStatus.DONE,
                    label: 'Done',
                    count: counts[TaskStatus.DONE],
                  },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setStatusFilter(tab.key)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                      statusFilter === tab.key
                        ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.label}
                    {tab.count > 0 && (
                      <span className="ml-1 text-[10px] opacity-60">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Task list */}
            <div className="space-y-1.5">
              {sortedRecords.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-gray-400">
                    {query.trim()
                      ? `No tasks matching "${query}"`
                      : 'No tasks yet. Create one above!'}
                  </p>
                </div>
              ) : (
                sortedRecords.map((record) => (
                  <TaskRow
                    key={record.id}
                    record={record}
                    onUpdate={update}
                    onDelete={remove}
                  />
                ))
              )}
            </div>

            {/* Footer stats */}
            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
              <p className="text-xs text-gray-400">
                {records.length} task{records.length !== 1 ? 's' : ''} total
              </p>
              <div className="flex gap-4 text-xs text-gray-400">
                <span>
                  SyncId:{' '}
                  <code className="font-mono text-gray-500">{syncId}</code>
                </span>
                <span>
                  Status:{' '}
                  <code className="font-mono text-gray-500">{status}</code>
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
