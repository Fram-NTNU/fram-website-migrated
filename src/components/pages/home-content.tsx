/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import {
  HomeEventBar,
  RoomExplorer,
  RotatingMemberLogo,
  YouTubeFacade,
} from "@/components/home-interactions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Lang } from "@/i18n/config";
import { SITE_URL, localizeHref, path } from "@/i18n/config";
import { organizations } from "@/lib/organizations";

const copy = {
  nb: {
    heroTitlePre: "Velkommen til ",
    heroLeadMobile:
      "Fram er paraplyorganisasjonen for innovasjonsmiljøet på NTNU — åpent for alle studenter som er interessert i innovasjon og entreprenørskap.",
    heroImageAlt:
      "Innovasjonsmiljøet ved NTNU — illustrert oversikt over lokaler og organisasjoner",
    heroLead:
      "FRAM NTNU er et senter for innovasjon og entreprenørskap ved NTNU, åpent for alle studenter uavhengig av studieprogram eller erfaring. Som møteplass og paraplyorganisasjon samler FRAM studentdrevne initiativer og tilbyr lokaler, arrangementer, workshops og et inkluderende fellesskap for nyskaping.",
    exploreFram: "Utforsk Fram →",
    findCommunity: "Finn ditt miljø",
    statOrganizations: "Organisasjoner",
    statStudents: "Aktive studenter",
    statEstablished: "Etablert",
    spacesHeading: "Våre lokaler.",
    innoMonth: "August · 2026",
    innoBody:
      "Innovasjonsdagene er den viktigste møteplassen for nye og gamle studenter som ønsker å bli kjent med innovasjonsmiljøene ved NTNU. Over to dager viser organisasjonene i FRAM frem prosjektene sine, forteller om hva de jobber med og svarer på spørsmål om alt fra studentlivet til hvordan du selv kan engasjere deg.",
    innoWhen: "Når",
    innoWhenValue: "19.–20. august",
    innoWhere: "Hvor",
    innoTicket: "Billett",
    innoTicketValue: "Drop in – gratis",
    readMore: "Les mer →",
    journeyHeading: "Hvor starter du?",
    journeyLead: "Finn studentorganisasjoner og innovasjonsmiljøer ved NTNU.",
    card1Heading: "Bli kjent med miljøet",
    card1Body:
      "Kom på et arrangement på FRAM eller les om de ulike medlemsorganisasjonene våre og se hva man kan involvere seg i på siden av studiene.",
    descFram: (
      <>
        <b>Fram</b> — lavterskel-arrangementer som en introduksjon til
        innovasjonsmiljøet på NTNU
      </>
    ),
    descStart: (
      <>
        <b>Start NTNU</b> — arrangementer for deg som vil utforske entreprenørskap
      </>
    ),
    descBoost: (
      <>
        <b>Boost Henne</b> — arrangerer lavterskel-events for kvinner i innovasjon
      </>
    ),
    memberOrgs: "medlemsorganisasjoner",
    memberBody:
      "Bli med i en organisasjon og finn folk som deler de samme interessene som deg",
    exploreAll: "Utforsk alle",
    card2Heading: "Ta idéen videre & bygg selskap",
    card2Body:
      "Har du en idé eller et prosjekt du vil bygge videre på? På NTNU finnes det veiledning, finansiering og et miljø som kan hjelpe deg videre.",
    descSpark: (
      <>
        <b>Spark NTNU</b> — gratis veiledning
      </>
    ),
    descFremtid: (
      <>
        <b>Fremtidsbidraget</b> — økonomisk støtte til å ta idéen videre
      </>
    ),
    descDiscovery: (
      <>
        <b>NTNU Discovery</b> — finansiering til å verifisere idéen
      </>
    ),
    descEntreprenor: (
      <>
        <b>Entreprenørskolen</b> — bygg selskap mens du tar en master
      </>
    ),
    descGrunder: (
      <>
        <b>Gründerbrakka</b> — et kontorfellesskap i Trondheim for studenter fra
        NTNU som driver egne oppstartsbedrifter
      </>
    ),
    orgDescription:
      "FRAM NTNU er NTNUs senter for studentinnovasjon — paraplyorganisasjonen for innovasjonsmiljøet ved NTNU og et fellesskap for studenter som vil skape noe.",
    ntnuName: "NTNU — Norges teknisk-naturvitenskapelige universitet",
    websiteDescription:
      "FRAM NTNU er studentenes senter for innovasjon og gründerskap ved NTNU i Trondheim",
  },
  en: {
    heroTitlePre: "Welcome to ",
    heroLeadMobile:
      "Fram is the umbrella organisation for the innovation community at NTNU — open to all students interested in innovation and entrepreneurship.",
    heroImageAlt:
      "The innovation community at NTNU — illustrated overview of spaces and organisations",
    heroLead:
      "FRAM NTNU is a centre for innovation and entrepreneurship at NTNU, open to all students regardless of study programme or experience. As a meeting place and umbrella organisation, FRAM brings together student-driven initiatives and offers spaces, events, workshops, and an inclusive community for creating something new.",
    exploreFram: "Explore Fram →",
    findCommunity: "Find your community",
    statOrganizations: "Organisations",
    statStudents: "Active students",
    statEstablished: "Established",
    spacesHeading: "Our spaces.",
    innoMonth: "August · 2026",
    innoBody:
      "Innovasjonsdagene is the most important meeting place for new and returning students who want to get to know the innovation communities at NTNU. Over two days, the organisations in FRAM showcase their projects, talk about what they're working on, and answer questions about everything from student life to how you can get involved yourself.",
    innoWhen: "When",
    innoWhenValue: "19–20 August",
    innoWhere: "Where",
    innoTicket: "Ticket",
    innoTicketValue: "Drop-in — free",
    readMore: "Read more →",
    journeyHeading: "Where do you start?",
    journeyLead: "Find student organisations and innovation communities at NTNU.",
    card1Heading: "Get to know the community",
    card1Body:
      "Come to an event at FRAM, or read about our various member organisations and see what you can get involved in alongside your studies.",
    descFram: (
      <>
        <b>Fram</b> — low-threshold events as an introduction to the innovation
        community at NTNU
      </>
    ),
    descStart: (
      <>
        <b>Start NTNU</b> — events for those who want to explore entrepreneurship
      </>
    ),
    descBoost: (
      <>
        <b>Boost Henne</b> — hosts low-threshold events for women in innovation
      </>
    ),
    memberOrgs: "member organisations",
    memberBody:
      "Join an organisation and find people who share the same interests as you",
    exploreAll: "Explore all",
    card2Heading: "Take your idea further & build a company",
    card2Body:
      "Do you have an idea or a project you want to build on? At NTNU there's guidance, funding, and a community that can help you move forward.",
    descSpark: (
      <>
        <b>Spark NTNU</b> — free mentoring
      </>
    ),
    descFremtid: (
      <>
        <b>Fremtidsbidraget</b> — financial support to take your idea further
      </>
    ),
    descDiscovery: (
      <>
        <b>NTNU Discovery</b> — funding to validate your idea
      </>
    ),
    descEntreprenor: (
      <>
        <b>Entreprenørskolen</b> — build a company while doing a master&apos;s
      </>
    ),
    descGrunder: (
      <>
        <b>Gründerbrakka</b> — a co-working space in Trondheim for NTNU students
        running their own startups
      </>
    ),
    orgDescription:
      "FRAM NTNU is NTNU's centre for student innovation — the umbrella organisation for the innovation community at NTNU and a community for students who want to build something.",
    ntnuName: "NTNU — Norwegian University of Science and Technology",
    websiteDescription:
      "FRAM NTNU is the students' centre for innovation and entrepreneurship at NTNU in Trondheim",
  },
} as const satisfies Record<Lang, unknown>;

