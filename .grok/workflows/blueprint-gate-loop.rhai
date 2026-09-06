let meta = #{
    name: "blueprint-gate-loop",
    description: "gstack parent loop: implement next Native V1 gate, independent qa-only audit, one causal patch, never BIT/PROGRAM",
    when_to_use: "Auto-dispatch the frozen master blueprint lake with implement then independent acceptance auditor",
    phases: [
        #{ title: "Identify", detail: "confirm next lake from HEAD and owner DAG" },
        #{ title: "Implement", detail: "one FPGA-owned gate, no overclaim" },
        #{ title: "Audit", detail: "independent qa-only: FAIL, overclaim, fraud, logic" },
        #{ title: "Repair", detail: "one causal patch then re-audit" },
    ],
};

let impl_schema = #{
    "type": "object",
    "required": ["status", "gate", "bag", "summary"],
    "properties": #{
        "status": #{ "type": "string" },
        "gate": #{ "type": "string" },
        "bag": #{ "type": "string" },
        "summary": #{ "type": "string" },
        "blocked_reason": #{ "type": "string" },
        "head": #{ "type": "string" },
        "xsim": #{ "type": "string" },
    },
};

let audit_schema = #{
    "type": "object",
    "required": ["verdict", "overclaim", "fraud", "evidence"],
    "properties": #{
        "verdict": #{ "type": "string" },
        "overclaim": #{ "type": "boolean" },
        "fraud": #{ "type": "boolean" },
        "first_divergence": #{ "type": "string" },
        "evidence": #{ "type": "string" },
        "fix_hint": #{ "type": "string" },
        "logic_bug": #{ "type": "boolean" },
    },
};

fn as_str(x) {
    if x == () { return ""; }
    if type_of(x) == "string" { return x; }
    return "";
}

let gate = "U8-R3";
if args != () && args.gate != () {
    gate = args.gate;
}

let root = "D:/Jetking_sem4/SEM_4/arty-a7-online-lm-g14-preboard-00";
let bag_r3 = root + "/results/A7-NATIVE-GRAPH/GROK-ORCH-00/U8-R3-TYPECLASS-TOPK-TO-LM-00";

let hard = "HARD STOPS (never violate): BIT=NO PROGRAM=NO REPROGRAM_AGAIN=NO QHEAD=NO HOLD_A_ORACLE_RETARGET=NO. ";
hard += "Do not force-push. Do not rewind to 2d3f3e4. Do not invent CLASS_ID as NID or as an LM token. ";
hard += "Do not pick first-member. Do not retarget HOLD_A OUT 653/689/237/60. ";
hard += "Semantic LM claim remains LM_CHECKPOINT_CONTEXT_MISMATCH. Do not auto-open U8R or U9. ";
hard += "Do not use #20_000_000_000 delays (32-bit overflow). Use a cycle watchdog.";

phase("Identify");
log("Parent lake: " + gate + " (gstack analog: /autoplan coordinator)");

let idp = "You are the gstack identify scout (read-only). Repo " + root + " branch grok-orch/v31-canonical-00. ";
idp += "Use git log, read_file, and grep. Do not implement. Do not edit files. ";
idp += "Read: git HEAD; results/A7-NATIVE-GRAPH/GROK-ORCH-00/U8-R2-LM-CONTEXT-ENCODER-V1-00/CLOSEOUT.md; ";
idp += "docs/native_graph/GSTACK_PARENT_LOOP.md; UNIFIED_NATIVE_AI_FINAL_BLUEPRINT if present. ";
idp += "Expected: HEAD is 2a3bca3 or a descendant of U8-R2 d29153e. Next owner lake is U8-R3. ";
idp += "If HEAD is an ancestor of U8-R2, status=BLOCKED (rewind forbidden). ";
idp += "Return status PASS, gate U8-R3, bag path of the U8-R2 closeout, summary of why R3 is next. ";
idp += hard;
let idr = agent(idp, #{
    label: "identify",
    capability_mode: "read-only",
    output_schema: impl_schema,
});
if idr == () || !idr.success {
    complete(#{ status: "BLOCKED", reason: "identify failed" });
}
let id_status = "";
if idr.output != () { id_status = as_str(idr.output.status); }
if id_status == "BLOCKED" {
    complete(#{
        status: "BLOCKED",
        gate: gate,
        reason: as_str(idr.output.blocked_reason),
        summary: as_str(idr.output.summary),
    });
}

phase("Implement");
log("Implementer (gstack /plan-eng-review then eng). Isolation: shared worktree, no worktree fork.");

