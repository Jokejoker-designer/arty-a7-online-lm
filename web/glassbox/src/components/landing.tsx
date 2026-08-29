"use client";

import { Link } from "@tanstack/react-router";
import { PHASE_ORDER, TRACEABILITY_QUESTIONS } from "@/lib/contract";
import {
  INTERACTION,
  INTERACTION_RECORD,
  STAGE_LABEL,
  TRACE_Q_LABEL,
  type StageId,
} from "@/lib/data";
import { AppRouteNav, AppSourcePill, AppWordmark } from "./app-chrome";
import { Pill } from "./ui";

const PHASE_TO_STAGE: Record<(typeof PHASE_ORDER)[number], StageId> = {
  INPUT: "input",
  ENCODE: "encode",
  COMPARE: "compare",
  LEARN: "learn",
  MEMORY: "memory",
  MODEL: "model",
  OUTPUT: "output",
};

const JOBS = [
  {
    id: "create",
    title: "Tạo",
    kicker: "Build · Session · Source",
    body: "GlassBox không phải máy dựng mô hình. Nó mở một Build (bitstream đã ghi), một Session (lần chạy đã khóa), và một Source (BOARD / XSIM / TWIN / SYNTHETIC).",
    fact: `Session S-${INTERACTION.interactionId} · nguồn ${INTERACTION.activeSource}. Không có cổng ghi.`,
  },
  {
    id: "train",
    title: "Học",
    kicker: "LearningEvent đã ghi",
    body: "Học nghĩa là xem sự kiện học đã ghi trên tương tác này. Teacher, Frozen, Replay, Capture sống trên máy này — chúng không được đeo nhãn BOARD.",
    fact: INTERACTION_RECORD.learning[0]
      ? `Sự kiện ${INTERACTION_RECORD.learning[0].eventId}: teacher bật, ${INTERACTION_RECORD.learning[0].writes.length} chỗ ghi. Nguồn SYNTHETIC.`
      : "Tương tác này không có LearningEvent.",
  },
  {
    id: "answer",
    title: "Trả lời",
    kicker: "Q → A đã ghi",
    body: "Câu trả lời là bản ghi. Ô soạn thảo không sinh miệng sống: gửi câu mới chỉ ghi câu hỏi, không bịa token từ bo.",
    fact: `«${INTERACTION.user}» → «${INTERACTION.answer ?? "chưa có câu trả lời từ bo."}»`,
  },
  {
    id: "construct",
    title: "Dựng",
    kicker: "PHASE_ORDER · 8 câu truy vết",
    body: "Dựng một tương tác là đi hết bảy chặng rồi trả lời đủ tám câu. Câu thiếu phải nói thiếu — không suy cho đủ chuyện.",
    fact: null,
  },
  {
    id: "mechanism",
    title: "Cơ chế bên trong",
    kicker: "so sánh · cập nhật · chọn token",
    body: "Bên trong là ba việc máy: so sánh, cập nhật, chọn token. Vector ẩn, thời lượng lớp, heatmap không phải «suy nghĩ».",
    fact: "Không gắn nghĩa người cho vector ẩn hay thời lượng lớp.",
  },
] as const;

export function EasyLanding() {
  const audit = INTERACTION_RECORD.traceability;
  const answered = new Set(audit.answered);

  return (
    <div className="flex h-dvh min-h-0 flex-col overflow-hidden bg-bg text-fg" data-testid="easy-landing">
      <header className="flex h-12 shrink-0 items-center gap-3 border-b border-line px-3">
        <AppWordmark />
        <AppRouteNav />
        <div className="ml-auto flex items-center gap-2">
          <AppSourcePill source={INTERACTION.activeSource} live={INTERACTION.live} />
          <span className="hidden text-caption text-muted sm:inline">{INTERACTION.sourceNote}</span>
        </div>
      </header>

      <main id="gb-main" tabIndex={-1} className="min-h-0 flex-1 overflow-y-auto gbx-scroll">
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 md:px-6">
          <div>
            <p className="text-micro font-medium uppercase tracking-[0.14em] text-subtle">
              Một tương tác đã khóa
            </p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight">
              Năm việc GlassBox thật sự làm
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              Tương tác #{INTERACTION.interactionId} trên Arty A7-100T. Màn này dạy. Studio đo.
              Đài quan sát xem UART stall. Ba lối đi, không gộp.
            </p>
          </div>

          <ol className="space-y-3">
            {JOBS.map((job, i) => (
              <li
                key={job.id}
                data-testid={`job-${job.id}`}
                className="rounded-xl border border-line bg-card px-4 py-3"
              >
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="gb-num text-caption text-cyan">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="text-sm font-semibold">{job.title}</h2>
                  <span className="text-caption text-subtle">{job.kicker}</span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{job.body}</p>
                {job.id === "construct" ? (
                  <div className="mt-3 space-y-3">
                    <ol className="flex flex-wrap items-center gap-1.5" aria-label="Bảy chặng PHASE_ORDER">
                      {PHASE_ORDER.map((phase, idx) => (
                        <li key={phase} className="flex items-center gap-1.5">
                          {idx > 0 ? <span className="text-subtle">→</span> : null}
                          <span className="rounded-md border border-line bg-surface px-2 py-1 text-caption">
                            {STAGE_LABEL.easy[PHASE_TO_STAGE[phase]]}
                          </span>
                        </li>
                      ))}
                    </ol>
                    <ul className="space-y-1.5">
                      {TRACEABILITY_QUESTIONS.map((q) => {
                        const ok = answered.has(q);
                        return (
                          <li key={q} className="flex items-start gap-2 text-[13px]">
                            <Pill tone={ok ? "ok" : "warn"}>{ok ? "Có" : "Thiếu"}</Pill>
                            <span className={ok ? "text-fg" : "text-muted"}>{TRACE_Q_LABEL[q]}</span>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="text-caption text-subtle">
                      {audit.verdict === "FULLY_TRACEABLE"
                        ? "Tám câu đều có câu trả lời trên bản ghi này — vẫn là SYNTHETIC, không phải silicon."
                        : `Thiếu ${audit.missing.length} câu. Không suy cho đủ.`}
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 text-[13px] text-fg">{job.fact}</p>
                )}
              </li>
            ))}
          </ol>

          <div className="flex flex-wrap gap-2 pb-4">
            <Link
              to="/studio"
              className="inline-flex h-9 items-center rounded-lg bg-cyan px-3 text-sm font-medium text-bg"
            >
              Mở Studio
            </Link>
            <Link
              to="/observatory"
              className="inline-flex h-9 items-center rounded-lg border border-line bg-raised px-3 text-sm font-medium text-fg"
            >
              Mở Đài quan sát
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
