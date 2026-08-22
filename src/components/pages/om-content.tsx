import { FramOrigami } from "@/components/fram-origami";
import { OmTeam } from "@/components/om-team";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Lang } from "@/i18n/config";
import { SITE_URL, path } from "@/i18n/config";

const copy = {
  nb: {
    hero: { pre: "Drevet av ", hi1: "studenter", mid: " for ", hi2: "studenter", suf: "." },
    heroLead:
      "FRAM er en studentorganisasjon som forvalter Gruva og øvrige FRAM-lokaler på NTNU, og samler innovasjonsmiljøet på campus. Vi er åtte studenter som jobber tett sammen gjennom hele året.",
    boardAlt: "Styret i Fram NTNU",
    historyHeading: { pre: "Fram sin ", hi: "historie", suf: "." },
    historyLead:
      "Historien om FRAM, fra en liten pilot på campus til et av Norges største studentdrevne innovasjonsmiljøer.",
    events: [
      { year: "2. september 2015", title: "NTNUs Senter for Studentinnovasjon åpner.", accent: "#FDC82F", paragraphs: ["Kronprinsparet sto for den offisielle åpningen av NTNUs nye satsing på studentinnovasjon under et besøk hos SINTEF, NTNU og Kavli-instituttet. Senteret (SSI) ble etablert i «Gamle Fysikk» på Gløshaugen som en tverrfaglig arena der studenter kunne møtes for å utvikle ideer og prosjekter på tvers av studieretninger.", "SSI startet som en campuspilot fra universitetets side, med mål om å teste hvordan man best kunne legge til rette for studentdrevet innovasjon."] },
      { year: "2016", title: "FRAM NTNU stiftes.", accent: "#2E86C1", paragraphs: ["Som en naturlig videreføring av SSI-initiativet ble FRAM NTNU stiftet. Gjennom FRAM tok studentene gradvis over det operative ansvaret, og organisasjonen ble etablert som en paraply for å samle og støtte de mange studentdrevne innovasjonsorganisasjonene på campus."] },
      { year: "2020", title: "Fra Gamle Fysikk til Oppredningen.", accent: "#E85A5A", paragraphs: ["Etter hvert som miljøet vokste, oppstod behovet for større og mer tilpassede lokaler. Aktiviteten ble derfor flyttet fra «Gamle Fysikk» til Oppredningen i Sem Sælands vei 1."] },
      { year: "2021", title: "Gruva åpner.", accent: "#3FC4A3", paragraphs: ["Etter en lengre byggeperiode ble Gruva offisielt åpnet. Navnet er en hyllest til lokalets historie som tidligere gruveverksted ved NTNU, der det ble utviklet teknologi for mineralutvinning. I dag lever arven videre gjennom studentmiljøet, med en ambisjon om å «utvinne gull fra gråstein» i form av nye ideer, prosjekter og selskaper."] },
      { year: "I dag", title: "En sentral hub for studentinnovasjon.", accent: "#1A1A1A", paragraphs: ["I dag er det \"Innovasjonskollektivet\" som betegner studentinnovasjonsmiljøet på NTNU. FRAM NTNU fungerer som en paraplyorganisasjon for dette miljøet som består av nesten 30 studentorganisasjoner som sammen bygger fremtidens løsninger."] },
    ],
    videoHeading: { pre: "Se mer fra ", hi: "Fram", suf: "." },
    videoLead:
      "Aftermovies fra Innovasjonsdagene, intervjuer med medlemsorganisasjonene, og småglimt fra hverdagen til en student på NTNU.",
    visitChannel: "Besøk kanalen",
    videos: [
      { id: "C31svE3VMlI", label: "Innovasjonsdagene 2025" }, { id: "HgifR6YTbAw", label: "Innovasjonsdagene 2021" }, { id: "13O0ZCnzJ8g", label: "Fra arkivet: Fram i 2019" }, { id: "8eEZClQf0KQ", label: "En dag i livet til en Start'er" },
    ],
    breadcrumbHome: "Hjem",
    breadcrumbAbout: "Om Fram",
    orgDescription:
      "FRAM NTNU er NTNUs senter for studentinnovasjon — et fellesskap for studenter som vil skape noe.",
  },
  en: {
    hero: { pre: "Built by ", hi1: "students", mid: ", for ", hi2: "students", suf: "." },
    heroLead:
      "FRAM is a student organisation that runs Gruva and the other FRAM spaces at NTNU, and brings together the innovation community on campus. We're eight students working closely together throughout the year.",
    boardAlt: "The board of Fram NTNU",
    historyHeading: { pre: "Our ", hi: "history", suf: "." },
    historyLead:
      "The story of FRAM, from a small campus pilot to one of Norway's largest student-driven innovation communities.",
    events: [
      { year: "2 September 2015", title: "NTNU's Centre for Student Innovation opens.", accent: "#FDC82F", paragraphs: ["The Crown Prince and Princess officially opened NTNU's new initiative for student innovation during a visit to SINTEF, NTNU and the Kavli Institute. The centre (SSI) was established in “Gamle Fysikk” at Gløshaugen as an interdisciplinary arena where students could meet to develop ideas and projects across fields of study.", "SSI began as a campus pilot on the university's part, with the goal of testing how best to support student-driven innovation."] },
      { year: "2016", title: "FRAM NTNU is founded.", accent: "#2E86C1", paragraphs: ["As a natural continuation of the SSI initiative, FRAM NTNU was founded. Through FRAM, students gradually took over day-to-day responsibility, and the organisation was established as an umbrella to gather and support the many student-driven innovation organisations on campus."] },
      { year: "2020", title: "From Gamle Fysikk to Oppredningen.", accent: "#E85A5A", paragraphs: ["As the community grew, so did the need for larger, better-suited premises. Activity therefore moved from “Gamle Fysikk” to Oppredningen at Sem Sælands vei 1."] },
      { year: "2021", title: "Gruva opens.", accent: "#3FC4A3", paragraphs: ["After a lengthy construction period, Gruva officially opened. The name is a nod to the space's history as a former mining workshop at NTNU, where technology for mineral extraction was developed. Today that legacy lives on through the student community, with an ambition to “extract gold from ore” in the form of new ideas, projects and companies."] },
      { year: "Today", title: "A central hub for student innovation.", accent: "#1A1A1A", paragraphs: ["Today, “Innovasjonskollektivet” is the name for the student innovation community at NTNU. FRAM NTNU acts as an umbrella organisation for this community, made up of nearly 30 student organisations that together build the solutions of tomorrow."] },
    ],
    videoHeading: { pre: "See more from ", hi: "Fram", suf: "." },
    videoLead:
      "Aftermovies from Innovasjonsdagene, interviews with our member organisations, and little glimpses of everyday life as a student at NTNU.",
    visitChannel: "Visit the channel",
    videos: [
      { id: "C31svE3VMlI", label: "Innovasjonsdagene 2025" }, { id: "HgifR6YTbAw", label: "Innovasjonsdagene 2021" }, { id: "13O0ZCnzJ8g", label: "From the archive: Fram in 2019" }, { id: "8eEZClQf0KQ", label: "A day in the life of a Start'er" },
    ],
    breadcrumbHome: "Home",
    breadcrumbAbout: "About Fram",
    orgDescription:
      "FRAM NTNU is NTNU's centre for student innovation — a community for students who want to build something.",
  },
} as const satisfies Record<Lang, unknown>;

