# PREREG — U8-UNIFIED-SOC-XSIM-00

```text
GATE              = U8-UNIFIED-SOC-XSIM-00
STATUS            = BLOCKED
BLOCKER           = no sealed SoC TB that instantiates rtl a7ng_lm_ctx_fwd_v1
MIG               = restored to HEAD (line-ending/timestamp dirt only)
RTL_EDIT          = NO this prereg
BIT               = NO
PROGRAM           = NO
U8R               = NO (do not auto-open)
```

P6 promoted glue into `rtl/native_graph/lm/a7ng_lm_ctx_fwd_v1.sv`.
U8-R3 XSim (not SoC, not MIG) already PASS on that copy.

One unknown when unblocked: does the existing teacher-off SoC XSim
vehicle (`P2-TEACHER-OFF-SOC-XSIM-*`) still elaborate/pass after QSE/heap
**without** new TYPE_CLASS wiring? That is a **regression**, not U8R.

Do not mix U8R (remove synthetic) into this gate. Do not program.
Do not reseat `1F0F2ABB`.
