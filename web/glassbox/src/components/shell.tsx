"use client";

import { useEffect, type ComponentType } from "react";
import {
  Activity,
  BarChart3,
  Binary,
  Cpu,
  FileCheck,
  FlaskConical,
  GitCompare,
  GraduationCap,
  LayoutDashboard,
  Layers,
  Menu,
  MessageSquare,
  Settings,
  SquareStack,
  Type,
  Workflow,
  X,
} from "lucide-react";
import { RAIL_GROUPS, STAGE_LABEL, STAGES, TABS, TAB_SUB, type TabId } from "@/lib/data";
import { useStudioHeader } from "@/lib/studio-header";
import { useStudio } from "@/lib/store";
import { cn } from "@/lib/utils";
import { AppRouteNav, AppSourcePill, AppWordmark } from "./app-chrome";
import { InsightRail } from "./insight";
import { Btn } from "./ui";
import { StudioState } from "./ui/studio-state";
import { OverviewTab } from "./tabs/overview";
import { LiveTab } from "./tabs/live";
import { InputTab } from "./tabs/input";
import { ForwardTab } from "./tabs/forward";
import { CompareTab } from "./tabs/compare";
import { LearningTab } from "./tabs/learning";
import { EamTab } from "./tabs/eam";
import { ModelTab } from "./tabs/model";
import { OutputTab } from "./tabs/output";
import { WaveformTab } from "./tabs/waveform";
import { MetricsTab } from "./tabs/metrics";
import { ExperimentsTab } from "./tabs/experiments";
import { BoardTab } from "./tabs/board";
import { EvidenceTab } from "./tabs/evidence";
import { SettingsTab } from "./tabs/settings";

const ICONS: Record<TabId, typeof LayoutDashboard> = {
  overview: LayoutDashboard,
  live: MessageSquare,
  input: Binary,
  forward: Workflow,
  compare: GitCompare,
  learning: GraduationCap,
  eam: Layers,
  model: SquareStack,
  output: Type,
  waveform: Activity,
  metrics: BarChart3,
  experiments: FlaskConical,
  board: Cpu,
  evidence: FileCheck,
  settings: Settings,
};

const VIEW: Record<TabId, ComponentType> = {
  overview: OverviewTab,
  live: LiveTab,
  input: InputTab,
  forward: ForwardTab,
  compare: CompareTab,
  learning: LearningTab,
  eam: EamTab,
  model: ModelTab,
  output: OutputTab,
  waveform: WaveformTab,
  metrics: MetricsTab,
  experiments: ExperimentsTab,
  board: BoardTab,
  evidence: EvidenceTab,
  settings: SettingsTab,
};

