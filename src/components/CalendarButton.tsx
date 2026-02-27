"use client";

import { CalendarPlus } from "lucide-react";

export default function CalendarButton({ event = "bib" }: { event?: string }) {
  const handleDownload = async () => {
    try {
      const res = await fetch(`/api/calendar?event=${event}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = event === "bib" ? "bib-collection.ics" : "race-day.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open the URL directly
      window.open(`/api/calendar?event=${event}`, "_blank");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-navy-dark transition-all hover:bg-accent-dark"
    >
      <CalendarPlus size={18} />
      Add to Calendar
    </button>
  );
}
