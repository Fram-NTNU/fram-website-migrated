import type { Metadata } from "next";
import { ArrangementerContent } from "@/components/pages/arrangementer-content";
import { pageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = pageMetadata({
  key: "events",
  lang: "nb",
  title: "Arrangementer — FRAM NTNU",
  description:
    "Arrangementer på FRAM NTNU — workshops, foredrag, pitch-kvelder, hackathon og sosiale kvelder. Åpent for alle studenter.",
});

export default function ArrangementerPage() {
  return <ArrangementerContent lang="nb" />;
}
