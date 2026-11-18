const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const site=path.resolve(__dirname,'../site');
class Element {
  constructor(tag='div'){this.tagName=tag;this.children=[];this.attributes={};this.style={};this.dataset={};this.hidden=false;this.value='';this.textContent='';}
  append(...children){this.children.push(...children);}
  replaceChildren(...children){this.children=children;}
  setAttribute(name,value){this.attributes[name]=String(value);}
}
function harness(seed={}){
  const entries=new Map(Object.entries(seed).map(([key,value])=>[key,JSON.stringify(value)]));
  const localStorage={getItem:key=>entries.get(key)??null,setItem:(key,value)=>entries.set(key,String(value)),removeItem:key=>entries.delete(key)};
  const elements=new Map(),events=[],handlers=new Map(),calls=[];
  const get=id=>{if(!elements.has(id))elements.set(id,new Element());return elements.get(id);};
  get('dashboardPage').hidden=true;
  const window={addEventListener:(name,handler)=>{const list=handlers.get(name)||[];list.push(handler);handlers.set(name,list);},dispatchEvent:event=>{events.push(event);for(const handler of handlers.get(event.type)||[])handler(event);}};
  const ctx=vm.createContext({window,localStorage,structuredClone,Date,CustomEvent:class {constructor(type,init){this.type=type;this.detail=init.detail;}},document:{getElementById:get,createElement:tag=>new Element(tag)},StudyApp:{open:mode=>calls.push(['open',mode]),reviewGrammar:key=>calls.push(['grammar',key]),reviewWord:key=>calls.push(['word',key]),setDifficulty:value=>calls.push(['difficulty',value])},LanguageStudy:{review:(...args)=>calls.push(['language',...args])},ListeningStudy:{review:key=>calls.push(['listening',key])},PersonalStudy:{review:key=>calls.push(['materials',key])}});
  function load(name){vm.runInContext(fs.readFileSync(path.join(site,name),'utf8'),ctx,{filename:name});}
  load('learning.js');load('dashboard.js');
  vm.runInContext('LearningDashboard.mount(document.getElementById("dashboardPage"))',ctx);
  return {ctx,entries,localStorage,events,calls,get,log:window.LearningLog,draw:()=>vm.runInContext('LearningDashboard.open()',ctx)};
}
const h=harness({'partfive.progress.v1':{total:100,correct:70,pending:{oldTopic:'p1'},recovered:2,game:{difficulty:3,kills:4}},'partfive.vocabulary.v1':{marks:{4:'again',8:'known'}}});
assert.equal(h.get('dashAttempts').textContent,'100');assert.equal(h.get('dashAccuracy').textContent,'70%');
assert.equal(h.get('dashToday').textContent,'0');assert.equal(Object.keys(h.log.summary().data.days).length,0,'legacy history is not invented');
h.get('reviewPlan').children[0].onclick();assert.deepEqual(h.calls.pop(),['grammar','oldTopic']);
const attempt={id:'attempt-1',mode:'grammar',language:'en',key:'relative',label:'관계절',correct:false,difficulty:3};
assert(h.log.record(attempt));assert(!h.log.record(attempt));
assert.equal(h.events.length,1,'duplicate attempt emits no second analytics event');
h.log.record({...attempt,id:'attempt-2',correct:true});h.log.record({...attempt,id:'attempt-3',correct:true});
let item=Object.values(h.log.summary().data.items)[0];assert.equal(item.attempts,3);assert.equal(item.recoveries,1);assert.equal(item.streak,2);
h.draw();assert.equal(h.get('dashAttempts').textContent,'103');assert.equal(h.get('dashToday').textContent,'3');
const historicalMistake=h.get('grammarWeak').children[0];
assert.equal(historicalMistake.tagName,'button','successful reviews retain historical mistake analysis');
assert(historicalMistake.children[0].children[1].textContent.includes('최근 2회 이상 정답'));
h.get('reviewPlan').children[0].onclick();
assert.deepEqual(h.calls.pop(),['grammar','oldTopic'],'two successful reviews clear the current priority');
h.log.record({...attempt,id:'attempt-4'});h.log.record({...attempt,id:'attempt-5',correct:true});
assert.equal(Object.values(h.log.summary().data.items)[0].recoveries,2);
h.draw();h.get('grammarWeak').children[0].onclick();assert.deepEqual(h.calls.pop(),['grammar','relative']);
const existing=h.log.summary().data;
const reloaded=harness({'partfive.progress.v1':{total:105,correct:73},'partfive.learning.v1':existing});
assert.equal(reloaded.get('dashAttempts').textContent,'105','reload does not rebaseline and double count new grammar');
reloaded.log.reset();reloaded.draw();assert.equal(reloaded.get('dashAttempts').textContent,'0');
for(const [mode,language,key,expected] of [['word','en','9',['word',9]],['language-word','ja','ja-word-1',['language','ja','ja-word-1']],['listening','en','coffee.0',['listening','coffee.0']],['materials','es','doc:1',['materials','doc:1']]]){
  const route=harness();route.log.record({mode,language,key,correct:false});route.draw();route.get('reviewPlan').children[0].onclick();assert.deepEqual(route.calls.pop(),expected);
}
const topic=harness();
topic.log.record({mode:'language-grammar',language:'ja',key:'j-1',topic:'particles',label:'조사',correct:false});
topic.log.record({mode:'language-grammar',language:'ja',key:'j-2',topic:'particles',label:'조사',correct:false});
assert.equal(Object.keys(topic.log.summary().data.items).length,1,'language grammar aggregates by topic');
assert.equal(Object.values(topic.log.summary().data.items)[0].key,'j-2','review points at last wrong item');
for(const [difficulty,count,correct,expected] of [[3,19,19,null],[3,20,17,4],[3,20,16,null],[3,20,9,2],[3,20,10,null],[5,20,20,null],[1,20,0,null]]){
  const p=harness({'partfive.progress.v1':{total:0,correct:0,game:{difficulty}}});
  for(let i=0;i<count;i++)p.log.record({id:'g'+i,mode:'grammar',language:'en',key:'conditional',correct:i<correct,difficulty});
  // Other study modes and past difficulty must not affect the 20-question advice.
  for(let i=0;i<8;i++)p.log.record({mode:'word',language:'en',key:String(i),correct:false});
  for(let i=0;i<8;i++)p.log.record({mode:'grammar',language:'en',key:'relative',correct:false,difficulty:difficulty===5?4:5});
  p.draw();assert.equal(p.get('applyRecommendation').hidden,expected===null,'recommendation boundary '+[difficulty,count,correct]);
  if(expected!==null){p.get('applyRecommendation').onclick();assert.deepEqual(p.calls.pop(),['difficulty',expected]);}
}
const retention=harness();for(let i=0;i<305;i++)retention.log.record({id:'id-'+i,mode:'grammar',key:'q',correct:true});
assert.equal(retention.log.summary().data.recent.length,300);assert.equal(retention.log.summary().data.ids.length,300);
assert.equal(Object.values(retention.log.summary().data.items)[0].attempts,305);
// Regression coverage for route coordination and durable appearance settings.
const routing=harness();
const pageNames=['dashboard','materials','listening','languages'];
vm.runInContext(`
const PersonalStudy={mount(){},open(){},close(){}};
const ListeningStudy={mount(){},open(){},close(){}};
const LanguageStudy={mount(){},open(){},close(){}};
`,routing.ctx);
routing.ctx.document.documentElement={dataset:{theme:'dark'}};
routing.ctx.document.querySelectorAll=()=>[];
routing.ctx.setTimeout=()=>1;routing.ctx.clearTimeout=()=>{};
vm.runInContext(fs.readFileSync(path.join(site,'workspace.js'),'utf8'),routing.ctx);
for(const mode of ['dashboard','listening','grammar']){
  routing.ctx.window.dispatchEvent({type:'partfive:page',detail:{mode}});
  for(const name of pageNames)assert.equal(routing.get(name+'Tab').attributes['aria-pressed'],String(name===mode));
}
routing.get('themeToggle').onclick();assert.equal(routing.ctx.document.documentElement.dataset.theme,'light');assert.equal(routing.localStorage.getItem('partfive.theme.v1'),'light');
routing.get('themeToggle').onclick();assert.equal(routing.ctx.document.documentElement.dataset.theme,'dark');
const screen=fs.readFileSync(path.join(site,'screen.js'),'utf8');
assert(screen.includes('await PersonalStudy.resetProgress()'),'reset uses the real lexical material module');
assert(screen.includes("String(activeMode==='grammar'&&!review)"),'background initialization does not press hidden grammar tab');
// A damaged primary progress record is already recoverable from backup in screen.js.
// Analytics migration must preserve the same restored legacy total.
const recovered=harness({'partfive.progress.v1':{total:-1,correct:99},'partfive.progress.v1.backup':{total:80,correct:60}});
assert.equal(recovered.get('dashAttempts').textContent,'80','legacy baseline should fall back to valid backup when primary totals are invalid');
console.log('PASS Learning: legacy baseline, idempotent attempts, recoveries, topic aggregation, review navigation, recommendation thresholds/isolation, recent history retention.');
console.log('PASS Workspace: extension route ARIA, theme persistence, reset/initialization regression guards.');
