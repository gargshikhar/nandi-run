"use client";

import { SITE } from "@/lib/constants";
import Link from "next/link";
import {
  Clock,
  Bus,
  Flag,
  Trophy,
  MapPin,
  ArrowRight,
} from "lucide-react";

const schedule = [
  {
    time: "3:45 AM",
    title: "Shuttle Departure",
    description: "From 3 Bengaluru pickup points",
    icon: Bus,
  },
  {
    time: "5:30 AM",
    title: "Reporting Time",
    description: `Check-in at ${SITE.venue}`,
    icon: MapPin,
  },
  {
    time: "6:30 AM",
    title: "Half Marathon Flag-off",
    description: "21.1K race begins",
    icon: Flag,
    highlight: true,
  },
  {
    time: "7:00 AM",
    title: "10K Run Flag-off",
    description: "10K race begins",
    icon: Flag,
    highlight: true,
  },
  {
    time: "10:00 AM",
    title: "Awards Ceremony",
    description: "Prize distribution begins",
    icon: Trophy,
  },
  {
    time: "11:00 AM",
    title: "Return Shuttles",
    description: "Shuttles back to Bengaluru",
    icon: Bus,
  },
];

export default function RaceDayTimeline() {
  return (
    <section className="section-padding bg-navy-dark" data-nav-theme="dark">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
            Race Day
          </p>
          <h2
            className="mb-3 font-[family-name:var(--font-heading)] font-extrabold text-white"
            style={{ fontSize: "var(--text-heading)" }}
          >
            {SITE.date} — Schedule
          </h2>
          <p className="mx-auto max-w-xl text-white/50">
            From shuttle departure to awards — your complete race day itinerary
          </p>
        </div>

        {/* Desktop vertical timeline */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />

            <div className="space-y-6">
              {schedule.map((item, i) => (
                <div key={i} className="relative flex gap-6">
                  <div
                    className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${
                      item.highlight
                        ? "bg-primary text-navy-dark"
                        : "bg-white/5 border border-white/10 text-primary"
                    }`}
                  >
                    <item.icon size={22} />
                  </div>

                  <div className="flex-1 pt-2">
                    <p
                      className={`font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-wider ${
                        item.highlight ? "text-primary" : "text-white/40"
                      }`}
                    >
                      {item.time}
                    </p>
                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/50">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="md:hidden space-y-4">
          {schedule.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 rounded-xl p-4 border ${
                item.highlight
                  ? "bg-primary/10 border-primary/20"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                  item.highlight
                    ? "bg-primary text-navy-dark"
                    : "bg-white/5 text-primary"
                }`}
              >
                <item.icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white/40 uppercase tracking-wider">
                  {item.time}
                </p>
                <p className="font-bold text-white text-sm">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light transition-colors"
          >
            View Full Schedule & Reminders
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
