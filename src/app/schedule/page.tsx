import { Metadata } from "next";
import { SITE } from "@/lib/constants";
import {
  Clock,
  Bus,
  Flag,
  Trophy,
  AlertTriangle,
  CreditCard,
  MapPin,
  CloudRain,
  Stethoscope,
  ShoppingBag,
  Tag,
  Footprints,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Race Day Schedule | Nandi Hills Monsoon Run",
  description:
    "Complete race day schedule, BIB collection expo details, and key reminders for the Nandi Hills Monsoon Run 2026.",
};

const schedule = [
  {
    time: "3:45 AM",
    title: "Shuttle Departure",
    description: "Shuttles depart from 3 Bengaluru pickup points",
    icon: Bus,
  },
  {
    time: "5:30 AM",
    title: "Reporting Time",
    description: `Check-in at ${SITE.venue}`,
    icon: MapPin,
  },
  {
    time: "6:30 AM",
    title: "Half Marathon Flag-off",
    description: "21.1K race begins (4 hour cutoff)",
    icon: Flag,
    highlight: true,
  },
  {
    time: "7:00 AM",
    title: "10K Run Flag-off",
    description: "10K race begins (3 hour cutoff)",
    icon: Flag,
    highlight: true,
  },
  {
    time: "10:00 AM",
    title: "10K Cutoff & Awards Begin",
    description: "10K race cutoff. Awards ceremony commences",
    icon: Trophy,
  },
  {
    time: "10:30 AM",
    title: "Half Marathon Cutoff",
    description: "Half Marathon race cutoff",
    icon: Clock,
  },
  {
    time: "11:00 AM",
    title: "Return Shuttles Depart",
    description: "Shuttles begin returning to Bengaluru",
    icon: Bus,
  },
];

const reminders = [
  { icon: Tag, text: "Wear your BIB visibly on the front of your shirt" },
  { icon: Footprints, text: "Keep your timing chip securely attached" },
  { icon: ShoppingBag, text: "Baggage counter available at the venue" },
  {
    icon: AlertTriangle,
    text: "Only runners with valid BIBs allowed in the Start & Finish area",
  },
  {
    icon: CloudRain,
    text: "Expect rain and fog — wear shoes with good grip",
  },
  {
    icon: Stethoscope,
    text: "Medical assistance available throughout the course",
  },
];

export default function SchedulePage() {
  return (
    <div className="pt-20">
      {/* Timeline */}
      <section className="section-padding bg-bg border-b border-border">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
            Race Day Timeline
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-8" />

            <div className="space-y-8">
              {schedule.map((item, i) => (
                <div key={i} className="relative flex gap-5 md:gap-7">
                  {/* Icon circle */}
                  <div
                    className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center md:h-16 md:w-16 ${
                      item.highlight
                        ? "bg-primary text-white"
                        : "bg-bg-elevated border border-border text-primary"
                    }`}
                  >
                    <item.icon size={20} />
                  </div>

                  {/* Content */}
                  <div className="pt-1 md:pt-3">
                    <p
                      className={`font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-wider ${
                        item.highlight ? "text-primary" : "text-text-muted"
                      }`}
                    >
                      {item.time}
                    </p>
                    <h3 className="text-lg font-bold text-text">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BIB Collection Expo */}
      <section className="section-padding bg-bg-section-alt border-b border-border">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <CreditCard size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              BIB Collection Expo
            </h2>
          </div>

          <div className="bg-bg-elevated border border-border p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-text-muted">
                  Dates
                </p>
                <p className="font-bold text-text">Aug 7 & 8, 2026</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-text-muted">
                  Timing
                </p>
                <p className="font-bold text-text">10:00 AM - 6:00 PM</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-text-muted">
                  Venue
                </p>
                <p className="font-bold text-text">
                  Sri Kanteerava Stadium, Bengaluru
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-text-muted">
              All participants must collect their BIB in person. BIBs cannot be
              mailed. Please carry a valid government-issued ID for collection.
            </p>
          </div>
        </div>
      </section>

      {/* Key Reminders */}
      <section className="section-padding bg-bg">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <AlertTriangle size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Key Reminders
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reminders.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-bg-elevated border border-border p-4"
              >
                <item.icon
                  size={20}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <p className="text-sm text-text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
