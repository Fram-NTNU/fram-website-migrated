import type { Metadata } from "next";
import {
  MiljoerExplorer,
  type Organization,
} from "@/components/miljoer-explorer";
import { MiljoerMap } from "@/components/miljoer-map";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const description =
  "Oversikt over alle innovasjonsmiljøer og studentorganisasjoner ved NTNU i Trondheim tilknyttet FRAM — fra dronebygging og AI til entreprenørskap og design.";
export const metadata: Metadata = {
  title: "Innovasjonsmiljøene ved NTNU — FRAM",
  description,
  alternates: { canonical: "https://www.framntnu.no/miljoer" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "FRAM NTNU",
    locale: "nb_NO",
    title: "Innovasjonsmiljøene ved NTNU — FRAM",
    description,
    url: "https://www.framntnu.no/miljoer",
    images: [{ url: "/assets/og-fram.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Innovasjonsmiljøene ved NTNU — FRAM",
    description,
    images: ["/assets/og-fram.png"],
  },
};

const organizations: Organization[] = [
  {
    accent: "yellow",
    href: "https://www.ascendntnu.no",
    logo: "/assets/logos/ascend.webp",
    logoAlt: "Ascend NTNU",
    logoSize: "tall",
    photo: "/assets/heroes/ascend.webp",
    photoAlt: "Ascend-drone på bakken",
    category: "Luft · Droner",
    name: "Ascend NTNU",
    description:
      "Konkurrerer i internasjonale drone-konkurranser med autonome systemer.",
  },
  {
    accent: "red",
    href: "https://www.boosthenne.no",
    logo: "/assets/logos/boosthenne.webp",
    logoAlt: "Boost Henne",
    photo: "/assets/heroes/boosthenne.webp",
    photoAlt: "Boost Henne-arrangement",
    photoPosition: "center top",
    category: "Kvinnenettverk",
    name: "Boost Henne",
    description:
      "Kvinnenettverk for studenter som vil inn i entreprenørskap. Rollemodeller, mentorer og events.",
  },
  {
    accent: "teal",
    href: "https://www.brainntnu.no",
    logo: "/assets/partners/brain-ntnu.webp",
    logoAlt: "BRAIN NTNU",
    photo: "/assets/heroes/brain.webp",
    photoAlt: "BRAIN NTNU-teamet",
    category: "AI · Teknologi",
    name: "BRAIN NTNU",
    description:
      "Arrangerer hackathons, foredrag og møteplasser innen kunstig intelligens.",
  },
  {
    accent: "yellow",
    href: "https://www.cogito-ntnu.no/",
    media: "dark",
    logo: "/assets/logos/cogito-white.webp",
    logoAlt: "Cogito",
    photo: "/assets/heroes/cogito.webp",
    photoAlt: "Cogito-teamet",
    category: "AI · Prosjekter",
    name: "Cogito",
    description:
      "Utvikler AI-løsninger og bygger erfaring gjennom semesterprosjekter.",
  },
  {
    accent: "teal",
    href: "https://www.designhjelpen.no",
    logo: "/assets/logos/designhjelpen.webp",
    logoAlt: "Designhjelpen",
    logoSize: "big",
    photo: "/assets/heroes/designhjelpen.avif",
    photoAlt: "Designhjelpen-teamet",
    category: "Konsulent · Design",
    name: "Designhjelpen",
    description:
      "Designstudenter hjelper andre orgs og oppstarter med visuell identitet, web og UX.",
  },
  {
    accent: "red",
    href: "https://www.instagram.com/drivntnu",
    logo: "/assets/logos/driv.webp",
    logoAlt: "DRIV NTNU",
    photo: "/assets/heroes/driv.webp",
    photoAlt: "DRIV NTNU-aktivitet",
    category: "Helse · Innovasjon",
    name: "DRIV NTNU",
    description:
      "Kobler studenter med reelle helseutfordringer og et tverrfaglig innovasjonsmiljø.",
  },
  {
    accent: "red",
    href: "https://www.entreprenorskolen.no/",
    logo: "/assets/logos/entreprenorskolen.webp",
    logoAlt: "NTNU School of Entrepreneurship",
    photo: "/assets/heroes/entreprenorskolen.webp",
    photoAlt: "Entreprenørskolen",
    photoContain: true,
    category: "Master",
    name: "Entreprenørskolen",
    description:
      "NTNUs master i entreprenørskap (NSE). To år der du bygger et reelt selskap som eksamen.",
  },
  {
    accent: "teal",
    href: "https://fuelfighter.no",
    logo: "/assets/to/fuelfighter.webp",
    logoAlt: "Fuel Fighter",
    photo: "/assets/heroes/fuelfighter.webp",
    photoAlt: "Fuel Fighter-teamet med kjøretøy",
    category: "Energi · Bil",
    name: "Fuel Fighter",
    description:
      "Bygger ultra-energieffektive kjøretøy til Shell Eco-marathon.",
  },
  {
    accent: "yellow",
    href: "https://www.gridvillentnu.com/",
    media: "dark",
    logo: "/assets/logos/gridville-white2.webp",
    logoAlt: "Gridville",
    photo: "/assets/heroes/gridville.webp",
    photoAlt: "Gridville-teamet",
    category: "Energi · Nett",
    name: "Gridville",
    description:
      "Studentprosjekter på fornybar energi, mikro­nett og smart strømforsyning.",
  },
  {
    accent: "blue",
    href: "https://www.grunderbrakka.no",
    logo: "/assets/logos/grunderbrakka.webp",
    logoAlt: "Gründerbrakka",
    photo: "/assets/heroes/grunderbrakka.webp",
    photoAlt: "Gründerbrakka lokalene",
    category: "Coworking",
    name: "Gründerbrakka",
    description:
      "Coworking-plass for ambisiøse oppstarter. Faste kontorplasser og investor­nettverk.",
  },
  {
    accent: "teal",
    href: "https://www.hackerspace-ntnu.no",
    media: "dark",
    logo: "/assets/logos/hackerspace.webp",
    logoAlt: "Hackerspace NTNU",
    logoSize: "big",
    photo: "/assets/heroes/hackerspace.webp",
    photoAlt: "Hackerspace NTNU-lokalet",
    category: "Makerspace",
    name: "Hackerspace NTNU",
    description:
      "Studentdrevet makerspace — lodding, 3D-print, software-prosjekter og workshops.",
  },
  {
    accent: "yellow",
    href: "https://iug.no/om-oss/lokalavdelinger/iug-ntnu",
    logo: "/assets/logos/iug.webp",
    logoAlt: "Ingeniører uten grenser",
    photo: "/assets/heroes/iug.webp",
    photoAlt: "Ingeniører uten grenser-prosjekt",
    category: "Humanitær",
    name: "Ingeniører uten grenser",
    description:
      "Teknisk bistand og prosjekter i utviklingsland — rent vann, skoler, energi.",
  },
  {
    accent: "red",
    href: "https://www.instagram.com/innovationtnu/",
    media: "dark-navy",
    logo: "/assets/logos/innovatio.webp",
    logoAlt: "Innovatio",
    logoSize: "big-tall",
    photo: "/assets/heroes/innovatio.webp",
    photoAlt: "Innovatio-teamet",
    category: "Linjeforening",
    name: "Innovatio",
    description:
      "Linjeforeningen for masterprogrammet i Innovasjon og bærekraftig samfunnsutvikling ved NTNU i Trondheim.",
  },
  {
    accent: "teal",
    href: "https://makentnu.no/",
    logo: "/assets/logos/make.webp",
    logoAlt: "Make NTNU",
    photo: "/assets/heroes/make.webp",
    photoAlt: "Make NTNU 3D-printere",
    category: "Makerspace",
    name: "Make NTNU",
    description:
      "Gir studenter tilgang til verktøy, utstyr og kompetanse for å bygge egne prosjekter.",
  },
  {
    accent: "blue",
    href: "https://www.njordntnu.no/",
    logo: "/assets/to/njord.webp",
    logoAlt: "Njord",
    logoSize: "big",
    photo: "/assets/heroes/njord.webp",
    photoAlt: "Njord autonome fartøy på vannet",
    category: "Hav · Autonomi",
    name: "Njord",
    description:
      "Arrangerer en internasjonal konkurranse for selvstyrte skip, og bygger sine egne autonome fartøy.",
  },
  {
    accent: "red",
    href: "https://www.nordlysntnu.no/",
    logo: "/assets/logos/nordlys.webp",
    logoAlt: "Nordlys Solar Racing",
    logoSize: "big",
    photo: "/assets/heroes/nordlys.webp",
    photoAlt: "Nordlys-teamet med solbil",
    category: "Energi · Bil",
    name: "Nordlys",
    description:
      "Bygger og konkurrerer med soldrevne racerbiler i internasjonale solbilløp.",
  },
  {
    accent: "blue",
    href: "https://www.norstec.no/",
    logo: "/assets/logos/norstec.webp",
    logoAlt: "NORSTEC",
    photo: "/assets/heroes/norstec-ledere.webp",
    photoAlt: "NORSTEC-lederne foran anlegget",
    category: "Rom · Nettverk",
    name: "NORSTEC",
    description:
      "Forener studentorganisasjoner innen romteknologi og skaper nye muligheter gjennom samarbeid.",
  },
  {
    accent: "blue",
    href: "https://norstec.no/summit",
    media: "dark",
    logo: "/assets/logos/norstec-summit-white.webp",
    logoAlt: "NORSTEC Summit",
    photo: "/assets/heroes/norstec.webp",
    photoAlt: "NORSTEC romkonferanse",
    category: "Rom · Konferanse",
    name: "NORSTEC Summit",
    description:
      "Samler studenter, industri og myndigheter til Norges største studentdrevne romkonferanse.",
  },
  {
    accent: "blue",
    href: "https://www.orbitntnu.com/",
    media: "dark",
    logo: "/assets/logos/orbit.webp",
    logoAlt: "Orbit NTNU",
    photo: "/assets/heroes/orbit.webp",
    photoAlt: "Orbit-satellitt i bane",
    category: "Rom · Satellitter",
    name: "Orbit NTNU",
    description:
      "Bygger CubeSat-satellitter. Første student-satellitt i bane fra NTNU.",
  },
  {
    accent: "blue",
    href: "https://www.propulse.no/",
    logo: "/assets/logos/propulse.webp",
    logoAlt: "Propulse NTNU",
    logoSize: "big",
    photo: "/assets/heroes/propulse.webp",
    photoAlt: "Propulse-rakett avduking",
    category: "Rom · Raketter",
    name: "Propulse NTNU",
    description:
      "Designer, bygger og skyter opp væskedrevne forskningsraketter.",
  },
  {
    accent: "red",
    href: "https://reluntnu.no/",
    media: "dark",
    logo: "/assets/logos/relu.webp",
    logoAlt: "Relu",
    photo: "/assets/heroes/relu.webp",
    photoAlt: "Relu-presentasjon",
    category: "AI · Industri",
    name: "Relu",
    description: "Utvikler AI-løsninger i samarbeid med næringslivet.",
  },
  {
    accent: "teal",
    href: "https://www.revolve.no/",
    logo: "/assets/logos/revolve.webp",
    logoAlt: "Revolve NTNU",
    logoSize: "tall",
    photo: "/assets/heroes/revolve.webp",
    photoAlt: "Revolve-bil på banen",
    category: "Motorsport · Bil",
    name: "Revolve NTNU",
    description:
      "Formula Student — designer og bygger en ny elektrisk racerbil hvert år.",
  },
  {
    accent: "teal",
    href: "https://www.instagram.com/solanlinjeforening",
    logo: "/assets/logos/solan-new.webp",
    logoAlt: "Solan Linjeforening",
    logoSize: "tall",
    photo: "/assets/heroes/solan.webp",
    photoAlt: "Solan Linjeforening-teamet",
    category: "Linjeforening",
    name: "Solan",
    description: "Linjeforeningen for Entreprenørskolen ved NTNU i Trondheim.",
  },
  {
    accent: "blue",
    href: "https://sparkntnu.no/",
    logo: "/assets/spark-logo.webp",
    logoAlt: "Spark NTNU",
    photo: "/assets/heroes/spark-org.webp",
    photoAlt: "Spark NTNU-arrangement",
    photoPosition: "center top",
    category: "Veiledning",
    name: "Spark* NTNU",
    description:
      "Gratis veiledningstjeneste for studenter med en forretningsidé — mentorer, workshops og et program fra post-it til pilot.",
  },
  {
    accent: "yellow",
    href: "https://www.startntnu.no/",
    logo: "/assets/partners/start-ntnu.webp",
    logoAlt: "Start NTNU",
    photo: "/assets/heroes/start.webp",
    photoAlt: "Start IT-arrangement",
    category: "Arrangør",
    name: "Start NTNU",
    description:
      "Norges største studentorganisasjon for entreprenørskap. Startup Weekend, pitch-kvelder og karriere­events.",
  },
  {
    accent: "blue",
    href: "https://www.instagram.com/studiobeta/",
    logo: "/assets/logos/studiobeta.webp",
    logoAlt: "Studio Beta",
    photo: "/assets/heroes/studiobeta.webp",
    photoAlt: "Studio Beta-byggeprosjekt",
    category: "Arkitektur",
    name: "Studio Beta",
    description:
      "Studentdrevet arkitektur- og designstudio. Byggeprosjekter i full skala og prototyper.",
  },
  {
    accent: "yellow",
    href: "https://www.stottehjulet.no/",
    logo: "/assets/logos/stottehjulet.webp",
    logoAlt: "Støttehjulet",
    logoSize: "big-tall",
    photo: "/assets/heroes/stottehjulet.avif",
    photoAlt: "Støttehjulet-teamet",
    category: "Konsulent · Organisasjon",
    name: "Støttehjulet",
    description:
      "Hjelper organisasjoner med ledelse, samarbeid og organisasjonsutvikling.",
  },
  {
    accent: "red",
    href: "https://www.vortexntnu.no",
    media: "deeper",
    logo: "/assets/to/ascend.webp",
    logoAlt: "Vortex NTNU",
    logoSize: "big",
    photo: "/assets/heroes/vortex.webp",
    photoAlt: "Vortex ORCA undervannsfarkost",
    category: "Hav · Undervann",
    name: "Vortex NTNU",
    description:
      "Bygger autonome undervannsfarkoster (ROV/AUV) til internasjonale konkurranser.",
  },
  {
    accent: "yellow",
    href: "https://www.instagram.com/wic_ntnu/",
    media: "dark",
    logo: "/assets/logos/wic.webp",
    logoAlt: "WIC — Women’s Investment Club",
    photo: "/assets/heroes/wic.webp",
    photoAlt: "WIC-arrangement",
    category: "Kvinnenettverk",
    name: "WIC",
    description:
      "Women’s Investment Club skaper møteplasser for kvinner med interesse for finans, investering og kapitalmarkeder.",
  },
];

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Hjem",
      item: "https://www.framntnu.no/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Innovasjonsmiljøene",
      item: "https://www.framntnu.no/miljoer",
    },
  ],
};
const itemListData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Innovasjonsmiljøene og studentorganisasjonene ved NTNU",
  description:
    "Studentorganisasjoner i innovasjonsmiljøet ved NTNU i Trondheim, tilknyttet FRAM NTNU.",
  url: "https://www.framntnu.no/miljoer",
  numberOfItems: organizations.length,
  itemListElement: organizations.map((organization, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: { "@type": "Organization", name: organization.name },
  })),
};
const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FRAM NTNU",
  url: "https://www.framntnu.no",
  logo: "https://www.framntnu.no/assets/og-fram.png",
  description:
    "FRAM NTNU er NTNUs senter for studentinnovasjon — et fellesskap for studenter som vil skape noe.",
  sameAs: [
    "https://www.instagram.com/framntnu/",
    "https://www.facebook.com/framntnu",
    "https://www.linkedin.com/company/framntnu/",
  ],
};

