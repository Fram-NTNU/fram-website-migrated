import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegacyPage } from "@/components/legacy-page";
import { LEGACY_ROUTES, loadLegacyPage, type LegacyRoute } from "@/lib/legacy-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(LEGACY_ROUTES).map((slug) => ({ slug }));
}

function fileForSlug(slug: string) {
  return LEGACY_ROUTES[slug as LegacyRoute];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const file = fileForSlug(slug);
  return file ? loadLegacyPage(file).metadata : {};
}

export default async function LegacyRoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const file = fileForSlug(slug);
  if (!file) notFound();
  return <LegacyPage page={loadLegacyPage(file)} />;
}
