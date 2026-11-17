'use strict';
const ProgressReset=(()=>{
  const pending='partfive.reset.pending';
  function apply(eraseDrafts){
    localStorage.setItem(pending,eraseDrafts?'all':'keep-drafts');
    for(const key of ['partfive.progress.v1','partfive.progress.v1.backup','partfive.vocabulary.v1','partfive.tab','partfive.writing.v1.selected'])localStorage.removeItem(key);
    for(const key of Object.keys(localStorage).filter(k=>k.startsWith('partfive.writing.v1.draft.'))){
      if(eraseDrafts)localStorage.removeItem(key);
      else{
        let entry;
        try{entry=JSON.parse(localStorage.getItem(key));}catch{continue;}
        if(typeof entry?.text==='string')localStorage.setItem(key,JSON.stringify({text:entry.text,last:null,previous:null}));
      }
    }
    localStorage.removeItem(pending);
  }
  try{const mode=localStorage.getItem(pending);if(mode)apply(mode==='all');}catch{}
  return {apply};
})();
