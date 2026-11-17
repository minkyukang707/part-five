'use strict';
const {unzipSync,strFromU8}=require('./vendor/fflate.cjs');
const forms = Object.fromEntries([
  'send sent sending sends','write written writing writes','take taken taking takes','give given giving gives','make made making makes','bring brought bringing brings','find found finding finds','choose chosen choosing chooses','pay paid paying pays','buy bought buying buys','sell sold selling sells','leave left leaving leaves','keep kept keeping keeps','meet met meeting meets','see seen seeing sees','speak spoken speaking speaks','go gone going goes','come come coming comes','know known knowing knows','do done doing does','get gotten getting gets','read read reading reads','build built building builds','tell told telling tells','hold held holding holds','begin begun beginning begins','drive driven driving drives','receive received receiving receives','attend attended attending attends','return returned returning returns','finish finished finishing finishes','review reviewed reviewing reviews','deliver delivered delivering delivers','provide provided providing provides','check checked checking checks','submit submitted submitting submits','discuss discussed discussing discusses','work worked working works','arrive arrived arriving arrives','prepare prepared preparing prepares','complete completed completing completes','help helped helping helps','apply applied applying applies','contact contacted contacting contacts','cancel canceled canceling cancels','accept accepted accepting accepts','offer offered offering offers','decide decided deciding decides','manage managed managing manages','change changed changing changes','wait waited waiting waits','travel traveled traveling travels','open opened opening opens','close closed closing closes','start started starting starts','improve improved improving improves','explain explained explaining explains','use used using uses','study studied studying studies','visit visited visiting visits','learn learned learning learns','consider considered considering considers','listen listened listening listens','remember remembered remembering remembers','leave left leaving leaves'
].map(row=>row.split(' ')).map(parts=>[parts[0],parts]));
const rules=[];
function fixed(topic,exp,answer,others,why) { rules.push({topic,exp,get:()=>[answer,...others.split('|')],why}); }
fixed('partitive-relative',/\b(?:most|all|several|two|three|some|many|none|each|both) of (whom)\b/i,'whom','who|that|whose','앞에서 언급한 사람들 중 일부를 나타내는 관계절입니다. 전치사 of 다음에는 목적격 whom이 옵니다.');
fixed('partitive-relative',/\b(?:most|all|several|two|three|some|many|none|each|both) of (which)\b/i,'which','that|whose|who','앞에 나온 사물 집단을 가리키는 관계절입니다. 전치사 of 다음에는 which가 맞습니다.');
fixed('prep-relative',/\b(?:through|in|for|by|under|at|to|during|with) (which) (?:the|these|those|we|they|a|an|this|our)\b/i,'which','that|what|whose','앞 명사와 관계절을 잇는 자리입니다. 사물을 받는 관계대명사 앞에 전치사가 있으면 which를 씁니다.');
fixed('whether',/\b(?:on|as to|about) (whether) (?:the|they|we|it|these|this|there|a)\b/i,'whether','if|unless|despite','전치사 뒤에서 어떤 일이 성립하는지를 나타내는 명사절은 whether로 이끕니다.');
fixed('purpose',/\bin order (to) [a-z]+\b/i,'to','of|than|with','목적을 나타내는 in order to 뒤에는 동사원형이 옵니다.');
fixed('purpose',/\bso (that) (?:it|they|we|the [a-z]+) (?:can|could|may|might|will|would)\b/i,'that','as to|because of|in order to','목적을 나타내는 so that 뒤에 주어와 조동사가 있는 절이 이어집니다.');
fixed('appositive',/\b(?:the fact|the assumption|the hypothesis|the possibility) (that) (?:the|a|an|we|they|these|this)\b/i,'that','what|whose|of which','명사의 내용을 완전한 절로 설명하는 접속사 that이 들어갑니다.');
fixed('passive-infinitive',/\bto (be) (?:used|included|considered|determined|carried|conducted|released|published|evaluated|completed|observed|estimated|removed)\b/i,'be','been|being|is','부정사의 주체가 뒤 동작을 받습니다. to와 과거분사 사이에 be가 필요합니다.');
fixed('modal-perfect',/\b(?:may|might|must|could|should) (have) (?:contributed|influenced|affected|caused|led|resulted|occurred|played|reached|increased|reduced|been)\b/i,'have','had|having|has','과거 일에 대한 가능성이나 추론을 나타내는 조동사 완료형입니다. 조동사 뒤에는 have + 과거분사를 씁니다.');
fixed('future-perfect',/\bwill (have) (?:completed|finished|reached|been|served|spent|traveled)\b/i,'have','has|had|having','미래의 한 시점까지 끝나거나 이어질 일을 will have + 과거분사로 나타냅니다.');
fixed('substitution',/\b(?:higher|lower|greater|smaller|larger|longer|shorter) than (that) of\b/i,'that','what|whose|whom','비교 대상인 명사를 되풀이하지 않기 위해 that of를 씁니다. that은 앞의 단수·불가산 명사를 대신합니다.');
fixed('accustomed',/\baccustomed (to) [a-z]+ing\b/i,'to','for|than|by','be accustomed to는 무엇에 익숙하다는 뜻입니다. 이때 to는 전치사라서 뒤에 동명사가 올 수 있습니다.');
fixed('degree-result',/\bto (such) an extent that\b/i,'such','so|more|many','to such an extent that은 뒤에 나오는 결과가 생길 정도로라는 뜻입니다. 명사구 an extent 앞에 such를 둡니다.');
fixed('distributive',/\b(each) of (?:the|these|those|our|their) [a-z]+s\b/i,'each','every|another|much','복수 집단에서 구성원을 하나씩 가리키는 each of를 씁니다. every는 단독으로 of 앞에 올 수 없습니다.');
fixed('collocation',/\bin charge (of)\b/i,'of','from|by|into','in charge of는 어떤 일이나 조직을 담당한다는 뜻입니다. 담당 대상 앞에 of를 씁니다.');
fixed('collocation',/\bresponsible (for)\b/i,'for','of|into|from','책임지는 업무나 결과는 responsible for 뒤에 놓습니다.');
fixed('collocation',/\binterested (in)\b/i,'in','of|from|onto','관심 분야 앞에는 interested in을 씁니다.');
fixed('collocation',/\bcapable (of)\b/i,'of','to|from|into','be capable of는 어떤 일을 할 능력이 있다는 뜻입니다. of 뒤에는 명사나 동명사가 옵니다.');
fixed('collocation',/\bdepend(?:s|ed)? (on)\b/i,'on','of|into|across','depend on은 뒤에 나오는 대상에 의존하거나 결과가 그 대상에 달려 있다는 뜻입니다.');
fixed('collocation',/\bconsist(?:s|ed)? (of)\b/i,'of','for|by|onto','무엇으로 구성되는지 열거할 때 consist of를 씁니다.');
fixed('collocation',/\bparticipat(?:e|es|ed|ing) (in)\b/i,'in','of|onto|between','활동이나 행사에 참여한다는 의미로 participate in을 씁니다.');
fixed('collocation',/\baccording (to)\b/i,'to','by|of|for','어떤 정보나 기준에 따른다는 표현은 according to입니다.');
fixed('collocation',/\bon behalf (of)\b/i,'of','by|at|into','on behalf of는 사람이나 조직을 대신한다는 뜻입니다.');
fixed('link',/\bin spite (of)\b/i,'of','to|by|from','in spite of 뒤에 명사구가 이어져 어떤 상황에도 불구하고 일어난 일을 나타냅니다.');
fixed('link',/\bas soon (as)\b/i,'as','than|that|so','as soon as는 뒤 절의 일이 일어나자마자 다른 일이 이어짐을 나타냅니다.');
fixed('link',/\b(?:less|more) (than)\b/i,'than','as|that|so','비교급 more 또는 less 뒤에서 비교 대상을 이끄는 말은 than입니다.');
fixed('link',/\brather (than)\b/i,'than','as|so|that','rather than은 두 가지 선택이나 행동을 비교할 때 씁니다.');
fixed('relative',/\b(?:person|people|man|woman|employee|employees|manager|customer|customers|company|firm|student|students) (whose) [a-z]+\b/i,'whose','whom|who|where','뒤 명사와 앞 선행사의 소유 관계를 나타내므로 소유격 관계대명사 whose가 맞습니다.');
fixed('tense',/\b(?:has|have|had) (?:already |never |ever |just |recently |always )?(been)\b/i,'been','be|being|is','완료형의 조동사 have, has, had 뒤에는 과거분사가 옵니다. be의 과거분사형은 been입니다.');
fixed('modifier',/\b(?:be|was|were|is|are|been) (able) to [a-z]+/i,'able','ability|ably|abilities','be 뒤에는 주어의 상태를 설명하는 형용사가 필요합니다. be able to 다음에 동사원형을 붙여 능력을 나타냅니다.');
fixed('complement',/\b(?:agreed|decided|offered|managed|refused|promised|failed|hoped) (to) (?:send|take|go|give|come|help|provide|pay|buy|sell|make|meet|work|open|attend|return|accept|deliver|visit|start|finish|change|explain|join|leave|see|stay|do|call|write|answer)\b/i,'to','of|for|with','앞 동사에 이어지는 행동을 to부정사로 연결합니다. 다음에 동사원형이 있으므로 to가 필요합니다.');
fixed('conditional',/\bwould (have) (?:been|gone|seen|done|come|taken|known|made|given|bought|left|helped|finished)\b/i,'have','has|had|having','과거에 가능했을 결과를 나타내는 would have + 과거분사 구조입니다. 조동사 would 뒤에는 have의 원형을 씁니다.');
fixed('voice',/\b(?:must|should|will|can|could) (be) (?:sent|delivered|completed|submitted|approved|checked|replaced|cancelled|canceled|held|paid|returned|repaired|sold|used|found|seen|made|done|taken|given|written|built)\b/i,'be','being|been|is','주어가 동작의 대상이므로 조동사 뒤에 수동형 be + 과거분사가 옵니다. 조동사 바로 다음 자리는 원형 be입니다.');
const bases=Object.keys(forms).join('|');
for(const [adv,adjective,noun,other] of [
  ['completely','complete','completion','completes'],['highly','high','height','heighten'],
  ['extremely','extreme','extremes','extremity'],['particularly','particular','particulars','particularize'],
  ['especially','especial','specialty','specialize'],['relatively','relative','relation','relate'],
  ['equally','equal','equality','equalize'],['incredibly','incredible','incredibility','incredulity']
]){
  fixed('modifier',new RegExp('\\b('+adv+') (?:different|important|difficult|successful|expensive|interesting|useful|popular|effective|easy|complex|busy|accurate|high|low|skilled|competitive|unusual|safe|large|small|simple|hard|likely|common|rare|clear|satisfied|confident)\\b','i'),adv,[adjective,noun,other].join('|'),'뒤의 형용사가 나타내는 성질의 정도를 꾸미는 자리이므로 부사 '+adv+'가 알맞습니다.');
}
for(const [noun,wrong] of [
  ['decision','decide|decisive|decisively'],['agreement','agree|agreeable|agreeably'],
  ['permission','permitting|permissible|permissibly'],['improvement','improve|improved|improves'],
  ['application','apply|applicable|applicably'],['difference','differ|different|differently'],
  ['appointment','appoint|appointed|appointing'],['explanation','explain|explanatory|explained']
]){
  fixed('noun',new RegExp('\\b(?:a|an|the|my|his|her|our|their|your) (?:final |important |formal |written |big |new )?('+noun+') (?:to|with|between|for|from|about|of|on|at)\\b','i'),noun,wrong,'관사나 소유격이 이끄는 명사구의 중심어 자리입니다. 보기 중 명사 '+noun+'가 문장에 맞습니다.');
}
rules.push({topic:'complement',exp:new RegExp('\\b(?:should|must|could|will|would) (?:not |also |never |always )?('+bases+')\\b','i'),
  get:word=>[word,forms[word][2],forms[word][3],'to '+word],
  why:'조동사 바로 뒤의 본동사는 주어의 수와 관계없이 원형으로 씁니다.'});
