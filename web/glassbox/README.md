# Native AI GlassBox

React 19 + Vite + TanStack Start/Router + Tailwind 4. Contracts
`@glassbox/contracts` v0.4.0. The service is GET + SSE **SYNTHETIC** only.

This is not a Next.js app. Dev is **127.0.0.1:8080**, not port 3000.

Design authority: [`DESIGN.md`](./DESIGN.md).

## Routes

| Path | Job |
| --- | --- |
| `/` | Dễ hiểu — five jobs, one locked interaction |
| `/studio` | 15-tab instrument |
| `/observatory` | UART stall / COM dashboard |

## Scripts

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:8080](http://127.0.0.1:8080).

```bash
npm run typecheck
npm run lint
npm run e2e
```

Do not invent write APIs, live ask, live train, or silicon evidence. TWIN /
XSIM / SYNTHETIC never present as BOARD.
