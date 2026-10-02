import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BookingSystem } from "@/components/booking-system";

export const metadata: Metadata = {
  title: "Book rom — FRAM NTNU",
  description: "Book lokaler på FRAM NTNU i Trondheim — Gruva, Scenerommet, Fellesrommet og møterom for student-arrangementer, workshops og møter.",
  alternates: { canonical: "https://www.framntnu.no/booking" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", siteName: "FRAM NTNU", locale: "nb_NO",
    title: "Book rom — FRAM NTNU",
    description: "Book lokaler på FRAM NTNU i Trondheim — Gruva, Scenerommet, Fellesrommet og møterom for student-arrangementer, workshops og møter.",
    url: "https://www.framntnu.no/booking",
    images: [{ url: "/assets/og-fram.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image", title: "Book rom — FRAM NTNU",
    description: "Book lokaler på FRAM NTNU i Trondheim — Gruva, Scenerommet, Fellesrommet og møterom for student-arrangementer, workshops og møter.",
    images: ["/assets/og-fram.png"],
  },
};

const breadcrumbData = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Hjem", item: "https://www.framntnu.no/" },
    { "@type": "ListItem", position: 2, name: "Booking", item: "https://www.framntnu.no/booking" },
  ],
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#FBF7F0] font-sans text-[#1A1A1A] [scroll-behavior:smooth] [--bg-soft:#F4EFE5] [--bg:#FBF7F0] [--blue:#2E86C1] [--card:#fff] [--gruva-green:#3D4F47] [--ink-soft:#555] [--ink:#1A1A1A] [--line:#E9E2D3] [--muted:#8a8a8a] [--nav-accent:#E85A5A] [--orange:#E58A3A] [--yellow:#FDC82F]">
      <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <SiteHeader currentPath="/booking" />
      <main className="booking-page">
        <header className="booking-hero">
          <div className="booking-container booking-hero-grid">
            <div className="booking-hero-intro">
              <h1>Book rom.</h1>
              <p>Velg rom og finn en ledig tid. Book et enkelt møte, hele dagen eller en fast møteserie.</p>
              <div className="booking-hero-actions">
                <Link className="booking-primary-link" href="/booking/lokaler">Utforsk lokaler <i className="ph ph-arrow-right" aria-hidden="true" /></Link>
                <a className="booking-secondary-link" href="mailto:framntnu@gmail.com">Kontakt Fram</a>
              </div>
            </div>
          <aside className="booking-guide" aria-labelledby="booking-guide-title">
            <h2 id="booking-guide-title">Slik fungerer booking</h2>
            <dl>
              <div><dt>Medlemsorganisasjon</dt><dd>Velg organisasjonen din. Deres bookingansvarlige behandler bookingforespørselen.</dd></div>
              <div><dt>Eksterne</dt><dd>Rommene er hovedsakelig for medlemmer. Eksterne kan sende en forespørsel til Fram og få booke dersom det er ledig.</dd></div>
              <div><dt>Bekreftelse på e-post</dt><dd>Tidspunktet reserveres først når forespørselen er godkjent. Da får du en kalenderinvitasjon med tittelen du har valgt.</dd></div>
            </dl>
            <p>Gruva har egen booking på <a href="https://www.gruvantnu.no/" target="_blank" rel="noopener">gruvantnu.no</a>.</p>
          </aside>
          </div>
        </header>
        <div className="booking-container booking-layout" id="book">
          <BookingSystem />
        </div>
      </main>
      <SiteFooter mobileExtraBottomPadding />
    </div>
  );
}
