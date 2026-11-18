'use strict';
const LearningDashboard=(()=>{
  const $=id=>document.getElementById(id);
  const names={en:'영어',ja:'일본어',es:'스페인어',tr:'터키어'};
  let mounted=false;
  function element(tag,text,cls){
    const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(cls)node.className=cls;return node;
  }
  function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))||fallback;}catch{return fallback;}}
  function navigate(item){
    if(item.mode==='grammar')StudyApp.reviewGrammar(item.key);
    else if(item.mode==='word')StudyApp.reviewWord(Number(item.key));
    else if(item.mode.startsWith('language-')){StudyApp.open('languages');LanguageStudy.review(item.language,item.key);}
    else if(item.mode==='listening'){StudyApp.open('listening');ListeningStudy.review(item.key);}
    else {StudyApp.open('materials');PersonalStudy.review?.(item.key);}
  }
  function ranked(items){
    return items.filter(i=>i.misses&&i.streak<2).sort((a,b)=>(b.misses/Math.max(b.attempts,1)*5+Math.log2(b.misses+1)-b.streak)-(a.misses/Math.max(a.attempts,1)*5+Math.log2(a.misses+1)-a.streak));
  }
  const frequent=items=>items.filter(i=>i.misses).sort((a,b)=>b.misses-a.misses||b.misses/b.attempts-a.misses/a.attempts);
  const reviewable=item=>item.mode!=='language-word'||window.LANGUAGE_COURSES?.[item.language]?.words.some(w=>w.key===item.key);
  function weakList(host,items,empty){
    host.replaceChildren();
    if(!items.length){host.append(element('p',empty,'muted'));return;}
    for(const item of items.slice(0,5)){
      const button=element('button',undefined,'weakItem');
      const title=element('span');
      title.append(element('strong',item.label),element('small',names[item.language]+' · '+item.misses+'회 오답 / '+item.attempts+'회 시도'+(item.streak>=2?' · 최근 2회 이상 정답':'')));
      const progress=document.createElement('progress');progress.max=Math.max(1,item.attempts);progress.value=item.misses;
      progress.setAttribute('aria-label',item.label+' 오답 비율');
      button.append(title,element('span','복습 ›'),progress);button.onclick=()=>navigate(item);host.append(button);
    }
  }
  function draw(){
    if(!mounted)return;
    const language=window.StudyLocale?.current()||'en',english=language==='en';
    const {data,storageOK}=LearningLog.summary(),items=Object.values(data.items).filter(item=>item.language===language);
    const g=read('partfive.progress.v1',{total:0,correct:0,pending:{},recovered:0});
    const words=read('partfive.vocabulary.v1',{marks:{}});
    const course=english?null:LanguageStudy.statistics(language);
    const game=english?g.game:course.game;
    const total=(english?data.baseline.total:0)+items.reduce((s,i)=>s+i.attempts,0);
    const correct=(english?data.baseline.correct:0)+items.reduce((s,i)=>s+i.correct,0);
    const repairs=items.reduce((s,i)=>s+i.recoveries,0);
    const days=data.languageDays?.[language]||{};
    const today=days[LearningLog.dayKey()]||{attempts:0,correct:0};
    $('dashAttempts').textContent=total.toLocaleString();
    $('dashAccuracy').textContent=total?Math.round(correct/total*100)+'%':'—';
    $('dashRepairs').textContent=repairs.toLocaleString();
    $('dashToday').textContent=today.attempts.toLocaleString();
    $('dashStorage').hidden=storageOK;
    const outstanding=ranked(items.filter(reviewable)),known=english?Object.values(words.marks||{}).filter(v=>v==='known').length:course.knownWords;
    $('growthHeadline').textContent=repairs?'틀렸던 내용을 '+repairs+'번 다시 맞혔어요.':today.attempts?'오늘 '+today.attempts+'번, 기억을 꺼내 보았어요.':'오늘의 첫 문제부터 시작해 볼까요?';
    $('growthLanguage').textContent=names[language]+' 성장 기록';
    $('growthSubtitle').textContent=names[language]+' 단어 '+known.toLocaleString()+' / '+(english?'3,000':course.wordCount)+'개 학습 · '+(english?'문법 복습 '+(g.recovered||0)+'유형 완료':'문법 '+course.knownGrammar+' / '+course.grammarCount+'문항 최근 정답');
    $('dashAttemptLabel').textContent=english?'채점한 문제·단어·받아쓰기':'채점한 문법·단어';
    weakList($('grammarWeak'),frequent(items.filter(i=>i.mode==='grammar'||i.mode==='language-grammar')),'문법 문제를 풀면 유형별 오답이 표시됩니다.');
    weakList($('wordWeak'),frequent(items.filter(i=>(i.mode==='word'||i.mode==='language-word'||i.mode==='materials')&&reviewable(i))),'단어를 입력하고 채점하면 헷갈리는 단어가 모입니다.');
    const queue=$('reviewPlan');queue.replaceChildren();
    const priorities=outstanding.slice(0,3);
    if(priorities.length){
      for(const [index,item] of priorities.entries()){
        const button=element('button',undefined,'planItem');
        button.append(element('span',String(index+1),'planOrder'),element('strong',item.label),element('small',names[item.language]+' · '+(item.streak?'한 번 더 확인':'다시 떠올리기')+' →'));
        button.onclick=()=>navigate(item);queue.append(button);
      }
    }else{
      const legacyTopics=english?Object.keys(g.pending||{}):[];
      const legacyWord=english?Object.keys(words.marks||{}).find(k=>words.marks[k]==='again'):undefined;
      const button=element('button',legacyTopics.length?'기존 오답 유형부터 복습하기 →':legacyWord!==undefined?'단어장에 남은 오답 복습 →':'새 문제 5개 풀어 보기 →','primary');
      button.onclick=()=>legacyTopics.length?StudyApp.reviewGrammar(legacyTopics[0]):legacyWord!==undefined?StudyApp.reviewWord(Number(legacyWord)):StudyApp.open('grammar');
      queue.append(button);
    }
    const difficulty=game?.difficulty||(english?3:1);
    const recent=data.recent.filter(e=>e.mode===(english?'grammar':'language-grammar')&&e.language===language&&e.difficulty===difficulty).slice(-20);
    const accuracy=recent.length?recent.filter(e=>e.correct).length/recent.length:0;
    let proposal=difficulty,copy;
    if(recent.length<20)copy=names[language]+' '+difficulty+'단계에서 '+(20-recent.length)+'문제를 더 풀면 최근 20문항을 바탕으로 다음 단계를 안내합니다.';
    else if(accuracy>=.85&&difficulty<5){proposal++;copy='현재 난이도 최근 20문항 정답률 '+Math.round(accuracy*100)+'%. 한 단계 높은 문법에 도전해 보세요.';}
    else if(accuracy<.5&&difficulty>1){proposal--;copy='현재 난이도 최근 20문항 정답률 '+Math.round(accuracy*100)+'%. 오답을 먼저 복습하고 한 단계 쉬운 문장으로 연습해 보세요.';}
    else copy='현재 난이도 최근 20문항 정답률 '+Math.round(accuracy*100)+'%. 같은 단계에서 오답 표현을 다른 문장으로 반복해 보세요.';
    $('nextAdvice').textContent=copy;
    const next=$('applyRecommendation');next.hidden=proposal===difficulty;
    next.textContent='난이도 '+proposal+'로 연습하기';next.onclick=()=>StudyApp.setDifficulty(proposal);
    drawChart(days);
    const kills=game?.kills||0;$('worldProgress').textContent=names[language]+' · '+kills+' / 100 처치';
    $('growthBlocks').replaceChildren(...Array.from({length:100},(_,i)=>{
      const block=element('span',String(i+1));
      block.className=i<kills?'complete':i===kills?'active':'';
      block.title=(i+1)+'레벨 '+(i<kills?'완료':i===kills?'진행 중':'앞으로 도전');
      return block;
    }));
    const start=new Date(data.languageStarted||data.started).toLocaleDateString('ko-KR');
    $('historyNote').textContent='언어별 날짜 기록은 '+start+'부터 집계합니다. 누적 학습과 오답 목록에는 이전 기록도 함께 반영합니다.';
  }
  function drawChart(days){
    const range=Number($('chartRange').value)||14;
    const dates=Array.from({length:range},(_,i)=>{const d=new Date();d.setDate(d.getDate()-range+1+i);return LearningLog.dayKey(d);});
    const max=Math.max(1,...dates.map(d=>days[d]?.attempts||0));
    $('activityChart').replaceChildren(...dates.map(d=>{
      const count=days[d]?.attempts||0,bar=element('div',undefined,'dayColumn');
      const fill=element('i');fill.style.height=Math.max(count?3:0,count/max*100)+'%';
      bar.append(fill,element('small',d.slice(8)));bar.title=d+' · '+count+'회 학습';
      bar.setAttribute('role','img');bar.setAttribute('aria-label',bar.title);
      return bar;
    }));
    const sum=dates.reduce((s,d)=>s+(days[d]?.attempts||0),0);
    $('chartSummary').textContent='최근 '+range+'일 · '+sum+'회 학습 · '+dates.filter(d=>days[d]?.attempts).length+'일 참여';
  }
  function mount(host){
    if(mounted)return;
    host.innerHTML=`<section class="growthHero"><div><p class="eyebrow" id="growthLanguage">나의 성장 기록</p><h1 id="growthHeadline"></h1><p id="growthSubtitle"></p></div><button id="continueStudy" class="primary">이어서 공부하기 →</button></section>
      <section class="metricGrid" aria-label="누적 학습 지표"><article><span>지금까지 학습</span><strong id="dashAttempts">0</strong><small id="dashAttemptLabel">채점한 문제·단어·받아쓰기</small></article><article><span>누적 정답률</span><strong id="dashAccuracy">—</strong><small>기록된 전체 학습 기준</small></article><article><span>오답에서 회복</span><strong id="dashRepairs">0</strong><small>틀린 뒤 다시 맞힌 횟수</small></article><article><span>오늘의 연습</span><strong id="dashToday">0</strong><small>한 번의 시도도 성장 기록</small></article></section>
      <section class="dashboardGrid"><article class="dashCard"><div class="dashHeading"><h2>학습 리듬</h2><select id="chartRange" aria-label="학습 기간"><option value="14">최근 14일</option><option value="30">최근 30일</option></select></div><div id="activityChart"></div><p id="chartSummary" class="muted"></p></article><article class="dashCard"><h2>먼저 복습할 내용</h2><div id="reviewPlan"></div></article><article class="dashCard"><h2>헷갈리는 문법</h2><div id="grammarWeak"></div></article><article class="dashCard"><h2>다시 만날 단어</h2><div id="wordWeak"></div></article><article class="dashCard"><h2>다음 공부 단계</h2><p id="nextAdvice"></p><button id="applyRecommendation" class="primary" hidden></button></article><article class="dashCard"><div class="dashHeading"><h2>나의 원정</h2><span id="worldProgress"></span></div><div id="growthBlocks"></div></article></section>
      <p id="historyNote" class="muted"></p><p id="dashStorage" role="status" hidden>브라우저 저장 공간을 사용할 수 없어 이번 탭에서만 기록됩니다.</p>`;
    mounted=true;$('chartRange').onchange=draw;$('continueStudy').onclick=()=>StudyApp.open('grammar');draw();
  }
  window.addEventListener('partfive:learning',()=>{if(mounted&&!$('dashboardPage').hidden)draw();});
  return {mount,open:draw};
})();
