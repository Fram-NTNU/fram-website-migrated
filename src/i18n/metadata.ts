import type { Metadata } from "next";
import type { Lang, RouteKey } from "./config";
import { alternates } from "./config";

// Bygger konsistent metadata (canonical, hreflang, OpenGraph, Twitter) for en
// side på et gitt språk. Hver side sender inn oversatt tittel/beskrivelse.
export function pageMetadata(opts: {
  key: RouteKey;
  lang: Lang;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const { key, lang, title, description } = opts;
  const image = opts.image ?? "/assets/og-fram.png";
  const a = alternates(key);
  const canonical = lang === "en" ? a.canonicalEn : a.canonicalNb;
  const url = canonical;
  const ogLocale = lang === "en" ? "en_US" : "nb_NO";

  return {
    title,
    description,
    alternates: { canonical, languages: a.languages },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: "FRAM NTNU",
      locale: ogLocale,
      alternateLocale: lang === "en" ? "nb_NO" : "en_US",
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
