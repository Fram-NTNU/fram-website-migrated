import test from 'node:test';
import assert from 'node:assert/strict';
import { createAvailabilityCache } from '../src/lib/availability-cache.ts';

test('one request supplies four weeks and reuses day/week navigation', async () => {
  let calls = 0;
  let now = 1000;
  const cache = createAvailabilityCache(async (from, to) => {
    calls++;
    assert.equal(from, '2026-09-28');
    assert.equal(to, '2026-10-26');
    return { room: [{start:'2026-10-05T08:00:00Z',end:'2026-10-05T09:00:00Z'}] };
  }, () => now);
  const first = await cache.load('2026-10-05');
  assert.deepEqual(first.weeks, ['2026-09-28','2026-10-05','2026-10-12','2026-10-19']);
  assert.equal(await cache.load('2026-10-12'), first);
  assert.equal(await cache.load('2026-10-05'), first);
  assert.equal(calls, 1);
  now += 60001;
  await cache.load('2026-10-05');
  assert.equal(calls, 2);
  cache.clear();
  await cache.load('2026-10-05');
  assert.equal(calls, 3);
});

test('rapid navigation shares in-flight requests, and failures can be retried', async () => {
  let resolve;
  let calls = 0;
  const cache = createAvailabilityCache(() => { calls++; return new Promise(done => { resolve = done; }); });
  const first = cache.load('2026-10-05');
  const second = cache.load('2026-10-12');
  assert.equal(first, second);
  resolve({});
  await first;
  assert.equal(calls, 1);
  let attempts = 0;
  const failing = createAvailabilityCache(async () => { if (++attempts === 1) throw new Error('temporary'); return {}; });
  await assert.rejects(failing.load('2026-10-05'), /temporary/);
  await failing.load('2026-10-05');
  assert.equal(attempts, 2);
});
