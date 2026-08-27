import type { Metadata } from "next";
import Link from "next/link";
import { MemberStatsForm } from "@/components/member-stats-form";
import { MemberTopbar } from "@/components/member-topbar";
import { placeholderProfile } from "@/lib/member-profile";
import { placeholderStats } from "@/lib/member-stats";

// Under arbeid — skal ikke indekseres.
export const metadata: Metadata = {
  title: "Medlemstall — FRAM NTNU",
  description: "Rapporter antall medlemmer i organisasjonen på FRAM NTNU.",
  robots: { index: false, follow: false },
};

// TODO(auth/data): hent den innloggede orgens faktiske tall (og navn) her.
const stats = placeholderStats;

export default function MemberStatsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F0] font-sans text-[#1A1A1A] [--bg-soft:#F4EFE5] [--bg:#FBF7F0] [--blue:#2E86C1] [--card:#fff] [--ink-soft:#555] [--ink:#1A1A1A] [--line:#E9E2D3] [--muted:#8a8a8a] [--nav-accent:#E85A5A] [--orange:#E58A3A] [--yellow:#FDC82F]">
      <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
      <MemberTopbar orgName={placeholderProfile.name} />

      <main className="mx-auto w-full max-w-[640px] flex-1 px-6 py-10 max-[520px]:px-4">
        <Link
          href="/medlem/dashboard"
          className="mb-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--ink-soft)] no-underline hover:text-[var(--ink)]"
        >
          <i className="ph ph-arrow-left" aria-hidden="true" />
          Tilbake til medlemsområdet
        </Link>

        <div className="mb-8">
          <h1 className="mt-0 mb-2 text-[clamp(26px,3.5vw,36px)] leading-[1.05] font-extrabold tracking-[-.02em]">
            Medlemstall
          </h1>
          <p className="mt-0 mb-0 max-w-[520px] text-[15px] leading-[1.6] text-[var(--ink-soft)]">
            Rapporter hvor mange medlemmer organisasjonen har akkurat nå.
          </p>
        </div>

        <MemberStatsForm initial={stats} />
      </main>
    </div>
  );
}
