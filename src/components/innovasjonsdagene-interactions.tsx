"use client";

import { useEffect, useRef, useState } from "react";

function pad(value: number) {
  return value < 10 ? `0${value}` : String(value);
}

function formatUtc(date: Date) {
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00Z`;
}

const EVENT_END = "2026-08-20T15:00:00+02:00";

export function LiveCompetitionBanner() {
  const [visible, setVisible] = useState(false);
  const barRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const end = new Date(EVENT_END).getTime();
    if (Date.now() < end) setVisible(true);
  }, []);

  // Expose the banner height so the hero below can subtract it and avoid clipping its bottom row.
  useEffect(() => {
    const root = document.documentElement;
    const bar = barRef.current;
    if (!bar) return;
    const sync = () => root.style.setProperty("--id-banner-h", `${bar.offsetHeight}px`);
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      root.style.setProperty("--id-banner-h", "0px");
    };
  }, [visible]);

  if (!visible) return null;

  return <a ref={barRef} href="https://www.instagram.com/p/Db84A0ktoow/" target="_blank" rel="noopener" className="relative z-[60] flex items-center justify-center gap-2.5 bg-[var(--red)] px-4 py-2.5 text-center font-sans text-sm font-semibold text-white no-underline [transition:background_.2s] hover:bg-[#d94a4a] max-[520px]:text-[13px]">
    <span aria-hidden="true" className="relative flex h-2.5 w-2.5 flex-none">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
    </span>
    <span>Live konkurranse på Instagram — bli med nå</span>
    <span aria-hidden="true">→</span>
  </a>;
}

export function AddToCalendarButton() {
  function downloadCalendar() {
    const analyticsWindow = window as Window & { goatcounter?: { count?: (event: { path: string; title: string; event: boolean }) => void } };
    analyticsWindow.goatcounter?.count?.({ path: "add-to-calendar", title: "Legg i kalender (Innovasjonsdagene)", event: true });

    const stamp = formatUtc(new Date());
    const lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//FRAM NTNU//Innovasjonsdagene//NO", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
      "BEGIN:VEVENT", "UID:innovasjonsdagene-2026-dag1@framntnu.no", `DTSTAMP:${stamp}`, `DTSTART:${formatUtc(new Date(Date.UTC(2026, 7, 19, 8)))}`, `DTEND:${formatUtc(new Date(Date.UTC(2026, 7, 19, 13)))}`, "SUMMARY:Innovasjonsdagene 2026 – Dag 1 – FRAM NTNU", "LOCATION:Gruva, Trondheim", "DESCRIPTION:Møt 25+ studentorganisasjoner i FRAM. Gratis inngang, drop-in hele dagen.", "URL:https://www.framntnu.no/innovasjonsdagene", "END:VEVENT",
      "BEGIN:VEVENT", "UID:innovasjonsdagene-2026-dag2@framntnu.no", `DTSTAMP:${stamp}`, `DTSTART:${formatUtc(new Date(Date.UTC(2026, 7, 20, 8)))}`, `DTEND:${formatUtc(new Date(Date.UTC(2026, 7, 20, 13)))}`, "SUMMARY:Innovasjonsdagene 2026 – Dag 2 – FRAM NTNU", "LOCATION:Gruva, Trondheim", "DESCRIPTION:Møt 25+ studentorganisasjoner i FRAM. Gratis inngang, drop-in hele dagen.", "URL:https://www.framntnu.no/innovasjonsdagene", "END:VEVENT", "END:VCALENDAR",
    ];
    const url = URL.createObjectURL(new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "innovasjonsdagene-2026.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
  }

  return <button type="button" id="addToCal" onClick={downloadCalendar} className="inline-flex w-auto cursor-pointer items-center gap-2.5 rounded-full border-0 bg-[var(--yellow)] px-7 py-3.5 font-sans text-sm leading-[normal] font-bold text-white no-underline [transition:transform_.2s,box-shadow_.2s] hover:[transform:translateY(-2px)] hover:shadow-[0_10px_24px_rgba(232,90,90,.4)] max-[640px]:w-full max-[640px]:justify-center max-[640px]:px-5 max-[640px]:py-3.5">
    <span aria-hidden="true" className="relative h-[17px] w-[17px] flex-none rounded-[4px] border-2 border-current before:absolute before:-top-1 before:right-0.5 before:left-0.5 before:h-1 before:border-x-2 before:border-current after:absolute after:top-1 after:right-px after:left-px after:h-0.5 after:bg-current" />
    Legg i kalender
  </button>;
}

export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#4B9FD3", "#3CBFAB", "#FFB775", "#FF8FB8", "#E85A5A", "#FDC82F"];
    const gravity = 0.16;
    const drag = 0.004;

    type Piece = { x: number; y: number; vx: number; vy: number; rot: number; vr: number; size: number; color: string; shape: number; };

    const pieces: Piece[] = [];
    // Fire from just off each bottom corner, diagonally inward and up.
    const seed = (ox: number, oy: number, centerAngle: number, count: number, spread: number) => {
      for (let i = 0; i < count; i++) {
        const angle = centerAngle + (Math.random() - 0.5) * spread;
        const speed = 17 + Math.random() * 15;
        pieces.push({
          x: ox,
          y: oy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.3,
          size: 6 + Math.random() * 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: Math.floor(Math.random() * 3),
        });
      }
    };
    const tilt = 0.5; // ~29° off vertical, angled toward the centre
    seed(-40, height - 20, -Math.PI / 2 + tilt, 150, 0.5);      // bottom-left → up and to the right
    seed(width + 40, height - 20, -Math.PI / 2 - tilt, 150, 0.5); // bottom-right → up and to the left

    let raf = 0;
    let frame = 0;
    const maxFrames = 360;

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;
      for (const p of pieces) {
        p.vy += gravity;
        p.vx *= 1 - drag;
        p.vy *= 1 - drag;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;

        const fade = frame > maxFrames - 80 ? Math.max(0, (maxFrames - frame) / 80) : 1;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = fade;
        ctx.fillStyle = p.color;
        if (p.shape === 0) {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.shape === 1) {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(p.size / 2, p.size / 2);
          ctx.lineTo(-p.size / 2, p.size / 2);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }
      if (frame < maxFrames) {
        raf = window.requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] h-full w-full" />;
}

export function DjVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let timer: number | undefined;
    let reversing = false;

    const startReverse = () => {
      if (reversing) return;
      reversing = true;
      video.pause();
      timer = window.setInterval(() => {
        video.currentTime = Math.max(0, video.currentTime - 1 / 30);
        if (video.currentTime <= 0) {
          if (timer) window.clearInterval(timer);
          reversing = false;
          void video.play();
        }
      }, 33);
    };
    const nearEnd = () => {
      if (!reversing && video.duration && video.currentTime >= video.duration - 0.1) startReverse();
    };
    video.addEventListener("ended", startReverse);
    video.addEventListener("timeupdate", nearEnd);
    return () => {
      video.removeEventListener("ended", startReverse);
      video.removeEventListener("timeupdate", nearEnd);
      if (timer) window.clearInterval(timer);
    };
  }, []);

  return <video ref={videoRef} src="/assets/FramDJ.mp4" autoPlay muted playsInline className="block h-full w-full object-cover" />;
}
