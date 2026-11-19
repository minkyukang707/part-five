'use strict';
const GrammarPractice=(()=>{
  const levels=['A1','A2','B1','B2','C1','C2'];
  const natural=n=>Number.isSafeInteger(n)&&n>=0;
  const lessonId=(level,index)=>level+'-'+index;
  function lesson(course,id){const [level,n]=String(id).split('-');return levels.includes(level)&&/^\d+$/.test(n)?course.levels[level][Number(n)]:undefined;}
  function entry(raw,unit){
    const ids=new Set(unit.practice.map(q=>q.id));
    const list=value=>Array.isArray(value)?[...new Set(value.filter(id=>ids.has(id)&&id!=='legacy-check'))]:[];
    const valid=!!raw&&natural(raw.attempts)&&natural(raw.correct)&&raw.correct<=raw.attempts;
    return {attempts:valid?raw.attempts:0,correct:valid?raw.correct:0,passed:valid&&raw.passed===true,pending:valid&&(raw.pending===true||raw.lastCorrect===false),lastCorrect:valid?raw.lastCorrect:undefined,
      mastered:list(raw?.mastered),recovery:list(raw?.recovery),seen:Object.fromEntries([...ids].map(id=>[id,natural(raw?.seen?.[id])?raw.seen[id]:0])),last:ids.has(raw?.last)?raw.last:null};
  }
  function normalize(raw,courses){
    const store={version:2,courses:{}};
    for(const [code,course] of Object.entries(courses)){
      const old=raw?.courses?.[code],level=levels.includes(old?.level)?old.level:'A1',index=Number.isInteger(old?.index)&&old.index>=0&&old.index<course.levels[level].length?old.index:0;
      const p={level,index,view:old?.view==='practice'?'practice':'study',reviewOnly:old?.reviewOnly===true,lessons:{},session:null};
      for(const l of levels)course.levels[l].forEach((unit,i)=>{const id=lessonId(l,i);if(old?.lessons?.[id]){p.lessons[id]=entry(old.lessons[id],unit);if(raw.version===1&&old.lessons[id].attempts)p.lessons[id].last='legacy-check';}});
      const s=old?.session,unit=s&&lesson(course,s.lesson),q=unit?.practice.find(q=>q.id===s.question);
      if(q&&s.lesson===lessonId(level,index)&&typeof s.attemptId==='string'&&Array.isArray(s.order)&&s.order.length===q.options.length&&new Set(s.order).size===s.order.length&&s.order.every(n=>Number.isInteger(n)&&n>=0&&n<q.options.length)&&(s.selected===null||(Number.isInteger(s.selected)&&s.order.includes(s.selected))))p.session={...s};
      store.courses[code]=p;
    }
    return store;
  }
  function getEntry(p,unit,id){return p.lessons[id]??=(entry(null,unit));}
  function next(p,course,id,rng=Math.random){
    const unit=lesson(course,id),e=getEntry(p,unit,id),last=p.session?.lesson===id?p.session.question:e.last;
    const candidates=unit.practice.filter(q=>q.id!==last&&(!e.pending||q.id!=='legacy-check'));
    const min=Math.min(...candidates.map(q=>e.seen[q.id]||0)),fresh=candidates.filter(q=>(e.seen[q.id]||0)===min);
    const q=fresh[Math.floor(rng()*fresh.length)];
    const order=q.options.map((_,i)=>i);for(let i=order.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
    e.seen[q.id]=(e.seen[q.id]||0)+1;e.last=q.id;
    p.session={lesson:id,question:q.id,order,selected:null,attemptId:crypto.randomUUID()};return p.session;
  }
  function grade(p,course,choice){
    const s=p.session,unit=s&&lesson(course,s.lesson),q=unit?.practice.find(q=>q.id===s.question);
    if(!q||s.selected!==null||!s.order.includes(choice))return null;
    s.selected=choice;const ok=choice===q.answer,e=getEntry(p,unit,s.lesson);e.attempts++;e.correct+=Number(ok);e.lastCorrect=ok;
    if(ok){if(q.id!=='legacy-check'){if(!e.mastered.includes(q.id))e.mastered.push(q.id);if(e.pending&&!e.recovery.includes(q.id))e.recovery.push(q.id);}if(e.mastered.length>=2)e.passed=true;if(e.recovery.length>=2)e.pending=false;}
    else{e.pending=true;e.recovery=[];}
    return {ok,id:s.attemptId,lesson:s.lesson,question:q,entry:e};
  }
  function summary(p,course){const all=levels.flatMap(level=>course.levels[level].map((unit,i)=>({id:lessonId(level,i),unit,entry:p.lessons[lessonId(level,i)]})));return {total:all.length,completed:all.filter(x=>x.entry?.passed).length,pending:all.filter(x=>x.entry?.pending),questions:all.reduce((sum,x)=>sum+x.unit.practice.length,0)};}
  return {levels,lessonId,lesson,normalize,next,grade,summary,getEntry};
})();