const wrap = "mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4";
const button =
  "inline-flex cursor-pointer items-center gap-2.5 rounded-[14px] border-2 px-6 py-[15px] text-[15px] font-semibold no-underline [transition:transform_.2s,background_.2s,border-color_.2s,color_.2s]";

function Option({
  href,
  children,
  wide = false,
  accent,
}: {
  href?: string;
  children: ReactNode;
  wide?: boolean;
  accent: string;
}) {
  const classes = `flex flex-col gap-3 rounded-[14px] border border-[var(--line)] bg-[var(--card)] px-4 pt-4 pb-[15px] text-inherit no-underline [transition:transform_.2s_ease,border-color_.2s_ease,box-shadow_.2s_ease] hover:border-[color-mix(in_oklab,var(--persona-accent)_40%,var(--line))] hover:[box-shadow:0_16px_30px_-22px_rgba(0,0,0,.32)] hover:[transform:translateY(-3px)] ${wide ? "col-span-full" : ""}`;
  const style = { "--persona-accent": accent } as CSSProperties;
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener" : undefined}
      className={classes}
      style={style}
    >
      {children}
    </a>
  ) : (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}
function Logo({
  src,
  alt,
  width,
  height,
  className = "",
  wrapperClassName = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  wrapperClassName?: string;
}) {
  return (
    <span className={`flex h-[30px] items-center ${wrapperClassName}`}>
      <img
        loading="lazy"
        decoding="async"
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`h-7 w-auto max-w-[150px] object-contain object-left ${className}`}
      />
    </span>
  );
}
function Desc({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs leading-[1.45] text-[var(--ink-soft)] [&_b]:font-semibold [&_b]:text-[var(--ink)]">
      {children}
    </span>
  );
}

