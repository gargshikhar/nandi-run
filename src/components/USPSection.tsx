import { Mountain, Cloud, Timer, TrendingUp } from "lucide-react";

const usps = [
  {
    icon: Mountain,
    title: "Hill Run",
    desc: "One of India's very few monsoon hill runs with serious elevation",
  },
  {
    icon: Cloud,
    title: "Run in the Clouds",
    desc: "Race through mist, rain, and lush green canopies at 900m altitude",
  },
  {
    icon: TrendingUp,
    title: "530m Elevation",
    desc: "Challenging uphill terrain that tests endurance and rewards grit",
  },
  {
    icon: Timer,
    title: "Timed & Competitive",
    desc: "Chip-timed event with prizes across multiple age categories",
  },
];

export default function USPSection() {
  return (
    <section className="relative bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {usps.map((item) => (
            <div
              key={item.title}
              className="card-light flex flex-col items-center p-5 text-center md:p-6"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "var(--gradient-hero)" }}>
                <item.icon
                  className="text-navy-dark"
                  size={24}
                  strokeWidth={2}
                />
              </div>
              <h3 className="mb-1 text-sm font-bold text-text md:text-base">
                {item.title}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed md:text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
