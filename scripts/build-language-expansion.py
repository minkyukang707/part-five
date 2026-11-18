"""Build attributed sentence practice and 2,000-word courses from local OMW/ManyThings exports."""
import collections, hashlib, json, re, subprocess, sys, zipfile
from pathlib import Path

out = Path(__file__).resolve().parent.parent / 'site'
lex = Path(sys.argv[1])
meaning_overrides=json.loads((Path(__file__).parent/'language-meaning-overrides.json').read_text(encoding='utf-8'))
if len(sys.argv)>2:
 base=json.loads(Path(sys.argv[2]).read_text(encoding='utf-8'))
else:
 base=json.loads(subprocess.check_output(['node','-e',"const fs=require('fs'),vm=require('vm');const c=vm.runInNewContext(fs.readFileSync(process.argv[1],'utf8')+';LANGUAGE_COURSES');process.stdout.write(JSON.stringify(c));",str(out/'languages-data.js')],encoding='utf-8'))
topics = {
 'daily': ('일상', r'home|house|family|mother|father|sister|brother|sleep|morning|bed|room|friend'),
 'travel': ('여행', r'travel|trip|hotel|airport|train|ticket|station|flight|passport|tourist|bus|vacation|beach'),
 'school': ('학교', r'school|student|teacher|class|lesson|exam|study|learn|homework|university|library|book'),
 'sport': ('운동', r'sport|soccer|football|tennis|swim|running|exercise|basketball|baseball|team|race|athlete|gym'),
 'food': ('음식·쇼핑', r'food|eat|dinner|lunch|breakfast|cook|restaurant|coffee|tea|shop|buy|price|money|store|bread'),
 'work': ('직장·사회', r'work|office|job|meeting|company|business|manager|report|project|computer|employee'),
 'health': ('건강·자연', r'health|doctor|hospital|sick|pain|medicine|weather|rain|snow|tree|animal|flower|mountain'),
 'culture': ('문화·취미', r'music|movie|film|sing|song|guitar|piano|art|museum|dance|picture|game|hobby'),
}
def genre(text):
 return next((key for key, (_, regex) in topics.items() if re.search(r'\b(?:'+regex+r')(?:s|es|ing|ed)?\b',text,re.I)), 'general')

