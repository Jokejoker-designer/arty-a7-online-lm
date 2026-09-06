# ACCEPTANCE — U8-R3-TYPECLASS-TOPK-TO-LM-00

```text
AUDITOR     = gstack-acceptance-auditor (qa-only; report-only; no RTL/TB/CLOSEOUT patch)
GATE        = U8-R3-TYPECLASS-TOPK-TO-LM-00
BAG         = results/A7-NATIVE-GRAPH/GROK-ORCH-00/U8-R3-TYPECLASS-TOPK-TO-LM-00
AUTHORITY   = skill SKILL.md + owner U8 lake + bag PREREG/LOCK + raw xsim.log + RTL
VERDICT     = PASS
OVERCLAIM   = false
FRAUD       = false
LOGIC_BUG   = false
FIRST_DIV   = none (accepted xsim.log)
```

Evidence > chat memory. This file does not change CLOSEOUT claims.

## Authority / hard stops

| Token | Observed |
|---|---|
| BIT | NO (vivado batch sourced `run_xsim.tcl` only; no `write_bitstream` / `open_hw`) |
| PROGRAM | NO |
| REPROGRAM_AGAIN | NO |
| QHEAD | NO |
| HOLD_A_ORACLE_RETARGET | NO (pred obs 861; not 653/689/237/60) |
| force-push / rewind to `2d3f3e4` | not observed; worktree HEAD still `2a3bca3991b29657a5a74c69a6ef0872b8c3e5c0` on `grok-orch/v31-canonical-00` |
| auto-open U8R / U9 | CLOSEOUT NEXT forbids; not opened here |

Semantic LM class remains `LM_CHECKPOINT_CONTEXT_MISMATCH`.

## Fail-closed inputs

| Artifact | Status |
|---|---|
| `xsim.log` | present; XSim 2026.1; start Sun Sep 6 12:57:22 2026; exit 12:59:08; `$finish` at 280342285 ns |
| `SHA256.txt` | present (encoder, glue, TB, tcl, xsim.log) |
| PASS marker vs log | CLOSEOUT `RESULT=PASS` / marker `U8_R3_TYPECLASS_TOPK_TO_LM_PASS` **matches** xsim.log line 1008 |
| `FIRST_DIVERGENCE` in accepted log | absent |

HEAD claim `2a3bca3991b29657a5a74c69a6ef0872b8c3e5c0` matches git ref `refs/heads/grok-orch/v31-canonical-00`.

Encoder digest recorded in this bag:

`bbd95f7f148e722002e1982292662c8cb54e26ce16ff7ead75400313182892aa`

is byte-identical to U8-R2 bag `U8-R2-LM-CONTEXT-ENCODER-V1-00/SHA256.txt` for `rtl/native_graph/lm/a7ng_lm_ctx_encoder_v1.sv`. Encoder RTL inspected: CLASS_ID 1..443 → `a7ng_typeclass_materialize` `{eid,iid,rid,xid}`; `member_ptr` unused in the token stream. `run_xsim.tcl` compiles that RTL path, not a bag fork.

## Accepted xsim.log lines (verbatim)

```text
WMEM_INIT n=802816
HEAP cid=65 66 67 65520 65521 65522 65523 65524
ENC ntok=12 rec=3 skip=5
ENC stream 1 1 0 0 1 1 0 1 1 1 1 0
CTX stream 1 1 0 0 1 1 0 1 1 1 1 0
CHAIN ctx_we=2 sfwd_pulses=1 busy_rise=1 core_done=1
CHAIN ctx_beats=2 sfwd_beats=2 glue_pred=861 core_pred=861
HOST tok=0 w=0 win=0 addr=0 rank_or=0 mem_exam=0
PRED_OBS core=861 (not HOLD_A oracle; not OUT=653 claim)
SEMANTIC_LM_CLAIM=NO CLASS=LM_CHECKPOINT_CONTEXT_MISMATCH
BIT=NO PROGRAM=NO QHEAD=NO HOLD_A_ORACLE_RETARGET=NO
CLAIM_NOT_SEMANTIC_LM
U8_R3_TYPECLASS_TOPK_TO_LM_PASS
```

`vivado.log` ends `U8_R3_XSIM_OK`. xvlog has no ERROR. xelab built snapshot `u8r3` (warning only: ranking `ordered_valid_o` unconnected).

## Chain (RTL_FACT + XSIM)

