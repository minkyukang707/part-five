'use strict';
// Original beginner exercises. The linked sources inform the curriculum and grammar notes.
const LANGUAGE_COURSES = (() => {
  const japanese = [
    ['copula','명사 문장과 です',1,'명사 뒤의 です는 현재의 신분·성질을 정중하게 말합니다. でした는 과거, ではありません은 부정입니다.',[
      ['私は学生____。','です|でした|ではありません|ではありませんでした','저는 학생입니다.','わたしは がくせいです。'],
      ['これは私の本____。','です|でした|ではありません|ではありませんでした','이것은 제 책입니다.','これは わたしの ほんです。'],
      ['姉は医者____。','です|でした|ではありません|ではありませんでした','언니는 의사입니다.','あねは いしゃです。'],
      ['今日は月曜日____。','です|でした|ではありません|ではありませんでした','오늘은 월요일입니다.','きょうは げつようびです。']
    ]],
    ['possession','소유·소속의 の',1,'の는 앞 명사와 뒤 명사를 연결합니다. 私の本은 ‘나의 책’입니다.',[
      ['これは私____かばんです。','の|を|へ|で','이것은 제 가방입니다.','これは わたしの かばんです。'],
      ['あれは学校____図書館です。','の|を|へ|で','저것은 학교 도서관입니다.','あれは がっこうの としょかんです。'],
      ['これは兄____自転車です。','の|を|へ|で','이것은 오빠의 자전거입니다.','これは あにの じてんしゃです。'],
      ['日本語____先生は親切です。','の|を|へ|で','일본어 선생님은 친절합니다.','にほんごの せんせいは しんせつです。']
    ]],
    ['topic','화제를 나타내는 は',1,'は는 설명할 화제를 표시하며 조사일 때 ‘와’로 읽습니다. 아래 문장은 ‘~은/는’으로 소개하는 기본 문장입니다.',[
      ['私____会社員です。','は|を|へ|で','저는 회사원입니다.','わたしは かいしゃいんです。'],
      ['この店____静かです。','は|を|へ|で','이 가게는 조용합니다.','この みせは しずかです。'],
      ['弟____十歳です。','は|を|へ|で','남동생은 열 살입니다.','おとうとは じゅっさいです。'],
      ['その映画____面白いです。','は|を|へ|で','그 영화는 재미있습니다.','その えいがは おもしろいです。']
    ]],
    ['object','목적어를 나타내는 を',2,'を는 동작의 직접적인 대상을 표시하며 ‘오’로 읽습니다. 읽는 것, 마시는 것, 사는 것 앞의 명사를 확인하세요.',[
      ['毎朝、新聞____読みます。','を|へ|から|と','매일 아침 신문을 읽습니다.','まいあさ、しんぶんを よみます。'],
      ['水____飲みます。','を|へ|から|と','물을 마십니다.','みずを のみます。'],
      ['駅で切符____買います。','を|へ|から|と','역에서 표를 삽니다.','えきで きっぷを かいます。'],
      ['夜、音楽____聞きます。','を|へ|から|と','밤에 음악을 듣습니다.','よる、おんがくを ききます。']
    ]],
    ['place','동작의 장소 で',2,'で는 어떤 행동이 이루어지는 장소를 표시합니다. 학교에서 공부한다면 学校で勉強します라고 합니다.',[
      ['図書館____本を読みます。','で|を|へ|から','도서관에서 책을 읽습니다.','としょかんで ほんを よみます。'],
      ['家____日本語を勉強します。','で|を|へ|から','집에서 일본어를 공부합니다.','いえで にほんごを べんきょうします。'],
      ['公園____友達と話します。','で|を|へ|から','공원에서 친구와 이야기합니다.','こうえんで ともだちと はなします。'],
      ['食堂____昼ご飯を食べます。','で|を|へ|から','식당에서 점심을 먹습니다.','しょくどうで ひるごはんを たべます。']
    ]],
    ['destination','시간·도착점의 に',3,'に는 특정 시각이나 도착점을 나타낼 수 있습니다. 이 문제에서는 한국어의 ‘~에’에 해당하는 위치를 찾습니다.',[
      ['毎朝、七時____起きます。','に|を|で|と','매일 아침 일곱 시에 일어납니다.','まいあさ、しちじに おきます。'],
      ['明日、学校____行きます。','に|を|で|と','내일 학교에 갑니다.','あした、がっこうに いきます。'],
      ['午後三時____会います。','に|を|で|と','오후 세 시에 만납니다.','ごご さんじに あいます。'],
      ['夕方、家____帰ります。','に|を|で|と','저녁 무렵 집에 돌아갑니다.','ゆうがた、いえに かえります。']
    ]],
    ['existence','사물과 생물의 존재',3,'사물·식물의 존재에는 あります, 사람·동물의 존재에는 います를 씁니다.',[
      ['机の上に本が____。','あります|います|読みます|食べます','책상 위에 책이 있습니다.','つくえの うえに ほんが あります。'],
      ['庭に猫が____。','います|あります|読みます|買います','정원에 고양이가 있습니다.','にわに ねこが います。'],
      ['部屋に先生が____。','います|あります|飲みます|買います','방에 선생님이 계십니다.','へやに せんせいが います。'],
      ['駅の近くに公園が____。','あります|います|聞きます|飲みます','역 근처에 공원이 있습니다.','えきの ちかくに こうえんが あります。']
    ]],
    ['past','정중한 과거형 ました',3,'ます형의 과거 긍정은 ました입니다. ませんでした는 과거 부정이고, ましょう는 제안입니다.',[
      ['昨日、パンを____。','食べました|食べませんでした|食べましょう|食べません','어제 빵을 먹었습니다.','きのう、パンを たべました。'],
      ['先週、映画を____。','見ました|見ませんでした|見ましょう|見ません','지난주에 영화를 봤습니다.','せんしゅう、えいがを みました。'],
      ['昨日、手紙を____。','書きました|書きませんでした|書きましょう|書きません','어제 편지를 썼습니다.','きのう、てがみを かきました。'],
      ['今朝、駅まで____。','歩きました|歩きませんでした|歩きましょう|歩きません','오늘 아침 역까지 걸었습니다.','けさ、えきまで あるきました。']
    ]],
    ['adjective-negative','い형용사의 현재 부정',4,'い형용사의 마지막 い를 くない로 바꾸면 현재 부정입니다. 高い는 高くないです가 됩니다.',[
      ['このかばんは____。','高くないです|高いです|高かったです|高くなかったです','이 가방은 비싸지 않습니다.','この かばんは たかくないです。'],
      ['今日は____。','寒くないです|寒いです|寒かったです|寒くなかったです','오늘은 춥지 않습니다.','きょうは さむくないです。'],
      ['この問題は____。','難しくないです|難しいです|難しかったです|難しくなかったです','이 문제는 어렵지 않습니다.','この もんだいは むずかしくないです。'],
      ['その建物は____。','古くないです|古いです|古かったです|古くなかったです','그 건물은 오래되지 않았습니다.','その たてものは ふるくないです。']
    ]],
    ['request','て형과 부탁',4,'동사의 て형 뒤에 ください를 붙여 정중하게 부탁합니다. 동사 종류에 따라 て형의 모양이 달라집니다.',[
      ['窓を____ください。','開けて|開ける|開けた|開けない','창문을 열어 주세요.','まどを あけて ください。'],
      ['名前を____ください。','書いて|書く|書いた|書かない','이름을 써 주세요.','なまえを かいて ください。'],
      ['少し____ください。','待って|待つ|待った|待たない','조금 기다려 주세요.','すこし まって ください。'],
      ['この本を____ください。','読んで|読む|読んだ|読まない','이 책을 읽어 주세요.','この ほんを よんで ください。']
    ]],
    ['wish','희망을 나타내는 たい',5,'동사 ます형에서 ます를 빼고 たい를 붙이면 ‘~하고 싶다’가 됩니다. たくない는 원하지 않는다는 뜻입니다.',[
      ['来年、日本に____です。','行きたい|行きたくない|行きたかった|行きたくなかった','내년에 일본에 가고 싶습니다.','らいねん、にほんに いきたいです。'],
      ['今、水を____です。','飲みたい|飲みたくない|飲みたかった|飲みたくなかった','지금 물을 마시고 싶습니다.','いま、みずを のみたいです。'],
      ['週末、友達に____です。','会いたい|会いたくない|会いたかった|会いたくなかった','주말에 친구를 만나고 싶습니다.','しゅうまつ、ともだちに あいたいです。'],
      ['今夜、この映画を____です。','見たい|見たくない|見たかった|見たくなかった','오늘 밤 이 영화를 보고 싶습니다.','こんや、この えいがを みたいです。']
    ]],
    ['reason','이유를 연결하는 から',5,'이유를 먼저 말하고 から로 뒤의 결과·판단에 연결합니다. ‘~하기 때문에’라는 뜻입니다.',[
      ['雨が降っています____、家にいます。','から|まで|だけ|より','비가 오고 있기 때문에 집에 있습니다.','あめが ふっていますから、いえに います。'],
      ['明日は休みです____、ゆっくり寝ます。','から|まで|だけ|より','내일은 쉬는 날이기 때문에 푹 잡니다.','あしたは やすみですから、ゆっくり ねます。'],
      ['この本は面白いです____、友達に勧めます。','から|まで|だけ|より','이 책은 재미있기 때문에 친구에게 추천합니다.','この ほんは おもしろいですから、ともだちに すすめます。'],
      ['駅が近いです____、歩いて行きます。','から|まで|だけ|より','역이 가깝기 때문에 걸어서 갑니다.','えきが ちかいですから、あるいて いきます。']
    ]]
  ];
  const spanish = [
    ['ser','ser와 신분·출신',1,'ser는 신분이나 출신을 말할 때 씁니다. 현재형은 yo soy, tú eres, él/ella es, nosotros somos입니다.',[
      ['Yo ____ estudiante.','soy|eres|es|somos','나는 학생입니다.'],
      ['Tú ____ profesor.','eres|soy|es|somos','너는 선생님입니다.'],
      ['Ella ____ de Corea.','es|soy|eres|somos','그녀는 한국 출신입니다.'],
      ['Nosotros ____ estudiantes.','somos|soy|eres|es','우리는 학생입니다.']
    ]],
    ['article','명사의 성과 관사',1,'남성 단수 명사에는 un, 여성 단수에는 una를 씁니다. 복수는 각각 unos와 unas입니다.',[
      ['Tengo ____ libro.','un|una|unos|unas','나는 책 한 권을 가지고 있습니다.'],
      ['Hay ____ mesa aquí.','una|un|unos|unas','여기에 탁자 하나가 있습니다.'],
      ['Necesito ____ cuaderno.','un|una|unos|unas','나는 공책 한 권이 필요합니다.'],
      ['Busco ____ casa.','una|un|unos|unas','나는 집 한 채를 찾습니다.']
    ]],
    ['estar','estar와 위치',1,'사람·사물이 있는 위치를 말할 때 estar를 씁니다. estoy, estás, está, estamos는 각각 다른 인칭에 맞습니다.',[
      ['Yo ____ en casa.','estoy|estás|está|estamos','나는 집에 있습니다.'],
      ['Tú ____ en la biblioteca.','estás|estoy|está|estamos','너는 도서관에 있습니다.'],
      ['El libro ____ en la mesa.','está|estoy|estás|estamos','책은 탁자에 있습니다.'],
      ['Nosotros ____ en la escuela.','estamos|estoy|estás|está','우리는 학교에 있습니다.']
    ]],
    ['agreement','형용사의 성·수 일치',2,'형용사는 수식하는 명사의 성과 수에 맞춥니다. -o형 형용사의 여성형은 보통 -a, 복수형은 -s를 붙입니다.',[
      ['Las casas son ____.','blancas|blanca|blanco|blancos','그 집들은 하얗습니다.'],
      ['Los libros son ____.','nuevos|nuevo|nueva|nuevas','그 책들은 새것입니다.'],
      ['La mesa es ____.','pequeña|pequeño|pequeños|pequeñas','그 탁자는 작습니다.'],
      ['El coche es ____.','rojo|roja|rojos|rojas','그 자동차는 빨갛습니다.']
    ]],
    ['ar-present','-ar 동사의 현재형',2,'규칙 -ar 동사는 어간에 yo -o, tú -as, él/ella -a, nosotros -amos를 붙입니다.',[
      ['Yo ____ español.','hablo|hablas|habla|hablamos','나는 스페인어를 합니다.'],
      ['Tú ____ en la biblioteca.','estudias|estudio|estudia|estudiamos','너는 도서관에서 공부합니다.'],
      ['Ella ____ en un hospital.','trabaja|trabajo|trabajas|trabajamos','그녀는 병원에서 일합니다.'],
      ['Nosotros ____ música.','escuchamos|escucho|escuchas|escucha','우리는 음악을 듣습니다.']
    ]],
    ['er-present','-er 동사의 현재형',3,'규칙 -er 동사는 어간에 yo -o, tú -es, él/ella -e, nosotros -emos를 붙입니다.',[
      ['Yo ____ agua.','bebo|bebes|bebe|bebemos','나는 물을 마십니다.'],
      ['Tú ____ una manzana.','comes|como|come|comemos','너는 사과 하나를 먹습니다.'],
      ['Ella ____ español.','aprende|aprendo|aprendes|aprendemos','그녀는 스페인어를 배웁니다.'],
      ['Nosotros ____ fruta.','vendemos|vendo|vendes|vende','우리는 과일을 팝니다.']
    ]],
    ['ir-present','-ir 동사의 현재형',3,'규칙 -ir 동사의 nosotros 현재형은 -imos입니다. 다른 보기의 인칭 어미와 주어를 비교하세요.',[
      ['Yo ____ en Madrid.','vivo|vives|vive|vivimos','나는 마드리드에 삽니다.'],
      ['Tú ____ una carta.','escribes|escribo|escribe|escribimos','너는 편지를 씁니다.'],
      ['Ella ____ la puerta.','abre|abro|abres|abrimos','그녀는 문을 엽니다.'],
      ['Nosotros ____ mensajes.','recibimos|recibo|recibes|recibe','우리는 메시지를 받습니다.']
    ]],
    ['tener','tener와 나이·소유',3,'나이를 말할 때 tener를 씁니다. 현재형은 tengo, tienes, tiene, tenemos이며 ‘가지고 있다’에도 쓰입니다.',[
      ['Yo ____ veinte años.','tengo|tienes|tiene|tenemos','나는 스무 살입니다.'],
      ['Tú ____ un perro.','tienes|tengo|tiene|tenemos','너는 개 한 마리를 기릅니다.'],
      ['Mi hermana ____ quince años.','tiene|tengo|tienes|tenemos','내 여동생은 열다섯 살입니다.'],
      ['Nosotros ____ dos libros.','tenemos|tengo|tienes|tiene','우리는 책 두 권을 가지고 있습니다.']
    ]],
    ['gustar','gustar와 좋아하는 대상',4,'gustar는 좋아하는 대상에 수를 맞춥니다. 단수 명사·동사원형에는 gusta, 복수 명사에는 gustan을 씁니다.',[
      ['Me ____ el café.','gusta|gustan|gustas|gustamos','나는 커피를 좋아합니다.'],
      ['Me ____ los libros.','gustan|gusta|gustas|gustamos','나는 책들을 좋아합니다.'],
      ['A Ana le ____ leer.','gusta|gustan|gustas|gustamos','아나는 읽기를 좋아합니다.'],
      ['Nos ____ las películas.','gustan|gusta|gustas|gustamos','우리는 영화들을 좋아합니다.']
    ]],
    ['near-future','ir a와 가까운 미래',4,'활용한 ir + a + 동사원형으로 계획을 말합니다. voy, vas, va, vamos를 주어에 맞춥니다.',[
      ['Yo ____ a estudiar mañana.','voy|vas|va|vamos','나는 내일 공부할 예정입니다.'],
      ['Tú ____ a viajar el sábado.','vas|voy|va|vamos','너는 토요일에 여행할 예정입니다.'],
      ['Ella ____ a cocinar esta noche.','va|voy|vas|vamos','그녀는 오늘 밤 요리할 예정입니다.'],
      ['Nosotros ____ a visitar el museo.','vamos|voy|vas|va','우리는 박물관을 방문할 예정입니다.']
    ]],
    ['perfect','haber와 완료형',5,'현재완료는 haber의 현재형 + 과거분사입니다. he, has, ha, hemos를 주어에 맞춥니다. 사용 시점은 지역마다 차이가 있습니다.',[
      ['Yo ____ terminado el libro.','he|has|ha|hemos','나는 그 책을 끝냈습니다.'],
      ['Tú ____ preparado la cena.','has|he|ha|hemos','너는 저녁을 준비했습니다.'],
      ['Ella ____ visitado el museo.','ha|he|has|hemos','그녀는 그 박물관을 방문했습니다.'],
      ['Nosotros ____ aprendido mucho.','hemos|he|has|ha','우리는 많이 배웠습니다.']
    ]],
    ['connectors','이유·대조·조건 연결',5,'porque는 이유, pero는 대조, si는 조건, aunque는 ‘~이지만’이라는 양보를 나타냅니다. 한국어 문장의 관계를 확인하세요.',[
      ['Estudio ____ tengo un examen mañana.','porque|pero|si|aunque','나는 내일 시험이 있기 때문에 공부합니다.'],
      ['Quiero salir, ____ está lloviendo.','pero|porque|si|aunque','나는 나가고 싶지만 비가 오고 있습니다.'],
      ['____ hace buen tiempo, iremos al parque.','Si|Porque|Pero|Y','날씨가 좋으면 우리는 공원에 갈 것입니다.'],
      ['____ hace frío, vamos a caminar.','Aunque|Porque|Si|Y','날씨가 춥지만 우리는 걸으러 갈 것입니다.']
    ]]
  ];
  const turkish = [
    ['identity','신분과 인칭 어미',1,'명사 서술어에도 인칭 어미를 붙입니다. ben(나), sen(너), biz(우리), siz(당신·여러분)에 맞춰 형태가 달라집니다.',[
      ['Ben ____.','öğrenciyim|öğrencisin|öğrenciyiz|öğrencisiniz','나는 학생입니다.'],
      ['Sen ____.','öğretmensin|öğretmenim|öğretmeniz|öğretmensiniz','너는 선생님입니다.'],
      ['Biz ____.','doktoruz|doktorum|doktorsun|doktorsunuz','우리는 의사입니다.'],
      ['Siz ____.','mühendissiniz|mühendisim|mühendissin|mühendisiz','여러분은 엔지니어입니다.']
    ]],
    ['plural','복수와 모음 조화',1,'복수 어미는 마지막 모음이 a·ı·o·u이면 -lar, e·i·ö·ü이면 -ler입니다. 숫자 뒤의 명사는 보통 단수형으로 둡니다.',[
      ['Bu ____ yeni.','kitaplar|kitapler|kitapim|kitapi','이 책들은 새것입니다.'],
      ['Bu ____ büyük.','evler|evlar|evim|evi','이 집들은 큽니다.'],
      ['____ burada.','Çocuklar|Çocukler|Çocuğum|Çocuğu','아이들이 여기 있습니다.'],
      ['____ parkta.','Kediler|Kedilar|Kedim|Kediyi','고양이들이 공원에 있습니다.']
    ]],
    ['existence','var와 yok',1,'장소 + 명사 + var는 ‘~이 있다’, yok은 ‘~이 없다’입니다. 여기서는 var/yok으로 사물이 있는지 표현합니다.',[
      ['Masada bir kitap ____.','var|yok|değil|mi','탁자에 책 한 권이 있습니다.'],
      ['Bugün ders ____.','yok|var|değil|mi','오늘은 수업이 없습니다.'],
      ['Evde iki oda ____.','var|yok|değil|mi','집에 방이 두 개 있습니다.'],
      ['Çantada kalem ____.','yok|var|değil|mi','가방에 펜이 없습니다.']
    ]],
    ['location','장소를 나타내는 -de/-da',2,'장소의 ‘~에/에서’는 -de/-da입니다. 끝 자음이 ç·f·h·k·p·s·ş·t이면 -te/-ta가 됩니다.',[
      ['Kitap ____.','masada|masaya|masayı|masadan','책은 탁자에 있습니다.'],
      ['Çocuklar ____.','parkta|parka|parkı|parktan','아이들은 공원에 있습니다.'],
      ['Annem ____.','evde|eve|evi|evden','엄마는 집에 있습니다.'],
      ['Öğrenciler ____.','sınıfta|sınıfa|sınıfı|sınıftan','학생들은 교실에 있습니다.']
    ]],
    ['questions','의문 소사 mı/mi/mu/mü',2,'의문 소사는 앞말과 띄어 씁니다. 마지막 모음에 따라 mı·mi·mu·mü를 고릅니다. burada는 a, yeni는 i가 기준입니다.',[
      ['Ali burada ____?','mı|mi|mu|mü','알리는 여기 있나요?'],
      ['Bu kitap yeni ____?','mi|mı|mu|mü','이 책은 새것인가요?'],
      ['Bu yol uzun ____?','mu|mı|mi|mü','이 길은 긴가요?'],
      ['Bu oda büyük ____?','mü|mı|mi|mu','이 방은 큰가요?']
    ]],
    ['destination','목적지의 -(y)e/-(y)a',3,'방향·목적지 ‘~로/에’는 -e/-a를 붙입니다. 모음으로 끝난 말에는 y가 이어지고, 일부 끝 자음은 바뀝니다.',[
      ['Ben ____ gidiyorum.','okula|okulu|okulda|okuldan','나는 학교에 가고 있습니다.'],
      ['O ____ gidiyor.','eve|evi|evde|evden','그 사람은 집에 가고 있습니다.'],
      ['Biz ____ gidiyoruz.','parka|parkı|parkta|parktan','우리는 공원에 가고 있습니다.'],
      ['Siz ____ gidiyorsunuz.','hastaneye|hastaneyi|hastanede|hastaneden','여러분은 병원에 가고 있습니다.']
    ]],
    ['object','특정 목적어의 격 어미',3,'특정한 목적어에는 -(y)ı/-i/-u/-ü가 붙습니다. kitap은 kitabı로 끝 자음이 바뀌고, 모음 뒤에는 y가 들어갑니다.',[
      ['Bu ____ okuyorum.','kitabı|kitapta|kitaba|kitaptan','나는 이 책을 읽고 있습니다.'],
      ['Bu ____ açıyorum.','kapıyı|kapıda|kapıya|kapıdan','나는 이 문을 열고 있습니다.'],
      ['Bu ____ içiyorum.','suyu|suda|suya|sudan','나는 이 물을 마시고 있습니다.'],
      ['Bu ____ alıyorum.','kalemi|kalemde|kaleme|kalemden','나는 이 펜을 사고 있습니다.']
    ]],
    ['present','현재 진행과 인칭',3,'-(I)yor에 인칭 어미를 붙입니다. -(I)yorum은 나, -(I)yorsun은 너, -(I)yoruz는 우리, -(I)yorsunuz는 여러분입니다.',[
      ['Ben kitap ____.','okuyorum|okuyorsun|okuyoruz|okuyorsunuz','나는 책을 읽고 있습니다.'],
      ['Sen su ____.','içiyorsun|içiyorum|içiyoruz|içiyorsunuz','너는 물을 마시고 있습니다.'],
      ['Biz Türkçe ____.','öğreniyoruz|öğreniyorum|öğreniyorsun|öğreniyorsunuz','우리는 터키어를 배우고 있습니다.'],
      ['Siz müzik ____.','dinliyorsunuz|dinliyorum|dinliyorsun|dinliyoruz','여러분은 음악을 듣고 있습니다.']
    ]],
    ['past','과거형 -DI',4,'확인한 과거 일을 말할 때 -dı/-di/-du/-dü와 인칭 어미를 붙입니다. 무성 자음 뒤에서는 d가 t가 됩니다.',[
      ['Ben dün okula ____.','gittim|gittin|gittik|gittiniz','나는 어제 학교에 갔습니다.'],
      ['Sen dün kitap ____.','okudun|okudum|okuduk|okudunuz','너는 어제 책을 읽었습니다.'],
      ['Biz dün kahve ____.','içtik|içtim|içtin|içtiniz','우리는 어제 커피를 마셨습니다.'],
      ['Siz dün burada ____.','çalıştınız|çalıştım|çalıştın|çalıştık','여러분은 어제 여기서 일했습니다.']
    ]],
    ['negative','현재 진행의 부정',4,'현재 진행형 부정에는 -mıyor/-miyor/-muyor/-müyor를 씁니다. 긍정형과 인칭까지 함께 확인하세요.',[
      ['Ben şimdi ____.','çalışmıyorum|çalışıyorum|çalışmıyorsun|çalışmıyoruz','나는 지금 일하고 있지 않습니다.'],
      ['Sen şimdi kitap ____.','okumuyorsun|okuyorsun|okumuyorum|okumuyoruz','너는 지금 책을 읽고 있지 않습니다.'],
      ['Biz bugün okula ____.','gitmiyoruz|gidiyoruz|gitmiyorum|gitmiyorsun','우리는 오늘 학교에 가고 있지 않습니다.'],
      ['O şimdi müzik ____.','dinlemiyor|dinliyor|dinlemiyorum|dinlemiyoruz','그 사람은 지금 음악을 듣고 있지 않습니다.']
    ]],
    ['future','미래형 -(y)AcAk',5,'미래형에는 -(y)acak/-(y)ecek을 씁니다. 1인칭 어미 앞에서는 k가 ğ로 바뀌어 geleceğim·geleceğiz처럼 됩니다.',[
      ['Ben yarın ____.','geleceğim|geleceksin|geleceğiz|geleceksiniz','나는 내일 올 것입니다.'],
      ['Sen yarın kitap ____.','okuyacaksın|okuyacağım|okuyacağız|okuyacaksınız','너는 내일 책을 읽을 것입니다.'],
      ['Biz yarın ____.','çalışacağız|çalışacağım|çalışacaksın|çalışacaksınız','우리는 내일 일할 것입니다.'],
      ['Siz yarın müzeye ____.','gideceksiniz|gideceğim|gideceksin|gideceğiz','여러분은 내일 박물관에 갈 것입니다.']
    ]],
    ['origin','출발점을 나타내는 -den/-dan',5,'출발점·출처 ‘~에서부터’는 -den/-dan을 붙입니다. 끝 자음에 따라 -ten/-tan이 됩니다.',[
      ['Ben ____ geliyorum.','evden|eve|evde|evi','나는 집에서 오고 있습니다.'],
      ['O ____ geliyor.','okuldan|okula|okulda|okulu','그 사람은 학교에서 오고 있습니다.'],
      ['Biz ____ çıkıyoruz.','parktan|parka|parkta|parkı','우리는 공원에서 나오고 있습니다.'],
      ['Çocuk ____ çıkıyor.','sınıftan|sınıfa|sınıfta|sınıfı','아이가 교실에서 나오고 있습니다.']
    ]]
  ];
  const vocabulary = {
    ja:[
      ['私','わたし','나|저'],['あなた','あなた','너|당신'],['友達','ともだち','친구'],['家族','かぞく','가족'],['母','はは','어머니|엄마'],['父','ちち','아버지|아빠'],
      ['学生','がくせい','학생'],['先生','せんせい','선생님|교사'],['学校','がっこう','학교'],['大学','だいがく','대학교|대학'],['本','ほん','책'],['新聞','しんぶん','신문'],
      ['名前','なまえ','이름'],['言葉','ことば','말|언어|단어'],['日本語','にほんご','일본어'],['仕事','しごと','일|직업'],['家','いえ','집'],['部屋','へや','방'],
      ['机','つくえ','책상'],['椅子','いす','의자'],['水','みず','물'],['お茶','おちゃ','차'],['ご飯','ごはん','밥|식사'],['パン','パン','빵'],
      ['魚','さかな','생선|물고기'],['野菜','やさい','채소|야채'],['猫','ねこ','고양이'],['犬','いぬ','개|강아지'],['今日','きょう','오늘'],['明日','あした','내일'],
      ['昨日','きのう','어제'],['朝','あさ','아침'],['昼','ひる','낮|정오'],['夜','よる','밤'],['時間','じかん','시간'],['毎日','まいにち','매일'],
      ['駅','えき','역'],['電車','でんしゃ','전철|열차'],['自転車','じてんしゃ','자전거'],['道','みち','길'],['店','みせ','가게|상점'],['病院','びょういん','병원'],
      ['図書館','としょかん','도서관'],['公園','こうえん','공원'],['映画','えいが','영화'],['音楽','おんがく','음악'],['雨','あめ','비'],['天気','てんき','날씨'],
      ['大きい','おおきい','크다|큰'],['小さい','ちいさい','작다|작은'],['新しい','あたらしい','새롭다|새로운|새것'],['古い','ふるい','오래되다|오래된|낡다|낡은'],
      ['行く','いく','가다'],['来る','くる','오다'],['食べる','たべる','먹다'],['飲む','のむ','마시다'],['読む','よむ','읽다'],['書く','かく','쓰다'],
      ['買う','かう','사다|구매하다'],['話す','はなす','말하다|이야기하다']
    ],
    es:[
      ['yo','','나|저'],['tú','','너'],['amigo','','친구'],['familia','','가족'],['madre','','어머니|엄마'],['padre','','아버지|아빠'],
      ['estudiante','','학생'],['profesor','','선생님|교사|교수'],['escuela','','학교'],['universidad','','대학교|대학'],['libro','','책'],['periódico','','신문'],
      ['nombre','','이름'],['palabra','','단어|낱말|말'],['español','','스페인어'],['trabajo','','일|직업'],['casa','','집'],['habitación','','방|객실'],
      ['mesa','','탁자|테이블'],['silla','','의자'],['agua','','물'],['té','','차'],['arroz','','쌀|밥'],['pan','','빵'],
      ['pescado','','생선'],['verdura','','채소|야채'],['gato','','고양이'],['perro','','개|강아지'],['hoy','','오늘'],['mañana','','내일|아침'],
      ['ayer','','어제'],['tarde','','오후|늦게'],['noche','','밤'],['hora','','시간|시각'],['día','','날|하루'],['semana','','주|일주일'],
      ['estación','','역|계절'],['tren','','기차|열차'],['bicicleta','','자전거'],['calle','','거리|길'],['tienda','','가게|상점'],['hospital','','병원'],
      ['biblioteca','','도서관'],['parque','','공원'],['película','','영화'],['música','','음악'],['lluvia','','비'],['tiempo','','시간|날씨'],
      ['grande','','크다|큰'],['pequeño','','작다|작은'],['nuevo','','새롭다|새로운|새것'],['viejo','','오래되다|오래된|늙다|늙은'],
      ['ir','','가다'],['venir','','오다'],['comer','','먹다'],['beber','','마시다'],['leer','','읽다'],['escribir','','쓰다'],
      ['comprar','','사다|구매하다'],['hablar','','말하다|이야기하다']
    ],
    tr:[
      ['ben','','나|저'],['sen','','너'],['arkadaş','','친구'],['aile','','가족'],['anne','','어머니|엄마'],['baba','','아버지|아빠'],
      ['öğrenci','','학생'],['öğretmen','','선생님|교사'],['okul','','학교'],['üniversite','','대학교|대학'],['kitap','','책'],['gazete','','신문'],
      ['isim','','이름'],['kelime','','단어|낱말'],['Türkçe','','터키어|튀르키예어'],['iş','','일|직업'],['ev','','집'],['oda','','방'],
      ['masa','','탁자|테이블'],['sandalye','','의자'],['su','','물'],['çay','','차'],['pirinç','','쌀'],['ekmek','','빵'],
      ['balık','','생선|물고기'],['sebze','','채소|야채'],['kedi','','고양이'],['köpek','','개|강아지'],['bugün','','오늘'],['yarın','','내일'],
      ['dün','','어제'],['sabah','','아침'],['öğle','','정오|한낮'],['gece','','밤'],['saat','','시간|시계|시각'],['her gün','','매일'],
      ['istasyon','','역'],['tren','','기차|열차'],['bisiklet','','자전거'],['yol','','길|도로'],['mağaza','','가게|상점'],['hastane','','병원'],
      ['kütüphane','','도서관'],['park','','공원'],['film','','영화'],['müzik','','음악'],['yağmur','','비'],['hava','','날씨|공기'],
      ['büyük','','크다|큰'],['küçük','','작다|작은'],['yeni','','새롭다|새로운|새것'],['eski','','오래되다|오래된|옛|낡은'],
      ['gitmek','','가다'],['gelmek','','오다'],['yemek','','먹다|음식|식사'],['içmek','','마시다'],['okumak','','읽다|공부하다'],['yazmak','','쓰다'],
      ['almak','','사다|받다|가져가다'],['konuşmak','','말하다|이야기하다']
    ]
  };
  const metadata = {
    ja:{
      name:'일본어',native:'日本語',voice:'ja-JP',stages:['자기소개·명사','목적어·장소','시간·존재·과거','부정·부탁','희망·이유'],
      guide:'は는 조사일 때 ‘와’, を는 ‘오’로 읽습니다. 작은 っ는 뒤 자음 앞에서 한 박자를 멈추고, 장음은 모음 길이를 구별합니다. 해설에서 문장 전체의 가나 읽기를 확인하세요.',
      sources:[['일본국제교류기금 Irodori 입문','https://www.irodori.jpf.go.jp/en/starter/pdf.html']]
    },
    es:{
      name:'스페인어',native:'Español',voice:'es-ES',stages:['소개·관사·위치','일치·현재형 시작','동사 활용·나이','좋아함·계획','완료·문장 연결'],
      guide:'á·é·í·ó·ú의 악센트 표시는 강세·음절 구분에 중요합니다. ñ는 n과 다른 글자이고 h는 보통 묵음입니다. 여기서는 tú와 nosotros를 쓰는 기초 문장을 연습합니다. 발음은 지역에 따라 달라집니다.',
      sources:[['RAE·ASALE ser','https://www.rae.es/dpd/ser'],['RAE·ASALE estar','https://www.rae.es/dpd/estar'],['RAE·ASALE gustar','https://www.rae.es/dpd/gustar']]
    },
    tr:{
      name:'터키어',native:'Türkçe',voice:'tr-TR',stages:['소개·복수·존재','장소·질문','이동·목적어·현재','과거·부정','미래·출발점'],
      guide:'ı와 i는 서로 다른 모음입니다. ı의 대문자는 I, i의 대문자는 İ입니다. ç는 ‘ㅊ’, ş는 ‘쉬’에 가까우며 ö·ü는 입술을 둥글게 합니다. ğ는 주변 모음의 길이·연결에 영향을 줍니다. 어미는 모음 조화에 맞춰 바뀝니다.',
      sources:[['Yunus Emre Enstitüsü 터키어 학습','https://turkce.yee.org.tr/en/']]
    }
  };
  const groups={ja:japanese,es:spanish,tr:turkish};
  return Object.fromEntries(Object.entries(metadata).map(([language,meta])=>[
    language,{
      ...meta,language,
      questions:groups[language].flatMap(([topic,label,stage,why,items])=>items.map(([stem,options,meaning,reading],index)=>{
        const choices=options.split('|');
        return {key:language+'-g-'+topic+'-'+(index+1),topic,label,stage,why,stem,answer:choices[0],options:choices,meaning,reading:reading||''};
      })),
      words:vocabulary[language].map(([word,reading,meanings],index)=>({
        key:language+'-w-'+(index+1),word,reading,meanings:meanings.split('|'),set:Math.floor(index/30)
      }))
    }
  ]));
})();
if(typeof window!=='undefined')window.LANGUAGE_COURSES=LANGUAGE_COURSES;
if(typeof module!=='undefined')module.exports=LANGUAGE_COURSES;
