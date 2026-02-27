import { Trophy } from "lucide-react";

export default function WinnersSection() {
  return (
    <section className="section-padding bg-bg-section-alt">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
          <Trophy size={32} className="text-accent" />
        </div>
        <h2 className="mb-3 font-[family-name:var(--font-heading)] font-extrabold text-text" style={{ fontSize: "var(--text-heading)" }}>
          Hall of Fame
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-text-muted">
          Last year&apos;s champions set the bar — will you be next on the leaderboard?
        </p>
        <div className="card-light rounded-2xl p-8">
          <p className="text-lg font-medium text-text-muted">
            Edition 2 winners will be announced after race day on August 9, 2026
          </p>
          <p className="mt-2 text-sm text-text-muted">
            Results across all age categories for both Half Marathon and 10K
          </p>
        </div>
      </div>
    </section>
  );
}
