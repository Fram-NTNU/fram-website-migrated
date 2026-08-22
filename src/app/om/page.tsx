import type { Metadata } from "next";
import { OmContent } from "@/components/pages/om-content";
import { pageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = pageMetadata({
  key: "about",
  lang: "nb",
  title: "Om oss — FRAM NTNU",
  description:
    "Om FRAM NTNU — paraplyorganisasjon for innovasjon og gründerskap ved NTNU i Trondheim. Bli kjent med studentmiljøet, gjengen og historien vår.",
});

export default function OmPage() {
  return <OmContent lang="nb" />;
}
