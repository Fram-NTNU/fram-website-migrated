import { headers } from "next/headers";
import { connection } from "next/server";
import type { Organization } from "@/components/miljoer-explorer";
import { organizations } from "./organizations";

function isOrganization(value: unknown): value is Organization {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  const validUrl = (url: unknown, local = false) =>
    typeof url === "string" &&
    (!url ||
      (local && url.startsWith("/assets/")) ||
      (/^https?:\/\//i.test(url) && URL.canParse(url)));
  return (
    typeof row.slug === "string" &&
    typeof row.name === "string" &&
    Boolean(row.name) &&
    typeof row.category === "string" &&
    typeof row.description === "string" &&
    (row.longDescription === undefined ||
      typeof row.longDescription === "string") &&
    typeof row.recruiting === "boolean" &&
    ["yellow", "blue", "red", "teal"].includes(String(row.accent)) &&
    validUrl(row.href) &&
    validUrl(row.logo, true) &&
    validUrl(row.photo, true) &&
    typeof row.logoAlt === "string" &&
    typeof row.photoAlt === "string" &&
    (row.media === undefined ||
      ["dark", "dark-navy", "deeper"].includes(String(row.media))) &&
    (row.logoSize === undefined ||
      ["tall", "big", "big-tall", "xl"].includes(String(row.logoSize))) &&
    (row.photoPosition === undefined ||
      typeof row.photoPosition === "string") &&
    (row.photoContain === undefined || typeof row.photoContain === "boolean") &&
    (row.spin === undefined || typeof row.spin === "boolean")
  );
}

export async function publishedOrganizations(): Promise<{
  organizations: Organization[];
  unavailable: boolean;
}> {
  await connection();
  const base = process.env.FRAM_PORTAL_API_URL?.replace(/\/$/, "");
  if (!base) return { organizations, unavailable: false };
  try {
    const token = (await headers()).get("x-vercel-oidc-token");
    const requireOidc =
      process.env.FRAM_BOOKING_REQUIRE_OIDC === "true" ||
      process.env.DEPLOYMENT_ENV === "production" ||
      process.env.VERCEL_ENV === "production";
    const secret = process.env.FRAM_BOOKING_INTEGRATION_SECRET;
    const auth: Record<string, string> = {};
    if (token) auth.Authorization = `Bearer ${token}`;
    if (secret && !requireOidc) auth["x-fram-booking-secret"] = secret;
    const response = await fetch(`${base}/api/v1/organizations`, {
      headers: auth,
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("Organization feed unavailable");
    const data: unknown = await response.json();
    if (
      !data ||
      typeof data !== "object" ||
      !("organizations" in data) ||
      !Array.isArray(data.organizations) ||
      !data.organizations.every(isOrganization)
    )
      throw new Error("Invalid organization feed");
    return { organizations: data.organizations, unavailable: false };
  } catch {
    // Do not invent recruitment status or resurrect archived cards during an outage.
    return { organizations: [], unavailable: true };
  }
}
