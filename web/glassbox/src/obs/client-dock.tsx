"use client";

import { useEffect } from "react";
import { hydrateFromPorts } from "@/adapters/hydrate";
import { GlassBoxInstrument } from "./glass-panels";

export function ClientDock() {
  useEffect(() => {
    void hydrateFromPorts().catch(() => {
      /* UART capture still renders. */
    });
  }, []);

  return (
    <div className="h-full min-h-0 overflow-y-auto px-3 py-3 gbx-scroll">
      <GlassBoxInstrument />
    </div>
  );
}
