import type { Metadata } from "next";
import Link from "next/link";
import { AddToCalendarButton, Confetti, DjVideo, LiveCompetitionBanner } from "@/components/innovasjonsdagene-interactions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StandMap } from "@/components/stand-map";

const description = "Innovasjonsdagene '26 — FRAM NTNUs festival for innovasjon, entreprenørskap og nyskaping ved NTNU.";

export const metadata: Metadata = {
  title: "Innovasjonsdagene '26 — FRAM NTNU",
  description,
  alternates: { canonical: "https://www.framntnu.no/innovasjonsdagene" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName: "FRAM NTNU", locale: "nb_NO", title: "Innovasjonsdagene '26 — FRAM NTNU", description, url: "https://www.framntnu.no/innovasjonsdagene", images: [{ url: "/assets/og-fram.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Innovasjonsdagene '26 — FRAM NTNU", description, images: ["/assets/og-fram.png"] },
};

const gallery = [
  { className: "col-span-7 row-span-3 max-[960px]:col-span-2 max-[960px]:row-span-1 max-[640px]:col-span-1", src: "/assets/innovasjonsdagene-hovedscenen.avif", alt: "Hovedscenen", width: 2200, height: 1467 },
  { className: "col-span-5 row-span-2 max-[960px]:col-span-2 max-[960px]:row-span-1 max-[640px]:col-span-1", src: "/assets/innovasjonsdagene-revolve.avif", alt: "Revolve NTNU", width: 2200, height: 1467 },
  { className: "col-span-5 row-span-1 max-[960px]:col-span-2 max-[640px]:col-span-1", src: "/assets/innovasjonsdagene-ida.webp", alt: "Ida Grønseth Øian på Innovasjonsdagene 2024", width: 2200, height: 910 },
  { className: "col-span-4 row-span-2 max-[960px]:col-span-2 max-[960px]:row-span-1 max-[640px]:col-span-1", src: "/assets/innovasjonsdagene-teamet.avif", alt: "Fram-teamet", width: 6000, height: 4000 },
  { className: "col-span-4 row-span-2 max-[960px]:col-span-2 max-[960px]:row-span-1 max-[640px]:col-span-1", src: "/assets/innovasjonsdagene-redbull.avif", alt: "Red Bull Olabil", width: 2200, height: 1467 },
  { className: "col-span-4 row-span-2 max-[960px]:col-span-2 max-[960px]:row-span-1 max-[640px]:col-span-1", src: "/assets/innovasjonsdagene-mat.avif", alt: "Stands i Gruva", width: 2200, height: 1467 },
] as const;

const perks = ["Gratis lunsj", "Møt 25+ organisasjoner", "Finn ditt nye verv", "Bli kjent med nye folk", "Opplev FRAM fra innsiden", "Konkurranser og premier"];
const logos = [
  ["ascend.webp", "Ascend NTNU", "", 469, 590], ["brain-ntnu.png", "BRAIN NTNU", "", 2500, 807], ["boosthenne.webp", "Boost Henne", "", 200, 87], ["cogito-white.webp", "Cogito", "", 1234, 1069], ["driv.webp", "DRIV NTNU", "", 1000, 528], ["designhjelpen.webp", "Designhjelpen", "lg", 147, 174], ["engage.webp", "Engage", "lg", 1454, 1454], ["entreprenorskolen.webp", "Entreprenørskolen", "", 622, 158], ["fuel-fighter.png", "Fuel Fighter", "", 421, 134], ["gridville-white2.webp", "Gridville", "lg", 1500, 545], ["grunderbrakka.webp", "Gründerbrakka", "", 500, 113], ["hackerspace.webp", "Hackerspace NTNU", "", 1971, 420], ["iug.webp", "Ingeniører uten grenser", "", 1920, 496], ["make.webp", "Make NTNU", "sm", 1920, 215], ["norstec.webp", "NORSTEC", "lg", 1920, 577], ["njord.png", "Njord", "lg", 369, 191], ["nordlys.webp", "Nordlys", "", 1920, 626], ["orbit.webp", "Orbit NTNU", "", 977, 458], ["propulse.webp", "Propulse NTNU", "", 1099, 640], ["relu.webp", "Relu", "", 1500, 445], ["revolve.webp", "Revolve NTNU", "lg", 383, 470], ["solan-new.webp", "Solan", "lg", 2000, 2000], ["spark-ntnu.png", "Spark* NTNU", "", 600, 250], ["start-ntnu.png", "Start NTNU", "", 240, 80], ["stottehjulet.webp", "Støttehjulet", "lg", 192, 192], ["vortex-ntnu.png", "Vortex NTNU", "", 528, 175], ["wic.webp", "WIC", "lg", 664, 288],
] as const;

const days = [
  { number: "01", date: "Onsdag · 19. august", title: "Dag 1", color: "var(--id-blue)", items: [["10:00–10:15 · Åpning", "Åpning av Innovasjonsdagene 2026 og gratis frokostpakke. Tale av Geir Øien, prorektor for utdanning ved NTNU."], ["10:15–14:30 · Åpen expo", "Stands og konkurranser — møt hele innovasjonsmiljøet på NTNU."], ["12:00 · Gratis lunsj", "Bread'n Spread."], ["14:15 · Avslutning", "Trekning av premier!"]] },
  { number: "02", date: "Torsdag · 20. august", title: "Dag 2", color: "var(--id-teal)", items: [["10:00–10:15 · Åpning", "Åpning av dag 2 og gratis frokostpakke. Tale av Torgeir Aadland, SFU Engage."], ["10:15–14:30 · Åpen expo", "Stands og konkurranser — møt hele innovasjonsmiljøet på NTNU."], ["12:00 · Gratis lunsj", "Bread'n Spread."], ["14:15 · Avslutning", "Trekning av premier!"]] },
] as const;

const breadcrumbData = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Hjem", item: "https://www.framntnu.no/" }, { "@type": "ListItem", position: 2, name: "Innovasjonsdagene '26", item: "https://www.framntnu.no/innovasjonsdagene" }] };
const festivalData = { "@context": "https://schema.org", "@type": "Festival", name: "Innovasjonsdagene 2026", description: "FRAM NTNUs årlige festival for innovasjon og entreprenørskap. Møt over 30 studentorganisasjoner i innovasjonsmiljøet ved NTNU, hør om prosjektene deres og finn ut hvordan du kan engasjere deg. Gratis inngang og drop-in, åpent for alle studenter.", startDate: "2026-08-19T10:00:00+02:00", endDate: "2026-08-20T15:00:00+02:00", eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", isAccessibleForFree: true, image: "https://www.framntnu.no/assets/og-fram.png", url: "https://www.framntnu.no/innovasjonsdagene", inLanguage: "nb", location: { "@type": "Place", name: "Gruva, FRAM NTNU", address: { "@type": "PostalAddress", streetAddress: "Sem Sælands vei 1", addressLocality: "Trondheim", postalCode: "7034", addressCountry: "NO" } }, offers: { "@type": "Offer", price: 0, priceCurrency: "NOK", availability: "https://schema.org/InStock", validFrom: "2026-01-01T00:00:00+01:00", url: "https://www.framntnu.no/innovasjonsdagene" }, organizer: { "@type": "Organization", name: "FRAM NTNU", url: "https://www.framntnu.no" } };

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <div className="mb-12 grid grid-cols-[1fr_auto] items-end gap-8"><h2 className="m-0 max-w-[16ch] text-[clamp(40px,4.6vw,64px)] leading-[1.02] font-extrabold tracking-[-.025em]">{children}</h2></div>;
}

export default function InnovasjonsdagenePage() {
  return <div className="min-h-screen bg-[var(--id-cream)] font-sans text-[var(--ink)] [scroll-behavior:smooth] [--bg-soft:#F2EDE3] [--bg:#FAF7F2] [--card:#fff] [--charcoal:#1E1E1E] [--id-blue:#4B9FD3] [--id-cream:#F5F9FC] [--id-peach:#FFB775] [--id-pink:#FF8FB8] [--id-teal:#3CBFAB] [--ink-soft:#555] [--ink:#1E1E1E] [--line:#E6E0D5] [--muted:#8A8A8A] [--nav-accent:#E85A5A] [--nav-bg:#F5F9FC] [--nav-border:rgba(30,30,30,.08)] [--red:#E85A5A] [--teal:#3CBFAB] [--yellow:#E85A5A]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(festivalData) }} />
    <Confetti />
    <LiveCompetitionBanner />
    <SiteHeader currentPath="/innovasjonsdagene" caretFontFamily={'Poppins, "Poppins Fallback", sans-serif'} />

    <header className="relative flex h-[calc(100vh-82px-var(--id-banner-h,0px))] flex-col overflow-hidden max-[640px]:h-[calc(100svh-var(--id-banner-h,0px))]">
      <div className="absolute inset-0 after:absolute after:inset-0 after:bg-[linear-gradient(to_bottom,rgba(15,30,50,.40)_0%,rgba(15,30,50,.12)_40%,rgba(10,40,60,.65)_80%,rgba(10,40,60,.82)_100%)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width="2200" height="1467" decoding="async" src="/assets/innovasjonsdagene-hovedscenen.avif" alt="Hovedscenen på Innovasjonsdagene 2025" className="block h-full w-full object-cover object-[center_30%]" />
      </div>
      <h1 className="absolute -m-px h-px w-px overflow-hidden p-0 whitespace-nowrap [clip:rect(0,0,0,0)]">Innovasjonsdagene &apos;26 — FRAM NTNU</h1>
      <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"><div className="w-[clamp(320px,42vw,620px)] max-[640px]:w-[clamp(240px,72vw,400px)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" src="/assets/innovasjonsdagene-logo-v2.svg" alt="Innovasjonsdagene" className="block h-auto w-full brightness-0 invert" />
      </div></div>
      <div className="absolute inset-x-0 bottom-0 z-[1] border-t border-white/12"><div className="mx-auto flex max-w-[1360px] items-end px-12 py-6 max-[900px]:px-5 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-4 max-[640px]:pt-4 max-[640px]:pb-[18px] max-[520px]:px-4">
        <div className="flex flex-1 max-[640px]:grid max-[640px]:w-full max-[640px]:grid-cols-[1.4fr_1fr]">
          <div className="mr-8 flex flex-col gap-[3px] border-r border-white/15 pr-8 max-[640px]:m-0 max-[640px]:border-r max-[640px]:border-white/20 max-[640px]:pr-5"><span className="font-mono text-[11px] tracking-[.14em] text-white/50 uppercase max-[640px]:text-[10px] max-[640px]:tracking-[.12em]">Når</span><span className="text-lg leading-[1.3] font-bold text-white max-[640px]:text-[15px] max-[640px]:font-semibold">19.–20. august <span className="text-[var(--yellow)]">2026</span></span></div>
          <div className="flex flex-col gap-[3px] max-[640px]:pl-5"><span className="font-mono text-[11px] tracking-[.14em] text-white/50 uppercase max-[640px]:text-[10px] max-[640px]:tracking-[.12em]">Hvor</span><span className="text-lg leading-[1.3] font-bold text-white max-[640px]:text-[15px] max-[640px]:font-semibold">Gruva <span className="font-medium opacity-55">· Drop-in</span></span></div>
        </div>
        <div className="flex items-center gap-3 max-[640px]:w-full max-[640px]:flex-col-reverse">
          <a href="#program" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-7 py-3.5 text-sm font-bold text-white no-underline [transition:border-color_.2s,background_.2s] hover:border-white/70 hover:bg-white/10 max-[640px]:w-full max-[640px]:px-5">Se program →</a>
          <AddToCalendarButton />
        </div>
      </div></div>
    </header>

    <section id="om" className="relative py-28 max-[640px]:py-12"><div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
      <div className="grid grid-cols-[1.15fr_.85fr] items-start gap-[72px] max-[960px]:grid-cols-1 max-[640px]:gap-6">
        <div><h2 className="mt-0 mb-7 max-w-[15ch] text-[clamp(34px,3.6vw,50px)] leading-[1.06] font-extrabold tracking-[-.025em]">Hele innovasjons&shy;miljøet samlet på ett sted.</h2><p className="mt-0 mb-5 max-w-[54ch] text-lg leading-[1.65] text-[var(--ink-soft)] max-[640px]:text-[15px]">Ny student i Trondheim? Innovasjonsdagene er en enkel måte å bli kjent med noen av NTNUs mest aktive studentmiljøer på.</p><p className="mt-0 mb-5 max-w-[54ch] text-lg leading-[1.65] text-[var(--ink-soft)] max-[640px]:text-[15px]">Over to dager kan du møte organisasjonene i FRAM, høre om prosjektene deres og finne ut hvordan du kan engasjere deg. Gratis inngang og åpent for alle.</p><p className="mt-0 mb-5 max-w-[54ch] text-lg leading-[1.65] text-[var(--ink-soft)] max-[640px]:text-[15px]">Stikk innom, slå av en prat og finn et miljø eller et verv som passer deg. Gratis inngang, drop-in hele dagen — og helt lov å bare være nysgjerrig.</p></div>
        <aside className="aspect-square w-full overflow-hidden rounded-3xl bg-black shadow-[0_20px_60px_rgba(0,0,0,.18)] max-[640px]:hidden"><DjVideo /></aside>
      </div>
    </div></section>

    <section id="galleri" className="relative border-t border-[var(--line)] bg-[var(--bg-soft)] py-28 max-[640px]:py-12"><div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
      <SectionHeading>Høydepunkter.</SectionHeading>
      <div className="grid auto-rows-[160px] grid-cols-12 gap-3 max-[960px]:auto-rows-[140px] max-[960px]:grid-cols-2 max-[640px]:auto-rows-[180px] max-[640px]:gap-2">{gallery.map((image) => <div key={image.src} className={`relative overflow-hidden rounded-[18px] bg-[var(--bg-soft)] [transition:transform_.25s_ease] hover:[transform:scale(1.015)] ${image.className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width={image.width} height={image.height} loading={image.src.includes("hovedscenen") ? undefined : "lazy"} decoding="async" src={image.src} alt={image.alt} className="h-full w-full object-cover" />
      </div>)}</div>
      <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5 border-t border-[var(--line)] pt-7">{perks.map((perk) => <span key={perk} className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--ink-soft)] before:font-bold before:text-[var(--red)] before:content-['✓']">{perk}</span>)}</div>
    </div></section>

    <section id="video" className="relative bg-[linear-gradient(135deg,var(--id-blue)_0%,var(--id-teal)_100%)] py-28 text-[var(--bg)] max-[640px]:py-12"><div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
      <SectionHeading>Aftermovie &apos;25.</SectionHeading>
      <div className="relative aspect-video overflow-hidden rounded-[28px] bg-black shadow-[0_24px_48px_rgba(0,0,0,.4)]"><iframe className="absolute inset-0 h-full w-full border-0" src="https://www.youtube-nocookie.com/embed/C31svE3VMlI?rel=0&modestbranding=1&playsinline=1" title="Innovasjonsdagene 2025 — Aftermovie" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
    </div></section>

    <section id="program" className="relative scroll-mt-[82px] py-28 max-[640px]:py-12"><div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
      <SectionHeading>Program.</SectionHeading>
      <div className="grid grid-cols-2 gap-5 max-[960px]:grid-cols-1">{days.map((day) => <article key={day.number} className="flex flex-col overflow-hidden rounded-[28px] border border-black/8 bg-[var(--card)] max-[640px]:rounded-2xl">
        <div style={{ background: day.color }} className="px-7 pt-7 pb-6 text-white"><div className="text-[80px] leading-[.9] font-extrabold tracking-[-.04em]">{day.number}</div><div className="mt-2.5 font-mono text-xs tracking-[.14em] uppercase opacity-75">{day.date}</div></div>
        <div className="flex flex-1 flex-col gap-[18px] p-7"><h3 className="m-0 text-[22px] font-bold tracking-[-.01em]">{day.title}</h3><ul className="m-0 flex list-none flex-col gap-3 p-0">{day.items.map(([title, text]) => <li key={title} className="relative pl-5 text-sm leading-[1.5] text-[var(--ink-soft)] before:absolute before:top-0 before:left-0 before:font-bold before:text-[var(--charcoal)] before:content-['›']"><strong className="block font-semibold text-[var(--ink)]">{title}</strong>{text}</li>)}</ul></div>
      </article>)}</div>
    </div></section>

    <section id="miljoer" className="relative bg-[var(--charcoal)] pt-16 pb-px text-white max-[520px]:pb-0.5"><div className="mx-auto max-w-[1200px] px-12 max-[900px]:px-5 max-[520px]:px-4">
      <div className="mb-8 grid grid-cols-[1fr_auto] items-end gap-6 max-[640px]:grid-cols-1 max-[640px]:gap-2">
        <h2 className="m-0 text-[clamp(28px,3.5vw,48px)] leading-[1.05] font-extrabold tracking-[-.025em] text-white max-[640px]:text-[clamp(26px,7vw,40px)]">Finn frem i <em className="text-[var(--yellow)]">Gruva.</em></h2>
        <p className="m-0 max-w-[34ch] text-[15px] leading-[1.5] text-white/55 max-[640px]:text-[14px]">Her står de 26 organisasjonene under Innovasjonsdagene. Stikk innom den du er nysgjerrig på.</p>
      </div>
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 max-[520px]:p-3">
        <StandMap />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[13px] font-medium text-white/55">
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[var(--id-teal)]" />Organisasjon</span>
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[var(--id-peach)]" />Samarbeidspartner</span>
        <span className="ml-auto hidden font-mono text-[12px] tracking-[.08em] text-white/35 uppercase max-[900px]:inline">Sveip for hele kartet →</span>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-3 pb-16"><Link href="/miljoer" className="inline-flex items-center gap-2.5 rounded-full bg-[var(--yellow)] px-7 py-3.5 text-sm font-semibold text-white no-underline [transition:transform_.2s,box-shadow_.2s] hover:[transform:translateY(-2px)] hover:shadow-[0_10px_24px_rgba(232,90,90,.4)]">Se alle organisasjonene →</Link><a href="https://www.instagram.com/framntnu/" target="_blank" rel="noopener" className="inline-flex items-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white/75 no-underline [transition:border-color_.2s,color_.2s] hover:border-white/60 hover:text-white">Følg @framntnu →</a></div>
    </div>
      <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 overflow-hidden border-t border-white/8 py-6 [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]"><div className="flex w-max items-center gap-12 [animation:innovasjon-ticker-scroll_40s_linear_infinite] hover:[animation-play-state:paused]">{[...logos, ...logos].map(([file, alt, size, width, height], index) => <div key={`${file}-${index}`} className="flex h-[58px] shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img width={width} height={height} loading="lazy" src={`/assets/logos/${file}`} alt={index >= logos.length ? "" : alt} aria-hidden={index >= logos.length || undefined} className={`w-auto shrink-0 brightness-0 invert [transition:opacity_.2s] hover:opacity-100 ${size === "lg" ? "h-[58px]" : size === "sm" ? "h-8" : "h-11"} opacity-55`} />
        </div>)}</div></div>
    </section>
    <SiteFooter />
  </div>;
}
