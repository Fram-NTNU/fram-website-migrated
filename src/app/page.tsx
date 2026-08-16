/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import {
  BannerPulse,
  InnovationDaysCountdown,
  RoomExplorer,
  RotatingMemberLogo,
  YouTubeFacade,
} from "@/components/home-interactions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const description =
  "Oppdag innovasjonsmiljøet på NTNU. FRAM tilbyr lokaler, arrangementer og et fellesskap for studenter som vil skape noe.";
export const metadata: Metadata = {
  title: "FRAM NTNU — Senter for innovasjon og entreprenørskap ved NTNU",
  description,
  authors: [{ name: "FRAM NTNU" }],
  alternates: { canonical: "https://www.framntnu.no/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "FRAM NTNU",
    locale: "nb_NO",
    title: "FRAM NTNU — Senter for innovasjon og entreprenørskap ved NTNU",
    description,
    url: new URL("https://www.framntnu.no/"),
    images: [{ url: "/assets/og-fram.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FRAM NTNU — Senter for innovasjon og entreprenørskap",
    description,
    images: ["/assets/og-fram.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF7F2",
};

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FRAM NTNU",
  alternateName: ["Fram", "FRAM", "Fram NTNU"],
  url: "https://www.framntnu.no",
  logo: "https://www.framntnu.no/assets/og-fram.png",
  description:
    "FRAM NTNU er NTNUs senter for studentinnovasjon — paraplyorganisasjonen for innovasjonsmiljøet ved NTNU og et fellesskap for studenter som vil skape noe.",
  email: "framntnu@gmail.com",
  foundingDate: "2015-09-02",
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "NTNU — Norges teknisk-naturvitenskapelige universitet",
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
  url: "https://www.framntnu.no",
  inLanguage: "nb",
  description:
    "FRAM NTNU er studentenes senter for innovasjon og gründerskap ved NTNU i Trondheim",
};

const wrap = "mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4";
const sectionHeader = "mb-12 border-b border-[var(--line)] pb-7";
const button =
  "inline-flex cursor-pointer items-center gap-2.5 rounded-[3px] border-2 px-6 py-[15px] text-[15px] font-semibold no-underline [transition:transform_.2s,background_.2s,border-color_.2s,color_.2s,box-shadow_.2s]";

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
  const classes = `group/option relative flex flex-col gap-3 border-t-2 border-[var(--line)] bg-[var(--card)] px-4 pt-4 pb-[15px] text-inherit no-underline [transition:border-color_.2s_ease,background_.2s_ease] before:absolute before:top-0 before:left-0 before:h-2 before:w-2 before:bg-[var(--persona-accent)] before:[clip-path:polygon(0_0,100%_0,0_100%)] hover:border-[var(--persona-accent)] hover:bg-[color-mix(in_oklab,var(--persona-accent)_7%,var(--card))] ${wide ? "col-span-full" : ""}`;
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

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg)] font-sans text-[var(--ink)] [--accent:var(--blue)] [--bg-soft:#F2EDE3] [--bg:#FAF7F2] [--blue:#2E86C1] [--card:#fff] [--charcoal:#3A3A3A] [--ink-soft:#555] [--ink:#2A2A2A] [--line:#E6E0D5] [--muted:#8A8A8A] [--nav-accent:var(--blue)] [--red:#E85A5A] [--teal:#3FC4A3] [--yellow:#FDC82F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <Link
        href="/innovasjonsdagene"
        className="group block border-b border-black/15 bg-[var(--yellow)] text-[var(--charcoal)] no-underline [transition:background_.2s] hover:bg-[color-mix(in_oklab,var(--yellow)_82%,white)]"
      >
        <span className={`${wrap} flex min-h-10 items-center justify-center gap-2.5 py-2 font-sans text-xs leading-none font-semibold tracking-[.02em] whitespace-nowrap uppercase max-[520px]:gap-1.5 max-[520px]:text-[10px]`}>
          <BannerPulse />
          <strong className="font-bold"><InnovationDaysCountdown /></strong>
          <span className="font-sans font-semibold normal-case">Innovasjonsdagene ’26</span>
          <span aria-hidden="true">•</span>
          <span className="font-sans font-medium normal-case">19.–20. august</span>
          <span className="ml-1 font-sans text-[15px] leading-none font-semibold transition-transform duration-200 ease-out group-hover:translate-x-1.5" aria-hidden="true">→</span>
        </span>
      </Link>
      <SiteHeader currentPath="/" />
      <main>
        <section
          id="opplev"
          className="home-hero relative isolate overflow-hidden pt-11 pb-[88px] max-[599px]:pt-6 max-[599px]:pb-12"
        >
          <div className={wrap}>
            <div className="mb-[60px] grid min-h-[calc(100vh-130px)] grid-cols-[.78fr_1.22fr] items-center gap-8 max-[900px]:min-h-0 max-[900px]:grid-cols-1 max-[900px]:gap-6 max-[599px]:mb-8">
              <div className="relative z-[2] flex flex-col items-start">
                <h1 className="mt-0 mb-3 text-[clamp(56px,6.6vw,108px)] leading-[.94] font-light tracking-[-.04em] text-black">
                  Velkommen til <span className="font-bold">Fram</span>
                  <span className="inline-block text-[1.2em] leading-none text-[var(--red)]">.</span>
                </h1>
                <p className="hidden" />
                <p className="mt-0 mb-[26px] hidden text-[clamp(17px,1.5vw,21px)] leading-[26px] font-medium tracking-[-.01em] text-[var(--ink-soft)] max-[900px]:block">
                  Fram er paraplyorganisasjonen for innovasjonsmiljøet på NTNU —
                  åpent for alle studenter som er interessert i innovasjon og
                  entreprenørskap.
                </p>
                <div className="hidden max-[900px]:block max-[900px]:w-full">
                  <img
                    decoding="sync"
                    src="/assets/innovasjonsmiljo-sketch-cropped-800.webp"
                    alt="Innovasjonsmiljøet ved NTNU — illustrert oversikt over lokaler og organisasjoner"
                    width="800"
                    height="508"
                    className="mt-2 mr-[-13%] mb-6 block h-auto w-[115%] max-w-full"
                  />
                </div>
                <p className="mt-0 mb-[30px] max-w-[540px] text-lg leading-[1.6] font-normal text-[var(--ink-soft)] max-[900px]:hidden">
                  FRAM NTNU er et senter for innovasjon og entreprenørskap ved
                  NTNU, åpent for alle studenter uavhengig av studieprogram
                  eller erfaring. Som møteplass og paraplyorganisasjon samler
                  FRAM studentdrevne initiativer og tilbyr lokaler,
                  arrangementer, workshops og et inkluderende fellesskap for
                  nyskaping.
                </p>
                <div className="mb-[38px] flex flex-wrap gap-2.5">
                  <a
                    href="#lokalene"
                    className={`${button} border-transparent bg-[var(--ink)] text-[var(--bg)] hover:[box-shadow:0_6px_0_var(--yellow)] hover:[transform:translateY(-3px)]`}
                  >
                    Utforsk Fram →
                  </a>
                  <Link
                    href="/miljoer"
                    className={`${button} border-[var(--ink)] bg-transparent text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)]`}
                  >
                    Finn ditt miljø
                  </Link>
                </div>
                <div className="flex self-stretch border-t border-[var(--line)] pt-6">
                  <div className="mr-8 max-[900px]:mr-5">
                    <div className="text-[40px] leading-none font-bold tracking-[-.02em] text-[var(--yellow)]">30</div>
                    <div className="mt-2 text-xs leading-[normal] font-medium text-[var(--muted)]">Organisasjoner</div>
                  </div>
                  <div className="mr-8 max-[900px]:mr-5">
                    <div className="text-[40px] leading-none font-bold tracking-[-.02em] text-[var(--blue)]">1000+</div>
                    <div className="mt-2 text-xs leading-[normal] font-medium text-[var(--muted)]">Aktive studenter</div>
                  </div>
                  <div>
                    <div className="text-[40px] leading-none font-bold tracking-[-.02em] text-[var(--red)]">&apos;16</div>
                    <div className="mt-2 text-xs leading-[normal] font-medium text-[var(--muted)]">Etablert</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end overflow-visible max-[900px]:hidden">
                <img
                  decoding="async"
                  src="/assets/innovasjonsmiljo-sketch-cropped.webp"
                  alt="Innovasjonsmiljøet ved NTNU — illustrert oversikt over lokaler og organisasjoner"
                  width="1280"
                  height="812"
                  className="mr-[-8%] block h-auto w-[118%] max-w-none drop-shadow-[0_26px_46px_rgba(20,30,50,.14)]"
                />
              </div>
            </div>
            <div className="home-video relative overflow-hidden bg-transparent shadow-[0_18px_42px_-22px_rgba(0,0,0,.34)] [clip-path:polygon(0_0,calc(100%-42px)_0,100%_42px,100%_100%,42px_100%,0_calc(100%-42px))] before:absolute before:top-0 before:right-0 before:z-[2] before:h-[42px] before:w-[42px] before:bg-[var(--yellow)] before:[clip-path:polygon(0_0,100%_100%,0_100%)] before:content-[''] after:absolute after:bottom-0 after:left-0 after:z-[2] after:h-[42px] after:w-[42px] after:bg-[var(--teal)] after:[clip-path:polygon(0_0,100%_100%,100%_0)] after:content-['']">
              <div className="relative aspect-video overflow-hidden bg-black">
                <YouTubeFacade />
              </div>
            </div>
          </div>
        </section>

        <section
          id="lokalene"
          className="pt-[110px] pb-[120px] max-[599px]:pt-14"
        >
          <div className={wrap}>
            <div className={`${sectionHeader} flex flex-wrap items-end justify-between gap-8`}>
              <div className="max-w-[740px]">
                <h2 className="m-0 text-[clamp(44px,4.8vw,76px)] leading-[1.02] font-bold tracking-[-.03em] text-[var(--ink)]">
                  Våre lokaler.
                </h2>
              </div>
            </div>
            <RoomExplorer />
          </div>
        </section>

        <section
          id="events"
          className="bg-[var(--ink)] py-[72px] text-[var(--bg)]"
        >
          <div className={wrap}>
            <div className="grid grid-cols-[1.1fr_1fr] overflow-hidden border-y-2 border-white/35 max-[760px]:grid-cols-1">
              <div className="group relative flex min-h-[440px] flex-col justify-between overflow-hidden bg-[#2B7FD4] bg-[url('/assets/innovasjonsdagene-hovedscenen.avif')] bg-cover bg-center px-10 py-9 text-white [transition:box-shadow_.4s_ease,transform_.35s_cubic-bezier(.22,1,.36,1)] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(20,20,24,.55)_0%,rgba(20,20,24,.15)_38%,rgba(20,20,24,.65)_100%)] hover:[box-shadow:0_24px_60px_rgba(43,127,212,.35)] hover:[transform:scale(1.012)] max-[760px]:min-h-[280px] max-[760px]:px-6 max-[760px]:py-7">
                <div className="relative z-[1]" />
                <div className="relative z-[1] text-[clamp(72px,8vw,112px)] leading-[.9] font-extrabold tracking-[-.04em] [transition:transform_.4s_cubic-bezier(.22,1,.36,1)] group-hover:[transform:translateY(-6px)]">
                  19–20
                  <small className="mt-3.5 block text-[13px] font-semibold tracking-[.18em] uppercase opacity-85">
                    August · 2026
                  </small>
                </div>
              </div>
              <div className="flex flex-col gap-5 bg-[#0F0F0F] px-14 py-12 text-[var(--bg)] max-[760px]:min-w-0 max-[760px]:px-6 max-[760px]:py-8">
                <h3 className="m-0 text-5xl leading-[1.05] font-extrabold tracking-[-.025em] max-[760px]:text-[28px]">
                  Innovasjons&shy;dagene{" "}
                  <span className="text-[var(--yellow)]">&apos;26</span>
                </h3>
                <p className="m-0 text-[15px] leading-[1.6] text-[#ccc]">
                  Innovasjonsdagene er den viktigste møteplassen for nye og
                  gamle studenter som ønsker å bli kjent med innovasjonsmiljøene
                  ved NTNU. Over to dager viser organisasjonene i FRAM frem
                  prosjektene sine, forteller om hva de jobber med og svarer på
                  spørsmål om alt fra studentlivet til hvordan du selv kan
                  engasjere deg.
                </p>
                <dl className="my-2 grid grid-cols-3 gap-5 max-[760px]:gap-3">
                  <div className="border-t border-white/15 pt-3.5">
                    <dt className="mb-1.5 font-mono text-[11px] tracking-[.12em] text-[#888] uppercase">
                      Når
                    </dt>
                    <dd className="m-0 text-[14px] leading-[normal] font-medium">
                      19.–20. august
                    </dd>
                  </div>
                  <div className="border-t border-white/15 pt-3.5">
                    <dt className="mb-1.5 font-mono text-[11px] tracking-[.12em] text-[#888] uppercase">
                      Hvor
                    </dt>
                    <dd className="m-0 text-[14px] leading-[normal] font-medium">
                      Gruva
                    </dd>
                  </div>
                  <div className="border-t border-white/15 pt-3.5">
                    <dt className="mb-1.5 font-mono text-[11px] tracking-[.12em] text-[#888] uppercase">
                      Billett
                    </dt>
                    <dd className="m-0 text-[14px] leading-[normal] font-medium">
                      Drop in – gratis
                    </dd>
                  </div>
                </dl>
                <div className="mt-1 flex flex-wrap gap-2.5">
                  <Link
                    href="/innovasjonsdagene"
                    className={`${button} border-[var(--yellow)] bg-[var(--yellow)] text-[var(--charcoal)] hover:[transform:translateY(-2px)]`}
                  >
                    Les mer →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reisen" className="relative pt-[100px] pb-[120px]">
          <div className={wrap}>
            <div className={sectionHeader}>
              <h2 className="m-0 text-[clamp(44px,4.8vw,76px)] leading-[1.02] font-bold tracking-[-.03em] text-[var(--ink)]">
                Hvor starter du?
              </h2>
              <p className="mt-[18px] mb-0 max-w-[540px] text-[17px] leading-[1.6] text-[var(--ink-soft)]">
                Finn studentorganisasjoner og innovasjonsmiljøer ved NTNU.
              </p>
            </div>
            <div className="mt-12 grid w-full grid-cols-2 grid-rows-[auto_1fr] items-stretch gap-[26px] max-[760px]:grid-cols-1 max-[760px]:grid-rows-none">
              <div className="group relative row-span-2 grid grid-rows-subgrid gap-y-0 overflow-hidden border-t-[10px] border-[var(--yellow)] bg-[var(--card)] [--pc:var(--yellow)] max-[760px]:row-auto max-[760px]:grid-rows-[auto_auto]">
                <div className="bg-[color-mix(in_oklab,var(--pc)_13%,var(--card))] px-[30px] pt-[30px] pb-[26px]">
                  <h3 className="mt-0 mb-2.5 max-w-[80%] text-[25px] leading-[1.12] font-extrabold tracking-[-.02em]">
                    Bli kjent med miljøet
                  </h3>
                  <p className="m-0 max-w-[92%] text-sm leading-[1.6] text-[var(--ink-soft)]">
                    Kom på et arrangement på FRAM eller les om de ulike
                    medlemsorganisasjonene våre og se hva man kan involvere seg
                    i på siden av studiene.
                  </p>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-3 bg-[var(--bg-soft)] p-[22px]">
                  <Option href="/arrangementer" wide accent="var(--yellow)">
                    <Logo
                      src="/assets/fram-logo.webp"
                      alt="FRAM NTNU"
                      width={400}
                      height={142}
                    />
                    <Desc>
                      <b>Fram</b> — lavterskel-arrangementer som en introduksjon
                      til innovasjonsmiljøet på NTNU
                    </Desc>
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
                    <Desc>
                      <b>Start NTNU</b> — arrangementer for deg som vil utforske
                      entreprenørskap
                    </Desc>
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
                    <Desc>
                      <b>Boost Henne</b> — arrangerer lavterskel-events for
                      kvinner i innovasjon
                    </Desc>
                  </Option>
                  <div className="col-span-full flex items-center gap-[18px] border-t-2 border-[var(--line)] bg-[var(--card)] px-4 pt-4 pb-[15px] max-[760px]:gap-3">
                    <RotatingMemberLogo />
                    <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                      <span className="text-[15px] leading-[1.2] font-semibold text-[var(--ink)] max-[760px]:[overflow-wrap:anywhere]">
                        <b className="mr-[3px] font-mono font-bold text-[var(--yellow)]">
                          28+
                        </b>{" "}
                        medlemsorganisasjoner
                      </span>
                      <span className="text-xs leading-[1.4] text-[var(--ink-soft)] [overflow-wrap:anywhere]">
                        Bli med i en organisasjon og finn folk som deler de
                        samme interessene som deg
                      </span>
                      <Link
                        href="/miljoer"
                        className="group/member mt-[7px] inline-flex items-center self-start font-mono text-[11px] font-bold tracking-[.05em] whitespace-nowrap text-[var(--yellow)] uppercase no-underline [transition:gap_.2s_ease] hover:gap-[11px]"
                      >
                        Utforsk alle{" "}
                        <span className="ml-[7px] [transition:transform_.2s_ease] group-hover/member:[transform:translateX(3px)]">
                          →
                        </span>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              <div className="group relative row-span-2 grid grid-rows-subgrid gap-y-0 overflow-hidden border-t-[10px] border-[var(--blue)] bg-[var(--card)] [--pc:var(--blue)] max-[760px]:row-auto max-[760px]:grid-rows-[auto_auto]">
                <div className="bg-[color-mix(in_oklab,var(--pc)_13%,var(--card))] px-[30px] pt-[30px] pb-[26px]">
                  <h3 className="mt-0 mb-2.5 max-w-[80%] text-[25px] leading-[1.12] font-extrabold tracking-[-.02em]">
                    Ta idéen videre &amp; bygg selskap
                  </h3>
                  <p className="m-0 max-w-[92%] text-sm leading-[1.6] text-[var(--ink-soft)]">
                    Har du en idé eller et prosjekt du vil bygge videre på? På
                    NTNU finnes det veiledning, finansiering og et miljø som kan
                    hjelpe deg videre.
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
                    <Desc>
                      <b>Spark NTNU</b> — gratis veiledning
                    </Desc>
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
                    <Desc>
                      <b>Fremtidsbidraget</b> — økonomisk støtte til å ta idéen
                      videre
                    </Desc>
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
                    <Desc>
                      <b>NTNU Discovery</b> — finansiering til å verifisere
                      idéen
                    </Desc>
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
                    <Desc>
                      <b>Entreprenørskolen</b> — bygg selskap mens du tar en
                      master
                    </Desc>
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
                    <Desc>
                      <b>Gründerbrakka</b> — et kontorfellesskap i Trondheim for
                      studenter fra NTNU som driver egne oppstartsbedrifter
                    </Desc>
                  </Option>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
