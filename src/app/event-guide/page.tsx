import { Metadata } from "next";
import {
  Leaf,
  CreditCard,
  Bus,
  Hotel,
  Trophy,
  FileText,
  Sparkles,
  MapPin,
  ParkingCircle,
  Stethoscope,
  Droplets,
  ShoppingBag,
} from "lucide-react";
import CalendarButton from "@/components/CalendarButton";

export const metadata: Metadata = {
  title: "Event Guide | Nandi Hills Monsoon Run",
  description:
    "Complete event guide — Green Run info, BIB collection, transport, accommodation, prizes, and venue details.",
};

export default function EventGuidePage() {
  return (
    <div className="pt-20">
      <section className="relative bg-bg-section-alt py-16 md:py-24 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Race Day</p>
          <h1 className="mb-4 font-[family-name:var(--font-heading)] text-4xl font-extrabold text-text md:text-5xl">
            Event Guide
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            Your complete guide to everything on and around race day
          </p>
        </div>
      </section>

      {/* Green Event */}
      <section className="section-padding border-b border-border bg-bg">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <Leaf size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Green Event
            </h2>
          </div>
          <p className="mb-4 text-text-muted leading-relaxed">
            The Nandi Hills Monsoon Run is committed to being an eco-friendly
            event. We believe in protecting the beautiful environment that makes
            this run so special.
          </p>
          <div className="rounded-xl bg-primary/10 border border-primary/20 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} className="text-primary" />
              <h4 className="font-bold text-primary">Green Warrior Option</h4>
            </div>
            <p className="text-sm text-text-muted">
              Select the Green Warrior option during registration to receive a
              discount while supporting sustainable practices. Green Warriors
              commit to eco-friendly choices on race day.
            </p>
          </div>
        </div>
      </section>

      {/* BIB Collection */}
      <section className="section-padding border-b border-border bg-bg">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <CreditCard size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              BIB Collection
            </h2>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="border border-border bg-bg-elevated p-4">
              <p className="text-xs text-text-muted">Dates</p>
              <p className="font-bold text-text">Aug 7-8, 2026</p>
            </div>
            <div className="border border-border bg-bg-elevated p-4">
              <p className="text-xs text-text-muted">Time</p>
              <p className="font-bold text-text">10 AM - 6 PM</p>
            </div>
            <div className="border border-border bg-bg-elevated p-4">
              <p className="text-xs text-text-muted">Venue</p>
              <p className="font-bold text-text">Sri Kanteerava Stadium</p>
              <p className="text-xs text-text-muted">Bengaluru 560027</p>
            </div>
          </div>

          <div className="space-y-3 text-text-muted mb-6">
            <p>All participants must collect their BIB from the pre-race Expo. BIBs cannot be mailed.</p>
            <p>Bring your registration confirmation email/SMS and a valid government-issued photo ID.</p>
            <p>Proxy collection allowed with a signed authorization letter and digital copies of participant&apos;s registration confirmation and photo ID.</p>
            <p className="text-sm font-semibold text-red-600">BIBs will NOT be distributed on race day.</p>
          </div>

          <CalendarButton event="bib" />
        </div>
      </section>

      {/* Transport */}
      <section className="section-padding border-b border-border bg-bg">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <Bus size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Transport to Event
            </h2>
          </div>
          <div className="space-y-3 text-text-muted">
            <p>The venue is located on the Nelamangala–Chikkaballapur road enroute to Nandi Hills, approximately 60 km from Bengaluru city.</p>
            <p>Shuttle service will be provided at designated pick-up and drop points at an additional cost.</p>
            <p>Paid parking is available at the venue for those driving.</p>
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section className="section-padding border-b border-border bg-bg">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <Hotel size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Accommodation
            </h2>
          </div>
          <p className="text-text-muted">
            Given the early morning reporting time (5:30 AM), participants may wish to stay near the venue the night before. Accommodation options will be shared via email closer to the event.
          </p>
        </div>
      </section>

      {/* Prizes */}
      <section className="section-padding border-b border-border bg-bg">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <Trophy size={28} className="text-accent" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Prizes
            </h2>
          </div>
          <p className="mb-4 text-text-muted">
            Prize money will be awarded across multiple age and race categories for both the Half Marathon and 10K Run.
          </p>
          <div className="rounded-xl bg-bg-elevated border border-border p-5 text-sm text-text-muted">
            Detailed prize structure coming soon. Stay tuned!
          </div>
        </div>
      </section>

      {/* Venue Facilities */}
      <section className="section-padding border-b border-border bg-bg">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <MapPin size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Venue Facilities
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[
              { icon: ParkingCircle, label: "Paid Parking" },
              { icon: Stethoscope, label: "Medical / Physio" },
              { icon: Droplets, label: "Hydration Stations" },
              { icon: ShoppingBag, label: "Baggage Counter" },
              { icon: MapPin, label: "Changing Rooms" },
              { icon: MapPin, label: "Start/Finish Area" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3 rounded-lg bg-bg-elevated border border-border p-4">
                <f.icon size={20} className="text-primary shrink-0" />
                <span className="text-sm font-medium text-text">{f.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/30">
            Detailed venue/master plan map will be available closer to race day as a downloadable PDF.
          </p>
        </div>
      </section>

      {/* Terms */}
      <section className="section-padding bg-bg">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <FileText size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Terms & Conditions
            </h2>
          </div>
          <ul className="space-y-3 text-sm text-text-muted">
            <li>Registration fees are non-refundable and non-transferable under any circumstances.</li>
            <li>BIBs cannot be transferred from one runner to another.</li>
            <li>Category changes are allowed until July 20, 2025.</li>
            <li>The organizers reserve the right to modify the event format, route, or timing.</li>
            <li>Participants run at their own risk and must declare any medical conditions.</li>
            <li>Results and decisions communicated by the Race Director are final.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
