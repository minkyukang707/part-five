const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),crypto=require('node:crypto');
const source=name=>fs.readFileSync(path.join(__dirname,'../site',name),'utf8');
const bytes=source('library/questions.json'),questions=JSON.parse(bytes),manifest=JSON.parse(source('library/index.json'));
assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),manifest.revision);
assert.equal(questions.length,manifest.count);assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
const data=vm.runInNewContext([source('data.js'),source('engine.js'),source('game.js'),source('vocabulary.js'),
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
for(const code of ['ja','es','tr']){
  const course=languages[code];
  assert.equal(course.words.length,60);assert.equal(course.questions.length,48);
  assert.equal(new Set(course.questions.map(q=>q.key)).size,48);
  for(const q of course.questions){assert(q.why&&q.meaning);assert(q.options.includes(q.answer));assert.equal(new Set(q.options).size,4);}
}
const songs=require('../site/listening-data.js').LISTENING_SONGS;
assert.equal(songs.length,3);assert(songs.every(s=>s.lines.length===4&&s.license.includes('Attribution')));
assert.equal(fs.readdirSync(path.join(__dirname,'../site/arena/scenes')).filter(n=>n.endsWith('.webp')).length,40);
console.log('3 introductory language courses, 12 licensed song excerpts and 40 battle backgrounds; OK');
require('./check-learning.cjs');
