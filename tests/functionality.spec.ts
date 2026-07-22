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
