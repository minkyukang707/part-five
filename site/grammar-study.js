'use strict';
const GrammarStudy=(()=>{
  const key='partfive.grammar-study.v1',levels=['A1','A2','B1','B2','C1','C2'],labels=['첫 문장','일상 연결','경험과 생각','복잡한 문장','정교한 표현','문체와 논리'];
  let host,ui,language=null,answer=null,store={version:1,courses:{}},storageOK=true;
  try{const saved=JSON.parse(localStorage.getItem(key));if(saved?.version===1&&saved.courses&&typeof saved.courses==='object'&&!Array.isArray(saved.courses))store=saved;}catch{}
  const node=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;};
  function button(text,handler){const b=node('button',text,'outline');b.type='button';b.onclick=handler;return b;}
  function course(){return GRAMMAR_COURSES[language];}
  function progress(){
    const raw=store.courses[language];
    if(!raw||!levels.includes(raw.level)||!Number.isInteger(raw.index)||raw.index<0||raw.index>=4||!raw.lessons||typeof raw.lessons!=='object'||Array.isArray(raw.lessons))store.courses[language]={level:'A1',index:0,lessons:{}};
    return store.courses[language];
  }
  const current=()=>course().levels[progress().level][progress().index];
  const id=()=>progress().level+'-'+progress().index;
  function entry(key){const x=progress().lessons[key];return x&&Number.isSafeInteger(x.attempts)&&x.attempts>=0&&Number.isSafeInteger(x.correct)&&x.correct>=0&&x.correct<=x.attempts?x:{attempts:0,correct:0,passed:false};}
  const count=level=>course().levels[level].filter((_,i)=>entry(level+'-'+i).passed===true).length;
  function save(){try{localStorage.setItem(key,JSON.stringify(store));storageOK=true;}catch{storageOK=false;}if(ui)ui.status.textContent=storageOK?'진도는 이 브라우저에 언어별로 저장됩니다.':'저장 공간을 사용할 수 없어 이번 탭에서만 진도가 유지됩니다.';}
  function select(level,index){const p=progress();p.level=level;p.index=index;answer=null;if(level!=='A1')ui.kana.querySelector('details')?.removeAttribute('open');save();render();ui.lesson.focus({preventScroll:true});}
  function grade(index){
    if(answer!==null)return;const lesson=current();if(!lesson.options[index])return;
    answer=index;const e=entry(id()),ok=index===lesson.answer;e.attempts++;e.correct+=Number(ok);e.passed=!!e.passed||ok;e.lastCorrect=ok;progress().lessons[id()]=e;save();
    LearningLog.record({mode:'grammar-study',language,key:id(),label:lesson.title,correct:ok});render();
    ui.lesson.querySelector('.foundationFeedback')?.focus({preventScroll:true});
  }
  function render(){
    if(!ui||!course())return;const p=progress(),lesson=current(),total=levels.reduce((n,l)=>n+count(l),0);
    ui.title.textContent=StudyLocale.names[language]+' 문법 산책';
    ui.progress.textContent='확인 문제 통과 '+total+' / 24강 · '+p.level+' '+(p.index+1)+'번째 수업';ui.meter.value=total;
    ui.levels.replaceChildren(...levels.map((level,i)=>{const b=button('',()=>select(level,0));b.dataset.level=level;b.setAttribute('aria-pressed',String(level===p.level));b.append(node('b',level),node('span',labels[i]),node('small',count(level)+' / 4 완료'));return b;}));
    ui.lessons.replaceChildren(...course().levels[p.level].map((l,i)=>{const done=entry(p.level+'-'+i);const b=button((done.passed?'✓ ':'')+(i+1)+'. '+l.title+(done.lastCorrect===false?' · 다시 보기':''),()=>select(p.level,i));b.dataset.lesson=i;b.setAttribute('aria-pressed',String(i===p.index));return b;}));
    ui.lesson.replaceChildren(node('p',p.level+' · '+labels[levels.indexOf(p.level)],'languageEyebrow'),node('h2',lesson.title),node('p',lesson.pattern,'foundationPattern'),node('p',lesson.explanation));
    const example=node('div',undefined,'foundationExample'),native=node('strong',lesson.example);native.lang=language;example.append(native);
    if(lesson.reading)example.append(node('p',lesson.reading+' · '+JapaneseReading.korean(lesson.reading),'japaneseReading'));
    example.append(node('p',lesson.translation));ui.lesson.append(example,node('p','기억할 점 · '+lesson.pitfall,'foundationNote'));
    const quiz=node('section',undefined,'foundationQuiz');quiz.append(node('h3','작은 확인 문제'),node('p',lesson.question));
    lesson.options.forEach((option,i)=>{const b=button(option,()=>grade(i));b.dataset.grammarAnswer=i;b.disabled=answer!==null;if(answer!==null){b.classList.toggle('correct',i===lesson.answer);b.classList.toggle('incorrect',i===answer&&answer!==lesson.answer);}quiz.append(b);});
    ui.lesson.append(quiz);
    if(answer!==null){const feedback=node('div',undefined,'foundationFeedback');feedback.setAttribute('role','status');feedback.tabIndex=-1;feedback.append(node('strong',answer===lesson.answer?'기억했어요! 이 수업을 완료했어요.':'괜찮아요. 설명을 다시 읽고 확인해 보세요.'),node('p',lesson.why));ui.lesson.append(feedback);const actions=node('div',undefined,'arcadeActions');actions.append(button('다시 확인하기',()=>{answer=null;render();}));
      if(answer===lesson.answer){const next=button('다음 수업 →',()=>{const n=levels.indexOf(p.level);if(p.index<3)select(p.level,p.index+1);else if(n<5)select(levels[n+1],0);else{answer=null;render();}});next.className='primary';actions.append(next);}ui.lesson.append(actions);
    }
    ui.sources.replaceChildren(...course().sources.map(([label,url])=>{const a=node('a',label+' ↗');a.href=url;a.target='_blank';a.rel='noopener';return a;}));
    ui.kana.hidden=language!=='ja';save();
  }
  function open(){const next=StudyLocale.current();if(!GRAMMAR_COURSES[next])return;if(language!==next){language=next;answer=null;JapaneseReading.guide(ui.kana,progress().level==='A1'&&count('A1')===0);}render();}
  function review(code,key){if(!GRAMMAR_COURSES[code])return;language=code;const [level,index]=key.split('-');if(levels.includes(level)&&Number.isInteger(Number(index))&&Number(index)>=0&&Number(index)<4)select(level,Number(index));}
  function mount(target){host=target;host.classList.add('foundationsPage');host.innerHTML='<section class="foundationHero"><img src="arena/knight.png" alt="픽셀 기사"><div><p>문장을 만드는 힘 · 공부 모드</p><h1 data-foundation="title"></h1><p>규칙을 읽고, 예문을 이해하고, 한 문제로 기억해요.</p></div></section><div class="foundationSummary"><strong data-foundation="progress"></strong><progress data-foundation="meter" max="24" value="0" aria-label="문법 수업 완료 수"></progress></div><div data-foundation="kana" hidden></div><nav class="foundationLevels" data-foundation="levels" aria-label="문법 학습 수준"></nav><div class="foundationLayout"><nav class="foundationLessons" data-foundation="lessons" aria-label="문법 수업 목록"></nav><article class="foundationLesson" data-foundation="lesson" tabindex="-1"></article></div><p class="foundationNote">A1–C2는 학습 순서를 안내하는 자체 편성입니다. 기초에서 고급까지 수준별 핵심 문법 4강씩을 담았으며, 공식 시험 전체 범위나 능력 인증을 뜻하지 않습니다. 일본어의 JLPT 등급과 일대일 대응하지 않습니다.</p><p data-foundation="status" role="status"></p><details class="foundationSources"><summary>교육과정 참고 자료</summary><p>공개 교육과정의 범위와 단계 설명을 참고하고 한국어 해설·예문·확인 문제는 이 앱을 위해 작성했습니다. 공식 교재의 본문을 복제한 과정은 아닙니다.</p><div data-foundation="sources"></div></details>';ui=Object.fromEntries([...host.querySelectorAll('[data-foundation]')].map(e=>[e.dataset.foundation,e]));}
  return {mount,open,review};
})();
