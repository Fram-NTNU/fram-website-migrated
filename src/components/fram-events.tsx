"use client";

/* Event photographs and organization marks remain unoptimized so signed portal
   image URLs are fetched directly while they are valid. */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { lockPageScroll } from "@/lib/scroll-lock";
import { type EventItem, eventDate, eventWhen, eventSchedule, isUpcoming } from "@/lib/events";

function EventCard({ event, onOpen, lifted }: { event: EventItem; onOpen: (lifted: boolean) => void; lifted: boolean }) {
  const date = eventDate(event);
  return <button type="button" className={`event-card${lifted ? " is-lifted" : ""}`} onClick={e => onOpen(e.currentTarget.matches(":hover"))} aria-haspopup="dialog" aria-label={`Les mer om ${event.title}, ${eventWhen(event)}`}>
    <span className={`event-card-image ${event.image_url ? "has-photo" : ""}`}>
      {event.image_url && <img src={event.image_url} alt={event.image_alt} loading="lazy" />}
      <span className="event-card-date"><span className={date.day.length > 3 ? "date-range" : ""}>{date.day}</span><span>{date.month}</span></span>
    </span>
    <span className="event-card-body">
      <span className="event-card-schedule">{date.detail}</span>
      <span className="event-card-title">{event.title}</span>
      <span className="event-card-summary">{event.summary}</span>
      <span className="event-card-foot"><span>{event.location}</span>{event.cancelled && <span className="event-cancelled">Avlyst</span>}{event.is_fram ? <img className="event-organizer-mark" width={72} height={32} src="/assets/fram-logo.webp" alt="Arrangert av FRAM" /> : event.logo_url && <img className={`event-organizer-mark${event.logo_on_dark ? " on-dark" : ""}`} width={72} height={32} src={event.logo_url} alt={event.logo_alt} loading="lazy" />}</span>
    </span>
  </button>;
}

function EventDialog({ event, onClose, now }: { event: EventItem; onClose: () => void; now: number }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const unlock = lockPageScroll();
    dialog?.showModal();
    return () => { dialog?.close(); unlock(); };
  }, []);
  const ended = !isUpcoming(event, now);
  const schedule = eventSchedule(event);
  return <dialog ref={ref} className="event-dialog" aria-labelledby="event-dialog-title" onClose={() => {
    // Strict Mode closes and reopens the dialog while verifying effects.
    // Ignore that queued close event if the dialog is already open again.
    if (!ref.current?.open) onClose();
  }} onClick={e => {
    if (e.target !== e.currentTarget) return;
    const box = e.currentTarget.getBoundingClientRect();
    if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) e.currentTarget.close();
  }}>
    <div className="event-dialog-toolbar"><button type="button" className="event-dialog-close" aria-label="Lukk arrangement" onClick={() => ref.current?.close()} autoFocus><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg></button></div>
    {event.image_url && <div className="event-dialog-image"><img src={event.image_url} alt={event.image_alt} /></div>}
    <div className="event-dialog-body">
      <h2 id="event-dialog-title">{event.title}</h2>
      {event.cancelled && <p className="event-notice">Arrangementet er avlyst.</p>}
      <dl className="event-facts">
        <div><dt>Dato</dt><dd>{schedule.date}</dd></div>
        <div><dt>Klokkeslett</dt><dd>{schedule.time}</dd></div>
        <div><dt>Sted</dt><dd>{event.location}</dd></div>
      </dl>
      {(event.is_fram || event.logo_url) && <div className="event-dialog-organizer"><img className={event.logo_on_dark && !event.is_fram ? "on-dark" : ""} src={event.is_fram ? "/assets/fram-logo.webp" : event.logo_url!} alt={event.is_fram ? "FRAM NTNU" : event.logo_alt} width={144} height={56} /></div>}
      <p className="event-dialog-summary">{event.summary}</p>
      <div className="event-description">{event.body}</div>
      {event.source_url && <a className="event-more-link" href={event.source_url} target={event.source_url.startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer">Les mer</a>}
      <div className="event-registration">
        {event.cancelled ? <p>Påmelding er stengt fordi arrangementet er avlyst.</p>
          : ended ? <p>Dette arrangementet er gjennomført.</p>
          : event.registration === "external" && event.registration_url ? <a className="event-registration-link" href={event.registration_url} target="_blank" rel="noopener noreferrer">Gå til påmelding <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg></a>
          : <p>{event.registration === "drop_in" ? "Ingen påmelding" : "Påmeldingen er ikke åpnet ennå."}</p>}

      </div>
    </div>
  </dialog>;
}

export function FramEvents({ events, unavailable = false, now, initialSelectedId }: { events: EventItem[]; unavailable?: boolean; now: number; initialSelectedId?: string }) {
  const [tab, setTab] = useState<"kommende" | "tidligere">("kommende");
  const [selected, setSelected] = useState<EventItem | null>(() => events.find(event => event.id === initialSelectedId) ?? null);
  const [lifted, setLifted] = useState(false);
  const router = useRouter();
  const upcoming = events.filter(event => isUpcoming(event, now)).sort((a, b) => Date.parse(a.starts_at) - Date.parse(b.starts_at));
  const past = events.filter(event => !isUpcoming(event, now)).sort((a, b) => Date.parse(b.starts_at) - Date.parse(a.starts_at));
  const list = tab === "kommende" ? upcoming : past;
  const years = [...new Set(list.map(event => eventDate(event).year))];
  return <div className="events">
    <div className="events-toolbar">
      <p>Se hva som skjer i innovasjonsmiljøet på NTNU.</p>
      <div className="events-switch" aria-label="Velg tidsperiode">
        {([["kommende", "Kommende", upcoming.length], ["tidligere", "Tidligere", past.length]] as const).map(([key, label, count]) => <button type="button" key={key} aria-pressed={tab === key} onClick={() => setTab(key)}>{label} <span>{count}</span></button>)}
      </div>
    </div>
    {unavailable ? <div className="events-empty" role="status"><h2>Vi får ikke hentet arrangementene akkurat nå.</h2><p>Prøv igjen om litt.</p><button className="event-registration-link" type="button" onClick={() => router.refresh()}>Prøv igjen</button></div>
      : list.length ? <div className="events-years">{years.map(year => <section className="events-year" key={year} aria-labelledby={`events-year-${year}`}><h2 id={`events-year-${year}`}>{year}</h2><div className="events-grid">{list.filter(event => eventDate(event).year === year).map(event => <EventCard key={event.id} event={event} lifted={selected?.id === event.id && lifted} onOpen={hovered => { setLifted(hovered); setSelected(event); }} />)}</div></section>)}</div>
      : <div className="events-empty"><h2>{tab === "kommende" ? "Ingen kommende arrangementer akkurat nå." : "Ingen tidligere arrangementer ennå."}</h2><p>{tab === "kommende" ? "Nye arrangementer vises her når de er klare." : "Gjennomførte arrangementer samles her."}</p></div>}
    {selected && <EventDialog event={selected} now={now} onClose={() => setSelected(null)} />}
  </div>;
}
