"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/i18n/config";
import { counterpartPath, path } from "@/i18n/config";
import { ui } from "@/i18n/ui";

// Segmentert NO/EN-veksler: begge språk vises, det aktive er uthevet, og det
// andre er en lenke til samme side på motsatt språk (faller tilbake til
// forsiden hvis motparten ikke finnes).
const SEGMENTS: Array<{ lang: Lang; short: string; flag: string }> = [
  { lang: "nb", short: "NO", flag: "🇳🇴" },
  { lang: "en", short: "EN", flag: "🇬🇧" },
];

export function LanguageSwitcher({ lang }: { lang: Lang }) {
  const pathname = usePathname() ?? "/";
  const t = ui[lang].langSwitch;

  return (
    <div
      role="group"
      aria-label={t.label}
      className="lang-switch inline-flex items-center gap-0.5 rounded-full border border-[var(--line)] bg-[var(--bg-soft)] p-[3px] max-[900px]:w-full max-[900px]:justify-center"
    >
      {SEGMENTS.map(({ lang: seg, short, flag }) => {
        const active = seg === lang;
        const base =
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] leading-none tracking-[.02em] no-underline select-none [transition:background-color_.2s,color_.2s,box-shadow_.2s] max-[900px]:flex-1 max-[900px]:justify-center max-[900px]:py-2 max-[900px]:text-sm";

        if (active) {
          return (
            <span
              key={seg}
              aria-current="true"
              className={`${base} bg-[var(--ink)] font-bold text-[var(--bg)] shadow-[0_1px_2px_rgba(0,0,0,.18)]`}
            >
              <span aria-hidden="true" className="text-[13px] leading-none">{flag}</span>
              {short}
            </span>
          );
        }

        const href = counterpartPath(pathname, seg) ?? path("home", seg);
        return (
          <Link
            key={seg}
            href={href}
            hrefLang={seg}
            aria-label={seg === "en" ? t.ariaToEnglish : t.ariaToNorwegian}
            className={`${base} font-semibold text-[var(--ink-soft)] hover:bg-[color-mix(in_oklab,var(--ink)_7%,transparent)] hover:text-[var(--ink)]`}
          >
            <span aria-hidden="true" className="text-[13px] leading-none opacity-70">{flag}</span>
            {short}
          </Link>
        );
      })}
    </div>
  );
}
