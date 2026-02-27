"use client";

import { CalendarPlus } from "lucide-react";

/**
 * Google Calendar event data keyed by event type.
 *
 * Date format: YYYYMMDDTHHMMSS (local time — we pass ctz=Asia/Kolkata).
 * Google Calendar link params:
 *   action=TEMPLATE  – opens the "new event" form pre-filled
 *   text             – event title
 *   dates            – start/end in YYYYMMDDTHHMMSS format
 *   ctz              – timezone (so times are interpreted correctly)
 *   location         – venue
 *   details          – description (supports line breaks with %0A)
 */
const EVENTS: Record<
  string,
  { title: string; start: string; end: string; location: string; details: string }
> = {
  bib: {
    title: "BIB Collection - Nandi Hills Monsoon Run",
    start: "20260807T100000",
    end: "20260808T180000",
    location: "Sri Kanteerava Stadium, Sampangi Rama Nagara, Bengaluru 560027",
    details:
      "Collect your race BIB and timing chip at the pre-race Expo.\n\nBring: Registration confirmation + valid government ID.\n\nProxy collection allowed with signed authorization letter.",
  },
  race: {
    title: "Nandi Hills Monsoon Run 2026 - Race Day",
    start: "20260809T053000",
    end: "20260809T110000",
    location:
      "Whispers of the Wind by DivyaSree, Nelamangala-Chikkaballapur Road, Bengaluru",
    details:
      "Reporting Time: 5:30 AM\nHalf Marathon Flag-off: 6:30 AM\n10K Run Flag-off: 7:00 AM\n\nVenue: Whispers of the Wind by DivyaSree, enroute Nandi Hills",
  },
};

function buildGoogleCalendarUrl(event: string): string {
  const e = EVENTS[event] ?? EVENTS.bib;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${e.start}/${e.end}`,
    ctz: "Asia/Kolkata",
    location: e.location,
    details: e.details,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function CalendarButton({ event = "bib" }: { event?: string }) {
  return (
    <a
      href={buildGoogleCalendarUrl(event)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-navy-dark transition-all hover:bg-accent-dark"
    >
      <CalendarPlus size={18} />
      Add to Google Calendar
    </a>
  );
}
