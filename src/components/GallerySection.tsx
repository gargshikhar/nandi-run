"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap-init";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ChevronLeft, ChevronRight } from "lucide-react";

/*
 * Fanned-card gallery — inspired by Lando Norris "What's Up On Socials"
 *
 * 7 cards fanned out in an arc. Supports any number of images via
 * pagination — click arrows to collapse → swap → fan-out.
 *
 * Key: card DOM elements persist across page changes (key={i})
 * to avoid React remount flicker. Image sources swap while cards
 * are at opacity 0 during the collapse phase.
 */

/* ── Fan positions (rem from center) ── */
const DESKTOP = [
  { scale: 0.7756, rotation: -21, x: -30, y: 7.3, zIndex: 1 },
  { scale: 0.8498, rotation: -14, x: -22, y: 4, zIndex: 2 },
  { scale: 0.9346, rotation: -7, x: -11, y: 1.3, zIndex: 3 },
  { scale: 1, rotation: 0, x: 0, y: 0, zIndex: 10 },
  { scale: 0.9346, rotation: 7, x: 11, y: 1.3, zIndex: 3 },
  { scale: 0.8498, rotation: 14, x: 22, y: 4, zIndex: 2 },
  { scale: 0.7756, rotation: 21, x: 30, y: 7.3, zIndex: 1 },
];

const MOBILE = [
  { scale: 0.78, rotation: -18, x: -12, y: 5, zIndex: 1 },
  { scale: 0.85, rotation: -12, x: -8.5, y: 3, zIndex: 2 },
  { scale: 0.93, rotation: -6, x: -4.5, y: 1, zIndex: 3 },
  { scale: 1, rotation: 0, x: 0, y: 0, zIndex: 10 },
  { scale: 0.93, rotation: 6, x: 4.5, y: 1, zIndex: 3 },
  { scale: 0.85, rotation: 12, x: 8.5, y: 3, zIndex: 2 },
  { scale: 0.78, rotation: 18, x: 12, y: 5, zIndex: 1 },
];

const DISPLAY_COUNT = 7;

/* ── All gallery images from nandirun.in ── */
const ALL_ITEMS = [
  { src: "/gallery/start1.jpg", alt: "Race start line — Edition 1" },
  { src: "/gallery/start2.jpg", alt: "Runners at the start — Edition 1" },
  { src: "/gallery/stage1.jpg", alt: "Stage 1 — Climbing the hills" },
  { src: "/gallery/stage2.jpg", alt: "Stage 2 — Monsoon roads" },
  { src: "/gallery/stage3.jpg", alt: "Stage 3 — Cloud-wrapped route" },
  { src: "/gallery/stage4.jpg", alt: "Stage 4 — Final stretch" },
  { src: "/gallery/race1.jpg", alt: "Runners on Nandi Hills road" },
  /* ── Page 2 ── */
  { src: "/gallery/race2.jpg", alt: "Running through the mist" },
  { src: "/gallery/race3.jpg", alt: "Early morning race start" },
  { src: "/gallery/race4.jpg", alt: "Monsoon run — green canopy" },
  { src: "/gallery/race5.jpg", alt: "Finishers at the summit" },
  { src: "/gallery/race6.jpg", alt: "Medal ceremony" },
  { src: "/gallery/scenic1.png", alt: "Scenic Nandi Hills route" },
  { src: "/gallery/scenic2.png", alt: "Nandi Hills winding roads" },
];

const totalPages = Math.ceil(ALL_ITEMS.length / DISPLAY_COUNT);

