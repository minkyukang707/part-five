'use strict';
const LanguageStudy=(()=>{
  const storageKey='partfive.languages.v1';
  const courses=window.LANGUAGE_COURSES;
  const languages=Object.keys(courses);
  let host,ui,storageWarning='',voice;
  const natural=value=>Number.isSafeInteger(value)&&value>=0;
  const blank=()=>({stage:1,set:0,mode:'grammar',reviewOnly:false,sequence:0,grammar:{},words:{},session:null,game:{...Game.fromLegacy({},{}),difficulty:1}});
  let data={version:1,language:'ja',courses:{}};

  function readProgress(raw,course){
    const result=blank();
    if(!raw||typeof raw!=='object')return result;
    if(Number.isInteger(raw.stage)&&raw.stage>=1&&raw.stage<=5)result.stage=raw.stage;
    if(Game.valid(raw.game)){result.game={...raw.game};result.stage=result.game.difficulty;}
    else result.game.difficulty=result.stage;
    if(raw.set===0||raw.set===1)result.set=raw.set;
    if(raw.mode==='words')result.mode='words';
    result.reviewOnly=raw.reviewOnly===true;
    result.sequence=natural(raw.sequence)?raw.sequence:0;
    for(const [kind,deck] of [['grammar',course.questions],['words',course.words]]){
      for(const item of deck){
        const entry=raw[kind]?.[item.key];
        if(entry&&natural(entry.attempts)&&natural(entry.correct)&&entry.correct<=entry.attempts&&typeof entry.lastCorrect==='boolean'){
          result[kind][item.key]={attempts:entry.attempts,correct:entry.correct,lastCorrect:entry.lastCorrect,lastSequence:natural(entry.lastSequence)?entry.lastSequence:0};
        }
      }
    }
    const session=raw.session;
    if(session&&session.kind===result.mode){
      const item=(session.kind==='grammar'?course.questions:course.words).find(q=>q.key===session.key);
      const validOptions=session.kind==='words'||(Array.isArray(session.options)&&session.options.length===4&&new Set(session.options).size===4&&session.options.every(option=>item?.options.includes(option)));
      if(item&&validOptions&&typeof session.answered==='boolean'&&typeof session.attemptId==='string'&&
          (!session.answered||(typeof session.ok==='boolean'&&typeof session.submitted==='string'))){
        result.session={kind:session.kind,key:session.key,options:session.options||[],answered:session.answered,ok:session.ok,submitted:session.submitted||'',attemptId:session.attemptId};
        if(typeof session.combatReceipt==='string')result.session.combatReceipt=session.combatReceipt.slice(0,200);
      }
    }
    return result;
  }
  try{
    const saved=JSON.parse(localStorage.getItem(storageKey));
    if(saved?.version===1){
      if(languages.includes(saved.language))data.language=saved.language;
      for(const language of languages)data.courses[language]=readProgress(saved.courses?.[language],courses[language]);
    }
  }catch{storageWarning='저장된 언어 기록을 읽지 못해 기본 과정으로 시작했어요.';}
  const initialLanguage=window.StudyLocale?.current();
  if(languages.includes(initialLanguage))data.language=initialLanguage;
  const currentCourse=()=>courses[data.language];
  const progress=()=>data.courses[data.language]??=(blank());
  const getGame=()=>progress().game;
  function notifyChange(){
    window.dispatchEvent(new CustomEvent('partfive:language-study',{detail:{language:data.language,mode:progress().mode}}));
  }
  function drawBattle(outcome=null,notice=''){
    if(host&&!host.hidden&&progress().mode==='grammar'&&document.getElementById('languageBattleSlot')?.contains(document.getElementById('battle'))){
      Battle.draw(getGame(),outcome,notice);
    }
  }
  const node=(tag,text,className)=>{
    const element=document.createElement(tag);
    if(text!==undefined)element.textContent=text;
    if(className)element.className=className;
    return element;
  };
  function save(){
    try{localStorage.setItem(storageKey,JSON.stringify(data));storageWarning='';}
    catch{storageWarning='이 브라우저에 기록을 저장하지 못했어요. 현재 탭에서 학습을 이어갈 수 있습니다.';}
    if(ui)ui.status.textContent=storageWarning;
  }
  function pool(){
    const p=progress(),course=currentCourse();
    const deck=p.mode==='grammar'?course.questions:course.words;
    if(p.reviewOnly)return deck.filter(q=>p[p.mode][q.key]?.lastCorrect===false);
    return deck.filter(q=>p.mode==='grammar'?q.stage===p.stage:q.set===p.set);
  }
  function selectNext(){
    const p=progress(),deck=pool();
    if(!deck.length){p.session=null;save();return;}
    const previous=p.session?.key;
    const sorted=[...deck].sort((a,b)=>{
      const left=p[p.mode][a.key],right=p[p.mode][b.key];
      return (left?.lastSequence||0)-(right?.lastSequence||0);
    });
    const item=sorted.find(q=>q.key!==previous)||sorted[0];
    const options=item.options?[...item.options]:[];
    for(let i=options.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [options[i],options[j]]=[options[j],options[i]];
    }
    p.session={kind:p.mode,key:item.key,options,answered:false,submitted:'',attemptId:crypto.randomUUID()};
    save();
  }
  function current(){
    const p=progress(),course=currentCourse();
    return (p.mode==='grammar'?course.questions:course.words).find(q=>q.key===p.session?.key);
  }
  function normalize(text){
    return text.normalize('NFKC').trim().replace(/\s+/g,'').replace(/[.!?。]+$/u,'');
  }
  function matches(word,input){
    const answer=normalize(input);
    return answer!=='모름'&&word.meanings.some(meaning=>normalize(meaning)===answer||
      (/^[가-힣]{2,}하다$/u.test(meaning)&&normalize(meaning).slice(0,-2)===answer));
  }
  function submit(submitted){
    const p=progress(),session=p.session,item=current();
    if(!session||session.answered||!item)return;
    if(p.mode==='grammar'&&p.game.hp===0){render();ui.reviveHere.focus({preventScroll:true});return;}
    const value=submitted.trim();
    if(p.mode==='words'&&!/[가-힣]/u.test(value)){
      ui.inputNote.textContent='한국어 뜻을 입력하세요. 기억나지 않으면 ‘모름’을 입력할 수 있어요.';
      ui.answer.focus();
      return;
    }
    if(p.mode==='grammar'&&!session.options.includes(value))return;
    const ok=p.mode==='grammar'?value===item.answer:matches(item,value);
    const entry=p[p.mode][item.key]??={attempts:0,correct:0,lastCorrect:false,lastSequence:0};
    entry.attempts++;entry.correct+=Number(ok);entry.lastCorrect=ok;entry.lastSequence=++p.sequence;
    session.answered=true;session.submitted=value;session.ok=ok;
    const outcome=p.mode==='grammar'?Game.answer(p.game,ok):null;
    if(outcome)session.combatReceipt=Battle.message(p.game,outcome);
    save();
    try{
      window.LearningLog?.record({
        id:session.attemptId,mode:p.mode==='grammar'?'language-grammar':'language-word',
        language:data.language,key:item.key,topic:p.mode==='grammar'?item.topic:undefined,label:p.mode==='grammar'?item.label:item.word,
        correct:ok,difficulty:p.mode==='grammar'?item.stage:item.set+1
      });
    }catch{ /* Grading remains available if the shared dashboard store is unavailable. */ }
    render();
    if(p.mode==='grammar')drawBattle(outcome);
    ui.next.focus({preventScroll:true});
  }
  function updateVoice(){
    if(!ui)return;
    voice=window.speechSynthesis?.getVoices().find(v=>v.lang.toLowerCase().startsWith(data.language));
    ui.speak.disabled=!voice||!current();
    ui.voiceNote.textContent=voice?'기기에 설치된 '+voice.lang+' 음성으로 듣습니다.':'발음 듣기는 이 기기에 '+currentCourse().name+' 음성이 설치되어 있을 때 사용할 수 있어요.';
  }
  function speak(){
    const item=current(),p=progress();
    if(!item||!voice||!window.speechSynthesis)return;
    const text=p.mode==='grammar'?item.stem.replace('____',item.answer):item.word;
    const utterance=new SpeechSynthesisUtterance(text);
    utterance.voice=voice;utterance.lang=voice.lang;utterance.rate=.85;
    utterance.onerror=()=>{ui.voiceNote.textContent='발음을 재생하지 못했어요. 기기의 음성 설정을 확인해 주세요.';};
    window.speechSynthesis.cancel();window.speechSynthesis.speak(utterance);
  }
  function statistics(language=data.language){
    if(!languages.includes(language))return null;
    const p=data.courses[language]??=(blank()),course=courses[language],all=[...Object.values(p.grammar),...Object.values(p.words)];
    const total=all.reduce((sum,item)=>sum+item.attempts,0),correct=all.reduce((sum,item)=>sum+item.correct,0);
    const knownGrammar=Object.values(p.grammar).filter(row=>row.lastCorrect).length;
    const knownWords=Object.values(p.words).filter(row=>row.lastCorrect).length;
    const pendingItems=[...course.questions.filter(item=>p.grammar[item.key]?.lastCorrect===false).map(item=>({key:item.key,topic:item.topic,label:item.label,mode:'grammar'})),
      ...course.words.filter(item=>p.words[item.key]?.lastCorrect===false).map(item=>({key:item.key,label:item.word,mode:'words'}))];
    return {total,correct,knownGrammar,knownWords,pending:pendingItems.length,pendingItems,wordCount:course.words.length,grammarCount:course.questions.length,game:p.game};
  }
  function summary(){
    const p=progress(),course=currentCourse(),{total,correct,knownGrammar,knownWords}=statistics();
    ui.total.textContent=total?'누적 '+total+'회 · 정답률 '+Math.round(correct/total*100)+'%':'첫 문장부터 시작해 보세요.';
    ui.progress.textContent='최근 정답 문법 '+knownGrammar+' / '+course.questions.length+' · 단어 '+knownWords+' / '+course.words.length;
    ui.meter.max=course.questions.length+course.words.length;ui.meter.value=knownGrammar+knownWords;
    const missed=Object.values(p[p.mode]).filter(row=>!row.lastCorrect).length;
    ui.reviewText.textContent='오답만 복습 · '+missed+'개';
    ui.stageMap.replaceChildren(...course.stages.map((label,i)=>{
      const deck=course.questions.filter(q=>q.stage===i+1);
      const good=deck.filter(q=>p.grammar[q.key]?.lastCorrect).length;
      const button=node('button',undefined,'languageStage');
      button.type='button';button.setAttribute('aria-label',(i+1)+'단계 '+label+' · 최근 정답 '+good+'/'+deck.length);
      button.setAttribute('aria-pressed',String(p.mode==='grammar'&&p.stage===i+1&&!p.reviewOnly));
      button.append(node('strong',(i+1)+'단계'),node('span',label),node('small',good+' / '+deck.length));
      button.addEventListener('click',()=>{
        p.mode='grammar';p.reviewOnly=false;p.session=null;setDifficulty(i+1);notifyChange();
      });
      return button;
    }));
  }
  function render(){
    if(!ui)return;
    const p=progress(),course=currentCourse();
    host.dataset.mode=p.mode;
    if(!p.session&&pool().length)selectNext();
    const item=current(),session=p.session,isGrammar=p.mode==='grammar';
    ui.language.value=data.language;
    ui.heading.textContent=course.name+(isGrammar?' 문장 완성':' 단어 공부');
    ui.native.textContent=course.native;
    ui.scope.textContent='입문 과정 · 문법 '+course.questions.length+'문항 · 단어 '+course.words.length+'개';
    ui.stage.replaceChildren(...course.stages.map((label,i)=>new Option((i+1)+' · '+label,i+1)));
    ui.stage.value=p.stage;ui.set.value=p.set;
    ui.stageLabel.hidden=!isGrammar;ui.setLabel.hidden=isGrammar;
    ui.stage.disabled=ui.set.disabled=p.reviewOnly;
    ui.battleSlot.hidden=!isGrammar;
    ui.down.hidden=!isGrammar||p.game.hp!==0;
    ui.grammar.setAttribute('aria-pressed',String(isGrammar));ui.words.setAttribute('aria-pressed',String(!isGrammar));
    ui.review.checked=p.reviewOnly;
    ui.guide.textContent=course.guide;
    ui.sources.replaceChildren(...course.sources.map(([label,url])=>{
      const link=node('a',label);link.href=url;link.target='_blank';link.rel='noopener';return link;
    }));
    ui.empty.hidden=!!item;ui.exercise.hidden=!item;
    ui.emptyText.textContent=p.reviewOnly?'이번 복습을 마쳤어요. 다음 단계에서 새 문장을 만나 보세요.':'이 범위의 연습을 불러오지 못했어요.';
    ui.feedback.hidden=!session?.answered;
    ui.next.hidden=!session?.answered;
    ui.answerForm.hidden=isGrammar||!item||!!session?.answered;
    ui.choices.hidden=!isGrammar;
    ui.reading.hidden=true;ui.speak.hidden=!session?.answered&&isGrammar;
    ui.voiceNote.hidden=!session?.answered&&isGrammar;
    ui.inputNote.textContent='';ui.answer.value='';
    if(item){
      ui.exercise.dataset.language=data.language;
      ui.label.textContent=isGrammar?item.label:'세트 '+(item.set+1)+' · '+(course.words.indexOf(item)%30+1)+' / 30';
      ui.instruction.textContent=isGrammar?'한국어 뜻에 맞게 문장을 완성하세요.':'기억나는 한국어 뜻을 하나 입력하세요.';
      ui.meaning.hidden=!isGrammar;ui.meaning.textContent=isGrammar?item.meaning:'';
      ui.stem.lang=data.language;
      ui.stem.textContent=isGrammar?item.stem.replace('____','＿＿＿'):item.word;
      ui.choices.replaceChildren();
      if(isGrammar){
        session.options.forEach((choice,i)=>{
          const button=node('button',undefined,'languageOption');button.type='button';button.lang=data.language;
          button.append(node('span',String.fromCharCode(65+i),'languageLetter'),node('span',choice));
          button.disabled=session.answered||p.game.hp===0;
          if(session.answered&&choice===item.answer)button.classList.add('correct');
          if(session.answered&&choice===session.submitted&&!session.ok)button.classList.add('incorrect');
          button.addEventListener('click',()=>submit(choice));ui.choices.append(button);
        });
      }else if(item.reading){
        ui.reading.textContent=item.reading;ui.reading.lang=data.language;ui.reading.hidden=false;
      }
      if(session.answered){
        ui.feedback.classList.toggle('missed',!session.ok);
        ui.verdict.textContent=session.ok?'정답이에요. 한 걸음 더 익혔어요.':'다시 익힐 표현을 찾았어요.';
        ui.solution.textContent=isGrammar?item.stem.replace('____',item.answer):item.word+' · '+item.meanings.join(' / ');
        ui.solution.lang=isGrammar?data.language:'ko';
        ui.why.textContent=isGrammar?item.why:'입력한 뜻 · '+session.submitted+' — 등록된 기본 뜻을 확인하고 다음 복습에서 다시 떠올려 보세요.';
        ui.combatReceipt.textContent=isGrammar?(session.combatReceipt||''):'';
        ui.combatReceipt.hidden=!isGrammar||!session.combatReceipt;
        if(isGrammar&&item.reading){ui.reading.textContent=item.reading;ui.reading.lang=data.language;ui.reading.hidden=false;}
      }
    }
    summary();updateVoice();ui.status.textContent=storageWarning;
  }
  function mount(target){
    if(host)return api;
    host=target;
    host.classList.add('languageStudy');
    host.innerHTML='<section class="languageHeader"><div><p class="languageEyebrow">새 언어를 만나는 시간</p><h1 data-lang="heading"></h1><p data-lang="scope"></p></div><label hidden>학습 언어<select data-lang="language" aria-label="학습 언어"></select></label></section>'+
      '<section class="languageOverview"><div><strong data-lang="native"></strong><p data-lang="total"></p></div><div><p data-lang="progress"></p><progress data-lang="meter" aria-label="최근 정답 문항 수"></progress></div></section>'+
      '<div class="languageStages" data-lang="stageMap" aria-label="입문 문법 5단계"></div>'+
      '<section class="languageLesson"><div class="languageToolbar"><div class="languageTabs" role="group" aria-label="연습 종류" hidden><button type="button" data-lang="grammar">문장 완성</button><button type="button" data-lang="words">단어 기억하기</button></div>'+
      '<label class="languageReview"><input type="checkbox" data-lang="review"><span data-lang="reviewText">오답만 복습</span></label></div>'+
      '<div class="languageFilters"><label data-lang="stageLabel">문법 단계<select data-lang="stage" aria-label="문법 단계"></select></label><label data-lang="setLabel">단어 세트<select data-lang="set" aria-label="단어 세트"><option value="0">1세트 · 1–30</option><option value="1">2세트 · 31–60</option></select></label></div>'+
      '<div data-lang="down" class="languageDown" role="status" hidden><strong>체력을 모두 사용했어요.</strong><p>체력을 회복하면 같은 몬스터와 다시 도전할 수 있어요. 학습 기록은 그대로 유지됩니다.</p><button type="button" class="primary" data-lang="reviveHere">체력 회복하고 재도전</button></div>'+
      '<div data-lang="exercise"><p class="languageTopic" data-lang="label"></p><p class="languageInstruction" data-lang="instruction"></p><p class="languageMeaning" data-lang="meaning"></p><h2 class="languageStem" data-lang="stem"></h2>'+
      '<div class="languageOptions" data-lang="choices"></div><form data-lang="answerForm"><label class="languageInputLabel">한국어 뜻<input type="text" data-lang="answer" maxlength="100" autocomplete="off" placeholder="뜻이 기억나지 않으면 모름" required></label><button class="primary" type="submit">채점하기</button><p data-lang="inputNote" role="status"></p></form>'+
      '<section class="languageFeedback" data-lang="feedback" aria-live="polite" hidden><strong data-lang="verdict"></strong><p class="languageSolution" data-lang="solution"></p><p data-lang="why"></p><p data-lang="combatReceipt" class="languageCombatReceipt" hidden></p></section><p class="languageReading" data-lang="reading" hidden></p>'+
      '<div class="languageLessonActions"><button type="button" class="outline" data-lang="speak">발음 듣기</button><button type="button" class="primary" data-lang="next" hidden>다음 연습 →</button></div><p class="languageVoiceNote" data-lang="voiceNote"></p></div>'+
      '<div data-lang="empty" class="languageEmpty" hidden><h2>복습할 오답이 없어요.</h2><p data-lang="emptyText"></p><button type="button" class="primary" data-lang="continue">전체 연습으로</button></div></section>'+
      '<div id="languageBattleSlot" class="languageBattleSlot" data-lang="battleSlot"></div>'+
      '<aside class="languageNotes"><details><summary>문자와 발음 익히기</summary><p data-lang="guide"></p></details><details><summary>과정 범위와 참고 자료</summary><p>이 과정은 각 언어의 입문 문법을 5단계로 나눈 자체 제작 연습입니다. 각 단계에서 예문과 한국어 해설을 익히고, 단어는 30개씩 연습합니다.</p><div data-lang="sources"></div></details></aside>'+
      '<p class="languageStorage" data-lang="status" role="status"></p>';
    ui=Object.fromEntries([...host.querySelectorAll('[data-lang]')].map(element=>[element.dataset.lang,element]));
    ui.language.replaceChildren(...languages.map(language=>new Option(courses[language].name+' · '+courses[language].native,language)));
    ui.language.addEventListener('change',()=>setLanguage(ui.language.value));
    for(const mode of ['grammar','words']){
      ui[mode].addEventListener('click',()=>setMode(mode));
    }
    ui.stage.addEventListener('change',()=>setDifficulty(Number(ui.stage.value)));
    ui.set.addEventListener('change',()=>{const p=progress();p.set=Number(ui.set.value);p.session=null;selectNext();render();});
    ui.review.addEventListener('change',()=>{const p=progress();p.reviewOnly=ui.review.checked;p.session=null;selectNext();render();});
    ui.answerForm.addEventListener('submit',event=>{event.preventDefault();submit(ui.answer.value);});
    ui.answer.addEventListener('keydown',event=>{if(event.key==='Enter'&&(event.isComposing||event.keyCode===229))event.preventDefault();});
    ui.next.addEventListener('click',()=>{window.speechSynthesis?.cancel();selectNext();render();if(progress().mode==='words'&&!ui.answerForm.hidden)ui.answer.focus({preventScroll:true});});
    ui.continue.addEventListener('click',()=>{progress().reviewOnly=false;selectNext();render();});
    ui.speak.addEventListener('click',speak);
    ui.reviveHere.addEventListener('click',()=>{
      if(Game.revive(getGame())){saveBattle();drawBattle(null,'체력을 회복했어요. 같은 몬스터에 다시 도전합니다.');}
    });
    window.speechSynthesis?.addEventListener('voiceschanged',updateVoice);
    render();save();
    return api;
  }
  function saveBattle(){
    const p=progress();
    if(p.stage!==p.game.difficulty){
      p.stage=p.game.difficulty;
      if(p.mode==='grammar'){p.reviewOnly=false;p.session=null;}
    }
    save();render();
    return p.game;
  }
  function setDifficulty(value){
    const difficulty=Number(value);
    if(!Number.isInteger(difficulty)||difficulty<1||difficulty>5)return false;
    progress().game.difficulty=difficulty;
    saveBattle();drawBattle();
    return true;
  }
  function setMode(mode){
    if(mode!=='grammar'&&mode!=='words')return false;
    const p=progress(),changed=p.mode!==mode;
    if(changed){window.speechSynthesis?.cancel();p.mode=mode;p.session=null;}
    save();render();
    if(changed)notifyChange();
    return true;
  }
  function setLanguage(language,mode='grammar'){
    if(!languages.includes(language)||(mode!=='grammar'&&mode!=='words'))return false;
    const changed=data.language!==language||progress().mode!==mode;
    window.speechSynthesis?.cancel();data.language=language;
    const p=progress();
    if(p.mode!==mode){p.mode=mode;p.session=null;}
    save();render();
    if(changed)notifyChange();
    return true;
  }
  function review(language,key){
    if(!languages.includes(language))return false;
    const course=courses[language];
    const grammar=course.questions.find(q=>q.key===key),word=course.words.find(q=>q.key===key);
    if(!grammar&&!word)return false;
    data.language=language;
    const p=progress(),item=grammar||word;
    p.mode=grammar?'grammar':'words';p.reviewOnly=false;
    if(grammar){p.stage=item.stage;p.game.difficulty=item.stage;}else p.set=item.set;
    const options=grammar?[...item.options]:[];
    for(let i=options.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[options[j],options[i]]=[options[i],options[j]];}
    p.session={kind:p.mode,key:item.key,options,answered:false,submitted:'',attemptId:crypto.randomUUID()};
    save();render();notifyChange();
    return true;
  }
  function reset(){
    const language=window.StudyLocale?.current();
    data={version:1,language:languages.includes(language)?language:data.language,courses:{}};
    try{localStorage.removeItem(storageKey);}catch{}
    if(ui)render();
  }
  const api={mount,open:render,review,reset,getGame,saveBattle,setLanguage,setMode,setDifficulty,statistics,close:()=>window.speechSynthesis?.cancel()};
  return api;
})();
window.LanguageStudy=LanguageStudy;
