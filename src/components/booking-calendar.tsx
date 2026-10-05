"use client";
// Shared between fram-portal and fram-website-migrated. Keep both copies identical.

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { useBookingClock } from "@/lib/booking-clock";
import {
  calendarSelection,
  calendarEventLayout,
  minuteOfDay,
  timeLabel,
} from "@/lib/calendar-selection";

type Interval = {
  start: string;
  end: string;
  title?: string;
  roomId?: string;
  roomName?: string;
  color?: string;
  bookingId?: string;
  organizationName?: string;
};
type Hours = Record<string, { open: string; close: string } | null>;
export const calendarDate = (day: Date) =>
  `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
const shiftDay = (day: Date, amount: number) => {
  const next = new Date(day);
  next.setDate(next.getDate() + amount);
  return next;
};

/** Calendar date and minute of day for an instant, optionally in a fixed time zone. */
const zonedParts = (ms: number, timeZone?: string) => {
  if (!timeZone) {
    const day = new Date(ms);
    return {
      date: calendarDate(day),
      minute: day.getHours() * 60 + day.getMinutes(),
    };
  }
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(ms)
      .map((part) => [part.type, part.value]),
  );
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    minute: Number(parts.hour) * 60 + Number(parts.minute),
  };
};
/** Midnight of a calendar date as an instant, optionally in a fixed time zone. */
const dayBoundary = (date: string, timeZone?: string) => {
  if (!timeZone) return new Date(`${date}T00:00:00`).getTime();
  const target = Date.parse(`${date}T00:00:00Z`);
  let guess = target;
  for (let step = 0; step < 2; step++) {
    const local = zonedParts(guess, timeZone);
    guess +=
      target - Date.parse(`${local.date}T${timeLabel(local.minute)}:00Z`);
  }
  return guess;
};

const subscribeViewport = (onChange: () => void) => {
  const media = window.matchMedia("(max-width: 760px)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const mobileViewport = () => window.matchMedia("(max-width: 760px)").matches;
const serverViewport = () => false;

const Chevron = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
  </svg>
);

const Icon = ({ paths }: { paths: string[] }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {paths.map((d) => (
      <path key={d} d={d} />
    ))}
  </svg>
);
const minusIcon = ["M5 12h14"];
const plusIcon = ["M5 12h14", "M12 5v14"];
// Standard maximize / minimize corners.
const maximizeIcon = [
  "M8 3H5a2 2 0 0 0-2 2v3",
  "M21 8V5a2 2 0 0 0-2-2h-3",
  "M3 16v3a2 2 0 0 0 2 2h3",
  "M16 21h3a2 2 0 0 0 2-2v-3",
];
const minimizeIcon = [
  "M8 3v3a2 2 0 0 1-2 2H3",
  "M21 8h-3a2 2 0 0 1-2-2V3",
  "M3 16h3a2 2 0 0 1 2 2v3",
  "M16 21v-3a2 2 0 0 1 2-2h3",
];

const EVENT_LINE = 14;
/** Zoom levels for hour height and column width. 1 is the default size. */
const ZOOM_LEVELS = [0.75, 1, 1.25, 1.5, 2, 2.5];
const DEFAULT_ZOOM = ZOOM_LEVELS.indexOf(1);
const ZOOM_KEY = "fram-calendar-zoom-factor";
// Zoom is a per-viewer preference shared by every calendar on the page.
let memoryZoom = DEFAULT_ZOOM;
const zoomListeners = new Set<() => void>();
const subscribeZoom = (listener: () => void) => {
  zoomListeners.add(listener);
  return () => {
    zoomListeners.delete(listener);
  };
};
const readZoom = () => {
  try {
    const level = ZOOM_LEVELS.indexOf(Number(localStorage.getItem(ZOOM_KEY)));
    if (level >= 0) return level;
  } catch {}
  return memoryZoom;
};
const writeZoom = (level: number) => {
  memoryZoom = level;
  try {
    localStorage.setItem(ZOOM_KEY, String(ZOOM_LEVELS[level]));
  } catch {}
  zoomListeners.forEach((listener) => listener());
};
/** Variables the calendar styles read; copied onto the full-screen overlay. */
const THEME_VARIABLES = [
  "--ink",
  "--ink-soft",
  "--line",
  "--line-strong",
  "--yellow",
  "--bg",
  "--bg-soft",
  "--paper",
  "--soft",
  "--muted",
  "--blue",
  "--white",
  "--action",
  "--room-color",
];

export function BookingCalendar({
  roomName,
  date,
  start,
  end,
  busy,
  hours,
  minDate,
  maxDate,
  minDuration,
  maxDuration,
  loading,
  error,
  onChoose,
  onDateChange,
  onRetry,
  comparisonRooms,
  selectable = !comparisonRooms,
  blocked,
  onBookingClick,
  timeZone,
  showDateInput = Boolean(comparisonRooms) && !selectable,
  comparisonLabel = "valgte rom",
  emptySelectionLabel = "Velg minst ett rom for å se ledigheten.",
  renderRetry,
  filters,
}: {
  /** Room/equipment filters shown above the calendar, also in full screen. */
  filters?: ReactNode;
  timeZone?: string;
  comparisonLabel?: string;
  emptySelectionLabel?: string;
  onBookingClick?: (id: string, start: string, end: string) => void;
  comparisonRooms?: {
    id: string;
    name: string;
    color: string;
    busy: Interval[];
    hours: Hours;
  }[];
  /** Let the user drag out a time. Defaults to true for single-room calendars. */
  selectable?: boolean;
  /** Minutes of a day that cannot be selected. Defaults to the merged busy time. */
  blocked?: (date: string) => { start: number; end: number }[];
  showDateInput?: boolean;
  renderRetry?: (onRetry: () => void) => ReactNode;
  roomName: string;
  date: string;
  start: string;
  end: string;
  busy: Interval[];
  hours: Hours;
  minDate: string;
  maxDate: string;
  minDuration: number;
  maxDuration: number;
  loading: boolean;
  error: string;
  onChoose: (date: string, start: string, end: string) => void;
  onDateChange: (date: string) => void;
  onRetry: () => void;
}) {
  const now = useBookingClock();
  const current = zonedParts(now, timeZone);
  const todayDate = current.date;
  const currentMinute = current.minute;
  const eventMinute = (value: string) =>
    zonedParts(Date.parse(value), timeZone).minute;
  const mobile = useSyncExternalStore(
    subscribeViewport,
    mobileViewport,
    serverViewport,
  );
  const [preferredMode, setMode] = useState<"day" | "week" | null>(null);
  const mode = preferredMode ?? (mobile ? "day" : "week");
  const zoom = useSyncExternalStore(
    subscribeZoom,
    readZoom,
    () => DEFAULT_ZOOM,
  );
  const [overlay, setOverlay] = useState<{
    className: string;
    style: CSSProperties;
  } | null>(null);
  // Full screen is a desktop feature; on phones the page already is the calendar.
  const expanded = Boolean(overlay) && !mobile;
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const zoomFactor = ZOOM_LEVELS[zoom];
  const hourHeight = (mode === "day" ? 88 : 56) * zoomFactor;
  const columnWidth = (mode === "week" ? 96 : 160) * zoomFactor;
  // Zoom keeps the same time at the top of the view.
  const changeZoom = (step: number) => {
    const level = Math.min(ZOOM_LEVELS.length - 1, Math.max(0, zoom + step));
    if (level === zoom) return;
    const element = scrollRef.current;
    const ratio = ZOOM_LEVELS[level] / ZOOM_LEVELS[zoom];
    const top = element?.scrollTop ?? 0;
    const left = element?.scrollLeft ?? 0;
    writeZoom(level);
    requestAnimationFrame(() => {
      if (!element) return;
      element.scrollTop = top * ratio;
      element.scrollLeft = left * ratio;
    });
  };
  const changeZoomRef = useRef(changeZoom);
  useEffect(() => {
    changeZoomRef.current = changeZoom;
  });
  // Ctrl/⌘ + scroll (and trackpad pinch) zooms the calendar instead of the page.
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    let pending = 0;
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      pending += event.deltaY;
      if (Math.abs(pending) < 40) return;
      const direction = pending < 0 ? 1 : -1;
      pending = 0;
      changeZoomRef.current(direction);
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [expanded]);
  const openOverlay = () => {
    const root = rootRef.current;
    if (!root) return;
    // The overlay lives on <body>, so it borrows the host's classes and theme.
    const host = root.closest<HTMLElement>(".booking-system") ?? root;
    const computed = getComputedStyle(root);
    const style: Record<string, string> = {
      fontFamily: computed.fontFamily,
      color: computed.color,
    };
    for (const name of THEME_VARIABLES) {
      const value = computed.getPropertyValue(name).trim();
      if (value) style[name] = value;
    }
    setOverlay({ className: host.className, style: style as CSSProperties });
  };
  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOverlay(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);
  const selected = new Date(`${date}T12:00:00`);
  const monday = shiftDay(selected, -((selected.getDay() + 6) % 7));
  const days =
    mode === "day"
      ? [selected]
      : Array.from({ length: 7 }, (_, index) => shiftDay(monday, index));
  const combinedBusy =
    comparisonRooms?.flatMap((room) =>
      room.busy.map((event) => ({
        ...event,
        roomId: room.id,
        roomName: room.name,
        color: room.color,
      })),
    ) ?? busy;
  const combinedHours: Hours = comparisonRooms
    ? Object.fromEntries(
        Array.from({ length: 7 }, (_, index) => {
          const day = String(index + 1);
          const openings = comparisonRooms
            .map((room) => room.hours[day])
            .filter((value) => value != null);
          return [
            day,
            openings.length
              ? {
                  open: openings.map((value) => value.open).sort()[0],
                  close: openings
                    .map((value) => value.close)
                    .sort()
                    .at(-1)!,
                }
              : null,
          ];
        }),
      )
    : hours;
  const opening = Object.values(combinedHours).filter(
    (value) => value !== null,
  );
  const firstMinute = opening.length
    ? Math.floor(
        Math.min(...opening.map((value) => minuteOfDay(value.open))) / 60,
      ) * 60
    : 360;
  const lastMinute = opening.length
    ? Math.max(...opening.map((value) => minuteOfDay(value.close)))
    : 1440;
  const minutes = lastMinute - firstMinute;
  const slots = Array.from(
    { length: Math.ceil(minutes / 30) },
    (_, index) => firstMinute + index * 30,
  );
  const drag = useRef<{ pointerId: number; anchor: number } | null>(null);
  const previous = shiftDay(selected, mode === "day" ? -1 : -7);
  const next = shiftDay(selected, mode === "day" ? 1 : 7);
  function changePeriod(nextDate: Date) {
    onDateChange([minDate, calendarDate(nextDate), maxDate].sort()[1]);
  }
  const dateFormat = new Intl.DateTimeFormat("nb-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const calendar = (
    <div
      ref={rootRef}
      className={`booking-calendar ${comparisonRooms ? "booking-calendar-comparison" : ""} ${selectable ? "booking-calendar-selectable" : ""} ${expanded ? "booking-calendar-expanded" : ""}`}
      role={expanded ? "dialog" : undefined}
      aria-modal={expanded ? true : undefined}
      aria-label={expanded ? "Kalender i fullskjerm" : undefined}
    >
      {filters}
      <div className="booking-calendar-toolbar">
        {/* Left: where you are in time. Right: how the calendar is shown. */}
        <div
          className="booking-calendar-controls booking-calendar-period-controls"
          role="group"
          aria-label="Periode"
        >
          <button
            type="button"
            className="booking-calendar-today"
            onClick={() => onDateChange(zonedParts(Date.now(), timeZone).date)}
          >
            I dag
          </button>
          <div className="booking-calendar-navigation">
            <button
              type="button"
              aria-label="Forrige periode"
              disabled={
                calendarDate(mode === "week" ? monday : selected) <= minDate
              }
              onClick={() => changePeriod(previous)}
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              aria-label="Neste periode"
              disabled={
                calendarDate(
                  mode === "week" ? shiftDay(monday, 6) : selected,
                ) >= maxDate
              }
              onClick={() => changePeriod(next)}
            >
              <Chevron direction="right" />
            </button>
          </div>
          <h3 className="booking-calendar-period" aria-live="polite">
            {new Intl.DateTimeFormat("nb-NO", {
              month: "long",
              year: "numeric",
            }).formatRange(days[0], days.at(-1)!)}
          </h3>
          {showDateInput ? (
            <div className="booking-fields booking-availability-date">
              <label>
                <span className="sr-only">Dato</span>
                <input
                  type="date"
                  value={date}
                  min={minDate}
                  max={maxDate}
                  onChange={(event) => {
                    if (event.target.value) onDateChange(event.target.value);
                  }}
                />
              </label>
            </div>
          ) : null}
        </div>
        <div
          className="booking-calendar-controls booking-calendar-display-controls"
          role="group"
          aria-label="Visning"
        >
          <div
            className="booking-calendar-modes"
            role="group"
            aria-label="Vis dag eller uke"
          >
            <button
              type="button"
              aria-pressed={mode === "day"}
              onClick={() => setMode("day")}
            >
              Dag
            </button>
            <button
              type="button"
              aria-pressed={mode === "week"}
              onClick={() => setMode("week")}
            >
              Uke
            </button>
          </div>
          <div
            className="booking-calendar-size"
            role="group"
            aria-label="Størrelse på kalenderen"
          >
            <button
              type="button"
              className="booking-calendar-icon-button"
              disabled={zoom === 0}
              onClick={() => changeZoom(-1)}
              aria-label="Zoom ut"
              title="Zoom ut (Ctrl/⌘ + scroll)"
            >
              <Icon paths={minusIcon} />
            </button>
            <output className="booking-calendar-zoom" aria-live="polite">
              {Math.round(zoomFactor * 100)} %
            </output>
            <button
              type="button"
              className="booking-calendar-icon-button"
              disabled={zoom === ZOOM_LEVELS.length - 1}
              onClick={() => changeZoom(1)}
              aria-label="Zoom inn"
              title="Zoom inn (Ctrl/⌘ + scroll)"
            >
              <Icon paths={plusIcon} />
            </button>
            {!mobile && (
              <button
                type="button"
                className="booking-calendar-icon-button booking-calendar-fullscreen"
                onClick={() => (overlay ? setOverlay(null) : openOverlay())}
                aria-label={expanded ? "Lukk fullskjerm" : "Fullskjerm"}
                title={expanded ? "Lukk fullskjerm (Esc)" : "Fullskjerm"}
              >
                <Icon paths={expanded ? minimizeIcon : maximizeIcon} />
              </button>
            )}
          </div>
        </div>
      </div>

      {selectable ? (
        <p className="booking-calendar-help">
          {expanded
            ? "Dra i kalenderen for å velge start og slutt."
            : "Dra i kalenderen for å velge start og slutt, eller bruk klokkeslettene under."}
        </p>
      ) : onBookingClick ? (
        <p className="booking-calendar-help">
          Klikk på en booking for å se flere detaljer.
        </p>
      ) : null}
      <div className="booking-calendar-surface">
        {comparisonRooms?.length === 0 ? (
          <p className="booking-calendar-status" role="status">
            {emptySelectionLabel}
          </p>
        ) : loading ? (
          <p className="booking-calendar-status" role="status">
            Henter ledige tider …
          </p>
        ) : error ? (
          <div className="booking-calendar-status" role="alert">
            <p>Vi kunne ikke kontrollere ledigheten. {error}</p>
            {renderRetry ? (
              renderRetry(onRetry)
            ) : (
              <button
                type="button"
                className="booking-calendar-retry"
                onClick={onRetry}
              >
                Prøv igjen
              </button>
            )}
          </div>
        ) : null}
        <div
          ref={scrollRef}
          className="booking-calendar-scroll"
          tabIndex={0}
          role="region"
          aria-busy={loading}
          aria-label={`${mode === "week" ? "Ukekalender" : "Dagskalender"} for ${comparisonRooms ? comparisonLabel : roomName}`}
        >
          <div
            className={`booking-calendar-grid ${mode}`}
            style={{
              gridTemplateColumns: `52px repeat(${days.length}, minmax(${columnWidth}px, 1fr))`,
            }}
          >
            <div className="booking-calendar-time-heading">Tid</div>
            {days.map((day) => (
              <div
                key={calendarDate(day)}
                className={`booking-calendar-day-heading ${calendarDate(day) === date ? "selected" : ""} ${now && calendarDate(day) === todayDate ? "today" : ""}`}
              >
                <span>
                  {new Intl.DateTimeFormat("nb-NO", {
                    weekday: "short",
                  }).format(day)}
                </span>
                <strong>{day.getDate()}</strong>
              </div>
            ))}
            <div
              className="booking-calendar-axis"
              style={{ height: (minutes / 60) * hourHeight }}
            >
              {slots
                .filter((minute) => minute % 60 === 0)
                .map((minute) => (
                  <span
                    key={minute}
                    style={{ top: ((minute - firstMinute) / 60) * hourHeight }}
                  >
                    {timeLabel(minute)}
                  </span>
                ))}
            </div>
            {days.map((day) => {
              const value = calendarDate(day);
              const dayStart = dayBoundary(value, timeZone);
              const dayEnd = dayBoundary(
                calendarDate(shiftDay(day, 1)),
                timeZone,
              );
              const open = combinedHours[String(((day.getDay() + 6) % 7) + 1)];
              const openAt = open
                ? Math.max(
                    minuteOfDay(open.open),
                    selectable && value === todayDate
                      ? (Math.floor(currentMinute / 15) + 1) * 15
                      : 0,
                  )
                : 0;
              const closeAt = open ? minuteOfDay(open.close) : 0;
              const intervals = combinedBusy
                .filter(
                  (item) =>
                    Date.parse(item.start) < dayEnd &&
                    Date.parse(item.end) > dayStart,
                )
                .map((item) => ({
                  start: Math.max(
                    firstMinute,
                    Date.parse(item.start) <= dayStart
                      ? firstMinute
                      : eventMinute(item.start),
                  ),
                  end: Math.min(
                    lastMinute,
                    Date.parse(item.end) >= dayEnd
                      ? lastMinute
                      : eventMinute(item.end),
                  ),
                  title: item.title || "Opptatt",
                  roomName: item.roomName,
                  color: item.color,
                  bookingId: item.bookingId,
                  organizationName: item.organizationName,
                  occurrenceStart: item.start,
                  occurrenceEnd: item.end,
                }))
                .filter((item) => item.end > item.start)
                .sort((a, b) => a.start - b.start);
              // Selection stops at time nobody can book; by default that is the merged busy time.
              const merged: { start: number; end: number }[] = blocked
                ? blocked(value)
                : [];
              if (!blocked)
                for (const interval of intervals) {
                  const last = merged.at(-1);
                  if (last && interval.start <= last.end)
                    last.end = Math.max(last.end, interval.end);
                  else
                    merged.push({ start: interval.start, end: interval.end });
                }
              const minuteAt = (clientY: number, element: HTMLElement) =>
                ((clientY - element.getBoundingClientRect().top) / hourHeight) *
                  60 +
                firstMinute;
              return (
                <div
                  key={value}
                  className={`booking-calendar-column ${value < minDate || value > maxDate ? "outside-window" : ""}`}
                  style={{ height: (minutes / 60) * hourHeight }}
                  onPointerDown={(event) => {
                    if (!selectable) return;
                    const target = (
                      event.target as HTMLElement
                    ).closest<HTMLButtonElement>(
                      "button.booking-calendar-slot",
                    );
                    if (!target || target.disabled || event.button !== 0)
                      return;
                    const anchor =
                      Math.floor(
                        minuteAt(event.clientY, event.currentTarget) / 15,
                      ) * 15;
                    const range = calendarSelection(
                      anchor,
                      anchor,
                      openAt,
                      closeAt,
                      minDuration,
                      maxDuration,
                      merged,
                    );
                    if (!range) return;
                    event.preventDefault();
                    target.focus({ preventScroll: true });
                    drag.current = { pointerId: event.pointerId, anchor };
                    event.currentTarget.setPointerCapture(event.pointerId);
                    onChoose(
                      value,
                      timeLabel(range.start),
                      timeLabel(range.end),
                    );
                  }}
                  onPointerMove={(event) => {
                    if (
                      !drag.current ||
                      drag.current.pointerId !== event.pointerId
                    )
                      return;
                    const raw = minuteAt(event.clientY, event.currentTarget);
                    const pointer =
                      (raw < drag.current.anchor
                        ? Math.floor(raw / 15)
                        : Math.ceil(raw / 15)) * 15;
                    const range = calendarSelection(
                      drag.current.anchor,
                      pointer,
                      openAt,
                      closeAt,
                      minDuration,
                      maxDuration,
                      merged,
                    );
                    if (range)
                      onChoose(
                        value,
                        timeLabel(range.start),
                        timeLabel(range.end),
                      );
                  }}
                  onPointerUp={(event) => {
                    if (drag.current?.pointerId !== event.pointerId) return;
                    drag.current = null;
                    if (event.currentTarget.hasPointerCapture(event.pointerId))
                      event.currentTarget.releasePointerCapture(
                        event.pointerId,
                      );
                  }}
                  onPointerCancel={() => {
                    drag.current = null;
                  }}
                  onLostPointerCapture={() => {
                    drag.current = null;
                  }}
                >
                  {slots.map((minute) => {
                    const nextBusy =
                      merged.find((item) => item.start > minute)?.start ??
                      closeAt;
                    const slotEnd = Math.min(
                      minute + minDuration,
                      closeAt,
                      nextBusy,
                    );
                    const occupied = merged.some(
                      (item) => item.start < slotEnd && item.end > minute,
                    );
                    const unavailable =
                      !selectable ||
                      loading ||
                      Boolean(error) ||
                      !open ||
                      value < minDate ||
                      value > maxDate ||
                      minute < openAt ||
                      slotEnd - minute < minDuration ||
                      occupied;
                    return (
                      <button
                        key={minute}
                        type="button"
                        className={`booking-calendar-slot ${minute < openAt || minute >= closeAt || !open ? "closed" : ""}`}
                        disabled={unavailable}
                        aria-hidden={selectable ? undefined : true}
                        tabIndex={selectable ? undefined : -1}
                        aria-label={`${dateFormat.format(day)}, ${timeLabel(minute)}–${timeLabel(slotEnd)}`}
                        style={{
                          top: ((minute - firstMinute) / 60) * hourHeight,
                          height:
                            (Math.min(30, lastMinute - minute) / 60) *
                            hourHeight,
                        }}
                        onKeyDown={(event) => {
                          if (
                            !event.shiftKey ||
                            (event.key !== "ArrowDown" &&
                              event.key !== "ArrowUp")
                          )
                            return;
                          event.preventDefault();
                          const anchor =
                            value === date && start
                              ? minuteOfDay(start)
                              : minute;
                          const currentEnd =
                            value === date && end
                              ? minuteOfDay(end)
                              : anchor + minDuration;
                          const range = calendarSelection(
                            anchor,
                            currentEnd + (event.key === "ArrowDown" ? 15 : -15),
                            openAt,
                            closeAt,
                            minDuration,
                            maxDuration,
                            merged,
                          );
                          if (range)
                            onChoose(
                              value,
                              timeLabel(range.start),
                              timeLabel(range.end),
                            );
                        }}
                        onClick={(event) => {
                          if (event.detail === 0)
                            onChoose(
                              value,
                              timeLabel(minute),
                              timeLabel(slotEnd),
                            );
                        }}
                      >
                        <span>{timeLabel(minute)}</span>
                      </button>
                    );
                  })}
                  {calendarEventLayout(intervals).map((interval, index) => {
                    const clickable = Boolean(
                      interval.bookingId && onBookingClick,
                    );
                    const Event = clickable ? "button" : "div";
                    const height =
                      ((interval.end - interval.start) / 60) * hourHeight;
                    const compact = height < EVENT_LINE * 2 + 8;
                    const time = `${timeLabel(interval.start)}–${timeLabel(interval.end)}`;
                    const details = [
                      interval.title,
                      interval.organizationName,
                      interval.roomName,
                      time,
                    ]
                      .filter(Boolean)
                      .join(" · ");
                    return (
                      <Event
                        type={clickable ? "button" : undefined}
                        onClick={
                          clickable
                            ? () =>
                                onBookingClick!(
                                  interval.bookingId!,
                                  interval.occurrenceStart,
                                  interval.occurrenceEnd,
                                )
                            : undefined
                        }
                        aria-label={clickable ? details : undefined}
                        key={`${interval.start}-${interval.end}-${index}`}
                        className={`booking-calendar-occupied ${compact ? "compact" : ""} ${clickable ? "booking-calendar-managed" : ""}`}
                        style={
                          {
                            top:
                              ((interval.start - firstMinute) / 60) *
                              hourHeight,
                            height,
                            left: `calc(${(interval.column / interval.columns) * 100}% + 2px)`,
                            width: `calc(${(interval.span / interval.columns) * 100}% - 4px)`,
                            zIndex: 2 + interval.column,
                            "--room-color": interval.color,
                            "--title-lines": Math.max(
                              1,
                              Math.floor((height - 8) / EVENT_LINE) - 1,
                            ),
                          } as CSSProperties
                        }
                        title={details}
                      >
                        <strong>{interval.title}</strong>
                        <span>{time}</span>
                      </Event>
                    );
                  })}
                  {now > 0 &&
                    value === todayDate &&
                    currentMinute >= firstMinute &&
                    currentMinute <= lastMinute && (
                      <div
                        className="booking-calendar-now"
                        style={{
                          top:
                            ((currentMinute - firstMinute) / 60) * hourHeight,
                        }}
                        aria-label={`Nå, ${timeLabel(currentMinute)}`}
                      >
                        <span>{timeLabel(currentMinute)}</span>
                      </div>
                    )}
                  {selectable &&
                    value === date &&
                    start &&
                    end &&
                    minuteOfDay(end) > minuteOfDay(start) && (
                      <div
                        className={`booking-calendar-selection ${((minuteOfDay(end) - minuteOfDay(start)) / 60) * hourHeight < EVENT_LINE * 2 + 8 ? "compact" : ""}`}
                        style={{
                          top:
                            ((Math.max(firstMinute, minuteOfDay(start)) -
                              firstMinute) /
                              60) *
                            hourHeight,
                          height:
                            (Math.max(
                              0,
                              Math.min(lastMinute, minuteOfDay(end)) -
                                Math.max(firstMinute, minuteOfDay(start)),
                            ) /
                              60) *
                            hourHeight,
                        }}
                      >
                        <strong>Ditt valg</strong>
                        <span>
                          {start}–{end}
                        </span>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {!comparisonRooms && (
        <div className="booking-calendar-legend">
          <span>
            <i className="booking-calendar-busy-key" />
            Opptatt
          </span>
          <span>
            <i className="booking-calendar-selection-key" />
            Ditt valg
          </span>
        </div>
      )}
    </div>
  );
  if (!overlay || !expanded) return calendar;
  return (
    <>
      <div className="booking-calendar-placeholder" aria-hidden="true">
        Kalenderen vises i fullskjerm.
      </div>
      {createPortal(
        <div
          className={`${overlay.className} booking-calendar-overlay`}
          style={overlay.style}
        >
          {calendar}
        </div>,
        document.body,
      )}
    </>
  );
}
