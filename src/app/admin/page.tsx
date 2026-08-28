import type { Metadata } from "next";
import { BookingApprovals } from "@/components/booking-approvals";
import { FramTopbar } from "@/components/fram-topbar";
import {
  bookingsByMonth,
  kpis,
  orgsNeedingFollowup,
  pendingBookings,
  recruitingOrgs,
  roomUtilization,
} from "@/lib/fram-admin";

export const metadata: Metadata = {
  title: "FRAM Administrasjon",
  description: "Adminoversikt for FRAM NTNU — medlemmer, bookinger og statistikk.",
  robots: { index: false, follow: false },
};

const quickActions = [
  { icon: "ph-megaphone-simple", label: "Send kunngjøring" },
  { icon: "ph-buildings", label: "Ny medlemsorganisasjon" },
  { icon: "ph-file-arrow-down", label: "Eksporter rapport" },
];

const maxBookingTotal = Math.max(...bookingsByMonth.map((m) => m.intern + m.ekstern));

export default function FramAdminPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F0] font-sans text-[#1A1A1A] [--bg-soft:#F4EFE5] [--bg:#FBF7F0] [--blue:#2E86C1] [--card:#fff] [--ink-soft:#555] [--ink:#1A1A1A] [--line:#E9E2D3] [--muted:#8a8a8a] [--nav-accent:#E85A5A] [--orange:#E58A3A] [--red:#E85A5A] [--teal:#3CBFAB] [--yellow:#FDC82F]">
      <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
      <FramTopbar />

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-10 max-[520px]:px-4">
        {/* Tittel + hurtighandlinger */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="m-0 mb-2 font-mono text-[11px] font-semibold tracking-[.2em] text-[var(--blue)] uppercase">Oversikt</p>
            <h1 className="mt-0 mb-1 text-[clamp(28px,4vw,40px)] leading-[1.05] font-extrabold tracking-[-.02em]">
              Velkommen, FRAM
            </h1>
            <p className="mt-0 mb-0 text-[15px] text-[var(--ink-soft)]">Status for medlemmer, bookinger og aktivitet.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((a) => (
              <button
                key={a.label}
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2.5 text-[13.5px] font-semibold text-[var(--ink)] [transition:border-color_.2s,transform_.2s] hover:-translate-y-px hover:border-[var(--ink)]"
              >
                <i className={`ph ${a.icon}`} aria-hidden="true" />
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* KPI-er */}
        <div className="mb-6 grid grid-cols-4 gap-4 max-[820px]:grid-cols-2 max-[440px]:grid-cols-1">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-[20px] border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_1px_2px_rgba(0,0,0,.04)]">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-[12px] text-[20px]" style={{ backgroundColor: `${k.tint}1f`, color: k.tint }}>
                <i className={`ph ${k.icon}`} aria-hidden="true" />
              </div>
              <div className="text-[30px] font-extrabold tracking-[-.02em] leading-none">{k.value}</div>
              <div className="mt-1.5 text-[13.5px] font-semibold text-[var(--ink)]">{k.label}</div>
              <div className="mt-0.5 text-[12px] text-[var(--muted)]">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Booking-godkjenning */}
        <div className="mb-6">
          <BookingApprovals bookings={pendingBookings} />
        </div>

        {/* Diagrammer */}
        <div className="mb-6 grid grid-cols-[1.3fr_1fr] gap-6 max-[820px]:grid-cols-1">
          {/* Bookinger siste 6 mnd */}
          <div className="rounded-[22px] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,.04)]">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="m-0 text-[17px] font-extrabold tracking-[-.01em]">Bookinger siste 6 måneder</h2>
              <div className="flex items-center gap-4 text-[11px] text-[var(--ink-soft)]">
                <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[3px] bg-[#2E86C1]" />Interne</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[3px] bg-[#E58A3A]" />Eksterne</span>
              </div>
            </div>
            <div className="flex h-[170px] items-end justify-between gap-3">
              {bookingsByMonth.map((m) => (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-[150px] w-full max-w-[42px] flex-col justify-end gap-0.5">
                    <div className="w-full rounded-t-[5px] bg-[#E58A3A]" style={{ height: `${(m.ekstern / maxBookingTotal) * 150}px` }} title={`${m.ekstern} eksterne`} />
                    <div className="w-full rounded-b-[5px] bg-[#2E86C1]" style={{ height: `${(m.intern / maxBookingTotal) * 150}px` }} title={`${m.intern} interne`} />
                  </div>
                  <span className="font-mono text-[10px] tracking-[.08em] text-[var(--muted)] uppercase">{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Romutnyttelse */}
          <div className="rounded-[22px] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,.04)]">
            <h2 className="mt-0 mb-5 text-[17px] font-extrabold tracking-[-.01em]">Romutnyttelse</h2>
            <div className="flex flex-col gap-4">
              {roomUtilization.map((r) => (
                <div key={r.room}>
                  <div className="mb-1.5 flex items-center justify-between text-[13px]">
                    <span className="font-semibold text-[var(--ink)]">{r.room}</span>
                    <span className="font-mono text-[12px] text-[var(--ink-soft)]">{r.pct}%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--bg-soft)]">
                    <div className="h-full rounded-full bg-[var(--blue)]" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Oppfølging + rekruttering */}
        <div className="grid grid-cols-2 gap-6 max-[720px]:grid-cols-1">
          <div className="rounded-[22px] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,.04)]">
            <h2 className="mt-0 mb-4 flex items-center gap-2 text-[17px] font-extrabold tracking-[-.01em]">
              <i className="ph ph-warning-circle text-[var(--nav-accent)]" aria-hidden="true" />
              Trenger oppfølging
            </h2>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {orgsNeedingFollowup.map((o) => (
                <li key={o.org} className="flex items-center justify-between gap-3 rounded-[14px] border border-[var(--line)] bg-[var(--bg-soft)] px-4 py-3">
                  <div className="min-w-0">
                    <p className="m-0 text-[14px] font-bold">{o.org}</p>
                    <p className="m-0 text-[12.5px] text-[var(--ink-soft)]">{o.reason}</p>
                  </div>
                  <button type="button" className="shrink-0 text-[12.5px] font-semibold text-[var(--blue)] hover:underline">
                    Ta kontakt
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[22px] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,.04)]">
            <h2 className="mt-0 mb-4 flex items-center gap-2 text-[17px] font-extrabold tracking-[-.01em]">
              <i className="ph ph-megaphone text-[var(--orange)]" aria-hidden="true" />
              Søker medlemmer nå
            </h2>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {recruitingOrgs.map((o) => (
                <li key={o.org} className="flex items-center justify-between gap-3 rounded-[14px] border border-[var(--line)] bg-[var(--bg-soft)] px-4 py-3">
                  <p className="m-0 text-[14px] font-bold">{o.org}</p>
                  <span className="shrink-0 font-mono text-[11px] tracking-[.06em] text-[var(--muted)]">til {o.until}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
