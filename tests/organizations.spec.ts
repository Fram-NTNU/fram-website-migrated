import { expect, test } from "@playwright/test";

test("organization cards open details and keep the website link in the dialog", async ({
  page,
}) => {
  await page.goto("/miljoer");
  const card = page.getByRole("button", { name: /^Les mer om Cogito/ });
  await expect(card).not.toHaveAttribute("href");
  await card.click();
  const dialog = page.getByRole("dialog", { name: "Cogito", exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Cogito" })).toBeVisible();
  await expect(
    dialog.getByText("AI · Prosjekter", { exact: true }),
  ).toBeVisible();
  await expect(
    dialog.getByRole("link", { name: "Besøk nettsiden" }),
  ).toHaveAttribute("href", /^https:\/\//);
  await expect(
    dialog.getByRole("link", { name: "Besøk nettsiden" }),
  ).toHaveAttribute("rel", "noopener noreferrer");
  await expect(
    dialog.locator("dt", { hasText: "Søker medlemmer" }),
  ).toBeVisible();
  if (process.env.FRAM_MILJOER_SCREENSHOTS) {
    await expect
      .poll(() =>
        dialog
          .locator("img")
          .evaluateAll((images) =>
            images.every(
              (image) =>
                (image as HTMLImageElement).complete &&
                (image as HTMLImageElement).naturalWidth > 0,
            ),
          ),
      )
      .toBe(true);
    await page.screenshot({
      path: test.info().outputPath("organization-dialog.png"),
      animations: "disabled",
    });
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeAttached();
  await expect(card).toBeFocused();
});

test("organization dialog contains keyboard focus and closes with the button or backdrop", async ({
  page,
}) => {
  await page.goto("/miljoer");
  const card = page.getByRole("button", { name: /^Les mer om Cogito/ });
  await card.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Cogito", exact: true });
  await expect(
    dialog.getByRole("button", { name: "Lukk miljø" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("link", { name: "Besøk nettsiden" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "Lukk miljø" }),
  ).toBeFocused();
  await dialog.getByRole("heading").click();
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Lukk miljø" }).click();
  await expect(dialog).not.toBeAttached();
  await expect(card).toBeFocused();
  await card.click();
  await page.mouse.click(2, 2);
  await expect(dialog).not.toBeAttached();
  await expect(card).toBeFocused();
});

test("compass suggestions open the matching organization and return focus to its card", async ({
  page,
}) => {
  await page.goto("/miljoer");
  await page.getByRole("button", { name: "Finn din match" }).click();
  const compass = page.getByRole("dialog", { name: /Framkompasset/ });
  await compass.getByRole("button", { name: "kunstig intelligens" }).click();
  await compass
    .getByRole("button", { name: "Les mer om Cogito", exact: true })
    .click();
  const dialog = page.getByRole("dialog", { name: "Cogito", exact: true });
  await expect(dialog).toBeVisible();
  await expect(compass).not.toBeAttached();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeAttached();
  await expect(
    page.getByRole("button", { name: /^Les mer om Cogito/ }),
  ).toBeFocused();
  await expect
    .poll(() => page.evaluate(() => document.body.style.overflow))
    .toBe("");
});

test("recruiting cards display a badge and Ja in their dialog", async ({
  page,
}) => {
  await page.goto("/miljoer");
  const cards = page
    .locator("button.org-card")
    .filter({ has: page.locator(".org-recruiting-badge") });
  test.skip(
    (await cards.count()) === 0,
    "Ingen organisasjoner rekrutterer i denne datakilden.",
  );
  await expect(
    cards.first().getByText("Søker medlemmer", { exact: true }),
  ).toBeVisible();
  if (process.env.FRAM_MILJOER_SCREENSHOTS)
    await page.screenshot({
      path: test.info().outputPath("organization-recruiting-card.png"),
      animations: "disabled",
    });
  await cards.first().click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog
      .locator(".org-facts > div")
      .filter({ has: page.locator("dt", { hasText: "Søker medlemmer" }) })
      .locator("dd"),
  ).toHaveText("Ja");
});

test("cards without a recruiting badge do not claim to recruit", async ({
  page,
}) => {
  await page.goto("/miljoer");
  const card = page
    .locator("button.org-card")
    .filter({ hasNot: page.locator(".org-recruiting-badge") })
    .first();
  await card.click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog
      .locator(".org-facts > div")
      .filter({ has: page.locator("dt", { hasText: "Søker medlemmer" }) })
      .locator("dd"),
  ).toHaveText(/^(Nei|Ikke oppgitt)$/);
});

test("public detail text preserves paragraphs in the modal", async ({page}) => {
  test.skip(!process.env.FRAM_MILJOER_DETAILS_FIXTURE, "Requires public details fixture");
  await page.goto("/miljoer");
  const card = page.getByRole("button", {name: /^Les mer om Cogito/});
  await expect(card).not.toContainText("Vi lærer gjennom prosjekter.");
  await card.click();
  const details=page.getByRole("dialog", {name:"Cogito",exact:true}).locator(".event-description");
  await expect(details).toHaveText("Vi lærer gjennom prosjekter.\nAlle studenter er velkomne til å bli med.");
  await expect(details).toHaveCSS("white-space","pre-wrap");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
