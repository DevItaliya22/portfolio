/**
 * ============================================================
 * Sync Engine - The Heart of the System
 * ============================================================
 *
 * Inspired by Linear's SyncedStore, this orchestrates:
 *
 * 1. BOOTSTRAP: Initial data load (Server → IndexedDB → Memory)
 *    - Full bootstrap: Fetch everything from server (first time)
 *    - Incremental: Load from IndexedDB, then pull deltas
 *
 * 2. PUSH (Write Path): Client mutations → Transaction → Server
 *    - Optimistic update in object pool
 *    - Persist to IndexedDB offline queue
 *    - Send transaction to server
 *    - Apply server's delta response
 *
 * 3. PULL (Read Path): Server deltas → Apply to IndexedDB + Memory
 *    - Poll server for changes since lastSyncId
 *    - Apply delta actions to object pool and IndexedDB
 *
 * 4. OFFLINE QUEUE: Pending transactions stored in IndexedDB
 *    - Automatically flushed when connection restores
 *
 * Key design decisions (matching Linear):
 * - Last-Write-Wins (LWW) conflict resolution
 * - SyncId-based total ordering
 * - Optimistic updates for instant UI response
 * - IndexedDB for offline persistence
 *
 * Reference: https://github.com/wzhudev/reverse-linear-sync-engine
 */

import {
  SyncRecord,
  Transaction,
  DeltaPacket,
  SyncId,
  BootstrapResponse,
  PushResponse,
  SyncStatus,
  RecordId,
  ModelName,
} from './types';
import { LocalDatabase } from './local-db';
import { ModelRegistry } from './model-registry';
import { blob } from 'stream/consumers';

// ============================================================
// Helpers
// ============================================================

/** Generate a UUID v4 */
function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Composite key for the object pool: "ModelName:RecordId" */
function recordKey(modelName: string, id: string): string {
  return `${modelName}:${id}`;
}

// ============================================================
// Event System
// ============================================================

export type SyncEngineEvent =
  | { type: 'status-changed'; status: SyncStatus }
  | { type: 'records-changed'; modelName: string; records: SyncRecord[] }
  | { type: 'record-updated'; modelName: string; record: SyncRecord }
  | { type: 'record-deleted'; modelName: string; recordId: string }
  | { type: 'bootstrap-complete' }
  | { type: 'sync-error'; error: string };

export type SyncEngineListener = (event: SyncEngineEvent) => void;

// ============================================================
// Sync Engine
// ============================================================

export class SyncEngine {
  // ---- State ----

  /**
   * In-memory Object Pool
   *
   * Like Linear's Object Pool, this is a large map for retrieving
   * models by their UUIDs. All queries read from here.
   * Key format: "ModelName:RecordId"
   */
  private objectPool: Map<string, SyncRecord> = new Map();

  /** Last confirmed sync ID from server */
  private lastSyncId: SyncId = 0;

  /** Local IndexedDB for persistence */
  private localDb: LocalDatabase;

  /** Unique client identifier */
  private clientId: string;

  /** Current sync status */
  private _status: SyncStatus = 'idle';

  /** Polling interval handle */
  private pullInterval: ReturnType<typeof setInterval> | null = null;

  /** Event listeners */
  private listeners: Set<SyncEngineListener> = new Set();

  /** API base URL */
  private apiBase: string;

  /** Is the engine initialized? */
  private initialized = false;

  constructor(options?: { apiBase?: string }) {
    this.localDb = new LocalDatabase();
    this.clientId = this.getOrCreateClientId();
    this.apiBase = options?.apiBase ?? '/api/sync';
  }

  // ============================================================
  // Lifecycle
  // ============================================================

  /**
   * Initialize the sync engine.
   *
   * Follows Linear's bootstrap process:
   * 1. Open IndexedDB
   * 2. Check if we have local data (via lastSyncId)
   * 3. If yes → load from IndexedDB, then pull deltas (incremental)
   * 4. If no → full bootstrap from server
   * 5. Flush pending offline transactions
   * 6. Start polling for real-time updates
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    this.setStatus('bootstrapping');

    try {
      // Step 1: Open local database
      await this.localDb.open();

      // Step 2: Check for existing local data
      const localSyncId = await this.localDb.getLastSyncId();

      if (localSyncId > 0) {
        // Incremental bootstrap
        console.log(
          `[SyncEngine] Incremental bootstrap from syncId=${localSyncId}`
        );
        await this.loadFromLocalDb();
        await this.pull();
      } else {
        // Full bootstrap
        console.log('[SyncEngine] Full bootstrap from server');
        await this.fullBootstrap();
      }

      // Step 3: Flush pending offline transactions
      await this.flushPendingTransactions();

      // Step 4: Start polling for real-time changes
      this.startPolling();

      this.initialized = true;
      this.setStatus('idle');
      this.emit({ type: 'bootstrap-complete' });
    } catch (error) {
      console.error('[SyncEngine] Bootstrap failed:', error);
      this.setStatus('error');
      this.emit({ type: 'sync-error', error: String(error) });
    }
  }

  /** Shut down the sync engine */
  destroy(): void {
    this.stopPolling();
    this.localDb.close();
    this.objectPool.clear();
    this.listeners.clear();
    this.initialized = false;
  }

