const C='kunterbunt-lock-v1';
const ASSETS=['./','index.html','manifest.webmanifest','icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
