import { afterEach, test } from "node:test";
import assert from "node:assert/strict";
import { framkompassLimit } from "../src/lib/framkompass-rate-limit.ts";
const originalFetch = globalThis.fetch;
const env = { ...process.env };
afterEach(() => { globalThis.fetch = originalFetch; process.env = { ...env }; });
const request = () => new Request("https://fram.example.test/api/forslag", { headers: { "x-forwarded-for": "spoofed, trusted-client" } });
function configure() { process.env.FRAM_PORTAL_API_URL = "https://portal.example.test"; process.env.FRAM_BOOKING_INTEGRATION_SECRET = "test-only"; process.env.DEPLOYMENT_ENV = "development"; delete process.env.VERCEL_ENV; delete process.env.FRAM_BOOKING_REQUIRE_OIDC; }
test("unconfigured rate protection fails closed", async () => {
  delete process.env.FRAM_PORTAL_API_URL;
  globalThis.fetch = async () => { throw new Error("must not reach provider"); };
  assert.equal((await framkompassLimit(request(), "request"))?.status, 503);
});
test("shared counter persists across independent website module instances", async () => {
  configure(); let hits = 0;
  globalThis.fetch = async (_url, options) => {
    hits++; const h = options?.headers;
    assert.equal(h["x-fram-client-ip"], "trusted-client");
    assert.equal(h["x-fram-booking-secret"], "test-only");
    return Response.json({ allowed: hits <= 5 }, { status: hits <= 5 ? 200 : 429, headers: { "Retry-After": "234" } });
  };
  const other = await import("../src/lib/framkompass-rate-limit.ts?instance=second");
  for (let i = 0; i < 5; i++) assert.equal(await (i % 2 ? other.framkompassLimit : framkompassLimit)(request(), "request", "test-captcha"), null);
  const denied = await other.framkompassLimit(request(), "request", "test-captcha");
  assert.equal(denied?.status, 429); assert.equal(denied?.headers.get("retry-after"), "234");
});
test("Vercel production never falls back to a shared secret", async () => {
  configure(); process.env.VERCEL_ENV = "production"; let called = false;
  globalThis.fetch = async () => { called = true; return Response.json({ allowed: true }); };
  assert.equal((await framkompassLimit(request(), "generation"))?.status, 503); assert.equal(called, false);
});
test("rate backend outages fail closed", async () => {
  configure(); globalThis.fetch = async () => { throw new Error("offline"); };
  assert.equal((await framkompassLimit(request(), "generation"))?.status, 503);
});
