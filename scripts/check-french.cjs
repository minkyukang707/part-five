const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const courses=require('../site/languages-data.js'),fr=courses.fr,site=path.join(__dirname,'../site');
assert.equal(fr.name,'프랑스어');assert.equal(fr.voice,'fr-FR');assert.equal(fr.words.length,2000);assert.equal(fr.stages.length,5);
assert.equal(fr.genres.all,'전체 주제');
const ko=s=>typeof s==='string'&&/[가-힣]/.test(s);
for(const w of fr.words){assert(w.key.startsWith('fr-'));assert(w.meanings.every(ko));assert(w.reviewed&&w.meaningRevision);assert(w.stage>=1&&w.stage<=5);if(w.gender)assert(['m','f'].includes(w.gender));if(w.article)assert(['un','une','les'].includes(w.article));}
for(const [term,meaning]of [['eau','물'],['bonjour','안녕'],['pain','빵'],['chien','개'],['chat','고양이']]){
  const row=fr.words.find(w=>w.word===term);assert(row&&row.meanings.some(m=>m.includes(meaning)),term+' common meaning');
}
assert(fr.questions.length>=1000);assert(new Set(fr.questions.map(q=>q.topic)).size>=40);
assert.equal(new Set(fr.questions.map(q=>q.stem)).size,fr.questions.length,'no duplicated sentence prompts');
for(let stage=1;stage<=5;stage++)for(const genre of ['daily','travel','school','sport','food','work','health','culture'])assert(fr.questions.filter(q=>q.stage===stage&&q.genre===genre).length>=20,stage+' '+genre+' varied pool');
for(const q of fr.questions){assert(ko(q.meaning)&&ko(q.why));assert(q.options.includes(q.answer));assert.equal(q.stem.split('____').length,2);}
// Existing saved Japanese/Spanish/Turkish records must load without French inheriting them.
for(const code of ['ja','es','tr','fr']){
  const w=courses[code].words[0],saved={version:1,language:code,courses:{[code]:{words:{[w.key]:{attempts:3,correct:2,lastCorrect:false,meaningRevision:w.meaningRevision}},mode:'words',stage:1,set:0}}};
  const window={LANGUAGE_COURSES:courses,StudyLocale:{current:()=>code}},ctx=vm.createContext({window,localStorage:{getItem:()=>JSON.stringify(saved)}});
  for(const f of ['word-preview.js','game.js','languages.js'])vm.runInContext(fs.readFileSync(path.join(site,f),'utf8'),ctx);
  assert.equal(window.LanguageStudy.statistics(code).total,3);
  for(const other of ['ja','es','tr','fr'].filter(c=>c!==code)){assert.equal(window.LanguageStudy.statistics(other).total,0);assert.equal(window.LanguageStudy.statistics(other).game.hp,100);}
}
const index=fs.readFileSync(path.join(site,'index.html'),'utf8');assert(index.includes('data-language="fr"'));assert(index.includes('data-language-progress="fr"'));
for(const f of ['french-vocabulary.js','french-questions.js','french-course.js','grammar-fr.js','grammar-fr-forms.js'])assert(index.includes('src="'+f+'"'));
assert(index.indexOf('french-course.js')<index.indexOf('src="languages.js"'));
console.log('PASS French parity: 2,000 Korean words, 5 difficulty levels x 8 topics, unique sentences, saved language isolation and load order.');
