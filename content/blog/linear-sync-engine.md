---
title: Linear is not a fast issue tracker. It is a sync engine wearing a UI.
date: 2026-08-26
description: "How Linear's local-first sync engine actually works: lastSyncId, delta packets, sync groups, and how they serve a 20 TB change log."
slug: linear-sync-engine
---

Linear is not a fast issue tracker. It is a sync engine wearing a UI.

I keep coming back to Linear for the same reason I keep building local-first stuff. Click an issue. Rename it. Assign it. The UI does not wait. It already happened.

That is not "they used React well." That is a client that already has the workspace on disk, a server that owns a total order of every change, and a delta log that every other client can replay.

I forked [wzhudev/reverse-linear-sync-engine](https://github.com/wzhudev/reverse-linear-sync-engine) (my copy lives at [DevItaliya22/reverse-linear-sync-engine](https://github.com/DevItaliya22/reverse-linear-sync-engine)) because it is the closest thing to a spec Linear has ever published. Linear's CTO, Tuomas Artman, called it correct, and more complete than their internal docs. Combine that with Linear's own posts, especially [Scaling the Linear Sync Engine](https://linear.app/now/scaling-the-linear-sync-engine) and the August 2026 piece [Rebuilding Linear's delta sync read path](https://linear.app/now/rebuilding-delta-sync-read-path), and the picture is not magic. It is a very specific architecture.

This is that architecture.

## The bet: local first, server is the clock

Most local-first apps reach for CRDTs. Linear did not.

CRDTs give you a partial order. Two laptops can merge without a leader. That is the right tool for a text editor. It is the wrong tool for an issue tracker where permissions, history, notifications, and "what is the state of this workspace right now" all have to be true for hundreds of people at once.

Linear's collaboration model is closer to operational transformation with a single sequencer. Clients can edit offline. The server is the only place a mutation becomes real. Every accepted mutation gets a monotonically increasing integer: `syncId`. `lastSyncId` is the version of the entire database.

That number is not per issue. It is not even per workspace in the early design. It is a global clock. One person's title change in your team and someone else's comment in another org both bump the same counter. The client compares its stored `lastSyncId` to the server's. Smaller means you missed packets. Equal means you are caught up.

That is the whole consistency model:

1. Client applies the change in memory immediately (the app feels sync).
2. Client sends a transaction to the server.
3. Server executes it, with side effects.
4. Server broadcasts **delta packets** to every relevant client, including the one that sent the mutation.
5. Clients apply those packets to IndexedDB and to the in-memory object pool, then advance `lastSyncId`.

If step 3 fails, the client rolls the optimistic change back. IndexedDB is not mutated until the server has spoken. The local database is a cache of the server's subset, not a second source of truth.

## What actually lives on the client

Entities are **models**: `Issue`, `Team`, `Comment`, `Organization`, `User`. Each has **properties** and **references**. Decorators register them into a `ModelRegistry`. The registry also computes a `__schemaHash`. If that hash changes, IndexedDB migrates.

There is one IndexedDB database per logged-in workspace (`linear_<hash>`), plus a catalog database (`linear_databases`). Inside a workspace DB:

- one table per model
- `_meta` (including `lastSyncId`, `firstSyncId`, `subscribedSyncGroups`)
- `__transactions` (unsent or in-flight mutations)

Loaded models sit in an **object pool**, a map from UUID to instance. MobX makes properties observable, so React just reads `issue.title`. You do not write a query. You write:

```js
issue.title = "New Title";
issue.save();
```

That two-liner is the product. Everything else exists so this does not lie.

### Load strategies

Not every model is dumped into RAM on boot. Linear learned this the hard way. At about 50,000 in-memory objects the app still worked, but startup felt bad. Loading 50k models on a modern machine is roughly 800ms to 1s. They wanted more objects than that, and they wanted faster.

So models carry a `loadStrategy`:

- `instant` — needed to render, loaded during bootstrap
- `lazy` — skipped at boot, fetched all at once when first needed
- `partial` — only some instances, on demand (`DocumentContent`)
- `explicitlyRequested` — history, heavy stuff
- `local` — client-only. Tuomas has said they ship features against this before the server knows the model exists.

Comments on an issue are a `LazyReferenceCollection`. Opening the issue hydrates them. Until then they are not in memory.

### Partial indexes

The interesting question is: if you have not loaded the comments, how do you know what to fetch?

Same way you would design Postgres. `Comment` has `issueId`, indexed. `Issue` has `assigneeId`, indexed. Linear's `PartialIndexHelper` walks those references, including nested ones up to three levels. So you can ask for comments by `issueId`, and theoretically by `issue.cycleId`.

Those covering keys are stored in a partial index table. Next hydration checks the table first. If you already fetched comments for this issue, you hit IndexedDB. If not, a `BatchModelLoader` folds several of those requests into one `/sync/batch` call, writes the result, and remembers the partial index so you do not do it again.

This is how a local-first client stays small while the workspace gets huge. You do not replicate the universe. You replicate the slice you have touched, plus the instant models you need to not flash empty states.

## Bootstrap, then never bootstrap again if you can help it

First load, empty IndexedDB: **full bootstrap**.

```
GET /sync/bootstrap?type=full&onlyModels=Issue,Team,User,...
```

The response is a stream of JSON lines, one model per line, then a `_metadata_` footer:

```json
{
  "method": "mongo",
  "lastSyncId": 2326713666,
  "subscribedSyncGroups": ["..."],
  "databaseVersion": 948
}
```

`method: mongo` is the scaling trick from the early years. A full bootstrap of a large workspace cannot stream live out of Postgres every time someone opens Linear. They serialize a snapshot dump (Mongo in the reverse-eng traces, later a dedicated dump DB), stamp it with the `lastSyncId` at generation time, and let the client catch up from there with deltas. Slightly stale snapshot plus a complete log is faster than a perfectly live full scan.

If IndexedDB already has data, bootstrap type is **local**. Load from disk, open a WebSocket, compare `lastSyncId`, pull the missing range.

**Partial bootstrap** loads a subset: a new sync group, or a team you just joined, or comments.

`firstSyncId` is `lastSyncId` at the moment of the last full bootstrap. Incremental sync starts there. If you are too far behind, or the schema is toast, you full-bootstrap again.

## Transactions: the write path

Changing `issue.assignee` does three things before the network:

1. The MobX setter writes the new value in memory. The UI updates now.
2. The old value is stashed so the change can be inverted.
3. `save()` builds an `UpdateTransaction`, enqueues it, and persists it in `__transactions`.

The queue batches. Mutations created in the same event loop share a `batchIndex` and go out as one GraphQL request:

```graphql
mutation IssueUpdate($issueUpdateInput: IssueUpdateInput!) {
  issueUpdate(id: "...", input: $issueUpdateInput) { lastSyncId }
}
```

Notice the selection set. The client does not ask for the new issue. It asks for `lastSyncId`. The actual new state arrives as a delta packet on the socket.

If you close the tab, `__transactions` still has the mutation. On next boot it deserializes, replays into memory, and sends again. That is how offline works. Rare footgun: a mutation that already landed can be sent twice. Linear lives with that. OT systems usually add a client seq for exactly this reason.

Undo is also transactions. Each type can produce an inverse transaction. The undo stack is not a text-editor OT log. It is "run the opposite mutation, and sync that too."

## Delta packets: the thing everyone else has to apply

After the server commits, it does not ACK with "ok." It broadcasts a packet of **sync actions** to every client that should see the change, including you.

A packet for "change the assignee" is not one action. It is several:

- `U` on `Issue` (the new snapshot of the issue)
- `I` on `IssueHistory` (side effect the client never sent)
- `I` on `Activity` (another side effect)

Action types you will see: `I` insert, `U` update, `A` archive, `D` delete, `V` unarchive, plus covering and sync-group changes (`C`, `G`, `S`).

Each action has its own integer `id`. That id *is* the sync id. Gaps are normal because the clock is bigger than your workspace. If your local `lastSyncId` is 100 and the packet jumps to 140, you are missing 39 actions. You go to delta sync and ask for the range.

The client applies a packet under a lock, in order:

1. Did my sync groups change? If I got added to a team, partial-bootstrap that team's models before continuing.
2. Load dependents if a partial index now points at new children.
3. Write to IndexedDB.
4. Update in-memory models.
5. Rebase any in-flight local `UpdateTransaction`s (last-writer-wins).
6. Advance `lastSyncId`.
7. Complete transactions that were waiting on that id.

Rebase is the conflict story. You set assignee to Bob. Colleague's packet lands first: Alice. Your transaction is still in flight. Linear rewrites the transaction's "original" to Alice and keeps your in-memory value as Bob. Server will accept yours if it is last, or reject it. Either way the next packet is the truth. No CRDT merge. No three-way diff. LWW on properties.

This is why hundreds of people can sit in one workspace without the client becoming a research paper. The hard part is not merging. The hard part is **getting every client the right suffix of the log, with the right permissions, fast**.

## Sync groups: how 100 people do not get 100 people's data

`lastSyncId` is global. Permissions are not.

`subscribedSyncGroups` is a list of UUIDs: your user, your teams, a few role groups. You only receive (and may only bootstrap) models in those groups. Join a team, you get a `G`/`S` action, then a partial bootstrap for that group's models. Leave a team, those models get dropped locally.

Later they split this into `userSyncGroups` and `teamSyncGroups`, and they split bootstrap into cacheable requests so a 50k-issue workspace does not hammer one uncacheable URL. Same idea. The log is huge. Your subscription is small.

## How this scales when the log becomes a monster

The client story above is enough for a 20-person startup. Linear's actual scale problem showed up on the **read path of the log**.

From their August 2026 post, the numbers that matter:

- largest workspaces: close to **1 million sync actions per day**
- a client offline for a few hours can be **hundreds of thousands of actions behind**
- the log they are serving against: **more than 20 TB of sync actions**

Delta sync is not "give me everything after id 50." It is:

```
sync actions in (fromId, toId]
  ∩ actions in my sync groups
  ∩ actions matching my subscriptions
```

That is a permission-aware set intersection over an append-only log. Postgres can store that log. Postgres is a bad engine for that query once the range is wide and the ACL arrays are big. They tried a second Postgres table for reads. Tail latency blew up. Replicas did not help, because every replica still does the same intersection. GIN indexes were too expensive at write time.

So they split **commit** from **serve**.

Postgres remains the source of truth. A CDC pipeline reads the publication of committed sync actions and writes **metadata only** into [turbopuffer](https://turbopuffer.com): sync action id, routing fields, sync groups, subscriptions. Payloads stay in Postgres.

turbopuffer is inverted indexes. Each sync group is a posting list of action ids. Each subscription is another. A delta request is: union my groups, union my subscriptions, intersect with the id range. Then, and only then, **late enrichment**: fetch the JSON payloads for the ids that survived.

Replication into the index is about 1s p50, a few seconds p95. They do not pretend it is current. Every request still reads a small authoritative head from Postgres, overlaps the two ranges, and dedupes by id. If turbopuffer is down, full fallback to Postgres.

Each workspace is its own turbopuffer namespace. Isolation is the scale strategy, not "one giant cluster of 10,000 anonymous servers." I do not have a public Linear headcount of machines, and I will not invent one. What they published is more useful: the log is tens of terabytes, the hot query is a set intersection, and the serving index has to stay flat as the customer grows.

Bootstrap had the same shape of problem years earlier. Streaming a full workspace from live Postgres is brutal, so they dump snapshots next to each other (`method: mongo` in the old traces) and let delta sync close the gap. Snapshot plus log. Same idea as a database backup plus WAL.

On the client, the matching move was lazy hydration. Do not load 50,000 objects into MobX on boot. Load instant models, hydrate the rest by partial index when the UI actually touches them. Synchronous-looking API, asynchronous fetch underneath. Tuomas's whole talk is that sentence.

## Put the loop in one picture

```
 UI
  │  issue.title = "x"
  ▼
 Memory (object pool / MobX) ──────────────────────────────────┐
  │  issue.save()                                              │
  ▼                                                            │
 Transaction queue                                             │
  │  cache transaction                                         │ already on screen
  ├──────────────────────────► IndexedDB                       │
  │  GraphQL mutation (ask lastSyncId)                         │
  ▼                                                            │
 Linear API                                                    │
  │  commit sync actions + side effects                        │
  ├──────────────► Postgres log ──CDC metadata──► turbopuffer  │
  │  delta packet to subscribers                               │
  ▼                                                            │
 WebSocket fan-out                                             │
  │  apply I/U/A/D                                             │
  ├──────────────────────────► Memory ─────────────────────────┘
  │  persist
  └──────────────────────────► IndexedDB

 Catch-up uses lastSyncId range ∩ groups via turbopuffer,
 payloads from Postgres
```

Hundreds of people in one workspace are not merging CRDT documents. They are all appending to one ordered log, and each client is a replica of the slice it is allowed to see.

## What I would steal if I were building this

I would not steal Linear's ORM. I would steal the invariants.

**1. One clock.** An integer per committed change. The client only has to answer "am I behind?"

**2. Optimistic memory, pessimistic disk.** RAM can lie for 200ms. The local DB should not. Wait for the delta that came from the server, even if you sent the mutation.

**3. Deltas are not your mutation.** The server is allowed to emit history, activity, derived fields. The client applies packets, it does not "confirm" its own write.

**4. Subscribe to groups, not to the universe.** Fan-out is filtered. Catch-up is a set intersection. If you skip this, you will send every comment in the company to every intern.

**5. Snapshot plus log.** Full bootstrap is a dump. Live traffic is deltas. When the dump is stale, the log repairs it. When the log query gets too fancy for your OLTP database, put a serving index in front of it and keep OLTP as the commit path.

**6. Lazy hydration with an honest index.** If you cannot name the key you will fetch children by, you will either over-fetch or flash empty UI.

**7. LWW is enough for issue fields.** Title, assignee, status. You do not need a research merge. You need undo, permissions, and a log you can replay.

The Ink & Switch local-first essay is still right: the app should work with the network unplugged, and the user should own a copy of their data. Linear's twist is that they never gave up the center. The center is a sequencer. The edge is a replica.

That is how you get an issue tracker that feels like a native app while a hundred people type at once, and how you keep doing it after the change log is 20 TB.

The UI is the easy part. The product is `lastSyncId`.
