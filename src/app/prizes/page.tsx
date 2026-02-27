import { Metadata } from "next";
import {
  Trophy,
  Medal,
  Gift,
  AlertCircle,
  CreditCard,
  IdCard,
  Ban,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Prizes & Awards | Nandi Hills Monsoon Run",
  description:
    "Prize money, age category awards, and conditions for the Half Marathon and 10K Run at Nandi Hills Monsoon Run 2026.",
};

const halfMarathonPrizes = [
  { place: "1st", amount: "20,000" },
  { place: "2nd", amount: "15,000" },
  { place: "3rd", amount: "10,000" },
];

const tenKPrizes = [
  { place: "1st", amount: "10,000" },
  { place: "2nd", amount: "7,500" },
  { place: "3rd", amount: "5,000" },
];

const ageCategories = ["18-30", "31-40", "41-50", "51-60", "61+"];

const conditions = [
  {
    icon: Clock,
    text: "Prize positions are based on gun time only",
  },
  {
    icon: Ban,
    text: "Overall winners are not eligible for age category prizes",
  },
  {
    icon: CreditCard,
    text: "Prize money will be disbursed via bank cheque only",
  },
  {
    icon: IdCard,
    text: "Winners must present a valid government-issued ID to claim prizes",
  },
  {
    icon: AlertCircle,
    text: "All applicable taxes are the winner's responsibility",
  },
];

function PrizeTable({
  title,
  prizes,
}: {
  title: string;
  prizes: { place: string; amount: string }[];
}) {
  return (
    <div className="bg-bg-elevated border border-border p-6">
      <h3 className="mb-4 font-[family-name:var(--font-heading)] text-xl font-bold text-text">
        {title}
      </h3>
      <div className="space-y-3">
        {prizes.map((prize, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 items-center justify-center text-xs font-bold ${
                  i === 0
                    ? "bg-primary text-white"
                    : "bg-bg-section-alt text-text"
                }`}
              >
                {prize.place}
              </span>
              <span className="text-sm text-text-muted">
                {prize.place} Place
              </span>
            </div>
            <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-text">
              <span className="text-primary">&#8377;</span>
              {prize.amount}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-text-muted">
        Prizes awarded for both Male and Female categories
      </p>
    </div>
  );
}

export default function PrizesPage() {
  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="relative bg-bg-section-alt py-16 md:py-24 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
            Awards
          </p>
          <h1 className="mb-4 font-[family-name:var(--font-heading)] text-4xl font-extrabold text-text md:text-5xl">
            Prizes & Awards
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            Prize money, trophies, and recognition for top finishers
          </p>
        </div>
      </section>

      {/* Prize Money */}
      <section className="section-padding bg-bg border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <Trophy size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Prize Money
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <PrizeTable
              title="Half Marathon (21.1K)"
              prizes={halfMarathonPrizes}
            />
            <PrizeTable title="10K Run" prizes={tenKPrizes} />
          </div>
        </div>
      </section>

      {/* Age Category Awards */}
      <section className="section-padding bg-bg-section-alt border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <Medal size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Age Category Awards
            </h2>
          </div>

          <p className="mb-6 text-text-muted">
            Top 3 finishers in each age category receive a Trophy and Gift
            Hamper.
          </p>

          <div className="mb-6 flex flex-wrap gap-3">
            {ageCategories.map((cat) => (
              <span
                key={cat}
                className="bg-bg-elevated border border-border px-4 py-2 text-sm font-bold text-text"
              >
                {cat} years
              </span>
            ))}
          </div>

          <div className="flex items-start gap-3 bg-bg-elevated border border-border p-4">
            <Gift size={20} className="mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="font-bold text-text">Awards per Category</p>
              <p className="text-sm text-text-muted">
                Trophy + Gift Hamper for 1st, 2nd, and 3rd place in each age
                group (Male & Female)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prize Conditions */}
      <section className="section-padding bg-bg">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <AlertCircle size={28} className="text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
              Prize Conditions
            </h2>
          </div>

          <div className="space-y-4">
            {conditions.map((item, i) => (
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
