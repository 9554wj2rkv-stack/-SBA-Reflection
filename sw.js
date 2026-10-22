/* Moon Reflection — service worker (offline support)
   ------------------------------------------------------------------
   Caches the app's own files so it opens without a connection.
   It never reads, changes or deletes journal data (localStorage).

   Strategy: network first, cache as fallback — so every update you
   push to GitHub appears on the next online visit, and the last
   working version still opens offline.

   When you release an update, bump CACHE_VERSION.
   ------------------------------------------------------------------ */
const CACHE_VERSION = 'v1.2.1';
const CACHE_NAME = 'moon-reflection-' + CACHE_VERSION;

const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/styles.css',
  './js/config.js',
  './js/sky-data.js',
  './js/content.js',
  './js/app.js',
  './assets/images/hero.webp',
  './assets/images/moon.webp',
  './assets/images/mountains.webp',
  './assets/images/galaxy.webp',
  './assets/images/card.webp',
  './assets/fonts/cormorant-garamond-latin-400-normal.woff2',
  './assets/fonts/cormorant-garamond-latin-500-normal.woff2',
  './assets/fonts/cormorant-garamond-latin-400-italic.woff2',
  './assets/fonts/cormorant-sc-latin-500-normal.woff2',
  './assets/fonts/jost-latin-300-normal.woff2',
  './assets/fonts/jost-latin-400-normal.woff2',
  './assets/fonts/jost-latin-500-normal.woff2',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  // Remove only older Moon Reflection app caches. Journal data is not in caches.
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('moon-reflection-') && k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: true }).then(hit =>
          hit || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error())
        )
      )
  );
});
