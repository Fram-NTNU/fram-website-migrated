import type { CSSProperties } from "react";
import Link from "next/link";
import { KobleCarousel } from "@/components/koble-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Lang } from "@/i18n/config";
import { SITE_URL, localizeHref, path } from "@/i18n/config";

type EventItem = {
  day: string; month: string; time: string; type: string; title: string; description: string;
  location: string; host: string; pill: string; pillClass: string; image: string;
  hostFram?: boolean; partner?: { src: string; alt: string };
};

const copy = {
  nb: {
    organizerLabel: "Arrangør",
    events: [
      { day: "22", month: "APR", time: "17:00 · 3t", type: "Sosialt", title: "Bread n' Spread", description: "Ukentlig sosial kveldsmat. Brødskiver, pålegg, prat og nye folk. Drop-in — ingen påmelding.", location: "Fram Lounge", host: "Fram", pill: "Drop-in", pillClass: "bg-[#FFF4D6] text-[#8A6A00]", image: "/assets/bns-nov6.webp", hostFram: true },
      { day: "30", month: "APR", time: "16:00 · 2t", type: "Workshop", title: "Hundekos + vafler", description: "Pause fra skjermen og deadlines. Vi inviterer inn et par firbeinte gjester for klapping, kos og varme poter i fanget. Møt opp når du trenger det mest.", location: "Scenerommet", host: "Fram", pill: "12 plasser igjen", pillClass: "bg-[#E6F7F1] text-[#1F7F66]", image: "/assets/hundekos.webp", hostFram: true },
      { day: "5–6", month: "MAR", time: "All day", type: "Pitch", title: "StartIT 2026", description: "15 studenter. 3 minutter hver. En jury, en vinner, gratis pizza til alle. Ta med lagget ditt og se hva andre bygger.", location: "Gruva", host: "Fram + Spark*", pill: "Åpen påmelding", pillClass: "bg-[#E6F7F1] text-[#1F7F66]", image: "/assets/heroes/start.webp", partner: { src: "/assets/partners/start-ntnu.webp", alt: "Start NTNU" } },
      { day: "05", month: "MAI", time: "16:30 · 2t", type: "Workshop", title: "3D-print for nybegynnere", description: "Lær å bruke 3D-printerne i Idegarasjen. Fra CAD til ferdig print på to timer — ingen forkunnskap nødvendig.", location: "Idegarasjen", host: "Fram", pill: "5 plasser igjen", pillClass: "bg-[#E6F7F1] text-[#1F7F66]", image: "/assets/gruva-event.webp" },
      { day: "12", month: "MAI", time: "19:00 · 90min", type: "Sosialt", title: "Bread n' Spread", description: "Ukentlig sosial kveldsmat. Brødskiver, pålegg, prat og nye folk. Drop-in — ingen påmelding.", location: "Fram Lounge", host: "Fram", pill: "Drop-in", pillClass: "bg-[#FFF4D6] text-[#8A6A00]", image: "/assets/bns-nov6.webp" },
      { day: "19", month: "MAI", time: "17:00 · 60min", type: "Foredrag", title: "Fra startup til exit — samtale med Cognite", description: "Grunnleggeren snakker om veien fra første kodelinje til notering. Q&A etter foredraget.", location: "Scenerommet", host: "Fram", pill: "Åpen påmelding", pillClass: "bg-[#E6F7F1] text-[#1F7F66]", image: "/assets/scenerommet.avif" },
    ] as EventItem[],
    upcomingHeading: "Kommende arrangementer.",
    comingSoonBadge: "Kommer snart",
    comingSoonText: "Ny funksjon under utvikling. Her vil du kunne se hva som rører seg i innovasjonsmiljøet på NTNU.",
    innoTitlePre: "Innovasjons­dagene ",
    innoTitleYear: "'26",
    innoLead: "Innovasjonsdagene er den viktigste møteplassen for nye og gamle studenter som ønsker å bli kjent med innovasjonsmiljøene ved NTNU. Over to dager viser organisasjonene i FRAM frem prosjektene sine, forteller om hva de jobber med og svarer på spørsmål om alt fra studentlivet til hvordan du selv kan engasjere deg.",
    innoWhen: { label: "Når", value: "19.–20. august" },
    innoWhere: { label: "Hvor", value: "Gruva" },
    innoTicket: { label: "Billett", value: "Drop in – gratis" },
    innoMonth: "August · 2026",
    innoCta: "Les mer →",
    kobleTitle: "Koble.",
    kobleTagline: "Innovasjonskollektivets årlige galla.",
    kobleLead: "En kveld i året kler medlemmene av Fram seg opp, samles på Frimurerlogen, og feirer året som har gått. Show, middag, taler og dans. Kun for medlemsorganisasjoner — påmelding publiseres i slack i månedene før arrangementet.",
    kobleWhen: { label: "Når", value: "Våren" },
    kobleWhere: { label: "Hvor", value: "Frimurerlogen" },
    kobleWho: { label: "Hvem", value: "Fram-medlemmer" },
    breadcrumbHome: "Hjem",
    breadcrumbEvents: "Arrangementer",
    orgDescription: "FRAM NTNU er NTNUs senter for studentinnovasjon — et fellesskap for studenter som vil skape noe.",
    innoEventName: "Innovasjonsdagene '26",
    innoEventDescription: "Innovasjonsdagene er en møteplass for å bli kjent med FRAMs medlemsorganisasjoner. Over to dager kan du utforske hva som faktisk bygges av studenter på NTNU.",
    innoPlaceName: "Gruva — FRAM NTNU",
  },
  en: {
    organizerLabel: "Organiser",
    events: [
      { day: "22", month: "APR", time: "17:00 · 3h", type: "Social", title: "Bread n' Spread", description: "Weekly social supper. Open sandwiches, toppings, chats and new faces. Drop-in — no sign-up needed.", location: "Fram Lounge", host: "Fram", pill: "Drop-in", pillClass: "bg-[#FFF4D6] text-[#8A6A00]", image: "/assets/bns-nov6.webp", hostFram: true },
      { day: "30", month: "APR", time: "16:00 · 2h", type: "Workshop", title: "Dog cuddles + waffles", description: "A break from the screen and deadlines. We're inviting in a few four-legged guests for petting, cuddles and warm paws in your lap. Show up when you need it most.", location: "Scenerommet", host: "Fram", pill: "12 spots left", pillClass: "bg-[#E6F7F1] text-[#1F7F66]", image: "/assets/hundekos.webp", hostFram: true },
      { day: "5–6", month: "MAR", time: "All day", type: "Pitch", title: "StartIT 2026", description: "15 students. 3 minutes each. One jury, one winner, free pizza for everyone. Bring your team and see what others are building.", location: "Gruva", host: "Fram + Spark*", pill: "Open sign-up", pillClass: "bg-[#E6F7F1] text-[#1F7F66]", image: "/assets/heroes/start.webp", partner: { src: "/assets/partners/start-ntnu.webp", alt: "Start NTNU" } },
      { day: "05", month: "MAY", time: "16:30 · 2h", type: "Workshop", title: "3D printing for beginners", description: "Learn to use the 3D printers in Idégarasjen. From CAD to finished print in two hours — no prior knowledge required.", location: "Idégarasjen", host: "Fram", pill: "5 spots left", pillClass: "bg-[#E6F7F1] text-[#1F7F66]", image: "/assets/gruva-event.webp" },
      { day: "12", month: "MAY", time: "19:00 · 90min", type: "Social", title: "Bread n' Spread", description: "Weekly social supper. Open sandwiches, toppings, chats and new faces. Drop-in — no sign-up needed.", location: "Fram Lounge", host: "Fram", pill: "Drop-in", pillClass: "bg-[#FFF4D6] text-[#8A6A00]", image: "/assets/bns-nov6.webp" },
      { day: "19", month: "MAY", time: "17:00 · 60min", type: "Talk", title: "From startup to exit — a conversation with Cognite", description: "The founder talks about the journey from the first line of code to going public. Q&A after the talk.", location: "Scenerommet", host: "Fram", pill: "Open sign-up", pillClass: "bg-[#E6F7F1] text-[#1F7F66]", image: "/assets/scenerommet.avif" },
    ] as EventItem[],
    upcomingHeading: "Upcoming events.",
    comingSoonBadge: "Coming soon",
    comingSoonText: "A new feature in the works. Here you'll be able to see what's happening in the innovation community at NTNU.",
    innoTitlePre: "Innovasjons­dagene ",
    innoTitleYear: "'26",
    innoLead: "Innovasjonsdagene is the most important meeting place for new and returning students who want to get to know the innovation communities at NTNU. Over two days, the organisations in FRAM show off their projects, tell you what they're working on, and answer questions about everything from student life to how you can get involved yourself.",
    innoWhen: { label: "When", value: "19–20 August" },
    innoWhere: { label: "Where", value: "Gruva" },
    innoTicket: { label: "Ticket", value: "Drop-in — free" },
    innoMonth: "August · 2026",
    innoCta: "Read more →",
    kobleTitle: "Koble.",
    kobleTagline: "The Innovation Collective's annual gala.",
    kobleLead: "One evening a year, Fram's members dress up, gather at Frimurerlogen, and celebrate the year gone by. A show, dinner, speeches and dancing. For member organisations only — sign-up is posted on Slack in the months before the event.",
    kobleWhen: { label: "When", value: "Spring" },
    kobleWhere: { label: "Where", value: "Frimurerlogen" },
    kobleWho: { label: "Who", value: "Fram members" },
    breadcrumbHome: "Home",
    breadcrumbEvents: "Events",
    orgDescription: "FRAM NTNU is NTNU's centre for student innovation — a community for students who want to build something.",
    innoEventName: "Innovasjonsdagene '26",
    innoEventDescription: "Innovasjonsdagene is a meeting place for getting to know FRAM's member organisations. Over two days, you can explore what students at NTNU are actually building.",
    innoPlaceName: "Gruva — FRAM NTNU",
  },
} as const satisfies Record<Lang, unknown>;

