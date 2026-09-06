# Close Native AI V1 — DAG (Blueprint V3.1)

Authority: `UNIFIED_NATIVE_AI_FINAL_BLUEPRINT_V3_1.md`.
Goal (human-only): `NATIVE_V1_MINI_AI_BOARD_PASS`.

```text
P0  U8-R3 bag (XSim structural; MISMATCH)
P1  U5Q-M10-TYPECLASS-SCALE-00 HOST_MODEL PASS
P2  U6T heap 2-phase: XSim PASS; OOC WNS -5.78→-3.35 FAIL (moved to QSE)
P2b U6Q-QSE-LEXICON-TIMING-00 POST_ROUTE_OOC PASS WNS=+0.163 TNS=0 WHS=+0.132
P3  U7C-LEARN-STORE-LIMIT-00 PASS (DEPTH=32 LIMIT, not 800k SCALE)
P4  U7P-PERSISTENCE-IDENTITY-00 PASS (FLUSH==RELOAD XSim)
P5  U7A-ROOT-B-FINAL-00 PASS (close-path store; SoC WDMA OPEN_AUDIT)
P6  U8-R3B-PRODUCTION-GLUE-00 PASS (rtl glue SHA match; U8-R3 XSim PASS; pred=861 MISMATCH)
P7  U8-UNIFIED-SOC-XSIM-00 PASS (raw query→U6→fwd→LM; ENC==CTX; pred=861; SoC top NOT inst)
P7b U8-SOC-ROOTB-WDMA-00           ← NEXT (stall/evict/reset/overflow/flush ACK=commit)
P8  U8R-REMOVE-SYNTHETIC-PRODUCTION (after P7b; do not auto-open)
P9  U9-FINAL-SOURCE-FREEZE-00
P10 U9R-FINAL-REGRESSION-00
P11 U9S / U9I  (NEW unique bit SHA)
P12 U9P-PREPROGRAM-CLOSURE-00
P13 U10 program ONCE + blind exam (HOLD_A 653 unchanged)
P14 56-box then human declare
```

Never program `1F0F2ABB` / `9CA2B30D` / `F24150BD` as the close bit.
gstack: implementer → qa-only auditor → one patch. BIT=NO until U9P.
