"use client";

import { useState } from "react";

// E-posten sendes base64-kodet fra serveren, og dekodes først når brukeren
// trykker «Vis e-post». Slik ligger ikke adressen som ren tekst i sidekilden.
export function RevealEmail({ encoded }: { encoded: string }) {
  const [email, setEmail] = useState<string | null>(null);

  if (email) {
    return (
      <a
        href={`mailto:${email}`}
        className="mt-[3px] inline-flex w-fit items-center gap-[7px] text-[13.5px] text-[var(--ink-soft)] no-underline transition-colors hover:text-[var(--ink)]"
      >
        <i className="ph ph-envelope-simple text-[14px] text-[var(--accent)]" aria-hidden="true" /> {email}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEmail(atob(encoded))}
      className="mt-[3px] inline-flex w-fit cursor-pointer items-center gap-[7px] rounded-full border border-[var(--line)] bg-[var(--bg-soft)] px-3.5 py-1.5 text-[12.5px] font-semibold text-[var(--ink-soft)] [transition:border-color_.2s,color_.2s,background_.2s] hover:border-[var(--ink)] hover:text-[var(--ink)]"
    >
      <i className="ph ph-envelope-simple text-[14px] text-[var(--accent)]" aria-hidden="true" /> Vis e-post
    </button>
  );
}
