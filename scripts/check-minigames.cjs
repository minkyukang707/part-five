const assert=require('node:assert/strict');
const E=require('../site/minigame-engine.js');
const courses=require('../site/languages-data.js');
const rng=seed=>()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
assert.deepEqual(E.letters('cafe\u0301'),['c','a','f','é']);
for(const word of ['banana','学校','öğretmen','Español','café']){
 const t=E.tiles(word,rng(5));assert.equal(new Set(t.map(x=>x.id)).size,t.length);
 assert.equal([...t].sort((a,b)=>a.id-b.id).map(x=>x.text).join(''),word);
 assert.notEqual(t.map(x=>x.text).join(''),word,'shuffle must not reveal an already solved word');
}
assert.deepEqual(E.line(0,16,7),[0,8,16]);assert.deepEqual(E.line(16,0,7),[16,8,0]);assert.deepEqual(E.line(1,10,7),[]);
for(const [code,c]of Object.entries(courses)){
 const pool=E.words(c.words);assert(pool.length>500);
 assert.equal(new Set(pool.map(w=>w.meaning)).size,pool.length);
 for(let seed=1;seed<=30;seed++){
  const grid=E.grid(pool,4,7,rng(seed));assert.equal(grid.words.length,4,code+' four placeable words');
  assert(grid.cells.every(x=>x&&E.letters(x).length===1));
  for(const word of grid.words)assert.equal(word.path.map(i=>grid.cells[i]).join(''),word.word,'board preserves accents and Japanese characters');
  const opts=E.options(pool[seed],pool,rng(seed));assert.equal(opts.length,3);assert.equal(new Set(opts.map(w=>w.meaning)).size,3);assert(opts.some(w=>w.key===pool[seed].key));
 }
}
assert.equal(E.score(6,6),600);assert.equal(E.score(6,8),570);assert.equal(E.score(0,10),0);
console.log('PASS Minigames: Unicode letters, duplicate tiles, distinct meanings, solvable grids in all three languages, choices, scoring.');
