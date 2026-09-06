"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Link from "next/link";
import { type EventItem, pastEvents, upcomingEvents } from "@/lib/events";

function EventCard({ event }: { event: EventItem }) {
  const style = { "--event-image": `url('${event.image}')` } as CSSProperties;
  return <article style={style} className="ev-card flex flex-col overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] [transition:transform_.25s_ease,box-shadow_.25s_ease] hover:[transform:translateY(-4px)] hover:shadow-[0_16px_40px_rgba(30,30,30,.08)]">
    <div className="relative flex min-h-40 flex-col justify-end overflow-hidden px-6 pt-6 pb-5 text-white before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[linear-gradient(180deg,rgba(20,20,30,.45)_0%,rgba(20,20,30,.78)_100%),var(--event-image)] before:bg-cover before:bg-center">
      {event.hostFram ? <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/fram-symbol.webp" alt="Fram" title="Arrangør: Fram" className="absolute top-3.5 right-3.5 z-[3] h-[72px] w-[72px] rounded-full bg-white p-2 object-contain shadow-[0_4px_12px_rgba(0,0,0,.18)]" />
      </> : event.partner ? <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.partner.src} alt={event.partner.alt} title={`Arrangør: ${event.partner.alt}`} className="absolute top-3.5 right-3.5 z-[3] h-[78px] w-[78px] rounded-full bg-white p-[5px] object-contain shadow-[0_4px_12px_rgba(0,0,0,.18)]" />
      </> : null}
      <div className="relative z-[2] flex items-baseline justify-between gap-3.5"><span className={`${event.day.length > 3 ? "text-[48px]" : "text-[72px]"} leading-[.9] font-extrabold tracking-[-.035em]`}>{event.day}</span><span className="font-mono text-xs font-semibold tracking-[.14em] uppercase">{event.month}</span><span className="ml-auto self-end pb-2 font-mono text-[11px] tracking-[.1em] uppercase opacity-100">{event.meta}</span></div>
    </div>
    <div className="flex flex-1 flex-col gap-3 px-6 pt-6 pb-5"><h4 className="m-0 text-xl leading-[1.2] font-bold tracking-[-.015em]">{event.title}</h4><p className="m-0 flex-1 text-sm leading-[1.55] text-[var(--ink-soft)]">{event.description}</p><div className="mt-1 flex flex-wrap gap-x-3.5 gap-y-2 pt-3 font-mono text-[10px] leading-[13px] tracking-[.1em] text-[var(--muted)] uppercase [border-color:var(--line)] [border-style:dashed] [border-width:1px_0_0]"><span className="inline-flex items-center gap-1.5 before:h-[5px] before:w-[5px] before:rounded-full before:bg-[var(--muted)] before:opacity-60">{event.location}</span><span className="inline-flex items-center gap-1.5 before:h-[5px] before:w-[5px] before:rounded-full before:bg-[var(--muted)] before:opacity-60">{event.host}</span></div></div>
    <div className="flex items-center justify-between gap-3 border-t border-[var(--line)] bg-[var(--bg)] px-6 py-4"><span className={`rounded-full px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[.08em] uppercase ${event.pillClass}`}>{event.pill}</span>{event.href ? <Link href={event.href} className="font-mono text-[11px] font-semibold tracking-[.08em] text-[var(--ink)] uppercase no-underline [transition:opacity_.2s] hover:opacity-60">Les mer →</Link> : null}</div>
  </article>;
}

function SkeletonCard() {
  return <article aria-hidden="true" className="flex flex-col overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--card)]">
    <div className="h-40 bg-[linear-gradient(180deg,#EAE4D8_0%,#DCD5C7_100%)]" />
    <div className="flex flex-col gap-3.5 px-6 pt-6 pb-5"><div className="h-4 w-3/5 rounded bg-[var(--line)]" /><div className="h-3 w-full rounded bg-[var(--line)]" /><div className="h-3 w-11/12 rounded bg-[var(--line)]" /><div className="mt-2 h-3 w-2/5 rounded bg-[var(--line)]" /></div>
    <div className="border-t border-[var(--line)] bg-[var(--bg)] px-6 py-4"><div className="h-6 w-24 rounded-full bg-[var(--line)]" /></div>
  </article>;
}

