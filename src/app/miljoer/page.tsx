import type { Metadata } from "next";
import { MiljoerContent } from "@/components/pages/miljoer-content";
import { pageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = pageMetadata({
  key: "communities",
  lang: "nb",
  title: "Innovasjonsmiljøene ved NTNU — FRAM",
  description:
    "Oversikt over alle innovasjonsmiljøer og studentorganisasjoner ved NTNU i Trondheim tilknyttet FRAM — fra dronebygging og AI til entreprenørskap og design.",
});

export default function MiljoerPage() {
  return <MiljoerContent lang="nb" />;
}
