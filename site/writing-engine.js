'use strict';
import {fixes,precise,style,moves,academic} from './writing-rules.js';
import './writing-tasks.js';
const segmenter=new Intl.Segmenter('en',{granularity:'sentence'});
const tokens=text=>text.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g)||[];
import {LocalLinter} from './vendor/harper/index.js';
import {createBinaryModuleFromUrl} from './vendor/harper/BinaryModule-DMhzYB6c.js';
const binary=createBinaryModuleFromUrl(new URL('./vendor/harper/harper.wasm',import.meta.url),'full');
const linter=new LocalLinter({binary});
const kinds={
  agreement:['수일치','주어의 인칭·수와 동사 형태가 맞는지 확인하세요.'],
  spelling:['철자','사전에 있는 철자 후보입니다. 인명·기관명·전문용어라면 원래 표기가 맞을 수 있습니다.'],
  capitalization:['대문자','문장 시작이나 고유명사의 대소문자를 확인하세요.'],
  punctuation:['구두점','절과 절의 경계 또는 문장 끝에 맞는 구두점인지 확인하세요.'],
  repetition:['반복','같은 말을 의도적으로 되풀이했는지 확인하세요.'],
  wordchoice:['단어 선택','앞뒤 단어와 글의 의도에 맞는 표현인지 후보를 비교해 보세요.'],
  redundancy:['중복 표현','이 표현의 일부를 덜어 내도 같은 뜻이 전해지는지 비교하세요.'],
  style:['문체','독자와 상황에 맞는 어조인지 검토해 보세요.']
};
function overlaps(a,b){return a.start<b.end && b.start<a.end;}
function location(text,match){
  return {start:match.index,end:match.index+match[0].length,quote:text.slice(match.index,match.index+match[0].length)};
}
function sentenceList(text){
  const list=[];
  for(const line of text.matchAll(/[^\r\n]+/g)){
    for(const {segment,index} of segmenter.segment(line[0])){
      const copy=segment.trim(),start=line.index+index+segment.indexOf(copy);
      if(tokens(copy).length)list.push({text:copy,start,end:start+copy.length,number:list.length+1});
    }
  }
  return list;
}
async function grammarNotes(text){
  const notes=[];
  for(const [pattern,label,why,replace] of fixes){
    for(const m of text.matchAll(pattern)){
      let suggestion=typeof replace==='function'?replace(m[0]):replace;
      if(/^[A-Z]/.test(m[0]))suggestion=suggestion[0].toUpperCase()+suggestion.slice(1);
      notes.push({...location(text,m),label,why,suggestion,priority:'edit'});
    }
  }

  const lints=await linter.lint(text,{language:'plaintext'});
  // Verify the actual excerpt before exposing a textarea selection, including after emoji.
  const offsets=[0];
  for(const char of text)offsets.push(offsets.at(-1)+char.length);
  for(const lint of lints){
    const span=lint.span();
    let start=span.start,end=span.end;
    if(text.slice(start,end)!==lint.get_problem_text()){start=offsets[span.start];end=offsets[span.end];}
    const quote=text.slice(start,end),kind=lint.lint_kind().toLowerCase().replace(/[^a-z]/g,'');
    const message=lint.message(),suggestions=lint.suggestions();
    const first=suggestions[0];
    let suggestion='';
    if(first)suggestion=first.kind()===1?'이 부분 삭제':(first.kind()===2?quote:'')+first.get_replacement_text();
    const article=/indefinite article/i.test(message);
    let [label,why]=article?['관사 선택','a/an은 뒤 단어의 첫소리에 맞춰 선택합니다.']:kinds[kind]||['표현 확인','표시한 부분과 제안 표현을 비교해 의도한 의미에 맞는지 확인하세요.'];
    if(quote===lint.get_problem_text() && !notes.some(n=>overlaps(n,{start,end}))){
      const optional=['style','wordchoice','redundancy','readability'].includes(kind);
      notes.push({start,end,quote,label,why,detail:message,suggestion,priority:optional?'consider':'edit'});
    }
    span.free();suggestions.forEach(s=>s.free());lint.free();
  }
  return notes.sort((a,b)=>a.start-b.start);
}
function evidence(text,patterns){
  const items=[];
  for(const [label,pattern,why] of patterns){
    for(const m of text.matchAll(pattern))items.push({...location(text,m),label,why});
  }
  return items.sort((a,b)=>a.start-b.start);
}
function numberAt(item,sentences){
  return sentences.find(s=>item.start>=s.start && item.start<s.end)?.number||1;
}
function distinct(items,limit){
  const seen=new Set();
  return items.filter(i=>{
    const key=i.quote.toLowerCase();
    if(seen.has(key))return false;
    seen.add(key);return true;
  }).slice(0,limit);
}
function movesIn(sentence){
  return Object.entries(moves).flatMap(([key,value])=>{
    const m=value.cue.exec(sentence.text);
    if(!m)return [];
    const start=sentence.start+m.index;
    return [{key,label:value.label,why:value.why,quote:m[0],start,end:start+m[0].length,number:sentence.number}];
  });
}
function development(mode,text,task){
  const goals=task.goals.map(([label,pattern])=>{
    const terms=pattern.split('|').map(term=>{
      if(['ten','twelve','10','12','18','42','28','14','Sam','Noor','Jun','Eva','Ben','Tia','Leo','Mina','Alia','Max','if','by','when','why','how','form','fee','only','office','bus','room','but','yet','cost'].includes(term)||term.length<=3)return term+'\\b';
      return term+'[a-z]*';
    });
    const m=new RegExp('\\b(?:'+terms.join('|')+')','i').exec(text);
    return {label,match:m?location(text,m):null};
  });
  const guides=[];
  if(mode==='email'){
    if(!/\b(?:dear|hello|hi|good morning|good afternoon)\b/i.test(text))guides.push('받는 사람이 누구인지 드러내는 인사말로 시작해 보세요.');
    if(!/\b(?:thank|regards|sincerely|best wishes|best,|appreciate)\b/i.test(text))guides.push('상대에게 필요한 다음 행동을 적고, 짧은 감사나 맺음말로 끝내 보세요.');
  }
  if(mode==='discussion'||mode==='essay'){
    if(!/\b(?:for example|for instance|such as|because|this means|when|imagine|consider|suppose)\b|\d/i.test(text))guides.push('주장 한 가지를 고른 뒤, 누가 어떤 상황에서 어떤 결과를 겪는지 한두 문장으로 보여 주세요.');
    if(mode==='discussion' && !goals[1]?.match)guides.push('제시된 다른 의견 하나를 자기 말로 짚고, 동의하거나 보완하는 이유를 연결해 보세요.');
  }
  return {goals,guides};
}
async function analyze(id,text){
  const task=WRITING_TASKS.find(t=>t.id===id);
  if(!task || typeof text!=='string' || text.length>8000)throw Error('과제 또는 답안 길이를 확인해 주세요.');
  const words=tokens(text),letters=text.match(/\p{L}/gu)||[];
  if(words.length<3 || words.join('').length<9 || words.join('').length<letters.length*.55)throw Error('분석할 영어 문장을 한 문장 이상 입력해 주세요.');
  if(text.trim().toLowerCase()===task.prompt.toLowerCase())throw Error('과제 안내문과 같은 내용이에요. 직접 쓴 답안을 입력해 주세요.');
  if(words.length>=6 && !(await linter.isLikelyEnglish(text)))throw Error('영어 문장을 확인하기 어렵습니다. 완성한 영어 문장을 한두 개 더 입력해 주세요.');
  const sentences=sentenceList(text);
  const grammar=await grammarNotes(text);
  const styles=evidence(text,style);
  const flagged=[...grammar,...styles];
  const exact=evidence(text,precise).filter(i=>!flagged.some(n=>overlaps(i,n)));
  const advanced=distinct(evidence(text,academic).filter(i=>!flagged.some(n=>overlaps(i,n))),16);
  const structure=sentences.flatMap(movesIn);
  for(const item of [...grammar,...styles,...exact,...advanced])item.number=numberAt(item,sentences);
  const fix=grammar.filter(n=>n.priority==='edit');
  const goalMove=moves[task.focus];
  const profile=sentences.map(s=>{
    const issues=fix.filter(n=>n.number===s.number);
    const strengths=structure.filter(n=>n.number===s.number).map(n=>n.label);
    if(exact.some(n=>n.number===s.number))strengths.push('구체적인 어휘 결합');
    let label='기본 표현',why='짧고 직접적인 표현도 목적과 의미가 분명하면 충분합니다.';
    if(tokens(s.text).length<=3){label='짧은 표현';why='인사말·맺음말 또는 짧은 구는 문장 수준 판단의 근거가 제한적입니다.';}
    if(strengths.length){label='확장 표현';why=[...new Set(strengths)].join(' · ')+'의 단서가 보입니다.';}
    else if(advanced.some(n=>n.number===s.number)){why='심화 어휘가 쓰였습니다. 단어의 기능과 목적어는 어휘 선택에서 확인하세요.';}
    if(strengths.length>1){label='복합 표현';}
    if(issues.length){label='수정 검토';why=issues[0].label+' 등 표시된 부분을 문맥에 맞게 확인해 보세요.';}
    return {...s,label,why};
  });
  const uniqueMoves=new Set(structure.map(m=>m.key));
  const diverse=uniqueMoves.size>=2;
  let overview='기본 표현 중심',basis='명확한 주어와 동사를 살리고, 의도에 따라 이유·조건·비교를 덧붙여 보세요.';
  if(sentences.length===1 && words.length<7){overview='짧은 문장';basis='한 문장만으로 글 전체의 수준을 판단하기 어렵습니다. 아래에서 이 문장에 대한 근거를 확인하세요.';}
  if(uniqueMoves.size || exact.length){overview='표현 확장';basis='글에서 관찰한 특징 · '+[uniqueMoves.size?'구조·연결 표현 '+uniqueMoves.size+'종':'',exact.length?'구체적 어휘 결합':''].filter(Boolean).join(', ');}
  if(diverse && exact.length && sentences.length>=2){overview='다양한 표현 활용';basis='여러 문장에서 서로 다른 구조·연결 표현과 구체적인 어휘 결합을 사용했습니다.';}
  if(fix.length && fix.length>=Math.max(1,Math.ceil(sentences.length/2))){overview='정확성 먼저 점검';basis='수정 후보가 있는 문장부터 다듬고, 그 다음 표현의 다양성을 점검해 보세요.';}
  const goals=development(task.mode,text,task);
  if(goalMove && !uniqueMoves.has(task.focus))goals.guides.push(goalMove.tip);
  const focusNote=goalMove?{label:goalMove.label,matched:uniqueMoves.has(task.focus),tip:goalMove.tip}:null;
  return {words:words.length,overview,basis,profile,grammar,style:distinct(styles,14),exact:distinct(exact,14),
    advanced,structure:structure.slice(0,24),focus:task.focus,goals:goals.goals,guides:goals.guides,
    focusNote,edits:fix.length,relations:uniqueMoves.size};
}
export {analyze};
