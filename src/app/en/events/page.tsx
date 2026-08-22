import type { Metadata } from "next";
import { ArrangementerContent } from "@/components/pages/arrangementer-content";
import { pageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = pageMetadata({
  key: "events",
  lang: "en",
  title: "Events — FRAM NTNU",
  description:
    "Events at FRAM NTNU — workshops, talks, pitch nights, hackathons and social evenings. Open to all students.",
});

export default function EventsPage() {
  return <ArrangementerContent lang="en" />;
}
