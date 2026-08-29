import type { ReactNode } from "react";
import { STAGE_LABEL, type ViewLevel } from "@/lib/data";
import { useStudio } from "@/lib/store";
import { cn } from "@/lib/utils";

const MODE: Record<
  ViewLevel,
  { title: string; body: string; tone: string; border: string }
> = {
  easy: {
    title: "Dễ hiểu",
    body: "Cùng một tương tác đã khóa — đang kể bằng lời. Số kỹ thuật đã ẩn.",
    tone: "text-ok",
    border: "border-ok/35 bg-ok/10",
  },
  research: {
    title: "Research",
    body: "Cùng interaction #1842. Hiện d_pos, rank, AUC, cosine. Nguồn gắn trên từng số.",
    tone: "text-cyan",
    border: "border-cyan/35 bg-cyan/10",
  },
  rtl: {
    title: "RTL",
    body: "Cùng bitstream 7CEBA85. Tín hiệu, cycle, địa chỉ, bit-width — không đổi evidence.",
    tone: "text-warn",
    border: "border-warn/35 bg-warn/10",
  },
};

export function When({
  easy,
  research,
  rtl,
}: {
  easy?: ReactNode;
  research?: ReactNode;
  rtl?: ReactNode;
}) {
  const { level } = useStudio();
  if (level === "easy") return <>{easy}</>;
  if (level === "rtl") return <>{rtl ?? research}</>;
  return <>{research ?? easy}</>;
}

/** Settings may echo the level as text. Not a third toggle. */
export function ModeEcho() {
  const { level } = useStudio();
  const m = MODE[level];
  return (
    <p className={cn("text-[13px] leading-relaxed text-muted")}>
      <span className={cn("font-medium", m.tone)}>{m.title}</span>
      {" — "}
      {m.body}
    </p>
  );
}

export function stageName(id: keyof typeof STAGE_LABEL.easy, level: ViewLevel) {
  return STAGE_LABEL[level][id];
}
