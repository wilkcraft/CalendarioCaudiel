const CACHE_NAME = "calendario-caudiel-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/admin.html",
  "/logoCaudiel.png",
  "/caudiel.png"
];

// Instalación: guardar en caché los archivos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación: limpiar cachés viejas si cambias versión
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Interceptar peticiones y servir desde caché si no hay conexión
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
