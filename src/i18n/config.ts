// ============================================================
// i18n-konfigurasjon for FRAM NTNU
//
// Norsk (nb) er standardspråket og ligger på rot (/om, /booking …).
// Engelsk (en) ligger under /en/… med oversatte slugs (/en/about …).
//
// `routes` er kilden til sannhet for koblingen mellom de to språkene.
// Legg til en ny side ÉN gang her, så fungerer navigasjon, språkvelger,
// hreflang og sitemap automatisk for begge språk.
// ============================================================

export const locales = ["nb", "en"] as const;
export type Lang = (typeof locales)[number];
export const defaultLocale: Lang = "nb";

// Absolutt base-URL for canonical/hreflang.
export const SITE_URL = "https://www.framntnu.no";

// Kanoniske ruter. `nb` er stien på rot, `en` er den oversatte stien under /en.
// `key` brukes internt (i header/footer) for språkuavhengig lenking.
export const routes = [
  { key: "home", nb: "/", en: "/en" },
  { key: "about", nb: "/om", en: "/en/about" },
  { key: "communities", nb: "/miljoer", en: "/en/communities" },
  { key: "booking", nb: "/booking", en: "/en/booking" },
  { key: "events", nb: "/arrangementer", en: "/en/events" },
  { key: "innovationDays", nb: "/innovasjonsdagene", en: "/en/innovasjonsdagene" },
  { key: "ideaGarage", nb: "/idegarasjen", en: "/en/idegarasjen" },
  { key: "positions", nb: "/stillinger", en: "/en/positions" },
] as const;

export type RouteKey = (typeof routes)[number]["key"];

/** Sti for en gitt rute på et gitt språk, f.eks. path("about", "en") → "/en/about". */
export function path(key: RouteKey, lang: Lang): string {
  const route = routes.find((r) => r.key === key);
  if (!route) throw new Error(`Ukjent rute: ${key}`);
  return route[lang];
}

/**
 * Bygger en språkriktig href fra en logisk nb-sti (evt. med #hash).
 * Interne stier oversettes til riktig språk; eksterne/anker/e-post beholdes.
 * localizeHref("/miljoer#kart", "en") → "/en/communities#kart".
 */
export function localizeHref(href: string, lang: Lang): string {
  if (!href.startsWith("/")) return href; // ekstern, mailto, tel, #anker
  const [pathname, hash] = href.split("#");
  const route = routes.find((r) => r.nb === pathname);
  if (!route) return href; // ukjent intern sti – la den stå
  return route[lang] + (hash ? `#${hash}` : "");
}

/**
 * Finner motparten til en gitt pathname på det andre språket.
 * Brukes av språkvelgeren. Returnerer null hvis siden ikke finnes på begge språk.
 */
export function counterpartPath(pathname: string, target: Lang): string | null {
  const clean = pathname.replace(/\/$/, "") || "/";
  const route = routes.find((r) => r.nb === clean || r.en === clean);
  return route ? route[target] : null;
}

/** hreflang-alternativer for Next Metadata `alternates.languages`, per rutenøkkel. */
export function alternates(key: RouteKey) {
  const route = routes.find((r) => r.key === key)!;
  return {
    canonicalNb: `${SITE_URL}${route.nb}`,
    canonicalEn: `${SITE_URL}${route.en}`,
    languages: {
      "nb-NO": `${SITE_URL}${route.nb}`,
      en: `${SITE_URL}${route.en}`,
      "x-default": `${SITE_URL}${route.nb}`,
    },
  };
}
