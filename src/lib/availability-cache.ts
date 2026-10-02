export type RoomAvailability = Record<string, { start: string; end: string; title?: string }[]>;
type Window = { from: string; to: string; weeks: string[]; busy: RoomAvailability; expiresAt: number };

const shift = (date: string, days: number) => {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
};

// A four-week window covers the previous week and two upcoming weeks.
// Reuse overlapping requests, including when navigation outruns the response.
export function createAvailabilityCache(fetchWindow: (from: string, to: string) => Promise<RoomAvailability>, clock = Date.now) {
  let windows: Window[] = [];
  const pending: { from: string; to: string; promise: Promise<Window> }[] = [];
  let generation = 0;
  return {
    clear() { windows = []; generation++; },
    load(week: string): Promise<Window> {
      const contains = (window: { from: string; to: string }) => window.from <= week && week < window.to;
      const cached = windows.find(window => contains(window) && window.expiresAt > clock());
      if (cached) return Promise.resolve(cached);
      const existing = pending.find(contains);
      if (existing) return existing.promise;
      const from = shift(week, -7);
      const to = shift(from, 28);
      const startedGeneration = generation;
      const entry = { from, to, promise: Promise.resolve(null as unknown as Window) };
      entry.promise = fetchWindow(from, to).then(busy => {
        const result = { from, to, weeks: Array.from({ length: 4 }, (_, index) => shift(from, index * 7)), busy, expiresAt: clock() + 60000 };
        if (generation === startedGeneration) windows = [...windows.filter(window => window.expiresAt > clock()), result].slice(-8);
        return result;
      }).finally(() => { const index = pending.indexOf(entry); if (index >= 0) pending.splice(index, 1); });
      pending.push(entry);
      return entry.promise;
    },
  };
}
