"use client";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { availabilityWeek, roomCalendarColor } from "@/lib/calendar-selection";
import { useBookingClock } from "@/lib/booking-clock";
import { BookingCalendar } from "./booking-calendar";

declare global {
  interface Window {
    grecaptcha?: {
      ready(callback: () => void): void;
      execute(siteKey: string, options: { action: string }): Promise<string>;
    };
  }
}

type PublicRoom = {
  id: string;
  slug: string;
  name: string;
  category: "meeting" | "special";
  capacity: number | null;
  showAvailability: boolean;
  acceptingRequests: boolean;
  bookingHorizonDays: number;
  minDurationMinutes: number;
  maxDurationMinutes: number;
  openingHours: Record<string, { open: string; close: string } | null>;
};
type Organization = { id: string; name: string };
type Busy = Record<string, { start: string; end: string; title?: string }[]>;

const dateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export function BookingSystem() {
  const now = useBookingClock();
  const [rooms, setRooms] = useState<PublicRoom[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [busy, setBusy] = useState<Busy>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [result, setResult] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [requesterType, setRequesterType] = useState<"internal" | "external">("internal");
  const [view, setView] = useState<"booking" | "availability">("booking");
  const [visibleRooms, setVisibleRooms] = useState<string[]>([]);
  const [roomId, setRoomId] = useState("");
  const [date, setDate] = useState(dateValue(new Date()));
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [availabilityState, setAvailabilityState] = useState<{ week: string; loading: boolean; error: string }>({ week: "", loading: true, error: "" });
  const [availabilityRetry, setAvailabilityRetry] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [repeatInterval, setRepeatInterval] = useState(1);
  const [frequency, setFrequency] = useState("weekly");
  const [repeatEnd, setRepeatEnd] = useState("date");
  const [repeatCount, setRepeatCount] = useState(10);
  const today = new Date();
  const boundary = new Date(today.getFullYear() + (today >= new Date(today.getFullYear(), 7, 1) ? 1 : 0), 7, 1);
  const lastRepeatDate = dateValue(addDays(boundary, -1));
  const [until, setUntil] = useState(lastRepeatDate);
  const recurrenceError = repeat && (date > lastRepeatDate || (repeatEnd === "date" && (until > lastRepeatDate || until < date))) ? `Gjentakelsen må slutte senest ${new Intl.DateTimeFormat("nb-NO", { day: "numeric", month: "long", year: "numeric" }).format(addDays(boundary, -1))}.` : "";
  const idempotencyKey = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await fetch("/api/booking", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? "Kunne ikke hente rom.");
        if (!active) return;
        setRooms(data.rooms);
        setVisibleRooms(data.rooms.filter((room: PublicRoom) => room.showAvailability).map((room: PublicRoom) => room.id));
        setOrganizations(data.organizations);
        const requested = new URLSearchParams(window.location.search).get("rom");
        const initial = data.rooms.find((room: PublicRoom) => room.slug === requested && room.acceptingRequests) ?? data.rooms.find((room: PublicRoom) => room.acceptingRequests);
        setRoomId(initial?.id ?? "");
      } catch (error) {
        if (active) setLoadError(error instanceof Error ? error.message : "Kunne ikke hente booking.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const selectedRoom = rooms.find((room) => room.id === roomId);
  const week = availabilityWeek(date);
  useEffect(() => {
    if (!selectedRoom?.showAvailability) return;
    const controller = new AbortController();
    const from = new Date(`${week}T12:00:00`);
    from.setHours(0, 0, 0, 0);
    const to = addDays(from, 8);
    fetch(`/api/booking?view=availability&from=${encodeURIComponent(from.toISOString())}&to=${encodeURIComponent(to.toISOString())}`, { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? "Kunne ikke hente ledighet.");
        if (controller.signal.aborted) return;
        setBusy(data.busy ?? {});
        setAvailabilityState({ week, loading: false, error: "" });
      })
      .catch((error) => {
        if (!controller.signal.aborted) { setAvailabilityState({ week, loading: false, error: error instanceof Error ? error.message : "Kunne ikke hente ledighet." }); }
      });
    return () => controller.abort();
  }, [selectedRoom?.showAvailability, week, availabilityRetry]);

  const minDate = dateValue(now ? new Date(now) : today);
  const maxDate = selectedRoom?.bookingHorizonDays ? dateValue(addDays(new Date(), selectedRoom.bookingHorizonDays)) : "9999-12-31";
  const weekday = ((new Date(`${date}T12:00:00`).getDay() + 6) % 7) + 1;
  const opening = selectedRoom?.openingHours[String(weekday)];
  const selectedBusy = busy[roomId] ?? [];
  const availabilityLoading = availabilityState.week !== week || availabilityState.loading;
  const availabilityError = availabilityState.week === week ? availabilityState.error : "";
  const startsAt = Date.parse(`${date}T${start}:00`);
  const endsAt = Date.parse(`${date}T${end}:00`);
  const conflicts = selectedRoom?.showAvailability && selectedBusy.some(item => Date.parse(item.start) < endsAt && Date.parse(item.end) > startsAt);
  const duration = (endsAt - startsAt) / 60000;
  const timingError = !start || !end ? "" : startsAt <= now ? "Velg et tidspunkt frem i tid." : !opening ? "Rommet er stengt denne dagen." : end <= start ? "Sluttid må være etter starttid." : start < opening.open || end > opening.close ? `Velg en tid mellom ${opening.open} og ${opening.close}.` : selectedRoom && (duration < selectedRoom.minDurationMinutes || duration > selectedRoom.maxDurationMinutes) ? `Velg mellom ${selectedRoom.minDurationMinutes} og ${selectedRoom.maxDurationMinutes} minutter.` : conflicts ? "Dette tidspunktet er opptatt. Velg en annen tid." : "";

  async function recaptchaToken() {
    if (!siteKey) return "development";
    if (!window.grecaptcha) throw new Error("reCAPTCHA er ikke klar. Prøv igjen.");
    return new Promise<string>((resolve, reject) => {
      window.grecaptcha!.ready(() => {
        window.grecaptcha!.execute(siteKey, { action: "booking_submit" }).then(resolve).catch(reject);
      });
    });
  }

  return (
    <section className="booking-system" aria-label="Rombooking">
      {siteKey && <script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`} async defer />}
      {loading && <div className="booking-loading" role="status">Henter rom og ledige tider …</div>}
      {loadError && <div className="booking-message error" role="alert"><strong>Booking er midlertidig utilgjengelig.</strong><span>{loadError} Du kan kontakte <a href="mailto:framntnu@gmail.com">framntnu@gmail.com</a>.</span></div>}
      {!loading && !loadError && rooms.length === 0 && <p className="booking-loading">Ingen rom er tilgjengelige for booking akkurat nå. Kontakt <a href="mailto:framntnu@gmail.com">Fram</a> for hjelp.</p>}
      {!loading && rooms.length > 0 && (
        <form className={`booking-form ${view === "availability" ? "booking-availability-view" : ""}`} onSubmit={async (event) => {
          event.preventDefault();
          const formElement = event.currentTarget;
          if (recurrenceError || timingError || (selectedRoom?.showAvailability && (availabilityLoading || availabilityError))) {
            setResult({ type: "error", text: recurrenceError || timingError || "Vent til ledigheten er kontrollert, eller prøv igjen." });
            return;
          }
          setSubmitting(true);
          setResult(null);
          try {
            const form = new FormData(formElement);
            const title = String(form.get("purpose") ?? "").trim();
            if (!title) throw new Error("Legg inn en tittel på bookingen.");
            idempotencyKey.current ??= crypto.randomUUID();
            const startLocal = `${form.get("date")}T${form.get("start")}:00`;
            const endLocal = `${form.get("date")}T${form.get("end")}:00`;
            const response = await fetch("/api/booking", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                idempotencyKey: idempotencyKey.current,
                roomId,
                requesterType,
                organizationId: requesterType === "internal" ? String(form.get("organization")) : null,
                name: String(form.get("name")),
                email: String(form.get("email")),
                purpose: title,
                startsAt: new Date(startLocal).toISOString(),
                endsAt: new Date(endLocal).toISOString(),
                recurrence: repeat ? { frequency, interval: repeatInterval, end: repeatEnd === "date" ? { type: "date", date: until } : { type: "count", count: repeatCount } } : null,
                recaptchaToken: await recaptchaToken(),
                website: String(form.get("website") ?? ""),
              }),
            });
            const data = await response.json();
            // Keep the key after transient server errors so a retry cannot create
            // a second request when the first response was interrupted.
            if (response.status < 500) idempotencyKey.current = null;
            if (!response.ok) throw new Error(data.error ?? "Forespørselen kunne ikke sendes.");
            idempotencyKey.current = null;
            setResult({ type: "success", text: "Forespørselen er sendt. Du får e-post når den er behandlet." });
            formElement.reset();
            setStart("");
            setEnd("");
            setRepeat(false);
          } catch (error) {
            setResult({ type: "error", text: error instanceof Error ? error.message : "Forespørselen kunne ikke sendes." });
          } finally {
            setSubmitting(false);
          }
        }}>
          <div className="booking-step booking-room-step">
            <div className="booking-type" role="group" aria-label="Bookingvisning"><button type="button" className={view === "booking" ? "active" : ""} aria-pressed={view === "booking"} onClick={() => setView("booking")}>Book rom</button><button type="button" className={view === "availability" ? "active" : ""} aria-pressed={view === "availability"} onClick={() => setView("availability")}>Se tilgjengelighet</button></div>
            {view === "booking" && <h2>Velg rom</h2>}
            {view === "availability" ? <div className="booking-room-filters" role="group" aria-label="Vis rom i kalenderen">{rooms.filter(room => room.showAvailability).map(room => <label key={room.id} className="booking-room-filter" style={{ "--room-color": roomCalendarColor(room.slug) } as CSSProperties}><input type="checkbox" checked={visibleRooms.includes(room.id)} onChange={() => setVisibleRooms(ids => ids.includes(room.id) ? ids.filter(id => id !== room.id) : [...ids, room.id])} /><span>{room.name}</span></label>)}</div> : <div className="booking-room-options">
              {rooms.map((room) => <button key={room.id} type="button" disabled={!room.acceptingRequests} className={(room.id === roomId) ? "active" : ""} onClick={() => { if (room.id === roomId) return; setRoomId(room.id); setStart(""); setEnd(""); setResult(null); }} aria-pressed={room.id === roomId}><span>{room.name}</span><small>{`${room.capacity ?? "–"} plasser`}</small>{!room.acceptingRequests && <em>Ikke åpnet ennå</em>}</button>)}
            </div>}
          </div>
          <div className="booking-step booking-time-step">
            {selectedRoom?.showAvailability ? <BookingCalendar
              comparisonRooms={view === "availability" ? rooms.filter(room => visibleRooms.includes(room.id)).map(room => ({ id: room.id, name: room.name, color: roomCalendarColor(room.slug), hours: room.openingHours, busy: busy[room.id] ?? [] })) : undefined}
              roomName={selectedRoom.name} date={date} start={start} end={end} busy={selectedBusy} hours={selectedRoom.openingHours}
              minDate={view === "availability" ? dateValue(new Date()) : minDate} maxDate={maxDate} minDuration={selectedRoom.minDurationMinutes} maxDuration={selectedRoom.maxDurationMinutes}
              loading={availabilityLoading} error={availabilityError}
              onChoose={(day, from, to) => { setDate(day); setStart(from); setEnd(to); setResult(null); }}
              onDateChange={(day) => { setDate(day); setStart(""); setEnd(""); }}
              onRetry={() => { setAvailabilityState({ week, loading: true, error: "" }); setAvailabilityRetry(value => value + 1); }}
            /> : <><h2>Ønsket tidspunkt</h2><p className="booking-special-note">For {selectedRoom?.name} kan du sende forespørsel opptil {selectedRoom?.bookingHorizonDays} dager frem i tid. Tilgjengelighet avtales med Fram. Legg inn ønsket dato og tidspunkt.</p></>}
            {view === "booking" && <><div className="booking-fields booking-time-fields">
              <label>Dato<input name="date" type="date" required value={date} min={minDate} max={maxDate} onChange={(event) => { if (!event.target.value) return; setDate(event.target.value); setStart(""); setEnd(""); }} /></label>
              <label>Fra<input name="start" type="time" step="900" required min={opening?.open} max={opening?.close} value={start} onChange={(event) => setStart(event.target.value)} /></label>
              <label>Til<input name="end" type="time" step="900" required min={start || opening?.open} max={opening?.close} value={end} onChange={(event) => setEnd(event.target.value)} /></label>
            </div>
            {timingError && <p className="booking-timing-error" role="alert">{timingError}</p>}</>}
          </div>
          {view === "booking" && <><div className="booking-step booking-recurrence">
            <h2>Gjentakelse</h2>
            <div className="booking-fields">
              <label>Gjenta<select value={repeat ? "custom" : "none"} onChange={event => setRepeat(event.target.value === "custom")}><option value="none">Gjentas ikke</option><option value="custom">Fast gjentakelse</option></select></label>
            </div>
            {repeat && <>
              <div className="booking-fields booking-recurrence-fields">
                <label>Hver<input type="number" min="1" max="99" required value={repeatInterval} onChange={event => setRepeatInterval(Number(event.target.value))} /></label>
                <label>Enhet<select value={frequency} onChange={event => setFrequency(event.target.value)}><option value="daily">Dag</option><option value="weekly">Uke</option><option value="monthly">Måned</option></select></label>
                <label>Slutter<select value={repeatEnd} onChange={event => setRepeatEnd(event.target.value)}><option value="date">På dato</option><option value="count">Etter antall ganger</option></select></label>
                {repeatEnd === "date" ? <label>Sluttdato<input type="date" required min={date} max={lastRepeatDate} value={until} onChange={event => setUntil(event.target.value)} /></label> : <label>Antall ganger<input type="number" required min="1" max="366" value={repeatCount} onChange={event => setRepeatCount(Number(event.target.value))} /></label>}
              </div>
              {recurrenceError && <p className="booking-timing-error" role="alert">{recurrenceError}</p>}
            </>}
          </div>
          <div className="booking-step">
            <h2>Om bookingen</h2>
            <div className="booking-type"><button type="button" className={requesterType === "internal" ? "active" : ""} aria-pressed={requesterType === "internal"} onClick={() => setRequesterType("internal")}>Medlemsorganisasjon</button><button type="button" className={requesterType === "external" ? "active" : ""} aria-pressed={requesterType === "external"} onClick={() => setRequesterType("external")}>Ekstern</button></div>
            <div className="booking-fields">
              {requesterType === "internal" && <label>Medlemsorganisasjon<select name="organization" required defaultValue=""><option value="" disabled>Velg organisasjon</option>{organizations.map((org) => <option key={org.id} value={org.id}>{org.name}</option>)}</select></label>}
              <label>Navn<input name="name" required maxLength={150} autoComplete="name" /></label>
              <label>E-post<input name="email" type="email" required maxLength={254} autoComplete="email" /></label>
              <label className="booking-purpose">Tittel på bookingen<input name="purpose" required maxLength={150} /><span>Brukes som tittel i kalenderinvitasjonen.</span></label>
              <label className="booking-honeypot" aria-hidden="true">Nettside<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
          </div>
          {result && <div className={`booking-message ${result.type}`} role={result.type === "error" ? "alert" : "status"}>{result.text}</div>}
          <div className="booking-submit"><button disabled={submitting || !selectedRoom?.acceptingRequests || Boolean(timingError || recurrenceError) || Boolean(selectedRoom?.showAvailability && (availabilityLoading || availabilityError))} type="submit">{submitting ? "Sender …" : "Be om booking"}<i className="ph ph-arrow-right" /></button><p>Beskyttet av reCAPTCHA. Googles personvernregler og vilkår gjelder.</p></div></>}
        </form>
      )}
    </section>
  );
}
