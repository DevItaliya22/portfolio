# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 14 portfolio website** using pnpm as the package manager.

### Services

| Service | How to run | Notes |
|---------|-----------|-------|
| Next.js dev server | `pnpm dev` (port 3000) | The only required service. All portfolio pages work without external deps. |
| Upstash Redis | External (env vars `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) | Optional. View counters gracefully fall back to 0 without it. The `/sync` demo page requires it to fully function (bootstrap hangs without Redis credentials). |

### Commands

Standard scripts are in `package.json`:

- **Dev server**: `pnpm dev`
- **Lint**: `pnpm lint` (runs `next lint`; expect 2 non-blocking warnings)
- **Build**: `pnpm build`
- **Format check**: `pnpm format-check` (Prettier)
- **Format fix**: `pnpm format`

### Gotchas

- pnpm 10+ blocks build scripts by default. The `pnpm.onlyBuiltDependencies` field in `package.json` whitelists `sharp` and `unrs-resolver` so `pnpm install` works non-interactively.
- No automated test suite exists in this repo (`pnpm test` is not defined).
- The `/sync` page shows "Bootstrapping sync engine..." indefinitely without Upstash Redis credentials; all other pages work fine without them.
