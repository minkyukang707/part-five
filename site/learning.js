'use strict';
const LearningLog=(()=>{
  const key='partfive.learning.v1';
  const read=(k,fallback)=>{try{return JSON.parse(localStorage.getItem(k))||fallback;}catch{return fallback;}};
  const validCount=n=>Number.isSafeInteger(n)&&n>=0;
  const grammar=['partfive.progress.v1','partfive.progress.v1.backup'].map(k=>read(k,null))
    .find(s=>s&&validCount(s.total)&&validCount(s.correct)&&s.correct<=s.total)||{total:0,correct:0};
  const fresh=()=>({version:1,started:Date.now(),languageStarted:Date.now(),baseline:{total:grammar.total||0,correct:grammar.correct||0},items:{},days:{},languageDays:{},recent:[],ids:[]});
  let data=read(key,null);
  if(data?.version!==1||!data.items||!data.days||!data.baseline||!validCount(data.baseline.total)||!validCount(data.baseline.correct)||data.baseline.correct>data.baseline.total||!Array.isArray(data.recent)||!Array.isArray(data.ids))data=fresh();
  if(!data.languageDays){data.languageDays={};data.languageStarted=Date.now();}
  let storageOK=true;
  function dayKey(date=new Date()){
    return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
  }
  function save(){
    try{localStorage.setItem(key,JSON.stringify(data));storageOK=true;}
    catch{storageOK=false;}
  }
  function record(event){
    if(!event||typeof event.correct!=='boolean'||!event.key||!event.mode)return false;
    if(event.id&&data.ids.includes(event.id))return false;
    const language=event.language||'en';
    const id=JSON.stringify([event.mode,language,String(event.topic||event.key)]);
    const now=Date.now(),previous=data.items[id];
    const item=previous||{mode:event.mode,language,key:String(event.key),label:String(event.label||event.key).slice(0,160),attempts:0,correct:0,misses:0,streak:0,recoveries:0};
    if(!event.correct)item.key=String(event.key);
    if(event.correct){
      if(item.misses&&item.streak===0)item.recoveries++;
      item.correct++;item.streak++;
    }else{item.misses++;item.streak=0;}
    item.attempts++;item.last=now;item.difficulty=Number(event.difficulty)||null;
    data.items[id]=item;
    const date=dayKey(),daily=data.days[date]||{attempts:0,correct:0};
    daily.attempts++;daily.correct+=Number(event.correct);data.days[date]=daily;
    const languageDays=data.languageDays[language]??={};
    const languageDay=languageDays[date]??={attempts:0,correct:0};
    languageDay.attempts++;languageDay.correct+=Number(event.correct);
    for(const d of Object.keys(languageDays).sort().slice(0,-366))delete languageDays[d];
    const recent={mode:event.mode,language,key:String(event.key),correct:event.correct,at:now,difficulty:item.difficulty};
    data.recent.push(recent);data.recent=data.recent.slice(-300);
    if(event.id){data.ids.push(event.id);data.ids=data.ids.slice(-300);}
    const dates=Object.keys(data.days).sort();
    for(const d of dates.slice(0,Math.max(0,dates.length-366)))delete data.days[d];
    save();
    window.dispatchEvent(new CustomEvent('partfive:learning',{detail:{item:{...item},event:recent,storageOK}}));
    return true;
  }
  function reset(){data=fresh();data.baseline={total:0,correct:0};save();}
  function summary(){
    return {data:structuredClone(data),storageOK};
  }
  save();
  return {record,summary,reset,dayKey};
})();
window.LearningLog=LearningLog;
