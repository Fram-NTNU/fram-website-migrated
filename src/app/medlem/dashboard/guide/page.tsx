import type { Metadata } from "next";
import Link from "next/link";
import { MemberTopbar } from "@/components/member-topbar";
import {
  benefits,
  breadNSpread,
  expectations,
  futureExpectations,
  gettingStarted,
  guideIntro,
  meetingPlaces,
} from "@/lib/member-guide";
import { placeholderProfile } from "@/lib/member-profile";

export const metadata: Metadata = {
  title: "Guide for medlemmer — FRAM NTNU",
  description: "Alt nye medlemsorganisasjoner trenger å vite om medlemskapet i FRAM.",
  robots: { index: false, follow: false },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="m-0 mb-3 font-mono text-[11px] font-semibold tracking-[.2em] text-[var(--blue)] uppercase">{children}</p>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-0 mb-4 text-[clamp(22px,3vw,28px)] font-extrabold tracking-[-.02em]">{children}</h2>;
}

export default function MemberGuidePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F0] font-sans text-[#1A1A1A] [--bg-soft:#F4EFE5] [--bg:#FBF7F0] [--blue:#2E86C1] [--card:#fff] [--ink-soft:#555] [--ink:#1A1A1A] [--line:#E9E2D3] [--muted:#8a8a8a] [--nav-accent:#E85A5A] [--orange:#E58A3A] [--teal:#3CBFAB] [--yellow:#FDC82F]">
      <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
      <MemberTopbar orgName={placeholderProfile.name} />

      <main className="mx-auto w-full max-w-[760px] flex-1 px-6 py-10 max-[520px]:px-4">
        <Link
          href="/medlem/dashboard"
          className="mb-8 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--ink-soft)] no-underline hover:text-[var(--ink)]"
        >
          <i className="ph ph-arrow-left" aria-hidden="true" />
          Tilbake til medlemsområdet
        </Link>

        {/* Intro */}
        <section className="mb-14">
          <Eyebrow>Om medlemskapet</Eyebrow>
          <h1 className="mt-0 mb-4 text-[clamp(30px,5vw,46px)] leading-[1.03] font-extrabold tracking-[-.02em]">
            Velkommen til FRAM
          </h1>
          <p className="mt-0 mb-4 text-[18px] leading-[1.55] font-semibold text-[var(--ink)]">{guideIntro.lead}</p>
          <p className="mt-0 mb-8 text-[15.5px] leading-[1.65] text-[var(--ink-soft)]">{guideIntro.body}</p>
          <div className="grid grid-cols-3 gap-4 max-[480px]:grid-cols-1">
            {guideIntro.stats.map((s) => (
              <div key={s.label} className="rounded-[18px] border border-[var(--line)] bg-[var(--card)] p-5 text-center shadow-[0_1px_2px_rgba(0,0,0,.04)]">
                <div className="text-[34px] font-extrabold tracking-[-.02em] text-[var(--blue)]">{s.value}</div>
                <div className="mt-1 text-[13px] text-[var(--ink-soft)]">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Medlemsfordeler */}
        <section className="mb-14">
          <Eyebrow>Medlemsfordeler</Eyebrow>
          <SectionTitle>Dette får dere som medlem</SectionTitle>
          <ul className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-3.5 p-0 max-[560px]:grid-cols-1">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[14.5px] leading-[1.5] text-[var(--ink-soft)]">
                <i className="ph ph-check-circle mt-0.5 shrink-0 text-[18px] text-[var(--teal)]" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </section>

        {/* Forventninger */}
        <section className="mb-14">
          <Eyebrow>Forventninger</Eyebrow>
          <SectionTitle>Dette forventer vi av dere</SectionTitle>
          <p className="mt-0 mb-5 text-[15px] leading-[1.6] text-[var(--ink-soft)]">
            FRAM fungerer best når medlemsorganisasjonene også bidrar aktivt til fellesskapet. Vi forventer at dere:
          </p>
          <ul className="m-0 mb-8 flex list-none flex-col gap-3 p-0">
            {expectations.map((e) => (
              <li key={e} className="flex items-start gap-2.5 text-[15px] leading-[1.55] text-[var(--ink)]">
                <i className="ph ph-dot-outline mt-0.5 shrink-0 text-[18px] text-[var(--blue)]" aria-hidden="true" />
                {e}
              </li>
            ))}
          </ul>
          <div className="rounded-[18px] border border-[var(--line)] bg-[var(--bg-soft)] p-6">
            <p className="m-0 mb-3 font-mono text-[10px] font-semibold tracking-[.16em] text-[var(--muted)] uppercase">På sikt</p>
            <p className="mt-0 mb-4 text-[14.5px] leading-[1.6] text-[var(--ink-soft)]">
              FRAM bygger nye digitale løsninger som skal gjøre det enklere å samle og synliggjøre innovasjonsmiljøet. Når de lanseres, forventer vi at dere:
            </p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {futureExpectations.map((e) => (
                <li key={e} className="flex items-start gap-2.5 text-[14.5px] leading-[1.55] text-[var(--ink)]">
                  <i className="ph ph-arrow-right mt-1 shrink-0 text-[14px] text-[var(--orange)]" aria-hidden="true" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Kom i gang */}
        <section className="mb-14">
          <Eyebrow>Kom i gang</Eyebrow>
          <SectionTitle>Første steg som nytt medlem</SectionTitle>
          <p className="mt-0 mb-6 text-[15px] leading-[1.6] text-[var(--ink-soft)]">
            Åtte punkter som får organisasjonen deres opp og gå i FRAM. Der det finnes en snarvei i portalen, kan dere hoppe rett til den.
          </p>
          <ol className="m-0 flex list-none flex-col gap-3 p-0">
            {gettingStarted.map((step) => {
              const content = (
                <>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--bg-soft)] font-mono text-[13px] font-bold text-[var(--ink)]">
                    {step.n}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-[15.5px] font-bold">
                      {step.title}
                      {step.href && <i className="ph ph-arrow-up-right text-[13px] text-[var(--blue)]" aria-hidden="true" />}
                    </span>
                    <span className="mt-0.5 block text-[14px] leading-[1.5] text-[var(--ink-soft)]">{step.body}</span>
                  </span>
                </>
              );
              const base = "flex items-start gap-4 rounded-[16px] border border-[var(--line)] bg-[var(--card)] p-4";
              return step.href ? (
                <li key={step.n}>
                  <Link href={step.href} className={`${base} no-underline text-[var(--ink)] [transition:border-color_.2s,transform_.2s] hover:-translate-y-px hover:border-[var(--ink)]`}>
                    {content}
                  </Link>
                </li>
              ) : (
                <li key={step.n} className={base}>
                  {content}
                </li>
              );
            })}
          </ol>
        </section>

        {/* Lenk til FRAM */}
        <section className="mb-14">
          <Eyebrow>Synlighet</Eyebrow>
          <SectionTitle>Lenk tilbake til FRAM</SectionTitle>
          <p className="mt-0 mb-5 text-[15px] leading-[1.6] text-[var(--ink-soft)]">
            En liten lenke fra deres egen nettside tilbake til framntnu.no styrker synligheten for hele
            innovasjonsmiljøet på søk. Vi har laget ferdige badge- og tekstlenke-varianter dere kan kopiere rett inn.
          </p>
          <Link
            href="/medlem/dashboard/lenk-til-fram"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-[14px] font-semibold text-white no-underline [transition:transform_.2s,background_.2s] hover:-translate-y-px hover:bg-[var(--blue)]"
          >
            <i className="ph ph-link" aria-hidden="true" />
            Åpne «Lenk til FRAM»
          </Link>
        </section>

        {/* Møteplasser */}
        <section className="mb-14">
          <Eyebrow>Møteplasser</Eyebrow>
          <SectionTitle>Viktige møteplasser gjennom året</SectionTitle>
          <div className="flex flex-col gap-3">
            {meetingPlaces.map((m) => (
              <div key={m.title} className="flex items-start gap-4 rounded-[16px] border border-[var(--line)] bg-[var(--card)] p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[var(--bg-soft)] text-[22px] text-[var(--blue)]">
                  <i className={`ph ${m.icon}`} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="mt-0 mb-1 text-[16px] font-extrabold tracking-[-.01em]">{m.title}</h3>
                  <p className="m-0 text-[14px] leading-[1.55] text-[var(--ink-soft)]">{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bread n' Spread */}
        <section className="mb-14">
          <Eyebrow>Samarbeid</Eyebrow>
          <div className="overflow-hidden rounded-[22px] border border-[var(--line)] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--orange)_12%,#fff),var(--card))] p-8 max-[560px]:p-6">
            <SectionTitle>Arranger Bread n&rsquo; Spread sammen med FRAM</SectionTitle>
            <p className="mt-0 mb-3 text-[15.5px] leading-[1.6] font-semibold text-[var(--ink)]">{breadNSpread.lead}</p>
            <p className="mt-0 mb-6 text-[14.5px] leading-[1.6] text-[var(--ink-soft)]">{breadNSpread.body}</p>
            <p className="m-0 mb-3 text-[13px] font-bold text-[var(--ink)]">Som samarbeidspartner kan dere for eksempel:</p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {breadNSpread.can.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-[14.5px] leading-[1.5] text-[var(--ink)]">
                  <i className="ph ph-check mt-0.5 shrink-0 text-[16px] text-[var(--orange)]" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Avslutning */}
        <section className="rounded-[22px] border border-[var(--line)] bg-[var(--card)] p-8 text-center max-[560px]:p-6">
          <p className="m-0 mb-2 font-mono text-[10px] font-semibold tracking-[.16em] text-[var(--muted)] uppercase">En del av noe større</p>
          <p className="mx-auto mt-0 mb-0 max-w-[520px] text-[15.5px] leading-[1.6] text-[var(--ink-soft)]">
            FRAM består av mange ulike organisasjoner med forskjellige fagområder. Noen bygger raketter, satellitter og kjøretøy. Andre jobber med entreprenørskap, kunstig intelligens, design, bærekraft eller nye startups. Fellesnevneren er ønsket om å skape noe. <span className="font-semibold text-[var(--ink)]">Velkommen til FRAM.</span>
          </p>
        </section>
      </main>
    </div>
  );
}
