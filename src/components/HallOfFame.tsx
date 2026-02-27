"use client";

import { useState } from "react";
import { Trophy, ExternalLink } from "lucide-react";

const RESULTS_URL =
  "https://sportstimingsolutions.in/results?q=eyJlX25hbWUiOiJEaXZ5YVNyZWUgTmFuZGkgSGlsbHMgTW9uc29vbiBSdW4gMjAyNSIsImVfaWQiOjg3NjM2fQ%3D%3D";

const categories = [
  { label: "Overall", value: "all" },
  { label: "Half Marathon", value: "hm" },
  { label: "10K Run", value: "10k" },
];

/**
 * Hall of Fame — Edition 1 Results
 *
 * Embeds the sportstimingsolutions.in results page in an iframe
 * so users can view live results, search by BIB, and filter by
 * category — all without leaving the site.
 */
export default function HallOfFame() {
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <section className="section-padding bg-navy-dark" data-nav-theme="dark">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-semibold">
            Edition 1
          </p>
          <h2
            className="mb-3 font-[family-name:var(--font-heading)] font-extrabold text-white"
            style={{ fontSize: "var(--text-heading)" }}
          >
            Hall of Fame
          </h2>
          <p className="mx-auto max-w-xl text-white/50">
            Results from the DivyaSree Nandi Hills Monsoon Run 2025
          </p>
        </div>

        {/* Category quick links */}
        <div className="mb-6 flex justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <span
              key={cat.value}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-white/10 text-white/50 rounded-lg"
            >
              {cat.label}
            </span>
          ))}
        </div>

        {/* Embedded results or CTA to expand */}
        {showEmbed ? (
          <div className="overflow-hidden rounded-xl border border-white/10">
            <iframe
              src={RESULTS_URL}
              className="w-full border-0 bg-white"
              style={{ height: "80vh", minHeight: "600px" }}
              title="Edition 1 Race Results — Sports Timing Solutions"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center">
            <Trophy size={48} className="mx-auto mb-4 text-primary" />
            <p className="mb-2 text-lg font-bold text-white">
              View Full Results & Leaderboard
            </p>
            <p className="mb-6 text-sm text-white/50">
              Search by BIB number, filter by age category, and view split
              timings
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => setShowEmbed(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-navy-dark transition-all hover:bg-accent-dark"
              >
                <Trophy size={16} />
                Load Results Here
              </button>
              <a
                href={RESULTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white/60 transition-all hover:text-white hover:border-white/30"
              >
                Open in New Tab
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
