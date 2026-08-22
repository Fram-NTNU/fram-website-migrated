import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const immutableAssetHeaders = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  devIndicators: false,
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      // Engelske slugs endret til norske egennavn (behold gamle lenker levende).
      { source: "/en/innovation-days", destination: "/en/innovasjonsdagene", permanent: true },
      { source: "/en/idea-garage", destination: "/en/idegarasjen", permanent: true },
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
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ];
    return [
      { source: "/assets/:path*", headers: immutableAssetHeaders },
      { source: "/uploads/:path*", headers: immutableAssetHeaders },
      { source: "/:path*", headers: securityHeaders },
    ];
  },
};

export default nextConfig;
