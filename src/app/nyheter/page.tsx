import { NewsRetry } from "@/components/news-retry";
import type { Metadata } from "next";
import Link from "next/link";
import { publishedNews } from "@/lib/published-news";
import { newsDate } from "@/lib/news";

export const metadata: Metadata = {
  title: "Nyheter — FRAM NTNU",
  description: "Nyheter, prosjekter og historier fra FRAM og studentmiljøene ved NTNU.",
  alternates: { canonical: "https://www.framntnu.no/nyheter" },
  openGraph: { type: "website", title: "Nyheter — FRAM NTNU", locale: "nb_NO", images: ["/assets/og-fram.png"] },
};
export default async function NewsPage() {
  const { news, unavailable } = await publishedNews();
  return <section className="news-index border-b border-[var(--line)] py-24">
    <div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
      <div className="mb-12 grid grid-cols-[1fr_auto] items-end gap-8 border-b border-[var(--line)] pb-7">
        <h1 className="m-0 max-w-[16ch] text-[clamp(36px,4vw,56px)] leading-[1.03] font-extrabold tracking-[-.025em]">Nyheter.</h1>
      </div>
      {news.length ? <div className="events-grid">
        {news.map((item) => <Link className="event-card news-card" href={`/nyheter/${item.id}`} key={item.id}>
          <div className="event-card-image news-card-image">
            {item.images[0] ?
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.images[0].url} alt={item.images[0].alt} width={800} height={450} loading="lazy" decoding="async" /> :
              // eslint-disable-next-line @next/next/no-img-element
              <img className="news-placeholder" src="/assets/fram-symbol.webp" alt="" width={160} height={160} loading="lazy" />}
          </div>
          <div className="event-card-body">
            <h2>{item.title}</h2>
            <p className="event-card-summary">{item.summary}</p>
            <div className="event-card-foot"><span><time dateTime={item.published_at}>{newsDate(item.published_at)}</time><br />{item.organization_name}</span><span className="news-read-more">Les nyheten <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></span></div>
          </div>
        </Link>)}
      </div> : <div className="events-empty" role="status">
        <h2>{unavailable ? "Nyhetene er ikke tilgjengelige akkurat nå" : "Ingen nyheter publisert ennå"}</h2>
        <p>{unavailable ? "Prøv igjen om litt." : "Her kommer nyheter fra FRAM og studentmiljøene."}</p>
        {unavailable && <NewsRetry />}
      </div>}
    </div>
  </section>;
}
