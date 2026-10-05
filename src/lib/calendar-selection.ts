// Shared between fram-portal and fram-website-migrated. Keep both copies identical.

export type OpeningHours = Record<
  string,
  { open: string; close: string } | null
>;
export type BusyInterval = { start: string; end: string };
export type BookableRoom = {
  id: string;
  slug: string;
  name: string;
  capacity: number | null;
  showAvailability: boolean;
  acceptingRequests: boolean;
  bookingHorizonDays: number;
  minDurationMinutes: number;
  maxDurationMinutes: number;
  openingHours: OpeningHours;
};

export const minuteOfDay = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};
export const timeLabel = (minute: number) =>
  `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
export const addDaysTo = (date: string, days: number) => {
  const day = new Date(`${date}T12:00:00`);
  day.setDate(day.getDate() + days);
  return `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
};
/** Opening-hours key: "1" = Monday … "7" = Sunday. */
export const weekdayKey = (date: string) =>
  String(((new Date(`${date}T12:00:00`).getDay() + 6) % 7) + 1);
/** Local instant for a minute of a calendar day; minute 1440 is the next midnight. */
export const instantAt = (date: string, minute: number) =>
  minute >= 1440
    ? Date.parse(`${addDaysTo(date, 1)}T00:00:00`)
    : Date.parse(`${date}T${timeLabel(minute)}:00`);

export function calendarSelection(
  anchor: number,
  current: number,
  open: number,
  close: number,
  minimum: number,
  maximum: number,
  busy: { start: number; end: number }[],
) {
  const backwards = current < anchor;
  let start = backwards ? Math.max(open, current, anchor - maximum) : anchor;
  let end = backwards ? anchor : Math.min(close, current, anchor + maximum);
  if (backwards) {
    const previous = busy
      .filter((item) => item.end <= end)
      .sort((a, b) => b.end - a.end)[0];
    if (previous && previous.end > start) start = previous.end;
  } else {
    const next = busy.find((item) => item.start >= start);
    if (next) end = Math.min(end, next.start);
  }
  if (end - start < minimum) {
    if (backwards) start = end - minimum;
    else end = start + minimum;
  }
  if (
    start < open ||
    end > close ||
    end - start > maximum ||
    busy.some((item) => item.start < end && item.end > start)
  )
    return null;
  return { start, end };
}

