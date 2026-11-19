'use strict';
const JapaneseReading=(()=>{
  const rows=[['あいうえお','아이우에오'],['かきくけこ','카키쿠케코'],['さしすせそ','사시스세소'],['たちつてと','타치츠테토'],['なにぬねの','나니누네노'],['はひふへほ','하히후헤호'],['まみむめも','마미무메모'],['やゆよ','야유요'],['らりるれろ','라리루레로'],['わをん','와오응'],['がぎぐげご','가기구게고'],['ざじずぜぞ','자지즈제조'],['だぢづでど','다지즈데도'],['ばびぶべぼ','바비부베보'],['ぱぴぷぺぽ','파피푸페포']];
  const map=Object.fromEntries(rows.flatMap(([a,b])=>Array.from(a,(c,i)=>[c,b[i]])));
  for(const [head,korean] of [['き','캬큐쿄'],['ぎ','갸규교'],['し','샤슈쇼'],['じ','자주조'],['ち','차추초'],['に','냐뉴뇨'],['ひ','햐휴효'],['び','뱌뷰뵤'],['ぴ','퍄퓨표'],['み','먀뮤묘'],['り','랴류료']])Array.from('ゃゅょ').forEach((tail,i)=>map[head+tail]=korean[i]);
  Object.assign(map,{'ふぁ':'파','ふぃ':'피','ふぇ':'페','ふぉ':'포','てぃ':'티','でぃ':'디','とぅ':'투','どぅ':'두','しぇ':'셰','じぇ':'제','ちぇ':'체','うぃ':'위','うぇ':'웨','うぉ':'워','ゔ':'부','ゔぁ':'바','ゔぃ':'비','ゔぇ':'베','ゔぉ':'보','ぁ':'아','ぃ':'이','ぅ':'우','ぇ':'에','ぉ':'오'});
  const hiragana=s=>s.normalize('NFKC').replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60));
  const vowels=['아','애','야','얘','어','에','여','예','오','와','왜','외','요','우','워','웨','위','유','으','의','이'];
  function korean(input){
    const kana=hiragana(input),out=[];
    const coda=n=>{const last=out.at(-1),code=last?.charCodeAt(0)-0xac00;if(code>=0&&code<11172&&code%28===0)out[out.length-1]=String.fromCharCode(0xac00+code+n);else out.push(n===1?'ㄱ':n===17?'ㅂ':'ㄴ');};
    for(let i=0;i<kana.length;i++){
      const c=kana[i],next=kana[i+1];
      if(c==='っ'){coda(/[かきくけこがぎぐげご]/.test(next)?1:/[ぱぴぷぺぽばびぶべぼ]/.test(next)?17:19);continue;}
      if(c==='ん'){coda(/[まみむめもばびぶべぼぱぴぷぺぽ]/.test(next)?16:4);continue;}
      const last=out.at(-1),code=last?.charCodeAt(0)-0xac00,v=code>=0&&code<11172?vowels[Math.floor(code/28)%21]:'';
      if(c==='ー'){out.push(v==='요'?'오':v==='유'?'우':v||'ː');continue;}
      if(c==='う'&&(v==='오'||v==='요')){out.push('오');continue;}
      if(map[c+next]){out.push(map[c+next]);i++;}else if(map[c])out.push(map[c]);else if(/[\s。、！？・,!?]/.test(c))out.push(c==='・'?' · ':c);else return '';
    }
    return out.join('');
  }
  function reading(word){return JAPANESE_READINGS[word]||(/^[ぁ-ゖァ-ヶー・]+$/u.test(word)?word:'');}
  function describe(word){const kana=reading(word),ko=kana&&korean(kana);return ko?kana+' · 한국어 발음 '+ko:'';}
  function guide(host,expanded=false){
    const outer=document.createElement('details');outer.className='kanaGuide';outer.open=expanded;
    const summary=document.createElement('summary');summary.textContent='처음 배우나요? 히라가나·가타카나 읽는 법';outer.append(summary);
    const p=document.createElement('p');p.textContent='히라가나는 기본 단어·조사·활용에, 가타카나는 외래어·강조 등에 쓰여요. あ와 ア는 모두 ‘아’입니다. 아래에서 같은 소리를 나란히 익혀 보세요.';outer.append(p);
    const details=document.createElement('details'),title=document.createElement('summary');title.textContent='기본 46자 · 탁음·반탁음 표 펼치기';details.append(title);
    const grid=document.createElement('div');grid.className='kanaGrid';
    for(const [kana,ko] of rows)Array.from(kana).forEach((c,i)=>{const tile=document.createElement('span');tile.className='kanaTile';const b=document.createElement('b'),small=document.createElement('small');b.textContent=c+' '+String.fromCharCode(c.charCodeAt(0)+0x60);b.lang='ja';small.textContent=ko[i];tile.append(b,small);grid.append(tile);});details.append(grid);outer.append(details);
    for(const line of ['작은 ゃ・ゅ・ょ는 앞 글자와 한 박자로 읽어요. きゃ／キャ = 캬, しゅ／シュ = 슈, ちょ／チョ = 초. きや(키야)와 きゃ(캬)는 달라요.','작은 っ／ッ는 다음 자음 앞에서 한 박자 멈춰요. がっこう = 각코오(학교). 장음은 모음을 한 박자 길게 읽어요. コーヒー = 코오히이(커피), おばさん(아주머니)과 おばあさん(할머니)을 구별해요.','ん／ン은 한 박자를 갖는 코 소리이며 뒤 소리에 따라 달라져요. 新聞(しんぶん)은 신분에 가깝게 적되 실제로는 심분에 가까운 코 소리가 납니다. 조사의 は는 ‘와’, へ는 ‘에’, を는 ‘오’로 읽어요.','한국어 표기는 읽기 보조용 근사치입니다. 일본어의 높낮이·모음 길이·무성화까지 같게 적을 수는 없어요. 기기 음성이 있으면 ‘발음 듣기’도 함께 사용하세요.']){const note=document.createElement('p');note.textContent=line;outer.append(note);}
    const credit=document.createElement('a');credit.href='notices/japanese-readings.txt';credit.textContent='읽기 자료: JMdict / EDRDG · 출처와 이용 조건';credit.target='_blank';credit.rel='noopener';outer.append(credit);host.replaceChildren(outer);
  }
  return {korean,reading,describe,guide};
})();
