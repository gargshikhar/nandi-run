"use client";

import { useState, useEffect } from "react";

export default function LoadingOverlay() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fading out once the page is ready
    const timer = requestAnimationFrame(() => {
      setFading(true);
    });

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 800);

    return () => {
      cancelAnimationFrame(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background: "var(--color-bg)",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.6s ease-out",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <div className="text-center">
        <p className="text-2xl font-[family-name:var(--font-heading)] font-bold text-navy-dark">
          🏔️
        </p>
      </div>
    </div>
  );
}
