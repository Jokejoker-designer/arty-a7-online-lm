# Native AI GlassBox — legal design system

**Status:** BOUND 2026-08-29 by Anh Quân.  
**Authority:** Brand draft + human bind.  
**Canonical path:** `web/glassbox/DESIGN.md`  
**Product file:** this path only. Do not keep a second DESIGN.md in the app tree.

A screen that contradicts this file is a defect even if it typechecks.

Prior addendum `#05070c` / radius `10` / `14` is **void**.

Product: Native AI GlassBox. React 19 + Vite + TanStack Start/Router +
Tailwind 4. Dev is `127.0.0.1:8080`, never port 3000. Contracts
`@glassbox/contracts` v0.4.0. Service is GET + SSE **SYNTHETIC** only.
No backend write API. No live ask. No live train. No invented silicon.
No live composer. Do not call activations thought.

---

## 1. Hard locks (do not drift)

| Lock | Rule |
| --- | --- |
| Routes | Exactly three, never merged: `/` five-job Dễ hiểu landing, `/studio` 15-tab instrument, `/observatory` UART stall |
| Identity face | **Geist** 400/500/600/700. Satoshi allowed alternate. IBM Plex Sans for long Vietnamese. Inter is fallback **only** — never title or load the stack as Inter |
| Primary | Signal Cyan Hot `#2ee9ff` (`--gb-primary`). Signal Cyan base `#22d3ee` remains legal. Arc Ice `#67e8f9` (`--gb-arc`) for hover / strip-active / job enter |
| Brand not | Not `#3B82F6` as brand. Not purple brand gradient. Not `#09090B`. Not ocean/leaf. Not AGENTWORK |
| Radius | **One** scale: card 12 / control 8 / pill 999. Dual systems illegal |
| Mode | One control: header segmented Dễ hiểu / Research / RTL. No `ModeStrip` |
| Process | Strip owns process. Easy: Nhận câu → **Mã hóa** → So sánh → Học → Nhớ → **Mô hình** → Trả lời. Never Hiểu. Never Suy luận. Never thought |
| Ask | No live-ask. Recorded Q→A only. `sendChat` that does not reply must not look like a mouth. No Gửi / diagnose as a live ask |
| Density | Default compact-scientific. `[data-density=research]` = 10 / 6 / 26 / 13. Comfortable **must write** `data-density` |
| Motion | Five jobs + strip stages enter once per visit, 160–240 ms, `cubic-bezier(0.22, 1, 0.36, 1)`. Pulse only when a stage is truly active. `prefers-reduced-motion` honored |
| Shell type | Do **not** set `font-mono` on the shell. Nav, wordmark, routes, level control stay Geist even at RTL. Numbers / ids use `.gb-num` + mono |

---

## 2. I-Lang (identity language)

Vietnamese-first. English is a technical label, not a second product.

| Slot | Legal | Forbidden |
| --- | --- | --- |
| Wordmark | `Native AI GlassBox` | GlassBox Studio as a second brand, AGENTWORK, “Native AI chat” |
| Routes | `Dễ hiểu` · `Studio` · `Đài quan sát` | Home / Dashboard / Console as product names; merging two routes into one label |
| Level | `Dễ hiểu` / `Research` / `RTL` | A second mode strip; ClientDock forcing Research |
| Process (easy) | Nhận câu → Mã hóa → So sánh → Học → Nhớ → Mô hình → Trả lời | Hiểu, Suy luận, thought, thinking, “bộ não” |
| Jobs on `/` | Tạo · Học · Trả lời · Dựng · Cơ chế bên trong | Marketing hero, “hỏi Native AI”, “tạo mô hình”, live bitstream |
| Source pills | BOARD · XSIM · TWIN · SYNTHETIC · STALL | Painting TWIN/XSIM/SYNTHETIC as BOARD |
| Observatory | Đài quan sát UART. Console is not “Native AI” and not “Tương tác” | Native AI mouth, invented `pred`, live diagnose-as-ask |
| Empty | `no-interaction` / thiếu câu. Never “No data” | Invented Interaction #500, placeholder metrics |
| Mechanism | so sánh / cập nhật / chọn token | activations, hidden vectors, or layer timings called thought / suy nghĩ / ý thức |

Voice: precise, calm, scientific. Short Vietnamese sentences. A missing fact is said missing.

---

## 3. Color — surfaces

Use CSS variables. Do not drop raw hex in features.

