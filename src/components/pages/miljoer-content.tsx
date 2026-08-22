import { MiljoerExplorer } from "@/components/miljoer-explorer";
import { MiljoerMap } from "@/components/miljoer-map";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { organizations } from "@/lib/organizations";
import type { Lang } from "@/i18n/config";
import { SITE_URL, path } from "@/i18n/config";

const copy = {
  nb: {
    heroHeading: { pre: "Innovasjonsmiljøet ved ", hi: "NTNU", suf: "." },
    heroLead:
      "FRAM samler studentorganisasjonene innen innovasjon og entreprenørskap ved NTNU — fra robotikk og kunstig intelligens til design og gründerskap. Miljøene gir studenter muligheten til å jobbe med reelle prosjekter, bygge nettverk og utvikle ferdigheter ved siden av studiene i Trondheim.",
    statOrgs: "organisasjoner",
    statStudents: "aktive studenter",
    joinHeading: { pre: "Hvordan bli ", hi: "medlem?" },
    joinLead:
      "De fleste organisasjonene i FRAM tar opp nye medlemmer hvert semester. Finn et miljø som interesserer deg, ta kontakt direkte med organisasjonen og følg med på opptak og arrangementer.",
    joinCardHeading:
      "Finner du ikke organisasjonen du leter etter — eller vil starte en ny?",
    joinCardLead: "Ta kontakt med oss, så hjelper vi deg videre.",
    breadcrumbHome: "Hjem",
    breadcrumbCommunities: "Innovasjonsmiljøene",
    itemListName: "Innovasjonsmiljøene og studentorganisasjonene ved NTNU",
    itemListDescription:
      "Studentorganisasjoner i innovasjonsmiljøet ved NTNU i Trondheim, tilknyttet FRAM NTNU.",
    orgDescription:
      "FRAM NTNU er NTNUs senter for studentinnovasjon — et fellesskap for studenter som vil skape noe.",
  },
  en: {
    heroHeading: { pre: "The innovation community at ", hi: "NTNU", suf: "." },
    heroLead:
      "FRAM brings together the student organisations working in innovation and entrepreneurship at NTNU — from robotics and artificial intelligence to design and startups. These communities give students the chance to work on real projects, build networks and develop skills alongside their studies in Trondheim.",
    statOrgs: "organisations",
    statStudents: "active students",
    joinHeading: { pre: "How to ", hi: "join?" },
    joinLead:
      "Most organisations in FRAM recruit new members every semester. Find a community that interests you, reach out to the organisation directly, and keep an eye on their recruitment and events.",
    joinCardHeading:
      "Can't find the organisation you're looking for — or want to start a new one?",
    joinCardLead: "Get in touch and we'll help you along.",
    breadcrumbHome: "Home",
    breadcrumbCommunities: "Communities",
    itemListName: "The innovation communities and student organisations at NTNU",
    itemListDescription:
      "Student organisations in the innovation community at NTNU in Trondheim, affiliated with FRAM NTNU.",
    orgDescription:
      "FRAM NTNU is NTNU's centre for student innovation — a community for students who want to build something.",
  },
} as const satisfies Record<Lang, unknown>;

export function MiljoerContent({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const communitiesUrl = `${SITE_URL}${path("communities", lang)}`;
  const homeUrl = `${SITE_URL}${path("home", lang)}`;

  const breadcrumbData = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: homeUrl }, { "@type": "ListItem", position: 2, name: t.breadcrumbCommunities, item: communitiesUrl }] };
  const itemListData = { "@context": "https://schema.org", "@type": "ItemList", name: t.itemListName, description: t.itemListDescription, url: communitiesUrl, numberOfItems: organizations.length, itemListElement: organizations.map((organization, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Organization", name: organization.name } })) };
  const organizationData = { "@context": "https://schema.org", "@type": "Organization", name: "FRAM NTNU", url: SITE_URL, logo: `${SITE_URL}/assets/og-fram.png`, description: t.orgDescription, sameAs: ["https://www.instagram.com/framntnu/", "https://www.facebook.com/framntnu", "https://www.linkedin.com/company/framntnu/"] };

  return (
    <div lang={lang === "en" ? "en" : undefined} className="min-h-screen bg-[var(--bg)] font-sans text-[var(--ink)] [--bg-soft:#F2EDE3] [--bg:#FAF7F2] [--blue:#2E86C1] [--card:#fff] [--ink-soft:#555] [--ink:#1E1E1E] [--line:#E6E0D5] [--muted:#8A8A8A] [--nav-accent:#E85A5A] [--red:#E85A5A] [--teal:#3FC4A3] [--yellow:#FDC82F]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />
      <link rel="preconnect" href="https://app.atlas.co" crossOrigin="anonymous" />
      <SiteHeader currentPath="/miljoer" lang={lang} />
      <header className="border-b border-[var(--line)] py-9">
        <div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
          <h1 className="mt-0 mb-4 whitespace-nowrap text-[clamp(32px,3.8vw,50px)] leading-[1.05] font-extrabold tracking-[-.025em] max-[520px]:whitespace-normal">
            {t.heroHeading.pre}<span className="text-black">{t.heroHeading.hi}</span>{t.heroHeading.suf}
          </h1>
          <p className="m-0 max-w-[660px] text-lg leading-[1.55] text-[var(--ink-soft)]">
            {t.heroLead}
          </p>
          <div className="mt-7 flex items-start gap-10">
            <div>
              <div className="text-[clamp(38px,3.6vw,52px)] leading-[.9] font-extrabold tracking-[-.03em] text-[var(--yellow)]">
                {organizations.length}
              </div>
              <div className="mt-3.5 font-mono text-xs tracking-[.12em] text-[var(--muted)] uppercase">
                {t.statOrgs}
              </div>
            </div>
            <div className="self-stretch border-l border-[var(--line)]" />
            <div>
              <div className="text-[clamp(38px,3.6vw,52px)] leading-[.9] font-extrabold tracking-[-.03em] text-[var(--blue)]">
                1300+
              </div>
              <div className="mt-3.5 font-mono text-xs tracking-[.12em] text-[var(--muted)] uppercase">
                {t.statStudents}
              </div>
            </div>
          </div>
        </div>
      </header>
      <MiljoerExplorer organizations={organizations} lang={lang} />
      <MiljoerMap lang={lang} />
      <section id="bli-medlem" className="bg-[var(--bg-soft)] py-[110px]">
        <div className="mx-auto grid max-w-[1360px] grid-cols-2 items-center gap-12 px-12 max-[860px]:grid-cols-1 max-[860px]:gap-8 max-[760px]:px-4">
          <div>
            <h2 className="mt-0 mb-5 max-w-[14ch] text-[clamp(34px,4vw,52px)] leading-[1.02] font-extrabold tracking-[-.025em]">
              {t.joinHeading.pre}<span className="text-[var(--blue)]">{t.joinHeading.hi}</span>
            </h2>
            <p className="m-0 max-w-[48ch] text-[17px] leading-[1.6] text-[var(--ink-soft)]">
              {t.joinLead}
            </p>
          </div>
          <div className="rounded-[28px] border border-[var(--line)] bg-[var(--card)] p-9 shadow-[0_24px_60px_-40px_rgba(0,0,0,.45)]">
            <h3 className="mt-0 mb-3 text-[23px] leading-[1.2] font-extrabold tracking-[-.02em]">
              {t.joinCardHeading}
            </h3>
            <p className="mt-0 mb-6 text-[15px] leading-[1.55] text-[var(--ink-soft)]">
              {t.joinCardLead}
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
      <SiteFooter lang={lang} />
    </div>
  );
}
