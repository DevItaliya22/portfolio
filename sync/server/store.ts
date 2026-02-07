/**
 * ============================================================
 * Server-Side Store
 * ============================================================
 *
 * This is the "server" in our sync engine.
 *
 * In Linear's architecture, the server:
 * 1. Receives transactions from clients
 * 2. Assigns monotonically increasing syncIds (total ordering)
 * 3. Applies changes to the database
 * 4. Broadcasts delta packets to all connected clients
 *
 * Our implementation uses an in-memory store for simplicity.
 * In production, swap this with a real database (Postgres, etc.)
 *
 * Key concepts:
 * - currentSyncId: Global version counter (like Linear's sync id)
 * - syncLog: Ordered log of all changes (like a WAL)
 * - Last-Write-Wins: No complex conflict resolution needed
 *
 * NOTE: This resets when the server restarts. For persistence,
 * replace with a real database implementation.
 */

import {
  SyncRecord,
  Transaction,
  DeltaPacket,
  DeltaSyncAction,
  SyncId,
  BootstrapResponse,
  ModelMeta,
} from '../core/types';

class ServerStoreClass {
  /** All records, keyed by "modelName:recordId" */
  private records: Map<string, SyncRecord> = new Map();

  /**
   * Ordered log of all sync actions.
   * This is the source of truth for delta queries.
   * Each entry has a unique, monotonically increasing syncId.
   */
  private syncLog: DeltaSyncAction[] = [];

  /**
   * Current global sync ID.
   * This is the "version" of the entire database.
   * Every change increments this by 1.
   */
  private currentSyncId: SyncId = 0;

  /** Registered model definitions */
  private models: ModelMeta[] = [];

  /** Register model definitions (called during server init) */
  registerModels(models: ModelMeta[]): void {
    this.models = models;
  }

  /** Get the current sync ID */
  getSyncId(): SyncId {
    return this.currentSyncId;
  }

  /**
   * Apply a transaction from a client.
   *
   * Each action gets a new syncId, ensuring total ordering
   * of all changes across all clients. This is the core
   * mechanism that makes Linear's sync engine work.
   *
   * Returns a DeltaPacket with the applied changes.
   */
  applyTransaction(transaction: Transaction): DeltaPacket {
    const deltaActions: DeltaSyncAction[] = [];

    for (const action of transaction.actions) {
      // Increment global sync ID for each action
      this.currentSyncId++;
      const syncId = this.currentSyncId;

      const key = `${action.modelName}:${action.recordId}`;

      switch (action.type) {
        case 'create': {
          const record: SyncRecord = {
            id: action.recordId,
            modelName: action.modelName,
            data: action.data ?? {},
            syncId,
            deleted: false,
            createdAt: transaction.timestamp,
            updatedAt: transaction.timestamp,
          };
          this.records.set(key, record);

          deltaActions.push({
            syncId,
            type: 'create',
            modelName: action.modelName,
            recordId: action.recordId,
            data: record.data,
          });
          break;
        }

        case 'update': {
          const existing = this.records.get(key);
          if (existing && !existing.deleted) {
            // Last-Write-Wins: apply changes directly
            const updatedRecord: SyncRecord = {
              ...existing,
              data: { ...existing.data, ...action.data },
              syncId,
              updatedAt: transaction.timestamp,
            };
            this.records.set(key, updatedRecord);

            deltaActions.push({
              syncId,
              type: 'update',
              modelName: action.modelName,
              recordId: action.recordId,
              data: action.data,
            });
          }
          break;
        }

        case 'delete': {
          const existing = this.records.get(key);
          if (existing) {
            const deletedRecord: SyncRecord = {
              ...existing,
              deleted: true,
              syncId,
              updatedAt: transaction.timestamp,
            };
            this.records.set(key, deletedRecord);

            deltaActions.push({
              syncId,
              type: 'delete',
              modelName: action.modelName,
              recordId: action.recordId,
            });
          }
          break;
        }
      }
    }

    // Append to the sync log
    this.syncLog.push(...deltaActions);

    return {
      syncId: this.currentSyncId,
      actions: deltaActions,
    };
  }

  /**
   * Get all changes since a given syncId.
   *
   * This is the "delta" mechanism. Clients send their lastSyncId,
   * and we return all changes that happened after that point.
   * This is how incremental sync works.
   */
  getDeltaSince(sinceSyncId: SyncId): DeltaPacket {
    const actions = this.syncLog.filter((a) => a.syncId > sinceSyncId);
    return {
      syncId: this.currentSyncId,
      actions,
    };
  }

  /**
   * Get full bootstrap data.
   *
   * Returns all non-deleted records and the current syncId.
   * Used for the initial client bootstrap (first time load).
   */
  getBootstrapData(): BootstrapResponse {
    const records = Array.from(this.records.values()).filter((r) => !r.deleted);
    return {
      records,
      syncId: this.currentSyncId,
      models: this.models,
    };
  }

  /** Get stats about the store (for debugging) */
  getStats() {
    return {
      syncId: this.currentSyncId,
      totalRecords: this.records.size,
      activeRecords: Array.from(this.records.values()).filter((r) => !r.deleted)
        .length,
      syncLogSize: this.syncLog.length,
    };
  }

  /** Reset the store (for testing) */
  reset(): void {
    this.records.clear();
    this.syncLog = [];
    this.currentSyncId = 0;
  }
}

/**
 * Global singleton server store.
 *
 * In serverless environments (like Vercel), this may reset between requests.
 * In production, use a real database (Postgres, SQLite, etc.) instead.
 *
 * For local development with `next dev`, this persists across requests
 * since the Node.js process stays alive.
 */
export const ServerStore = new ServerStoreClass();
