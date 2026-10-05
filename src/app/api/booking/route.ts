const portalUrl = () => process.env.FRAM_PORTAL_API_URL?.replace(/\/$/, "");

async function forward(request: Request, path: string, init?: RequestInit) {
  const base = portalUrl();
  const secret = process.env.FRAM_BOOKING_INTEGRATION_SECRET;
  const oidcToken = request.headers.get("x-vercel-oidc-token");
  const oidcRequired =
    process.env.FRAM_BOOKING_REQUIRE_OIDC === "true" ||
    process.env.DEPLOYMENT_ENV === "production" || process.env.VERCEL_ENV === "production";
  if (!base || (oidcRequired ? !oidcToken : !secret && !oidcToken))
    return Response.json(
      { error: "Booking er ikke konfigurert ennå. Kontakt framntnu@gmail.com." },
      { status: 503 },
    );
  const clientIp =
    request.headers
      .get("x-forwarded-for")
      ?.split(",")
      .at(-1)
      ?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-fram-client-ip": clientIp,
  };
  if (secret && !oidcRequired) headers["x-fram-booking-secret"] = secret;
  if (oidcToken) headers.Authorization = `Bearer ${oidcToken}`;
  const response = await fetch(`${base}${path}`, {
    ...init,
    headers: { ...headers, ...(init?.headers ?? {}) },
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  return new Response(await response.text(), {
    status: response.status,
    headers: { "Content-Type": response.headers.get("content-type") ?? "application/json" },
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("view") === "availability") {
    const params = new URLSearchParams({
      from: url.searchParams.get("from") ?? "",
      to: url.searchParams.get("to") ?? "",
    });
    return forward(request, `/api/v1/booking/availability?${params}`);
  }
  return forward(request, "/api/v1/booking/rooms");
}

export async function POST(request: Request) {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declared) && declared > 16384)
    return Response.json({ error: "Forespørselen er for stor." }, { status: 413 });
  const body = await request.arrayBuffer();
  if (body.byteLength > 16384)
    return Response.json({ error: "Forespørselen er for stor." }, { status: 413 });
  return forward(request, "/api/v1/booking/requests", {
    method: "POST",
    body,
  });
}
