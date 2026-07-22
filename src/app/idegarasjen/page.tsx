import type { Metadata } from "next";
import { IdegarasjenHero } from "@/components/idegarasjen-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Idégarasjen — FRAM NTNU",
  description: "Idégarasjen — studentenes åpne innovasjonsverksted på FRAM NTNU med 3D-printere, laserkutter og prototypingsutstyr.",
  alternates: { canonical: "https://www.framntnu.no/idegarasjen" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName: "FRAM NTNU", locale: "nb_NO", title: "Idégarasjen — FRAM NTNU", description: "Idégarasjen — studentenes åpne innovasjonsverksted på FRAM NTNU med 3D-printere, laserkutter og prototypingsutstyr.", url: "https://www.framntnu.no/idegarasjen", images: [{ url: "/assets/og-fram.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Idégarasjen — FRAM NTNU", description: "Idégarasjen — studentenes åpne innovasjonsverksted på FRAM NTNU med 3D-printere, laserkutter og prototypingsutstyr.", images: ["/assets/og-fram.png"] },
};

const equipment = [
  { number: "01", title: "3D-printere", image: "/assets/prusa3d.webp", alt: "3D-printere i Idégarasjen", width: 1560, height: 1170, description: "Prusa 3D-printere for prototyper, deler og modeller. Flere og mer avanserte printere kommer i den nye Idégarasjen på Hesthagen." },
  { number: "02", title: "Loddestasjoner", image: "/assets/loddeplass.avif", alt: "Loddestasjoner i Idégarasjen", width: 547, height: 599, description: "Utstyr for elektronikkprosjekter, prototyping og reparasjoner. Her kan du lodde komponenter, bygge kretser og feilsøke elektronikk." },
  { number: "03", title: "Arbeidsplass", image: "/assets/Idegarasjen1.webp", alt: "Arbeidsplass i Idégarasjen", width: 1560, height: 1170, description: "Store arbeidsbenker med god plass, strøm og belysning. Et sted for bygging, montering og utvikling av prosjekter." },
  { number: "04", title: "Storformatprinter", image: "/assets/breformatplotter.webp", alt: "Storformatprinter i Idégarasjen", width: 1146, height: 1462, description: "Skriv ut plakater, presentasjoner, tekniske tegninger og annet materiell i opptil A0-format.", members: true },
  { number: "05", title: "Håndverktøy", image: "/assets/h%C3%A5ndverkt%C3%B8y.avif", alt: "Håndverktøy i Idégarasjen", width: 590, height: 646, description: "Skrutrekkere, tenger, filer, måleverktøy og annet grunnleggende verkstedutstyr som dekker de fleste behov." },
  { number: "06", title: "Elverktøy", image: "/assets/Elverktøy.webp", alt: "Elverktøy i Idégarasjen", width: 1560, height: 1170, description: "Drill, stikksag, slipemaskin og annet elverktøy for bearbeiding av materialer og bygging av større prototyper." },
];

const breadcrumbData = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Hjem", item: "https://www.framntnu.no/" }, { "@type": "ListItem", position: 2, name: "Idégarasjen", item: "https://www.framntnu.no/idegarasjen" }] };
const organizationData = { "@context": "https://schema.org", "@type": "Organization", name: "FRAM NTNU", url: "https://www.framntnu.no", logo: "https://www.framntnu.no/assets/og-fram.png", description: "FRAM NTNU er NTNUs senter for studentinnovasjon — et fellesskap for studenter som vil skape noe.", sameAs: ["https://www.instagram.com/framntnu/", "https://www.facebook.com/framntnu", "https://www.linkedin.com/company/framntnu/"] };

function EquipmentCard({ item }: { item: (typeof equipment)[number] }) {
  return <article className="flex flex-col overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--card)] [transition:border-color_.2s,box-shadow_.25s,transform_.25s] hover:border-[var(--ink)] hover:[transform:translateY(-3px)] hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,.32)]">
    <div className="relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="block aspect-[16/10] h-auto w-full object-cover" width={item.width} height={item.height} loading="lazy" decoding="async" src={item.image} alt={item.alt} />
      {item.members && <span className="pointer-events-none absolute top-2.5 left-2.5 rounded-[10px] bg-black/62 px-[9px] py-1 text-[11px] font-semibold tracking-[.07em] text-white uppercase backdrop-blur-md">Kun for Fram-medlemmer</span>}
    </div>
    <div className="flex flex-col gap-3 px-[30px] pt-7 pb-[30px]">
      <div className="flex items-center gap-3.5"><span className="rounded-full bg-[color-mix(in_oklab,var(--yellow)_26%,var(--bg-soft))] px-2.5 py-1 font-mono text-xs font-semibold text-[#7a5c00]">{item.number}</span><h3 className="m-0 text-[23px] font-bold tracking-[-.015em]">{item.title}</h3></div>
      <p className="m-0 text-[14.5px] leading-[1.6] text-[var(--ink-soft)]">{item.description}</p>
    </div>
  </article>;
}

export default function IdegarasjenPage() {
  return <div className="min-h-screen bg-[#FBF7F0] font-sans text-[#1A1A1A] [scroll-behavior:smooth] [--bg-soft:#F4EFE5] [--bg:#FBF7F0] [--card:#fff] [--ink-soft:#555] [--ink:#1A1A1A] [--line:#E9E2D3] [--muted:#8a8a8a] [--nav-accent:#E85A5A] [--yellow:#FDC82F]">
    <link rel="preload" as="image" href="/assets/Idegarasjen1.webp" fetchPriority="high" />
    <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />
    <SiteHeader currentPath="/idegarasjen" caretFontFamily={'Poppins, "Poppins Fallback", sans-serif'} />
    <IdegarasjenHero />

    <section id="utstyr" className="pt-[88px] pb-24">
      <div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
        <div className="mb-11 max-w-[680px]"><h2 className="mt-0 mb-4 text-[clamp(34px,3.6vw,56px)] leading-[1.03] font-extrabold tracking-[-.025em]">Verktøy &amp; <span className="text-[var(--yellow)]">maskiner.</span></h2><p className="m-0 text-[17px] leading-[1.6] text-[var(--ink-soft)]">Et utvalg av det du finner i Idégarasjen. Trenger du noe spesielt, eller opplæring på en maskin, spør verkstedansvarlig.</p></div>
        <div className="grid grid-cols-2 gap-6 max-[760px]:grid-cols-1">
          {equipment.map((item) => <EquipmentCard key={item.number} item={item} />)}
          <div className="col-span-full mt-1 flex flex-wrap items-center justify-between gap-8 rounded-[22px] border border-[color-mix(in_oklab,var(--yellow)_40%,var(--line))] bg-[color-mix(in_oklab,var(--yellow)_14%,var(--bg-soft))] px-9 py-8 max-[640px]:px-6 max-[640px]:py-[26px]">
            <div className="flex flex-[1_1_420px] items-start gap-[18px]"><div className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-xl bg-[var(--yellow)] text-[#111]"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg></div><div><p className="mt-0 mb-1.5 font-mono text-[11px] leading-[1.6] tracking-[.1em] text-[#7a5c00] uppercase">Mangler det noe?</p><h3 className="mt-0 mb-2 text-[21px] font-bold tracking-[-.015em]">Finner du ikke det du trenger i Idégarasjen?</h3><p className="m-0 max-w-[480px] text-[14.5px] leading-[1.6] text-[var(--ink-soft)]">Fyll ut skjemaet, så ser vi om vi kan kjøpe det inn til Idégarasjen. Tips oss gjerne om verktøy, materialer eller utstyr du savner.</p></div></div>
            <div className="flex flex-none flex-col gap-2.5 max-[640px]:w-full"><a href="https://forms.gle/72RTPm6Mr6uFwd3V6" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-full bg-[#111] px-6 py-3.5 text-[15px] font-bold text-white no-underline [transition:transform_.2s,box-shadow_.2s,border-color_.2s] hover:[transform:translateY(-2px)] hover:shadow-[0_10px_24px_-8px_rgba(0,0,0,.4)]">Fyll ut skjema ↗</a><a href="mailto:framntnu@gmail.com?subject=Feil%20p%C3%A5%20utstyr%20i%20Id%C3%A9garasjen" className="inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-full border-[1.5px] border-[color-mix(in_oklab,var(--ink)_28%,transparent)] bg-transparent px-6 py-3.5 text-[15px] font-bold text-[#111] no-underline [transition:transform_.2s,box-shadow_.2s,border-color_.2s] hover:border-[var(--ink)] hover:[transform:translateY(-2px)]">Ta kontakt ↗</a></div>
          </div>
        </div>
      </div>
    </section>

    <section id="kart" className="py-24 max-[640px]:py-10">
      <div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
        <div className="mb-11 max-w-[680px]"><h2 className="mt-0 mb-4 text-[clamp(34px,3.6vw,56px)] leading-[1.03] font-extrabold tracking-[-.025em]">Finn fram til <span className="text-[var(--yellow)]">Idégarasjen.</span></h2><p className="m-0 text-[17px] leading-[1.6] text-[var(--ink-soft)]">Idégarasjen ligger på FRAM, Sem Sælands vei 1. Bruk kartet for å finne veien.</p></div>
        <div className="aspect-video w-full overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--bg-soft)] max-[640px]:hidden"><iframe className="block h-full w-full border-0" src="https://use.mazemap.com/embed.html#v=1&campusid=1&zlevel=1&center=10.406504,63.417116&zoom=19.4&sharepoitype=identifier&sharepoi=305-114&utm_medium=iframe" loading="lazy" allowFullScreen allow="geolocation" title="Map by MazeMap" /></div>
        <div className="mt-[22px] flex flex-wrap gap-3"><a href="https://use.mazemap.com/#v=1&campusid=1&sharepoitype=identifier&sharepoi=FRAM" target="_blank" rel="noopener" className="inline-flex items-center gap-[9px] rounded-full border border-[var(--ink)] px-[22px] py-[13px] text-[14px] leading-[normal] font-semibold text-[var(--ink)] no-underline [transition:background_.2s,color_.2s] hover:bg-[var(--ink)] hover:text-white max-[640px]:w-full max-[640px]:justify-center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>Åpne i MazeMap ↗</a></div>
      </div>
    </section>

    <section id="kontakt" className="pt-6 pb-24">
      <div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4"><div className="relative grid grid-cols-[1.3fr_1fr] items-center gap-12 overflow-hidden rounded-[28px] bg-[var(--ink)] p-14 text-white before:pointer-events-none before:absolute before:-top-[90px] before:-right-[90px] before:h-[380px] before:w-[380px] before:rounded-full before:bg-[radial-gradient(circle,rgba(253,200,47,.16),transparent_70%)] max-[640px]:[grid-template-columns:1fr] max-[640px]:gap-7 max-[640px]:px-6 max-[640px]:py-8">
        <div className="relative z-[1]"><h3 className="mt-0 mb-4 text-[clamp(28px,2.8vw,44px)] leading-[1.05] font-extrabold tracking-[-.02em]">Er det noe du <span className="text-[var(--yellow)]">lurer på?</span></h3><p className="mt-0 mb-[26px] max-w-[440px] text-base leading-[1.6] text-white/74">Ta kontakt med oss, så hjelper vi deg i gang i Idégarasjen — enten du har et konkret prosjekt eller bare vil teste en idé.</p><a href="mailto:framntnu@gmail.com" className="inline-flex items-center gap-2.5 rounded-full bg-[var(--yellow)] px-6 py-3.5 text-[15px] font-bold text-[#111] no-underline shadow-[0_6px_18px_rgba(0,0,0,.3)] [transition:transform_.2s,box-shadow_.2s] hover:[transform:translateY(-2px)] hover:shadow-[0_10px_24px_rgba(0,0,0,.4)]">framntnu@gmail.com</a></div>
        <div className="relative z-[1] flex items-center gap-[18px] rounded-[22px] border border-white/12 bg-white/6 p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img width="236" height="232" loading="lazy" decoding="async" src="/assets/team/henrik.avif" alt="Henrik — verkstedansvarlig" className="h-[72px] w-[72px] flex-none rounded-full border-2 border-[rgba(253,200,47,.65)] object-cover" />
          <div><div className="mb-[5px] font-mono text-[10px] tracking-[.1em] text-white/50 uppercase">Verkstedansvarlig</div><div className="mb-1.5 text-[19px] font-bold tracking-[-.01em]">Henrik</div><a href="mailto:framntnu@gmail.com" className="text-sm font-semibold text-[var(--yellow)] no-underline">framntnu@gmail.com</a></div>
        </div>
      </div></div>
    </section>
    <SiteFooter mobileExtraBottomPadding />
  </div>;
}