let ip = "You are the gstack implementer for Native V1 on Digilent Arty A7. ";
ip += "Worktree: " + root + " . Branch grok-orch/v31-canonical-00. ";
ip += "Execute ONE lake only: " + gate + " = U8-R3-TYPECLASS-TOPK-TO-LM-00. ";
ip += "MUST use tools: read_file, grep, list_dir, run_terminal_command. Do not answer from memory. ";
ip += "READ FIRST: U8-R2 CLOSEOUT, rtl/native_graph/lm/a7ng_lm_ctx_encoder_v1.sv, ";
ip += "rtl/native_graph/lm/a7ng_native_ctx_bind.sv, U8-R0 tb_u8_r0.sv and run_xsim.tcl, ";
ip += "U8-R2 tb_u8_r2.sv and run_xsim.tcl, .agents/skills/gstack-acceptance-auditor/SKILL.md. ";
ip += "GOAL: ranked TYPE_CLASS CLASS_ID heap (U7 ranking DUT or equivalent FPGA CLASS_ID vector) ";
ip += "-> a7ng_lm_ctx_encoder_v1 -> ctx_we beats of eid,iid,rid,xid tokens -> exactly one start_fwd ";
ip += "-> LM-06 SIM_FULL -> exactly one done. Host n_host_tok/w/win/addr must stay 0. ";
ip += "Encoder stream is rank-order [eid,iid,rid,xid] per valid CLASS_ID 1..443. Never serialize CLASS_ID or CLASS_ID[7:0]. ";
ip += "Do not reuse a7ng_native_ctx_bind global_id low8 packing for CLASS_ID. That path is NID-era. ";
ip += "Reuse encoder module as-is if SHA still matches U8-R2; write a new TB + optional glue, not a new encoder law. ";
ip += "XSim via C:/2026.1/Vivado/bin xvlog/xelab/xsim like U8-R2 run_xsim.tcl. Cycle watchdog, not ns overflow. ";
ip += "Bag: " + bag_r3 + " with PREREG.md LOCK.txt RESULTS.md CLOSEOUT.md METRICS.json SHA256.txt tb run_xsim.tcl xsim.log. ";
ip += "CLOSEOUT must say SEMANTIC_LM_CLAIM=NO CLASS=LM_CHECKPOINT_CONTEXT_MISMATCH BIT=NO PROGRAM=NO QHEAD=NO. ";
ip += "Do not claim LM understands TYPE_CLASS. Do not claim silicon/Gate14/OUT=653. ";
ip += "Do not git add MIG/vivado/ip. Do not commit a7lm06_wmem.hex. Do not force-push. ";
ip += "If blocked by missing ranking CLASS_ID ports, status=BLOCKED with blocked_reason; do not invent IDs. ";
ip += hard;
ip += " Return JSON status PASS FAIL or BLOCKED, gate, bag absolute path, summary, xsim PASS/FAIL line.";
let impl = agent(ip, #{
    label: "implement:" + gate,
    capability_mode: "all",
    output_schema: impl_schema,
});
if impl == () || !impl.success {
    complete(#{ status: "BLOCKED", reason: "implementer failed to return schema" });
}

let impl_status = "";
let impl_bag = bag_r3;
if impl.output != () {
    impl_status = as_str(impl.output.status);
    if as_str(impl.output.bag) != "" { impl_bag = as_str(impl.output.bag); }
}
if impl_status == "BLOCKED" {
    complete(#{
        status: "BLOCKED",
        gate: gate,
        reason: as_str(impl.output.blocked_reason),
        summary: as_str(impl.output.summary),
        bag: impl_bag,
    });
}

phase("Audit");
log("Independent auditor (gstack /qa-only analog). Report-only. Never patches.");

