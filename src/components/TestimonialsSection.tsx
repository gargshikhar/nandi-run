"use client";

import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
  // Double the testimonials for seamless infinite loop
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="section-padding bg-navy-dark overflow-hidden" data-nav-theme="dark">
      <div className="mx-auto max-w-6xl mb-12">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Testimonials</p>
          <h2 className="mb-3 font-[family-name:var(--font-heading)] font-extrabold text-white" style={{ fontSize: "var(--text-heading)" }}>
            What Runners Say
          </h2>
        </div>
      </div>

      {/* Horizontal scrolling testimonial cards */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-navy-dark to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-navy-dark to-transparent" />

        <div
          className="flex gap-6 animate-marquee"
          style={{
            ["--marquee-duration" as string]: "40s",
            width: "max-content",
          }}
        >
          {items.map((t, i) => (
            <div
              key={i}
              className="card-navy flex w-[350px] shrink-0 flex-col rounded-2xl p-6 md:w-[400px]"
            >
              <Quote size={28} className="mb-4 text-primary/30" strokeWidth={1} />
              <blockquote className="mb-6 flex-1 text-sm text-white/90 leading-relaxed md:text-base">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="border-t border-white/10 pt-4">
                <p className="font-semibold text-primary text-sm">{t.name}</p>
                <p className="text-xs text-white/50">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
