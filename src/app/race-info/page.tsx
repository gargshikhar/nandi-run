import { Metadata } from "next";
import Link from "next/link";
import { RACES, SITE } from "@/lib/constants";
import {
  TrendingUp,
  Clock,
  Users,
  ArrowRight,
  Flag,
  Route,
  Timer,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Race Info | Nandi Hills Monsoon Run",
  description:
    "Half Marathon (21.1K) and 10K Run details — routes, elevation profiles, cutoff times, and rules for the Nandi Hills Monsoon Run 2025.",
};

export default function RaceInfoPage() {
  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="relative bg-bg-section-alt py-16 md:py-24 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">The Challenge</p>
          <h1 className="mb-4 font-[family-name:var(--font-heading)] text-4xl font-extrabold text-text md:text-5xl">
            Race Information
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            Everything you need to know about the Half Marathon and 10K Run at
            Nandi Hills
          </p>
        </div>
      </section>

      {/* Race Details */}
      {RACES.map((race) => (
        <section
          key={race.id}
          id={race.id}
          className="section-padding border-b border-border last:border-0 bg-bg"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex items-center gap-4">
              <span className="font-[family-name:var(--font-heading)] text-5xl font-extrabold text-primary md:text-6xl">
                {race.distance}
              </span>
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text md:text-3xl">
                  {race.name}
                </h2>
                <p className="text-sm text-text-muted">{race.priceLabel}</p>
              </div>
            </div>

            <p className="mb-8 max-w-3xl text-base text-text-muted leading-relaxed">
              {race.description}
            </p>

            {/* Key Info Grid */}
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-xl bg-bg-elevated border border-border p-4">
                <Flag size={20} className="mb-2 text-primary" />
                <p className="text-xs text-text-muted">Start Time</p>
                <p className="font-bold text-text">{race.startTime}</p>
              </div>
              <div className="rounded-xl bg-bg-elevated border border-border p-4">
                <Timer size={20} className="mb-2 text-primary" />
                <p className="text-xs text-text-muted">Cutoff</p>
                <p className="font-bold text-text">{race.cutoff}</p>
              </div>
              <div className="rounded-xl bg-bg-elevated border border-border p-4">
                <TrendingUp size={20} className="mb-2 text-primary" />
                <p className="text-xs text-text-muted">Elevation</p>
                <p className="font-bold text-text">
                  ↑{race.elevation.ascent}m ↓{race.elevation.descent}m
                </p>
              </div>
              <div className="rounded-xl bg-bg-elevated border border-border p-4">
                <Users size={20} className="mb-2 text-primary" />
                <p className="text-xs text-text-muted">Min Age</p>
                <p className="font-bold text-text">{race.minAge}+ years</p>
              </div>
            </div>

            {/* Elevation Profile */}
            <div className="mb-8 overflow-hidden rounded-2xl border border-border bg-bg-section-alt p-8">
              <h3 className="mb-4 text-lg font-bold text-text">
                Elevation Profile
              </h3>
              <div className="relative h-32 md:h-48">
                <svg
                  viewBox="0 0 800 200"
                  className="h-full w-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id={`grad-${race.id}`}
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="rgba(245,158,11,0.4)" />
                      <stop offset="100%" stopColor="rgba(245,158,11,0.05)" />
                    </linearGradient>
                  </defs>
                  <path
                    d={
                      race.id === "half-marathon"
                        ? "M0,180 Q80,170 120,140 Q180,80 240,50 Q300,25 360,35 Q420,50 480,30 Q540,15 600,20 Q680,25 720,10 Q760,5 800,8 L800,200 L0,200 Z"
                        : "M0,180 Q100,170 160,145 Q240,100 320,80 Q400,65 480,70 Q560,75 640,60 Q720,50 800,45 L800,200 L0,200 Z"
                    }
                    fill={`url(#grad-${race.id})`}
                  />
                  <path
                    d={
                      race.id === "half-marathon"
                        ? "M0,180 Q80,170 120,140 Q180,80 240,50 Q300,25 360,35 Q420,50 480,30 Q540,15 600,20 Q680,25 720,10 Q760,5 800,8"
                        : "M0,180 Q100,170 160,145 Q240,100 320,80 Q400,65 480,70 Q560,75 640,60 Q720,50 800,45"
                    }
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                  />
                </svg>
                <div className="absolute left-2 bottom-2 text-xs text-white/40">
                  Start
                </div>
                <div className="absolute right-2 bottom-2 text-xs text-white/40">
                  Finish
                </div>
              </div>
              <div className="mt-4 flex justify-between text-sm text-text-muted">
                <span>Total Ascent: {race.elevation.ascent}m</span>
                <span>Total Descent: {race.elevation.descent}m</span>
              </div>
            </div>

            {/* Route Details */}
            <div className="mb-4 rounded-xl bg-bg-elevated border border-border p-6">
              <div className="flex items-start gap-3">
                <Route size={20} className="mt-0.5 text-primary" />
                <div>
                  <h4 className="font-bold text-text">Course Details</h4>
                  <ul className="mt-2 space-y-1 text-sm text-text-muted">
                    <li>The entire race course is on the road — no trails or stairs</li>
                    <li>Start & Finish: {SITE.venue}, enroute Nandi Hills</li>
                    <li>Detailed route available on Garmin Connect</li>
                    <li>Reporting time: {race.reportingTime}</li>
                    <li>Medical assistance available throughout the course</li>
                    <li>Volunteers available until cutoff time</li>
                  </ul>
                </div>
              </div>
            </div>

            <Link
              href={SITE.registerUrl}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-bold text-gray-900 transition-all hover:bg-accent-dark"
            >
              Register for {race.name}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      ))}

      {/* Race Rules */}
      <section className="section-padding bg-bg-section-alt">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
            Race Rules & Regulations
          </h2>
          <div className="space-y-4 text-sm text-text-muted leading-relaxed">
            <p>All participants must carry their BIB number visibly throughout the race. BIBs are non-transferable.</p>
            <p>Participants must follow the designated route. Cutting the course will result in disqualification.</p>
            <p>Medical staff reserves the right to pull any runner from the race if they believe the runner&apos;s health is at risk.</p>
            <p>Headphones/earphones are discouraged for safety reasons on the hilly course.</p>
            <p>The decisions of the Race Director and organizers are final and binding.</p>
            <p>Littering on the course is strictly prohibited. Please use the designated waste stations.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
