import type { MetadataRoute } from "next";
import { SITE_URL, routes, type RouteKey } from "@/i18n/config";

// Sist vesentlig endret ved Next.js-migreringen. Oppdater denne når innholdet
// endres vesentlig — den signaliserer til Google at sidene bør re-crawles.
const LAST_MODIFIED = "2026-08-19";

// changeFrequency/priority per rutenøkkel. Både nb- og en-varianten av hver
// side legges ut, med hreflang-alternativer slik at Google kobler dem sammen.
const META: Record<RouteKey, { changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>; priority: number }> = {
  home: { changeFrequency: "weekly", priority: 1.0 },
  events: { changeFrequency: "weekly", priority: 0.9 },
  about: { changeFrequency: "monthly", priority: 0.8 },
  communities: { changeFrequency: "monthly", priority: 0.8 },
  booking: { changeFrequency: "monthly", priority: 0.8 },
  innovationDays: { changeFrequency: "monthly", priority: 0.7 },
  ideaGarage: { changeFrequency: "monthly", priority: 0.7 },
  positions: { changeFrequency: "weekly", priority: 0.6 },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const route of routes) {
    const meta = META[route.key];
    const languages = {
      "nb-NO": `${SITE_URL}${route.nb}`,
      en: `${SITE_URL}${route.en}`,
      "x-default": `${SITE_URL}${route.nb}`,
    };
    for (const locale of ["nb", "en"] as const) {
      entries.push({
        url: `${SITE_URL}${route[locale]}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: meta.changeFrequency,
        priority: meta.priority,
        alternates: { languages },
      });
    }
  }
  return entries;
}
