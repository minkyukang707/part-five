'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const crypto=require('node:crypto');
const data=require('../site/languages-expansion.js');
const hints=JSON.parse(fs.readFileSync(path.join(__dirname,'language-ko-hints.json'),'utf8'));
const fixes=JSON.parse(fs.readFileSync(path.join(__dirname,'language-hint-overrides.json'),'utf8'));
const words=JSON.parse(fs.readFileSync(path.join(__dirname,'language-reviewed-words.json'),'utf8'));
const baseWordFixes=JSON.parse(fs.readFileSync(path.join(__dirname,'language-meaning-overrides.json'),'utf8'));
const wordFixes=JSON.parse(fs.readFileSync(path.join(__dirname,'language-review-overrides.json'),'utf8'));
const audit=JSON.parse(fs.readFileSync(path.join(__dirname,'../site/notices/vocabulary-review.json'),'utf8'));
let count=0;
for(const [code,course]of Object.entries(data)){
  assert.equal(words[code].length,2000);course.words=words[code];
  const edits={...baseWordFixes[code],...wordFixes[code]};
  for(const word of course.words)if(edits[word.word])word.meanings=edits[word.word];
  const changed=new Set(audit.courses[code].changes.map(w=>w.word));
  for(const word of course.words){word.meaningRevision=crypto.createHash('sha256').update(JSON.stringify(word.meanings)).digest('hex').slice(0,12);word.meaningChanged=changed.has(word.word);}
  for(const q of course.questions){
    if(!q.sourceExercise)continue;
    const english=q.sourceMeaning||q.meaning.split(' · ').slice(1).join(' · ');
    const korean=(fixes[english]||hints[english])?.replace(/Tom's/g,'톰의').replace(/Tom/g,'톰').replace(/Mary/g,'메리').replace(/John/g,'존');
    assert(korean&&/[가-힣]/.test(korean)&&!/[▁�]/.test(korean),'Korean meaning required for '+q.key+': '+english);
    q.sourceMeaning=english;q.meaning='문장 뜻 · '+korean;count++;
  }
}
const suffix=";\nif(typeof LANGUAGE_COURSES!=='undefined')for(const [code,data] of Object.entries(LANGUAGE_EXPANSION))Object.assign(LANGUAGE_COURSES[code],data);\nif(typeof module!=='undefined')module.exports=LANGUAGE_EXPANSION;\n";
fs.writeFileSync(path.join(__dirname,'../site/languages-expansion.js'),'const LANGUAGE_EXPANSION='+JSON.stringify(data)+suffix);
console.log('Applied '+count+' Korean question hints and 6,000 reviewed vocabulary entries.');
