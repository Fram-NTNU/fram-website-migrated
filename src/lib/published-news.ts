import { cache } from "react";
import { headers } from "next/headers";
import { connection } from "next/server";
import { isNewsItem, type NewsItem } from "./news";

export const publishedNews = cache(async (): Promise<{ news: NewsItem[]; unavailable: boolean }> => {
  await connection();
  const base = process.env.FRAM_PORTAL_API_URL?.replace(/\/$/, "");
  if (!base) return { news: [], unavailable: false };
  try {
    const token = (await headers()).get("x-vercel-oidc-token");
    const requireOidc = process.env.FRAM_BOOKING_REQUIRE_OIDC === "true" || process.env.DEPLOYMENT_ENV === "production" || process.env.VERCEL_ENV === "production";
    const secret = process.env.FRAM_BOOKING_INTEGRATION_SECRET;
    const auth: Record<string, string> = {};
    if (token) auth.Authorization = `Bearer ${token}`;
    if (secret && !requireOidc) auth["x-fram-booking-secret"] = secret;
    const response = await fetch(`${base}/api/v1/news`, { headers: auth, cache: "no-store", signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("News feed unavailable");
    const data: unknown = await response.json();
    if (!data || typeof data !== "object" || !("news" in data) || !Array.isArray(data.news) || !data.news.every(isNewsItem))
      throw new Error("Invalid news feed");
    return { news: data.news.sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at)), unavailable: false };
  } catch { return { news: [], unavailable: true }; }
});
