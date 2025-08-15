const CACHE_NAME = 'taller-pro-cache-v1';
const urlsToCache = [
  'frontend/index.html',
  'frontend/style.css',
  'frontend/app.js',
  'data/vehicles.json'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(response => response || fetch(e.request)));
});
