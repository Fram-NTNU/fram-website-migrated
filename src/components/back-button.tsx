"use client";

export function BackButton() {
  return (
    <button
      type="button"
      className="m-0 mb-4 inline-flex cursor-pointer items-center gap-3 rounded-[14px] border-0 bg-[var(--ink)] px-8 py-4 font-sans text-base leading-[normal] font-bold text-[var(--bg)] transition-transform duration-200 hover:-translate-y-0.5"
      onClick={() => window.history.back()}
    >
      ← Ta meg tilbake
    </button>
  );
}
