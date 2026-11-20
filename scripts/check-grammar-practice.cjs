const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const site=path.resolve(__dirname,'../site'),ctx=vm.createContext({crypto:crypto.webcrypto});
const run=file=>vm.runInContext(fs.readFileSync(path.join(site,file),'utf8'),ctx,{filename:file});
for(const f of ['grammar-courses.js','grammar-ja.js','grammar-es.js','grammar-tr.js'])run(f);
const originals=JSON.parse(vm.runInContext('JSON.stringify(GRAMMAR_COURSES)',ctx));
for(const f of ['grammar-expand.js','grammar-ja-expanded.js','grammar-es-expanded.js','grammar-tr-expanded.js'])run(f);
const beforeAdditions=JSON.parse(vm.runInContext('JSON.stringify(GRAMMAR_COURSES)',ctx));
for(const f of ['grammar-forms.js','grammar-morphology.js','grammar-fr.js','grammar-fr-forms.js','grammar-engine.js'])run(f);
const {courses,E}=vm.runInContext('({courses:GRAMMAR_COURSES,E:GrammarPractice})',ctx);
const copy=x=>JSON.parse(JSON.stringify(x)),ko=s=>typeof s==='string'&&/[가-힣]/.test(s);
let total=0,questionCount=0;
for(const [code,course] of Object.entries(courses)){
  assert.equal(Object.keys(course.levels).join(','),'A1,A2,B1,B2,C1,C2');
  for(const [level,lessons] of Object.entries(course.levels)){
    assert.equal(lessons.length,['A1','A2','B1'].includes(level)?14:12);
    for(const [i,l] of lessons.entries()){
      const id=code+' '+level+'-'+i;
      for(const field of ['title','pattern','explanation','example','translation','pitfall'])assert(l[field],id+' '+field);
      assert(ko(l.explanation)&&(l.explanation+l.steps.join('')).length>=120,id+' detailed Korean explanation');
      assert(ko(l.pitfall)&&ko(l.translation),id+' Korean translations');
      assert.equal(l.steps.length,3);assert(l.steps.every(ko),id+' construction notes');
      assert(l.examples.length>=3);assert(l.examples.every(ex=>ex.sentence&&ko(ex.translation)),id+' example translations');
      assert(l.references.length>=2&&l.references.every(ref=>/^https:\/\//.test(ref.url)&&ref.label),id+' sources');
      assert.equal(l.practice.length,code==='fr'?(['A1','A2','B1'].includes(level)?4:3):l.morphology?6:i<4?4:3);
      assert.equal(new Set(l.practice.map(q=>q.question)).size,l.practice.length,id+' distinct exercises');
      assert.equal(new Set(l.practice.map(q=>q.id)).size,l.practice.length);
      assert.equal(new Set(l.practice.slice(0,3).map(q=>q.question.replace('___',q.options[q.answer]))).size,3,id+' different sentences');
      for(const q of l.practice){
        assert.equal(q.options.length,3);assert.equal(new Set(q.options).size,3,id+' unique choices');
        assert(q.options[q.answer]&&ko(q.why),id+' explained answer');
        if(q.id!=='legacy-check'){assert.equal(q.question.split('___').length,2,id+' one blank');assert(ko(q.translation),id+' question translation');}
        questionCount++;
      }
      if(code!=='fr'&&i<4){for(const field of Object.keys(originals[code].levels[level][i]))assert.deepEqual(copy(l[field]),originals[code].levels[level][i][field],id+' preserve legacy '+field);}
      assert(!/[\u200b\ufffd]/.test(JSON.stringify(l)),id+' encoding');
      total++;
    }
  }
}
assert.equal(total,312);assert.equal(questionCount,1104);
for(const [code,oldCourse] of Object.entries(beforeAdditions))for(const [level,units] of Object.entries(oldCourse.levels))for(const [index,u] of units.entries()){
  assert.equal(courses[code].levels[level][index].title,u.title,'original 72 lesson IDs remain stable');
  assert.deepEqual(copy(courses[code].levels[level][index].practice),u.practice,'existing answers/question IDs remain stable');
}
const legacy={version:1,courses:{ja:{level:'C2',index:3,lessons:{'A1-0':{attempts:7,correct:5,passed:true,lastCorrect:true},'C2-3':{attempts:1,correct:0,passed:false,lastCorrect:false}}}}};
const migrated=E.normalize(legacy,courses);
assert.equal(migrated.version,2);assert.equal(migrated.courses.ja.lessons['A1-0'].attempts,7);
assert.equal(E.summary(migrated.courses.ja,courses.ja).completed,1);
assert.equal(E.summary(migrated.courses.ja,courses.ja).pending.length,1);
assert.equal(migrated.courses.ja.lessons['C2-3'].last,'legacy-check');
assert.equal(E.summary(migrated.courses.es,courses.es).completed,0);
assert.equal(E.summary(migrated.courses.ja,courses.ja).total,78);
const completed72={version:2,courses:{ja:{level:'C2',index:11,view:'practice',lessons:{},session:{lesson:'C2-11',question:'practice-3',order:[2,0,1],selected:0,attemptId:'old-saved-question'}}}};
for(const [level,units] of Object.entries(beforeAdditions.ja.levels))units.forEach((u,index)=>{completed72.courses.ja.lessons[level+'-'+index]={attempts:2,correct:2,passed:true,pending:false,lastCorrect:true,mastered:['practice-1','practice-3'],seen:{'practice-3':1},last:'practice-3'};});
const resumed=E.normalize(completed72,courses).courses.ja;
assert.equal(E.summary(resumed,courses.ja).completed,72);assert.equal(E.summary(resumed,courses.ja).total,78);
assert.deepEqual(copy(resumed.session),completed72.courses.ja.session);assert.equal(resumed.lessons['A1-12'],undefined);
for(const [code,course] of Object.entries(courses))for(const [level,units] of Object.entries(course.levels))for(const [index,unit] of units.entries()){
  let state=E.normalize(null,courses),p=state.courses[code];p.level=level;p.index=index;p.view='practice';
  const id=E.lessonId(level,index);
  E.next(p,course,id,()=>.3);
  let s=p.session,q=unit.practice.find(q=>q.id===s.question);
  assert.deepEqual([...s.order].sort(),[0,1,2]);
  const first=s.question;
  assert.equal(E.grade(p,course,q.options.findIndex((_,i)=>i!==q.answer)).ok,false);
  assert(p.lessons[id].pending);assert.equal(p.lessons[id].passed,false);
  const saved=copy(p.session);
  state=E.normalize(copy(state),courses);p=state.courses[code];
  assert.deepEqual(copy(p.session),saved,'answered session/order persist');
  assert.equal(E.grade(p,course,q.answer),null,'duplicate submission cannot change counters');
  E.next(p,course,id,()=>.3);
  assert.notEqual(p.session.question,first,'missed rule gets another sentence');
  assert.notEqual(p.session.question,'legacy-check','review must use sentence exercises');
  q=unit.practice.find(q=>q.id===p.session.question);assert.equal(E.grade(p,course,q.answer).ok,true);
  assert(p.lessons[id].pending);assert.equal(p.lessons[id].passed,false,'one correct sentence is insufficient');
  const second=p.session.question;
  state=E.normalize(copy(state),courses);p=state.courses[code];E.next(p,course,id,()=>.3);
  assert.notEqual(p.session.question,second);q=unit.practice.find(q=>q.id===p.session.question);
  E.grade(p,course,q.answer);assert.equal(p.lessons[id].pending,false);assert(p.lessons[id].passed);
  assert.equal(p.lessons[id].attempts,3);assert.equal(p.lessons[id].correct,2);
  E.next(p,course,id,()=>.3);q=unit.practice.find(q=>q.id===p.session.question);
  E.grade(p,course,q.options.findIndex((_,i)=>i!==q.answer));
  assert(p.lessons[id].pending);assert.equal(p.lessons[id].recovery.length,0,'new miss resets review streak');
  assert(p.lessons[id].passed,'completed lesson remains completed while review is pending');
  for(const question of unit.practice){
    p.session={lesson:id,question:question.id,order:[2,0,1],selected:null,attemptId:crypto.randomUUID()};
    assert(E.grade(p,course,question.answer).ok);
  }
  for(const other of Object.keys(courses).filter(c=>c!==code))assert.equal(Object.keys(state.courses[other].lessons).length,0);
}
assert.equal(E.lesson(courses.ja,'A1-99'),undefined);assert.equal(E.lesson(courses.ja,'A1-NaN'),undefined);
const repeated=E.normalize(null,courses).courses.ja;
function forceAnswer(question,correct){const q=courses.ja.levels.A1[0].practice.find(q=>q.id===question);repeated.session={lesson:'A1-0',question,order:[0,1,2],selected:null,attemptId:crypto.randomUUID()};E.grade(repeated,courses.ja,correct?q.answer:(q.answer+1)%3);}
forceAnswer('legacy-check',true);forceAnswer('practice-1',true);forceAnswer('practice-1',true);
assert.equal(repeated.lessons['A1-0'].passed,false,'concept check or repeat of one sentence cannot satisfy two distinct sentences');
forceAnswer('practice-2',true);assert(repeated.lessons['A1-0'].passed);
forceAnswer('practice-3',false);forceAnswer('practice-1',true);forceAnswer('practice-1',true);
assert(repeated.lessons['A1-0'].pending,'repeating the same correct sentence cannot clear review');
forceAnswer('practice-2',true);assert.equal(repeated.lessons['A1-0'].pending,false);
const malformed=E.normalize({courses:{ja:{level:'X',index:99,session:{lesson:'A1-0',question:'practice-1',order:[0,0,0],selected:null,attemptId:'x'},lessons:{'A1-0':{attempts:-1,correct:7,passed:true,lastCorrect:false}}}}},courses);
assert.equal(malformed.courses.ja.level,'A1');assert.equal(malformed.courses.ja.index,0);assert.equal(malformed.courses.ja.session,null);
assert.equal(malformed.courses.ja.lessons['A1-0'].passed,false);
console.log('PASS Grammar practice: 312 detailed lessons / 1104 answers, different-sentence review across every lesson, 2-answer mastery/recovery, v1/v2 migration, stable old 72 IDs, reload/double-submit and language isolation.');
require('./check-grammar-forms.cjs');
