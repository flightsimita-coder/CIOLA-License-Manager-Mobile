/* Cache soltanto l'applicazione statica. Non intercetta i documenti PEM/JSON. */
const CACHE='ciola-license-manager-v1';
const FILES=['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));
});
self.addEventListener('activate',event=>{
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
  if(!(url.pathname.endsWith('/')||url.pathname.endsWith('/index.html')||url.pathname.endsWith('/manifest.webmanifest')))return;
  event.respondWith(caches.match(event.request).then(response=>response||fetch(event.request)));
});