specs = {
 'ja': [
 ('past','과거',r'ました',3,'ました는 정중한 과거 긍정형입니다.'),('negative','부정',r'ません',2,'ません은 정중한 부정을 나타냅니다.'),
 ('request','부탁',r'ください',2,'て형 뒤 ください는 정중한 부탁입니다.'),('reason','이유',r'から',3,'から는 출발점 또는 이유를 나타냅니다. 원문에서의 역할을 확인하세요.'),
 ('limit','범위',r'まで',2,'までは 시간이나 공간의 끝을 나타냅니다.'),('comparison','비교',r'より',3,'より는 비교 기준을 표시합니다.'),
 ('condition','조건',r'なら',4,'なら는 주어진 상황이나 조건을 전제로 합니다.'),('concession','양보',r'ても',4,'ても는 조건에 상관없는 결과를 나타냅니다.'),
 ('experience','경험',r'ことが',4,'동사 뒤 こと는 동작을 명사처럼 다루게 합니다.'),('purpose','목적',r'ため',4,'ため는 목적 또는 원인을 나타냅니다.'),
 ('progress','진행',r'ています',3,'ています는 진행 또는 결과 상태를 나타냅니다.'),('wish','희망',r'たい',3,'たい는 화자의 희망을 나타냅니다.'),
 ('obligation','의무',r'なければ',5,'なければ는 부정 조건형이며 의무 표현에도 쓰입니다.'),('hearsay','전언',r'そう',4,'そう의 의미는 앞에 오는 동사·형용사의 형태에 따라 달라집니다.'),
 ('nominal','명사화',r'こと',3,'こと는 동작이나 상황을 명사화합니다.'),('only','한정',r'だけ',2,'だけ는 범위를 한정합니다.'),
 ('also','첨가',r'も',1,'も는 같은 성질이나 대상을 더합니다.'),('object','목적격',r'を',1,'を는 목적어나 이동 경로를 나타냅니다.'),
 ('place','장소·수단',r'で',1,'で는 동작의 장소나 수단을 나타냅니다.'),('goal','도착점·시간',r'に',1,'に는 도착점·시각·대상을 나타냅니다.'),
 ('possess','명사 연결',r'の',1,'の는 명사 사이의 관계를 나타냅니다.'),('topic','화제',r'は',1,'は는 문장의 화제 또는 대조를 나타냅니다.'),
 ('subject','주격',r'が',2,'が는 주어나 초점을 표시합니다.'),('and','동반·인용',r'と',2,'とは 동반·병렬·인용에 쓰입니다.')],
 'es': [
 ('perfect','완료',r'\b(?:he|has|ha|hemos|han)\b',4,'haber의 현재형과 과거분사를 연결해 현재완료를 만듭니다. 문맥에서 조동사의 역할을 확인하세요.'),
 ('future','가까운 미래',r'\b(?:voy|vas|va|vamos|van) a\b',3,'ir a + 동사원형은 계획이나 가까운 미래를 나타냅니다.'),
 ('progress','진행',r'\b(?:estoy|estás|está|estamos|están)\b',2,'estar는 상태·위치를 나타내며 현재분사와 함께 진행형을 만듭니다.'),
 ('identity','신분·특징',r'\b(?:soy|eres|somos|son|es)\b',1,'ser의 활용형을 주어의 인칭·수에 맞춥니다.'),
 ('possession','소유·나이',r'\b(?:tengo|tienes|tiene|tenemos|tienen)\b',2,'tener는 소유·나이·의무 표현에 쓰입니다.'),
 ('ability','가능',r'\b(?:puedo|puedes|puede|podemos|pueden)\b',3,'poder + 동사원형은 능력이나 가능성을 나타냅니다.'),
 ('wish','원함',r'\b(?:quiero|quieres|quiere|queremos|quieren)\b',2,'querer는 목적어나 동사원형과 연결되어 바람을 나타냅니다.'),
 ('duty','의무',r'\b(?:debo|debes|debe|debemos|deben)\b',4,'deber + 동사원형은 의무나 당위를 나타냅니다.'),
 ('conditional','조건 접속',r'\bsi\b',4,'si는 조건절을 이끕니다. 강세가 있는 sí와 구별하세요.'),('cause','이유 접속',r'\bporque\b',3,'porque는 원인이나 이유를 설명합니다.'),
 ('contrast','대조 접속',r'\bpero\b',2,'pero는 앞 내용과 대조되는 내용을 연결합니다.'),('concession','양보 접속',r'\baunque\b',5,'aunque는 양보를 나타내며 사실성에 따라 서법이 달라집니다.'),
 ('time','시간 접속',r'\bcuando\b',3,'cuando는 시간 관계를 나타냅니다.'),('purpose','목적 전치사',r'\bpara\b',2,'para는 목적·수혜자·기한을 나타냅니다.'),
 ('reasonprep','원인·경로',r'\bpor\b',3,'por는 이유·수단·경로 등에 쓰입니다.'),('with','동반',r'\bcon\b',1,'con은 동반이나 수단을 나타냅니다.'),
 ('without','결여',r'\bsin\b',2,'sin은 어떤 것이 없음을 나타냅니다.'),('from','출발',r'\bdesde\b',2,'desde는 시간·공간의 시작점을 표시합니다.'),
 ('until','끝점',r'\bhasta\b',2,'hasta는 시간·공간의 끝점을 표시합니다.'),('between','사이',r'\bentre\b',2,'entre는 둘 이상의 대상 사이를 나타냅니다.'),
 ('negation','부정 부사',r'\b(?:nunca|tampoco|no)\b',1,'부정어의 위치와 원문의 부정 의미를 확인하세요.'),('quantity','수량',r'\b(?:mucho|muchos|mucha|muchas)\b',2,'명사를 수식하는 mucho는 명사의 성·수와 일치합니다.'),
 ('reflexive','대명사',r'\b(?:me|te|nos|se)\b',3,'목적 대명사·재귀 대명사는 동사와 주어의 관계에 따라 달라집니다.'),('article','관사',r'\b(?:el|la|los|las|un|una)\b',1,'관사는 명사의 성·수 및 특정성에 맞춥니다.')],
 'tr': [
 ('progress','현재진행',r'\b\w+yor(?:um|sun|uz|sunuz|lar)?\b',2,'-yor는 현재진행을 나타내며 뒤에 인칭 어미가 붙습니다.'),
 ('past','과거',r'\b\w+(?:dı|di|du|dü|tı|ti|tu|tü)(?:m|n|k|nız|niz|lar|ler)?\b',3,'과거 어미 -DI는 모음 조화와 자음 동화에 따라 달라집니다.'),
 ('future','미래',r'\b\w+(?:acak|ecek|acağım|eceğim|acaksın|eceksin)\b',4,'미래 어미 -(y)AcAk은 모음 조화와 어간 연결에 주의합니다.'),
 ('reported','전언 과거',r'\b\w+(?:mış|miş|muş|müş)\b',5,'-mIş는 전해 들었거나 뒤늦게 알게 된 사실을 표현할 수 있습니다.'),
 ('necessity','필요',r'\b(?:gerek|lazım|zorunda)\b',4,'필요나 의무를 나타내는 표현의 연결 방식을 확인하세요.'),
 ('because','이유 접속',r'\bçünkü\b',3,'çünkü는 이유를 설명하는 절을 연결합니다.'),('contrast','대조',r'\b(?:ama|fakat)\b',2,'ama와 fakat은 대조되는 내용을 연결합니다.'),
 ('if','조건',r'\beğer\b',4,'eğer는 조건을 도입하며 조건 어미와 함께 쓰입니다.'),('purpose','목적·이유',r'\biçin\b',2,'için은 앞 명사나 명사화 표현의 목적·이유를 나타냅니다.'),
 ('like','비교·유사',r'\bgibi\b',3,'gibi는 유사성이나 예시를 나타내는 후치사입니다.'),('until','정도·끝점',r'\bkadar\b',3,'kadar는 정도·비교·끝점을 나타냅니다.'),
 ('after','이후',r'\bsonra\b',2,'sonra는 뒤의 시간 순서를 나타냅니다.'),('before','이전',r'\bönce\b',2,'önce는 앞의 시간 순서를 나타냅니다.'),
 ('with','동반·수단',r'\bile\b',1,'ile는 동반 또는 수단을 나타냅니다.'),('exist','존재',r'\bvar\b',1,'var는 존재를 나타냅니다.'),('absent','부재',r'\byok\b',1,'yok은 존재하지 않음을 나타냅니다.'),
 ('not','명사문 부정',r'\bdeğil(?:im|sin|iz|siniz|ler)?\b',2,'명사문은 değil에 인칭 어미를 붙여 부정합니다.'),
 ('question','의문',r'\b(?:mı|mi|mu|mü)(?:sın|sin|sun|sün|yım|yim|yum|yüm)?\b',1,'의문소 mI는 따로 쓰고 앞 모음에 조화됩니다.'),
 ('locative','위치',r'\b\w+(?:da|de|ta|te)\b',2,'-DA형 위치 표현을 원문 문맥과 함께 확인합니다. 같은 철자의 다른 단어도 문맥으로 구분합니다.'),
 ('ablative','출발·분리',r'\b\w+(?:dan|den|tan|ten)\b',3,'-DAn형은 출발·분리·이유 등을 나타냅니다.'),
 ('plural','복수',r'\b\w+(?:lar|ler)\b',1,'복수 어미 -lAr는 모음 조화에 맞춰 붙습니다.'),
 ('infinitive','동사원형',r'\b\w+(?:mak|mek)\b',3,'-mAk은 동작을 이름처럼 나타내는 동사원형 어미입니다.'),
 ('quantity','수량',r'\b(?:çok|az|birkaç|birçok)\b',1,'수량 표현이 가리키는 명사나 동작의 정도를 확인하세요.'),('frequency','빈도',r'\b(?:hep|bazen|asla|genellikle)\b',2,'빈도 부사의 뜻에 맞게 문장을 해석하세요.')]
}
z=zipfile.ZipFile(lex/'extended.zip')
def lemmas(lang):
 result=collections.defaultdict(list)
 for line in z.read('extended_omw/wikt/wn-wikt-'+lang+'.tab').decode().splitlines():
  f=line.split('\t')
  if len(f)==3 and f[1]==lang+':lemma':result[f[0]].append(f[2].replace('_',' '))
 return result
