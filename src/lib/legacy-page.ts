import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

export const LEGACY_ROUTES = {
  miljoer: "miljoer.html",
} as const;

export type LegacyRoute = keyof typeof LEGACY_ROUTES;

export type LegacyScript = {
  src?: string;
  content: string;
  type?: string;
  async: boolean;
  defer: boolean;
};

export type LegacyPageData = {
  title: string;
  bodyClass: string;
  headCss: Array<
    | { kind: "style"; content: string }
    | { kind: "stylesheet"; href: string }
  >;
  beforeHeader: string;
  header: string;
  content: string;
  footer: string;
  afterFooter: string;
  scripts: LegacyScript[];
  metadata: Metadata;
};

function attr(attributes: string, name: string): string | undefined {
  const match = attributes.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return match?.[1];
}

function normalizePublicUrl(value: string | undefined): string | undefined {
  if (!value || /^(?:https?:)?\/\//i.test(value) || value.startsWith("mailto:") || value.startsWith("#")) return value;
  return value.startsWith("/") ? value : `/${value}`;
}

function metaContent(head: string, key: string, attribute = "name"): string | undefined {
  const tags = head.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const attributes = tag.slice(5, -1);
    if (attr(attributes, attribute)?.toLowerCase() === key.toLowerCase()) return attr(attributes, "content");
  }
}

function extractOuter(html: string, tag: "nav" | "footer", predicate?: RegExp) {
  const openTags = [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "gi"))];
  const opening = openTags.find((match) => !predicate || predicate.test(match[0]));
  if (!opening || opening.index === undefined) return undefined;
  const endToken = `</${tag}>`;
  const end = html.toLowerCase().indexOf(endToken, opening.index);
  if (end < 0) return undefined;
  return { start: opening.index, end: end + endToken.length, html: html.slice(opening.index, end + endToken.length) };
}

export function loadLegacyPage(fileName: string): LegacyPageData {
  const filePath = path.join(process.cwd(), "legacy-pages", fileName);
  const document = fs.readFileSync(filePath, "utf8");
  const head = document.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const bodyMatch = document.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) throw new Error(`Legacy page has no body: ${fileName}`);

  const scripts: LegacyScript[] = [];
  document.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (_tag, attributes: string, content: string) => {
    const src = normalizePublicUrl(attr(attributes, "src"));
    if (src === "/_vercel/insights/script.js") return "";
    scripts.push({
      src,
      content,
      type: attr(attributes, "type"),
      async: /\basync\b/i.test(attributes),
      defer: /\bdefer\b/i.test(attributes),
    });
    return "";
  });

  const body = bodyMatch[2].replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const header = extractOuter(body, "nav", /class=["'][^"']*\btop\b/i);
  const footer = extractOuter(body, "footer");
  const beforeHeader = header ? body.slice(0, header.start) : "";
  const middleStart = header?.end ?? 0;
  const middleEnd = footer?.start ?? body.length;
  const content = body.slice(middleStart, middleEnd);
  const afterFooter = footer ? body.slice(footer.end) : "";

  const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "FRAM NTNU";
  const description = metaContent(head, "description");
  const canonicalTag = head.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i)?.[0];
  const canonical = canonicalTag ? attr(canonicalTag, "href") : undefined;
  const ogImage = metaContent(head, "og:image", "property");
  const headCss: LegacyPageData["headCss"] = [];
  for (const match of head.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>|<link\b([^>]*)>/gi)) {
    if (match[1] !== undefined) {
      headCss.push({ kind: "style", content: match[1] });
      continue;
    }
    if (attr(match[2], "rel")?.toLowerCase() !== "stylesheet") continue;
    const href = normalizePublicUrl(attr(match[2], "href"));
    if (href) headCss.push({ kind: "stylesheet", href });
  }

  return {
    title,
    bodyClass: attr(bodyMatch[1], "class") ?? "",
    headCss,
    beforeHeader,
    header: header?.html ?? "",
    content,
    footer: footer?.html ?? "",
    afterFooter,
    scripts,
    metadata: {
      title,
      description,
      alternates: canonical ? { canonical } : undefined,
      openGraph: {
        title: metaContent(head, "og:title", "property") ?? title,
        description: metaContent(head, "og:description", "property") ?? description,
        url: metaContent(head, "og:url", "property") ?? canonical,
        images: ogImage ? [ogImage] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: metaContent(head, "twitter:title") ?? title,
        description: metaContent(head, "twitter:description") ?? description,
        images: metaContent(head, "twitter:image") ? [metaContent(head, "twitter:image")!] : undefined,
      },
    },
  };
}
