'use strict';
(()=>{
const rows=a=>a.map(s=>s.split('|'));
const old=(l,i,steps,r)=>expandGrammar('es',l,i,'','','',steps,'',rows(r),GRAMMAR_REFS.es);
const add=(l,t,p,e,s,w,r)=>expandGrammar('es',l,null,t,p,e,s,w,rows(r),l[0]==='C'?GRAMMAR_REFS.esAdvanced:GRAMMAR_REFS.es);
old('A1',0,'명사의 성은 관사와 함께 외웁니다. -o·-a만 보고 판단하면 día·mano 같은 예외를 놓칩니다.|관사와 형용사를 중심 명사의 성·수에 일치시킵니다. 남성 복수 los libros nuevos를 한 덩어리로 연습합니다.|처음 소개하는 대상에는 un·una, 특정된 대상에는 el·la가 쓰이는 기본 차이도 확인합니다.',[
'___ libros son nuevos.|Los|Las|La|그 책들은 새것입니다.|libros는 남성 복수이므로 Los입니다.',
'La casa es ___.|blanca|blanco|blancos|그 집은 흰색입니다.|casa의 여성 단수에 blanca를 일치시킵니다.',
'Las estudiantes son ___.|inteligentes|inteligente|inteligentas|여학생들은 똑똑합니다.|inteligente는 성 변화 없이 수만 복수로 만듭니다.']);
old('A1',1,'사람의 신분·분류·출신 등은 ser, 사람·사물의 위치와 상태에는 estar를 우선 고려합니다.|soy·eres·es와 estoy·estás·está처럼 불규칙 현재형을 주어에 맞춥니다.|영구·일시만으로 나누지 않습니다. 행사 장소는 ser이고 muerto 같은 상태도 estar와 결합할 수 있습니다.',[
'Nosotros ___ estudiantes.|somos|estamos|son|우리는 학생입니다.|신분·분류를 나타내는 ser의 nosotros형입니다.',
'Mis llaves ___ en la mesa.|están|son|está|내 열쇠들은 탁자 위에 있습니다.|위치와 복수 주어이므로 están입니다.',
'La reunión ___ en la biblioteca.|es|está|están|회의는 도서관에서 열립니다.|행사의 개최 장소는 ser를 씁니다.']);
old('A1',2,'동사의 사전형 -ar·-er·-ir를 확인한 뒤 어미를 분리합니다.|인칭에 맞는 어미를 붙입니다. hablar의 yo형은 hablo, nosotros형은 hablamos입니다.|주어는 생략할 수 있지만 동사 형태는 유지합니다. 불규칙 동사는 규칙표만 적용하지 않고 별도로 익힙니다.',[
'Yo ___ en una escuela.|trabajo|trabajas|trabajan|저는 학교에서 일합니다.|yo에 맞는 -ar 현재형은 -o입니다.',
'Ellos ___ agua.|beben|bebo|bebes|그들은 물을 마십니다.|ellos에 맞는 beber의 형태는 beben입니다.',
'Tú ___ en Madrid.|vives|vivo|vivimos|너는 마드리드에 삽니다.|tú에 맞는 -ir 현재형은 vives입니다.']);
old('A1',3,'좋아하는 대상이 문법적 주어라는 점을 먼저 확인합니다.|단수 명사·동사원형에는 gusta, 복수 명사에는 gustan을 씁니다.|좋아하는 사람은 me·te·le 등으로 표시하고 필요하면 A Ana처럼 누구인지 덧붙입니다.',[
'Me ___ leer.|gusta|gustan|gusto|저는 읽기를 좋아합니다.|동사원형 leer는 gusta와 연결합니다.',
'A Ana le ___ las flores.|gustan|gusta|gustas|아나는 꽃들을 좋아합니다.|주어 las flores가 복수이므로 gustan입니다.',
'A nosotros nos ___ el cine.|gusta|gustan|gustamos|우리는 영화를 좋아합니다.|주어 el cine가 단수이므로 gusta입니다.']);
add('A1','처음 소개하는 존재','hay + 대상','hay는 어떤 장소에 무엇이 존재하는지 새롭게 소개합니다. 단수·복수 모두 같은 hay를 쓰는 기본 비인칭 표현입니다. 이미 특정된 대상의 위치를 말하는 estar와 구별하면 설명이 쉬워집니다.','장소를 정하고 존재하는 대상을 뒤에 둡니다.|un·una, 수량, 복수 명사와 hay를 연결합니다.|그 대상을 다시 언급할 때는 el·la와 estar로 위치를 말할 수 있습니다.','Hay una farmacia와 La farmacia está aquí를 비교하세요. 존재 소개와 특정 대상 위치의 차이입니다.',[
'En mi barrio ___ dos parques.|hay|están|son|우리 동네에는 공원 두 개가 있습니다.|처음 소개하는 존재이므로 hay입니다.',
'___ una farmacia cerca.|Hay|Está|Es|근처에 약국 하나가 있습니다.|새로운 대상을 소개하는 hay입니다.',
'En la clase no ___ ventanas.|hay|está|es|교실에는 창문이 없습니다.|hay는 복수 대상에도 형태가 같습니다.']);
add('A1','부정문 만들기','no + 동사 / no…nada','기본 부정은 활용 동사 앞에 no를 놓습니다. 동사 뒤의 nada·nadie는 no와 함께 쓰여도 긍정으로 바뀌지 않습니다. 이중 부정을 논리 공식처럼 처리하지 말고 스페인어의 부정 일치를 익히세요.','활용된 동사를 찾습니다.|그 앞에 no를 배치합니다.|nadie가 주어로 동사 앞에 오면 Nadie viene처럼 보통 no를 더하지 않습니다.','No veo nada는 아무것도 보이지 않는다는 뜻입니다. 부정어 두 개라고 긍정으로 번역하지 않습니다.',[
'Yo ___ hablo francés.|no|nada|nadie|저는 프랑스어를 하지 않습니다.|활용 동사 앞의 no입니다.',
'No veo ___.|nada|no|nunca de|아무것도 보이지 않습니다.|no와 목적어 부정 nada가 일치합니다.',
'___ viene hoy.|Nadie|Nada de|Ningún|오늘은 아무도 오지 않습니다.|사람 주어를 부정하는 Nadie입니다.']);
add('A1','질문에 필요한 말','qué / quién / dónde / cuándo','정보를 묻는 의문사는 필요한 정보의 종류에 따라 고릅니다. 사물·내용은 qué, 사람은 quién, 장소는 dónde, 때는 cuándo입니다. 직접 의문문에서는 앞뒤 물음표와 의문사의 강세 표기를 확인하세요.','무엇을 모르는지 먼저 정합니다.|그 정보에 맞는 의문사를 문장 앞에 둡니다.|간접 의문문에서도 의문 뜻이 유지되면 qué·dónde 등의 강세를 유지합니다.','que와 qué, donde와 dónde는 용법이 다릅니다. 의문문이라고 단어 순서를 기계적으로 모두 뒤집지 마세요.',[
'¿___ vives? — En Sevilla.|Dónde|Quién|Cuándo|어디에 사나요? 세비야에 삽니다.|장소를 묻는 Dónde입니다.',
'¿___ es tu profesora? — Ana.|Quién|Dónde|Cuándo|누가 네 선생님이니? 아나야.|사람을 묻는 Quién입니다.',
'¿___ empieza la clase? — A las nueve.|Cuándo|Quién|Dónde|수업은 언제 시작하나요? 9시에요.|시점을 묻는 Cuándo입니다.']);
add('A1','지시사와 거리','este / ese / aquel','지시사는 대상을 가리키면서 명사의 성·수에 일치합니다. 기본적으로 este는 화자 가까이, ese는 상대 쪽이나 앞서 언급한 대상, aquel은 더 먼 대상을 가리키는 데 쓰입니다. 실제 거리는 대화 맥락에 따라 달라집니다.','가리키는 대상과 거리를 정합니다.|여성은 esta·esa·aquella, 복수는 estos·estas 등의 형태로 바꿉니다.|명사를 직접 꾸미거나 명사 없이 대명사처럼 쓸 수 있습니다.','중성 esto·eso·aquello는 명사를 직접 꾸미지 않습니다. esto libro라고 하지 않습니다.',[
'___ casa de aquí es pequeña.|Esta|Este|Esto|여기 있는 이 집은 작습니다.|casa의 여성 단수에 Esta입니다.',
'___ libros de aquí son míos.|Estos|Estas|Esto|여기 있는 이 책들은 내 것입니다.|libros의 남성 복수에 Estos입니다.',
'___ montaña de allí está lejos.|Aquella|Aquel|Aquello|저쪽의 저 산은 멉니다.|montaña는 여성 단수입니다.']);
add('A1','내 것과 네 것','mi / tu / su / nuestro','명사 앞의 소유사는 소유자의 성이 아니라 소유물의 수, 일부 형태에서는 성에도 맞춥니다. mi casa와 mis casas처럼 수를 바꿉니다. su는 그·그녀·당신·그들의 것일 수 있어 문맥이 필요합니다.','소유자를 먼저 정합니다.|소유물이 복수라면 mi→mis, tu→tus, su→sus로 바꿉니다.|nuestro는 nuestra·nuestros·nuestras로 성·수를 모두 맞춥니다.','mi와 mí, tu와 tú는 강세와 역할이 다릅니다. 소유사 mi·tu에는 강세가 없습니다.',[
'___ amigos viven aquí. (나의)|Mis|Mi|Mí|내 친구들은 여기 삽니다.|복수 소유물 amigos에 Mis입니다.',
'___ casa es grande. (우리의)|Nuestra|Nuestro|Nuestros|우리 집은 큽니다.|여성 단수 casa에 Nuestra입니다.',
'¿Dónde están ___ llaves? (너의)|tus|tu|tú|네 열쇠들은 어디 있니?|복수 소유물에 tus입니다.']);
add('A1','자기 자신과 재귀동사','me / te / se + 동사','lavarse·levantarse 같은 동사는 재귀대명사와 함께 익히는 것이 좋습니다. 주어에 맞춰 대명사와 동사를 모두 바꿉니다. 모든 se 동사가 문자 그대로 자기 자신을 대상으로 하는 것은 아닙니다.','사전형의 -se를 확인합니다.|yo는 me, tú는 te, él·ella는 se를 선택합니다.|활용 동사 앞에 대명사를 놓고 동사 인칭도 일치시킵니다.','Yo se levanto처럼 대명사와 주어를 섞지 않습니다. Me levanto와 Te levantas를 한 묶음으로 연습하세요.',[
'Yo ___ levanto temprano.|me|te|se|저는 일찍 일어납니다.|yo에 맞는 재귀대명사는 me입니다.',
'Tú te ___ a las siete.|levantas|levanto|levantan|너는 7시에 일어납니다.|tú에 맞는 활용은 levantas입니다.',
'Ellas ___ lavan las manos.|se|me|te|그녀들은 손을 씻습니다.|ellas에 맞는 재귀대명사는 se입니다.']);
add('A1','시각과 일정','a la una / a las dos','시각 자체를 말할 때는 Es la una·Son las dos, 행동 시간을 말할 때는 a la una·a las dos를 씁니다. 한 시와 나머지 시각의 단수·복수 차이를 기억하세요.','시각을 묻는지 일정을 말하는지 구별합니다.|한 시는 la una, 다른 시각은 las dos 등으로 만듭니다.|행동 동사와 연결할 때 a를 앞에 붙입니다.','Es las dos나 a los tres처럼 관사 성·수를 잘못 고르지 않습니다. 시간의 hora는 여성 명사입니다.',[
'La clase empieza ___ nueve.|a las|a la|en los|수업은 9시에 시작합니다.|행동 시각이며 9시는 복수 a las입니다.',
'Comemos ___ una.|a la|a las|en los|우리는 1시에 식사합니다.|한 시에는 단수 a la una입니다.',
'___ las cinco.|Son|Es|Está|5시입니다.|시각 자체의 복수 표현 Son las입니다.']);
add('A1','a와 de의 축약','a + el = al / de + el = del','남성 단수 관사 el이 전치사 a·de와 만나면 보통 al·del로 줄어듭니다. 여성 la와 복수 los·las는 같은 방식으로 줄이지 않습니다. 강세가 있는 대명사 él은 관사 el과 구별합니다.','전치사 뒤의 el이 관사인지 확인합니다.|a el은 al, de el은 del로 합칩니다.|la·los·las는 그대로 유지하고 고유명칭 예외는 별도로 확인합니다.','de él은 그 사람의라는 뜻으로 축약하지 않습니다. 관사 el과 대명사 él을 구별하세요.',[
'Voy ___ mercado.|al|a el|del|저는 시장에 갑니다.|a와 관사 el이 합쳐 al입니다.',
'Vengo ___ trabajo.|del|de el|al|저는 직장에서 옵니다.|de와 관사 el의 축약 del입니다.',
'Hablo ___ profesor.|del|de el|a la|저는 그 선생님에 관해 말합니다.|hablar de의 de와 el이 결합합니다.']);
old('A2',0,'끝난 시간 안에서 발생한 사건을 고릅니다. ayer·la semana pasada 같은 시간 단서가 도움이 됩니다.|규칙형 -ar→-é·-aste·-ó, -er/-ir→-í·-iste·-ió를 인칭에 맞춥니다.|fui·tuve·hice 같은 불규칙형은 별도로 익히고 배경을 그리는 imperfecto와 대비합니다.',[
'Ayer yo ___ una carta.|escribí|escribía siempre|escribiré|어제 저는 편지를 썼습니다.|완료 사건의 yo 단순과거 escribí입니다.',
'La semana pasada Ana ___ a Toledo.|fue|irá|va mañana|지난주 아나는 톨레도에 갔습니다.|ir의 불규칙 과거 3인칭은 fue입니다.',
'Anoche nosotros ___ una película.|vimos|veremos|vemos mañana|어젯밤 우리는 영화를 봤습니다.|ver의 nosotros 단순과거는 vimos입니다.']);
old('A2',1,'과거의 습관·배경·진행 상태에 초점을 둘 때 선택합니다.|-ar는 -aba, -er/-ir는 -ía를 기본으로 활용합니다. ser→era, ir→iba, ver→veía는 따로 확인합니다.|완료 사건과 함께 쓰면 배경 속에서 어떤 사건이 일어났는지 표현할 수 있습니다.',[
'De niño, ___ al parque cada tarde.|iba|iré|voy|어릴 때 매일 오후 공원에 가곤 했습니다.|과거 습관이며 ir의 imperfecto는 iba입니다.',
'Antes nosotros ___ cerca del mar.|vivíamos|viviremos|vivimos mañana|예전에 우리는 바다 근처에 살았습니다.|과거의 지속 상태는 vivíamos입니다.',
'Cuando era pequeña, mi hermana ___ mucho.|leía|leerá|lee mañana|어렸을 때 여동생은 책을 많이 읽었습니다.|과거 반복 습관에는 leía입니다.']);
old('A2',2,'직접목적어 명사의 성·수를 확인합니다.|lo·la·los·las를 활용 동사 앞에 놓습니다. 동사원형 뒤에는 붙일 수 있습니다.|Quiero verlo와 Lo quiero ver처럼 두 위치가 가능하지만 같은 대명사를 중복해 쓰지 않습니다.',[
'El correo está aquí. ___ leo ahora.|Lo|La|Las|메일이 여기 있습니다. 지금 그것을 읽습니다.|correo는 남성 단수이므로 Lo입니다.',
'Compré las entradas y ___ guardé.|las|lo|la|표들을 샀고 그것들을 보관했습니다.|entradas는 여성 복수이므로 las입니다.',
'Quiero ver la película. Quiero ver___.|la|lo|los|그 영화를 보고 싶습니다.|película를 받는 la를 원형 뒤에 붙입니다.']);
old('A2',3,'계획인지 의무인지 먼저 구분합니다.|ir를 주어에 맞춰 활용한 뒤 a+동사원형, tener 뒤에는 que+동사원형을 씁니다.|뒤 동사는 활용하지 않습니다. Voy a salir와 Tengo que salir의 의미 차이를 비교합니다.',[
'Mañana vamos ___ visitar a Ana.|a|de|que|내일 우리는 아나를 방문할 예정입니다.|ir a+원형의 a가 필요합니다.',
'Tengo que ___ este libro.|leer|leo|leí|저는 이 책을 읽어야 합니다.|tener que 뒤에는 원형 leer입니다.',
'Ellos ___ a viajar mañana.|van|va|voy|그들은 내일 여행할 예정입니다.|ellos에 맞는 ir 현재형은 van입니다.']);
add('A2','현재와 연결되는 경험','haber + 과거분사','현재완료는 현재와 관련된 경험·결과·기간을 말할 때 사용합니다. he·has·ha·hemos·habéis·han에 과거분사를 붙입니다. 단순과거와의 분포는 스페인과 아메리카 지역마다 차이가 있으므로 한 지역의 습관을 절대 규칙으로 만들지 마세요.','haber를 주어에 맞춰 고릅니다.|-ar는 -ado, -er/-ir는 -ido로 기본 분사를 만듭니다.|visto·hecho·escrito 같은 불규칙 분사는 따로 익힙니다.','haber 뒤 분사는 주어 성·수에 따라 바뀌지 않습니다. ellas han llegado이지 llegadas가 아닙니다.',[
'Yo nunca ___ estado en Perú.|he|ha|han|저는 페루에 가 본 적이 없습니다.|yo의 haber는 he입니다.',
'Ellas han ___ temprano.|llegado|llegadas|llegados|그녀들은 일찍 도착했습니다.|haber 뒤의 분사는 성·수 일치를 하지 않습니다.',
'¿Has ___ esta película?|visto|veído|vista|이 영화를 본 적이 있나요?|ver의 불규칙 분사는 visto입니다.']);
add('A2','정도 비교와 최상급','más…que / el más…','두 대상의 정도 차이는 más…que로, 집단 안에서 가장 높은 정도는 관사+명사+가장 구조로 표현합니다. 형용사는 꾸미는 명사와 성·수를 맞춥니다.','두 대상 비교면 más+형용사+que를 씁니다.|집단 내 최고면 el·la·los·las를 성·수에 맞춥니다.|bueno→mejor, malo→peor 같은 불규칙 비교형을 함께 익힙니다.','기본 비교에서 más mejor라고 중복하지 않습니다. 최고 범위를 de la clase처럼 덧붙일 수 있습니다.',[
'Este tren es más rápido ___ el autobús.|que|de|como|이 열차는 버스보다 빠릅니다.|비교 기준을 연결하는 que입니다.',
'Ana es ___ más alta de la clase.|la|el|los|아나는 반에서 키가 가장 큽니다.|여성 단수 최상급의 관사는 la입니다.',
'Este resultado es ___ que el anterior.|mejor|más mejor|muy mejor|이 결과는 이전 결과보다 더 좋습니다.|bueno의 비교형은 mejor입니다.']);
add('A2','지금 진행 중인 행동','estar + gerundio','현재의 진행 동작을 강조할 때 estar와 동명사형을 결합합니다. 단순현재도 상황에 따라 현재 행동을 나타낼 수 있으므로 영어 진행형과 완전히 같은 분포라고 생각하지 마세요.','estar를 주어에 맞춰 활용합니다.|-ar는 -ando, -er/-ir는 -iendo를 기본으로 동명사를 만듭니다.|leer→leyendo, dormir→durmiendo 같은 변화도 확인합니다.','estoy estudiar처럼 원형을 놓거나 soy estudiando처럼 ser와 연결하지 않습니다.',[
'Ahora estoy ___ la cena.|preparando|preparar|preparado|지금 저녁 식사를 준비하고 있습니다.|-ar 동사의 동명사는 preparando입니다.',
'Los niños ___ jugando.|están|son|está|아이들이 놀고 있습니다.|복수 주어의 estar는 están입니다.',
'Ana está ___ un libro.|leyendo|leiendo|leído|아나는 책을 읽고 있습니다.|leer의 동명사는 leyendo입니다.']);
add('A2','친한 상대에게 하는 지시','tú 긍정 명령형','친한 한 사람에게 지시·권유할 때 사용하는 형태입니다. 규칙 동사는 직설법 현재 3인칭 단수와 형태가 같은 경우가 많습니다. 부정 명령은 다른 체계를 쓰므로 따로 익힙니다.','대상이 tú인지 확인합니다.|hablar→habla, comer→come, escribir→escribe처럼 만듭니다.|ven·di·haz·pon·sal·sé·ten·ve 같은 불규칙형을 익힙니다.','긍정 명령에 대명사를 붙일 때는 뒤에 붙이며 강세 표시가 필요할 수 있습니다. 부정은 No hables처럼 바뀝니다.',[
'___ la puerta, por favor. (abrir, tú)|Abre|Abres|Abrir|문을 열어 줘.|tú 긍정 명령은 Abre입니다.',
'___ aquí, por favor. (venir, tú)|Ven|Vienes|Viene|여기로 와 줘.|venir의 불규칙 명령형은 Ven입니다.',
'___ los deberes. (hacer, tú)|Haz|Haces|Hacer|숙제를 해.|hacer의 불규칙 명령형은 Haz입니다.']);
add('A2','간접목적어와 전달','le / les + 동사','누구에게 주거나 말하는지 나타내는 간접목적어는 le·les 등으로 받습니다. 대상 사물을 받는 lo·la와 구별합니다. a Ana처럼 사람을 명시하면서 대명사를 함께 쓸 수 있습니다.','전달되는 사물과 받는 사람을 나눕니다.|받는 사람이 한 명이면 le, 여러 명이면 les를 고릅니다.|동사 앞에 놓고 필요하면 a+사람으로 의미를 분명히 합니다.','le는 성별을 구별하지 않습니다. 문법적 성에 따라 la로 바꾸는 직접목적어와 혼동하지 마세요.',[
'___ doy un libro a Ana.|Le|La|Lo|저는 아나에게 책을 줍니다.|받는 사람을 나타내는 간접목적어 Le입니다.',
'___ escribimos a nuestros amigos.|Les|Le|Los de|우리는 친구들에게 편지를 씁니다.|받는 대상이 복수이므로 Les입니다.',
'A mí ___ gusta este lugar.|me|le|les|저는 이곳이 마음에 듭니다.|A mí와 일치하는 간접목적어는 me입니다.']);
add('A2','대명사 두 개의 순서','me/te/se/nos/os + lo/la/los/las','간접목적어와 직접목적어를 함께 쓰면 간접목적어가 앞에 옵니다. le·les가 lo·la·los·las 앞에 오면 se로 바뀝니다. 이 se는 재귀의 의미가 아닐 수 있습니다.','누구에게와 무엇을 구분하여 대명사를 정합니다.|간접목적어를 먼저, 직접목적어를 뒤에 놓습니다.|le lo 대신 se lo처럼 형태를 바꿉니다.','se만으로 받는 사람이 단수인지 복수인지 알기 어렵습니다. a ella·a ellos 등을 덧붙여 구분할 수 있습니다.',[
'El libro es para Ana. ___ lo doy.|Se|Le|La|그 책은 아나에게 줄 것입니다. 저는 그것을 줍니다.|le가 lo 앞에서 se로 바뀝니다.',
'Las llaves son para ti. Te ___ doy.|las|los|la|열쇠들은 네 것이야. 네게 줄게.|llaves는 여성 복수 직접목적어 las입니다.',
'Los documentos son para ellos. Se ___ envío.|los|les|lo|서류들은 그들에게 보낼 것입니다.|documentos를 받는 직접목적어는 los입니다.']);
add('A2','빈도와 반복 일정','siempre / a menudo / nunca','행동이 얼마나 자주 일어나는지 부사나 부사구로 표현합니다. 동사 앞의 nunca는 no 없이 부정을 만들 수 있으며, 동사 뒤에서는 no와 함께 쓰는 경우가 기본입니다.','매번인지 자주인지 전혀 아닌지를 정합니다.|항상은 siempre, 자주는 a menudo, 전혀 아닌 경우 nunca를 고릅니다.|부정어의 위치에 따라 no의 필요 여부를 확인합니다.','No voy nunca와 Nunca voy는 기본적으로 같은 부정 의미를 만들 수 있습니다. 부사와 시각 전치사를 혼동하지 마세요.',[
'___ desayuno a las ocho. (항상)|Siempre|Nunca|Ayer|저는 항상 8시에 아침을 먹습니다.|반복 빈도 항상은 Siempre입니다.',
'___ fumo. (절대로 하지 않음)|Nunca|Siempre|A veces|저는 절대 담배를 피우지 않습니다.|앞에 놓인 Nunca가 부정을 만듭니다.',
'Voy al museo ___. (가끔)|a veces|a las veces|en veces|저는 가끔 박물관에 갑니다.|가끔의 고정 표현은 a veces입니다.']);
add('A2','이동과 수단의 전치사','ir a / venir de / ir en','이동의 목적지, 출발지, 교통수단을 각각 다른 전치사로 표현합니다. 목적지는 a, 출발지는 de, 교통수단은 보통 en을 사용합니다. 단, 걸어서는 a pie라는 고정 표현입니다.','이동에서 무엇을 설명하려는지 먼저 정합니다.|목적지 a, 출발지 de, 교통수단 en을 구분합니다.|관사 el과 결합할 때 al·del 축약도 적용합니다.','걸어서를 en pie로 바꾸지 않습니다. en pie는 서 있는 상태 등 다른 의미가 됩니다.',[
'Voy ___ tren.|en|a|de|저는 기차로 갑니다.|교통수단은 en tren입니다.',
'Volvemos ___ la escuela.|de|en|por el|우리는 학교에서 돌아옵니다.|출발지를 나타내는 de입니다.',
'Voy al trabajo ___ pie.|a|en|de|저는 걸어서 출근합니다.|걸어서는 a pie입니다.']);
old('B1',0,'희망을 가진 주체와 희망하는 행동의 주체가 같은지 확인합니다.|주체가 다르면 querer·esperar+que+접속법을 씁니다. 같으면 원형 구성이 자연스럽습니다.|현재 접속법은 -ar 동사에 e계열, -er/-ir 동사에 a계열 어미가 기본이며 tenga·venga 등의 불규칙형도 익힙니다.',[
'Espero que Ana ___ pronto.|llegue|llega|llegar|아나가 곧 도착하길 바랍니다.|희망절이므로 접속법 llegue입니다.',
'Quiero que tú ___ más.|leas|lees|leer|네가 책을 더 읽었으면 합니다.|다른 주체에게 바라는 행동은 leas입니다.',
'Nosotros queremos ___ español.|aprender|aprendamos|aprendemos|우리는 스페인어를 배우고 싶습니다.|같은 주체의 희망은 원형 aprender로 연결합니다.']);
old('B1',1,'반복 습관인지 아직 실현되지 않은 미래 사건인지 먼저 확인합니다.|미래 시간절 cuando 뒤에는 접속법 현재를 씁니다.|주절은 미래형·명령 등 맥락에 맞게 만들며, 반복적 사실에는 직설법이 가능합니다.',[
'Cuando ___ el tren, te llamaré.|llegue|llegará|llegar|기차가 도착하면 전화하겠습니다.|미래의 시간 조건에는 llegue입니다.',
'Cuando ___ tiempo mañana, te ayudaré.|tenga|tendré|tener|내일 시간이 나면 도와줄게.|미래 시간절의 tener는 tenga입니다.',
'Siempre que llego a casa, ___ la ventana.|abro|abriré mañana|abra|집에 올 때마다 창문을 엽니다.|반복 습관을 직설법 현재로 설명합니다.']);
old('B1',2,'지금 정중히 요청하는지 가정의 결과를 말하는지 확인합니다.|원형에 -ía 계열을 붙이고 poder→podría 같은 불규칙 어간을 적용합니다.|주어에 맞춰 -ías·-íamos 등으로 바꾸되 조건법을 무조건 과거로 번역하지 않습니다.',[
'¿___ decirme la hora? (tú)|Podrías|Podías ayer|Poder|시간을 알려 줄 수 있을까요?|정중한 요청의 조건법 Podrías입니다.',
'Nos ___ visitar Chile.|gustaría|gustarían|gustamos|우리는 칠레를 방문하고 싶습니다.|원형구 visitar Chile를 받는 gustaría입니다.',
'Yo ___ más, pero no tengo tiempo.|viajaría|viajarás|viajar|시간이 없지만 가능하면 여행을 더 할 텐데요.|가정적 결과에 조건법 viajaría입니다.']);
old('B1',3,'시작 날짜와 지속 기간을 구별합니다.|시작점은 desde 2020, 기간은 desde hace dos años로 만듭니다.|현재까지 계속되면 현재형이 자연스러우며 종료된 과거의 기간을 말할 때는 시제·문맥을 조정합니다.',[
'Estudio español desde ___ tres meses.|hace|desde|por|스페인어를 공부한 지 3개월입니다.|기간 앞에는 desde hace입니다.',
'Vivo aquí ___ enero.|desde|desde hace|hace|1월부터 여기 삽니다.|시작 시점 enero 앞에는 desde입니다.',
'___ dos años que trabajo aquí.|Hace|Desde|Por|여기서 일한 지 2년입니다.|Hace+기간+que라는 동등한 구성을 사용합니다.']);
add('B1','과거 사건과 배경 함께 쓰기','imperfecto + indefinido','이야기를 할 때 imperfecto는 배경·진행 상황을, indefinido는 그 안의 완료 사건을 전달하는 데 자주 쓰입니다. 같은 동사도 화자가 사건을 어떻게 제시하느냐에 따라 시제가 달라질 수 있습니다.','진행되던 배경을 imperfecto로 만듭니다.|그중 발생한 사건을 indefinido로 씁니다.|mientras·cuando와 함께 시간 관계를 점검합니다.','긴 행동은 무조건 imperfecto, 짧은 행동은 무조건 indefinido라는 규칙은 부정확합니다. 사건을 바라보는 관점도 중요합니다.',[
'Mientras yo ___, sonó el teléfono.|estudiaba|estudiaré|estudio|제가 공부하고 있을 때 전화가 울렸습니다.|배경 진행은 estudiaba입니다.',
'Hacía frío cuando ___ a casa.|llegué|llegaré|llego mañana|집에 도착했을 때 날씨가 추웠습니다.|배경 속 완료 사건은 llegué입니다.',
'Cuando era niño, ___ al fútbol cada sábado.|jugaba|jugaré|juego|어릴 때 토요일마다 축구했습니다.|과거의 반복 습관은 jugaba입니다.']);
add('B1','미래와 예측','동사원형 + -é / -ás / -á','미래형은 앞으로 일어날 일이나 예측을 말합니다. 원형 전체에 어미를 붙이며 tener→tendr-, salir→saldr-처럼 불규칙 어간도 있습니다. 계획의 ir a와 겹치기도 하지만 문맥과 태도가 달라질 수 있습니다.','동사 원형 또는 불규칙 미래 어간을 고릅니다.|인칭 어미 -é·-ás·-á·-emos·-éis·-án을 붙입니다.|mañana 같은 시간 단서와 문맥을 확인합니다.','미래형은 추측에도 사용됩니다. 모든 미래형이 시간상 미래만 가리키는 것은 아니며 고급 단계에서 구별합니다.',[
'Mañana yo ___ temprano.|saldré|saliré|saldrás|내일 저는 일찍 나갈 것입니다.|salir의 미래 어간은 saldr-입니다.',
'El año que viene nosotros ___ a Japón.|viajaremos|viajarán|viajaré|내년에 우리는 일본에 갈 것입니다.|nosotros 미래형은 viajaremos입니다.',
'Ella ___ veinte años mañana.|tendrá|tenerá|tendré|그녀는 내일 스무 살이 됩니다.|tener의 미래 어간은 tendr-입니다.']);
add('B1','같은 정도 비교','tan…como / tanto…como','성질의 정도가 같으면 tan+형용사·부사+como, 명사의 수량이 같으면 tanto를 성·수에 맞춰 사용합니다. 행동의 양은 동사 뒤 tanto como로 비교할 수 있습니다.','형용사·부사 비교인지 명사 수량 비교인지 확인합니다.|성질이면 tan, 명사면 tanto·tanta·tantos·tantas를 고릅니다.|비교 기준은 como로 연결합니다.','tan libros처럼 tan이 명사 수량을 직접 꾸미지 않습니다. tantos libros라고 말하세요.',[
'Ana es tan alta ___ su hermana.|como|que|de|아나는 언니만큼 키가 큽니다.|같은 정도 비교는 tan…como입니다.',
'Tengo ___ libros como tú.|tantos|tan|tanta|나는 너만큼 책이 많습니다.|남성 복수 명사에 tantos입니다.',
'No tengo ___ paciencia como ella.|tanta|tan|tantos|저는 그녀만큼 인내심이 많지 않습니다.|여성 단수 명사 paciencia에 tanta입니다.']);
add('B1','이유와 목적의 전치사','por / para','por는 원인·교환·경유 등을, para는 목적·수신 대상·기한 등을 나타낼 수 있습니다. 한국어의 한 가지 번역에 억지로 맞추기보다 전치사와 함께 쓰이는 문맥을 비교해야 합니다.','왜 일어났는지 원인이면 por를 먼저 고려합니다.|무엇을 위해 하는지 목표라면 para를 고려합니다.|가격·수신자·기한 같은 구체적 용법을 별도 예문으로 익힙니다.','por와 para가 모두 가능한 경우 뜻이 달라집니다. 시험 문맥에 제시된 원인과 목적을 구별하세요.',[
'Estudio ___ trabajar en España.|para|por el|a de|스페인에서 일하기 위해 공부합니다.|목적을 나타내는 para+원형입니다.',
'Gracias ___ tu ayuda.|por|para|a de|도와줘서 고마워요.|감사의 이유는 por입니다.',
'Este regalo es ___ Ana.|para|por la|desde|이 선물은 아나에게 줄 것입니다.|수신 대상은 para입니다.']);
add('B1','알고 있는 대상을 설명하기','명사 + que + 직설법','이미 알고 있는 대상을 관계절로 설명합니다. que는 사람과 사물을 모두 받을 수 있습니다. 앞 명사가 관계절에서 어떤 역할을 하는지 확인하면 불필요한 대명사 중복을 줄일 수 있습니다.','설명할 명사를 앞에 둡니다.|que 뒤에 그 명사를 설명하는 절을 연결합니다.|실제로 특정된 대상의 사실을 말할 때 직설법을 씁니다.','El libro que lo compré처럼 같은 목적어를 불필요하게 반복하지 않습니다. 전치사가 필요한 관계는 다음 단계에서 구별합니다.',[
'La mujer ___ trabaja aquí es mi tía.|que|quien de|cuyo|여기서 일하는 여성은 제 이모입니다.|사람을 주어로 받는 관계대명사 que입니다.',
'El libro que ___ ayer es interesante.|compré|compraré mañana|compre|어제 산 책은 흥미롭습니다.|실제로 산 특정 책을 직설법 과거로 설명합니다.',
'Conozco a un profesor que ___ turco.|habla|hablar|hables|터키어를 하는 선생님을 알고 있습니다.|실제로 알고 있는 대상이므로 직설법 habla입니다.']);
add('B1','막 끝난 행동','acabar de + 동사원형','방금 어떤 일을 마쳤음을 나타내는 표현입니다. acabar를 인칭·시제에 맞춰 활용하고 뒤에는 de+동사원형을 둡니다. 과거 시점의 직전 완료는 acababa de로 표현할 수 있습니다.','완료 사건이 기준 시점 직전인지 확인합니다.|acabar를 주어에 맞춰 활용합니다.|de 뒤에는 원형을 유지합니다.','Acabo el libro는 책을 끝낸다는 의미일 수 있고 acabo de leer는 방금 읽었다는 뜻입니다. de의 유무를 보세요.',[
'Acabo ___ llegar.|de|a|que|방금 도착했습니다.|직전 완료는 acabar de입니다.',
'Ella acaba de ___ la tarea.|terminar|termina|terminó|그녀는 방금 과제를 마쳤습니다.|de 뒤에는 동사원형입니다.',
'Cuando llamaste, acababa de ___.|salir|salgo|salí|네가 전화했을 때 막 나간 참이었습니다.|과거 기준의 직전 완료에도 원형 salir가 옵니다.']);
add('B1','과거보다 더 앞선 사건','había + 과거분사','과거의 한 시점보다 먼저 끝난 사건을 대과거로 나타냅니다. haber의 imperfecto에 분사를 결합합니다. 과거의 사건 순서를 분명히 해야 할 때 유용합니다.','기준이 되는 과거 사건을 찾습니다.|그보다 먼저 끝난 행동에 había·habías·habían 등을 씁니다.|분사는 성·수에 맞춰 바꾸지 않습니다.','과거 이야기에 등장한다고 모든 동사를 대과거로 만들지는 않습니다. 앞선 사건이라는 관계가 중요합니다.',[
'Cuando llegué, Ana ya ___ salido.|había|ha|habrá|제가 도착했을 때 아나는 이미 나가 있었습니다.|도착보다 먼저 나갔으므로 대과거입니다.',
'Nunca habíamos ___ algo así.|visto|vistos|veído|우리는 그런 것을 본 적이 없었습니다.|haber 뒤의 불규칙 분사 visto입니다.',
'Ellos ya ___ terminado cuando llamé.|habían|había|habías|제가 전화했을 때 그들은 이미 끝냈습니다.|ellos에 맞는 haber는 habían입니다.']);
add('B1','행동이 계속됨을 말하기','seguir + gerundio / dejar de + 원형','seguir+동명사는 계속되는 행동, dejar de+원형은 중단한 행동을 나타냅니다. 동사 모양만 기억하지 말고 계속과 중단이라는 시간적 의미도 구분하세요.','계속인지 중단인지 먼저 판단합니다.|계속이면 sigo leyendo처럼 동명사를 씁니다.|중단이면 dejé de fumar처럼 de+원형을 씁니다.','seguir leer나 dejar fumando처럼 뒤 동사 형태를 서로 바꾸지 않습니다.',[
'Todavía sigo ___ español.|estudiando|estudiar|estudiado|아직도 스페인어를 계속 공부하고 있습니다.|seguir 뒤에는 동명사 estudiando입니다.',
'Mi padre dejó ___ fumar.|de|a|que|아버지는 담배를 끊었습니다.|행동 중단은 dejar de입니다.',
'Aunque llueve, seguimos ___.|caminando|caminar|caminado|비가 오지만 우리는 계속 걷습니다.|계속되는 행동은 동명사로 연결합니다.']);
old('B2',0,'현재와 다른 조건이나 가능성이 낮은 가정인지 확인합니다.|si절에 접속법 과거, 결과절에 조건법을 씁니다.|-ra형과 -se형 모두 가능한 경우가 많습니다. 현실적인 미래 조건 si tengo와 대비하세요.',[
'Si ___ más tiempo, aprendería japonés.|tuviera|tendría|tendré|시간이 더 있다면 일본어를 배울 텐데요.|비현실 조건의 si절은 tuviera입니다.',
'Si viviera cerca, te ___ cada día.|visitaría|visitaré mañana|visité|근처에 산다면 매일 방문할 텐데요.|가정의 결과는 조건법 visitaría입니다.',
'Si yo ___ tú, descansaría.|fuera|sería|seré|내가 너라면 쉬겠어.|관용적인 현재 반사실 조건은 Si fuera tú입니다.']);
old('B2',1,'바람·요청을 말하는 주절이 과거인지 확인합니다.|그 시점에서 원했던 다른 주체의 행동은 que+접속법 과거로 연결합니다.|현재의 Espero que venga와 과거의 Esperaba que viniera를 비교하며 절 사이의 시간 관계를 확인합니다.',[
'Quería que vosotros ___ conmigo.|vinierais|venís|vendréis|너희가 나와 함께 왔으면 했습니다.|과거 희망절의 접속법 과거 vinierais입니다.',
'El profesor pidió que ___ silencio.|guardáramos|guardamos mañana|guardaremos|선생님은 우리가 조용히 하기를 요청했습니다.|과거 요청의 종속절은 guardáramos입니다.',
'Esperábamos que Ana ___ el examen.|aprobara|aprueba|aprobará|아나가 시험에 합격하길 바랐습니다.|과거 희망에 접속법 과거 aprobara입니다.']);
old('B2',2,'관계절의 대상이 실제로 특정되었는지 아직 조건에 맞는 대상을 찾는지 구분합니다.|존재가 불확실하거나 미정인 대상에는 접속법 관계절을 씁니다.|이미 알고 있는 구체적인 대상은 직설법을 사용하여 정보 상태의 차이를 드러냅니다.',[
'Necesito un empleado que ___ japonés.|sepa|sabe|saber|일본어를 아는 직원을 구합니다.|아직 특정되지 않은 대상의 조건은 sepa입니다.',
'Buscamos un hotel que ___ piscina.|tenga|tiene|tener|수영장이 있는 호텔을 찾고 있습니다.|조건에 맞는 미정 대상을 접속법으로 설명합니다.',
'No conozco a nadie que ___ aquí.|viva|vive|vivir|여기 사는 사람을 아무도 모릅니다.|존재를 부정한 선행사 뒤에는 viva입니다.']);
old('B2',3,'행동을 받는 대상을 주어로 한 수동 se인지 일반 사람의 행동을 말하는 비인칭 se인지 판단합니다.|수동 se는 대상과 동사의 수를 일치시킵니다.|사람 목적어에 a가 있는 비인칭 구문은 보통 동사를 단수로 유지합니다. 두 구조를 겉모양만으로 같게 처리하지 마세요.',[
'Se ___ bicicletas usadas.|venden|vende|vendiendo|중고 자전거들을 팝니다.|수동 se의 복수 대상 bicicletas에 venden입니다.',
'Aquí se ___ muy bien.|vive|viven|viviendo|여기서는 살기 아주 좋습니다.|일반적인 사람의 삶을 말하는 비인칭 단수 vive입니다.',
'Se ___ a los candidatos mañana.|entrevistará|entrevistarán|entrevistando|지원자들은 내일 면접을 받게 됩니다.|a가 있는 사람 목적어의 비인칭 se는 단수입니다.']);
add('B2','행위자를 밝히는 수동','ser + 분사 + por','대상이 어떤 행동을 받았는지 말하고 행위자를 por로 덧붙일 수 있습니다. 분사는 주어의 성·수에 일치합니다. 결과 상태를 말하는 estar+분사와도 비교해야 합니다.','원래 목적어를 문장의 주어로 바꿉니다.|ser를 시제·인칭에 맞추고 분사를 성·수에 일치시킵니다.|행위자가 필요하면 por 뒤에 덧붙입니다.','haber+분사와 달리 수동 분사는 일치합니다. La carta fue escrita와 Han escrito를 비교하세요.',[
'La carta fue ___ por Ana.|escrita|escrito|escribir|편지는 아나가 썼습니다.|여성 단수 주어 carta에 escrita입니다.',
'Los resultados fueron ___ ayer.|publicados|publicado|publicadas|결과들은 어제 발표되었습니다.|남성 복수 주어에 publicados입니다.',
'El museo fue construido ___ un arquitecto local.|por|para|desde|박물관은 지역 건축가가 지었습니다.|수동의 행위자는 por로 나타냅니다.']);
add('B2','예기치 않은 일','se + 간접목적어 + 동사','물건을 잃어버리거나 떨어뜨린 일을 비의도적인 사건으로 제시할 때 Se me cayó처럼 표현할 수 있습니다. 물건이 문법적 주어가 되므로 동사 수 일치가 중요합니다.','영향을 받은 사람을 me·te·le 등으로 표시합니다.|떨어지거나 잊힌 물건을 주어로 해석합니다.|동사를 그 물건의 단수·복수에 맞춥니다.','이 표현이 책임을 법적으로 없애는 것은 아닙니다. 사건을 바라보는 문법적 관점이 달라지는 것입니다.',[
'Se me ___ las llaves.|cayeron|cayó|caí|저는 열쇠들을 떨어뜨렸습니다.|복수 주어 las llaves에 cayeron입니다.',
'Se ___ olvidó la cita. (나에게)|me|yo|mí|저는 약속을 깜빡했습니다.|영향받은 사람은 간접목적어 me입니다.',
'Se nos ___ el vaso.|rompió|rompieron|rompimos|우리가 컵을 깨뜨렸습니다.|단수 물건 el vaso에 rompió입니다.']);
add('B2','먼저·나중에의 절','antes de que / después de que','시간 연결 뒤에 별도 주어를 가진 절을 쓸 수 있습니다. antes de que는 보통 접속법과 연결됩니다. después de que는 실제 과거인지 미실현 미래인지에 따라 직설법·접속법 선택이 달라집니다.','주어가 같으면 antes de salir처럼 원형 구성을 고려합니다.|별도 절이면 antes de que salga처럼 만듭니다.|미래 사건의 después de que에는 접속법을 사용합니다.','antes de que saldrá처럼 미래형을 그대로 넣지 않습니다. 완료된 과거의 después de que와 비교하세요.',[
'Saldré antes de que ___ la lluvia.|empiece|empezará|empezar|비가 시작되기 전에 나가겠습니다.|antes de que 뒤의 접속법 empiece입니다.',
'Te llamaré después de que ___ a casa.|llegue|llegaré|llegar|집에 도착한 뒤 전화하겠습니다.|미실현 미래 시간절에는 llegue입니다.',
'Antes de ___, apaga la luz.|salir|salgas|sales|나가기 전에 불을 꺼라.|같은 주체의 de 뒤에는 원형 salir입니다.']);
add('B2','다른 사람의 행동을 위한 목적','para que + subjuntivo','주절 행동의 목적이 다른 주체의 행동으로 이어질 때 para que+접속법을 사용합니다. 주체가 같은 목적은 para+원형으로 간단히 표현할 수 있습니다.','누가 주절 행동을 하고 누가 목적 행동을 하는지 구분합니다.|다른 주체라면 para que 뒤에 접속법을 둡니다.|과거 시점의 목적이면 시제 관계에 맞춰 접속법 과거를 고려합니다.','que만 보고 직설법을 넣지 않습니다. 목적의 미실현 성격이 접속법 선택에 중요합니다.',[
'Te lo explico para que lo ___.|entiendas|entiendes|entender|네가 이해하도록 설명해 줄게.|목적절의 다른 주체 tú에 entiendas입니다.',
'Abro la ventana para que ___ aire.|entre|entra|entrará|공기가 들어오도록 창문을 엽니다.|목적절의 접속법 entre입니다.',
'Estudio para ___ mejor.|trabajar|trabaje|trabajo|더 잘 일하기 위해 공부합니다.|같은 주체의 목적에는 para+원형입니다.']);
add('B2','감정과 평가의 접속법','me alegra que / es importante que','어떤 사실에 대한 감정·평가를 종속절로 나타낼 때 접속법을 사용합니다. 이미 사실로 알려진 내용이라도 접속법이 가능하므로 접속법을 무조건 불확실성이라고 생각하면 안 됩니다.','감정이나 평가를 주절에 둡니다.|que 뒤 행동의 주체를 정합니다.|그 주체에 맞는 접속법을 선택하고 사실 여부와 문법적 태도를 구분합니다.','Sé que viene는 아는 사실의 전달, Me alegra que venga는 그 사실에 대한 감정입니다.',[
'Me alegra que ___ aquí.|estés|estás|estar|네가 여기 있어서 기쁩니다.|감정의 대상 절에는 estés입니다.',
'Es importante que todos ___.|participen|participan|participar|모두 참여하는 것이 중요합니다.|평가절 뒤의 접속법 participen입니다.',
'Lamento que no ___ venir.|puedas|puedes|poder|네가 올 수 없어 유감입니다.|유감이라는 감정이 접속법을 요구합니다.']);
add('B2','하지 말라는 명령','no + 접속법 현재','tú의 부정 명령은 긍정 명령과 형태가 다릅니다. No hables처럼 접속법 현재 형태를 사용하며 목적어 대명사는 동사 앞에 놓습니다.','누구에게 명령하는지 인칭을 확인합니다.|no 뒤에 해당 인칭 접속법을 씁니다.|대명사는 no와 동사 사이에 배치합니다.','긍정 Dímelo와 부정 No me lo digas를 비교하세요. 긍정과 같은 위치에 대명사를 붙이지 않습니다.',[
'No ___ tan rápido. (hablar, tú)|hables|habla|hablas|그렇게 빨리 말하지 마.|tú 부정 명령은 hables입니다.',
'No ___ aquí. (venir, tú)|vengas|ven|vienes|여기로 오지 마.|venir의 접속법 vengas입니다.',
'No me lo ___. (decir, tú)|digas|di|dices|그것을 내게 말하지 마.|부정 명령에서는 대명사 뒤에 digas입니다.']);
add('B2','질문을 문장 안에 넣기','no sé qué / dónde / si','직접 질문을 안다·모르다·묻다 같은 동사의 내용으로 넣습니다. 의문사의 강세는 유지하며 예·아니요 질문은 si로 연결할 수 있습니다. 간접 질문 자체는 꼭 물음표로 감쌀 필요가 없습니다.','묻고 싶은 정보가 내용인지 양자 선택인지 확인합니다.|정보 질문에는 qué·dónde·cuándo 등을 사용합니다.|예·아니요 질문에는 강세 없는 si를 씁니다.','긍정 대답 sí와 조건·간접 질문의 si를 구별합니다. No sé dónde vive처럼 의문사 강세를 유지하세요.',[
'No sé ___ vive Ana.|dónde|donde de|qué de|아나가 어디 사는지 모릅니다.|장소의 간접 의문사 dónde입니다.',
'Quiero saber ___ vendrás.|si|sí|de que si de|네가 올지 알고 싶습니다.|예·아니요 질문을 넣는 si입니다.',
'Dime ___ necesitas.|qué|que de|cual de|무엇이 필요한지 말해 줘.|내용을 묻는 간접 의문사 qué입니다.']);
add('B2','대조와 정정','pero / sino / sino que','pero는 앞 내용을 유지하면서 대조를 더합니다. sino는 앞 내용을 부정한 뒤 올바른 대안을 정정할 때 씁니다. 뒤에 활용 동사가 포함된 별도 절이 오면 sino que가 기본입니다.','앞 절을 부정하는지 먼저 확인합니다.|단순 대조에는 pero, 잘못된 대안의 정정에는 sino를 고릅니다.|두 번째 부분이 독립적인 동사절이면 sino que로 연결합니다.','No es caro, pero es bueno와 No es caro, sino barato는 의미가 다릅니다. 모든 no 뒤에 sino가 오는 것은 아닙니다.',[
'No quiero té, ___ café.|sino|pero de|aunque de|차가 아니라 커피를 원합니다.|앞 대안을 부정하고 정정하므로 sino입니다.',
'Es caro, ___ es bueno.|pero|sino|sino que|비싸지만 좋습니다.|긍정 사실을 유지하는 대조는 pero입니다.',
'No estudia, ___ trabaja.|sino que|sino|pero de|공부하는 것이 아니라 일합니다.|정정 뒤가 동사절이므로 sino que입니다.']);
old('C1',0,'실제로 바꿀 수 없는 과거 상황을 반대로 가정하는지 확인합니다.|조건절에는 hubiera·hubiese+분사, 결과절에는 habría+분사가 대표적입니다.|현재와 다른 가정 Si tuviera와 과거 반사실 Si hubiera tenido를 시간축으로 구분합니다.',[
'Si hubieras venido, me ___ alegrado.|habría|habré|he|네가 왔더라면 나는 기뻤을 텐데.|과거 반사실의 결과는 habría+분사입니다.',
'Si lo ___ sabido antes, te habría llamado.|hubiera|habría|habré|미리 알았더라면 전화했을 텐데.|조건절은 접속법 대과거 hubiera sabido입니다.',
'Habríamos llegado si no ___ perdido el tren.|hubiéramos|habríamos|hemos|기차를 놓치지 않았더라면 도착했을 텐데.|과거 반사실 si절의 형태입니다.']);
old('C1',1,'앞 사실을 새 정보로 전달하는지, 가정하거나 이미 인정한 정보로 다루는지 구분합니다.|미실현·가정 양보에는 접속법을 사용합니다.|이미 사실인 내용도 결과에 중요하지 않다고 배경화하면 접속법이 가능합니다. 사실 여부와 법 선택을 일대일로 대응시키지 않습니다.',[
'Aunque mañana ___ frío, saldremos.|haga|hará|hacer|내일 춥더라도 나갈 것입니다.|미래의 가정 양보는 haga입니다.',
'Aunque me lo ___, no cambiaría de opinión.|pidieras|pedirías|pedir|네가 부탁하더라도 생각을 바꾸지 않을 텐데.|가정된 양보 조건에는 pidieras입니다.',
'Aunque ___ razón, no debes gritar.|tengas|tener|tendrá mañana|네 말이 맞더라도 소리치면 안 됩니다.|사실을 인정해도 결론이 달라지지 않는 양보입니다.']);
old('C1',2,'decir의 내용이 사실 전달인지 지시인지 파악합니다.|사실 전달에는 직설법, 행동 요청에는 que+접속법을 사용합니다.|과거 전달의 지시는 viniera·leyera 등으로 만들고 발화 시점과 실제 행동 시점을 구분합니다.',[
'Me dijo que ___ la puerta. (닫으라는 지시)|cerrara|cerraba|había cerrado|그는 제게 문을 닫으라고 했습니다.|지시 전달이므로 접속법 cerrara입니다.',
'Ana dijo que ___ cansada. (상태 전달)|estaba|estuviera|estar|아나는 피곤하다고 말했습니다.|상태 정보 전달이므로 직설법 estaba입니다.',
'Nos dijeron que ___ allí. (기다리라는 지시)|esperáramos|esperábamos|esperaríamos|우리에게 거기서 기다리라고 했습니다.|과거 지시의 간접 전달은 esperáramos입니다.']);
old('C1',3,'미래의 기준 시점 이전 완료인지 현재 결과를 보고 하는 과거 추측인지 확인합니다.|haber의 미래형과 분사를 결합합니다.|정황에 근거한 추측임을 문맥에서 드러내고 이미 확인한 사실의 현재완료와 구별합니다.',[
'No encuentro a Ana; ___ salido.|habrá|habría mañana|hubiera|아나가 안 보입니다. 아마 나갔을 것입니다.|현재 결과에서 추론하는 habrá salido입니다.',
'¿Dónde están las llaves? Las ___ dejado en casa.|habré|hubiera|había mañana|열쇠가 어디 있지? 아마 집에 두고 왔나 봅니다.|내가 한 일에 대한 추측은 habré dejado입니다.',
'Cuando llegues, ya ___ terminado.|habré|hubiera|había ayer|네가 도착할 때 나는 이미 끝냈을 것입니다.|미래 기준보다 앞선 완료입니다.']);
add('C1','완료된 일을 평가하기','haya + 과거분사','현재 시점에서 이미 완료된 사건에 감정·평가·의심을 표현할 때 접속법 현재완료를 사용할 수 있습니다. 완료 여부와 접속법의 선택 이유를 따로 생각하면 형태가 이해됩니다.','감정·평가 같은 주절을 고릅니다.|종속절 주어에 맞게 haya·hayas·hayamos·hayan을 씁니다.|완료 행동을 분사로 표현합니다.','Me alegra que vengas와 Me alegra que hayas venido는 시점이 다릅니다. 분사는 주어에 맞춰 바꾸지 않습니다.',[
'Me alegra que ___ venido.|hayas|has|habías|네가 와 주어서 기쁩니다.|완료된 방문을 현재 평가하므로 hayas venido입니다.',
'Es posible que ellos ___ salido.|hayan|han|habían|그들은 나갔을 수도 있습니다.|가능성 판단과 완료 사건을 결합합니다.',
'No creo que Ana lo ___ hecho.|haya|ha|había|아나가 그것을 했다고 생각하지 않습니다.|부정된 믿음의 완료절에는 haya hecho입니다.']);
add('C1','과거 시점의 앞선 바람·감정','hubiera + 분사','과거의 감정이나 평가 시점보다 더 앞서 완료된 사건을 접속법 대과거로 표현합니다. 조건문 이외에도 사용할 수 있는 형태입니다. haber의 접속법 과거와 불변 분사를 조합합니다.','감정·평가의 기준 시점이 과거인지 확인합니다.|그보다 앞선 사건에는 hubiera·hubiese+분사를 씁니다.|사건의 주체에 맞춰 hubieras·hubieran 등으로 바꿉니다.','Si 없이도 접속법 대과거가 쓰입니다. 과거의 감정·의심·부정된 판단 등의 절을 살펴보세요.',[
'Me alegró que ___ aprobado el examen.|hubieras|habías|habrías mañana|네가 시험에 합격했다는 것이 기뻤습니다.|과거 감정에 앞선 완료 사건입니다.',
'No creía que ellos ___ llegado.|hubieran|habían|habrán|그들이 도착했다고 생각하지 않았습니다.|과거 부정 판단의 선행 완료절입니다.',
'Lamenté que Ana no ___ podido venir.|hubiera|había|habrá|아나가 오지 못해서 유감이었습니다.|과거 감정에 대한 선행 사건에는 hubiera podido입니다.']);
add('C1','과거 상황을 추측하기','condicional de conjetura','조건법은 가정 결과뿐 아니라 과거 상황의 추측에도 사용됩니다. Tendría veinte años는 문맥에 따라 스무 살쯤이었을 것이라는 뜻입니다. 시간 정보와 근거를 함께 읽어야 합니다.','추정의 대상 시점이 과거인지 확인합니다.|과거 상태 추측에는 조건법 단순형을 씁니다.|더 앞서 완료된 사건 추측에는 habría+분사를 사용할 수 있습니다.','조건법을 언제나 가정의 결과로만 읽지 않습니다. si절이 없어도 추측 용법이 가능합니다.',[
'En aquella época, Ana ___ unos veinte años.|tendría|tendrá mañana|tener|그 시절 아나는 스무 살쯤이었을 것입니다.|과거 나이의 추측에 tendría입니다.',
'Serían las diez cuando ___.|llegó|llegará|llegar|그가 도착했을 때는 10시쯤이었을 것입니다.|과거 시각 추측과 과거 도착 사건을 결합합니다.',
'No estaba en casa; ___ salido antes.|habría|habrá mañana|haya|집에 없었습니다. 그 전에 나갔을 것입니다.|과거 기준에서 선행 사건을 추측합니다.']);
add('C1','아무리 해도라는 양보','por mucho que + subjuntivo','행동의 정도나 반복을 크게 가정해도 결과가 바뀌지 않는다는 표현입니다. 부정적 결과나 의지적인 결심과 자주 결합합니다. 정도 표현과 접속법을 함께 익히세요.','어떤 행동을 많이 하더라도라는 의미인지 확인합니다.|por mucho que 뒤에 적절한 접속법을 둡니다.|뒤 절에 유지되는 결과나 판단을 씁니다.','mucho가 명사를 꾸미면 성·수 변화가 필요할 수 있습니다. por muchos libros que lea처럼 구조를 구별합니다.',[
'Por mucho que ___, no lo entiendo.|estudie|estudiaré|estudiar|아무리 공부해도 이해하지 못합니다.|가정된 정도 양보에는 estudie입니다.',
'Por mucho que me lo ___, no aceptaré.|pidas|pedirás|pedir|네가 아무리 부탁해도 받아들이지 않을 것입니다.|양보절의 접속법 pidas입니다.',
'Por muchos libros que ___, siempre hay más que aprender.|lea|leerá|leer|아무리 책을 많이 읽어도 더 배울 것이 있습니다.|수량 양보절의 접속법 lea입니다.']);
add('C1','조건을 걸어 허용하기','con tal de que + subjuntivo','어떤 조건만 충족한다면 행동을 허용하거나 결과를 받아들이겠다는 표현입니다. 단순 조건 si보다 해당 조건을 전제로 삼는 태도가 강조됩니다.','허용의 전제 조건을 명확하게 정합니다.|con tal de que 뒤에 접속법을 씁니다.|주체가 같으면 con tal de+원형 형태도 비교할 수 있습니다.','de que를 모두 유지합니다. 접속법이 아니라 미래형을 바로 넣지 않도록 주의하세요.',[
'Puedes salir con tal de que ___ temprano.|vuelvas|volverás|vuelves siempre|일찍 돌아오기만 하면 나가도 돼.|허용 조건의 접속법 vuelvas입니다.',
'Aceptaré con tal de que todos ___ de acuerdo.|estén|están|estarán|모두 동의한다면 받아들이겠습니다.|조건절의 estar 접속법 estén입니다.',
'Te ayudaré con tal de que me ___ la verdad.|digas|dirás|dices siempre|진실을 말한다면 도와줄게.|정한 조건에 접속법 digas입니다.']);
add('C1','예외 조건 제시하기','a menos que / a no ser que','어떤 예외가 발생하지 않는 한 주절의 결과가 성립함을 나타냅니다. 기본적으로 접속법을 사용합니다. 긍정·부정 논리가 겹치므로 한국어 풀이로 의미를 확인하는 것이 좋습니다.','기본적으로 일어날 결과를 정합니다.|그 결과를 바꾸는 예외를 a menos que 뒤에 둡니다.|절 안에 불필요한 no를 더해 뜻을 반대로 만들지 않는지 확인합니다.','Iré a menos que llueva는 비가 오지 않으면 간다는 뜻입니다. 비가 와야 간다는 뜻이 아닙니다.',[
'Iremos a la playa a menos que ___.|llueva|lloverá|llover|비가 오지 않는 한 해변에 갈 것입니다.|예외 조건에는 llueva입니다.',
'No cambiaré el plan a no ser que tú lo ___.|pidas|pedirás|pedir|네가 요청하지 않는 한 계획을 바꾸지 않을 것입니다.|예외를 제시하는 접속법 pidas입니다.',
'La tienda abrirá a menos que ___ un problema.|haya|hay|habrá|문제가 생기지 않는 한 가게는 열 것입니다.|존재의 접속법 haya입니다.']);
add('C1','경고하는 조건','como + subjuntivo','문두의 como+접속법은 경고·위협의 조건을 나타낼 수 있습니다. 이유의 como+직설법과 다릅니다. 화자의 태도가 강해질 수 있어 실제 대화에서는 관계와 상황을 고려해야 합니다.','앞 절이 이유인지 경고의 조건인지 확인합니다.|경고 조건이면 접속법을 사용합니다.|뒤 절에는 조건이 실현될 때의 결과를 제시합니다.','Como estás cansado는 피곤하니까라는 이유, Como llegues tarde는 늦기만 하면이라는 경고입니다.',[
'Como ___ tarde, perderás el tren.|llegues|llegarás|llegar|늦으면 기차를 놓칠 거야.|경고 조건의 como 뒤에 llegues입니다.',
'Como no ___, no aprobarás.|estudies|estudiarás|estudiar|공부하지 않으면 합격하지 못할 거야.|경고하는 조건에 접속법 estudies입니다.',
'Como ___ frío, me quedo en casa. (실제 이유)|hace|haga|hacer|날씨가 추워서 집에 있습니다.|사실인 이유의 como는 직설법 hace입니다.']);
add('C1','과거에서 바라본 미래','dijo que + condicional','과거에 한 말의 시점에서 미래였던 사건을 간접화법으로 전달할 때 조건법을 사용합니다. 현재 화자의 미래와 과거 화자의 미래를 구분해야 합니다. 문맥에 따라 현재 사실을 유지하는 선택도 가능합니다.','원래 발화가 과거에 이루어졌는지 확인합니다.|그 시점에서 이후인 사건에 조건법을 고려합니다.|mañana→al día siguiente처럼 시간 표현도 관점에 맞춰 조정합니다.','조건법이라고 반드시 실현되지 않았다는 뜻은 아닙니다. 실제 실현 여부는 문맥이 결정합니다.',[
'Ana dijo que ___ al día siguiente.|vendría|viene ayer|venir|아나는 다음 날 오겠다고 말했습니다.|과거 발화에서 바라본 미래는 vendría입니다.',
'Prometió que nos ___ pronto.|llamaría|llama ayer|llamar|그는 곧 전화하겠다고 약속했습니다.|과거 약속 이후 행동에는 조건법입니다.',
'Pensé que el examen ___ fácil.|sería|es ayer|ser|시험이 쉬울 것이라고 생각했습니다.|과거 생각에서 이후 상황을 예상합니다.']);
old('C2',0,'어떤 경우라도 결과가 변하지 않는다는 의미를 확인합니다.|접속법+관계 표현+접속법으로 반복 구성을 만듭니다.|사람은 sea quien sea, 사건은 pase lo que pase처럼 자연스러운 결합을 익힙니다. 단순 사실 서술과 구별합니다.',[
'___ donde vivas, podrás estudiar.|Vivas|Vives|Vivirás|어디에 살든 공부할 수 있습니다.|자유선택 양보의 반복 접속법 Vivas donde vivas입니다.',
'___ lo que hagas, hazlo bien.|Hagas|Haces|Harás|무엇을 하든 잘해라.|Hagas lo que hagas의 양보 구성입니다.',
'___ quien venga, seremos amables.|Venga|Viene|Vendrá|누가 오든 친절하게 대하겠습니다.|불특정 주체의 자유선택 양보입니다.']);
old('C2',1,'사건 전체를 논의의 대상으로 삼으려는지 확인합니다.|el hecho de que 뒤에 절을 넣고 그 전체를 주어·보어 등으로 사용합니다.|접속법은 평가·전제·정보 상태와 관련되며 곧바로 거짓을 뜻하지 않습니다. 사실 제시와 배경화의 차이를 읽습니다.',[
'El hecho de que ___ joven no implica que sea inexperto.|sea|ser|siendo|젊다는 사실이 경험 부족을 뜻하지는 않습니다.|평가의 전제로 놓인 절의 접속법입니다.',
'El hecho de que haya fallado no significa que no ___.|pueda|poder|podrá mañana|실패했다는 사실이 할 수 없음을 뜻하지는 않습니다.|부정된 함의의 절에는 pueda입니다.',
'El hecho ___ que participe es positivo.|de|a|por|그가 참여한다는 사실은 긍정적입니다.|명사 hecho의 내용절을 de que로 연결합니다.']);
old('C2',2,'관계절 동사가 요구하는 전치사를 먼저 확인합니다. referirse a와 hablar de가 다릅니다.|관계 표현 el cual 계열을 선행사의 성·수에 맞춥니다.|a+el은 al, de+el은 del로 축약하며 전치사를 누락하지 않습니다. 격식 있는 글에서도 불필요하게 복잡하게 쓰지 마세요.',[
'La ciudad en ___ vivo es tranquila.|la cual|el cual|los cuales|제가 사는 도시는 조용합니다.|여성 단수 ciudad와 전치사 en에 la cual입니다.',
'Los temas de ___ hablamos son importantes.|los cuales|la cual|el cual|우리가 이야기한 주제들은 중요합니다.|hablar de와 남성 복수 선행사에 los cuales입니다.',
'El motivo por ___ vine es personal.|el cual|la cual|las cuales|제가 온 이유는 개인적인 것입니다.|남성 단수 motivo에 el cual입니다.']);
old('C2',3,'조건절을 문어적으로 압축하려는지 확인합니다.|현재·미래 조건은 de+원형, 과거 조건은 de haber+분사로 만들 수 있습니다.|주체가 다른 경우 누구의 행동인지 명확히 하고, 필요하면 si절로 풀어 의미를 검증합니다.',[
'De ___ tiempo, te ayudaría.|tener|tengo|tendré|시간이 있다면 도와줄 텐데.|de+원형이 가정 조건을 압축합니다.',
'De haber ___ antes, habría conseguido entradas.|llegado|llegando|llegar|더 일찍 도착했더라면 표를 구했을 텐데.|de haber 뒤에는 분사입니다.',
'De ___ cierto, sería grave.|ser|es|será|사실이라면 심각할 것입니다.|de ser가 조건을 압축합니다.']);
add('C2','독립 분사구문','분사 + 명사, 주절','완료된 사건이나 전제 상황을 분사구로 압축하여 본문 앞에 둘 수 있습니다. 분사는 함께 오는 명사와 성·수에 맞습니다. 문어적인 문체에서 시간·이유 관계를 간결하게 표현합니다.','먼저 끝난 사건을 명사와 분사로 요약합니다.|분사를 명사의 성·수에 맞춥니다.|쉼표 뒤에 이어지는 주절과 논리·시간 관계를 확인합니다.','haber+분사와 달리 일치가 필요합니다. Terminada la reunión에서 reunión의 여성 단수에 맞춥니다.',[
'___ la reunión, salimos.|Terminada|Terminado|Terminados|회의가 끝난 뒤 나갔습니다.|여성 단수 reunión에 Terminada입니다.',
'___ los documentos, firmamos el contrato.|Revisados|Revisado|Revisadas|서류들을 검토한 뒤 계약서에 서명했습니다.|남성 복수 documentos에 Revisados입니다.',
'___ las dudas, continuamos.|Aclaradas|Aclarado|Aclarados|의문점들이 해소되자 계속했습니다.|여성 복수 dudas에 Aclaradas입니다.']);
add('C2','동명사구문의 주체와 시간','gerundio의 동시·선행 관계','동명사구문은 주절과 동시에 일어나거나 앞서 일어난 상황 등을 표현할 수 있습니다. 누구의 행동인지 모호하지 않아야 하며, 단순한 뒤 사건을 무턱대고 연결하는 방식은 격식 있는 글에서 피하는 것이 좋습니다.','동명사의 주체가 누구인지 명시적으로 확인합니다.|주절과의 동시·방법·원인 같은 관계를 판단합니다.|완료 선행은 habiendo+분사로 표현할 수 있습니다.','주어가 모호한 매달린 수식이나 단순한 시간상 후속 사건을 기계적으로 동명사로 연결하지 마세요.',[
'___ terminado el trabajo, pudimos descansar.|Habiendo|Haber|Había|일을 마친 뒤 쉴 수 있었습니다.|선행 완료를 나타내는 habiendo+분사입니다.',
'Aprendió español ___ con sus amigos.|hablando|hablar|hablado|친구들과 대화하며 스페인어를 배웠습니다.|방법·동시 행동을 나타내는 동명사입니다.',
'___ la noticia, Ana sonrió.|Leyendo|Leer|Leído|뉴스를 읽으며 아나는 미소 지었습니다.|같은 주체 Ana의 동시 행동입니다.']);
add('C2','불특정 사람·장소','quienquiera que / dondequiera que','누구이든·어디이든이라는 불특정성을 강조하는 관계 표현입니다. 뒤에 접속법을 사용하며 격식 있는 글이나 강조된 문맥에서 자주 나타납니다. 상대적으로 간단한 sea quien sea와도 비교하세요.','불특정 대상이 사람인지 장소인지 구분합니다.|quienquiera que 또는 dondequiera que로 연결합니다.|뒤 절의 인칭과 시점에 맞는 접속법을 고릅니다.','quien quiera는 원할 사람이라는 별도 해석이 가능합니다. 띄어쓰기와 고정 결합을 확인하세요.',[
'Quienquiera que ___, debe respetar las normas.|sea|es|ser|누구이든 규칙을 지켜야 합니다.|불특정성을 나타내는 접속법 sea입니다.',
'Dondequiera que ___, llevaré este libro.|vaya|voy|iré|어디를 가든 이 책을 가져가겠습니다.|불특정 장소 뒤에는 vaya입니다.',
'Quienquiera que ___ participar puede escribirnos.|quiera|quiere|querrá|참여하고 싶은 누구든 우리에게 편지할 수 있습니다.|불특정 상대의 의지를 접속법으로 표현합니다.']);
add('C2','사실을 인정하는 문어적 양보','si bien + 직설법','앞의 사실을 인정하면서 논의의 제한이나 반대 측면을 덧붙이는 연결입니다. 조건 si와 달리 뜻은 비록·그렇기는 하지만에 가깝습니다. 논설문에서 사실의 균형을 잡을 때 사용할 수 있습니다.','먼저 인정할 사실을 고릅니다.|si bien 뒤에 직설법으로 그 사실을 제시합니다.|뒤 절에 제한점·다른 측면을 구체적으로 더합니다.','이 표현을 접속법 조건 공식으로 처리하지 않습니다. si bien 자체가 양보 연결입니다.',[
'Si bien el método ___ útil, tiene límites.|es|sea|ser|그 방법은 유용하지만 한계가 있습니다.|인정하는 사실은 직설법 es입니다.',
'Si bien ___ mucho, no lo sabía todo.|sabía|supiera|saber|많이 알기는 했지만 모든 것을 알지는 못했습니다.|과거의 사실을 직설법 sabía로 인정합니다.',
'Si bien los costes ___, la calidad mejoró.|aumentaron|aumentaran|aumentar|비용이 늘기는 했지만 품질이 좋아졌습니다.|실제 사건을 직설법 과거로 제시합니다.']);
add('C2','오해한 원인을 정정하기','no es que… sino que…','상대가 생각할 수 있는 이유·해석을 부정하고 실제 이유를 설명합니다. 부정되는 해석 뒤에는 접속법이 자주 쓰이고 실제 설명은 직설법으로 제시할 수 있습니다.','먼저 부정할 해석을 no es que 뒤에 둡니다.|그 절을 접속법으로 만들고 상대의 추정을 부정합니다.|sino que 뒤에 실제 상황을 구체적으로 설명합니다.','단순한 사실 부정과 다릅니다. 상황의 해석이나 원인을 정정하는 담화 구조입니다.',[
'No es que no ___, sino que no tengo tiempo.|quiera|quiero|querré|하고 싶지 않은 것이 아니라 시간이 없습니다.|부정되는 해석의 절에 quiera입니다.',
'No es que ___ difícil, sino que requiere práctica.|sea|es|será|어려운 것이 아니라 연습이 필요합니다.|부정한 평가를 접속법 sea로 표현합니다.',
'No es que no te ___, sino que necesito pensar.|crea|creo|creeré|너를 믿지 않는 것이 아니라 생각할 시간이 필요합니다.|믿지 않는다는 해석을 접속법으로 부정합니다.']);
add('C2','정도를 강조하는 명사화','lo + 형용사·부사 + que','얼마나 어떤지라는 정도를 명사구처럼 강조합니다. lo는 중성이지만 뒤 형용사는 그 성질을 가진 대상과 성·수가 일치할 수 있습니다. 단순 남성 관사 el과 구별하세요.','강조할 성질과 그 대상이 무엇인지 확인합니다.|lo 뒤에 형용사 또는 부사를 놓습니다.|que절로 실제 대상·상황을 밝힙니다.','No sabes lo cansada que estoy에서 cansada는 여성 화자를 나타냅니다. lo 때문에 무조건 남성형이 되는 것이 아닙니다.',[
'No sabes lo ___ que estoy. (여성 화자)|cansada|cansado|cansados|내가 얼마나 피곤한지 넌 몰라.|형용사는 여성 화자와 일치합니다.',
'Me sorprendió lo ___ que habla.|bien|bueno|buena|그가 얼마나 잘 말하는지 놀랐습니다.|동작 habla의 정도는 부사 bien입니다.',
'No imaginas lo ___ que son estas cajas.|pesadas|pesado|pesada|이 상자들이 얼마나 무거운지 상상 못 할 겁니다.|여성 복수 cajas에 pesadas입니다.']);
add('C2','한 요소에 초점 맞추기','fue… quien / fue… donde','문장의 특정 인물·장소·시간에 초점을 맞춰 강조합니다. 무엇을 강조하느냐에 따라 관계 표현이 달라집니다. 정보의 내용 자체보다 독자가 주목할 부분을 조절하는 구조입니다.','중립 문장에서 강조할 요소 하나를 고릅니다.|ser 뒤에 그 요소를 놓습니다.|인물이면 quien, 장소면 donde 등 알맞은 연결로 나머지를 이어 줍니다.','모든 구성에서 같은 관계어를 기계적으로 쓰지 않습니다. 지역과 문체에 따른 다른 초점 구조도 존재합니다.',[
'Fue Ana ___ encontró la solución.|quien|donde|cuando|해결책을 찾은 사람은 아나였습니다.|인물 Ana에 초점을 맞춰 quien입니다.',
'Fue en Madrid ___ nos conocimos.|donde|quien|cuyo|우리가 만난 곳은 마드리드였습니다.|장소 강조에는 donde입니다.',
'Fue ayer ___ recibí la noticia.|cuando|quien|cuyo|소식을 받은 때는 바로 어제였습니다.|시간을 강조하므로 cuando입니다.']);
add('C2','정중함을 조절하는 접속법 과거','quisiera / pudiera','접속법 과거 형태가 정중한 바람·요청의 고정된 문맥에서 쓰일 수 있습니다. 조건법 querría·podría와 의미가 겹치기도 하지만 모든 동사를 같은 방식으로 자유롭게 바꿀 수는 없습니다.','정중히 원하는 것인지 먼저 확인합니다.|quisiera처럼 자주 쓰는 완곡 표현을 익힙니다.|상대에게 부담을 주지 않도록 요청 내용을 구체적으로 말합니다.','접속법 과거라고 반드시 과거 사건인 것은 아닙니다. 지금의 요청을 부드럽게 전달할 수 있습니다.',[
'___ hacer una pregunta, por favor.|Quisiera|Quise ayer|Querrás|질문 하나 드리고 싶습니다.|현재의 정중한 바람을 나타내는 Quisiera입니다.',
'Si ___ ayudarme, se lo agradecería.|pudiera|podría|podrá|도와주실 수 있다면 감사하겠습니다.|조건절의 접속법 과거 pudiera입니다.',
'___ saber si hay plazas disponibles.|Quisiera|Querrás|Quise mañana|빈자리가 있는지 알고 싶습니다.|완곡한 현재 요청의 Quisiera입니다.']);
})();
