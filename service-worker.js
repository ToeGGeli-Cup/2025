
// Neuer Service Worker: Lädt nur, wenn sich etwas geändert hat
self.addEventListener("install", (event) => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => caches.delete(cache))
            );
        })
    );
    self.clients.claim(); // Erzwingt sofortige Aktivierung des neuen Service Workers
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).then((response) => {
            if (!response || response.status !== 200 || response.type !== "basic") {
                return response;
            }
            return response;
        }).catch(() => caches.match(event.request))
    );
});

// Benachrichtige die Clients, wenn eine neue Version verfügbar ist
self.addEventListener("message", (event) => {
    if (event.data === "updateSW") {
        self.skipWaiting();
    }
});
