// 更新網站內容後，把下面的 v7 改成 v8、v9…，手機才會抓到新版
const CACHE = "sd-v7";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];

self.addEventListener("install", e => {
  // 用 cache:"reload" 直接向伺服器抓最新檔案，避免抓到瀏覽器暫存的舊版
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.all(SHELL.map(u => fetch(new Request(u, {cache: "reload"})).then(r => { if (!r.ok) throw new Error(u); return c.put(u, r); }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const u = new URL(req.url);
  if (u.hostname.endsWith("script.google.com") || u.hostname.endsWith("googleusercontent.com")) return; // 日記資料不要快取
  const same = u.origin === location.origin;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const hit = await cache.match(req, {ignoreSearch: true});
    const net = (same ? fetch(req.url, {cache: "no-cache"}) : fetch(req)).then(res => {
      if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone());
      return res;
    }).catch(() => null);
    return hit || (await net) || (req.mode === "navigate" ? cache.match("index.html") : Response.error());
  }));
});
