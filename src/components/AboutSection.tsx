import { SITE } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-bg">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">About</p>
          <h2 className="mb-3 font-[family-name:var(--font-heading)] font-extrabold text-text" style={{ fontSize: "var(--text-heading)" }}>
            Our Story
          </h2>
          <p className="mx-auto max-w-xl text-text-muted">
            Born from a love of running and the magic of monsoon mountains
          </p>
        </div>

        <div className="mb-8 mx-auto max-w-3xl text-center">
          <p className="text-base text-text-muted leading-relaxed md:text-lg">
            The Nandi Hills Monsoon Run was born from a simple idea: what if
            runners could experience the raw beauty of India&apos;s Western
            Ghats during the most dramatic season of the year? Nandi Hills,
            rising to 1,478 metres near Bengaluru, transforms during the
            monsoon into a mystical landscape of swirling clouds, cascading
            rain, and impossibly green hillsides. This is not just a run —
            it&apos;s an adventure through nature at its most alive.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="card-light rounded-2xl p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary font-bold text-navy-dark text-lg">
                JJ
              </div>
              <div>
                <h3 className="font-bold text-text">
                  {SITE.organizers.jjActive.name}
                </h3>
                <p className="text-xs text-text-muted">Event Organizer</p>
              </div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              {SITE.organizers.jjActive.description}
            </p>
          </div>

          <div className="card-light rounded-2xl p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-dark font-bold text-white text-sm border border-border">
                DS
              </div>
              <div>
                <h3 className="font-bold text-text">
                  {SITE.organizers.divyaSree.name}
                </h3>
                <p className="text-xs text-text-muted">Venue Partner</p>
              </div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              {SITE.organizers.divyaSree.description}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light transition-colors"
          >
            Read the full story
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
