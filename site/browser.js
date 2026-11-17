'use strict';
(() => {
  const scope = new URL('.', location.href);
  const cacheName = 'part-five-library:' + scope.pathname;
  const recordUrl = new URL('library/local-record',scope).href;
  const empty = {questions:[],lastCheck:0,revision:''};
  let loaded, updating;

  async function restore() {
    try {
      const cached = await (await caches.open(cacheName)).match(recordUrl);
      if (cached) {
        const data = await cached.json();
        if (Array.isArray(data.questions)) return data;
      }
    } catch { /* Storage may be unavailable in private browsing. */ }
    return empty;
  }
  const load = () => loaded ??= restore();
  async function getFile(name) {
    const response = await fetch(new URL('library/'+name,scope),{cache:'no-cache',signal:AbortSignal.timeout(45000)});
    if (!response.ok) throw Error('문장 자료를 받을 수 없습니다.');
    return response;
  }
  async function update() {
    const before = await load();
    const manifest = await (await getFile('index.json')).json();
    let questions = before.questions;
    if (before.revision !== manifest.revision) {
      const response = await getFile('questions.json');
      const bytes = await response.arrayBuffer();
      const hash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)), b=>b.toString(16).padStart(2,'0')).join('');
      if (hash!==manifest.revision) throw Error('새 문제 자료가 배포 중입니다. 잠시 후 다시 시도하세요.');
      questions = JSON.parse(new TextDecoder().decode(bytes));
      if (!Array.isArray(questions) || !questions.length || questions.length!==manifest.count) throw Error('문장 자료를 확인할 수 없습니다.');
    }
    const data = {questions,revision:manifest.revision,lastCheck:Date.now()};
    loaded = Promise.resolve(data);
    try {
      const cache = await caches.open(cacheName);
      await cache.put(recordUrl,new Response(JSON.stringify(data),{headers:{'Content-Type':'application/json'}}));
    } catch { /* The current session can still use the downloaded library. */ }
    return {...data,added:Math.max(0,questions.length-before.questions.length)};
  }
  window.sentenceLibrary = {load,update:()=>updating ??= update().finally(()=>{updating=null;})};

  let worker;
  window.writingCoach = {
    review(id,text) {
      return new Promise((resolve,reject)=>{
        worker ??= new Worker(new URL('writing-worker.js',scope),{type:'module'});
        const reset = message => {
          clearTimeout(timer);worker.terminate();worker=null;reject(Error(message));
        };
        const timer = setTimeout(()=>reset('검사기를 준비하는 데 시간이 걸립니다. 인터넷 연결을 확인한 뒤 다시 시도해 주세요.'),120000);
        worker.onmessage = ({data})=>{clearTimeout(timer);resolve(data);};
        worker.onerror = ()=>reset('Writing 검사기를 열지 못했어요. 처음 검사할 때는 인터넷에 연결해 주세요.');
        worker.postMessage({id,text});
      });
    }
  };
  if ('serviceWorker' in navigator) {
    window.addEventListener('load',()=>navigator.serviceWorker.register(new URL('sw.js',scope)).catch(()=>{}));
  }
})();
