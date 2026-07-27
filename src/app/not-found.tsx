import { BackButton } from "@/components/back-button";
import { OrigamiPlane } from "@/components/origami-plane";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — FRAM NTNU",
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans text-[#2A2A2A] [--bg-soft:#F2EDE3] [--bg:#FAF7F2] [--card:#fff] [--ink-soft:#555] [--ink:#2A2A2A] [--line:#E6E0D5] [--nav-accent:#2E86C1]">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <OrigamiPlane className="top-[9%] left-[4%] w-[165px]" rotation="-12deg" delay="-.4s" colors={["#6FB2E0", "#2E86C1", "#1E5C86"]} />
        <OrigamiPlane className="top-[40%] left-[8%] w-[150px]" rotation="14deg" delay="-3.1s" colors={["#FFD968", "#FDC82F", "#E0A300"]} />
        <OrigamiPlane className="bottom-[9%] left-[5%] w-[158px]" rotation="200deg" delay="-5.8s" colors={["#6FD9C0", "#3FC4A3", "#2A9A7F"]} />
        <OrigamiPlane className="top-[12%] right-[5%] w-[170px]" rotation="168deg" delay="-1.6s" colors={["#F08A8A", "#E85A5A", "#C13B3B"]} />
        <OrigamiPlane className="right-[7%] bottom-[13%] w-[160px]" rotation="-22deg" delay="-4.3s" colors={["#FFD968", "#FDC82F", "#E0A300"]} />
      </div>
      <div className="relative z-[1]"><SiteHeader /></div>
      <main className="relative z-[1] flex min-h-[calc(100vh-82px)] items-center justify-center px-12 py-20">
        <div className="flex max-w-[560px] flex-col items-center text-center">
          <div className="mb-9 inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-[var(--card)] px-[18px] py-2 text-xs leading-[normal] font-medium text-[var(--ink-soft)]">Side ikke funnet</div>
          <div className="mb-7 text-[clamp(120px,18vw,220px)] leading-[.85] font-black tracking-[-.05em]">
            <span className="text-[#FDC82F]">4</span><span className="text-[#2E86C1]">0</span><span className="text-[#E85A5A]">4</span>
          </div>
          <h1 className="m-0 mb-3.5 text-[clamp(22px,3vw,32px)] leading-[normal] font-bold tracking-[-.02em]">Denne ideen skalerte ikke helt.</h1>
          <p className="m-0 mb-12 text-[15px] leading-[1.65] text-[var(--ink-soft)]">MVP-en krasjet, traction uteble og runwayen tok slutt.</p>
          <div className="mb-10 h-px w-full bg-[var(--line)]" />
          <div className="mb-4 font-mono text-xs tracking-[.12em] text-[#8A8A8A] uppercase">Pivot?</div>
          <BackButton />
          <Link href="/" className="text-sm leading-[normal] text-[#8A8A8A] no-underline transition-colors hover:text-[var(--ink)]">→ eller ta meg til noe som funker</Link>
        </div>
      </main>
    </div>
  );
}
