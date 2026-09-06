# GStack parent loop — Native V1

gstack source: `E:\agents\gstack` (garrytan/gstack 1.80, MIT).
Grok host: `.grok/workflows/blueprint-gate-loop.rhai`

## Roles

| Role | gstack analog | Grok |
|---|---|---|
| Parent | /autoplan coordinator | this workflow |
| Implementer | eng after /plan-eng-review | agent execute |
| Acceptance auditor | /qa-only (never fixes) | agent read-only |
| Patch implementer | /review auto-fix then re-QA | agent execute |
| Hard stop | /careful + /guard | BIT=NO PROGRAM=NO |

## Loop

```text
identify next blueprint gate
    → implementer (one lake)
    → independent auditor
         PASS → next gate or stop at max_gates
         FAIL/OVERCLAIM → one causal patch → auditor again
         BLOCKED (owner/BIT) → stop, do not invent
```

This host run: **1 patch round** then stop (fail closed). Auditor never patches.
Parent does not ask the owner mid-lake; work orders are already locked.

## Hard stops (never auto)

BIT, PROGRAM, REPROGRAM_AGAIN, Q-head, HOLD_A retarget,
force-push, identity invention (CLASS_ID as NID / LM token / first member).

## Current lake

U8-R3 XSim PASS (structural). P1 `U5Q-M10-TYPECLASS-SCALE-00` HOST_MODEL PASS.
Next close-critical: `U6T-TYPECLASS-HEAP-TIMING-00`.
Do not program `1F0F2ABB`. PROGRAM only at U10 on a new unique bit.
Semantic LM claim remains MISMATCH until a new checkpoint exists.
