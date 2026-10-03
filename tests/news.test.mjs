import test from 'node:test';
import assert from 'node:assert/strict';
import { isNewsItem, newsDate } from '../src/lib/news.ts';
const news = { id: '60000000-0000-4000-8000-000000000001', title: 'En nyhet', summary: 'Ingress', body: 'Tekst', source_url: '', published_at: '2026-10-02T22:30:00Z', organization_name: 'FRAM', images: [{url: 'https://example.com/photo', alt: 'Studenter'}] };
test('news validates contract, date and safe media/link URLs', () => {
  assert.equal(isNewsItem(news), true);
  for (const changes of [{ images: [{url:'javascript:alert(1)',alt:'Bilde'}] }, {source_url:'javascript:alert(1)'}, {id:'../konto'}, {published_at:'invalid'}, {images:[{url:'https://example.com',alt:''}]}]) assert.equal(isNewsItem({...news,...changes}), false);
});
test('news dates use Oslo calendar day', () => assert.match(newsDate(news.published_at), /^3\. oktober 2026$/));
