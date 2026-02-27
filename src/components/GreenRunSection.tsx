import { Leaf, TreePine, Recycle, Sparkles } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/lib/constants";

const greenFeatures = [
  {
    icon: Leaf,
    title: "Eco-Friendly Choices",
    desc: "Opt for sustainable options during registration and on race day",
  },
  {
    icon: TreePine,
    title: "Connected to Nature",
    desc: "Hosted at WoW by DivyaSree — a sustainability-forward venue",
  },
  {
    icon: Recycle,
    title: "Minimal Waste",
    desc: "Reduced single-use materials and responsible waste management",
  },
];

export default function GreenRunSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-bg-section-alt">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 5 L35 15 L30 12 L25 15 Z' fill='%23ffffff'/%3E%3C/svg%3E\")",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 text-sm font-medium text-green-700">
              <Sparkles size={16} />
              Green Initiative
            </div>

            <h2 className="mb-4 font-[family-name:var(--font-heading)] font-extrabold text-text" style={{ fontSize: "var(--text-heading)" }}>
              Be a Green Warrior
            </h2>

            <p className="mb-8 text-base text-text-muted leading-relaxed">
              The Nandi Hills Monsoon Run is committed to protecting the very
              environment that makes this run so spectacular. Choose the Green
              Warrior option during registration.
            </p>

            <div className="space-y-4">
              {greenFeatures.map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                    <f.icon size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text">{f.title}</h4>
                    <p className="text-sm text-text-muted">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Green Warrior Card */}
          <div className="relative">
            <div className="card-light rounded-2xl p-8">
              <div className="mb-6 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg shadow-green-500/20">
                  <Leaf size={48} className="text-white" strokeWidth={1.5} />
                </div>
              </div>

              <h3 className="mb-2 text-center font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
                Green Warrior Discount
              </h3>

              <p className="mb-6 text-center text-sm text-text-muted">
                Choose the Green Warrior option and get a special discount while
                making a positive impact on the environment.
              </p>

              <div className="mb-6 rounded-xl bg-green-500/10 p-4 text-center border border-green-500/10">
                <p className="text-xs uppercase tracking-wider text-green-700">
                  Did you know?
                </p>
                <p className="mt-1 text-sm font-medium text-text">
                  Green Warriors get a special discount on their registration fee!
                </p>
              </div>

              <Link
                href={SITE.registerUrl}
                className="block w-full rounded-xl bg-green-500 py-3.5 text-center text-sm font-bold text-navy-dark transition-all hover:bg-green-400"
              >
                Register as Green Warrior
              </Link>

              <a
                href={SITE.wowInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center text-xs text-green-700/60 hover:text-green-700 transition-colors"
              >
                Learn more about the WoW Project →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