  // ============================================================
  // CRUD Operations (Write Path)
  // ============================================================

  /**
   * Create a new record.
   *
   * Like Linear's write path:
   * 1. Create record in object pool (optimistic)
   * 2. Persist to IndexedDB
   * 3. Send transaction to server
   * 4. Apply server's delta response
   */
  async create(
    modelName: ModelName,
    data: Record<string, unknown>
  ): Promise<SyncRecord> {
    const id = generateId();
    const now = Date.now();

    const record: SyncRecord = {
      id,
      modelName,
      data,
      syncId: 0, // Will be assigned by server
      deleted: false,
      createdAt: now,
      updatedAt: now,
    };

    // Optimistic update to object pool
    this.objectPool.set(recordKey(modelName, id), record);
    await this.localDb.putRecord(record);
    this.emitRecordsChanged(modelName);

    // Create and send transaction
    const transaction: Transaction = {
      id: generateId(),
      clientId: this.clientId,
      timestamp: now,
      actions: [
        {
          type: 'create',
          modelName,
          recordId: id,
          data,
        },
      ],
    };

    await this.pushTransaction(transaction);
    return record;
  }

  /**
   * Update an existing record.
   *
   * Like Linear's: issue.title = "New Title"; issue.save();
   * Uses propertyChanged tracking for generating UpdateTransaction.
   */
  async update(
    modelName: ModelName,
    recordId: RecordId,
    changes: Record<string, unknown>
  ): Promise<SyncRecord | null> {
    const key = recordKey(modelName, recordId);
    const existing = this.objectPool.get(key);

    if (!existing || existing.deleted) {
      console.warn(`[SyncEngine] Record ${key} not found for update`);
      return null;
    }

    const now = Date.now();
    const updatedRecord: SyncRecord = {
      ...existing,
      data: { ...existing.data, ...changes },
      updatedAt: now,
    };

    // Optimistic update
    this.objectPool.set(key, updatedRecord);
    await this.localDb.putRecord(updatedRecord);
    this.emit({ type: 'record-updated', modelName, record: updatedRecord });
    this.emitRecordsChanged(modelName);

    // Create and send transaction
    const transaction: Transaction = {
      id: generateId(),
      clientId: this.clientId,
      timestamp: now,
      actions: [
        {
          type: 'update',
          modelName,
          recordId,
          data: changes,
          changedFields: Object.keys(changes),
        },
      ],
    };

    await this.pushTransaction(transaction);
    return updatedRecord;
  }

  /**
   * Delete a record (soft delete).
   *
   * Like Linear's archive/delete - marks as deleted rather than removing.
   */
  async delete(modelName: ModelName, recordId: RecordId): Promise<void> {
    const key = recordKey(modelName, recordId);
    const existing = this.objectPool.get(key);

    if (!existing) {
      console.warn(`[SyncEngine] Record ${key} not found for delete`);
      return;
    }

    const now = Date.now();
    const deletedRecord: SyncRecord = {
      ...existing,
      deleted: true,
      updatedAt: now,
    };

    // Optimistic update
    this.objectPool.set(key, deletedRecord);
    await this.localDb.putRecord(deletedRecord);
    this.emit({ type: 'record-deleted', modelName, recordId });
    this.emitRecordsChanged(modelName);

    // Create and send transaction
    const transaction: Transaction = {
      id: generateId(),
      clientId: this.clientId,
      timestamp: now,
      actions: [
        {
          type: 'delete',
          modelName,
          recordId,
        },
      ],
    };

    await this.pushTransaction(transaction);
  }

  // ============================================================
  // Query Operations (Read from Object Pool)
  // ============================================================

  /** Get all non-deleted records for a model */
  getAll(modelName: ModelName): SyncRecord[] {
    const records: SyncRecord[] = [];
    const allRecords = Array.from(this.objectPool.values());
    for (const record of allRecords) {
      if (record.modelName === modelName && !record.deleted) {
        records.push(record);
      }
    }
    return records;
  }

  /** Get a single record by ID */
  getById(modelName: ModelName, id: RecordId): SyncRecord | undefined {
    const record = this.objectPool.get(recordKey(modelName, id));
    if (record && !record.deleted) return record;
    return undefined;
  }

