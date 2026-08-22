"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/i18n/config";

const slides = {
  nb: [
    { src: "/assets/koble-2026-sax.webp", alt: "Koble 2026 — saxofonist på scenen", year: "2026" },
    { src: "/assets/koble-2026-vinnere.webp", alt: "Koble 2026 — prisvinnere på scenen", year: "2026" },
    { src: "/assets/koble-2025.webp", alt: "Koble 2025 på Frimurerlogen", year: "2025" },
  ],
  en: [
    { src: "/assets/koble-2026-sax.webp", alt: "Koble 2026 — saxophonist on stage", year: "2026" },
    { src: "/assets/koble-2026-vinnere.webp", alt: "Koble 2026 — award winners on stage", year: "2026" },
    { src: "/assets/koble-2025.webp", alt: "Koble 2025 at Frimurerlogen", year: "2025" },
  ],
} as const satisfies Record<Lang, unknown>;

const dotLabel = { nb: (n: number) => `Vis bilde ${n}`, en: (n: number) => `Show image ${n}` } as const;

export function KobleCarousel({ lang = "nb" }: { lang?: Lang }) {
  const [active, setActive] = useState(0);
  const items = slides[lang];

  useEffect(() => {
    const timer = window.setInterval(() => setActive((index) => (index + 1) % items.length), 4_500);
    return () => window.clearInterval(timer);
  }, [active, items.length]);

  return <div id="kobCar" className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_32px_64px_rgba(0,0,0,.45)] max-[760px]:aspect-video max-[760px]:max-h-[260px]">
    <div id="kobYear" className="absolute top-5 right-5 z-[3] rounded-full bg-black/55 px-3 py-2 font-mono text-[11px] tracking-[.14em] text-white backdrop-blur-[10px]">KOBLE · {items[active].year}</div>
    {items.map((slide, index) => <div key={slide.src} className={`absolute inset-0 [transition:opacity_1.2s_ease] ${index === active ? "opacity-100" : "opacity-0"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img width="1920" height="1280" loading="lazy" decoding="async" src={slide.src} alt={slide.alt} className="block h-full w-full object-cover" />
    </div>)}
    <div id="kobDots" className="absolute right-5 bottom-5 z-[3] flex gap-2 rounded-full bg-black/55 px-3 py-2 backdrop-blur-[10px]">{items.map((slide, index) => <button key={slide.src} type="button" aria-label={dotLabel[lang](index + 1)} aria-current={index === active ? "true" : undefined} onClick={() => setActive(index)} className={`h-2 cursor-pointer rounded-full border-0 p-0 [transition:background_.2s,width_.2s] ${index === active ? "w-[22px] bg-white" : "w-2 bg-white/35"}`} />)}</div>
  </div>;
}
