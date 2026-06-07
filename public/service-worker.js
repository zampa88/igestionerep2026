importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@6.5.4/workbox/workbox-sw.js');

if (workbox) {
  console.log('📦 Workbox caricato con successo');

  // Cache strategia: Network first, fallback cache
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'document',
    new workbox.strategies.NetworkFirst({
      cacheName: 'pages-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 24 ore
        }),
      ],
    })
  );

  // Cache strategia: Cache first per assets
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'style' || request.destination === 'script',
    new workbox.strategies.CacheFirst({
      cacheName: 'assets-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 giorni
        }),
      ],
    })
  );

  // Cache strategia: Cache first per immagini
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 giorni
        }),
      ],
    })
  );

  // Aggiorna il service worker
  workbox.precaching.cleanupOutdatedCaches();
}

// Gestione messaggi dal client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('✅ Service Worker installato');
