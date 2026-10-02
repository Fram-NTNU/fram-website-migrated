export function calendarSelection(anchor: number, current: number, open: number, close: number, minimum: number, maximum: number, busy: { start: number; end: number }[]) {
  const backwards = current < anchor;
  let start = backwards ? Math.max(open, current, anchor - maximum) : anchor;
  let end = backwards ? anchor : Math.min(close, current, anchor + maximum);
  if (backwards) {
    const previous = busy.filter(item => item.end <= end).sort((a, b) => b.end - a.end)[0];
    if (previous && previous.end > start) start = previous.end;
  } else {
    const next = busy.find(item => item.start >= start);
    if (next) end = Math.min(end, next.start);
  }
  if (end - start < minimum) {
    if (backwards) start = end - minimum;
    else end = start + minimum;
  }
  if (start < open || end > close || end - start > maximum || busy.some(item => item.start < end && item.end > start)) return null;
  return { start, end };
}

// Every day in the displayed week shares the same availability response.
export function availabilityWeek(date: string) {
  const monday = new Date(`${date}T12:00:00`);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, "0")}-${String(monday.getDate()).padStart(2, "0")}`;
}

// Pack simultaneous events into columns, sharing width within each overlap group.
export function calendarEventLayout<T extends { start: number; end: number }>(events: T[]) {
  const sorted = [...events].sort((a, b) => a.start - b.start || a.end - b.end);
  const result: (T & { column: number; columns: number })[] = [];
  let group: (T & { column: number; columns: number })[] = [];
  let ends: number[] = [];
  let groupEnd = -Infinity;
  const finish = () => { for (const event of group) event.columns = ends.length; result.push(...group); group = []; ends = []; };
  for (const event of sorted) {
    if (event.start >= groupEnd) finish();
    let column = ends.findIndex(end => end <= event.start);
    if (column < 0) column = ends.length;
    ends[column] = event.end;
    group.push({ ...event, column, columns: 1 });
    groupEnd = group.length === 1 ? event.end : Math.max(groupEnd, event.end);
  }
  finish();
  return result;
}

export const roomCalendarColor = (slug: string) => ({
  bananrommet: "#FDC82F",
  fellesrommet: "var(--color-fram-teal)",
  "lille-moterom": "#E85A5A",
  scenerommet: "var(--color-fram-orange)",
  "store-moterom": "#2E86C1",
}[slug] ?? "var(--color-fram-ink)");
