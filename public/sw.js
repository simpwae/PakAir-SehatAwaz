// Service Worker for PakAir PWA (network-first, production only)
const IS_DEV =
  self.location.hostname === "localhost" ||
  self.location.hostname.startsWith("192.168");
const CACHE_NAME = "pakair-v2";
const RUNTIME_CACHE = "pakair-runtime-v2";

// Only precache in production builds
const PRECACHE_ASSETS = IS_DEV ? [] : ["/", "/index.html"];

self.addEventListener("install", (event) => {
  if (IS_DEV) {
    // Skip all caching in dev to avoid stale resources
    self.skipWaiting();
    return;
  }
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((c) => c !== CACHE_NAME && c !== RUNTIME_CACHE)
            .map((c) => caches.delete(c))
        )
      )
  );
  self.clients.claim();
});

// Network-first strategy for HTML/JS/CSS; cache-first only for icons/images in prod
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);

  // Always bypass API & dev mode caching
  if (url.pathname.startsWith("/api") || IS_DEV) {
    return; // default browser fetch
  }

  const isStatic = url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i);

  if (isStatic) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((resp) => {
          if (resp && resp.status === 200) {
            const copy = resp.clone();
            caches
              .open(RUNTIME_CACHE)
              .then((cache) => cache.put(event.request, copy));
          }
          return resp;
        });
      })
    );
    return;
  }

  // Network-first for documents and assets
  event.respondWith(
    fetch(event.request)
      .then((resp) => {
        if (resp && resp.status === 200 && resp.type === "basic") {
          const copy = resp.clone();
          caches
            .open(RUNTIME_CACHE)
            .then((cache) => cache.put(event.request, copy));
        }
        return resp;
      })
      .catch(() =>
        caches
          .match(event.request)
          .then((c) => c || caches.match("/index.html"))
      )
  );
});

self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New air quality alert",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    vibrate: [200, 100, 200],
    tag: "air-quality-alert",
  };
  event.waitUntil(self.registration.showNotification("PakAir Alert", options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/citizen/dashboard"));
});
