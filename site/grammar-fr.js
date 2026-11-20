'use strict';
// Original Korean explanations and sentence exercises; CEFR labels are an internal study sequence.
(()=>{
const refs={
 basic:{label:'TV5MONDE · 프랑스어 문법 학습',url:'https://apprendre.tv5monde.com/fr/aides/grammaire'},
 articles:{label:'TV5MONDE · 관사와 소개 표현',url:'https://apprendre.tv5monde.com/fr/aides/grammaire-le-presentatif-les-articles-definis-et-indefinis-0'},
 plural:{label:'TV5MONDE · 명사 복수형',url:'https://apprendre.tv5monde.com/fr/aides/grammaire-le-pluriel-des-noms-les-articles-indefinis-un-une-des'},
 avoir:{label:'OQLF · avoir와 과거분사의 일치',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/21546/la-grammaire/le-verbe/accord-du-participe-passe/avec-lauxiliaire-avoir/accord-du-participe-passe-employe-avec-lauxiliaire-avoir'},
 etre:{label:'OQLF · être와 과거분사의 일치',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/21547/la-grammaire/le-verbe/accord-du-participe-passe/avec-lauxiliaire-etre/accord-du-participe-passe-employe-avec-lauxiliaire-etre'},
 conjunction:{label:'OQLF · 접속사에 따른 직설법·접속법',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/24238/la-grammaire/le-verbe/modes/subjonctif/subjonctif-ou-indicatif-apres-les-subordonnants-composes'},
 time:{label:'OQLF · avant que와 après que',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/21132/la-grammaire/le-verbe/modes/concordance-des-temps/mode-verbal-avec-apres-que-et-avant-que'},
 si:{label:'OQLF · si 뒤의 동사법',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/21324/la-grammaire/le-verbe/modes/concordance-des-temps/mode-verbal-apres-si'},
 advanced:{label:'OQLF · 프랑스어 문법·표기 자료',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/'},
 pp:{label:'OQLF · 과거분사 일치의 특수 사례',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/24221/la-grammaire/le-verbe/accord-du-participe-passe/avec-lauxiliaire-avoir/synthese-des-regles-daccord-du-participe-passe-employe-avec-avoir'},
 reflexive:{label:'OQLF · 대명동사 분사의 일치',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/24222/la-grammaire/le-verbe/accord-du-participe-passe/avec-lauxiliaire-etre/synthese-des-regles-daccord-du-participe-passe-employe-avec-etre'},
 causative:{label:'OQLF · fait + 원형의 불변',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/21710/la-grammaire/le-verbe/accord-du-participe-passe/cas-particuliers-daccord-du-participe-passe/invariabilite-du-participe-passe-fait-suivi-dun-infinitif'},
 expletive:{label:'OQLF · 부정이 아닌 ne',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/22467/la-syntaxe/la-negation-et-la-restriction/constructions-avec-un-ne-expletif'},
 tout:{label:'OQLF · 부사 tout의 예외적 일치',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/22907/la-grammaire/ladverbe/tout-employe-comme-adverbe'},
 perception:{label:'OQLF · 원형이 뒤따르는 과거분사',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/21859/la-grammaire/le-verbe/accord-du-participe-passe/avec-lauxiliaire-avoir/accord-du-participe-passe-suivi-dun-infinitif'},
 subjunctive:{label:'OQLF · 접속법 네 시제의 활용',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/24237/la-grammaire/le-verbe/conjugaison/formes-du-subjonctif'},
 literary:{label:'OQLF · 단순과거의 현대 쓰임',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/24209/la-grammaire/le-verbe/temps-grammaticaux/passe/declin-du-passe-simple-et-ses-emplois-actuels'},
 compound:{label:'OQLF · 단순시제와 복합시제',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/24658/la-grammaire/le-verbe/temps-grammaticaux/temps-simples-et-temps-composes'},
 literaryCondition:{label:'OQLF · 문학적 접속법 대과거와 가정',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/24141/la-grammaire/le-verbe/temps-grammaticaux/conditionnel/conditionnel-passe-et-plus-que-parfait-du-subjonctif'},
 quantity:{label:'OQLF · la plupart의 동사 일치',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/21650/la-grammaire/le-verbe/accord-du-verbe-avec-le-sujet/sujet-qui-est-un-nom-collectif/accord-du-verbe-avec-la-plupart-de'},
 quelque:{label:'OQLF · quelque와 quel que',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/21570/la-grammaire/les-homophones-grammaticaux/les-homophones-quelque-et-quel-que'},
 quoique:{label:'OQLF · quoique와 quoi que',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/21571/la-grammaire/les-homophones-grammaticaux/les-homophones-quoique-et-quoi-que'},
 neutral:{label:'OQLF · 성을 드러내지 않는 대명사와 일치',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/23989/banque-de-depannage-linguistique/la-redaction-et-la-communication/feminisation-et-redaction-epicene/redaction-epicene/designations-neutres/pronoms-dont-la-forme-ne-varie-pas'}
};
const course=GRAMMAR_COURSES.fr={sources:[['TV5MONDE · 초급부터 문법 학습',refs.basic.url],['OQLF · 문법·활용 검토',refs.advanced.url]],levels:{A1:[],A2:[],B1:[],B2:[],C1:[],C2:[]}};
function add(level,title,pattern,explanation,steps,pitfall,rows,source='basic'){
 const practice=rows.map((row,i)=>{const r=row.split('|');return {id:'practice-'+(i+1),question:/[’']$/.test(r[1])?r[0].replace('___ ','___'):r[0],options:r.slice(1,4),answer:0,translation:r[4],why:r[5],reading:''};});
 const examples=practice.map(q=>({sentence:q.question.replace('___',q.options[0]).replace(/\s+\([^()]*\)$/,''),translation:q.translation,analysis:q.why,reading:''}));
 course.levels[level].push({title,pattern,explanation,steps:steps.split('|'),pitfall,practice,examples,example:examples[0].sentence,translation:examples[0].translation,reading:'',references:[refs[source],refs.basic,refs.advanced].filter((r,i,a)=>a.findIndex(x=>x.url===r.url)===i)});
}
add('A1','주어와 être로 첫 문장 만들기','je suis · tu es · il/elle est · nous sommes · vous êtes · ils/elles sont','프랑스어에서는 보통 주어 대명사를 말하고 동사를 인칭·수에 맞춥니다. être는 신분·특징·상태를 말하는 기본 동사이며, 규칙 어미를 붙여 만들 수 없는 불규칙형입니다.',['누구를 말하는지 주어부터 정합니다.','être의 현재형을 인칭에 맞춥니다.','직업명만 말할 때는 보통 관사 없이 Il est médecin처럼 연결합니다.'].join('|'),'il과 elle의 동사는 모두 est입니다. 남녀 구분과 동사의 인칭·수 일치를 서로 다른 규칙으로 생각하세요.',[
'Je ___ étudiant.|suis|es|sommes|저는 학생입니다.|je에 대응하는 être의 현재형은 suis입니다.',
'Nous ___ à la bibliothèque.|sommes|sont|êtes|우리는 도서관에 있습니다.|nous는 1인칭 복수이므로 sommes를 씁니다.',
'Vous ___ professeur ?|êtes|est|suis|선생님이신가요?|정중한 단수 vous도 동사는 êtes로 활용합니다.',
'Les enfants ___ contents.|sont|sommes|est|아이들이 기뻐합니다.|복수 주어 les enfants에 맞는 형태는 sont입니다.'
]);
add('A1','avoir로 소유·나이·감각 말하기','j’ai · tu as · il a · nous avons · vous avez · ils ont','avoir는 물건의 소유뿐 아니라 나이, 배고픔, 목마름에 쓰입니다. 한국어의 ‘스무 살이다’를 être로 옮기지 않고 avoir와 수량을 조합합니다. je ai는 모음이 충돌하므로 j’ai로 적습니다.','소유·나이·감각 중 말할 의미를 정합니다.|ai·as·a·avons·avez·ont 중 주어에 맞는 형태를 고릅니다.|나이는 ans, 감각은 faim·soif와 연결합니다.','Il est vingt ans는 틀립니다. Il a vingt ans라고 말하며, il a와 il y a도 구별해야 합니다.',[
'J’___ vingt ans.|ai|est|as|저는 스무 살입니다.|나이는 avoir로 표현하고 je형은 ai입니다.',
'Tu ___ un billet ?|as|a|ont|너 표가 있니?|tu에 맞는 avoir는 as입니다.',
'Nous ___ soif après le match.|avons|sommes|ont|우리는 경기 후 목이 마릅니다.|목마름은 avoir soif이고 nous형은 avons입니다.',
'Elles ___ deux chats.|ont|sont|avons|그녀들은 고양이 두 마리를 기릅니다.|소유를 나타내는 avoir의 3인칭 복수 ont입니다.'
]);
add('A1','관사와 명사의 문법적 성','un/une/des · le/la/l’/les','명사는 사람뿐 아니라 사물에도 남성·여성이라는 문법적 분류가 있습니다. 처음 소개하는 대상에는 un·une·des, 문맥에서 특정되는 대상에는 le·la·les를 쓰는 것이 기본입니다. 모음이나 무음 h 앞의 le·la는 l’이 됩니다.','새 명사는 관사와 한 묶음으로 외웁니다.|특정 대상인지 처음 소개하는 대상인지 구별합니다.|명사의 성·수와 모음 시작 여부를 보고 관사를 고릅니다.','명사 끝의 철자만으로 성을 완전히 예측할 수 없습니다. l’école처럼 축약되면 관사만으로 성이 드러나지 않으므로 une école도 함께 익히세요.',[
'C’est ___ table ronde.|une|un|des|이것은 둥근 탁자 하나입니다.|table은 여성 단수이므로 부정관사 une가 필요합니다.',
'Voici ___ livres de Léa.|les|le|la|여기 레아의 책들이 있습니다.|livres는 복수이고 소유 관계로 특정되어 les를 씁니다.',
'___ hôtel est près de la gare.|L’|Le|La|그 호텔은 역 근처에 있습니다.|hôtel의 h는 무음이므로 le가 l’로 축약됩니다.',
'J’achète ___ vélo.|un|une|des|저는 자전거 한 대를 삽니다.|vélo는 남성 단수 명사이므로 un입니다.'
],'articles');
add('A1','형용사와 복수의 기본 일치','petit/petite · petits/petites','형용사는 자신이 설명하는 명사의 성·수와 일치합니다. 많은 형용사는 여성형에 -e, 복수형에 -s를 붙이지만 이미 -e인 경우나 불규칙형도 있습니다. 철자가 달라져도 발음이 같을 수 있으므로 읽기와 쓰기를 함께 연습합니다.','설명할 중심 명사를 찾습니다.|그 명사의 성과 단수·복수를 확인합니다.|형용사와 관사를 함께 맞추고 발음도 확인합니다.','여성형은 항상 별개 어휘가 아닙니다. rouge처럼 남녀가 같은 형용사도 있고, grand/grande처럼 철자와 발음이 달라지는 것도 있습니다.',[
'Les maisons sont ___.|petites|petit|petite|집들이 작습니다.|maisons는 여성 복수이므로 petites입니다.',
'Le sac est ___.|lourd|lourde|lourdes|가방이 무겁습니다.|sac은 남성 단수이므로 lourd를 씁니다.',
'Une robe ___ est sur le lit.|rouge|rouges|rougea|빨간 원피스 하나가 침대 위에 있습니다.|rouge는 남녀 형태가 같고 단수이므로 그대로입니다.',
'Les exercices sont ___.|faciles|facile|facilent|연습문제들이 쉽습니다.|exercices가 복수이므로 facile에 -s를 붙입니다.'
],'plural');
add('A1','-er 동사의 현재형','parler → parle, parles, parle, parlons, parlez, parlent','규칙적인 -er 동사는 어간에 인칭별 어미를 붙입니다. je·tu·il·ils형은 발음이 같아도 철자가 다르므로 주어를 보고 써야 합니다. -er로 끝나는 aller는 이 규칙에 들어가지 않는 중요한 예외입니다.','사전형의 -er를 떼고 어간을 확인합니다.|주어에 따라 -e/-es/-e/-ons/-ez/-ent를 붙입니다.|현재 행동뿐 아니라 반복 습관에도 현재형을 씁니다.','ils parlent의 -ent는 보통 소리 내지 않습니다. 철자 어미와 발음되는 음절 수를 혼동하지 마세요.',[
'Tu ___ français à l’école.|parles|parle|parlons|너는 학교에서 프랑스어를 말합니다.|tu에 대응하는 -er 어미는 -es입니다.',
'Nous ___ le dîner.|préparons|préparez|préparent|우리는 저녁을 준비합니다.|nous에는 -ons를 붙여 préparons가 됩니다.',
'Vous ___ près du musée.|habitez|habites|habitent|당신은 박물관 근처에 삽니다.|vous에는 -ez를 붙입니다.',
'Les élèves ___ la musique.|aiment|aime|aimez|학생들은 음악을 좋아합니다.|복수 주어에 맞는 aiment는 끝 -ent를 적지만 발음하지 않습니다.'
]);
add('A1','부정문과 부정 뒤의 de','ne…pas · ne…jamais · pas de','표준 문어의 기본 부정은 활용 동사를 ne와 pas로 감쌉니다. 모음 앞에서는 ne가 n’이 됩니다. 소유·수량을 부정할 때 부정관사와 부분관사는 보통 de로 바뀌지만 être 뒤의 분류나 대조에서는 유지될 수 있습니다.','활용 동사의 앞뒤에 ne와 pas를 둡니다.|모음 앞 ne는 n’로 적습니다.|부정되는 수량 앞의 un·une·des·du는 보통 de인지 확인합니다.','회화에서 ne가 생략되기도 하지만 이 과정의 표준 문장에는 표시합니다. Je n’aime pas le café처럼 일반적 취향의 정관사는 유지합니다.',[
'Je ne parle ___ allemand.|pas|de|que|저는 독일어를 하지 못합니다.|기본 부정을 완성하는 ne…pas입니다.',
'Elle n’a pas ___ voiture.|de|une|la|그녀는 차가 없습니다.|불특정 소유를 부정하므로 une voiture가 de voiture로 바뀝니다.',
'Nous n’aimons pas ___ bruit.|le|de|du|우리는 소음을 좋아하지 않습니다.|일반적인 대상을 나타내는 정관사 le는 부정에서도 유지합니다.',
'Ce n’est pas ___ problème.|un|de|des|그것은 문제가 아닙니다.|être 뒤에서 명사의 분류를 부정할 때 un을 유지합니다.'
]);
add('A1','질문 만들기와 의문형용사','est-ce que · où · quand · quel/quelle','질문은 억양, est-ce que, 도치 등으로 만들 수 있습니다. 초급에서는 est-ce que 뒤에 평서문 어순을 유지하면 편리합니다. quel은 뒤 명사의 성·수에 맞춰 quelle·quels·quelles로 변합니다.','예·아니요 질문인지 정보를 묻는 질문인지 정합니다.|est-ce que 뒤에는 주어와 동사 순서를 유지합니다.|명사 앞의 quel은 명사의 성·수에 맞춥니다.','Quel âge avez-vous ?의 âge는 남성입니다. 한국어의 의미상 사람 성별이 아니라 뒤 명사의 문법적 성을 기준으로 삼으세요.',[
'___ est-ce que le train part ? À huit heures.|Quand|Qui|Combien de|기차는 언제 출발하나요? 여덟 시에요.|시간을 묻고 있으므로 Quand가 맞습니다.',
'___ langues parlez-vous ?|Quelles|Quels|Quel|어떤 언어들을 하시나요?|langues는 여성 복수이므로 Quelles입니다.',
'Est-ce que vous ___ ici ?|travaillez|travaille|travaillons|여기서 일하시나요?|est-ce que 뒤의 vous에는 travaillez가 필요합니다.',
'___ habites-tu ? À Lyon.|Où|Quand|Quel|너는 어디에 사니? 리옹에 살아.|장소 답변에 대응하는 의문사는 Où입니다.'
]);
add('A1','소유형용사는 소유물에 맞추기','mon/ma/mes · ton/ta/tes · son/sa/ses','소유형용사는 소유자가 누구인지와 소유물의 성·수를 함께 나타냅니다. son livre의 son만으로 소유자가 남자인지 여자인지 알 수 없습니다. 여성 명사도 모음이나 무음 h로 시작하면 발음을 위해 mon·ton·son을 사용합니다.','소유자를 je·tu·il/elle 등으로 정합니다.|소유물의 성·수에 맞는 형태를 고릅니다.|여성 단수 모음 앞에는 ma 대신 mon인지 확인합니다.','그녀의 책도 son livre입니다. 그녀라는 이유로 sa livre라고 바꾸지 않습니다.',[
'Léa cherche ___ livre.|son|sa|ses|레아는 자신의 책을 찾습니다.|소유물 livre가 남성 단수이므로 소유자 성별과 무관하게 son입니다.',
'Voici ___ amie Julie.|mon|ma|mes|이쪽은 제 친구 쥘리입니다.|amie는 여성 단수이지만 모음 앞이므로 mon입니다.',
'Nous rangeons ___ affaires.|nos|notre|leurs|우리는 우리 물건들을 정리합니다.|소유자 nous와 복수 소유물 affaires에 맞는 nos입니다.',
'Tu as oublié ___ clé.|ta|ton|tes|너는 네 열쇠를 잊고 왔어.|clé는 여성 단수이므로 ta를 씁니다.'
]);
add('A1','가리키는 말과 강조 대명사','ce/cet/cette/ces · moi/toi/lui/elle','지시형용사는 명사 앞에서 이·그 대상을 가리킵니다. 남성 단수 모음 앞에서는 ce 대신 cet을 쓰며 여성은 cette입니다. 전치사 뒤나 강조 자리에서는 je 대신 moi 같은 강세형 대명사를 씁니다.','명사 앞의 지시형용사를 성·수에 맞춥니다.|남성 단수 모음 시작은 cet인지 확인합니다.|avec·chez 같은 전치사 뒤에는 강세형을 놓습니다.','cet homme와 cette femme의 발음은 비슷해도 철자와 문법적 성이 다릅니다. 전치사 뒤에 avec je라고 쓰지 않습니다.',[
'___ arbre est très vieux.|Cet|Ce|Cette|이 나무는 아주 오래되었습니다.|arbre는 남성 단수이고 모음으로 시작하여 Cet입니다.',
'___ chaussures sont confortables.|Ces|Cette|Cet|이 신발들은 편합니다.|복수 명사 앞에서는 성 구별 없이 Ces입니다.',
'Tu viens avec ___ ?|moi|je|me|너 나와 함께 갈래?|전치사 avec 뒤에는 강세형 moi를 씁니다.',
'Nous dînons chez ___.|elle|la|le|우리는 그녀의 집에서 저녁을 먹습니다.|chez 뒤의 사람 대명사는 강세형 elle입니다.'
]);
add('A1','장소 전치사와 관사 축약','à + le = au · de + les = des','장소·출발점 등을 말하는 à와 de는 정관사 le·les와 만나 축약합니다. la와 l’ 앞에서는 축약하지 않습니다. 도시 앞에는 주로 à를 쓰고 나라 앞 전치사는 성·수와 시작 소리에 따라 다르므로 나라 이름과 묶어 익힙니다.','장소인지 출발·소유 관계인지 보고 à 또는 de를 정합니다.|le·les와 만났는지 확인하여 au·aux·du·des로 줄입니다.|도시와 나라에 쓰는 전치사를 따로 확인합니다.','à la gare와 à l’école은 유지됩니다. 모든 관사를 au로 바꾸지 마세요.',[
'Je vais ___ cinéma.|au|à le|à la|저는 영화관에 갑니다.|à와 le cinéma가 결합하면 au cinéma입니다.',
'Elle revient ___ marché.|du|de le|de la|그녀는 시장에서 돌아옵니다.|de와 le marché가 결합하여 du가 됩니다.',
'Ils vont ___ États-Unis.|aux|en|au|그들은 미국에 갑니다.|복수 나라 이름 les États-Unis 앞에는 aux를 씁니다.',
'Nous habitons ___ France.|en|au|à la|우리는 프랑스에 삽니다.|여성 나라 이름 France 앞의 거주·이동 전치사는 en입니다.'
]);
add('A1','부분관사와 수량 표현','du/de la/de l’ · beaucoup de · un kilo de','음식처럼 셀 수 없는 양을 특정하지 않을 때 부분관사를 씁니다. 양을 나타내는 beaucoup·un kilo 같은 표현 뒤에는 보통 de가 옵니다. 일반적인 취향은 J’aime le pain처럼 정관사로 말하므로 두 용법을 구분합니다.','일반적인 종류인지 실제로 먹거나 사는 양인지 판단합니다.|불특정 양에는 명사의 성에 따라 du·de la를 씁니다.|수량 표현 뒤에는 de 또는 d’를 연결합니다.','beaucoup du pain은 일반적인 ‘빵이 많다’ 표현이 아닙니다. 특정 빵의 상당 부분 같은 별도 문맥과 구별하세요.',[
'Je bois ___ eau.|de l’|du|de la|저는 물을 마십니다.|eau는 모음으로 시작하여 부분관사는 de l’입니다.',
'Elle achète un kilo ___ pommes.|de|des|les|그녀는 사과 1킬로그램을 삽니다.|수량 단위 un kilo 뒤에는 de를 씁니다.',
'Nous mangeons ___ pain.|du|de la|des|우리는 빵을 먹습니다.|불특정 양의 남성 단수 pain에 du를 씁니다.',
'Il y a beaucoup ___ élèves.|d’|des|les|학생이 많이 있습니다.|beaucoup de가 모음 앞에서 beaucoup d’가 됩니다.'
]);
add('A1','가까운 미래와 il faut','aller + 동사원형 · il faut + 동사원형','계획이나 가까운 미래를 말할 때 aller를 현재형으로 활용하고 다음 동사는 원형으로 둡니다. il faut는 일반적인 필요·의무를 나타내는 비인칭 표현이므로 주어를 nous로 바꾸지 않습니다. 개인별 의무는 devoir와 비교해 익힙니다.','계획은 aller, 일반적 필요는 il faut를 고릅니다.|aller만 주어에 맞게 vais·vas·va·allons·allez·vont로 바꿉니다.|뒤에 올 행동 동사는 원형으로 유지합니다.','Je vais étudie처럼 두 동사를 모두 활용하지 마세요. Je vais étudier가 맞습니다.',[
'Demain, nous ___ visiter le musée.|allons|va|vont|내일 우리는 박물관을 방문할 예정입니다.|nous에 맞는 aller는 allons입니다.',
'Tu vas ___ ce soir.|étudier|étudies|étudié|너는 오늘 저녁 공부할 거야.|aller 뒤 행동은 원형 étudier입니다.',
'Il faut ___ le billet.|garder|gardez|gardé|표를 보관해야 합니다.|비인칭 il faut 뒤에는 동사원형 garder가 옵니다.',
'Elles ___ partir à midi.|vont|vais|allons|그녀들은 정오에 떠날 예정입니다.|elles에 대응하는 aller 현재형은 vont입니다.'
]);
add('A1','인칭과 성별을 따로 보기','il/elle mange · ils/elles mangent · prêt/prête','프랑스어 동사의 일반 활용은 주어의 인칭·수에 맞춰 바뀌고 il과 elle 사이에서 별도 여성형 동사가 생기지는 않습니다. 반면 형용사와 일부 과거분사는 성·수에 일치합니다. 동물도 명사·대명사의 성에 따라 말하므로 영어의 it과 일대일 대응하지 않습니다.','주어의 인칭과 단수·복수를 먼저 확인합니다.|동사 활용과 형용사의 성·수 일치를 따로 처리합니다.|동물·사물도 명사의 문법적 성을 확인합니다.','la personne가 남성을 가리켜도 이 명사에 직접 일치하는 형용사는 여성형입니다. 문법적 성과 실제 성별을 같게 취급하지 마세요.',[
'Elle ___ une pomme.|mange|manges|mangent|그녀는 사과를 먹습니다.|elle는 3인칭 단수이므로 il과 같은 mange를 씁니다.',
'Ils ___ dans le jardin.|jouent|joue|jouons|그들은 정원에서 놉니다.|성별이 아니라 3인칭 복수라는 점 때문에 jouent가 됩니다.',
'Léa est ___.|prête|prêt|prêts|레아는 준비가 되었습니다.|여성 단수 주어를 설명하는 형용사 prête입니다.',
'Cette personne est ___.|heureuse|heureux|heureuses|이 사람은 행복합니다.|personne는 문법적으로 여성 단수이므로 heureuse입니다.'
]);
add('A1','명사·형용사 변화의 예외','animal/animaux · beau/belle · vieux/vieille','복수 -s와 여성 -e는 기본 경향이지 모든 단어에 적용되는 공식은 아닙니다. animal→animaux, beau→belle처럼 형태를 함께 익혀야 하는 경우가 있습니다. 모음 앞 남성 단수의 bel·vieil은 여성형과도 구별됩니다.','명사의 성과 복수형을 사전에서 함께 확인합니다.|형용사의 남성·여성·복수 기본형을 묶어 익힙니다.|남성 단수 모음 앞 bel·nouvel·vieil인지 점검합니다.','un bel arbre의 bel은 여성형이 아닙니다. arbre가 남성인 채 발음 환경 때문에 사용하는 형태입니다.',[
'Les ___ vivent dans la forêt.|animaux|animals|animal|그 동물들은 숲에 삽니다.|animal의 표준 복수형은 animaux입니다.',
'C’est une ___ journée.|belle|beau|bel|좋은 하루입니다.|journée는 여성 단수이므로 belle입니다.',
'Voici un ___ ami.|vieil|vieille|vieuxs|여기 오래된 친구 한 명이 있습니다.|남성 단수 ami가 모음으로 시작하므로 vieil입니다.',
'Elle a les ___ bleus.|yeux|œils|œil|그녀는 눈이 파랗습니다.|일반적인 눈의 복수는 œil이 아니라 yeux입니다.'
],'plural');
add('A2','avoir로 만드는 복합과거','avoir 현재형 + 과거분사','복합과거는 완료된 사건을 이야기할 때 자주 쓰입니다. 많은 동사는 avoir를 주어에 맞춰 활용하고 과거분사를 연결합니다. parler→parlé처럼 규칙적인 형태도 있지만 prendre→pris, voir→vu처럼 별도로 익힐 형태도 있습니다.','과거 사건의 주어를 확인합니다.|avoir의 현재형을 주어에 맞춥니다.|동사원형 대신 과거분사를 붙이고 시점을 덧붙입니다.','J’ai mangé에서 mangé는 주어가 여성이어도 그대로입니다. avoir의 분사 일치는 주어 성별이 아니라 앞선 직접목적어의 존재와 관련됩니다.',[
'Hier, nous ___ regardé un film.|avons|sommes|ont|어제 우리는 영화를 보았습니다.|regarder는 여기서 avoir와 결합하고 nous형은 avons입니다.',
'J’ai ___ le train de huit heures.|pris|prendu|prendre|저는 여덟 시 기차를 탔습니다.|prendre의 과거분사는 불규칙형 pris입니다.',
'Elle a ___ une lettre.|écrit|écrite|écrire|그녀는 편지를 썼습니다.|목적어 une lettre가 뒤에 있으므로 écrit를 주어에 일치시키지 않습니다.',
'Vous avez ___ ce musée ?|visité|visiter|visitez|이 박물관에 가 보셨나요?|avoir 뒤에는 visiter의 과거분사 visité가 필요합니다.'
],'avoir');
add('A2','être로 만드는 복합과거','être 현재형 + 과거분사 일치','aller·venir·arriver 같은 일부 동사와 대명동사는 복합과거에 être를 사용합니다. 단순한 비대명동사의 경우 분사는 주어의 성·수에 일치합니다. 모든 이동 동사가 être를 쓰지는 않으므로 voyager처럼 avoir와 쓰는 동사도 함께 구별합니다.','동사가 être를 사용하는지 확인합니다.|suis·es·est·sommes·êtes·sont를 주어에 맞춥니다.|주어의 성·수에 따라 분사에 -e·-s·-es를 붙입니다.','sortir·monter·descendre 등은 직접목적어가 있는 용법에서 avoir를 쓸 수 있습니다. 조동사는 동사 뜻과 구조까지 보고 고릅니다.',[
'Léa est ___ tôt.|arrivée|arrivé|arrivées|레아는 일찍 도착했습니다.|être와 쓰인 arriver의 분사는 여성 단수 Léa에 일치합니다.',
'Paul et Marc sont ___ à Lyon.|allés|allé|allées|폴과 마르크는 리옹에 갔습니다.|남성 복수 주어에 맞춰 allés입니다.',
'Les filles sont ___ hier.|venues|venu|venus|그 소녀들은 어제 왔습니다.|여성 복수 주어에 따라 venu에 -es를 붙입니다.',
'Elle ___ voyagé en train.|a|est|sont|그녀는 기차로 여행했습니다.|voyager는 이동을 뜻해도 일반적으로 avoir를 사용합니다.'
],'etre');
add('A2','반과거로 배경과 습관 그리기','nous 어간 + -ais/-ait/-ions/-iez/-aient','반과거는 과거의 상태·배경·반복 습관을 제시합니다. 대부분 현재형 nous에서 -ons를 뺀 어간에 반과거 어미를 붙이며 être는 ét-라는 예외 어간을 씁니다. 사건을 완료된 단위로 제시하는 복합과거와 관점이 다릅니다.','과거의 배경인지 한 번의 사건인지 판단합니다.|nous 현재형에서 어간을 구하거나 être의 ét-를 사용합니다.|주어에 맞는 반과거 어미를 붙입니다.','반과거는 단지 오래 걸린 행동이라는 뜻이 아닙니다. 기간이 길어도 끝난 단위로 묶어 말하면 복합과거가 가능합니다.',[
'Quand j’étais enfant, je ___ ici chaque été.|venais|viens|viendrai|어렸을 때 저는 매년 여름 이곳에 왔습니다.|과거에 반복된 습관을 반과거 venais로 나타냅니다.',
'Nous ___ dans un petit appartement à cette époque.|habitions|habitons|habiterons|그 당시 우리는 작은 아파트에 살았습니다.|과거의 지속 상태와 nous에 맞는 habitions입니다.',
'Il ___ froid ce matin-là.|faisait|fait|fera|그날 아침에는 추웠습니다.|그날의 날씨라는 배경을 faisait로 그립니다.',
'Vous ___ souvent fatigués autrefois.|étiez|êtes|serez|여러분은 예전에 자주 피곤했습니다.|être의 반과거 어간 ét-와 vous 어미 -iez를 결합합니다.'
]);
add('A2','복합과거와 반과거의 관점','배경 imparfait + 발생 사건 passé composé','같은 이야기에서 반과거는 상황을 펼쳐 놓고 복합과거는 그 안에서 발생한 사건을 전개할 수 있습니다. toujours·soudain 같은 부사만 외워 기계적으로 결정하지 말고 화자가 사건을 어떻게 제시하는지 읽어야 합니다.','먼저 이야기의 기준 시점을 과거로 정합니다.|진행 중인 배경과 새로 발생한 사건을 구분합니다.|문장의 의미와 시간 부사를 함께 보며 두 시제를 연결합니다.','quand 뒤에는 언제나 복합과거가 오는 것이 아닙니다. 반복 습관이면 Quand j’étais enfant처럼 반과거가 자연스럽습니다.',[
'Je lisais quand le téléphone ___ soudain.|a sonné|sonnera|sonne|책을 읽고 있었는데 갑자기 전화가 울렸습니다.|진행 중 배경 안에서 새로 발생한 사건은 a sonné입니다.',
'À cette époque, elle ___ au tennis tous les samedis.|jouait|jouera|joue|그 시절 그녀는 토요일마다 테니스를 쳤습니다.|과거 반복 습관을 설명하므로 jouait입니다.',
'Hier, à dix heures précises, le train ___.|est parti|partira|part|어제 정확히 열 시에 기차가 떠났습니다.|명시된 과거 시점에 완료된 출발 사건입니다.',
'Il pleuvait ; nous ___ donc restés à la maison hier.|sommes|serons|avons|비가 내리고 있어서 우리는 어제 집에 머물렀습니다.|rester의 복합과거는 être를 사용하여 sommes restés입니다.'
]);
add('A2','명령법과 정중한 부탁','Parle ! · Parlons ! · Parlez !','명령법은 주어를 쓰지 않고 tu·nous·vous에 해당하는 형태로 부탁이나 지시를 합니다. 많은 -er 동사의 tu형은 현재형의 -s를 빼지만 y·en이 바로 이어질 때 다시 붙는 경우가 있습니다. 부정 명령에서는 ne…pas와 대명사 위치를 함께 확인합니다.','상대 한 명인지 여러분인지 함께 할 행동인지 정합니다.|주어를 빼고 명령법 형태를 고릅니다.|긍정·부정에 따라 대명사 위치와 하이픈을 점검합니다.','Va !와 Vas-y !를 구별하세요. -s를 언제나 삭제하는 것은 아니며 être→sois, avoir→aie 같은 불규칙 명령도 있습니다.',[
'___ la porte, s’il te plaît.|Ferme|Fermes|Fermer|문을 닫아 줘.|-er 동사의 tu 명령형은 Ferme로 끝의 -s를 뺍니다.',
'___ le texte, s’il vous plaît.|Lisez|Lisons|Lis|글을 읽어 주세요.|vous에 대한 명령형은 Lisez입니다.',
'Ne ___ pas si vite !|parle|parles|parler|그렇게 빨리 말하지 마!|tu에 대한 부정 명령도 parle를 사용합니다.',
'___ attentifs, les enfants !|Soyez|Êtes|Sont|아이들아, 집중해라!|être의 vous 명령형은 불규칙형 Soyez입니다.'
]);
add('A2','대명동사와 일상 동작','se lever → je me lève · nous nous levons','대명동사는 주어와 연결된 me·te·se·nous·vous·se를 동사 앞에 둡니다. 일상 행동에서는 se lever, se coucher 등이 자주 나오며 단순한 목적어 대명사와 구분해야 합니다. 복합과거에는 être를 사용하지만 분사 일치는 구조를 보고 판단합니다.','사전형에 se가 있는지 확인합니다.|주어에 맞는 재귀 대명사를 고릅니다.|동사를 활용하고 부정일 때 ne와 pas로 전체를 감쌉니다.','Nous nous levons의 두 nous는 역할이 다릅니다. 첫 nous는 주어, 둘째는 재귀 대명사입니다.',[
'Je ___ réveille à sept heures.|me|se|te|저는 일곱 시에 깹니다.|je에 맞는 재귀 대명사는 me입니다.',
'Elles ___ promènent au parc.|se|nous|vous|그녀들은 공원에서 산책합니다.|elles에 대응하는 대명동사의 대명사는 se입니다.',
'Nous nous ___ tôt.|levons|levez|lèvent|우리는 일찍 일어납니다.|nous에 맞는 se lever 형태는 nous levons입니다.',
'Tu ne ___ couches pas tard.|te|se|me|너는 늦게 자지 않습니다.|부정문에서도 tu에 대응하는 te가 동사 앞에 옵니다.'
]);
add('A2','직접목적어 대명사','le/la/l’/les + 동사','전치사 없이 동사에 바로 연결되는 목적어는 le·la·les 등으로 받을 수 있습니다. 대명사는 보통 활용 동사 앞에 놓고 원형의 목적어라면 그 원형 앞에 둡니다. 명사 대신 쓰는 대명사의 성·수는 원래 대상을 기준으로 합니다.','동사에 무엇을·누구를이라는 질문을 하여 직접목적어를 찾습니다.|대상의 성·수에 따라 le·la·les를 고릅니다.|해당 동사의 앞에 두고 모음 앞 le·la는 l’로 줄입니다.','원형과 결합한 Je vais le lire에서 le는 vais가 아니라 lire의 목적어입니다. 아무 동사 앞이나 옮기지 않습니다.',[
'Ce livre, je ___ lis le soir.|le|lui|leur|이 책은 저녁에 읽습니다.|livre는 남성 단수 직접목적어이므로 le입니다.',
'Ces fleurs, elle ___ achète au marché.|les|leur|lui|이 꽃들은 그녀가 시장에서 삽니다.|복수 직접목적어 fleurs를 les로 받습니다.',
'Cette chanson, nous ___ écoutons souvent.|l’|lui|la|이 노래는 우리가 자주 듣습니다.|la는 모음으로 시작하는 écoutons 앞에서 l’이 됩니다.',
'Ton message ? Je vais ___ lire.|le|lui|leur|네 메시지? 이제 읽어 볼게.|message는 lire의 직접목적어로 le가 원형 앞에 옵니다.'
]);
add('A2','간접목적어 lui와 leur','parler à quelqu’un → lui/leur parler','parler à·téléphoner à 같은 동사에서 사람에게라는 간접목적어는 lui·leur로 받을 수 있습니다. lui는 남녀 단수 모두, leur는 복수에 사용합니다. 모든 à + 사람 구조가 lui로 바뀌는 것은 아니므로 penser à lui 같은 결합도 따로 익힙니다.','동사가 직접목적어인지 à로 연결하는 사람 목적어인지 확인합니다.|한 사람은 lui, 여러 사람은 leur를 고릅니다.|대명사를 활용 동사 또는 해당 원형 앞에 놓습니다.','leur가 간접목적어 대명사일 때는 -s를 붙이지 않습니다. leurs livres의 소유형용사와 역할이 다릅니다.',[
'Je téléphone à Léa ; je ___ téléphone ce soir.|lui|la|le|레아에게 전화합니다. 오늘 저녁 그녀에게 전화합니다.|téléphoner à의 단수 사람 목적어는 성별과 무관하게 lui입니다.',
'Il parle à ses parents ; il ___ parle chaque jour.|leur|leurs|les|그는 부모님께 매일 이야기합니다.|복수 간접목적어는 leur이며 -s를 붙이지 않습니다.',
'Nous ___ écrivons une carte. (친구 한 명에게)|lui|le|la|우리는 그 친구에게 엽서 한 장을 씁니다.|카드는 직접목적어이고 사람은 à quelqu’un이므로 lui입니다.',
'Je pense souvent à ___. (마리)|elle|la|se|저는 마리를 자주 생각합니다.|penser à + 사람에는 여기서 강세형 elle를 유지합니다.'
]);
add('A2','y와 en으로 반복 줄이기','y: à/장소 · en: de/수량','y는 장소나 사물에 대한 à구를, en은 de구나 불특정 수량을 자주 대신합니다. 숫자·수량은 J’en ai deux처럼 문장에 남겨야 합니다. 사람을 대신할 때는 동사의 결합과 문체에 따라 다른 대명사가 더 자연스러울 수 있습니다.','앞 문장에서 반복되는 장소·전치사구·수량을 찾습니다.|à나 장소는 y, de나 불특정 양은 en을 검토합니다.|수량 자체가 필요한 경우 숫자를 남깁니다.','J’en ai deux에서 deux를 빼면 ‘두 개’라는 정보가 사라집니다. y와 en을 한국어의 그것으로만 외우지 마세요.',[
'Tu vas à Paris ? Oui, j’___ vais demain.|y|en|lui|파리에 가니? 응, 내일 거기 가.|장소 à Paris를 y로 받습니다.',
'Tu veux du thé ? Oui, j’___ veux.|en|y|lui|차 마실래? 응, 좀 마실래.|부분관사로 나타낸 불특정 양 du thé는 en으로 받습니다.',
'Des billets ? Nous ___ avons trois.|en|y|leur|표요? 우리는 세 장 있습니다.|불특정 복수 billets를 en으로 받고 숫자 trois를 유지합니다.',
'Elle revient de Lyon ; elle ___ revient ce soir.|en|y|la|그녀는 리옹에서 오늘 저녁 돌아옵니다.|de + 장소인 출발점을 en으로 대신합니다.'
]);
add('A2','비교급과 최상급','plus/aussi/moins…que · meilleur · mieux','형용사나 부사를 비교할 때 plus·aussi·moins와 que를 연결합니다. bon의 우등 비교는 meilleur이고 bien의 우등 비교는 mieux입니다. 최상급에서는 정관사와 형용사의 성·수도 확인해야 합니다.','비교 대상이 명사의 성질인지 행동의 방식인지 구분합니다.|일반 형용사는 plus/aussi/moins와 que로 연결합니다.|bon/bien의 불규칙 비교형과 일치를 따로 확인합니다.','plus bon보다 meilleur, plus bien보다 mieux가 기본입니다. meilleure는 형용사여서 여성형이 있지만 mieux는 부사로 변하지 않습니다.',[
'Cette route est plus courte ___ l’autre.|que|de|comme|이 길은 다른 길보다 짧습니다.|비교급 plus 뒤의 기준은 que로 연결합니다.',
'Cette solution est ___ que la première.|meilleure|mieux|meilleur|이 해결책은 첫 번째보다 더 좋습니다.|여성 단수 solution을 수식하므로 meilleure입니다.',
'Il parle français ___ qu’avant.|mieux|meilleur|meilleure|그는 전보다 프랑스어를 더 잘합니다.|말하는 방식을 설명하는 bien의 비교급은 mieux입니다.',
'C’est la ___ salle du bâtiment.|plus grande|plus grand|mieux grande|이곳이 건물에서 가장 큰 방입니다.|여성 단수 salle와 일치하는 최상급 la plus grande입니다.'
]);
add('A2','단순미래의 형태와 약속','동사원형/미래 어간 + -ai/-as/-a/-ons/-ez/-ont','단순미래는 앞으로의 사건·약속·예측을 말합니다. 많은 동사는 원형에 어미를 붙이고 -re 동사는 마지막 e를 뺍니다. être→ser-, avoir→aur-, aller→ir- 같은 불규칙 어간을 함께 익힙니다.','미래 시점과 주어를 정합니다.|규칙 원형 또는 불규칙 미래 어간을 확인합니다.|미래 어미를 붙이고 조건법 -ais와 철자를 구별합니다.','Je parlerai는 미래이고 je parlerais는 조건법입니다. 발음만 의지하지 말고 시간·가정 문맥과 철자를 함께 보세요.',[
'Demain, je ___ tôt.|partirai|partirais|partais|내일 저는 일찍 떠날 것입니다.|명시적인 미래 계획에서 je의 단순미래는 partirai입니다.',
'L’année prochaine, nous ___ en France.|vivrons|vivrions|vivions|내년에 우리는 프랑스에서 살 것입니다.|vivre의 e를 뺀 vivr-에 -ons를 붙입니다.',
'Tu ___ bientôt une réponse.|auras|avais|aurais|너는 곧 답을 받을 것이다.|avoir의 미래 어간 aur-와 tu 어미 -as를 결합합니다.',
'Elles ___ ici à midi demain.|seront|étaient|seraient|그녀들은 내일 정오에 여기 있을 것입니다.|être의 단순미래 elles형은 seront입니다.'
]);
add('A2','기간과 시점을 정확히 말하기','depuis · pendant · il y a · dans','depuis는 시작점부터 이어지는 기간을, pendant는 행위가 지속된 길이를 나타냅니다. il y a + 기간은 얼마 전에, dans + 기간은 지금부터 얼마 후에를 말합니다. 지금도 지속되는 행동에는 depuis와 현재형이 흔히 결합합니다.','행동이 지금도 계속되는지 먼저 확인합니다.|지속은 depuis, 기간의 길이는 pendant를 검토합니다.|과거로 거슬러 가면 il y a, 미래로 나아가면 dans를 씁니다.','영어의 완료시제를 그대로 옮겨서 depuis와 항상 복합과거를 쓰지 마세요. J’habite ici depuis deux ans는 지금도 산다는 뜻입니다.',[
'J’habite ici ___ trois ans et j’y habite toujours.|depuis|il y a|dans|저는 여기 산 지 3년 되었고 지금도 삽니다.|현재까지 이어지는 기간이므로 depuis입니다.',
'Elle est arrivée ___ dix minutes.|il y a|depuis|dans|그녀는 10분 전에 도착했습니다.|완료된 도착이 지금보다 10분 전이므로 il y a입니다.',
'Le cours commencera ___ une heure.|dans|depuis|il y a|수업은 한 시간 후 시작합니다.|지금부터 미래까지의 간격이므로 dans입니다.',
'Hier, j’ai étudié ___ deux heures, puis je suis sorti.|pendant|depuis|dans|어제 두 시간 공부한 뒤 나갔습니다.|끝난 공부가 지속된 길이를 pendant로 나타냅니다.'
]);
add('A2','빈출 불규칙 현재형','faire, prendre, venir, pouvoir, vouloir','현재형 불규칙 동사는 한 형태만 외워서는 인칭을 바꿀 때 오류가 생깁니다. prendre의 nous prenons와 ils prennent처럼 어간과 철자가 함께 변하는 경우를 묶어 익힙니다. -ir로 끝난다고 모두 finir처럼 활용하지도 않습니다.','사전형과 je·nous·ils형을 한 묶음으로 확인합니다.|주어에 맞는 어간과 어미를 선택합니다.|다음 동사가 있으면 원형이 유지되는지 확인합니다.','vous faites를 faisez로 만들지 않습니다. pouvoir의 nous형 pouvons와 ils형 peuvent도 규칙 어미만 붙여서는 나오지 않습니다.',[
'Vous ___ du sport le dimanche.|faites|faisez|font|여러분은 일요일마다 운동합니다.|faire의 vous 현재형은 불규칙한 faites입니다.',
'Ils ___ le bus chaque matin.|prennent|prenent|prenons|그들은 매일 아침 버스를 탑니다.|prendre의 ils형은 n이 두 개인 prennent입니다.',
'Nous ___ vous aider.|pouvons|peuvent|peux|우리는 여러분을 도울 수 있습니다.|pouvoir의 nous형은 pouvons이고 aider는 원형입니다.',
'Tu ___ venir avec nous ?|veux|veut|voulons|너 우리와 함께 오고 싶니?|vouloir의 tu 현재형은 veux입니다.'
]);
add('A2','과거분사 일치의 갈림길','être: 주어 · avoir: 앞선 직접목적어','être와 쓰인 일반적인 과거분사는 주어와 일치하지만, avoir의 과거분사는 앞에 놓인 직접목적어가 있을 때 그 목적어와 일치합니다. 간접목적어 lui·leur가 앞에 있다는 이유만으로 일치시키지는 않습니다. 주어의 성별만 보고 분사 끝을 바꾸지 않는 것이 핵심입니다.','먼저 조동사가 être인지 avoir인지 확인합니다.|avoir라면 직접목적어가 무엇이며 앞에 있는지 찾습니다.|일치 기준의 성·수를 분사에 표시합니다.','Elle a écrit une lettre에서는 écrit, La lettre qu’elle a écrite에서는 écrite입니다. 사람을 향한 à 목적어는 직접목적어가 아닙니다.',[
'Les lettres que j’ai ___ sont sur la table.|écrites|écrit|écrits|제가 쓴 편지들이 탁자 위에 있습니다.|앞선 직접목적어 que가 여성 복수 lettres를 받아 écrites입니다.',
'Elles ont ___ leurs valises.|préparé|préparées|préparés|그녀들은 여행 가방을 준비했습니다.|직접목적어가 동사 뒤에 있으므로 préparé를 그대로 씁니다.',
'Les étudiantes sont ___ à neuf heures.|arrivées|arrivé|arrivés|여학생들은 아홉 시에 도착했습니다.|être와 쓰인 arriver의 분사는 여성 복수 주어와 일치합니다.',
'Je leur ai ___ hier.|parlé|parlés|parlées|저는 어제 그들에게 이야기했습니다.|leur는 간접목적어이므로 parlé를 일치시키지 않습니다.'
],'avoir');
add('B1','접속법 현재의 형태','que je parle · que nous parlions · qu’il soit','접속법은 소망·감정·필요·불확실성 같은 관점에서 종속절을 제시할 때 사용됩니다. 단순히 접속사 que가 있다는 이유만으로 쓰지는 않습니다. 많은 동사는 ils 현재형 어간을 바탕으로 만들지만 être·avoir·aller 등은 불규칙형을 따로 익힙니다.','주절의 의미가 접속법을 요구하는지 확인합니다.|종속절의 주어에 맞는 접속법 형태를 고릅니다.|불규칙 soit·ait·aille·fasse·puisse를 별도로 확인합니다.','Je sais qu’il vient처럼 사실을 안다는 말에는 직설법을 씁니다. que 뒤를 무조건 접속법으로 바꾸지 마세요.',[
'Il faut que tu ___ à l’heure.|sois|es|seras|네가 제시간에 와야 합니다.|필요를 나타내는 il faut que 뒤 être의 tu 접속법은 sois입니다.',
'Je souhaite qu’elle ___ réussir.|puisse|peut|pourra|저는 그녀가 성공할 수 있기를 바랍니다.|소망 뒤 pouvoir의 접속법 puisse를 씁니다.',
'Il est important que nous ___ ensemble.|travaillions|travaillons|travaillerons|우리가 함께 일하는 것이 중요합니다.|평가·필요의 표현 뒤 nous 접속법은 travaillions입니다.',
'Je veux que vous ___ attention.|fassiez|faites|ferez|여러분이 주의를 기울이길 바랍니다.|vouloir que 뒤 faire의 vous 접속법은 fassiez입니다.'
],'conjunction');
add('B1','같은 주어의 원형과 다른 주어의 que절','vouloir partir / vouloir que tu partes','바라는 사람과 행동하는 사람이 같으면 원형으로 간결하게 연결할 수 있습니다. 주어가 달라지면 que절과 접속법이 필요할 수 있습니다. 감정 표현에서도 행동 주체와 완료 여부에 따라 원형·접속법 현재·접속법 과거를 구분합니다.','주절과 뒤 행동의 주체가 같은지 확인합니다.|같은 주체는 원형 구조를 우선 검토합니다.|다른 주체는 que절과 알맞은 동사법으로 연결합니다.','Je veux partir는 내가 떠나고 싶은 것이고 Je veux que tu partes는 네가 떠나길 바라는 것입니다. 대명사 하나가 의도를 바꿉니다.',[
'Je veux ___ le français.|apprendre|apprends|apprenne|저는 프랑스어를 배우고 싶습니다.|바라는 사람과 배우는 사람이 같으므로 원형 apprendre입니다.',
'Je veux que tu ___ avec nous.|viennes|viens|viendras|네가 우리와 함께 오길 바랍니다.|주어가 je에서 tu로 바뀌고 바람이므로 접속법 viennes입니다.',
'Elle est heureuse de ___ ses amis.|voir|voit|voie|그녀는 친구들을 만나서 기쁩니다.|감정을 느끼고 보는 주체가 같아 de + 원형 voir를 씁니다.',
'Nous sommes contents que vous ___ là.|soyez|êtes|serez|여러분이 여기 있어서 기쁩니다.|감정 평가의 que절에서 être의 vous 접속법 soyez입니다.'
],'conjunction');
add('B1','조건법으로 요청과 조언하기','je voudrais · vous pourriez · tu devrais','조건법 현재는 가정의 결과뿐 아니라 요청을 부드럽게 하거나 조언할 때도 사용됩니다. 미래 어간에 반과거 어미를 붙이며 vouloir→voudr-, pouvoir→pourr- 같은 어간을 유지합니다. 형태가 과거처럼 보여도 반드시 과거 시간을 뜻하지 않습니다.','요청을 직접 명령할지 부드럽게 말할지 정합니다.|미래 어간과 반과거 어미를 결합합니다.|질문·si 조건 등 주변 맥락을 붙여 의도를 분명히 합니다.','Je voudrais는 정중한 바람이고 je voulais는 과거의 바람일 수 있습니다. 맥락 없이 두 형태를 언제나 같은 것으로 처리하지 마세요.',[
'Je ___ réserver une chambre, s’il vous plaît.|voudrais|voudrions|voudrait|객실 하나를 예약하고 싶습니다.|정중한 요청에는 vouloir의 조건법 je형 voudrais가 자연스럽습니다.',
'___-vous répéter plus lentement ?|Pourriez|Pourrais|Pourraient|조금 더 천천히 반복해 주실 수 있을까요?|정중한 요청을 의도한 pouvoir 조건법 vous형은 Pourriez입니다.',
'À ta place, je ___ le médecin.|consulterais|consulterions|consulteraient|내가 너라면 의사에게 상담하겠어.|가상의 내 처지를 전제로 한 조언이므로 je의 consulterais입니다.',
'Tu ___ te reposer davantage.|devrais|devra|devrions|너는 좀 더 쉬는 게 좋겠어.|tu에게 하는 조언에서 devoir 조건법은 devrais입니다.'
]);
add('B1','현실 조건과 가정 조건','si + 현재, 미래 · si + 반과거, 조건법','실현 가능한 조건은 si + 현재와 미래 결과로, 현재 사실과 다르거나 거리를 둔 가정은 si + 반과거와 조건법으로 나타낼 수 있습니다. 조건을 뜻하는 si절에는 일반적으로 미래·조건법을 넣지 않습니다. 간접 의문의 si는 이 규칙과 별개입니다.','si가 조건인지 의문을 전달하는지 확인합니다.|현실적 조건이면 현재형과 미래 결과를 조합합니다.|가정이면 반과거와 조건법을 조합합니다.','Si j’aurais는 일반적인 가정 조건절의 표준형이 아닙니다. Si j’avais…, je ferais…처럼 두 절의 역할을 나누세요.',[
'Si tu ___ demain, nous visiterons le musée.|viens|viendras|viendrais|네가 내일 오면 박물관에 갈 것입니다.|미래를 뜻해도 조건 si절은 현재형 viens입니다.',
'Si j’___ plus de temps, je lirais ce roman.|avais|aurais|aurai|시간이 더 있다면 이 소설을 읽을 텐데요.|가정 결과 lirais에 대응하는 조건은 반과거 avais입니다.',
'S’il pleut, nous ___ à la maison.|resterons|resterez|resteront|비가 오면 우리는 집에 있을 것입니다.|현재 조건에 대응하는 nous의 미래 결과 resterons입니다.',
'Si nous habitions ici, nous ___ à pied.|irions|irais|iraient|우리가 여기 산다면 걸어 다닐 텐데요.|반과거 가정에 대한 nous의 결과는 aller 조건법 irions입니다.'
],'si');
add('B1','관계대명사 qui와 que','qui + 동사 / que + 주어 + 동사','관계절은 명사를 뒤에서 자세히 설명합니다. qui는 관계절 안의 주어, que는 직접목적어 역할을 하므로 사람·사물 여부만으로 나누지 않습니다. que 뒤의 주어와 동사를 보고 비어 있는 역할을 찾는 것이 중요합니다.','관계절이 설명하는 앞 명사를 찾습니다.|관계절 안에서 빠진 역할이 주어인지 목적어인지 확인합니다.|주어 자리는 qui, 직접목적어 자리는 que를 씁니다.','사물에도 qui를 쓸 수 있습니다. Le train qui arrive의 qui는 기차를 받는 주어입니다.',[
'Le livre ___ est sur la table est à moi.|qui|que|dont|탁자 위에 있는 책은 제 것입니다.|관계절 est의 주어 자리가 비어 있으므로 qui입니다.',
'La chanson ___ tu écoutes est célèbre.|que|qui|où|네가 듣는 노래는 유명합니다.|tu가 이미 주어이고 écoutes의 직접목적어가 필요하므로 que입니다.',
'Je connais une personne ___ parle coréen.|qui|que|dont|한국어를 하는 사람을 한 명 압니다.|parle의 주어가 personne이므로 qui입니다.',
'Le musée ___ nous visitons est gratuit.|que|qui|où|우리가 방문하는 박물관은 무료입니다.|visiter의 직접목적어 자리를 que로 연결합니다.'
]);
add('B1','dont와 où로 관계 잇기','parler de → dont · 장소/시간 → où','dont는 동사·형용사·명사가 요구하는 de 관계를 받아 반복을 줄입니다. où는 장소뿐 아니라 때를 나타내는 선행사에도 쓰입니다. 앞 명사가 장소라고 언제나 où를 쓰는 것이 아니라 관계절 안의 역할을 먼저 살펴야 합니다.','원래 두 문장으로 나누어 de 관계가 있는지 확인합니다.|de를 대신하면 dont, 장소·시간 부사어를 대신하면 où를 씁니다.|이미 dont가 받은 de나 소유형용사를 중복시키지 않습니다.','La ville que je visite에서는 ville가 방문하다의 직접목적어이므로 que입니다. 장소 명사라고 자동으로 où가 되는 것은 아닙니다.',[
'Voici le projet ___ je vous ai parlé.|dont|que|où|이것이 제가 말씀드린 프로젝트입니다.|parler de quelque chose의 de 관계를 dont가 받습니다.',
'C’est la ville ___ je suis né.|où|que|dont|이곳이 제가 태어난 도시입니다.|태어난 장소를 나타내므로 où입니다.',
'Je me souviens du jour ___ nous nous sommes rencontrés.|où|que|dont|우리가 만난 날을 기억합니다.|시간 선행사 le jour를 때의 부사어로 연결하므로 où입니다.',
'Elle cherche un outil ___ elle a besoin.|dont|que|qui|그녀는 필요한 도구를 찾습니다.|avoir besoin de의 de 관계를 dont가 대신합니다.'
]);
add('B1','과거보다 더 앞선 대과거','avoir/être 반과거 + 과거분사','대과거는 이야기의 과거 기준점보다 앞서 완료된 일을 나타냅니다. 조동사를 반과거로 바꾸고 과거분사를 결합하며 조동사 선택과 분사 일치 규칙은 복합과거에서 이어집니다. 단순히 아주 오래전이라는 이유만으로 대과거가 되는 것은 아닙니다.','이야기에서 기준이 되는 과거 사건을 찾습니다.|그 사건보다 먼저 끝난 일을 고릅니다.|조동사를 avais/étais 등으로 바꾸고 분사를 붙입니다.','J’avais fini quand il est arrivé에서 먼저 끝난 것은 finir입니다. 달력상 오래된 사건과 상대적 선후 관계를 구별하세요.',[
'Quand Léa est arrivée, Paul ___ déjà préparé le repas.|avait|avaient|aviez|레아가 도착했을 때 폴은 이미 식사를 준비해 두었습니다.|과거 도착 이전에 준비가 완료되어 3인칭 단수 avait préparé입니다.',
'Nous avons lu le livre que tu nous ___ recommandé.|avais|auras|recommandes|우리는 네가 추천해 주었던 책을 읽었습니다.|책을 읽은 과거보다 앞선 추천을 avais recommandé로 나타냅니다.',
'Elle ne trouvait plus les clés qu’elle avait ___ sur la table.|posées|posé|posés|그녀는 탁자에 놓아두었던 열쇠를 찾지 못했습니다.|앞선 직접목적어 que가 여성 복수 clés를 받아 posées입니다.',
'À mon arrivée, les filles ___ déjà parties.|étaient|avaient|seront|제가 도착했을 때 소녀들은 이미 떠났습니다.|partir는 être를 쓰며 과거 이전 완료는 étaient parties입니다.'
],'avoir');
add('B1','간접화법의 시점 바꾸기','dit que / a dit que · demain → le lendemain','누군가의 말을 자신의 서술에 넣을 때 대명사와 시점 표현을 조정해야 합니다. 과거의 발화를 전달하면 당시 현재는 반과거, 당시 미래는 조건법으로 바뀔 수 있습니다. 지금도 유효한 사실은 맥락에 따라 현재를 유지할 수 있어 무조건적인 치환은 피합니다.','누가 누구에게 말했는지 대명사를 조정합니다.|보고 시점과 원래 발화 시점이 같은지 확인합니다.|과거 서술에서는 시제와 demain·ici 등의 기준을 함께 바꿉니다.','조건법은 여기서 비현실 가정이 아니라 ‘과거에서 본 미래’를 나타낼 수 있습니다.',[
'Il a dit qu’il ___ le lendemain.|viendrait|viendrai|venons|그는 다음 날 오겠다고 말했습니다.|과거 발화에서 미래였던 일을 조건법 viendrait로 전달합니다.',
'Elle a expliqué qu’elle ___ fatiguée ce jour-là.|était|serai|sommes|그녀는 그날 피곤했다고 설명했습니다.|과거 말하기와 동시에 있었던 상태를 반과거 était로 전달합니다.',
'Paul a annoncé qu’il ___ déjà terminé.|avait|aura|aurai|폴은 이미 끝냈다고 알렸습니다.|발화보다 앞서 끝난 일을 대과거 avait terminé로 전달합니다.',
'Léa dit qu’___ aime ce quartier.|elle|elles|nous|레아는 이 동네를 좋아한다고 말합니다.|레아의 말을 전달하는 서술에서는 단수 elle가 aime와 일치합니다.'
]);
add('B1','동시 행동과 수단을 나타내는 제롱디프','en + 현재분사','en + -ant 형태는 동시에 하는 행동이나 수단·방식을 나타낼 수 있습니다. 보통 주절과 제롱디프의 행위 주체가 같아야 의미가 분명합니다. 현재분사는 변하지 않으며 être→étant, avoir→ayant, savoir→sachant 같은 예외가 있습니다.','주절의 행동과 함께 일어나는 행동을 찾습니다.|두 행동의 주체가 같은지 확인합니다.|en과 현재분사를 연결하여 동시성·수단을 표시합니다.','여성이 주어라고 en marchante로 바꾸지 않습니다. 분사형 형용사와 달리 동사적 현재분사는 성·수에 일치하지 않습니다.',[
'Elle écoute de la musique en ___.|cuisinant|cuisinante|cuisine|그녀는 요리하면서 음악을 듣습니다.|en 뒤에는 변하지 않는 현재분사 cuisinant가 옵니다.',
'On apprend en ___ régulièrement.|pratiquant|pratique|pratiqué|규칙적으로 연습하면서 배웁니다.|학습의 수단을 en pratiquant로 나타냅니다.',
'___ de chez moi, j’ai rencontré mon voisin.|En sortant|En sorti|En sortie|집에서 나오다가 이웃을 만났습니다.|나오는 사람과 만나는 사람이 모두 je이므로 En sortant입니다.',
'Il s’est blessé en ___ au football.|jouant|joué|jouer|그는 축구하다가 다쳤습니다.|동시에 하던 행동을 en + 현재분사 jouant로 나타냅니다.'
]);
add('B1','수동태로 대상에 초점 두기','être + 과거분사 · par + 행위자','수동태에서는 행위의 영향을 받는 대상을 주어로 세웁니다. être를 필요한 시제로 활용하고 과거분사는 새 주어의 성·수에 일치시킵니다. 행위자를 말해야 할 때 par를 붙이지만 불필요하면 생략할 수 있습니다.','능동문의 직접목적어를 새 주어로 옮깁니다.|시제를 être에 표시합니다.|분사를 주어와 일치시키고 필요하면 행위자를 덧붙입니다.','수동태의 être와 이동 동사 복합과거의 être는 역할이 다릅니다. a été réparée는 과거 수동, est arrivée는 도착의 복합과거입니다.',[
'Cette maison a été ___ en 1920.|construite|construit|construits|이 집은 1920년에 지어졌습니다.|수동태 분사가 여성 단수 maison에 일치합니다.',
'Les résultats seront ___ demain.|publiés|publié|publiées|결과는 내일 발표될 것입니다.|미래 수동에서 남성 복수 résultats와 publiés가 일치합니다.',
'La porte est ___ chaque soir.|fermée|fermé|fermer|문은 매일 저녁 닫힙니다.|여성 단수 porte에 맞는 수동 분사는 fermée입니다.',
'Le roman a été écrit ___ une jeune autrice.|par|à|chez|그 소설은 젊은 여성 작가가 썼습니다.|수동태의 행위자를 par로 도입합니다.'
],'etre');
add('B1','부정·제한·아무도 없음','ne…plus · ne…rien · ne…personne · ne…que','부정어는 각각 더 이상 아님, 아무것도 없음, 아무도 없음 등을 나타냅니다. ne…que는 완전한 부정이 아니라 ‘오직’이라는 제한입니다. rien·personne가 주어인 경우에도 표준 문어에서는 동사 앞 ne를 사용합니다.','부정할 의미가 더 이상·아무것도·아무도 중 무엇인지 정합니다.|적절한 부정어의 위치와 ne를 배치합니다.|ne…que를 보면 제한되는 부분이 어디인지 확인합니다.','Je ne bois que de l’eau는 물을 안 마신다는 뜻이 아니라 물만 마신다는 뜻입니다.',[
'Je ne fume ___ depuis janvier.|plus|que|personne|저는 1월부터 더 이상 담배를 피우지 않습니다.|중단된 행동에는 ne…plus를 씁니다.',
'___ ne connaît la réponse.|Personne|Rien de|Que|아무도 답을 모릅니다.|사람의 부재를 주어 Personne와 ne로 나타냅니다.',
'Je n’ai ___ compris.|rien|personne|aucun|저는 아무것도 이해하지 못했습니다.|comprendre의 목적어가 아무것도 없으므로 rien입니다.',
'Elle ne boit ___ de l’eau.|que|personne|aucun|그녀는 물만 마십니다.|물을 유일한 대상으로 제한하는 ne…que입니다.'
]);
add('B1','이유와 양보를 연결하기','parce que · puisque · bien que · malgré','이유를 새로 설명할 때 parce que, 이미 공유된 이유를 전제할 때 puisque를 쓸 수 있습니다. 양보를 나타내는 bien que는 보통 접속법과, malgré는 명사구와 결합합니다. 뜻이 비슷해도 뒤 구조가 달라지므로 접속사와 전치사를 구별합니다.','이유인지 예상과 반대되는 결과인지 결정합니다.|뒤에 절을 붙일지 명사구를 붙일지 봅니다.|접속사에 맞는 동사법을 고릅니다.','malgré que는 용법·문체 논란이 있으므로 입문 표준 연습에서는 malgré + 명사, bien que + 접속법으로 나누어 익힙니다.',[
'Il reste chez lui parce qu’il ___ malade.|est|soit|être|그는 아파서 집에 머뭅니다.|이유를 사실로 설명하는 parce que절에는 직설법 est입니다.',
'Bien qu’elle ___ fatiguée, elle continue.|soit|est|sera|그녀는 피곤하지만 계속합니다.|bien que의 양보절은 보통 접속법 soit를 씁니다.',
'___ la pluie, le match continue.|Malgré|Bien que|Parce que|비에도 불구하고 경기는 계속됩니다.|명사구 la pluie 앞에는 전치사 Malgré입니다.',
'___ tu es déjà ici, aide-moi.|Puisque|Malgré|Bien que|이미 여기 있으니 나를 도와줘.|이미 공유된 사실을 근거로 삼으므로 Puisque입니다.'
],'conjunction');
add('B1','대명사 두 개의 어순','me/te/se/nous/vous → le/la/les → lui/leur → y → en','두 목적어를 대명사로 바꾸면 한국어 번역 순서가 아니라 프랑스어의 정해진 배열을 따릅니다. 일반 평서문에서는 me·te 등이 le·la·les보다 앞이고, le·la·les는 lui·leur보다 앞입니다. 긍정 명령은 별도 배열과 하이픈을 사용합니다.','각 대명사의 기능과 원래 대상을 확인합니다.|평서문 기본 배열에서 필요한 것만 골라 놓습니다.|긍정 명령이면 le-moi·le-lui 같은 배열을 따로 적용합니다.','Je le lui donne와 Donne-le-moi를 비교하세요. 긍정 명령의 moi가 앞에 오는 평서문 me와 같은 자리에 놓이지 않습니다.',[
'Le livre à Paul ? Je ___ donne demain.|le lui|lui le|le leur|폴에게 줄 책요? 내일 그에게 줍니다.|직접목적어 le가 단수 간접목적어 lui보다 앞입니다.',
'Tu donnes les clés à Léa ? Oui, je ___ donne.|les lui|lui les|les leur|레아에게 열쇠를 주니? 응, 그녀에게 줘.|복수 직접목적어 les 다음에 단수 사람 lui입니다.',
'Cette photo, tu ___ montres ?|me la|la me|moi la|이 사진을 나에게 보여 줄래?|me가 la보다 먼저 오는 평서문 의문형입니다.',
'Ce stylo, donne-___, s’il te plaît.|le-moi|moi-le|me-le|그 펜을 나에게 줘.|긍정 명령에서는 le-moi 순서와 하이픈을 사용합니다.'
]);
add('B1','불규칙 어간을 시제별로 묶기','venir: vien-/ven-/viennent/viendr- · savoir: sai-/sav-/saur-','불규칙 동사의 현재 어간이 그대로 미래·조건법에 쓰이는 것은 아닙니다. venir의 nous venons·ils viennent·je viendrai처럼 주요 형태를 비교하면 규칙과 예외를 구분할 수 있습니다. 어간을 알아도 주어별 어미는 별도로 맞춰야 합니다.','현재 단수·nous·ils형을 비교합니다.|미래와 조건법이 공유하는 어간을 따로 외웁니다.|시제에 맞는 어미를 붙여 전체 문장을 확인합니다.','미래 어간 viendr-와 조건법 어미를 조합하면 viendrais입니다. viene 같은 스페인어 형태를 프랑스어에 섞지 마세요.',[
'Demain, ils ___ nous voir.|viendront|veniront|viendra|내일 그들은 우리를 보러 올 것입니다.|venir의 미래 어간은 viendr-이므로 viendront입니다.',
'Si je pouvais, je ___ avec vous.|viendrais|viendrait|viendrions|할 수 있다면 여러분과 함께 오겠습니다.|조건법은 미래 어간 viendr-에 je 어미 -ais를 붙입니다.',
'Nous ___ la réponse demain.|saurons|savrons|sachons|우리는 내일 답을 알게 될 것입니다.|savoir의 미래 어간은 saur-입니다.',
'Elles ___ les billets ce soir.|recevront|recevoiront|recevra|그녀들은 오늘 저녁 표를 받게 될 것입니다.|recevoir의 미래 어간 recevr-와 복수 어미 -ont입니다.'
]);
add('B2','과거를 바꾸어 상상하기','si + 대과거, 조건법 과거','이미 일어난 일을 반대로 상상할 때 조건절은 대과거, 결과절은 조건법 과거를 자주 사용합니다. 조건법 과거는 avoir 또는 être의 조건법과 과거분사로 만듭니다. 실제 발생 여부와 지금 남은 결과를 구분해 읽어야 합니다.','실제 과거 사실과 반대되는 조건을 정합니다.|si절을 avais/étais + 분사로 만듭니다.|결과를 aurais/serais + 분사로 나타냅니다.','조건절에 si j’aurais su를 쓰지 않습니다. Si j’avais su…, je serais venu…처럼 역할을 나눕니다.',[
'Si j’avais su, je ___ venu plus tôt.|serais|aurais|étais|알았더라면 더 일찍 왔을 텐데요.|venir의 조건법 과거는 être의 조건법 + venu입니다.',
'Si nous ___ réservé, nous aurions eu des places.|avions|aurions|avons|예약했더라면 자리를 얻었을 텐데요.|과거 반사실 si절에는 대과거 avions réservé를 씁니다.',
'Elle aurait réussi si elle ___ davantage étudié.|avait|aurait|aura|그녀가 더 공부했더라면 성공했을 것입니다.|결과의 조건법 과거에 대응하는 si절은 대과거입니다.'
],'si');
add('B2','접속법 과거로 앞선 완료 평가하기','que j’aie fait · qu’elle soit partie','접속법 과거는 주절의 평가·감정·의심보다 앞서 완료된 사건을 나타낼 수 있습니다. avoir나 être를 접속법 현재로 만들고 분사를 붙입니다. 접속법이 사용되었다고 그 사건이 거짓이라고 단정할 수는 없습니다.','주절이 접속법을 요구하는지 봅니다.|평가 대상 행동이 이미 완료되었는지 확인합니다.|aie·ait·soit 등의 조동사와 분사를 결합합니다.','Je suis content qu’elle soit venue는 실제로 온 것에 기뻐하는 문장일 수 있습니다. 접속법을 비현실 전용 시제로 외우지 마세요.',[
'Je suis heureux que tu ___ réussi.|aies|as|avais|네가 성공해서 기쁩니다.|감정 평가보다 앞선 성공은 접속법 과거 aies réussi입니다.',
'Il est possible qu’elle ___ déjà partie.|soit|est|a|그녀는 이미 떠났을 수도 있습니다.|가능성 뒤 접속법이 필요하고 partir의 조동사는 être입니다.',
'Je regrette que nous ___ perdu cette occasion.|ayons|avons|aurons|우리가 이 기회를 놓친 것이 유감입니다.|이미 놓친 일을 후회하므로 접속법 과거 ayons perdu입니다.'
],'conjunction');
add('B2','과거 주절 뒤의 현대 접속법','Il voulait que je vienne / que j’aie terminé','현대 일반 프랑스어에서는 주절이 과거여도 접속법 현재·과거를 흔히 사용합니다. 문학적인 접속법 반과거와 대과거는 별도 독해 단계에서 다룹니다. 시간 관계는 형태 이름만이 아니라 주절과 종속절의 의미를 함께 보고 판단합니다.','현재의 요구인지 과거의 요구인지 확인합니다.|동시·이후 행동에는 현대 용법의 접속법 현재를 검토합니다.|미리 완료되어야 하는 행동에는 접속법 과거를 검토합니다.','Il voulait que je vinsse만이 유일한 표준 표현은 아닙니다. 현대 일상·일반 문어에서는 Il voulait que je vienne가 널리 쓰입니다.',[
'Il voulait que nous ___ ensemble.|venions|venons|viendrons|그는 우리가 함께 오기를 바랐습니다.|과거 주절 뒤에도 현대 용법에서는 접속법 현재 venions를 씁니다.',
'La professeure souhaitait que vous ___ attentifs.|soyez|êtes|serez|선생님은 여러분이 주의 깊게 듣기를 바라셨습니다.|과거의 바람 뒤 être 접속법 soyez입니다.',
'Il exigeait que j’___ terminé avant midi.|aie|ai|aurai|그는 제가 정오 전에 끝내 놓을 것을 요구했습니다.|요구한 기준까지의 완료를 접속법 과거 aie terminé로 나타냅니다.'
],'conjunction');
add('B2','전치사 뒤의 관계대명사','avec lequel · à laquelle · auxquels','전치사가 필요한 관계절에서는 lequel 계열을 선행사의 성·수에 맞춥니다. à와 le·les 계열은 auquel·auxquels·auxquelles로 축약됩니다. 사람 선행사라면 avec qui 같은 형태도 가능하므로 정답을 하나로 만들 때 문맥과 보기를 함께 확인합니다.','원래 동사·표현에 필요한 전치사를 유지합니다.|선행사의 성·수를 찾습니다.|lequel 계열과 à·de의 축약을 적용합니다.','전치사를 버리면 동사의 구조가 바뀝니다. compter sur의 sur는 관계절에서도 유지해야 합니다.',[
'La chaise sur ___ tu es assis est fragile.|laquelle|lequel|lesquelles|네가 앉아 있는 의자는 약합니다.|여성 단수 chaise를 sur laquelle로 받습니다.',
'Les problèmes ___ nous pensons sont complexes.|auxquels|auquel|à laquelle|우리가 생각하는 문제들은 복잡합니다.|penser à와 남성 복수 problèmes가 결합하여 auxquels입니다.',
'Voici le logiciel avec ___ je travaille.|lequel|laquelle|lesquels|이것이 제가 사용하는 소프트웨어입니다.|남성 단수 logiciel을 avec lequel로 연결합니다.'
]);
add('B2','간접 의문문의 평서 어순','Je demande où il habite / s’il vient','질문을 다른 문장의 내용으로 넣으면 보통 도치나 est-ce que를 제거하고 평서 어순을 사용합니다. 예·아니요 질문은 si로 연결하고, 무엇을이라는 질문은 ce que 또는 ce qui로 바꿀 수 있습니다. 직접 의문과 간접 의문을 한 문장 안에서 섞지 않습니다.','원래 질문이 예·아니요 질문인지 정보를 묻는지 구별합니다.|예·아니요는 si, 정보 질문은 적절한 의문 표현으로 연결합니다.|종속절은 보통 주어 다음 동사의 어순을 유지합니다.','Je ne sais pas où habite-t-il처럼 간접 의문절 안에서 대명사 도치를 쓰지 않습니다. 명사 주어의 문체적 도치와는 구별해야 합니다.',[
'Je voudrais savoir où ___.|vous habitez|habitez-vous|est-ce que vous habitez|어디 사시는지 알고 싶습니다.|간접 의문은 vous habitez라는 평서 어순을 씁니다.',
'Elle demande ___ le musée est ouvert.|si|est-ce que|où|그녀는 박물관이 열었는지 묻습니다.|예·아니요 질문을 간접 전달하므로 si입니다.',
'Dis-moi ___ tu veux acheter.|ce que|qu’est-ce que|ce qui|무엇을 사고 싶은지 말해 줘.|acheter의 직접목적어를 묻는 간접 의문에는 ce que입니다.'
]);
add('B2','on과 수동태의 정보 초점','On a annoncé… / …a été annoncé','행위자가 특정되지 않거나 중요하지 않을 때 on을 주어로 쓰거나 수동태로 바꿀 수 있습니다. on 구문은 사람들의 행위를 앞세우고 수동태는 영향을 받는 대상을 화제로 세웁니다. 모든 자동사나 간접목적어 구조를 기계적으로 수동태로 바꾸지는 않습니다.','문장에서 이미 알려진 화제가 무엇인지 찾습니다.|행위 주체를 흐리면 on, 대상을 화제로 세우면 수동태를 검토합니다.|변환 후 시제와 분사의 성·수 일치를 유지합니다.','On a répondu à Léa를 Léa a été répondue로 바꾸면 안 됩니다. répondre à의 사람은 직접목적어가 아닙니다.',[
'On a annulé la réunion. La réunion a été ___.|annulée|annulé|annulés|회의가 취소되었습니다.|여성 단수 réunion을 수동 주어로 삼아 annulée입니다.',
'On réparera les routes. Les routes seront ___.|réparées|réparé|réparés|도로들이 보수될 것입니다.|미래 시제와 여성 복수 routes의 분사 일치를 유지합니다.',
'Dans ce pays, on ___ plusieurs langues.|parle|parlent|parlons|이 나라에서는 여러 언어를 사용합니다.|일반적인 사람을 나타내는 on의 동사는 3인칭 단수입니다.'
],'etre');
add('B2','목적과 결과 구별하기','pour que + 접속법 · si…que + 직설법','목적은 아직 이루려는 의도이고 결과는 앞 상황에서 생긴 일을 제시합니다. pour que·afin que는 접속법과 결합하고, si…que로 실제 결과를 제시하면 직설법을 씁니다. 같은 주어의 목적은 pour + 원형으로 줄이는 것이 자연스럽습니다.','의도한 목표인지 실제 결과인지 구별합니다.|주체가 같으면 pour + 원형을 검토합니다.|다른 주체의 목표에는 pour que와 접속법을 씁니다.','de sorte que는 목적과 결과에 따라 동사법이 달라질 수 있습니다. 접속사 철자만으로 뜻을 고정하지 마세요.',[
'Je parle lentement pour que tu ___.|comprennes|comprends|comprendras|네가 이해하도록 천천히 말합니다.|이해를 목표로 하는 pour que절은 접속법 comprennes입니다.',
'Elle travaille pour ___ ses études.|financer|finance|financé|그녀는 학비를 마련하려고 일합니다.|두 행동의 주체가 같아 pour + 원형 financer입니다.',
'Il a couru si vite qu’il ___ tombé.|est|soit|être|그는 너무 빨리 뛰어서 넘어졌습니다.|실제로 생긴 결과를 직설법 복합과거 est tombé로 제시합니다.'
],'conjunction');
add('B2','avant que와 après que의 차이','avant que + 접속법 · après que + 직설법','표준 문법에서 avant que는 아직 일어나기 전의 사건을 접속법으로 제시하고 après que는 직설법을 사용합니다. 같은 주어라면 avant de + 원형, après avoir/être + 분사로 줄일 수 있습니다. 실제 회화에서 들리는 형태와 표준 글쓰기 규칙을 구별합니다.','기준 행동보다 전인지 후인지 결정합니다.|주어가 다르면 que절과 정해진 동사법을 사용합니다.|주어가 같으면 원형 또는 과거원형 구조를 검토합니다.','표준 연습에서는 après qu’il soit arrivé 대신 après qu’il est/sera arrivé 등을 문맥에 맞게 씁니다.',[
'Nous partirons avant qu’il ___ nuit.|fasse|fait|fera|우리는 밤이 되기 전에 떠날 것입니다.|avant que 뒤에는 접속법 fasse를 씁니다.',
'Après qu’elle ___ arrivée, nous commencerons.|sera|soit|serait|그녀가 도착한 후 우리는 시작할 것입니다.|미래보다 앞선 완료는 après que 뒤 직설법 미래완료 sera arrivée입니다.',
'Avant de ___, ferme les fenêtres.|partir|pars|parti|떠나기 전에 창문을 닫아라.|같은 주어의 avant de 뒤에는 원형 partir입니다.'
],'time');
add('B2','현재분사와 분사구문 읽기','les personnes travaillant ici · le travail terminé','현재분사는 동작을 덧붙이고 과거분사는 완료·수동 상태를 압축할 수 있습니다. 명사를 수식하는 형용사적 분사와 동사적 현재분사는 일치 여부가 다릅니다. 독립 분사구문은 자체 주어를 가지므로 주절 주어와의 연결도 확인해야 합니다.','분사가 동작을 유지하는지 형용사처럼 성질을 말하는지 구분합니다.|동사적 현재분사는 성·수에 따라 바꾸지 않습니다.|과거분사가 명사를 수식하면 그 명사와 일치시킵니다.','Des tâches fatigantes는 형용사이고 des personnes travaillant ici의 travaillant는 동사적 현재분사입니다. -s를 기계적으로 붙이지 마세요.',[
'Les personnes ___ ici doivent porter un badge.|travaillant|travaillantes|travaillent|여기서 일하는 사람들은 명찰을 착용해야 합니다.|동작을 나타내는 현재분사 travaillant는 복수와 일치시키지 않습니다.',
'Les portes ___, la réunion a commencé.|fermées|fermé|fermés|문이 닫힌 뒤 회의가 시작되었습니다.|독립 구문의 여성 복수 portes에 과거분사 fermées가 일치합니다.',
'Ce sont des tâches très ___.|fatigantes|fatiguant|fatigante|이것들은 매우 피곤한 작업들입니다.|성질을 나타내는 형용사 fatigantes가 여성 복수 tâches와 일치합니다.'
]);
add('B2','보도와 추측의 조건법','Selon la presse, il aurait…','보도문에서 조건법 과거는 출처가 전한 미확인 과거 정보를 표시할 수 있습니다. 형태가 같아도 과거 반사실 가정과 기능이 다르므로 출처·문맥을 확인해야 합니다. 조건법을 무조건 거짓 정보라고 해석해서는 안 됩니다.','가정 조건이 있는지 출처 표현이 있는지 확인합니다.|완료된 미확인 정보에는 조건법 과거를 검토합니다.|사실 확정과 전달자의 거리 두기를 번역에서 구별합니다.','Il aurait démissionné는 문맥에 따라 사임했을 텐데 또는 사임했다고 한다가 될 수 있습니다. 시제 형태 하나만으로 뜻을 고정하지 마세요.',[
'Selon le journal, le ministre ___ démissionné hier.|aurait|aura|avoir|신문에 따르면 장관이 어제 사임했다고 합니다.|출처를 둔 미확인 과거 보도에 조건법 과거 aurait démissionné를 씁니다.',
'D’après plusieurs témoins, deux personnes ___ été blessées.|auraient|aurait|aurez|여러 목격자에 따르면 두 명이 다쳤다고 합니다.|복수 주어와 보도의 거리 두기에 맞는 auraient입니다.',
'Selon cette étude non confirmée, la mesure ___ efficace.|serait|serais|serions|검증되지 않은 이 연구에 따르면 그 조치는 효과적이라고 합니다.|미확인 성질을 전달하는 3인칭 단수 조건법 serait입니다.'
]);
add('B2','과거원형으로 먼저 끝난 일 표현하기','après avoir fait · après être parti','과거원형은 avoir 또는 être의 원형과 과거분사로 만듭니다. 주절의 행동보다 앞서 끝난 일을 전치사 뒤에서 표현할 수 있으며 두 행동의 주체가 같을 때 특히 유용합니다. 조동사 선택과 분사 일치도 사라지지 않습니다.','주절보다 먼저 완료된 행동을 찾습니다.|그 행동과 주절의 주체가 같은지 확인합니다.|avoir/être 원형과 적절한 과거분사를 연결합니다.','Après être arrivée, Léa a appelé는 Léa가 도착하고 전화했다는 뜻입니다. 분사구문 주체가 모호해지지 않도록 작성하세요.',[
'Après ___ fini ses devoirs, Paul est sorti.|avoir|être|a|폴은 숙제를 끝낸 뒤 나갔습니다.|finir의 과거원형은 avoir fini입니다.',
'Après être ___, Léa a ouvert les fenêtres.|rentrée|rentré|rentrés|레아는 귀가한 뒤 창문을 열었습니다.|être와 쓰인 rentrer의 분사는 여성 단수 Léa에 일치합니다.',
'Merci d’___ répondu si vite.|avoir|être|avez|이렇게 빨리 답해 주셔서 감사합니다.|감사하는 시점보다 앞선 답변을 과거원형 avoir répondu로 나타냅니다.'
]);
add('B2','on의 동사와 의미상 일치','on est · on est arrivés/arrivées','on은 문법적으로 3인칭 단수이므로 동사는 est·va·parle로 활용합니다. 다만 특정한 우리를 가리킬 때 형용사나 과거분사는 실제 구성원의 성·수에 따라 복수 일치가 가능합니다. 일반적인 누군가를 뜻하는 on과 문맥상 우리인 on을 구별합니다.','on이 불특정 사람인지 구체적인 우리인지 확인합니다.|동사는 항상 이 구문에서 3인칭 단수로 둡니다.|구체적인 지칭 대상이 있으면 형용사·분사의 의미상 일치를 확인합니다.','On sommes라고 하지 않습니다. 여자 둘의 On est arrivées는 동사는 단수, 분사는 지칭 대상에 따라 여성 복수가 된 것입니다.',[
'On ___ au cinéma ce soir.|va|allons|vont|우리는 오늘 저녁 영화관에 갑니다.|on의 동사는 3인칭 단수 va입니다.',
'Léa et moi, sa sœur, on est ___ ensemble.|arrivées|arrivé|arrivés|레아와 여동생인 저는 함께 도착했습니다.|여성 두 명을 가리키는 on이므로 분사는 의미상 여성 복수입니다.',
'On ___ souvent cette expression en France.|entend|entendent|entendons|프랑스에서는 이 표현을 자주 듣습니다.|일반적 사람을 가리키는 on도 현재 3인칭 단수 entend와 일치합니다.'
]);
add('C1','dont와 duquel의 선택','dont / près duquel / à côté de laquelle','dont는 기본적인 de 관계를 연결하지만 près de·à côté de 같은 복합 전치사의 de를 그대로 대신하지는 못합니다. 이때는 선행사의 성·수에 맞는 duquel·de laquelle·desquels 등을 사용합니다. dont가 이미 소유 관계를 표시하면 son·sa를 중복하지 않습니다.','관계절을 두 문장으로 복원하여 de의 출처를 찾습니다.|단순 de 관계인지 복합 전치사의 일부인지 구별합니다.|복합 전치사 뒤에는 lequel 계열을 성·수에 맞춥니다.','La maison dont le toit…에서는 le toit가 필요합니다. dont son toit처럼 소유를 두 번 표시하지 마세요.',[
'L’immeuble près ___ nous habitons sera rénové.|duquel|dont|de laquelle|우리가 근처에 사는 건물은 보수될 것입니다.|près de라는 복합 전치사와 남성 단수 immeuble이므로 duquel입니다.',
'La rivière à côté ___ nous campons est calme.|de laquelle|dont|duquel|우리가 옆에서 야영하는 강은 잔잔합니다.|à côté de를 유지하고 여성 단수 rivière를 de laquelle로 받습니다.',
'C’est une autrice dont ___ romans sont traduits en coréen.|les|ses|leurs|이 작가는 소설들이 한국어로 번역되어 있습니다.|dont가 소유 관계를 이미 표시하므로 정관사 les를 씁니다.'
]);
add('C1','대명동사의 분사 일치 분석','elles se sont vues / parlé / lavé les mains','대명동사가 être를 쓴다는 이유만으로 분사를 언제나 주어에 맞추면 오류가 생깁니다. se가 직접목적어인지 간접목적어인지, 별도 직접목적어가 뒤에 있는지 확인해야 합니다. 본질적 대명동사는 대체로 주어와 일치하지만 개별 예외도 있습니다.','se를 서로 또는 자신으로 풀어 동사 구조를 확인합니다.|직접목적어가 분사 앞에 있으면 그것과 일치시킵니다.|간접목적어만 있거나 직접목적어가 뒤에 있으면 불변인지 봅니다.','Elles se sont parlé에서 parler à의 se는 간접목적어입니다. Elles se sont vues의 voir는 직접목적어를 취하므로 다르게 처리합니다.',[
'Léa et Julie se sont ___ au téléphone.|parlé|parlées|parlés|레아와 쥘리는 전화로 서로 이야기했습니다.|parler à의 se는 간접목적어여서 parlé는 불변입니다.',
'Elles se sont ___ les mains avant de cuisiner.|lavé|lavées|lavés|그녀들은 요리 전에 손을 씻었습니다.|직접목적어 les mains가 뒤에 있으므로 lavé를 일치시키지 않습니다.',
'Les deux amies se sont ___ à la gare.|retrouvées|retrouvé|retrouvés|두 여자 친구는 역에서 다시 만났습니다.|se가 여성 복수의 직접목적어이므로 retrouvées입니다.'
],'reflexive');
add('C1','지각동사 분사 뒤 원형의 주체','je les ai vus courir / je les ai vu réparer','voir·entendre 같은 동사의 과거분사 뒤에 원형이 오면 앞선 목적어가 그 원형 행동을 하는지 확인해야 합니다. 그 대상이 원형의 행위 주체라면 분사 일치가 가능하고, 원형의 목적어라면 분사를 일치시키지 않습니다. 번역의 자연스러움보다 문장 내부 역할이 기준입니다.','앞선 le·la·les·que가 가리키는 대상을 찾습니다.|그 대상이 뒤 원형의 행동을 하는지 받는지 판별합니다.|행위 주체이면 앞선 직접목적어와 분사를 일치시킵니다.','Les chansons que j’ai entendu chanter에서 노래가 노래하는 것이 아닙니다. 노래는 chanter의 목적어이므로 entendu가 유지됩니다.',[
'Les chanteuses que j’ai ___ chanter sont célèbres.|entendues|entendu|entendus|제가 노래하는 것을 들은 여성 가수들은 유명합니다.|가수들이 chanter의 주체이므로 여성 복수 entendues입니다.',
'Les chansons que j’ai ___ chanter étaient anciennes.|entendu|entendues|entendus|제가 누군가 부르는 것을 들은 노래들은 오래된 곡이었습니다.|노래들은 chanter의 목적어이므로 entendu는 불변입니다.',
'Ces garçons, je les ai ___ traverser la rue.|vus|vu|vues|저는 이 남자아이들이 길을 건너는 것을 보았습니다.|남자아이들이 traverser의 행위 주체이므로 남성 복수 vus입니다.'
],'perception');
add('C1','사역 faire의 구조와 불변 분사','faire réparer · fait + 원형','faire + 원형은 다른 사람에게 일을 하게 하거나 어떤 일이 일어나게 함을 나타냅니다. 복합시제에서 fait가 바로 원형을 이끌면 앞선 목적어의 성·수와 관계없이 불변입니다. 단순히 물건을 만들었다는 faire의 일반 용법과 구별합니다.','직접 행동인지 다른 사람이 하게 한 일인지 구분합니다.|사역이면 faire와 행동 원형을 결합합니다.|복합시제의 fait + 원형에서는 fait를 일치시키지 않습니다.','Les robes qu’elle a faites는 만든 드레스, les robes qu’elle a fait réparer는 수선하게 한 드레스입니다. 원형의 유무가 규칙을 바꿉니다.',[
'Les fenêtres que nous avons ___ remplacer sont neuves.|fait|faites|faits|우리가 교체를 맡긴 창문들은 새것입니다.|fait 뒤 원형 remplacer가 오므로 fait는 불변입니다.',
'Elle a fait ___ son vélo.|réparer|réparé|répare|그녀는 자전거 수리를 맡겼습니다.|사역 faire 다음에는 행동 원형 réparer입니다.',
'Elles se sont ___ couper les cheveux.|fait|faites|faits|그녀들은 머리를 잘랐습니다.|대명동사 구조라도 fait + couper의 fait는 불변입니다.'
],'causative');
add('C1','부정이 아닌 ne explétif','Je crains qu’il ne vienne · plus que je ne pensais','격식 문어에서는 두려움·예방·비교 등의 특정 구문에 부정 의미가 없는 ne가 나타날 수 있습니다. 이 ne는 생략해도 핵심 명제가 유지되며 pas가 붙은 진짜 부정과 구별해야 합니다. 문장을 한국어로 옮길 때 ne를 보자마자 ‘않다’를 넣지 않습니다.','주절이 두려움·비교·예방 구문인지 확인합니다.|ne 뒤에 pas 등 실제 부정 요소가 있는지 살핍니다.|의미상 긍정 사건을 우려하는지 문맥으로 해석합니다.','Je crains qu’il ne parte는 떠날까 걱정한다는 뜻입니다. Je crains qu’il ne parte pas는 떠나지 않을까 걱정한다는 뜻입니다.',[
'Je crains qu’il ne ___ trop tard.|vienne|vient|viendra|그가 너무 늦게 올까 걱정됩니다.|두려움 뒤 접속법 vienne이며 ne는 여기서 부정이 아닙니다.',
'Le trajet est plus long que je ne le ___.|pensais|pensez|pensions|이동 시간이 제가 생각한 것보다 깁니다.|비교절의 ne는 허사이고 je의 과거 생각은 pensais입니다.',
'Partez avant que la situation ne ___ plus grave.|devienne|devient|deviendra|상황이 더 심각해지기 전에 떠나세요.|avant que 뒤 접속법 devienne이며 ne가 심각해짐을 부정하지 않습니다.'
],'expletive');
add('C1','tout가 부사일 때의 예외','tout étonnée · toute petite · toutes seules','tout가 ‘완전히’라는 부사이면 대체로 불변입니다. 그러나 여성 형용사가 자음이나 유음 h로 시작하면 tout가 성·수에 따라 toute·toutes로 변합니다. 모든·전부를 뜻하는 한정사나 대명사 tout와도 역할을 구별해야 합니다.','tout가 전체 수량인지 정도를 나타내는지 판단합니다.|정도를 나타내면 뒤 형용사의 성과 시작 소리를 확인합니다.|여성형 자음·유음 h 앞에서만 예외적으로 일치시킵니다.','Elles sont tout étonnées와 Elles sont toutes petites를 비교하세요. 뒤 형용사의 첫 소리가 일치 여부에 영향을 줍니다.',[
'La chambre est ___ petite.|toute|tout|tous|그 방은 아주 작습니다.|여성 형용사 petite가 자음으로 시작하여 부사도 toute입니다.',
'Léa est ___ étonnée de la nouvelle.|tout|toute|toutes|레아는 그 소식에 몹시 놀랐습니다.|여성 형용사가 모음으로 시작하므로 부사 tout를 불변으로 둡니다.',
'Elles restent ___ seules dans la maison.|toutes|tout|tous|그녀들은 집에 완전히 혼자 남아 있습니다.|여성 복수 형용사 seules가 자음으로 시작하여 toutes입니다.'
],'tout');
add('C1','형용사 위치에 따른 뜻의 차이','un ancien collègue / un bâtiment ancien','일부 형용사는 명사 앞뒤 위치에 따라 의미나 강조가 달라집니다. ancien이 앞에 오면 이전의 관계를, 뒤에 오면 오래된 성질을 나타낼 수 있고 propre도 자신의·깨끗한의 차이가 있습니다. 모든 형용사가 자유롭게 이동하거나 같은 의미 차이를 보이는 것은 아닙니다.','형용사를 무조건 뒤에 놓기 전에 고정 결합을 확인합니다.|추상적 관계와 실제 성질 중 어떤 뜻인지 정합니다.|위치와 성·수 일치를 함께 점검합니다.','un grand homme은 위대한 사람, un homme grand는 키가 큰 사람이라는 기본 대비가 있지만 문맥에 따라 해석이 풍부해질 수 있습니다.',[
'C’est mon ___ professeur ; il ne m’enseigne plus.|ancien|ancienne|anciens|이분은 제 예전 선생님이며 이제 저를 가르치지 않습니다.|이전 관계를 뜻하는 ancien이 명사 앞에 오고 남성 단수에 일치합니다.',
'Elle veut avoir sa ___ chambre, sans la partager.|propre|propres|proprement|그녀는 공유하지 않는 자기만의 방을 원합니다.|명사 앞 propre는 여기서 자신의·전용의 뜻입니다.',
'La cuisine est maintenant ___.|propre|proprement|propres|주방은 이제 깨끗합니다.|서술형용사 propre가 여성 단수 cuisine의 상태를 설명합니다.'
]);
add('C1','부사 위치와 문장의 범위','presque tout · toujours pas · ne…que','부사의 위치는 어떤 말에 영향을 주는지 결정합니다. presque는 전부인지 행위 자체인지에 따라 해석이 달라질 수 있고 toujours pas는 여전히 안 됨을 나타냅니다. 문장을 쓸 때 의도한 범위를 보고 부사를 가까이 배치해야 합니다.','부사가 동사·수량·문장 전체 중 어디에 걸리는지 정합니다.|그 범위가 드러나는 위치에 놓습니다.|부정과 결합하면 순서에 따라 의미가 바뀌는지 다시 읽습니다.','Je n’ai pas toujours compris는 항상 이해한 것은 아님이고 Je n’ai toujours pas compris는 아직도 이해하지 못했다는 뜻입니다.',[
'Il est midi et je n’ai ___ pas reçu de réponse.|toujours|jamais|rien|정오인데 아직도 답을 받지 못했습니다.|지속되는 미완료는 ne…toujours pas로 나타냅니다.',
'J’ai compris presque ___ les explications.|toutes|tout|tous|저는 설명을 거의 전부 이해했습니다.|여성 복수 explications의 전체를 나타내는 toutes입니다.',
'Elle a ___ terminé : il reste une seule phrase.|presque|jamais|aucune|그녀는 거의 끝냈고 문장 하나만 남았습니다.|완료 직전이라는 정도를 presque terminé로 표현합니다.'
]);
add('C1','격식 문어의 도치','Peut-être viendra-t-il · Encore faut-il…','일부 부사나 고정 표현이 문장 앞에 오면 격식 문어에서 주어 대명사 도치를 사용합니다. 모음 충돌을 피하는 연결 -t-와 하이픈 표기도 중요합니다. 일상 회화에서는 que절 등 다른 구조로 말할 수 있으므로 도치를 모든 문장에 강제하지 않습니다.','문두 표현이 도치를 허용·요구하는 격식 구문인지 봅니다.|동사 뒤에 주어 대명사를 하이픈으로 연결합니다.|3인칭 모음 연결에는 필요할 때 -t-를 넣습니다.','Peut-être qu’il viendra도 쓰입니다. 이 수업은 격식 있는 직접 도치 표현을 읽고 쓰는 연습입니다.',[
'Peut-être ___-t-il demain.|viendra|viendront|viendras|아마 그는 내일 올지도 모릅니다.|il의 미래형 viendra 뒤에 연결 -t-il을 둡니다.',
'Encore ___-il vérifier les chiffres.|faut|fallent|faudrez|그래도 수치를 확인해야 합니다.|Encore faut-il은 필요한 조건을 덧붙이는 격식 구문입니다.',
'À peine était-elle arrivée que le téléphone ___.|sonna|sonnèrent|sonnai|그녀가 도착하자마자 전화가 울렸습니다.|문학 서술의 단수 téléphone 주어에 단순과거 sonna가 일치합니다.'
]);
add('C1','관계절의 직설법과 접속법','un outil qui fonctionne / qui puisse…','관계절이 이미 아는 실제 대상을 묘사하면 직설법이 자연스럽습니다. 원하는 조건에 맞는 대상을 찾거나 존재를 부정할 때는 접속법으로 가능성·평가를 드러낼 수 있습니다. le seul·le meilleur 같은 표현 뒤에도 문맥에 따른 동사법 선택이 있습니다.','선행사가 특정된 실제 대상인지 찾는 조건인지 확인합니다.|실재 사실의 설명이면 직설법을 검토합니다.|불확정·부정·평가의 조건이면 접속법을 검토합니다.','chercher 뒤라고 언제나 접속법인 것은 아닙니다. 알고 있는 특정 대상을 찾는다면 직설법 관계절도 가능합니다.',[
'Je cherche un logiciel qui ___ fonctionner sans Internet.|puisse|peuvent|pouvons|인터넷 없이 작동할 수 있는 소프트웨어를 찾고 있습니다.|아직 특정하지 않은 기능 조건을 접속법 puisse로 제시합니다.',
'Je ne connais personne qui ___ résoudre ce problème.|sache|savons|savent|이 문제를 풀 줄 아는 사람을 아는 이가 없습니다.|대상의 존재를 부정하는 관계절에서 접속법 sache입니다.',
'Voici le collègue qui ___ créé cette application.|a|ait|avoir|이 사람이 이 앱을 만든 동료입니다.|특정 실제 인물의 확인된 사실을 직설법 a créé로 설명합니다.'
]);
add('C1','명사화로 논증을 조직하기','le fait que · la décision de · l’absence de','보고서·논문에서는 사건을 명사구로 바꾸어 원인·결과·평가의 대상으로 삼습니다. 명사화는 문장을 압축하지만 행위자나 시간 정보가 흐려질 수 있으므로 필요한 정보를 남겨야 합니다. le fait que의 동사법은 정보 상태와 화자의 관점에 따라 달라집니다.','어떤 사건을 논의의 대상으로 삼을지 정합니다.|동사에서 파생한 명사 또는 le fait de/que를 선택합니다.|행위자·시간·원인을 잃지 않도록 보충어를 붙입니다.','le fait que 뒤에 접속법이 온다고 사실이 거짓인 것은 아닙니다. 정보의 전제·평가와 단순 전달을 구별하세요.',[
'La décision ___ fermer l’usine a surpris les salariés.|de|à|pour que|공장 폐쇄 결정은 직원들을 놀라게 했습니다.|décision의 내용을 원형으로 연결할 때 de를 씁니다.',
'L’absence ___ données fiables limite cette étude.|de|aux|à|신뢰할 만한 자료의 부재가 이 연구를 제한합니다.|absence의 내용을 de données로 연결합니다.',
'Le fait de ___ les résultats permet de comparer les méthodes.|publier|publié|publie|결과를 공개하면 방법들을 비교할 수 있습니다.|le fait de 뒤에는 명사화된 행동의 원형 publier입니다.'
]);
add('C1','불특정 양보로 태도 유지하기','quoi que · où que · quel que soit','어떤 일이 일어나거나 어디에 있든 결론이 같음을 말할 때 불특정 양보 표현을 씁니다. quoi que·où que 뒤에는 접속법이 오고 quel que soit의 quel은 뒤 주어의 성·수에 일치합니다. 양보의 범위와 뒤 동사 형태를 함께 익힙니다.','결론에 영향을 주지 않는 대상이 무엇인지 정합니다.|일·장소·성질에 맞는 양보 표현을 고릅니다.|접속법과 quel의 성·수 일치를 확인합니다.','quoi que는 무엇을 하든, quoique는 비록이라는 뜻입니다. 띄어쓰기가 다른 문법 구조를 나타냅니다.',[
'Quoi que tu ___, nous resterons amis.|fasses|fais|feras|네가 무엇을 하든 우리는 친구로 남을 것입니다.|불특정 양보 quoi que 뒤 faire의 접속법 fasses입니다.',
'Où que vous ___, gardez le contact.|soyez|êtes|serez|어디에 있든 연락을 유지하세요.|불특정 장소의 양보절은 접속법 soyez입니다.',
'___ que soient les difficultés, nous continuerons.|Quelles|Quels|Quelle|어떤 어려움이 있더라도 계속하겠습니다.|여성 복수 주어 difficultés에 Quelles가 일치합니다.'
],'conjunction');
add('C2','문학 서술의 단순과거 읽기','il parla · elle finit · il fut · ils vinrent','단순과거는 오늘날 주로 소설·역사 서술 같은 글에서 사건을 전개하는 데 사용됩니다. 일상 회화에서는 복합과거가 흔하므로 이 단계는 독해와 문체 선택을 중심으로 학습합니다. 불규칙형의 어간과 3인칭 복수형을 별도로 익히면 낯선 문장을 읽기 쉬워집니다.','서술이 문학적인 과거 이야기인지 확인합니다.|단순과거의 -a/-èrent·-it/-irent·-ut/-urent 등을 식별합니다.|배경 반과거와 사건 단순과거의 역할을 비교합니다.','단순과거가 오직 아주 오래전 사실에만 쓰이는 것은 아닙니다. 화자의 서술 방식과 문체가 선택에 관여합니다.',[
'Le voyageur ouvrit la porte et ___ dans la pièce.|entra|entrèrent|entrai|여행자는 문을 열고 방으로 들어갔다.|문학 서술의 남성 단수 주어에 entrer 단순과거 entra가 일치합니다.',
'Les enfants ___ vers la lumière.|coururent|courut|courûmes|아이들은 빛을 향해 달려갔다.|courir의 단순과거 3인칭 복수는 coururent입니다.',
'La nouvelle ___ un grand choc pour le village.|fut|furent|fûmes|그 소식은 마을에 큰 충격이었다.|être의 단순과거 3인칭 단수는 fut입니다.'
],'literary');
add('C2','문학적 선행 완료인 전과거','dès qu’il eut fini · lorsqu’elle fut partie','전과거는 avoir·être의 단순과거와 과거분사를 결합한 형태입니다. 문학 서술에서 단순과거 사건보다 먼저 완료된 일을 특히 시간 접속사 뒤에서 나타냅니다. 일반 회화에서는 복합과거·대과거 등의 다른 구성이 더 흔합니다.','뒤의 기준 사건이 단순과거인지 확인합니다.|그보다 먼저 완료된 사건의 조동사를 정합니다.|eut·eurent·fut·furent 등과 분사를 연결합니다.','eut와 eût, fut와 fût는 악상 하나로 직설법과 접속법을 구별합니다. 전과거에는 여기서 eut·fut를 씁니다.',[
'Dès qu’il ___ terminé sa lettre, il sortit.|eut|eût|ait|그는 편지를 다 쓰자마자 나갔다.|단순과거 sortit보다 앞선 완료를 전과거 eut terminé로 나타냅니다.',
'Lorsqu’elles ___ arrivées, le spectacle commença.|furent|fussent|soient|그녀들이 도착하자 공연이 시작되었다.|arriver의 전과거는 être 단순과거 furent와 일치한 arrivées입니다.',
'Après que les invités ___ quitté la salle, Paul ferma la porte.|eurent|eussent|aient|손님들이 방을 떠난 뒤 폴은 문을 닫았다.|après que의 직설법과 과거 선행 완료에 eurent quitté를 씁니다.'
],'compound');
add('C2','접속법 반과거의 문학적 형태','qu’il parlât · qu’elle fût · qu’ils vinssent','접속법 반과거는 문학적·고전적 글에서 과거 주절과 연결되어 나타납니다. 현대 일반 용법에서는 접속법 현재로 대체되는 경우가 많으므로 일상 회화의 필수 형식으로 오해하지 않습니다. 특히 3인칭 단수 악상과 불규칙 어간을 알아보는 독해 훈련이 중요합니다.','주절의 과거와 문학적 문체를 확인합니다.|-ât·-ît·-ût·-înt 같은 3인칭 단수 표지를 찾습니다.|현대 접속법 현재로 바꾸어 의미를 확인합니다.','Il voulait qu’elle vînt는 현대적으로 Il voulait qu’elle vienne로 말할 수 있습니다. 문학형을 모른다고 일상 의사소통 문법이 틀린 것은 아닙니다.',[
'Il exigea qu’elle ___ présente. (문학적 접속법 반과거)|fût|fut|était|그는 그녀가 참석할 것을 요구했다.|être의 접속법 반과거 3인칭 단수는 악상이 있는 fût입니다.',
'Le roi souhaitait que son fils ___ courageux. (문학적 접속법 반과거)|devînt|devint|devenait|왕은 아들이 용감해지기를 바랐다.|devenir의 접속법 반과거 3인칭 단수는 devînt입니다.',
'Elle craignait que les enfants ___ trop tard. (문학적 접속법 반과거)|vinssent|vinrent|venaient|그녀는 아이들이 너무 늦게 올까 걱정했다.|venir의 접속법 반과거 3인칭 복수는 vinssent입니다.'
],'subjunctive');
add('C2','접속법 대과거와 문학적 반사실','qu’il eût compris · si j’eusse su','접속법 대과거는 조동사의 접속법 반과거에 과거분사를 붙입니다. 문학적 과거 종속절에서 앞선 완료를 나타내거나, 반사실 가정에서 현대의 조건법 과거와 대응할 수 있습니다. si 뒤에는 언제나 접속법이 불가능하다는 단순화도 이 문학적 용법까지 설명하지는 못합니다.','형태가 eût/fût + 분사인지 확인합니다.|앞선 완료인지 문학적 반사실인지 문맥으로 구분합니다.|현대의 avait/aurait 같은 표현으로 풀어 뜻을 확인합니다.','일반 초급 가정에서는 Si j’avais su, j’aurais agi를 먼저 익힙니다. Si j’eusse su는 문학적 예외 범주로 따로 표시합니다.',[
'Elle regrettait qu’il ___ déjà quitté la ville. (문학적 접속법 대과거)|eût|eut|ait|그녀는 그가 이미 도시를 떠난 것을 아쉬워했다.|문학적 접속법 대과거는 eût quitté이며 eut는 직설법 전과거입니다.',
'Si j’___ connu la vérité, j’aurais refusé. (문학적 반사실)|eusse|eus|aurai|진실을 알았더라면 거절했을 텐데요.|문학적 반사실 조건절의 je형은 eusse connu입니다.',
'Il doutait qu’elles ___ parties avant l’aube. (문학적 접속법 대과거)|fussent|furent|étaient|그는 그녀들이 새벽 전에 떠났는지 의심했다.|partir는 être를 쓰고 접속법 대과거 복수 조동사는 fussent입니다.'
],'literaryCondition');
add('C2','si의 조건·간접 의문·양보 구별','s’il vient / s’il viendra / s’il viendrait','si 뒤 미래·조건법 금지는 조건을 나타내는 기본 구조에 적용됩니다. si가 ‘인지’라는 간접 의문을 이끌 때는 미래나 조건법도 가능합니다. 철자 si 하나만 보고 오류로 처리하지 말고 문장 기능을 판별해야 합니다.','si를 만약인지 ~인지로 바꾸어 봅니다.|조건절이면 조건 시제의 규칙을 적용합니다.|간접 의문이면 실제 질문의 시간·가정을 유지합니다.','Je me demande s’il viendra는 올지 궁금하다는 뜻으로 가능합니다. 이를 Si tu viendras…라는 조건절 오류와 혼동하지 마세요.',[
'Je me demande s’il ___ demain. (미래의 참석 여부)|viendra|viendront|viendras|그가 내일 올지 궁금합니다.|si가 간접 의문을 이끌므로 미래형 viendra가 가능합니다.',
'Elle voulait savoir si nous ___ sans elle. (과거에서 본 미래)|partirions|partiriez|partiraient|그녀는 우리가 자신 없이 떠날 것인지 알고 싶어 했다.|간접 의문과 과거의 미래이므로 nous 조건법 partirions입니다.',
'Si tu ___ disponible demain, appelle-moi.|es|seras|serais|내일 시간이 되면 전화해 줘.|여기는 간접 의문이 아닌 조건절이므로 현재형 es입니다.'
],'si');
add('C2','부정의 범위와 완곡한 의미','pas tous · plus aucun · ne…que','복잡한 부정문에서는 전체 부정과 부분 부정을 구별해야 합니다. pas tous는 전부 그런 것은 아니라는 뜻이고, aucun…ne는 하나도 없음을 나타냅니다. 제한 ne…que와 pas seulement도 범위가 달라 문장의 논리적 주장을 바꿉니다.','부정이 문장 전체인지 수량 일부인지 표시합니다.|tous·aucun·seulement 등과 부정어의 결합을 확인합니다.|긍정적으로 남는 정보가 있는지 한국어로 다시 풀어 봅니다.','Ils ne sont pas tous venus는 아무도 안 왔다는 뜻이 아닙니다. 적어도 모두가 오지는 않았다는 주장입니다.',[
'Ils ne sont pas ___ d’accord : deux personnes s’y opposent.|tous|aucun|personne|그들 모두가 동의한 것은 아니며 두 명은 반대합니다.|부분 부정 pas tous가 전원의 동의를 부정합니다.',
'___ candidat n’a obtenu la majorité.|Aucun|Tous les|Plusieurs|어느 후보도 과반을 얻지 못했습니다.|단수 aucun candidat와 ne가 전면 부정을 만듭니다.',
'Il ne reste plus ___ place disponible.|aucune|toutes|des|이제 빈자리가 하나도 남아 있지 않습니다.|ne…plus aucune는 더 이상 어느 자리도 없음을 뜻합니다.'
]);
add('C2','비인칭 동사와 분사 불변','les efforts qu’il a fallu · il a plu','비인칭 구문의 il은 실제 사람·사물을 가리키는 주어가 아닙니다. falloir·pleuvoir 같은 비인칭 용법의 과거분사는 앞에 복수 명사가 있어도 일반적인 직접목적어 일치를 적용하지 않습니다. 같은 동사도 인칭적·비인칭적 용법이 다르면 분석이 달라질 수 있습니다.','il이 실제 지칭 대상을 갖는지 비인칭 자리인지 확인합니다.|앞 명사가 진짜 직접목적어인지 분석합니다.|비인칭 분사에는 성·수 어미를 기계적으로 붙이지 않습니다.','Les efforts qu’il a fallu fournir에서 efforts는 fournir와 연결됩니다. fallu 앞에 있다는 이유로 fallus를 쓰지 않습니다.',[
'Les efforts qu’il a ___ fournir étaient considérables.|fallu|fallus|fallues|들여야 했던 노력은 상당했습니다.|비인칭 falloir의 분사 fallu는 불변이며 il은 실제 남성 행위자를 가리키지 않습니다.',
'Il a ___ toute la nuit.|plu|plue|plus|밤새 비가 내렸습니다.|비인칭 pleuvoir의 과거분사는 plu로 변하지 않습니다.',
'Les difficultés qu’il y a ___ pendant le projet nous ont ralentis.|eu|eues|eus|프로젝트 중 있었던 어려움들이 우리를 지연시켰습니다.|비인칭 il y a의 과거분사 eu를 앞 명사에 일치시키지 않습니다.'
],'pp');
add('C2','집합·수량 주어의 일치 판단','la plupart des… sont · chacun est','주어에 복수 명사가 가까이 있다고 동사를 항상 복수로 만들면 안 됩니다. la plupart des élèves는 복수와 일치하지만 chacun·tout le monde는 단수입니다. une foule de 같은 집합명사는 초점에 따라 여러 일치가 허용될 수 있으므로 단일 정답 규칙과 가변 용법을 구별합니다.','주어 명사구의 중심과 수량 표현을 찾습니다.|chacun·tout le monde의 단수, la plupart의 보충어 일치를 확인합니다.|가변 집합명사는 문맥과 사전의 허용 범위를 함께 봅니다.','une foule de personnes 뒤 단수·복수가 모두 가능한 맥락이 있습니다. 이 수업은 둘 중 하나를 근거 없이 오답 처리하지 않습니다.',[
'La plupart des élèves ___ compris la consigne.|ont|a|avez|학생 대부분은 지시를 이해했습니다.|la plupart des + 복수 보충어이므로 ont입니다.',
'Chacun des dossiers ___ une signature.|nécessite|nécessitent|nécessitez|각 서류에는 서명이 필요합니다.|주어의 중심 chacun이 단수이므로 nécessite입니다.',
'Tout le monde ___ les mêmes règles.|respecte|respectent|respectons|모두가 같은 규칙을 지킵니다.|tout le monde는 의미상 여러 사람이지만 문법적으로 단수입니다.'
],'quantity');
add('C2','관계대명사로 지칭 모호함 줄이기','laquelle · auquel · ce à quoi','긴 문장에서는 여러 명사가 후보가 되어 관계대명사의 지칭이 모호해질 수 있습니다. lequel 계열의 성·수는 연결 대상을 드러내는 데 도움이 되며, 사물·사건 전체를 받는 ce와 전치사는 ce à quoi 같은 구조를 만듭니다. 문법상 가능하더라도 문장이 복잡하면 반복 명사나 문장 분할이 더 명확할 수 있습니다.','관계절이 정확히 어떤 명사나 사건을 설명하는지 표시합니다.|성·수가 드러나는 lequel 계열이나 ce + 전치사를 검토합니다.|읽는 사람이 다른 선행사로 오해할 수 있으면 문장을 나눕니다.','quoi는 주로 ce·rien·quelque chose 같은 중성 선행사나 전치사 뒤에 쓰입니다. 모든 명사를 quoi로 받을 수는 없습니다.',[
'C’est exactement ce à ___ je pensais.|quoi|qui|que|그것이 바로 제가 생각하던 것입니다.|중성 ce와 penser à를 연결하면 ce à quoi입니다.',
'Le rapport et son annexe, ___ doit être signée, sont prêts.|laquelle|lequel|lesquels|보고서와 그 부록이 준비되었으며 부록에는 서명이 필요합니다.|여성 단수 annexe를 특정하는 laquelle가 모호함을 줄입니다.',
'Voici un sujet ___ il convient de réfléchir.|auquel|duquel|lequel|이것은 숙고할 필요가 있는 주제입니다.|réfléchir à와 남성 단수 sujet를 결합하여 auquel입니다.'
]);
add('C2','quelque와 quel que의 철자·일치','quelques livres · quelque vingt · quels que soient','quelque는 한정사로 수량을 나타내면 복수형 quelques가 가능하고, 숫자 앞에서 대략을 뜻하는 부사이면 불변입니다. quel que는 두 단어로 쓰며 뒤 접속법 주어의 성·수에 일치합니다. 발음이 비슷해도 문장 안 역할을 분석해야 합니다.','뒤에 명사·수사·동사가 오는지 확인합니다.|몇몇은 quelques, 대략 수량은 불변 quelque를 씁니다.|양보의 quel que는 뒤 주어와 성·수를 맞춥니다.','quelque vingt personnes의 quelque는 personnes가 복수여도 -s를 붙이지 않습니다. ‘대략’이라는 부사이기 때문입니다.',[
'___ soient vos raisons, expliquez-les clairement.|Quelles que|Quels que|Quelque|이유가 무엇이든 명확히 설명하세요.|여성 복수 raisons에 맞는 두 단어 Quelles que입니다.',
'Le village compte ___ trois cents habitants.|quelque|quelques|quels que|그 마을에는 약 300명의 주민이 있습니다.|수사 앞에서 대략을 뜻하는 부사 quelque는 불변입니다.',
'J’ai encore ___ questions à vous poser.|quelques|quelque|quelles que|아직 몇 가지 질문을 더 드리고 싶습니다.|복수 명사를 한정하는 몇몇이라는 뜻의 quelques입니다.'
],'quelque');
add('C2','quoique와 quoi que를 의미로 구별하기','quoique = 비록 · quoi que = 무엇을 하든','한 단어 quoique는 bien que와 비슷한 양보 접속사입니다. 두 단어 quoi que는 무엇이든·무엇을 하든이라는 불특정 관계를 나타냅니다. 일반 양보 용법에서는 접속법과 결합하지만 일부 문체적 반론 용법의 quoique는 더 넓은 사용을 보이므로 범위를 구별합니다.','비록으로 바꿀 수 있는지 무엇을 하든으로 바꿀 수 있는지 비교합니다.|비록이면 quoique, 불특정 대상이면 quoi que를 씁니다.|뒤의 접속법과 모음 앞 축약을 확인합니다.','Quoi qu’il dise에서는 무엇을 말하든이라는 뜻이며 que의 e가 축약됩니다. 띄어쓰기와 아포스트로피를 함께 확인하세요.',[
'___ tu décides, je respecterai ton choix.|Quoi que|Quoique|Quelque|네가 무엇을 결정하든 네 선택을 존중하겠습니다.|결정하는 어떤 내용이든이라는 뜻이므로 두 단어 Quoi que입니다.',
'___ fatiguée, elle accepte de nous accompagner.|Quoique|Quoi que|Quels que|피곤하지만 그녀는 우리와 동행하기로 합니다.|비록 피곤하지만이라는 양보이므로 한 단어 Quoique입니다.',
'Quoi qu’il ___, ne te décourage pas.|arrive|arrives|arrivent|무슨 일이 일어나더라도 낙심하지 마세요.|불특정 사건을 나타내는 비인칭 3인칭 단수 arrive입니다.'
],'quoique');
add('C2','성별을 단정하지 않는 정확한 문장','la personne · quiconque · on · les membres','공식 안내문에서는 불필요하게 사람의 성별을 추정하지 않으면서도 문법적 일치를 유지할 수 있습니다. personne·quiconque·on 같은 대명사와 la personne·les membres 같은 명사구의 수·성 규칙을 구별합니다. 표현을 중립적으로 바꾼다고 기존 동사 일치 규칙이 없어지는 것은 아닙니다.','내용상 실제 성별 정보가 필요한지 먼저 판단합니다.|필요 없으면 역할·집단·불특정 대명사로 표현합니다.|새 표현의 문법적 성·수에 따라 형용사와 동사를 다시 맞춥니다.','la personne는 문법적으로 여성 단수이며 실제 대상의 성별을 단정하지 않습니다. quiconque·on은 동사 단수, les membres는 복수라는 점을 함께 확인합니다.',[
'Toute personne intéressée ___ s’inscrire.|peut|peuvent|pouvons|관심 있는 사람은 누구나 등록할 수 있습니다.|toute personne는 문법적으로 단수이므로 peut입니다.',
'Quiconque ___ participer doit lire le règlement.|souhaite|souhaitent|souhaitons|참가를 원하는 사람은 누구나 규정을 읽어야 합니다.|불특정 대명사 quiconque는 3인칭 단수와 일치합니다.',
'Les membres de l’équipe ___ invités à répondre.|sont|est|sommes|팀 구성원들은 답변해 주시기 바랍니다.|주어 les membres가 복수이므로 sont를 사용합니다.'
],'neutral');
})();
