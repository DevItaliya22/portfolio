/**
 * POST /api/sync/push
 *
 * Push endpoint - receives a Transaction from a client and applies it.
 *
 * In Linear's architecture:
 * 1. Client sends a transaction (one or more actions)
 * 2. Server assigns syncIds (monotonically increasing)
 * 3. Server applies changes to the database
 * 4. Server returns a DeltaPacket (also broadcast to other clients via WebSocket)
 *
 * My simplified version:
 * - Applies transaction, returns delta to the calling client
 * - Other clients pick up changes via polling (pull endpoint)
 *
 * Validation (Zod):
 * - Task title: max 75 chars
 * - Total tasks: max 50
 *
 * Request body: PushRequest { transaction }
 * Response: PushResponse { success, delta, error? }
 */

import { NextResponse } from 'next/server';
import { ServerStore } from '@/sync/server/store';
import { PushRequest, PushResponse } from '@/sync/core/types';
import {
  taskCreateSchema,
  taskUpdateSchema,
  MAX_TOTAL_TODOS,
} from '@/lib/sync-task-schema';
import { isProfane } from '@/lib/bad-words-filter';

// Ensure models are registered
import '@/sync/models';

// Force dynamic - mutates in-memory store
export const dynamic = 'force-dynamic';

const TASK_MODEL = 'Task';

function validateTransaction(
  transaction: PushRequest['transaction']
): string | null {
  if (!transaction?.actions?.length) return null;

  let newTaskCreates = 0;

  for (const action of transaction.actions) {
    if (action.modelName !== TASK_MODEL) continue;

    switch (action.type) {
      case 'create': {
        const parsed = taskCreateSchema.safeParse(action.data ?? {});
        if (!parsed.success) {
          return parsed.error.issues[0]?.message ?? 'Invalid task data';
        }
        if (isProfane(parsed.data.title)) {
          return 'Please use appropriate language';
        }
        newTaskCreates++;
        break;
      }
      case 'update': {
        const data = action.data ?? {};
        if (Object.keys(data).length === 0) continue;
        const parsed = taskUpdateSchema.safeParse(data);
        if (!parsed.success) {
          return parsed.error.issues[0]?.message ?? 'Invalid task update';
        }
        if (parsed.data.title !== undefined && isProfane(parsed.data.title)) {
          return 'Please use appropriate language';
        }
        break;
      }
      case 'delete':
        break;
    }
  }

  const currentCount = ServerStore.getRecordCount(TASK_MODEL);
  if (currentCount + newTaskCreates > MAX_TOTAL_TODOS) {
    return `Maximum ${MAX_TOTAL_TODOS} tasks allowed`;
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const body: PushRequest = await request.json();

    if (!body.transaction) {
      return NextResponse.json(
        {
          success: false,
          delta: { syncId: ServerStore.getSyncId(), actions: [] },
          error: 'Missing transaction',
        } satisfies PushResponse,
        { status: 400 }
      );
    }

    if (!body.transaction.actions || body.transaction.actions.length === 0) {
      return NextResponse.json(
        {
          success: false,
          delta: { syncId: ServerStore.getSyncId(), actions: [] },
          error: 'Transaction has no actions',
        } satisfies PushResponse,
        { status: 400 }
      );
    }

    const validationError = validateTransaction(body.transaction);
    if (validationError) {
      return NextResponse.json(
        {
          success: false,
          delta: { syncId: ServerStore.getSyncId(), actions: [] },
          error: validationError,
        } satisfies PushResponse,
        { status: 400 }
      );
    }

    // Apply the transaction - this is where syncIds get assigned
    const delta = ServerStore.applyTransaction(body.transaction);

    const response: PushResponse = {
      success: true,
      delta,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[API/push] Error:', error);
    return NextResponse.json(
      {
        success: false,
        delta: { syncId: 0, actions: [] },
        error: 'Push failed',
      } satisfies PushResponse,
      { status: 500 }
    );
  }
}
