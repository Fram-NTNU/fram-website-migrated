import type { Metadata } from "next";
import Link from "next/link";
import { CopyButton } from "@/components/copy-button";
import { MemberTopbar } from "@/components/member-topbar";
import { placeholderProfile } from "@/lib/member-profile";

export const metadata: Metadata = {
  title: "Lenk til FRAM — FRAM NTNU",
  description: "Legg en «Medlem av FRAM NTNU»-lenke på organisasjonens egen nettside.",
  robots: { index: false, follow: false },
};

// Ferdig HTML fra FRAMs lenke-guide. Absolutte URL-er så det virker på orgenes
// egne nettsider.
const badgeHtml = `<a href="https://www.framntnu.no" target="_blank" rel="noopener"
   style="display:inline-flex;align-items:center;gap:12px;padding:10px 16px;border:1px solid #E6E0D5;border-radius:14px;background:#fff;font-family:system-ui,sans-serif;text-decoration:none;box-shadow:0 4px 14px -8px rgba(0,0,0,.25);">
  <img src="https://www.framntnu.no/assets/fram-symbol.webp" alt="FRAM NTNU" width="32" height="32" style="display:block;border:0;">
  <span style="line-height:1.2;">
    <span style="display:block;font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:#8A8A8A;">Medlem av</span>
    <span style="display:block;font-size:15px;font-weight:700;color:#2A2A2A;">FRAM NTNU</span>
  </span>
</a>`;

const textVariants = [
  { html: `Vi er en del av <a href="https://www.framntnu.no">FRAM NTNU – senter for studentinnovasjon</a>.` },
  { html: `Medlem av <a href="https://www.framntnu.no">FRAM – innovasjonsmiljøet ved NTNU</a>.` },
  { html: `<a href="https://www.framntnu.no">FRAM NTNU</a> – paraplyen for studentinnovasjon i Trondheim.` },
  { html: `Tilknyttet <a href="https://www.framntnu.no">FRAM – studentinnovasjon ved NTNU</a>.` },
  { html: `Medlem av <a href="https://www.framntnu.no">FRAM NTNU</a>.` },
  { html: `Del av <a href="https://www.framntnu.no">FRAM</a>.` },
];