| Name | Hex | Token | Use |
| --- | --- | --- | --- |
| Night Well | `#070b10` | `--gb-bg` / `--color-bg` | Document / shell |
| Night Panel | `#0e141c` | `--gb-surface-1` / `--color-surface` | Rail, drawers |
| Panel Ink | `#141c26` | `--gb-surface-2` / `--color-card` | Panels |
| Raised Bench | `#1c2632` | `--gb-surface-3` / `--color-raised` | Controls, hover wells |
| Hairline | `#243040` | `--gb-border` / `--color-line` | Separators |
| Control Edge | `#7c8aa0` | `--gb-border-strong` / `--color-line-strong` | Interactive boundary (3:1) |

Not `#09090B`. Not `#05070c`.

---

## 4. Color — text

| Name | Hex | Token | Use |
| --- | --- | --- | --- |
| Paper White | `#e8eef4` | `--gb-text` / `--color-fg` | Body |
| Fog | `#9aa8b8` | `--gb-text-muted` / `--color-muted` | Secondary |
| Dust | `#8b99a9` | `--gb-text-faint` / `--color-subtle` | Supporting labels only |

Letter-spacing `-0.011em`. Line-height `1.5`. Antialiased.

---

## 5. Color — accents

| Name | Hex | Token | Use |
| --- | --- | --- | --- |
| Signal Cyan (legal base) | `#22d3ee` | `--gb-cyan-base` | Still legal. Not the current chrome primary |
| Signal Cyan Hot (**current primary**) | `#2ee9ff` | `--gb-primary` / `--color-cyan` | Chrome, focus, primary fill |
| Arc Ice | `#67e8f9` | `--gb-arc` / `--color-arc` | Hover, strip-active, landing-job enter hairline |
| Cyan Depth | `#155e75` | `--gb-primary-dim` / `--color-cyan-dim` | Pressed |

`--gb-primary-strong` aliases Arc Ice so canvas code that already reads `primary-strong` stays on the same ice.

Not `#3B82F6` as brand. Not a purple brand gradient. Not ocean/leaf.

---

## 6. Color — provenance

| Source | Hex | Rule |
| --- | --- | --- |
| BOARD | `#22c55e` | Silicon only |
| TWIN / SYNTHETIC | `#f59e0b` | Host / generated — never painted as BOARD |
| STALL | `#ef4444` | Stall / alert |
| XSIM | `#3b82f6` | **Chip fill only.** Not product accent |

Code: `src/styles.css` (`--color-*` and `--gb-*`). `src/design/tokens.ts` reads the same cascade.

---

## 7. Color — phase inks (not brand)

Off chrome. Process-phase paint only.

| Phase | Hex | Token |
| --- | --- | --- |
| Learn | `#a78bfa` | `--gb-learn` — never chrome |
| Memory | `#2ee9d4` | `--gb-memory` |
| Model | `#7db8ff` | `--gb-model` |
| Output | `#3ee8b0` | `--gb-output` |
| Inactive | `#6d7b8a` | `--gb-inactive` |

---

## 8. Elevation

Panel shadow (one):

```text
0 0 0 1px rgba(255,255,255,0.04), 0 10px 32px rgba(0,0,0,0.32)
```

`--shadow-panel`. One-shot Arc Ice hairline on landing-job enter is allowed, then settle. Endless glow loops forbidden.

---

## 9. Type

### Stack

```text
--font-sans: "Geist", "Geist Variable", "Satoshi", "IBM Plex Sans", system-ui, "Segoe UI", Roboto, Inter, sans-serif;
--font-mono: "Geist Mono", "Geist Mono Variable", "JetBrains Mono", "IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace;
```

Load fonts for real (`@fontsource-variable/geist`, `@fontsource-variable/geist-mono`, `@fontsource/ibm-plex-sans`). Do not fake Geist with Inter. Do not title the stack Inter. Do not load Inter as the identity face.

### Scale

| Role | Face | Weight | Size |
| --- | --- | --- | --- |
| Wordmark | Geist | 600 | 16–18 |
| Strip / route | Geist | 500 | 13 |
| Landing job titles | Geist | 600 | 20–22 |
| Body Vietnamese | IBM Plex Sans | 400 | 13–14 |
| Values / ids / UART hex | Mono via `.gb-num` | 400–500 | 13 compact |

Do **not** set `font-mono` on the shell. Nav, wordmark, routes, and the Dễ hiểu / Research / RTL control stay Geist even when the presentation level is RTL. Numbers and ids use `.gb-num`.

---

## 10. Radius — one scale

| Role | px | Token |
| --- | --- | --- |
| Card / panel | 12 | `--gb-radius-card` · `--radius-md` · `--radius-lg` · `--radius-xl` |
| Control | 8 | `--gb-radius-control` · `--radius-sm` |
| Pill | 999 | `--gb-radius-pill` |

