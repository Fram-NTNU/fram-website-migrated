import type { Metadata } from "next";
import { OrigamiDecoration } from "@/components/origami-decoration";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Stillinger — FRAM NTNU",
  description: "Ledige stillinger og verv i FRAM NTNU. Bli med og form innovasjonsmiljøet ved NTNU — vi søker studenter innen teknologi, strategi og design.",
  alternates: { canonical: "https://www.framntnu.no/stillinger" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "FRAM NTNU",
    title: "Stillinger — FRAM NTNU",
    description: "Bli med og form fremtidens innovasjonsmiljø ved NTNU. Vi søker studenter som brenner for teknologi, strategi, design og samarbeid.",
    url: "https://www.framntnu.no/stillinger",
    images: [{ url: "/assets/og-fram.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stillinger — FRAM NTNU",
    description: "Bli med og form fremtidens innovasjonsmiljø ved NTNU. Vi søker studenter som brenner for teknologi, strategi, design og samarbeid.",
    images: ["/assets/og-fram.png"],
  },
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Hjem", item: "https://www.framntnu.no/" },
    { "@type": "ListItem", position: 2, name: "Stillinger", item: "https://www.framntnu.no/stillinger" },
  ],
};

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FRAM NTNU",
  url: "https://www.framntnu.no",
  logo: "https://www.framntnu.no/assets/og-fram.png",
  description: "FRAM NTNU er NTNUs senter for studentinnovasjon — et fellesskap for studenter som vil skape noe.",
  sameAs: ["https://www.instagram.com/framntnu/", "https://www.facebook.com/framntnu", "https://www.linkedin.com/company/framntnu/"],
};

export default function StillingerPage() {
  return (
    <div className="min-h-screen bg-[#FBF7F0] font-sans text-[#1A1A1A] [--bg-soft:#F4EFE5] [--bg:#FBF7F0] [--blue:#2E86C1] [--card:#fff] [--ink-soft:#555] [--ink:#1A1A1A] [--line:#E9E2D3] [--muted:#8a8a8a] [--nav-accent:#E85A5A]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />
      <SiteHeader caretFontFamily={'Poppins, "Poppins Fallback", sans-serif'} />

      <header className="relative overflow-hidden border-b border-[var(--line)] pt-20 pb-[72px] max-[560px]:pt-12 max-[560px]:pb-11">
        <OrigamiDecoration className="top-6 -left-[54px]" color="#FDC82F" size="160px" rotation="-14deg" opacity={0.4} />
        <OrigamiDecoration className="top-[38%] left-[5%]" color="#E85A5A" size="80px" rotation="18deg" opacity={0.3} />
        <OrigamiDecoration className="top-[30px] right-[8%]" color="#2E86C1" size="108px" rotation="22deg" opacity={0.32} />
        <OrigamiDecoration className="-right-[50px] -bottom-[42px]" color="#3FC4A3" size="134px" rotation="34deg" opacity={0.38} />
        <OrigamiDecoration className="-bottom-[26px] left-[16%]" color="#FDC82F" size="90px" rotation="-28deg" opacity={0.3} />
        <div className="relative z-[1] mx-auto max-w-[1360px] px-12 text-center max-[900px]:px-5 max-[520px]:px-4">
          <h1 className="m-0 mx-auto mb-7 max-w-[20ch] text-[clamp(40px,5vw,76px)] leading-[1.02] font-extrabold tracking-[-.03em]">Vil du bli med i Fram?</h1>
          <p className="m-0 mx-auto max-w-[640px] text-[21px] leading-[1.55] text-[var(--ink-soft)]">Enten du brenner for teknologi, strategi, design, samarbeid – eller bare elsker å få ting til å skje – har vi en plass til deg.</p>
        </div>
      </header>

      <section className="py-[84px] max-[560px]:py-14">
        <div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
          <h2 className="m-0 mb-7 text-[clamp(28px,3vw,42px)] leading-[1.05] font-extrabold tracking-[-.02em]">Ledige stillinger</h2>
          <div className="max-w-[680px] rounded-2xl border border-[var(--line)] bg-[var(--card)] px-[38px] py-9 max-[560px]:px-6 max-[560px]:py-[26px]">
            <h3 className="m-0 mb-2.5 text-xl leading-[normal] font-bold tracking-[-.01em]">Ingen ledige stillinger akkurat nå</h3>
            <p className="m-0 text-base leading-[1.65] text-[var(--ink-soft)]">Vi har ingen utlysninger ute for øyeblikket, men det dukker stadig opp nye muligheter. Følg oss på Instagram eller ta kontakt – vi hører gjerne fra deg.</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
