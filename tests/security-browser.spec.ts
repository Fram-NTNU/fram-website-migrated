import { test, expect } from "@playwright/test";
for (const width of [390, 1440]) {
  test(`Framkompass fallback and CSP at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(() => {
      window.grecaptcha = { ready: (callback: () => void) => callback(), execute: async () => "synthetic-captcha" };
    });
    let submitted = false;
    await page.route("**/api/forslag", async (route) => {
      const payload = route.request().postDataJSON();
      expect(payload.recaptchaToken).toBe("synthetic-captcha");
      submitted = true;
      await route.fulfill({ status: 429, contentType: "application/json", body: JSON.stringify({ error: "For mange forespørsler. Vent litt." }) });
    });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto("/miljoer");
    expect(response?.headers()["content-security-policy"]).toContain("object-src 'none'");
    await page.getByRole("button", { name: "Finn din match" }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("textbox").fill("programmering autonome systemer droner");
    await dialog.getByRole("button", { name: "Foreslå miljøer" }).last().click();
    await expect(dialog.getByText("Forslag til deg")).toBeVisible();
    expect(submitted).toBe(true);
    expect(errors).toEqual([]);
    await page.screenshot({ path: `/tmp/fram-security-kompass-${width}.png`, fullPage: false });
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeAttached();
  });
}
test("portal production scripts carry the per-request nonce", async ({ request }) => {
  test.skip(!process.env.FRAM_SECURITY_PORTAL_URL, "Requires a separate local production portal build");
  for (const path of ["/logg-inn", "/oppsett", "/ingen-tilgang"]) {
    const response = await request.get(`${process.env.FRAM_SECURITY_PORTAL_URL}${path}`);
    const csp = response.headers()["content-security-policy"];
    const nonce = csp.match(/'nonce-([^']+)'/)?.[1];
    expect(nonce).toBeTruthy();
    const html = await response.text();
    const scripts = html.match(/<script\b[^>]*>/g) ?? [];
    expect(scripts.length).toBeGreaterThan(0);
    for (const script of scripts) expect(script).toContain(`nonce="${nonce}"`);
  }
});