function getRemPx() {
  if (typeof document === "undefined") return 16;
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

/** Get the items for a given page index */
function getPageItems(pageIdx: number) {
  const start = pageIdx * DISPLAY_COUNT;
  const items = ALL_ITEMS.slice(start, start + DISPLAY_COUNT);
  while (items.length < DISPLAY_COUNT) {
    items.push(ALL_ITEMS[items.length % ALL_ITEMS.length]);
  }
  return items;
}

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimated = useRef(false);
  const isAnimating = useRef(false);
  const remPxRef = useRef(16);
  const isMobile = useIsMobile();
  const [page, setPage] = useState(0);
  /* Displayed items — updated AFTER collapse, not during React render */
  const [displayItems, setDisplayItems] = useState(() => getPageItems(0));

  const positions = isMobile ? MOBILE : DESKTOP;
  const posRef = useRef(positions);
  posRef.current = positions;

  const setCardRef = useCallback(
    (el: HTMLDivElement | null, index: number) => {
      cardRefs.current[index] = el;
    },
    [],
  );

  /* ── Cache rem value ── */
  useEffect(() => {
    remPxRef.current = getRemPx();
    const onResize = () => {
      remPxRef.current = getRemPx();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Entrance animation ── */
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0 || !sectionRef.current) return;

    const rem = remPxRef.current;
    const pos = posRef.current;

    /* Initial state: stacked, centred, pushed below */
    gsap.set(cards, {
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 8 * rem,
      rotation: 0,
      scale: 0.8,
      opacity: 0,
    });

    const runAnimation = () => {
      if (hasAnimated.current) return;
      isAnimating.current = true;

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
          hasAnimated.current = true;
          cards.forEach((card, i) => {
            card.style.zIndex = String(pos[i].zIndex);
          });
        },
      });

      /* Step 1 — slide up + fade in */
      tl.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
        stagger: { amount: 0.35, from: "end" },
      });

      /* Step 2 — fan out (chained in same timeline) */
      tl.to(
        cards,
        {
          x: (i: number) => pos[i].x * rem,
          y: (i: number) => pos[i].y * rem,
          rotation: (i: number) => pos[i].rotation,
          scale: (i: number) => pos[i].scale,
          opacity: 1,
          duration: 0.9,
          ease: "back.out(1.4)",
          stagger: { amount: 0.15, from: "center" },
        },
        "-=0.1",
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(cards);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  /* ── Page change: collapse → swap images → fan out ── */
  useEffect(() => {
    if (!hasAnimated.current) return;
    isAnimating.current = true;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const pos = posRef.current;
    const rem = remPxRef.current;

    /* Collapse to center stack */
    gsap.to(cards, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      stagger: { amount: 0.1, from: "edges" },
      onComplete: () => {
        /* Swap images while cards are invisible */
        setDisplayItems(getPageItems(page));

        /* Brief delay for React to render new images */
        requestAnimationFrame(() => {
          /* Fan out with new images */
          gsap.to(cards, {
            x: (i: number) => pos[i].x * rem,
            y: (i: number) => pos[i].y * rem,
            rotation: (i: number) => pos[i].rotation,
            scale: (i: number) => pos[i].scale,
            opacity: 1,
            duration: 0.9,
            ease: "back.out(1.4)",
            stagger: { amount: 0.15, from: "center" },
            onComplete: () => {
              isAnimating.current = false;
              cards.forEach((card, i) => {
                card.style.zIndex = String(pos[i].zIndex);
              });
            },
          });
        });
      },
    });

    return () => {
      gsap.killTweensOf(cards);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  /* ── Hover: smooth lift + spread ── */
  const handleCardEnter = useCallback((hoveredIndex: number) => {
    if (!hasAnimated.current || isAnimating.current) return;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const pos = posRef.current;
    const rem = remPxRef.current;

    cards.forEach((card, i) => {
      const base = pos[i];
      if (i === hoveredIndex) {
        gsap.to(card, {
          y: (base.y - 2.5) * rem,
          scale: base.scale * 1.08,
          zIndex: 20,
          duration: 0.45,
          ease: "back.out(1.7)",
          overwrite: "auto",
        });
      } else {
        const dir = i < hoveredIndex ? -1 : 1;
        const dist = Math.abs(i - hoveredIndex);
        gsap.to(card, {
          x: (base.x + dir * dist * 1.5) * rem,
          rotation: base.rotation + dir * dist * 1.5,
          duration: 0.45,
          ease: "back.out(1.7)",
          overwrite: "auto",
        });
      }
    });
  }, []);

  const handleCardLeave = useCallback(() => {
    if (!hasAnimated.current || isAnimating.current) return;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const pos = posRef.current;
    const rem = remPxRef.current;

    cards.forEach((card, i) => {
      const base = pos[i];
      gsap.to(card, {
        x: base.x * rem,
        y: base.y * rem,
        rotation: base.rotation,
        scale: base.scale,
        zIndex: base.zIndex,
        duration: 0.45,
        ease: "back.out(1.7)",
        overwrite: "auto",
      });
    });
  }, []);

  /* ── Navigation ── */
  const goNext = () => {
    if (isAnimating.current) return;
    setPage((p) => (p + 1) % totalPages);
  };

  const goPrev = () => {
    if (isAnimating.current) return;
    setPage((p) => (p - 1 + totalPages) % totalPages);
  };

  return (
    <section
      ref={sectionRef}
      className="section-navy section-padding overflow-x-clip"
      data-nav-theme="dark"
    >
      {/* ── Heading ── */}
      <div className="mx-auto max-w-7xl text-center mb-10 md:mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
          Gallery
        </p>
        <h2
          className="font-[family-name:var(--font-heading)] font-extrabold text-white leading-tight"
          style={{ fontSize: "var(--text-heading)" }}
        >
          Experience the Run
        </h2>
        <p className="mt-3 text-white/50 max-w-xl mx-auto">
          Moments from the monsoon — scroll through the highlights
        </p>
      </div>

      {/* ── Fanned card area ── */}
      <div
        className="relative mx-auto"
        style={{
          height: isMobile ? "28rem" : "36rem",
          maxWidth: "80rem",
        }}
      >
        {/* Cards: key={i} so DOM persists across page changes (no flicker) */}
        {displayItems.map((item, i) => (
          <div
            key={i}
            ref={(el) => setCardRef(el, i)}
            className="absolute cursor-pointer overflow-hidden shadow-2xl"
            style={{
              width: isMobile ? "14rem" : "20rem",
              height: isMobile ? "24.5rem" : "35rem",
              borderRadius: isMobile ? "2rem" : "3.3rem",
              left: "50%",
              top: "50%",
              willChange: "transform",
              opacity: 0,
            }}
            onMouseEnter={() => handleCardEnter(i)}
            onMouseLeave={handleCardLeave}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="320px"
            />
          </div>
        ))}

        {/* ── Navigation arrows ── */}
        {totalPages > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Previous images"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all hover:bg-white/20 hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goNext}
              aria-label="Next images"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all hover:bg-white/20 hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* ── Dots + View Full Gallery ── */}
      <div className="mt-10 md:mt-16 flex flex-col items-center gap-6">
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!isAnimating.current) setPage(i);
                }}
                aria-label={`Page ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === page
                    ? "w-8 bg-primary"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 border border-primary/30 px-8 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10 hover:border-primary/60"
        >
          View Full Gallery
        </Link>
      </div>
    </section>
  );
}
