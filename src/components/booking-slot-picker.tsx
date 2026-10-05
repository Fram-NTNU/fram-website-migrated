"use client";
// Shared between fram-portal and fram-website-migrated. Keep both copies identical.

import { type CSSProperties, type ReactNode, useState } from "react";
import { BookingCalendar } from "./booking-calendar";
import { bookingTimeOptions } from "@/lib/booking-time-options";
import {
  type BookableRoom,
  type BusyInterval,
  instantAt,
  minuteOfDay,
  roomCalendarColor,
  roomFit,
  roomHorizon,
  sharedBlockedMinutes,
  weekdayKey,
} from "@/lib/calendar-selection";

/**
 * Step 1: pick a time in a calendar that shows every room.
 * Step 2: pick one of the rooms that is free for that time.
 */
export function BookingSlotPicker({
  rooms,
  busy,
  loading,
  error,
  onRetry,
  renderRetry,
  date,
  start,
  end,
  roomId,
  today,
  now,
  onTimeChange,
  onRoomChange,
}: {
  rooms: BookableRoom[];
  busy: Record<string, BusyInterval[]>;
  loading: boolean;
  error: string;
  onRetry: () => void;
  renderRetry?: (onRetry: () => void) => ReactNode;
  date: string;
  start: string;
  end: string;
  roomId: string;
  today: string;
  now: number;
  onTimeChange: (date: string, start: string, end: string) => void;
  onRoomChange: (roomId: string) => void;
}) {
  const calendarRooms = rooms.filter((room) => room.showAvailability);
  const [visibleRooms, setVisibleRooms] = useState<string[]>(() =>
    calendarRooms.map((room) => room.id),
  );
  const accepting = rooms.filter((room) => room.acceptingRequests);
  // Only the rooms shown in the calendar decide which times can be dragged out.
  const candidates = accepting.filter(
    (room) => room.showAvailability && visibleRooms.includes(room.id),
  );
  const limits = candidates.length ? candidates : accepting;
  const minDuration = limits.length
    ? Math.min(...limits.map((room) => room.minDurationMinutes))
    : 15;
  const maxDuration = limits.length
    ? Math.max(...limits.map((room) => room.maxDurationMinutes))
    : 1440;
  const maxDate = accepting.length
    ? accepting
        .map((room) => roomHorizon(room, today))
        .sort()
        .at(-1)!
    : today;
  const fitFor = (room: BookableRoom, day: string, from: string, to: string) =>
    roomFit(room, {
      date: day,
      start: from,
      end: to,
      busy: busy[room.id] ?? [],
      today,
    });

  // Keep the chosen room only while it can still take the chosen time.
  const chooseTime = (day: string, from: string, to: string) => {
    onTimeChange(day, from, to);
    const room = rooms.find((item) => item.id === roomId);
    if (room && from && to && !fitFor(room, day, from, to).available)
      onRoomChange("");
  };

  const openings = limits
    .map((room) => room.openingHours[weekdayKey(date)])
    .filter((value) => value != null);
  const blockedToday = sharedBlockedMinutes(
    candidates.length ? candidates : accepting,
    busy,
    date,
  );
  const timeOptions = bookingTimeOptions({
    date,
    opening: openings.length
      ? {
          open: openings.map((value) => value.open).sort()[0],
          close: openings
            .map((value) => value.close)
            .sort()
            .at(-1)!,
        }
      : null,
    busy: blockedToday.map((item) => ({
      start: new Date(instantAt(date, item.start)).toISOString(),
      end: new Date(instantAt(date, item.end)).toISOString(),
    })),
    start,
    minimum: minDuration,
    maximum: maxDuration,
    now,
  });
  const timeError =
    start && end
      ? end <= start
        ? "Sluttid må være etter starttid."
        : instantAt(date, minuteOfDay(start)) <= now
          ? "Velg et tidspunkt frem i tid."
          : ""
      : "";
  const hasTime = Boolean(start && end && !timeError);
  const fits = rooms.map((room) => ({
    room,
    fit: fitFor(room, date, start, end),
  }));
  const freeCount = fits.filter(({ fit }) => fit.available).length;

  return (
    <>
      <div className="booking-step booking-time-step">
        <h2>Velg tidspunkt</h2>
        {calendarRooms.length > 0 && (
          <>
            <BookingCalendar
              filters={
                <div
                  className="booking-room-filters"
                  role="group"
                  aria-label="Vis rom i kalenderen"
                >
                  {calendarRooms.map((room) => (
                    <label
                      key={room.id}
                      className="booking-room-filter"
                      style={
                        {
                          "--room-color": roomCalendarColor(room.slug),
                        } as CSSProperties
                      }
                    >
                      <input
                        type="checkbox"
                        checked={visibleRooms.includes(room.id)}
                        onChange={() =>
                          setVisibleRooms((ids) =>
                            ids.includes(room.id)
                              ? ids.filter((id) => id !== room.id)
                              : [...ids, room.id],
                          )
                        }
                      />
                      <span>{room.name}</span>
                    </label>
                  ))}
                </div>
              }
              roomName="alle rom"
              comparisonRooms={calendarRooms
                .filter((room) => visibleRooms.includes(room.id))
                .map((room) => ({
                  id: room.id,
                  name: room.name,
                  color: roomCalendarColor(room.slug),
                  hours: room.openingHours,
                  busy: busy[room.id] ?? [],
                }))}
              selectable
              blocked={(day) =>
                sharedBlockedMinutes(
                  candidates.length ? candidates : accepting,
                  busy,
                  day,
                )
              }
              date={date}
              start={start}
              end={end}
              busy={[]}
              hours={{}}
              minDate={today}
              maxDate={maxDate}
              minDuration={minDuration}
              maxDuration={maxDuration}
              loading={loading}
              error={error}
              renderRetry={renderRetry}
              onChoose={chooseTime}
              onDateChange={(day) => chooseTime(day, "", "")}
              onRetry={onRetry}
            />
          </>
        )}
        <div className="booking-fields booking-time-fields">
          <label>
            Dato
            <input
              name="date"
              type="date"
              required
              value={date}
              min={today}
              max={maxDate}
              onChange={(event) => {
                if (event.target.value) chooseTime(event.target.value, "", "");
              }}
            />
          </label>
          <label>
            Fra
            <select
              name="start"
              required
              value={start}
              disabled={loading || Boolean(error) || !timeOptions.starts.length}
              onChange={(event) => chooseTime(date, event.target.value, "")}
            >
              <option value="" disabled>
                --:--
              </option>
              {start && !timeOptions.starts.includes(start) && (
                <option value={start}>{start}</option>
              )}
              {timeOptions.starts.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
          <label>
            Til
            <select
              name="end"
              required
              value={end}
              disabled={
                loading || Boolean(error) || !start || !timeOptions.ends.length
              }
              onChange={(event) => chooseTime(date, start, event.target.value)}
            >
              <option value="" disabled>
                --:--
              </option>
              {end && !timeOptions.ends.includes(end) && (
                <option value={end}>{end}</option>
              )}
              {timeOptions.ends.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
        </div>
        {timeError && (
          <p className="booking-timing-error" role="alert">
            {timeError}
          </p>
        )}
      </div>
      <div className="booking-step booking-room-step">
        <h2>Velg rom</h2>
        <p className="booking-room-hint" role="status">
          {!hasTime
            ? "Velg et tidspunkt først, så ser du hvilke rom som er ledige."
            : freeCount === 0
              ? "Ingen rom er ledige på dette tidspunktet. Prøv et annet tidspunkt."
              : `${freeCount} ${freeCount === 1 ? "rom er ledig" : "rom er ledige"} ${new Intl.DateTimeFormat("nb-NO", { weekday: "long", day: "numeric", month: "long" }).format(new Date(`${date}T12:00:00`))} kl. ${start}–${end}.`}
        </p>
        <div className="booking-room-options">
          {fits.map(({ room, fit }) => (
            <button
              key={room.id}
              type="button"
              disabled={!hasTime || !fit.available}
              className={`${room.id === roomId ? "active" : ""} ${hasTime && fit.available ? "available" : ""}`}
              style={
                {
                  "--room-color": roomCalendarColor(room.slug),
                } as CSSProperties
              }
              onClick={() => onRoomChange(room.id)}
              aria-pressed={room.id === roomId}
            >
              <span>
                <i className="booking-room-swatch" aria-hidden="true" />
                {room.name}
              </span>
              <small>{`${room.capacity ?? "–"} plasser`}</small>
              {(hasTime || !room.acceptingRequests) && (
                <em className={fit.available ? "free" : ""}>{fit.reason}</em>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
