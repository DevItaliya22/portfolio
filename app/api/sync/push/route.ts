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
 * Request body: PushRequest { transaction }
 * Response: PushResponse { success, delta, error? }
 */

import { NextResponse } from 'next/server';
import { ServerStore } from '@/sync/server/store';
import { PushRequest, PushResponse } from '@/sync/core/types';

// Ensure models are registered
import '@/sync/models';

// Force dynamic - mutates in-memory store
export const dynamic = 'force-dynamic';

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
