"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/constants";
import Link from "next/link";

export default function FAQSection({ limit = 8 }: { limit?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const displayFaqs = FAQS.slice(0, limit);

  return (
    <section id="faqs" className="section-padding bg-bg">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">FAQs</p>
          <h2 className="mb-3 font-[family-name:var(--font-heading)] font-extrabold text-text" style={{ fontSize: "var(--text-heading)" }}>
            Frequently Asked Questions
          </h2>
          <p className="text-text-muted">
            Everything you need to know before race day
          </p>
        </div>

        <div className="space-y-3">
          {displayFaqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border bg-bg-elevated transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="text-sm font-semibold text-text md:text-base">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-text-muted transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-96 pb-5" : "max-h-0"
                }`}
              >
                <p className="px-5 text-sm text-text-muted leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {limit < FAQS.length && (
          <div className="mt-8 text-center">
            <Link
              href="/faqs"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10 hover:border-primary/60"
            >
              View All FAQs
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
