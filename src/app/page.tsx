import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";
import { loadLegacyPage } from "@/lib/legacy-page";

export function generateMetadata(): Metadata {
  return loadLegacyPage("index.html").metadata;
}

export default function HomePage() {
  return <LegacyPage page={loadLegacyPage("index.html")} />;
}
