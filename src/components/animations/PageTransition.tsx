"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip the very first mount — prevents the double-flash "reload" on initial page load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9990]"
      style={{
        background: "var(--color-bg)",
        transform: isTransitioning ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: isTransitioning ? "top" : "bottom",
        transition: "transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)",
      }}
    />
  );
}
