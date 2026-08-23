import type { MetadataRoute } from "next";

const BASE = "https://www.framntnu.no";

// Sist vesentlig endret ved Next.js-migreringen. Oppdater denne når innholdet
// endres vesentlig — den signaliserer til Google at sidene bør re-crawles.
const LAST_MODIFIED = "2026-07-28";

type Entry = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

const PAGES: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/arrangementer", changeFrequency: "weekly", priority: 0.9 },
  { path: "/om", changeFrequency: "monthly", priority: 0.8 },
  { path: "/miljoer", changeFrequency: "monthly", priority: 0.8 },
  { path: "/booking", changeFrequency: "monthly", priority: 0.8 },
  { path: "/innovasjonsdagene", changeFrequency: "monthly", priority: 0.7 },
  { path: "/idegarasjen", changeFrequency: "monthly", priority: 0.7 },
  { path: "/teknologihallen", changeFrequency: "monthly", priority: 0.7 },
  { path: "/stillinger", changeFrequency: "weekly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
