import { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { Instagram, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Nandi Hills Monsoon Run",
  description:
    "The story behind the Nandi Hills Monsoon Run — organized by JJ Active, hosted at Whispers of the Wind by DivyaSree.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="relative bg-bg-section-alt py-16 md:py-24 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Our Story</p>
          <h1 className="mb-4 font-[family-name:var(--font-heading)] text-4xl font-extrabold text-text md:text-5xl">
            About the Run
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            The story behind India&apos;s premier monsoon hill running experience
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-bg">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
            The Origin Story
          </h2>
          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>
              The Nandi Hills Monsoon Run was born from a simple yet powerful
              idea: what if runners could experience the raw, untamed beauty of
              Nandi Hills during the most dramatic season of the year — the
              monsoon?
            </p>
            <p>
              Nandi Hills, rising to 1,478 metres just 60 kilometres from
              Bengaluru, transforms during the monsoon into a mystical
              landscape of swirling clouds, cascading rain, and impossibly green
              hillsides. The air is crisp, the trails are alive, and the
              experience of running through this landscape is nothing short of
              magical.
            </p>
            <p>
              A partnership between JJ Active — one of India&apos;s most experienced
              running event companies — and DivyaSree — whose Whispers of the
              Wind property at the base of Nandi Hills offers a stunning,
              nature-first venue — brought this vision to life.
            </p>
            <p>
              The result is a race that isn&apos;t just about distance and time.
              It&apos;s about running through clouds, feeling rain on your face,
              climbing through mist, and crossing a finish line surrounded by
              the roar of monsoon nature.
            </p>
          </div>
        </div>
      </section>

      {/* Organizers */}
      <section className="section-padding bg-bg-section-alt">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
            The Organizers
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="glass rounded-2xl p-6 md:p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white">
                  JJ
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text">
                    {SITE.organizers.jjActive.name}
                  </h3>
                  <p className="text-sm text-text-muted">Event Organizer</p>
                </div>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                {SITE.organizers.jjActive.description}
              </p>
            </div>

            <div className="glass rounded-2xl p-6 md:p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-light text-lg font-bold text-white">
                  DS
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text">
                    {SITE.organizers.divyaSree.name}
                  </h3>
                  <p className="text-sm text-text-muted">Venue Partner</p>
                </div>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                {SITE.organizers.divyaSree.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Venue */}
      <section className="section-padding bg-bg">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
            The Venue — Whispers of the Wind
          </h2>
          <p className="mb-6 text-text-muted leading-relaxed">
            Whispers of the Wind (WoW) by DivyaSree is a nature-centric
            development nestled at the base of Nandi Hills. Surrounded by lush
            greenery and designed with sustainability at its core, WoW is the
            perfect starting and finishing point for a monsoon hill run.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={SITE.wowInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-white/5 hover:text-primary"
            >
              <Instagram size={16} />
              WoW on Instagram
              <ExternalLink size={12} />
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-white/5 hover:text-primary"
            >
              <Instagram size={16} />
              Nandi Run on Instagram
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
