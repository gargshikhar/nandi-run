"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

type Animation = "fade-up" | "fade-left" | "fade-right" | "scale-in" | "stagger-up";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  triggerStart?: string;
}

const animationConfigs: Record<Animation, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
  "fade-up": {
    from: { y: 60, opacity: 0 },
    to: { y: 0, opacity: 1 },
  },
  "fade-left": {
    from: { x: -80, opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  "fade-right": {
    from: { x: 80, opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  "scale-in": {
    from: { scale: 0.85, opacity: 0 },
    to: { scale: 1, opacity: 1 },
  },
  "stagger-up": {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1 },
  },
};

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  className = "",
  triggerStart = "top 85%",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const config = animationConfigs[animation];
    const targets = animation === "stagger-up" ? el.children : el;

    gsap.fromTo(targets, config.from, {
      ...config.to,
      duration,
      delay,
      stagger: animation === "stagger-up" ? stagger : 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: triggerStart,
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === el)
        .forEach((t) => t.kill());
    };
  }, [animation, delay, duration, stagger, triggerStart]);

  return (
    <div
      ref={ref}
      className={className}
      /* Start invisible in SSR to prevent visible→invisible→animate flash */
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  );
}
