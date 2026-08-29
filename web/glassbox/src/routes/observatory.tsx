"use client";

import { createFileRoute } from "@tanstack/react-router";
import { Observatory } from "@/obs/observatory";

export const Route = createFileRoute("/observatory")({ component: ObservatoryPage });

function ObservatoryPage() {
  return <Observatory />;
}
