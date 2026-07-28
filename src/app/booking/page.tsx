import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Book lokaler — FRAM NTNU",
  description: "Book lokaler på FRAM NTNU i Trondheim — Gruva, Scenerommet, Fellesrommet og møterom for student-arrangementer, workshops og møter.",
  alternates: { canonical: "https://www.framntnu.no/booking" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", siteName: "FRAM NTNU", locale: "nb_NO",
    title: "Book lokaler — FRAM NTNU",
    description: "Book lokaler på FRAM NTNU i Trondheim — Gruva, Scenerommet, Fellesrommet og møterom for student-arrangementer, workshops og møter.",
    url: "https://www.framntnu.no/booking",
    images: [{ url: "/assets/og-fram.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image", title: "Book lokaler — FRAM NTNU",
    description: "Book lokaler på FRAM NTNU i Trondheim — Gruva, Scenerommet, Fellesrommet og møterom for student-arrangementer, workshops og møter.",
    images: ["/assets/og-fram.png"],
  },
};

const breadcrumbData = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Hjem", item: "https://www.framntnu.no/" },
    { "@type": "ListItem", position: 2, name: "Booking", item: "https://www.framntnu.no/booking" },
  ],
};

const organizationData = {
  "@context": "https://schema.org", "@type": "Organization", name: "FRAM NTNU",
  url: "https://www.framntnu.no", logo: "https://www.framntnu.no/assets/og-fram.png",
  description: "FRAM NTNU er NTNUs senter for studentinnovasjon — et fellesskap for studenter som vil skape noe.",
  sameAs: ["https://www.instagram.com/framntnu/", "https://www.facebook.com/framntnu", "https://www.linkedin.com/company/framntnu/"],
};

type Feature = { icon: string; label: string };

function LargeRoom({ image, alt, capacity, title, description, features }: {
  image: string; alt: string; capacity: string; title: React.ReactNode; description: string; features: Feature[];
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--card)] [transition:transform_.25s,box-shadow_.25s] hover:[transform:translateY(-4px)] hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,.18)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-soft)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="block h-full w-full object-cover" width="1920" height="1280" loading="lazy" decoding="async" src={image} alt={alt} />
      </div>
      <div className="flex-1 px-8 pt-7 pb-8">
        <div className="mb-1.5 flex items-baseline gap-2"><span className="text-[42px] leading-[.9] font-extrabold tracking-[-.03em]">{capacity}</span><span className="font-mono text-[11px] tracking-[.1em] text-[var(--muted)] uppercase">Plasser</span></div>
        <h3 className="mt-2.5 mb-3.5 text-[30px] leading-[1.05] font-extrabold tracking-[-.02em]">{title}</h3>
        <p className="mt-0 mb-[18px] text-[15px] leading-[1.6] text-[var(--ink-soft)]">{description}</p>
        <div className="mb-[18px] flex flex-wrap gap-2">{features.map((feature) => <span key={feature.label} className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--bg-soft)] px-2.5 py-1.5 text-[12px] font-medium text-[var(--ink-soft)]"><i className={`${feature.icon} text-[14px]`} />{feature.label}</span>)}</div>
      </div>
    </article>
  );
}

function MeetingRoom({ accent, image, alt, capacity, title, description }: {
  accent: string; image: string; alt: string; capacity: string; title: React.ReactNode; description: string;
}) {
  return (
    <article style={{ "--accent": accent } as React.CSSProperties} className="group flex flex-col overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--card)] [transition:transform_.25s,border-color_.2s] hover:[transform:translateY(-3px)] hover:border-[var(--accent)]">
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-[color-mix(in_oklab,var(--accent)_14%,var(--bg-soft))]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="absolute inset-0 block h-full w-full object-cover [transition:transform_.5s_ease] group-hover:[transform:scale(1.05)]" width="1920" height="1280" loading="lazy" decoding="async" src={image} alt={alt} />
      </div>
      <div className="flex flex-1 flex-col p-[22px]">
        <div className="mb-1.5 flex items-baseline gap-2"><span className="text-[42px] leading-[.9] font-extrabold tracking-[-.03em] text-[var(--accent)]">{capacity}</span><span className="font-mono text-[11px] tracking-[.1em] text-[var(--muted)] uppercase">Plasser</span></div>
        <h3 className="mt-2.5 mb-1.5 text-[19px] font-bold tracking-[-.01em]">{title}</h3>
        <p className="mt-0 mb-3 flex-1 text-[13.5px] leading-[1.5] text-[var(--ink-soft)]">{description}</p>
        <div className="flex flex-wrap gap-1.5">{["Flatskjerm", "Lydplanke", "Stoler & bord"].map((item) => <span key={item} className="rounded-md bg-[var(--bg-soft)] px-[9px] py-[5px] font-mono text-[10px] tracking-[.08em] text-[var(--ink-soft)] uppercase">{item}</span>)}</div>
      </div>
    </article>
  );
}

