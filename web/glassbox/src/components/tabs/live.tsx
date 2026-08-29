import { outputSelection, sessionView } from "@/lib/metrics";
import { useStudioHeader } from "@/lib/studio-header";
import { useStudio } from "@/lib/store";
import { When } from "../level";
import { Panel, PanelTitle, Pill } from "../ui";

export function LiveTab() {
  const { chat, teacherOff, level } = useStudio();
  const header = useStudioHeader();
  const recorded = chat.filter((m) => m.id === "m1" || m.id === "m2");
  return (
    <Panel className="flex min-h-[70vh] flex-col">
      <PanelTitle
        hint={
          level === "easy"
            ? "Bản ghi Q → A"
            : level === "rtl"
              ? "out_valid / token_sel"
              : "SNAPSHOT · không phải miệng sống"
        }
      >
        Tương tác đã ghi
      </PanelTitle>
      <When
        easy={
          <p className="mb-3 text-[13px] text-muted">
            Đây là bản ghi Interaction #{header.id}. Không có ô gửi. Đường trả lời sống chưa có,
            nên không vẽ miệng.
          </p>
        }
        research={
          <p className="mb-3 text-caption text-subtle">
            Nguồn {header.activeSource} · Interaction #{header.id} · không có miệng sống.
          </p>
        }
        rtl={
          <p className="mb-3 gb-num text-caption text-subtle">
            {outputSelection.cycle === null
              ? "out_valid: chưa ghi nhận cycle"
              : `out_valid @ cyc ${outputSelection.cycle}`}{" "}
            · token_sel={outputSelection.token ?? "chưa có"} · teacher=
            {teacherOff ? 0 : 1}
          </p>
        }
      />
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1 gbx-scroll">
        {recorded.map((m) => (
          <div key={m.id} className={m.role === "user" ? "ml-8 md:ml-24" : "mr-8 md:mr-24"}>
            <div
              className={
                m.role === "user"
                  ? "rounded-md bg-cyan/15 px-3 py-2 text-sm"
                  : "rounded-md border border-line bg-surface px-3 py-2 text-sm"
              }
            >
              {m.text}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-caption text-subtle">
              <span>
                {m.role === "user" ? "Bạn" : "Bản ghi"} · {m.time}
              </span>
              {level !== "easy" && m.meta ? <span className="gb-num">{m.meta}</span> : null}
              {m.learned === true ? (
                <Pill tone="learn">{level === "easy" ? "Đã học" : level === "rtl" ? "upd_en" : "Đã học"}</Pill>
              ) : null}
              {m.learned === false ? <Pill>{level === "easy" ? "Không cần học thêm" : "margin_ok"}</Pill> : null}
            </div>
          </div>
        ))}
      </div>
      {level !== "easy" ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {sessionView.outputEvents.map((t) => (
            <span key={t.eventId} className="rounded-md border border-line bg-raised px-2 py-0.5 gb-num text-caption">
              {t.selectedText}
            </span>
          ))}
        </div>
      ) : null}
      <p className="mt-3 border-t border-line pt-3 text-caption text-subtle">
        Không có Teacher / Freeze / Replay / xem bên trong trên tab này. Chúng không hoàn thành
        một lượt bo.
      </p>
    </Panel>
  );
}
