'use strict';
// French paradigms supplement lessons; learner character gender never controls answers.
Object.assign(GRAMMAR_FORM_SOURCES,{
  frPerson:{label:'TV5MONDE · 인칭대명사와 il/elle/on',url:'https://apprendre.tv5monde.com/fr/aides/grammaire-comment-utiliser-les-pronoms-personnels-sujets'},
  frAdjectives:{label:'TV5MONDE · 형용사의 성·수 일치',url:'https://apprendre.tv5monde.com/fr/aides/grammaire-laccord-et-la-place-des-adjectifs-0'},
  frPossessives:{label:'TV5MONDE · 소유한정사와 mon amie',url:'https://apprendre.tv5monde.com/fr/aides/grammaire-les-possessifs-mon-ma-mes-etc'},
  frPast:{label:'TV5MONDE · 복합과거와 과거분사 일치',url:'https://apprendre.tv5monde.com/fr/aides/grammaire-le-passe-compose-et-ses-particularites'},
  frPronominal:{label:'OQLF · 대명동사의 과거분사 일치',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/22942/la-grammaire/le-verbe/accord-du-participe-passe/avec-lauxiliaire-etre/accord-du-participe-passe-des-verbes-occasionnellement-pronominaux'},
  frFuture:{label:'TV5MONDE · 단순미래와 불규칙 어간',url:'https://apprendre.tv5monde.com/fr/aides/grammaire-le-futur-simple'},
  frPlural:{label:'OQLF · œil의 복수 yeux와 예외',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/24007/la-grammaire/le-nom/pluriel-des-noms/pluriel-et-sens-du-nom/sens-de-yeux-et-oeils'}
});
Object.assign(GRAMMAR_FORM_TABLES,{
  frPerson:{caption:'인칭·수는 동사를 바꾸고, 성은 일치하는 형용사를 바꿉니다',headers:['주어','être 현재','parler 현재','형용사 일치'],rows:[
    ['je · 나','suis','parle','성별·문법 문맥에 따라 prêt / prête'],
    ['tu · 너','es','parles','prêt / prête'],
    ['il / elle · 그·그녀·그것','est','parle','il est prêt / elle est prête'],
    ['nous · 우리','sommes','parlons','prêts / prêtes'],
    ['vous · 여러분·정중한 당신','êtes','parlez','단수/복수·성에 맞춰 prêt(e)(s)'],
    ['ils / elles · 그들·그것들','sont','parlent','ils sont prêts / elles sont prêtes']],
    note:'il/elle는 사람뿐 아니라 명사의 문법적 성에 따라 사물도 가리킵니다. on은 동사가 3인칭 단수(on parle)입니다. 구어에서 특정한 우리를 뜻하면 형용사·일부 분사는 실제 지칭 대상에 따라 복수 일치할 수 있습니다. vous는 한 사람을 공손하게 부를 때도 동사는 복수형입니다.'},
  frGender:{caption:'명사의 성과 수: 어말만으로 추측하지 않기',headers:['표현','복수·일치 예','핵심 구별'],rows:[
    ['un livre / une table','des livres / des tables','사물 명사에도 문법적 성이 있음'],
    ['un problème / une main','un problème difficile / une petite main','-e로 끝난다고 모두 여성은 아님'],
    ['une personne / une victime','une personne blessée','가리키는 사람이 남성이어도 명사와 여성 일치'],
    ['un cheval / un journal','des chevaux / des journaux','많은 -al 명사의 -aux 복수'],
    ['un bal / un festival','des bals / des festivals','-al 복수에도 예외가 있음'],
    ['un œil','des yeux','눈이라는 일상 뜻의 불규칙 복수'],
    ['mon livre / ma maison','mes livres / mes maisons','소유자의 성별이 아니라 뒤 명사의 성·수'],
    ['mon amie','mes amies','amie는 여성: 모음 앞에서 ma 대신 mon']],
    note:'l’는 le/la가 생략된 형태라서 그것만으로 명사의 성을 알 수 없습니다. beau/belle, nouveau/nouvelle처럼 형용사에도 특수형이 있고, rouge처럼 남녀 형태가 같은 형용사도 있습니다. œil은 일부 복합어·전문 용법에서는 œils가 됩니다.'},
  frIrregular:{caption:'기본 불규칙 현재형을 인칭별로 함께 익히기',headers:['주어','avoir','aller','faire','venir'],rows:[
    ['je','ai → j’ai','vais','fais','viens'],['tu','as','vas','fais','viens'],['il / elle / on','a','va','fait','vient'],['nous','avons','allons','faisons','venons'],['vous','avez','allez','faites','venez'],['ils / elles','ont','vont','font','viennent']],
    note:'aller는 -er로 끝나지만 parler와 같은 규칙 동사가 아닙니다. il과 elle의 동사형은 같습니다. nous mangeons·nous commençons 같은 발음을 유지하기 위한 철자 변화와 viens/venons 같은 어간 변화도 구별하세요.'},
  frAgreement:{caption:'과거분사: 조동사와 직접목적어 위치를 먼저 확인',headers:['구조','예문','일치 판단'],rows:[
    ['être + 이동동사','Elles sont arrivées.','이 문장에서는 주어 여성 복수에 일치'],
    ['avoir + 뒤 목적어','Elle a écrit une lettre.','주어가 여성이어도 écrit 유지'],
    ['avoir + 앞 직접목적어','La lettre qu’il a écrite.','앞에 온 lettre가 여성 단수'],
    ['대명동사: se가 직접목적어','Elles se sont lavées.','앞 직접목적어 se와 일치'],
    ['대명동사: 뒤 직접목적어','Elles se sont lavé les mains.','les mains가 뒤에 있으므로 lavé 유지'],
    ['대명동사: se가 간접목적어','Elles se sont parlé.','parler à quelqu’un이므로 parlé 유지']],
    note:'être가 보인다는 이유만으로 모든 대명동사의 분사를 주어에 맞추면 틀립니다. 직접목적어와 간접목적어를 구별하세요. 수동태, 본질적 대명동사, 분사 뒤 부정사 등은 해당 수업의 추가 규칙을 확인합니다.'},
  frPronouns:{caption:'목적대명사의 자리와 명령문',headers:['상황','예문','순서·주의점'],rows:[
    ['일반 평서문','Je le lui donne.','le/la/les → lui/leur'],
    ['인칭 목적어 포함','Elle me le montre.','me/te/se/nous/vous → le/la/les'],
    ['y와 en','Il y en a deux.','y → en'],
    ['긍정 명령문','Donnez-le-moi.','동사 뒤 하이픈, le → moi'],
    ['부정 명령문','Ne me le donnez pas.','동사 앞 일반 순서'],
    ['부정사 목적어','Je vais le lire.','le는 lire의 목적어이므로 lire 앞']],
    note:'일반적인 순서는 me/te/se/nous/vous → le/la/les → lui/leur → y → en입니다. 모든 묶음을 한 문장에 동시에 쓰는 것은 아닙니다. 긍정 명령문과 부정문을 구별하고, 두 동사가 있으면 어느 동사의 목적어인지 먼저 판단하세요.'},
  frStems:{caption:'미래·조건법의 불규칙 어간과 과거분사',headers:['원형','단순미래 je','조건법 현재 je','과거분사'],rows:[
    ['être','serai','serais','été'],['avoir','aurai','aurais','eu'],['aller','irai','irais','allé'],['faire','ferai','ferais','fait'],['venir','viendrai','viendrais','venu'],['voir','verrai','verrais','vu'],['pouvoir','pourrai','pourrais','pu'],['vouloir','voudrai','voudrais','voulu']],
    note:'미래와 조건법 현재는 이 불규칙 어간을 공유하지만 어미가 다릅니다. 표의 과거분사는 기본형이며 조동사와 문장 구조에 따라 일치가 필요합니다. si가 조건을 도입할 때 si j’avais…, je ferais…처럼 시제 조합을 따로 익힙니다.'}
});
GRAMMAR_FORM_GUIDES.fr={name:'프랑스어',tables:['frPerson','frGender'],facts:[
  '프랑스어 명사는 사람·동물·사물 모두 문법적 성이 있습니다. 관사·형용사는 명사의 성·수에 일치하며, il/elle는 사물도 가리킵니다. une personne처럼 실제 대상의 성별과 명사의 성이 다른 경우도 있습니다.',
  'Il parle와 Elle parle의 동사는 같습니다. Je parle, Tu parles, Nous parlons처럼 동사는 인칭·수에 따라 변합니다. vous는 공손한 단수와 복수 모두 가능하고, on은 동사를 3인칭 단수로 활용합니다.',
  'être·avoir·aller·faire 같은 불규칙 동사를 인칭별로 익히세요. 과거분사는 être/avoir와 직접목적어 위치, 대명동사인지에 따라 일치가 달라집니다. 소유한정사 son/sa도 소유자의 성별이 아니라 뒤 명사를 기준으로 합니다.'
],sources:['frPerson','frAdjectives','frPossessives','frPast','frPronominal','frFuture']};
GRAMMAR_COMPARISON.rows.push(['프랑스어','명사의 성과 관사·형용사·일부 분사 일치','il parle / elle parle; nous parlons','불규칙 어간, 분사 일치, 목적대명사 순서']);
for(const [level,index,tableIds,sourceIds]of [
  ['A1',12,['frPerson'],['frPerson']],['A1',13,['frGender'],['frAdjectives','frPossessives','frPlural']],
  ['A2',12,['frIrregular'],['frPerson']],['A2',13,['frAgreement'],['frPast','frPronominal']],
  ['B1',12,['frPronouns'],['frPerson']],['B1',13,['frStems'],['frFuture']]
]){
  const lesson=GRAMMAR_COURSES.fr.levels[level][index];lesson.formTables=tableIds;
  for(const id of sourceIds){const ref=GRAMMAR_FORM_SOURCES[id];if(!lesson.references.some(r=>r.url===ref.url))lesson.references.push(ref);}
}