export function FramEvents() {
  const [tab, setTab] = useState<"kommende" | "tidligere">("kommende");
  const list = tab === "kommende" ? upcomingEvents : pastEvents;

  return <div>
    {/* Del 1: Fram-arrangementer */}
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
      <div className="min-w-0">
        <h2 className="m-0 text-[clamp(24px,2.4vw,32px)] leading-[1.1] font-extrabold tracking-[-.02em]">Fram-arrangementer</h2>
        <p className="mt-2 mb-0 max-w-[52ch] text-[15px] leading-[1.55] text-[var(--ink-soft)]">Arrangementer i regi av Fram, åpne for alle studenter på NTNU.</p>
      </div>
      <div role="tablist" aria-label="Vis Fram-arrangementer" className="inline-flex shrink-0 rounded-full border border-[var(--line)] bg-[var(--card)] p-1">
        {([["kommende", "Kommende", upcomingEvents.length], ["tidligere", "Tidligere", pastEvents.length]] as const).map(([key, label, count]) =>
          <button key={key} type="button" role="tab" aria-selected={tab === key} onClick={() => setTab(key)} className={`cursor-pointer rounded-full border-0 px-4 py-2 font-mono text-[11px] font-semibold tracking-[.1em] uppercase [transition:background_.2s,color_.2s] ${tab === key ? "bg-[var(--ink)] text-white" : "bg-transparent text-[var(--muted)] hover:text-[var(--ink)]"}`}>{label}<span className={`ml-1.5 ${tab === key ? "opacity-70" : "opacity-50"}`}>{count}</span></button>)}
      </div>
    </div>

    <div className="grid grid-cols-3 gap-5 max-[960px]:grid-cols-2 max-[640px]:grid-cols-1">{list.map((event) => <EventCard key={`${event.month}-${event.day}-${event.title}`} event={event} />)}</div>

    {/* Del 2: Andre arrangementer */}
    <div className="mt-24 max-[760px]:mt-16">
      <div className="mb-8">
        <h2 className="m-0 text-[clamp(24px,2.4vw,32px)] leading-[1.1] font-extrabold tracking-[-.02em]">Andre arrangementer</h2>
        <p className="mt-2 mb-0 max-w-[52ch] text-[15px] leading-[1.55] text-[var(--ink-soft)]">Arrangementer fra resten av innovasjonsmiljøet på NTNU: organisasjoner, partnere og andre aktører.</p>
      </div>
      <div className="relative">
        <div aria-hidden="true" className="grid grid-cols-3 gap-5 blur-[3.5px] saturate-[.92] select-none max-[960px]:grid-cols-2 max-[760px]:hidden"><SkeletonCard /><SkeletonCard /><SkeletonCard /></div>
        <div className="absolute inset-0 z-[5] flex items-center justify-center bg-[color-mix(in_oklab,var(--bg)_20%,transparent)] max-[760px]:static max-[760px]:bg-transparent"><div className="flex w-auto max-w-[620px] items-center justify-center rounded-[18px] border border-[var(--line)] bg-[color-mix(in_oklab,var(--card)_86%,transparent)] px-12 py-10 shadow-[0_24px_60px_-18px_rgba(30,30,30,.30)] backdrop-blur-[5px] max-[760px]:w-full max-[760px]:max-w-full max-[760px]:px-6 max-[760px]:py-8 max-[760px]:backdrop-blur-none"><div className="flex max-w-[600px] flex-col items-center gap-[18px] text-center"><span className="rounded-full border border-[var(--line)] bg-[var(--bg-soft)] px-4 py-2 font-mono text-[11px] tracking-[.16em] text-[var(--ink-soft)] uppercase">Kommer snart</span><p className="m-0 text-[clamp(21px,2.4vw,29px)] leading-[1.4] font-semibold tracking-[-.01em] text-[var(--ink)] [text-wrap:balance] max-[760px]:text-lg">Snart kan du se hva som rører seg i hele innovasjonsmiljøet på NTNU, ikke bare det Fram arrangerer selv.</p></div></div></div>
      </div>
    </div>
  </div>;
}
