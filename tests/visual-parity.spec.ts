import { expect, test } from "@playwright/test";

const routes = [
  ["home", "/"],
  ["arrangementer", "/arrangementer"],
  ["booking", "/booking"],
  ["idegarasjen", "/idegarasjen"],
  ["innovasjonsdagene", "/innovasjonsdagene"],
  ["miljoer", "/miljoer"],
  ["om", "/om"],
  ["stillinger", "/stillinger"],
  ["404", "/denne-siden-finnes-ikke"],
] as const;

const widths = [375, 768, 1024, 1440] as const;

test.describe("visual parity", () => {
  for (const [name, route] of routes) {
    for (const width of widths) {
      test(`${name} at ${width}px`, async ({ page }, testInfo) => {
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.addInitScript(() => {
          const nativeTimeout = window.setTimeout.bind(window);
          window.setInterval = (() => 0) as unknown as typeof window.setInterval;
          window.setTimeout = ((handler: TimerHandler, timeout = 0, ...args: unknown[]) => {
            if (timeout >= 1_000) return 0;
            return nativeTimeout(handler, timeout, ...args);
          }) as typeof window.setTimeout;
        });
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.evaluate(() => document.fonts.ready);
        await page.addStyleTag({
          content: "*,*::before,*::after{animation-delay:0s!important;animation-duration:0s!important;transition:none!important} html{scroll-behavior:auto!important}",
        });
        await page.waitForTimeout(500);
        const snapshotName = `${name}-${width}.png`;
        // Asset availability is covered by functionality.spec.ts. Masking media
        // keeps visual parity focused on layout and typography instead of CDN timing.
        const mask = [page.locator("iframe"), page.locator("video"), page.locator("img")];
        if (testInfo.project.name === "baseline") {
          await page.screenshot({
            path: testInfo.snapshotPath(snapshotName),
            fullPage: true,
            animations: "disabled",
            caret: "hide",
            mask,
          });
          return;
        }
        const actual = await page.screenshot({
          fullPage: true,
          animations: "disabled",
          caret: "hide",
          mask,
        });
        expect(actual).toMatchSnapshot(snapshotName, { maxDiffPixelRatio: 0.005 });
      });
    }
  }
});
