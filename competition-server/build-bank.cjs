'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const site=path.join(__dirname,'../site'),ctx=vm.createContext({});
for(const file of ['data.js','english-forms.js','engine.js','vocabulary.js','languages-data.js','french-vocabulary.js','french-questions.js','french-course.js'])vm.runInContext(fs.readFileSync(path.join(site,file),'utf8'),ctx,{filename:file});
const source=vm.runInContext('({engine:new StudyEngine(STUDY_PATTERNS),words:VOCABULARY,languages:LANGUAGE_COURSES})',ctx);
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const random=rng(84729),shuffle=items=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
function words(rows){return rows.map((row,index)=>{const meaning=row.meanings[0],others=shuffle(rows.filter(r=>r.word!==row.word&&!r.meanings.some(x=>row.meanings.includes(x)))).map(r=>r.meanings[0]);const options=[meaning,...new Set(others)].slice(0,4);return{kind:'word',prompt:row.word,hint:'이 단어의 뜻을 고르세요.',options,answer:0,explanation:row.word+' — '+row.meanings.join(', ')};}).filter(q=>q.options.length===4);}
const bank={en:{grammar:[],word:[]}};source.engine.random=random;
const seen=new Set();for(let i=0;i<1000&&bank.en.grammar.length<300;i++){const q=source.engine.next();if(seen.has(q.stem))continue;seen.add(q.stem);bank.en.grammar.push({kind:'grammar',prompt:q.stem,hint:'빈칸에 알맞은 표현을 고르세요.',options:q.options,answer:q.options.indexOf(q.answer),explanation:q.why+(q.credit?'\n출처: '+q.credit:'')});}
bank.en.word=words(shuffle(source.words).slice(0,300).map(w=>({word:w.w,meanings:[w.main,...w.sub]})));
for(const [lang,course] of Object.entries(source.languages))bank[lang]={grammar:course.questions.map(q=>({kind:'grammar',prompt:q.stem,hint:q.meaning,options:q.options,answer:q.options.indexOf(q.answer),explanation:q.why})),word:words(course.words)};
for(const [lang,sets] of Object.entries(bank)){if(sets.grammar.length<40||sets.word.length<40)throw Error(lang+' needs at least 40 per kind');console.log(lang,sets.grammar.length,'grammar',sets.word.length,'words');}
fs.writeFileSync(path.join(__dirname,'bank.js'),'// Generated from existing Part Five learning material by build-bank.cjs. Server-side only.\nexport default '+JSON.stringify(bank)+';\n');