let ap = "You are the independent gstack acceptance auditor (qa-only). NEVER patch RTL, TB, or CLOSEOUT claims. ";
ap += "Repo " + root + ". Gate " + gate + ". Bag " + impl_bag + ". ";
ap += "Read skill D:/Jetking_sem4/SEM_4/arty-a7-online-lm-g14-preboard-00/.agents/skills/gstack-acceptance-auditor/SKILL.md. ";
ap += "MUST use read_file and grep on: CLOSEOUT.md RESULTS.md xsim.log SHA256.txt encoder RTL ranking/glue RTL TB. ";
ap += "Fail closed if xsim.log missing, SHA missing, or a PASS is asserted without a matching log line. ";
ap += "Hunt: FAIL hidden as PASS; overclaim (silicon, Gate14, Q-head, NLU, OUT=653 on untrained path, LM understands TYPE_CLASS); ";
ap += "fraud (TB inspects CLASS_ID to pick reward, host builds learn key, first-member); ";
ap += "logic (lookup after heap, CLASS_ID stuffed as LM token, low8 CLASS_ID, NID as CLASS_ID, host counters nonzero); ";
ap += "BIT/PROGRAM/QHEAD performed; history rewrite. ";
ap += "Write ACCEPTANCE.md in the bag only. Do not edit RTL. ";
ap += "verdict PASS FAIL BLOCKED or OVERCLAIM. overclaim=true if CLOSEOUT claims more than xsim.log supports. ";
ap += "fraud=true if TB cheats. logic_bug=true if CLASS_ID used as token or bind still packs global_id low8 as the R3 stream. ";
ap += hard;
let aud = agent(ap, #{
    label: "audit:" + gate,
    capability_mode: "read-only",
    output_schema: audit_schema,
});
if aud == () || !aud.success {
    complete(#{ status: "BLOCKED", reason: "auditor failed", impl: impl.output });
}

let v = "";
let oc = false;
let fr = false;
if aud.output != () {
    v = as_str(aud.output.verdict);
    if aud.output.overclaim == true { oc = true; }
    if aud.output.fraud == true { fr = true; }
}
log("Auditor verdict=" + v);

if v == "PASS" && oc == false && fr == false {
    complete(#{
        status: "PASS",
        gate: gate,
        bag: impl_bag,
        audit: aud.output,
        next: "Do not auto-open U8R or U9. BIT=NO PROGRAM=NO.",
    });
}
if v == "BLOCKED" {
    complete(#{ status: "BLOCKED", gate: gate, audit: aud.output, impl: impl.output });
}

phase("Repair");
log("One causal patch then re-audit. Auditor still never patches.");

let rp = "You are the gstack patch implementer. ONE causal fix only. Stop at first divergence. ";
rp += "Repo " + root + ". Gate " + gate + ". Bag " + impl_bag + ". ";
rp += "MUST use read_file grep run_terminal_command. Do not answer from memory. ";
rp += "Auditor verdict: " + v + ". ";
rp += "first_divergence: " + as_str(aud.output.first_divergence) + ". ";
rp += "fix_hint: " + as_str(aud.output.fix_hint) + ". ";
rp += "evidence: " + as_str(aud.output.evidence) + ". ";
rp += "Fix only that divergence. Re-run XSim. Update CLOSEOUT honestly (do not relabel FAIL as PASS). ";
rp += "Do not expand scope to U8R/U9. " + hard;
let fix = agent(rp, #{
    label: "patch:" + gate,
    capability_mode: "all",
    output_schema: impl_schema,
});
if fix == () || !fix.success {
    complete(#{ status: "FAIL", reason: "patch agent failed", audit: aud.output });
}

let fix_bag = impl_bag;
if fix.output != () && as_str(fix.output.bag) != "" {
    fix_bag = as_str(fix.output.bag);
}

let ap2 = "Independent re-audit after one patch. NEVER patch. qa-only. Repo " + root + ". ";
ap2 += "Bag " + fix_bag + ". Read new xsim.log CLOSEOUT ACCEPTANCE. Fail closed if log missing. ";
ap2 += "Same hunt as first audit: FAIL-as-PASS, overclaim, fraud, CLASS_ID-as-token, BIT/PROGRAM. ";
ap2 += "Write ACCEPTANCE.md. " + hard;
let aud2 = agent(ap2, #{
    label: "reaudit:" + gate,
    capability_mode: "read-only",
    output_schema: audit_schema,
});
if aud2 == () || !aud2.success {
    complete(#{ status: "FAIL", reason: "reaudit failed", patch: fix.output, first_audit: aud.output });
}

let v2 = "";
let oc2 = false;
let fr2 = false;
if aud2.output != () {
    v2 = as_str(aud2.output.verdict);
    if aud2.output.overclaim == true { oc2 = true; }
    if aud2.output.fraud == true { fr2 = true; }
}

if v2 == "PASS" && oc2 == false && fr2 == false {
    complete(#{
        status: "PASS_AFTER_PATCH",
        gate: gate,
        bag: fix_bag,
        first_audit: aud.output,
        reaudit: aud2.output,
    });
}

complete(#{
    status: "FAIL",
    gate: gate,
    first_audit: aud.output,
    reaudit: aud2.output,
    note: "Stopped after one repair round. Do not invent a second causal patch. Parent must not open U8R/U9.",
});
