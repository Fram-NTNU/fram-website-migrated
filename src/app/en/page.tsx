import type { Metadata, Viewport } from "next";
import { HomeContent } from "@/components/pages/home-content";
import { pageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = pageMetadata({
  key: "home",
  lang: "en",
  title: "FRAM NTNU — Centre for innovation and entrepreneurship",
  description:
    "Discover the innovation community at NTNU. FRAM offers spaces, events, and a community for students who want to build something.",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF7F2",
};

export default function HomePageEn() {
  return <HomeContent lang="en" />;
}
