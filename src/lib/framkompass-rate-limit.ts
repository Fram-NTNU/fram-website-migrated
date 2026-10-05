// Shared counters live in the portal database; outages fail closed.
export async function framkompassLimit(request: Request, scope: "request" | "generation", recaptchaToken?: string): Promise<Response | null> {
  const base = process.env.FRAM_PORTAL_API_URL?.replace(/\/$/, "");
  const oidc = request.headers.get("x-vercel-oidc-token");
  const required = process.env.FRAM_BOOKING_REQUIRE_OIDC === "true" || process.env.DEPLOYMENT_ENV === "production" || process.env.VERCEL_ENV === "production";
  const secret = process.env.FRAM_BOOKING_INTEGRATION_SECRET;
  if (!base || (required ? !oidc : !oidc && !secret))
    return Response.json({ error: "Framkompasset er midlertidig utilgjengelig." }, { status: 503 });
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-fram-client-ip": request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() || "unknown",
  };
  if (oidc) headers.Authorization = `Bearer ${oidc}`;
  if (secret && !required) headers["x-fram-booking-secret"] = secret;
  try {
    const response = await fetch(`${base}/api/v1/framkompass/rate-limit`, {
      method: "POST", headers, body: JSON.stringify({ scope, recaptchaToken }), cache: "no-store", signal: AbortSignal.timeout(15000),
    });
    if (response.ok && (await response.json()).allowed === true) return null;
    return Response.json({ error: response.status === 429 ? "For mange forespørsler. Vent litt." : "Framkompasset er midlertidig utilgjengelig." },
      { status: response.status === 429 ? 429 : 503, headers: { "Retry-After": response.headers.get("retry-after") ?? "300" } });
  } catch {
    return Response.json({ error: "Framkompasset er midlertidig utilgjengelig." }, { status: 503 });
  }
}
