# Native AI GlassBox — legal design system

This file is the design authority for `web/glassbox`. Tokens, type, radius,
density, IA, and honesty rules live here. A screen that contradicts this file
is a defect even if it still typechecks.

Product: Native AI GlassBox. Stack: React 19 + Vite + TanStack Start/Router +
Tailwind 4. Dev binds `127.0.0.1:8080`, never port 3000. Contracts
`@glassbox/contracts` v0.4.0. Service is GET + SSE **SYNTHETIC** only. No
backend write API, no live ask, no live train, no invented silicon evidence.

## Tokens (locked — do not restyle)

| Role | Hex | Use |
| --- | --- | --- |
| bg | `#070b10` | Document / shell |
| surface | `#0e141c` | Rail, drawers |
| card | `#141c26` | Panels |
| raised | `#1c2632` | Controls, hover |
| line | `#243040` | Separators |
| fg | `#e8eef4` | Body |
| muted | `#9aa8b8` | Secondary |
| accent | `#22d3ee` | Cyan chrome, focus, active process |
| BOARD | `#22c55e` | Silicon evidence only |
| TWIN / SYNTHETIC | `#f59e0b` | Host / generated — never painted as BOARD |
| STALL | `#ef4444` | Stall / alert |
| Learn | `#a78bfa` | Semantic LEARN phase only. Never chrome, never wordmark, never route links |

Do not use AGENTWORK ocean/leaf. Do not swap in `#3B82F6` as brand. XSIM may
keep a distinct blue as a **source** colour; it is not the product accent.

Source of truth in code: `src/styles.css` (`--color-*` and `--gb-*`).
`src/design/tokens.ts` reads the same cascade. No raw hex in features.

## Type

- UI stack title: **IBM Plex Sans + system-ui**. Inter may remain a fallback
  only. Do not title the stack Inter. Do not load Roboto as identity.
- Mono: **JetBrains Mono** for code, numbers, UART hex, RTL signal names.
  Never `font-mono` the whole shell. RTL *mode* is a presentation level, not a
  permission to monospacing the chrome.
- Tabular numerals on aligned figures.

## Radius / density

- Card 12 · control 8 · pill 999.
- Default density is **compact-scientific**:
  `[data-density=research]` → card 10 / row 6 / row-height 26 / value 13.
- Comfortable is a toggle. It **must** write `document.documentElement`
  `data-density`. Hardcoding `comfortable` on `<html>` with no writer is
  illegal.

Density (`comfortable` | `research`) is not the same as presentation level
(`easy` | `research` | `rtl`).

## Information architecture — three routes, never merged

| Route | Job |
| --- | --- |
| `/` | Dễ hiểu. Five jobs for **one locked interaction**. Teaches. Not the UART stall. Not the 15-tab Studio. |
| `/studio` | Existing 15-tab instrument. Tab ids stay. |
| `/observatory` | Former `/` UART / stall dashboard. `pred` empty if empty. COM closed explicit. Console is not “Native AI” and not “Tương tác”. Watermark when the surface is not BOARD. |

Shared chrome on all three, equal weight:

1. Wordmark `Native AI GlassBox`
2. Route links `Dễ hiểu` · `Studio` · `Đài quan sát`
3. Source pill that states the actual feed

Back-links both ways. A single “Studio đầy đủ” dump is not equal-weight IA.

## Five jobs on `/` (Vietnamese, one locked interaction)

| Job | Honest meaning | Forbidden |
| --- | --- | --- |
| create | Build / Session / Source. GlassBox opens a recorded run. | Constructor, “tạo mô hình”, live bitstream write |
| train | Observe a recorded `LearningEvent`. Teacher / Frozen / Replay / Capture are **local** and never wear BOARD | Live train, host gradient, BOARD on a local switch |
| answer | Recorded Q→A only (the product already has one). `sendChat` that never replies must not look like a live mouth | “Hội thoại với Native AI”, live composer, invented pred |
| construct | `PHASE_ORDER` spine + eight `TRACEABILITY_QUESTIONS`, each answered or explicitly missing | Inferring a missing question to complete the story |
| internal mechanism | so sánh / cập nhật / chọn token | Calling activations, hidden vectors, or layer timings “thought”, “suy nghĩ”, “ý thức” |

## Studio chrome (one wayfinding system)

- **One** mode control: header segmented `Dễ hiểu` / `Research` / `RTL`.
  `ModeStrip` is deleted. Settings may echo the level as text. ClientDock must
  not force Research via a second strip.
- Process strip stays (SPEC 6.2) and is the **only** process nav.
  Easy labels locked: `Nhận câu → Mã hóa → So sánh → Học → Nhớ → Mô hình → Trả lời`.
  Never `Hiểu`. Never `Suy luận`.
- Rail does **not** clone the strip. Groups only:
  - Hỏi / xem: Tổng quan, Tương tác
  - Bằng chứng: Sóng FPGA, Sức khỏe, Replay, Bo mạch, Bằng chứng
  - Máy: Cài đặt
  Process tabs `input`…`output` are strip-only. Tab ids do not change.
- Strip active = stage-state fill + pulse. Rail active = left cyan hairline +
  weight 600. Do not reuse `bg-cyan/15 text-cyan` for both.
- Insight trigger lives in the header or the rail footer, not as a page-level
  primary in `main`.
- No `interaction_id` → mount `StudioState` `no-interaction`. Never “No data”.
  Do not mount charts without a locked interaction.
- Live tab: recorded Q→A only. No live composer if `sendChat` does not produce
  a reply.
- `FLOW_NODES` = the seven `PHASE_ORDER` steps. Do not drop COMPARE + MODEL.

## Honesty

- TWIN / XSIM / SYNTHETIC never present as BOARD.
- Retracted fixtures in `src/lib/data.ts` (episode 488271, WNS +0.312, AUC
  0.742, COM3, LM-06-as-live, “FULLY TRACEABLE” asserted) must not paint as
  silicon.
- Observatory watermark when the GlassBox slot is not BOARD.

## Design contract (this upgrade)

| Field | Decision |
| --- | --- |
| Screen job | `/` teaches five honest jobs on interaction 1842. `/studio` instruments that interaction. `/observatory` shows the UART stall. |
| Primary user and action | Vietnamese operator. Reads source first, then picks a route. Does not send a live question. |
| Content hierarchy | Source pill → five jobs / process strip → tab body. Observatory: status → pipeline → UART console → capture log. |
| Navigation | Three equal route links. Studio: strip = process, rail = ask/evidence/machine. One mode segmented control. |
| Visual language | Existing dark tokens. IBM Plex Sans. Compact-scientific default. Cyan only for accent and process-active. Amber for non-BOARD. |
| Required states | Loading, disconnected, no-interaction, no-waveform, partial-trace, COM closed, pred empty, unanswered send. |
| Responsive | 1440 three-column insight rail; 1280 insight drawer from header. Observatory stacks below 1024. |
| Evidence used | Repository tokens, SPEC §6/§7/§24/§25, fixture session 1842/1841. UIZZE catalogue was not browsable in this environment. |
| Forbidden defaults | Inter-titled stack, ocean/leaf, `#3B82F6` brand, ModeStrip, dual process nav, live mouth, thought-language, TWIN-as-BOARD, Next.js / :3000 README. |
| Acceptance | `/` teaches five jobs; `/observatory` is the old stall; `/studio` is one wayfinding system; this file is in the tree; typecheck and lint pass. |
