/* VOLATERÍA — service worker de feria (V70-b).
   JS plano, sin build: vive en /public y el navegador lo toma tal cual.

   Estrategia de caché, en orden de llegada:
   - Navegaciones: network-first con fallback a la caché de "/" — la feria
     es un solo documento, así que el shell cacheado basta para jugar offline.
   - /_next/static/ y fuentes: cache-first con revalidación en segundo plano
     (stale-while-revalidate) — los assets llevan huella, nunca cambian.
   - Resto del mismo origen: network-first con fallback a caché.

   Versión: sube CACHE_NAME cuando cambie el shell precacheado, y el
   activate barre las cachés viejas como barre el viento las plumas. */

const CACHE_NAME = "volateria-v1";

/* El casillero de entrada: shell mínimo para abrir la feria sin red.
   Los PNG existen (generados desde src/app/icon.svg); "/icon.svg" queda
   cubierto por la ruta de metadatos de la app. */
const PRECACHE = [
  "/",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/icon-512-maskable.png",
  "/apple-touch-icon.png",
];

/* Estático con huella de Next + fuentes: primero caché, luego red. */
const STATIC_PREFIXES = ["/_next/static/"];
const FUENTE_RE = /\.(?:woff2?|ttf|otf)$/i;

/* ---------- install: precachea el shell y toma el turno de una vez ---------- */
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // allSettled: si una pieza falla, no se cae la carpa entera.
      await Promise.allSettled(PRECACHE.map((url) => cache.add(url)));
      await self.skipWaiting();
    })()
  );
});

/* ---------- activate: barre cachés de versiones viejas y manda ---------- */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const nombres = await caches.keys();
      await Promise.all(
        nombres
          .filter((nombre) => nombre !== CACHE_NAME)
          .map((nombre) => caches.delete(nombre))
      );
      await self.clients.claim();
    })()
  );
});

/* ---------- fetch: reparte según lo que pide el público ---------- */
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Solo GET y mismo origen: la feria no atiende a forasteros.
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navegaciones: red primero, caché de "/" de rescate (offline jugable).
  if (request.mode === "navigate") {
    event.respondWith(navegacion(request));
    return;
  }

  // Estático con huella y fuentes: caché primero, red de repuesto.
  const esEstatico =
    STATIC_PREFIXES.some((prefijo) => url.pathname.startsWith(prefijo)) ||
    FUENTE_RE.test(url.pathname);
  if (esEstatico) {
    event.respondWith(estatico(request, event));
    return;
  }

  // El resto (manifest, rutas de metadatos, lo que venga): red primero.
  event.respondWith(redPrimero(request));
});

/* Navegación: intenta la red; si hay respuesta sana, refresca el shell
   cacheado; si la red falla, sirve "/" desde la caché. */
async function navegacion(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const res = await fetch(request);
    if (res && res.ok) {
      // El shell "/" es el rescate offline; la URL exacta, un extra.
      cache.put("/", res.clone()).catch(() => {});
      if (new URL(request.url).pathname !== "/") {
        cache.put(request, res.clone()).catch(() => {});
      }
    }
    return res;
  } catch {
    const cacheada = (await cache.match(request)) || (await cache.match("/"));
    if (cacheada) return cacheada;
    // Último recurso: nadie guardó el shell — cartel de feria cerrada.
    return new Response(
      "<!doctype html><html lang=\"es\"><meta charset=\"utf-8\">" +
        "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">" +
        "<title>VOLATERÍA — sin señal</title><body style=\"margin:0;display:grid;" +
        "place-items:center;height:100vh;background:#0a0908;color:#c9a06b;" +
        "font:500 16px/1.6 system-ui,sans-serif;text-align:center\">" +
        "<p>SIN SEÑAL — la feria abrirá en cuanto vuelva la red.</p></body></html>",
      { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
}

/* Estático: responde al instante desde caché y revalida en segundo plano
   (stale-while-revalidate). Si no hay caché, va a la red y queda guardado. */
async function estatico(request, event) {
  const cache = await caches.open(CACHE_NAME);
  const cacheada = await cache.match(request);

  const revalidar = fetch(request)
    .then((res) => {
      if (res && res.ok) return cache.put(request, res.clone());
    })
    .catch(() => {});
  if (event && event.waitUntil) event.waitUntil(revalidar);

  if (cacheada) return cacheada;

  try {
    const res = await fetch(request);
    if (res && res.ok) await cache.put(request, res.clone());
    return res;
  } catch {
    return Response.error();
  }
}

/* Red primero con rescate de caché: para todo lo demás del mismo origen. */
async function redPrimero(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const res = await fetch(request);
    if (res && res.ok) cache.put(request, res.clone()).catch(() => {});
    return res;
  } catch {
    const cacheada = await cache.match(request);
    if (cacheada) return cacheada;
    return Response.error();
  }
}
