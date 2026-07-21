import type { LegacyPageData } from "@/lib/legacy-page";
import { LegacyScriptRunner } from "./legacy-script-runner";
import { LegacySection, SiteFooter, SiteHeader } from "./legacy-section";

export function LegacyPage({ page }: { page: LegacyPageData }) {
  return (
    <>
      {page.headCss.map((asset, index) => asset.kind === "stylesheet"
        ? <link rel="stylesheet" href={asset.href} key={`${index}-${asset.href}`} />
        : <style key={index} dangerouslySetInnerHTML={{ __html: asset.content }} />)}
      <LegacySection html={page.beforeHeader} />
      <SiteHeader html={page.header} />
      <LegacySection html={page.content} />
      <SiteFooter html={page.footer} />
      <LegacySection html={page.afterFooter} />
      <LegacyScriptRunner scripts={page.scripts} bodyClass={page.bodyClass} />
    </>
  );
}
