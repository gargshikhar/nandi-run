"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Lightweight page transition — quick opacity crossfade (200ms)
 * instead of heavy scaleY curtain to avoid "lag" feeling.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip the very first mount — no transition on initial page load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Quick flash overlay: appear → disappear
    setPhase("out");
    const reveal = setTimeout(() => setPhase("in"), 150);
    const done = setTimeout(() => setPhase("idle"), 400);

    return () => {
      clearTimeout(reveal);
      clearTimeout(done);
    };
  }, [pathname]);

  if (phase === "idle") return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9990]"
      style={{
        background: "var(--color-bg)",
        opacity: phase === "out" ? 1 : 0,
        transition: phase === "out"
          ? "opacity 0.12s ease-in"
          : "opacity 0.25s ease-out",
      }}
    />
  );
}
