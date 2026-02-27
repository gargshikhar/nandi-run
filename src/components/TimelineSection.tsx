"use client";

import { TIMELINE_EVENTS } from "@/lib/constants";
import { Calendar, CheckCircle2, Circle } from "lucide-react";

export default function TimelineSection() {
  return (
    <section className="section-padding bg-navy-dark" data-nav-theme="dark">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Timeline</p>
          <h2 className="mb-3 font-[family-name:var(--font-heading)] font-extrabold text-white" style={{ fontSize: "var(--text-heading)" }}>
            Your Journey to Race Day
          </h2>
          <p className="mx-auto max-w-xl text-white/60">
            Key milestones from registration to crossing the finish line
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 h-px bg-white/15" />
            <div
              className="absolute left-0 top-6 h-px bg-primary"
              style={{
                width: `${
                  ((TIMELINE_EVENTS.findIndex((e) => e.active) + 1) /
                    TIMELINE_EVENTS.length) *
                  100
                }%`,
              }}
            />

            <div className="grid grid-cols-7 gap-2">
              {TIMELINE_EVENTS.map((event, i) => {
                const isPast = i <= TIMELINE_EVENTS.findIndex((e) => e.active);
                const isCurrent = event.active;

                return (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                        isCurrent
                          ? "border-accent bg-accent text-navy-dark shadow-lg shadow-amber-500/30 scale-110"
                          : isPast
                          ? "border-primary bg-primary text-white"
                          : "border-white/15 bg-white/5 text-white/40"
                      }`}
                    >
                      {isPast && !isCurrent ? (
                        <CheckCircle2 size={20} />
                      ) : isCurrent ? (
                        <Calendar size={20} />
                      ) : (
                        <Circle size={16} />
                      )}
                    </div>
                    <div className="mt-4 text-center">
                      <p
                        className={`text-xs font-bold ${
                          isCurrent
                            ? "text-accent"
                            : isPast
                            ? "text-primary"
                            : "text-white/40"
                        }`}
                      >
                        {event.date}
                      </p>
                      <p
                        className={`mt-1 text-xs leading-tight ${
                          isCurrent
                            ? "font-semibold text-white"
                            : isPast
                            ? "text-white/80"
                            : "text-white/40"
                        }`}
                      >
                        {event.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden">
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-4" style={{ minWidth: "max-content" }}>
              {TIMELINE_EVENTS.map((event, i) => {
                const isPast = i <= TIMELINE_EVENTS.findIndex((e) => e.active);
                const isCurrent = event.active;

                return (
                  <div
                    key={i}
                    className={`flex w-32 shrink-0 flex-col items-center rounded-xl p-4 border ${
                      isCurrent
                        ? "bg-accent/10 border-accent/30"
                        : isPast
                        ? "bg-primary/5 border-primary/10"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <div
                      className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full ${
                        isCurrent
                          ? "bg-accent text-navy-dark"
                          : isPast
                          ? "bg-primary text-white"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      {isPast && !isCurrent ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <Calendar size={14} />
                      )}
                    </div>
                    <p
                      className={`text-xs font-bold ${
                        isCurrent ? "text-accent" : "text-white/50"
                      }`}
                    >
                      {event.date}
                    </p>
                    <p className="mt-1 text-center text-xs text-white/50 leading-tight">
                      {event.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-white/30">
            Scroll to see all milestones →
          </p>
        </div>
      </div>
    </section>
  );
}
