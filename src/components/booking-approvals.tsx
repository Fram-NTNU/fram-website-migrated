"use client";

import { useState } from "react";
import type { PendingBooking } from "@/lib/fram-admin";

/**
 * Godkjenning av bookinger, delt i interne (medlemsorganisasjoner) og eksterne.
 *
 * MERK: kun UI. Godkjenn/Avslå fjerner raden lokalt.
 * TODO(persist): koble til bookingsystemet; send bekreftelse til søker.
 */
export function BookingApprovals({ bookings }: { bookings: PendingBooking[] }) {
  const [items, setItems] = useState(bookings);
  const [tab, setTab] = useState<"intern" | "ekstern">("intern");

  const shown = items.filter((b) => b.type === tab);
  const internCount = items.filter((b) => b.type === "intern").length;
  const eksternCount = items.filter((b) => b.type === "ekstern").length;

  function handle(id: string) {
    setItems((list) => list.filter((b) => b.id !== id));
  }

  const tabClass = (active: boolean) =>
    `inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-semibold [transition:background_.2s,color_.2s] ${
      active ? "bg-[var(--ink)] text-white" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
    }`;

  return (
    <div className="rounded-[22px] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,.04)] max-[560px]:p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="m-0 text-[19px] font-extrabold tracking-[-.01em]">Bookinger til godkjenning</h2>
        <div className="flex gap-1 rounded-full bg-[var(--bg-soft)] p-1">
          <button type="button" onClick={() => setTab("intern")} className={tabClass(tab === "intern")}>
            Interne
            <span className={`rounded-full px-1.5 text-[11px] ${tab === "intern" ? "bg-white/20" : "bg-[var(--line)]"}`}>{internCount}</span>
          </button>
          <button type="button" onClick={() => setTab("ekstern")} className={tabClass(tab === "ekstern")}>
            Eksterne
            <span className={`rounded-full px-1.5 text-[11px] ${tab === "ekstern" ? "bg-white/20" : "bg-[var(--line)]"}`}>{eksternCount}</span>
          </button>
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="rounded-[16px] border border-dashed border-[var(--line)] bg-[var(--bg-soft)] px-5 py-8 text-center text-[14px] text-[var(--ink-soft)]">
          Ingen {tab === "intern" ? "interne" : "eksterne"} bookinger venter på godkjenning. 🎉
        </p>
      ) : (
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {shown.map((b) => (
            <li
              key={b.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-[16px] border border-[var(--line)] bg-[var(--bg-soft)] px-5 py-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-bold">{b.requester}</span>
                  <span
                    className="rounded-full px-2 py-0.5 font-mono text-[9px] tracking-[.1em] uppercase"
                    style={
                      b.type === "intern"
                        ? { backgroundColor: "#2E86C11f", color: "#2E86C1" }
                        : { backgroundColor: "#E58A3A1f", color: "#B4691F" }
                    }
                  >
                    {b.type === "intern" ? "Medlem" : "Ekstern"}
                  </span>
                </div>
                <p className="m-0 mt-0.5 text-[13.5px] text-[var(--ink-soft)]">{b.purpose}</p>
                <p className="m-0 mt-1 flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-[11px] tracking-[.04em] text-[var(--muted)]">
                  <span>{b.room}</span>
                  <span>{b.date}</span>
                  <span>{b.time}</span>
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => handle(b.id)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#2AA891] px-4 py-2 text-[13px] font-semibold text-white [transition:transform_.15s] hover:-translate-y-px"
                >
                  <i className="ph ph-check" aria-hidden="true" />
                  Godkjenn
                </button>
                <button
                  type="button"
                  onClick={() => handle(b.id)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-4 py-2 text-[13px] font-semibold text-[var(--ink-soft)] [transition:border-color_.15s,color_.15s] hover:border-[var(--nav-accent)] hover:text-[var(--nav-accent)]"
                >
                  Avslå
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