```text
U7 a7ng_u7_contextual_rank.topk_class_id_o
  → TB cid latch on rank_done (not host-forced CLASS_ID)
  → a7ng_lm_ctx_encoder_v1
  → a7ng_lm_ctx_fwd_v1 (bag glue; not a7ng_native_ctx_bind)
  → ctx_we beats of encoder pack
  → one start_fwd pulse / one busy rise / one done
  → tiny_gpt803k_core SIM_FULL=1
```

Ranking heap id is `{16'd0, cid_q}` from typeclass scan, not NID. Pads are `0xFFF0+` (65520..65524), skipped by encoder (`cid_ok` 1..443). `train_en <= train_after_i && learn_i && !freeze_i` with TB `freeze=1`, `train_after=0` → no S_TWALK. `n_host_or_o` is OR of stubbed QSE host counters; log `rank_or=0`.

Glue forwards `enc_beat_pack` via `pack_d` (1-cycle align to encoder `rd` NBA). Does not pack `CLASS_ID`, `CLASS_ID[7:0]`, or member NID. `a7ng_native_ctx_bind` is not in `run_xsim.tcl` and not instantiated.

Watchdog is cycle-based (`TO=400000000`); no `#20_000_000_000`.

## Hunt

| Hunt | Result |
|---|---|
| FAIL hidden as PASS | **not on accepted log.** Bag backup `xsim_31828.backup.log` (12:53:56–12:55:41) is `FIRST_DIVERGENCE CTX_PACK mismatch encoder`, pred 821, no CTX stream print. Accepted run is a later XSim (12:57:22) with CTX==ENC and pred 861. Pred change shows LM input changed; TB still contains `CTX_PACK` / `CLASS_ID_AS_TOKEN` checks. Not a log rewrite of the failing run. |
| Silicon / Gate14 / Q-head / NLU / OUT=653 / “LM understands TYPE_CLASS” | not claimed; CLOSEOUT forbidden-claims list matches |
| TB inspects CLASS_ID to pick reward | no; `rew_v=0`; heap 65/66/67 is a golden check of ranking, not a reward path |
| Host builds learn key | no; `LEARN_KEY_CLASS_CONTEXT_V1` is inside ranking DUT; train path off |
| Host CLASS_ID into encoder | no; `cid <= top_cid` on `rank_done`; poke is `eid=1 iid=1 ev=1 iv=1` |
| CLASS_ID stuffed as LM token / low8 | no; stream `1,1,0,0,1,1,0,1,1,1,1,0`; TB rejects tok==65/66/67 |
| first-member / member NID | no; encoder takes `mat_e/i/r/x` only |
| NID-era `global_id` low8 as R3 stream | no; bind unused; glue is encoder beat_pack |
| lookup-after-heap as cheat | encoder V1 *is* CLASS_ID → typeclass row (U8-R2 law). Not first-member NID lookup. |
| Host counters nonzero | log `tok=0 w=0 win=0 addr=0 rank_or=0 mem_exam=0`. Residual: `n_host_tok/w/win/addr` are TB integers never incremented (tautology). DUT `n_host_or` and post-exam `mem_we` are real and zero. WMEM load is before `exam=1`. |
| BIT/PROGRAM/QHEAD performed | no |
| History rewrite | backups retained; HEAD not rewound |

## CLOSEOUT vs log

Allowed CLOSEOUT claim is XSim-only unified Top-K CLASS_ID → encoder V1 → one `start_fwd` → one `done`, host tok/w/win/addr 0. That is what the accepted log supports. `START_FWD_PULSES=1` with `sfwd_beats=2` is the H4 overlap (one rising pulse, two high beats; one busy rise). Not an extra forward.

`core_pred=861` is labeled observation, not HOLD_A / OUT=653 / TYPE_CLASS NLU.

## Residual (not FAIL)

1. Live `Get-FileHash` of encoder vs `SHA256.txt` was not re-run in this auditor process; recorded digest matches frozen U8-R2 bag and inspected RTL.
2. TB host tok/w/win/addr counters are dead constants.
3. `n_sfwd < 1` (not `!== 1`); accepted log still shows exactly one pulse.
4. Glue lives in the bag, not `rtl/`. CLOSEOUT does not call it production silicon glue.

## Verdict

**PASS.** `overclaim=false` `fraud=false` `logic_bug=false`.

Do not auto-open U8R / U9 / Q-head. Semantic claim stays mismatch until a new checkpoint is trained on `LM_CTX_TYPECLASS_SERIAL_V1`.
