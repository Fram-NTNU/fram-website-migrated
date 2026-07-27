import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.framntnu.no"),
  icons: {
    icon: [
      { url: "/assets/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/assets/fram-symbol.webp", type: "image/webp" },
    ],
    apple: "/assets/favicon-180.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nb" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <link rel="preload" href="/assets/fonts/poppins-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/poppins-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/poppins-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {children}
        <Script id="goatcounter-loader" strategy="afterInteractive">
          {`window.goatcounter=window.goatcounter||{};window.goatcounter.endpoint="https://framntnu.goatcounter.com/count";(function(){var s=document.createElement("script");s.async=true;s.src="//gc.zgo.at/count.js";document.head.appendChild(s);}());`}
        </Script>
        <Script
          src="/_vercel/speed-insights/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
