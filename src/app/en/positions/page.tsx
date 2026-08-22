import type { Metadata } from "next";
import { StillingerContent } from "@/components/pages/stillinger-content";
import { pageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = pageMetadata({
  key: "positions",
  lang: "en",
  title: "Positions — FRAM NTNU",
  description:
    "Open positions and roles at FRAM NTNU. Join us and help shape the innovation community at NTNU — we're looking for students in technology, strategy and design.",
});

export default function PositionsPage() {
  return <StillingerContent lang="en" />;
}
