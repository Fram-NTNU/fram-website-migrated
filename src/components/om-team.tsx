"use client";

import { useState } from "react";
import type { Lang } from "@/i18n/config";

type Member = { name: string; role: string; image: string; accent: string };

// Rollene lagres på norsk som kanonisk nøkkel og oversettes ved visning.
const roleLabels: Record<Lang, Record<string, string>> = {
  nb: { Leder: "Leder", Nestleder: "Nestleder", Arrangement: "Arrangement", Verksted: "Verksted", Gruva: "Gruva" },
  en: { Leder: "Leader", Nestleder: "Deputy Leader", Arrangement: "Events", Verksted: "Workshop", Gruva: "Gruva" },
};

const copy = {
  nb: { heading: "Dette er Gjengen", boardYear: "Styreår", selectBoardYear: "Velg styreår", email: (n: string) => `Send e-post til ${n}` },
  en: { heading: "Meet the team", boardYear: "Board year", selectBoardYear: "Select board year", email: (n: string) => `Email ${n}` },
} as const;

const teams: Record<string, Member[]> = {
  "2026": [
    { name: "Malin", role: "Leder", image: "/assets/team/malin.avif", accent: "#FDC82F" },
    { name: "Jonas", role: "Nestleder", image: "/assets/team/jonas.avif", accent: "#2E86C1" },
    { name: "Britt", role: "Arrangement", image: "/assets/team/britt.avif", accent: "#E85A5A" },
    { name: "Mie", role: "Arrangement", image: "/assets/team/mie.avif", accent: "#3FC4A3" },
    { name: "Sutha", role: "Arrangement", image: "/assets/team/sutha.avif", accent: "#FDC82F" },
    { name: "Henrik", role: "Verksted", image: "/assets/team/henrik-2026.avif", accent: "#2E86C1" },
    { name: "Marja", role: "Gruva", image: "/assets/team/marja.avif", accent: "#E85A5A" },
    { name: "Eirill", role: "Gruva", image: "/assets/team/eirill.avif", accent: "#3FC4A3" },
  ],
  "2025": [
    { name: "Julie", role: "Leder", image: "/assets/team/julie.avif", accent: "#FDC82F" },
    { name: "Johannes", role: "Nestleder", image: "/assets/team/johannes.avif", accent: "#2E86C1" },
    { name: "Henrik", role: "Verksted", image: "/assets/team/henrik-2025.avif", accent: "#E85A5A" },
    { name: "Malin", role: "Arrangement", image: "/assets/team/malin.avif", accent: "#3FC4A3" },
    { name: "Ella", role: "Arrangement", image: "/assets/team/ella.avif", accent: "#FDC82F" },
    { name: "Jonas", role: "Arrangement", image: "/assets/team/jonas.avif", accent: "#2E86C1" },
    { name: "Marja", role: "Gruva", image: "/assets/team/marja.avif", accent: "#E85A5A" },
    { name: "Eirill", role: "Gruva", image: "/assets/team/eirill.avif", accent: "#3FC4A3" },
  ],
};

export function OmTeam({ lang = "nb" }: { lang?: Lang } = {}) {
  const [year, setYear] = useState("2026");
  const t = copy[lang];

  return <>
    <div className="mb-14 grid grid-cols-[1fr_1.2fr] items-end gap-16 max-[760px]:grid-cols-1 max-[760px]:gap-6">
      <div><h2 className="m-0 text-[clamp(36px,3.6vw,60px)] leading-[1.02] font-extrabold tracking-[-.02em]">{t.heading}<span className="text-[var(--teal)]">&lt;3</span></h2></div>
      <div className="flex items-center justify-self-end gap-3 font-mono max-[640px]:mt-2 max-[640px]:justify-self-start">
        <label htmlFor="team-year" className="text-[11px] tracking-[.1em] text-[var(--muted)] uppercase">{t.boardYear}</label>
        <select
          id="team-year"
          aria-label={t.selectBoardYear}
          value={year}
          onChange={(event) => setYear(event.target.value)}
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='none' stroke='%23888' stroke-width='1.6' d='M1 1.5 6 6.5 11 1.5'/%3E%3C/svg%3E\")" }}
          className="relative cursor-pointer appearance-none rounded-[10px] border border-[var(--line)] bg-[var(--card)] py-[9px] pr-[38px] pl-3.5 font-mono text-[13px] font-semibold text-[var(--ink)] [background-position:right_14px_center] [background-repeat:no-repeat] [transition:border-color_.15s,box-shadow_.15s] hover:border-[var(--muted)] focus-visible:border-[var(--blue)] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_color-mix(in_oklab,var(--blue)_22%,transparent)]"
        >
          <option value="2026">2026/2027</option><option value="2025">2025/2026</option>
        </select>
      </div>
    </div>
    <div className="grid grid-cols-4 gap-x-7 gap-y-12 max-[1000px]:grid-cols-2">
      {teams[year].map((member, index) => <article key={`${year}-${member.name}-${index}`} style={{ "--accent": member.accent } as React.CSSProperties} className="group flex flex-col items-center text-center [transition:transform_.3s_ease] hover:[transform:translateY(-4px)]">
        <div className="relative aspect-square w-full max-w-56 overflow-hidden rounded-full bg-[var(--bg-soft)] shadow-[0_0_0_1px_var(--line),0_14px_30px_-18px_rgba(0,0,0,.5)] after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_0_3px_var(--card)] after:outline-2 after:outline-offset-0 after:outline-transparent after:[transition:outline-color_.3s] group-hover:after:outline-[var(--accent)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img width="236" height="232" loading="lazy" decoding="async" src={member.image} alt={member.name} className="block h-full w-full object-cover object-[center_18%] saturate-0 [transition:filter_.45s,transform_.6s] group-hover:saturate-100 group-hover:[transform:scale(1.06)]" />
        </div>
        <div className="flex flex-col items-center pt-[18px]"><div className="text-[19px] leading-[1.1] font-bold tracking-[-.01em]">{member.name}</div><div className="mt-[7px] inline-flex items-center gap-2 font-mono text-[11px] tracking-[.05em] text-[var(--ink-soft)] uppercase before:h-[7px] before:w-[7px] before:flex-none before:rounded-full before:bg-[var(--accent)]">{roleLabels[lang][member.role] ?? member.role}</div><div className="mt-3.5 flex justify-center gap-[9px]"><a href="mailto:framntnu@gmail.com" title={t.email(member.name)} aria-label={t.email(member.name)} className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-[var(--line)] text-[17px] text-[var(--muted)] no-underline [transition:background_.15s,color_.15s,border-color_.15s] hover:border-[var(--accent)] hover:bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] hover:text-[var(--ink)]"><i className="ph ph-envelope" /></a></div></div>
      </article>)}
    </div>
  </>;
}
