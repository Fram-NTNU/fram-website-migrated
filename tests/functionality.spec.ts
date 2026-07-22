import { expect, test } from "@playwright/test";

const expectedRoutes = [
  "/",
  "/arrangementer",
  "/booking",
  "/idegarasjen",
  "/innovasjonsdagene",
  "/miljoer",
  "/om",
  "/stillinger",
];

test("all public routes render without browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of expectedRoutes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("nav.top")).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("unknown routes use the preserved 404 page", async ({ page }) => {
  const response = await page.goto("/ukjent-side");
  expect(response?.status()).toBe(404);
  await expect(page.getByText("Denne ideen skalerte ikke helt.")).toBeVisible();
});

test("mobile menu opens and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/booking");
  const burger = page.locator(".nav-burger");
  await expect(burger).toBeVisible();
  await burger.click();
  await expect(burger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(burger).toHaveAttribute("aria-expanded", "false");
});

test("Slack dialog opens and closes", async ({ page }) => {
  await page.goto("/booking");
  await page.getByRole("button", { name: "Slack" }).click();
  await expect(page.locator("#slack-modal")).toHaveClass(/open/);
  await page.keyboard.press("Escape");
  await expect(page.locator("#slack-modal")).not.toBeAttached();
});

test("shared event data still renders event cards", async ({ page }) => {
  await page.goto("/arrangementer");
  await expect(page.locator(".ev-card")).toHaveCount(6);
});

test("all local links and referenced media resolve", async ({ page, request, baseURL }) => {
  const localOrigin = new URL(baseURL!).origin;
  const urls = new Set<string>(["/robots.txt", "/sitemap.xml"]);

  for (const route of expectedRoutes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const references = await page.locator("a[href], img[src], video[src], source[src]").evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("href") ?? element.getAttribute("src") ?? ""),
    );
    for (const reference of references) {
      if (!reference || reference.startsWith("#") || reference.startsWith("mailto:")) continue;
      const url = new URL(reference, page.url());
      if (url.origin === localOrigin) urls.add(`${url.pathname}${url.search}`);
    }
  }

  for (const url of urls) {
    const response = await request.get(url);
    expect(response.status(), url).toBeLessThan(400);
  }
});

test("redirects, metadata and response headers are preserved", async ({ page, request, baseURL }) => {
  const redirects = [
    ["/FramNTNU", "/"],
    ["/services-4", "/idegarasjen"],
    ["/about-3-1", "/om"],
    ["/about", "/booking"],
    ["/blank-page", "/booking"],
    ["/medlemmer-1", "/miljoer"],
  ] as const;
  for (const [source, destination] of redirects) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status(), source).toBe(308);
    expect(new URL(response.headers().location, baseURL).pathname, source).toBe(destination);
  }

  for (const route of expectedRoutes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.headers()["x-content-type-options"], route).toBe("nosniff");
    expect(response?.headers()["x-frame-options"], route).toBe("SAMEORIGIN");
    await expect(page.locator('meta[name="description"]'), route).toHaveAttribute("content", /.+/);
    await expect(page.locator('link[rel="canonical"]'), route).toHaveAttribute(
      "href",
      route === "/" ? "https://www.framntnu.no" : `https://www.framntnu.no${route}`,
    );
  }

  const asset = await request.get("/assets/favicon-32.png");
  expect(asset.headers()["cache-control"]).toContain("max-age=31536000");
  expect(asset.headers()["cache-control"]).toContain("immutable");
});

test("external embeds and analytics integrations are preserved", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('script[src="/_vercel/speed-insights/script.js"]')).toBeAttached();
  await expect(page.locator('script[src="//gc.zgo.at/count.js"]')).toBeAttached();
  expect(
    await page.evaluate(
      () =>
        (window as Window & { goatcounter?: { endpoint?: string } }).goatcounter
          ?.endpoint,
    ),
  ).toBe("https://framntnu.goatcounter.com/count");
  await expect(page.locator('a[href*="link.mazemap.com"]')).toHaveCount(6);

  await page.goto("/idegarasjen");
  await expect(page.locator('iframe[src*="use.mazemap.com"]')).toBeAttached();

  await page.goto("/miljoer");
  await expect(page.locator('iframe[src*="app.atlas.co"]')).toBeAttached();

  await page.goto("/innovasjonsdagene");
  await expect(page.locator('iframe[src*="youtube-nocookie.com"]')).toBeAttached();
});

test("Framkompasset preserves GoatCounter events", async ({ page }) => {
  await page.route("**/gc.zgo.at/count.js", (route) =>
    route.fulfill({ contentType: "application/javascript", body: "" }),
  );
  await page.addInitScript(() => {
    const analyticsWindow = window as Window & {
      goatcounter?: { count: (event: { path: string }) => void };
      trackedPaths?: string[];
    };
    analyticsWindow.trackedPaths = [];
    analyticsWindow.goatcounter = {
      count: (event) => analyticsWindow.trackedPaths?.push(event.path),
    };
  });
  await page.goto("/miljoer");
  await page.getByRole("button", { name: "Finn din match" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "kunstig intelligens" }).click();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as Window & { trackedPaths?: string[] }).trackedPaths ?? [],
      ),
    )
    .toEqual(["framkompasset-open", "framkompasset-run"]);
});

test("API preserves method, origin and validation errors", async ({ request, baseURL }) => {
  const methodResponse = await request.get("/api/forslag");
  expect(methodResponse.status()).toBe(405);
  expect(methodResponse.headers()["allow"]).toBe("POST");

  const originResponse = await request.post("/api/forslag", { data: { interesser: "AI" } });
  expect(originResponse.status()).toBe(403);

  const shortResponse = await request.post("/api/forslag", {
    data: { interesser: "a" },
    headers: { Origin: baseURL!, "X-Forwarded-For": "198.51.100.210" },
  });
  expect(shortResponse.status()).toBe(400);

  const longResponse = await request.post("/api/forslag", {
    data: { interesser: "a".repeat(2001) },
    headers: { Origin: baseURL!, "X-Forwarded-For": "198.51.100.211" },
  });
  expect(longResponse.status()).toBe(413);
});

test("API preserves malformed-body and rate-limit behavior", async ({ request, baseURL }) => {
  const malformedResponse = await request.post("/api/forslag", {
    data: "{",
    headers: {
      "Content-Type": "application/json",
      Origin: baseURL!,
      "X-Forwarded-For": "198.51.100.220",
    },
  });
  expect(malformedResponse.status()).toBe(400);
  await expect(malformedResponse.json()).resolves.toEqual({ error: "Mangler «interesser»." });

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const response = await request.post("/api/forslag", {
      data: { interesser: "a" },
      headers: {
        Origin: baseURL!,
        "X-Forwarded-For": "198.51.100.221",
      },
    });
    expect(response.status()).toBe(attempt === 6 ? 429 : 400);
  }
});

test("Framkompasset shows suggestions and closes with Escape", async ({ page }) => {
  await page.goto("/miljoer");
  await page.getByRole("button", { name: "Finn din match" }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "kunstig intelligens" }).click();
  await expect(dialog.getByText("Forslag til deg")).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Cogito" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeAttached();
});
