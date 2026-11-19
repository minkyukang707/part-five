'use strict';
(()=>{
  const rows=a=>a.map(s=>s.split('|'));
  function add(code,level,title,pattern,explanation,steps,pitfall,exercises,tables,sources){
    expandGrammar(code,level,null,title,pattern,explanation,steps,pitfall,rows(exercises),GRAMMAR_FORM_SOURCES[sources[0]]);
    const lesson=GRAMMAR_COURSES[code].levels[level].at(-1);
    lesson.examples.forEach(example=>{example.sentence=example.sentence.replace(/\s+\([^()]*\)$/,'');});
    lesson.example=lesson.examples[0].sentence;
    lesson.formTables=tables;lesson.morphology=true;
    lesson.references=[...sources.map(id=>GRAMMAR_FORM_SOURCES[id]),...lesson.references].filter((r,i,a)=>a.findIndex(x=>x.url===r.url)===i);
  }
  function enrich(code,level,index,tables,sources){
    const lesson=GRAMMAR_COURSES[code].levels[level][index];lesson.formTables=tables;
    lesson.references=[...sources.map(id=>GRAMMAR_FORM_SOURCES[id]),...lesson.references].filter((r,i,a)=>a.findIndex(x=>x.url===r.url)===i);
  }
  add('tr','A1','성별과 인칭을 따로 보기','o yiyor / ben yiyorum / sen yiyorsun','o는 그·그녀·그것을 가리키며 사람이나 동물인지도 문맥에 달려 있습니다. O şu an yemek yiyor.는 대상을 특정할 추가 정보가 없으면 성별을 알려 주지 않습니다. 그러나 1·2·3인칭과 단수·복수에 따른 동사 어미는 있으므로 모든 주어에 yiyor만 쓰는 것은 아닙니다.','누가 행동하는지 ben·sen·o·biz·siz·onlar로 먼저 정합니다.|진행형 yiyor 뒤에 인칭을 붙입니다. yiyor-um, yiyor-sun처럼 마지막 모음 o에 맞춥니다.|대상의 성별을 바꾸는 것과 인칭을 바꾸는 것을 비교합니다. o가 가리키는 대상이 여자에서 남자로 바뀌어도 yiyor는 같습니다.','siz는 여러 상대뿐 아니라 정중한 한 사람에게도 씁니다. onlar의 복수 동사 어미는 문맥에 따라 생략될 수 있으므로 yiyor와 yiyorlar를 무조건 정답·오답으로 나누지 않습니다.',[
    'Ben şu an yemek ___.|yiyorum|yiyorsun|yiyor|저는 지금 식사하고 있습니다.|ben에는 -um이 필요합니다. 성별이 아니라 1인칭 단수 일치입니다.',
    'Sen şu an yemek ___.|yiyorsun|yiyorum|yiyoruz|너는 지금 식사하고 있어.|sen의 2인칭 단수 접사는 -sun입니다.',
    'O şu an yemek ___. (여성을 가리킴)|yiyor|yiyorsun|yiyorum|그녀는 지금 식사하고 있습니다.|o가 여성을 가리켜도 3인칭 단수 yiyor입니다.',
    'O bahçede yemek ___. (수컷 강아지를 가리킴)|yiyor|yiyorum|yiyorsunuz|그 강아지는 정원에서 먹고 있습니다.|대상이 동물이어도 o의 3인칭 단수형은 같습니다.',
    'Biz şu an yemek ___.|yiyoruz|yiyorum|yiyorsun|우리는 지금 식사하고 있습니다.|1인칭 복수 biz에는 -uz를 붙입니다.',
    'Siz şu an yemek ___.|yiyorsunuz|yiyorsun|yiyorum|당신은 지금 식사하고 계십니다 / 여러분은 지금 식사하고 있습니다.|siz는 정중한 단수나 복수이며 동사는 yiyorsunuz입니다.'
  ],['trPerson'],['trGender','trPerson','trPresent']);
  add('tr','A1','모음 조화와 자음 조화 구별','A: a/e · I: ı/i/u/ü · D: d/t','터키어 접사의 여러 모양은 상당 부분 규칙으로 설명됩니다. -lar/-ler 같은 두 갈래 모음 조화, -ı/-i/-u/-ü 같은 네 갈래 조화, 무성음 뒤 d→t를 나누어 이해해야 합니다. 어간 자체가 바뀌는 어휘별 예외와 같은 현상으로 묶지 마세요.','접사가 두 갈래 A인지 네 갈래 I인지 먼저 확인합니다.|바로 앞 단어·어간의 마지막 모음을 표에 대입합니다. 접사가 여러 개면 바로 앞 형태의 마지막 모음을 봅니다.|d로 시작하는 접사는 앞의 마지막 자음도 확인합니다. park-ta, ev-de처럼 결정됩니다.','자음이 바뀌는 kitap→kitabı와 접사의 d가 바뀌는 kitapta는 변화 위치가 다릅니다. 일부 차용어에는 saat→saati 같은 예외가 있습니다.',[
    'Bu kitab___ okudum.|ı|i|u|이 책을 읽었습니다.|kitap의 마지막 모음 a에 대응하는 대격은 -ı이며 어간 p도 b로 바뀝니다.',
    'Okul___ görüyorum. (그 학교를)|u|ı|ü|저는 그 학교를 보고 있습니다.|okul의 마지막 모음 u에 맞는 대격 -u입니다.',
    'Göl___ seviyorum. (그 호수를)|ü|u|i|저는 그 호수를 좋아합니다.|göl의 ö에 대응하는 네 갈래 조화는 ü입니다.',
    'Ev___ anahtarı burada. (집의)|in|ın|un|집의 열쇠는 여기 있습니다.|ev의 e에 맞춰 소유격 -in을 붙입니다.',
    'Park___ çocuklar oynuyor.|ta|da|te|공원에서 아이들이 놀고 있습니다.|a에 맞는 모음과 무성음 k 뒤 t가 함께 필요합니다.',
    'Otobüs___ iniyorum.|ten|den|tan|저는 버스에서 내리고 있습니다.|ü에 맞는 e와 무성음 s 뒤 t를 골라 -ten입니다.'
  ],['trHarmony'],['trPresent','trPerson']);
  add('tr','A2','진행형의 어간 변화와 예외','yemek → yiyor · demek → diyor','진행형은 어간에 단순히 yor만 붙이면 항상 완성되는 것이 아닙니다. 어간 말 a/e가 좁은 모음으로 바뀌는 규칙, gitmek·etmek의 t→d, yemek·demek의 yi-/di-를 구별합니다. 인칭은 변화된 진행형 뒤에 붙입니다.','동사원형의 -mak/-mek을 빼고 어간을 확인합니다.|başla→başlıyor처럼 규칙적 변화인지, ye→yiyor처럼 따로 외울 형태인지 비교합니다.|마지막으로 인칭을 붙입니다. yiyor-um과 yiyor-sun은 동일한 어간 변화에 다른 인칭이 결합한 것입니다.','모든 t가 d로 변하지 않습니다. atmak은 atıyor입니다. 어간 끝 a/e 변화와 불규칙 어간을 별도 목록으로 익히세요.',[
    'Çocuk şimdi yemek ___. (yemek)|yiyor|yeyor|yeiyor|아이가 지금 먹고 있습니다.|yemek의 진행형은 yiyor이며 yeyor로 만들지 않습니다.',
    'Öğretmen ne ___? (demek)|diyor|deyor|deiyor|선생님이 뭐라고 말씀하시나요?|demek의 진행형은 diyor입니다.',
    'Ben şimdi eve ___. (gitmek)|gidiyorum|gitiyorum|gityorum|저는 지금 집에 가고 있습니다.|git-는 이 활용에서 gid-로 바뀌고 -iyorum이 붙습니다.',
    'O bana yardım ___. (etmek)|ediyor|etiyor|etyor|그 사람은 저를 도와주고 있습니다.|etmek의 진행형은 ediyor입니다.',
    'Ders şimdi ___. (başlamak)|başlıyor|başlayor|başliyor|수업이 지금 시작하고 있습니다.|어간 말 a가 ı로 바뀐 başlıyor입니다.',
    'O güzel bir şarkı ___. (söylemek)|söylüyor|söyleyor|söyliyor|그 사람은 아름다운 노래를 부르고 있습니다.|söyle-의 끝 e가 앞 모음과 조화하여 ü가 되는 söylüyor입니다.'
  ],['trPresent'],['trPresent']);
  add('tr','A2','대명사의 격: beni와 bana','ben → beni/bana · sen → seni/sana','동사가 누구를 대상으로 하는지와 누구에게 향하는지를 격으로 구별합니다. ben의 대격은 beni, 방향격은 bana입니다. 성별이 아니라 문장 속 역할에 따른 변화이며 o의 onu·ona·onun도 성별을 밝히지 않습니다.','보다·알다처럼 특정 직접목적어를 요구하면 대격을 검토합니다.|주다·말하다의 받는 사람이나 향하는 대상은 방향격을 검토합니다.|소유자는 benim·senin·onun 등으로 표시합니다. ben과 sen의 방향격은 규칙을 기계적으로 적용한 bene/sene가 아닙니다.','o의 격 변화에서 연결 n을 확인하세요. onu는 그를·그녀를·그것을, ona는 그에게·그녀에게·그것에라는 뜻입니다.',[
    'Öğretmen ___ çağırdı. (나를)|beni|bana|benim|선생님이 나를 불렀습니다.|부른 대상은 직접목적어이므로 beni입니다.',
    'Lütfen ___ yardım et. (나에게)|bana|beni|benim|제발 나를 도와줘.|yardım etmek의 도움을 받는 대상은 방향격 bana입니다.',
    'Bu hediyeyi ___ aldım. (너에게)|sana|seni|senin|이 선물을 너에게 사 주었어.|받는 사람을 방향격 sana로 표시합니다.',
    'Dün ___ parkta gördüm. (너를)|seni|sana|senin|어제 공원에서 너를 보았어.|보는 직접 대상이므로 seni입니다.',
    'Bu ___ kitabı. (그 사람의)|onun|onu|ona|이것은 그 사람의 책입니다.|소유자 그의/그녀의는 onun이며 성별을 구별하지 않습니다.',
    '___ bir mesaj gönderdim. (그 사람에게)|Ona|Onu|Onun|그 사람에게 메시지를 보냈습니다.|메시지 받는 사람은 방향격 ona입니다.'
  ],['trCase'],['trPerson']);
  add('tr','B1','일반현재의 예외와 인칭별 부정','gelir / alır / bilir · gelmem / gelmezsin','일반현재는 어간에 따라 -r, -ar/-er, -ır/-ir/-ur/-ür가 결합합니다. 한 음절이어도 gelir·alır·bilir처럼 별도로 익힐 동사가 있습니다. 부정은 1인칭과 나머지 인칭이 다르므로 긍정형만 외우면 부족합니다.','우선 동사의 일반현재 기본형을 사전·활용표에서 확인합니다.|긍정형 뒤에는 인칭을 붙여 gelirim·gelirsin을 만듭니다.|부정은 ben gelmem, biz gelmeyiz와 sen gelmezsin, o gelmez를 나누어 연습합니다.','gelmek은 geler가 아니라 gelir입니다. 그러나 모든 한 음절 동사를 -ir형으로 바꾸는 것도 틀립니다. gitmek은 gider, yapmak은 yapar입니다.',[
    'O her hafta bize ___. (gelmek)|gelir|geler|gelar|그 사람은 매주 우리 집에 옵니다.|gel-은 한 음절이지만 -ir를 쓰는 예외입니다.',
    'O cevabı ___. (bilmek)|bilir|biler|bilar|그 사람은 답을 압니다.|bil-의 일반현재 기본형은 bilir입니다.',
    'Babam her sabah gazete ___. (almak)|alır|alar|aler|아버지는 매일 아침 신문을 삽니다.|al-은 일반현재에서 alır입니다.',
    'Ben pazar günleri işe ___. (gelmek, 부정)|gelmem|gelmezsin|gelmez|저는 일요일에 일하러 오지 않습니다.|1인칭 단수 부정 일반현재는 gelmem입니다.',
    'Biz geç saatte kahve ___. (içmek, 부정)|içmeyiz|içmezsiniz|içmez|우리는 늦은 시간에 커피를 마시지 않습니다.|1인칭 복수 부정은 iç-me-y-iz입니다.',
    'Sen bu sesi ___. (duymak, 부정)|duymazsın|duymam|duymayız|너는 이 소리를 듣지 못해.|sen의 부정 일반현재에는 -mazsın을 붙입니다.'
  ],['trAorist'],['trAorist']);
  add('tr','B1','명사의 자음 변화와 모음 탈락','kitap → kitabı · burun → burnu','모음으로 시작하는 접사가 붙을 때 일부 명사는 마지막 자음이 바뀌거나 안쪽 모음이 탈락합니다. 이는 성별이나 인칭이 아니라 단어와 접사의 결합 조건에 따른 변화입니다. 규칙이 적용되는 단어와 그렇지 않은 단어를 함께 비교해야 과잉 일반화를 막을 수 있습니다.','먼저 붙는 접사가 모음으로 시작하는지 확인합니다.|kitap→kitabı, renk→rengi처럼 어휘에 맞는 자음 변화를 적용합니다.|burun→burnu 같은 모음 탈락이나 saat→saati 같은 모음 조화 예외는 사전형과 짝지어 익힙니다.','hukuk→hukuku처럼 k가 유지되기도 합니다. 모든 p·ç·t·k를 무조건 바꾸거나 모든 두 음절 단어의 모음을 지우면 안 됩니다.',[
    'Bu ___ okudum. (kitap)|kitabı|kitapı|kitabi|이 책을 읽었습니다.|모음 접사 앞에서 kitap의 p가 b로 바뀌고 -ı가 붙습니다.',
    'Bu ___ seviyorum. (renk)|rengi|renki|rengı|이 색을 좋아합니다.|renk의 대격은 k→g와 -i가 결합한 rengi입니다.',
    'Doktor çocuğun ___ muayene etti. (burun)|burnunu|burununu|burını|의사가 아이의 코를 진찰했습니다.|burun→burnu에 3인칭 소유와 대격이 결합해 burnunu가 됩니다.',
    'Bu ___ iyi tanıyorum. (şehir)|şehri|şehiri|şehrı|저는 이 도시를 잘 압니다.|şehir는 모음 시작 접사 앞에서 안쪽 i가 탈락해 şehri입니다.',
    'Duvar ___ baktım. (saat, 벽시계에)|saatine|saatına|saate|벽시계를 보았습니다.|벽시계는 duvar saati, 방향격은 duvar saatine입니다.',
    'Bu ___ korumalıyız. (ağaç)|ağacı|ağaçı|ağaci|우리는 이 나무를 보호해야 합니다.|ağaç의 ç가 c로 바뀌며 대격 -ı가 붙습니다.'
  ],['trNoun'],['trNoun','trPerson']);
  add('es','A1','인칭과 성별은 다른 기준','él / ella come · usted come · ustedes comen','주어의 인칭과 수가 동사 활용을 결정합니다. él과 ella는 성별이 다른 대명사이지만 둘 다 3인칭 단수여서 come를 씁니다. usted는 대화 상대를 가리켜도 문법적으로 3인칭 단수, ustedes는 3인칭 복수와 일치합니다.','yo·tú·él/ella/usted·nosotros/as·vosotros/as·ellos/ellas/ustedes 중 인칭 묶음을 고릅니다.|-ar/-er/-ir 동사의 인칭 어미를 활용표에서 비교합니다.|성별 때문에 바뀌는 대명사·형용사와 성별 때문에 바뀌지 않는 동사를 분리합니다. nosotras도 hablamos입니다.','스페인 대부분에서는 친한 복수 상대에게 vosotros/as, 아메리카에서는 보통 ustedes를 씁니다. vos를 쓰는 지역의 hablás·comés 등은 틀린 형태가 아니라 별도 지역 활용입니다.',[
    'Ella ___ pan todos los días.|come|comes|como|그녀는 매일 빵을 먹습니다.|ella의 3인칭 단수형은 come이며 él과 동일합니다.',
    'Él ___ pan todos los días.|come|comes|como|그는 매일 빵을 먹습니다.|él과 ella의 성별 차이가 동사 어미를 바꾸지는 않습니다.',
    'Usted ___ muy bien español.|habla|hablas|hablo|당신은 스페인어를 아주 잘하십니다.|usted는 문법적으로 3인칭 단수 활용 habla를 씁니다.',
    'Ustedes ___ cerca de aquí.|viven|vivís|vives|여러분은 이 근처에 사십니다.|ustedes에는 3인칭 복수 viven이 필요합니다.',
    'Nosotras ___ juntas.|estudiamos|estudian|estudiáis|우리 여자들은 함께 공부합니다.|여성 복수 nosotras도 nosotros와 같은 1인칭 복수 estudiamos를 씁니다.',
    'Vosotras ___ muchos libros. (vosotras를 쓰는 지역)|leéis|leen|lees|너희 여자들은 책을 많이 읽는다.|vosotras에는 2인칭 복수 leéis이며 vosotros와 같습니다.'
  ],['esPerson'],['esPerson','esVerbs']);
  add('es','A1','문법적 성과 실제 성별 구별','el día · la mano · la víctima · el agua fría','스페인어의 남성·여성은 명사의 문법적 분류입니다. 사물에도 성이 있고, 실제 남성을 가리키는 la víctima도 문법적으로는 여성 명사입니다. -o/-a는 유용한 경향이지만 모든 단어의 성을 결정하는 규칙이 아니므로 관사와 일치 형태를 함께 익힙니다.','사전에서 명사의 성과 관사를 확인합니다. día는 남성, mano는 여성입니다.|명사와 직접 연결된 관사·형용사의 성·수를 맞춥니다.|el agua처럼 소리 환경 때문에 관사 형태가 바뀌어도 명사의 성은 그대로일 수 있습니다. agua는 여성입니다.','el/la estudiante처럼 성에 따라 관사를 바꾸는 명사와 la persona처럼 성이 고정된 명사를 구별합니다. 남성형 명사라고 지칭 대상이 언제나 남자라는 뜻은 아닙니다.',[
    'La ___ está fría. (mano)|mano|manos|manos fría|손이 차갑습니다.|mano는 -o로 끝나도 여성 명사이며 la와 fría가 일치합니다.',
    'El agua está ___.|fría|frío|fríos|물이 차갑습니다.|agua는 여성 명사이므로 형용사는 fría입니다. 관사 el이 명사의 성을 바꾸지 않습니다.',
    'Hoy es un día ___.|largo|larga|largas|오늘은 긴 하루입니다.|día는 -a로 끝나도 남성 명사이므로 largo입니다.',
    'La víctima, un hombre joven, está ___.|herida|herido|heridos|피해자인 젊은 남성은 다친 상태입니다.|형용사는 명사 víctima의 여성 단수에 직접 일치하므로 herida입니다.',
    'Marta es una estudiante ___.|alta|alto|altos|마르타는 키가 큰 여학생입니다.|estudiante의 형태는 같지만 una와 alta가 여성 단수를 표시합니다.',
    'Las aguas de este lago están ___.|frías|fríos|frío|이 호수의 물은 차갑습니다.|복수에서는 las aguas이며 형용사도 여성 복수 frías입니다.'
  ],['esGender'],['esGender','esWater']);
  add('es','A2','불규칙 현재형을 인칭별로','ser / estar / ir / tener / hacer','규칙형 어미를 외워도 soy·voy·tengo 같은 빈도가 높은 불규칙 현재형은 별도로 익혀야 합니다. 어떤 동사는 전체 활용이 특수하고, 어떤 동사는 yo형 또는 어간 모음에서만 변합니다. 성별 대신 인칭·수와 동사 종류를 기준으로 찾으세요.','원형을 보고 규칙형인지 주요 불규칙 동사인지 확인합니다.|주어가 속한 인칭 행을 고릅니다. él과 ella, usted는 같은 행입니다.|한 동사 안에서도 yo tengo와 nosotros tenemos처럼 불규칙의 범위가 다르다는 점을 비교합니다.','tener를 teneo, ir를 iro처럼 규칙 어미만으로 만들면 안 됩니다. 성별을 바꿔도 soy·estoy·voy 같은 yo형은 동일합니다.',[
    'Yo ___ estudiante. (ser)|soy|es|somos|저는 학생입니다.|ser의 1인칭 단수 현재형은 soy입니다.',
    'Tú ___ en casa. (estar)|estás|estoy|están|너는 집에 있어.|estar의 2인칭 단수는 강세가 있는 estás입니다.',
    'Ella ___ al trabajo en tren. (ir)|va|voy|vamos|그녀는 열차로 직장에 갑니다.|ir의 3인칭 단수는 va이며 성별에 따라 달라지지 않습니다.',
    'Yo ___ dos hermanas. (tener)|tengo|tienes|tienen|저는 자매가 두 명 있습니다.|tener의 yo형은 tengo입니다.',
    'Nosotros ___ tiempo. (tener)|tenemos|tienemos|tienen|우리는 시간이 있습니다.|현재형 nosotros에서는 어간 모음을 그대로 두어 tenemos입니다.',
    'Yo ___ la cena. (hacer)|hago|hace|hacen|제가 저녁을 준비합니다.|hacer의 불규칙 yo형은 hago입니다.'
  ],['esIrregular'],['esVerbs']);
  add('es','A2','어간 변화가 일어나는 인칭','pienso / pensamos · duermo / dormimos · pido / pedimos','일부 현재 직설법 동사는 어간 모음이 e→ie, o→ue, e→i로 변합니다. 이 유형에서는 nosotros와 vosotros의 현재형에 같은 변화가 나타나지 않습니다. 동사 전체를 불규칙이라고만 외우기보다 어떤 인칭에서 어디가 달라지는지 살펴보세요.','pensar·dormir·pedir를 각각 e→ie·o→ue·e→i의 대표 동사로 익힙니다.|yo·tú·él/ella/usted·ellos/ellas/ustedes에는 표의 어간 변화를 적용합니다.|nosotros/as·vosotros/as 현재형에서는 pensamos·dormimos·pedimos처럼 기본 모음을 유지합니다.','이 규칙의 적용 범위는 여기서 다루는 현재 직설법입니다. 다른 시제의 durmió·pidieron 등에 같은 표를 그대로 쓰면 안 됩니다.',[
    'Yo ___ en el viaje. (pensar)|pienso|penso|pensamos|저는 여행에 대해 생각합니다.|yo의 pensar 현재형은 e→ie가 반영된 pienso입니다.',
    'Nosotras ___ en el viaje. (pensar)|pensamos|piensamos|piensan|우리는 여행에 대해 생각합니다.|nosotras 현재형은 e를 유지한 pensamos입니다.',
    'Él ___ ocho horas. (dormir)|duerme|dorme|dormimos|그는 여덟 시간 잡니다.|3인칭 단수 현재는 o→ue로 바뀐 duerme입니다.',
    'Nosotros ___ ocho horas. (dormir)|dormimos|duermimos|duermen|우리는 여덟 시간 잡니다.|nosotros 현재형에서는 o를 유지합니다.',
    'Ella ___ una ensalada. (pedir)|pide|pede|pedimos|그녀는 샐러드를 주문합니다.|pedir의 e→i 변화가 나타나는 pide입니다.',
    'Vosotros ___ una ensalada. (pedir)|pedís|pidís|piden|너희는 샐러드를 주문한다.|vosotros 현재형은 e를 유지하고 어미에 강세를 둔 pedís입니다.'
  ],['esStem'],['esVerbs']);
  add('es','B1','불규칙 과거와 시제별 변화','fui · tuve · hizo · vinieron · pidieron','완료된 과거의 불규칙형은 현재형에서 단순히 유추할 수 없는 경우가 많습니다. ser와 ir는 fui 계열을 공유하며, tener는 tuv-, hacer는 hic-/hiz-, venir는 vin-을 사용합니다. -ir 동사의 일부는 3인칭 과거에서 어간 모음도 변합니다.','먼저 문장의 시간 표현과 의미로 완료된 과거인지 판단합니다.|과거 어간과 인칭 어미를 함께 확인합니다. hizo의 z도 철자상의 예외입니다.|ser/ir처럼 형태가 겹치는 경우 문맥으로 뜻을 구별하고, pedir/dormir의 3인칭 변화도 따로 비교합니다.','현재의 duerme를 과거에 그대로 쓰거나 과거형을 duermió로 만들지 않습니다. 그는 잤다는 durmió입니다.',[
    'Ayer yo ___ al museo. (ir)|fui|voy|iba mañana|어제 저는 박물관에 갔습니다.|완료된 과거 ir의 yo형은 fui입니다.',
    'Ayer yo ___ una reunión. (tener)|tuve|tengo|tendré|어제 저는 회의가 있었습니다.|tener의 불규칙 과거 어간 tuv-에 1인칭 -e를 붙입니다.',
    'Ayer Ana ___ la cena. (hacer)|hizo|hico|hace|어제 아나는 저녁을 준비했습니다.|hacer의 3인칭 단수 과거는 hizo입니다.',
    'Mis amigos ___ anoche. (venir)|vinieron|venieron|vienen|친구들이 어젯밤에 왔습니다.|venir의 과거 어간 vin-과 3인칭 복수 -ieron입니다.',
    'Ayer ellas ___ sopa. (pedir)|pidieron|pedieron|piden|어제 그녀들은 수프를 주문했습니다.|pedir의 3인칭 복수 과거에서는 e→i가 되어 pidieron입니다.',
    'Anoche él ___ poco. (dormir)|durmió|duermió|dormió|어젯밤 그는 잠을 적게 잤습니다.|dormir의 3인칭 단수 과거에서는 o→u가 되어 durmió입니다.'
  ],['esPast'],['esVerbs']);
  add('es','B1','성 일치가 필요한 자리 찾기','han llegado / fueron abiertas / está cansada','스페인어에서는 모든 단어가 주어의 성별에 맞춰 변하는 것이 아닙니다. 일반 활용 동사는 인칭·수에 맞추고, 형용사와 수동 분사는 성·수 일치를 합니다. haber 뒤 완료 분사는 변하지 않으며 su·sus는 소유자의 성별이 아니라 소유물의 수를 구별합니다.','빈칸이 활용 동사, 형용사, 완료 분사, 수동 분사 중 무엇인지 먼저 확인합니다.|haber 뒤 분사는 그대로 두고, 형용사·ser 수동 분사는 직접 연결된 명사의 성·수에 맞춥니다.|소유 표현은 소유자와 소유물의 정보를 분리합니다. nuestra casa의 여성형은 집 casa에 맞춘 것입니다.','ellas라는 주어를 보고 han llegadas로 바꾸면 틀립니다. 반대로 Las puertas fueron abierto도 틀리며 abiertas가 필요합니다.',[
    'Ellas han ___ a tiempo.|terminado|terminadas|terminados|그녀들은 제시간에 마쳤습니다.|haber 뒤의 완료 분사는 주어 성·수에 따라 변하지 않습니다.',
    'Las ventanas fueron ___ por el personal.|abiertas|abiertos|abierto|창문들은 직원들이 열었습니다.|ser 수동의 분사는 여성 복수 ventanas와 일치합니다.',
    'Ella está muy ___ después del viaje.|cansada|cansado|cansados|그녀는 여행 후 매우 피곤합니다.|상태 형용사는 여성 단수 주어와 일치해 cansada입니다.',
    'Él está muy ___ después del viaje.|cansado|cansada|cansadas|그는 여행 후 매우 피곤합니다.|같은 estar 동사를 쓰지만 형용사는 남성 단수 cansado입니다.',
    'Estos son ___ libros. (그 사람의)|sus|su|suyo|이것들은 그 사람의 책입니다.|소유물 libros가 복수이므로 sus이며 소유자 성별은 알 수 없습니다.',
    'Esta es ___ casa. (우리의)|nuestra|nuestro|nuestros|이것은 우리 집입니다.|nuestra는 소유물 casa의 여성 단수에 맞춥니다.'
  ],['esAgreement'],['esGender','esVerbs','esPerson']);
  add('ja','A1','인칭·성별·수에 따른 동사 변화는 없다','私は / 彼女は / 犬は + 食べます','일본어의 동사는 주어의 인칭·성·수에 맞춰 다른 어미를 쓰지 않습니다. 나, 그녀, 우리, 개가 먹는다고 해도 정중한 현재형은 食べます입니다. 시제·부정·정중함·수동 같은 문법 요소에 따른 활용은 따로 있으므로 동사 변화 자체가 없다고 이해하면 안 됩니다.','먼저 누가 행동하는지 명사나 대명사로 나타냅니다. 문맥에서 분명하면 생략할 수 있습니다.|주어의 성별 대신 현재·과거, 긍정·부정, 정중체·보통체를 결정합니다.|같은 시제와 문체를 유지한 채 주어만 바꾸어 동사형이 유지되는지 확인합니다.','彼와 彼女처럼 성별을 드러내는 어휘는 있습니다. 문법적 성 일치가 없다는 말이 성별을 표현할 수 없다는 뜻은 아닙니다.',[
    '私は毎朝パンを___。 (정중한 현재)|食べます|食べました|食べませんでした|저는 매일 아침 빵을 먹습니다.|1인칭이라서 동사 어미를 더 붙이지 않으며 현재 정중형 食べます입니다.|わたし わ まいあさ パン お たべます。',
    '彼女も毎朝パンを___。 (정중한 현재)|食べます|食べました|食べませんでした|그녀도 매일 아침 빵을 먹습니다.|여성 주어라도 정중한 현재형은 같은 食べます입니다.|かのじょ も まいあさ パン お たべます。',
    '私たちは昨日パンを___。 (정중한 과거 긍정)|食べました|食べます|食べません|우리는 어제 빵을 먹었습니다.|복수라서가 아니라 과거이므로 食べました입니다.|わたしたち わ きのう パン お たべました。',
    '犬も今、水を___います。 (飲む)|飲んで|飲みて|飲むて|개도 지금 물을 마시고 있습니다.|동물 주어도 飲む의 일반적인 て형 飲んで를 씁니다.|いぬ も いま、みず お のんで います。',
    '弟は昨日学校へ___。 (行く, 정중한 과거)|行きました|行くました|行きます|남동생은 어제 학교에 갔습니다.|남성이라는 이유로 바뀌는 것이 아니라 과거 정중형으로 활용합니다.|おとうと わ きのう がっこう え いきました。',
    '姉は昨日学校へ___。 (行く, 정중한 과거)|行きました|行くました|行きます|누나는 어제 학교에 갔습니다.|여성 주어도 같은 시제와 문체에서는 行きました를 씁니다.|あね わ きのう がっこう え いきました。'
  ],['jaPerson'],['jaGrammar']);
  add('ja','A1','る동사의 분류와 숨은 예외','食べる→食べます / 帰る→帰ります','る로 끝나는 동사라고 모두 る를 떼고 활용하는 것은 아닙니다. 食べる·見る는 一段동사이지만 帰る·入る·走る·切る는 五段동사입니다. 소리가 비슷한 동사도 종류가 다를 수 있으므로 원형·ます형·ない형을 함께 익히면 분류가 분명해집니다.','동사의 원형과 뜻을 확인합니다. 切る는 자르다, 着る는 옷을 입다입니다.|一段이면 る를 떼고 ます·ない를 붙입니다. 見る→見ます・見ない입니다.|五段이면 어말 る를 り·ら 등으로 바꿉니다. 帰る→帰ります・帰らない입니다.','-いる/-える로 들린다는 단서만으로 확정하지 마세요. 入る・走る・帰る처럼 五段인 예외가 있습니다. 불규칙 する・来る는 별도 그룹입니다.',[
    '毎晩、家に___。 (帰る, 정중형)|帰ります|帰ます|帰るます|매일 밤 집에 돌아갑니다.|帰る는 五段동사라 る를 り로 바꾸고 ます를 붙입니다.|まいばん、いえ に かえります。',
    'ここには___でください。 (入る, 부정)|入らない|入ない|入りない|여기에는 들어오지 마세요.|入る는 五段이며 부정형은 入らない입니다.|ここ に わ はいらない で ください。',
    '朝、公園を___。 (走る, 정중형)|走ります|走ます|走るます|아침에 공원을 달립니다.|走る는 五段이므로 走ります입니다.|あさ、こうえん お はしります。',
    'この紙を___。 (切る, 정중형)|切ります|切ます|切るます|이 종이를 자릅니다.|자르다 切る는 五段으로 切ります입니다.|この かみ お きります。',
    '今日は青いシャツを___。 (着る, 정중형)|着ます|着ります|着るます|오늘은 파란 셔츠를 입습니다.|입다 着る는 一段이므로 る를 떼고 着ます입니다.|きょう わ あおい シャツ お きます。',
    '今夜はテレビを___。 (見る, 보통체 부정)|見ない|見らない|見りない|오늘 밤에는 텔레비전을 보지 않습니다.|見る는 一段동사이므로 見ない입니다.|こんや わ テレビ お みない。'
  ],['jaGroups'],['jaVerbs','jaGrammar']);
  add('ja','A2','する·来る의 불규칙 활용','する→しない/して/した · 来る→こない/きて/きた','する와 来る는 규칙 동사군과 따로 익히는 불규칙 동사입니다. 来る는 같은 한자를 쓰더라도 형태에 따라 く·き·こ로 읽습니다. 단순히 글자만 기억하지 말고 소리와 함께 정중형·부정·과거·가능형을 비교하세요.','する는 します·しない·して·した를 기본 묶음으로 익힙니다.|来る는 きます·こない·きて·きた처럼 각 형태의 읽기를 연결합니다.|가능형 できる·来られる와 의지형 しよう·来よう도 같은 어간에 임의로 접사를 붙여 만들지 않습니다.','来ない는 きない가 아니라 こない입니다. 来られる는 문맥에 따라 가능·수동·존경이 될 수 있으므로 문장 전체를 읽습니다.',[
    '今日は運動を___。 (する, 보통체 부정)|しない|すらない|するない|오늘은 운동을 하지 않습니다.|する의 보통체 부정은 しない입니다.|きょう わ うんどう お しない。',
    'ここで勉強を___ください。 (する)|して|すて|しって|여기서 공부해 주세요.|する의 て형은 して입니다.|ここ で べんきょう お して ください。',
    '昨日、部屋を掃除___。 (する, 보통체 과거)|した|するた|しった|어제 방을 청소했습니다.|する의 보통체 과거는 した입니다.|きのう、へや お そうじ した。',
    '明日は___。 (来る, 보통체 부정·히라가나)|こない|きない|くない|내일은 오지 않습니다.|来ない는 こない로 읽습니다.|あした わ こない。',
    'すぐに___ください。 (来る, て형·히라가나)|きて|こて|くて|곧 와 주세요.|来て는 きて입니다.|すぐ に きて ください。',
    '明日はここに___。 (来る, 가능·보통체)|来られる|来できる|来るできる|내일은 여기에 올 수 있습니다.|来る의 가능형은 来られる, 읽기는 こられる입니다.|あした わ ここ に こられる。'
  ],['jaIrregular'],['jaVerbs','jaGrammar']);
  add('ja','A2','て형·た형의 음편과 예외','読んで/読んだ · 行って/行った · ある→ない','五段동사의 て형·た형은 어말에 따라 소리가 바뀝니다. 이는 인칭이나 성별 변화가 아닌 활용 규칙입니다. 行く는 일반적인 く동사의 書いて와 달리 行って가 되고, ある의 보통체 부정은 ない라는 예외도 함께 익힙니다.','五段인지 一段인지부터 확인한 뒤 표의 어말 규칙을 적용합니다.|む·ぶ·ぬ는 んで/んだ, う·つ·る는 って/った, く는 いて/いた, ぐ는 いで/いだ로 바뀝니다.|行く→行って/行った, ある→ない/なかった는 기본 규칙과 나란히 비교합니다.','음편 규칙을 一段동사 食べる에 적용해 食べって라고 만들지 않습니다. 또한 ある의 부정은 あらない가 아닙니다.',[
    '駅まで___ください。 (歩く)|歩いて|歩って|歩きて|역까지 걸어가 주세요.|歩く는 일반적인 く동사로 歩いて입니다.|えき まで あるいて ください。',
    '先に学校へ___ください。 (行く)|行って|行いて|行きて|먼저 학교에 가 주세요.|行く는 く동사의 예외로 行って입니다.|さき に がっこう え いって ください。',
    '昨日、海で___。 (泳ぐ, 보통체 과거)|泳いだ|泳いた|泳ぎた|어제 바다에서 수영했습니다.|ぐ는 いだ로 바뀌어 泳いだ입니다.|きのう、うみ で およいだ。',
    'その本はもう___。 (読む, 보통체 과거)|読んだ|読みた|読んた|그 책은 이미 읽었습니다.|む의 과거형은 んだ이므로 読んだ입니다.|その ほん わ もう よんだ。',
    '今はお金が___。 (ある, 보통체 부정)|ない|あらない|ありない|지금은 돈이 없습니다.|ある의 보통체 부정은 예외적으로 ない입니다.|いま わ おかね が ない。',
    '昨日は時間が___。 (ある, 보통체 과거 부정)|なかった|あらなかった|ありなかった|어제는 시간이 없었습니다.|ない의 과거형 なかった를 사용합니다.|きのう わ じかん が なかった。'
  ],['jaSound'],['jaVerbs','jaGrammar']);
  add('ja','B1','형용사 활용의 예외 다시 구별하기','いい→よかった · きれい→きれいだった','일본어 형용사는 명사의 성별이나 수에 일치시키지 않지만, 형용사 종류와 시제·부정에 따라 형태가 바뀝니다. いい는 よい 계열을 바탕으로 활용하고, きれい는 끝소리가 い여도 な형용사입니다. 문장 속에서 명사를 꾸미는지 서술하는지도 구별하세요.','い형용사는 마지막 い를 빼고 くない·かった를 붙입니다.|いい와 かっこいい는 よくない·よかった, かっこよくない·かっこよかった로 바꿉니다.|な형용사는 명사 앞에서 な, 보통체 과거에서 だった를 사용합니다. 성별이나 인칭에 따른 변화는 아닙니다.','高いでした와 きれいかった는 틀립니다. 정중 과거는 高かったです·きれいでした이며 보통체는 高かった·きれいだった입니다.',[
    '昨日の天気は___です。 (いい, 과거)|よかった|いいかった|いいでした|어제 날씨는 좋았습니다.|いい의 과거는 よかった입니다.|きのう の てんき わ よかった です。',
    'この方法はあまり___。 (いい, 보통체 부정)|よくない|いくない|いいない|이 방법은 별로 좋지 않습니다.|いい의 부정은 よくない입니다.|この ほうほう わ あまり よくない。',
    'その服は___です。 (かっこいい, 과거)|かっこよかった|かっこいいかった|かっこいいでした|그 옷은 멋졌습니다.|합성어 かっこいい도 いい 부분이 よかった로 바뀝니다.|その ふく わ かっこよかった です。',
    '昨日の海は___。 (きれいだ, 보통체 과거)|きれいだった|きれいかった|きれくた|어제 바다는 아름다웠습니다.|きれい는 な형용사이므로 과거 서술은 きれいだった입니다.|きのう の うみ わ きれい だった。',
    'これは___部屋です。 (静かだ, 명사 수식)|静かな|静かい|静かだったな|이것은 조용한 방입니다.|な형용사가 명사를 꾸밀 때 な를 붙입니다.|これ わ しずかな へや です。',
    'この問題は___です。 (難しい, 부정)|難しくない|難しいない|難しいではない|이 문제는 어렵지 않습니다.|い형용사 難しい의 부정은 難しくない입니다.|この もんだい わ むずかしくない です。'
  ],['jaAdjective'],['jaGrammar']);
  add('ja','B1','성별 대신 관계를 반영하는 경어','いらっしゃる / なさる / いたす','경어의 동사 선택은 주어의 성별이 아니라 높이는 대상과 자신 측 행동의 구별에 달려 있습니다. 상대나 선생님의 행동은 존경어로, 자신 측 행동은 겸양 표현으로 말할 수 있습니다. 기본 동사와 다른 어휘를 쓰는 특수형과 ます형 변화도 따로 익힙니다.','누가 행동하고 누구에게 말하는지 먼저 정합니다.|상대 등의 행동은 いらっしゃる·なさる·召し上がる 같은 존경형을 검토합니다.|자신 측 행동은 参る·いたす·いただく 등으로 표현하되 겸양어의 쓰임과 대상 관계도 확인합니다.','する의 존경 정중형은 なさいます이며 なさります로 만들지 않습니다. 사람의 성별을 바꾼다고 존경어와 겸양어를 바꾸지는 않습니다.',[
    '先生は教室に___。 (いる의 존경 정중형)|いらっしゃいます|おります|まいります|선생님은 교실에 계십니다.|선생님의 존재를 높이는 いらっしゃいます입니다.|せんせい わ きょうしつ に いらっしゃいます。',
    '先生は研究を___。 (する의 존경 정중형)|なさいます|いたします|なさります|선생님은 연구를 하십니다.|なさる의 정중형은 なさいます입니다.|せんせい わ けんきゅう お なさいます。',
    '私がご説明___。 (する의 겸양 정중형)|いたします|なさいます|いらっしゃいます|제가 설명드리겠습니다.|자신의 설명 행동을 낮추는 ご説明いたします입니다.|わたし が ごせつめい いたします。',
    '明日、私がそちらへ___。 (行く의 겸양 정중형)|参ります|いらっしゃいます|召し上がります|내일 제가 그쪽으로 가겠습니다.|자신이 가는 것을 공손히 말하는 参ります입니다.|あした、わたし が そちら え まいります。',
    '先生はお茶を___。 (飲む의 존경 정중형)|召し上がります|いただきます|申します|선생님은 차를 드십니다.|상대의 먹고 마시는 행동을 높이는 召し上がります입니다.|せんせい わ おちゃ お めしあがります。',
    '私はこの会社に___。 (いる의 겸양·정중 표현)|おります|いらっしゃいます|おっしゃいます|저는 이 회사에 있습니다.|자신의 존재를 공손히 낮춰 말하는 おります입니다.|わたし わ この かいしゃ に おります。'
  ],['jaHonorific'],['jaGrammar']);
  enrich('tr','A1',0,['trPerson'],['trPerson']);
  enrich('tr','A1',1,['trHarmony'],['trPresent']);
  enrich('tr','A1',3,['trPerson','trPresent'],['trPresent']);
  enrich('tr','A2',0,['trCase','trNoun'],['trPerson']);
  enrich('tr','A2',1,['trPerson'],['trPerson']);
  enrich('tr','A2',4,['trAorist'],['trAorist']);
  enrich('es','A1',0,['esGender'],['esGender','esWater']);
  enrich('es','A1',1,['esIrregular'],['esVerbs']);
  enrich('es','A1',2,['esPerson','esStem'],['esPerson','esVerbs']);
  enrich('es','A2',0,['esPast'],['esVerbs']);
  enrich('es','A2',4,['esAgreement'],['esVerbs']);
  enrich('es','B2',4,['esAgreement'],['esGender']);
  enrich('ja','A1',0,['jaPerson'],['jaGrammar']);
  enrich('ja','A1',2,['jaGroups','jaIrregular'],['jaVerbs']);
  enrich('ja','A1',3,['jaAdjective'],['jaGrammar']);
  enrich('ja','A1',11,['jaAdjective'],['jaGrammar']);
  enrich('ja','A2',0,['jaSound'],['jaVerbs']);
  enrich('ja','B2',2,['jaHonorific'],['jaGrammar']);
})();
