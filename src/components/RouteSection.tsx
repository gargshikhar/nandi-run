"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RACES } from "@/lib/constants";
import { MapPin, TrendingUp, ArrowRight, Mountain } from "lucide-react";

const raceImages: Record<string, string> = {
  "half-marathon": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
  "10k-run": "https://images.unsplash.com/photo-1486739985386-d4fae04ca6f7?w=1200&q=80",
};

function getElevationPath(
  raceId: string,
  width: number,
  height: number,
  padding: number
): { linePath: string; areaPath: string; peakCoord: { x: number; y: number } } {
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

  const coords = points.map((p, i) => ({
    x: padding + i * segmentWidth,
    y: baseY - p * drawHeight,
  }));

  let linePath = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1];
    const curr = coords[i];
    const cpx1 = prev.x + segmentWidth * 0.4;
    const cpx2 = curr.x - segmentWidth * 0.4;
    linePath += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${baseY} L ${coords[0].x} ${baseY} Z`;

  const peakIdx = points.indexOf(Math.max(...points));
  const peakCoord = coords[peakIdx];

  return { linePath, areaPath, peakCoord };
}

function LargeElevationSVG({ raceId, ascent, distance }: { raceId: string; ascent: number; distance: string }) {
  const width = 700;
  const height = 250;
  const padding = 30;
  const gradientId = `elev-lg-${raceId}`;
  const { linePath, areaPath, peakCoord } = getElevationPath(raceId, width, height, padding);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      aria-label={`Elevation profile for ${distance} with ${ascent}m ascent`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3AD77E" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#ADF684" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ADF684" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((frac) => (
        <line
          key={frac}
          x1={padding}
          y1={height - padding - frac * (height - padding * 2)}
          x2={width - padding}
          y2={height - padding - frac * (height - padding * 2)}
          stroke="white"
          strokeOpacity="0.06"
          strokeDasharray="6 6"
        />
      ))}

      {/* Filled area */}
      <path d={areaPath} fill={`url(#${gradientId})`} />

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke="#3AD77E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Peak dot + label */}
      <circle cx={peakCoord.x} cy={peakCoord.y} r="5" fill="#3AD77E" />
      <text
        x={peakCoord.x}
        y={peakCoord.y - 14}
        fill="white"
        fontSize="13"
        fontFamily="sans-serif"
        textAnchor="middle"
        fontWeight="bold"
      >
        {ascent}m peak
      </text>

      {/* Start */}
      <text x={padding} y={height - 6} fill="white" fillOpacity="0.4" fontSize="11" fontFamily="sans-serif">
        Start
      </text>

      {/* Finish */}
      <text x={width - padding} y={height - 6} fill="white" fillOpacity="0.4" fontSize="11" fontFamily="sans-serif" textAnchor="end">
        Finish ({distance})
      </text>
    </svg>
  );
}

export default function RouteSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const race = RACES[activeIdx];

  return (
    <section id="routes" className="section-navy section-padding" data-nav-theme="dark">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
            Routes
          </p>
          <h2
            className="mb-3 font-[family-name:var(--font-heading)] font-extrabold text-white"
            style={{ fontSize: "var(--text-heading)" }}
          >
            Explore the Terrain
          </h2>
          <p className="mx-auto max-w-xl text-white/50">
            Challenging elevation, monsoon roads, and unforgettable scenery
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-10 flex justify-center gap-2">
          {RACES.map((r, i) => (
            <button
              key={r.id}
              onClick={() => setActiveIdx(i)}
              className={`px-6 py-3 text-sm font-bold transition-all ${
                i === activeIdx
                  ? "bg-primary text-navy-dark"
                  : "border border-white/15 text-white/60 hover:text-white hover:border-white/30"
              }`}
            >
              {r.name} · {r.distance}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="grid gap-8 md:grid-cols-5">
          {/* Elevation chart — 3/5 width */}
          <div className="md:col-span-3 border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Mountain size={18} className="text-primary" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">
                Elevation Profile
              </h3>
            </div>
            <LargeElevationSVG
              raceId={race.id}
              ascent={race.elevation.ascent}
              distance={race.distance}
            />
          </div>

          {/* Stats panel — 2/5 width */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {/* Distance */}
            <div className="border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-wider text-white/40 mb-1">
                Distance
              </p>
              <p className="font-[family-name:var(--font-heading)] text-4xl font-bold text-white">
                {race.distance}
              </p>
            </div>

            {/* Ascent / Descent */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-white/10 bg-white/5 p-5">
                <TrendingUp size={18} className="mb-2 text-primary" />
                <p className="text-xs text-white/40">Ascent</p>
                <p className="text-xl font-bold text-white">
                  {race.elevation.ascent}m
                </p>
              </div>
              <div className="border border-white/10 bg-white/5 p-5">
                <TrendingUp size={18} className="mb-2 rotate-180 text-accent" />
                <p className="text-xs text-white/40">Descent</p>
                <p className="text-xl font-bold text-white">
                  {race.elevation.descent}m
                </p>
              </div>
            </div>

            {/* Location & course info */}
            <div className="border border-white/10 bg-white/5 p-5 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-primary" />
                <p className="text-sm font-semibold text-white">
                  Whispers of the Wind
                </p>
              </div>
              <p className="text-xs text-white/40 mb-1">
                Start & Finish Point
              </p>
              <p className="text-xs text-white/40 leading-relaxed">
                Road course — no trails or stairs. Cutoff: {race.cutoff}.
                Route available on Garmin Connect.
              </p>
            </div>
          </div>
        </div>

        {/* Landscape image */}
        <div className="mt-8 relative aspect-[21/7] overflow-hidden">
          <Image
            src={raceImages[race.id] || raceImages["10k-run"]}
            alt={`${race.name} route scenery`}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-navy-dark/30" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/40 mb-1">
                {race.name}
              </p>
              <p className="text-lg font-bold text-white">
                {race.elevation.ascent}m elevation through the monsoon
              </p>
            </div>
            <Link
              href="/race-info"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light transition-colors"
            >
              View Full Details
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
