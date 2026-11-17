'use strict';
const GRAMMAR_TIERS=[
  ['noun','agreement','modifier','countability','reflexive','independent-possessive','enough','distributive'],
  ['voice','tense','collocation','link','past-habit','time-clause','purpose','degree-result','parallel'],
  ['relative','complement','conditional','indirect-question','whether','multiples','accustomed','causative','substitution'],
  ['cleft','fused-relative','reduced-passive','prep-relative','sentential-relative','partitive-relative','modal-perfect','future-perfect','past-wish','appositive','double-comparative'],
  ['negative-inversion','inverted-condition','mandative','perfect-participle','concessive-degree','negative-addition','passive-infinitive','absolute-with']
];
const topicTier=new Map(GRAMMAR_TIERS.flatMap((row,i)=>row.map(topic=>[topic,i+1])));
function tierOf(pattern){
  const extra=pattern.genre==='research'&&pattern.stem.split(/\s+/).length>=20?1:0;
  return Math.min(5,(topicTier.get(pattern.topic)||3)+extra);
}
class StudyEngine {
  constructor(patterns, state, random = Math.random) {
    this.random = random;
    this.state = state ?? {total:0, correct:0, recovered:0, sequence:0, pending:{}, seen:{}};
    this.state.rounds ??= {};
    this.labels = new Map(patterns.map(p => [p.topic,p.label]));
    this.pool = [];
    this.downloaded=new Map();
    for (const p of patterns) this.expand(p, [], p.id);
    this.seedSources=new Map(this.pool.filter(v=>v.pattern.credit).map(v=>[v.key,v]));
  }
  expand(pattern, words, key) {
    if (words.length === pattern.slots.length) {
      this.pool.push({pattern, words, key});
      return;
    }
    pattern.slots[words.length].forEach((pair,i) => this.expand(pattern,[...words,pair],key+'.'+i));
  }
  pick(items) { return items[Math.floor(this.random()*items.length)]; }
  addOnline(questions) {
    for (const q of questions) {
      if(!this.labels.has(q.topic))continue;
      const old=this.downloaded.get(q.id);
      if(old){Object.assign(old.pattern,q);continue;}
      const seed=this.seedSources.get(q.id);
      if(seed){this.downloaded.set(q.id,seed);continue;}
      const v={pattern:{...q,label:this.labels.get(q.topic)},words:[],key:q.id};
      this.pool.push(v);this.downloaded.set(q.id,v);
    }
  }
  next(topic = null, onlineOnly = false, genre = 'all', difficulty = 3) {
    const {pending,seen} = this.state;
    if (topic && !Object.hasOwn(pending,topic)) return null;
    let pool = topic ? this.pool.filter(v => v.pattern.topic === topic && v.pattern.id !== pending[topic]) : onlineOnly ? [...this.downloaded.values()] : this.pool;
    if(!topic && genre!=='all')pool=pool.filter(v=>(v.pattern.genre||'work')===genre);
    if(!pool.length)return null;
    // Normal mixes the entire curriculum. Other stages favor the chosen bands.
    if(difficulty!==3){
      const bands={1:[1],2:[1,2,3],4:[3,4,5],5:[5]};
      const band=bands[difficulty]||[1,2,3,4,5];
      const distance=v=>Math.min(...band.map(d=>Math.abs(tierOf(v.pattern)-d)));
      const nearest=pool.reduce((best,v)=>Math.min(best,distance(v)),5);
      pool=pool.filter(v=>distance(v)===nearest);
    }
    let chosenTopic=topic;
    if(!chosenTopic){
      const scope=(onlineOnly?'online.':'mixed.')+genre+(difficulty===3?'':'.'+difficulty);
      const round=this.state.rounds[scope]??={used:[],last:null};
      const topics=[...new Set(pool.map(v=>v.pattern.topic))];
      let available=topics.filter(t=>!round.used.includes(t));
      if(!available.length){
        round.used=[];
        available=topics.length>1?topics.filter(t=>t!==round.last):topics;
      }
      chosenTopic=this.pick(available);
      round.used.push(chosenTopic);round.last=chosenTopic;
    }
    pool=pool.filter(v=>v.pattern.topic===chosenTopic);
    const oldest = pool.reduce((oldest,v)=>Math.min(oldest,seen[v.key]||0),Infinity);
    pool = pool.filter(v => (seen[v.key] || 0) === oldest);
    const variant = this.pick(pool);
    const {pattern:p,words,key} = variant;
    const fill = (source,lang) => source.replace(/\{(\d+)\}/g, (_match,i) => words[Number(i)][lang]);
    const options = [...p.answers];
    for (let i=options.length-1; i>0; i--) {
      const j = Math.floor(this.random()*(i+1));
      [options[j],options[i]] = [options[i],options[j]];
    }
    seen[key] = ++this.state.sequence;
    return {key, pattern:p.id, topic:chosenTopic, stem:fill(p.stem,0), why:fill(p.why,0),
      meaning:fill(p.meaning,1), credit:p.credit,reference:p.reference,original:p.original,genre:p.genre||'work',tier:tierOf(p), options, answer:p.answers[0], selected:null, review:!!topic};
  }
  grade(q,index) {
    if (!q || q.selected !== null || !Number.isInteger(index) || index<0 || index>=q.options.length) return false;
    q.selected = index;
    this.state.total++;
    if (q.options[index] === q.answer) {
      this.state.correct++;
      if (q.review && Object.hasOwn(this.state.pending,q.topic)) {
        delete this.state.pending[q.topic];
        this.state.recovered++;
      }
    } else this.state.pending[q.topic] = q.pattern;
    return true;
  }
}
