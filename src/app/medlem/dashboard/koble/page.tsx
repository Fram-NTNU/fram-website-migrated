import type { Metadata } from "next";
import Link from "next/link";
import { KobleCarousel } from "@/components/koble-carousel";
import { MemberTopbar } from "@/components/member-topbar";
import { placeholderProfile } from "@/lib/member-profile";

export const metadata: Metadata = {
  title: "Koble — FRAM NTNU",
  description: "Koble — Innovasjonskollektivets årlige galla for medlemsorganisasjonene i FRAM.",
  robots: { index: false, follow: false },
};

const highlights = [
  { icon: "ph-microphone-stage", label: "Show" },
  { icon: "ph-fork-knife", label: "Middag" },
  { icon: "ph-chats-circle", label: "Taler" },
  { icon: "ph-confetti", label: "Dans" },
];

const meta = [
  { label: "Når", value: "Våren" },
  { label: "Hvor", value: "Frimurerlogen" },
  { label: "Hvem", value: "Fram-medlemmer" },
];

// Galleri. For å legge til flere bilder: dropp webp-filer i public/assets/koble/
// og legg til en linje her ({ src, alt, year }). Ingen Drive-lenker — bildene
// serveres direkte fra siden.
const gallery = [
  { src: "/assets/koble-2026-sax.webp", alt: "Koble 2026 — show på scenen", year: "2026" },
  { src: "/assets/koble-2026-vinnere.webp", alt: "Koble 2026 — prisvinnere", year: "2026" },
  { src: "/assets/koble-2025.webp", alt: "Koble 2025 på Frimurerlogen", year: "2025" },
];

export default function KoblePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F0] font-sans text-[#1A1A1A] [--bg-soft:#F4EFE5] [--bg:#FBF7F0] [--blue:#2E86C1] [--card:#fff] [--ink-soft:#555] [--ink:#1A1A1A] [--line:#E9E2D3] [--muted:#8a8a8a] [--nav-accent:#E85A5A] [--orange:#E58A3A] [--yellow:#FDC82F]">
      <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
      <MemberTopbar orgName={placeholderProfile.name} />

      <main className="mx-auto w-full max-w-[1040px] flex-1 px-6 py-10 max-[520px]:px-4">
        <Link
          href="/medlem/dashboard/guide"
          className="mb-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--ink-soft)] no-underline hover:text-[var(--ink)]"
        >
          <i className="ph ph-arrow-left" aria-hidden="true" />
          Tilbake til guiden
        </Link>

        {/* Bilde-hero — Koble-bildene i bakgrunnen med lilla scrim og tittel oppå */}
        <section className="relative overflow-hidden rounded-[28px] shadow-[0_28px_70px_-28px_rgba(26,11,38,.85)]">
          <div className="absolute inset-0">
            <KobleCarousel aspectClassName="h-full" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,11,38,.95)_0%,rgba(26,11,38,.55)_44%,rgba(26,11,38,.12)_100%)]" />
          <div className="relative z-10 flex min-h-[540px] flex-col justify-end p-11 text-[#F7EEFF] max-[560px]:min-h-[420px] max-[560px]:p-6">
            <h1 className="m-0 text-[clamp(56px,9vw,104px)] leading-[.88] font-extrabold tracking-[-.04em] [text-shadow:0_4px_40px_rgba(0,0,0,.5)]">
              <span className="text-[#FFD1F7]">Koble.</span>
            </h1>
            <p className="mt-4 mb-6 text-[clamp(20px,2.2vw,28px)] leading-[1.25] font-medium tracking-[-.01em] text-[#F1CDF8] italic [text-shadow:0_2px_20px_rgba(0,0,0,.6)]">
              Innovasjonskollektivets årlige galla.
            </p>
            {/* TODO(innhold): fyll inn dato når den er satt */}
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#FFD1F7]/40 bg-[#1A0B26]/40 px-5 py-2.5 text-[13px] font-semibold text-[#FFD1F7] backdrop-blur-sm">
              <i className="ph ph-calendar-dots" aria-hidden="true" />
              Dato for neste Koble annonseres
            </span>
          </div>
        </section>

        {/* Om + praktisk */}
        <section className="mt-12 grid grid-cols-[1.5fr_1fr] items-start gap-10 max-[720px]:grid-cols-1 max-[720px]:gap-8">
          <div>
            <p className="m-0 mb-3 font-mono text-[11px] font-semibold tracking-[.2em] text-[#6B1A8A] uppercase">Om Koble</p>
            <p className="m-0 text-[17px] leading-[1.65] text-[var(--ink-soft)]">
              En kveld i året kler medlemmene av Fram seg opp, samles på Frimurerlogen, og feirer året som har
              gått. Koble er årets store feiring for medlemsorganisasjonene — show, middag, taler og dans, der
              hele innovasjonsmiljøet samles for å heie på hverandre og markere alt som er skapt. Kun for
              medlemsorganisasjoner; påmelding åpner i månedene før arrangementet.
            </p>
          </div>
          <dl className="m-0 grid grid-cols-1 gap-3">
            {meta.map((m) => (
              <div key={m.label} className="flex items-center justify-between rounded-[16px] border border-[var(--line)] bg-[var(--card)] px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,.04)]">
                <dt className="m-0 font-mono text-[10px] tracking-[.14em] text-[var(--muted)] uppercase">{m.label}</dt>
                <dd className="m-0 text-[16px] font-extrabold text-[var(--ink)]">{m.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Kvelden */}
        <section className="mt-14">
          <p className="m-0 mb-3 font-mono text-[11px] font-semibold tracking-[.2em] text-[#6B1A8A] uppercase">Kvelden</p>
          <h2 className="mt-0 mb-6 text-[clamp(24px,3.5vw,32px)] font-extrabold tracking-[-.02em]">Show, middag, taler og dans</h2>
          <div className="grid grid-cols-4 gap-4 max-[640px]:grid-cols-2">
            {highlights.map((h) => (
              <div key={h.label} className="flex flex-col items-center gap-3 rounded-[18px] border border-[var(--line)] bg-[var(--card)] p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,.04)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6B1A8A]/10 text-[24px] text-[#6B1A8A]">
                  <i className={`ph ${h.icon}`} aria-hidden="true" />
                </span>
                <span className="text-[15px] font-bold">{h.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Galleri */}
        <section className="mt-14">
          <p className="m-0 mb-3 font-mono text-[11px] font-semibold tracking-[.2em] text-[#6B1A8A] uppercase">Galleri</p>
          <h2 className="mt-0 mb-6 text-[clamp(24px,3.5vw,32px)] font-extrabold tracking-[-.02em]">Bilder fra Koble</h2>
          <div className="grid grid-cols-3 gap-4 max-[640px]:grid-cols-2 max-[440px]:grid-cols-1">
            {gallery.map((g) => (
              <figure key={g.src} className="group relative m-0 aspect-[4/3] overflow-hidden rounded-[16px] border border-[var(--line)] bg-[var(--bg-soft)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover [transition:transform_.45s_ease] group-hover:scale-[1.04]"
                />
                <figcaption className="absolute bottom-2 left-2 rounded-full bg-[#1A0B26]/80 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[.1em] text-[#F7EEFF] backdrop-blur-sm">
                  {g.year}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
