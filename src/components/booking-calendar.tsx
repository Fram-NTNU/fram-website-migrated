"use client";

import { type CSSProperties, useRef, useState, useSyncExternalStore } from "react";
import { useBookingClock } from "@/lib/booking-clock";
import { calendarSelection, calendarEventLayout } from "@/lib/calendar-selection";

type Interval = { start: string; end: string; title?: string; roomId?: string; roomName?: string; color?: string };
type Hours = Record<string, { open: string; close: string } | null>;
export const calendarDate = (day: Date) => `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
const shiftDay = (day: Date, amount: number) => { const next = new Date(day); next.setDate(next.getDate() + amount); return next; };
const minuteOfDay = (time: string) => { const [hour, minute] = time.split(":").map(Number); return hour * 60 + minute; };
const timeLabel = (minute: number) => `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;


const subscribeViewport = (onChange: () => void) => {
  const media = window.matchMedia("(max-width: 760px)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const mobileViewport = () => window.matchMedia("(max-width: 760px)").matches;
const serverViewport = () => false;

export function BookingCalendar({ roomName, date, start, end, busy, hours, minDate, maxDate, minDuration, maxDuration, loading, error, onChoose, onDateChange, onRetry, comparisonRooms }: {
  comparisonRooms?: { id: string; name: string; color: string; busy: Interval[]; hours: Hours }[];
  roomName: string; date: string; start: string; end: string; busy: Interval[]; hours: Hours; minDate: string; maxDate: string;
  minDuration: number; maxDuration: number; loading: boolean; error: string;
  onChoose: (date: string, start: string, end: string) => void; onDateChange: (date: string) => void; onRetry: () => void;
}) {
  const now = useBookingClock();
  const currentDay = new Date(now);
  const todayDate = calendarDate(currentDay);
  const currentMinute = currentDay.getHours() * 60 + currentDay.getMinutes();
  const mobile = useSyncExternalStore(subscribeViewport, mobileViewport, serverViewport);
  const [preferredMode, setMode] = useState<"day" | "week" | null>(null);
  const mode = preferredMode ?? (mobile ? "day" : "week");
  const hourHeight = mode === "day" ? 88 : 40;
  const selected = new Date(`${date}T12:00:00`);
  const monday = shiftDay(selected, -((selected.getDay() + 6) % 7));
  const days = mode === "day" ? [selected] : Array.from({ length: 7 }, (_, index) => shiftDay(monday, index));
  const combinedBusy = comparisonRooms?.flatMap(room => room.busy.map(event => ({ ...event, roomId: room.id, roomName: room.name, color: room.color }))) ?? busy;
  const combinedHours = comparisonRooms ? Object.fromEntries(Array.from({ length: 7 }, (_, index) => {
    const day = String(index + 1);
    const openings = comparisonRooms.map(room => room.hours[day]).filter(value => value != null);
    return [day, openings.length ? { open: openings.map(value => value.open).sort()[0], close: openings.map(value => value.close).sort().at(-1)! } : null];
  })) : hours;
  const lanes = days.map(day => ({ day, room: { id: roomName, name: roomName, busy: combinedBusy, hours: combinedHours } }));
  const opening = (comparisonRooms ? comparisonRooms.flatMap(room => Object.values(room.hours)) : Object.values(hours)).filter((value) => value !== null);
  const firstMinute = opening.length ? Math.floor(Math.min(...opening.map(value => minuteOfDay(value.open))) / 60) * 60 : 360;
  const lastMinute = opening.length ? Math.max(...opening.map(value => minuteOfDay(value.close))) : 1440;
  const minutes = lastMinute - firstMinute;
  const slots = Array.from({ length: Math.ceil(minutes / 30) }, (_, index) => firstMinute + index * 30);
  const duration = minDuration;
  const drag = useRef<{ pointerId: number; anchor: number } | null>(null);
  const previous = shiftDay(selected, mode === "day" ? -1 : -7);
  const next = shiftDay(selected, mode === "day" ? 1 : 7);
  function changePeriod(nextDate: Date) {
    onDateChange([calendarDate(new Date()), calendarDate(nextDate), maxDate].sort()[1]);
  }
  return <div className={`booking-calendar ${comparisonRooms ? "booking-calendar-comparison" : ""}`}>
    {!comparisonRooms && <h2>Velg tidspunkt</h2>}
    <div className="booking-calendar-toolbar">
      <h3 className="booking-calendar-period">{new Intl.DateTimeFormat("nb-NO", { month: "long", year: "numeric" }).formatRange(days[0], days.at(-1)!)}</h3>
      <div className="booking-calendar-controls">
        {comparisonRooms && <div className="booking-fields booking-availability-date"><label><span className="sr-only">Dato</span><input type="date" value={date} min={calendarDate(new Date())} max={maxDate} onChange={event => { if (event.target.value) onDateChange(event.target.value); }} /></label></div>}
        <div className="booking-calendar-navigation">
          <button type="button" onClick={() => onDateChange(calendarDate(new Date()))}>I dag</button>
          <button type="button" aria-label="Forrige periode" disabled={calendarDate(mode === "week" ? monday : selected) <= calendarDate(new Date())} onClick={() => changePeriod(previous)}><i className="ph ph-caret-left" aria-hidden="true" /></button>
          <button type="button" aria-label="Neste periode" disabled={calendarDate(mode === "week" ? shiftDay(monday, 6) : selected) >= maxDate} onClick={() => changePeriod(next)}><i className="ph ph-caret-right" aria-hidden="true" /></button>
        </div>
        <div className="booking-calendar-modes" role="group" aria-label="Kalendervisning">
          <button type="button" aria-pressed={mode === "day"} onClick={() => setMode("day")}>Dag</button>
          <button type="button" aria-pressed={mode === "week"} onClick={() => setMode("week")}>Uke</button>
        </div>
      </div>
    </div>

    {!comparisonRooms && <p className="booking-calendar-help">Dra over ledige tider for å velge start og slutt. Du kan også bruke klokkeslettene under kalenderen.</p>}
    <div className="booking-calendar-surface">
    {comparisonRooms?.length === 0 ? <p className="booking-calendar-status" role="status">Velg minst ett rom for å se ledigheten.</p> : loading ? <p className="booking-calendar-status" role="status">Henter ledige tider …</p> : error ? <div className="booking-calendar-status" role="alert"><p>Vi kunne ikke kontrollere ledigheten. {error}</p><button type="button" className="booking-secondary-link" onClick={onRetry}>Prøv igjen</button></div> : null}
      <div className="booking-calendar-scroll" tabIndex={0} role="region" aria-busy={loading} aria-label={`${mode === "week" ? "Ukekalender" : "Dagskalender"} for ${comparisonRooms ? "valgte rom" : roomName}`}>
        <div className={`booking-calendar-grid ${mode}`} style={{ gridTemplateColumns: `52px repeat(${lanes.length}, minmax(80px, 1fr))` }}>
          <div className="booking-calendar-time-heading">Tid</div>
          {lanes.map(({day, room}) => <div key={`${room.id}-${calendarDate(day)}`} className={`booking-calendar-day-heading ${calendarDate(day) === date ? "selected" : ""} ${now && calendarDate(day) === todayDate ? "today" : ""}`}><><span>{new Intl.DateTimeFormat("nb-NO", { weekday: "short" }).format(day)}</span><strong>{day.getDate()}</strong></></div>)}
          <div className="booking-calendar-axis" style={{ height: minutes / 60 * hourHeight }}>{slots.filter(minute => minute % 60 === 0).map(minute => <span key={minute} style={{ top: (minute - firstMinute) / 60 * hourHeight }}>{timeLabel(minute)}</span>)}</div>
          {lanes.map(({day, room}) => {
            const value = calendarDate(day);
            const dayStart = new Date(`${value}T00:00:00`).getTime();
            const dayEnd = new Date(`${calendarDate(shiftDay(day, 1))}T00:00:00`).getTime();
            const open = room.hours[String(((day.getDay() + 6) % 7) + 1)];
            const openAt = open ? Math.max(minuteOfDay(open.open), !comparisonRooms && value === todayDate ? (Math.floor(currentMinute / 15) + 1) * 15 : 0) : 0;
            const closeAt = open ? minuteOfDay(open.close) : 0;
            // Merge overlaps from Google and the portal so busy blocks remain readable.
            const intervals = room.busy.filter(item => Date.parse(item.start) < dayEnd && Date.parse(item.end) > dayStart).map(item => ({ start: Math.max(firstMinute, Date.parse(item.start) <= dayStart ? firstMinute : new Date(item.start).getHours() * 60 + new Date(item.start).getMinutes()), end: Math.min(lastMinute, Date.parse(item.end) >= dayEnd ? lastMinute : new Date(item.end).getHours() * 60 + new Date(item.end).getMinutes()), title: item.title || "Opptatt", roomId: item.roomId, roomName: item.roomName, color: item.color })).filter(item => item.end > item.start).sort((a, b) => a.start - b.start);
            const merged: { start: number; end: number }[] = [];
            for (const interval of intervals) { const last = merged.at(-1); if (last && interval.start <= last.end) last.end = Math.max(last.end, interval.end); else merged.push({ ...interval }); }
            return <div key={`${room.id}-${value}`} className={`booking-calendar-column ${value < minDate || value > maxDate ? "outside-window" : ""}`} style={{ height: minutes / 60 * hourHeight }}
              onPointerDown={(event) => {
                const target = (event.target as HTMLElement).closest<HTMLButtonElement>("button.booking-calendar-slot");
                if (!target || target.disabled || event.button !== 0) return;
                const anchor = Math.floor((event.clientY - event.currentTarget.getBoundingClientRect().top) / hourHeight * 60 / 15) * 15 + firstMinute;
                const range = calendarSelection(anchor, anchor, openAt, closeAt, minDuration, maxDuration, merged);
                if (!range) return;
                event.preventDefault();
                target.focus({ preventScroll: true });
                drag.current = { pointerId: event.pointerId, anchor };
                event.currentTarget.setPointerCapture(event.pointerId);
                onChoose(value, timeLabel(range.start), timeLabel(range.end));
              }}
              onPointerMove={(event) => {
                if (!drag.current || drag.current.pointerId !== event.pointerId) return;
                const raw = (event.clientY - event.currentTarget.getBoundingClientRect().top) / hourHeight * 60 + firstMinute;
                const current = (raw < drag.current.anchor ? Math.floor(raw / 15) : Math.ceil(raw / 15)) * 15;
                const range = calendarSelection(drag.current.anchor, current, openAt, closeAt, minDuration, maxDuration, merged);
                if (range) onChoose(value, timeLabel(range.start), timeLabel(range.end));
              }}
              onPointerUp={(event) => {
                if (drag.current?.pointerId !== event.pointerId) return;
                drag.current = null;
                if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
              }}
              onPointerCancel={() => { drag.current = null; }}
              onLostPointerCapture={() => { drag.current = null; }}>
              {slots.map(minute => {
                const nextBusy = merged.find(item => item.start > minute)?.start ?? closeAt;
                const slotEnd = Math.min(minute + duration, closeAt, nextBusy);
                const occupied = merged.some(item => item.start < slotEnd && item.end > minute);
                const unavailable = Boolean(comparisonRooms) || loading || Boolean(error) || !open || value < minDate || value > maxDate || minute < openAt || slotEnd - minute < minDuration || occupied;
                return <button key={minute} type="button" className={`booking-calendar-slot ${minute < openAt || minute >= closeAt || !open ? "closed" : ""}`} disabled={unavailable} aria-hidden={comparisonRooms ? true : undefined} aria-label={`${new Intl.DateTimeFormat("nb-NO", { weekday: "long", day: "numeric", month: "long" }).format(day)}, ${timeLabel(minute)}–${timeLabel(slotEnd)}`} style={{ top: (minute - firstMinute) / 60 * hourHeight, height: Math.min(30, lastMinute - minute) / 60 * hourHeight }} onKeyDown={(event) => {
                  if (!event.shiftKey || (event.key !== "ArrowDown" && event.key !== "ArrowUp")) return;
                  event.preventDefault();
                  const anchor = value === date && start ? minuteOfDay(start) : minute;
                  const current = value === date && end ? minuteOfDay(end) : anchor + minDuration;
                  const range = calendarSelection(anchor, current + (event.key === "ArrowDown" ? 15 : -15), openAt, closeAt, minDuration, maxDuration, merged);
                  if (range) onChoose(value, timeLabel(range.start), timeLabel(range.end));
                }} onClick={(event) => { if (event.detail === 0) onChoose(value, timeLabel(minute), timeLabel(slotEnd)); }}><span>{timeLabel(minute)}</span></button>;
              })}
              {(comparisonRooms ? calendarEventLayout(intervals) : intervals.map(interval => ({ ...interval, column: 0, columns: 1 }))).map((interval, index) => <div key={`${interval.start}-${interval.end}-${index}`} className="booking-calendar-occupied" style={{ top: (interval.start - firstMinute) / 60 * hourHeight, height: (interval.end - interval.start) / 60 * hourHeight, ...(comparisonRooms ? { left: `calc(${interval.column / interval.columns * 100}% + 2px)`, width: `calc(${100 / interval.columns}% - 4px)`, right: "auto", "--room-color": interval.color } : {}) } as CSSProperties} title={`${interval.roomName ? `${interval.roomName} · ` : ""}${interval.title} · ${timeLabel(interval.start)}–${timeLabel(interval.end)}`}>{comparisonRooms && <span className="booking-calendar-event-room">{interval.roomName}</span>}<strong>{interval.title}</strong><span>{timeLabel(interval.start)}–{timeLabel(interval.end)}</span></div>)}
              {now > 0 && value === todayDate && currentMinute >= firstMinute && currentMinute <= lastMinute && <div className="booking-calendar-now" style={{ top: (currentMinute - firstMinute) / 60 * hourHeight }} aria-label={`Nå, ${timeLabel(currentMinute)}, ${new Intl.DateTimeFormat("nb-NO", { weekday: "long", day: "numeric", month: "long" }).format(currentDay)}`}><span>{timeLabel(currentMinute)}</span></div>}
              {!comparisonRooms && value === date && start && end && minuteOfDay(end) > minuteOfDay(start) && <div className="booking-calendar-selection" style={{ top: (Math.max(firstMinute, minuteOfDay(start)) - firstMinute) / 60 * hourHeight, height: Math.max(0, Math.min(lastMinute, minuteOfDay(end)) - Math.max(firstMinute, minuteOfDay(start))) / 60 * hourHeight }}><span>{start}–{end}</span></div>}
            </div>;
          })}
        </div>
      </div>
      </div>
      {!comparisonRooms && <div className="booking-calendar-legend"><span><i className="booking-calendar-busy-key" />Opptatt</span>{!comparisonRooms && <span><i className="booking-calendar-selection-key" />Ditt valg</span>}</div>}

  </div>;
}
