type Interval = { start: string; end: string };
export function bookingTimeOptions({ date, opening, busy, start, minimum, maximum, now }: { date: string; opening?: { open: string; close: string } | null; busy: Interval[]; start: string; minimum: number; maximum: number; now: number }) {
  const starts: string[] = [];
  const ends: string[] = [];
  if (!opening || !date || minimum <= 0 || maximum < minimum) return { starts, ends };
  const minutes = (value: string) => { const [hour, minute] = value.split(":").map(Number); return hour * 60 + minute; };
  const label = (value: number) => `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
  const instant = (value: number) => Date.parse(`${date}T${label(value)}:00`);
  const intervals = busy.map(item => ({ start: Date.parse(item.start), end: Date.parse(item.end) }));
  const available = (from: number, to: number) => { const begin = instant(from); const finish = instant(to); return begin > now && finish > begin && !intervals.some(item => item.start < finish && item.end > begin); };
  const open = Math.ceil(minutes(opening.open) / 15) * 15;
  const close = Math.floor(minutes(opening.close) / 15) * 15;
  const duration = Math.ceil(minimum / 15) * 15;
  for (let minute = open; minute + duration <= close; minute += 15)
    if (duration <= maximum && available(minute, minute + duration)) starts.push(label(minute));
  if (starts.includes(start)) {
    const from = minutes(start);
    for (let minute = from + duration; minute <= Math.min(close, from + maximum); minute += 15)
      if (available(from, minute)) ends.push(label(minute));
  }
  return { starts, ends };
}
