import { OBS_CAPTURE, shaShort } from "./session";
import { SourceBadge } from "./source-badge";

/**
 * UART / host pane. DESIGN.md forbids a composer until a reply path exists.
 * A silent line is honest; diagnose() was a fabricated mouth.
 */
export function BoardChat() {
  const silent = `Capture ${OBS_CAPTURE.run} ${OBS_CAPTURE.rev}. LAST_STAGE=${OBS_CAPTURE.lastStage}. pred=∅. COM12 closed — silent.`;

  return (
    <section data-testid="obs-chat" data-ready="1" className="flex h-full min-h-0 flex-col">
      <header className="border-b border-line px-3 py-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="obs-kicker">03 UART / host</p>
            <h2 className="text-sm font-medium tracking-tight text-fg">Nhật ký host</h2>
            <p className="text-[11px] text-subtle">Không có đường trả lời. Không có ô gửi.</p>
          </div>
          <SourceBadge source={OBS_CAPTURE.comOpen ? "BOARD" : "ALERT"} />
        </div>
      </header>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3 gbx-scroll">
        <article data-testid="obs-chat-board">
          <div className="rounded-md border border-line bg-surface px-3 py-2 text-sm obs-mono leading-5">
            {silent}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-caption text-subtle">
            <span>
              UART / host · <span className="obs-mono">15:56</span>
            </span>
            <SourceBadge source="ALERT" />
          </div>
        </article>
      </div>
      <div className="shrink-0 border-t border-line p-3">
        <p className="text-[13px] text-muted" data-testid="obs-chat-silent">
          pred trống. COM đóng. Không có composer cho đến khi có đường trả lời.
        </p>
        <p className="mt-2 obs-mono text-[11px] text-subtle">
          bit {shaShort(OBS_CAPTURE.bitSha)} · {OBS_CAPTURE.uart} @{OBS_CAPTURE.baud}
        </p>
      </div>
    </section>
  );
}
