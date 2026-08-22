import type { Metadata } from "next";
import { StillingerContent } from "@/components/pages/stillinger-content";
import { pageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = pageMetadata({
  key: "positions",
  lang: "nb",
  title: "Stillinger — FRAM NTNU",
  description:
    "Ledige stillinger og verv i FRAM NTNU. Bli med og form innovasjonsmiljøet ved NTNU — vi søker studenter innen teknologi, strategi og design.",
});

export default function StillingerPage() {
  return <StillingerContent lang="nb" />;
}