function EventCard({ event, organizerLabel }: { event: EventItem; organizerLabel: string }) {
  const style = { "--event-image": `url('${event.image}')` } as CSSProperties;
  return <article style={style} className="ev-card flex flex-col overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] [transition:transform_.25s_ease,box-shadow_.25s_ease] hover:[transform:translateY(-4px)] hover:shadow-[0_16px_40px_rgba(30,30,30,.08)]">
    <div className="relative flex min-h-40 flex-col justify-between gap-5 overflow-hidden px-6 pt-6 pb-5 text-white before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[linear-gradient(180deg,rgba(20,20,30,.45)_0%,rgba(20,20,30,.78)_100%),var(--event-image)] before:bg-cover before:bg-center">
      {event.hostFram ? <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/fram-symbol.webp" alt="Fram" title={`${organizerLabel}: Fram`} className="absolute top-3.5 right-3.5 z-[3] h-[72px] w-[72px] rounded-full bg-white p-2 object-contain shadow-[0_4px_12px_rgba(0,0,0,.18)]" />
      </> : event.partner ? <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.partner.src} alt={event.partner.alt} title={`${organizerLabel}: ${event.partner.alt}`} className="absolute top-3.5 right-3.5 z-[3] h-[78px] w-[78px] rounded-full bg-white p-[5px] object-contain shadow-[0_4px_12px_rgba(0,0,0,.18)]" />
      </> : null}
      <div className="relative z-[2] flex items-center justify-start gap-3"><span className="rounded-full bg-white/18 px-2.5 py-1.5 font-mono text-[10px] tracking-[.14em] uppercase backdrop-blur-sm">{event.type}</span></div>
      <div className="relative z-[2] flex items-baseline justify-between gap-3.5"><span className="text-[72px] leading-[.9] font-extrabold tracking-[-.035em]">{event.day}</span><span className="font-mono text-xs font-semibold tracking-[.14em] uppercase">{event.month}</span><span className="ml-auto self-end pb-2 font-mono text-[11px] tracking-[.1em] opacity-100">{event.time}</span></div>
    </div>
    <div className="flex flex-1 flex-col gap-3 px-6 pt-6 pb-5"><h4 className="m-0 text-xl leading-[1.2] font-bold tracking-[-.015em]">{event.title}</h4><p className="m-0 flex-1 text-sm leading-[1.55] text-[var(--ink-soft)]">{event.description}</p><div className="mt-1 flex flex-wrap gap-x-3.5 gap-y-2 pt-3 font-mono text-[10px] leading-[13px] tracking-[.1em] text-[var(--muted)] uppercase [border-color:var(--line)] [border-style:dashed] [border-width:1px_0_0]"><span className="inline-flex items-center gap-1.5 before:h-[5px] before:w-[5px] before:rounded-full before:bg-[var(--muted)] before:opacity-60">{event.location}</span><span className="inline-flex items-center gap-1.5 before:h-[5px] before:w-[5px] before:rounded-full before:bg-[var(--muted)] before:opacity-60">{event.host}</span></div></div>
    <div className="flex items-center justify-between gap-3 border-t border-[var(--line)] bg-[var(--bg)] px-6 py-4"><span className={`rounded-full px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[.08em] uppercase ${event.pillClass}`}>{event.pill}</span></div>
  </article>;
}

