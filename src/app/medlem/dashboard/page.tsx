import type { Metadata } from "next";
import Link from "next/link";

// Under arbeid — skal ikke indekseres før medlemsområdet er klart.
export const metadata: Metadata = {
  title: "Medlemsområde — FRAM NTNU",
  description: "Administrer organisasjonen deres på FRAM NTNU.",
  robots: { index: false, follow: false },
};

// TODO(auth): dette er den innloggede siden. Når auth er på plass må ruten
// beskyttes — er brukeren ikke innlogget skal den redirecte til /medlem/login
// (server-side guard i en layout eller middleware). Profilen under er hardkodet
// placeholder; skal komme fra den innloggede organisasjonens egen oppføring i
// organizations.ts (samme data som vises på /miljoer).
const org = {
  name: "Testorganisasjon",
  category: "AI · Teknologi",
  description:
    "Kort beskrivelse av organisasjonen slik den vises på Miljøene-siden. Dette redigerer dere herfra.",
};
const orgName = org.name;
const orgInitials = orgName
  .split(" ")
  .map((word) => word[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

// Placeholder-kort. Innholdet her avhenger av hva medlemsorganisasjoner faktisk
// skal kunne gjøre — avklares som produktbeslutning. Foreløpig bare skjelett.
const cards = [
  {
    icon: "ph-buildings",
    title: "Organisasjonsprofil",
    body: "Rediger informasjonen som vises om organisasjonen deres på framntnu.no.",
  },
  {
    icon: "ph-users-three",
    title: "Kontaktpersoner",
    body: "Hold oversikt over hvem som representerer organisasjonen.",
  },
  {
    icon: "ph-calendar-dots",
    title: "Arrangementer",
    body: "Se og meld på arrangementer og aktiviteter på FRAM.",
  },
] as const;

export default function MemberDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F0] font-sans text-[#1A1A1A] [--bg-soft:#F4EFE5] [--bg:#FBF7F0] [--blue:#2E86C1] [--card:#fff] [--ink-soft:#555] [--ink:#1A1A1A] [--line:#E9E2D3] [--muted:#8a8a8a] [--nav-accent:#E85A5A] [--orange:#E58A3A] [--yellow:#FDC82F]">
      <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />

      {/* Medlemsområde-topbar — egen chrome, ikke den offentlige site-headeren. */}
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 max-[520px]:px-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center no-underline" aria-label="FRAM NTNU">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img width="400" height="142" decoding="async" src="/assets/fram-logo.webp" alt="FRAM NTNU" className="block h-[30px] w-auto" />
            </Link>
            <span className="hidden font-mono text-[10px] tracking-[.12em] text-[var(--muted)] uppercase max-[520px]:hidden sm:inline">
              Medlemsområde
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[14px] font-semibold max-[520px]:hidden">{orgName}</span>
            {/* TODO(auth): ekte utlogging (avslutt sesjon), ikke bare en lenke. */}
            <Link
              href="/medlem/login"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-[14px] font-semibold text-[var(--ink)] no-underline [transition:border-color_.2s,transform_.2s] hover:-translate-y-px hover:border-[var(--ink)]"
            >
              <i className="ph ph-sign-out" aria-hidden="true" />
              Logg ut
            </Link>
          </div>
        </div>
      </header>

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
                <span className="mb-1.5 inline-block font-mono text-[10px] tracking-[.12em] text-[var(--muted)] uppercase">
                  {org.category}
                </span>
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
                {/* TODO: rediger-side for profilen (skriver til organizations.ts / CMS). */}
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 text-[14px] font-semibold text-white [transition:transform_.2s,background_.2s] hover:-translate-y-px hover:bg-[var(--blue)]"
                >
                  <i className="ph ph-pencil-simple" aria-hidden="true" />
                  Rediger profil
                </button>
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
        </section>

        <div className="grid grid-cols-3 gap-5 max-[820px]:grid-cols-2 max-[560px]:grid-cols-1">
          {cards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col rounded-[22px] border border-[var(--line)] bg-[var(--card)] p-7 shadow-[0_1px_2px_rgba(0,0,0,.04)] max-[560px]:p-6"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[14px] bg-[var(--bg-soft)] text-[22px] text-[var(--ink)]">
                <i className={`ph ${card.icon}`} aria-hidden="true" />
              </div>
              <h2 className="mt-0 mb-2 text-[19px] font-extrabold tracking-[-.01em]">{card.title}</h2>
              <p className="mt-0 mb-5 text-[14.5px] leading-[1.6] text-[var(--ink-soft)]">{card.body}</p>
              <span className="mt-auto inline-flex self-start items-center gap-2 rounded-full bg-[var(--bg-soft)] px-[13px] py-1.5 font-mono text-[10px] tracking-[.12em] text-[var(--muted)] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--orange)]" />
                Kommer snart
              </span>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
