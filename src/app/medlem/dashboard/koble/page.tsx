import type { Metadata } from "next";
import Link from "next/link";
import { KobleCarousel } from "@/components/koble-carousel";
import { KobleMark } from "@/components/koble-mark";
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

export default function KoblePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F0] font-sans text-[#1A1A1A] [--bg-soft:#F4EFE5] [--bg:#FBF7F0] [--blue:#2E86C1] [--card:#fff] [--ink-soft:#555] [--ink:#1A1A1A] [--line:#E9E2D3] [--muted:#8a8a8a] [--nav-accent:#E85A5A] [--orange:#E58A3A] [--yellow:#FDC82F]">
      <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
      <MemberTopbar orgName={placeholderProfile.name} />

      <main className="mx-auto w-full max-w-[1100px] flex-1 px-6 py-10 max-[520px]:px-4">
        <Link
          href="/medlem/dashboard/guide"
          className="mb-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--ink-soft)] no-underline hover:text-[var(--ink)]"
        >
          <i className="ph ph-arrow-left" aria-hidden="true" />
          Tilbake til guiden
        </Link>

        {/* Hero — gala-lilla, som Koble-seksjonen på framntnu.no */}
        <section className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#1A0B26_0%,#3A0F5E_55%,#6B1A8A_100%)] p-11 text-[#F7EEFF] shadow-[0_28px_70px_-28px_rgba(26,11,38,.85)] max-[560px]:p-6">
          <div className="grid grid-cols-[1.12fr_.88fr] items-center gap-12 max-[820px]:grid-cols-1 max-[820px]:gap-8">
            <div className="min-w-0">
              <KobleMark className="mb-6 h-12 w-auto text-white" />
              <h1 className="m-0 text-[clamp(48px,6.5vw,84px)] leading-[.92] font-extrabold tracking-[-.035em]">
                <span className="text-[#FFD1F7]">Koble.</span>
              </h1>
              <p className="mt-3 mb-5 text-[clamp(19px,1.8vw,24px)] leading-[1.3] font-medium tracking-[-.01em] text-[#E8B0F5] italic">
                Innovasjonskollektivets årlige galla.
              </p>
              <p className="mt-0 mb-8 max-w-[520px] text-[16px] leading-[1.65] text-[#E5C8F0]">
                En kveld i året kler medlemmene av Fram seg opp, samles på Frimurerlogen, og feirer året som har
                gått. Show, middag, taler og dans. Kun for medlemsorganisasjoner — påmelding publiseres i Slack i
                månedene før arrangementet.
              </p>
              <dl className="m-0 grid max-w-[520px] grid-cols-3 gap-6 border-t border-white/18 pt-6 max-[760px]:gap-3">
                <div>
                  <dt className="mb-2 font-mono text-[10px] tracking-[.14em] text-[#B68BCC] uppercase">Når</dt>
                  <dd className="m-0 text-[16px] font-semibold text-white max-[760px]:text-[13px]">Våren</dd>
                </div>
                <div>
                  <dt className="mb-2 font-mono text-[10px] tracking-[.14em] text-[#B68BCC] uppercase">Hvor</dt>
                  <dd className="m-0 text-[16px] font-semibold text-white max-[760px]:text-[13px]">Frimurerlogen</dd>
                </div>
                <div>
                  <dt className="mb-2 font-mono text-[10px] tracking-[.14em] text-[#B68BCC] uppercase">Hvem</dt>
                  <dd className="m-0 text-[16px] font-semibold text-white max-[760px]:text-[13px]">Fram-medlemmer</dd>
                </div>
              </dl>
              {/* TODO(innhold): fyll inn dato når den er satt */}
              <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#FFD1F7]/35 bg-[#FFD1F7]/10 px-5 py-2.5 text-[13px] font-semibold text-[#FFD1F7]">
                <i className="ph ph-calendar-dots" aria-hidden="true" />
                Dato for neste Koble annonseres
              </span>
            </div>

            <KobleCarousel />
          </div>
        </section>

        {/* Kvelden */}
        <section className="mt-12">
          <p className="m-0 mb-3 font-mono text-[11px] font-semibold tracking-[.2em] text-[#6B1A8A] uppercase">Kvelden</p>
          <h2 className="mt-0 mb-6 text-[clamp(22px,3vw,28px)] font-extrabold tracking-[-.02em]">Show, middag, taler og dans</h2>
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

        {/* Om Koble */}
        <section className="mt-12 overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--card)] p-8 shadow-[0_1px_2px_rgba(0,0,0,.04)] max-[560px]:p-6">
          <p className="m-0 mb-3 font-mono text-[11px] font-semibold tracking-[.2em] text-[#6B1A8A] uppercase">Om Koble</p>
          <h2 className="mt-0 mb-4 text-[clamp(20px,3vw,26px)] font-extrabold tracking-[-.02em]">
            Én kveld, hele miljøet samlet
          </h2>
          <p className="m-0 max-w-[640px] text-[16px] leading-[1.65] text-[var(--ink-soft)]">
            Koble er årets største interne samling for medlemsorganisasjonene i FRAM. Målet er å bygge relasjoner,
            dele erfaringer og feire året som har gått — på tvers av alt fra rakett- og satellittlag til AI, design
            og entreprenørskap. Påmelding legges ut i leder-Slack i månedene før arrangementet.
          </p>
        </section>
      </main>
    </div>
  );
}
