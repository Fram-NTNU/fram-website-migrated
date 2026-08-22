import { LargeRoom, MeetingRoom, SmallRoom } from "@/components/booking-rooms";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Lang } from "@/i18n/config";
import { SITE_URL, localizeHref, path } from "@/i18n/config";

const copy = {
  nb: {
    heroTitle: "Book et rom på FRAM.",
    heroLead:
      "Lokalene våre brukes til alt fra møter og workshops til foredrag, middager og releasefester — alt som bidrar til læring, samarbeid og nyskaping.",
    heroCta: "Slik booker du",
    heroImgAlt: "Isometrisk illustrasjon av FRAMs lokaler",
    spacesHeading: "Lokalene våre.",
    gruvaLogoAlt: "Gruva logo",
    gruvaHeading: { pre: "Skreddersydd", mid: "for ", hi: "store ideer." },
    gruvaLead:
      "Gruva har kapasitet til 200 personer og brukes til alt fra workshops og pitchekvelder til nettverksarrangementer og konkurranser. Mellom arrangementene er lokalet en åpen møteplass for studenter og hjertet i innovasjonsmiljøet ved NTNU.",
    gruvaStats: [
      { number: "200", label: "Kapasitet", orange: true },
      { number: "120+", label: "Arrangementer årlig", orange: false },
      { number: "Åpen", label: "Hverdager", orange: false },
    ],
    gruvaBookNote: "Gruva bookes direkte på Gruvas egen nettside.",
    gruvaBookCta: "Book Gruva på gruvantnu.no ↗",
    gruvaEventAlt: "Arrangement i Gruva",
    scenerommet: {
      alt: "Scenerommet",
      title: <>Scene&shy;rommet.</>,
      roomName: "Scenerommet",
      description:
        "En fleksibel arena for arrangementer, små konserter, foredrag og workshops. Ellers åpent for alle.",
      features: [
        { icon: "ph ph-armchair", label: "70 sittende" },
        { icon: "ph ph-microphone-stage", label: "Talerstol" },
        { icon: "ph ph-speaker-hifi", label: "PA-anlegg" },
        { icon: "ph ph-sun", label: "Lyssetting" },
        { icon: "ph ph-projector-screen", label: "Projektor" },
      ],
    },
    fellesrommet: {
      alt: "Fellesrommet",
      title: <>Felles&shy;rommet.</>,
      roomName: "Fellesrommet",
      description:
        "Åpent for alle studenter og egner seg like godt til skolearbeid som til en kaffe eller lunsjpause. For større arrangementer: avtal med leder i Fram.",
      features: [
        { icon: "ph ph-coffee", label: "Kaffemaskin" },
        { icon: "ph ph-ping-pong", label: "Bordtennis" },
        { icon: "ph ph-fork-knife", label: "Kjøkken & langbord" },
        { icon: "ph ph-couch", label: "Sofakrok" },
        { icon: "ph ph-clock", label: "Alltid åpent" },
      ],
    },
    storeMoterom: {
      alt: "Store møterom",
      title: "Store møterom.",
      roomName: "Store møterom",
      description:
        "Det mest bookede rommet på FRAM. Egner seg godt til større møter, og fungerer også som undervisningsrom for små grupper.",
    },
    lilleMoterom: {
      alt: "Lille møterom",
      title: "Lille møterom.",
      roomName: "Lille møterom",
      description:
        "Ligger i hjørnet på FRAM med vinduer ut og en god og intim stemning. Perfekt for tette møter eller intervjuer.",
    },
    bananrommet: {
      alt: "Bananrommet",
      title: <>Banan&shy;rommet.</>,
      roomName: "Bananrommet",
      description:
        "Bananrommet også kjent som det gule møterom. Ligger rett utenfor døren inn til Fram.",
    },
    podcastrommet: {
      alt: "Podcastrommet på FRAM",
      title: "Podcastrommet.",
      bodyPre: "Fullt utstyrt for podkast, intervju og lydinnhold. Ta kontakt med oss på ",
      bodyPost: " så finner vi et podkastrom som passer til ditt bruk.",
      features: [
        { icon: "ph ph-microphone", label: "Mikrofoner" },
        { icon: "ph ph-faders", label: "Rodecaster" },
        { icon: "ph ph-lamp", label: "Belysning" },
        { icon: "ph ph-couch", label: "Sofa" },
        { icon: "ph ph-headphones", label: "Hodetelefoner" },
      ],
    },
    idegarasjen: {
      alt: "Idégarasjen — studentenes innovasjonsverksted",
      title: "Idégarasjen.",
      body:
        "Studentenes åpne innovasjonsverksted — med 3D-printere, laserkutter, loddestasjoner og alt du trenger til prototyping.",
      features: [
        { icon: "ph ph-cube", label: "3D-printere" },
        { icon: "ph ph-scissors", label: "Laserkutter" },
        { icon: "ph ph-wrench", label: "Loddestasjoner" },
        { icon: "ph ph-printer", label: "Storformatprinter" },
        { icon: "ph ph-hammer", label: "Håndverktøy" },
        { icon: "ph ph-plugs-connected", label: "Elverktøy" },
      ],
    },
    bookHeading: { pre: "Slik booker ", hi: "du." },
    bookLead: "De fleste rommene bookes via FRAM. Gruva har sin egen booking på gruvantnu.no.",
    bookMemberTitle: "Medlemsorganisasjon",
    bookMemberPre: "Hør med din nærmeste leder hvordan du booker i kalenderen, eller kontakt ",
    bookMemberPost: " for interne bookinger.",
    bookExternalTitle: "Ekstern",
    bookExternalPre: "Send oss en e-post på ",
    bookExternalPost: ", så finner vi et rom og en tid som passer.",
    bookBanner:
      "Vi jobber med et nytt bookingsystem som skal gjøre det enklere for alle å booke lokalene våre.",
    comingHeading: "Kommer snart.",
    comingLead:
      "FRAM flytter snart ned til det nye Økonomi- og innovasjonsbygget på Hesthagen — med oppgraderte lokaler og helt nye rom.",
    comingImgAlt: "Konsept for nye Gruva på Hesthagen",
    comingCardTitle: "Nye Gruva på Hesthagen",
    comingCardText:
      "Gruva og resten av FRAMs lokaler flytter til det nye bygget. Slik kan nye Gruva bli.",
    comingBadge: "Kommer snart",
    comingRoomTitle: "Mediarom",
    comingRoomText:
      "Et eget rom for podkast-, video- og innholdsproduksjon — i det nye bygget på Hesthagen.",
    comingDoneLabel: "Ferdig",
    breadcrumbHome: "Hjem",
    breadcrumbBooking: "Booking",
    orgDescription:
      "FRAM NTNU er NTNUs senter for studentinnovasjon — et fellesskap for studenter som vil skape noe.",
  },
  en: {
    heroTitle: "Book a room at FRAM.",
    heroLead:
      "Our spaces are used for everything from meetings and workshops to talks, dinners and release parties — anything that fosters learning, collaboration and new ideas.",
    heroCta: "How to book",
    heroImgAlt: "Isometric illustration of FRAM's spaces",
    spacesHeading: "Our spaces.",
    gruvaLogoAlt: "Gruva logo",
    gruvaHeading: { pre: "Tailored", mid: "for ", hi: "big ideas." },
    gruvaLead:
      "Gruva holds up to 200 people and is used for everything from workshops and pitch nights to networking events and competitions. Between events, the space is an open meeting place for students and the heart of the innovation community at NTNU.",
    gruvaStats: [
      { number: "200", label: "Capacity", orange: true },
      { number: "120+", label: "Events per year", orange: false },
      { number: "Open", label: "Weekdays", orange: false },
    ],
    gruvaBookNote: "Gruva is booked directly on Gruva's own website.",
    gruvaBookCta: "Book Gruva at gruvantnu.no ↗",
    gruvaEventAlt: "Event in Gruva",
    scenerommet: {
      alt: "Scenerommet",
      title: "Scenerommet.",
      roomName: "Scenerommet",
      description:
        "A flexible venue for events, small concerts, talks and workshops. Open to everyone the rest of the time.",
      features: [
        { icon: "ph ph-armchair", label: "70 seated" },
        { icon: "ph ph-microphone-stage", label: "Lectern" },
        { icon: "ph ph-speaker-hifi", label: "PA system" },
        { icon: "ph ph-sun", label: "Lighting" },
        { icon: "ph ph-projector-screen", label: "Projector" },
      ],
    },
    fellesrommet: {
      alt: "Fellesrommet",
      title: <>Fellesrommet.</>,
      roomName: "Fellesrommet",
      description:
        "Open to all students and just as good for coursework as for a coffee or lunch break. For larger events, arrange with the leader of Fram.",
      features: [
        { icon: "ph ph-coffee", label: "Coffee machine" },
        { icon: "ph ph-ping-pong", label: "Ping pong" },
        { icon: "ph ph-fork-knife", label: "Kitchen & long table" },
        { icon: "ph ph-couch", label: "Lounge area" },
        { icon: "ph ph-clock", label: "Always open" },
      ],
    },
    storeMoterom: {
      alt: "Store møterom",
      title: "Store møterom.",
      roomName: "Store møterom",
      description:
        "The most-booked room at FRAM. Great for larger meetings, and it also works as a teaching room for small groups.",
    },
    lilleMoterom: {
      alt: "Lille møterom",
      title: "Lille møterom.",
      roomName: "Lille møterom",
      description:
        "Tucked into the corner of FRAM with windows and a warm, intimate feel. Perfect for close meetings or interviews.",
    },
    bananrommet: {
      alt: "Bananrommet",
      title: "Bananrommet.",
      roomName: "Bananrommet",
      description:
        "Bananrommet, also known as the yellow meeting room. Located right outside the door into Fram.",
    },
    podcastrommet: {
      alt: "Podcastrommet at FRAM",
      title: "Podcastrommet.",
      bodyPre: "Fully equipped for podcasts, interviews and audio content. Get in touch with us at ",
      bodyPost: " and we'll find a podcast room that fits your needs.",
      features: [
        { icon: "ph ph-microphone", label: "Microphones" },
        { icon: "ph ph-faders", label: "Rodecaster" },
        { icon: "ph ph-lamp", label: "Lighting" },
        { icon: "ph ph-couch", label: "Sofa" },
        { icon: "ph ph-headphones", label: "Headphones" },
      ],
    },
    idegarasjen: {
      alt: "Idégarasjen — the students' innovation workshop",
      title: "Idégarasjen.",
      body:
        "The students' open innovation workshop — with 3D printers, a laser cutter, soldering stations and everything you need for prototyping.",
      features: [
        { icon: "ph ph-cube", label: "3D printers" },
        { icon: "ph ph-scissors", label: "Laser cutter" },
        { icon: "ph ph-wrench", label: "Soldering stations" },
        { icon: "ph ph-printer", label: "Large-format printer" },
        { icon: "ph ph-hammer", label: "Hand tools" },
        { icon: "ph ph-plugs-connected", label: "Power tools" },
      ],
    },
    bookHeading: { pre: "How to ", hi: "book." },
    bookLead: "Most rooms are booked through FRAM. Gruva has its own booking at gruvantnu.no.",
    bookMemberTitle: "Member organisation",
    bookMemberPre: "Check with your nearest leader on how to book in the calendar, or contact ",
    bookMemberPost: " for internal bookings.",
    bookExternalTitle: "External",
    bookExternalPre: "Send us an email at ",
    bookExternalPost: " and we'll find a room and time that works.",
    bookBanner:
      "We're working on a new booking system to make it easier for everyone to book our spaces.",
    comingHeading: "Coming soon.",
    comingLead:
      "FRAM is soon moving down to the new Economics and Innovation Building at Hesthagen — with upgraded spaces and brand-new rooms.",
    comingImgAlt: "Concept for the new Gruva at Hesthagen",
    comingCardTitle: "The new Gruva at Hesthagen",
    comingCardText:
      "Gruva and the rest of FRAM's spaces are moving to the new building. Here's what the new Gruva could look like.",
    comingBadge: "Coming soon",
    comingRoomTitle: "Mediarom",
    comingRoomText:
      "A dedicated room for podcast, video and content production — in the new building at Hesthagen.",
    comingDoneLabel: "Completed",
    breadcrumbHome: "Home",
    breadcrumbBooking: "Booking",
    orgDescription:
      "FRAM NTNU is NTNU's centre for student innovation — a community for students who want to build something.",
  },
} as const satisfies Record<Lang, unknown>;

