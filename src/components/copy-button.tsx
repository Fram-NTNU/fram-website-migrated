"use client";

import { useState } from "react";

/**
 * Kopiér tekst til utklippstavla, med kort «Kopiert!»-tilbakemelding.
 */
export function CopyButton({
  text,
  label = "Kopiér HTML",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch {
      // Faller tilbake til execCommand under.
    }
    if (!ok) {
      // Fallback for usikker kontekst (http) der Clipboard-APIet er blokkert.
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        // Ga opp — la knappen stå uendret.
      }
    }
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold no-underline [transition:background_.2s,border-color_.2s] ${
        copied
          ? "bg-[color-mix(in_srgb,var(--teal)_16%,#fff)] text-[#2AA891]"
          : "bg-[var(--ink)] text-white hover:bg-[var(--blue)]"
      } ${className}`}
    >
      <i className={`ph ${copied ? "ph-check" : "ph-copy"}`} aria-hidden="true" />
      {copied ? "Kopiert!" : label}
    </button>
  );
}
