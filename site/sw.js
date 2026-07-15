// sw.js — Aksharapad service worker
// Same two-strategy approach as Lipyantara:
// 1. Aksharamukha/Pyodide engine (cdn.jsdelivr.net): cache-first, effectively immutable per version.
// 2. Same-origin app shell: network-first, falling back to cache when offline.

const SHELL_CACHE = "aksharapad-shell-v1";
const ENGINE_CACHE = "aksharapad-engine-v1";

const SHELL_ASSETS = [
  "./app.html",
  "./index.html",
  "./ime.js",
  "./manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== SHELL_CACHE && key !== ENGINE_CACHE)
          .map((key) => caches.delete(key)),
      )
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET") return;

  if (url.hostname === "cdn.jsdelivr.net") {
    event.respondWith(
      caches.open(ENGINE_CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) return cached;
        const response = await fetch(event.request);
        if (response.ok) cache.put(event.request, response.clone());
        return response;
      }),
    );
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request)),
    );
  }
});