export function BookingContent({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const homeUrl = `${SITE_URL}${path("home", lang)}`;
  const bookingUrl = `${SITE_URL}${path("booking", lang)}`;
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: homeUrl },
      { "@type": "ListItem", position: 2, name: t.breadcrumbBooking, item: bookingUrl },
    ],
  };
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FRAM NTNU",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/og-fram.png`,
    description: t.orgDescription,
    sameAs: [
      "https://www.instagram.com/framntnu/",
      "https://www.facebook.com/framntnu",
      "https://www.linkedin.com/company/framntnu/",
    ],
  };

  return (
    <div lang={lang === "en" ? "en" : undefined} className="min-h-screen bg-[#FBF7F0] font-sans text-[#1A1A1A] [scroll-behavior:smooth] [--bg-soft:#F4EFE5] [--bg:#FBF7F0] [--blue:#2E86C1] [--card:#fff] [--gruva-green:#3D4F47] [--ink-soft:#555] [--ink:#1A1A1A] [--line:#E9E2D3] [--muted:#8a8a8a] [--nav-accent:#E85A5A] [--orange:#E58A3A] [--yellow:#FDC82F]">
      <link rel="preload" as="image" href="/assets/fram-isometric.webp" fetchPriority="high" />
      <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />
      <SiteHeader currentPath="/booking" lang={lang} caretFontFamily={'Poppins, "Poppins Fallback", sans-serif'} />

      <header className="border-b border-[var(--line)] py-[66px] pb-[76px] max-[760px]:py-11 max-[760px]:pb-[52px]">
        <div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
          <div className="grid grid-cols-[1.15fr_.85fr] items-center gap-14 max-[760px]:grid-cols-1 max-[760px]:gap-8">
            <div>
              <h1 className="mt-0 mb-[26px] text-[clamp(40px,4.8vw,66px)] leading-[1.02] font-extrabold tracking-[-.03em]">{t.heroTitle}</h1>
              <p className="mt-0 mb-[34px] max-w-[520px] text-[19px] leading-[1.6] text-[var(--ink-soft)]">{t.heroLead}</p>
              <div className="flex flex-wrap gap-3">
                <a href="#book" className="inline-flex items-center gap-[9px] rounded-full bg-[var(--ink)] px-6 py-3.5 text-[15px] font-semibold text-white no-underline [transition:transform_.2s,background_.2s,border-color_.2s,color_.2s] hover:[transform:translateY(-2px)] hover:bg-[var(--blue)]">{t.heroCta} <i className="ph ph-arrow-right" /></a>
                <a href="mailto:framntnu@gmail.com" className="inline-flex items-center gap-[9px] rounded-full border border-[var(--line)] px-6 py-3.5 text-[15px] font-semibold text-[var(--ink)] no-underline [transition:transform_.2s,background_.2s,border-color_.2s,color_.2s] hover:[transform:translateY(-2px)] hover:border-[var(--ink)]">framntnu@gmail.com</a>
              </div>
            </div>
            <figure className="m-0 max-w-[440px] justify-self-end max-[760px]:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="block h-auto w-full" width="1320" height="1408" decoding="async" src="/assets/fram-isometric.webp" alt={t.heroImgAlt} />
            </figure>
          </div>
        </div>
      </header>

      <section id="lokaler" className="py-[92px] max-[760px]:py-[62px]">
        <div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
          <div className="mb-[46px] max-w-[680px] max-[760px]:mb-8"><h2 className="m-0 text-[clamp(34px,3.6vw,54px)] leading-[1.04] font-extrabold tracking-[-.025em]">{t.spacesHeading}</h2></div>

          <div className="relative mb-6 overflow-hidden rounded-[28px] bg-[var(--gruva-green)] p-14 text-[#F4EFE5] before:pointer-events-none before:absolute before:-top-20 before:-right-20 before:h-[380px] before:w-[380px] before:rounded-full before:bg-[radial-gradient(circle_at_center,rgba(229,138,58,.18),transparent_70%)] max-[760px]:px-6 max-[760px]:py-8">
            <div className="relative z-[1] grid grid-cols-[1.1fr_.9fr] items-center gap-12 max-[760px]:[grid-template-columns:1fr]">
              <div>
                <div className="mb-7 flex items-center gap-[18px] border-b border-white/12 pb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="h-9 w-auto" width="6000" height="1120" loading="lazy" decoding="async" src="/assets/gruva-logo-orange.webp" alt={t.gruvaLogoAlt} />
                </div>
                <h3 className="mt-0 mb-5 text-[64px] leading-[.95] font-extrabold tracking-[-.03em] text-white max-[760px]:text-[38px]">{t.gruvaHeading.pre}<br />{t.gruvaHeading.mid}<span className="text-[var(--orange)]">{t.gruvaHeading.hi}</span></h3>
                <p className="mt-0 mb-[18px] max-w-[480px] text-[17px] leading-[1.65] text-white/78">{t.gruvaLead}</p>
                <div className="mt-7 mb-6 grid [grid-template-columns:repeat(3,1fr)] gap-3.5 max-[760px]:gap-2">
                  {t.gruvaStats.map((stat) => <div key={stat.label} className="rounded-[14px] border border-white/10 bg-white/6 p-[18px] max-[760px]:p-3"><div className={`text-[34px] leading-none font-extrabold tracking-[-.02em] max-[760px]:text-2xl ${stat.orange ? "text-[var(--orange)]" : "text-white"}`}>{stat.number}</div><div className="mt-2 font-mono text-[10px] tracking-[.1em] text-white/55 uppercase">{stat.label}</div></div>)}
                </div>
                <p className="mt-0 mb-3.5 text-[15px] leading-[1.65] text-white/70">{t.gruvaBookNote}</p>
                <div className="mt-2 flex flex-wrap gap-3"><a href="https://www.gruvantnu.no/" target="_blank" rel="noopener" className="inline-flex items-center gap-2.5 rounded-full bg-[var(--orange)] px-[22px] py-3.5 text-[14px] font-semibold text-white no-underline [transition:transform_.2s] hover:[transform:translateY(-2px)]">{t.gruvaBookCta}</a></div>
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-[18px] shadow-[0_30px_80px_-30px_rgba(0,0,0,.5)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="block h-full w-full object-cover" width="1920" height="1280" loading="lazy" decoding="async" src="/assets/gruva-event.webp" alt={t.gruvaEventAlt} />
              </div>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 items-stretch gap-6 max-[760px]:grid-cols-1">
            <LargeRoom lang={lang} id="scenerommet" image="/assets/scenerommet.avif" alt={t.scenerommet.alt} capacity="120" title={t.scenerommet.title} roomName={t.scenerommet.roomName} maze="https://link.mazemap.com/2S7qcBrY" description={t.scenerommet.description} features={[...t.scenerommet.features]} />
            <LargeRoom lang={lang} id="fellesrommet" image="/assets/fram-fellesrom.webp" alt={t.fellesrommet.alt} capacity="~40" title={t.fellesrommet.title} roomName={t.fellesrommet.roomName} maze="https://link.mazemap.com/Icfh3qjb" description={t.fellesrommet.description} features={[...t.fellesrommet.features]} />
          </div>

          <div id="moterom" className="mb-6 grid scroll-mt-[110px] grid-cols-3 gap-5 max-[760px]:grid-cols-1">
            <MeetingRoom lang={lang} accent="#2E86C1" image="/assets/rooms/storemoterom.avif" alt={t.storeMoterom.alt} capacity="16" title={t.storeMoterom.title} roomName={t.storeMoterom.roomName} maze="https://link.mazemap.com/CI3cG2d5" description={t.storeMoterom.description} />
            <MeetingRoom lang={lang} accent="#E85A5A" image="/assets/rooms/lillemoterom.avif" alt={t.lilleMoterom.alt} capacity="7" title={t.lilleMoterom.title} roomName={t.lilleMoterom.roomName} maze="https://link.mazemap.com/GLtbZdTq" description={t.lilleMoterom.description} />
            <MeetingRoom lang={lang} accent="#FDC82F" image="/assets/Bananrommet.webp" alt={t.bananrommet.alt} capacity="12" title={t.bananrommet.title} roomName={t.bananrommet.roomName} maze="https://link.mazemap.com/XAD8uBqO" description={t.bananrommet.description} />
          </div>

          <div className="grid grid-cols-2 gap-[22px] max-[760px]:grid-cols-1">
            <SmallRoom lang={lang} id="podcastrommet" image="/assets/Podcastrommet.webp" alt={t.podcastrommet.alt} title={t.podcastrommet.title} maze="https://link.mazemap.com/WbokT9PE" features={[...t.podcastrommet.features]}>{t.podcastrommet.bodyPre}<a href="mailto:framntnu@gmail.com" className="font-semibold text-[var(--ink)]">framntnu@gmail.com</a>{t.podcastrommet.bodyPost}</SmallRoom>
            <SmallRoom lang={lang} href={localizeHref("/idegarasjen", lang)} image="/assets/Idegarasjen2.webp" logo="/assets/idegarasjen-logo-hvit.webp" alt={t.idegarasjen.alt} title={t.idegarasjen.title} features={[...t.idegarasjen.features]}>{t.idegarasjen.body}</SmallRoom>
          </div>
        </div>
      </section>

      <section id="book" className="py-[92px] max-[760px]:py-[62px]">
        <div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
          <div className="relative overflow-hidden rounded-[28px] bg-[var(--ink)] p-14 text-white before:pointer-events-none before:absolute before:-top-[90px] before:-right-[90px] before:h-[380px] before:w-[380px] before:rounded-full before:bg-[radial-gradient(circle,rgba(253,200,47,.16),transparent_70%)] max-[760px]:px-[26px] max-[760px]:py-[34px]">
            <div className="relative z-[1]">
              <h2 className="mt-0 mb-3.5 text-[clamp(30px,3vw,46px)] leading-[1.04] font-extrabold tracking-[-.02em] text-white">{t.bookHeading.pre}<span className="text-[var(--yellow)]">{t.bookHeading.hi}</span></h2>
              <p className="mt-0 mb-[34px] max-w-[540px] text-base leading-[1.6] text-white/74">{t.bookLead}</p>
              <div className="mb-[22px] grid grid-cols-2 gap-[18px] max-[760px]:grid-cols-1 max-[760px]:gap-3.5">
                <div className="rounded-[22px] border border-white/12 bg-white/6 px-8 py-[30px]"><h3 className="mt-0 mb-2.5 text-[19px] font-bold tracking-[-.01em] text-white">{t.bookMemberTitle}</h3><p className="m-0 text-[14.5px] leading-[1.62] text-white/80">{t.bookMemberPre}<a className="font-semibold text-[var(--yellow)]" href="mailto:framntnu@gmail.com">framntnu@gmail.com</a>{t.bookMemberPost}</p></div>
                <div className="rounded-[22px] border border-white/12 bg-white/6 px-8 py-[30px]"><h3 className="mt-0 mb-2.5 text-[19px] font-bold tracking-[-.01em] text-white">{t.bookExternalTitle}</h3><p className="m-0 text-[14.5px] leading-[1.62] text-white/80">{t.bookExternalPre}<a className="font-semibold text-[var(--yellow)]" href="mailto:framntnu@gmail.com">framntnu@gmail.com</a>{t.bookExternalPost}</p></div>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-[rgba(253,200,47,.25)] bg-[rgba(253,200,47,.1)] px-6 py-4 text-sm leading-[1.5] text-white/85 max-[760px]:items-start max-[760px]:rounded-2xl"><span className="mt-[6px] h-2 w-2 flex-none rounded-full bg-[var(--yellow)] shadow-[0_0_0_4px_rgba(253,200,47,.2)]" /><span>{t.bookBanner}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="kommer" className="py-[92px] max-[760px]:py-[62px]">
        <div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
          <div className="mb-[46px] max-w-[680px] max-[760px]:mb-8"><h2 className="mt-0 mb-4 text-[clamp(34px,3.6vw,54px)] leading-[1.04] font-extrabold tracking-[-.025em]">{t.comingHeading}</h2><p className="m-0 text-[17px] leading-[1.6] text-[var(--ink-soft)]">{t.comingLead}</p></div>
          <div className="grid grid-cols-[1.15fr_.85fr] items-stretch gap-6 max-[760px]:grid-cols-1">
            <div className="relative min-h-[360px] overflow-hidden rounded-[28px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="absolute inset-0 block h-full w-full object-cover" width="1920" height="1080" loading="lazy" decoding="async" src="/assets/gruva-concept.webp" alt={t.comingImgAlt} />
              <div className="absolute inset-x-0 bottom-0 z-[1] bg-[linear-gradient(to_top,rgba(8,6,3,.82),rgba(8,6,3,.2)_70%,transparent)] px-[34px] py-[30px] text-white"><h3 className="mt-0 mb-2 text-2xl font-extrabold tracking-[-.02em] text-white">{t.comingCardTitle}</h3><p className="m-0 max-w-[420px] text-[14.5px] leading-[1.55] text-white/82">{t.comingCardText}</p></div>
            </div>
            <div className="flex flex-col rounded-[28px] border border-[var(--line)] bg-[var(--bg-soft)] px-[38px] py-10 max-[760px]:px-[26px] max-[760px]:py-8">
              <div className="mb-[18px] inline-flex self-start items-center gap-2 rounded-full bg-[var(--ink)] px-[13px] py-1.5 font-mono text-[10px] tracking-[.12em] text-white uppercase"><span className="h-1.5 w-1.5 rounded-full bg-[var(--orange)] shadow-[0_0_8px_var(--orange)]" />{t.comingBadge}</div>
              <h3 className="mt-0 mb-3 text-[28px] font-extrabold tracking-[-.02em]">{t.comingRoomTitle}</h3>
              <p className="mt-0 mb-auto max-w-[380px] text-[15px] leading-[1.62] text-[var(--ink-soft)]">{t.comingRoomText}</p>
              <div className="mt-7 flex items-baseline gap-2.5 border-t border-[var(--line)] pt-[22px]"><span className="text-[30px] font-extrabold tracking-[-.02em]">2027/28</span><span className="font-mono text-[10px] tracking-[.12em] text-[var(--muted)] uppercase">{t.comingDoneLabel}</span></div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} mobileExtraBottomPadding />
    </div>
  );
}
