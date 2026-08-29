"use client";

import { useEffect } from "react";
import { useStudio } from "@/lib/store";

/** Writes `data-density` on `<html>`. Comfortable is a toggle, not a hardcoded attribute. */
export function DensityRoot() {
  const density = useStudio((s) => s.density);
  useEffect(() => {
    document.documentElement.dataset.density = density;
  }, [density]);
  return null;
}
