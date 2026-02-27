"use client";

import { useRef, useEffect, useMemo } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

interface SplitTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  charClassName?: string;
  triggerStart?: string;
  delay?: number;
  stagger?: number;
  playOnMount?: boolean;
}

export default function SplitText({
  children,
  as: Tag = "h1",
  className = "",
  charClassName = "",
  triggerStart = "top 80%",
  delay = 0,
  stagger = 0.02,
  playOnMount = false,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Pre-compute word/char data with global indices for CSS stagger
  const wordData = useMemo(() => {
    const words = children.split(" ");
    let globalIndex = 0;
    return words.map((word) => {
      const chars = word.split("").map((char) => ({
        char,
        globalIndex: globalIndex++,
      }));
      return { word, chars };
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // For playOnMount — CSS handles the animation (no GSAP needed)
    if (playOnMount) return;

    // Scroll-triggered animation — GSAP + ScrollTrigger
    const chars = el.querySelectorAll<HTMLSpanElement>(".split-char");

    gsap.fromTo(
      chars,
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: triggerStart,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === el)
        .forEach((t) => t.kill());
    };
  }, [children, triggerStart, delay, stagger, playOnMount]);

  return (
    // @ts-expect-error — dynamic tag
    <Tag ref={containerRef} className={className}>
      {wordData.map((wd, wi) => (
        <span key={wi} className="inline-block mr-[0.25em] last:mr-0">
          <span
            className="inline-block overflow-hidden"
            style={{
              clipPath: "polygon(0 -5%, 0 105%, 100% 105%, 100% -5%)",
            }}
          >
            {wd.chars.map((c, ci) => (
              <span
                key={ci}
                className={`split-char inline-block ${charClassName} ${
                  playOnMount ? "split-char-mount" : ""
                }`}
                style={
                  playOnMount
                    ? ({
                        willChange: "transform, opacity",
                        "--char-i": c.globalIndex,
                        "--line-delay": `${delay}s`,
                      } as React.CSSProperties)
                    : { willChange: "transform, opacity" }
                }
              >
                {c.char}
              </span>
            ))}
          </span>
        </span>
      ))}
    </Tag>
  );
}
