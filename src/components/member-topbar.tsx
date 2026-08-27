import Link from "next/link";

/**
 * Topplinje for medlemsområdet — delt mellom dashboard og undersider.
 *
 * TODO(auth): `orgName` skal komme fra den innloggede sesjonen, og «Logg ut»
 * skal avslutte sesjonen (ikke bare lenke til login). Når det finnes flere
 * medlemssider bør denne + en auth-guard flyttes til en felles layout.tsx for
 * /medlem-området.
 */
export function MemberTopbar({ orgName }: { orgName: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 max-[520px]:px-4">
        <div className="flex items-center gap-3">
          <Link href="/medlem/dashboard" className="flex items-center no-underline" aria-label="FRAM NTNU — medlemsområde">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img width="400" height="142" decoding="async" src="/assets/fram-logo.webp" alt="FRAM NTNU" className="block h-[30px] w-auto" />
          </Link>
          <span className="hidden font-mono text-[10px] tracking-[.12em] text-[var(--muted)] uppercase sm:inline">
            Medlemsområde
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[14px] font-semibold max-[520px]:hidden">{orgName}</span>
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
  );
}
