"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/i18n/config";

const copy = {
  nb: {
    facilitator: "Fasilitator",
    engageLead:
      "Senter for fremragende utdanning og fasilitator for innovasjonsmiljøet ved NTNU. Kartet under viser økosystemet av studentorganisasjoner, miljøer og muligheter.",
    readMore: "Les mer →",
    mapTitle: "Kart over organisasjonene",
    activateMap: "Aktiver kartet",
    exploreCta: "Trykk for å utforske økosystemet",
  },
  en: {
    facilitator: "Facilitator",
    engageLead:
      "Centre for Excellence in Education and facilitator for the innovation community at NTNU. The map below shows the ecosystem of student organisations, communities and opportunities.",
    readMore: "Read more →",
    mapTitle: "Map of the organisations",
    activateMap: "Activate the map",
    exploreCta: "Tap to explore the ecosystem",
  },
} as const satisfies Record<Lang, unknown>;

export function MiljoerMap({ lang = "nb" }: { lang?: Lang } = {}) {
  const t = copy[lang];
  const shellRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [overlayGone, setOverlayGone] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mobile = window.matchMedia("(max-width:760px)").matches;
    if (reduced || mobile) {
      const frame = requestAnimationFrame(() => {
        setRevealed(true);
        setOverlayGone(true);
      });
      return () => cancelAnimationFrame(frame);
    }
    let revealTimer: number | undefined;
    let removeTimer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          revealTimer = window.setTimeout(() => {
            setRevealed(true);
            removeTimer = window.setTimeout(() => setOverlayGone(true), 2000);
          }, 1500);
        }
      },
      { threshold: 0, rootMargin: "-35% 0px -35% 0px" },
    );
    observer.observe(shell);
    return () => {
      observer.disconnect();
      if (revealTimer) window.clearTimeout(revealTimer);
      if (removeTimer) window.clearTimeout(removeTimer);
    };
  }, []);
  const triangles = Array.from({ length: 45 }, (_, index) => {
    const row = Math.floor(index / 9),
      column = index % 9,
      diagonal = row + column;
    const colors = ["#FFD130", "#E36672", "#47B99F", "#1385B3"];
    const color = colors[Math.min(3, Math.floor((diagonal / 13) * 4))];
    const delay = (diagonal / 12) * 0.9;
    return (
      <div key={index} className="relative [transform-style:preserve-3d]">
        <span
          className={`absolute -inset-px origin-top [clip-path:polygon(0_0,100%_0,0_100%)] [backface-visibility:hidden] [transition:transform_1.05s_cubic-bezier(.62,0,.22,1),opacity_1.05s_ease] ${revealed ? "opacity-0 [transform:rotateX(-102deg)]" : "opacity-100 [transform:rotateX(0deg)]"}`}
          style={{
            background: `linear-gradient(135deg,rgba(255,255,255,.34),rgba(255,255,255,.04) 60%,rgba(0,0,0,.04)),${color}`,
            transitionDelay: `${delay.toFixed(3)}s`,
          }}
        />
        <span
          className={`absolute -inset-px origin-bottom [clip-path:polygon(100%_0,100%_100%,0_100%)] [backface-visibility:hidden] [transition:transform_1.05s_cubic-bezier(.62,0,.22,1),opacity_1.05s_ease] ${revealed ? "opacity-0 [transform:rotateX(102deg)]" : "opacity-100 [transform:rotateX(0deg)]"}`}
          style={{
            background: `linear-gradient(135deg,rgba(0,0,0,.02),rgba(0,0,0,.10) 55%,rgba(0,0,0,.22)),${color}`,
            transitionDelay: `${(delay + 0.06).toFixed(3)}s`,
          }}
        />
      </div>
    );
  });
  return (
    <section
      id="kart"
      className="border-b border-[var(--line)] pt-12 pb-[110px] max-[760px]:border-b-0 max-[760px]:p-0"
    >
      <div className="mx-auto max-w-[1640px] px-8 max-[760px]:p-0">
        <div className="overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--bg-soft)] shadow-[0_14px_40px_-28px_rgba(0,0,0,.4)] max-[760px]:rounded-none max-[760px]:border-x-0">
          <div className="flex items-center gap-[22px] border-b border-[var(--line)] bg-[var(--card)] px-[26px] py-5 max-[640px]:flex-wrap max-[640px]:gap-3.5 max-[640px]:px-[18px] max-[640px]:py-4">
            {/* Plain img is retained deliberately during visual-parity migration. */}{" "}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logos/engage.webp"
              alt="SFU Engage"
              className="h-[94px] w-auto flex-none max-[640px]:h-[66px]"
            />
            <div className="min-w-0 flex-1">
              <div className="mb-[5px] flex items-center gap-[7px] font-mono text-[10px] tracking-[.12em] text-[var(--muted)] uppercase before:h-1.5 before:w-1.5 before:flex-none before:rounded-full before:bg-[var(--blue)]">
                {t.facilitator}
              </div>
              <div className="text-base leading-[normal] font-bold tracking-[.01em] text-[var(--ink)]">
                SFU Engage
              </div>
              <p className="mt-[3px] mb-0 text-[13.5px] leading-[1.45] text-[var(--ink-soft)]">
                {t.engageLead}
              </p>
            </div>
            <a
              href="https://engage-centre.no"
              target="_blank"
              rel="noopener"
              className="flex-none text-sm leading-[normal] font-semibold whitespace-nowrap text-[var(--ink)] no-underline hover:underline max-[640px]:w-full"
            >
              {t.readMore}
            </a>
          </div>
          <div className="relative overflow-hidden bg-[var(--bg-soft)]">
            <div ref={shellRef} className="relative [perspective:1700px]">
              <iframe
                src="https://app.atlas.co/shared/0s38wVERSNnDjC86AZRL?index=0"
                title={t.mapTitle}
                loading="eager"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className={`block h-[600px] w-full border-0 [transform-origin:center] [transition:filter_1s_ease_.25s,opacity_1s_ease_.25s,transform_1.2s_ease_.25s] ${revealed ? "opacity-100 [filter:none] [transform:scale(1)]" : "opacity-60 [filter:grayscale(.7)_brightness(.98)_blur(2px)] [transform:scale(1.012)]"}`}
              />
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 z-[1] bg-[rgba(22,24,29,.42)] backdrop-saturate-[.35] backdrop-brightness-[.92] [transition:opacity_.35s_ease] ${active ? "opacity-0" : "opacity-100"}`}
              />
              {!overlayGone && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-[2] grid grid-cols-9 grid-rows-5 [transform-style:preserve-3d] max-[760px]:hidden"
                >
                  {triangles}
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label={t.activateMap}
              onClick={() => setActive(true)}
              className={`group absolute inset-0 z-[4] flex h-full w-full cursor-pointer items-center justify-center border-0 bg-transparent p-0 font-sans [transition:opacity_.3s_ease] ${active ? "pointer-events-none opacity-0" : "opacity-100"}`}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--ink)] px-6 py-3.5 text-[15px] font-semibold tracking-[.01em] text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,.5)] [transition:transform_.2s_ease] before:h-2 before:w-2 before:flex-none before:rounded-full before:bg-[var(--teal)] group-hover:[transform:translateY(-2px)]">
                {t.exploreCta}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
