'use strict';
// Original French sentences and Korean explanations. Rules were checked against the
// primary teaching references listed below; no textbook sentences are reproduced.
const FRENCH_QUESTION_SOURCES=[
  ['TV5MONDE · 프랑스어 문법 학습','https://apprendre.tv5monde.com/fr/aides/grammaire'],
  ['TV5MONDE · 관계대명사','https://apprendre.tv5monde.com/fr/aides/grammaire-les-pronoms-relatifs-qui-que-dont-ou'],
  ['TV5MONDE · 목적대명사','https://apprendre.tv5monde.com/fr/aides/grammaire-les-pronoms-complements'],
  ['TV5MONDE · 접속법','https://apprendre.tv5monde.com/fr/aides/grammaire-le-subjonctif'],
  ['OQLF · si 뒤의 법과 시제','https://vitrinelinguistique.oqlf.gouv.qc.ca/21324/la-grammaire/le-verbe/modes/concordance-des-temps/mode-verbal-apres-si'],
  ['OQLF · être를 사용하는 과거분사의 일치','https://vitrinelinguistique.oqlf.gouv.qc.ca/24222/la-grammaire/le-verbe/accord-du-participe-passe/avec-lauxiliaire-etre/synthese-des-regles-daccord-du-participe-passe-employe-avec-etre'],
  ['Académie française · après que와 직설법','https://www.academie-francaise.fr/apres-que'],
  ['OQLF · fait + 동사원형의 불변성','https://vitrinelinguistique.oqlf.gouv.qc.ca/21710/la-grammaire/le-verbe/accord-du-participe-passe/cas-particuliers-daccord-du-participe-passe/invariabilite-du-participe-passe-fait-suivi-dun-infinitif'],
  ['OQLF · ni로 연결한 주어의 일치','https://vitrinelinguistique.oqlf.gouv.qc.ca/21490/la-grammaire/le-verbe/accord-du-verbe-avec-le-sujet/sujets-joints-par-une-conjonction/accord-du-verbe-avec-des-sujets-unis-par-ni'],
  ['TV5MONDE · 소유형용사의 일치','https://apprendre.tv5monde.com/fr/aides/grammaire-les-possessifs-mon-ma-mes-etc'],
  ['OQLF · avoir 과거분사의 일치','https://vitrinelinguistique.oqlf.gouv.qc.ca/24221/la-grammaire/le-verbe/accord-du-participe-passe/avec-lauxiliaire-avoir/synthese-des-regles-daccord-du-participe-passe-employe-avec-avoir']
];
const FRENCH_QUESTIONS=(()=>{
  // Every row is a deliberately paired action/object/translation, not arbitrary
  // word substitution. Gender and number describe the direct object, not its owner.
  const actions=[
    ['daily','fermer','la fenêtre','f',false,'창문을 닫','à la maison','집에서'],
    ['daily','ranger','la chambre','f',false,'방을 정리하','avant le dîner','저녁 식사 전에'],
    ['daily','réparer','le réveil','m',false,'자명종을 수리하','dans le salon','거실에서'],
    ['travel','réserver','la chambre','f',false,'객실을 예약하','pour le voyage','여행을 위해'],
    ['travel','visiter','le musée','m',false,'박물관을 방문하','pendant le séjour','체류하는 동안'],
    ['travel','chercher','le quai','m',false,'승강장을 찾','à la gare','역에서'],
    ['school','terminer','le devoir','m',false,'숙제를 끝내','avant le cours','수업 전에'],
    ['school','préparer','la présentation','f',false,'발표를 준비하','à la bibliothèque','도서관에서'],
    ['school','expliquer','la règle','f',false,'규칙을 설명하','en classe','교실에서'],
    ['sport','entraîner',"l'équipe",'f',false,'팀을 훈련시키','au stade','경기장에서'],
    ['sport','regarder','le match','m',false,'경기를 보','avec le club','동호회 사람들과'],
    ['sport','pratiquer','le tennis','m',false,'테니스를 하','au centre sportif','체육 시설에서'],
    ['food','acheter','le pain','m',false,'빵을 사','à la boulangerie','빵집에서'],
    ['food','couper','les légumes','m',true,'채소를 자르','dans la cuisine','부엌에서'],
    ['food','goûter','la soupe','f',false,'수프를 맛보','avant le repas','식사 전에'],
    ['work','envoyer','le courriel','m',false,'이메일을 보내','depuis le bureau','사무실에서'],
    ['work','rédiger','le rapport','m',false,'보고서를 작성하','pour la réunion','회의를 위해'],
    ['work','organiser','la réunion','f',false,'회의를 준비하','avec les collègues','동료들과'],
    ['health','soigner','le patient','m',false,'환자를 돌보','à la clinique','진료소에서'],
    ['health','nettoyer','la plaie','f',false,'상처를 씻','avec précaution','조심스럽게'],
    ['health','protéger','la forêt','f',false,'숲을 보호하','avec les bénévoles','자원봉사자들과'],
    ['culture','écouter','le concert','m',false,'연주회를 듣','à la radio','라디오로'],
    ['culture','dessiner','le portrait','m',false,'초상화를 그리','dans un atelier','작업실에서'],
    ['culture','photographier','le monument','m',false,'기념물을 촬영하','pendant la visite','관람하는 동안']
  ].map(([genre,inf,obj,gender,plural,ko,place,placeKo])=>({genre,inf,obj,gender,plural,ko,place,placeKo}));
  const koObjects=['창문','방','자명종','객실','박물관','승강장','숙제','발표','규칙','팀','경기','테니스','빵','채소','수프','이메일','보고서','회의','환자','상처','숲','연주회','초상화','기념물'];
  const koPast=['닫았습니다','정리했습니다','수리했습니다','예약했습니다','방문했습니다','찾았습니다','끝냈습니다','준비했습니다','설명했습니다','훈련시켰습니다','봤습니다','했습니다','샀습니다','잘랐습니다','맛봤습니다','보냈습니다','작성했습니다','준비했습니다','돌봤습니다','씻었습니다','보호했습니다','들었습니다','그렸습니다','촬영했습니다'];
  const koModifier=['닫은','정리한','수리한','예약한','방문한','찾은','끝낸','준비한','설명한','훈련시킨','본','한','산','자른','맛본','보낸','작성한','준비한','돌본','씻은','보호한','들은','그린','촬영한'];
  const particle=(word,pair)=>word+pair[(word.charCodeAt(word.length-1)-44032)%28===0?1:0];
  actions.forEach((a,i)=>{a.objectKo=koObjects[i];a.pastKo=koPast[i];a.pastModifier=koModifier[i];});
  const nouns=[
    ['fenêtre','f','fermée','fermé','fermés','fermées','창문','닫힌'],['chambre','f','propre','propre','propres','propres','방','깨끗한'],['réveil','m','neuf','neuve','neufs','neuves','자명종','새'],
    ['billet','m','cher','chère','chers','chères','표','비싼'],['valise','f','lourde','lourd','lourds','lourdes','여행 가방','무거운'],['voyage','m','long','longue','longs','longues','여행','긴'],
    ['cahier','m','neuf','neuve','neufs','neuves','공책','새'],['question','f','précise','précis','précis','précises','질문','정확한'],['exercice','m','court','courte','courts','courtes','연습 문제','짧은'],
    ['ballon','m','rond','ronde','ronds','rondes','공','둥근'],['chaussure','f','neuve','neuf','neufs','neuves','신발','새'],['piscine','f','profonde','profond','profonds','profondes','수영장','깊은'],
    ['pain','m','chaud','chaude','chauds','chaudes','빵','따뜻한'],['salade','f','froide','froid','froids','froides','샐러드','차가운'],['couteau','m','pointu','pointue','pointus','pointues','칼','뾰족한'],
    ['rapport','m','complet','complète','complets','complètes','보고서','완전한'],['réunion','f','courte','court','courts','courtes','회의','짧은'],['bureau','m','neuf','neuve','neufs','neuves','책상','새'],
    ['médicament','m','nouveau','nouvelle','nouveaux','nouvelles','약','새'],['forêt','f','verte','vert','verts','vertes','숲','푸른'],['promenade','f','longue','long','longs','longues','산책','긴'],
    ['tableau','m','ancien','ancienne','anciens','anciennes','그림','오래된'],['chanson','f','nouvelle','nouveau','nouveaux','nouvelles','노래','새'],['guitare','f','petite','petit','petits','petites','기타','작은']
  ].map(([noun,gender,adj,opposite,mp,fp,ko,adjKo])=>({noun,gender,adj,opposite,mp,fp,ko,adjKo}));
  const destinations=[
    ['salon','m','거실'],['cuisine','f','부엌'],['jardin','m','정원'],
    ['musée','m','박물관'],['gare','f','역'],['port','m','항구'],
    ['lycée','m','고등학교'],['bibliothèque','f','도서관'],['école','f','학교'],
    ['stade','m','경기장'],['piscine','f','수영장'],['gymnase','m','체육관'],
    ['marché','m','시장'],['boulangerie','f','빵집'],['restaurant','m','식당'],
    ['bureau','m','사무실'],['banque','f','은행'],['usine','f','공장'],
    ['hôpital','m','병원'],['clinique','f','진료소'],['parc','m','공원'],
    ['théâtre','m','극장'],['galerie','f','미술관'],['cinéma','m','영화관']
  ].map(([noun,gender,ko])=>({noun,gender,ko}));
  const pronouns=['Je','Tu','Elle','Nous','Vous','Ils'], pronounsKo=['나는','너는','그녀는','우리는','당신은/여러분은','그들은'];
  const presentEnding=['e','es','e','ons','ez','ent'],imperfectEnding=['ais','ais','ait','ions','iez','aient'];
  const futureEnding=['ai','as','a','ons','ez','ont'],conditionalEnding=imperfectEnding;
  const etre=['suis','es','est','sommes','êtes','sont'],avoir=['ai','as','a','avons','avez','ont'],aller=['vais','vas','va','allons','allez','vont'];
  const finite=['닫습니다','정리합니다','수리합니다','예약합니다','방문합니다','찾습니다','끝냅니다','준비합니다','설명합니다','훈련시킵니다','봅니다','합니다','삽니다','자릅니다','맛봅니다','보냅니다','작성합니다','준비합니다','돌봅니다','씻습니다','보호합니다','듣습니다','그립니다','촬영합니다'];
  const vowel=s=>/^[aeiouyhàâäéèêëîïôöùûüœ]/iu.test(s);
  const negative=v=>vowel(v)?"n'":'ne ';
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  const def=n=>vowel(n.noun)?"l'"+n.noun:(n.gender==='f'?'la ':'le ')+n.noun;
  const to=d=>vowel(d.noun)?"à l'"+d.noun:(d.gender==='f'?'à la ':'au ')+d.noun;
  const from=d=>vowel(d.noun)?"de l'"+d.noun:(d.gender==='f'?'de la ':'du ')+d.noun;
  function root(a,p=0){let s=a.inf.slice(0,-2);if(![3,4].includes(p)){
    if(a.inf==='acheter')s='achèt';if(a.inf==='envoyer')s='envoi';if(a.inf==='nettoyer')s='nettoi';if(a.inf==='protéger')s='protèg';
  }return s;}
  function present(a,p){let s=root(a,p);if(p===3&&s.endsWith('g'))s+='e';return s+presentEnding[p];}
  function imperfect(a,p){let s=a.inf.slice(0,-2);if(s.endsWith('g')&&![3,4].includes(p))s+='e';return s+imperfectEnding[p];}
  const futureStem=a=>({acheter:'achèter',envoyer:'enverr',nettoyer:'nettoier'}[a.inf]||a.inf);
  const future=(a,p)=>futureStem(a)+futureEnding[p];
  const conditional=(a,p)=>futureStem(a)+conditionalEnding[p];
  const pp=a=>a.inf.slice(0,-2)+'é';
  const agree=(word,gender,plural)=>word+(gender==='f'?'e':'')+(plural?'s':'');
  function subject(p,following){return p===0&&vowel(following)?"J'":pronouns[p]+' ';}
  function clause(a,p,verb,tail=true){return subject(p,verb)+verb+' '+a.obj+(tail?' '+a.place:'');}
  function forms(correct,wrong){const values=[correct,...wrong].filter((x,i,a)=>a.indexOf(x)===i);if(values.length<4)throw Error('Need distinct options for '+correct);return values.slice(0,4);}
  const passiveKo=["창문이 닫혔습니다","방이 정리되었습니다","자명종이 수리되었습니다","객실이 예약되었습니다","박물관에 방문객이 다녀갔습니다","승강장이 안내되었습니다","숙제가 끝났습니다","발표가 준비되었습니다","규칙이 설명되었습니다","팀이 훈련을 받았습니다","경기가 시청되었습니다","테니스 경기가 진행되었습니다","빵이 구매되었습니다","채소가 잘렸습니다","수프를 맛보았습니다","이메일이 발송되었습니다","보고서가 작성되었습니다","회의가 준비되었습니다","환자가 돌봄을 받았습니다","상처가 세척되었습니다","숲이 보호되었습니다","연주회가 청취되었습니다","초상화가 그려졌습니다","기념물이 촬영되었습니다"];
  const questions=[];
  function pattern(topic,label,stage,rule,make,source=0){
    actions.forEach((a,i)=>{
      const result=make(a,i,nouns[i],destinations[i]),[stem,answer,wrong,meaning,detail='']=result;
      if(!stem.includes('____')||stem.split('____').length!==2)throw Error(topic+' blank');
      questions.push({key:'fr-g-'+topic+'-'+(i+1),topic,label,stage,genre:a.genre,stem,answer,options:forms(answer,wrong),meaning,reading:'',why:rule+' '+detail,sourceUrl:FRENCH_QUESTION_SOURCES[source][1]});
    });
  }
  // Stage 1: person, grammatical gender, determiners and basic sentence structure.
  pattern('etre-person','être 현재형과 인칭',1,'être는 주어의 인칭·수에 맞춰 suis, es, est, sommes, êtes, sont로 활용합니다. 주어가 여성이라는 이유로 동사 어미를 바꾸지는 않습니다.',(a,i,n,d)=>{const p=i%6;return [pronouns[p]+' ____ '+to(d)+'.',etre[p],etre.filter(x=>x!==etre[p]),pronounsKo[p]+' '+d.ko+'에 있습니다.',pronouns[p]+'에 맞는 형태는 '+etre[p]+'입니다.'];});
  pattern('avoir-person','avoir 현재형과 인칭',1,'소유를 말하는 avoir의 현재형은 ai, as, a, avons, avez, ont입니다. 소유물의 성이 아니라 주어의 인칭·수로 동사형을 고릅니다.',(a,i,n)=>{const p=i%6;return [(p===0?"J'":pronouns[p]+' ')+'____ '+(n.gender==='f'?'une ':'un ')+n.noun+'.',avoir[p],avoir.filter(x=>x!==avoir[p]),pronounsKo[p]+' '+particle(n.ko,['을','를'])+' 가지고 있습니다.',pronouns[p]+'의 현재형은 '+avoir[p]+'입니다.'];});
  pattern('present-person','-er 동사의 인칭 활용',1,'현재 직설법의 -er 동사는 인칭별 어미를 붙입니다. acheter, envoyer, nettoyer 등의 어간 변화와 ranger, rédiger의 nous형 철자도 함께 확인하세요.',(a,i)=>{const p=i%6;return [subject(p,present(a,p))+'____ '+a.obj+' '+a.place+'.',present(a,p),[present(a,(p+1)%6),present(a,(p+3)%6),a.inf,pp(a),present(a,4)],pronounsKo[p]+' '+a.placeKo+' '+a.ko+'는 중입니다.',a.inf+'의 '+pronouns[p]+'형은 '+present(a,p)+'입니다.'];});
  pattern('definite-gender','정관사와 명사의 성',1,'단수 정관사는 남성 le, 여성 la이며 모음이나 무음 h 앞에서는 l’로 축약합니다. 사람의 실제 성별과 사물 명사의 문법적 성을 구별하세요.',(a,i,n)=>{const art=vowel(n.noun)?"l'":n.gender==='f'?'la':'le';return ['Voici ____'+(art.endsWith("'")?'':' ')+n.noun+' dont nous parlons.',art,['le','la','les','aux'].filter(x=>x!==art),'이것이 우리가 이야기하고 있는 그 '+n.ko+'입니다.',n.noun+'는 '+(n.gender==='f'?'여성':'남성')+' 단수 명사입니다.'];},1);
  pattern('indefinite-gender','부정관사 un과 une',1,'셀 수 있는 단수 명사를 처음 소개할 때 남성은 un, 여성은 une를 씁니다. -e로 끝난다는 이유만으로 모든 명사를 여성으로 판단하지 마세요.',(a,i,n)=>['Voici ____ '+n.noun+'.',n.gender==='f'?'une':'un',['un','une','uns','unes'].filter(x=>x!==(n.gender==='f'?'une':'un')),'여기에 '+n.ko+' 하나가 있습니다.',n.noun+'의 문법적 성에 관사를 맞춥니다.']);
  pattern('adjective-agreement','형용사의 성·수 일치',1,'형용사는 꾸미는 명사와 성·수를 맞춥니다. 명사 소유자의 성별이 기준은 아닙니다. 형용사마다 여성형·복수형 철자가 다를 수 있습니다.',(a,i,n)=>{const plural=i%3===0,noun=destinations[i];const ans=agree('fermé',noun.gender,plural);const fr=plural?'Les '+noun.noun+(noun.noun==='hôpital'?'': 's'):cap(def(noun));const pluralNoun=noun.noun==='hôpital'&&plural?'Les hôpitaux':noun.noun==='bureau'&&plural?'Les bureaux':fr;return [pluralNoun+' '+(plural?'sont':'est')+' ____.',ans,['fermé','fermée','fermés','fermées'].filter(x=>x!==ans),(plural?'그 여러 ':'그 ')+particle(noun.ko,['은','는'])+' 닫혀 있습니다.',noun.noun+'는 '+(noun.gender==='f'?'여성':'남성')+'이며 이 문장에서는 '+(plural?'복수':'단수')+'입니다.'];});
  pattern('demonstratives','ce·cet·cette·ces',1,'지시형용사는 남성 단수 ce, 모음·무음 h 앞 남성 단수 cet, 여성 단수 cette, 복수 ces입니다. cet은 여성형이 아닙니다.',(a,i,n)=>{const answer=n.gender==='f'?'cette':vowel(n.noun)?'cet':'ce';return ['Je regarde ____ '+n.noun+'.',answer,['ce','cet','cette','ces'].filter(x=>x!==answer),'나는 이 '+particle(n.ko,['을','를'])+' 보고 있습니다.',n.noun+'의 성·수와 첫소리를 확인하세요.'];});
  pattern('possessives','소유형용사는 소유물에 일치',1,'한 사람의 소유를 나타내는 son/sa는 소유물의 성에 따릅니다. 여성 단수 명사도 모음·무음 h 앞에서는 sa 대신 son을 씁니다. 소유자가 여성이라고 항상 sa를 쓰지 않습니다.',(a,i,n)=>{const answer=n.gender==='m'||vowel(n.noun)?'son':'sa';return [cap(def(n))+' appartient à Léa. Voici ____ '+n.noun+'.',answer,['son','sa','ses','leurs'].filter(x=>x!==answer),'그 '+particle(n.ko,['은','는'])+' 레아의 것입니다. 이것이 그녀의 '+n.ko+'입니다.',possessionHint(n)+'에 따라 '+answer+' 형태를 씁니다.'];},9);
  function possessionHint(n){return n.noun+'의 성·수와 첫소리';}
  pattern('negative-pas','ne…pas 부정문',1,'기본 부정문은 활용 동사 앞의 ne/n’와 뒤의 pas로 만듭니다. 여기서는 특정 목적어를 정관사와 함께 그대로 두고 그 행동을 하지 않는다고 말합니다.',a=>['Nous '+negative(present(a,3))+present(a,3)+' ____ '+a.obj+' '+a.place+'.','pas',['personne','aucun','rien'],'우리는 '+a.placeKo+' '+a.ko+'지 않습니다.','직접목적어가 뒤에 이미 있으므로 personne/rien을 새 목적어로 넣지 않습니다.']);
  pattern('preposition-contraction','à·de와 정관사의 축약',1,'à + le는 au, de + le는 du로 축약합니다. 여성 la와 모음 앞 l’는 합쳐지지 않습니다. 문장의 이동 방향인지 출발점인지 먼저 확인하세요.',(a,i,n,d)=>{const direction=i%2===0,expected=direction?to(d):from(d),answer=expected.slice(0,-d.noun.length).trim();return ['Nous '+(direction?'allons':'revenons')+' ____'+(answer.endsWith("'")?'':' ')+d.noun+'.',answer,direction?['à le','de le','aux','du','à la'].filter(x=>x!==answer):['de le','à le','des','au','du'].filter(x=>x!==answer),'우리는 '+d.ko+(direction?'에 갑니다.':'에서 돌아옵니다.'),'정확한 연결은 '+expected+'입니다.'];});
  // Stage 2: time, basic relative clauses and complement pronouns.
  pattern('near-future','aller + 동사원형',2,'가까운 미래는 현재형 aller 뒤에 동사원형을 놓습니다. 두 동사를 모두 현재형으로 활용하지 않습니다.',(a,i)=>{const p=i%6;return ['Dans un instant, '+pronouns[p].toLowerCase()+' '+aller[p]+' ____ '+a.obj+' '+a.place+'.',a.inf,[present(a,3),pp(a),future(a,3)],'잠시 뒤 '+pronounsKo[p]+' '+a.placeKo+' '+a.ko+'려고 합니다.','aller 뒤에는 '+a.inf+' 원형이 필요합니다.'];});
  pattern('perfect-auxiliary','복합과거의 avoir',2,'복합과거는 주어에 맞는 avoir 현재형과 과거분사를 결합합니다. 이 문장의 타동사는 avoir를 사용합니다.',(a,i)=>{const p=i%6;return ['Hier, '+(p===0?"j'":pronouns[p].toLowerCase()+' ')+'____ '+pp(a)+' '+a.obj+' '+a.place+'.',avoir[p],avoir.filter(x=>x!==avoir[p]),'어제 '+pronounsKo[p]+' '+a.placeKo+' '+particle(a.objectKo,['을','를'])+' '+a.pastKo+'.',a.inf+'의 과거분사는 '+pp(a)+'이고 조동사는 '+avoir[p]+'입니다.'];});
  pattern('perfect-participle','과거분사와 동사원형 구별',2,'avoir 조동사 뒤에는 과거분사가 옵니다. -er 동사의 과거분사는 보통 -é입니다. 직접목적어가 뒤에 있으므로 여기서는 주어 성별에 따른 일치를 하지 않습니다.',a=>['Hier, nous avons ____ '+a.obj+' '+a.place+'.',pp(a),[a.inf,present(a,4),imperfect(a,3)],'어제 우리는 '+a.placeKo+' '+particle(a.objectKo,['을','를'])+' '+a.pastKo+'.',a.inf+' → '+pp(a)+'입니다.'],5);
  pattern('etre-past-agreement','être 복합과거와 일치',2,'이동 동사 arriver의 복합과거는 être를 사용하고, 과거분사는 주어의 성·수에 일치합니다. 이 문장은 여성 두 사람이 주어이므로 -ées가 필요합니다.',(a,i,n,d)=>['Léa et sa sœur sont ____ '+to(d)+' à neuf heures.','arrivées',['arrivé','arrivée','arrivés'],'레아와 그녀의 자매는 아홉 시에 '+d.ko+'에 도착했습니다.','여성 복수 주어이므로 sont arrivées입니다.'],5);
  pattern('imperfect-habit','반과거와 과거의 습관',2,'과거에 반복하던 일은 반과거로 표현합니다. nous/vous형의 -ions/-iez와 -ger 동사의 철자를 확인하세요.',(a,i)=>{const p=i%6;return ['À cette époque, '+subject(p,imperfect(a,p)).toLowerCase()+'____ '+a.obj+' '+a.place+' chaque semaine.',imperfect(a,p),[future(a,p),a.inf,pp(a)],'그 시절 '+pronounsKo[p]+' 매주 '+a.placeKo+' '+a.ko+'곤 했습니다.',a.inf+'의 '+pronouns[p]+' 반과거는 '+imperfect(a,p)+'입니다.'];});
  pattern('simple-future','단순미래와 불규칙 어간',2,'단순미래는 미래 어간에 -ai/-as/-a/-ons/-ez/-ont를 붙입니다. envoyer는 enverr-, acheter는 achèter-처럼 확인할 어간이 있습니다.',(a,i)=>{const p=i%6;return ['Demain, '+subject(p,future(a,p)).toLowerCase()+'____ '+a.obj+' '+a.place+'.',future(a,p),[conditional(a,p),a.inf,pp(a)],'내일 '+pronounsKo[p]+' '+a.placeKo+' '+a.ko+'는 일을 할 것입니다.','현재 계획을 미래의 사실로 말하므로 '+future(a,p)+'를 선택합니다.'];});
  pattern('relative-qui','주어 역할의 관계대명사 qui',2,'관계절 안에서 동작의 주어가 빠져 있으면 qui를 씁니다. qui 뒤의 동사는 선행사의 수에 맞춥니다.',a=>['Voici la personne ____ '+present(a,2)+' '+a.obj+' '+a.place+'.','qui',['que','dont','où'],'이 사람이 '+a.placeKo+' '+a.ko+'는 사람입니다.','뒤에 별도의 주어가 없으므로 qui가 '+present(a,2)+'의 주어입니다.'],1);
  pattern('relative-que','직접목적어 역할의 que',2,'관계절 안에 주어와 동사는 있지만 직접목적어가 빠져 있으면 que를 씁니다. que는 모음 앞에서 qu’로 축약될 수 있습니다.',a=>['Voici '+a.obj+' ____ nous '+present(a,3)+' '+a.place+'.','que',['qui','dont','où'],'이것이 우리가 '+a.placeKo+' '+a.ko.slice(a.ko.lastIndexOf(' ')+1)+'는 '+a.objectKo+'입니다.','nous가 주어이고 '+a.obj+'에 해당하는 직접목적어가 빠졌습니다.'],1);
  pattern('direct-object-pronoun','직접목적대명사 le·la·les',2,'정관사가 붙은 직접목적어를 대신할 때 남성 단수 le, 여성 단수 la, 복수 les를 씁니다. 대명사는 활용 동사 앞에 오며 모음 앞 le/la는 l’가 됩니다.',(a,i)=>{const answer=a.plural?'les':vowel(present(a,3))?"l'":a.gender==='f'?'la':'le';return [cap(a.obj)+' ? Nous ____'+(answer.endsWith("'")?'':' ')+present(a,3)+' '+a.place+'.',answer,['le','la','les','lui','leur'].filter(x=>x!==answer),'그 대상 말인가요? 우리는 '+a.placeKo+' 그것을 '+finite[i]+'.',a.obj+'를 받는 대명사는 '+answer+'입니다.'];},2);
  pattern('reflexive-person','재귀대명사의 인칭',2,'se préparer처럼 재귀동사는 주어에 맞는 me/te/se/nous/vous/se를 함께 씁니다. 모음 앞 me/te/se는 m’/t’/s’가 됩니다.',(a,i,n,d)=>{const p=i%6,ref=['me','te','se','nous','vous','se'][p];return [pronouns[p]+' ____ '+present({inf:'préparer'},p)+' pour aller '+to(d)+'.',ref,['me','te','se','nous','vous'].filter(x=>x!==ref),pronounsKo[p]+' '+d.ko+'에 가려고 준비합니다.','주어 '+pronouns[p]+'에 대응하는 재귀대명사는 '+ref+'입니다.'];});
  // Stage 3: hypotheses, reference, comparison and orders.
  pattern('conditional-present','조건법 현재의 결과절',3,'si + 반과거로 가정을 제시하면 그 결과는 보통 조건법 현재로 표현합니다. 조건법은 미래 어간에 반과거 어미를 붙입니다.',a=>['Si nous avions plus de temps, nous ____ '+a.obj+' '+a.place+'.',conditional(a,3),[future(a,3),present(a,3),a.inf],'시간이 더 있다면 우리는 '+a.placeKo+' '+a.ko+'는 일을 할 텐데요.','nous 조건법은 '+conditional(a,3)+'입니다.'],4);
  pattern('si-imperfect','가정절 si + 반과거',3,'현재 사실과 거리가 있는 가정은 si절에 반과거, 결과절에 조건법 현재를 씁니다. 조건을 뜻하는 si 뒤에 조건법을 직접 넣지 않습니다.',a=>['Si nous ____ '+a.obj+' '+a.place+' plus tôt, nous aurions plus de temps libre.',imperfect(a,3),[conditional(a,3),future(a,3),a.inf],'우리가 '+a.ko+'는 일을 더 일찍 한다면 자유 시간이 더 생길 텐데요.','조건절에 필요한 반과거는 '+imperfect(a,3)+'입니다.'],4);
  pattern('pluperfect','대과거와 과거보다 앞선 일',3,'다른 과거 시점보다 먼저 완료된 일은 avoir/être의 반과거와 과거분사로 나타냅니다. 여기서는 nous avions + 과거분사입니다.',a=>['Quand Léa est arrivée, nous ____ déjà '+pp(a)+' '+a.obj+'.','avions',['avons','aurons','ayons'],'레아가 도착했을 때 우리는 이미 '+a.ko+'는 일을 마친 상태였습니다.','도착보다 먼저 끝난 일이라 avions '+pp(a)+'를 씁니다.']);
  pattern('gerund','en + 현재분사',3,'같은 주어가 하는 동시 행동이나 수단은 en + 현재분사로 나타냅니다. 현재분사는 nous 현재형의 -ons를 -ant로 바꾸는 것이 기본이며 불변형입니다.',a=>{const ant=present(a,3).slice(0,-3)+'ant';return ['Nous discutons en ____ '+a.obj+' '+a.place+'.',ant,[a.inf,pp(a),present(a,3)],'우리는 '+a.placeKo+' '+a.ko+'면서 이야기합니다.','현재분사는 '+ant+'이며 성·수에 맞춰 -e/-s를 붙이지 않습니다.'];});
  pattern('comparative','plus…que 비교',3,'우등 비교는 plus + 형용사 + que로 만듭니다. de는 수량 구조 등에 쓰이며 비교 대상을 연결하는 que와 구별해야 합니다.',(a,i,n)=>[cap(def(n))+' est plus utile ____ je ne le pensais.','que',['de','à','dont'],'그 '+particle(n.ko,['은','는'])+' 내가 생각했던 것보다 더 유용합니다.','비교의 두 번째 부분을 que로 연결합니다. 여기의 ne는 부정을 뜻하지 않는 허사입니다.']);
  pattern('superlative','최상급과 정관사',3,'특정 집합에서 가장 높은 정도를 말할 때 정관사 + plus + 형용사를 씁니다. 정관사는 해당 명사의 성·수에 일치합니다.',(a,i,n)=>{const answer=n.gender==='f'?'la':'le';return ['Dans cette liste, '+def(n)+' est ____ plus utile.',answer,['le','la','les','du'].filter(x=>x!==answer),'이 목록에서 그 '+particle(n.ko,['이','가'])+' 가장 유용합니다.',n.noun+'의 '+(n.gender==='f'?'여성':'남성')+' 단수에 맞춥니다.'];});
  pattern('pronoun-y','장소를 대신하는 y',3,'y는 à/dans 등의 장소 보어를 대신할 수 있고 활용 동사 앞에 옵니다. 사람을 가리키는 lui/leur와 구별하세요.',(a,i,n,d)=>['Nous allons '+to(d)+'. Nous ____ allons ensemble.','y',['en','lui','leur'],'우리는 '+d.ko+'에 갑니다. 그곳에 함께 갑니다.',to(d)+'라는 목적지를 y가 받습니다.'],2);
  pattern('pronoun-en','de 보어를 대신하는 en',3,'en은 de로 연결된 사물·내용 보어 또는 수량 표현의 명사를 대신할 수 있습니다. 여기서는 parler de의 대상을 받습니다.',(a,i,n)=>['Nous parlons '+from(n)+'. Nous ____ parlons souvent.','en',['y','le','lui'],'우리는 그 '+n.ko+'에 관해 이야기합니다. 그것에 관해 자주 이야기합니다.','parler de + 명사에서 de 보어를 en으로 바꿉니다.'],2);
  pattern('indirect-object','간접목적대명사 lui·leur',3,'parler à quelqu’un에서 사람 간접목적어는 단수 lui, 복수 leur로 받습니다. lui는 남성과 여성 모두에게 쓸 수 있습니다.',(a,i,n)=>{const plural=i%2===1;return ['Nous expliquons quelque chose à '+(plural?'Léa et Paul':'Léa')+' au sujet '+from(n)+'. Nous ____ parlons calmement.',plural?'leur':'lui',[plural?'lui':'leur','les','le'],'우리는 '+(plural?'레아와 폴':'레아')+'에게 '+n.ko+'에 관해 설명합니다. 그 사람'+(plural?'들':'')+'에게 차분하게 말합니다.','대상이 '+(plural?'두 사람':'한 사람')+'이므로 '+(plural?'leur':'lui')+'입니다.'];},2);
  pattern('imperative-vous','vous 명령형',3,'여러 사람이나 정중한 상대에게 지시하는 vous 명령형은 현재형 vous와 같은 형태를 쓰고 주어 대명사는 생략합니다.',a=>['Madame, ____ '+a.obj+' '+a.place+", s'il vous plaît.",present(a,4),[present(a,3),a.inf,pp(a)],'정중한 부탁: '+a.placeKo+' '+a.ko+'는 일을 해 주세요.','정중한 vous형 명령은 '+present(a,4)+'입니다.']);
  // Stage 4: mood, agreement and complex relative constructions.
  pattern('subjunctive-necessity','필요 표현과 접속법',4,'Il faut que 뒤에서는 접속법을 씁니다. avoir의 nous 접속법은 ayons이며 뒤에는 동사원형이 아니라 명사구가 올 수 있습니다.',a=>['Il faut que nous ____ le temps '+(vowel(a.inf)?"d'":'de ')+a.inf+' '+a.obj+'.','ayons',['avons','aurons','avions'],'우리가 '+a.ko+'는 일을 할 시간이 있어야 합니다.','직설법 avons와 접속법 ayons를 구별합니다.'],3);
  pattern('subjunctive-before','avant que와 접속법',4,'avant que는 아직 실현되지 않은 사건을 앞세우므로 접속법을 사용합니다. nous 접속법의 -ions는 현재 직설법 -ons와 다릅니다.',a=>{const answer=imperfect(a,3);return ['Vérifiez les détails avant que nous ____ '+a.obj+' '+a.place+'.',answer,[present(a,3),future(a,3),a.inf],'우리가 '+a.ko+'기 전에 세부 사항을 확인하세요.','이 동사의 nous 접속법 현재는 '+answer+'입니다. 반과거와 철자가 같아도 여기서는 접속법 용법입니다.'];},3);
  pattern('subjunctive-concession','bien que 양보절',4,'bien que로 양보를 표현할 때 접속법을 씁니다. être의 접속법은 sois/soit/soyons/soyez/soient이며 직설법과 구별합니다.',(a,i,n,d)=>['Bien que nous ____ loin '+from(d)+', nous voulons y aller.','soyons',['sommes','serons','étions'],'우리는 '+d.ko+'에서 멀리 있지만 그곳에 가고 싶습니다.','bien que nous soyons가 맞습니다.'],3);
  pattern('subjunctive-purpose','afin que 목적절',4,'afin que + 접속법은 다른 주어가 실현하기를 바라는 목적을 나타냅니다. pouvoir의 vous 접속법은 puissiez입니다.',a=>['Je vous laisse du temps afin que vous ____ '+a.inf+' '+a.obj+'.','puissiez',['pouvez','pourrez','pourriez'],'당신이 '+a.ko+'는 일을 할 수 있도록 시간을 드립니다.','목적절의 접속법은 puissiez이며 뒤에는 동사원형이 옵니다.'],3);
  pattern('past-preceding-object','avoir와 앞선 직접목적어 일치',4,'avoir 과거분사는 직접목적어가 앞에 있을 때 그 목적어와 성·수를 맞춥니다. 주어 nous의 성별을 기준으로 삼지 않습니다.',a=>{const answer=agree(pp(a),a.gender,a.plural);return ['Voici '+a.obj+' que nous avons ____ hier '+a.place+'.',answer,[pp(a),pp(a)+'e',pp(a)+'s',pp(a)+'es'].filter(x=>x!==answer),'이것이 우리가 어제 '+a.pastModifier+' '+a.objectKo+'입니다.','que가 받는 '+a.obj+'는 '+(a.gender==='f'?'여성':'남성')+' '+(a.plural?'복수':'단수')+'이므로 '+answer+'입니다.'];},10);
  pattern('passive-agreement','수동태의 과거분사 일치',4,'수동태 être + 과거분사는 행동을 받는 주어와 성·수를 맞춥니다. 복합과거 수동태 a/ont été에서도 마지막 과거분사의 일치는 유지됩니다.',(a,i)=>{const base=i===5?'indiqué':pp(a),answer=agree(base,a.gender,a.plural);return [cap(a.obj)+' '+(a.plural?'ont':'a')+' été ____ hier '+a.place+'.',answer,[base,base+'e',base+'s',base+'es'].filter(x=>x!==answer),'어제 '+a.placeKo+' '+passiveKo[i]+'.','수동태 주어 '+a.obj+'에 맞는 분사는 '+answer+'입니다.'];},5);
  pattern('relative-dont','de 보어를 받는 dont',4,'parler de처럼 de를 요구하는 표현의 보어를 관계절로 연결하면 dont를 씁니다. que는 직접목적어를 받으므로 역할이 다릅니다.',(a,i,n)=>['Voici '+def(n)+' ____ nous avons parlé hier.','dont',['que','qui','où'],'이것이 우리가 어제 이야기했던 '+n.ko+'입니다.','parler de '+def(n)+'의 de 보어를 dont가 받습니다.'],1);
  pattern('relative-lequel','전치사 뒤 lequel의 일치',4,'복합 관계대명사 lequel/laquelle/lesquels/lesquelles는 선행사의 성·수에 일치합니다. 이 문장은 sur 뒤에 단수 사물·내용을 받습니다.',(a,i,n)=>{const answer=n.gender==='f'?'laquelle':'lequel';return ['Voici '+def(n)+' sur ____ porte la discussion.',answer,['lequel','laquelle','lesquels','lesquelles'].filter(x=>x!==answer),'이것이 토론이 다루고 있는 '+n.ko+'입니다.',n.noun+'의 '+(n.gender==='f'?'여성':'남성')+' 단수를 받습니다.'];},1);
  pattern('inversion-t','의문문 도치의 -t-',4,'모음으로 끝난 3인칭 단수 동사와 il/elle/on을 도치할 때 발음 연결용 -t-를 넣습니다. 명사 주어는 앞에 두고 대명사로 다시 받습니다.',a=>['Léa '+present(a,2)+'____elle '+a.obj+' '+a.place+' ?','-t-',['-','-s-','-es-'],'레아는 '+a.placeKo+' '+a.ko+'나요?','정확한 연결은 '+present(a,2)+'-t-elle입니다.']);
  pattern('past-infinitive','après avoir + 과거분사',4,'주어가 같은 두 행동에서 먼저 끝난 일은 après avoir/être + 과거분사로 표현할 수 있습니다. après 다음에 현재형 avons를 넣지 않습니다.',a=>['Après ____ '+pp(a)+' '+a.obj+', nous sommes rentrés.','avoir',['avons','ayant','ayons'],'우리는 '+a.ko+'는 일을 마친 후 돌아왔습니다.','이 타동사에는 après avoir '+pp(a)+'가 필요합니다.']);
  // Stage 5: advanced sequence, agreement traps and pronoun chains.
  pattern('si-pluperfect','과거 반사실 가정',5,'과거에 실현되지 않은 일을 가정하면 si + 대과거와 조건법 과거를 연결합니다. 조건을 뜻하는 si절에는 aurions가 아니라 avions를 씁니다.',a=>['Si nous ____ '+pp(a)+' '+a.obj+' hier, nous aurions gagné du temps.','avions',['aurions','ayons','aurons'],'어제 우리가 '+a.ko+'는 일을 했더라면 시간을 아꼈을 텐데요.','si nous avions '+pp(a)+'가 과거 반사실 조건입니다.'],4);
  pattern('conditional-past','조건법 과거의 결과',5,'과거 가정의 이루어지지 않은 결과는 avoir/être의 조건법과 과거분사로 표현합니다. nous aurions + 과거분사가 조건법 과거입니다.',a=>['Si nous avions eu assez de temps hier, nous ____ '+pp(a)+' '+a.obj+'.','aurions',['avions','avons','aurons'],'어제 시간이 충분했더라면 우리는 '+a.ko+'는 일을 했을 텐데요.','결과절에는 aurions '+pp(a)+'를 씁니다.'],4);
  pattern('future-perfect','미래완료와 선행 완료',5,'미래의 기준 시점보다 먼저 끝날 일은 avoir/être의 미래형과 과거분사로 표현합니다. 여기서는 nous aurons가 필요합니다.',a=>['Quand vous arriverez demain, nous ____ déjà '+pp(a)+' '+a.obj+'.','aurons',['aurions','ayons','avoir'],'당신이 내일 도착할 때 우리는 이미 '+a.ko+'는 일을 마쳤을 것입니다.','미래 기준 시점보다 앞선 완료이므로 aurons '+pp(a)+'입니다.']);
  pattern('subjunctive-past','접속법 과거',5,'후회·감정을 나타내는 regretter que 뒤에서는 접속법을 씁니다. 이미 지난 일을 말하면 avoir/être 접속법 현재와 과거분사로 접속법 과거를 만듭니다.',a=>["Je regrette que vous n'____ pas "+pp(a)+' '+a.obj+' hier.','ayez',['avez','aviez','aurez'],'당신이 어제 '+a.ko+'는 일을 하지 않은 것이 유감입니다.','vous 접속법 과거는 ayez '+pp(a)+'입니다.'],3);
  pattern('causative-fait','faire 사역과 불변 과거분사',5,'faire의 과거분사 fait 바로 뒤에 동사원형이 오는 사역 구문에서는 fait를 불변형으로 씁니다. 앞에 직접목적어가 있어도 faite/faits/faites로 일치시키지 않습니다.',a=>['Voici '+a.obj+' que nous avons ____ '+a.inf+' hier.','fait',['faite','faits','faites'],'이것이 우리가 어제 다른 사람에게 '+a.ko+'게 했던 대상입니다.','fait + '+a.inf+' 구조의 fait는 불변형입니다.'],7);
  pattern('double-object-pronouns','직접·간접목적대명사 순서',5,'평서문에서 3인칭 직접목적대명사 le/la/les는 간접목적대명사 lui/leur보다 앞에 옵니다. 주어진 상대가 한 사람이면 lui이고, 직접목적어는 명사의 성·수에 맞춥니다.',(a,i,n)=>{const direct=n.gender==='f'?'la':'le';return ['Je montre '+def(n)+' à Léa. Je ____ montre.',direct+' lui',['lui '+direct,direct+' leur','leur '+direct],'나는 레아에게 그 '+particle(n.ko,['을','를'])+' 보여 줍니다. 나는 그것을 그녀에게 보여 줍니다.','직접목적어 '+direct+' 다음에 단수 사람을 받는 lui를 놓습니다.'];},2);
  pattern('ni-subject-agreement','ni…ni로 연결한 주어',5,'이 문장에서는 서로 다른 두 사람을 ni…ni로 연결하므로 동사는 3인칭 복수로 일치시킵니다. ne는 동사 앞에 놓습니다.',a=>['Ni Léa ni Paul '+negative(present(a,5))+'____ '+a.obj+' '+a.place+'.',present(a,5),[present(a,4),present(a,3),a.inf],'레아도 폴도 '+a.placeKo+' '+a.ko+'지 않습니다.','두 사람을 받는 동사 형태는 '+present(a,5)+'입니다.'],8);
  pattern('chacun-agreement','chacun과 단수 일치',5,'Chacun de + 복수 명사라도 문장의 중심 주어 chacun은 단수입니다. 뒤의 복수 명사만 보고 동사를 복수로 만들지 마세요.',a=>['Chacun des bénévoles ____ '+a.obj+' '+a.place+' avec soin.',present(a,2),[present(a,5),present(a,3),a.inf],'자원봉사자 각자가 '+a.ko+'는 일을 정성껏 합니다.','chacun이 주어이므로 3인칭 단수 '+present(a,2)+'입니다.']);
  pattern('faute-de-past','faute de와 과거 부정사',5,'faute de + 명사/부정사는 무엇이 부족하거나 실현되지 않아 생긴 원인을 나타냅니다. 과거에 하지 못한 행동은 faute d’avoir + 과거분사로 만들 수 있습니다.',a=>["Faute d'____ "+pp(a)+' '+a.obj+' à temps, nous avons dû reporter la suite.','avoir',['avons','ayons','ayant'],'우리는 제때 '+a.ko+'는 일을 하지 못해서 다음 일정을 미뤄야 했습니다.','전치사 de 뒤에는 활용형이 아니라 과거 부정사 avoir '+pp(a)+'가 옵니다.']);
  pattern('after-indicative','après que와 직설법',5,'표준적인 문어 문법에서 après que는 완료된 사실을 말하므로 직설법을 씁니다. 접속법을 쓰는 avant que와 혼동하지 마세요.',a=>['Après que nous ____ '+pp(a)+' '+a.obj+' hier, nous sommes rentrés.','avons',['ayons','aurions','avoir'],'어제 우리는 '+a.ko+'는 일을 한 후 돌아왔습니다.','확정된 과거 사실이므로 직설법 복합과거 avons '+pp(a)+'를 씁니다.'],6);
  return questions;
})();
if(typeof module!=='undefined')module.exports=FRENCH_QUESTIONS;
