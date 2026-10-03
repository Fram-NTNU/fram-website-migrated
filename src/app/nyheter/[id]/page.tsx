import { NewsRetry } from "@/components/news-retry";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publishedNews } from "@/lib/published-news";
import { newsDate } from "@/lib/news";
import { NewsGallery } from "@/components/news-gallery";

type Props = { params: Promise<{ id: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { news } = await publishedNews();
  const item = news.find((row) => row.id === id);
  if (!item) return { title: "Nyhet — FRAM NTNU", robots: { index: false } };
  return { title: `${item.title} — FRAM NTNU`, description: item.summary,
    alternates: { canonical: `https://www.framntnu.no/nyheter/${item.id}` },
    openGraph: { type: "article", title: item.title, description: item.summary, publishedTime: item.published_at,
      locale: "nb_NO", images: item.images.length ? [{ url: item.images[0].url, alt: item.images[0].alt }] : ["/assets/og-fram.png"] },
  };
}
export default async function NewsArticle({ params }: Props) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const { news, unavailable } = await publishedNews();
  if (unavailable) return <section className="news-article events-empty" role="status"><h1>Nyheten er ikke tilgjengelig akkurat nå</h1><p>Prøv igjen om litt.</p><NewsRetry /><Link className="event-more-link" href="/nyheter">Alle nyheter</Link></section>;
  const item = news.find((row) => row.id === id);
  if (!item) notFound();
  return <article>
    <NewsGallery images={item.images} />
    <div className="news-article">
      <Link className="news-back" href="/nyheter"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5m6-6-6 6 6 6" /></svg>Alle nyheter</Link>
      <h1>{item.title}</h1>
      <p className="news-meta"><time dateTime={item.published_at}>{newsDate(item.published_at)}</time><span aria-hidden="true"> · </span>{item.organization_name}</p>
      <p className="news-summary">{item.summary}</p>
      <div className="news-body">{item.body.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
      {item.source_url && <a className="event-more-link" href={item.source_url} target="_blank" rel="noopener noreferrer">Kilde / mer informasjon</a>}
    </div>
  </article>;
}
