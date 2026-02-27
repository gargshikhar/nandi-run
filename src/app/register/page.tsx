import { Metadata } from "next";
import { RACES } from "@/lib/constants";
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  Shirt,
  Medal,
  Coffee,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Register | Nandi Hills Monsoon Run",
  description:
    "Register for the Nandi Hills Monsoon Run 2025 — Half Marathon (21.1K) and 10K Run on August 10, 2025.",
};

export default function RegisterPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-bg">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            {RACES.map((race) => (
              <div
                key={race.id}
                className="relative overflow-hidden rounded-2xl border border-border bg-bg-elevated"
              >
                <div className="bg-gradient-to-r from-primary to-primary-light p-6 text-white">
                  <h2 className="text-3xl font-extrabold">{race.distance}</h2>
                  <p className="text-lg font-medium text-white/80">{race.name}</p>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <span className="text-3xl font-extrabold text-text">
                      {race.priceLabel}
                    </span>
                  </div>
                  <ul className="mb-6 space-y-3">
                    {[
                      "Race T-shirt",
                      "Finisher's Medal",
                      "Post-race Breakfast",
                      "E-Certificate",
                      "Chip Timing",
                      "On-course Medical Support",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-text-muted"
                      >
                        <CheckCircle2 size={16} className="text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://nandirun.in/register/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-base font-bold text-gray-900 transition-all hover:bg-accent-dark"
                  >
                    Register for {race.name}
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Green Warrior */}
          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/10 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                <Leaf size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">
                  Green Warrior Discount
                </h3>
                <p className="mt-1 text-sm text-text-muted">
                  Choose the Green Warrior option during registration to get a
                  special discount on your registration fee while supporting
                  eco-friendly practices at the event.
                </p>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="mt-12">
            <h3 className="mb-6 text-center font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              What&apos;s Included
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { icon: Shirt, label: "Race T-Shirt" },
                { icon: Medal, label: "Finisher Medal" },
                { icon: Coffee, label: "Breakfast" },
                { icon: Award, label: "E-Certificate" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center rounded-xl bg-bg-elevated border border-border p-5 text-center"
                >
                  <item.icon
                    size={28}
                    className="mb-2 text-accent"
                    strokeWidth={1.5}
                  />
                  <span className="text-sm font-medium text-text">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="mt-12 rounded-xl bg-bg-elevated border border-border p-6">
            <h4 className="mb-3 font-bold text-text">Important Notes</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>Registration fees are non-refundable and non-transferable.</li>
              <li>Category changes allowed until July 20, 2025. Upgrades require payment of difference; downgrades receive no refund.</li>
              <li>BIBs cannot be transferred from one runner to another.</li>
              <li>All participants must collect their BIB from the pre-race Expo.</li>
              <li>Minimum age: 18 years for both categories.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
