"use client";

import { useState } from "react";

/**
 * «Vi søker medlemmer»-bryter. Når den er på skal et merke bli synlig på
 * organisasjonens kort på framntnu.no.
 *
 * MERK: kun UI. State lever i komponenten og nullstilles ved refresh —
 * TODO(persist): lagre mot organisasjonens oppføring når backend er på plass,
 * og la /miljoer lese flagget for å vise merket offentlig.
 */
export function MemberRecruitingToggle() {
  const [on, setOn] = useState(false);

  return (
    <div className="flex items-center justify-between gap-4 rounded-[18px] border border-[var(--line)] bg-[var(--bg-soft)] px-5 py-4">
      <div className="min-w-0">
        <p className="m-0 flex items-center gap-2 text-[14px] font-bold">
          <i className="ph ph-megaphone text-[var(--orange)]" aria-hidden="true" />
          Vi søker medlemmer
        </p>
        <p className="m-0 mt-1 text-[13px] leading-[1.5] text-[var(--ink-soft)]">
          {on
            ? "Et «søker medlemmer»-merke vises på kortet deres på framntnu.no."
            : "Skru på for å vise at dere rekrutterer på framntnu.no."}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Vi søker medlemmer"
        onClick={() => setOn((value) => !value)}
        className={`relative h-7 w-12 shrink-0 rounded-full [transition:background_.2s] ${on ? "bg-[var(--blue)]" : "bg-[var(--line)]"}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,.25)] [transition:left_.2s] ${on ? "left-6" : "left-1"}`}
        />
      </button>
    </div>
  );
}
