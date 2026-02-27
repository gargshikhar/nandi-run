"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (isMobile || reduced) return;

    // Inject cursor:none style for desktop
    const style = document.createElement("style");
    style.textContent = `@media (min-width: 768px) { * { cursor: none !important; } }`;
    document.head.appendChild(style);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onEnterInteractive = () => {
      ring.style.width = "48px";
      ring.style.height = "48px";
      ring.style.borderColor = "var(--color-primary)";
      ring.style.opacity = "0.8";
      dot.style.transform = "translate(-50%, -50%) scale(0.5)";
    };
    const onLeaveInteractive = () => {
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.borderColor = "rgba(255,255,255,0.3)";
      ring.style.opacity = "0.5";
      dot.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const addInteractiveListeners = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select, label").forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };

    let rafId: number;
    const raf = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;

      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;

      rafId = requestAnimationFrame(raf);
    };

    window.addEventListener("mousemove", onMove);
    addInteractiveListeners();
    rafId = requestAnimationFrame(raf);

    const observer = new MutationObserver(() => {
      addInteractiveListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      style.remove();
    };
  }, [isMobile, reduced]);

  if (isMobile || reduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "var(--color-primary)",
          transform: "translate(-50%, -50%) scale(1)",
          transition: "transform 0.15s ease",
          top: "-100px",
          left: "-100px",
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] hidden md:block"
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.3)",
          transform: "translate(-50%, -50%)",
          opacity: 0.5,
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.3s ease",
          top: "-100px",
          left: "-100px",
        }}
      />
    </>
  );
}
