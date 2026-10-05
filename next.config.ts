import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const immutableAssetHeaders = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
];

const nextConfig: NextConfig = {
  distDir: process.env.FRAM_TEST_DIST_DIR || ".next",
  trailingSlash: false,
  devIndicators: false,
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      { source: "/FramNTNU", destination: "/", permanent: true },
      { source: "/services-4", destination: "/idegarasjen", permanent: true },
      { source: "/about-3-1", destination: "/om", permanent: true },
      { source: "/about", destination: "/booking", permanent: true },
      { source: "/blank-page", destination: "/booking", permanent: true },
      { source: "/medlemmer-1", destination: "/miljoer", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      ...["arrangementer", "booking", "idegarasjen", "innovasjonsdagene", "miljoer", "om", "stillinger"].map((route) => ({
        source: `/${route}.html`,
        destination: `/${route}`,
        permanent: true,
      })),
    ];
  },
  async headers() {
    const securityHeaders = [
      { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://gc.zgo.at; style-src 'self' 'unsafe-inline' https://unpkg.com; font-src 'self' https://unpkg.com; img-src 'self' data: blob: https:; connect-src 'self' https://www.google.com https://www.gstatic.com https://framntnu.goatcounter.com https://vitals.vercel-insights.com; frame-src https://www.google.com https://recaptcha.google.com https://www.youtube.com https://www.youtube-nocookie.com https://app.atlas.co https://use.mazemap.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "Cross-Origin-Resource-Policy", value: "same-site" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];
    return [
      { source: "/assets/:path*", headers: immutableAssetHeaders },
      { source: "/uploads/:path*", headers: immutableAssetHeaders },
      { source: "/:path*", headers: securityHeaders },
    ];
  },
};

export default nextConfig;