export default function LinkToFramPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F0] font-sans text-[#1A1A1A] [--bg-soft:#F4EFE5] [--bg:#FBF7F0] [--blue:#2E86C1] [--card:#fff] [--ink-soft:#555] [--ink:#1A1A1A] [--line:#E9E2D3] [--muted:#8a8a8a] [--nav-accent:#E85A5A] [--orange:#E58A3A] [--teal:#3CBFAB] [--yellow:#FDC82F]">
      <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
      <MemberTopbar orgName={placeholderProfile.name} />

      <main className="mx-auto w-full max-w-[720px] flex-1 px-6 py-10 max-[520px]:px-4">
        <Link
          href="/medlem/dashboard"
          className="mb-8 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--ink-soft)] no-underline hover:text-[var(--ink)]"
        >
          <i className="ph ph-arrow-left" aria-hidden="true" />
          Tilbake til medlemsområdet
        </Link>

        <p className="m-0 mb-3 font-mono text-[11px] font-semibold tracking-[.2em] text-[var(--blue)] uppercase">
          For medlemsorganisasjoner
        </p>
        <h1 className="mt-0 mb-4 text-[clamp(28px,4.5vw,42px)] leading-[1.04] font-extrabold tracking-[-.02em]">
          Lenk til FRAM
        </h1>
        <p className="mt-0 mb-10 max-w-[560px] text-[16px] leading-[1.6] text-[var(--ink-soft)]">
          Dere er en del av FRAM, og en liten lenke tilbake til framntnu.no hjelper søkemotorene å forstå
          hvordan organisasjonene henger sammen — og gir bedre synlighet for hele økosystemet på søk som
          «innovasjon NTNU». Velg én av variantene under. Begge tar under to minutter å legge inn.
        </p>

        {/* Alternativ 1 — Badge */}
        <section className="mb-10 rounded-[22px] border border-[var(--line)] bg-[var(--card)] p-7 shadow-[0_1px_2px_rgba(0,0,0,.04)] max-[560px]:p-5">
          <div className="mb-5 flex items-baseline justify-between gap-3">
            <h2 className="m-0 text-[19px] font-extrabold tracking-[-.01em]">Alternativ 1 — Badge</h2>
            <span className="font-mono text-[10px] tracking-[.12em] text-[var(--muted)] uppercase">Til footer / om oss</span>
          </div>

          <p className="m-0 mb-3 text-[13px] font-semibold text-[var(--ink-soft)]">Slik ser den ut</p>
          <div className="mb-6 flex justify-center rounded-[16px] border border-[var(--line)] bg-[var(--bg-soft)] p-8">
            {/* Live forhåndsvisning (lokalt symbol for at det alltid vises) */}
            <a
              href="https://www.framntnu.no"
              target="_blank"
              rel="noopener"
              style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "10px 16px", border: "1px solid #E6E0D5", borderRadius: 14, background: "#fff", fontFamily: "system-ui,sans-serif", textDecoration: "none", boxShadow: "0 4px 14px -8px rgba(0,0,0,.25)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/fram-symbol.webp" alt="FRAM NTNU" width={32} height={32} style={{ display: "block", border: 0 }} />
              <span style={{ lineHeight: 1.2 }}>
                <span style={{ display: "block", fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: "#8A8A8A" }}>Medlem av</span>
                <span style={{ display: "block", fontSize: 15, fontWeight: 700, color: "#2A2A2A" }}>FRAM NTNU</span>
              </span>
            </a>
          </div>

          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="m-0 text-[13px] font-semibold text-[var(--ink-soft)]">Lim inn denne HTML-en</p>
            <CopyButton text={badgeHtml} />
          </div>
          <pre className="m-0 overflow-x-auto rounded-[12px] border border-[var(--line)] bg-[var(--bg-soft)] p-4 text-[12px] leading-[1.5] text-[var(--ink)]">
            <code>{badgeHtml}</code>
          </pre>
        </section>

        {/* Alternativ 2 — Tekstlenke */}
        <section className="mb-10 rounded-[22px] border border-[var(--line)] bg-[var(--card)] p-7 shadow-[0_1px_2px_rgba(0,0,0,.04)] max-[560px]:p-5">
          <div className="mb-5 flex items-baseline justify-between gap-3">
            <h2 className="m-0 text-[19px] font-extrabold tracking-[-.01em]">Alternativ 2 — Tekstlenke</h2>
            <span className="font-mono text-[10px] tracking-[.12em] text-[var(--muted)] uppercase">Velg én</span>
          </div>
          <p className="m-0 mb-5 text-[14px] leading-[1.6] text-[var(--ink-soft)]">
            En enkel setning i footeren fungerer like godt for SEO. Velg formuleringen som passer dere.
          </p>

          <div className="flex flex-col gap-3">
            {textVariants.map((v) => (
              <div key={v.html} className="flex items-center justify-between gap-4 rounded-[14px] border border-[var(--line)] bg-[var(--bg-soft)] px-4 py-3 max-[520px]:flex-col max-[520px]:items-stretch">
                <span
                  className="text-[14px] leading-[1.5] text-[var(--ink)] [&_a]:font-semibold [&_a]:text-[var(--blue)] [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: v.html }}
                />
                <CopyButton text={v.html} label="Kopiér" className="shrink-0" />
              </div>
            ))}
          </div>
        </section>

        {/* Advarsel + CMS-tips */}
        <div className="mb-5 flex items-start gap-3 rounded-[18px] border border-[color-mix(in_srgb,var(--nav-accent)_35%,var(--line))] bg-[color-mix(in_srgb,var(--nav-accent)_7%,#fff)] px-5 py-4">
          <i className="ph ph-warning mt-0.5 text-[18px] text-[var(--nav-accent)]" aria-hidden="true" />
          <p className="m-0 text-[13.5px] leading-[1.55] text-[var(--ink-soft)]">
            <span className="font-semibold text-[var(--ink)]">Én ting å unngå:</span> ikke legg{" "}
            <code className="rounded bg-[var(--bg-soft)] px-1.5 py-0.5 text-[12.5px]">rel=&quot;nofollow&quot;</code> på lenken —
            da slutter den å gi SEO-effekt.
          </p>
        </div>

        <div className="flex items-start gap-3 rounded-[18px] border border-[var(--line)] bg-[var(--bg-soft)] px-5 py-4">
          <i className="ph ph-info mt-0.5 text-[18px] text-[var(--blue)]" aria-hidden="true" />
          <p className="m-0 text-[13.5px] leading-[1.55] text-[var(--ink-soft)]">
            <span className="font-semibold text-[var(--ink)]">Bruker dere Wix, Squarespace, WordPress e.l.?</span> Da
            trenger dere ikke koden i det hele tatt — skriv teksten, marker ordene som skal være lenke, trykk
            lenke-knappen og lim inn <span className="font-semibold">https://www.framntnu.no</span>. Samme lenke,
            like god effekt. (Vil dere ha badgen, bruk en «Embed»-/«HTML»-blokk — ellers velg heller tekstlenke.)
          </p>
        </div>
      </main>
    </div>
  );
}
