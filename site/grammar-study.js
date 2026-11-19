'use strict';
const GrammarStudy=(()=>{
  const key='partfive.grammar-study.v1',E=GrammarPractice,levels=E.levels,labels=['첫 문장','일상 연결','경험과 생각','복잡한 문장','정교한 표현','문체와 논리'];
  let raw;try{raw=JSON.parse(localStorage.getItem(key));}catch{}
  const store=E.normalize(raw,GRAMMAR_COURSES);let ui,language=null,storageOK=true;
  const node=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;};
  const button=(text,handler,cls='outline')=>{const b=node('button',text,cls);b.type='button';b.onclick=handler;return b;};
  const course=()=>GRAMMAR_COURSES[language],progress=()=>store.courses[language],id=()=>E.lessonId(progress().level,progress().index),current=()=>E.lesson(course(),id());
  function save(){try{localStorage.setItem(key,JSON.stringify(store));storageOK=true;}catch{storageOK=false;}if(ui)ui.status.textContent=storageOK?'학습·연습·오답 기록은 이 브라우저에 언어별로 저장됩니다.':'저장 공간이 부족해 이번 탭에서만 기록이 유지됩니다.';}
  function session(){const p=progress();if(!p.session||p.session.lesson!==id())E.next(p,course(),id());return p.session;}
  function select(level,index,view='study',fresh=false){const p=progress();if(!course().levels[level]?.[index])return;p.level=level;p.index=index;p.view=view;if(level!=='A1')ui.kana.querySelector('details')?.removeAttribute('open');if(view==='practice'&&fresh)E.next(p,course(),id());save();render();ui.lesson.focus({preventScroll:true});}
  function another(){E.next(progress(),course(),id());save();render();ui.lesson.querySelector('.foundationQuiz h3')?.focus({preventScroll:true});}
  function nextLesson(){const p=progress(),index=p.index+1;if(index<course().levels[p.level].length)select(p.level,index);else{const n=levels.indexOf(p.level);if(n<5)select(levels[n+1],0);else select('A1',0);}}
  function reviewNext(){const pending=E.summary(progress(),course()).pending;if(!pending.length)return;const next=pending.find(x=>x.id!==id())||pending[0];const [level,index]=next.id.split('-');select(level,Number(index),'practice',true);}
  function grade(choice){const result=E.grade(progress(),course(),choice);if(!result)return;save();LearningLog.record({id:result.id,mode:'grammar-study',language,key:result.lesson,label:current().title,correct:result.ok});render();ui.lesson.querySelector('.foundationFeedback')?.focus({preventScroll:true});}
  function references(lesson){const details=node('details',undefined,'lessonReferences');details.append(node('summary','이 수업의 참고 자료 · 더 공부하기'));for(const ref of lesson.references){const a=node('a',ref.label+' ↗');a.href=ref.url;a.target='_blank';a.rel='noopener';details.append(a);}details.append(node('p','문법 항목과 교육과정 참고 링크입니다. 한국어 해설과 연습 문장은 이 앱을 위해 작성했습니다.','foundationNote'));return details;}
  function renderStudy(lesson){
    ui.lesson.append(node('h3','언제, 어떤 뜻으로 쓰나요?'),node('p',lesson.explanation));
    const steps=node('ol',undefined,'grammarSteps');for(const step of lesson.steps)steps.append(node('li',step));ui.lesson.append(node('h3','문장 만드는 순서'),steps);
    const pitfall=node('section',undefined,'grammarPitfall');pitfall.append(node('h3','헷갈리는 표현과 주의점'),node('p',lesson.pitfall));ui.lesson.append(pitfall,node('h3','상황을 바꾸어 읽어 보세요'));
    const examples=node('div',undefined,'grammarExamples');lesson.examples.forEach((ex,i)=>{const box=node('div',undefined,'foundationExample'),sentence=node('strong',ex.sentence);sentence.lang=language;box.append(node('small','예문 '+(i+1)),sentence,node('p',ex.translation));if(ex.reading)box.append(node('p',ex.reading+' · '+JapaneseReading.korean(ex.reading),'japaneseReading'));if(ex.analysis)box.append(node('p','구조 풀이 · '+ex.analysis,'foundationNote'));examples.append(box);});ui.lesson.append(examples,references(lesson));
    const go=button('다양한 문장으로 연습하기 →',()=>select(progress().level,progress().index,'practice'),'primary');go.dataset.startPractice='';ui.lesson.append(go);
  }
  function renderPractice(lesson){
    const p=progress(),s=session(),q=lesson.practice.find(q=>q.id===s.question),e=E.getEntry(p,lesson,id()),answered=s.selected!==null;
    ui.lesson.append(node('p','연습 문장 '+(lesson.practice.indexOf(q)+1)+' / '+lesson.practice.length+' · 서로 다른 문장 정답 '+e.mastered.length+'개'+(e.pending?' · 복습 중 '+e.recovery.length+' / 2':'') ,'foundationNote'));
    const quiz=node('section',undefined,'foundationQuiz'),heading=node('h3','문장을 완성해 보세요');heading.tabIndex=-1;quiz.append(heading);
    if(q.translation)quiz.append(node('p',q.translation,'practiceTranslation'));
    const stem=node('p',q.question,'practiceStem');stem.lang=language;quiz.append(stem);
    s.order.forEach(choice=>{const b=button(q.options[choice],()=>grade(choice));b.dataset.grammarAnswer=choice;b.disabled=answered;if(answered){b.classList.toggle('correct',choice===q.answer);b.classList.toggle('incorrect',choice===s.selected&&s.selected!==q.answer);}quiz.append(b);});ui.lesson.append(quiz);
    if(answered){const ok=s.selected===q.answer,feedback=node('section',undefined,'foundationFeedback'+(ok?' ok':' miss'));feedback.tabIndex=-1;feedback.setAttribute('role','status');feedback.append(node('strong',ok?'정답이에요. 이 규칙을 다른 문장에도 적용해 보세요.':'같은 문법을 다른 문장으로 다시 연습해 보세요.'),node('p',q.question.includes('___')?q.question.replace('___',q.options[q.answer]):'정답 · '+q.options[q.answer],'practiceSolution'),node('p',q.why));if(q.reading)feedback.append(node('p',q.reading+' · '+JapaneseReading.korean(q.reading),'japaneseReading'));if(e.pending)feedback.append(node('p','서로 다른 문장 2개를 맞히면 복습 목록에서 빠집니다. 현재 '+e.recovery.length+' / 2개','foundationNote'));ui.lesson.append(feedback);
      const actions=node('div',undefined,'arcadeActions'),next=button(ok?'다른 예문 더 풀기':'다른 문장으로 다시 풀기',another,'primary');next.dataset.practiceNext='';actions.append(next,button('설명 다시 읽기',()=>select(p.level,p.index,'study')));if(e.passed&&!e.pending)actions.append(button('다음 수업 →',nextLesson));ui.lesson.append(actions);
    }else{const details=node('details',undefined,'grammarHint');details.append(node('summary','규칙 힌트 보기'),node('p',lesson.pattern),node('p',lesson.steps[0]));ui.lesson.append(details);}
    ui.lesson.append(references(lesson));save();
  }
  function render(){
    if(!ui||!course())return;const p=progress(),lesson=current(),summary=E.summary(p,course());
    ui.title.textContent=StudyLocale.names[language]+' 문법 산책';ui.progress.textContent='완료 '+summary.completed+' / '+summary.total+'강 · '+summary.questions+'개 연습 문제 · 복습할 문법 '+summary.pending.length+'개';ui.meter.max=summary.total;ui.meter.value=summary.completed;
    ui.reviewOnly.checked=p.reviewOnly;ui.reviewNext.disabled=!summary.pending.length;
    ui.levels.replaceChildren(...levels.map((level,i)=>{const list=course().levels[level],done=list.filter((_,n)=>p.lessons[E.lessonId(level,n)]?.passed).length,due=list.filter((_,n)=>p.lessons[E.lessonId(level,n)]?.pending).length;const b=button('',()=>select(level,0));b.dataset.level=level;b.setAttribute('aria-pressed',String(level===p.level));b.append(node('b',level),node('span',labels[i]),node('small',done+' / '+list.length+' 완료'+(due?' · 복습 '+due:'')));return b;}));
    const list=course().levels[p.level].flatMap((unit,i)=>{const e=p.lessons[E.lessonId(p.level,i)];if(p.reviewOnly&&!e?.pending)return [];const b=button((e?.passed?'✓ ':'')+(i+1)+'. '+unit.title+(e?.pending?' · 복습':''),()=>select(p.level,i,p.reviewOnly?'practice':'study',p.reviewOnly));b.dataset.lesson=i;b.setAttribute('aria-pressed',String(i===p.index));return [b];});
    ui.lessons.replaceChildren(...list);if(!list.length)ui.lessons.append(node('p','이 단계에는 복습할 오답이 없어요. 전체 수업을 보거나 다른 단계를 선택하세요.','foundationNote'));
    ui.lesson.replaceChildren(node('p',p.level+' · '+labels[levels.indexOf(p.level)],'languageEyebrow'),node('h2',lesson.title),node('p',lesson.pattern,'foundationPattern'));
    const tabs=node('div',undefined,'grammarViewTabs');for(const [view,label] of [['study','설명·예문'],['practice','문장 연습']]){const b=button(label,()=>select(p.level,p.index,view));b.dataset.grammarView=view;b.setAttribute('aria-pressed',String(p.view===view));tabs.append(b);}ui.lesson.append(tabs);
    if(p.view==='practice')renderPractice(lesson);else renderStudy(lesson);ui.kana.hidden=language!=='ja';save();
  }
  function open(){const next=StudyLocale.current();if(!GRAMMAR_COURSES[next])return;if(language!==next){language=next;JapaneseReading.guide(ui.kana,progress().level==='A1'&&!E.summary(progress(),course()).completed);}render();}
  function review(code,key){if(!GRAMMAR_COURSES[code]||!E.lesson(GRAMMAR_COURSES[code],key))return;language=code;const [level,index]=key.split('-');select(level,Number(index),'practice',true);}
  function mount(host){host.classList.add('foundationsPage');host.innerHTML='<section class="foundationHero"><img src="arena/knight.png" alt="픽셀 기사"><div><p>문장을 만드는 힘 · 공부 모드</p><h1 data-foundation="title"></h1><p>자세히 이해하고, 다양한 문장으로 익히는 문법 여행.</p></div></section><div class="foundationSummary"><strong data-foundation="progress"></strong><progress data-foundation="meter" value="0" aria-label="문법 수업 완료 수"></progress></div><div data-foundation="kana" hidden></div><nav class="foundationLevels" data-foundation="levels" aria-label="문법 학습 수준"></nav><div class="grammarReviewBar"><label><input type="checkbox" data-foundation="reviewOnly"> 오답 문법만 보기</label><button type="button" class="outline" data-foundation="reviewNext">다음 오답 문법 복습 →</button><p>새 수업은 서로 다른 문장 2개를 맞히면 완료됩니다. 틀린 문법도 새로운 문장으로 복습합니다. 기존 완료 기록은 유지됩니다.</p></div><div class="foundationLayout"><nav class="foundationLessons" data-foundation="lessons" aria-label="문법 수업 목록"></nav><article class="foundationLesson" data-foundation="lesson" tabindex="-1"></article></div><p class="foundationNote">A1–C2는 학습 순서를 안내하는 자체 편성으로, 단계별 12강입니다. 공식 시험 전체 범위나 능력 인증을 뜻하지 않으며 일본어 JLPT와 일대일 대응하지 않습니다.</p><p data-foundation="status" role="status"></p>';ui=Object.fromEntries([...host.querySelectorAll('[data-foundation]')].map(e=>[e.dataset.foundation,e]));ui.reviewOnly.onchange=()=>{progress().reviewOnly=ui.reviewOnly.checked;save();render();};ui.reviewNext.onclick=reviewNext;}
  return {mount,open,review};
})();
