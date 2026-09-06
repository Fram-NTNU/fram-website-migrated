import type { Metadata } from "next";
import Link from "next/link";
import { FramEvents } from "@/components/fram-events";
import { KobleCarousel } from "@/components/koble-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const description = "Arrangementer på FRAM NTNU — workshops, foredrag, pitch-kvelder, hackathon og sosiale kvelder. Åpent for alle studenter.";

export const metadata: Metadata = {
  title: "Arrangementer — FRAM NTNU",
  description,
  alternates: { canonical: "https://www.framntnu.no/arrangementer" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName: "FRAM NTNU", locale: "nb_NO", title: "Arrangementer — FRAM NTNU", description, url: "https://www.framntnu.no/arrangementer", images: [{ url: "/assets/og-fram.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Arrangementer — FRAM NTNU", description, images: ["/assets/og-fram.png"] },
};

const breadcrumbData = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Hjem", item: "https://www.framntnu.no/" }, { "@type": "ListItem", position: 2, name: "Arrangementer", item: "https://www.framntnu.no/arrangementer" }] };
const organizationAndEventData = [{ "@context": "https://schema.org", "@type": "Organization", name: "FRAM NTNU", url: "https://www.framntnu.no", logo: "https://www.framntnu.no/assets/og-fram.png", description: "FRAM NTNU er NTNUs senter for studentinnovasjon — et fellesskap for studenter som vil skape noe.", sameAs: ["https://www.instagram.com/framntnu/", "https://www.facebook.com/framntnu", "https://www.linkedin.com/company/framntnu/"] }, { "@context": "https://schema.org", "@type": "Event", name: "Innovasjonsdagene '26", startDate: "2026-08-19", endDate: "2026-08-20", eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", location: { "@type": "Place", name: "Gruva — FRAM NTNU", address: { "@type": "PostalAddress", addressLocality: "Trondheim", addressCountry: "NO" } }, organizer: { "@type": "Organization", name: "FRAM NTNU", url: "https://www.framntnu.no" }, description: "Innovasjonsdagene er en møteplass for å bli kjent med FRAMs medlemsorganisasjoner. Over to dager kan du utforske hva som faktisk bygges av studenter på NTNU.", isAccessibleForFree: true, url: "https://www.framntnu.no/innovasjonsdagene" }];

export default function ArrangementerPage() {
  return <div className="min-h-screen bg-[var(--bg)] font-sans text-[var(--ink)] [--bg-soft:#F2EDE3] [--bg:#FAF7F2] [--blue:#2E86C1] [--card:#fff] [--charcoal:#1E1E1E] [--ink-soft:#555] [--ink:#1E1E1E] [--line:#E6E0D5] [--muted:#8A8A8A] [--nav-accent:#E85A5A] [--red:#E85A5A] [--teal:#3FC4A3] [--yellow:#FDC82F]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationAndEventData) }} />
    <SiteHeader currentPath="/arrangementer" caretFontFamily={'Poppins, "Poppins Fallback", sans-serif'} />

    <section id="kommende" className="border-b border-[var(--line)] py-24"><div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
      <div className="mb-12 grid grid-cols-[1fr_auto] items-end gap-8"><h1 className="m-0 max-w-[16ch] text-[clamp(36px,4vw,56px)] leading-[1.03] font-extrabold tracking-[-.025em]">Arrangementer.</h1></div>
      <FramEvents />
    </div></section>

    <section id="flaggskip" className="border-0 bg-[var(--charcoal)] py-24 text-[var(--bg)]"><div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
      <div className="grid grid-cols-[1.1fr_1fr] overflow-hidden rounded-[28px] border border-white/12 max-[760px]:grid-cols-1">
        <div className="relative flex min-h-[440px] flex-col justify-between overflow-hidden bg-[#2B7FD4] bg-[url('/assets/innovasjonsdagene-hovedscenen.avif')] bg-cover bg-center px-10 py-9 text-white [transition:box-shadow_.4s_ease,transform_.35s_cubic-bezier(.22,1,.36,1)] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(20,20,24,.55)_0%,rgba(20,20,24,.15)_38%,rgba(20,20,24,.65)_100%)] hover:[transform:scale(1.012)] hover:shadow-[0_24px_60px_rgba(43,127,212,.35)] max-[760px]:min-h-[280px] max-[760px]:px-6 max-[760px]:py-7"><div className="relative z-[1]" /><div className="relative z-[1] text-[clamp(72px,8vw,112px)] leading-[.9] font-extrabold tracking-[-.04em] [transition:transform_.4s_cubic-bezier(.22,1,.36,1)] hover:[transform:translateY(-6px)]">19–20<small className="mt-3.5 block text-[13px] font-semibold tracking-[.18em] uppercase opacity-85">August · 2026</small></div></div>
        <div className="flex flex-col gap-5 bg-[#0F0F0F] px-14 py-12 text-[var(--bg)] max-[760px]:min-w-0 max-[760px]:px-6 max-[760px]:py-8"><h3 className="m-0 text-5xl leading-[1.05] font-extrabold tracking-[-.025em] max-[760px]:text-[28px]">Innovasjons&shy;dagene <span className="text-[var(--yellow)]">&apos;26</span></h3><p className="m-0 text-[15px] leading-[1.6] text-[#ccc]">Innovasjonsdagene er den viktigste møteplassen for nye og gamle studenter som ønsker å bli kjent med innovasjonsmiljøene ved NTNU. Over to dager viser organisasjonene i FRAM frem prosjektene sine, forteller om hva de jobber med og svarer på spørsmål om alt fra studentlivet til hvordan du selv kan engasjere deg.</p><dl className="my-2 grid grid-cols-3 gap-5 max-[760px]:gap-3"><div className="border-t border-white/15 pt-3.5"><dt className="mb-1.5 font-mono text-[11px] tracking-[.12em] text-[#888] uppercase">Når</dt><dd className="m-0 text-[14px] leading-[normal] font-medium">19.–20. august</dd></div><div className="border-t border-white/15 pt-3.5"><dt className="mb-1.5 font-mono text-[11px] tracking-[.12em] text-[#888] uppercase">Hvor</dt><dd className="m-0 text-[14px] leading-[normal] font-medium">Gruva</dd></div><div className="border-t border-white/15 pt-3.5"><dt className="mb-1.5 font-mono text-[11px] tracking-[.12em] text-[#888] uppercase">Billett</dt><dd className="m-0 text-[14px] leading-[normal] font-medium">Drop in – gratis</dd></div></dl><div className="mt-1 flex flex-wrap gap-2.5"><Link href="/innovasjonsdagene" className="inline-flex items-center gap-2 rounded-full bg-[var(--yellow)] px-[22px] py-3 text-[13px] font-semibold text-[var(--charcoal)] no-underline [transition:transform_.2s,box-shadow_.2s] hover:[transform:translateY(-1px)] hover:shadow-[0_8px_24px_rgba(253,200,47,.35)]">Les mer →</Link></div></div>
      </div>
    </div></section>

    <section id="koble" className="scroll-mt-[164px] border-0 bg-[linear-gradient(135deg,#1A0B26_0%,#3A0F5E_55%,#6B1A8A_100%)] py-24 text-[#F7EEFF]"><div className="mx-auto grid max-w-[1360px] grid-cols-[1.2fr_1fr] items-center gap-14 px-12 max-[900px]:px-5 max-[760px]:grid-cols-1 max-[760px]:gap-8 max-[520px]:px-4">
      <div className="min-w-0"><h2 className="mt-0 mb-6 text-[clamp(48px,6vw,88px)] leading-[.95] font-extrabold tracking-[-.035em] text-white max-[760px]:mb-4 max-[760px]:text-5xl"><span className="text-[#FFD1F7]">Koble.</span></h2><p className="mt-[-8px] mb-5 text-[clamp(20px,1.8vw,26px)] leading-[1.3] font-medium tracking-[-.01em] text-[#E8B0F5] italic">Innovasjonskollektivets årlige galla.</p><p className="mt-0 mb-8 max-w-[520px] text-[17px] leading-[1.6] text-[#E5C8F0] max-[760px]:mb-6 max-[760px]:text-[15px]">En kveld i året kler medlemmene av Fram seg opp, samles på Frimurerlogen, og feirer året som har gått. Show, middag, taler og dans. Kun for medlemsorganisasjoner — påmelding publiseres i slack i månedene før arrangementet.</p><dl className="mb-8 grid max-w-[520px] grid-cols-[repeat(3,1fr)] gap-6 border-t border-white/18 pt-6 max-[760px]:max-w-none max-[760px]:gap-3"><div><dt className="mb-2 font-mono text-[10px] tracking-[.14em] text-[#B68BCC] uppercase">Når</dt><dd className="m-0 text-[16px] leading-[normal] font-semibold text-white max-[760px]:text-[13px] max-[760px]:whitespace-nowrap">Våren</dd></div><div><dt className="mb-2 font-mono text-[10px] tracking-[.14em] text-[#B68BCC] uppercase">Hvor</dt><dd className="m-0 text-[16px] leading-[normal] font-semibold text-white max-[760px]:text-[13px] max-[760px]:whitespace-nowrap">Frimurerlogen</dd></div><div><dt className="mb-2 font-mono text-[10px] tracking-[.14em] text-[#B68BCC] uppercase">Hvem</dt><dd className="m-0 text-[16px] leading-[normal] font-semibold text-white max-[760px]:text-[13px] max-[760px]:whitespace-nowrap">Fram-medlemmer</dd></div></dl></div>
      <KobleCarousel />
    </div></section>
    <SiteFooter />
  </div>;
}
