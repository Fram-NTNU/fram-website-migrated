import type { Metadata } from "next";
import Link from "next/link";
import { MemberLoginForm } from "@/components/member-login-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

// Under arbeid — skal ikke indekseres eller dukke opp i søk før den er klar.
export const metadata: Metadata = {
  title: "Logg inn — FRAM NTNU",
  description: "Innlogging for medlemsorganisasjoner på FRAM NTNU.",
  robots: { index: false, follow: false },
};

export default function MemberLoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F0] font-sans text-[#1A1A1A] [--bg-soft:#F4EFE5] [--bg:#FBF7F0] [--blue:#2E86C1] [--card:#fff] [--ink-soft:#555] [--ink:#1A1A1A] [--line:#E9E2D3] [--muted:#8a8a8a] [--nav-accent:#E85A5A] [--orange:#E58A3A] [--yellow:#FDC82F]">
      <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
      <SiteHeader currentPath="/medlem/login" caretFontFamily={'Poppins, "Poppins Fallback", sans-serif'} />

      <main className="flex flex-1 items-center justify-center px-5 py-16 max-[520px]:px-4">
        <div className="w-full max-w-[440px]">
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-[13px] py-1.5 font-mono text-[10px] tracking-[.12em] text-white uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--orange)] shadow-[0_0_8px_var(--orange)]" />
              For medlemsorganisasjoner
            </span>
          </div>

          <div className="rounded-[28px] border border-[var(--line)] bg-[var(--card)] px-9 py-10 shadow-[0_1px_2px_rgba(0,0,0,.04)] max-[520px]:px-6 max-[520px]:py-8">
            <h1 className="mt-0 mb-2 text-center text-[30px] font-extrabold tracking-[-.02em]">
              Logg inn
            </h1>
            <p className="mx-auto mt-0 mb-8 max-w-[340px] text-center text-[15px] leading-[1.6] text-[var(--ink-soft)]">
              Logg inn for å administrere organisasjonen deres på FRAM.
            </p>

            <MemberLoginForm />
          </div>

          <p className="mt-6 text-center text-[13.5px] leading-[1.6] text-[var(--ink-soft)]">
            Er dere ikke medlem ennå?{" "}
            {/* TODO: lenke til søknad/kontakt for nye medlemsorganisasjoner */}
            <Link href="/miljoer" className="font-semibold text-[var(--blue)] no-underline hover:underline">
              Se hvordan dere blir med
            </Link>
          </p>
        </div>
      </main>

      <SiteFooter mobileExtraBottomPadding />
    </div>
  );
}