  /** Query records with a filter function */
  query(
    modelName: ModelName,
    filter: (record: SyncRecord) => boolean
  ): SyncRecord[] {
    return this.getAll(modelName).filter(filter);
  }

  /**
   * Search records by string matching on a field.
   * This is the "string match" feature - simple but powerful for filtering.
   */
  search(modelName: ModelName, field: string, query: string): SyncRecord[] {
    const lowerQuery = query.toLowerCase();
    return this.getAll(modelName).filter((record) => {
      const value = record.data[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerQuery);
      }
      return false;
    });
  }

  // ============================================================
  // Sync Operations
  // ============================================================

  /**
   * Full bootstrap - fetch all data from server.
   *
   * Like Linear's full bootstrapping:
   * 1. Fetch all records from server
   * 2. Store in IndexedDB
   * 3. Load into object pool
   */
  private async fullBootstrap(): Promise<void> {
    const response = await fetch(`${this.apiBase}/bootstrap`);
    if (!response.ok) {
      throw new Error(`Bootstrap failed: ${response.statusText}`);
    }

    const data: BootstrapResponse = await response.json();

    // Store in IndexedDB
    await this.localDb.putRecords(data.records);
    await this.localDb.setLastSyncId(data.syncId);

    // Load into object pool
    for (const record of data.records) {
      this.objectPool.set(recordKey(record.modelName, record.id), record);
    }

    this.lastSyncId = data.syncId;

    // Notify listeners
    const modelNames = Array.from(
      new Set(data.records.map((r) => r.modelName))
    );
    for (const modelName of modelNames) {
      this.emitRecordsChanged(modelName);
    }
  }

  /** Load data from local IndexedDB into the object pool */
  private async loadFromLocalDb(): Promise<void> {
    const models = ModelRegistry.getAll();
    for (const model of models) {
      const records = await this.localDb.getAllRecords(model.name);
      for (const record of records) {
        this.objectPool.set(recordKey(record.modelName, record.id), record);
      }
    }
    this.lastSyncId = await this.localDb.getLastSyncId();
  }

  /**
   * Push a transaction to the server.
   *
   * Like Linear's transaction queue:
   * 1. Save to pending queue in IndexedDB (offline resilience)
   * 2. Try to send to server
   * 3. On success: apply delta, remove from pending queue
   * 4. On failure: keep in pending queue for retry
   */
  private async pushTransaction(transaction: Transaction): Promise<void> {
    // Save to offline queue FIRST (like Linear persists to IndexedDB before syncing)
    await this.localDb.addPendingTransaction(transaction);

    try {
      this.setStatus('pushing');

      const response = await fetch(`${this.apiBase}/push`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transaction }),
      });

      if (!response.ok) {
        throw new Error(`Push failed: ${response.statusText}`);
      }

      const result: PushResponse = await response.json();

      if (result.success) {
        // Apply the server's delta (may include side effects)
        await this.applyDelta(result.delta);
        // Remove from pending queue
        await this.localDb.removePendingTransaction(transaction.id);
      } else {
        console.error('[SyncEngine] Push rejected:', result.error);
      }

      this.setStatus('idle');
    } catch (error) {
      console.warn('[SyncEngine] Push failed (offline?):', error);
      this.setStatus('offline');
      // Transaction stays in pending queue for retry
    }
  }

  /**
   * Pull changes from server since lastSyncId.
   *
   * Like Linear's delta sync: fetch all changes since our last known state.
   *
   * IMPORTANT: Detects server resets. If the server's syncId is less than
   * our lastSyncId, it means the server restarted and lost its in-memory
   * state. In that case, we clear local data and do a full re-bootstrap.
   */
  async pull(): Promise<void> {
    try {
      this.setStatus('syncing');

      const response = await fetch(
        `${this.apiBase}/pull?sinceSyncId=${this.lastSyncId}`
      );

      if (!response.ok) {
        throw new Error(`Pull failed: ${response.statusText}`);
      }

      const data = await response.json();

      // Detect server reset: server's syncId is behind our lastSyncId
      if (data.delta.syncId < this.lastSyncId) {
        console.warn(
          `[SyncEngine] Server reset detected (server=${data.delta.syncId}, client=${this.lastSyncId}). Re-bootstrapping...`
        );
        // Clear local state and re-bootstrap
        this.objectPool.clear();
        this.lastSyncId = 0;
        await this.localDb.clear();
        await this.fullBootstrap();
        this.setStatus('idle');
        return;
      }

      if (data.delta.actions.length > 0) {
        await this.applyDelta(data.delta);
      }

      this.setStatus('idle');
    } catch (error) {
      console.warn('[SyncEngine] Pull failed:', error);
      if (this._status !== 'offline') {
        this.setStatus('idle');
      }
    }
  }

  /**
   * Apply a delta packet to local state.
   *
   * This is where server changes get applied using Last-Write-Wins (LWW):
   * - Server's syncId is always authoritative
   * - Updates merge data fields (per-field LWW)
   * - Both object pool and IndexedDB are updated
   */
  private async applyDelta(delta: DeltaPacket): Promise<void> {
    const changedModels = new Set<string>();

    for (const action of delta.actions) {
      const key = recordKey(action.modelName, action.recordId);

      switch (action.type) {
        case 'create': {
          const record: SyncRecord = {
            id: action.recordId,
            modelName: action.modelName,
            data: action.data ?? {},
            syncId: action.syncId,
            deleted: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          this.objectPool.set(key, record);
          await this.localDb.putRecord(record);
          changedModels.add(action.modelName);
          break;
        }

        case 'update': {
          const existing = this.objectPool.get(key);
          if (existing) {
            // LWW: merge server's data over local data
            const updatedRecord: SyncRecord = {
              ...existing,
              data: { ...existing.data, ...action.data },
              syncId: action.syncId,
              updatedAt: Date.now(),
            };
            this.objectPool.set(key, updatedRecord);
            await this.localDb.putRecord(updatedRecord);
            changedModels.add(action.modelName);
          }
          break;
        }

        case 'delete': {
          const existing = this.objectPool.get(key);
          if (existing) {
            const deletedRecord: SyncRecord = {
              ...existing,
              deleted: true,
              syncId: action.syncId,
              updatedAt: Date.now(),
            };
            this.objectPool.set(key, deletedRecord);
            await this.localDb.putRecord(deletedRecord);
            changedModels.add(action.modelName);
          }
          break;
        }
      }
    }

    // Update lastSyncId
    if (delta.syncId > this.lastSyncId) {
      this.lastSyncId = delta.syncId;
      await this.localDb.setLastSyncId(delta.syncId);
    }

    // Notify listeners of changed models
    const changedModelNames = Array.from(changedModels);
    for (const modelName of changedModelNames) {
      this.emitRecordsChanged(modelName);
    }
  }

  /** Flush pending transactions from offline queue */
  private async flushPendingTransactions(): Promise<void> {
    const pending = await this.localDb.getPendingTransactions();
    if (pending.length === 0) return;

    console.log(`[SyncEngine] Flushing ${pending.length} pending transactions`);

    for (const tx of pending) {
      try {
        const response = await fetch(`${this.apiBase}/push`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transaction: tx }),
        });

        if (response.ok) {
          const result: PushResponse = await response.json();
          if (result.success) {
            await this.applyDelta(result.delta);
            await this.localDb.removePendingTransaction(tx.id);
          }
        }
      } catch {
        // Will retry on next flush
        break;
      }
    }
  }

  // ============================================================
  // Polling (Real-time Sync)
  // ============================================================

  /**
   * Start polling for changes.
   *
   * In Linear, real-time sync uses WebSocket connections.
   * We use polling for simplicity - can be upgraded to WebSocket/SSE later.
   */
  private startPolling(intervalMs = 3000): void {
    this.stopPolling();
    this.pullInterval = setInterval(() => this.pull(), intervalMs);
  }

  private stopPolling(): void {
    if (this.pullInterval) {
      clearInterval(this.pullInterval);
      this.pullInterval = null;
    }
  }

  // ============================================================
  // Event System
  // ============================================================

  /** Subscribe to sync engine events */
  subscribe(listener: SyncEngineListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit(event: SyncEngineEvent): void {
    const listenersCopy = Array.from(this.listeners);
    for (const listener of listenersCopy) {
      try {
        listener(event);
      } catch (e) {
        console.error('[SyncEngine] Listener error:', e);
      }
    }
  }

  private emitRecordsChanged(modelName: string): void {
    this.emit({
      type: 'records-changed',
      modelName,
      records: this.getAll(modelName),
    });
  }

  private setStatus(status: SyncStatus): void {
    this._status = status;
    this.emit({ type: 'status-changed', status });
  }

  // ============================================================
  // Getters
  // ============================================================

  get status(): SyncStatus {
    return this._status;
  }

  get syncId(): SyncId {
    return this.lastSyncId;
  }

  get isInitialized(): boolean {
    return this.initialized;
  }

  /** Get total record count in object pool */
  get recordCount(): number {
    let count = 0;
    const allRecords = Array.from(this.objectPool.values());
    for (const record of allRecords) {
      if (!record.deleted) count++;
    }
    return count;
  }

  // ============================================================
  // Client ID Management
  // ============================================================

  private getOrCreateClientId(): string {
    if (typeof window === 'undefined') return 'server';

    const key = 'sync_engine_client_id';
    let clientId = localStorage.getItem(key);
    if (!clientId) {
      clientId = generateId();
      localStorage.setItem(key, clientId);
    }
    return clientId;
  }
}
