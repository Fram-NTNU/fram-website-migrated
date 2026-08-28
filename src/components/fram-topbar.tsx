import Link from "next/link";

/**
 * Topplinje for FRAMs admin-dashboard (back-office).
 * TODO(auth): kun tilgjengelig for FRAM-administrasjonen. `adminName` fra sesjon.
 */
export function FramTopbar({ adminName = "FRAM-administrasjon" }: { adminName?: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 max-[520px]:px-4">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center no-underline" aria-label="FRAM NTNU — administrasjon">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img width="400" height="142" decoding="async" src="/assets/fram-logo.webp" alt="FRAM NTNU" className="block h-[30px] w-auto" />
          </Link>
          <span className="hidden font-mono text-[10px] tracking-[.12em] text-[var(--muted)] uppercase sm:inline">
            Administrasjon
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-[14px] font-semibold sm:inline">{adminName}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--ink)] text-[13px] font-bold text-white">
            F
          </span>
        </div>
      </div>
    </header>
  );
}