export default function MiljoerPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] font-sans text-[var(--ink)] [--bg-soft:#F2EDE3] [--bg:#FAF7F2] [--blue:#2E86C1] [--card:#fff] [--ink-soft:#555] [--ink:#1E1E1E] [--line:#E6E0D5] [--muted:#8A8A8A] [--nav-accent:#E85A5A] [--red:#E85A5A] [--teal:#3FC4A3] [--yellow:#FDC82F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <link rel="preconnect" href="https://app.atlas.co" crossOrigin="anonymous" />
      <SiteHeader currentPath="/miljoer" />
      <header className="border-b border-[var(--line)] py-9">
        <div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
          <h1 className="mt-0 mb-4 whitespace-nowrap text-[clamp(32px,3.8vw,50px)] leading-[1.05] font-extrabold tracking-[-.025em] max-[520px]:whitespace-normal">
            Innovasjonsmiljøet ved <span className="text-black">NTNU</span>.
          </h1>
          <p className="m-0 max-w-[660px] text-lg leading-[1.55] text-[var(--ink-soft)]">
            FRAM samler studentorganisasjonene innen innovasjon og
            entreprenørskap ved NTNU — fra robotikk og kunstig intelligens til
            design og gründerskap. Miljøene gir studenter muligheten til å jobbe
            med reelle prosjekter, bygge nettverk og utvikle ferdigheter ved
            siden av studiene i Trondheim.
          </p>
          <div className="mt-7 flex items-start gap-10">
            <div>
              <div className="text-[clamp(38px,3.6vw,52px)] leading-[.9] font-extrabold tracking-[-.03em] text-[var(--yellow)]">
                30
              </div>
              <div className="mt-3.5 font-mono text-xs tracking-[.12em] text-[var(--muted)] uppercase">
                organisasjoner
              </div>
            </div>
            <div className="self-stretch border-l border-[var(--line)]" />
            <div>
              <div className="text-[clamp(38px,3.6vw,52px)] leading-[.9] font-extrabold tracking-[-.03em] text-[var(--blue)]">
                1000+
              </div>
              <div className="mt-3.5 font-mono text-xs tracking-[.12em] text-[var(--muted)] uppercase">
                aktive studenter
              </div>
            </div>
          </div>
        </div>
      </header>
      <MiljoerExplorer organizations={organizations} />
      <MiljoerMap />
      <section id="bli-medlem" className="bg-[var(--bg-soft)] py-[110px]">
        <div className="mx-auto grid max-w-[1360px] grid-cols-2 items-center gap-12 px-12 max-[860px]:grid-cols-1 max-[860px]:gap-8 max-[760px]:px-4">
          <div>
            <h2 className="mt-0 mb-5 max-w-[14ch] text-[clamp(34px,4vw,52px)] leading-[1.02] font-extrabold tracking-[-.025em]">
              Hvordan bli <span className="text-[var(--blue)]">medlem?</span>
            </h2>
            <p className="m-0 max-w-[48ch] text-[17px] leading-[1.6] text-[var(--ink-soft)]">
              De fleste organisasjonene i FRAM tar opp nye medlemmer hvert
              semester. Finn et miljø som interesserer deg, ta kontakt direkte
              med organisasjonen og følg med på opptak og arrangementer.
            </p>
          </div>
          <div className="rounded-[28px] border border-[var(--line)] bg-[var(--card)] p-9 shadow-[0_24px_60px_-40px_rgba(0,0,0,.45)]">
            <h3 className="mt-0 mb-3 text-[23px] leading-[1.2] font-extrabold tracking-[-.02em]">
              Finner du ikke organisasjonen du leter etter — eller vil starte en
              ny?
            </h3>
            <p className="mt-0 mb-6 text-[15px] leading-[1.55] text-[var(--ink-soft)]">
              Ta kontakt med oss, så hjelper vi deg videre.
            </p>
            <a
              href="mailto:framntnu@gmail.com"
              className="inline-flex items-center rounded-full border border-transparent bg-[var(--ink)] px-[22px] py-3.5 text-sm leading-[normal] font-semibold text-[var(--bg)] no-underline [transition:all_.2s] hover:bg-[var(--blue)] hover:text-white"
            >
              framntnu@gmail.com
            </a>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
