'use strict';
(()=>{
const rows=a=>a.map(s=>s.split('|'));
const old=(l,i,s,r)=>expandGrammar('tr',l,i,'','','',s,'',rows(r),GRAMMAR_REFS.tr);
const add=(l,t,p,e,s,w,r)=>expandGrammar('tr',l,null,t,p,e,s,w,rows(r),l[0]==='C'?GRAMMAR_REFS.trAdvanced:GRAMMAR_REFS.tr);
old('A1',0,'명사문에서는 주어가 누구인지 먼저 정합니다. ben은 나, sen은 너, biz는 우리입니다.|명사의 마지막 모음에 맞는 인칭 접사를 고릅니다. öğretmen-im, doktor-um처럼 결합합니다.|모음으로 끝나는 명사에는 연결 자음 y가 필요할 수 있습니다. öğrenci-y-im을 한 단어로 씁니다.',[
'Ben bir ___ .|doktorum|doktorsun|doktoruz|저는 의사입니다.|ben에 맞는 1인칭 단수 -um을 doktor에 붙입니다.',
'Sen çok iyi bir ___ .|öğretmensin|öğretmenim|öğretmeniz|너는 아주 좋은 선생님이야.|sen에 대응하는 인칭 접사는 -sin입니다.',
'Biz bu okulda ___ .|öğrenciyiz|öğrenciyim|öğrencisin|우리는 이 학교의 학생입니다.|biz에는 복수 1인칭 -(y)iz가 필요합니다.'
]);
old('A1',1,'마지막 모음이 a, ı, o, u이면 -lar, e, i, ö, ü이면 -ler를 선택합니다.|복수 접사 뒤에도 위치나 소유 접사를 이어 붙일 수 있습니다. ev-ler-de는 집들에서입니다.|수량이 이미 제시된 숫자 뒤에서는 보통 단수 명사를 씁니다. iki sandalye가 기본형입니다.',[
'Bahçede üç ___ var.|ağaç|ağaçlar|ağaçları|정원에 나무 세 그루가 있습니다.|숫자 üç 뒤의 명사는 보통 단수 ağaç입니다.',
'Bu ___ çok eski. (집들)|evler|evlar|evim|이 집들은 아주 오래되었습니다.|ev의 마지막 모음 e에 맞는 복수 접사는 -ler입니다.',
'___ masanın üstünde. (책들)|Kitaplar|Kitapler|Kitabı|책들은 책상 위에 있습니다.|kitap의 마지막 모음 a에 따라 -lar를 붙입니다.'
]);
old('A1',2,'장소 명사 뒤에 -DA를 붙입니다. ev-de, okul-da처럼 마지막 모음과 조화시킵니다.|ç, f, h, k, p, s, ş, t처럼 무성 자음으로 끝나면 d가 t로 바뀝니다. park-ta가 됩니다.|존재하는 대상 뒤에 var, 없으면 yok을 놓습니다. 장소 + 대상 + var/yok 순서로 연습하세요.',[
'Sınıf___ yirmi öğrenci var.|ta|da|de|교실에 학생 스무 명이 있습니다.|sınıf은 ı와 무성 자음 f로 끝나므로 -ta입니다.',
'Ev___ süt yok.|de|da|te|집에 우유가 없습니다.|ev의 e에 맞는 -de이며 v 뒤에서는 d를 씁니다.',
'Park___ bir kafe var.|ta|te|da|공원에 카페가 하나 있습니다.|park의 a에 맞고 k 뒤라서 -ta입니다.'
]);
old('A1',3,'동사 사전형 -mak/-mek을 떼어 어간을 찾습니다. gelmek의 어간은 gel-입니다.|진행형 -(I)yor를 붙인 뒤 인칭을 표시합니다. geliyor-um은 내가 오고 있다는 뜻입니다.|부정은 진행 접사 앞에 넣습니다. gel-m-iyor-um처럼 되며 -yor 뒤에 부정을 붙이지 않습니다.',[
'Şimdi kitap ___ . (ben)|okuyorum|okuyorsun|okuyoruz|저는 지금 책을 읽고 있습니다.|ben의 진행형은 oku-yor-um입니다.',
'Biz parkta ___ .|yürüyoruz|yürüyorsun|yürüyorum|우리는 공원에서 걷고 있습니다.|biz의 인칭 접사는 -uz이므로 yürüyoruz입니다.',
'Sen bugün neden ___ ? (오다, 부정)|gelmiyorsun|geliyorsun|gelmiyorum|너는 오늘 왜 오지 않니?|gel-m-iyor-sun에 부정과 2인칭이 함께 나타납니다.'
]);
add('A1','의문 조사 mı / mi','문장 + mI + 필요한 인칭 어미','예·아니요로 대답하는 질문은 의문 조사를 사용합니다. mı, mi, mu, mü는 앞 단어의 마지막 모음에 따라 고르며 별도 단어로 씁니다. 인칭 어미는 구성에 따라 의문 조사에 이어집니다.','평서문을 먼저 만듭니다. Bu kitap yeni는 이 책이 새것이라는 뜻입니다.|마지막 모음에 맞는 의문 조사를 붙입니다. yeni mi처럼 분리해서 씁니다.|진행형 2인칭 질문은 geliyor musun처럼 의문 조사 뒤에 인칭을 붙입니다.','부정문이 곧 질문은 아닙니다. değil은 부정, mi는 의문을 표시합니다.',[
'Bu kitap yeni ___ ?|mi|mı|mu|이 책은 새것인가요?|yeni의 마지막 모음 i에 맞는 mi를 씁니다.',
'Sen de geliyor ___ ?|musun|misin|mısın|너도 오고 있니?|geliyor의 마지막 모음 o에 맞는 mu에 -sun을 붙입니다.',
'Bu çanta senin ___ ?|mi|mü|mı|이 가방은 네 것이니?|senin의 마지막 모음 i에 따라 mi를 선택합니다.'
]);
add('A1','이것·그것·저것','bu / şu / o + 명사','bu는 가까운 대상을, şu는 주의를 돌려 가리키는 대상을, o는 상대적으로 먼 대상을 가리킬 때 자주 씁니다. 실제 선택은 물리적 거리뿐 아니라 대화에서 무엇을 가리키는지에도 달려 있습니다. 명사 앞의 지시어에는 따로 복수 접사를 붙이지 않습니다.','명사를 꾸밀 때는 bu kitap처럼 지시어 뒤에 명사를 둡니다.|대상을 지시어만으로 대신하면 bunlar, şunlar, onlar 같은 복수 대명사를 쓸 수 있습니다.|명사 앞에서는 bu kitaplar라고 합니다. bunlar kitaplar로 조합하지 않습니다.','o는 저것뿐 아니라 그·그녀를 가리키기도 합니다. 주변 문맥으로 해석하세요.',[
'Elimdeki ___ kitap benim.|bu|bunlar|bunları|내 손에 있는 이 책은 내 것입니다.|가까이 든 단수 명사 kitap 앞에는 bu를 놓습니다.',
'___ benim ayakkabılarım. (이것들)|Bunlar|Bu|Bunu|이것들은 내 신발입니다.|독립적으로 이것들을 가리키는 복수 대명사는 bunlar입니다.',
'___ kalemler çok güzel. (이)|Bu|Bunları|Bunlar|이 펜들은 아주 예쁩니다.|명사 앞의 bu는 뒤 명사가 복수여도 bu로 유지합니다.'
]);
add('A1','명사문의 부정','명사·형용사 + değil + 인칭','누군가가 무엇이 아니거나 어떤 상태가 아니라고 말할 때 değil을 씁니다. 동사 자체를 부정하는 -ma/-me와 쓰이는 자리가 다릅니다. 인칭은 değil 뒤에 표시합니다.','긍정 명사문에서 명사나 형용사를 찾습니다. Ben öğretmenim에서 öğretmen입니다.|긍정 인칭 어미를 그대로 두지 말고 öğretmen değilim으로 다시 구성합니다.|3인칭은 보통 değil만으로 충분합니다. Bu oda büyük değil은 이 방이 크지 않다는 뜻입니다.','없다는 yok, ~이 아니라는 değil입니다. Evde değil은 집에 있지 않다, Evde su yok은 집에 물이 없다는 뜻입니다.',[
'Ben doktor ___ .|değilim|değilsin|değiliz|저는 의사가 아닙니다.|1인칭 단수 부정 명사문은 değilim입니다.',
'Bu yemek sıcak ___ .|değil|yok|değilim|이 음식은 뜨겁지 않습니다.|음식의 상태를 부정하므로 3인칭 değil을 씁니다.',
'Biz yorgun ___ .|değiliz|değilim|değilsin|우리는 피곤하지 않습니다.|biz에 대응하는 부정 인칭형은 değiliz입니다.'
]);
add('A1','나의 것·너의 것','명사 + 소유 접사','터키어는 소유물을 나타내는 명사 끝에 누구의 것인지 표시합니다. benim kitabım은 나의 책이며 benim을 생략해 kitabım이라고 해도 소유자를 알 수 있습니다. 접사 모음과 어말 자음 변화를 함께 확인하세요.','나의 것은 -(I)m, 너의 것은 -(I)n, 그의 것은 -(s)I를 기본형으로 익힙니다.|모음으로 끝난 araba는 arabam, araban, arabası가 됩니다.|자음으로 끝난 ev는 evim, evin, evi입니다. 모음 조화가 접사의 형태를 정합니다.','benim ev라고만 하면 기본 소유 구성이 완성되지 않습니다. 소유물에도 evim처럼 표시합니다.',[
'Benim ___ küçük. (집)|evim|evin|evimiz|제 집은 작습니다.|benim과 짝이 되는 소유형은 evim입니다.',
'Senin ___ nerede? (가방)|çantan|çantam|çantamız|네 가방은 어디 있니?|çanta가 모음으로 끝나므로 2인칭 소유 -n을 붙입니다.',
'Onun ___ kırmızı. (자동차)|arabası|arabam|araban|그 사람의 자동차는 빨간색입니다.|3인칭 소유는 모음 뒤에서 -sı가 됩니다.'
]);
add('A1','목적지로 이동하기','-(y)A 방향격','어디로 가는지 또는 누구에게 무엇을 주는지를 방향격으로 표시합니다. 장소에 머무는 -DA와 달리 이동의 도착점을 나타냅니다. 모음으로 끝나면 연결 자음 y를 넣습니다.','마지막 모음이 후설 모음이면 -a, 전설 모음이면 -e를 고릅니다.|학교로는 okul-a, 집으로는 ev-e입니다. 모음 뒤에서는 araba-y-a가 됩니다.|목적지를 동사 앞에 놓습니다. Okula gidiyorum은 학교에 가고 있다는 뜻입니다.','evde는 집에서, eve는 집으로입니다. 위치와 방향을 구별하세요.',[
'Şimdi okul___ gidiyorum.|a|da|dan|저는 지금 학교에 가고 있습니다.|gitmek의 도착점 okul에는 방향격 -a를 붙입니다.',
'Bu akşam ev___ dönüyoruz.|e|de|den|우리는 오늘 저녁 집으로 돌아갑니다.|돌아가는 목적지는 ev-e입니다.',
'Çocuk araba___ biniyor.|ya|da|dan|아이가 자동차에 타고 있습니다.|binmek은 타는 대상을 방향격으로 받으며 모음 뒤에 y가 필요합니다.'
]);
add('A1','출발점과 탈격','-DAn: ~에서부터 / ~로부터','탈격은 이동의 출발점이나 분리되는 곳을 나타냅니다. 모음 조화와 자음 조화를 적용해 -dan, -den, -tan, -ten 중 하나를 고릅니다. 어떤 동사는 탈격을 요구하기도 합니다.','명사의 마지막 모음에 따라 -dan 또는 -den을 정합니다.|무성 자음 뒤에서는 -tan 또는 -ten이 됩니다. iş-ten은 직장에서부터입니다.|çıkmak, dönmek 같은 동사와 출발점을 연결합니다. okuldan çıkmak은 학교에서 나오기입니다.','동일한 장소라도 okula는 학교로, okulda는 학교에서, okuldan은 학교에서부터입니다.',[
'Okul___ eve yürüyorum.|dan|da|a|저는 학교에서 집까지 걸어갑니다.|출발점인 okul에는 -dan을 붙입니다.',
'İş___ saat altıda çıkıyorum.|ten|den|te|저는 여섯 시에 직장에서 나옵니다.|iş의 i와 무성음 ş에 따라 -ten입니다.',
'Otobüs___ iniyoruz.|ten|te|e|우리는 버스에서 내립니다.|inmek의 출발·이탈 대상은 탈격이며 otobüs 뒤에는 -ten입니다.'
]);
add('A1','누구와·무엇으로','ile / -(y)lA','ile는 함께하는 사람이나 사용하는 수단을 연결합니다. 별도 단어인 ile를 쓰거나 명사에 붙여 -la/-le 형태로 쓸 수 있습니다. 모음 뒤에서는 y를 넣어 arabayla처럼 만듭니다.','동행자는 arkadaşımla, 수단은 otobüsle처럼 나타냅니다.|따로 쓰면 araba ile, 붙이면 arabayla가 됩니다. 의미는 대체로 같습니다.|대명사는 별도 형태를 익힙니다. benimle는 나와, seninle는 너와입니다.','-la/-le와 장소 접사 -da/-de를 혼동하지 마세요. otobüsle는 버스로, otobüste는 버스 안에서입니다.',[
'Okula otobüs___ gidiyorum.|le|de|den|저는 학교에 버스로 갑니다.|이동 수단을 나타내므로 otobüsle입니다.',
'Benim___ gelir misin?|le|de|den|나와 함께 올래?|benimle는 나와 함께라는 동행 표현입니다.',
'Bu mektubu kalem___ yazıyorum.|le|de|den|저는 이 편지를 펜으로 쓰고 있습니다.|쓰는 도구를 표시하는 kalemle입니다.'
]);
add('A1','동사를 이름처럼 말하기','동사 어간 + -mak / -mek','사전에서 보는 -mak/-mek형은 행동의 이름을 나타내는 부정사입니다. 수영하기, 읽기처럼 행동 자체를 주제로 삼을 수 있습니다. 인칭과 시제가 붙은 완전한 서술 동사와 구별하세요.','동사 어간의 마지막 모음이 a, ı, o, u이면 -mak, 나머지는 -mek을 붙입니다.|부정사는 문장의 주어가 될 수 있습니다. Yüzmek güzeldir은 수영하는 것은 좋다는 뜻입니다.|부정을 나타내려면 -ma/-me 뒤에 부정사 어미를 붙입니다. gitmemek은 가지 않기입니다.','-mak/-mek에는 누가 언제 하는지까지 나타나지 않습니다. 실제 서술에는 인칭과 시제가 더 필요합니다.',[
'Kitap ___ çok güzel.|okumak|okuyorum|okudum|책 읽기는 아주 좋습니다.|행동 자체를 주어로 제시하므로 부정사 okumak을 씁니다.',
'Her gün ___ sağlıklıdır. (걷다)|yürümek|yürüyorum|yürüdün|매일 걷는 것은 건강에 좋습니다.|어간 yürü-의 전설 모음에 맞는 -mek을 붙입니다.',
'Burada ___ yasak. (수영하다)|yüzmek|yüzüyorum|yüzdük|여기서 수영하는 것은 금지되어 있습니다.|금지된 행동을 명사처럼 제시하는 yüzmek입니다.'
]);
old('A2',0,'특정 목적어인지 먼저 판단합니다. bu kitap은 어떤 책인지 이미 정해져 있습니다.|마지막 모음에 맞는 -ı/-i/-u/-ü를 붙입니다. 모음 뒤에서는 y가 필요합니다.|일부 단어는 자음이 바뀝니다. kitap-ı가 아니라 kitabı, ağaç-ı가 아니라 ağacı입니다.',[
'Bu ___ dün aldım. (책)|kitabı|kitapta|kitaba|이 책을 어제 샀습니다.|bu로 특정된 목적어이며 kitap의 p가 b로 바뀝니다.',
'___ kapatır mısın? (문)|Kapıyı|Kapıda|Kapıya|문을 닫아 줄래요?|특정한 닫는 대상 kapı에 -yı를 붙입니다.',
'O ___ tanıyorum. (학생)|öğrenciyi|öğrenciye|öğrencide|저는 그 학생을 압니다.|tanımak의 특정 목적어이고 모음 뒤이므로 öğrenciyi입니다.'
]);
old('A2',1,'동사 어간 뒤에 -DI를 붙이고 모음 조화를 적용합니다. gel-di, oku-du처럼 됩니다.|무성 자음 뒤에서는 -TI가 됩니다. git-ti, çalış-tı가 그 예입니다.|인칭은 과거 접사 뒤에 옵니다. geldim, geldin, geldik을 나란히 비교하세요.',[
'Dün müzeye ___ . (biz)|gittik|gittim|gittin|우리는 어제 박물관에 갔습니다.|git- 뒤의 -ti와 1인칭 복수 -k를 결합합니다.',
'Geçen hafta bu kitabı ___ . (ben)|okudum|okudun|okuduk|저는 지난주에 이 책을 읽었습니다.|oku-du-m에 과거와 1인칭 단수가 표시됩니다.',
'Sen dün çok ___ .|çalıştın|çalıştım|çalıştık|너는 어제 많이 공부했어.|çalış-는 무성음 ş로 끝나므로 -tı, sen에는 -n입니다.'
]);
old('A2',2,'소유자를 -(n)In으로 표시합니다. çocuk→çocuğun처럼 자음 변화가 일어나기도 합니다.|소유물에는 3인칭 소유 -(s)I를 붙입니다. çanta→çantası입니다.|소유물 뒤에 격을 더 붙일 때는 연결 자음 n을 확인하세요. çantası-n-da는 그 가방 안에입니다.',[
'Öğretmenin ___ çok büyük. (방)|odası|oda|odam|선생님의 방은 아주 큽니다.|소유물 oda에는 3인칭 소유 -sı가 필요합니다.',
'Çocuğun ___ kayboldu. (장난감)|oyuncağı|oyuncak|oyuncağım|아이의 장난감이 없어졌습니다.|oyuncak에 소유 접사를 붙이며 k가 ğ로 바뀝니다.',
'Bu okulun ___ yeni. (정원)|bahçesi|bahçe|bahçem|이 학교의 정원은 새것입니다.|okulun의 소유 대상이므로 bahçe-si입니다.'
]);
old('A2',3,'어간 뒤에 -abil/-ebil을 넣어 능력이나 가능을 표시합니다.|시제와 인칭은 가능 접사 뒤에 붙입니다. yap-abil-ir-im은 내가 할 수 있다는 뜻입니다.|일반현재의 불가능은 yapamam, gelemem처럼 만들 수 있습니다. 가능형의 단순 부정과 의미 범위를 구별하세요.',[
'Ben iyi ___ . (수영할 수 있다)|yüzebilirim|yüzebilirsin|yüzebiliriz|저는 수영을 잘할 수 있습니다.|yüz-ebil-ir-im은 1인칭 단수 능력 표현입니다.',
'Bu akşam ___ . (올 수 없다, ben)|gelemem|gelebilirim|gelebilirsin|저는 오늘 저녁 올 수 없습니다.|일반현재 1인칭 불가능은 gel-e-me-m입니다.',
'Bu çantayı ___ misin? (들 수 있다)|taşıyabilir|taşıdın|taşıyorum|이 가방을 들 수 있니?|모음으로 끝나는 taşı-에 y와 -abil을 연결하고 질문 인칭은 misin에 둡니다.'
]);
add('A2','습관과 일반현재','-(A/I)r: 반복·일반적 성질','일반현재인 geniş zaman은 습관, 일반적인 사실, 가벼운 의지나 제안을 나타냅니다. 어간에 따라 -r, -ar/-er, -ır/-ir/-ur/-ür를 쓰므로 자주 쓰는 동사의 실제 형태를 익혀야 합니다. 진행형과 시간 범위가 겹치는 경우도 있습니다.','모음 어간에는 보통 -r를 붙입니다. oku-r은 읽는다입니다.|자음 어간은 동사에 맞는 형태를 익힙니다. yapar, gelir, bilir처럼 됩니다.|부정은 1인칭에서 gelmem/gelmeyiz, 다른 인칭에서 gelmezsin 등으로 달라집니다.','모든 한 음절 동사가 -ar/-er를 쓰지는 않습니다. gelir, alır, bilir 같은 예외를 함께 익히세요.',[
'Ben her sabah kahve ___ .|içerim|içersin|içeriz|저는 매일 아침 커피를 마십니다.|일상 습관이며 iç-er-im이 1인칭 일반현재입니다.',
'O genellikle erken ___ . (오다)|gelir|geliyorum|gelirim|그 사람은 보통 일찍 옵니다.|gelmek의 3인칭 일반현재는 gelir입니다.',
'Ben et ___ . (먹다, 부정)|yemem|yemezsin|yemezler|저는 고기를 먹지 않습니다.|1인칭 단수 부정 일반현재는 ye-me-m입니다.'
]);
add('A2','앞으로 할 일','-(y)AcAk + 인칭','미래의 계획이나 예측은 -acak/-ecek으로 표현합니다. 모음으로 끝나는 어간에는 y를 넣습니다. 1인칭 어미와 결합할 때 미래 접사의 k가 ğ로 바뀌는 형태를 주의하세요.','마지막 모음에 맞춰 yap-acak, gel-ecek을 만듭니다.|모음 어간은 oku-y-acak처럼 연결합니다.|1인칭은 geleceğim, geleceğiz이고 2인칭은 geleceksin입니다. 접사 결합에 따라 철자가 달라집니다.','미래형이 반드시 확정된 일정만 뜻하지는 않습니다. 예측과 약속도 문맥에 따라 표현할 수 있습니다.',[
'Yarın seni ___ . (ben, 전화하다)|arayacağım|arayacaksın|arayacağız|내일 내가 너에게 전화할게.|ara-y-acak에 1인칭을 붙이며 k가 ğ로 바뀝니다.',
'Biz gelecek hafta ___ . (출발하다)|gideceğiz|gideceğim|gideceksin|우리는 다음 주에 갈 예정입니다.|biz에 맞는 미래형은 gideceğiz입니다.',
'Sen yarın ne ___ ? (하다)|yapacaksın|yapacağım|yapacağız|너는 내일 무엇을 할 거니?|sen에는 -sın이 붙어 yapacaksın이 됩니다.'
]);
add('A2','비교와 가장 높은 정도','기준 -DAn + daha / en + 형용사','두 대상을 비교할 때 기준에 탈격을 붙이고 daha로 더 높은 정도를 나타낼 수 있습니다. 집단에서 가장 높은 정도는 en을 사용합니다. 형용사 자체에 비교급 접사를 붙이지 않습니다.','비교 기준을 선택하고 -dan/-den/-tan/-ten을 붙입니다. benden은 나보다입니다.|그 뒤 daha + 형용사를 놓습니다. benden daha uzun은 나보다 더 키가 크다는 뜻입니다.|최상급은 en güzel처럼 만듭니다. 어느 집단에서 최고인지 문맥으로 제시하면 뜻이 선명해집니다.','daha와 en을 함께 겹쳐 쓰지 않습니다. 더 큰은 daha büyük, 가장 큰은 en büyük입니다.',[
'Bu oda diğerinden ___ büyük.|daha|en|çoktan|이 방은 다른 방보다 더 큽니다.|비교 기준 diğerinden 뒤에서는 daha로 비교합니다.',
'Sınıfın ___ uzun öğrencisi kim?|en|daha|kadar|반에서 가장 키가 큰 학생은 누구인가요?|집단 안의 최상급이므로 en을 씁니다.',
'Kardeşim ben___ daha hızlı koşar.|den|de|e|제 동생은 저보다 더 빨리 달립니다.|비교 기준 ben에는 탈격 -den을 붙입니다.'
]);
add('A2','~도·또한의 de / da','별도로 쓰는 de / da','~도라는 첨가 의미의 de/da는 앞 단어와 띄어 씁니다. 장소 접사 -de/-da와 모양이 비슷하지만 문장 역할이 다릅니다. 첨가의 de/da는 앞 자음이 무성음이어도 te/ta로 바뀌지 않습니다.','마지막 모음이 전설 모음이면 de, 후설 모음이면 da를 고릅니다.|추가되는 대상 바로 뒤에 별도 단어로 놓습니다. Ben de geliyorum은 나도 간다는 뜻입니다.|장소와 첨가가 함께 올 수도 있습니다. evde de는 집에서도라는 뜻입니다.','kitap da는 책도, kitapta는 책 안에입니다. 띄어쓰기와 d/t를 함께 확인하세요.',[
'Ben ___ sizinle geliyorum.|de|da|te|저도 여러분과 함께 갑니다.|ben의 마지막 모음 e에 맞는 첨가 조사 de입니다.',
'Bu kitap ___ çok ilginç.|da|ta|de|이 책도 아주 흥미롭습니다.|첨가 조사이므로 p 뒤에서도 da를 쓰고 띄어 씁니다.',
'Evde ___ çalışıyorum.|de|da|te|저는 집에서도 일합니다.|evde 뒤에 첨가 de를 별도로 붙입니다.'
]);
add('A2','하고 싶은 일을 말하기','-mak / -mek + istemek','하고 싶은 행동을 부정사로 놓고 istemek을 활용합니다. 같은 주체가 원하는 행동을 하는 경우에 쓰는 기본 구조입니다. 다른 사람이 하기를 원할 때는 명사화와 소유 접사를 쓰는 별도 구성이 필요합니다.','원하는 행동을 okumak, gitmek 같은 부정사로 만듭니다.|원하는 사람과 시제는 istemek에 표시합니다. istiyorum은 내가 원한다는 뜻입니다.|가고 싶지 않다는 gitmek istemiyorum입니다. 부정이 원하는 마음을 부정합니다.','Senin gelmeni istiyorum은 네가 오기를 원한다는 뜻으로, benim gitmek istemem과 주체 구성이 다릅니다.',[
'Ben Türkçe öğren___ istiyorum.|mek|mak|dim|저는 터키어를 배우고 싶습니다.|öğren-의 마지막 모음 e에 맞춰 öğrenmek을 만듭니다.',
'Biz biraz dinlenmek ___ .|istiyoruz|istiyorum|istiyorsun|우리는 조금 쉬고 싶습니다.|원하는 주체 biz의 인칭은 istiyoruz에 표시합니다.',
'Bugün dışarı çıkmak ___ . (ben, 원하지 않다)|istemiyorum|istiyorum|istiyorsun|저는 오늘 밖에 나가고 싶지 않습니다.|나가고 싶은 마음의 부정이므로 istemiyorum입니다.'
]);
add('A2','요청과 지시','동사 어간 / -(y)In','친한 상대 한 사람에게 하는 명령은 보통 동사 어간만 씁니다. 여러 사람이나 정중한 상대에게는 -(y)ın/-in/-un/-ün을 붙입니다. lütfen을 더해 부탁의 어조를 나타낼 수 있지만 상황과 억양도 중요합니다.','한 사람에게 앉으라고 하면 otur, 기다리라고 하면 bekle입니다.|정중한 요청은 oturun, bekleyin처럼 만듭니다. 모음 어간 뒤에 y를 넣습니다.|부정은 어간 뒤 -ma/-me를 넣습니다. beklemeyin은 기다리지 마세요입니다.','lütfen만 붙였다고 모든 상황에서 부드러운 부탁이 되는 것은 아닙니다. 가능 질문으로 완화할 수도 있습니다.',[
'Lütfen buraya ___ . (정중히 앉다)|oturun|oturuyorum|oturdum|여기에 앉아 주세요.|정중하거나 복수 상대에게 쓰는 명령형 oturun입니다.',
'Lütfen biraz ___ . (정중히 기다리다)|bekleyin|bekliyorum|bekledim|잠시 기다려 주세요.|bekle-가 모음으로 끝나므로 -yin을 붙입니다.',
'Burada sigara ___ . (정중한 금지)|içmeyin|içiyorum|içtiniz|여기서 담배를 피우지 마세요.|부정 -me 뒤에 정중 명령형 -yin을 붙입니다.'
]);
add('A2','어떤 일을 하기 전에','-mAdAn önce','한 행동보다 먼저 하는 일을 말할 때 -madan/-meden önce를 사용합니다. 형태에 부정 접사가 포함되어 있지만 전체 표현은 보통 ~하기 전에로 번역합니다. 무엇이 먼저이고 나중인지 연결 순서를 확인하세요.','나중에 일어날 행동의 어간 뒤에 -madan/-meden을 붙입니다.|그 뒤 önce를 놓아 기준 시점을 만듭니다. yatmadan önce는 자기 전입니다.|먼저 하는 행동을 결과절에 둡니다. Yatmadan önce kitap okurum은 자기 전에 책을 읽는다는 뜻입니다.','-madan 단독은 ~하지 않고라는 뜻도 됩니다. önce가 있으면 시간상 선후 관계를 드러냅니다.',[
'Yat___ önce dişlerimi fırçalarım.|madan|dıktan|ınca|저는 자기 전에 이를 닦습니다.|자기 전이라는 시간 기준은 yatmadan önce입니다.',
'Evden çık___ önce anahtarını al.|madan|tıktan|ınca|집을 나서기 전에 열쇠를 챙겨.|나서기 전이므로 çıkmadan önce를 만듭니다.',
'Yemek ye___ önce ellerini yıka.|meden|dikten|yince|밥을 먹기 전에 손을 씻어.|ye-의 전설 모음에 맞는 yemeden önce입니다.'
]);
add('A2','어떤 일을 한 뒤에','-DIktAn sonra','앞 행동이 끝난 다음의 일을 연결할 때 -dıktan/-dikten/-duktan/-dükten sonra를 씁니다. 어간이 무성 자음으로 끝나면 d가 t로 바뀝니다. 접사 내부를 시제나 인칭처럼 임의로 바꾸지 않습니다.','먼저 끝나는 행동을 정합니다. 수업 후에 읽는다면 수업이 먼저입니다.|동사 어간에 -DIktAn을 붙입니다. gel-dikten, oku-duktan, çalış-tıktan처럼 됩니다.|sonra 뒤에 다음 행동을 연결합니다. Eve geldikten sonra dinlendim은 집에 온 뒤 쉬었다는 뜻입니다.','-ınca는 ~하자·~할 때라는 계기를 나타낼 수도 있습니다. 완료 뒤의 순서를 분명히 할 때 -dıktan sonra가 편리합니다.',[
'Kitabı oku___ sonra sana vereceğim.|duktan|madan|yorken|책을 읽은 뒤 너에게 줄게.|읽기가 끝난 다음이므로 okuduktan sonra입니다.',
'Eve gel___ sonra yemek yaptım.|dikten|meden|irken|집에 온 뒤 요리했습니다.|gel-에 -dikten sonra를 붙입니다.',
'Bir saat çalış___ sonra dinlendik.|tıktan|madan|ırken|우리는 한 시간 공부한 뒤 쉬었습니다.|çalış-의 무성음 ş 뒤라서 -tıktan입니다.'
]);
old('B1',0,'정보를 직접 사건으로 제시할지, 전언이나 뒤늦은 발견으로 제시할지 판단합니다.|어간 마지막 모음에 맞춰 -mış/-miş/-muş/-müş를 붙입니다. gelmiş, okumuş처럼 됩니다.|인칭은 그 뒤에 놓습니다. unutmuşum은 내가 잊었다는 것을 뒤늦게 깨달은 상황에서도 쓰입니다.',[
'Duyduğuma göre kardeşin sınavı ___ .|geçmiş|geçiyorum|geçiyorsun|들은 바에 따르면 네 동생이 시험에 합격했대.|전해 들은 사실을 geç-miş로 제시합니다.',
'Anahtarımı evde ___ ! (잊고 왔음을 발견)|unutmuşum|unutmuşsun|unutmuşuz|내가 열쇠를 집에 두고 왔네!|나중에 알게 된 자신의 행동은 -muş에 1인칭 -um을 붙입니다.',
'Meğer çocuk bütün sütü ___ .|içmiş|içiyorum|içiyorsun|알고 보니 아이가 우유를 전부 마셨네요.|meğer와 함께 뒤늦게 알게 된 결과를 içmiş로 나타냅니다.'
]);
old('B1',1,'먼저 조건의 주어와 결과의 주어를 구분합니다. 조건절에도 인칭을 표시해야 합니다.|일반적·미래 조건은 gelirsem처럼 일반현재 뒤 -se를 결합할 수 있습니다.|명사나 상태의 조건은 varsa, hazırsa처럼 만듭니다. 결과절의 시제는 실제 의미에 맞춥니다.',[
'Vaktin var___, birlikte yürüyelim.|sa|mış|dı|시간이 있다면 같이 걷자.|존재 var 뒤의 조건 접사는 -sa입니다.',
'Erken gelir___, birlikte kahvaltı yaparız. (sen)|sen|sem|sek|네가 일찍 오면 함께 아침을 먹자.|조건을 수행하는 사람이 너이므로 gelirsen입니다.',
'Hava güzel olursa, parka ___ . (biz, 미래)|gideceğiz|gittim|gidiyorsun|날씨가 좋으면 우리는 공원에 갈 것입니다.|조건 뒤 계획된 결과를 biz의 미래형 gideceğiz로 나타냅니다.'
]);
old('B1',2,'배경 속 동시 행동이면 -ken, 발생한 일을 계기로 삼으면 -(y)ınca를 검토합니다.|오는 도중은 gelirken, 도착하면은 gelince입니다. 동사마다 어간과 결합 형태를 익힙니다.|두 절의 주체가 다르면 명시해서 혼동을 줄입니다. Ben çalışırken o dinlendi처럼 씁니다.',[
'Otobüs bekler___ bir arkadaşımı gördüm.|ken|se|miş|버스를 기다리는 동안 친구 한 명을 보았습니다.|기다리던 배경과 동시에 일어난 일이므로 beklerken입니다.',
'Eve gel___ seni arayacağım.|ince|irken|meden|집에 도착하면 너에게 전화하겠습니다.|전화의 계기는 도착이므로 gelince입니다.',
'Ders çalışır___ telefonumu kapatırım.|ken|mış|dım|공부하는 동안에는 휴대전화를 끕니다.|공부하는 시간적 배경은 çalışırken입니다.'
]);
old('B1',3,'조언·의무의 내용에 -malı/-meli를 붙입니다. 어간 마지막 모음에 따라 고릅니다.|누가 해야 하는지 인칭을 덧붙입니다. gitmeliyim, gitmelisin, gitmeliyiz를 비교하세요.|금지는 gitmemelisin, 의무가 없음은 gitmek zorunda değilsin입니다. 부정의 범위가 다릅니다.',[
'Sağlığın için daha çok su iç___ . (sen)|melisin|meliyim|meliyiz|건강을 위해 너는 물을 더 마셔야 해.|iç-의 전설 모음에 -meli, sen의 -sin을 붙입니다.',
'Yarın erken kalk___ . (biz)|malıyız|malısın|malıyım|우리는 내일 일찍 일어나야 합니다.|kalk-에는 -malı, biz에는 -(y)ız입니다.',
'Bu sırrı kimseye söyle___ . (sen, 금지)|memelisin|melisin|meliyim|너는 이 비밀을 아무에게도 말하면 안 돼.|부정 -me와 의무 -meli를 결합한 söylememelisin입니다.'
]);
add('B1','행동을 이어 붙이기','-(y)Ip + 마지막 서술 동사','같은 사람이 하는 동작들을 간결하게 이어 말할 때 -(y)ıp/-ip/-up/-üp을 씁니다. 시제와 인칭은 보통 마지막 동사에서 읽습니다. 순차 행동뿐 아니라 밀접하게 이어진 행동도 표현할 수 있습니다.','앞 동사 어간에 네 갈래 모음 조화를 적용합니다. al-ıp, gel-ip, gör-üp처럼 됩니다.|모음 어간 뒤에는 y가 들어갑니다. oku-y-up이 그 예입니다.|마지막 동사에 시제와 인칭을 둡니다. Alıp geldim은 내가 가져왔다는 뜻입니다.','두 절의 주체가 전혀 다를 때는 이 구성을 기계적으로 쓰지 말고 주어와 연결 관계를 분명히 하세요.',[
'Markete gid___ ekmek aldım.|ip|up|üp|시장에 가서 빵을 샀습니다.|git-의 연결형은 자음 변화가 반영된 gidip입니다.',
'Kitabı oku___ geri verdim.|yup|yıp|yip|책을 읽고 돌려주었습니다.|oku-의 마지막 모음 u에 따라 -yup을 붙입니다.',
'Kapıyı aç___ içeri girdik.|ıp|ip|up|우리는 문을 열고 안으로 들어갔습니다.|aç-의 마지막 모음 a에 맞는 -ıp이며 인칭과 과거는 girdik에 있습니다.'
]);
add('B1','하지 않고 하는 행동','-mAdAn + 본동사','어떤 행동을 하지 않은 채 다른 행동을 했다고 말할 때 -madan/-meden을 씁니다. önce 없이 사용하면 ~하지 않고라는 부정 동시·방식 의미가 흔합니다. 부정되는 행동과 실제로 수행한 행동을 구별하세요.','생략하거나 수행하지 않은 행동을 첫 동사로 둡니다.|어간의 마지막 모음에 맞춰 -madan 또는 -meden을 붙입니다.|실제로 한 행동에 시제와 인칭을 표시합니다. Kahvaltı yapmadan çıktım은 아침을 먹지 않고 나갔다는 뜻입니다.','-madan önce는 ~하기 전에입니다. 먼저 하지 않았다는 사실과 이후에도 전혀 하지 않았다는 의미는 구별해야 합니다.',[
'Kahvaltı yap___ evden çıktım.|madan|tıktan|ınca|아침을 먹지 않고 집에서 나왔습니다.|빠뜨린 행동을 yapmadan으로 나타냅니다.',
'Bana haber ver___ gitme.|meden|dikten|ince|나에게 알리지 않고 가지 마.|알리는 행동 없이 떠나지 말라는 뜻이므로 vermeden입니다.',
'Soruyu oku___ cevap verdi.|madan|duktan|yunca|그 사람은 질문을 읽지 않고 답했습니다.|읽지 않은 상태를 okumadan으로 표현합니다.'
]);
add('B1','함께 하자는 제안','-(y)AlIm','우리 함께 하자는 제안에는 -(y)alım/-elim을 씁니다. 강한 명령보다는 공동 행동을 제안하는 기본 형태입니다. 의문 조사와 함께 쓰면 같이 할지 상대의 의견을 물을 수 있습니다.','어간에 따라 yap-alım, gel-elim으로 결합합니다.|모음 어간 뒤에는 y를 넣어 başla-y-alım으로 만듭니다.|질문은 Gidelim mi?처럼 의문 조사를 별도로 둡니다. 부정 제안은 gitmeyelim입니다.','이 형태 자체가 1인칭 복수 제안이므로 뒤에 다시 -iz를 붙이지 않습니다.',[
'Biraz dinlen___ .|elim|alım|iyorsun|우리 조금 쉬자.|dinlen-의 마지막 모음 e에 따라 -elim입니다.',
'Derse başla___ mı?|yalım|yelim|yorsun|수업을 시작할까요?|başla-는 모음으로 끝나므로 -yalım을 붙입니다.',
'Bugün dışarı git___ . (가지 말자)|meyelim|meliyiz|mişsiniz|오늘은 밖에 나가지 말자.|부정 -me 뒤에 제안 -(y)elim을 결합합니다.'
]);
add('B1','행동의 목적','-mAk için','같은 주체가 어떤 목적을 위해 행동하는지 설명할 때 -mak/-mek için을 씁니다. ~하기 위해로 번역하며 이유를 설명하는 -dığı için과는 논리 관계가 다릅니다. 목표 행동은 아직 실현되지 않았을 수도 있습니다.','목표가 되는 동사를 부정사로 만듭니다. öğrenmek은 배우기입니다.|부정사 뒤에 için을 놓습니다. öğrenmek için은 배우기 위해입니다.|실제 수단·행동을 뒤 절에 연결합니다. Türkçe öğrenmek için kursa gidiyorum처럼 씁니다.','다른 사람이 행동하게 하려는 목적에는 gelmesi için처럼 명사화·소유 구조가 필요할 수 있습니다.',[
'Türkçe öğrenmek ___ her gün çalışıyorum.|için|rağmen|kadar|터키어를 배우기 위해 매일 공부합니다.|공부의 목표를 나타내므로 için입니다.',
'Otobüse yetiş___ için koştum.|mek|mak|tim|버스를 타기 위해 달렸습니다.|yetiş-를 부정사 yetişmek으로 만든 뒤 için을 붙입니다.',
'Dinlen___ için parka gittik.|mek|mak|dik|우리는 쉬기 위해 공원에 갔습니다.|dinlen-의 마지막 모음에 맞는 -mek입니다.'
]);
add('B1','좋아하는 활동 말하기','-mAktAn hoşlanmak','어떤 활동을 즐기는지 말할 때 부정사에 탈격을 붙여 -maktan/-mekten hoşlanmak으로 만듭니다. hoşlanmak이 탈격을 요구한다는 점이 핵심입니다. sevmek은 같은 뜻에 가까워도 목적어 구성이 다릅니다.','활동을 okumak, yürümek 같은 부정사로 만듭니다.|k 뒤의 탈격이 -tan/-ten이 되어 okumaktan, yürümekten이 됩니다.|hoşlanmak에 인칭과 시제를 붙입니다. hoşlanıyorum은 내가 즐긴다는 뜻입니다.','kitap okumayı seviyorum과 kitap okumaktan hoşlanıyorum을 비교하세요. 동사에 따라 필요한 격이 바뀝니다.',[
'Kitap oku___ hoşlanıyorum.|maktan|maya|mayı|저는 책 읽기를 좋아합니다.|hoşlanmak의 보어는 탈격이므로 okumaktan입니다.',
'Biz doğada yürü___ hoşlanırız.|mekten|meye|meyi|우리는 자연 속에서 걷기를 좋아합니다.|yürü-의 모음에 맞는 yürümekten입니다.',
'O yemek yap___ hoşlanmıyor.|maktan|mayı|maya|그 사람은 요리하기를 좋아하지 않습니다.|부정인 hoşlanmıyor도 같은 탈격 보어를 받습니다.'
]);
add('B1','언제부터 계속','-DAn beri / 기간 + -DIr','과거의 시작점부터 지금까지 이어지는 상태를 -dan beri로 나타냅니다. 기간의 길이를 말할 때는 üç yıldır처럼 -dır를 사용할 수도 있습니다. 시작점과 경과 시간을 구분해서 표현을 고르세요.','시작 시점을 정합니다. sabah는 아침, pazartesi는 월요일입니다.|시작점에 탈격과 beri를 붙입니다. sabahtan beri는 아침부터입니다.|지금도 계속되는 동작은 진행형 등 문맥에 맞는 시제로 이어 줍니다.','üç yıldan beri도 가능하지만 기본 연습에서는 üç yıldır로 기간, pazartesiden beri로 시작점을 구별해 익힙니다.',[
'Sabah___ beri seni bekliyorum.|tan|dan|ta|아침부터 너를 기다리고 있어.|sabah는 무성음 h로 끝나므로 -tan beri입니다.',
'Pazartesi___ beri hastayım.|den|dan|de|월요일부터 아파요.|pazartesi의 마지막 모음 i에 맞는 -den beri입니다.',
'Üç yıl___ burada yaşıyorum.|dır|dan|da|저는 여기서 3년째 살고 있습니다.|경과 기간을 나타내는 üç yıldır입니다.'
]);
add('B1','인용과 전달의 diye','인용 내용 + diye + 말·생각 동사','diye는 말이나 생각의 내용을 이어 주는 연결어로 사용됩니다. 직접 인용한 표현 뒤에서 ~라고에 가까운 역할을 할 수 있습니다. 목적 등 다른 의미도 있으므로 뒤 동사와 문맥을 함께 봅니다.','전달하려는 말이나 질문을 먼저 제시합니다.|그 뒤 diye를 놓고 sormak, düşünmek 같은 동사를 연결합니다.|직접 인용에서는 원래 말의 인칭이 유지됩니다. 간접 명사절로 바꾸는 것과 구별하세요.','diye의 모든 용법을 ~라고 하나로 번역하지 마세요. 여기서는 발화·사고 내용을 전달하는 쓰임을 연습합니다.',[
'“Nereye gidiyorsun?” ___ sordu.|diye|rağmen|kadar|그 사람은 어디에 가느냐고 물었습니다.|질문 내용을 sordu에 연결하는 diye입니다.',
'“Yarın gelirim.” ___ düşündüm.|diye|göre|beri|저는 내일 오겠다고 생각했습니다.|직접 제시한 생각을 düşündüm에 연결합니다.',
'“Teşekkür ederim.” ___ cevap verdi.|diye|için|sonra|그 사람은 감사하다고 대답했습니다.|답변 내용을 인용하는 연결어 diye를 씁니다.'
]);
add('B1','서로·함께 하는 행동','어휘화된 상호·공동 동사','일부 동사는 -(I)ş 등을 포함해 서로 하거나 함께 하는 행동을 나타냅니다. görüşmek은 만나거나 서로 이야기하기, yazışmak은 서로 서신을 주고받기입니다. 접사만 보고 의미를 자동 계산하지 말고 실제 동사 뜻을 익혀야 합니다.','기본 동사와 파생 동사를 비교합니다. yazmak은 쓰기, yazışmak은 서신 등을 주고받기입니다.|상대방은 보통 ile로 연결합니다. arkadaşımla görüştüm처럼 씁니다.|시제와 인칭은 완성된 동사 어간 뒤에 붙입니다. yazış-ıyor-uz는 우리가 주고받고 있다는 뜻입니다.','모든 -ş 포함 동사가 상호 의미를 갖는 것은 아닙니다. çalışmak 등을 접사만으로 분석해 오해하지 마세요.',[
'Arkadaşımla dün uzun uzun ___ . (만나 이야기하다)|görüştüm|gördüm|göründüm|어제 친구와 만나 한참 이야기했습니다.|görüşmek은 서로 만나거나 이야기를 나누는 동사입니다.',
'Biz e-posta ile ___ . (서로 편지를 주고받다)|yazışıyoruz|yazıyorum|yazıyorsun|우리는 이메일을 주고받고 있습니다.|상호적인 yazışmak에 biz의 진행형을 붙입니다.',
'İki çocuk oyuncak için ___ . (서로 싸웠다)|dövüştü|dövdü|dövdüm|아이 둘이 장난감 때문에 서로 싸웠습니다.|dövüşmek은 서로 싸우다이고 dövmek은 때리다입니다.'
]);
old('B2',0,'꾸밈을 받는 명사가 관계절 속 행동의 주체인지 확인합니다.|그렇다면 어간에 -(y)an/-en을 붙여 명사 바로 앞에 둡니다. çalış-an kişi처럼 됩니다.|이 형태만으로 과거와 현재가 엄격히 정해지지 않으므로 dün, şimdi 같은 시점도 함께 읽습니다.',[
'Bahçede ___ çocuk benim kardeşim. (놀다)|oynayan|oynadığım|oynadım|정원에서 노는 아이는 제 동생입니다.|아이가 노는 주체이므로 oyna-y-an입니다.',
'Dün bize ___ misafir bugün gitti. (오다)|gelen|geldiğim|geldim|어제 우리 집에 온 손님은 오늘 떠났습니다.|손님이 오는 주체이므로 gelen이며 과거는 dün에서 읽습니다.',
'Burada ___ insanlar çok yardımsever. (일하다)|çalışan|çalıştığım|çalıştım|여기서 일하는 사람들은 매우 친절합니다.|사람들이 일의 주체이므로 çalış-an으로 꾸밉니다.'
]);
old('B2',1,'꾸미는 명사가 내가 읽거나 본 대상이면 -DIK 구성인지 검토합니다.|어간 뒤 -DIK에 소유 접사로 관계절 주어를 나타냅니다. oku-duğ-um은 내가 읽은·읽는입니다.|뒤에 꾸밈받는 명사를 둡니다. okuduğum kitap처럼 관계절이 명사 앞에 옵니다.',[
'Dün ___ film çok güzeldi. (ben, 보다)|izlediğim|izleyen|izledim|어제 제가 본 영화는 아주 좋았습니다.|영화는 본 대상이고 주체는 나이므로 izlediğim입니다.',
'Senin ___ yemek çok lezzetli. (만들다)|yaptığın|yapan|yaptım|네가 만든 음식은 아주 맛있어.|senin의 주체를 소유형 -ın으로 표시한 yaptığın입니다.',
'Bizim ___ ev küçük. (살다)|yaşadığımız|yaşayan|yaşadım|우리가 사는 집은 작습니다.|장소를 꾸미는 관계절에 biz의 소유형을 넣어 yaşadığımız으로 만듭니다.'
]);
old('B2',2,'능동문의 목적어를 수동문의 주제로 삼습니다. 누가 했는지보다 무엇이 되었는지에 집중합니다.|동사에 맞는 수동 접사를 고릅니다. yaz-ıl, aç-ıl, temizle-n처럼 형태가 다릅니다.|시제는 수동 어간 뒤에 놓습니다. yazıldı는 쓰였다, yazılacak은 쓰일 것이다입니다.',[
'Bu köprü geçen yıl ___ . (짓다, 수동)|yapıldı|yaptı|yaptım|이 다리는 작년에 지어졌습니다.|다리는 짓는 대상이므로 yap-ıl-dı입니다.',
'Odalar her gün ___ . (청소하다, 수동)|temizleniyor|temizliyor|temizliyorum|방들은 매일 청소됩니다.|temizle-에 수동 -n을 붙인 temizleniyor입니다.',
'Bu rapor yarın ___ . (쓰다, 수동)|yazılacak|yazacak|yazacağım|이 보고서는 내일 작성될 것입니다.|수동 yaz-ıl- 뒤에 미래 -acak을 붙입니다.'
]);
old('B2',3,'직접 행동한 사람과 행동을 시킨 사람을 구별합니다.|동사별 사역형을 익힙니다. yapmak→yaptırmak, okumak→okutmak, gülmek→güldürmek처럼 다릅니다.|원래 타동사인지에 따라 실행자 격이 달라질 수 있으므로 예문 전체를 함께 익힙니다.',[
'Saçımı kuaföre ___ . (자르도록 맡기다)|kestirdim|kestim|kesildim|미용사에게 머리를 잘라 달라고 했습니다.|kesmek의 사역형 kestirmek은 남에게 자르게 하다는 뜻입니다.',
'Öğretmen öğrenciye metni ___ . (읽게 하다)|okuttu|okudu|okundu|선생님이 학생에게 글을 읽게 했습니다.|oku-t-tu는 읽게 했다는 사역 과거입니다.',
'Bu komik film beni ___ . (웃게 하다)|güldürdü|güldü|güldüm|이 재미있는 영화가 나를 웃게 했습니다.|웃다 gülmek의 사역형 güldürmek을 씁니다.'
]);
add('B2','할수록 달라지는 결과','-DIKçA','어떤 행동이 반복되거나 그 정도가 늘어날수록 다른 변화가 생길 때 -dıkça 계열을 사용합니다. ~할 때마다라는 반복 의미도 가능합니다. 뒤 절에 증가·감소 등 변화가 있으면 ~할수록으로 읽기 쉽습니다.','어간의 모음·자음에 맞춰 -dıkça/-dikçe/-dukça/-dükçe 또는 t형을 고릅니다.|반복되거나 정도가 커지는 행동을 앞에 둡니다. okudukça는 읽을수록입니다.|변하는 결과를 뒤에 놓습니다. Okudukça daha iyi anlıyorum처럼 연결합니다.','단순히 한 번 끝난 후라는 뜻의 -dıktan sonra와 구별합니다. -dıkça는 반복·점진 관계를 드러냅니다.',[
'Türkçe konuş___ daha rahat hissediyorum.|tukça|madan|tuktan|터키어를 말할수록 더 편안해집니다.|konuş-의 ş 뒤에서 t가 되고 u에 맞아 konuştukça입니다.',
'Bu kitabı oku___ yeni şeyler öğreniyorum.|dukça|madan|duktan|이 책을 읽을수록 새로운 것을 배웁니다.|반복·진행에 따른 변화는 okudukça입니다.',
'Daha çok çalış___ daha iyi anlıyorsun.|tıkça|madan|tıktan|더 공부할수록 더 잘 이해하게 돼.|çalış- 뒤 -tıkça가 공부 정도와 이해의 변화를 연결합니다.'
]);
add('B2','하자마자 즉시','일반현재 긍정 + 부정: gelir gelmez','한 행동 직후 다른 일이 일어났다는 즉시성을 일반현재의 긍정·부정 반복으로 표현합니다. gelir gelmez는 오자마자입니다. 두 형태에 각각 인칭 어미를 붙이지 않는 고정된 연결 구성을 익히세요.','앞 행동의 일반현재 3인칭 긍정형을 만듭니다. gelmek→gelir입니다.|그 뒤 부정형 gelmez를 이어 gelir gelmez로 만듭니다.|실제 시제와 인칭은 뒤 절에 둡니다. Gelir gelmez beni aradı는 오자마자 내게 전화했다는 뜻입니다.','gelir gelmez 전체가 연결어 역할을 하므로 gelirim gelmem처럼 인칭을 나누어 붙이지 않습니다.',[
'Eve gelir ___ seni arayacağım.|gelmez|gelmedi|gelmiyor|집에 오자마자 너에게 전화할게.|즉시성을 나타내는 짝은 gelir gelmez입니다.',
'Haberi duyar ___ yola çıktık.|duymaz|duymadı|duymuyor|우리는 소식을 듣자마자 출발했습니다.|duyar의 부정 짝 duymaz로 시간 연결을 만듭니다.',
'Ders biter ___ eve gittim.|bitmez|bitmedi|bitmiyor|수업이 끝나자마자 집에 갔습니다.|biter bitmez는 끝나자마자라는 뜻입니다.'
]);
add('B2','마치 그런 것처럼','-mIş gibi','실제로 그런지와 별개로 어떤 행동이나 상태처럼 보이는 모습을 나타냅니다. 완료형 -mış와 gibi가 결합해 마치 ~한 것처럼으로 해석될 수 있습니다. 표현이 사실을 확정하는 것은 아닙니다.','비교 대상으로 떠올리는 상황을 -mış/-miş/-muş/-müş로 만듭니다.|gibi를 이어 그 상황과 비슷한 태도·모습을 나타냅니다.|davranmak, görünmek, yapmak 등과 연결해 겉모습이나 행동을 설명합니다.','gelmiş gibi davranıyor는 온 것처럼 행동한다는 뜻이지 실제로 왔다고 확정하는 문장이 아닙니다.',[
'Hiçbir şey ol___ gibi davranıyor.|mamış|madı|muyor|아무 일도 없었던 것처럼 행동합니다.|부정 완료 모양 olmamış 뒤에 gibi를 붙입니다.',
'Her şeyi anla___ gibi başını salladı.|mış|dı|yor|모든 것을 이해한 것처럼 고개를 끄덕였습니다.|anlamış gibi는 이해한 듯한 모습을 나타냅니다.',
'Beni daha önce gör___ gibi baktı.|müş|dü|üyor|전에 나를 본 적 있는 것처럼 바라보았습니다.|gör-의 ö에 따라 -müş를 붙입니다.'
]);
add('B2','앞으로 행동할 사람','-(y)AcAk + 명사 / -(y)AcAk olan','앞으로 특정 행동을 할 사람이나 대상을 명사 앞에서 꾸밀 수 있습니다. gelecek öğrenci는 올 학생이고 gelecek olan öğrenci도 가능합니다. 미래 계획을 나타내는 본동사와 명사를 꾸미는 형태를 구별하세요.','어간에 미래 분사 -acak/-ecek을 붙입니다. katılacak은 참여할입니다.|명사를 바로 붙이거나 olan을 사이에 놓습니다. katılacak olan kişiler처럼 씁니다.|미래 수동도 만들 수 있습니다. yapılacak toplantı는 열릴 회의입니다.','geleceğim toplantı처럼 관계절 주체를 소유 접사로 표시하는 구성과 혼동하지 마세요. 여기서는 미래 행동의 주체를 꾸밉니다.',[
'Yarın bize ___ olan misafir için oda hazırladık.|gelecek|geldim|geliyorum|내일 우리 집에 올 손님을 위해 방을 준비했습니다.|앞으로 오는 주체 misafir를 gelecek olan으로 꾸밉니다.',
'Toplantıya ___ kişiler kayıt yaptırmalı. (참가하다)|katılacak|katıldım|katılıyorum|회의에 참가할 사람들은 등록해야 합니다.|미래에 참가하는 사람을 꾸미는 katılacak입니다.',
'Yarın ___ toplantı iptal edildi. (열리다)|yapılacak|yaptım|yapıyorum|내일 열릴 회의가 취소되었습니다.|회의가 행위의 대상이므로 수동 미래 분사 yapılacak입니다.'
]);
add('B2','다른 사람이 하기를 바라기','주어의 속격 + -mA + 소유 + 대격','내가 누군가의 행동을 원할 때는 그 행동을 명사화하고 누가 하는지 소유 접사로 표시합니다. Senin gelmeni istiyorum은 네가 오기를 원한다는 뜻입니다. 주체가 같은 gitmek istiyorum과 구조가 다릅니다.','행동할 사람을 senin, onun, çocukların처럼 속격으로 제시합니다.|동사를 -ma/-me로 명사화하고 그 사람에 맞는 소유 접사를 붙입니다. gel-me-n은 네가 오는 것입니다.|istemek의 목적어로 쓰기 위해 대격을 더합니다. gel-me-n-i가 됩니다.','Onun gelmesi는 그가 오는 것, onun gelmesini istiyorum은 그가 오기를 원한다는 뜻입니다. 끝의 대격을 빠뜨리지 마세요.',[
'Senin de bizimle ___ istiyorum. (오다)|gelmeni|gelmek|geliyorsun|너도 우리와 함께 오기를 바라.|명사화 -me, 너의 소유 -n, 대격 -i가 결합한 gelmeni입니다.',
'Onun biraz ___ istiyoruz. (쉬다)|dinlenmesini|dinlenmek|dinleniyor|우리는 그 사람이 조금 쉬기를 바랍니다.|3인칭 소유 -si와 연결 n, 대격 -i를 포함한 dinlenmesini입니다.',
'Öğretmen bizim daha çok ___ istiyor. (읽다)|okumamızı|okumak|okuyoruz|선생님은 우리가 더 많이 읽기를 원합니다.|oku-ma-mız-ı에 우리라는 주체와 대격이 표시됩니다.'
]);
add('B2','사실에 근거한 이유','-DIK + 소유 + için','어떤 사실 때문에 결과가 생겼다고 말할 때 -dığı için 계열을 사용합니다. 주어는 소유 접사로 표시되며, 목적을 나타내는 -mak için과 다릅니다. 이미 있는 사정과 의도한 목표를 구별해서 읽으세요.','원인이 되는 사실을 고릅니다. hasta olmak은 아픈 상태입니다.|-DIK과 주체의 소유 접사를 붙입니다. olduğum은 내가 ~라는 것입니다.|için 뒤에 결과를 둡니다. Hasta olduğum için evde kaldım은 아파서 집에 있었다는 뜻입니다.','öğrenmek için은 배우기 위해, öğrendiğim için은 내가 배웠기 때문에입니다. 목적과 원인을 구별합니다.',[
'Hasta ___ için evde kaldım. (ben)|olduğum|olmak|olduğun|저는 아파서 집에 있었습니다.|원인의 주체가 나이므로 ol-duğ-um için입니다.',
'Yağmur ___ için maç ertelendi. (오다)|yağdığı|yağmak|yağdım|비가 와서 경기가 연기되었습니다.|비가 오는 사실을 yağdığı için으로 명사화해 연결합니다.',
'Erken ___ için her şeyi hazırlayabildik. (biz, 오다)|geldiğimiz|gelmek|geldiğim|우리는 일찍 와서 모든 것을 준비할 수 있었습니다.|원인절의 우리라는 주체가 -imiz에 나타납니다.'
]);
add('B2','어떤 일을 할 때','-DIK + 소유 + zaman','특정 행동이 일어난 때를 명사절과 zaman으로 표현합니다. geldiğim zaman은 내가 올 때·왔을 때이며 실제 시간은 문맥에서 정해집니다. 주체를 소유 접사로 분명히 표시할 수 있다는 점이 특징입니다.','시간의 기준이 되는 동사에 -DIK을 붙입니다.|주어에 맞는 소유 접사를 선택합니다. geldiğin은 네가 오는 것입니다.|zaman을 붙인 뒤 본동사를 놓습니다. Geldiğin zaman beni ara처럼 연결합니다.','-DIK이 포함되었다고 무조건 과거가 아닙니다. 미래를 가리키는 문맥에서도 쓰일 수 있습니다.',[
'Eve ___ zaman seni ararım. (ben, 도착하다)|geldiğim|geldiğin|gelen|내가 집에 오면 너에게 전화할게.|오는 주체가 나이므로 geldiğim zaman입니다.',
'Sen ___ zaman ben uyuyordum. (오다)|geldiğin|geldiğim|gelen|네가 왔을 때 나는 자고 있었어.|sen의 주체를 -in으로 표시한 geldiğin입니다.',
'Tatilde ___ zaman çok yürürüz. (biz, 있다)|olduğumuz|olduğum|olan|우리는 휴가 중일 때 많이 걷습니다.|biz에 맞는 소유형 olduğumuz zaman입니다.'
]);
add('B2','할 수 있다면','-(y)Abil + -sA + 인칭','능력·가능을 전제로 가정을 만들 때 가능 접사 뒤에 조건 접사를 붙입니다. gelebilsem은 내가 올 수 있다면이라는 뜻입니다. 일반적인 열린 조건 gelebilirsem과 가정적인 바람 gelebilsem의 차이도 문맥으로 읽습니다.','먼저 가능 어간을 만듭니다. gel-ebil-, yap-abil-처럼 됩니다.|조건 -se/-sa를 붙이고 주체를 표시합니다. gelebil-se-m은 내가 가능하다면입니다.|현재 여건과 다른 바람·가정은 결과절의 -rdı 같은 표현과 자주 어울립니다.','gelebilirsem은 가능하면이라는 열린 조건으로도 흔합니다. 모든 조건을 과거 반사실로 해석하지 마세요.',[
'Daha erken gel___, sana yardım ederdim. (ben, 올 수 있다면)|ebilsem|ebilsen|ebilsek|더 일찍 올 수 있다면 너를 도와줄 텐데.|가능 -ebil, 조건 -se, 1인칭 -m입니다.',
'Bu sorunu çöz___, çok rahatlayacağız. (biz, 해결할 수 있다면)|ebilirsek|ebilirim|ebiliriz|우리가 이 문제를 해결할 수 있다면 한결 편해질 것입니다.|열린 미래 조건에 biz를 표시하는 çözebilirsek입니다.',
'Biraz dinlen___, kendini daha iyi hissederdin. (sen)|ebilsen|ebilsem|ebilsek|조금 쉴 수 있다면 기분이 더 나을 텐데.|조건의 주체가 너이므로 dinlenebilsen입니다.'
]);
old('C1',0,'말하거나 아는 내용 전체를 하나의 명사절로 묶습니다. 주체는 속격으로 제시할 수 있습니다.|현재·과거의 내용은 -DIK, 앞으로의 내용은 -AcAK 계열을 검토하고 소유 접사를 붙입니다.|본동사가 요구하는 격을 마지막에 붙입니다. bilmek의 특정 목적어라면 geldiği-n-i처럼 대격이 필요합니다.',[
'Onun yarın ___ biliyorum. (오다)|geleceğini|geleceği|gelecek|저는 그가 내일 올 것을 알고 있습니다.|미래 명사화, 3인칭 소유, 대격을 포함한 geleceğini입니다.',
'Senin haklı ___ düşünüyorum.|olduğunu|olduğun|oldun|나는 네가 옳다고 생각해.|ol-duğ-un-u에서 -un은 너의 주체, -u는 대격입니다.',
'Bizim burada ___ bilmiyordu. (살다)|yaşadığımızı|yaşadığımız|yaşıyoruz|그 사람은 우리가 여기 사는 것을 몰랐습니다.|명사절 주체 biz와 대격을 모두 표시하는 yaşadığımızı입니다.'
]);
old('C1',1,'상황적 강제는 -mak zorunda olmak으로, 일반적인 필요는 -ması gerek 등으로 표현할 수 있습니다.|zorunda 뒤의 인칭은 의무를 지닌 사람과 맞춥니다. zorundayız는 우리가 해야만 한다는 뜻입니다.|의무 자체를 부정하려면 zorunda değil을 씁니다. 행동을 금지하는 -mamalı와 분리해 해석합니다.',[
'Bu işi bugün bitirmek ___ . (ben)|zorundayım|zorundasın|zorundayız|저는 이 일을 오늘 끝내야만 합니다.|의무를 지닌 내가 zorundayım의 -yım에 표시됩니다.',
'Hemen git___ gerek. (ben)|mem|men|mesi|저는 곧 가야 합니다.|git-me-m은 내가 가는 것으로, 필요의 주체를 소유 접사 -m으로 표시합니다.',
'İstersen kalabilirsin; gitmek zorunda ___ .|değilsin|değilim|değiliz|원하면 머물러도 돼. 갈 의무는 없어.|상대의 의무를 부정하므로 zorunda değilsin입니다.'
]);
old('C1',2,'앞 사실이 보통 어떤 결과를 기대하게 하는지 생각한 뒤, 실제 반대 결과를 연결합니다.|-masına rağmen은 명사화·소유·방향격과 rağmen이 결합한 형태입니다.|-dığı hâlde는 -DIK과 소유형 뒤 hâlde를 놓습니다. 두 구조의 접사를 섞지 않습니다.',[
'Çok çalış___ rağmen sınavı geçemedi.|masına|tığı|mak|많이 공부했음에도 시험에 합격하지 못했습니다.|rağmen 앞에는 çalış-ma-sı-na처럼 방향격을 포함한 명사화가 필요합니다.',
'Yorgun ol___ hâlde çalışmaya devam ettim. (ben)|duğum|mama|mak|저는 피곤한데도 계속 일했습니다.|hâlde 앞에서 나의 상태는 olduğum으로 표현합니다.',
'Yağmur yağ___ rağmen yürüyüşe çıktık.|masına|dığı|mak|비가 오는데도 우리는 산책을 나갔습니다.|명사화 yağ-ma-sı에 방향격 -na를 붙여 rağmen과 연결합니다.'
]);
old('C1',3,'기준 시점을 과거로 놓고 그때 예정한 미래 행동을 생각합니다.|미래형 -acak/-ecek 뒤에 과거 연결형 -tı/-ti와 인칭을 붙입니다.|실제 실현 여부는 뒤 문맥에서 확인합니다. ama절이 계획 취소를 밝힐 수 있습니다.',[
'Seni dün ara___ ama çok yoğundum. (ben)|yacaktım|yacağım|yacağımış|어제 너에게 전화하려고 했지만 너무 바빴어.|과거 시점의 내 계획은 arayacaktım입니다.',
'Biz erken çık___ fakat otobüs gecikti.|acaktık|acağız|acaktın|우리는 일찍 출발할 예정이었지만 버스가 늦었습니다.|과거 예정에 biz의 -k를 붙인 çıkacaktık입니다.',
'Toplantı saat üçte başla___; dörtte başladı.|yacaktı|yacağım|yorsun|회의는 세 시에 시작할 예정이었으나 네 시에 시작했습니다.|과거에 정해진 시작 시각은 başlayacaktı로 나타냅니다.'
]);
add('C1','사역과 수동을 겹치기','어간 + 사역 + 수동 + 시제','누군가에게 하도록 맡긴 일이 이루어졌다는 점에 집중하면 사역과 수동을 함께 사용할 수 있습니다. yaptırıldı는 누군가에게 시켜서 만들어지거나 이루어졌다는 의미를 가집니다. 접사 순서가 행위자와 대상의 역할을 바꿉니다.','먼저 기본 동사와 사역형을 찾습니다. yapmak→yaptırmak입니다.|사역 어간 뒤에 수동을 붙입니다. yaptır-ıl-이 됩니다.|시제와 인칭은 그 뒤에 둡니다. yaptırıldı에서 과거 -dı가 마지막에 옵니다.','yapıldı는 만들어졌다, yaptırıldı는 시켜서 만들었다는 사역의 의미를 포함합니다. 실제 행위자 구성은 문맥을 함께 봅니다.',[
'Belediye tarafından yeni bir okul ___ . (짓도록 맡겨짐)|yaptırıldı|yaptı|yaptım|지자체가 시공을 맡겨 새 학교가 지어졌습니다.|yap-tır-ıl-dı에 사역과 수동, 과거가 순서대로 나타납니다.',
'Müdürün isteğiyle bütün belgeler yeniden ___ . (작성하도록 맡겨짐)|yazdırıldı|yazdı|yazdım|책임자의 요청으로 모든 서류가 다시 작성되도록 조치되었습니다.|yaz-dır-ıl-dı는 작성하게 한 일이 수동으로 제시된 형태입니다.',
'Güvenlik nedeniyle ziyaretçiler kapıda ___ . (기다리게 됨)|bekletildi|bekledi|bekledim|보안 때문에 방문객들은 문에서 기다리게 되었습니다.|bekle-t-il-di에 기다리게 함과 수동이 결합합니다.'
]);
add('C1','전해 들은 미래 계획','-(y)AcAkmIş','누군가의 미래 계획이나 예측을 전해 들은 정보로 제시할 때 미래형 뒤에 -mış 계열을 붙입니다. gelecekmiş는 올 예정이라고 한다는 뜻입니다. 과거 완료라는 뜻의 gelmiş와 시점이 다릅니다.','미래 어간을 먼저 만듭니다. gel-ecek, yap-acak처럼 됩니다.|그 뒤 전언형 -mış/-miş를 붙입니다. gelecekmiş, yapacakmış가 됩니다.|주체에 맞는 인칭을 끝에 놓을 수 있습니다. gelecekmişsin은 네가 올 예정이라고 들었다는 뜻입니다.','전언 접사가 있다고 실제 계획이 확실히 실행된 것은 아닙니다. 정보의 출처와 미래 시점을 분리해 해석하세요.',[
'Duyduğuma göre yarın kar ___ . (오다)|yağacakmış|yağmış|yağıyorum|들은 바에 따르면 내일 눈이 올 거라고 합니다.|미래 yağacak에 전언 -mış를 붙입니다.',
'Yeni öğretmen gelecek hafta başla___ .|yacakmış|mış|yordum|새 선생님은 다음 주에 시작한다고 합니다.|미래 계획을 전언하는 başlayacakmış입니다.',
'Sen de toplantıya katıl___, doğru mu?|acakmışsın|mışım|acaktım|너도 회의에 참가할 예정이라던데 맞니?|미래와 전언 뒤에 상대의 인칭 -sın을 붙입니다.'
]);
add('C1','과거보다 앞선 완료','-mIştI','과거 기준 시점에 이미 완료된 일을 나타내는 데 -mıştı 계열을 쓸 수 있습니다. geldiğimde gitmişti는 내가 왔을 때 이미 떠난 상태였다는 뜻입니다. 단순한 사건 나열과 달리 앞선 완료를 배경으로 만듭니다.','뒤 사건이나 관찰 시점을 과거에 놓습니다.|그보다 먼저 끝난 행동에 -mış/-miş/-muş/-müş와 과거 -tı/-ti/-tu/-tü를 붙입니다.|인칭은 끝에 표시합니다. okumuştum은 내가 이미 읽었었다는 뜻입니다.','-mıştı의 -mış를 항상 전해 들었다로 번역하지 않습니다. 이 구성에서는 과거 이전 완료가 중심일 수 있습니다.',[
'Ben geldiğimde herkes çoktan ___ . (떠나다)|gitmişti|gidecek|gidiyorum|제가 왔을 때 모두 이미 떠나 있었습니다.|도착보다 앞선 완료를 gitmişti로 나타냅니다.',
'Bu filmi daha önce ___ . (ben)|izlemiştim|izlemiştin|izlemiştik|저는 이 영화를 전에 본 적이 있었습니다.|앞선 경험을 나의 인칭으로 표시한 izlemiştim입니다.',
'Ders başladığında ödevimizi ___ . (biz, 끝내다)|bitirmiştik|bitirmiştim|bitirmiştin|수업이 시작되었을 때 우리는 숙제를 끝낸 상태였습니다.|과거 기준 이전의 완료와 biz를 나타내는 bitirmiştik입니다.'
]);
add('C1','진행 중인 일을 전해 듣기','-(I)yormuş','현재나 과거의 진행 상황을 전해 들었거나 새로 알게 된 정보로 제시할 때 -yormuş를 씁니다. çalışıyormuş는 일하고 있다고 한다·일하고 있더라는 뜻입니다. 정확한 시간은 주변 표현과 함께 읽습니다.','진행형 어간을 만듭니다. çalış-ıyor, oku-yor처럼 됩니다.|그 뒤 -muş를 붙여 정보의 전언·발견 성격을 덧붙입니다.|필요한 인칭은 마지막에 옵니다. okuyormuşsun은 네가 읽고 있다고 들었다는 뜻입니다.','çalışıyordu는 과거의 진행을 직접 서술하고, çalışıyormuş는 전언·발견 태도를 더할 수 있습니다.',[
'Duyduğuma göre kardeşin hastanede çalış___ .|ıyormuş|ıyordum|ıyorsun|들은 바에 따르면 네 형제는 병원에서 일하고 있다고 합니다.|진행형에 전언을 덧붙인 çalışıyormuş입니다.',
'Meğer sen de bu kitabı oku___ .|yormuşsun|yormuşum|yormuşuz|알고 보니 너도 이 책을 읽고 있었구나.|새로 알게 된 상대의 진행 상황이므로 okuyormuşsun입니다.',
'Komşumuz her sabah parkta yürü___ . (전해 들음)|yormuş|yorum|yorsun|이웃이 매일 아침 공원에서 걷는다고 합니다.|전언형 진행은 yürü-yormuş입니다.'
]);
add('C1','이것보다는 저것','-mAktAnsA','한 행동보다 다른 행동을 택하는 비교·선호를 나타냅니다. beklemektense yürümek은 기다리기보다는 걷기라는 뜻입니다. 단순히 두 선택지를 나열하는 대신 첫 선택을 상대적으로 덜 선호한다는 관계를 드러냅니다.','덜 선호하는 행동을 부정사로 만듭니다.|-maktan/-mekten 뒤에 -sa/-se를 이어 beklemektense처럼 만듭니다.|선호하는 행동이나 판단을 뒤 절에 제시합니다. yürümeyi tercih ederim처럼 연결할 수 있습니다.','-maktan hoşlanmak의 탈격 보어와 비교하세요. -maktansa는 다른 대안을 앞세우는 비교 관계입니다.',[
'Otobüs bekle___ yürümeyi tercih ederim.|mektense|meden|dikçe|저는 버스를 기다리기보다는 걷는 것을 선호합니다.|덜 선호하는 행동을 beklemektense로 연결합니다.',
'Evde otur___ dışarı çıkalım.|maktansa|madan|dukça|집에 앉아 있기보다는 밖으로 나가자.|앉아 있는 선택보다 외출을 제안하므로 oturmaktansa입니다.',
'Yanlış cevap ver___ susmayı seçti.|mektense|meden|dikçe|그 사람은 틀린 답을 하기보다는 침묵을 택했습니다.|vermektense가 두 행동 사이의 선호를 표시합니다.'
]);
add('C1','과거에 틀림없이 했을 것','-mIş olmalı','과거에 어떤 일이 일어났을 것이라고 추론할 때 완료형 뒤 olmalı를 쓸 수 있습니다. gitmiş olmalı는 갔음에 틀림없다는 추론입니다. 행동해야 한다는 의무의 -malı와 구분해서 읽어야 합니다.','근거를 보고 추론하는 과거 사건을 -mış 계열로 만듭니다.|olmalı를 더해 그 사건이 일어났을 것이라는 판단을 나타냅니다.|근거와 함께 제시하면 의미가 선명합니다. Işıklar kapalı; gitmiş olmalı처럼 씁니다.','gitmeli는 가야 한다, gitmiş olmalı는 이미 갔을 것이라는 뜻입니다. 완료형이 추론 대상의 시간을 바꿉니다.',[
'Işıklar kapalı; herkes git___ olmalı.|miş|mek|meli|불이 꺼져 있으니 모두 떠났을 것입니다.|과거에 떠났다고 추론하므로 gitmiş olmalı입니다.',
'Çok yorgun görünüyor; az uyu___ olmalı.|muş|mak|malı|매우 피곤해 보이니 잠을 적게 잤을 것입니다.|uyu-의 u에 맞는 완료형 uyumuş에 olmalı를 연결합니다.',
'Soruyu hemen çözdü; konuyu iyi anla___ olmalı.|mış|mak|malı|문제를 바로 풀었으니 내용을 잘 이해했을 것입니다.|앞선 이해를 추론하는 anlamış olmalı입니다.'
]);
add('C1','명사로 양보 조건 제시하기','명사 + -(y)A rağmen','비, 어려움, 반대 의견 같은 명사 뒤에 방향격과 rağmen을 붙여 ~에도 불구하고를 표현합니다. 절을 명사화하는 -masına rağmen보다 간결하게 조건을 제시할 수 있습니다. 양보의 사실과 결과 사이의 기대 어긋남을 읽으세요.','인정할 조건을 명사로 정합니다. yağmur, zorluklar 등이 가능합니다.|명사에 방향격을 붙입니다. yağmur-a, zorluklar-a가 됩니다.|rağmen 뒤에 실제 결과를 둡니다. Yağmura rağmen çıktık처럼 씁니다.','rağmen은 기본적으로 방향격과 결합합니다. yağmurdan rağmen이나 yağmur rağmen으로 격을 바꾸지 않습니다.',[
'Yağmur___ rağmen maç devam etti.|a|dan|da|비에도 불구하고 경기는 계속되었습니다.|rağmen이 요구하는 방향격 -a입니다.',
'Bütün zorluklar___ rağmen vazgeçmedik.|a|dan|da|온갖 어려움에도 불구하고 우리는 포기하지 않았습니다.|zorluklara rağmen은 어려움들에도 불구하고입니다.',
'Bu uyarı___ rağmen yola çıktı.|ya|dan|da|이 경고에도 불구하고 그 사람은 길을 나섰습니다.|모음으로 끝난 uyarı에 연결 y와 방향격 a를 붙입니다.'
]);
add('C1','조건이 유지되는 동안','-DIK + 소유 + sürece','어떤 상태나 행동이 계속되는 한 다른 일이 가능하거나 유지됨을 나타냅니다. çalıştığın sürece는 네가 노력하는 한이라는 뜻입니다. 단순한 시간의 흐름과 조건의 지속이 함께 표현될 수 있습니다.','지속되어야 할 조건을 -DIK과 소유 접사로 만듭니다.|그 뒤 sürece를 놓습니다. istediğin sürece는 네가 원하는 한입니다.|결과절에는 그 조건 아래의 허용·예측 등을 둡니다. 성공, 지원, 체류 허용 등에 사용할 수 있습니다.','-dığı zaman은 특정 때, -dığı sürece는 조건이 계속 유지되는 범위에 초점이 있습니다.',[
'Düzenli çalış___ sürece ilerlersin. (sen)|tığın|tığım|an|네가 꾸준히 공부하는 한 발전할 거야.|조건의 주체 sen을 나타내는 çalıştığın sürece입니다.',
'Sen iste___ sürece burada kalabilirsin.|diğin|diğim|yen|네가 원하는 한 여기 머물러도 돼.|iste-diğ-in sürece가 허용이 유지되는 조건을 나타냅니다.',
'Birlikte çalış___ sürece bu işi bitirebiliriz. (biz)|tığımız|tığım|an|우리가 함께 일하는 한 이 일을 끝낼 수 있습니다.|biz의 소유 접사를 포함한 çalıştığımız입니다.'
]);
old('C2',0,'공식 문서의 확정적 설명인지, 일상 대화의 추정인지 문맥을 먼저 확인합니다.|명사 술어에는 -dır 계열, 완료 결과에는 -mıştır 계열을 쓸 수 있습니다.|무성 자음 뒤에서는 t가 되며 모음 조화도 적용됩니다. yasaktır, açıklanmıştır처럼 익힙니다.',[
'Sonuçlar aşağıdaki tabloda gösteril___ . (격식 있는 완료)|miştir|mek|meli|결과는 아래 표에 제시되어 있습니다.|수동 완료를 격식 있게 서술하는 gösterilmiştir입니다.',
'Bu alanda fotoğraf çekmek yasak___ .|tır|dır|dir|이 구역에서는 사진 촬영이 금지되어 있습니다.|yasak의 a와 무성음 k에 맞는 -tır입니다.',
'Başvurular kurul tarafından değerlendiril___ . (격식 있는 완료)|miştir|mek|meli|신청서들은 위원회에서 검토되었습니다.|평가된 결과를 수동 완료 평가형 değerlendirilmiştir로 서술합니다.'
]);
old('C2',1,'실제 과거와 다른 조건을 상상하는지 확인합니다.|동사 어간에 -saydı/-seydi와 인칭을 붙입니다. bil-seydi-m은 내가 알았더라면입니다.|결과절에는 -rdı 등 실현되지 않은 결과를 문맥에 맞게 연결합니다.',[
'Adresini bil___, sana uğrardım. (ben)|seydim|seydin|seydik|네 주소를 알았더라면 들렀을 텐데.|과거의 나의 반사실 조건은 bilseydim입니다.',
'Daha erken çık___, treni kaçırmazdık. (biz)|saydık|saydım|saydın|우리가 더 일찍 출발했더라면 기차를 놓치지 않았을 텐데.|çık-에 과거 조건과 1인칭 복수를 붙인 çıksaydık입니다.',
'Beni dinle___, bu hatayı yapmazdın. (sen)|seydin|seydim|seydik|네가 내 말을 들었더라면 이 실수를 하지 않았을 텐데.|상대의 실현되지 않은 과거 조건은 dinleseydin입니다.'
]);
old('C2',2,'원인을 사실이나 사건의 명사화로 제시합니다. 문서에서 이유를 짧게 연결할 때 유용합니다.|-DIK+소유+탈격은 olduğundan처럼 됩니다. -mA+소유 뒤 nedeniyle도 원인을 나타냅니다.|어떤 사정이 어떤 결과를 만들었는지 확인하고 목적이나 단순한 시간 순서로 오해하지 않도록 읽습니다.',[
'Hava çok soğuk ol___ etkinlik iptal edildi.|duğundan|mak için|masına rağmen|날씨가 매우 추워서 행사가 취소되었습니다.|olduğundan은 상태를 명사화한 뒤 탈격으로 원인을 연결합니다.',
'Ulaşımın aksa___ nedeniyle toplantı ertelendi.|ması|mak|dığına|교통에 차질이 생겨 회의가 연기되었습니다.|aksama의 3인칭 소유형 aksaması를 nedeniyle와 연결합니다.',
'Yeterli veri bulunma___ sonuç açıklanmadı.|dığından|k için|sına rağmen|충분한 자료가 없어 결과가 발표되지 않았습니다.|bulun-ma-dığ-ı-ndan에 부정, 명사화, 소유, 탈격이 결합해 원인을 표시합니다.'
]);
old('C2',3,'앞 문장의 장점이나 사실을 인정한 뒤 다른 측면을 제시할지 판단합니다.|동사절은 -makla birlikte, 독립 문장 사이에서는 bununla birlikte 같은 연결 표현을 쓸 수 있습니다.|뒤 절이 반대 기대인지 추가 설명인지 확인해 한국어를 하지만·그와 함께 등으로 조절합니다.',[
'Bu yöntem hızlı ol___ birlikte her durumda uygun değildir.|makla|mak için|duğundan|이 방법은 빠르기는 하지만 모든 상황에 적합하지는 않습니다.|olmakla birlikte는 장점을 인정하면서 적용 한계를 연결합니다.',
'Maliyet düş___ birlikte kalite korunmuştur.|mekle|mek için|tüğünden|비용이 줄기는 했지만 품질은 유지되었습니다.|düşmekle birlikte로 비용 감소와 품질 유지의 양보 관계를 나타냅니다.',
'Proje yararlıdır. Bununla ___, bazı riskler taşımaktadır.|birlikte|sonra|önce|사업은 유용합니다. 그렇지만 몇 가지 위험도 있습니다.|문장 사이의 전환 표현 bununla birlikte입니다.'
]);
add('C2','격식 있는 ~하지 않고','-mAksIzIn','공식 문서나 논설에서 어떤 절차·조건 없이 행동했음을 -maksızın/-meksizin으로 표현할 수 있습니다. 일상적인 -madan/-meden보다 격식 있는 느낌이 강합니다. 행동을 부정한 채 다른 사건에 연결한다는 점은 비슷합니다.','생략되거나 수행되지 않은 행동의 어간을 정합니다.|후설 모음이면 -maksızın, 전설 모음이면 -meksizin을 붙입니다.|뒤에 실제 수행한 행동을 둡니다. izin almaksızın은 허락을 받지 않고라는 뜻입니다.','görmeksizin처럼 쓰며 시제·인칭을 중간에 삽입하지 않습니다. 일상 대화에서 무조건 더 고급스럽게 들리는 표현은 아닙니다.',[
'İzin al___ belgeyi yayımladı.|maksızın|madan önce|dıktan sonra|그 사람은 허락을 받지 않고 문서를 공개했습니다.|격식 있는 부정 연결 almaksızın입니다.',
'Hiçbir gerekçe göster___ karar değiştirildi.|meksizin|dikten sonra|ince|아무 근거를 제시하지 않고 결정이 변경되었습니다.|göster-의 전설 모음에 맞는 -meksizin입니다.',
'Taraflara haber ver___ işlem yapıldı.|meksizin|dikten sonra|ince|당사자들에게 알리지 않고 절차가 진행되었습니다.|통보 행위를 하지 않았다는 vermeksizin입니다.'
]);
add('C2','~하기는커녕','-mAk şöyle dursun','기대한 행동은커녕 그보다 기본적인 일도 못 하거나 반대 결과가 나타났다고 강조합니다. 앞의 기대와 뒤의 실제 상황 사이에 큰 간극이 있습니다. 중립적인 선호 비교와 달리 수사적인 대비가 강합니다.','기대되던 행동을 부정사로 만듭니다.|şöyle dursun을 붙여 그 기대를 한쪽에 밀어 둡니다.|뒤에 더 약한 성취의 부정이나 예상과 반대의 사실을 제시합니다.','-maktansa는 선택의 비교입니다. -mak şöyle dursun은 기대가 크게 어긋났다는 강조이므로 서로 바꾸기 어렵습니다.',[
'Koşmak ___, yürümekte bile zorlanıyor.|şöyle dursun|için|üzere|달리기는커녕 걷는 것조차 힘들어합니다.|더 기본적인 걷기도 어렵다는 강한 대비에는 şöyle dursun입니다.',
'Sorunu çözmek ___, daha da büyüttü.|şöyle dursun|için|üzere|문제를 해결하기는커녕 더 키웠습니다.|기대된 해결과 반대 결과를 강조합니다.',
'Dinlenmek ___, bütün gece çalıştık.|şöyle dursun|için|üzere|우리는 쉬기는커녕 밤새 일했습니다.|쉬리라는 기대를 뒤집는 결과를 연결합니다.'
]);
add('C2','한 측면을 잠시 제외하기','-mAk bir yana / 명사 + bir yana','~은 별개로 하고 또는 ~은커녕이라는 담화적 전환에 사용합니다. 맥락에 따라 어떤 요소를 잠시 제쳐 두거나 더 강한 대비를 만듭니다. 이어지는 절이 앞 내용을 부정하는지, 별도 쟁점을 제시하는지 살펴야 합니다.','제쳐 둘 항목은 명사나 부정사로 제시합니다.|bir yana를 붙여 그 항목을 잠시 논의의 중심에서 옮깁니다.|뒤 절에서 핵심 문제나 대비되는 사실을 말합니다. 비용과 시간 같은 다른 평가 축을 분리할 때도 씁니다.','bir yana가 언제나 부정적인 ~는커녕은 아닙니다. 장점을 인정해 두고 다른 문제를 말할 때도 사용합니다.',[
'Maliyeti ___, bu proje çok zaman alacak.|bir yana|için|göre|비용은 별개로 하더라도 이 사업은 시간이 많이 걸릴 것입니다.|비용 항목을 제쳐 두고 시간 문제로 초점을 옮깁니다.',
'Şaka ___, bu konu gerçekten önemli.|bir yana|için|rağmen|농담은 그만하고 이 문제는 정말 중요합니다.|Şaka bir yana는 농담을 제쳐 두고 진지한 화제로 전환하는 표현입니다.',
'Başarısını ___, gösterdiği çaba takdire değer.|bir yana bırakırsak|için|rağmen|그의 성과는 별개로 하더라도 보여 준 노력은 칭찬할 만합니다.|성과를 잠시 제외한다는 bir yana bırakırsak으로 평가 축을 바꿉니다.'
]);
add('C2','문서에서 조건 명시하기','-DIK + 소유 + takdirde','규정, 계약, 안내문에서 어떤 조건이 충족될 경우를 비교적 격식 있게 표현합니다. başvurduğunuz takdirde는 신청하실 경우라는 뜻입니다. 시제처럼 보이는 -DIK이 실제로는 명사화와 주체 표시의 일부입니다.','성립해야 하는 조건을 -DIK과 소유 접사로 만듭니다.|takdirde를 붙여 그 조건에 해당할 경우라는 의미를 만듭니다.|뒤에는 허용·의무·예상 결과를 명확하게 제시합니다. 조건의 범위를 문장 전체에서 확인하세요.','-dığı için은 사실에 근거한 이유입니다. -dığı takdirde는 아직 충족되지 않았을 수도 있는 조건을 말합니다.',[
'Belgeleri zamanında gönder___ takdirde başvurunuz incelenecektir. (siz)|diğiniz|diğim|en|서류를 기한 안에 보내시면 신청서가 검토될 것입니다.|상대 siz의 조건은 gönderdiğiniz takdirde입니다.',
'Gerekli izin alın___ takdirde çalışma başlayabilir.|dığı|mak|an|필요한 허가를 받을 경우 작업을 시작할 수 있습니다.|수동 alın-에 명사화·소유형 -dığı를 붙여 조건을 만듭니다.',
'Kurallara uyul___ takdirde sorun yaşanmaz.|duğu|mak|an|규칙을 준수할 경우 문제가 생기지 않습니다.|수동 uyul-의 마지막 모음 u에 맞는 uyulduğu takdirde입니다.'
]);
add('C2','어느 정도까지 성립하는가','-DIK + 소유 + ölçüde','한 사실의 정도에 비례하거나 그 범위 안에서만 다른 판단이 성립함을 나타냅니다. mümkün olduğu ölçüde는 가능한 범위에서라는 뜻입니다. 과도한 일반화를 피하고 주장의 적용 범위를 한정할 때 유용합니다.','범위의 기준이 되는 상태나 행동을 고릅니다.|-DIK과 소유형 뒤에 ölçüde를 붙입니다. izin verdiği ölçüde는 허용하는 만큼입니다.|결과절의 행동이나 주장이 그 한계 안에 놓이도록 연결합니다.','-dıkça는 반복·변화의 비례에 초점이 있고, -dığı ölçüde는 성립 범위나 정도를 명시하는 데 적합합니다.',[
'Mümkün ___ ölçüde toplu taşıma kullanıyoruz.|olduğu|olmak|olan|우리는 가능한 범위에서 대중교통을 이용합니다.|가능한 정도를 제한하는 mümkün olduğu ölçüde입니다.',
'Veriler izin ver___ ölçüde sonuç çıkarabiliriz.|diği|mek|en|자료가 허용하는 범위에서 결론을 도출할 수 있습니다.|자료가 허용하는 범위를 verdiği ölçüde로 나타냅니다.',
'Kaynaklarımızın yeterli ___ ölçüde destek sağlayacağız.|olduğu|olmak|olan|우리 자원이 충분한 범위에서 지원을 제공하겠습니다.|자원의 충분함이라는 상태를 olduğu ölçüde로 한정합니다.'
]);
add('C2','완료를 인정하면서 유보하기','-mIş olmakla birlikte','어떤 일이 이미 이루어졌다는 점을 인정하면서 한계나 남은 문제를 덧붙입니다. -makla birlikte의 양보 구조에 완료가 결합한 형태입니다. 논문이나 보고서에서 성과와 제한을 함께 서술할 수 있습니다.','이미 끝난 사건을 -mış 계열로 제시합니다.|olmakla birlikte를 이어 완료 사실을 인정하는 양보절을 만듭니다.|뒤 절에서 아직 남은 문제나 예외를 제시해 논리 관계를 분명히 합니다.','tamamlanmış olmakla birlikte는 완료되었다는 사실을 인정합니다. tamamlanmak için처럼 목적을 말하는 표현과 다릅니다.',[
'Çalışma tamamlanmış olmakla ___, bazı sorular açık kalmıştır.|birlikte|sonra|önce|연구가 완료되기는 했지만 몇 가지 질문은 남아 있습니다.|완료 사실을 인정하고 한계를 연결하는 olmakla birlikte입니다.',
'Yeni yöntem denen___ olmakla birlikte henüz yaygınlaşmamıştır.|miş|mek|meli|새 방법을 시험하기는 했지만 아직 널리 보급되지는 않았습니다.|수동 denen- 뒤 완료 -miş를 붙입니다.',
'Sorun kısmen çözül___ olmakla birlikte tamamen ortadan kalkmamıştır.|müş|mek|meli|문제가 일부 해결되었지만 완전히 사라지지는 않았습니다.|çözül-의 ü에 맞는 완료형 çözülmüş입니다.'
]);
add('C2','이미 끝났을 상황을 가정하기','-mIş olsAydI','과거의 특정 시점까지 완료되었을 상황을 실제와 다르게 가정합니다. bitirmiş olsaydık는 우리가 끝냈더라면이라는 뜻입니다. 단순 -saydı보다 완료된 상태를 명시해 시간 관계를 강조할 수 있습니다.','상상하는 완료 사건을 -mış/-miş/-muş/-müş로 만듭니다.|olsaydı에 조건절 주체의 인칭을 붙입니다. olsaydım은 내가 그랬더라면입니다.|결과절에는 이루어지지 않은 과거 결과를 문맥에 맞게 연결합니다.','bitirseydik와 의미가 겹칠 수 있지만 bitirmiş olsaydık는 어느 시점까지 완료한 상태를 더 뚜렷하게 나타냅니다.',[
'İşi daha önce bitirmiş ___, tatile çıkardık. (biz)|olsaydık|olsaydım|olsaydın|우리가 일을 더 일찍 끝냈더라면 휴가를 갔을 텐데요.|완료 가정의 주체 biz에 맞는 olsaydık입니다.',
'Bana haber vermiş ___, seni beklerdim. (sen)|olsaydın|olsaydım|olsaydık|네가 미리 알려 주었더라면 너를 기다렸을 텐데.|완료 조건의 상대 주체를 olsaydın으로 나타냅니다.',
'Bu kitabı okumuş ___, konuyu daha iyi anlardım. (ben)|olsaydım|olsaydın|olsaydık|내가 이 책을 읽었더라면 내용을 더 잘 이해했을 텐데.|나의 완료 가정이므로 olsaydım입니다.'
]);
add('C2','완료된 상태를 격식 있게 제시하기','-mIş bulunmak','행동이 이미 완료되어 지금 어떤 상태에 이르렀음을 나타내는 격식 있는 표현입니다. tamamlamış bulunuyoruz는 완료한 상태임을 알리는 말입니다. 경우에 따라 이미 벌어진 행동을 강조하는 뉘앙스가 있으므로 단순 완료를 무조건 대체하지는 않습니다.','완료한 행동에 -mış 계열을 붙입니다.|bulunmak을 현재·과거 등 필요한 시제와 인칭으로 활용합니다.|공식 발표에서는 완료 결과가 현재의 절차에 어떤 의미를 갖는지 함께 밝히면 자연스럽습니다.','görmüş bulundum처럼 이미 해 버렸다는 뉘앙스도 가능합니다. 모든 용례가 기관의 공식 발표라는 뜻은 아닙니다.',[
'İncelemeyi tamamlamış ___ . (biz)|bulunuyoruz|bulunuyorum|bulunuyorsun|저희는 검토를 완료한 상태입니다.|완료 결과와 우리라는 주체를 bulunuyoruz로 제시합니다.',
'Bu konuda gerekli açıklamayı yapmış ___ . (ben)|bulunuyorum|bulunuyorsun|bulunuyoruz|저는 이 사안에 필요한 설명을 마친 상태입니다.|나의 현재 완료 상태는 yapmış bulunuyorum입니다.',
'Kurumumuz bütün başvuruları değerlendirmiş ___ .|bulunmaktadır|bulunmaktayım|bulunmaktayız|우리 기관은 모든 신청서의 검토를 완료한 상태입니다.|기관이라는 3인칭 주어에 맞춘 격식 서술 bulunmaktadır입니다.'
]);
})();
