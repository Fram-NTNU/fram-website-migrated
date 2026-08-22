import type { Metadata } from "next";
import { BookingContent } from "@/components/pages/booking-content";
import { pageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = pageMetadata({
  key: "booking",
  lang: "en",
  title: "Book a room — FRAM NTNU",
  description:
    "Book spaces at FRAM NTNU in Trondheim — Gruva, Scenerommet, Fellesrommet and the meeting rooms for student events, workshops and meetings.",
});

export default function BookingPage() {
  return <BookingContent lang="en" />;
}