// Every day in the displayed week shares the same availability response.
export function availabilityWeek(date: string) {
  const monday = new Date(`${date}T12:00:00`);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, "0")}-${String(monday.getDate()).padStart(2, "0")}`;
}

/**
 * Pack simultaneous events into columns. Each event also gets a `span`: how many
 * columns it may stretch to the right without covering another event, so a short
 * overlap does not squeeze every event in the group into a sliver.
 */
export function calendarEventLayout<T extends { start: number; end: number }>(
  events: T[],
) {
  const sorted = [...events].sort((a, b) => a.start - b.start || a.end - b.end);
  type Placed = T & { column: number; columns: number; span: number };
  const result: Placed[] = [];
  let group: Placed[] = [];
  let ends: number[] = [];
  let groupEnd = -Infinity;
  const finish = () => {
    for (const event of group) {
      event.columns = ends.length;
      let span = 1;
      for (let column = event.column + 1; column < ends.length; column++) {
        const blocked = group.some(
          (other) =>
            other.column === column &&
            other.start < event.end &&
            other.end > event.start,
        );
        if (blocked) break;
        span++;
      }
      event.span = span;
    }
    result.push(...group);
    group = [];
    ends = [];
  };
  for (const event of sorted) {
    if (event.start >= groupEnd) finish();
    let column = ends.findIndex((end) => end <= event.start);
    if (column < 0) column = ends.length;
    ends[column] = event.end;
    group.push({ ...event, column, columns: 1, span: 1 });
    groupEnd = group.length === 1 ? event.end : Math.max(groupEnd, event.end);
  }
  finish();
  return result;
}

export const roomCalendarColor = (slug: string) =>
  ({
    bananrommet: "#FDC82F",
    fellesrommet: "#47b99f",
    "lille-moterom": "#E85A5A",
    scenerommet: "#ed9945",
    "store-moterom": "#2E86C1",
  })[slug] ?? "#1a1a1a";

const durationLabel = (minutes: number) =>
  minutes < 60
    ? `${minutes} min`
    : minutes % 60 === 0
      ? `${minutes / 60} t`
      : `${Math.floor(minutes / 60)} t ${minutes % 60} min`;

/** Last bookable date for a room, or "9999-12-31" when it has no horizon. */
export const roomHorizon = (room: BookableRoom, today: string) =>
  room.bookingHorizonDays
    ? addDaysTo(today, room.bookingHorizonDays)
    : "9999-12-31";

/** Whether a room can take the chosen time, with a short reason for the room card. */
export function roomFit(
  room: BookableRoom,
  {
    date,
    start,
    end,
    busy,
    today,
  }: {
    date: string;
    start: string;
    end: string;
    busy: BusyInterval[];
    today: string;
  },
): { available: boolean; reason: string } {
  if (!room.acceptingRequests)
    return { available: false, reason: "Ikke åpnet ennå" };
  if (!start || !end || end <= start)
    return { available: false, reason: "Velg tidspunkt først" };
  const opening = room.openingHours[weekdayKey(date)];
  if (!opening) return { available: false, reason: "Stengt denne dagen" };
  if (date > roomHorizon(room, today))
    return {
      available: false,
      reason: `Kan bookes ${room.bookingHorizonDays} dager frem`,
    };
  if (start < opening.open || end > opening.close)
    return {
      available: false,
      reason: `Åpent ${opening.open}–${opening.close}`,
    };
  const duration = minuteOfDay(end) - minuteOfDay(start);
  if (duration < room.minDurationMinutes)
    return {
      available: false,
      reason: `Minst ${durationLabel(room.minDurationMinutes)}`,
    };
  if (duration > room.maxDurationMinutes)
    return {
      available: false,
      reason: `Maks ${durationLabel(room.maxDurationMinutes)}`,
    };
  if (!room.showAvailability)
    return { available: true, reason: "Ledighet bekreftes av Fram" };
  const from = instantAt(date, minuteOfDay(start));
  const to = instantAt(date, minuteOfDay(end));
  if (
    busy.some(
      (item) => Date.parse(item.start) < to && Date.parse(item.end) > from,
    )
  )
    return { available: false, reason: "Opptatt" };
  return { available: true, reason: "Ledig" };
}

/**
 * Minutes of a day where none of the given rooms is free (busy or closed), in
 * 15-minute steps. Used to stop a selection where no room could take it.
 */
export function sharedBlockedMinutes(
  rooms: BookableRoom[],
  busy: Record<string, BusyInterval[]>,
  date: string,
) {
  const key = weekdayKey(date);
  const parsed = rooms.map((room) => ({
    opening: room.openingHours[key],
    busy: (busy[room.id] ?? []).map((item) => ({
      start: Date.parse(item.start),
      end: Date.parse(item.end),
    })),
  }));
  const blocked: { start: number; end: number }[] = [];
  for (let minute = 0; minute < 1440; minute += 15) {
    const from = instantAt(date, minute);
    const to = instantAt(date, minute + 15);
    const free = parsed.some(
      (room) =>
        room.opening &&
        minuteOfDay(room.opening.open) <= minute &&
        minuteOfDay(room.opening.close) >= minute + 15 &&
        !room.busy.some((item) => item.start < to && item.end > from),
    );
    if (free) continue;
    const last = blocked.at(-1);
    if (last && last.end === minute) last.end = minute + 15;
    else blocked.push({ start: minute, end: minute + 15 });
  }
  return blocked;
}

/** The first problem with a selection, or "" when it can be submitted. */
export function bookingSelectionError({
  room,
  date,
  start,
  end,
  busy,
  now,
  today,
}: {
  room?: BookableRoom;
  date: string;
  start: string;
  end: string;
  busy: Record<string, BusyInterval[]>;
  now: number;
  today: string;
}) {
  if (!start || !end) return "Velg et tidspunkt i kalenderen.";
  if (end <= start) return "Sluttid må være etter starttid.";
  if (instantAt(date, minuteOfDay(start)) <= now)
    return "Velg et tidspunkt frem i tid.";
  if (!room) return "Velg et rom.";
  const fit = roomFit(room, {
    date,
    start,
    end,
    busy: busy[room.id] ?? [],
    today,
  });
  return fit.available ? "" : `${room.name}: ${fit.reason.toLowerCase()}.`;
}
