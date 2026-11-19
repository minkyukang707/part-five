'use strict';
// Language facts are separate from character gender and never inferred from a learner's avatar.
const GRAMMAR_FORM_SOURCES={
  trGender:{label:'TUFS · o는 사람과 사물을 가리키는 대명사',url:'https://www.coelang.tufs.ac.jp/mt/tr/gmod/courses/c01/lesson11/step2/explanation/055.html'},
  trNoun:{label:'TUFS · 명사의 모음 탈락·모음 조화 예외',url:'https://www.coelang.tufs.ac.jp/mt/tr/gmod/contents/explanation/097.html'},
  trPerson:{label:'TUFS · 터키어 인칭과 대명사의 격',url:'https://www.coelang.tufs.ac.jp/mt/tr/gmod/contents/explanation/056.html'},
  trPresent:{label:'TUFS · 현재형의 모음·자음 변화와 예외',url:'https://www.coelang.tufs.ac.jp/mt/tr/gmod/contents/explanation/004.html'},
  trAorist:{label:'TUFS · 일반현재의 규칙과 예외',url:'https://www.coelang.tufs.ac.jp/mt/tr/gmod/contents/explanation/025.html'},
  esGender:{label:'RAE · 문법적 성과 성 일치',url:'https://www.rae.es/dpd/g%C3%A9nero'},
  esWater:{label:'RAE · el agua가 여성 명사인 이유',url:'https://www.rae.es/dpd/agua'},
  esPerson:{label:'RAE · usted와 ustedes의 3인칭 일치',url:'https://www.rae.es/dpd/usted'},
  esVerbs:{label:'RAE · 규칙·불규칙 동사 활용표',url:'https://www.rae.es/dpd/ayuda/modelos-de-conjugacion-verbal'},
  jaVerbs:{label:'TUFS · 일본어 세 동사군과 불규칙 활용',url:'https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/explanation/039.html'},
  jaGrammar:{label:'TUFS · 일본어 문법 항목',url:'https://www.coelang.tufs.ac.jp/mt/ja/gmod/steplist.html'},
  enPronouns:{label:'British Council · 사람·동물의 대명사와 단수 they',url:'https://learnenglishteens.britishcouncil.org/sites/teens/files/gs_pronouns_and_possessives_0.pdf'},
  enVerbs:{label:'British Council · 불규칙 동사',url:'https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/irregular-verbs'}
};
const GRAMMAR_FORM_TABLES={
  trPerson:{caption:'먹다: 성별이 아니라 인칭·수에 따라 형태가 달라집니다',headers:['주어','지금 먹는다','어제 먹었다'],rows:[
    ['ben · 나','yiyorum','yedim'],['sen · 너','yiyorsun','yedin'],['o · 그/그녀/그것','yiyor','yedi'],['biz · 우리','yiyoruz','yedik'],['siz · 여러분/정중한 당신','yiyorsunuz','yediniz'],['onlar · 그들/그것들','yiyor / yiyorlar','yedi / yediler']],
    note:'3인칭 복수의 -lar/-ler는 주어를 명시했는지와 유정성·문맥에 따라 사용이 달라집니다. 사람 복수도 단수형 동사가 가능하며, 비인간 복수 주어에는 보통 3인칭 단수 동사가 옵니다. o를 쓰는 사람·동물의 성별은 동사에 표시하지 않습니다.'},
  trHarmony:{caption:'모음 조화는 무작위 불규칙이 아닌 규칙입니다',headers:['마지막 모음','두 갈래 A','네 갈래 I','대격 예'],rows:[
    ['a, ı','a','ı','kitap → kitabı'],['e, i','e','i','ev → evi'],['o, u','a','u','okul → okulu'],['ö, ü','e','ü','göl → gölü']],
    note:'A/I는 설명용 기호입니다. 접사가 결합할 때의 마지막 모음을 봅니다. 무성음 뒤 d→t는 자음 조화이며, 일부 차용어에는 saat→saati처럼 사전에서 확인해야 하는 예외도 있습니다.'},
  trPresent:{caption:'진행형: 규칙적 변화와 별도로 익힐 형태',headers:['원형','3인칭 진행형','구별할 점'],rows:[
    ['başlamak','başlıyor','어간 끝 a가 좁은 모음으로 변함'],['söylemek','söylüyor','e가 ü로 변함'],['gitmek','gidiyor','이 동사에서는 t→d'],['etmek','ediyor','이 동사에서는 t→d'],['yemek','yiyor','ye- → yi-'],['demek','diyor','de- → di-']],
    note:'모든 t 어간이 d로 바뀌는 것은 아닙니다. atmak→atıyor처럼 그대로인 동사도 있습니다. -yor 뒤의 인칭 접사는 yiyor-um처럼 마지막 모음 o를 기준으로 결합합니다.'},
  trCase:{caption:'인칭대명사의 격 변화',headers:['주격','대격: ~을','방향격: ~에게','소유격: ~의'],rows:[
    ['ben','beni','bana','benim'],['sen','seni','sana','senin'],['o','onu','ona','onun'],['biz','bizi','bize','bizim'],['siz','sizi','size','sizin'],['onlar','onları','onlara','onların']],
    note:'ben→bana, sen→sana는 bene/sene로 만들지 않습니다. onun kitabı의 onun은 소유자의 성별을 밝히지 않습니다. 모든 격을 나타내는 전체 표가 아니라 자주 쓰는 네 형태를 비교한 표입니다.'},
  trAorist:{caption:'일반현재의 불규칙 어간과 인칭별 부정',headers:['형태','긍정','부정'],rows:[
    ['ben + gelmek','gelirim','gelmem'],['sen + gelmek','gelirsin','gelmezsin'],['o + gelmek','gelir','gelmez'],['biz + gelmek','geliriz','gelmeyiz'],['siz + gelmek','gelirsiniz','gelmezsiniz'],['onlar + gelmek','gelir(ler)','gelmez(ler)'],['almak / bilmek / görmek','alır / bilir / görür','almaz / bilmez / görmez']],
    note:'한 음절 어간이라고 모두 -ar/-er가 아닙니다. gel-, al-, bil-, gör- 등은 따로 익힙니다. 부정에서 1인칭 gelmem/gelmeyiz와 나머지 인칭의 gelmez-를 구별하세요.'},
  trNoun:{caption:'명사에 모음 시작 접사가 붙을 때',headers:['기본형','변화형','설명'],rows:[
    ['kitap','kitabı','일부 명사의 p→b'],['renk','rengi','이 단어에서는 k→g'],['ağaç','ağacı','일부 명사의 ç→c'],['burun','burnu','둘째 음절 모음 탈락'],['şehir','şehri','둘째 음절 모음 탈락'],['saat','saati','차용어의 전설 모음 접사'],['hukuk','hukuku','k가 항상 바뀌지는 않음']],
    note:'자음 연음이나 모음 탈락은 모든 명사에 일괄 적용하지 않습니다. 사전형과 활용형을 함께 외우세요. 고유명사의 표기·아포스트로피 규칙은 별도입니다.'},
  esPerson:{caption:'인칭·수에 따른 현재형: 성별은 동사 어미를 바꾸지 않습니다',headers:['주어','hablar','comer','vivir'],rows:[
    ['yo','hablo','como','vivo'],['tú','hablas','comes','vives'],['él / ella / usted','habla','come','vive'],['nosotros / nosotras','hablamos','comemos','vivimos'],['vosotros / vosotras','habláis','coméis','vivís'],['ellos / ellas / ustedes','hablan','comen','viven']],
    note:'usted는 상대 한 사람을 부르지만 문법상 3인칭 단수, ustedes는 3인칭 복수형과 일치합니다. 스페인 대부분의 vosotros와 아메리카의 ustedes 사용 차이가 있습니다. vos 지역의 활용은 지역별로 따로 확인해야 합니다.'},
  esGender:{caption:'문법적 성을 실제 성별·철자와 혼동하지 않기',headers:['표현','분류','일치 예'],rows:[
    ['el libro / la mesa','사물에도 문법적 성','el libro nuevo / la mesa nueva'],['el día / la mano','어말만으로 판별 불가','el día largo / la mano fría'],['el/la estudiante','명사형은 같고 관사·형용사가 변함','el estudiante alto / la estudiante alta'],['la persona / la víctima','대상의 성별과 무관하게 여성 명사','la víctima está herida'],['el agua','여성 명사, 강세 a 앞 관사 el','el agua fría / las aguas frías'],['el gato / la gata','일부 동물은 성별 어휘 구별','el gato negro / la gata negra']],
    note:'la víctima가 남성을 가리켜도 이 명사에 직접 일치하는 형용사는 여성형입니다. 관사 el이 보인다고 항상 남성 명사는 아닙니다. agua 앞에 형용사가 들어가면 la fría agua처럼 la를 씁니다.'},
  esIrregular:{caption:'자주 쓰는 불규칙 현재형',headers:['주어','ser','estar','ir','tener'],rows:[
    ['yo','soy','estoy','voy','tengo'],['tú','eres','estás','vas','tienes'],['él / ella / usted','es','está','va','tiene'],['nosotros/as','somos','estamos','vamos','tenemos'],['vosotros/as','sois','estáis','vais','tenéis'],['ellos / ellas / ustedes','son','están','van','tienen']],
    note:'tengo 같은 yo형과 tienes 같은 어간 변화가 한 동사 안에 함께 나타날 수 있습니다. yo가 여성이라고 soya, tenga로 바꾸는 규칙은 없습니다.'},
  esStem:{caption:'현재 직설법 어간 변화의 범위',headers:['주어','pensar: e→ie','dormir: o→ue','pedir: e→i'],rows:[
    ['yo','pienso','duermo','pido'],['tú','piensas','duermes','pides'],['él / ella / usted','piensa','duerme','pide'],['nosotros/as','pensamos','dormimos','pedimos'],['vosotros/as','pensáis','dormís','pedís'],['ellos / ellas / ustedes','piensan','duermen','piden']],
    note:'이 표는 현재 직설법입니다. nosotros/vosotros에서 어간 모음이 유지되는 이 패턴을 모든 시제에 확대하면 안 됩니다. 단순과거 durmió·pidió처럼 다른 변화도 있습니다.'},
  esPast:{caption:'완료된 과거의 주요 불규칙형',headers:['주어','ser / ir','tener','hacer'],rows:[
    ['yo','fui','tuve','hice'],['tú','fuiste','tuviste','hiciste'],['él / ella / usted','fue','tuvo','hizo'],['nosotros/as','fuimos','tuvimos','hicimos'],['vosotros/as','fuisteis','tuvisteis','hicisteis'],['ellos / ellas / ustedes','fueron','tuvieron','hicieron']],
    note:'ser와 ir의 이 과거형은 같아서 뜻은 문맥으로 구별합니다. 이 표의 단순과거형에는 규칙형 hablé처럼 강세 부호를 추가하지 않습니다.'},
  esAgreement:{caption:'성·수 일치를 하는 자리와 하지 않는 자리',headers:['구성','예문','일치 기준'],rows:[
    ['일반 활용 동사','Él come. / Ella come.','인칭·수: 성별 때문에 come를 바꾸지 않음'],['형용사','Él está cansado. / Ella está cansada.','주어와 성·수 일치'],['haber + 분사','Ellas han llegado.','분사는 llegado로 유지'],['ser 수동 + 분사','Las puertas fueron abiertas.','분사는 주어 성·수에 일치'],['소유형용사','su libro / sus libros','소유물의 수: su만으로 소유자 성별은 모름'],['소유형용사 nuestro','nuestro libro / nuestra casa','소유물의 성·수']],
    note:'스페인어의 모든 단어가 남성형·여성형으로 나뉘는 것은 아닙니다. feliz처럼 성별 형태가 같고 felices처럼 수만 변하는 형용사도 있습니다.'},
  jaPerson:{caption:'주어를 바꾸어도 동사는 같은 형태',headers:['주어','정중한 현재','정중한 과거'],rows:[
    ['私 · 나','食べます','食べました'],['あなた · 상대','食べます','食べました'],['彼 / 彼女 · 그 / 그녀','食べます','食べました'],['私たち · 우리','食べます','食べました'],['犬 · 개','食べます','食べました']],
    note:'인칭·성·수 때문에 동사 어미가 바뀌지 않습니다. 시제·부정·정중함·태 등은 바뀝니다. 彼/彼女처럼 성별을 구분하는 어휘는 있고, 상대를 부를 때는 대명사보다 이름·직함이 자연스러운 문맥도 많습니다.'},
  jaGroups:{caption:'る로 끝난다고 전부 같은 동사군은 아닙니다',headers:['원형','ます형','ない형','동사군'],rows:[
    ['食べる · たべる','食べます','食べない','一段 · 2그룹'],['見る · みる','見ます','見ない','一段 · 2그룹'],['帰る · かえる','帰ります','帰らない','五段 · 1그룹'],['入る · はいる','入ります','入らない','五段 · 1그룹'],['走る · はしる','走ります','走らない','五段 · 1그룹'],['切る · きる','切ります','切らない','五段 · 1그룹'],['着る · きる','着ます','着ない','一段 · 2그룹']],
    note:'-いる/-える로 들리는 동사에도 五段동사가 있습니다. ‘들어가다 入る’와 ‘필요하다 要る’도 분류를 확인하세요. 표의 ない형은 보통체 부정이며 주어 성별과 관계없습니다.'},
  jaIrregular:{caption:'する·来る의 활용을 한 묶음으로',headers:['형태','する','来る'],rows:[
    ['정중형','します','来ます · きます'],['보통체 부정','しない','来ない · こない'],['て형','して','来て · きて'],['た형','した','来た · きた'],['가능','できる','来られる · こられる'],['의지','しよう','来よう · こよう']],
    note:'来는 형태에 따라 く・き・こ로 읽힙니다. 来られる는 문맥에 따라 가능·수동·존경 해석이 가능하며 이 표는 가능 용법입니다. 구어의 ら 탈락형은 표준 입문 연습의 정답으로 사용하지 않습니다.'},
  jaSound:{caption:'て형·た형의 규칙과 예외',headers:['어말/동사','て형','た형'],rows:[
    ['買う / 待つ / 帰る','買って / 待って / 帰って','買った / 待った / 帰った'],['読む / 遊ぶ / 死ぬ','読んで / 遊んで / 死んで','読んだ / 遊んだ / 死んだ'],['書く / 泳ぐ','書いて / 泳いで','書いた / 泳いだ'],['話す','話して','話した'],['行く · 예외','行って','行った'],['ある · 부정 예외','없다는 ない','없었다는 なかった']],
    note:'이 어말 규칙은 五段동사에 적용합니다. 食べる 같은 一段동사는 食べて/食べた입니다. ある의 부정은 보통체에서 ない, 정중체에서는 ありません입니다.'},
  jaAdjective:{caption:'형용사 종류에 따른 부정·과거',headers:['기본형','보통체 부정','보통체 과거','명사 수식'],rows:[
    ['高い','高くない','高かった','高い山'],['いい · 예외','よくない','よかった','いい本'],['かっこいい','かっこよくない','かっこよかった','かっこいい人'],['きれいだ','きれいではない','きれいだった','きれいな花'],['静かだ','静かではない','静かだった','静かな部屋']],
    note:'きれい는 끝의 발음이 い여도 な형용사입니다. 명사나 사람의 성별에 맞춰 형용사를 바꾸는 체계가 아닙니다. 정중체는 高かったです, 静かでした처럼 구별합니다.'},
  jaHonorific:{caption:'성별이 아니라 높이는 대상에 따른 표현',headers:['기본 동사','존경: 상대 등의 행동','겸양: 자신 측 행동'],rows:[
    ['いる','いらっしゃる','おる'],['行く / 来る','いらっしゃる','参る'],['する','なさる','いたす'],['言う','おっしゃる','申す'],['食べる / 飲む','召し上がる','いただく']],
    note:'누가 행동하고 누구에게 말하는지 먼저 판단합니다. 회사 밖 사람에게 자기 회사 구성원의 행동을 말할 때도 자신 측 표현이 필요할 수 있습니다. いらっしゃいます·なさいます처럼 ます형의 특수 변화도 있습니다.'},
  enPerson:{caption:'영어도 인칭·수에 따라 달라집니다',headers:['주어','be 현재','eat 현재','be 과거'],rows:[
    ['I','am','eat','was'],['you','are','eat','were'],['he / she / it','is','eats','was'],['we','are','eat','were'],['they · 복수/단수','are','eat','were']],
    note:'한 사람을 가리키는 단수 they도 they are / they eat입니다. he와 she 사이에서 동사형은 같으며, 동물이라고 별도의 동사 활용을 쓰지 않습니다.'},
  enIrregular:{caption:'과거형과 과거분사를 구별하세요',headers:['원형','과거','과거분사'],rows:[
    ['go','went','gone'],['eat','ate','eaten'],['see','saw','seen'],['have','had','had'],['do','did','done'],['write','wrote','written']],
    note:'have/has + 과거분사와 과거형을 구별합니다. did 뒤에는 원형을 써 Did she go?라고 합니다. child→children, person→people 같은 흔한 불규칙 복수도 따로 익힙니다.'}
};
const GRAMMAR_FORM_GUIDES={
  tr:{name:'터키어',tables:['trPerson','trCase'],facts:[
    '터키어에는 스페인어식 문법적 성 일치가 없습니다. o는 문맥에 따라 그·그녀·그것을 가리킵니다. O şu an yemek yiyor.만으로 대상의 성별이나 사람·동물 여부를 확정할 수 없습니다. şu an은 띄어 씁니다.',
    '성별에 따른 변화가 없더라도 인칭·수에 따른 변화는 있습니다. Ben yiyorum, Sen yiyorsun, O yiyor처럼 접사가 달라집니다. 대명사를 생략해도 동사 어미가 단서를 줄 수 있습니다.',
    '모음 조화·자음 조화는 규칙적인 변화입니다. yiyor/diyor, bana/sana, 일부 일반현재·명사 변화처럼 별도로 익힐 예외와 나누어 공부합니다.'
  ],sources:['trGender','trPerson','trPresent','trAorist','trNoun']},
  es:{name:'스페인어',tables:['esPerson','esGender'],facts:[
    '문법적 성은 사람의 성별만을 나누는 규칙이 아닙니다. 사물 명사에도 el libro, la mesa처럼 성이 있고 관사·형용사가 일치합니다. 명사는 관사와 함께 익히세요.',
    'Él come와 Ella come의 동사형은 같습니다. 일반적인 동사 활용은 인칭·수에 따르며 성별 때문에 바뀌지 않습니다. 반면 cansado/cansada 같은 형용사는 성·수 일치가 필요합니다.',
    'el día, la mano처럼 어말 예외, la víctima처럼 대상의 성별과 독립적인 명사, el agua fría처럼 관사 el과 여성형용사가 함께 오는 경우를 구별합니다.'
  ],sources:['esGender','esWater','esPerson','esVerbs']},
  ja:{name:'일본어',tables:['jaPerson','jaGroups'],facts:[
    '동사·형용사는 주어의 인칭·성·수에 맞춰 활용하지 않습니다. 私は食べます, 彼女は食べます, 犬は食べます의 동사형은 같습니다. 그렇다고 시제·부정·정중함에 따른 변화까지 없는 것은 아닙니다.',
    '명사의 문법적 성 일치 체계는 없지만 彼/彼女 같은 성별 어휘는 있습니다. いる/ある는 기본적으로 사람·동물과 사물·식물의 존재를 구별하며 성별 구별이 아닙니다.',
    '五段·一段·する/来る를 구별하고 行く→行って, ある→ない, いい→よかった 같은 예외를 익힙니다. 경어는 성별이 아니라 관계와 행동의 주체·대상에 따라 선택합니다.'
  ],sources:['jaGrammar','jaVerbs']},
  en:{name:'영어',tables:['enPerson','enIrregular'],facts:[
    '영어를 사람은 he/she, 동물은 무조건 it으로만 나누면 정확하지 않습니다. 성별을 특정하지 않은 동물에 it을 흔히 쓰지만, 성별을 알거나 친숙한 반려동물에는 he/she도 씁니다.',
    '사람의 성별을 모르거나 드러낼 필요가 없을 때, 또는 그 사람이 사용하는 대명사에 따라 단수 they를 쓸 수 있습니다. 한 사람이어도 they are / they have처럼 일치시킵니다.',
    '보통 명사·형용사가 남성·여성에 맞춰 변하지는 않습니다. 대신 인칭·수에 따른 be, 3인칭 단수 -s, 불규칙 과거·분사와 불규칙 복수를 구별해야 합니다. 대명사는 맥락과 지칭 대상에 맞게 고릅니다.'
  ],sources:['enPronouns','enVerbs']}
};
const GRAMMAR_COMPARISON={
  caption:'언어마다 무엇이 형태를 바꾸는지 먼저 구별하세요',
  headers:['언어','성별·문법적 성','인칭·수와 동사','별도로 확인할 변화'],
  rows:[
    ['터키어','o에 성별 구분 없음; 문법적 성 일치 없음','ben yiyorum / sen yiyorsun / o yiyor','모음·자음 조화, 예외 어간, 격·소유 접사'],
    ['스페인어','명사의 성과 관사·형용사 일치','él come / ella come; yo como','어간 변화, 불규칙 활용, 지역별 호칭'],
    ['일본어','문법적 성 일치 없음; 성별 어휘는 있음','私も彼女も食べます','동사군·음편, 시제·부정, 경어'],
    ['영어','대명사에 구분; 동물에도 he/she 가능','he/she/it eats; they eat','be, 불규칙 과거·분사, 불규칙 복수']
  ],
  note:'문법적 성, 지칭 대상의 성별, 인칭, 단수·복수, 유정성(사람·동물 등)을 서로 다른 기준으로 봅니다. 한 언어의 기준을 다른 언어에 그대로 적용하지 마세요.'
};
