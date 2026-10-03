export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  body: string;
  source_url: string;
  published_at: string;
  organization_name: string;
  images: { url: string; alt: string }[];
};
export const newsDate = (value: string) => new Intl.DateTimeFormat("nb-NO", {
  day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Oslo",
}).format(new Date(value));

const safeUrl = (value: unknown) => {
  if (typeof value !== "string") return false;
  try { return ["http:", "https:"].includes(new URL(value).protocol); } catch { return false; }
};
export function isNewsItem(value: unknown): value is NewsItem {
  if (!value || typeof value !== "object") return false;
  const row = value as NewsItem;
  return typeof row.id === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(row.id) &&
    [row.title, row.summary, row.body, row.organization_name].every((text) => typeof text === "string") &&
    typeof row.published_at === "string" && Number.isFinite(Date.parse(row.published_at)) &&
    (row.source_url === "" || safeUrl(row.source_url)) &&
    Array.isArray(row.images) && row.images.length <= 10 && row.images.every((image) =>
      image && safeUrl(image.url) && typeof image.alt === "string" && Boolean(image.alt.trim()));
}
