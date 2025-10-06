self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("base-tool-cache").then(cache => {
            return cache.addAll([
                "index.html",
                "style/style.css",
                "scripts/converter.js",
                "manifest.json"
            ]);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});