import type { Metadata } from "next";
import Link from "next/link";
import { MemberRecruitingToggle } from "@/components/member-recruiting-toggle";
import { MemberTopbar } from "@/components/member-topbar";
import { placeholderProfile } from "@/lib/member-profile";

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

// Seksjonene i medlemsplattformen. Hver er foreløpig et skjelett — bygges ut én
// og én. `href` gjør kortet klikkbart der målet finnes; ellers «Kommer snart».
const cards = [
  {
    icon: "ph-address-book",
    title: "Kontaktpersoner & verv",
    body: "Hold oversikt over leder, nestleder, IT-ansvarlig og andre verv.",
  },
  {
    icon: "ph-users-three",
    title: "Medlemstall",
    body: "Rapporter hvor mange medlemmer organisasjonen har.",
  },
  {
    icon: "ph-calendar-plus",
    title: "Arrangementer",
    body: "Publiser arrangementene deres på FRAMs arrangementsside.",
  },
  {
    icon: "ph-door-open",
    title: "Book lokaler",
    body: "Book Gruva, Scenerommet og møterom for aktivitetene deres.",
    href: "/booking",
  },
  {
    icon: "ph-books",
    title: "Malbibliotek",
    body: "Delte maler og oppskrifter: sponsoravtale, årsmøte, HMS, budsjett og mer.",
  },
  {
    icon: "ph-handshake",
    title: "Sponsorregister",
    body: "Delt oversikt over hvem som har avtale med hvem — unngå dobbeltkontakt.",
  },
] as const;

export default function MemberDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F0] font-sans text-[#1A1A1A] [--bg-soft:#F4EFE5] [--bg:#FBF7F0] [--blue:#2E86C1] [--card:#fff] [--ink-soft:#555] [--ink:#1A1A1A] [--line:#E9E2D3] [--muted:#8a8a8a] [--nav-accent:#E85A5A] [--orange:#E58A3A] [--yellow:#FDC82F]">
      <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />

      <MemberTopbar orgName={orgName} />

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-12 max-[520px]:px-4">
        <div className="mb-10">
          <h1 className="mt-0 mb-2 text-[clamp(28px,4vw,40px)] leading-[1.05] font-extrabold tracking-[-.02em]">
            Hei, {orgName} 👋
          </h1>
          <p className="mt-0 mb-0 max-w-[560px] text-[16px] leading-[1.6] text-[var(--ink-soft)]">
            Velkommen til medlemsområdet. Herfra administrerer dere organisasjonens tilstedeværelse på FRAM.
          </p>
        </div>

        {/* Profil-forhåndsvisning — speiler hvordan organisasjonen ser ut på
            /miljoer, grunnet i samme datamodell (organizations.ts). */}
        <section className="mb-10 overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--card)] shadow-[0_1px_2px_rgba(0,0,0,.04)]">
          <div className="grid grid-cols-[1.1fr_.9fr] max-[720px]:grid-cols-1">
            <div className="flex items-center gap-5 border-r border-[var(--line)] p-8 max-[720px]:border-r-0 max-[720px]:border-b max-[560px]:p-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[18px] bg-[var(--bg-soft)] text-[22px] font-extrabold tracking-tight text-[var(--ink)]">
                {orgInitials}
              </div>
              <div className="min-w-0">
                <h2 className="mt-0 mb-1.5 text-[20px] font-extrabold tracking-[-.01em]">{org.name}</h2>
                <p className="m-0 text-[14px] leading-[1.55] text-[var(--ink-soft)]">{org.description}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4 p-8 max-[560px]:p-6">
              <div>
                <h3 className="mt-0 mb-1.5 text-[15px] font-bold">Din offentlige profil</h3>
                <p className="m-0 text-[14px] leading-[1.55] text-[var(--ink-soft)]">
                  Slik vises organisasjonen deres på framntnu.no.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/medlem/dashboard/profil"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 text-[14px] font-semibold text-white no-underline [transition:transform_.2s,background_.2s] hover:-translate-y-px hover:bg-[var(--blue)]"
                >
                  <i className="ph ph-pencil-simple" aria-hidden="true" />
                  Rediger profil
                </Link>
                <Link
                  href="/miljoer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-2.5 text-[14px] font-semibold text-[var(--ink)] no-underline [transition:border-color_.2s,transform_.2s] hover:-translate-y-px hover:border-[var(--ink)]"
                >
                  Se på framntnu.no
                  <i className="ph ph-arrow-up-right" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-[var(--line)] p-6 max-[560px]:p-5">
            <MemberRecruitingToggle />
          </div>
        </section>

        <div className="grid grid-cols-3 gap-5 max-[820px]:grid-cols-2 max-[560px]:grid-cols-1">
          {cards.map((card) => {
            const inner = (
              <>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[14px] bg-[var(--bg-soft)] text-[22px] text-[var(--ink)]">
                  <i className={`ph ${card.icon}`} aria-hidden="true" />
                </div>
                <h2 className="mt-0 mb-2 text-[19px] font-extrabold tracking-[-.01em]">{card.title}</h2>
                <p className="mt-0 mb-5 text-[14.5px] leading-[1.6] text-[var(--ink-soft)]">{card.body}</p>
                {"href" in card ? (
                  <span className="mt-auto inline-flex self-start items-center gap-1.5 text-[13px] font-semibold text-[var(--blue)]">
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
              "flex flex-col rounded-[22px] border border-[var(--line)] bg-[var(--card)] p-7 shadow-[0_1px_2px_rgba(0,0,0,.04)] max-[560px]:p-6";
            return "href" in card ? (
              <Link
                key={card.title}
                href={card.href}
                className={`${cardClass} no-underline text-[var(--ink)] [transition:transform_.2s,border-color_.2s] hover:-translate-y-0.5 hover:border-[var(--ink)]`}
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