function SmallRoom({ image, alt, title, children, features, href }: {
  image: string; alt: string; title: string; children: React.ReactNode; features: Feature[]; href?: string;
}) {
  const content = <>
    <div className="relative aspect-[16/11] overflow-hidden bg-[var(--bg-soft)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="block h-full w-full object-cover [transition:transform_.5s_ease] group-hover:[transform:scale(1.05)]" width="2200" height="1650" loading="lazy" decoding="async" src={image} alt={alt} />
      {href && <span aria-hidden="true" className="absolute top-3.5 right-3.5 z-[2] rounded-full bg-[var(--ink)] px-[15px] py-[9px] text-[12.5px] leading-none font-semibold whitespace-nowrap text-white">Utforsk</span>}
    </div>
    <div className="flex flex-1 flex-col gap-3 px-[26px] pt-6 pb-[26px]">
      <h3 className="m-0 text-[21px] font-bold tracking-[-.015em]">{title}</h3>
      <p className="m-0 text-[14.5px] leading-[1.58] text-[var(--ink-soft)]">{children}</p>
      <div className="mt-auto flex flex-wrap gap-[7px]">{features.map((feature) => <span key={feature.label} className="inline-flex items-center gap-1.5 rounded-[7px] border border-[var(--line)] bg-[var(--bg-soft)] px-2.5 py-[5px] text-[12px] text-[var(--ink-soft)]"><i className={`${feature.icon} text-[14px] text-[var(--muted)]`} />{feature.label}</span>)}</div>
    </div>
  </>;
  const classes = "group flex flex-col overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--card)] text-inherit no-underline [transition:transform_.25s,box-shadow_.25s,border-color_.2s] hover:[transform:translateY(-4px)] hover:border-[var(--ink)] hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,.18)]";
  return href ? <Link className={classes} href={href}>{content}</Link> : <article className={classes}>{content}</article>;
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#FBF7F0] font-sans text-[#1A1A1A] [scroll-behavior:smooth] [--bg-soft:#F4EFE5] [--bg:#FBF7F0] [--blue:#2E86C1] [--card:#fff] [--gruva-green:#3D4F47] [--ink-soft:#555] [--ink:#1A1A1A] [--line:#E9E2D3] [--muted:#8a8a8a] [--nav-accent:#E85A5A] [--orange:#E58A3A] [--yellow:#FDC82F]">
      <link rel="preload" as="image" href="/assets/fram-isometric.webp" fetchPriority="high" />
      <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />
      <SiteHeader currentPath="/booking" caretFontFamily={'Poppins, "Poppins Fallback", sans-serif'} />

      <header className="border-b border-[var(--line)] py-[66px] pb-[76px] max-[760px]:py-11 max-[760px]:pb-[52px]">
        <div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
          <div className="grid grid-cols-[1.15fr_.85fr] items-center gap-14 max-[760px]:grid-cols-1 max-[760px]:gap-8">
            <div>
              <h1 className="mt-0 mb-[26px] text-[clamp(40px,4.8vw,66px)] leading-[1.02] font-extrabold tracking-[-.03em]">Book et rom på FRAM.</h1>
              <p className="mt-0 mb-[34px] max-w-[520px] text-[19px] leading-[1.6] text-[var(--ink-soft)]">Lokalene våre brukes til alt fra møter og workshops til foredrag, middager og releasefester — alt som bidrar til læring, samarbeid og nyskaping.</p>
              <div className="flex flex-wrap gap-3">
                <a href="#book" className="inline-flex items-center gap-[9px] rounded-full bg-[var(--ink)] px-6 py-3.5 text-[15px] font-semibold text-white no-underline [transition:transform_.2s,background_.2s,border-color_.2s,color_.2s] hover:[transform:translateY(-2px)] hover:bg-[var(--blue)]">Slik booker du <i className="ph ph-arrow-right" /></a>
                <a data-eml="" className="inline-flex items-center gap-[9px] rounded-full border border-[var(--line)] px-6 py-3.5 text-[15px] font-semibold text-[var(--ink)] no-underline [transition:transform_.2s,background_.2s,border-color_.2s,color_.2s] hover:[transform:translateY(-2px)] hover:border-[var(--ink)]">framntnu (at) gmail (dot) com</a>
              </div>
            </div>
            <figure className="m-0 max-w-[440px] justify-self-end max-[760px]:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="block h-auto w-full" width="1320" height="1408" decoding="async" src="/assets/fram-isometric.webp" alt="Isometrisk illustrasjon av FRAMs lokaler" />
            </figure>
          </div>
        </div>
      </header>

      <section id="lokaler" className="py-[92px] max-[760px]:py-[62px]">
        <div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
          <div className="mb-[46px] max-w-[680px] max-[760px]:mb-8"><h2 className="m-0 text-[clamp(34px,3.6vw,54px)] leading-[1.04] font-extrabold tracking-[-.025em]">Lokalene våre.</h2></div>

          <div className="relative mb-6 overflow-hidden rounded-[28px] bg-[var(--gruva-green)] p-14 text-[#F4EFE5] before:pointer-events-none before:absolute before:-top-20 before:-right-20 before:h-[380px] before:w-[380px] before:rounded-full before:bg-[radial-gradient(circle_at_center,rgba(229,138,58,.18),transparent_70%)] max-[760px]:px-6 max-[760px]:py-8">
            <div className="relative z-[1] grid grid-cols-[1.1fr_.9fr] items-center gap-12 max-[760px]:[grid-template-columns:1fr]">
              <div>
                <div className="mb-7 flex items-center gap-[18px] border-b border-white/12 pb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="h-9 w-auto" width="6000" height="1120" loading="lazy" decoding="async" src="/assets/gruva-logo-orange.webp" alt="Gruva logo" />
                </div>
                <h3 className="mt-0 mb-5 text-[64px] leading-[.95] font-extrabold tracking-[-.03em] text-white max-[760px]:text-[38px]">Skreddersydd<br />for <span className="text-[var(--orange)]">store ideer.</span></h3>
                <p className="mt-0 mb-[18px] max-w-[480px] text-[17px] leading-[1.65] text-white/78">Gruva har kapasitet til 200 personer og brukes til alt fra workshops og pitchekvelder til nettverksarrangementer og konkurranser. Mellom arrangementene er lokalet en åpen møteplass for studenter og hjertet i innovasjonsmiljøet ved NTNU.</p>
                <div className="mt-7 mb-6 grid [grid-template-columns:repeat(3,1fr)] gap-3.5 max-[760px]:gap-2">
                  {[["200", "Kapasitet", true], ["120+", "Arrangementer årlig", false], ["Åpen", "Hverdager", false]].map(([number, label, orange]) => <div key={String(label)} className="rounded-[14px] border border-white/10 bg-white/6 p-[18px] max-[760px]:p-3"><div className={`text-[34px] leading-none font-extrabold tracking-[-.02em] max-[760px]:text-2xl ${orange ? "text-[var(--orange)]" : "text-white"}`}>{number}</div><div className="mt-2 font-mono text-[10px] tracking-[.1em] text-white/55 uppercase">{label}</div></div>)}
                </div>
                <p className="mt-0 mb-3.5 text-[15px] leading-[1.65] text-white/70">Gruva bookes direkte på Gruvas egen nettside.</p>
                <div className="mt-2 flex flex-wrap gap-3"><a href="https://www.gruvantnu.no/" target="_blank" rel="noopener" className="inline-flex items-center gap-2.5 rounded-full bg-[var(--orange)] px-[22px] py-3.5 text-[14px] font-semibold text-white no-underline [transition:transform_.2s] hover:[transform:translateY(-2px)]">Book Gruva på gruvantnu.no ↗</a></div>
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-[18px] shadow-[0_30px_80px_-30px_rgba(0,0,0,.5)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="block h-full w-full object-cover" width="1920" height="1280" loading="lazy" decoding="async" src="/assets/gruva-event.webp" alt="Arrangement i Gruva" />
              </div>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 items-stretch gap-6 max-[760px]:grid-cols-1">
            <LargeRoom image="/assets/scenerommet.avif" alt="Scenerommet" capacity="120" title={<>Scene&shy;rommet.</>} description="En fleksibel arena for arrangementer, små konserter, foredrag og workshops. Utenom arrangementer fungerer det som et åpent arbeidslokale." features={[{icon:"ph ph-armchair",label:"70 sittende"},{icon:"ph ph-microphone-stage",label:"Talerstol"},{icon:"ph ph-speaker-hifi",label:"PA-anlegg"},{icon:"ph ph-sun",label:"Lyssetting"},{icon:"ph ph-projector-screen",label:"Projektor"}]} />
            <LargeRoom image="/assets/fram-fellesrom.webp" alt="Fellesrommet" capacity="~40" title={<>Felles&shy;rommet.</>} description="Åpent for alle studenter og egner seg like godt til skolearbeid som til en kaffe eller lunsjpause. For større arrangementer: avtal med leder i Fram." features={[{icon:"ph ph-coffee",label:"Kaffemaskin"},{icon:"ph ph-ping-pong",label:"Bordtennis"},{icon:"ph ph-fork-knife",label:"Kjøkken & langbord"},{icon:"ph ph-couch",label:"Sofakrok"},{icon:"ph ph-clock",label:"Alltid åpent"}]} />
          </div>

          <div className="mb-6 grid grid-cols-3 gap-5 max-[760px]:grid-cols-1">
            <MeetingRoom accent="#2E86C1" image="/assets/rooms/storemoterom.avif" alt="Store møterom" capacity="16" title="Store møterom." description="Det mest bookede rommet på FRAM. Egner seg godt til større møter, og fungerer også som undervisningsrom for små grupper." />
            <MeetingRoom accent="#E85A5A" image="/assets/rooms/lillemoterom.avif" alt="Lillemøterom" capacity="7" title="Lillemøterom." description="Ligger i hjørnet på FRAM med vinduer ut og en god, intim stemning. Stor flatskjerm gjør det perfekt for tette møter og presentasjoner." />
            <MeetingRoom accent="#FDC82F" image="/assets/Bananrommet.webp" alt="Bananrommet" capacity="12" title={<>Banan&shy;rommet.</>} description="Det gule møterommet — også kjent som bananrommet. Plass til tolv, og en uformell stemning som passer like godt til workshops som til lange teamsamtaler." />
          </div>

          <div className="grid grid-cols-2 gap-[22px] max-[760px]:grid-cols-1">
            <SmallRoom image="/assets/Podcastrommet.webp" alt="Podcastrommet på FRAM" title="Podcastrommet" features={[{icon:"ph ph-microphone",label:"Mikrofoner"},{icon:"ph ph-faders",label:"Rodecaster"},{icon:"ph ph-lamp",label:"Belysning"},{icon:"ph ph-couch",label:"Sofa"},{icon:"ph ph-headphones",label:"Hodetelefoner"}]}>Fullt utstyrt for podkast, intervju og lydinnhold. Ta kontakt med oss på <a data-eml="" className="font-semibold text-[var(--ink)]">framntnu (at) gmail (dot) com</a> så finner vi et podkastrom som passer til ditt bruk.</SmallRoom>
            <SmallRoom href="/idegarasjen" image="/assets/Idegarasjen.webp" alt="Idégarasjen — studentenes innovasjonsverksted" title="Idégarasjen" features={[{icon:"ph ph-cube",label:"3D-printere"},{icon:"ph ph-scissors",label:"Laserkutter"},{icon:"ph ph-wrench",label:"Loddestasjoner"},{icon:"ph ph-printer",label:"Storformatprinter"},{icon:"ph ph-hammer",label:"Håndverktøy"},{icon:"ph ph-plugs-connected",label:"Elverktøy"}]}>Studentenes åpne innovasjonsverksted — med 3D-printere, laserkutter, loddestasjoner og alt du trenger til prototyping.</SmallRoom>
          </div>
        </div>
      </section>

      <section id="book" className="py-[92px] max-[760px]:py-[62px]">
        <div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
          <div className="relative overflow-hidden rounded-[28px] bg-[var(--ink)] p-14 text-white before:pointer-events-none before:absolute before:-top-[90px] before:-right-[90px] before:h-[380px] before:w-[380px] before:rounded-full before:bg-[radial-gradient(circle,rgba(253,200,47,.16),transparent_70%)] max-[760px]:px-[26px] max-[760px]:py-[34px]">
            <div className="relative z-[1]">
              <h2 className="mt-0 mb-3.5 text-[clamp(30px,3vw,46px)] leading-[1.04] font-extrabold tracking-[-.02em] text-white">Slik booker <span className="text-[var(--yellow)]">du.</span></h2>
              <p className="mt-0 mb-[34px] max-w-[540px] text-base leading-[1.6] text-white/74">De fleste rommene bookes via FRAM. Gruva har sin egen booking på gruvantnu.no.</p>
              <div className="mb-[22px] grid grid-cols-2 gap-[18px] max-[760px]:grid-cols-1 max-[760px]:gap-3.5">
                <div className="rounded-[22px] border border-white/12 bg-white/6 px-8 py-[30px]"><h3 className="mt-0 mb-2.5 text-[19px] font-bold tracking-[-.01em] text-white">Medlemsorganisasjon</h3><p className="m-0 text-[14.5px] leading-[1.62] text-white/80">Hør med din nærmeste leder hvordan du booker i kalenderen, eller kontakt <a className="font-semibold text-[var(--yellow)]" data-eml="">framntnu (at) gmail (dot) com</a> for interne bookinger.</p></div>
                <div className="rounded-[22px] border border-white/12 bg-white/6 px-8 py-[30px]"><h3 className="mt-0 mb-2.5 text-[19px] font-bold tracking-[-.01em] text-white">Ekstern</h3><p className="m-0 text-[14.5px] leading-[1.62] text-white/80">Send oss en e-post på <a className="font-semibold text-[var(--yellow)]" data-eml="">framntnu (at) gmail (dot) com</a>, så finner vi et rom og en tid som passer.</p></div>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-[rgba(253,200,47,.25)] bg-[rgba(253,200,47,.1)] px-6 py-4 text-sm leading-[1.5] text-white/85 max-[760px]:items-start max-[760px]:rounded-2xl"><span className="mt-[6px] h-2 w-2 flex-none rounded-full bg-[var(--yellow)] shadow-[0_0_0_4px_rgba(253,200,47,.2)]" /><span>Vi jobber med et nytt bookingsystem som skal gjøre det enklere for alle å booke lokalene våre.</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="kommer" className="py-[92px] max-[760px]:py-[62px]">
        <div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
          <div className="mb-[46px] max-w-[680px] max-[760px]:mb-8"><h2 className="mt-0 mb-4 text-[clamp(34px,3.6vw,54px)] leading-[1.04] font-extrabold tracking-[-.025em]">Kommer snart.</h2><p className="m-0 text-[17px] leading-[1.6] text-[var(--ink-soft)]">FRAM flytter snart ned til det nye Økonomi- og innovasjonsbygget på Hesthagen — med oppgraderte lokaler og helt nye rom.</p></div>
          <div className="grid grid-cols-[1.15fr_.85fr] items-stretch gap-6 max-[760px]:grid-cols-1">
            <div className="relative min-h-[360px] overflow-hidden rounded-[28px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="absolute inset-0 block h-full w-full object-cover" width="1920" height="1080" loading="lazy" decoding="async" src="/assets/gruva-concept.webp" alt="Konsept for nye Gruva på Hesthagen" />
              <div className="absolute inset-x-0 bottom-0 z-[1] bg-[linear-gradient(to_top,rgba(8,6,3,.82),rgba(8,6,3,.2)_70%,transparent)] px-[34px] py-[30px] text-white"><h3 className="mt-0 mb-2 text-2xl font-extrabold tracking-[-.02em] text-white">Nye Gruva på Hesthagen</h3><p className="m-0 max-w-[420px] text-[14.5px] leading-[1.55] text-white/82">Gruva og resten av FRAMs lokaler flytter til det nye bygget. Slik kan nye Gruva bli.</p></div>
            </div>
            <div className="flex flex-col rounded-[28px] border border-[var(--line)] bg-[var(--bg-soft)] px-[38px] py-10 max-[760px]:px-[26px] max-[760px]:py-8">
              <div className="mb-[18px] inline-flex self-start items-center gap-2 rounded-full bg-[var(--ink)] px-[13px] py-1.5 font-mono text-[10px] tracking-[.12em] text-white uppercase"><span className="h-1.5 w-1.5 rounded-full bg-[var(--orange)] shadow-[0_0_8px_var(--orange)]" />Kommer snart</div>
              <h3 className="mt-0 mb-3 text-[28px] font-extrabold tracking-[-.02em]">Mediarom</h3>
              <p className="mt-0 mb-auto max-w-[380px] text-[15px] leading-[1.62] text-[var(--ink-soft)]">Et eget rom for podkast-, video- og innholdsproduksjon — i det nye bygget på Hesthagen.</p>
              <div className="mt-7 flex items-baseline gap-2.5 border-t border-[var(--line)] pt-[22px]"><span className="text-[30px] font-extrabold tracking-[-.02em]">2027/28</span><span className="font-mono text-[10px] tracking-[.12em] text-[var(--muted)] uppercase">Ferdig</span></div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter mobileExtraBottomPadding />
    </div>
  );
}
