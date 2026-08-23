"use client";

import { useCallback, useEffect, useState } from "react";

const slides = [
  { src: "/assets/teknologihallen/hero.jpg", name: "", alt: "Medlemmene i Teknologihallen" },
  { src: "/assets/heroes/njord.webp", name: "Njord NTNU", alt: "Njord NTNU sitt autonome fartøy" },
  { src: "/assets/heroes/fuelfighter.webp", name: "Fuel Fighter", alt: "Fuel Fighter sitt kjøretøy" },
  { src: "/assets/heroes/revolve.webp", name: "Revolve NTNU", alt: "Revolve NTNU sin racerbil" },
  { src: "/assets/heroes/orbit.webp", name: "Orbit NTNU", alt: "Orbit NTNU sin satellitt" },
  { src: "/assets/heroes/propulse.webp", name: "Propulse NTNU", alt: "Propulse NTNU med rakett" },
  { src: "/assets/heroes/ascend.webp", name: "Ascend NTNU", alt: "Ascend NTNU sin drone" },
  { src: "/assets/heroes/vortex.webp", name: "Vortex NTNU", alt: "Vortex NTNU sin undervannsfarkost" },
  { src: "/assets/heroes/nordlys.webp", name: "Nordlys NTNU", alt: "Nordlys NTNU sin solbil" },
  { src: "/assets/heroes/gridville.webp", name: "Gridville NTNU", alt: "Gridville NTNU-teamet" },
];

const step = 100 / slides.length;

export function TeknologihallenHero() {
  const [current, setCurrent] = useState(0);
  const select = useCallback((index: number) => setCurrent(index), []);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrent((value) => (value + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [current]);

  return (
    <header className="relative h-[min(74vh,760px)] w-full overflow-hidden bg-[var(--steel)]">
      <div className="absolute inset-0 z-0 flex h-full [transition:transform_.9s_cubic-bezier(.77,0,.18,1)]" style={{ width: `${slides.length * 100}%`, transform: `translateX(-${current * step}%)` }}>
        {slides.map((slide, index) => (
          // Plain images are retained for exact carousel parity with the original page.
          // eslint-disable-next-line @next/next/no-img-element
          <img key={slide.src} src={slide.src} alt={slide.alt} fetchPriority={index === 0 ? "high" : undefined} loading={index === 0 ? "eager" : "lazy"} decoding="async" style={{ width: `${100 / slides.length}%` }} className={`h-full flex-none object-cover brightness-[.72] saturate-[.96] ${current === index ? "animate-[idegarasjen-kb_8s_ease-out_forwards]" : ""}`} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] opacity-50 [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:linear-gradient(to_top,transparent_0%,rgba(0,0,0,.55)_72%)]" aria-hidden="true" />

      <div className="absolute inset-0 z-[2] flex items-end bg-[linear-gradient(to_top,rgba(18,25,30,.92)_0%,rgba(18,25,30,.5)_46%,rgba(18,25,30,.1)_80%)] pb-[54px]">
        <div className="mx-auto w-full max-w-[1360px] px-12 max-[720px]:px-[22px]">
          <div className="mb-4 flex items-center">
            <span className="font-sans text-[clamp(46px,6.2vw,88px)] leading-[.96] font-extrabold tracking-[-.03em] text-white">Teknologihallen</span>
          </div>
          <p className="m-0 mb-3.5 text-[clamp(18px,1.9vw,25px)] font-medium tracking-[-.01em] text-white">Hjemmet til NTNUs tekniske organisasjoner.</p>
          <p className="m-0 mb-7 max-w-[540px] text-[15.5px] leading-[1.6] text-white/72">Under samme tak utvikler studentene alt fra satellitter og raketter til autonome fartøy og racerbiler — flere av dem konkurrerer internasjonalt.</p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#organisasjoner" className="inline-flex items-center gap-2.5 rounded-full bg-white px-[26px] py-3.5 text-[15px] font-bold text-[var(--steel)] no-underline [transition:transform_.2s,box-shadow_.2s] hover:[transform:translateY(-2px)] hover:shadow-[0_12px_26px_-10px_rgba(0,0,0,.5)]">Utforsk organisasjonene →</a>
            <a href="#bak-teknologihallen" className="inline-flex items-center gap-2.5 rounded-full border border-white/45 bg-white/5 px-[26px] py-3.5 text-[15px] font-bold text-white no-underline [transition:transform_.2s,border-color_.2s,background_.2s] hover:[transform:translateY(-2px)] hover:border-white hover:bg-white/12">Søk om plass</a>
          </div>
        </div>
      </div>

      <div className="absolute right-9 bottom-[22px] z-[3] flex items-center gap-4">
        {slides[current].name && <span className="font-mono text-[11px] tracking-[.1em] whitespace-nowrap text-white/85 uppercase [transition:opacity_.35s_ease]">{slides[current].name}</span>}
        <div className="flex items-center gap-2">
          {slides.map((slide, index) => <button key={slide.src} type="button" aria-label={`Bilde ${index + 1}`} onClick={() => select(index)} className={`h-2 w-2 cursor-pointer rounded-full border-0 p-0 [transition:background_.3s,transform_.3s] ${current === index ? "bg-white [transform:scale(1.3)]" : "bg-white/35"}`} />)}
        </div>
      </div>
    </header>
  );
}
