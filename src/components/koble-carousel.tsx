"use client";

import { useEffect, useState } from "react";

const slides = [
  { src: "/assets/koble-2026-sax.webp", alt: "Koble 2026 — saxofonist på scenen", year: "2026" },
  { src: "/assets/koble-2026-vinnere.webp", alt: "Koble 2026 — prisvinnere på scenen", year: "2026" },
  { src: "/assets/koble-2025.webp", alt: "Koble 2025 på Frimurerlogen", year: "2025" },
] as const;

export function KobleCarousel({ aspectClassName }: { aspectClassName?: string } = {}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((index) => (index + 1) % slides.length), 4_500);
    return () => window.clearInterval(timer);
  }, [active]);

  return <div id="kobCar" className={`relative overflow-hidden rounded-[28px] shadow-[0_32px_64px_rgba(0,0,0,.45)] ${aspectClassName ?? "aspect-[4/3] max-[760px]:aspect-video max-[760px]:max-h-[260px]"}`}>
    <div id="kobYear" className="absolute top-5 right-5 z-[3] rounded-full bg-black/55 px-3 py-2 font-mono text-[11px] tracking-[.14em] text-white backdrop-blur-[10px]">KOBLE · {slides[active].year}</div>
    {slides.map((slide, index) => <div key={slide.src} className={`absolute inset-0 [transition:opacity_1.2s_ease] ${index === active ? "opacity-100" : "opacity-0"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img width="1920" height="1280" loading="lazy" decoding="async" src={slide.src} alt={slide.alt} className="block h-full w-full object-cover" />
    </div>)}
    <div id="kobDots" className="absolute right-5 bottom-5 z-[3] flex gap-2 rounded-full bg-black/55 px-3 py-2 backdrop-blur-[10px]">{slides.map((slide, index) => <button key={slide.src} type="button" aria-label={`Vis bilde ${index + 1}`} aria-current={index === active ? "true" : undefined} onClick={() => setActive(index)} className={`h-2 cursor-pointer rounded-full border-0 p-0 [transition:background_.2s,width_.2s] ${index === active ? "w-[22px] bg-white" : "w-2 bg-white/35"}`} />)}</div>
  </div>;
}
