const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const site=path.join(__dirname,'../site'),courses=require('../site/languages-data.js'),report=require('../site/notices/vocabulary-review.json');
for(const code of ['ja','es','tr']){
  const removed=report.courses[code].removed[0].key,active=courses[code].words[0].key;
  const entries={[removed]:{attempts:7,correct:3,lastCorrect:false,lastSequence:1},[active]:{attempts:3,correct:2,lastCorrect:true,lastSequence:2}};
  const saved={version:1,language:code,courses:{[code]:{words:entries,stage:1,set:66,mode:'words',session:{kind:'words',key:active,answered:false,attemptId:'restored-active',options:[]}}}};
  const window={LANGUAGE_COURSES:courses,StudyLocale:{current:()=>code}};
  const context=vm.createContext({window,localStorage:{getItem:()=>JSON.stringify(saved)},console});
  vm.runInContext(fs.readFileSync(path.join(site,'word-preview.js'),'utf8')+'\n'+fs.readFileSync(path.join(site,'game.js'),'utf8')+'\n'+fs.readFileSync(path.join(site,'languages.js'),'utf8'),context);
  const stats=window.LanguageStudy.statistics(code);
  assert.equal(stats.total,10);assert.equal(stats.correct,5);assert.equal(stats.knownWords,1);assert.equal(stats.retiredCount,1);assert.equal(stats.pending,0);
  const changed=courses[code].words.find(w=>w.meaningChanged);
  const correction={version:1,language:code,courses:{[code]:{words:{[changed.key]:{attempts:2,correct:2,lastCorrect:true,lastSequence:1}},stage:1,set:0,mode:'words'}}};
  const revised=vm.createContext({window:{LANGUAGE_COURSES:courses,StudyLocale:{current:()=>code}},localStorage:{getItem:()=>JSON.stringify(correction)}});
  vm.runInContext(fs.readFileSync(path.join(site,'word-preview.js'),'utf8')+'\n'+fs.readFileSync(path.join(site,'game.js'),'utf8')+'\n'+fs.readFileSync(path.join(site,'languages.js'),'utf8'),revised);
  const pending=revised.window.LanguageStudy.statistics(code);
  assert.equal(pending.total,2);assert.equal(pending.correct,2);assert.equal(pending.knownWords,0);assert.equal(pending.pending,1,'changed meanings return to review without inventing a mistake');
}
assert(courses.es.words.find(w=>w.word==='poder').meanings.includes('할 수 있다'));
assert(courses.es.words.find(w=>w.word==='padre').meanings.includes('아버지'));
assert(courses.ja.words.find(w=>w.word==='きのう')?.meanings.every(m=>m==='어제'));
console.log('PASS Reviewed vocabulary: retired attempts retained, excluded from current mastery/review, active IDs preserved, common-sense regressions.');
