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
      <FAQSection limit={100} />
    </div>
  );
}
