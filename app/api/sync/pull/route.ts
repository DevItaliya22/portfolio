/**
 * GET /api/sync/pull?sinceSyncId=N
 *
 * Pull endpoint - returns all changes since a given syncId.
 *
 * In Linear's architecture, delta packets are pushed via WebSocket.
 * My simplified version uses polling: clients periodically call
 * this endpoint to check for new changes.
 *
 * This is the "delta sync" mechanism:
 * - Client sends its lastSyncId
 * - Server returns all actions that happened after that syncId
 * - Client applies these actions to its local state
 *
 * Query params: sinceSyncId (number)
 * Response: PullResponse { delta }
 */

import { NextResponse } from 'next/server';
import { ServerStore } from '@/sync/server/store';
import { PullResponse } from '@/sync/core/types';

// Ensure models are registered
import '@/sync/models';

// Force dynamic - uses request.url and reads from in-memory store
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sinceSyncId = parseInt(searchParams.get('sinceSyncId') ?? '0', 10);

    if (isNaN(sinceSyncId) || sinceSyncId < 0) {
      return NextResponse.json(
        { error: 'Invalid sinceSyncId parameter' },
        { status: 400 }
      );
    }

    const delta = ServerStore.getDeltaSince(sinceSyncId);

    const response: PullResponse = { delta };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('[API/pull] Error:', error);
    return NextResponse.json({ error: 'Pull failed' }, { status: 500 });
  }
}
