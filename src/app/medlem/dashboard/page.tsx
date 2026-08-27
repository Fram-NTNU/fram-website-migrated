import type { Metadata } from "next";
import Link from "next/link";
import { MemberRecruitingToggle } from "@/components/member-recruiting-toggle";
import { MemberTopbar } from "@/components/member-topbar";
import { accentHex, placeholderProfile } from "@/lib/member-profile";

// Under arbeid — skal ikke indekseres før medlemsområdet er klart.
export const metadata: Metadata = {
  title: "Medlemsområde — FRAM NTNU",
  description: "Administrer organisasjonen deres på FRAM NTNU.",
  robots: { index: false, follow: false },
};

// TODO(auth): dette er den innloggede siden. Når auth er på plass må ruten
// beskyttes — er brukeren ikke innlogget skal den redirecte til /medlem/login
// (server-side guard i en layout eller middleware). Profilen er placeholder;
// skal komme fra den innloggede organisasjonens egen oppføring.
const org = placeholderProfile;
const orgName = org.name;
const orgInitials = orgName
  .split(" ")
  .map((word) => word[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();
const accent = accentHex[org.accent];

// Seksjonene i medlemsplattformen. Hver er foreløpig et skjelett — bygges ut én
// og én. `href` gjør kortet klikkbart der målet finnes; ellers «Kommer snart».
// `tint` gir hvert kort sin egen ikonfarge for litt liv.
const cards = [
  {
    icon: "ph-address-book",
    title: "Kontaktpersoner",
    body: "Hold oversikt over leder, nestleder, IT-ansvarlig og andre roller.",
    href: "/medlem/dashboard/kontaktpersoner",
    tint: "#2E86C1",
  },
  {
    icon: "ph-users-three",
    title: "Medlemstall",
    body: "Rapporter hvor mange medlemmer organisasjonen har.",
    href: "/medlem/dashboard/medlemstall",
    tint: "#3CBFAB",
  },
  {
    icon: "ph-calendar-plus",
    title: "Arrangementer",
    body: "Publiser arrangementene deres på FRAMs arrangementsside.",
    tint: "#E58A3A",
  },
  {
    icon: "ph-door-open",
    title: "Book lokaler",
    body: "Book Gruva, Scenerommet og møterom for aktivitetene deres.",
    href: "/booking",
    tint: "#E85A5A",
  },
  {
    icon: "ph-books",
    title: "Malbibliotek",
    body: "Delte maler og oppskrifter: sponsoravtale, årsmøte, HMS, budsjett og mer.",
    tint: "#C79A2E",
  },
  {
    icon: "ph-handshake",
    title: "Sponsorregister",
    body: "Delt oversikt over hvem som har avtale med hvem — unngå dobbeltkontakt.",
    tint: "#3CBFAB",
  },
  {
    icon: "ph-book-open-text",
    title: "Guide for medlemmer",
    body: "Alt om medlemskapet: fordeler, forventninger, møteplasser og første steg.",
    href: "/medlem/dashboard/guide",
    tint: "#2E86C1",
  },
  {
    icon: "ph-link",
    title: "Lenk til FRAM",
    body: "Legg en «Medlem av FRAM»-badge eller lenke på deres egen nettside.",
    href: "/medlem/dashboard/lenk-til-fram",
    tint: "#E58A3A",
  },
] as const;

export default function MemberDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F0] font-sans text-[#1A1A1A] [--bg-soft:#F4EFE5] [--bg:#FBF7F0] [--blue:#2E86C1] [--card:#fff] [--ink-soft:#555] [--ink:#1A1A1A] [--line:#E9E2D3] [--muted:#8a8a8a] [--nav-accent:#E85A5A] [--orange:#E58A3A] [--yellow:#FDC82F]">
      <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />

      <MemberTopbar orgName={orgName} />

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-10 max-[520px]:px-4">
        {/* HERO-BANNER — organisasjonens eget bilde som blikkfang. */}
        <section className="relative mb-6 flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[28px] shadow-[0_10px_40px_-16px_rgba(0,0,0,.35)] max-[560px]:min-h-[260px]">
          {/* Lag 1: accent-gradient som fallback/bunn */}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 55%, #1A1A1A))` }}
          />
          {/* Lag 2: hero-bilde */}
          {org.hero && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={org.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
          )}
          {/* Lag 3: mørk gradient for lesbarhet — sterkere i nedre halvdel der teksten sitter */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,4,.30)_0%,rgba(10,8,4,.08)_30%,rgba(10,8,4,.58)_68%,rgba(10,8,4,.93)_100%)]" />
          {/* Lag 3b: venstre-scrim så venstrestilt tekst er lesbar mot lyse motiv */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,8,4,.62)_0%,rgba(10,8,4,.22)_42%,transparent_68%)]" />

          {/* Innhold */}
          <div className="relative z-[1] flex flex-wrap items-end justify-between gap-6 p-9 max-[560px]:p-6">
            <div className="min-w-0">
              <p className="m-0 mb-3 font-mono text-[10px] font-semibold tracking-[.14em] text-white/85 uppercase [text-shadow:0_1px_10px_rgba(0,0,0,.55)]">
                Velkommen tilbake
              </p>
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] border border-white/30 bg-white/95 text-[20px] font-extrabold tracking-tight text-[var(--ink)] shadow-lg max-[560px]:h-12 max-[560px]:w-12">
                  {org.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={org.logo} alt="" className="max-h-9 max-w-10 object-contain" />
                  ) : (
                    orgInitials
                  )}
                </span>
                <h1 className="m-0 text-[clamp(28px,4vw,44px)] leading-[1.02] font-extrabold tracking-[-.02em] text-white [text-shadow:0_2px_16px_rgba(0,0,0,.35)]">
                  {org.name}
                </h1>
              </div>
              <p className="mt-3 mb-0 max-w-[520px] text-[14.5px] leading-[1.55] text-white/85 [text-shadow:0_1px_10px_rgba(0,0,0,.4)] max-[560px]:hidden">
                {org.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/medlem/dashboard/profil"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-[var(--ink)] no-underline shadow-lg [transition:transform_.2s] hover:-translate-y-px"
              >
                <i className="ph ph-pencil-simple" aria-hidden="true" />
                Rediger profil
              </Link>
              <Link
                href="/miljoer"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-[14px] font-semibold text-white no-underline backdrop-blur-sm [transition:background_.2s,transform_.2s] hover:-translate-y-px hover:bg-white/20"
              >
                Se på framntnu.no
                <i className="ph ph-arrow-up-right" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* «Vi søker medlemmer»-bryter */}
        <div className="mb-8 rounded-[22px] border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_1px_2px_rgba(0,0,0,.04)] max-[560px]:p-4">
          <MemberRecruitingToggle />
        </div>

        <h2 className="mb-4 font-mono text-[11px] tracking-[.14em] text-[var(--muted)] uppercase">Administrer</h2>
        <div className="grid grid-cols-3 gap-5 max-[820px]:grid-cols-2 max-[560px]:grid-cols-1">
          {cards.map((card) => {
            const inner = (
              <>
                <div
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[14px] text-[24px]"
                  style={{ backgroundColor: `${card.tint}1f`, color: card.tint }}
                >
                  <i className={`ph ${card.icon}`} aria-hidden="true" />
                </div>
                <h3 className="mt-0 mb-2 text-[19px] font-extrabold tracking-[-.01em]">{card.title}</h3>
                <p className="mt-0 mb-5 text-[14.5px] leading-[1.6] text-[var(--ink-soft)]">{card.body}</p>
                {"href" in card ? (
                  <span
                    className="mt-auto inline-flex self-start items-center gap-1.5 text-[13px] font-semibold"
                    style={{ color: card.tint }}
                  >
                    Åpne <i className="ph ph-arrow-right" aria-hidden="true" />
                  </span>
                ) : (
                  <span className="mt-auto inline-flex self-start items-center gap-2 rounded-full bg-[var(--bg-soft)] px-[13px] py-1.5 font-mono text-[10px] tracking-[.12em] text-[var(--muted)] uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--orange)]" />
                    Kommer snart
                  </span>
                )}
              </>
            );
            const cardClass =
              "group flex flex-col rounded-[22px] border border-[var(--line)] bg-[var(--card)] p-7 shadow-[0_1px_2px_rgba(0,0,0,.04)] max-[560px]:p-6";
            return "href" in card ? (
              <Link
                key={card.title}
                href={card.href}
                className={`${cardClass} no-underline text-[var(--ink)] [transition:transform_.2s,box-shadow_.2s,border-color_.2s] hover:-translate-y-1 hover:border-transparent hover:shadow-[0_16px_36px_-18px_rgba(0,0,0,.4)]`}
              >
                {inner}
              </Link>
            ) : (
              <article key={card.title} className={cardClass}>
                {inner}
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
