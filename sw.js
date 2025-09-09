// 定義要快取的檔案列表
const CACHE_NAME = 'viewport-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/icon.png'
  // 如果你有 CSS 或其他 JS 檔案，也要加進來
];

// Service Worker 安裝事件
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_E_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Service Worker 攔截網路請求事件
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果快取中有對應的資源，就直接回傳，否則就發出網路請求
        return response || fetch(event.request);
      })
  );
});
