import { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { Instagram, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Nandi Hills Monsoon Run",
  description:
    "The story behind the Nandi Hills Monsoon Run — hosted at Whispers of the Wind by DivyaSree, supported by the Government of Karnataka.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
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
              With the support of the Government of Karnataka and the
              Chikkaballapur District Administration, and hosted at DivyaSree&apos;s
              Whispers of the Wind property at the base of Nandi Hills,
              this vision was brought to life — creating one of India&apos;s few
              monsoon hill runs.
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

      {/* Partners */}
      <section className="section-padding bg-bg-section-alt">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
            Our Partners
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-white p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-dark text-sm font-bold text-white">
                  GoK
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text">
                    Government of Karnataka
                  </h3>
                  <p className="text-xs text-text-muted">Government Support</p>
                </div>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                The event is conducted with the support and permissions of the
                Government of Karnataka and the Chikkaballapur District Administration.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-white p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-light text-sm font-bold text-white">
                  DS
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text">
                    {SITE.organizers.divyaSree.name}
                  </h3>
                  <p className="text-xs text-text-muted">Venue Partner</p>
                </div>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                DivyaSree&apos;s Whispers of the Wind property at Nandi Hills
                is the start and finish venue — a nature-centric setting
                perfect for a monsoon hill run.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-white p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
                  JJ
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text">
                    {SITE.organizers.jjActive.name}
                  </h3>
                  <p className="text-xs text-text-muted">Event Management</p>
                </div>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Professional race management, timing, safety standards, and
                on-ground logistics.
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
