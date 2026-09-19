import type { MetadataRoute } from "next";

const BASE = "https://www.framntnu.no";

// Standarddato: sist vesentlig endret ved Next.js-migreringen. Sider som er
// endret senere setter sin egen `lastModified` nedenfor — det signaliserer til
// Google at akkurat de sidene bør re-crawles, uten å «lyve» om resten.
const DEFAULT_MODIFIED = "2026-07-28";

type Entry = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
  // Overstyrer DEFAULT_MODIFIED for sider som er endret etter migreringen.
  lastModified?: string;
};

const PAGES: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0, lastModified: "2026-08-23" },
  { path: "/arrangementer", changeFrequency: "weekly", priority: 0.9 },
  { path: "/om", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-08-23" },
  { path: "/miljoer", changeFrequency: "monthly", priority: 0.8 },
  { path: "/booking", changeFrequency: "monthly", priority: 0.8 },
  { path: "/innovasjonsdagene", changeFrequency: "monthly", priority: 0.7 },
  { path: "/idegarasjen", changeFrequency: "monthly", priority: 0.7 },
  { path: "/teknologihallen", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-08-23" },
  { path: "/stillinger", changeFrequency: "weekly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: p.lastModified ?? DEFAULT_MODIFIED,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
