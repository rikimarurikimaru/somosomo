/* SOMOSOMO：ホーム画面に追加（インストール）できるようにするための service worker。
   中身はためこまず、いつもネットから取る（更新が古いまま残らないように）。 */
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request));
});
