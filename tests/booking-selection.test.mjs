import test from 'node:test';
import assert from 'node:assert/strict';
import { calendarSelection, availabilityWeek } from '../src/lib/calendar-selection.ts';
const choose = (anchor, current, busy = []) => calendarSelection(anchor, current, 360, 1425, 30, 240, busy);
test('drag selects the actual range in either direction', () => {
  assert.deepEqual(choose(600, 720), {start: 600, end: 720});
  assert.deepEqual(choose(720, 600), {start: 600, end: 720});
});
test('a click respects minimum duration rather than assuming one hour', () => assert.deepEqual(choose(600, 600), {start: 600, end: 630}));
test('drag stops at busy times and maximum duration', () => {
  assert.deepEqual(choose(600, 900, [{start: 720, end: 780}]), {start: 600, end: 720});
  assert.deepEqual(choose(900, 600, [{start: 720, end: 780}]), {start: 780, end: 900});
  assert.deepEqual(choose(600, 1000), {start: 600, end: 840});
});
test('selection cannot cross closed hours or a busy anchor', () => {
  assert.equal(choose(1410, 1425), null);
  assert.equal(choose(600, 660, [{start: 590, end: 620}]), null);
  assert.deepEqual(choose(1380, 1450), {start: 1380, end: 1425});
});

test('changing the selected day within a week preserves the availability request key', () => {
  assert.equal(availabilityWeek('2026-10-05'), '2026-10-05');
  assert.equal(availabilityWeek('2026-10-06'), '2026-10-05');
  assert.equal(availabilityWeek('2026-10-11'), '2026-10-05');
  assert.equal(availabilityWeek('2026-10-12'), '2026-10-12');
  assert.equal(availabilityWeek('2026-10-25'), '2026-10-19');
  assert.equal(availabilityWeek('2026-10-26'), '2026-10-26');
});

test('simultaneous room events remain visible side by side', async () => {
  const { calendarEventLayout } = await import('../src/lib/calendar-selection.ts');
  const events = calendarEventLayout([{start: 540, end: 660, room: 'A'}, {start: 570, end: 600, room: 'B'}, {start: 600, end: 690, room: 'C'}, {start: 720, end: 780, room: 'D'}]);
  assert.deepEqual(events.map(({column, columns}) => [column, columns]), [[0, 2], [1, 2], [1, 2], [0, 1]]);
  assert.deepEqual(events.map(event => event.room), ['A', 'B', 'C', 'D']);
  assert.deepEqual(calendarEventLayout([]), []);
});
