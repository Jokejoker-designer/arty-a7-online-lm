"use client";

import { Link, useRouterState } from "@tanstack/react-router";
import { Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pill } from "./ui";

const APP_ROUTES = [
  { to: "/", label: "Dễ hiểu" },
  { to: "/studio", label: "Studio" },
  { to: "/observatory", label: "Đài quan sát" },
] as const;

export function AppWordmark({ kicker }: { kicker?: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className="grid size-7 place-items-center rounded-md border border-cyan/40 bg-cyan/10">
        <Cpu className="size-3.5 text-cyan" />
      </span>
      <div className="min-w-0 leading-tight">
        {kicker ? <p className="text-micro font-medium uppercase tracking-[0.14em] text-subtle">{kicker}</p> : null}
        <div className="gb-wordmark truncate">Native AI GlassBox</div>
      </div>
    </div>
  );
}

export function AppRouteNav({ className }: { className?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav aria-label="Ứng dụng" className={cn("flex items-center gap-0.5", className)}>
      {APP_ROUTES.map((route) => {
        const active = pathname === route.to;
        return (
          <Link
            key={route.to}
            to={route.to}
            aria-current={active ? "page" : undefined}
            className={cn(
              "gb-route rounded-lg px-2.5 py-1",
              active ? "font-semibold text-fg" : "font-normal text-muted",
            )}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppSourcePill({
  source,
  live,
}: {
  source: string;
  live?: boolean;
}) {
  return <Pill tone={live ? "board" : "warn"}>{source}</Pill>;
}
