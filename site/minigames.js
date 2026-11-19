'use strict';
const MiniGameStudy=(()=>{
  const E=MiniGameEngine,key='partfive.minigames.v1';
  const modes={
    memory:{name:'기억의 정원',tag:'카드 짝맞추기',icon:'❀',detail:'뒤집힌 카드 속 단어와 한국어 뜻, 여섯 쌍을 찾아요.',color:'mint'},
    anagram:{name:'글자 공방',tag:'글자 조립',icon:'✦',detail:'한국어 뜻을 보고 흩어진 글자를 모아 단어 5개를 완성해요.',color:'gold'},
    meteor:{name:'별빛 캐치',tag:'시간제한 뜻 맞히기',icon:'☄',detail:'별이 내려오기 전에 뜻을 골라요. 10문제, 기회는 3번!',color:'violet'},
    search:{name:'단어 탐험',tag:'단어 찾기',icon:'⌘',detail:'한국어 힌트로 숨어 있는 단어 4개를 찾아요. 가로·세로·대각선!',color:'blue'}
  };
  let host,ui,state=null,timer=null,lastTick=0,store={version:1,languages:{}},storageOK=true;
  try{const saved=JSON.parse(localStorage.getItem(key));if(saved?.version===1&&saved.languages&&typeof saved.languages==='object'&&!Array.isArray(saved.languages))store=saved;}catch{}
  const lang=()=>StudyLocale.current(),languageName=()=>StudyLocale.names[lang()];
  const bank=()=>E.words(lang()==='en'?VOCABULARY:LANGUAGE_COURSES[lang()].words);
  function pick(pool,count){
    const items=Object.values(window.LearningLog?.summary().data.items||{}).filter(i=>i.language===lang()&&(i.mode==='word'||i.mode==='language-word'));
    const misses=new Map(items.map(i=>[i.mode==='word'?VOCABULARY[Number(i.key)]?.w:i.key,Math.max(0,i.misses-i.streak)]));
    const local=store.languages[lang()]?.misses||{};
    return pool.map(w=>({w,rank:-Math.log(Math.max(Number.MIN_VALUE,Math.random()))/(1+Math.min(5,(misses.get(w.key)||misses.get(w.word)||0)+(local[w.key]||0)))})).sort((a,b)=>a.rank-b.rank).slice(0,count).map(x=>x.w);
  }
  function autoNext(){const current=state,feedback=state.feedback;setTimeout(()=>{if(state===current&&state.feedback===feedback&&!host.hidden&&!document.hidden&&!state.finished)next();},state.feedback?.ok?450:1400);}
  function node(tag,text,cls){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;}
  function button(text,action,cls='outline',value){const b=node('button',text,cls);b.type='button';b.dataset.action=action;if(value!==undefined)b.dataset.value=value;return b;}
  function languageData(){let data=store.languages[lang()];if(!data||typeof data!=='object'||Array.isArray(data))data=store.languages[lang()]={};return data;}
  const difficulty=()=>E.validDifficulty(languageData().difficulty)?languageData().difficulty:3;
  function stats(mode,level=difficulty()){const s=languageData().levels?.[level]?.[mode];return s&&Number.isSafeInteger(s.plays)&&s.plays>=0&&Number.isSafeInteger(s.best)&&s.best>=0?s:{plays:0,best:0,stars:0};}
  function save(){try{localStorage.setItem(key,JSON.stringify(store));storageOK=true;}catch{storageOK=false;}if(ui)ui.storage.hidden=storageOK;}
  function stopClock(){if(timer!==null)clearInterval(timer);timer=null;}
  function pause(){
    if(!state||state.finished||(state.feedback&&state.mode!=='search')||state.paused)return;
    tick();if(state.finished||(state.feedback&&state.mode!=='search'))return;state.paused=true;stopClock();render();
  }
  function resume(){if(!state||!state.paused||document.hidden)return;state.paused=false;render();startClock();}
  function startClock(){stopClock();if(!state||(state.feedback&&state.mode!=='search')||state.finished||state.paused||host.hidden||document.hidden)return;lastTick=performance.now();timer=setInterval(tick,100);}
  function tick(){
    if(!state||state.paused||(state.feedback&&state.mode!=='search')||state.finished)return;
    const now=performance.now(),elapsed=now-lastTick;lastTick=now;
    if(state.preview){
      state.previewLeft=Math.max(0,state.previewLeft-elapsed);
      const label=host.querySelector('[data-preview-clock]');if(label)label.textContent=state.preview==='reveal'?Math.ceil(state.previewLeft/1000)+'초 동안 기억해요':'카드를 뒤집고 있어요…';
      if(!state.previewLeft){
        if(state.preview==='reveal'){state.preview='conceal';state.previewLeft=750;}
        else state.preview=null;
        render();
      }
      return;
    }
    state.remaining=Math.max(0,state.remaining-elapsed);
    const star=host.querySelector('.fallingWord');
    for(const time of host.querySelectorAll('[data-game-time]')){time.textContent=Math.ceil(state.remaining/1000)+'초';time.setAttribute('aria-label','남은 시간 '+Math.ceil(state.remaining/1000)+'초');}
    if(star)star.style.setProperty('--fall',String((1-state.remaining/state.limit)*155)+'px');
    if(state.remaining===0)expire();
  }
  function expire(){
    stopClock();state.timedOut=true;
    if(state.mode==='meteor'){gradeMeteor(null);return;}
    if(state.mode==='anagram'){
      const word=state.queue[state.round];state.attempts++;note(word);
      state.feedback={ok:false,done:true,text:'시간이 끝났어요. '+word.word+' · '+word.meaning};render();autoNext();return;
    }
    const unseen=state.mode==='memory'?state.cards.filter(c=>c.side==='word'&&!state.found.includes(c.pair)).map(c=>c.word):state.board.words.filter(w=>!state.found.includes(w.key));
    for(const word of unseen){state.attempts++;note(word);}finish();
  }
  function start(mode){
    if(!modes[mode])return;stopClock();const level=difficulty(),config=E.settings(level),pool=E.levelPool(bank(),lang(),level,mode,MINIGAME_LEVELS);
    state={language:lang(),mode,pool,difficulty:level,limit:config[mode]*1000,remaining:config[mode]*1000,correct:0,attempts:0,feedback:null,finished:false,paused:false,review:[]};
    if(mode==='memory'){
      const words=pick(pool,6);state.cards=E.shuffle(words.flatMap((w,i)=>[{pair:i,text:w.word,word:w,side:'word'},{pair:i,text:w.meaning,word:w,side:'meaning'}]));state.open=[];state.found=[];state.preview='reveal';state.previewLeft=8500;
    }else if(mode==='anagram'){
      state.queue=pick(pool.filter(w=>{const a=E.letters(w.word);return a.length>=2&&a.length<=10&&new Set(a).size>1;}),5);state.round=0;prepareAnagram();
    }else if(mode==='meteor'){
      state.queue=pick(pool,10);state.round=0;state.lives=3;prepareMeteor();
    }else{state.board=E.grid(pick(pool.filter(w=>E.letters(w.word).length>=2&&E.letters(w.word).length<=7&&!/\s/.test(w.word)),4));state.found=[];state.selected=null;state.highlight=[];}
    render();ui.play.scrollIntoView({block:'start',behavior:'instant'});startClock();ui.play.focus({preventScroll:true});
  }
  function prepareAnagram(){state.tiles=E.tiles(state.queue[state.round].word);state.selected=[];state.feedback=null;state.roundMisses=0;state.remaining=state.limit;}
  function prepareMeteor(){state.options=E.options(state.queue[state.round],state.pool);state.remaining=state.limit;state.feedback=null;}
  function finish(){
    if(state.finished)return;stopClock();state.finished=true;
    const score=E.score(state.correct,state.attempts),stars=E.stars(state.correct,state.attempts),previous=stats(state.mode,state.difficulty);
    state.score=score;state.stars=stars;state.newBest=score>previous.best;
    if(!store.languages[lang()]||typeof store.languages[lang()]!=='object'||Array.isArray(store.languages[lang()]))store.languages[lang()]={};
    (languageData().levels??={})[state.difficulty]??={};
    languageData().levels[state.difficulty][state.mode]={plays:previous.plays+1,best:Math.max(previous.best,score),stars:Math.max(Number.isInteger(previous.stars)?Math.min(3,Math.max(0,previous.stars)):0,stars)};
    state.reward=E.reward(score,state.difficulty);window.MiniGameWallet?.award(state.reward);
    save();render();ui.play.focus({preventScroll:true});
  }
  function note(word){
    const stats=store.languages[lang()]??={};const misses=stats.misses??={};misses[word.key]=Math.min(20,(misses[word.key]||0)+1);save();if(!state.review.some(w=>w.key===word.key))state.review.push(word);}
  function memory(index){
    if(state.preview||state.feedback||state.open.includes(index)||state.found.includes(state.cards[index]?.pair)||!state.cards[index])return;
    state.open.push(index);
    if(state.open.length===2){
      const [a,b]=state.open.map(i=>state.cards[i]);state.attempts++;
      if(a.pair===b.pair){state.correct++;state.found.push(a.pair);state.open=[];if(state.found.length===6){finish();return;}}
      else{note(a.word);note(b.word);state.feedback={ok:false,text:'다른 짝이에요. '+a.word.word+' = '+a.word.meaning+' / '+b.word.word+' = '+b.word.meaning};}
    }
    render();if(state.feedback)autoNext();
  }
  function checkAnagram(reveal=false){
    if(state.feedback)return;const word=state.queue[state.round];
    if(!reveal&&state.selected.length!==state.tiles.length)return;
    const answer=state.selected.map(i=>state.tiles[i].text).join(''),ok=!reveal&&answer===word.word;
    state.attempts++;if(ok)state.correct++;else{state.roundMisses++;note(word);}
    state.feedback={ok,text:ok?'완성했어요! '+word.word+' · '+word.meaning:'정답은 '+word.word+' · '+word.meaning,done:ok||reveal||state.roundMisses>=2};
    render();autoNext();
  }
  function gradeMeteor(choice){
    if((state.feedback&&state.mode!=='search')||state.paused||state.finished)return;
    if(choice!==null&&(!Number.isInteger(choice)||!state.options[choice]))return;
    // Time remains authoritative even if an answer click precedes the interval callback.
    if(choice!==null&&performance.now()-lastTick>=state.remaining){choice=null;}
    stopClock();const word=state.queue[state.round],ok=choice!==null&&state.options[choice].key===word.key;
    state.attempts++;if(ok)state.correct++;else{state.lives--;note(word);}
    state.feedback={ok,text:(ok?'별을 잡았어요! ':choice===null?'시간이 끝났어요. ':'다시 기억해 봐요. ')+word.word+' · '+word.meaning};render();autoNext();
  }
  function selectCell(index){
    if(!Number.isInteger(index)||index<0||index>=state.board.cells.length)return;
    if(state.selected===null){state.selected=index;state.highlight=[index];state.feedback=null;render();return;}
    const path=E.line(state.selected,index,state.board.size);state.selected=null;
    const text=path.map(i=>state.board.cells[i]).join('');
    const word=state.board.words.find(w=>!state.found.includes(w.key)&&(w.word===text||w.word===E.letters(text).reverse().join('')));
    state.attempts++;
    if(word){state.correct++;state.found.push(word.key);word.foundPath=path;state.highlight=[];state.feedback={ok:true,text:'찾았어요! '+word.word+' · '+word.meaning};}
    else{state.highlight=[];state.feedback={ok:false,text:'아직 찾지 못했어요. 단어의 첫 글자와 끝 글자를 눌러 주세요.'};}
    if(state.found.length===state.board.words.length){finish();return;}render();
  }
  function next(){
    if(!state?.feedback||state.finished)return;
    if(state.mode==='memory'){state.open=[];state.feedback=null;}
    else if(state.mode==='anagram'){
      if(!state.feedback.done){state.feedback=null;state.selected=[];}
      else if(++state.round===state.queue.length){finish();return;}
      else prepareAnagram();
    }else if(state.mode==='meteor'){
      if(state.lives<=0||++state.round===state.queue.length){finish();return;}
      prepareMeteor();
    }
    render();startClock();
  }
  function feedback(){
    if(!state.feedback)return;
    const f=node('section',state.feedback.text,'arcadeFeedback '+(state.feedback.ok?'ok':'miss'));f.setAttribute('role','status');ui.play.append(f);
    if(state.mode!=='search')ui.play.append(button(state.mode==='anagram'&&!state.feedback.done?'다시 조립하기':'계속 →','next','primary'));
  }
  function render(){
    if(!ui)return;
    const memoryGrid=state?.mode==='memory'?ui.play.querySelector('.memoryGrid'):null;
    ui.kana.hidden=lang()!=='ja'||!!state;ui.language.closest('.arcadeHero').hidden=!!state;ui.difficulty.closest('.arcadeDifficulty').hidden=!!state;ui.language.textContent=languageName()+' 작은 놀이터';ui.storage.hidden=storageOK;
    ui.difficulty.value=String(difficulty());ui.difficulty.disabled=!!state;
    const config=E.settings(state?.difficulty||difficulty());
    ui.rules.textContent='보상 ×'+config.multiplier+' · 1,000점 → '+E.reward(1000,state?.difficulty||difficulty())+' G · 카드 '+config.memory+'초/판 · 조립 '+config.anagram+'초/문제 · 별빛 '+config.meteor+'초/문제 · 탐험 '+config.search+'초/판';
    ui.cards.replaceChildren(...Object.entries(modes).map(([id,m])=>{
      const card=button('','start','arcadeCard '+m.color,id),s=stats(id);
      card.append(node('span',m.icon,'arcadeIcon'),node('small',m.tag),node('h2',m.name),node('p',m.detail),node('span',s.plays?'최고 '+s.best+'점 · '+s.plays+'판':'첫 기록을 만들어 보세요','arcadeBest'),node('strong',difficulty()+'단계 시작 ↗'));
      const old=languageData()[id];if(old?.plays)card.append(node('p','난이도 도입 전 기록: 최고 '+old.best+'점 · '+old.plays+'판','arcadeLegacy'));return card;
    }));
    ui.play.hidden=!state;ui.cards.hidden=!!state;ui.play.replaceChildren();ui.back.hidden=!state;
    if(!state)return;
    ui.play.dataset.game=state.mode;ui.play.classList.toggle('hasMiss',!!state.feedback&&!state.feedback.ok&&!state.finished);
    const head=node('div',undefined,'arcadePlayHead');head.append(node('h2',modes[state.mode].name),node('span',state.difficulty+'단계 · '+state.correct+' 성공 · '+state.attempts+' 시도'));ui.play.append(head);
    if(state.finished){
      const result=node('section',undefined,'arcadeResult');
      result.append(node('div','★'.repeat(state.stars)+'☆'.repeat(3-state.stars),'arcadeStars'),node('h3',state.timedOut&&(state.mode==='memory'||state.mode==='search')?'시간 종료! 획득 점수를 정산했어요.':state.newBest?'새 최고 기록이에요!':'한 판을 마쳤어요!'),node('strong',state.score+'점'),node('p','상점 돈 +'+state.reward+' G · 이 언어의 상점에서 사용할 수 있어요.'));
      if(state.review.length){result.append(node('h4','다시 기억할 단어'));for(const w of state.review)result.append(node('p',w.word+' · '+w.meaning,'arcadeReview'));}
      result.append(button('한 번 더','start','primary',state.mode),button('다른 게임','menu'));ui.play.append(result);return;
    }
    const clock=node('div',undefined,'arcadeClock'),time=node('strong',state.preview?'카드 미리보기':Math.ceil(state.remaining/1000)+'초');if(!state.preview)time.dataset.gameTime='';clock.append(time,node('span',state.preview?'미리보기 동안 게임 시간은 줄지 않아요.':(state.mode==='memory'||state.mode==='search'?'한 판':'이번 문제')+' 제한시간 '+state.limit/1000+'초'));ui.play.append(clock);
    if(state.paused){ui.play.append(node('p','시간이 멈췄어요. 준비되면 이어서 풀어 보세요.'),button('다시 시작','resume','primary'));return;}
    ui.play.append(button('잠깐 쉬기','pause'));
    if(state.mode==='memory'){
      const instruction=node('p',state.preview?(state.preview==='reveal'?Math.ceil(state.previewLeft/1000)+'초 동안 기억해요':'카드를 뒤집고 있어요…'):'단어 카드와 같은 뜻의 한국어 카드를 짝지어 주세요.','arcadeInstruction');if(state.preview)instruction.dataset.previewClock='';ui.play.append(instruction);
      const grid=memoryGrid||node('div',undefined,'memoryGrid');
      state.cards.forEach((card,i)=>{
        const found=state.found.includes(card.pair),open=state.preview==='reveal'||found||state.open.includes(i),b=grid.children[i]||button('','card','memoryCard',i);
        if(!b.firstChild){const inner=node('span',undefined,'memoryCardInner'),back=node('span','✦','memoryBack'),face=node('span',undefined,'memoryFace');back.setAttribute('aria-hidden','true');face.append(node('span',card.text));if(lang()==='ja'&&card.side==='word'){const reading=JapaneseReading.describe(card.word.word);if(reading)face.append(node('small',reading,'memoryReading'));}inner.append(back,face);b.append(inner);grid.append(b);}
        b.classList.toggle('matched',found);b.disabled=!!state.preview||found||!!state.feedback;b.setAttribute('aria-label',open?card.text:'카드 '+(i+1)+' 뒤집기');b.setAttribute('aria-pressed',String(open));b.querySelector('.memoryFace').setAttribute('aria-hidden',String(!open));
        if(!memoryGrid&&open){requestAnimationFrame(()=>requestAnimationFrame(()=>{if(b.isConnected)b.classList.add('flipped');}));}else b.classList.toggle('flipped',open);
      });ui.play.append(grid);
    }else if(state.mode==='anagram'){
      const word=state.queue[state.round];ui.play.append(node('p',(state.round+1)+' / 5 · 글자를 눌러 단어를 만들어요.','arcadeInstruction'),node('h3',word.meaning,'arcadeClue'));
      const answer=node('div',undefined,'letterAnswer');answer.setAttribute('aria-label','조립한 단어');
      answer.textContent=state.selected.map(i=>state.tiles[i].text).join('')||'글자를 골라 주세요';answer.lang=lang();ui.play.append(answer);
      const tiles=node('div',undefined,'letterTiles');state.tiles.forEach((t,i)=>{const b=button(t.text===' '?'␣':t.text,'tile','letterTile',i);b.lang=lang();b.disabled=state.selected.includes(i)||!!state.feedback;tiles.append(b);});ui.play.append(tiles);
      if(!state.feedback){const actions=node('div',undefined,'arcadeActions');const check=button('완성 확인','check','primary');check.disabled=state.selected.length!==state.tiles.length;actions.append(button('한 글자 취소','undo'),button('처음부터','clear'),check,button('정답 보기','reveal'));ui.play.append(actions);}
    }else if(state.mode==='meteor'){
      ui.play.append(node('p',(state.round+1)+' / 10 · 기회 '+'♥'.repeat(state.lives)+'♡'.repeat(3-state.lives),'arcadeInstruction'));
      const field=node('div',undefined,'meteorField'),time=node('span',Math.ceil(state.remaining/1000)+'초','meteorTime');time.dataset.gameTime='';
      const falling=node('div',state.queue[state.round].word,'fallingWord');falling.lang=lang();falling.style.setProperty('--fall',String((1-state.remaining/state.limit)*155)+'px');field.append(time,falling,node('span','✧  ✦  ✧','meteorGround'));ui.play.append(field);
      if(state.paused){ui.play.append(node('p','잠시 쉬는 중이에요. 시간은 멈춰 있어요.','arcadeInstruction'),button('다시 시작','resume','primary'));}
      else if(!state.feedback){const choices=node('div',undefined,'meteorChoices');state.options.forEach((w,i)=>choices.append(button(w.meaning,'choice','outline',i)));ui.play.append(choices);}
    }else{
      ui.play.append(node('p','뜻에 맞는 단어의 첫 글자 → 끝 글자를 눌러요. 거꾸로 놓인 단어도 있어요.','arcadeInstruction'));
      const clues=node('div',undefined,'searchClues');state.board.words.forEach(w=>clues.append(node('span',state.found.includes(w.key)?'✓ '+w.word+' · '+w.meaning:w.meaning,state.found.includes(w.key)?'found':'')));ui.play.append(clues);
      const grid=node('div',undefined,'wordGrid');grid.setAttribute('role','group');grid.setAttribute('aria-label','7행 7열 단어 찾기');
      state.board.cells.forEach((c,i)=>{const found=state.board.words.some(w=>w.foundPath?.includes(i)),b=button(c,'cell','wordCell '+(found?'found ':'')+(state.highlight.includes(i)?'selected':''),i);b.lang=lang();b.setAttribute('aria-label',(Math.floor(i/7)+1)+'행 '+(i%7+1)+'열 '+c);b.setAttribute('aria-pressed',String(state.highlight.includes(i)));grid.append(b);});ui.play.append(grid,button('단어 하나 힌트','hint'));
    }
    feedback();
  }
  function action(event){
    const b=event.target.closest('button[data-action]');if(!b||b.disabled)return;
    const a=b.dataset.action,value=b.dataset.value;
    if(state&&!state.finished&&!state.paused&&a!=='menu'&&a!=='start'){const before=state.feedback;tick();if(state.finished||state.feedback!==before)return;}
    if(state?.paused&&a!=='resume'&&a!=='menu')return;
    if(a==='start'){start(value);return;}if(a==='menu'){stopClock();state=null;render();host.querySelector('[data-action=start]')?.focus({preventScroll:true});return;}
    if(!state||state.finished)return;
    if(a==='pause')pause();else if(a==='resume')resume();else if(a==='next')next();
    else if(a==='card')memory(Number(value));else if(a==='choice')gradeMeteor(Number(value));else if(a==='cell')selectCell(Number(value));
    else if(a==='tile'&&!state.feedback){state.selected.push(Number(value));if(state.selected.length===state.tiles.length)checkAnagram();else render();}
    else if(a==='undo'){state.selected.pop();render();}else if(a==='clear'){state.selected=[];render();}
    else if(a==='check')checkAnagram();else if(a==='reveal')checkAnagram(true);
    else if(a==='hint'){
      const word=state.board.words.find(w=>!state.found.includes(w.key));if(word){state.attempts++;note(word);state.highlight=word.path;state.selected=null;state.feedback={ok:false,text:word.word+' · '+word.meaning+' — 표시된 글자의 양 끝을 눌러 보세요.'};render();}
    }
    if(!state.finished&&document.activeElement===document.body){
      const choices=[...ui.play.querySelectorAll('button:not(:disabled)')];
      const next=choices.find(x=>x.dataset.action==='next')||choices.find(x=>x.dataset.action===a&&x.dataset.value===value)||choices.find(x=>x.dataset.action===a)||choices[0];
      next?.focus({preventScroll:true});
    }
  }
  function open(){if(state&&state.language!==lang()){stopClock();state=null;}render();if(state?.feedback&&state.mode!=='search'&&!state.finished)autoNext();}
  function close(){pause();stopClock();}
  function mount(target){
    if(host)return;host=target;host.classList.add('arcadePage');
    host.innerHTML='<section class="arcadeHero"><div><p data-arcade="language"></p><h1>조금 놀아도,<br>조금 더 기억해요.</h1><p>단어와 가까워지는 네 가지 방법. 기록은 언어별로 저장됩니다.</p></div><span class="arcadeHeroArt" aria-hidden="true">✦<i>あ</i><b>A</b><em>ş</em></span></section><div data-arcade="kana" hidden></div><section class="arcadeDifficulty"><label for="arcadeDifficulty">미니게임 난이도</label><select id="arcadeDifficulty" data-arcade="difficulty"></select><p data-arcade="rules"></p><small>기초 단어·예문 등장 빈도·표기 길이를 활용한 자체 단계입니다. 오답 단어는 선택한 단계 안에서 우선 출제합니다. 난이도 변경은 게임 선택 화면에서 가능합니다.</small></section><div class="arcadeTop"><span>정답 100점 · 오답 또는 힌트 사용 −15점<br>기본 보상 20점당 1 G × 난이도 배율 · 자주 틀린 단어는 최대 6배 자주 등장합니다.</span><button type="button" data-action="menu" data-arcade="back" class="outline" hidden>게임 선택으로</button></div><div class="arcadeCards" data-arcade="cards"></div><section data-arcade="play" class="arcadePlay" tabindex="-1" hidden></section><p role="status" data-arcade="storage" hidden>브라우저 저장 공간을 사용할 수 없어 이번 탭에서만 기록됩니다.</p><details class="arcadeSources"><summary>게임 아이디어와 학습 자료</summary><p>단어장 자료로 직접 구현한 게임입니다. 게임 방식은 <a href="https://wordwall.net/features" target="_blank" rel="noopener">Wordwall의 학습 활동</a>과 <a href="https://learnenglish.britishcouncil.org/free-resources/vocabulary/games" target="_blank" rel="noopener">British Council의 어휘 게임</a>을 참고했습니다. 외부 게임 코드나 이미지는 가져오지 않았습니다.</p></details>';
    ui=Object.fromEntries([...host.querySelectorAll('[data-arcade]')].map(e=>[e.dataset.arcade,e]));host.addEventListener('click',action);JapaneseReading.guide(ui.kana);
    E.difficulties.forEach((d,i)=>ui.difficulty.add(new Option((i+1)+' · '+d.name+' · 보상 ×'+d.multiplier,i+1)));
    ui.difficulty.addEventListener('change',()=>{if(state)return;const value=Number(ui.difficulty.value);if(E.validDifficulty(value)){languageData().difficulty=value;save();render();}});render();
    document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();else if(!host.hidden&&state?.feedback&&state.mode!=='search'&&!state.finished)autoNext();});
  }
  return {mount,open,close};
})();
