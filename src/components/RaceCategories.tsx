import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { RACES, SITE } from "@/lib/constants";

const raceFeatures: Record<string, string[]> = {
  "half-marathon": [
    "530m total elevation gain",
    "Scenic monsoon mountain roads",
    "Cloud-wrapped peaks & misty bends",
    "Chip-timed & competitive",
    "4-hour cutoff",
    "Finisher medal & certificate",
  ],
  "10k-run": [
    "191m total elevation gain",
    "Road course — no trails or stairs",
    "Monsoon-drenched scenic roads",
    "Chip-timed & competitive",
    "3-hour cutoff",
    "Finisher medal & certificate",
  ],
};

export default function RaceCategories() {
  return (
    <section id="races" className="section-padding bg-bg">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-semibold">
            Choose Your Challenge
          </p>
          <h2
            className="mb-3 font-[family-name:var(--font-heading)] font-bold text-text"
            style={{ fontSize: "var(--text-heading)" }}
          >
            Two Races, One Epic Mountain
          </h2>
          <p className="mx-auto max-w-xl text-text-muted">
            Pick the distance that matches your ambition.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {RACES.map((race, idx) => {
            const features = raceFeatures[race.id] || [];
            const featured = idx === 0;

            return (
              <div
                key={race.id}
                className={`relative flex flex-col rounded-xl border p-8 md:p-10 text-center transition-shadow hover:shadow-lg ${
                  featured
                    ? "border-primary bg-white shadow-md"
                    : "border-border bg-white"
                }`}
              >
                {/* Featured badge */}
                {featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-dark">
                    Most Popular
                  </div>
                )}

                {/* Giant distance */}
                <div className="mb-2 font-[family-name:var(--font-heading)] text-navy-dark leading-none text-[3.5rem] sm:text-[4rem] md:text-[5rem]">
                  {race.distance}
                </div>

                {/* Race name with green underline */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-text">{race.name}</h3>
                  <div className="mx-auto mt-2 h-0.5 w-12 bg-primary" />
                </div>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-3xl font-bold text-navy-dark">
                    {race.priceLabel.split(" ")[0]}
                  </span>
                  <span className="ml-1 text-sm text-text-muted">+ GST</span>
                </div>

                {/* Feature list */}
                <ul className="mb-8 flex-1 space-y-3 text-left">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-primary"
                      />
                      <span className="text-sm text-text-muted">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Key stats row */}
                <div className="mb-6 grid grid-cols-3 gap-3 border-t border-border pt-6">
                  <div>
                    <p className="text-lg font-bold text-navy-dark">
                      {race.elevation.ascent}m
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-text-muted">
                      Ascent
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-navy-dark">
                      {race.cutoff}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-text-muted">
                      Cutoff
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-navy-dark">
                      {race.minAge}+
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-text-muted">
                      Min Age
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={SITE.registerUrl}
                  className={`flex w-full items-center justify-center gap-2 rounded-lg py-4 text-sm font-bold transition-all ${
                    featured
                      ? "bg-primary text-navy-dark hover:bg-accent-dark"
                      : "border border-navy/20 text-navy-dark hover:bg-navy/5"
                  }`}
                >
                  Register for {race.name}
                  <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
