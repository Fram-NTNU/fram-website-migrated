"use client";

import { useState } from "react";

function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}

function formatNo(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * «Vi søker medlemmer»-bryter med sluttdato. Når den er på vises et merke på
 * organisasjonens kort på framntnu.no — fram til og med den valgte datoen,
 * så slår det seg av av seg selv (ingen manuell avskruing).
 *
 * MERK: kun UI. State lever i komponenten og nullstilles ved refresh.
 * TODO(persist): lagre { aktiv, sluttdato } mot orgens oppføring. /miljoer skal
 * bare vise merket når aktiv OG dagens dato <= sluttdato.
 */
export function MemberRecruitingToggle() {
  const [until, setUntil] = useState(""); // "" = av
  // Kun brukt som `min` i on-grenen (rendres ikke ved SSR) — ingen mismatch.
  const [today] = useState(() => iso(new Date()));

  const on = until !== "";

  function toggle() {
    if (on) {
      setUntil("");
    } else {
      const d = new Date();
      d.setDate(d.getDate() + 30);
      setUntil(iso(d));
    }
  }

  return (
    <div className="rounded-[18px] border border-[var(--line)] bg-[var(--bg-soft)] px-5 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="m-0 flex items-center gap-2 text-[14px] font-bold">
            <i className="ph ph-megaphone text-[var(--orange)]" aria-hidden="true" />
            Vi søker medlemmer
          </p>
          <p className="m-0 mt-1 text-[13px] leading-[1.5] text-[var(--ink-soft)]">
            {on
              ? `Merket vises på kortet deres til og med ${until ? formatNo(until) : "…"}, så skrus det av automatisk.`
              : "Skru på for å vise at dere rekrutterer på framntnu.no."}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className={`text-[12px] font-bold uppercase tracking-[.06em] [transition:color_.2s] ${on ? "text-[#2AA891]" : "text-[var(--muted)]"}`}>
            {on ? "Aktiv" : "Av"}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={on}
            aria-label="Vi søker medlemmer"
            onClick={toggle}
            className={`flex h-[30px] w-[54px] items-center rounded-full border-0 p-[3px] [transition:background_.25s] ${on ? "bg-[#3CBFAB]" : "bg-[var(--line)]"}`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,.3)] [transition:transform_.25s] ${on ? "translate-x-[24px]" : "translate-x-0"}`}
            >
              {on && <i className="ph ph-check text-[13px] font-bold text-[#2AA891]" aria-hidden="true" />}
            </span>
          </button>
        </div>
      </div>

      {on && (
        <label className="mt-4 flex flex-wrap items-center gap-3 border-t border-[var(--line)] pt-4">
          <span className="text-[13px] font-semibold text-[var(--ink-soft)]">Vises til og med</span>
          <input
            type="date"
            value={until}
            min={today || undefined}
            onChange={(e) => setUntil(e.target.value)}
            className="rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-[14px] text-[var(--ink)] outline-none [transition:border-color_.2s,box-shadow_.2s] focus:border-[var(--blue)] focus:shadow-[0_0_0_3px_rgba(46,134,193,.15)]"
          />
        </label>
      )}
    </div>
  );
}
