"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type DropdownProps = {
  label: string;
  items: Array<{ href: string; label: string; external?: boolean }>;
  caretFontFamily: string;
  active?: boolean;
};

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)]";
const topLink = `relative inline-flex min-h-11 items-center whitespace-nowrap py-1.5 text-sm leading-[normal] font-medium text-[var(--ink-soft)] no-underline transition-colors duration-200 hover:text-[var(--ink)] after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:origin-left after:scale-x-0 after:rounded-sm after:bg-[#E85A5A] after:transition-transform after:duration-200 hover:after:scale-x-100 motion-reduce:transition-none motion-reduce:after:transition-none max-[900px]:border-b max-[900px]:border-[var(--line)] max-[900px]:px-1 max-[900px]:py-[15px] max-[900px]:text-base max-[900px]:after:hidden ${focusRing}`;

function Dropdown({ label, items, caretFontFamily, active = false }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  return (
    <div
      ref={root}
      onMouseEnter={() => {
        if (window.matchMedia("(min-width: 901px) and (hover: hover)").matches) setOpen(true);
      }}
      onMouseLeave={(event) => {
        if (window.matchMedia("(min-width: 901px) and (hover: hover)").matches && !event.currentTarget.contains(document.activeElement)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      className={`nav-dd relative inline-flex items-center after:absolute after:top-full after:right-0 after:left-0 after:h-3.5 after:content-[''] max-[900px]:block max-[900px]:w-full max-[900px]:after:hidden ${open ? "open" : ""}`}
    >
      <button
        ref={trigger}
        type="button"
        className={`nav-dd-btn ${topLink} cursor-pointer gap-1.5 border-0 bg-transparent px-0 font-sans max-[900px]:w-full max-[900px]:justify-between ${active ? "!text-[var(--ink)] after:scale-x-100" : ""}`}
        aria-expanded={open}
        aria-controls={menuId}
        aria-current={active ? "page" : undefined}
        onClick={(event) => {
          // A pointer click must keep the menu opened by desktop hover visible.
          if (event.detail > 0 && window.matchMedia("(min-width: 901px) and (hover: hover)").matches) setOpen(true);
          else setOpen((value) => !value);
        }}
      >
        {label}
        <span aria-hidden="true" style={{ fontFamily: caretFontFamily }} className={`dd-caret text-[10px] leading-[normal] transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      <div id={menuId} className={`nav-dd-menu absolute top-full left-1/2 z-[60] flex min-w-[210px] -translate-x-1/2 flex-col gap-0.5 rounded-[4px] border border-[var(--line)] bg-[var(--card)] p-2 shadow-[0_18px_40px_-18px_rgba(0,0,0,.28)] transition-[opacity,transform] duration-200 motion-reduce:transition-none max-[900px]:static max-[900px]:min-w-0 max-[900px]:translate-x-0 max-[900px]:translate-y-0 max-[900px]:border-0 max-[900px]:bg-transparent max-[900px]:py-2 max-[900px]:pr-0 max-[900px]:pl-3 max-[900px]:shadow-none ${open ? "visible pointer-events-auto translate-y-2 opacity-100 max-[900px]:flex" : "invisible pointer-events-none translate-y-2.5 opacity-0 max-[900px]:hidden"}`}>
        {items.map((item) => item.external ? (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener"
            onClick={() => setOpen(false)}
            className={`flex min-h-11 items-center whitespace-nowrap rounded-[2px] px-3.5 py-2.5 text-sm font-medium text-[var(--ink-soft)] no-underline transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)] max-[900px]:px-1.5 max-[900px]:py-[11px] max-[900px]:text-[15px] ${focusRing}`}
          >
            {item.label}
          </a>
        ) : (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`flex min-h-11 items-center whitespace-nowrap rounded-[2px] px-3.5 py-2.5 text-sm font-medium text-[var(--ink-soft)] no-underline transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)] max-[900px]:px-1.5 max-[900px]:py-[11px] max-[900px]:text-[15px] ${focusRing}`}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader({
  caretFontFamily = 'Poppins, "Poppins Fallback", sans-serif',
  currentPath,
  dark = false,
  logoSrc,
  logoClassName,
}: { caretFontFamily?: string; currentPath?: string; dark?: boolean; logoSrc?: string; logoClassName?: string } = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  currentPath = currentPath ?? pathname;
  const navigationId = useId();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  return (
    <nav aria-label="Hovedmeny" className="top sticky top-0 z-50 border-b border-[var(--nav-border,var(--line))] bg-[color-mix(in_oklab,var(--nav-bg,var(--bg))_88%,transparent)] backdrop-blur-[14px]">
      <div className="nav-inner mx-auto flex h-[82px] max-w-[1360px] items-center gap-8 px-12 max-[1100px]:gap-6 max-[1100px]:px-8 max-[900px]:h-16 max-[900px]:gap-3 max-[900px]:px-5 max-[520px]:gap-2 max-[520px]:px-4">
        <Link href="/" className={`logo flex shrink-0 items-center no-underline ${focusRing}`} aria-label="FRAM NTNU">
          {/* Plain img is retained deliberately during visual-parity migration. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img width="400" height="142" decoding="async" src={logoSrc ?? "/assets/fram-logo.webp"} alt="FRAM NTNU" className={`logo-img block h-[38px] w-auto max-[900px]:h-8 ${logoClassName ?? ""} ${!logoSrc && dark ? "[filter:brightness(0)_invert(1)]" : ""}`} />
        </Link>
        <div id={navigationId} className={`nav-links ml-auto flex items-center gap-7 text-sm font-medium max-[1100px]:gap-5 max-[900px]:fixed max-[900px]:inset-x-0 max-[900px]:top-16 max-[900px]:z-40 max-[900px]:max-h-[calc(100dvh-64px)] max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:gap-0 max-[900px]:overflow-y-auto max-[900px]:border-b max-[900px]:border-[var(--line)] max-[900px]:bg-[var(--bg)] max-[900px]:px-5 max-[900px]:pt-2 max-[900px]:pb-5 max-[900px]:shadow-[0_24px_40px_-24px_rgba(0,0,0,.35)] max-[520px]:px-4 ${menuOpen ? "max-[900px]:visible max-[900px]:translate-y-0 max-[900px]:opacity-100 max-[900px]:pointer-events-auto" : "max-[900px]:invisible max-[900px]:-translate-y-3 max-[900px]:opacity-0 max-[900px]:pointer-events-none"} max-[900px]:transition-[opacity,transform] max-[900px]:duration-200 motion-reduce:transition-none`} onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
        }}>
          <Dropdown active={currentPath === "/innovasjonsdagene" || currentPath === "/arrangementer"} caretFontFamily={caretFontFamily} label="Arrangementer" items={[
            { href: "/innovasjonsdagene", label: "Innovasjonsdagene" },
            { href: "/arrangementer#koble", label: "Koble" },
            { href: "/arrangementer", label: "Alle arrangementer" },
          ]} />
          <Link href="/miljoer" aria-current={currentPath === "/miljoer" ? "page" : undefined} className={`${topLink} ${currentPath === "/miljoer" ? "!text-[var(--ink)] after:scale-x-100" : ""}`}>Miljøene</Link>
          <Dropdown active={currentPath?.startsWith("/booking") || currentPath === "/idegarasjen" || currentPath === "/teknologihallen"} caretFontFamily={caretFontFamily} label="Lokaler" items={[
            { href: "/booking", label: "Book rom" },
            { href: "/booking/lokaler", label: "Våre lokaler" },
            { href: "https://www.gruvantnu.no/", label: "Gruva", external: true },
            { href: "/idegarasjen", label: "Idégarasjen" },
            { href: "/teknologihallen", label: "Teknologihallen" },
          ]} />
          <Link href="/nyheter" aria-current={currentPath?.startsWith("/nyheter") ? "page" : undefined} className={`${topLink} ${currentPath?.startsWith("/nyheter") ? "!text-[var(--ink)] after:scale-x-100" : ""}`}>Nyheter</Link>
          <Link href="/om" aria-current={currentPath === "/om" ? "page" : undefined} className={`${topLink} ${currentPath === "/om" ? "!text-[var(--ink)] after:scale-x-100" : ""}`}>Om Fram</Link>
        </div>
        <a href="https://portal.framntnu.no/" className={`nav-portal inline-flex min-h-11 shrink-0 items-center justify-center rounded-[3px] border border-[var(--ink)] px-4 text-sm font-medium text-[var(--ink)] no-underline transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)] motion-reduce:transition-none max-[900px]:ml-auto max-[520px]:px-3 ${focusRing}`}>Portalen</a>
        <button
          ref={menuButton}
          type="button"
          className={`nav-burger hidden h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-[3px] border border-[var(--ink)] bg-[var(--card)] p-0 text-[var(--ink)] max-[900px]:inline-flex ${focusRing} ${menuOpen ? "is-open" : ""}`}
          aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
          aria-expanded={menuOpen}
          aria-controls={navigationId}
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
