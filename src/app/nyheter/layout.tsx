import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "../events.css";
import "./news.css";

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <div className="news-site min-h-screen bg-[var(--bg)] font-sans text-[var(--ink)] [--bg-soft:#F2EDE3] [--bg:#FAF7F2] [--blue:#2E86C1] [--card:#fff] [--ink-soft:#555] [--ink:#1E1E1E] [--line:#E6E0D5] [--nav-accent:#E85A5A] [--yellow:#FDC82F]">
    <SiteHeader currentPath="/nyheter" />
    <main>{children}</main>
    <SiteFooter />
  </div>;
}