export function ArrangementerContent({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const homeUrl = `${SITE_URL}${path("home", lang)}`;
  const eventsUrl = `${SITE_URL}${path("events", lang)}`;
  const innoUrl = `${SITE_URL}${path("innovationDays", lang)}`;

  const breadcrumbData = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: homeUrl }, { "@type": "ListItem", position: 2, name: t.breadcrumbEvents, item: eventsUrl }] };
  const organizationAndEventData = [{ "@context": "https://schema.org", "@type": "Organization", name: "FRAM NTNU", url: SITE_URL, logo: `${SITE_URL}/assets/og-fram.png`, description: t.orgDescription, sameAs: ["https://www.instagram.com/framntnu/", "https://www.facebook.com/framntnu", "https://www.linkedin.com/company/framntnu/"] }, { "@context": "https://schema.org", "@type": "Event", name: t.innoEventName, startDate: "2026-08-19", endDate: "2026-08-20", eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", location: { "@type": "Place", name: t.innoPlaceName, address: { "@type": "PostalAddress", addressLocality: "Trondheim", addressCountry: "NO" } }, organizer: { "@type": "Organization", name: "FRAM NTNU", url: SITE_URL }, description: t.innoEventDescription, isAccessibleForFree: true, url: innoUrl }];

  return <div lang={lang === "en" ? "en" : undefined} className="min-h-screen bg-[var(--bg)] font-sans text-[var(--ink)] [--bg-soft:#F2EDE3] [--bg:#FAF7F2] [--blue:#2E86C1] [--card:#fff] [--charcoal:#1E1E1E] [--ink-soft:#555] [--ink:#1E1E1E] [--line:#E6E0D5] [--muted:#8A8A8A] [--nav-accent:#E85A5A] [--red:#E85A5A] [--teal:#3FC4A3] [--yellow:#FDC82F]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationAndEventData) }} />
    <SiteHeader currentPath="/arrangementer" lang={lang} caretFontFamily={'Poppins, "Poppins Fallback", sans-serif'} />

    <section id="kommende" className="border-b border-[var(--line)] py-24"><div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
      <div className="mb-12 grid grid-cols-[1fr_auto] items-end gap-8"><h1 className="m-0 max-w-[16ch] text-[clamp(36px,4vw,56px)] leading-[1.03] font-extrabold tracking-[-.025em]">{t.upcomingHeading}</h1></div>
      <div className="relative"><div id="evGrid" aria-hidden="true" className="grid grid-cols-3 gap-5 blur-[3.5px] saturate-[.92] select-none max-[960px]:grid-cols-1 max-[760px]:hidden">{t.events.map((event) => <EventCard key={`${event.day}-${event.title}`} event={event} organizerLabel={t.organizerLabel} />)}</div>
        <div className="absolute inset-0 z-[5] flex items-center justify-center bg-[color-mix(in_oklab,var(--bg)_20%,transparent)] max-[760px]:static max-[760px]:bg-transparent"><div className="flex w-auto max-w-[620px] items-center justify-center rounded-[18px] border border-[var(--line)] bg-[color-mix(in_oklab,var(--card)_86%,transparent)] px-12 py-10 shadow-[0_24px_60px_-18px_rgba(30,30,30,.30)] backdrop-blur-[5px] max-[760px]:w-full max-[760px]:max-w-full max-[760px]:px-6 max-[760px]:py-8 max-[760px]:backdrop-blur-none"><div className="flex max-w-[600px] flex-col items-center gap-[18px] text-center"><span className="rounded-full border border-[var(--line)] bg-[var(--bg-soft)] px-4 py-2 font-mono text-[11px] tracking-[.16em] text-[var(--ink-soft)] uppercase">{t.comingSoonBadge}</span><p className="m-0 text-[clamp(21px,2.4vw,29px)] leading-[1.4] font-semibold tracking-[-.01em] text-[var(--ink)] [text-wrap:balance] max-[760px]:text-lg">{t.comingSoonText}</p></div></div></div>
      </div>
    </div></section>

    <section id="flaggskip" className="border-0 bg-[var(--charcoal)] py-24 text-[var(--bg)]"><div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
      <div className="grid grid-cols-[1.1fr_1fr] overflow-hidden rounded-[28px] border border-white/12 max-[760px]:grid-cols-1">
        <div className="relative flex min-h-[440px] flex-col justify-between overflow-hidden bg-[#2B7FD4] bg-[url('/assets/innovasjonsdagene-hovedscenen.avif')] bg-cover bg-center px-10 py-9 text-white [transition:box-shadow_.4s_ease,transform_.35s_cubic-bezier(.22,1,.36,1)] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(20,20,24,.55)_0%,rgba(20,20,24,.15)_38%,rgba(20,20,24,.65)_100%)] hover:[transform:scale(1.012)] hover:shadow-[0_24px_60px_rgba(43,127,212,.35)] max-[760px]:min-h-[280px] max-[760px]:px-6 max-[760px]:py-7"><div className="relative z-[1]" /><div className="relative z-[1] text-[clamp(72px,8vw,112px)] leading-[.9] font-extrabold tracking-[-.04em] [transition:transform_.4s_cubic-bezier(.22,1,.36,1)] hover:[transform:translateY(-6px)]">19–20<small className="mt-3.5 block text-[13px] font-semibold tracking-[.18em] uppercase opacity-85">{t.innoMonth}</small></div></div>
        <div className="flex flex-col gap-5 bg-[#0F0F0F] px-14 py-12 text-[var(--bg)] max-[760px]:min-w-0 max-[760px]:px-6 max-[760px]:py-8"><h3 className="m-0 text-5xl leading-[1.05] font-extrabold tracking-[-.025em] max-[760px]:text-[28px]">{t.innoTitlePre}<span className="text-[var(--yellow)]">{t.innoTitleYear}</span></h3><p className="m-0 text-[15px] leading-[1.6] text-[#ccc]">{t.innoLead}</p><dl className="my-2 grid grid-cols-3 gap-5 max-[760px]:gap-3"><div className="border-t border-white/15 pt-3.5"><dt className="mb-1.5 font-mono text-[11px] tracking-[.12em] text-[#888] uppercase">{t.innoWhen.label}</dt><dd className="m-0 text-[14px] leading-[normal] font-medium">{t.innoWhen.value}</dd></div><div className="border-t border-white/15 pt-3.5"><dt className="mb-1.5 font-mono text-[11px] tracking-[.12em] text-[#888] uppercase">{t.innoWhere.label}</dt><dd className="m-0 text-[14px] leading-[normal] font-medium">{t.innoWhere.value}</dd></div><div className="border-t border-white/15 pt-3.5"><dt className="mb-1.5 font-mono text-[11px] tracking-[.12em] text-[#888] uppercase">{t.innoTicket.label}</dt><dd className="m-0 text-[14px] leading-[normal] font-medium">{t.innoTicket.value}</dd></div></dl><div className="mt-1 flex flex-wrap gap-2.5"><Link href={localizeHref("/innovasjonsdagene", lang)} className="inline-flex items-center gap-2 rounded-full bg-[var(--yellow)] px-[22px] py-3 text-[13px] font-semibold text-[var(--charcoal)] no-underline [transition:transform_.2s,box-shadow_.2s] hover:[transform:translateY(-1px)] hover:shadow-[0_8px_24px_rgba(253,200,47,.35)]">{t.innoCta}</Link></div></div>
      </div>
    </div></section>

    <section id="koble" className="scroll-mt-[164px] border-0 bg-[linear-gradient(135deg,#1A0B26_0%,#3A0F5E_55%,#6B1A8A_100%)] py-24 text-[#F7EEFF]"><div className="mx-auto grid max-w-[1360px] grid-cols-[1.2fr_1fr] items-center gap-14 px-12 max-[900px]:px-5 max-[760px]:grid-cols-1 max-[760px]:gap-8 max-[520px]:px-4">
      <div className="min-w-0"><h2 className="mt-0 mb-6 text-[clamp(48px,6vw,88px)] leading-[.95] font-extrabold tracking-[-.035em] text-white max-[760px]:mb-4 max-[760px]:text-5xl"><span className="text-[#FFD1F7]">{t.kobleTitle}</span></h2><p className="mt-[-8px] mb-5 text-[clamp(20px,1.8vw,26px)] leading-[1.3] font-medium tracking-[-.01em] text-[#E8B0F5] italic">{t.kobleTagline}</p><p className="mt-0 mb-8 max-w-[520px] text-[17px] leading-[1.6] text-[#E5C8F0] max-[760px]:mb-6 max-[760px]:text-[15px]">{t.kobleLead}</p><dl className="mb-8 grid max-w-[520px] grid-cols-[repeat(3,1fr)] gap-6 border-t border-white/18 pt-6 max-[760px]:max-w-none max-[760px]:gap-3"><div><dt className="mb-2 font-mono text-[10px] tracking-[.14em] text-[#B68BCC] uppercase">{t.kobleWhen.label}</dt><dd className="m-0 text-[16px] leading-[normal] font-semibold text-white max-[760px]:text-[13px] max-[760px]:whitespace-nowrap">{t.kobleWhen.value}</dd></div><div><dt className="mb-2 font-mono text-[10px] tracking-[.14em] text-[#B68BCC] uppercase">{t.kobleWhere.label}</dt><dd className="m-0 text-[16px] leading-[normal] font-semibold text-white max-[760px]:text-[13px] max-[760px]:whitespace-nowrap">{t.kobleWhere.value}</dd></div><div><dt className="mb-2 font-mono text-[10px] tracking-[.14em] text-[#B68BCC] uppercase">{t.kobleWho.label}</dt><dd className="m-0 text-[16px] leading-[normal] font-semibold text-white max-[760px]:text-[13px] max-[760px]:whitespace-nowrap">{t.kobleWho.value}</dd></div></dl></div>
      <KobleCarousel lang={lang} />
    </div></section>
    <SiteFooter lang={lang} />
  </div>;
}
