import { NextRequest, NextResponse } from "next/server";

/**
 * Google Forms integration for "Notify Me" subscriptions.
 *
 * Setup:
 * 1. Create a Google Form with "Name" and "Email" fields
 * 2. Click the ⋮ menu → "Get pre-filled link" to find entry IDs
 *    (they look like entry.123456789)
 * 3. Set these env vars in .env.local:
 *    GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
 *    GOOGLE_FORM_EMAIL_ENTRY=entry.123456789
 *    GOOGLE_FORM_NAME_ENTRY=entry.987654321
 *
 * Data automatically appears in the linked Google Sheet.
 */

const GOOGLE_FORM_URL = process.env.GOOGLE_FORM_URL || "";
const GOOGLE_FORM_EMAIL_ENTRY = process.env.GOOGLE_FORM_EMAIL_ENTRY || "";
const GOOGLE_FORM_NAME_ENTRY = process.env.GOOGLE_FORM_NAME_ENTRY || "";

// Rate limiting: simple in-memory store
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60000 });
    return false;
  }

  entry.count++;
  return entry.count > 5;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // If Google Form is configured, submit there
    if (GOOGLE_FORM_URL && GOOGLE_FORM_EMAIL_ENTRY) {
      const formData = new URLSearchParams();
      formData.append(GOOGLE_FORM_EMAIL_ENTRY, email.toLowerCase());
      if (GOOGLE_FORM_NAME_ENTRY && name) {
        formData.append(GOOGLE_FORM_NAME_ENTRY, typeof name === "string" ? name.trim() : "");
      }

      const res = await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      // Google Forms returns 200 on success (even for the HTML confirmation page)
      if (!res.ok && res.status !== 200) {
        console.error("Google Form submission failed:", res.status);
        return NextResponse.json(
          { error: "Something went wrong. Please try again." },
          { status: 500 }
        );
      }

      return NextResponse.json({ message: "Subscribed successfully" }, { status: 200 });
    }

    // Fallback: log to server console if Google Form not configured
    console.log(`[Notify] New subscriber: ${email.toLowerCase()} (${typeof name === "string" ? name.trim() : "no name"})`);

    return NextResponse.json({ message: "Subscribed successfully" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