ko=lemmas('kor'); expanded={}
turkish_lemmas=lemmas('tur')
turkish_verbs={w[:-3] for syn,terms in turkish_lemmas.items() if syn.endswith('-v') for w in terms if w.endswith(('mak','mek'))}

def valid_turkish(topic,target):
 t=target.lower()
 if topic=='past':
  m=re.fullmatch(r'(.+?)(?:dı|di|du|dü|tı|ti|tu|tü)(?:m|n|k|nız|niz|lar|ler)?',t)
  stem=m[1] if m else ''
  roots={stem,stem[:-2] if stem.endswith(('ma','me')) else stem}
  return bool(roots & turkish_verbs)
 if topic in ('locative','ablative'):
  size=2 if topic=='locative' else 3
  stem,suffix=t[:-size],t[-size:]
  if not stem:return False
  expected='t' if stem[-1] in 'çfhkpsşt' else 'd'
  vowels=[c for c in stem if c in 'aeıioöuü']
  return bool(vowels) and suffix[0]==expected and suffix[1]==('a' if vowels[-1] in 'aıou' else 'e')
 return True

for code,iso in [('ja','jpn'),('es','spa'),('tr','tur')]:
 with zipfile.ZipFile(lex/(iso+'.zip')) as corpus:
  lines=corpus.read(iso+'.txt').decode('utf-8-sig').splitlines()
 sentences=[];frequency=collections.Counter()
 for line in lines:
  fields=line.split('\t')
  if len(fields)<3:continue
  en,native,credit=fields[:3]
  if not 12<=len(native)<=160 or not 15<=len(en)<=180:continue
  if re.search(r'kill|murder|rape|suicide|sex|nigger|fuck',en,re.I):continue
  sentences.append((en,native,credit));frequency.update(re.findall(r'\w+',native.lower()))
 # ICU word boundaries avoid selecting a particle inside a Japanese lexical word
 # (for example, the mo in itsumo). They also improve vocabulary frequency ranking.
 boundaries=[]
 if code=='ja':
  segmented=json.loads(subprocess.run(['node','-e',"const fs=require('fs'),s=new Intl.Segmenter('ja',{granularity:'word'});process.stdout.write(JSON.stringify(JSON.parse(fs.readFileSync(0,'utf8')).map(t=>Array.from(s.segment(t),x=>[x.segment,x.index]))));"],input=json.dumps([row[1] for row in sentences],ensure_ascii=False),capture_output=True,encoding='utf-8',check=True).stdout)
  frequency=collections.Counter()
  for tokens in segmented:
   frequency.update(token for token,index in tokens)
   boundaries.append(({index for token,index in tokens},{index+len(token) for token,index in tokens}))
 wordmap={}
 for syn,terms in lemmas(iso).items():
  meanings=[w.replace('일어낟','일어나다') for w in ko.get(syn,[]) if re.fullmatch(r'[가-힣][가-힣 ·-]{0,27}',w) and w not in {'씹','좆물','계집','마누라'}]
  if not meanings:continue
  for word in terms:
   if not 1<len(word)<28 or re.search(r'[\d()/:;]',word) or word[:1].isupper():continue
   wordmap.setdefault(word,[]).extend(meanings)
 existing=base[code]['words'];seen={w['word'].casefold() for w in existing}
 words=list(existing)
 candidates=sorted(wordmap,key=lambda w:(-frequency[w.lower()],len(w),w))
 for word in candidates:
  if word.casefold() in seen:continue
  seen.add(word.casefold());i=len(words)
  words.append(dict(key=code+'-lex-'+hashlib.sha256(word.encode()).hexdigest()[:12],word=word,reading='',meanings=list(dict.fromkeys(wordmap[word]))[:6],set=i//30,source='Extended OMW / Wiktionary · 한국어 동의어 집합 연결'))
  if len(words)==2000:break
 for word in words:
  if word['word'] in meaning_overrides[code]:
   word['meanings']=meaning_overrides[code][word['word']]
   word['source']='기본 뜻 편집 보정 · Extended OMW / Wiktionary'
 assert len(words)==2000,(code,len(words))
 buckets=collections.defaultdict(list)
 compiled=[(topic,label,re.compile(regex,re.I),stage,why) for topic,label,regex,stage,why in specs[code]]
 for sentence_index,(en,native,credit) in enumerate(sentences):
  for topic,label,regex,stage,why in compiled:
   matches=regex.finditer(native)
   match=next((m for m in matches if
       (code!='ja' or (m.start() in boundaries[sentence_index][0] and m.end() in boundaries[sentence_index][1])) and
       (code!='tr' or valid_turkish(topic,m.group()))),None)
   if match:
    buckets[(genre(en),topic)].append((en,native,credit,match.group(),match.span(),label,stage,why));break
 questions=[]; seen_sentences=set()
 for (category,topic),pool in sorted(buckets.items()):
  targets=list(dict.fromkeys(row[3].lower() for row in pool))
  fallback={'ja':['だけ','まで','から','より','こと','ください'],'es':['siempre','nunca','antes','después','pero','porque'],'tr':['çünkü','ama','önce','sonra','gibi','için']}[code]
  diverse=sorted(pool,key=lambda row:hashlib.sha256(row[1].encode()).digest())
  for en,native,credit,target,span,label,stage,why in diverse[:12]:
   if native in seen_sentences:continue
   alternatives=[t for t in targets+fallback if t!=target and t.casefold()!=target.casefold()]
   offset=int(hashlib.sha256(native.encode()).hexdigest()[:8],16)%max(1,len(alternatives))
   alternatives=alternatives[offset:]+alternatives[:offset]
   alternatives=list(dict.fromkeys(alternatives))
   if target[0].isupper():alternatives=[t[0].upper()+t[1:] for t in alternatives]
   options=[target]+alternatives[:3]
   if len(options)!=4:continue
   seen_sentences.add(native)
   questions.append(dict(key=code+'-source-'+hashlib.sha256(native.encode()).hexdigest()[:16],topic='source-'+topic,label='원문 복원 · '+label,stage=stage,genre=category,sourceExercise=True,stem=native[:span[0]]+'____'+native[span[1]:],answer=target,options=options,meaning='원문 의미(영어) · '+en,reading='',why='원문에서 사용한 표현은 '+target+'입니다. '+why+' 다른 표현이 가능한 문장도 있으므로 제시된 원문 의미와 표현을 함께 익히세요.\n'+credit))
 # The UI interleaves least-seen questions from different pattern groups.
 expanded[code]={'words':words,'questions':base[code]['questions']+questions,'genres':{'all':'전체 주제',**{k:v[0] for k,v in topics.items()},'general':'기타 표현'}}
 print(code,len(words),'words',len(questions),'new sentences',len(buckets),'topic/pattern groups')
text='const LANGUAGE_EXPANSION='+json.dumps(expanded,ensure_ascii=False,separators=(',',':'))+';\n'
text+="if(typeof LANGUAGE_COURSES!=='undefined')for(const [code,data] of Object.entries(LANGUAGE_EXPANSION))Object.assign(LANGUAGE_COURSES[code],data);\nif(typeof module!=='undefined')module.exports=LANGUAGE_EXPANSION;\n"
(out/'languages-expansion.js').write_text(text,encoding='utf-8')
if (Path(__file__).parent/'language-ko-hints.json').exists():
 subprocess.run(['node',str(Path(__file__).parent/'apply-language-review.cjs')],check=True)
