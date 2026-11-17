'use strict';
const scope=self.registration.scope;
const prefix='part-five-app:'+new URL(scope).pathname+':';
const cacheName=prefix+'__RELEASE__';
const assets=/*ASSETS*/[];
const wasm=new URL('vendor/harper/harper.wasm',scope).href;
const known=new Set(assets.map(file=>new URL(file,scope).href));
self.addEventListener('message',event=>{
  if(event.data==='cache-writing')event.waitUntil((async()=>{
    const cache=await caches.open(cacheName);
    if(!await cache.match(wasm)){
      const response=await fetch(wasm,{cache:'force-cache'});
      if(response.ok)await cache.put(wasm,response);
    }
  })().catch(()=>{}));
});
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(cacheName);
    // Batches keep the first visit responsive on mobile connections.
    for(let i=0;i<assets.length;i+=12){
      await cache.addAll(assets.slice(i,i+12).map(file=>new Request(new URL(file,scope),{cache:'reload'})));
    }
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    for(const key of await caches.keys())if(key.startsWith(prefix)&&key!==cacheName)await caches.delete(key);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const navigation=request.mode==='navigate' && [scope,new URL('index.html',scope).href].includes(request.url.split('?')[0]);
  if(!navigation && !known.has(request.url) && request.url!==wasm)return;
  event.respondWith((async()=>{
    const url=navigation?new URL('index.html',scope).href:request.url;
    const cache=await caches.open(cacheName);
    const saved=await cache.match(url);
    if(saved)return saved;
    const response=await fetch(request);
    if(response.ok)await cache.put(url,response.clone()).catch(()=>{});
    return response;
  })());
});
