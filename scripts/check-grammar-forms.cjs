const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx=vm.createContext({}),site=path.resolve(__dirname,'../site');
for(const f of ['grammar-courses.js','grammar-ja.js','grammar-es.js','grammar-tr.js','grammar-expand.js','grammar-ja-expanded.js','grammar-es-expanded.js','grammar-tr-expanded.js','grammar-forms.js','grammar-morphology.js','grammar-fr.js','grammar-fr-forms.js','data.js','english-forms.js','engine.js'])vm.runInContext(fs.readFileSync(path.join(site,f),'utf8'),ctx,{filename:f});
const {courses,tables,guides,sources,patterns,Engine,tier}=vm.runInContext('({courses:GRAMMAR_COURSES,tables:GRAMMAR_FORM_TABLES,guides:GRAMMAR_FORM_GUIDES,sources:GRAMMAR_FORM_SOURCES,patterns:STUDY_PATTERNS,Engine:StudyEngine,tier:tierOf})',ctx);
const plain=x=>JSON.parse(JSON.stringify(x));
assert.equal(Object.keys(tables).length,26);
for(const table of Object.values(tables)){
  assert(table.caption&&table.note&&table.headers.length>=3&&table.rows.length>=4,table.caption);
  for(const row of table.rows){assert.equal(row.length,table.headers.length,table.caption);assert(row.every(v=>typeof v==='string'&&v.length));}
}
for(const [code,guide] of Object.entries(guides)){
  assert(guide.facts.length>=3&&guide.tables.every(key=>tables[key]));
  assert(guide.sources.every(key=>sources[key]?.url.startsWith('https://')));
  if(['ja','es','tr'].includes(code)){
    const units=Object.values(courses[code].levels).flat().filter(u=>u.morphology);
    assert.equal(units.length,6);
    for(const u of units){
      assert.equal(u.practice.length,6);assert(u.formTables.length&&u.formTables.every(id=>tables[id]));
      assert.equal(new Set(u.examples.map(e=>e.sentence)).size,6,u.title+' six different completed sentences');
      assert(u.examples.every(e=>!/\s+\([^()]*\)$/.test(e.sentence)),u.title+' example sentences exclude prompt labels');
    }
  }
}
// Contrastive facts and exception paradigms verified against the linked primary references.
assert.deepEqual(plain(tables.trPerson.rows.map(r=>r[1])),['yiyorum','yiyorsun','yiyor','yiyoruz','yiyorsunuz','yiyor / yiyorlar']);
assert.deepEqual(plain(tables.trCase.rows[0]),['ben','beni','bana','benim']);
assert.deepEqual(plain(tables.trCase.rows[1]),['sen','seni','sana','senin']);
assert.deepEqual(plain(tables.trPresent.rows.slice(4).map(r=>r[1])),['yiyor','diyor']);
assert.equal(tables.trAorist.rows[0][2],'gelmem');assert.equal(tables.trAorist.rows[3][2],'gelmeyiz');
assert(guides.tr.facts.join('').includes('O şu an yemek yiyor.'));assert(guides.tr.facts.join('').includes('성별이나 사람·동물 여부를 확정할 수 없습니다'));
assert.equal(tables.esPerson.rows[2][2],'come');assert(tables.esPerson.rows[2][0].includes('él / ella / usted'));
assert.equal(tables.esPerson.rows[5][2],'comen');
assert.equal(tables.esStem.rows[0][1],'pienso');assert.equal(tables.esStem.rows[3][1],'pensamos');
assert.equal(tables.esPast.rows[2][3],'hizo');
assert(tables.esGender.rows.find(r=>r[0]==='el agua')[2].includes('el agua fría'));
assert(tables.esAgreement.rows.some(r=>r[1]==='Ellas han llegado.'));
assert(tables.esAgreement.rows.some(r=>r[1]==='Las puertas fueron abiertas.'));
assert(tables.jaPerson.rows.every(r=>r[1]==='食べます'&&r[2]==='食べました'));
assert.equal(tables.jaGroups.rows.find(r=>r[0].startsWith('帰る'))[1],'帰ります');
assert.equal(tables.jaGroups.rows.find(r=>r[0].startsWith('着る'))[1],'着ます');
assert.equal(tables.jaIrregular.rows[1][2],'来ない · こない');
assert.equal(tables.jaSound.rows[4][1],'行って');
assert.equal(tables.jaAdjective.rows[1][2],'よかった');
assert.equal(tables.enPerson.rows[4][1],'are');
assert(guides.en.facts[0].includes('he/she'));
assert(guides.en.facts[1].includes('단수 they'));
const added=patterns.filter(p=>p.id.startsWith('en-person-')||p.id.startsWith('en-forms-'));
assert.equal(added.length,12);assert.equal(new Set(patterns.map(p=>p.id)).size,patterns.length);
assert.equal(added.find(p=>p.id==='en-person-unknown-they').answers[0],'are');
assert.equal(added.find(p=>p.id==='en-person-they-have').answers[0],'have');
assert.equal(added.find(p=>p.id==='en-forms-written').answers[0],'written');
assert.equal(added.find(p=>p.id==='en-forms-children').answers[0],'children');
for(const p of added){
  assert.equal(p.stem.split('____').length,2);assert.equal(new Set(p.answers).size,4);
  assert(/[가-힣]/.test(p.why)&&/[가-힣]/.test(p.meaning));assert.equal(tier(p),1);
  const engine=new Engine(added,undefined,()=>.3);
  const single=new Engine([p],undefined,()=>.3),q=single.next();
  assert(single.grade(q,q.options.indexOf(q.answer)));assert.equal(single.state.correct,1);
  const wrong=engine.next();engine.grade(wrong,wrong.options.findIndex(s=>s!==wrong.answer));
  const review=engine.next(wrong.topic);assert.notEqual(review.pattern,wrong.pattern,'English miss also reviews another sentence');
  engine.grade(review,review.options.indexOf(review.answer));assert.equal(engine.state.recovered,1);
}
console.log('PASS Morphology: 26 paradigms, 18 lessons/108 sentences, person vs gender distinctions, irregular-form regressions and 12 English exercises with review.');