export function HomeContent({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const L = (href: string) => localizeHref(href, lang);

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FRAM NTNU",
    alternateName: ["Fram", "FRAM", "Fram NTNU"],
    url: "https://www.framntnu.no",
    logo: "https://www.framntnu.no/assets/og-fram.png",
    description: t.orgDescription,
    email: "framntnu@gmail.com",
    foundingDate: "2015-09-02",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: t.ntnuName,
      url: "https://www.ntnu.no",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sem Sælands vei 1",
      addressLocality: "Trondheim",
      postalCode: "7034",
      addressCountry: "NO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 63.4170654,
      longitude: 10.4070011,
    },
    sameAs: [
      "https://www.instagram.com/framntnu/",
      "https://www.facebook.com/framntnu",
      "https://www.linkedin.com/company/framntnu/",
      "https://maps.google.com/?cid=9464729857902276441",
    ],
  };
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FRAM NTNU",
    url: `${SITE_URL}${path("home", lang)}`,
    inLanguage: lang === "en" ? "en" : "nb",
    description: t.websiteDescription,
  };

  return (
    <div
      lang={lang === "en" ? "en" : undefined}
      className="min-h-screen overflow-x-hidden bg-[var(--bg)] font-sans text-[var(--ink)] [--accent:var(--blue)] [--bg-soft:#F2EDE3] [--bg:#FAF7F2] [--blue:#2E86C1] [--card:#fff] [--charcoal:#3A3A3A] [--ink-soft:#555] [--ink:#2A2A2A] [--line:#E6E0D5] [--muted:#8A8A8A] [--nav-accent:var(--blue)] [--red:#E85A5A] [--teal:#3FC4A3] [--yellow:#FDC82F]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <HomeEventBar lang={lang} />
      <SiteHeader currentPath="/" lang={lang} />
      <main>
        <section
          id="opplev"
          className="relative pt-11 pb-[72px] max-[599px]:pt-6 max-[599px]:pb-10"
        >
          <div className={wrap}>
            <div className="mb-[60px] grid min-h-[calc(100vh-130px)] grid-cols-[.88fr_1.12fr] items-center gap-8 max-[900px]:min-h-0 max-[900px]:grid-cols-1 max-[900px]:gap-6 max-[599px]:mb-8">
              <div className="flex min-w-0 flex-col items-start">
                <h1 className="mt-0 mb-3 text-[clamp(56px,6.6vw,108px)] leading-[.94] font-bold tracking-[-.04em] text-black">
                  {t.heroTitlePre}
                  <span>Fram</span>
                  <span>.</span>
                </h1>
                <p className="hidden" />
                <p className="mt-0 mb-[26px] hidden text-[clamp(17px,1.5vw,21px)] leading-[26px] font-medium tracking-[-.01em] text-[var(--ink-soft)] max-[900px]:block">
                  {t.heroLeadMobile}
                </p>
                <div className="hidden max-[900px]:block max-[900px]:w-full">
                  <img
                    decoding="sync"
                    src="/assets/innovasjonsmiljo-sketch-cropped-800.webp"
                    alt={t.heroImageAlt}
                    width="800"
                    height="508"
                    className="mt-2 mr-[-13%] mb-6 block h-auto w-[115%] max-w-full"
                  />
                </div>
                <p className="mt-0 mb-[30px] max-w-[540px] text-lg leading-[1.6] font-normal text-[var(--ink-soft)] max-[900px]:hidden">
                  {t.heroLead}
                </p>
                <div className="mb-[34px] flex flex-wrap gap-2.5">
                  <a
                    href="#lokalene"
                    className={`${button} border-transparent bg-[var(--ink)] text-[var(--bg)] hover:[transform:translateY(-2px)]`}
                  >
                    {t.exploreFram}
                  </a>
                  <Link
                    href={L("/miljoer")}
                    className={`${button} border-[var(--ink)] bg-transparent text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)]`}
                  >
                    {t.findCommunity}
                  </Link>
                </div>
                <div className="flex self-stretch border-t border-[var(--line)] pt-6">
                  <div className="mr-8 max-[900px]:mr-5">
                    <div className="text-[40px] leading-none font-bold tracking-[-.02em] text-[var(--yellow)]">
                      {organizations.length}
                    </div>
                    <div className="mt-2 text-xs leading-[normal] font-medium text-[var(--muted)]">
                      {t.statOrganizations}
                    </div>
                  </div>
                  <div className="mr-8 max-[900px]:mr-5">
                    <div className="text-[40px] leading-none font-bold tracking-[-.02em] text-[var(--blue)]">
                      1300+
                    </div>
                    <div className="mt-2 text-xs leading-[normal] font-medium text-[var(--muted)]">
                      {t.statStudents}
                    </div>
                  </div>
                  <div>
                    <div className="text-[40px] leading-none font-bold tracking-[-.02em] text-[var(--red)]">
                      &apos;16
                    </div>
                    <div className="mt-2 text-xs leading-[normal] font-medium text-[var(--muted)]">
                      {t.statEstablished}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex min-w-0 items-center justify-end overflow-visible max-[900px]:hidden">
                <img
                  decoding="async"
                  src="/assets/innovasjonsmiljo-sketch-cropped.webp"
                  alt={t.heroImageAlt}
                  width="1280"
                  height="812"
                  className="block h-auto w-[100%] max-w-none drop-shadow-[0_26px_46px_rgba(20,30,50,.14)]"
                />
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[28px] bg-transparent shadow-[0_2px_4px_rgba(0,0,0,.04),0_8px_24px_rgba(0,0,0,.08),0_32px_64px_-24px_rgba(0,0,0,.18)]">
              <div className="relative aspect-video overflow-hidden bg-black">
                <YouTubeFacade lang={lang} />
              </div>
            </div>
          </div>
        </section>

        <section
          id="lokalene"
          className="pt-[110px] pb-[120px] max-[599px]:pt-14"
        >
          <div className={wrap}>
            <div className="mb-[42px] flex flex-wrap items-end justify-between gap-8">
              <div className="max-w-[740px]">
                <h2 className="mt-[18px] mb-0 text-[clamp(44px,4.8vw,76px)] leading-[1.02] font-bold tracking-[-.03em] text-[var(--ink)]">
                  {t.spacesHeading}
                </h2>
              </div>
            </div>
            <RoomExplorer lang={lang} />
          </div>
        </section>

        <section
          id="events"
          className="rounded-t-3xl bg-[var(--ink)] py-[72px] text-[var(--bg)]"
        >
          <div className={wrap}>
            <div className="grid grid-cols-[1.1fr_1fr] overflow-hidden rounded-[28px] border border-white/12 max-[760px]:grid-cols-1">
              <div className="group relative flex min-h-[440px] flex-col justify-between overflow-hidden bg-[#2B7FD4] bg-[url('/assets/innovasjonsdagene-hovedscenen.avif')] bg-cover bg-center px-10 py-9 text-white [transition:box-shadow_.4s_ease,transform_.35s_cubic-bezier(.22,1,.36,1)] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(20,20,24,.55)_0%,rgba(20,20,24,.15)_38%,rgba(20,20,24,.65)_100%)] hover:[box-shadow:0_24px_60px_rgba(43,127,212,.35)] hover:[transform:scale(1.012)] max-[760px]:min-h-[280px] max-[760px]:px-6 max-[760px]:py-7">
                <div className="relative z-[1]" />
                <div className="relative z-[1] text-[clamp(72px,8vw,112px)] leading-[.9] font-extrabold tracking-[-.04em] [transition:transform_.4s_cubic-bezier(.22,1,.36,1)] group-hover:[transform:translateY(-6px)]">
                  19–20
                  <small className="mt-3.5 block text-[13px] font-semibold tracking-[.18em] uppercase opacity-85">
                    {t.innoMonth}
                  </small>
                </div>
              </div>
              <div className="flex flex-col gap-5 bg-[#0F0F0F] px-14 py-12 text-[var(--bg)] max-[760px]:min-w-0 max-[760px]:px-6 max-[760px]:py-8">
                <h3 className="m-0 text-5xl leading-[1.05] font-extrabold tracking-[-.025em] max-[760px]:text-[28px]">
                  Innovasjons&shy;dagene{" "}
                  <span className="text-[var(--yellow)]">&apos;26</span>
                </h3>
                <p className="m-0 text-[15px] leading-[1.6] text-[#ccc]">
                  {t.innoBody}
                </p>
                <dl className="my-2 grid grid-cols-3 gap-5 max-[760px]:gap-3">
                  <div className="border-t border-white/15 pt-3.5">
                    <dt className="mb-1.5 font-mono text-[11px] tracking-[.12em] text-[#888] uppercase">
                      {t.innoWhen}
                    </dt>
                    <dd className="m-0 text-[14px] leading-[normal] font-medium">
                      {t.innoWhenValue}
                    </dd>
                  </div>
                  <div className="border-t border-white/15 pt-3.5">
                    <dt className="mb-1.5 font-mono text-[11px] tracking-[.12em] text-[#888] uppercase">
                      {t.innoWhere}
                    </dt>
                    <dd className="m-0 text-[14px] leading-[normal] font-medium">
                      Gruva
                    </dd>
                  </div>
                  <div className="border-t border-white/15 pt-3.5">
                    <dt className="mb-1.5 font-mono text-[11px] tracking-[.12em] text-[#888] uppercase">
                      {t.innoTicket}
                    </dt>
                    <dd className="m-0 text-[14px] leading-[normal] font-medium">
                      {t.innoTicketValue}
                    </dd>
                  </div>
                </dl>
                <div className="mt-1 flex flex-wrap gap-2.5">
                  <Link
                    href={L("/innovasjonsdagene")}
                    className={`${button} border-[var(--yellow)] bg-[var(--yellow)] text-[var(--charcoal)] hover:[transform:translateY(-2px)]`}
                  >
                    {t.readMore}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reisen" className="relative pt-[100px] pb-[120px]">
          <div className={wrap}>
            <div className="mx-auto mb-16 max-w-[1060px] text-center">
              <h2 className="m-0 text-[clamp(44px,4.8vw,76px)] leading-[1.02] font-bold tracking-[-.03em] text-[var(--ink)]">
                {t.journeyHeading}
              </h2>
              <p className="mx-auto mt-[18px] mb-0 max-w-[540px] text-[17px] leading-[1.6] text-[var(--ink-soft)]">
                {t.journeyLead}
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-[1060px] grid-cols-2 grid-rows-[auto_1fr] items-stretch gap-[26px] max-[760px]:grid-cols-1 max-[760px]:grid-rows-none">
              <div className="group relative row-span-2 grid grid-rows-subgrid gap-y-0 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--card)] [box-shadow:0_30px_60px_-40px_rgba(0,0,0,.36)] [--pc:var(--yellow)] [transition:transform_.3s_ease,box-shadow_.3s_ease,border-color_.3s_ease] hover:border-[color-mix(in_oklab,var(--pc)_32%,var(--line))] hover:[box-shadow:0_42px_76px_-40px_rgba(0,0,0,.38)] hover:[transform:translateY(-6px)] max-[760px]:row-auto max-[760px]:grid-rows-[auto_auto]">
                <div className="bg-[radial-gradient(120%_140%_at_100%_0%,color-mix(in_oklab,var(--pc)_26%,var(--card)),transparent_60%),color-mix(in_oklab,var(--pc)_11%,var(--card))] px-[30px] pt-[30px] pb-[26px]">
                  <h3 className="mt-0 mb-2.5 max-w-[80%] text-[25px] leading-[1.12] font-extrabold tracking-[-.02em]">
                    {t.card1Heading}
                  </h3>
                  <p className="m-0 max-w-[92%] text-sm leading-[1.6] text-[var(--ink-soft)]">
                    {t.card1Body}
                  </p>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-3 bg-[var(--bg-soft)] p-[22px]">
                  <Option href={L("/arrangementer")} wide accent="var(--yellow)">
                    <Logo
                      src="/assets/fram-logo.webp"
                      alt="FRAM NTNU"
                      width={400}
                      height={142}
                    />
                    <Desc>{t.descFram}</Desc>
                  </Option>
                  <Option
                    href="https://www.startntnu.no"
                    accent="var(--yellow)"
                  >
                    <Logo
                      src="/assets/logos/start-ntnu.png"
                      alt="Start NTNU"
                      width={240}
                      height={80}
                    />
                    <Desc>{t.descStart}</Desc>
                  </Option>
                  <Option
                    href="https://www.boosthenne.no"
                    accent="var(--yellow)"
                  >
                    <Logo
                      src="/assets/logos/boosthenne.webp"
                      alt="Boost Henne"
                      width={200}
                      height={87}
                    />
                    <Desc>{t.descBoost}</Desc>
                  </Option>
                  <div className="col-span-full flex items-center gap-[18px] rounded-[14px] border border-[var(--line)] bg-[var(--card)] px-4 pt-4 pb-[15px] max-[760px]:gap-3">
                    <RotatingMemberLogo lang={lang} />
                    <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                      <span className="text-[15px] leading-[1.2] font-semibold text-[var(--ink)] max-[760px]:[overflow-wrap:anywhere]">
                        <b className="mr-[3px] font-mono font-bold text-[var(--yellow)]">
                          28+
                        </b>{" "}
                        {t.memberOrgs}
                      </span>
                      <span className="text-xs leading-[1.4] text-[var(--ink-soft)] [overflow-wrap:anywhere]">
                        {t.memberBody}
                      </span>
                      <Link
                        href={L("/miljoer")}
                        className="group/member mt-[7px] inline-flex items-center self-start font-mono text-[11px] font-bold tracking-[.05em] whitespace-nowrap text-[var(--yellow)] uppercase no-underline [transition:gap_.2s_ease] hover:gap-[11px]"
                      >
                        {t.exploreAll}{" "}
                        <span className="ml-[7px] [transition:transform_.2s_ease] group-hover/member:[transform:translateX(3px)]">
                          →
                        </span>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              <div className="group relative row-span-2 grid grid-rows-subgrid gap-y-0 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--card)] [box-shadow:0_30px_60px_-40px_rgba(0,0,0,.36)] [--pc:var(--blue)] [transition:transform_.3s_ease,box-shadow_.3s_ease,border-color_.3s_ease] hover:border-[color-mix(in_oklab,var(--pc)_32%,var(--line))] hover:[box-shadow:0_42px_76px_-40px_rgba(0,0,0,.38)] hover:[transform:translateY(-6px)] max-[760px]:row-auto max-[760px]:grid-rows-[auto_auto]">
                <div className="bg-[radial-gradient(120%_140%_at_100%_0%,color-mix(in_oklab,var(--pc)_26%,var(--card)),transparent_60%),color-mix(in_oklab,var(--pc)_11%,var(--card))] px-[30px] pt-[30px] pb-[26px]">
                  <h3 className="mt-0 mb-2.5 max-w-[80%] text-[25px] leading-[1.12] font-extrabold tracking-[-.02em]">
                    {t.card2Heading}
                  </h3>
                  <p className="m-0 max-w-[92%] text-sm leading-[1.6] text-[var(--ink-soft)]">
                    {t.card2Body}
                  </p>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-3 bg-[var(--bg-soft)] p-[22px]">
                  <Option href="https://sparkntnu.no" accent="var(--blue)">
                    <Logo
                      src="/assets/spark-logo.webp"
                      alt="Spark NTNU"
                      width={240}
                      height={100}
                      className="!h-[34px]"
                    />
                    <Desc>{t.descSpark}</Desc>
                  </Option>
                  <Option accent="var(--blue)">
                    <Logo
                      src="/assets/sparebank1smnKUle.webp"
                      alt="SpareBank 1 SMN"
                      width={724}
                      height={743}
                      className="!h-10"
                      wrapperClassName="!h-auto"
                    />
                    <Desc>{t.descFremtid}</Desc>
                  </Option>
                  <Option
                    href="https://www.ntnudiscovery.no"
                    accent="var(--blue)"
                  >
                    <Logo
                      src="/assets/ntnu_discovery_web.gif"
                      alt="NTNU Discovery"
                      width={260}
                      height={112}
                    />
                    <Desc>{t.descDiscovery}</Desc>
                  </Option>
                  <Option
                    href="https://www.entreprenorskolen.no/"
                    accent="var(--blue)"
                  >
                    <Logo
                      src="/assets/logos/entreprenorskolen.webp"
                      alt="Entreprenørskolen"
                      width={622}
                      height={158}
                    />
                    <Desc>{t.descEntreprenor}</Desc>
                  </Option>
                  <Option
                    href="https://www.grunderbrakka.no"
                    wide
                    accent="var(--blue)"
                  >
                    <Logo
                      src="/assets/logos/grunderbrakka.webp"
                      alt="Gründerbrakka"
                      width={500}
                      height={113}
                    />
                    <Desc>{t.descGrunder}</Desc>
                  </Option>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}
