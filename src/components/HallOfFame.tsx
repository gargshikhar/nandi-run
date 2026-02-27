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
 * Links to sportstimingsolutions.in results page (external site blocks
 * iframe embedding via X-Frame-Options: SAMEORIGIN, so we link out).
 */
export default function HallOfFame() {
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

        {/* Category badges */}
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

        {/* CTA card */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center">
          <Trophy size={48} className="mx-auto mb-4 text-primary" />
          <p className="mb-2 text-lg font-bold text-white">
            View Full Results & Leaderboard
          </p>
          <p className="mb-6 text-sm text-white/50">
            Search by BIB number, filter by age category, and view split
            timings
          </p>
          <a
            href={RESULTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-navy-dark transition-all hover:bg-accent-dark"
          >
            <Trophy size={16} />
            View Edition 1 Results
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
