import { Shirt, Medal, Coffee, Award, type LucideProps } from "lucide-react";
import { GIVEAWAYS } from "@/lib/constants";

const iconMap: Record<string, React.FC<LucideProps>> = {
  shirt: Shirt,
  medal: Medal,
  coffee: Coffee,
  award: Award,
};

export default function GiveawaysSection() {
  return (
    <section className="section-padding bg-bg-section-alt">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Inclusions</p>
          <h2 className="mb-3 font-[family-name:var(--font-heading)] font-extrabold text-text" style={{ fontSize: "var(--text-heading)" }}>
            What You Get
          </h2>
          <p className="mx-auto max-w-xl text-text-muted">
            Every registered runner receives these exclusive giveaways
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {GIVEAWAYS.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.title}
                className="group card-light flex flex-col items-center rounded-2xl p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1 md:p-8"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                  <Icon
                    size={32}
                    className="text-accent"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mb-1 text-sm font-bold text-text md:text-base">
                  {item.title}
                </h3>
                <p className="text-xs text-text-muted md:text-sm">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
