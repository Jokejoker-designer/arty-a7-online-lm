# Native AI GlassBox — legal design system

**Canonical path:** `web/glassbox/DESIGN.md`  
**Bound draft:** Anh Quân, `/workspace/glassbox-bind/DESIGN.md` (2026-08-29).  
This VM did not receive that bind file. The locks below are the legal
in-repo copy of the draft he restated. A screen that contradicts them is
a defect even if it typechecks. Do not keep a second DESIGN.md in the
app tree. Do not invent a fourth route or a second type stack.

Product: Native AI GlassBox. React 19 + Vite + TanStack Start/Router +
Tailwind 4. Dev is `127.0.0.1:8080`, never port 3000. Contracts
`@glassbox/contracts` v0.4.0. Service is GET + SSE **SYNTHETIC** only.
No backend write API. No live ask. No live train. No invented silicon.

## Hard locks (do not drift)

| Lock | Rule |
| --- | --- |
| Routes | Exactly three, never merged: `/` landing, `/studio`, `/observatory` |
| Tokens | bg `#070b10`, accent cyan `#22d3ee`. Full table below. Not AGENTWORK. Not `#3B82F6` as brand |
| Type | **IBM Plex Sans + system-ui**. Inter is a fallback only — do not title or load the stack as Inter |
| Mode | One control: header segmented Dễ hiểu / Research / RTL. No `ModeStrip` |
| Process | Strip owns process. Easy labels: Nhận câu → **Mã hóa** → So sánh → Học → Nhớ → **Mô hình** → Trả lời. Never Hiểu. Never Suy luận |
| Ask | No live-ask. Recorded Q→A only. `sendChat` that does not reply must not look like a mouth |
| Density | Default compact-scientific. `[data-density=research]` = 10 / 6 / 26 / 13. Comfortable **must write** `data-density` |

## Tokens (locked)

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
| Learn | `#a78bfa` | Semantic LEARN phase only. Never chrome |

XSIM may keep a distinct blue as a **source** colour. It is not the product
accent. Code: `src/styles.css` (`--color-*` and `--gb-*`).
`src/design/tokens.ts` reads the same cascade. No raw hex in features.

## Type / radius / density

- UI: IBM Plex Sans, then system-ui. Inter may remain last in the CSS stack
  only. Do not load Roboto as identity. Do not load Inter as the titled face.
- Mono: JetBrains Mono for code, numbers, UART hex, RTL signal names.
  Never `font-mono` the whole shell.
- Radius: card 12 · control 8 · pill 999.
- Default density is compact-scientific (`research` on `<html>`).
  Comfortable is a toggle that writes `document.documentElement.dataset.density`.
  Hardcoding `comfortable` with no writer is illegal. The tokens must land
  on chrome: `.gb-panel` reads `--gb-space-card`, `.gb-row` reads
  `--gb-space-row` / `--gb-row-height`, `.gb-value` reads
  `--gb-text-size-value`. Defining the variables and padding panels with
  `p-4` is a defect.
- Density (`comfortable` | `research`) ≠ presentation level (`easy` | `research` | `rtl`).

## Three routes

| Route | Job |
| --- | --- |
| `/` | Dễ hiểu landing. Five jobs for **one locked interaction**. Teaches. Not the UART stall. Not the 15-tab Studio. |
| `/studio` | Existing 15-tab instrument. Tab ids stay. |
| `/observatory` | Former `/` UART / stall dashboard. `pred` empty if empty. COM closed explicit. Console is not “Native AI” and not “Tương tác”. Watermark when not BOARD. |

Shared chrome, equal weight: wordmark `Native AI GlassBox` · links
`Dễ hiểu` / `Studio` / `Đài quan sát` · source pill. Back-links both ways.

## Five jobs on `/`

| Job | Honest meaning | Forbidden |
| --- | --- | --- |
| create | Build / Session / Source. Opens a recorded run. | Constructor, “tạo mô hình”, live bitstream write |
| train | Observe a recorded `LearningEvent`. Teacher / Frozen / Replay / Capture are local and never wear BOARD | Live train, host gradient, BOARD on a local switch |
| answer | Recorded Q→A only. | Live-ask, “Hội thoại với Native AI”, live composer, invented pred |
| construct | `PHASE_ORDER` spine + eight `TRACEABILITY_QUESTIONS`, answered or explicitly missing | Inferring a missing question |
| internal mechanism | so sánh / cập nhật / chọn token | Calling activations, hidden vectors, or layer timings “thought” / “suy nghĩ” / “ý thức” |

## Studio chrome

- One mode control in the header. Settings may echo the level as text.
  ClientDock must not force Research.
- Process strip (SPEC 6.2) is the **only** process nav.
- Rail does not clone the strip. Groups only:
  - Hỏi / xem: Tổng quan, Tương tác
  - Bằng chứng: Sóng FPGA, Sức khỏe, Replay, Bo mạch, Bằng chứng
  - Máy: Cài đặt
  Process tabs `input`…`output` are strip-only.
- Strip active = stage-state fill + pulse. Rail active = left cyan hairline +
  weight 600. Do not reuse `bg-cyan/15 text-cyan` for both.
- Insight trigger in the header or rail footer, not a page-level primary in
  `main`.
- No `interaction_id` → `StudioState` `no-interaction`. Never “No data”.
  Do not mount charts without a locked interaction.
- Live tab: recorded Q→A only.
- `FLOW_NODES` = the seven `PHASE_ORDER` steps. Do not drop COMPARE + MODEL.

## Honesty

TWIN / XSIM / SYNTHETIC never present as BOARD. Retracted fixtures in
`src/lib/data.ts` (episode 488271, WNS +0.312, AUC 0.742, COM3, LM-06-as-live,
asserted “FULLY TRACEABLE”) must not paint as silicon.

## Acceptance

`/` teaches the five jobs. `/observatory` is the old stall. `/studio` is one
wayfinding system. This file is in the tree. Typecheck and lint pass.
