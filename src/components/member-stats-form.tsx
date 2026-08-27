"use client";

import { useState } from "react";
import type { MemberStats } from "@/lib/member-stats";

function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}

/**
 * Rapporter antall medlemmer, med datoen tallet gjelder for.
 *
 * MERK: kun UI. State lever i komponenten og nullstilles ved refresh.
 * TODO(persist): lagre { count, asOf } mot orgens oppføring, gjerne som en ny
 * rad i en rapporteringshistorikk så man kan se utvikling over tid.
 */
export function MemberStatsForm({ initial }: { initial: MemberStats }) {
  const [count, setCount] = useState(initial.count);
  const [asOf, setAsOf] = useState(() => initial.asOf || iso(new Date()));
  const [status, setStatus] = useState<"idle" | "saved">("idle");

  function change(next: number) {
    setCount(Math.max(0, next));
    setStatus("idle");
  }

  // Funksjonell oppdatering — tåler raske klikk uten stale closure.
  function step(delta: number) {
    setCount((c) => Math.max(0, c + delta));
    setStatus("idle");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO(persist): skriv til datalageret her.
    setStatus("saved");
  }

  const stepBtn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[20px] text-[var(--ink)] [transition:border-color_.2s,transform_.15s] hover:border-[var(--ink)] active:scale-95 disabled:opacity-40 disabled:hover:border-[var(--line)]";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="rounded-[22px] border border-[var(--line)] bg-[var(--card)] p-8 shadow-[0_1px_2px_rgba(0,0,0,.04)] max-[560px]:p-6">
        <p className="m-0 mb-6 font-mono text-[11px] tracking-[.14em] text-[var(--muted)] uppercase">
          Antall medlemmer
        </p>

        <div className="flex items-center justify-center gap-6 max-[440px]:gap-4">
          <button type="button" onClick={() => step(-1)} disabled={count <= 0} className={stepBtn} aria-label="Færre">
            <i className="ph ph-minus" aria-hidden="true" />
          </button>

          <input
            type="number"
            min={0}
            value={count}
            onChange={(e) => change(Number(e.target.value))}
            className="w-[180px] border-0 bg-transparent text-center text-[64px] font-extrabold tracking-[-.03em] text-[var(--ink)] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none max-[440px]:w-[130px] max-[440px]:text-[48px]"
            aria-label="Antall medlemmer"
          />

          <button type="button" onClick={() => step(1)} className={stepBtn} aria-label="Flere">
            <i className="ph ph-plus" aria-hidden="true" />
          </button>
        </div>

        <label className="mx-auto mt-8 flex max-w-[280px] flex-col gap-2 border-t border-[var(--line)] pt-6">
          <span className="text-center text-[13px] font-semibold text-[var(--ink-soft)]">Gjelder per</span>
          <input
            type="date"
            value={asOf}
            max={iso(new Date())}
            onChange={(e) => {
              setAsOf(e.target.value);
              setStatus("idle");
            }}
            className="rounded-lg border border-[var(--line)] bg-white px-3 py-2.5 text-center text-[14px] text-[var(--ink)] outline-none [transition:border-color_.2s,box-shadow_.2s] focus:border-[var(--blue)] focus:shadow-[0_0_0_3px_rgba(46,134,193,.15)]"
          />
        </label>
      </div>

      <div className="flex items-start gap-3 rounded-[18px] border border-[var(--line)] bg-[var(--bg-soft)] px-5 py-4">
        <i className="ph ph-info mt-0.5 text-[18px] text-[var(--blue)]" aria-hidden="true" />
        <p className="m-0 text-[13.5px] leading-[1.55] text-[var(--ink-soft)]">
          Tallet brukes i FRAMs samlede statistikk over studentengasjement. Oppdater det gjerne etter hvert opptak.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-[15px] font-semibold text-white [transition:transform_.2s,background_.2s] hover:-translate-y-px hover:bg-[var(--blue)]"
        >
          <i className="ph ph-check" aria-hidden="true" />
          Lagre medlemstall
        </button>
        {status === "saved" && (
          <span role="status" className="text-[13.5px] font-semibold text-[var(--ink-soft)]">
            Lagret lokalt — ikke publisert ennå.
          </span>
        )}
      </div>
    </form>
  );
}
