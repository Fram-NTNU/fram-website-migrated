"use client";

import { useCallback, useEffect, useState } from "react";

const slides = [
  { src: "/assets/Idegarasjen1.webp", alt: "Idégarasjen — studentenes innovasjonsverksted på NTNU i Trondheim", width: 1560, height: 1170 },
  { src: "/assets/Idegarasjen2.webp", alt: "Stort verksted i Idégarasjen med ulike verktøy og maskiner", width: 1560, height: 1170 },
  { src: "/assets/Idegarasjen3.webp", alt: "3D-printere, loddebenker og stativer i Idégarasjen", width: 1560, height: 1170 },
  { src: "/assets/Idegarasjen4.webp", alt: "Diverse verktøy og utstyr studenter kan benytte i Idégarasjen", width: 1560, height: 1170 },
];

export function IdegarasjenHero() {
  const [current, setCurrent] = useState(0);
  const select = useCallback((index: number) => setCurrent(index), []);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrent((value) => (value + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [current]);

  return (
    <header className="relative h-[min(72vh,700px)] w-full overflow-hidden bg-[#0f0e0b]">
      <div className="absolute inset-0 z-[1] flex h-full w-[400%] [transition:transform_.9s_cubic-bezier(.77,0,.18,1)]" style={{ transform: `translateX(-${current * 25}%)` }}>
        {slides.map((slide, index) => (
          // Plain images are retained for exact source dimensions and carousel parity.
          // eslint-disable-next-line @next/next/no-img-element
          <img key={slide.src} width={slide.width} height={slide.height} src={slide.src} alt={slide.alt} fetchPriority={index === 0 ? "high" : undefined} loading={index === 0 ? "eager" : "lazy"} decoding="async" className={`h-full w-1/4 flex-none object-cover brightness-[.82] ${current === index ? "animate-[idegarasjen-kb_8s_ease-out_forwards]" : ""}`} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 z-[2] flex items-end bg-[linear-gradient(to_top,rgba(6,5,2,.72)_0%,rgba(6,5,2,.3)_40%,transparent_75%),linear-gradient(to_right,rgba(0,0,0,.22)_0%,transparent_55%)] pb-[60px]">
        <div className="mx-auto w-full max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img width="1920" height="477" decoding="async" src="/assets/idegarasjen-logo-hvit.webp" alt="Idégarasjen" className="mb-5 block h-auto w-[min(560px,62%)] drop-shadow-[0_8px_40px_rgba(0,0,0,.55)]" />
          <h1 className="m-0 max-w-[560px] text-[clamp(22px,2vw,30px)] leading-[1.3] font-semibold tracking-[-.01em] text-white/92 [text-shadow:0_2px_16px_rgba(0,0,0,.45)]">Studentenes eget <span className="text-[var(--yellow)]">innovasjonsverksted.</span></h1>
        </div>
      </div>
      <div className="absolute right-9 bottom-[22px] z-[3] flex items-center gap-2">
        {slides.map((slide, index) => <button key={slide.src} type="button" aria-label={`Bilde ${index + 1}`} onClick={() => select(index)} className={`h-2 w-2 cursor-pointer rounded-full border-0 p-0 [transition:background_.3s,transform_.3s] ${current === index ? "bg-white [transform:scale(1.3)]" : "bg-white/35"}`} />)}
      </div>
    </header>
  );
}