const pastForms=Object.values(forms).filter(parts=>parts[0]!==parts[1]);
rules.push({topic:'tense',exp:new RegExp('\\b(?:has|have|had) (?:already |just |never |recently |ever |always )?('+pastForms.map(v=>v[1]).join('|')+')\\b','i'),
  get:word=>{const f=pastForms.find(v=>v[1]===word);return [word,f[0],f[2],f[3]];},
  why:'have, has 또는 had 다음에는 과거분사를 써서 완료형을 만듭니다.'});
const business=/\b(?:compan(?:y|ies)|office|work|worked|working|project|business|manager|customer|clients?|meetings?|reports?|sales|order|orders|products?|appointments?|employees?|travel|airport|flight|train|hotels?|tickets?|reservations?|documents?|school|students?|research|money|prices?|cost|bank|purchases?|market|letters?|emails?|e-mail|suppl\w+|deliver\w*|service|service[s]?|job|store|shop|books?|libraries|library|conference|schedule|application|staff|team|interview|factory|industry|insurance|building|restaurant|dinner|lunch|plan|plans|contract|information|repairs?|station|museum|town|city|transportation|trip|university|education|language|english|study|lesson|class|college|prepar\w+|computer|department|program|postal|design|train(?:ing)?|members?|software|committee|organization|government|address|advice|problem|request|questions?|deadline|rent|advertis\w*|skills?|material|machines?|equipment|weather|bus|presentation|tickets?)\b/i;
const inappropriate=/\b(?:kill\w*|murder\w*|suicid\w*|rap(?:e|ed|ist)|fuck\w*|shit\w*|bitch\w*|sex\w*|drunk|racis\w*|asshole|idiot|stupid|slav\w*|terroris\w*|gun|bomb|die|died|dead|naked|porn\w*)\b/i;
for(const rule of rules) rule.exp=new RegExp(rule.exp.source,rule.exp.flags+'d');
function convert(line,lang) {
  const [en,translation,credit]=line.trim().split('\t');
  if(!en || !credit || !translation || !/^[A-Z][A-Za-z0-9 ,'.?!():$%’–-]{25,235}[.!?]$/.test(en))return;
  const length=en.split(/\s+/).length;
  if(length<7 || length>30 || inappropriate.test(en) || (lang!=='kor' && !business.test(en)))return;
  const ids=credit.match(/#(\d+) \(([^()]*?)\) & #(\d+) \(([^()]*?)\)/);
  if(!ids || !credit.startsWith('CC-BY 2.0 (France)'))return;
  const question=questionFromText(en);
  if(!question)return;
  return {...question,id:'corpus-'+ids[1],genre:'work',meaning:lang==='kor'?translation:'',
    credit:lang==='kor'?credit:'CC-BY 2.0 (France) Attribution: tatoeba.org #'+ids[1]+' ('+ids[2]+')'};
}
function questionFromText(en){
  for(const rule of rules){
    const match=rule.exp.exec(en);
    if(!match)continue;
    const word=match[1];
    const choices=rule.get(word.toLowerCase());
    if(new Set(choices).size!==4)continue;
    const capture=match.indices[1];
    const stem=en.slice(0,capture[0])+'____'+en.slice(capture[1]);
    if(capture[0]===0)for(let i=0;i<choices.length;i++)choices[i]=choices[i][0].toUpperCase()+choices[i].slice(1);
    return {topic:rule.topic,stem,answers:choices,why:rule.why,original:en,meaning:''};
  }
}
function readPack(bytes,lang) {
  const file=lang+'.txt';
  const unzipped=unzipSync(bytes,{filter:entry=>entry.name===file && entry.originalSize<=200*1024*1024});
  if(!unzipped[file])throw Error('문장 자료 형식을 확인할 수 없습니다.');
  const rows=[];const seen=new Set();
  for(const line of strFromU8(unzipped[file]).split('\n')){
    const q=convert(line,lang);
    if(q && !seen.has(q.stem.toLowerCase())){rows.push(q);seen.add(q.stem.toLowerCase());}
  }
  return rows;
}
module.exports={readPack,convert,questionFromText};
