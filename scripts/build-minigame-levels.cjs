// Reproducible in-app difficulty estimate, not CEFR/JLPT certification.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const E=require('../site/minigame-engine.js'),courses=require('../site/languages-data.js');
const site=path.join(__dirname,'../site');
const english=vm.runInNewContext(fs.readFileSync(path.join(site,'vocabulary.js'),'utf8')+';VOCABULARY');
const levels={},frequencies={};
const corpus=process.argv[2]?JSON.parse(fs.readFileSync(process.argv[2],'utf8')):null;
const savedFrequency=corpus?null:require('./minigame-word-frequency.json');
for(const language of ['en',...Object.keys(courses)]){
  const rows=language==='en'?english:courses[language].words;
  const sentences=language==='en'?Object.values(courses).flatMap(c=>c.questions.map(q=>q.sourceMeaning||'')):courses[language].questions.map(q=>q.stem.replace('____',q.answer));
  const segmenter=new Intl.Segmenter(language,{granularity:'word'}),counts=new Map();
  const normalize=s=>s.normalize('NFC').toLocaleLowerCase(language);
  if(corpus)for(const sentence of new Set(corpus[language]||sentences))for(const item of segmenter.segment(normalize(sentence)))if(item.isWordLike)counts.set(item.segment,(counts.get(item.segment)||0)+1);
  frequencies[language]={};
  const ranked=E.words(rows).map(w=>{
    const tokens=[...segmenter.segment(normalize(w.word))].filter(t=>t.isWordLike);
    const frequency=corpus?(tokens.length?Math.min(...tokens.map(t=>counts.get(t.segment)||0)):0):(savedFrequency[language]?.[w.key]||0);
    frequencies[language][w.key]=frequency;
    const core=/^(ja|es|tr)-w-\d+$/.test(w.key);
    // Core authored words first, then corpus rarity and spelling complexity.
    const complexity=(core?-100:0)-3*Math.log2(frequency+1)+.45*E.letters(w.word).length+Math.max(0,tokens.length-1);
    return {...w,complexity};
  }).sort((a,b)=>a.complexity-b.complexity||a.key.localeCompare(b.key,'en'));
  levels[language]=Object.fromEntries(ranked.map((w,i)=>[w.key,Math.min(5,1+Math.floor(i*5/ranked.length))]));
  // French has a directly reviewed frequency-based progression; preserve that order.
  if(language==='fr')for(const w of rows)levels.fr[w.key]=w.stage;
  console.log(language,Array.from({length:5},(_,i)=>ranked.filter(w=>levels[language][w.key]===i+1).slice(0,6).map(w=>w.word).join(', ')));
}
fs.writeFileSync(path.join(site,'minigame-levels.js'),'const MINIGAME_LEVELS='+JSON.stringify(levels)+';\nif(typeof module!=="undefined")module.exports=MINIGAME_LEVELS;\n');
if(corpus)fs.writeFileSync(path.join(__dirname,'minigame-word-frequency.json'),JSON.stringify(frequencies)+'\n');
