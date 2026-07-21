import { LegacyPage } from "@/components/legacy-page";
import { loadLegacyPage } from "@/lib/legacy-page";

export default function NotFoundPage() {
  return <LegacyPage page={loadLegacyPage("404.html")} />;
}
