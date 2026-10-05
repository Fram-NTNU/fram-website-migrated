"use client";
import { useEffect, useRef, useState } from "react";
import { availabilityWeek, bookingSelectionError } from "@/lib/calendar-selection";
import { createAvailabilityCache, type RoomAvailability } from "@/lib/availability-cache";
import { useBookingClock } from "@/lib/booking-clock";
import { BookingSlotPicker } from "./booking-slot-picker";

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
  const [availabilityCache, setAvailabilityCache] = useState<Record<string, { busy: RoomAvailability; expiresAt: number }>>({});
  const [availabilityLoader] = useState(() => createAvailabilityCache(async (fromDay, toDay) => {
    const from = new Date(`${fromDay}T00:00:00`).toISOString();
    const to = new Date(`${toDay}T00:00:00`).toISOString();
    const response = await fetch(`/api/booking?view=availability&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`, { cache: "no-store", signal: AbortSignal.timeout(20000) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? "Kunne ikke hente ledighet.");
    return data.busy ?? {};
  }));
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [result, setResult] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [requesterType, setRequesterType] = useState<"internal" | "external">("internal");
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
        setOrganizations(data.organizations);
        const requested = new URLSearchParams(window.location.search).get("rom");
        // ?rom=slug preselects that room; it is kept as long as it fits the chosen time.
        const initial = data.rooms.find((room: PublicRoom) => room.slug === requested && room.acceptingRequests);
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
  const busy = availabilityCache[week]?.busy ?? {};
  const cachedFresh = Boolean(availabilityCache[week] && availabilityCache[week].expiresAt > now);
  const showsAvailability = rooms.some((room) => room.showAvailability);
  useEffect(() => {
    if (!showsAvailability) return;
    let active = true;
    availabilityLoader.load(week).then(window => {
      if (!active) return;
      setAvailabilityCache(previous => {
        const next = { ...previous };
        for (const cachedWeek of window.weeks) next[cachedWeek] = { busy: window.busy, expiresAt: window.expiresAt };
        const keys = Object.keys(next).sort((a, b) => next[b].expiresAt - next[a].expiresAt);
        return Object.fromEntries(keys.slice(0, 32).map(key => [key, next[key]]));
      });
      setAvailabilityState({ week, loading: false, error: "" });
    }).catch(error => {
      if (active) setAvailabilityState({ week, loading: false, error: error instanceof Error ? error.message : "Kunne ikke hente ledighet." });
    });
    return () => { active = false; };
  }, [showsAvailability, week, availabilityRetry, availabilityLoader, cachedFresh]);

  const minDate = dateValue(now ? new Date(now) : today);
  const availabilityLoading = showsAvailability && !availabilityCache[week] && (availabilityState.week !== week || availabilityState.loading);
  const availabilityError = showsAvailability && availabilityState.week === week ? availabilityState.error : "";
  const selectionError = bookingSelectionError({ room: selectedRoom, date, start, end, busy, now, today: minDate });

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
        <form className="booking-form" onSubmit={async (event) => {
          event.preventDefault();
          const formElement = event.currentTarget;
          if (recurrenceError || selectionError || availabilityLoading || availabilityError) {
            setResult({ type: "error", text: recurrenceError || selectionError || "Vent til ledigheten er kontrollert, eller prøv igjen." });
            return;
          }
          setSubmitting(true);
          setResult(null);
          try {
            const form = new FormData(formElement);
            const title = String(form.get("purpose") ?? "").trim();
            if (!title) throw new Error("Legg inn en tittel på bookingen.");
            idempotencyKey.current ??= crypto.randomUUID();
            const startLocal = `${date}T${start}:00`;
            const endLocal = `${date}T${end}:00`;
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
            setRoomId("");
            setRepeat(false);
          } catch (error) {
            setResult({ type: "error", text: error instanceof Error ? error.message : "Forespørselen kunne ikke sendes." });
          } finally {
            setSubmitting(false);
          }
        }}>
          <BookingSlotPicker
            rooms={rooms}
            busy={busy}
            loading={availabilityLoading}
            error={availabilityError}
            onRetry={() => { availabilityLoader.clear(); setAvailabilityState({ week, loading: true, error: "" }); setAvailabilityRetry(value => value + 1); }}
            date={date}
            start={start}
            end={end}
            roomId={roomId}
            today={minDate}
            now={now}
            onTimeChange={(day, from, to) => { setDate(day); setStart(from); setEnd(to); setResult(null); }}
            onRoomChange={(id) => { setRoomId(id); setResult(null); }}
          />
          <div className="booking-step booking-recurrence">
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
          <div className="booking-submit"><div className="booking-submit-action"><button disabled={submitting || Boolean(selectionError || recurrenceError) || availabilityLoading || Boolean(availabilityError)} type="submit">{submitting ? "Sender …" : "Be om booking"}<i className="ph ph-arrow-right" /></button><p className="booking-submit-summary" aria-live="polite">{selectionError || `${selectedRoom?.name}, ${new Intl.DateTimeFormat("nb-NO", { weekday: "long", day: "numeric", month: "long" }).format(new Date(`${date}T12:00:00`))} kl. ${start}–${end}`}</p></div><p>Vi lagrer navn, e-post og formål for å behandle forespørselen. Les <a href="https://portal.framntnu.no/personvern#romforesporsler">personvernerklæringen</a>. Beskyttet av reCAPTCHA; <a href="https://policies.google.com/privacy?hl=no">Googles personvernregler</a> og <a href="https://policies.google.com/terms?hl=no">vilkår</a> gjelder.</p></div>
        </form>
      )}
    </section>
  );
}