Kill dual radius systems. Tailwind `rounded-xl` / `rounded-lg` must resolve to 12, not 16/20. Prior 10/14 addendum is void.

---

## 11. Density

Density (`comfortable` | `research`) ≠ presentation level (`easy` | `research` | `rtl`).

| Mode | card / row / row-height / value |
| --- | --- |
| Default compact-scientific (`research` on `<html>`) | 10 / 6 / 26 / 13 |
| Comfortable | 16 / 10 / 32 / 15 |

Comfortable is a toggle that writes `document.documentElement.dataset.density`. Hardcoding `comfortable` with no writer is illegal.

Tokens must land on chrome: `.gb-panel` reads `--gb-space-card`, `.gb-row` reads `--gb-space-row` / `--gb-row-height`, `.gb-value` reads `--gb-text-size-value`. Defining the variables and padding panels with raw `p-4` is a defect.

---

## 12. Components

| Component | Law |
| --- | --- |
| `AppWordmark` | Geist 600, 16–18. Equal weight across three routes |
| `AppRouteNav` | Geist 500, 13. Active = weight 600 + Paper White. Hover = Arc Ice. Not a second process strip |
| Level control | One segmented control in the Studio header. Dễ hiểu selected = Fog (`#9aa8b8`), never BOARD green. Settings may echo the level as text |
| Process strip | Only process nav. Active = Arc Ice fill + data-driven pulse. Complete = Fog. Waiting = Dust. BOARD `#22c55e` is silicon proof only |
| Rail | Groups only: Hỏi / xem · Bằng chứng · Máy. Process tabs `input`…`output` are strip-only. Rail active = left cyan-hot hairline + weight 600. Do not reuse strip-active paint on the rail |
| Job card | Card radius 12, panel shadow. Enter: one-shot Arc Ice hairline, then settle |
| Source pill | `AppSourcePill` keys off real `BOARD` / `activeSource`, not a `live` boolean. Board Green only when the source is BOARD. Replay / Teacher / Frozen / Capture never wear it |
| Primary button | Signal Cyan Hot fill, Night Well text. Pressed = Cyan Depth |
| Insight | Header or rail footer. Not a page-level primary in `main` |
| Composer | None. Recorded Q→A or no-interaction empty |

---

## 13. Layout — three routes

| Route | Job |
| --- | --- |
| `/` | Dễ hiểu landing. Five jobs for **one locked interaction**. Teaches. Not a marketing hero. Not the UART stall. Not the 15-tab Studio |
| `/studio` | Existing 15-tab instrument. Tab ids stay |
| `/observatory` | UART / stall dashboard. `pred` empty if empty. COM closed explicit. Console is not “Native AI” and not “Tương tác”. Watermark when not BOARD |

Shared chrome, equal weight: wordmark `Native AI GlassBox` · links `Dễ hiểu` / `Studio` / `Đài quan sát` · source pill. Back-links both ways. Do not merge routes.

---

## 14. Five jobs on `/`

| Job | Honest meaning | Forbidden |
| --- | --- | --- |
| create | Build / Session / Source. Opens a recorded run | Constructor, “tạo mô hình”, live bitstream write |
| train | Observe a recorded `LearningEvent`. Teacher / Frozen / Replay / Capture are local and never wear BOARD | Live train, host gradient, BOARD on a local switch |
| answer | Recorded Q→A only | Live-ask, “Hội thoại với Native AI”, live composer, invented pred, Gửi as a live ask |
| construct | `PHASE_ORDER` spine + eight `TRACEABILITY_QUESTIONS`, answered or explicitly missing | Inferring a missing question |
| internal mechanism | so sánh / cập nhật / chọn token | Calling activations, hidden vectors, or layer timings “thought” / “suy nghĩ” / “ý thức” |

---

## 15. Motion

`--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`.

| Motion | Spec |
| --- | --- |
| Landing five jobs | Sequential enter, 160–240 ms each, once per visit |
| Strip stages | Same enter, once per visit |
| Job enter extra | One-shot Arc Ice hairline, then settle to Hairline + panel shadow |
| Active-phase pulse | Only when `stageStates[id] === "active"`. ~2 s `ease-in-out`. Stops when not active |
| `prefers-reduced-motion` | Enter / stagger collapse to instant **or** a single 80 ms fade. Pulse off. Never ignore |

Forbidden: endless glow, breathing brain, particle fields, thinking pulses, scanlines-as-brand.

---

## 16. Do / don't

**Do**

- Keep existence-before-quality honesty: empty `pred` stays empty.
- Teach on `/`, measure on `/studio`, stall on `/observatory`.
- Wire tokens through `--gb-*` / `--color-*`. Charts resolve the cascade.
- Honor compact-scientific density on first paint.
- Keep leftover honesty: no Gửi / diagnose as a live ask.

