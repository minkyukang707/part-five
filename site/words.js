'use strict';
const WordStudy=(()=>{
  const $=id=>document.getElementById(id);
  const key='partfive.vocabulary.v1';
  const size=30,sets=VOCABULARY.length/size;
  const clamp=(n,max)=>Number.isInteger(n)&&n>=0&&n<max?n:0;
  let data={set:0,marks:{},cursor:{},review:null,result:null};
  try{
    const saved=JSON.parse(localStorage.getItem(key)||'null');
    if(saved && saved.marks && saved.cursor && typeof saved.marks==='object' && typeof saved.cursor==='object'){
      Object.assign(data,{set:clamp(saved.set,sets),marks:saved.marks,cursor:saved.cursor});
      const last=saved.result;
      if(last && Number.isInteger(last.word) && Math.floor(last.word/size)===data.set && typeof last.answer==='string' && typeof last.ok==='boolean')data.result=last;
      const r=saved.review;
      if(r && r.set===data.set && Array.isArray(r.words) && r.words.every(i=>Number.isInteger(i)&&i>=0&&i<VOCABULARY.length&&Math.floor(i/size)===data.set) && Number.isInteger(r.i) && r.i>=0 && r.i<r.words.length)data.review=r;
    }
  }catch{}
  const save=()=>{try{localStorage.setItem(key,JSON.stringify(data));$('wordStorage').textContent='';}catch{$('wordStorage').textContent='진도를 저장할 수 없어요. 창을 닫기 전까지 학습할 수 있습니다.';}};
  const indices=()=>Array.from({length:size},(_,i)=>data.set*size+i);
  const cursor=()=>clamp(data.cursor[data.set],size+1);
  const current=()=>data.review?data.review.words[data.review.i]:data.set*size+cursor();
  function draw(){
    const review=data.review,index=cursor(),ids=indices();
    const result=data.result;
    const done=!result&&!review&&index===size;
    const again=ids.filter(i=>data.marks[i]==='again');
    $('flash').hidden=done;$('wordFinish').hidden=!done;
    $('wordMeter').value=Object.values(data.marks).filter(v=>v==='known').length;
    $('wordTotal').textContent=$('wordMeter').value.toLocaleString()+'개';
    $('setSelect').value=data.set;
    $('setProgress').textContent=index+' / '+size;$('setMeter').value=index;
    $('setCounts').textContent='외운 단어 '+ids.filter(i=>data.marks[i]==='known').length+'개 · 다시 볼 단어 '+again.length+'개';
    $('wordTiles').replaceChildren(...ids.map(i=>{
      const tile=document.createElement('span');
      tile.textContent=i%size+1;
      if(data.marks[i]==='known'||data.marks[i]==='again')tile.className=data.marks[i];
      if(!done&&i===(result?result.word:current()))tile.classList.add('current');
      return tile;
    }));
    $('wordCounter').textContent=result?result.counter:done?'30 / 30':review?'복습 '+(review.i+1)+' / '+review.words.length:(index+1)+' / '+size;
    if(done){
      $('wordFinishTitle').textContent=(data.set+1)+'세트 학습을 마쳤어요.';
      $('wordSummary').textContent=again.length?'다시 볼 단어 '+again.length+'개를 골라 복습할 수 있어요.':'이 세트의 30개 단어를 모두 외웠어요.';
      $('repeatMissed').hidden=!again.length;$('nextSet').hidden=data.set===sets-1;
      return;
    }
    const card=VOCABULARY[result?result.word:current()];
    $('wordSetLabel').textContent='세트 '+String(data.set+1).padStart(2,'0')+((result?result.wasReview:review)?' · 복습':'');
    $('wordPos').textContent=card.pos;$('headword').textContent=card.w;
    $('wordForm').hidden=!!result;$('wordDetails').hidden=!result;
    if(!result)return;
    $('wordVerdict').textContent=(result.ok?'정답이에요!':'등록된 뜻과 달라 복습 목록에 담았어요.')+'  내 답 · '+result.answer;
    $('wordVerdict').classList.toggle('missed',!result.ok);
    $('wordMain').textContent=card.main;
    $('wordSub').textContent=card.sub.join(' · ')||'별도로 수록된 다른 뜻이 없어요.';
    $('wordAlt').textContent=card.alt.join(' · ');$('wordAlt').hidden=$('altTitle').hidden=!card.alt.length;
    const senses=[card,...card.relatedSenses];
    const chooser=$('senseChoice');chooser.replaceChildren(...senses.map((s,i)=>new Option(i?'다른 뜻 '+i:'기본 관계어',i)));
    chooser.hidden=$('senseLabel').hidden=senses.length===1;
    const paintRelations=()=>{
    const sense=senses[Number(chooser.value)||0];
    $('relationSense').textContent='관계어 기준 뜻  ·  '+(sense.context||card.main);
    for(const [id,items] of [['wordSyn',sense.syn],['wordNear',sense.near],['wordAnt',sense.ant]]){
      const node=$(id);node.replaceChildren();
      if(!items.length){node.textContent='이 뜻에 등록된 표현 없음';node.className='missing';}
      else{node.className='wordChips';items.forEach(w=>{const tag=document.createElement('span');tag.textContent=w;node.append(tag);});}
    }
    };
    chooser.onchange=paintRelations;paintRelations();
  }
  const normalize=s=>s.normalize('NFKC').trim().replace(/\s+/g,'').replace(/[.!?。]+$/u,'');
  function matches(card,raw){
    const answer=normalize(raw);
    const glosses=[card.main,...card.sub,...card.alt];
    for(const gloss of glosses){
      const cleaned=gloss.replace(/\s*\((?:명사|동사|부사|형용사|전치사|접속사|대명사|감탄사)\)/gu,'');
      const variants=[gloss,cleaned,...cleaned.split(/[,;·/]/u)];
      if(variants.some(v=>normalize(v)===answer || (/^[가-힣]{2,}하다$/u.test(normalize(v)) && normalize(v).slice(0,-2)===answer)))return true;
    }
    return false;
  }
  function submit(event){
    event.preventDefault();
    if(data.result || (!data.review && cursor()===size))return;
    const answer=$('wordInput').value.trim();
    if(!/[가-힣]/u.test(answer)){$('inputNote').textContent='한국어 뜻을 입력해 주세요.';$('wordInput').focus();return;}
    const word=current(),ok=answer!=='모름'&&matches(VOCABULARY[word],answer);
    data.result={word,answer,ok,counter:$('wordCounter').textContent,wasReview:!!data.review};
    data.marks[word]=ok?'known':'again';
    if(data.review){if(++data.review.i>=data.review.words.length)data.review=null;}
    else data.cursor[data.set]=Math.min(size,cursor()+1);
    save();draw();focusCard();
  }
  function focusCard(){const id=$('flash').hidden?($('repeatMissed').hidden?'redoSet':'repeatMissed'):data.result?'wordNext':'wordInput';$(id).focus({preventScroll:true});}
  function clearEntry(){data.result=null;$('wordInput').value='';$('inputNote').textContent='';}
  function select(n){data.set=n;data.review=null;clearEntry();save();draw();focusCard();}
  for(let i=0;i<sets;i++)$('setSelect').add(new Option('세트 '+String(i+1).padStart(2,'0')+'   ·   '+(i*size+1)+'–'+((i+1)*size),i));
  $('setSelect').onchange=e=>select(Number(e.target.value));
  $('wordForm').onsubmit=submit;
  $('wordInput').addEventListener('keydown',event=>{if(event.key==='Enter' && (event.isComposing||event.keyCode===229))event.preventDefault();});
  $('wordNext').onclick=()=>{if(!data.result)return;clearEntry();save();draw();focusCard();};
  $('nextSet').onclick=()=>{if(data.set<sets-1)select(data.set+1);};
  $('redoSet').onclick=()=>{data.cursor[data.set]=0;select(data.set);};
  $('repeatMissed').onclick=()=>{const words=indices().filter(i=>data.marks[i]==='again');if(words.length){data.review={set:data.set,words,i:0};clearEntry();save();draw();focusCard();}};
  return {draw,focusCard,matches};
})();
