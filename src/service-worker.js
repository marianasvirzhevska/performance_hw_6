const CACHE_NAME = 'Cash name';
const urlsToCache = ['/', 'index.js', 'styles.css', 'index.html'];


self.addEventListener('install', (event) => {
    console.log('SW installed');

    return event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    )
});

self.addEventListener('activate', (event) => {
  const cacheAllowList = [CACHE_NAME];

  event.waitUntil(caches.keys().then((keys) => {
    return Promise.all(keys.map((key) => {
      if (!cacheAllowList.includes(key)) {
        return caches.delete(key);
      }
    }));
  }));
});
  
self.addEventListener('fetch', (event) =>
    event.respondWith(
        caches.match(event.request).then((request) => request || fetch(event.request))
  )
);
