"use client";

import { useEffect, useRef } from "react";

function pad(value: number) {
  return value < 10 ? `0${value}` : String(value);
}

function formatUtc(date: Date) {
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00Z`;
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
