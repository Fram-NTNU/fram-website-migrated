"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const socialPath = {
  Instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  Facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  LinkedIn: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  YouTube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
} as const;

const socials = [
  { name: "Instagram", href: "https://www.instagram.com/framntnu/", color: "#E1306C" },
  { name: "Facebook", href: "https://www.facebook.com/framntnu", color: "#1877F2" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/framntnu/", color: "#0A66C2" },
  { name: "YouTube", href: "https://www.youtube.com/@FramNTNU", color: "#FF0000" },
] as const;

function SlackIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A" />
      <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0" />
      <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D" />
      <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E" />
    </svg>
  );
}

export function SiteFooter({ mobileExtraBottomPadding = false }: { mobileExtraBottomPadding?: boolean } = {}) {
  const [slackOpen, setSlackOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!slackOpen) return;
    closeButton.current?.focus();
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSlackOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [slackOpen]);

  const socialButton = "foot-social flex h-9 w-9 items-center justify-center rounded-[3px] border border-[var(--line)] bg-[var(--card)] no-underline [transition:transform_.2s,border-color_.2s] hover:[transform:translateY(-2px)]";

  return (
    <>
      <footer className={`relative border-t border-[var(--line)] bg-[var(--bg)] pt-12 pb-8 font-mono text-xs leading-[normal] tracking-[.04em] text-[var(--muted)] before:absolute before:top-0 before:right-0 before:left-0 before:h-2 before:bg-[linear-gradient(90deg,var(--yellow)_0_25%,var(--blue)_25%_50%,var(--red)_50%_75%,var(--teal)_75%)] before:content-[''] ${mobileExtraBottomPadding ? "max-[520px]:pb-9" : ""}`}>
        <div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
          <div className="mb-7 flex flex-wrap items-start justify-between gap-10 border-b border-[var(--line)] pb-7">
            <div className="flex flex-col gap-2.5">
              <div className="mb-1 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img width="400" height="142" decoding="async" src="/assets/fram-logo.webp" alt="FRAM NTNU" className="block h-[26px] w-auto saturate-[.4]" />
              </div>
              <div className="leading-[1.9]">Sem Sælands vei 1, 7034 Trondheim<br /><a href="mailto:framntnu@gmail.com" className="text-[var(--muted)] no-underline transition-colors hover:text-[var(--ink)]">framntnu@gmail.com</a></div>
              <div className="flex items-center gap-2.5">
                {socials.map(({ name, href, color }) => (
                  <a key={name} href={href} target="_blank" rel="noopener" aria-label={name} className={`${socialButton} hover:border-current`} style={{ color }}>
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d={socialPath[name]} /></svg>
                  </a>
                ))}
                <button type="button" className={`${socialButton} cursor-pointer p-0 hover:border-[#4A154B]`} aria-label="Slack" onClick={() => setSlackOpen(true)}><SlackIcon /></button>
              </div>
            </div>

            <div className="flex flex-col gap-3 max-[620px]:w-full">
              <div className="mb-1 text-[10px] font-semibold tracking-[.14em] uppercase">Samarbeidspartnere</div>
              <div className="flex flex-col items-start gap-[18px] max-[620px]:flex-row max-[620px]:items-center max-[620px]:gap-5">
                {/* Plain images retained for path and layout parity. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img width="550" height="157" loading="lazy" decoding="async" src="/assets/sparebank1SMNhvit.png" alt="SpareBank 1 SMN" className="-ml-2 h-9 w-auto max-[620px]:h-5" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img width="500" height="198" loading="lazy" decoding="async" src="/assets/partners/equinor.webp" alt="Equinor" className="h-[34px] w-auto max-[620px]:h-5" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img width="500" height="344" loading="lazy" decoding="async" src="/assets/DNB_Logo.png" alt="DNB" className="mt-4 h-[30px] w-auto max-[620px]:mt-0 max-[620px]:h-5" />
              </div>
            </div>

            <div className="flex items-start gap-8 max-[620px]:hidden">
              <div className="flex flex-col gap-2">
                <div className="mb-1 text-[10px] font-semibold tracking-[.14em] uppercase">Sider</div>
                {[
                  ["/miljoer", "Miljøene"], ["/arrangementer", "Arrangementer"], ["/booking", "Book lokalene"], ["/om", "Om Fram"], ["/innovasjonsdagene", "Innovasjonsdagene"],
                ].map(([href, label]) => <Link key={href} href={href} className="text-xs leading-[1.8] text-[var(--ink-soft)] no-underline transition-colors hover:text-[var(--ink)]">{label}</Link>)}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>© 2015–2026 Fram NTNU</div>
            <div className="flex items-center gap-3.5">
              <span className="text-[10px] tracking-[.16em] uppercase">Tilknyttet</span>
              <span role="img" aria-label="NTNU" className="inline-block h-[22px] w-[116px] bg-[#00509E] [mask:url('/assets/ntnu-logo-dark.webp')_left_center/contain_no-repeat]" />
            </div>
          </div>
        </div>
      </footer>

      {slackOpen && (
        <div id="slack-modal" className="open fixed inset-0 z-[9999] flex items-center justify-center bg-black/55" role="dialog" aria-modal="true" aria-labelledby="slack-modal-title" onMouseDown={(event) => event.target === event.currentTarget && setSlackOpen(false)}>
          <div className="relative w-[90%] max-w-[380px] rounded-[14px] bg-[var(--card)] px-8 pt-9 pb-7 text-center shadow-[0_8px_40px_rgba(0,0,0,.2)]">
            <button ref={closeButton} type="button" className="absolute top-2.5 right-3.5 cursor-pointer border-0 bg-transparent p-1 text-2xl leading-none text-[var(--ink-soft)] hover:text-[var(--ink)]" aria-label="Lukk" onClick={() => setSlackOpen(false)}>&times;</button>
            <SlackIcon className="mx-auto mb-4 block h-11 w-11" />
            <h3 id="slack-modal-title" className="m-0 mb-2.5 text-[1.1rem] font-bold text-[var(--ink)]">Kun for ledere</h3>
            <p className="m-0 text-[.95rem] leading-[1.6] text-[var(--ink-soft)]">Slacken er for tiden bare for lederne av våre medlemsorganisasjoner. Ønsker du tilgang, ta kontakt med oss.</p>
          </div>
        </div>
      )}
    </>
  );
}
