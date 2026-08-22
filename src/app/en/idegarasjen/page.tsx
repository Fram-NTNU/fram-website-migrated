import type { Metadata } from "next";
import { IdegarasjenContent } from "@/components/pages/idegarasjen-content";
import { pageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = pageMetadata({
  key: "ideaGarage",
  lang: "en",
  title: "Idégarasjen — FRAM NTNU",
  description:
    "Idégarasjen — the students' open innovation workshop at FRAM NTNU with 3D printers, a laser cutter and prototyping equipment.",
});

export default function IdeaGaragePage() {
  return <IdegarasjenContent lang="en" />;
}
