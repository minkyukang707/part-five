'use strict';
const GrammarReference=(()=>{
  const node=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;};
  function table(model){
    const section=node('section',undefined,'grammarFormSection'),wrap=node('div',undefined,'grammarTableScroll'),t=node('table',undefined,'grammarFormTable');
    wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label',model.caption+' · 좌우로 스크롤');
    t.append(node('caption',model.caption));const head=node('thead'),hr=node('tr');
    model.headers.forEach(label=>{const th=node('th',label);th.scope='col';hr.append(th);});head.append(hr);t.append(head);
    const body=node('tbody');for(const row of model.rows){const tr=node('tr');row.forEach((value,i)=>{const cell=node(i?'td':'th',value);if(!i)cell.scope='row';tr.append(cell);});body.append(tr);}t.append(body);wrap.append(t);
    section.append(wrap,node('p',model.note,'grammarTableNote'));return section;
  }
  function render(host,code){
    if(!host||!GRAMMAR_FORM_GUIDES[code]||host.dataset.language===code)return;
    const guide=GRAMMAR_FORM_GUIDES[code],details=node('details',undefined,'grammarReference');
    host.dataset.language=code;
    details.append(node('summary',guide.name+' · 인칭·성·수·불규칙 활용 먼저 보기'));
    const intro=node('div',undefined,'grammarReferenceIntro');
    guide.facts.forEach(fact=>intro.append(node('p',fact)));details.append(intro,table(GRAMMAR_COMPARISON));
    guide.tables.forEach(id=>details.append(table(GRAMMAR_FORM_TABLES[id])));
    if(code!=='en'){
      const start=node('button','인칭·성 보강 수업 시작 →','primary');start.type='button';start.dataset.morphologyStart=code;
      start.onclick=()=>{StudyApp.open('foundations');GrammarStudy.study(code,'A1-12');};details.append(start);
    }
    const sources=node('div',undefined,'grammarReferenceSources');sources.append(node('strong','설명과 활용을 확인한 자료'));
    for(const id of guide.sources){const ref=GRAMMAR_FORM_SOURCES[id],a=node('a',ref.label+' ↗');a.href=ref.url;a.target='_blank';a.rel='noopener';sources.append(a);}details.append(sources);host.replaceChildren(details);
  }
  return {render,table};
})();
