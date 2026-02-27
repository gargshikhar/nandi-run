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

function getElevationPath(raceId: string, width: number, height: number, padding: number) {
  const drawWidth = width - padding * 2;
  const drawHeight = height - padding * 2;
  const baseY = height - padding;
  // Heights proportional to actual elevation: HM peaks at 530m (1.0), 10K peaks at 191m (0.36)
  const profiles: Record<string, number[]> = {
    "half-marathon": [0.05, 0.12, 0.25, 0.45, 0.65, 0.85, 1.0, 0.95, 0.78, 0.6, 0.45, 0.3, 0.18, 0.08, 0.05],
    "10k-run": [0.02, 0.04, 0.08, 0.14, 0.22, 0.32, 0.36, 0.33, 0.24, 0.15, 0.07, 0.02],
  };
  const points = profiles[raceId] || profiles["10k-run"];
  const segmentWidth = drawWidth / (points.length - 1);
  const coords = points.map((p, i) => ({ x: padding + i * segmentWidth, y: baseY - p * drawHeight }));
  let linePath = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1];
    const curr = coords[i];
    linePath += ` C ${prev.x + segmentWidth * 0.4} ${prev.y}, ${curr.x - segmentWidth * 0.4} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${baseY} L ${coords[0].x} ${baseY} Z`;
  const peakIdx = points.indexOf(Math.max(...points));
  return { linePath, areaPath, peakCoord: coords[peakIdx] };
}

function ElevationProfileSVG({ raceId, ascent, distance }: { raceId: string; ascent: number; distance: string }) {
  const width = 700, height = 220, padding = 30;
  const gradientId = `elev-ri-${raceId}`;
  const { linePath, areaPath, peakCoord } = getElevationPath(raceId, width, height, padding);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet" aria-label={`Elevation profile for ${distance} with ${ascent}m ascent`}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3AD77E" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#ADF684" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ADF684" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((frac) => (
        <line key={frac} x1={padding} y1={height - padding - frac * (height - padding * 2)} x2={width - padding} y2={height - padding - frac * (height - padding * 2)} stroke="white" strokeOpacity="0.06" strokeDasharray="6 6" />
      ))}
      <path d={areaPath} fill={`url(#${gradientId})`} />
      <path d={linePath} fill="none" stroke="#3AD77E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={peakCoord.x} cy={peakCoord.y} r="5" fill="#3AD77E" />
      <text x={peakCoord.x} y={peakCoord.y - 14} fill="white" fontSize="13" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">{ascent}m peak</text>
      <text x={padding} y={height - 6} fill="white" fillOpacity="0.4" fontSize="11" fontFamily="sans-serif">Start</text>
      <text x={width - padding} y={height - 6} fill="white" fillOpacity="0.4" fontSize="11" fontFamily="sans-serif" textAnchor="end">Finish ({distance})</text>
    </svg>
  );
}

export default function RaceInfoPage() {
  return (
    <div className="pt-20">
      {/* Hero Banner — compact */}
      <section className="relative bg-bg-section-alt py-10 md:py-14 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">The Challenge</p>
          <h1 className="mb-2 font-[family-name:var(--font-heading)] text-2xl font-extrabold text-text md:text-3xl">
            Race Information
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-text-muted md:text-base">
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
            <div className="mb-8 overflow-hidden rounded-xl border border-border bg-navy-dark p-6 md:p-8">
              <h3 className="mb-4 text-lg font-bold text-white">
                Elevation Profile
              </h3>
              <ElevationProfileSVG
                raceId={race.id}
                ascent={race.elevation.ascent}
                distance={race.distance}
              />
              <div className="mt-4 flex justify-between text-sm text-white/50">
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

      {/* Race Rules — prominent section */}
      <section className="section-navy section-padding">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-semibold">
              Important
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white md:text-3xl">
              Race Rules & Regulations
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: "🏷️", rule: "Carry your BIB number visibly on the front of your shirt throughout the race. BIBs are non-transferable." },
              { icon: "🚫", rule: "Follow the designated route at all times. Cutting the course will result in disqualification." },
              { icon: "🩺", rule: "Medical staff reserves the right to pull any runner from the race if they believe the runner's health is at risk." },
              { icon: "🎧", rule: "Headphones/earphones are discouraged for safety reasons on the hilly course." },
              { icon: "⚖️", rule: "The decisions of the Race Director and organizers are final and binding." },
              { icon: "♻️", rule: "Littering on the course is strictly prohibited. Please use the designated waste stations." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 border border-white/10 bg-white/5 p-5 rounded-xl">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <p className="text-sm text-white/80 leading-relaxed">{item.rule}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/race-rules"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light transition-colors"
            >
              View Complete Race Rules
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
