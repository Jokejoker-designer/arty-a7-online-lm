# GStack parent loop — Native V1

gstack source: `E:\agents\gstack` (garrytan/gstack, MIT). Not qstack.
Grok host: `.grok/workflows/blueprint-gate-loop.rhai` (also `~/.grok/workflows/`).

Owner instruction: DAG already planned. Parent must not stop mid-lake to ask.

## Roles

| Role | gstack analog | Grok |
|---|---|---|
| Parent | /autoplan coordinator | this workflow |
| Identify scout | plan intake | agent read-only |
| Implementer | eng after /plan-eng-review | agent execute |
| Nghiem-thu auditor | /qa-only (never fixes) | agent read-only |
| Patch implementer | /review auto-fix then re-QA | agent execute |
| Hard stop | /careful + /guard | BIT=NO PROGRAM=NO |

## Loop

```text
identify next blueprint gate from CLOSE_NATIVE_V1_DAG
    → implementer (one lake, one unknown)
    → independent auditor (FAIL / overclaim / fraud / logic)
         PASS → next auto lake until max_gates
         FAIL/OVERCLAIM/logic_bug → one causal patch → auditor again
         BLOCKED (BIT/PROGRAM/owner) → stop, do not invent
```

Default `start_gate=U8-SOC-ROOTB-WDMA-00`, `max_gates=2`.
Never auto U9S/U9I/U9P/U10/P11–P14.

## Hard stops (never auto)

BIT, PROGRAM, REPROGRAM_AGAIN, Q-head, HOLD_A retarget,
force-push, identity invention (CLASS_ID as NID / LM token / first member),
reseat `1F0F2ABB`.

## Current lake

P7 TYPE_CLASS chain XSim PASS. Next auto: P7b WDMA/Root-B txn matrix.
P8 U8R only if identify confirms after P7b. Not PROGRAM.
