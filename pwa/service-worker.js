/* service-worker.js by Daniele Lolli (UncleDan) feat. Claude AI - Release 26.0b7 - 2026-11-28 12-01-50
   =====================================================================
   Service worker - Generatore Provvedimenti Disciplinari Baskin EISI (PWA)
   Cache-first per il funzionamento completamente offline.

   Una nuova versione resta in attesa finché la pagina non invia il
   messaggio SKIP_WAITING (pulsante "Aggiorna" in fondo alla pagina), così
   il testo in lavorazione non si perde con un ricaricamento a sorpresa.

   Aggiornare CACHE_NAME ad ogni rilascio, insieme ad APP_VERSION in
   index.html: serve a invalidare la vecchia cache.

   Su GitHub Pages il ramo main è pubblicato in / e il ramo beta in /beta/,
   sulla stessa origine: le cache sono condivise tra i due. Per questo il
   nome effettivo della cache porta lo scope ("...@<scope>") e ogni service
   worker gestisce e ripulisce solo le proprie.
   ===================================================================== */
const CACHE_NAME = 'generatore-provvedimenti-baskin-v26.0b7';
const CACHE_PREFIX = 'generatore-provvedimenti-baskin-';
const SCOPE = self.registration.scope;
const CACHE = CACHE_NAME + '@' + SCOPE;

/* sottocartelle che appartengono ad altre installazioni sulla stessa origine
   (ramo beta, indirizzo /pwa/): il service worker della radice non le
   intercetta, così ognuna resta servita dal proprio. */
const FOREIGN = ['beta/', 'pwa/'].map(d => SCOPE + d);

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k =>
        k !== CACHE && k.startsWith(CACHE_PREFIX) && k.endsWith('@' + SCOPE)
      ).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (!req.url.startsWith(SCOPE)) return;
  if (FOREIGN.some(f => req.url.startsWith(f))) return;
  event.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(req, { ignoreSearch: true }).then(hit => {
        if (hit) return hit;
        if (req.mode === 'navigate') return cache.match('./index.html').then(r => r || fetch(req));
        return fetch(req);
      })
    )
  );
});
