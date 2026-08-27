import type { Metadata } from "next";
import { RevealEmail } from "@/components/reveal-email";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TeknologihallenHero } from "@/components/teknologihallen-hero";

const description =
  "Teknologihallen er hjemmet til NTNUs tekniske studentorganisasjoner — felles verksteder og prosjektarealer under ett tak.";
const ogDescription =
  "Hjemmet til NTNUs tekniske studentorganisasjoner — felles verksteder og prosjektarealer under ett tak.";

export const metadata: Metadata = {
  title: "Teknologihallen — FRAM NTNU",
  description,
  authors: [{ name: "FRAM NTNU" }],
  alternates: { canonical: "https://www.framntnu.no/teknologihallen" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName: "FRAM NTNU", locale: "nb_NO", title: "Teknologihallen — FRAM NTNU", description: ogDescription, url: "https://www.framntnu.no/teknologihallen", images: [{ url: "/assets/og-fram.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Teknologihallen — FRAM NTNU", description: ogDescription, images: ["/assets/og-fram.png"] },
};

// Re-evaluer datoen jevnlig (én gang i døgnet) slik at studieåret nedenfor
// flipper automatisk om sommeren — også uten ny deploy.
export const revalidate = 86400;

// Studieåret vises som "2026/2027". Det flipper til nytt år i løpet av sommeren:
// fra og med august (måned-indeks 7) regnes inneværende år som starten på et nytt studieår.
const ACADEMIC_YEAR_FLIP_MONTH = 7; // 0 = januar, 7 = august (semesterstart)
function getAcademicYear(now: Date = new Date()): string {
  const year = now.getFullYear();
  const startYear = now.getMonth() >= ACADEMIC_YEAR_FLIP_MONTH ? year : year - 1;
  return `${startYear}/${startYear + 1}`;
}

type Org = {
  name: string;
  href: string;
  accent: "yellow" | "blue" | "red" | "teal";
  category: string;
  description: string;
  logo: { src: string; alt: string; width: number; height: number; className?: string };
  photo: { src: string; alt: string; width: number; height: number };
  mediaClass?: string;
};

const orgs: Org[] = [
  { name: "Ascend NTNU", href: "https://www.ascendntnu.no", accent: "yellow", category: "Luft · Droner", description: "Konkurrerer i internasjonale drone-konkurranser med autonome systemer.", logo: { src: "/assets/logos/ascend.webp", alt: "Ascend NTNU", width: 469, height: 590, className: "org-logo tall" }, photo: { src: "/assets/heroes/ascend.webp", alt: "Ascend-drone på bakken", width: 1920, height: 1280 } },
  { name: "Fuel Fighter", href: "https://fuelfighter.no", accent: "teal", category: "Energi · Bil", description: "Bygger ultra-energieffektive kjøretøy til Shell Eco-marathon.", logo: { src: "/assets/to/fuelfighter.webp", alt: "Fuel Fighter", width: 421, height: 134 }, photo: { src: "/assets/heroes/fuelfighter.webp", alt: "Fuel Fighter-teamet med kjøretøy", width: 1080, height: 540 } },
  { name: "Gridville", href: "https://www.gridvillentnu.com/", accent: "yellow", category: "Energi · Nett", description: "Studentprosjekter på fornybar energi, mikronett og smart strømforsyning.", logo: { src: "/assets/logos/gridville-white2.webp", alt: "Gridville", width: 1500, height: 545 }, photo: { src: "/assets/heroes/gridville.webp", alt: "Gridville-teamet", width: 1920, height: 1281 }, mediaClass: "dark" },
  { name: "Njord", href: "https://www.njordntnu.no", accent: "blue", category: "Hav · Autonomi", description: "Arrangerer en internasjonal konkurranse for selvstyrte skip, og bygger sine egne autonome fartøy.", logo: { src: "/assets/to/njord.webp", alt: "Njord", width: 369, height: 191, className: "org-logo big" }, photo: { src: "/assets/heroes/njord.webp", alt: "Njord autonome fartøy på vannet", width: 1920, height: 1143 } },
  { name: "Nordlys", href: "https://www.nordlysntnu.no", accent: "red", category: "Energi · Bil", description: "Bygger og konkurrerer med soldrevne racerbiler i internasjonale solbilløp.", logo: { src: "/assets/logos/nordlys.webp", alt: "Nordlys Solar Racing", width: 1920, height: 626, className: "org-logo big" }, photo: { src: "/assets/heroes/nordlys.webp", alt: "Nordlys-teamet med solbil", width: 751, height: 500 } },
  { name: "Orbit NTNU", href: "https://www.orbitntnu.com", accent: "blue", category: "Rom · Satellitter", description: "Bygger CubeSat-satellitter. Første student-satellitt i bane fra NTNU.", logo: { src: "/assets/logos/orbit.webp", alt: "Orbit NTNU", width: 977, height: 458 }, photo: { src: "/assets/heroes/orbit.webp", alt: "Orbit-satellitt i bane", width: 1536, height: 1154 }, mediaClass: "dark" },
  { name: "Propulse NTNU", href: "https://www.propulse.no", accent: "blue", category: "Rom · Raketter", description: "Designer, bygger og skyter opp væskedrevne forskningsraketter.", logo: { src: "/assets/logos/propulse.webp", alt: "Propulse NTNU", width: 1099, height: 640, className: "org-logo big" }, photo: { src: "/assets/heroes/propulse.webp", alt: "Propulse-rakett avduking", width: 960, height: 548 } },
  { name: "Revolve NTNU", href: "https://www.revolve.no", accent: "teal", category: "Motorsport · Bil", description: "Formula Student — designer og bygger en ny elektrisk racerbil hvert år.", logo: { src: "/assets/logos/revolve-white.webp", alt: "Revolve NTNU", width: 352, height: 120, className: "org-logo big" }, photo: { src: "/assets/heroes/revolve.webp", alt: "Revolve-bil på banen", width: 1920, height: 1134 }, mediaClass: "black" },
  { name: "Vortex NTNU", href: "https://www.vortexntnu.no", accent: "red", category: "Hav · Undervann", description: "Bygger autonome undervannsfarkoster (ROV/AUV) til internasjonale konkurranser.", logo: { src: "/assets/to/ascend.webp", alt: "Vortex NTNU", width: 528, height: 175, className: "org-logo big" }, photo: { src: "/assets/heroes/vortex.webp", alt: "Vortex ORCA undervannsfarkost", width: 1536, height: 1024 }, mediaClass: "deeper" },
];

const coordinators = [
  { name: "Eir Ilić Holen", initials: "EH", email: "eir.ilic.h@gmail.com" },
  { name: "James Henriksen", initials: "JH", email: "James.henriksen@revolve.no" },
];

const pressArticles = [
  {
    source: "NTNU Nyheter",
    title: "Åpning av NTNU Teknologihallen",
    date: "15. mai 2026",
    href: "https://nyheter.ntnu.no/apning-av-ntnu-teknologihallen/",
  },
  {
    source: "Universitetsavisa",
    title: "Ni studentorganisasjoner får eget verksted",
    date: "18. mai 2026",
    href: "https://www.universitetsavisa.no/nordlys-ntnu-ntnu-orbit/ni-studentorganisasjoner-far-eget-verksted/458133",
  },
  {
    source: "Universitetsavisa",
    title: "Trondheim får nytt studenthus",
    date: "3. september 2025",
    href: "https://www.universitetsavisa.no/njord-ntnui-nyhavna/trondheim-far-nytt-studenthus/437229",
  },
];

const contactReasons = [
  { icon: "ph-buildings", title: "Teknologihallen & lokaler", text: "Tilgang, bruk av fasiliteter og spørsmål om anleggene." },
  { icon: "ph-handshake", title: "Samarbeid & partnerskap", text: "Vil du samarbeide med organisasjonene? Vi kobler deg videre." },
  { icon: "ph-megaphone-simple", title: "Presse & henvendelser", text: "Media, besøk og generelle spørsmål om TO-miljøet." },
];

const breadcrumbData = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Hjem", item: "https://www.framntnu.no/" }, { "@type": "ListItem", position: 2, name: "Teknologihallen", item: "https://www.framntnu.no/teknologihallen" }] };
const organizationData = { "@context": "https://schema.org", "@type": "Organization", name: "FRAM NTNU", url: "https://www.framntnu.no", logo: "https://www.framntnu.no/assets/og-fram.png", description: "FRAM NTNU er NTNUs senter for studentinnovasjon — et fellesskap for studenter som vil skape noe.", sameAs: ["https://www.instagram.com/framntnu/", "https://www.facebook.com/framntnu", "https://www.linkedin.com/company/framntnu/"] };

const panelColors: Record<Org["accent"], string> = {
  yellow: "color-mix(in srgb,var(--yellow) 17%,#fff)",
  blue: "color-mix(in srgb,var(--blue) 14%,#fff)",
  red: "color-mix(in srgb,var(--red) 14%,#fff)",
  teal: "color-mix(in srgb,var(--teal) 16%,#fff)",
};

function OrgCard({ org }: { org: Org }) {
  const mediaBg =
    org.mediaClass === "black"
      ? "#000"
      : org.mediaClass === "dark"
        ? "#16181D"
        : org.mediaClass === "deeper"
          ? "#20232A"
          : panelColors[org.accent];

  const logoSize = org.logo.className?.includes("tall")
    ? "max-h-[106px] max-w-[54%]"
    : org.logo.className?.includes("big")
      ? "max-h-[90px] max-w-[76%]"
      : "max-h-[74px] max-w-[74%]";

  return (
    <a href={org.href} target="_blank" rel="noopener" className="group flex flex-col overflow-hidden rounded-[16px] border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] no-underline [transition:transform_.25s_ease,border-color_.25s_ease,box-shadow_.25s_ease] hover:border-[var(--ink)] hover:shadow-[0_24px_46px_-26px_rgba(0,0,0,.28)] hover:[transform:translateY(-5px)]">
      <div className="relative grid h-[160px] place-items-center overflow-hidden border-b border-[var(--line)] max-[760px]:h-[130px]" style={{ background: mediaBg }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width={org.logo.width} height={org.logo.height} loading="lazy" decoding="async" src={org.logo.src} alt={org.logo.alt} className={`relative z-[2] h-auto w-auto object-contain opacity-0 [transform:scale(.88)] [transition:opacity_.35s_ease,transform_.45s_ease] group-hover:opacity-100 group-hover:[transform:scale(1)] ${logoSize}`} />
        <span className="pointer-events-none absolute inset-0 z-[1] opacity-0 [transition:opacity_.35s_ease] group-hover:opacity-[.97]" style={{ background: mediaBg }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width={org.photo.width} height={org.photo.height} loading="lazy" decoding="async" src={org.photo.src} alt={org.photo.alt} className="absolute inset-0 z-0 h-full w-full object-cover opacity-100 [transform:scale(1.001)] [transition:transform_.7s_ease,opacity_.4s_ease] group-hover:[transform:scale(1.05)]" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[7px] px-5 pt-[18px] pb-[22px] max-[760px]:px-3.5 max-[760px]:pt-3 max-[760px]:pb-4">
        <h3 className="mt-px mb-0 text-[19px] leading-[1.12] font-bold tracking-[-.015em] [overflow-wrap:break-word] max-[760px]:text-base">{org.name}</h3>
        <p className="m-0 text-[13.5px] leading-[1.5] text-[var(--ink-soft)] max-[760px]:text-xs">{org.description}</p>
      </div>
    </a>
  );
}

export default function TeknologihallenPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] font-sans text-[var(--ink)] [scroll-behavior:smooth] [--accent-deep:#5CC8DE] [--accent:#5CC8DE] [--bg-soft:#121D25] [--bg:#0D151B] [--blue:#4AA6D8] [--card:#16222B] [--ink-soft:#A2AFB9] [--ink:#ECF1F5] [--line:#27343E] [--muted:#6E7C88] [--red:#E86B6B] [--steel-soft:#1B2A34] [--steel:#0B1218] [--teal:#3FC4A3] [--yellow:#FDC82F]">
      <link rel="preload" as="image" href="/assets/teknologihallen/hero.jpg" fetchPriority="high" />
      <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />

      <SiteHeader currentPath="/teknologihallen" dark logoSrc="/assets/fram-logo-hvit.webp" logoClassName="max-[900px]:!h-[42px]" />
      <TeknologihallenHero />

      {/* ===== TEKNOLOGIHALLEN (foto) ===== */}
      <section id="lokasjoner" className="py-[clamp(64px,7vw,92px)]">
        <div className="mx-auto max-w-[1360px] px-12 max-[860px]:px-[22px]">
          <article className="group relative isolate block aspect-[16/9] overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--steel)] [transition:transform_.35s_ease,box-shadow_.35s_ease] hover:[transform:translateY(-4px)] hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,.4)] max-[860px]:aspect-[4/3] max-[560px]:aspect-auto">
            {/* På mobil blir bildet et banner (fast høyde) med teksten under, i stedet for tekst oppå bildet. */}
            <div className="contents max-[560px]:relative max-[560px]:block max-[560px]:h-[190px] max-[560px]:overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/teknologihallen/valgrinda.jpg" alt="Teknologihallen" loading="lazy" decoding="async" className="absolute inset-0 z-0 h-full w-full object-cover [transition:transform_.6s_cubic-bezier(.22,.61,.36,1)] group-hover:[transform:scale(1.06)]" />
              {/* Illustrasjon som standard, fader til foto på hover. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/teknologihallen/valgrinda-aerial.webp" alt="Flyfoto av Teknologihallen" loading="lazy" decoding="async" className="absolute inset-0 z-0 h-full w-full object-cover opacity-100 [transition:opacity_.5s_ease,transform_.6s_cubic-bezier(.22,.61,.36,1)] group-hover:opacity-0 group-hover:[transform:scale(1.06)]" />
              <div className="pointer-events-none absolute inset-0 z-[1] opacity-50 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,.6)_0%,transparent_55%)]" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_top,rgba(18,25,30,.92)_0%,rgba(18,25,30,.55)_32%,rgba(18,25,30,.08)_62%,transparent_82%)] max-[560px]:bg-[linear-gradient(to_top,rgba(18,25,30,.55)_0%,transparent_60%)]" aria-hidden="true" />
            </div>
            <div className="absolute inset-x-0 bottom-0 z-[2] px-8 pt-[30px] pb-8 text-white max-[860px]:px-6 max-[860px]:pt-6 max-[860px]:pb-[26px] max-[560px]:static max-[560px]:bg-[var(--steel)] max-[560px]:pt-5">
              <h3 className="m-0 mb-2.5 text-[clamp(26px,2.6vw,36px)] leading-[1.02] font-extrabold tracking-[-.025em] text-white">Teknologihallen</h3>
              <p className="m-0 max-w-[46ch] text-[14.5px] leading-[1.55] text-white/80">Under samme tak deler organisasjonene verksteder, kontorer og sosiale soner — et miljø der kompetanse og utstyr flyter fritt mellom prosjektene.</p>
              <a href="https://link.mazemap.com/UAGcgjzn" target="_blank" rel="noopener" className="relative z-[3] mt-[18px] inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/12 px-[22px] py-3 text-[14px] font-bold text-white no-underline backdrop-blur-sm [transition:transform_.2s,border-color_.2s,background_.2s] hover:[transform:translateY(-2px)] hover:border-white hover:bg-white/20"><i className="ph ph-map-pin text-[16px]" aria-hidden="true" /> Finn frem i MazeMap</a>
            </div>
          </article>
        </div>
      </section>

      {/* ===== ORGANISASJONENE ===== */}
      <section id="organisasjoner" className="py-[104px] max-[720px]:py-16">
        <div className="mx-auto max-w-[1360px] px-12 max-[720px]:px-[22px]">
          <div className="mb-11 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-[640px]">
              <h2 className="m-0 text-[clamp(28px,3vw,44px)] leading-[1.05] font-extrabold tracking-[-.028em] max-[560px]:text-[clamp(32px,9vw,40px)]">Organisasjonene {getAcademicYear()}</h2>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-[18px] max-[1180px]:grid-cols-3 max-[760px]:grid-cols-2 max-[760px]:gap-2.5">
            {orgs.map((org) => <OrgCard key={org.name} org={org} />)}
          </div>
        </div>
      </section>

      {/* ===== SITAT ===== */}
      <section id="sitat" className="relative overflow-hidden bg-[var(--steel)] py-[clamp(52px,5.5vw,72px)] text-white before:pointer-events-none before:absolute before:inset-0 before:opacity-40 before:[background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] before:[background-size:46px_46px] before:[mask-image:radial-gradient(circle_at_78%_30%,rgba(0,0,0,.9),transparent_72%)] before:content-['']">
        <div className="relative z-[1] mx-auto max-w-[1360px] px-12 max-[720px]:px-[22px]">
          <div className="grid grid-cols-[0.58fr_1.42fr] items-center gap-12 max-[1100px]:grid-cols-1 max-[1100px]:gap-[34px]">
            <div className="relative aspect-[4/5] max-w-[290px] overflow-hidden rounded-[22px] border border-white/12 bg-[var(--steel-soft)] max-[1100px]:max-w-[320px] max-[560px]:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/teknologihallen/sivert.webp" alt="Sivert Sande Kverme" loading="lazy" decoding="async" className="absolute inset-0 block h-full w-full object-cover" />
            </div>
            <div>
              <div className="mb-[22px] flex items-center gap-2.5 font-mono text-[11px] tracking-[.16em] text-[var(--blue)] uppercase">Under åpningen</div>
              <blockquote className="relative m-0 text-[clamp(19px,1.85vw,27px)] leading-[1.4] font-semibold tracking-[-.015em] text-white before:pointer-events-none before:absolute before:-top-8 before:-left-1 before:font-sans before:text-[92px] before:leading-none before:font-extrabold before:text-[var(--blue)] before:opacity-[.16] before:content-['”']">«Teknologihallen er resultatet av flere års målrettet arbeid — fra både studentene og NTNU. Vi ville skape trygge rammer som styrker samarbeidet og gir oss ro til å fokusere på prosjektene våre.»</blockquote>
              <div className="mt-7 flex items-center gap-3.5">
                <span className="h-[42px] w-[3px] rounded-sm bg-[var(--blue)]" />
                <div>
                  <div className="text-[17px] font-bold tracking-[-.01em] text-white">Sivert Sande Kverme</div>
                  <div className="mt-0.5 text-[13px] text-white/60">Tidligere TO-koordinator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== I MEDIA ===== */}
      <section id="i-media" className="pb-[104px] max-[720px]:pb-16">
        <div className="mx-auto max-w-[1360px] px-12 max-[720px]:px-[22px]">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[640px]">
              <h2 className="m-0 text-[clamp(26px,2.7vw,40px)] leading-[1.06] font-extrabold tracking-[-.026em]">Nyheter</h2>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[18px] max-[900px]:flex max-[900px]:snap-x max-[900px]:snap-mandatory max-[900px]:overflow-x-auto max-[900px]:pb-2 max-[900px]:[scrollbar-width:none] max-[900px]:[-webkit-overflow-scrolling:touch]">
            {pressArticles.map((article) => (
              <a key={article.href} href={article.href} target="_blank" rel="noopener" className="group flex flex-col justify-between gap-8 rounded-[20px] border border-[var(--line)] bg-[var(--card)] px-8 pt-7 pb-6 text-[var(--ink)] no-underline [transition:transform_.25s_ease,border-color_.25s_ease,box-shadow_.25s_ease] hover:border-[var(--ink)] hover:shadow-[0_24px_46px_-26px_rgba(0,0,0,.4)] hover:[transform:translateY(-4px)] max-[900px]:min-w-[80%] max-[900px]:snap-start max-[720px]:min-w-[85%] max-[720px]:gap-6 max-[720px]:px-6 max-[720px]:pt-6">
                <div>
                  <div className="mb-4 flex items-center gap-[9px] font-mono text-[10.5px] tracking-[.12em] text-[var(--muted)] uppercase">
                    <span className="h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent)]" />
                    {article.source}
                    <span className="text-[var(--line)]">·</span>
                    {article.date}
                  </div>
                  <h3 className="m-0 text-[clamp(19px,1.7vw,24px)] leading-[1.2] font-bold tracking-[-.018em] text-[var(--ink)] [overflow-wrap:break-word]">{article.title}</h3>
                </div>
                <span className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[var(--accent-deep)] [transition:gap_.2s_ease] group-hover:gap-3">Les saken <i className="ph ph-arrow-up-right text-[15px]" aria-hidden="true" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BAK TEKNOLOGIHALLEN ===== */}
      <section id="bak-teknologihallen" className="border-t border-[var(--line)] bg-[var(--bg-soft)] pt-24 pb-[104px] max-[720px]:pt-14 max-[720px]:pb-16">
        <div className="mx-auto max-w-[1360px] px-12 max-[720px]:px-[22px]">
          {/* Kontakt: TO-koordinatorene */}
          <div className="rounded-[28px] border border-[var(--line)] bg-[var(--card)] px-12 pt-12 pb-11 max-[860px]:px-[26px] max-[860px]:pt-9 max-[860px]:pb-8">
            <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-6">
              <span className="font-mono text-[11px] font-semibold tracking-[.14em] text-[var(--accent-deep)] uppercase">Kontakt</span>
            </div>
            <h3 className="mt-3.5 mb-0 text-[clamp(23px,2.3vw,32px)] font-extrabold tracking-[-.022em]">Har du spørsmål? Ta kontakt.</h3>
            <p className="mt-3 mb-0 max-w-[560px] text-[15.5px] leading-[1.66] text-[var(--ink-soft)]">TO-koordinatorene representerer fellesskapet av tekniske organisasjoner. Lurer du på noe om Teknologihallen eller organisasjonene som befinner seg her så ta kontakt med dem.</p>

            <div className="mt-[38px] grid grid-cols-2 gap-14 max-[860px]:grid-cols-1 max-[860px]:gap-10">
              <div className="flex flex-col gap-2">
                <p className="m-0 mb-3.5 font-mono text-[11px] tracking-[.12em] text-[var(--muted)] uppercase">Dagens koordinatorer</p>
                {coordinators.map((person) => (
                  <div key={person.name} className="flex items-center gap-4 rounded-[16px] p-3.5 transition-colors hover:bg-[var(--bg-soft)]">
                    <span aria-hidden="true" className="grid h-[72px] w-[72px] flex-none place-items-center rounded-full border border-[var(--line)] bg-[var(--steel)] text-[22px] font-bold tracking-[-.01em] text-[var(--accent-deep)] shadow-[0_0_0_3px_var(--bg-soft)]">{person.initials}</span>
                    <div className="flex min-w-0 flex-col gap-[3px]">
                      <span className="text-[17px] font-bold tracking-[-.01em]">{person.name}</span>
                      <span className="flex items-center gap-[7px] font-mono text-[10px] tracking-[.1em] text-[var(--accent-deep)] uppercase before:h-1.5 before:w-1.5 before:flex-none before:rounded-full before:bg-[var(--accent)] before:content-['']">TO-koordinator</span>
                      <RevealEmail encoded={Buffer.from(person.email).toString("base64")} />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="mt-0 mb-[18px] text-[12px] font-semibold tracking-[.12em] text-[var(--muted)] uppercase">Ta kontakt om</h4>
                <ul className="m-0 mb-6 flex list-none flex-col gap-3.5 p-0">
                  {contactReasons.map((reason) => (
                    <li key={reason.title} className="flex items-start gap-3.5">
                      <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[11px] border border-[var(--line)] bg-[var(--bg-soft)] text-[18px] text-[var(--accent-deep)]"><i className={`ph ${reason.icon}`} aria-hidden="true" /></span>
                      <span className="flex flex-col gap-0.5"><b className="text-[14.5px] font-semibold tracking-[-.01em] text-[var(--ink)]">{reason.title}</b><span className="text-[13px] leading-[1.5] text-[var(--ink-soft)]">{reason.text}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter logoSrc="/assets/fram-logo-hvit.webp" dark ntnuWhite sparebankWhite />
    </div>
  );
}
