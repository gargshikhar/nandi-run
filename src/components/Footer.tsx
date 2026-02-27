import Link from "next/link";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { SITE, NAV_ITEMS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg text-lg"
                style={{ background: "var(--gradient-hero)" }}
              >
                🏔️
              </span>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-heading)]">
                Nandi Run
              </h3>
            </div>
            <p className="mb-4 text-sm leading-relaxed">
              {SITE.tagline}
            </p>
            <p className="text-sm text-white/40">
              {SITE.edition} &middot; {SITE.date}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-primary-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={16} className="shrink-0 text-primary" />
                <a href={`mailto:${SITE.email}`} className="hover:text-primary-light transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone size={16} className="shrink-0 text-primary" />
                <a href={`tel:+91${SITE.phone}`} className="hover:text-primary-light transition-colors">
                  +91 {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                <span>{SITE.venue}, {SITE.venueAddress}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 transition-all hover:bg-primary hover:border-primary hover:text-navy-dark"
                aria-label="Nandi Run Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={SITE.wowInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 transition-all hover:bg-primary hover:border-primary hover:text-navy-dark"
                aria-label="WoW Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
            <div className="mt-6">
              <Link
                href={SITE.registerUrl}
                className="inline-block rounded-2xl bg-primary px-6 py-2.5 text-sm font-bold text-navy-dark transition-all hover:bg-accent-dark"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/8 pt-8 text-center text-xs text-white/30">
          <p>
            &copy; {new Date().getFullYear()} Nandi Hills Monsoon Run.
            Hosted at {SITE.venue} by {SITE.organizers.divyaSree.name} &middot;
            Supported by the Government of Karnataka
          </p>
        </div>
      </div>
    </footer>
  );
}
