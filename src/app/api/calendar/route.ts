import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const event = request.nextUrl.searchParams.get("event") || "bib";

  let icsContent: string;

  if (event === "bib") {
    icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Nandi Hills Monsoon Run//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "DTSTART:20260807T100000",
      "DTEND:20260808T180000",
      "SUMMARY:BIB Collection - Nandi Hills Monsoon Run",
      "DESCRIPTION:Collect your race BIB and timing chip at the pre-race Expo.\\n\\nBring: Registration confirmation + valid government ID.\\n\\nProxy collection allowed with signed authorization letter.",
      "LOCATION:Sri Kanteerava Stadium\\, Sampangi Rama Nagara\\, Bengaluru 560027",
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "ACTION:DISPLAY",
      "DESCRIPTION:BIB Collection starts tomorrow!",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
  } else {
    // Race day event
    icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Nandi Hills Monsoon Run//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "DTSTART:20260809T053000",
      "DTEND:20260809T110000",
      "SUMMARY:Nandi Hills Monsoon Run 2026 - Race Day",
      "DESCRIPTION:Reporting Time: 5:30 AM\\nHalf Marathon Flag-off: 6:30 AM\\n10K Run Flag-off: 7:00 AM\\n\\nVenue: Whispers of the Wind by DivyaSree\\, enroute Nandi Hills",
      "LOCATION:Whispers of the Wind by DivyaSree\\, Nelamangala-Chikkaballapur Road\\, Bengaluru",
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "ACTION:DISPLAY",
      "DESCRIPTION:Race Day tomorrow! Reporting time: 5:30 AM",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
  }

  return new NextResponse(icsContent, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event === "bib" ? "bib-collection" : "race-day"}.ics"`,
    },
  });
}
