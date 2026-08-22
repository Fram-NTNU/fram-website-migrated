import type { Metadata } from "next";
import { InnovasjonsdageneContent } from "@/components/pages/innovasjonsdagene-content";
import { pageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = pageMetadata({
  key: "innovationDays",
  lang: "en",
  title: "Innovasjonsdagene '26 — FRAM NTNU",
  description:
    "Innovasjonsdagene '26 — FRAM NTNU's festival for innovation, entrepreneurship and new ventures at NTNU.",
});

export default function InnovationDaysPage() {
  return <InnovasjonsdageneContent lang="en" />;
}
