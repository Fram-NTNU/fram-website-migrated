import type { Metadata } from "next";
import { OmContent } from "@/components/pages/om-content";
import { pageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = pageMetadata({
  key: "about",
  lang: "en",
  title: "About us — FRAM NTNU",
  description:
    "About FRAM NTNU — the umbrella organisation for innovation and entrepreneurship at NTNU in Trondheim. Get to know the student community, the team and our history.",
});

export default function AboutPage() {
  return <OmContent lang="en" />;
}
