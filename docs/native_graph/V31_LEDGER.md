# V31 ledger (PLAN §10)

Parent selects by requested `start_gate` + this table. Scout may not rewind an accepted gate.

| gate_id | status | evidence_class | source SHA | next | scope |
|---|---|---|---|---|---|
| U8-R3 | ACCEPTED | XSIM structural | encoder `bbd95f7f` | historical | Top-K→LM pred=861 MISMATCH; note “do not open U8R/U9” is **this bag’s** scope, not global |
| U8-SOC-ROOTB-WDMA-00 | ACCEPTED | SLICE_XSIM | `3b3aebe` | residual C04 | dest ready not wired through production core |
| U8R-REMOVE-SYNTHETIC-PRODUCTION-00 | ACCEPTED | XSIM + RTL_FACT | `bdddbd68` | residual C03 | C9 mux source; not query/reward liveness |
| U9-FINAL-SOURCE-FREEZE-00 | ACCEPTED | docs/manifest | `4ca071e` freeze docs; PRODUCTION_RTL=`bdddbd68` | P10 | freeze ≠ Master satisfaction |
| U9R-FINAL-REGRESSION-00 | OPEN | — | pin `bdddbd68` | R0–R9 then C00–C13 | XSim/regression only; no U9S/bit |

Prerequisite residuals (not covered by accepted PASS): C02 integration, C03 pending/snapshot, C04 WDMA dest ready, C05 M10 member evidence, C06 oracle 861≠653, C09 reset/retrain, C10 host-leak negative tests.
