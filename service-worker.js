const CACHE_NAME = "operations-support-v0.7.00";
const APP_SHELL = ["./", "./index.html", "./manifest.webmanifest"];
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))); self.skipWaiting(); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener("message", event => { if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting(); });
self.addEventListener("fetch", event => { const url = new URL(event.request.url); if (url.pathname.endsWith("version.json") || event.request.mode === "navigate") { event.respondWith(fetch(event.request, {cache:"no-store"}).catch(() => caches.match("./index.html"))); return; } event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => { const copy=response.clone(); caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy)); return response; }))); });
