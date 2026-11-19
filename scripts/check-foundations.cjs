const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const site=path.resolve(__dirname,'../site'),source=f=>fs.readFileSync(path.join(site,f),'utf8');
const ctx=vm.createContext({});
for(const file of ['grammar-courses.js','grammar-ja.js','grammar-es.js','grammar-tr.js','japanese-readings.js','japanese.js'])vm.runInContext(source(file),ctx,{filename:file});
const data=vm.runInContext('({courses:GRAMMAR_COURSES,readings:JAPANESE_READINGS,pronounce:JapaneseReading.korean})',ctx);
for(const [code,course] of Object.entries(data.courses)){
  assert.equal(Object.keys(course.levels).join(','),'A1,A2,B1,B2,C1,C2');
  for(const lessons of Object.values(course.levels)){assert.equal(lessons.length,4);for(const l of lessons){for(const field of ['title','pattern','explanation','example','translation','pitfall','question','why'])assert(l[field]);assert.equal(l.options.length,3);assert.equal(new Set(l.options).size,3);assert(l.options[l.answer]);if(code==='ja')assert(/[가-힣]/.test(data.pronounce(l.reading)),l.reading);}}
}
const words=require('../site/languages-data.js').ja.words;
assert.equal(words.length,2000);
for(const word of words){assert(data.readings[word.word],word.word);assert(/[가-힣]/.test(data.pronounce(data.readings[word.word])),word.word);}
for(const [kana,ko] of [['がっこう','각코오'],['コーヒー','코오히이'],['しんぶん','심분'],['キャ','캬'],['きや','키야'],['きって','킷테']])assert.equal(data.pronounce(kana),ko);
assert.equal(data.pronounce('漢字'),'','no fabricated kanji readings');
console.log('PASS Foundations: 72 lessons across A1–C2, 72 quizzes, 2,000 kana readings and Korean pronunciation, long vowels/yoon/sokuon.');
