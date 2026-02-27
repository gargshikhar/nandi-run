import { Metadata } from "next";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "FAQs | Nandi Hills Monsoon Run",
  description:
    "Frequently asked questions about the Nandi Hills Monsoon Run 2025 — registration, race details, logistics, and more.",
};

export default function FAQsPage() {
  return (
    <div className="pt-20">
      <section className="relative bg-bg-section-alt py-10 md:py-14 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Questions</p>
          <h1 className="mb-2 font-[family-name:var(--font-heading)] text-2xl font-extrabold text-text md:text-3xl">
            FAQs
          </h1>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-text-muted">
            Everything you need to know about the run
          </p>
        </div>
      </section>

      <FAQSection limit={100} />
    </div>
  );
}