export function OmContent({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const aboutUrl = `${SITE_URL}${path("about", lang)}`;
  const homeUrl = `${SITE_URL}${path("home", lang)}`;
  const breadcrumbData = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: homeUrl }, { "@type": "ListItem", position: 2, name: t.breadcrumbAbout, item: aboutUrl }] };
  const organizationData = { "@context": "https://schema.org", "@type": "Organization", name: "FRAM NTNU", url: SITE_URL, logo: `${SITE_URL}/assets/og-fram.png`, description: t.orgDescription, sameAs: ["https://www.instagram.com/framntnu/", "https://www.facebook.com/framntnu", "https://www.linkedin.com/company/framntnu/"] };

  return <div lang={lang === "en" ? "en" : undefined} className="min-h-screen bg-[#FBF7F0] font-sans text-[#1A1A1A] [--bg-soft:#F4EFE5] [--bg:#FBF7F0] [--blue:#2E86C1] [--card:#fff] [--ink-soft:#555] [--ink:#1A1A1A] [--line:#E9E2D3] [--muted:#8a8a8a] [--nav-accent:#E85A5A] [--red:#E85A5A] [--teal:#3FC4A3] [--yellow:#FDC82F]">
    <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
    <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />
    <SiteHeader currentPath="/om" lang={lang} caretFontFamily={'Poppins, "Poppins Fallback", sans-serif'} />

    <header className="border-b border-[var(--line)] py-14 pb-24">
      <div className="mx-auto grid max-w-[1360px] grid-cols-[1.1fr_.9fr] items-end gap-16 px-12 max-[900px]:px-5 max-[760px]:grid-cols-1 max-[520px]:px-4">
        <div><h1 className="mt-0 mb-7 text-[clamp(56px,6vw,96px)] leading-[.96] font-extrabold tracking-[-.03em]">{t.hero.pre}<span className="text-[var(--yellow)]">{t.hero.hi1}</span>{t.hero.mid}<span className="text-[var(--blue)]">{t.hero.hi2}</span>{t.hero.suf}</h1><p className="m-0 max-w-[520px] text-xl leading-[1.55] text-[var(--ink-soft)]">{t.heroLead}</p></div>
        <div className="relative flex aspect-square items-center justify-center overflow-visible before:absolute before:top-1/2 before:left-1/2 before:z-0 before:aspect-square before:w-[92%] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-[radial-gradient(circle_at_35%_30%,color-mix(in_oklab,var(--yellow)_55%,transparent),transparent_60%),radial-gradient(circle_at_75%_75%,color-mix(in_oklab,var(--teal)_38%,transparent),transparent_60%),linear-gradient(160deg,#FDE9A8_0%,#F5D16E_100%)] before:shadow-[0_30px_80px_-30px_rgba(0,0,0,.28)] max-[760px]:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img width="2997" height="2938" decoding="async" src="/assets/styret-group copyv2_compressed.webp" alt={t.boardAlt} className="relative z-[1] block h-auto w-[72%]" />
        </div>
      </div>
    </header>

    <section id="team" className="relative overflow-hidden border-b border-[var(--line)] py-[110px]">
      <FramOrigami className="top-7 left-9" color="#FDC82F" size="158px" rotation="-18deg" opacity={0.3} /><FramOrigami className="top-7 right-[16%]" color="#3FC4A3" size="96px" rotation="41deg" opacity={0.25} /><FramOrigami className="top-[40%] left-3.5" color="#2E86C1" size="118px" rotation="-7deg" opacity={0.27} /><FramOrigami className="top-[54%] right-[30px]" color="#E85A5A" size="132px" rotation="33deg" opacity={0.26} /><FramOrigami className="bottom-14 left-[26%]" color="#FDC82F" size="88px" rotation="-24deg" opacity={0.24} /><FramOrigami className="right-[11%] bottom-7" color="#2E86C1" size="138px" rotation="13deg" opacity={0.28} />
      <div className="relative z-[1] mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4"><OmTeam lang={lang} /></div>
    </section>

    <section className="border-b border-[var(--line)] bg-[var(--bg-soft)] py-[110px]">
      <div className="mx-auto grid max-w-[1360px] grid-cols-[280px_1fr] items-start gap-[72px] px-12 max-[900px]:px-5 max-[760px]:grid-cols-1 max-[760px]:gap-10 max-[520px]:px-4">
        <aside className="sticky top-28 max-[760px]:static"><h2 className="mt-0 mb-5 text-[clamp(36px,3.4vw,56px)] leading-[1.02] font-extrabold tracking-[-.02em]">{t.historyHeading.pre}<span className="text-[var(--yellow)]">{t.historyHeading.hi}</span>{t.historyHeading.suf}</h2><p className="m-0 text-sm leading-[1.6] text-[var(--ink-soft)]">{t.historyLead}</p></aside>
        <div className="relative pl-9 before:absolute before:top-3 before:bottom-3 before:left-[11px] before:w-0.5 before:rounded-sm before:bg-[linear-gradient(180deg,var(--yellow),var(--blue),var(--red),var(--teal))] before:opacity-35">
          {t.events.map((event, index) => <article key={event.year} style={{ "--accent": event.accent } as React.CSSProperties} className={`relative ${index === t.events.length - 1 ? "pb-0" : "pb-[52px]"} before:absolute before:top-2 before:-left-[31px] before:h-3 before:w-3 before:rounded-full before:bg-[var(--accent)] before:shadow-[0_0_0_4px_var(--bg-soft)]`}><div className="mb-2 font-mono text-[11px] font-semibold tracking-[.1em] text-[var(--accent)] uppercase">{event.year}</div><h3 className="mt-0 mb-3 text-[26px] leading-[1.15] font-bold tracking-[-.01em]">{event.title}</h3>{event.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraph} className={`m-0 max-w-[660px] text-base leading-[1.7] text-[var(--ink-soft)] ${paragraphIndex ? "mt-3.5" : ""}`}>{paragraph}</p>)}</article>)}
        </div>
      </div>
    </section>

    <section className="border-b border-[var(--line)] bg-[var(--bg)] py-[110px]">
      <div className="mx-auto grid max-w-[1360px] grid-cols-[1.05fr_1fr] items-stretch gap-16 px-12 max-[900px]:px-5 max-[760px]:grid-cols-1 max-[760px]:gap-10 max-[520px]:px-4">
        <div className="relative overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--card)] px-11 pt-11 pb-10 before:absolute before:-top-10 before:-right-10 before:h-[180px] before:w-[180px] before:rounded-full before:bg-[color-mix(in_oklab,var(--red)_14%,transparent)] before:blur-[2px]"><h2 className="relative mt-0 mb-3.5 text-[clamp(30px,2.6vw,42px)] leading-[1.05] font-extrabold tracking-[-.02em]">{t.videoHeading.pre}<span className="text-[var(--red)]">{t.videoHeading.hi}</span>{t.videoHeading.suf}</h2><p className="relative mt-0 mb-[26px] max-w-[460px] text-[15px] leading-[1.6] text-[var(--ink-soft)]">{t.videoLead}</p><a href="https://www.youtube.com/@FramNTNU" target="_blank" rel="noopener" className="relative inline-flex items-center gap-2.5 rounded-full border border-transparent bg-[var(--red)] px-[22px] py-3.5 text-sm font-semibold text-white no-underline [transition:all_.2s] hover:[transform:translateY(-2px)] hover:shadow-[0_10px_24px_-10px_var(--red)]"><i className="ph ph-youtube-logo text-lg" /> {t.visitChannel}</a><div className="relative mt-3.5 font-mono text-xs text-[var(--muted)]">youtube.com/@FramNTNU</div></div>
        <div className="grid grid-cols-2 grid-rows-2 gap-3.5 max-[760px]:hidden">{t.videos.map((video) => <a key={video.id} href={`https://youtu.be/${video.id}`} target="_blank" rel="noopener" className="group relative flex h-full items-end overflow-hidden rounded-[14px] border border-[var(--line)] bg-[var(--bg-soft)] p-3.5 no-underline before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:bg-[linear-gradient(to_bottom,rgba(0,0,0,.05)_0%,rgba(0,0,0,.55)_100%)] after:pointer-events-none after:absolute after:top-1/2 after:left-1/2 after:z-[1] after:h-[52px] after:w-[52px] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-white/40 after:bg-white/22 after:shadow-[0_6px_20px_-6px_rgba(0,0,0,.4)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} alt={video.label} loading="lazy" className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover [transition:transform_.35s_ease] group-hover:[transform:scale(1.04)]" />
          <i className="ph-fill ph-play pointer-events-none absolute top-1/2 left-1/2 z-[2] text-xl text-white [transform:translate(calc(-50%-1px),-50%)]" /><span className="relative z-[1] font-mono text-[10px] tracking-[.08em] text-white uppercase [text-shadow:0_1px_3px_rgba(0,0,0,.6)]">{video.label}</span>
        </a>)}</div>
      </div>
    </section>
    <SiteFooter lang={lang} />
  </div>;
}
