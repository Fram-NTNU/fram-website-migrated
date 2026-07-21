export function LegacySection({ html }: { html: string }) {
  if (!html.trim()) return null;
  return <div className="legacy-contents" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}

export function SiteHeader({ html }: { html: string }) {
  return <LegacySection html={html} />;
}

export function SiteFooter({ html }: { html: string }) {
  return <LegacySection html={html} />;
}
