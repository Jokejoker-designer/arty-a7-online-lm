"use client";

import { createFileRoute } from "@tanstack/react-router";
import { EasyLanding } from "@/components/landing";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <EasyLanding />;
}
