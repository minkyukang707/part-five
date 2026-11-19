'use strict';
// Authored lesson additions. Existing level/index IDs remain stable for saved progress.
function expandGrammar(code,level,index,title,pattern,explanation,steps,pitfall,rows,source){
  const course=GRAMMAR_COURSES[code],lessons=course.levels[level];
  const practice=rows.map((r,i)=>({id:'practice-'+(i+1),question:r[0].replace(/\s+([.!?。！？])/g,'$1'),options:r.slice(1,4),answer:0,translation:r[4],why:r[5],reading:r[6]||''}));
  const first=practice[0],example=first.question.replace('___',first.options[first.answer]);
  const lesson=index===null?{title,pattern,explanation,pitfall,example,translation:first.translation,reading:first.reading}:lessons[index];
  if(index===null)lessons.push(lesson);
  lesson.steps=steps.split('|');
  lesson.practice=practice;
  if(index!==null)lesson.practice.push({id:'legacy-check',question:lesson.question,options:lesson.options,answer:lesson.answer,why:lesson.why,translation:'',reading:''});
  lesson.examples=[{sentence:lesson.example,translation:lesson.translation,reading:lesson.reading,analysis:index===null?first.why:''},...practice.filter(q=>q.id!=='legacy-check').slice(index===null?1:0).map(q=>({sentence:q.question.replace('___',q.options[q.answer]),translation:q.translation,reading:q.reading,analysis:q.why}))];
  lesson.references=[source,...course.sources.map(s=>({label:s[0],url:s[1]}))].filter((s,i,a)=>s&&a.findIndex(x=>x?.url===s.url)===i);
}
const GRAMMAR_REFS={
  ja:{label:'도쿄외국어대학교 · 일본어 문법 항목',url:'https://www.coelang.tufs.ac.jp/mt/ja/gmod/steplist.html'},
  jaAdvanced:{label:'국제교류기금 · 문법 항목과 용법 설명',url:'https://www.kyozai.jpf.go.jp/kyozai/material/grammar/home/ja/render.do'},
  es:{label:'Cervantes · 문법 교육과정 목록',url:'https://cvc.cervantes.es/ensenanza/biblioteca_ele/plan_curricular/indice.htm'},
  esAdvanced:{label:'RAE · 스페인어 문법',url:'https://www.rae.es/gram%C3%A1tica/'},
  tr:{label:'도쿄외국어대학교 · 터키어 문법 항목',url:'https://www.coelang.tufs.ac.jp/mt/tr/gmod/steplist.html'},
  trAdvanced:{label:'Yunus Emre · Yedi İklim A1–C2 과정',url:'https://www.yee.org.tr/en/yayinlar/yedi-iklim-turkce-seti'}
};
