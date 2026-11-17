'use strict';
const WritingStudy=(()=>{
  const $=id=>document.getElementById(id);
  const prefix='partfive.writing.v1.';
  const tabNames={grammar:'showGrammar',lex:'showLex',task:'showTask'};
  let task,entry,report=null,tab='grammar',busy=false,storageOK=true;
  const entries=new Map();
  function get(key){try{return localStorage.getItem(prefix+key);}catch{return null;}}
  function store(key,value){
    try{localStorage.setItem(prefix+key,value);storageOK=true;}
    catch{storageOK=false;}
  }
  function getEntry(id){
    if(!entries.has(id)){
      let saved;
      try{saved=JSON.parse(get('draft.'+id));}catch{}
      const good=saved && typeof saved.text==='string';
      entries.set(id,good?saved:{text:'',last:null,previous:null});
    }
    return entries.get(id);
  }
  function save(){store('draft.'+task.id,JSON.stringify(entry));}
  function node(tag,text,cls){
    const n=document.createElement(tag);
    if(text!==undefined)n.textContent=text;
    if(cls)n.className=cls;
    return n;
  }
  function status(msg){$('writeStatus').textContent=storageOK?msg:'저장 공간을 사용할 수 없어 이번 창에서만 보관됩니다.';}
  function counter(){const s=$('draft').value;$('draftCount').textContent=((s.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g)||[]).length)+' words';}
  function selectTask(id){
    task=WRITING_TASKS.find(t=>t.id===id)||WRITING_TASKS[0];
    entry=getEntry(task.id);report=null;tab='grammar';
    store('selected',task.id);
    $('writeMode').value=task.mode;
    $('writeTask').replaceChildren(...WRITING_TASKS.filter(t=>t.mode===task.mode).map(t=>new Option(t.title,t.id)));
    $('writeTask').value=task.id;$('writingLevel').textContent=task.level;
    $('taskTitle').textContent=task.title;$('writingPrompt').textContent=task.prompt;
    $('writingGoals').replaceChildren(...task.goals.map(([s])=>node('li',s)));
    $('draft').value=entry.text;counter();$('writeResult').hidden=true;$('exampleBox').open=false;
    status(entry.text?'저장된 초안을 불러왔어요.':'초안은 이 기기에 자동 저장됩니다.');
    $('reviewDraft').textContent=entry.last?'다시 피드백 받기':'피드백 받기';
    if(entry.last?.text===entry.text && !busy)void review(false);
  }
  function selectQuote(item){
    const b=node('button',item.quote||item.text,'writeQuote');
    b.type='button';b.lang='en';b.title='답안에서 이 부분 선택';
    b.onclick=()=>{
      $('draft').focus({preventScroll:true});
      $('draft').setSelectionRange(item.start,item.end);
      $('draft').scrollIntoView({block:'center',behavior:'auto'});
    };
    return b;
  }
  function heading(parent,title){parent.append(node('h3',title));}
  function section(parent,title,items,empty){
    heading(parent,title);
    if(!items.length){parent.append(node('p',empty,'writeEmpty'));return;}
    for(const item of items){
      const row=node('div',undefined,'writeItem');
      row.append(node('small','문장 '+item.number+' · '+item.label),selectQuote(item));
      if(item.suggestion)row.append(node('span',' → '+item.suggestion,'writeSuggestion'));
      row.append(node('p',item.why));
      if(item.detail){
        const details=node('details');
        details.append(node('summary','검사기 원문 설명'),node('p',item.detail));row.append(details);
      }
      parent.append(row);
    }
  }
  function paint(){
    if(!report)return;
    $('writeProfile').textContent=report.overview;$('writeBasis').textContent=report.basis;
    const prev=entry.previous,delta=$('revisionDelta');delta.hidden=!prev;
    if(prev)delta.textContent='직전 초안과 비교 · 수정 후보 '+prev.edits+' → '+report.edits+'개 · 구조·연결 표현 '+prev.relations+' → '+report.relations+'종';
    for(const [name,id] of Object.entries(tabNames))$(id).setAttribute('aria-pressed',String(name===tab));
    const parent=$('reportBody');parent.replaceChildren();
    if(tab==='grammar'){
      section(parent,'문법·철자 수정 후보',report.grammar.filter(n=>n.priority==='edit'),'이 검사에서 수정 후보를 찾지 못했습니다.');
      if(report.focusNote){
        const hint=report.focusNote;
        heading(parent,'이 과제의 문법 선택 · '+hint.label);
        parent.append(node('p',hint.matched?'관련 표현이 답안에 있습니다. 아래 원문에서 의도한 관계가 전달되는지 읽어 보세요.':hint.tip+' 같은 뜻을 다른 구조로 표현해도 좋습니다.','writeEmpty'));
      }
      section(parent,'문법 선택과 의도',report.structure,'뚜렷한 논리 연결 단서를 찾지 못했습니다. 단순한 사실을 전달할 때는 짧은 평서문도 적절합니다.');
      heading(parent,'문장별 표현 수준');
      for(const s of report.profile){
        const row=node('div',undefined,'writeItem');row.append(node('small','문장 '+s.number+' · '+s.label),selectQuote(s),node('p',s.why));parent.append(row);
      }
    }else if(tab==='lex'){
      section(parent,'다듬어 볼 어휘·문체',[...report.style,...report.grammar.filter(n=>n.priority==='consider')],'이 글에서 별도로 제안할 어휘·문체 후보를 찾지 못했습니다.');
      section(parent,'문맥이 드러나는 어휘 결합',report.exact,'등록된 결합과 일치하는 구절이 없습니다. 구체적인 동사와 목적어가 의도를 잘 전달하는지 확인해 보세요.');
      section(parent,'심화 어휘와 용도',report.advanced,'등록된 심화 어휘가 발견되지 않았습니다. 익숙한 단어도 의도를 정확히 전하면 좋은 선택입니다.');
    }else{
      if(report.goals.length){
        heading(parent,'과제별 내용 단서');
        parent.append(node('p','관련 표현이 글에 나타났는지 확인합니다. 같은 뜻의 다른 표현이나 논거의 적절성은 직접 대조해 보세요.','writeEmpty'));
        for(const g of report.goals){
          const row=node('div',undefined,'writeItem');row.append(node('small',g.label));
          if(g.match)row.append(selectQuote(g.match));
          else row.append(node('p','자동으로 찾은 단서가 없어요. 답안에 이 내용이 전달되는지 읽어 보세요.'));
          parent.append(row);
        }
      }
      heading(parent,'다음 수정에서 살펴볼 점');
      const guides=report.guides.length?report.guides:[task.mode==='free'?'핵심 메시지 하나에 밑줄을 긋고, 뒤 문장이 그 내용을 설명하는지 읽어 보세요.':'과제의 요청과 마지막 문장을 대조해 보세요. 독자가 다음 행동이나 결론을 알 수 있나요?'];
      for(const tip of guides)parent.append(node('div',tip,'writeItem'));
    }
    $('exampleBox').hidden=!task.model;$('exampleLine').textContent=task.model;
    $('writeResult').hidden=false;
  }
  async function review(focus=true){
    if(busy)return;
    const current=task.id,text=$('draft').value;
    if((text.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g)||[]).length<3){status('영어 단어 세 개 이상으로 된 문장을 입력하세요.');$('draft').focus();return;}
    busy=true;$('reviewDraft').disabled=true;status('기기에서 답안을 분석하고 있어요…');
    try{
      const result=await window.writingCoach.review(current,text);
      if(current!==task.id || $('draft').value!==text)return;
      if(!result.report)throw Error(result.error||'검사를 마치지 못했습니다.');
      report=result.report;
      if(entry.last?.text!==text){
        entry.previous=entry.last?{edits:entry.last.edits,relations:entry.last.relations}:null;
        entry.last={text,edits:report.edits,relations:report.relations};
        save();
      }
      status('피드백을 확인하고 답안을 고쳐 보세요.');
      $('reviewDraft').textContent='다시 피드백 받기';paint();
      if(focus&&!$('writingPage').hidden){
        $('writeProfile').focus({preventScroll:true});
        $('writeResult').scrollIntoView({block:'start'});
      }
    }catch(error){if(current===task.id && $('draft').value===text)status(error.message);}
    finally{busy=false;$('reviewDraft').disabled=false;}
  }
  for(const [value,name] of Object.entries(WRITING_MODES))$('writeMode').add(new Option(name,value));
  $('writeMode').onchange=()=>selectTask(WRITING_TASKS.find(t=>t.mode===$('writeMode').value).id);
  $('writeTask').onchange=()=>selectTask($('writeTask').value);
  $('draft').oninput=()=>{
    entry.text=$('draft').value;save();counter();report=null;$('writeResult').hidden=true;
    status(entry.last?'수정본 저장됨 · 다시 피드백을 받으세요.':'초안 저장됨');
  };
  $('reviewDraft').onclick=()=>void review();
  for(const [name,id] of Object.entries(tabNames))$(id).onclick=()=>{tab=name;paint();};
  return {open(){if(!task)selectTask(get('selected'));}};
})();
