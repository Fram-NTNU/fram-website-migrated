import { headers } from "next/headers";
import { connection } from "next/server";
import { type EventItem, fallbackEvents } from "./events";

export async function publishedEvents(): Promise<{ events: EventItem[]; unavailable: boolean; now: number }> {
  await connection();
  const now = Date.now();
  const base = process.env.FRAM_PORTAL_API_URL?.replace(/\/$/, "");
  if (!base) return { events: fallbackEvents, unavailable: false, now };
  try {
    const token = (await headers()).get("x-vercel-oidc-token");
    const requireOidc = process.env.FRAM_BOOKING_REQUIRE_OIDC === "true" || process.env.DEPLOYMENT_ENV === "production" || process.env.VERCEL_ENV === "production";
    const secret = process.env.FRAM_BOOKING_INTEGRATION_SECRET;
    const auth: Record<string, string> = {};
    if (token) auth.Authorization = `Bearer ${token}`;
    if (secret && !requireOidc) auth["x-fram-booking-secret"] = secret;
    const response = await fetch(`${base}/api/v1/events`, {
      headers: auth, cache: "no-store", signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("Event feed unavailable");
    const data = await response.json() as { events: EventItem[] };
    if (!Array.isArray(data.events)) throw new Error("Invalid event feed");
    return { events: data.events, unavailable: false, now };
  } catch {
    // An outage must not resurrect stale events or look like an empty programme.
    return { events: [], unavailable: true, now };
  }
}
