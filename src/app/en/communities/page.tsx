import type { Metadata } from "next";
import { MiljoerContent } from "@/components/pages/miljoer-content";
import { pageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = pageMetadata({
  key: "communities",
  lang: "en",
  title: "The innovation communities at NTNU — FRAM",
  description:
    "An overview of all the innovation communities and student organisations at NTNU in Trondheim affiliated with FRAM — from drone building and AI to entrepreneurship and design.",
});

export default function CommunitiesPage() {
  return <MiljoerContent lang="en" />;
}
