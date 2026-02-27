import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy for sportstimingsolutions.in API.
 *
 * Their API returns JSON in the shape { data: "<base64-encoded-json>" }.
 * We decode it and return clean JSON to the client.
 *
 * Usage: /api/results?endpoint=race-leaderboard&event_id=87636&race_id=231613
 */

const STS_BASE = "https://sportstimingsolutions.in/frontend/api";
const EVENT_ID = "87636";

// Allowed endpoint whitelist to prevent abuse
const ALLOWED_ENDPOINTS = [
  "event-races",
  "event-leaderboard",
  "race-leaderboard",
  "event-brackets",
  "bracket-leaderboard",
  "event-bibs",
  "event/bib/fetch",
  "event/bib/result",
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");

  if (!endpoint || !ALLOWED_ENDPOINTS.includes(endpoint)) {
    return NextResponse.json(
      { error: "Invalid endpoint" },
      { status: 400 }
    );
  }

  // Build the upstream URL with all query params except 'endpoint'
  const upstreamParams = new URLSearchParams();
  upstreamParams.set("event_id", EVENT_ID);
  searchParams.forEach((value, key) => {
    if (key !== "endpoint") {
      upstreamParams.set(key, value);
    }
  });

  const upstreamUrl = `${STS_BASE}/${endpoint}?${upstreamParams.toString()}`;

  try {
    const res = await fetch(upstreamUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
      // Cache for 1 hour — results don't change frequently
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream error: ${res.status}` },
        { status: res.status }
      );
    }

    const json = await res.json();

    // Decode base64 data field if present
    if (json.data && typeof json.data === "string") {
      try {
        const decoded = JSON.parse(
          Buffer.from(json.data, "base64").toString("utf-8")
        );
        return NextResponse.json(decoded, {
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
          },
        });
      } catch {
        // If base64 decode fails, return raw
        return NextResponse.json(json);
      }
    }

    return NextResponse.json(json, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch results", detail: String(err) },
      { status: 502 }
    );
  }
}
