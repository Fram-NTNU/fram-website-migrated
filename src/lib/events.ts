// Public event contract exported by the portal. Private review/account fields
// never belong in this payload.
export type EventItem = {
  id: string;
  title: string;
  summary: string;
  body: string;
  image_url: string | null;
  image_alt: string;
  logo_url: string | null;
  logo_alt: string;
  logo_on_dark: boolean;
  source_url: string;
  category: string;
  host: string;
  location: string;
  starts_at: string;
  ends_at: string | null;
  all_day: boolean;
  registration: "drop_in" | "external" | "not_open";
  registration_url: string;
  cancelled: boolean;
  is_fram: boolean;
};

const format = (value: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("nb-NO", { ...options, timeZone: "Europe/Oslo" }).format(new Date(value));
export const eventDateKey = (value: string) =>
  new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Oslo" }).format(new Date(value));

export function eventSchedule(event: EventItem) {
  const end = event.ends_at ?? event.starts_at;
  const sameDay = eventDateKey(event.starts_at) === eventDateKey(end);
  const date = (value: string) => format(value, { day: "numeric", month: "long", year: "numeric" });
  const time = (value: string) => format(value, { hour: "2-digit", minute: "2-digit" });
  return {
    date: `${date(event.starts_at)}${sameDay ? "" : ` – ${date(end)}`}`,
    time: event.all_day ? "Hele dagen" : `${time(event.starts_at)}${!event.ends_at || Date.parse(event.starts_at) === Date.parse(end) ? "" : `–${time(end)}`}`,
  };
}

export function eventDate(event: EventItem) {
  const end = event.ends_at ?? event.starts_at;
  const first = format(event.starts_at, { day: "2-digit" }).replace(".", "");
  const last = format(end, { day: "2-digit" }).replace(".", "");
  const sameDay = eventDateKey(event.starts_at) === eventDateKey(end);
  const sameMonth = eventDateKey(event.starts_at).slice(0, 7) === eventDateKey(end).slice(0, 7);
  const weekday = format(event.starts_at, { weekday: "long" });
  const time = eventSchedule(event).time;
  return {
    day: sameDay ? first : sameMonth ? `${first}–${last}` : first,
    month: format(event.starts_at, { month: "short" }).replace(".", ""),
    year: format(event.starts_at, { year: "numeric" }),
    detail: `${weekday} · ${event.all_day ? time : `kl. ${time}`}`,
  };
}

export function eventWhen(event: EventItem) {
  const schedule = eventSchedule(event);
  return `${schedule.date} · ${event.all_day ? schedule.time : `kl. ${schedule.time}`}`;
}

export function isUpcoming(event: EventItem, now: number) {
  // Without an end time, keep the event listed for its local calendar day.
  // This does not invent a duration or expose a made-up end time.
  return event.all_day || !event.ends_at
    ? eventDateKey(event.ends_at ?? event.starts_at) >= eventDateKey(new Date(now).toISOString())
    : Date.parse(event.ends_at) >= now;
}

// Retain the existing programme when the portal integration is not configured.
// Once configured, the portal is the only source, including an empty programme.
const lunch = (date: string): EventItem => ({
  id: `bread-${date}`, title: "Bread n' Spread",
  summary: "Ta en pause fra lesesalen og stikk innom Fram til lunsj.",
  body: "Gratis lunsj kl. 12. Ingen påmelding, bare å møte opp ved inngangen ut mot busstoppet på Gløshaugen.",
  logo_url: null, logo_alt: "", logo_on_dark: false,
  image_url: "/assets/bns-nov6.webp", image_alt: "Lunsj på Fram", source_url: "", category: "Sosialt",
  host: "Fram", location: "Fellesrommet", starts_at: `${date}T12:00:00+02:00`, ends_at: null,
  all_day: false, registration: "drop_in", registration_url: "", cancelled: false, is_fram: true,
});
export const fallbackEvents: EventItem[] = [
  lunch("2026-09-16"), lunch("2026-10-23"),
  { ...lunch("2026-11-12"), starts_at: "2026-11-12T12:00:00+01:00", ends_at: null },
  { ...lunch("2026-12-01"), id: "julegrot-2026", title: "Julegrøt", summary: "Tradisjonell julegrøt i Fellesrommet før eksamensinnspurten.", body: "Grøt, kos og kanskje mandel i skåla. Ta med godt humør.", image_url: "/assets/fram-fellesrom.webp", image_alt: "Fellesrommet på Fram", starts_at: "2026-12-01T00:00:00+01:00", ends_at: null, all_day: true },
  { ...lunch("2026-08-19"), id: "innovasjonsdagene-2026", title: "Innovasjonsdagene '26", summary: "To fine dager i Gruva der Fram-organisasjonene viste frem prosjektene sine.", body: "Nye og gamle studenter ble kjent med innovasjonsmiljøet på NTNU.", location: "Gruva", image_url: "/assets/innovasjonsdagene-hovedscenen.avif", image_alt: "Innovasjonsdagene i Gruva", starts_at: "2026-08-19T00:00:00+02:00", ends_at: "2026-08-20T00:00:00+02:00", all_day: true, source_url: "/innovasjonsdagene" },
];
