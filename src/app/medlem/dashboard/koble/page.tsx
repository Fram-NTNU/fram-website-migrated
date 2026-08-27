import type { Metadata } from "next";
import Link from "next/link";
import { KobleMark } from "@/components/koble-mark";
import { MemberTopbar } from "@/components/member-topbar";
import { placeholderProfile } from "@/lib/member-profile";

export const metadata: Metadata = {
  title: "Koble — FRAM NTNU",
  description: "Koble — årets største samling for medlemsorganisasjonene i FRAM.",
  robots: { index: false, follow: false },
};

// TODO(innhold): bytt ut placeholder-bildene med ekte Koble-bilder fra ulike år
// (legg i public/assets/koble/), og fyll inn dato når den er satt.
const gallery = [
  { year: "2025" },
  { year: "2024" },
  { year: "2023" },
];

const highlights = [
  { icon: "ph-handshake", text: "Bygg relasjoner på tvers av organisasjonene" },
  { icon: "ph-lightbulb", text: "Del erfaringer og lær av andre miljøer" },
  { icon: "ph-rocket-launch", text: "Skap nye samarbeid og prosjekter" },
];

const GOLD = "#C9A24B";

export default function KoblePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F0] font-sans text-[#1A1A1A] [--bg-soft:#F4EFE5] [--bg:#FBF7F0] [--blue:#2E86C1] [--card:#fff] [--ink-soft:#555] [--ink:#1A1A1A] [--line:#E9E2D3] [--muted:#8a8a8a] [--nav-accent:#E85A5A] [--orange:#E58A3A] [--yellow:#FDC82F]">
      <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
      <MemberTopbar orgName={placeholderProfile.name} />

      <main className="mx-auto w-full max-w-[860px] flex-1 px-6 py-10 max-[520px]:px-4">
        <Link
          href="/medlem/dashboard/guide"
          className="mb-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--ink-soft)] no-underline hover:text-[var(--ink)]"
        >
          <i className="ph ph-arrow-left" aria-hidden="true" />
          Tilbake til guiden
        </Link>

        {/* Eksklusiv hero */}
        <section className="relative overflow-hidden rounded-[28px] bg-[#0E0D0B] px-10 py-16 text-center text-white shadow-[0_24px_70px_-28px_rgba(0,0,0,.7)] max-[560px]:px-6 max-[560px]:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,rgba(201,162,75,.20),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${GOLD}88,transparent)` }} />
          <div className="relative">
            <KobleMark className="mx-auto mb-8 h-[74px] w-auto text-white max-[560px]:h-[60px]" />
            <p className="m-0 mb-4 font-mono text-[11px] font-semibold tracking-[.28em] uppercase" style={{ color: GOLD }}>
              Møteplass · FRAM
            </p>
            <h1 className="m-0 text-[clamp(44px,8vw,78px)] leading-[.95] font-extrabold tracking-[-.03em]">Koble</h1>
            <p className="mx-auto mt-5 mb-8 max-w-[440px] text-[16px] leading-[1.6] text-white/65">
              Årets største interne samling for medlemsorganisasjonene i FRAM.
            </p>
            <span
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-semibold"
              style={{ borderColor: `${GOLD}55`, color: GOLD, backgroundColor: `${GOLD}12` }}
            >
              <i className="ph ph-calendar-dots" aria-hidden="true" />
              Arrangeres om våren · dato annonseres
            </span>
          </div>
        </section>

        {/* Om Koble */}
        <section className="mt-12">
          <p className="m-0 mb-3 font-mono text-[11px] font-semibold tracking-[.2em] text-[var(--blue)] uppercase">Om Koble</p>
          <h2 className="mt-0 mb-4 text-[clamp(22px,3vw,28px)] font-extrabold tracking-[-.02em]">Én kveld, hele miljøet samlet</h2>
          <p className="mt-0 mb-4 text-[16px] leading-[1.65] text-[var(--ink-soft)]">
            Koble er årets største interne samling for medlemsorganisasjonene i FRAM. Målet er å bygge
            relasjoner, dele erfaringer og skape samarbeid på tvers av miljøene — fra de som bygger raketter og
            satellitter til de som jobber med AI, design og entreprenørskap.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 max-[560px]:grid-cols-1">
            {highlights.map((h) => (
              <div key={h.text} className="rounded-[18px] border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_1px_2px_rgba(0,0,0,.04)]">
                <i className={`ph ${h.icon} text-[24px]`} style={{ color: GOLD }} aria-hidden="true" />
                <p className="mt-3 mb-0 text-[14px] leading-[1.5] text-[var(--ink)]">{h.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Når & hvor */}
        <section className="mt-12">
          <p className="m-0 mb-3 font-mono text-[11px] font-semibold tracking-[.2em] text-[var(--blue)] uppercase">Når &amp; hvor</p>
          <div className="grid grid-cols-3 gap-4 max-[560px]:grid-cols-1">
            <div className="rounded-[18px] border border-[var(--line)] bg-[var(--card)] p-6">
              <p className="m-0 mb-1 font-mono text-[10px] tracking-[.14em] text-[var(--muted)] uppercase">Tidspunkt</p>
              <p className="m-0 text-[18px] font-extrabold">Om våren</p>
            </div>
            <div className="rounded-[18px] border border-[var(--line)] bg-[var(--card)] p-6">
              <p className="m-0 mb-1 font-mono text-[10px] tracking-[.14em] text-[var(--muted)] uppercase">Dato</p>
              {/* TODO(innhold): fyll inn dato når den er satt */}
              <p className="m-0 text-[18px] font-extrabold text-[var(--ink-soft)]">Annonseres</p>
            </div>
            <div className="rounded-[18px] border border-[var(--line)] bg-[var(--card)] p-6">
              <p className="m-0 mb-1 font-mono text-[10px] tracking-[.14em] text-[var(--muted)] uppercase">Sted</p>
              <p className="m-0 text-[18px] font-extrabold">FRAM</p>
            </div>
          </div>
        </section>

        {/* Bildegalleri */}
        <section className="mt-12">
          <p className="m-0 mb-3 font-mono text-[11px] font-semibold tracking-[.2em] text-[var(--blue)] uppercase">Bilder</p>
          <h2 className="mt-0 mb-5 text-[clamp(22px,3vw,28px)] font-extrabold tracking-[-.02em]">Fra tidligere år</h2>
          <div className="grid grid-cols-3 gap-4 max-[560px]:grid-cols-2">
            {gallery.map((g) => (
              <figure key={g.year} className="group relative m-0 aspect-[4/3] overflow-hidden rounded-[18px] border border-[var(--line)] bg-[var(--bg-soft)]">
                {/* TODO(innhold): erstatt med ekte bilde <img src="/assets/koble/..." /> */}
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[var(--muted)]">
                  <i className="ph ph-image text-[26px]" aria-hidden="true" />
                  <span className="text-[12px]">Bilder kommer</span>
                </div>
                <figcaption className="absolute bottom-2 left-2 rounded-full bg-[#0E0D0B]/80 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[.1em] text-white">
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
