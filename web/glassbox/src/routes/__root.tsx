import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { DensityRoot } from "@/components/density-root";
import appCss from "../styles.css?url";

/**
 * Root document.
 *
 * Removed from the imported version: the Better Auth provider, the preview-host
 * bridge, and the PWA manifest links. This is a local instrument with no
 * accounts and no install flow.
 *
 * Toasts are kept, but only for transient operator feedback such as a mode
 * change. A claim about measured state belongs on screen next to its
 * provenance, where it can be read and checked, not in something that fades.
 *
 * `data-density` defaults to compact-scientific (`research`). Comfortable is a
 * toggle that writes the attribute; it is not hardcoded.
 */
const APP_NAME = "Native AI GlassBox";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "theme-color", content: "#070B10" },
      {
        name: "description",
        content:
          "Native AI GlassBox — Dễ hiểu, Studio, Đài quan sát UART trên Arty A7-100T.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="vi" data-density="research" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-bg text-fg antialiased">
        <DensityRoot />
        <Outlet />
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--color-card)",
              border: "1px solid var(--color-line)",
              color: "var(--color-fg)",
            },
          }}
        />
        <Scripts />
      </body>
    </html>
  ),
});
