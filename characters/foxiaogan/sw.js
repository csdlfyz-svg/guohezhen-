const CACHE_NAME = 'foshou-room-v20';
const ASSETS = [
  './',
  './index.html',
  '../../css/common.css',
  './style.css',
  './room.js',
  './manifest.json',
  './follow/walker.js',
  './assets/stickers/sheet.jpg',
  './comics/comic01-zh.jpg',
  './comics/comic01-ko.jpg',
  './comics/comic02-zh.jpg',
  './comics/comic02-ko.jpg',
  './comics/comic03-zh.jpg',
  './comics/comic03-ko.jpg',
  './comics/comic04-zh.jpg',
  './comics/comic04-ko.jpg',
  './shorts/deliverables/foshou-short01-cover-zh.png',
  './shorts/deliverables/foshou-short01-cover-ko.png',
  './shorts/deliverables/foshou-short02-cover-zh.png',
  './shorts/deliverables/foshou-short02-cover-ko.png',
  './shorts/deliverables/foshou-short03-cover-zh.png',
  './shorts/deliverables/foshou-short03-cover-ko.png',
  './shorts/deliverables/foshou-short04-cover-zh.png',
  './shorts/deliverables/foshou-short04-cover-ko.png',
  './assets/expressions/base.png',
  './assets/expressions/happy.png',
  './assets/expressions/proud.png',
  './assets/expressions/sad.png',
  './assets/expressions/surprised.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(ASSETS.map((url) => cache.add(url)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first with resilient offline cache fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(event.request, { ignoreSearch: true }))
  );
});
