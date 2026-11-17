'use strict';
(() => {
  const byId = id => document.getElementById(id);
  const primaryKey = 'partfive.progress.v1';
  let warning = '';
  const topicIds = new Set(STUDY_PATTERNS.map(p => p.topic));
  const patternIds = new Set(STUDY_PATTERNS.map(p => p.id));
  const record = x => x && typeof x === 'object' && !Array.isArray(x);
  const natural = x => Number.isSafeInteger(x) && x >= 0;
  function decode(raw) {
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (!record(s) || ![s.total,s.correct,s.recovered,s.sequence].every(natural) || s.correct>s.total ||
        !record(s.seen) || !record(s.pending) || !Object.values(s.seen).every(natural)) throw Error('Invalid record');
    s.pending = Object.fromEntries(Object.entries(s.pending).filter(([k,v]) => topicIds.has(k) && (patternIds.has(v)||/^(?:corpus-\d+|web-[a-f0-9]+)$/.test(v))));
    if(!natural(s.battleHits))s.battleHits=0;
    if(!natural(s.battleHeals))s.battleHeals=0;
    if(s.game!==undefined&&!Game.valid(s.game))throw Error('Invalid game record');
    if(!record(s.rounds)||!Object.values(s.rounds).every(r=>record(r)&&Array.isArray(r.used)&&r.used.every(t=>topicIds.has(t))))s.rounds={};
    return s;
  }
  function load() {
    for (const key of [primaryKey,primaryKey+'.backup']) {
      try { const s=decode(localStorage.getItem(key)); if (s) return s; }
      catch { warning='최근 기록을 읽을 수 없어 복구 가능한 기록으로 시작했어요.'; }
    }
    return null;
  }
  const engine = new StudyEngine(STUDY_PATTERNS,load());
  if(!engine.state.game){
    let legacyWords;
    try{legacyWords=JSON.parse(localStorage.getItem('partfive.vocabulary.v1'));}catch{}
    engine.state.game=Game.fromLegacy(engine.state,legacyWords);
  }
  const game=engine.state.game;
  Game.difficultyNames.forEach((name,i)=>byId('difficulty').add(new Option((i+1)+' · '+name,i+1)));
  Battle.draw(game);
  const genres={work:'업무·일상',research:'연구·논문',news:'뉴스·공공'};
  let q, review=false, previousReview=null,activeSync=false,lastCheck=0,onlyOnline=false;
  const letters='ABCD';
  const text = (id,value) => { byId(id).textContent=value; };
  const auto=byId('autoSync');
  try{auto.checked=localStorage.getItem('partfive.auto-sync')!=='off';}catch{}
  function applyLibrary(data){
    engine.addOnline(data.questions);
    text('onlineCount',engine.downloaded.size.toLocaleString()+'개');
    byId('playSaved').hidden=engine.downloaded.size===0;
    lastCheck=data.lastCheck||0;
  }
  async function sync(){
    if(activeSync || !window.sentenceLibrary)return;
    activeSync=true;byId('syncNow').disabled=true;text('syncStatus','문장 자료를 확인하고 있어요…');
    try{
      const result=await window.sentenceLibrary.update();
      if(result.error)throw Error(result.detail);
      const before=engine.pool.length;
      applyLibrary(result);
      const added=engine.pool.length-before;
      text('syncStatus',added?'풀 수 있는 새 문장 '+added.toLocaleString()+'개를 추가했어요.':result.added?'받은 문장을 저장했어요. 이 문장들은 기본 문제에도 들어 있어요.':'확인한 자료에서 새로 추가할 문장이 없어요.');
    }catch{ text('syncStatus','자료를 받지 못했어요. 저장된 문제는 계속 풀 수 있어요.'); }
    finally{activeSync=false;byId('syncNow').disabled=false;}
  }
  function automatic(force=false){
    if(auto.checked && navigator.onLine && (force||Date.now()-lastCheck>86400000))void sync();
  }
  byId('syncNow').onclick=sync;
  byId('playSaved').onclick=()=>{if(engine.downloaded.size)start(false,null,true);};
  auto.onchange=()=>{try{localStorage.setItem('partfive.auto-sync',auto.checked?'on':'off');}catch{}if(auto.checked)automatic();};
  window.addEventListener('online',()=>automatic());
  function page(mode){
    const words=mode==='words',writing=mode==='writing',grammar=mode==='grammar';
    byId('wordPage').hidden=!words;byId('grammarPage').hidden=!grammar;byId('writingPage').hidden=!writing;
    try{localStorage.setItem('partfive.tab',mode);}catch{}
    byId('wordsTab').setAttribute('aria-pressed',String(words));
    byId('writingTab').setAttribute('aria-pressed',String(writing));
    byId('studyTab').setAttribute('aria-pressed',String(grammar && !review));
    byId('reviewTab').setAttribute('aria-pressed',String(grammar && review));
    if(words){WordStudy.draw();WordStudy.focusCard();}
    if(writing)WritingStudy.open();
    window.scrollTo(0,0);
  }
  function save() {
    try {
      const previous=localStorage.getItem(primaryKey);
      if (previous) {
        try { if (decode(previous)) localStorage.setItem(primaryKey+'.backup',previous); }
        catch { /* Preserve a readable backup if the primary entry is damaged. */ }
      }
      localStorage.setItem(primaryKey,JSON.stringify(engine.state));
      warning='';
    } catch { warning='저장 공간을 사용할 수 없어요. 이번 학습 기록은 창을 닫기 전까지 유지됩니다.'; }
    text('storage',warning);
  }
  function drawStats() {
    const s=engine.state;
    const percent=s.total ? Math.round(s.correct/s.total*100) : 0;
    text('rate',s.total ? percent+'%' : '—');
    byId('meter').value=percent;
    text('totals','총 '+s.total.toLocaleString()+'문제  ·  정답 '+s.correct.toLocaleString()+'개');
    const pending=Object.keys(s.pending);
    text('dueCount',pending.length+'개');
    byId('noDue').hidden=!!pending.length;
    byId('topics').replaceChildren(...pending.map(topic => {
      const b=document.createElement('button'); b.textContent=engine.labels.get(topic)+'  ›';
      b.addEventListener('click',()=>start(true,topic));
      return b;
    }));
    text('storage',warning);
  }
  function start(isReview,topic=null,fromLibrary=false,restore=null) {
    review=isReview;
    onlyOnline=fromLibrary && !review;
    const pending=Object.keys(engine.state.pending);
    if (review && !topic) topic=pending.find(t=>t!==previousReview) || pending[0];
    if (review) previousReview=topic;
    q=restore || (review && !topic ? null : engine.next(review ? topic : null,onlyOnline,byId('genre').value,game.difficulty));
    byId('genreRow').hidden=review;
    engine.state.session={q,review,onlyOnline,genre:byId('genre').value};
    save();
    byId('studyTab').setAttribute('aria-pressed',String(!review));
    byId('reviewTab').setAttribute('aria-pressed',String(review));
    text('title',review ? '오답 복습' : onlyOnline ? '받은 문장 연습' : '문장 완성');
    text('counter',q ? '문제 '+String(engine.state.total+(q.selected===null?1:0)).padStart(3,'0') : '');
    byId('empty').hidden=!!q; byId('quiz').hidden=!q;
    drawStats();
    window.scrollTo(0,0);
    if (!q) {
      text('emptyTitle',!review?'이 주제로 받은 문장이 아직 없어요.':engine.state.recovered ? '복습을 마쳤어요.' : '아직 복습할 유형이 없어요.');
      byId('empty').querySelector('p').textContent=review?'틀린 유형이 생기면 이곳에서 다른 문장으로 다시 풀 수 있어요.':'다른 주제를 고르거나 새 문장을 받아 보세요.';
      byId('back').focus({preventScroll:true});
      return;
    }
    text('instruction',(review ? engine.labels.get(q.topic)+' · 다른 문장으로 복습' : genres[q.genre]+' · 문장 완성')+(q.tier?' · 문항 난도 '+q.tier+'/5':''));
    const [before,after]=q.stem.split('____');
    const gap=document.createElement('span'); gap.className='blank'; gap.setAttribute('role','img'); gap.setAttribute('aria-label','blank');
    byId('stem').replaceChildren(document.createTextNode(before),gap,document.createTextNode(after));
    byId('choices').replaceChildren(...q.options.map((option,i)=>{
      const b=document.createElement('button'); b.className='choice'; b.setAttribute('lang','en');
      const letter=document.createElement('span'); letter.className='letter'; letter.textContent=letters[i];
      const word=document.createElement('span'); word.className='word'; word.textContent=option;
      b.append(letter,word); b.disabled=game.hp===0; b.addEventListener('click',()=>answer(i)); return b;
    }));
    byId('hint').hidden=game.hp===0;byId('downHint').hidden=game.hp!==0; byId('feedback').hidden=true; byId('actions').hidden=true;
    byId('stem').focus({preventScroll:true});
    if(q.selected!==null)paintAnswer(q.selected,false);
  }
  function answer(index) {
    if (game.hp===0 || !engine.grade(q,index)) return;
    const outcome=Game.answer(game,q.options[index]===q.answer);
    if(outcome)q.combatReceipt=Battle.message(game,outcome);
    save();
    Battle.draw(game,outcome);
    paintAnswer(index,true);
    if(outcome?.kind==='kill'||Game.taunt(game.wrong)||game.hp===0)byId('field').scrollIntoView({block:'nearest'});
    if(engine.state.total%30===0)automatic(true);
  }
  function paintAnswer(index,focus){
    const correct=q.options[index]===q.answer;
    const key=q.options.indexOf(q.answer);
    Array.from(byId('choices').children).forEach((b,i)=>{
      b.disabled=true;
      if (i===key) b.classList.add('right');
      else if (i===index) b.classList.add('wrong');
    });
    const msg=correct ? (review?'복습 성공!':'정답이에요!') : '오답이에요. 정답은';
    text('result',msg+'  '+letters[key]+' · '+q.answer);
    text('concept',engine.labels.get(q.topic));
    byId('combatReceipt').hidden=!q.combatReceipt;text('combatReceipt',q.combatReceipt||'');
    text('reason',q.why); text('meaning',q.meaning?'해석  ·  '+q.meaning:'원문  ·  '+q.original);
    byId('sourceCredit').hidden=!q.credit&&!q.reference;
    text('sourceCredit',q.credit?'문장 출처 · '+q.credit+' · 빈칸 문제로 가공':q.reference?'주제 참고 · '+q.reference:'');
    byId('feedback').classList.toggle('missed',!correct);
    byId('feedback').hidden=false; byId('actions').hidden=false; byId('hint').hidden=true;byId('downHint').hidden=game.hp!==0;
    byId('retry').hidden=correct;
    text('next',review ? (Object.keys(engine.state.pending).length ? '다음 복습 →' : '복습 마치기 ✓') : '다음 문제 →');
    drawStats();
    if(focus)byId('next').focus({preventScroll:true});
    if (focus && byId('actions').getBoundingClientRect().bottom>window.innerHeight) byId('actions').scrollIntoView({block:'nearest'});
  }
  byId('studyTab').onclick=()=>{ page('grammar');if (review || onlyOnline) start(false); };
  byId('reviewTab').onclick=()=>{ page('grammar');if (!review) start(true); };
  byId('wordsTab').onclick=()=>page('words');
  byId('writingTab').onclick=()=>page('writing');
  byId('genre').onchange=()=>start(false,null,onlyOnline);
  byId('retry').onclick=()=>{ if(q && q.selected!==null) start(true,q.topic); };
  byId('next').onclick=()=>{ if(q && q.selected!==null) start(review,null,onlyOnline); };
  byId('back').onclick=()=>start(false);
  byId('difficulty').onchange=()=>{
    const n=Number(byId('difficulty').value);
    if(!Number.isInteger(n)||n<1||n>5)return;
    game.difficulty=n;save();Battle.draw(game);
    if(!q||q.selected===null)start(review,q?.topic,onlyOnline);
  };
  byId('reviveHere').onclick=byId('revive').onclick=()=>{
    if(!Game.revive(game))return;
    save();Battle.draw(game,null,'체력을 회복했어요. 같은 몬스터에 다시 도전합니다.');
    byId('downHint').hidden=true;
    if(q?.selected===null){byId('hint').hidden=false;Array.from(byId('choices').children).forEach(b=>{b.disabled=false;});}
  };
  function buy(kind){
    if(!Game.buy(game,kind))return;
    save();Battle.draw(game);Battle.shop(game,buy);
    text('shopNotice',Game.gear[kind][game[kind]][0]+' 착용 완료 · '+(kind==='sword'?'공격력 '+Game.attack(game):'최대 체력 '+Game.maxHp(game)));
  }
  byId('openShop').onclick=()=>{Battle.shop(game,buy);text('shopNotice','');byId('shopDialog').showModal();};
  byId('resetOpen').onclick=()=>{byId('eraseDrafts').checked=false;text('resetStatus','');byId('resetDialog').showModal();};
  document.querySelectorAll('button[data-close]').forEach(b=>{b.onclick=()=>byId(b.dataset.close).close();});
  byId('resetConfirm').onclick=()=>{
    try{ProgressReset.apply(byId('eraseDrafts').checked);location.reload();}
    catch{text('resetStatus','진도를 초기화하지 못했어요. 다시 시도하세요.');}
  };
  document.addEventListener('keydown',e=>{
    if (byId('grammarPage').hidden || document.querySelector('dialog[open]') || e.target.matches('select,input') || e.ctrlKey || e.altKey || e.metaKey || e.shiftKey || e.repeat || !q || q.selected!==null) return;
    if (/^[1-4]$/.test(e.key)) { e.preventDefault(); answer(Number(e.key)-1); }
  });
  async function initialize(){
    if(window.sentenceLibrary){
      try{applyLibrary(await window.sentenceLibrary.load());text('syncStatus',lastCheck?'최근 확인 '+new Date(lastCheck).toLocaleDateString('ko-KR'):'인터넷에서 새 연습 문장을 받을 수 있어요.');}
      catch{text('syncStatus','저장된 온라인 자료를 읽지 못했어요.');}
    } else{text('syncStatus','브라우저에서 자료를 불러오지 못했어요. 새로고침한 뒤 다시 시도하세요.');byId('syncNow').disabled=true;}
    const s=engine.state.session,old=s?.q;
    if(s && Object.hasOwn(genres,s.genre))byId('genre').value=s.genre;
    if(old && topicIds.has(old.topic) && typeof old.stem==='string' && Array.isArray(old.options) && old.options.length===4 && old.options.includes(old.answer) && (old.selected===null || [0,1,2,3].includes(old.selected))){
      start(!!s.review,old.topic,!!s.onlyOnline,old);
    }else start(!!s?.review,null,!!s?.onlyOnline);
    try{const tab=localStorage.getItem('partfive.tab');if(tab==='words'||tab==='writing')page(tab);}catch{}
    automatic();
  }
  void initialize();
})();