**Don't**

- Merge the three routes or replace the five jobs with a marketing hero.
- Invent silicon, UART, PRED, heartbeat, or a live composer.
- Call activations thought.
- Title the type stack Inter.
- Use `#3B82F6` as brand, purple gradients, `#09090B`, ocean/leaf, or AGENTWORK.
- Set `font-mono` on the shell.
- Loop glow. Ignore `prefers-reduced-motion`.
- Restyle AGENTWORK. Program the FPGA from this file.

---

## 17. Responsive

| Width | Behavior |
| --- | --- |
| ≥1440 | Studio three-column: rail + main + insight |
| 1280–1439 | Insight is a drawer. Process strip scrolls horizontally |
| <1024 | Observatory stacks status / pipeline / console / UART. Studio rail is a drawer |
| <640 | Route nav may wrap; wordmark truncates; jobs stay a single column |

Touch targets on controls stay ≥32 px in compact, ≥36 px in comfortable. Reduced motion does not change layout.

---

## 18. Agent prompt guide

Parent chat does not invent a second tree. Edit in place:

```text
web/glassbox/DESIGN.md
web/glassbox/src/styles.css
web/glassbox/src/design/tokens.ts
web/glassbox/src/components/landing.tsx
web/glassbox/src/components/app-chrome.tsx
web/glassbox/src/components/shell.tsx
web/glassbox/src/routes/__root.tsx
web/glassbox/package.json
```

Before a visual patch:

1. Read this file in full.
2. One unknown: usually “does the bound token/type/motion land on the real route?”
3. Do not open a live composer to “make it feel alive.”
4. Do not wait on leftover-polish for tokens. Do not steal leftover-only honesty unless it is still broken on the branch you are editing.
5. Typecheck. Contrast script. Existing landing / studio / observatory specs.
6. If asked for a fix and an exploit: fix only.

gb-design-system owns tokens and primitives. gb-ux-product owns Vietnamese copy on the three routes. gb-accessibility owns contrast. A visual lift that regresses leftover honesty is a fail.

---

## 19. Conflicts resolved

| Prior | Verdict |
| --- | --- |
| SPEC §7.4 “UI: Inter / IBM Plex Sans” | **Superseded.** Geist is the identity face. IBM Plex Sans is secondary for long Vietnamese. Inter is last-resort fallback |
| SPEC §7.6 default comfortable | **Superseded** for GlassBox app chrome. Default is compact-scientific (`research` on `<html>`) |
| SPEC §7.5 cards 12–16 / controls 8–12 | **Tightened** to one scale: 12 / 8 / 999 |
| PR #28 DESIGN.md titled IBM Plex + `#22d3ee` current accent | **Superseded** for identity and current primary. Three-route IA, process labels, no-live-ask, density writer **retained** |
| `#22d3ee` as `--gb-primary` | Legal **base**. Current primary is `#2ee9ff` |
| `#05070c` / radius 10/14 addendum | **Void** |
| `#09090B` shadcn default canvas | **Forbidden** |
| Dual `--gb-radius-card: 14` vs `--radius-md: 12` | **Void.** Both 12 |
| `font-mono` on the RTL shell | **Forbidden.** `.gb-num` only |
| Observatory as `/` | **Void.** Observatory is `/observatory` |
| ModeStrip as a second mode control | **Void** |
| Hiểu / Suy luận on the easy strip | **Void.** Mã hóa / Mô hình |
| Marketing hero in place of five jobs | **Forbidden** |
| Endless glow / thinking pulse | **Forbidden** |

---

## 20. Honesty (retained from PR #28)

TWIN / XSIM / SYNTHETIC never present as BOARD. Retracted fixtures in
`src/lib/data.ts` (episode 488271, WNS +0.312, AUC 0.742, COM3, LM-06-as-live,
asserted “FULLY TRACEABLE”) must not paint as silicon.

Observatory is stall UART, not Native AI mouth. `pred` empty if empty.

---

## 21. Acceptance

- This file is in the repo at `web/glassbox/DESIGN.md`.
- Geist is the face (loaded, not faked).
- Cyan hot + Arc Ice are wired as `--gb-primary` and `--gb-arc`.
- Five jobs stagger once. Strip stages stagger once.
- `prefers-reduced-motion` collapses enter to instant or one 80 ms fade.
- Leftover honesty still holds: no Gửi / diagnose as a live ask.
- `/` teaches the five jobs. `/studio` stays the 15-tab instrument. `/observatory` stays the stall.
- Typecheck and existing GlassBox tests pass.
