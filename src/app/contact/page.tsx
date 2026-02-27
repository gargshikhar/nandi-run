import { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { Mail, Phone, MapPin, Instagram, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Nandi Hills Monsoon Run",
  description: "Get in touch with the Nandi Hills Monsoon Run team.",
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-bg">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-4 rounded-xl bg-bg-elevated border border-border p-4 transition-colors hover:bg-white/[0.06]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Mail size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Email</p>
                    <p className="font-semibold text-text">{SITE.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:+91${SITE.phone}`}
                  className="flex items-center gap-4 rounded-xl bg-bg-elevated border border-border p-4 transition-colors hover:bg-white/[0.06]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Phone size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Phone</p>
                    <p className="font-semibold text-text">
                      +91 {SITE.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl bg-bg-elevated border border-border p-4 transition-colors hover:bg-white/[0.06]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <MessageCircle size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">WhatsApp</p>
                    <p className="font-semibold text-text">
                      Chat with us on WhatsApp
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 rounded-xl bg-bg-elevated border border-border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Venue</p>
                    <p className="font-semibold text-text">{SITE.venue}</p>
                    <p className="text-sm text-text-muted">{SITE.venueAddress}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/30">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-white/5 hover:text-primary"
                  >
                    <Instagram size={16} />
                    @nandihillsmonsoonrun
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
                Send a Message
              </h2>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-text"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-text"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1 block text-sm font-medium text-text"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm font-medium text-text"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white transition-all hover:bg-primary-light"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
