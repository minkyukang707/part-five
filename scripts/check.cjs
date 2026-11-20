const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),crypto=require('node:crypto');
const source=name=>fs.readFileSync(path.join(__dirname,'../site',name),'utf8');
const bytes=source('library/questions.json'),questions=JSON.parse(bytes),manifest=JSON.parse(source('library/index.json'));
assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),manifest.revision);
assert.equal(questions.length,manifest.count);assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
const data=vm.runInNewContext([source('data.js'),source('english-forms.js'),source('engine.js'),source('game.js'),source('vocabulary.js'),
  '({engine:new StudyEngine(STUDY_PATTERNS),game:Game,words:VOCABULARY.length})'].join('\n'));
assert.equal(data.words,3000);assert(data.engine.labels.size>=30);
for(const q of questions){
  assert(typeof q.stem==='string' && q.stem.split('____').length===2 && q.why && q.credit);
  assert.equal(new Set(q.answers).size,4);assert(data.engine.labels.has(q.topic));
}
data.engine.addOnline(questions);
for(const genre of ['work','research','news'])assert(data.engine.next(null,true,genre));
const hero=data.game.fromLegacy({},{});
const hits=Array.from({length:11},()=>data.game.answer(hero,true).damage);
assert.deepEqual(hits,[10,10,15,20,25,30,35,40,45,90,95]);
assert.deepEqual([...fs.readFileSync(path.join(__dirname,'../site/vendor/harper/harper.wasm')).subarray(0,4)],[0,97,115,109]);
console.log(manifest.count+' downloaded exercises, '+data.engine.pool.length+' total variants, '+data.words+' words; OK');
const languages=require('../site/languages-data.js');
const originalLanguages=vm.runInNewContext(source('languages-data.js')+';LANGUAGE_COURSES');
for(const code of ['ja','es','tr','fr']){
  const course=languages[code];
  assert.equal(course.words.length,2000);assert(course.questions.length>=1000);
  assert.equal(new Set(course.words.map(w=>w.word.toLocaleLowerCase())).size,2000);
  assert.equal(new Set(course.questions.map(q=>q.key)).size,course.questions.length);
  for(const kind of ['questions','words'])for(const original of originalLanguages[code]?.[kind]||[])assert(course[kind].some(q=>q.key===original.key),'preserve saved ID '+original.key);
  for(const genre of ['daily','travel','school','sport','food','work','health','culture'])assert(course.questions.filter(q=>q.genre===genre).length>=100,code+' '+genre);
  assert(new Set(course.questions.map(q=>q.topic)).size>=30);
  for(const [index,w] of course.words.entries()){assert(w.meanings.length>0);assert(w.meanings.every(m=>/[가-힣]/.test(m)));assert(w.reviewed);assert.equal(w.set,Math.floor(index/30));}
  assert.equal(course.words.filter(w=>w.set===66).length,20);
  const imported=course.questions.filter(q=>q.sourceExercise);
  assert.equal(new Set(imported.map(q=>q.stem.replace('____',q.answer))).size,imported.length);
  for(const q of course.questions){assert(q.why&&q.meaning);assert(q.options.includes(q.answer));assert.equal(new Set(q.options.map(s=>s.toLowerCase())).size,4);assert.equal(q.stem.split('____').length,2);if(q.sourceExercise){assert(q.why.includes('tatoeba.org #'));assert(q.meaning.startsWith('문장 뜻 · '));assert(/[가-힣]/.test(q.meaning));assert(!/[▁�◇◆]/.test(q.meaning));assert(!q.meaning.includes('원문 의미(영어)'));}}
  console.log(code+': '+course.questions.length+' questions / '+course.words.length+' words / 67 sets; OK');
}
assert(languages.tr.words.find(w=>w.word==='ama').meanings.includes('하지만'));
assert(languages.es.words.find(w=>w.word==='leche').meanings.includes('우유'));
assert(languages.ja.words.find(w=>w.word==='彼女').meanings.includes('그녀'));
const songs=require('../site/listening-data.js').LISTENING_SONGS;
assert.equal(songs.length,3);assert(songs.every(s=>s.lines.length===4&&s.license.includes('Attribution')));
assert.equal(fs.readdirSync(path.join(__dirname,'../site/arena/scenes')).filter(n=>n.endsWith('.webp')).length,40);
console.log('4 additional language courses, 12 licensed song excerpts and 40 battle backgrounds; OK');
require('./check-learning.cjs');
require('./check-minigames.cjs');
require('./check-language-review.cjs');
require('./check-equipment.cjs');
require('./check-foundations.cjs');
require('./check-french.cjs');