export function StudioShell() {
  const {
    tab,
    setTab,
    level,
    setLevel,
    sidebarOpen,
    setSidebar,
    insightOpen,
    setInsightOpen,
    stageStates,
    teacherOff,
    activeInteractionId,
  } = useStudio();
  const header = useStudioHeader();
  const Page = VIEW[tab];
  const hideRail = tab === "waveform";
  const locked = Boolean(activeInteractionId);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebar(false);
        setInsightOpen(false);
        return;
      }
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT")) return;
      const n = Number(e.key);
      if (n >= 1 && n <= 9) {
        const t = TABS[n - 1];
        if (t) setTab(t.id);
        return;
      }
      if (e.key === "]" || e.key === "[") {
        const i = TABS.findIndex((t) => t.id === tab);
        const next = e.key === "]" ? (i + 1) % TABS.length : (i - 1 + TABS.length) % TABS.length;
        const dest = TABS[next];
        if (dest) setTab(dest.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSidebar, setInsightOpen, setTab, tab]);

  return (
    <div className="flex h-dvh min-h-0 flex-col overflow-hidden bg-bg text-fg">
      <a
        href="#gb-main"
        data-testid="skip-to-main"
        className="gb-sr-only z-50 rounded-md bg-card px-3 py-2"
      >
        Bỏ qua tới nội dung
      </a>
      <header className="flex h-12 shrink-0 items-center gap-3 border-b border-line px-3">
        <button
          type="button"
          className="grid size-9 place-items-center rounded-lg border border-line lg:hidden"
          onClick={() => setSidebar(true)}
          aria-label="Mở menu"
        >
          <Menu className="size-4" />
        </button>
        <AppWordmark />
        <AppRouteNav className="hidden md:flex" />
        <div className="hidden items-center gap-2 lg:flex">
          <span className="gb-num text-xs text-muted">#{header.id}</span>
          {/* §25 and §32.13. The source badge states what is actually feeding
              the screen. It reads BOARD only when a board is answering; a
              replayed or generated session says so, because a pill that always
              says BOARD tells the reader nothing and licenses an overclaim. */}
          <AppSourcePill source={header.activeSource} live={header.live} />
          <span className="text-micro uppercase tracking-wide text-muted">{teacherOff ? "EVAL" : header.mode}</span>
        </div>
        <div className="ml-auto flex items-center gap-2 text-caption">
          <span
            className={cn(
              "hidden items-center gap-1.5 sm:flex",
              header.live ? "text-ok" : "text-warn",
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                header.live ? "bg-ok gbx-dot-live" : "bg-warn",
              )}
            />
            {header.sourceNote}
          </span>
          <span className="hidden gb-num text-muted xl:inline">{header.clock}</span>
          {hideRail ? null : (
            <Btn
              data-testid="open-insight"
              className="gb-insight-open h-8 text-xs"
              aria-expanded={insightOpen}
              onClick={() => setInsightOpen(true)}
            >
              Mở insight
            </Btn>
          )}
          <div
            className="flex rounded-lg border border-line p-0.5"
            role="group"
            aria-label="Chế độ trình bày"
          >
            {(["easy", "research", "rtl"] as const).map((lv) => (
              <button
                key={lv}
                type="button"
                onClick={() => setLevel(lv)}
                className={cn(
                  "rounded-md px-2 py-1 text-caption",
                  level === lv
                    ? lv === "easy"
                      ? "bg-ok/15 text-ok"
                      : lv === "rtl"
                        ? "bg-warn/15 text-warn"
                        : "bg-cyan/15 text-cyan"
                    : "text-muted hover:text-fg",
                )}
              >
                {lv === "easy" ? "Dễ hiểu" : lv === "research" ? "Research" : "RTL"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <nav
        aria-label="Tiến trình xử lý của một tương tác"
        className="flex h-10 shrink-0 items-center gap-1 overflow-x-auto border-b border-line px-3 gbx-scroll"
      >
        {STAGES.map((s, i) => {
          const st = stageStates[s.id];
          const current = tab === s.tab;
          return (
            <div key={s.id} className="flex items-center gap-1">
              {i > 0 ? <span className="text-subtle">→</span> : null}
              <button
                type="button"
                onClick={() => setTab(s.tab)}
                data-testid={`tab-${s.tab}`}
                aria-label={TABS.find((t) => t.id === s.tab)?.label ?? s.label}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "rounded-md px-2 text-caption",
                  level !== "easy" && "font-mono",
                  st === "active" && "gbx-active bg-cyan/15 text-cyan",
                  st === "complete" && !current && "text-ok",
                  st === "waiting" && "text-subtle",
                  current && st !== "active" && "bg-raised font-semibold text-fg",
                )}
                style={{ minHeight: "var(--gb-row-height)" }}
              >
                {STAGE_LABEL[level][s.id]}
              </button>
            </div>
          );
        })}
        <span className="ml-auto hidden text-caption text-subtle md:inline">
          Đang replay Interaction #{header.id} · snapshot {header.time}
        </span>
      </nav>

      <div className="flex min-h-0 flex-1">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-56 overflow-y-auto border-r border-line bg-surface p-2 transition-transform duration-200 lg:static lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          )}
        >
          <div className="mb-2 flex items-center justify-between px-2 lg:hidden">
            <span className="text-sm">Menu</span>
            <Btn className="size-8 p-0" onClick={() => setSidebar(false)} aria-label="Đóng">
              <X className="size-4" />
            </Btn>
          </div>
          <div className="mb-3 px-1 lg:hidden">
            <AppRouteNav />
          </div>
          <nav className="space-y-3" aria-label="Studio">
            {RAIL_GROUPS.map((group) => (
              <div key={group.id}>
                <p className="px-2.5 pb-1 text-micro font-medium uppercase tracking-[0.12em] text-subtle">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.tabs.map((id) => {
                    const t = TABS.find((row) => row.id === id);
                    if (!t) return null;
                    const Icon = ICONS[t.id];
                    const active = tab === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTab(t.id)}
                        aria-label={t.label}
                        data-testid={`tab-${t.id}`}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex w-full items-center gap-2 border-l-2 px-2.5 text-left",
                          active
                            ? "border-cyan font-semibold text-fg"
                            : "border-transparent font-normal text-muted hover:bg-raised hover:text-fg",
                        )}
                        style={{ minHeight: "var(--gb-row-height)", fontSize: "var(--gb-text-size-value)" }}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="min-w-0">
                          <span className="block truncate">{t.label}</span>
                          <span className="block truncate text-micro font-normal text-subtle">
                            {TAB_SUB[level][t.id]}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>
        {sidebarOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            aria-label="Đóng menu"
            onClick={() => setSidebar(false)}
          />
        ) : null}
        <div className="gb-studio-body flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <main id="gb-main" tabIndex={-1} className="min-h-0 min-w-0 flex-1 overflow-y-auto p-3 gbx-scroll md:p-4">
            {!header.live && locked ? (
              <div className="mb-3">
                <StudioState
                  kind="disconnected"
                  primary={{ label: "Mở session", onClick: () => setTab("experiments") }}
                  secondary={{ label: "Dùng Twin", onClick: () => setTab("evidence") }}
                />
              </div>
            ) : null}
            {!locked ? (
              <StudioState
                kind="no-interaction"
                primary={{ label: "Mở session", onClick: () => setTab("experiments") }}
              />
            ) : (
              <div key={level}>
                <Page />
              </div>
            )}
          </main>
          {hideRail ? null : <InsightRail />}
        </div>
      </div>
    </div>
  );
}
