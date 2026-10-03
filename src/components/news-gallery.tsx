"use client";
import { useState } from "react";
import type { NewsItem } from "@/lib/news";

export function NewsGallery({ images }: { images: NewsItem["images"] }) {
  const [current, setCurrent] = useState(0);
  if (!images.length) return null;
  const move = (offset: number) => setCurrent((index) => (index + offset + images.length) % images.length);
  return <section className="news-gallery" aria-label="Bilder fra nyheten" aria-roledescription={images.length > 1 ? "karusell" : undefined}
    tabIndex={images.length > 1 ? 0 : undefined} onKeyDown={(event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    }}>
    <div className="news-gallery-track" style={{ transform: `translateX(-${current * 100}%)` }}>
      {images.map((image, index) => <div className="news-gallery-slide" key={image.url} aria-hidden={index !== current}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.url} alt={image.alt} width={1560} height={900} loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : undefined} decoding="async" />
      </div>)}
    </div>
    {images.length > 1 && <div className="news-gallery-controls">
      <button type="button" aria-label="Forrige bilde" onClick={() => move(-1)}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg></button>
      <span aria-live="polite" aria-atomic="true">Bilde {current + 1} av {images.length}</span>
      <button type="button" aria-label="Neste bilde" onClick={() => move(1)}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 6 6 6-6 6" /></svg></button>
    </div>}
  </section>;
}
