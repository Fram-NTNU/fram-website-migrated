"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type DropdownProps = {
  label: string;
  items: Array<{ href: string; label: string; external?: boolean }>;
  caretFontFamily: string;
};

const topLink = "relative py-1.5 text-sm leading-[normal] font-medium text-[var(--ink-soft)] no-underline transition-colors duration-200 hover:text-[var(--ink)] after:absolute after:inset-x-0 after:-bottom-1 after:h-[3px] after:origin-left after:scale-x-0 after:rounded-sm after:bg-[var(--nav-accent)] after:transition-transform after:duration-200 hover:after:scale-x-100 max-[900px]:border-b max-[900px]:border-[var(--line)] max-[900px]:px-1 max-[900px]:py-[15px] max-[900px]:text-base max-[900px]:after:hidden";

function Dropdown({ label, items, caretFontFamily }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`nav-dd group relative inline-flex items-center max-[900px]:block max-[900px]:w-full ${open ? "open" : ""}`}>
      <button
        type="button"
        className="nav-dd-btn inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent px-0 py-1.5 font-sans text-sm leading-[normal] font-medium text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)] max-[900px]:w-full max-[900px]:justify-between max-[900px]:border-b max-[900px]:border-[var(--line)] max-[900px]:px-1 max-[900px]:py-[15px] max-[900px]:text-base"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <span aria-hidden="true" style={{ fontFamily: caretFontFamily }} className={`dd-caret text-[10px] leading-[normal] transition-transform duration-200 group-hover:rotate-180 max-[900px]:group-hover:rotate-0 ${open ? "max-[900px]:rotate-180" : ""}`}>▾</span>
      </button>
      <div className={`nav-dd-menu invisible pointer-events-none absolute top-full left-1/2 z-[60] flex min-w-[190px] -translate-x-1/2 translate-y-2.5 flex-col gap-0.5 rounded-[14px] border border-[var(--line)] bg-[var(--card)] p-2 opacity-0 shadow-[0_18px_40px_-18px_rgba(0,0,0,.28)] transition-[opacity,transform] duration-200 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-2 group-hover:opacity-100 max-[900px]:static max-[900px]:min-w-0 max-[900px]:translate-x-0 max-[900px]:translate-y-0 max-[900px]:border-0 max-[900px]:bg-transparent max-[900px]:py-2 max-[900px]:pr-0 max-[900px]:pl-3 max-[900px]:shadow-none max-[900px]:group-hover:translate-y-0 ${open ? "max-[900px]:visible max-[900px]:pointer-events-auto max-[900px]:flex max-[900px]:opacity-100" : "max-[900px]:hidden"}`}>
        {items.map((item) => item.external ? (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener"
            className="block whitespace-nowrap rounded-[9px] px-3.5 py-2.5 text-sm font-medium text-[var(--ink-soft)] no-underline transition-colors hover:bg-[var(--bg-soft)] hover:text-[var(--ink)] max-[900px]:px-1.5 max-[900px]:py-[11px] max-[900px]:text-[15px]"
          >
            {item.label}
          </a>
        ) : (
          <Link key={item.href} href={item.href} className="block whitespace-nowrap rounded-[9px] px-3.5 py-2.5 text-sm font-medium text-[var(--ink-soft)] no-underline transition-colors hover:bg-[var(--bg-soft)] hover:text-[var(--ink)] max-[900px]:px-1.5 max-[900px]:py-[11px] max-[900px]:text-[15px]">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader({ caretFontFamily = 'Poppins, "Poppins Fallback", system-ui, sans-serif' }: { caretFontFamily?: string } = {}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <nav className="top sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_88%,transparent)] backdrop-blur-[14px]">
      <div className="nav-inner mx-auto flex h-[82px] max-w-[1360px] items-center justify-between px-12 max-[900px]:h-16 max-[900px]:px-5 max-[520px]:px-4">
        <Link href="/" className="logo flex items-center no-underline" aria-label="FRAM NTNU">
          {/* Plain img is retained deliberately during visual-parity migration. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img width="400" height="142" decoding="async" src="/assets/fram-logo.webp" alt="FRAM NTNU" className="logo-img block h-[38px] w-auto max-[900px]:h-8" />
        </Link>
        <div className={`nav-links flex items-center gap-8 text-sm font-medium max-[900px]:fixed max-[900px]:inset-x-0 max-[900px]:top-16 max-[900px]:z-40 max-[900px]:max-h-[calc(100vh-64px)] max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:gap-0 max-[900px]:overflow-y-auto max-[900px]:border-b max-[900px]:border-[var(--line)] max-[900px]:bg-[var(--bg)] max-[900px]:px-5 max-[900px]:pt-2 max-[900px]:pb-5 max-[900px]:shadow-[0_24px_40px_-24px_rgba(0,0,0,.35)] max-[520px]:px-4 ${menuOpen ? "max-[900px]:translate-y-0 max-[900px]:opacity-100 max-[900px]:pointer-events-auto" : "max-[900px]:-translate-y-3 max-[900px]:opacity-0 max-[900px]:pointer-events-none"} max-[900px]:transition-[opacity,transform] max-[900px]:duration-200`} onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
        }}>
          <Link href="/" className={topLink}>Utforsk</Link>
          <Dropdown caretFontFamily={caretFontFamily} label="Arrangementer" items={[
            { href: "/innovasjonsdagene", label: "Innovasjonsdagene" },
            { href: "/arrangementer#koble", label: "Koble" },
            { href: "/arrangementer", label: "Alle arrangementer" },
          ]} />
          <Link href="/miljoer" className={topLink}>Miljøene</Link>
          <Link href="/booking" className={topLink}>Booking</Link>
          <Dropdown caretFontFamily={caretFontFamily} label="Arealer & rom" items={[
            { href: "https://www.gruvantnu.no/", label: "Gruva", external: true },
            { href: "/idegarasjen", label: "Idégarasjen" },
          ]} />
          <Link href="/om" className={topLink}>Om Fram</Link>
        </div>
        <button
          type="button"
          className={`nav-burger hidden h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--card)] p-0 text-[var(--ink)] max-[900px]:inline-flex ${menuOpen ? "is-open" : ""}`}
          aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? (
            <svg className="x block h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>
          ) : (
            <svg className="menu block h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
          )}
        </button>
      </div>
    </nav>
  );
}
