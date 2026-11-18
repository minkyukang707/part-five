'use strict';
const ListeningStudy=(()=>{
  const storageKey='partfive.listening.v1';
  const fresh=()=>({song:'coffee',line:0,answers:{},custom:[],start:0,end:0});
  let state=fresh(),host,playerLoaded=false,observer;
  const $=id=>host.querySelector('#'+id);
  const allSongs=()=>[...LISTENING_SONGS,...state.custom];
  const selected=()=>allSongs().find(song=>song.id===state.song)||LISTENING_SONGS[0];
  const itemKey=()=>selected().id+'.'+state.line;
  function normalize(text){
    const expanded=text.normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'")
      .replace(/\bi'm\b/g,'i am').replace(/\bit's\b/g,'it is').replace(/\bi'd\b/g,'i would')
      .replace(/\bi'll\b/g,'i will').replace(/\bcan't\b/g,'cannot').replace(/\bwon't\b/g,'will not')
      .replace(/\b(memory)'s\b/g,'$1 is').replace(/\byou're\b/g,'you are').replace(/\bthat's\b/g,'that is')
      .replace(/\b([a-z]+)n't\b/g,'$1 not');
    return (expanded.match(/[a-z]+(?:'[a-z]+)*/g)||[]).join(' ');
  }
  function compare(expected,actual){
    const target=normalize(expected).split(' '),entered=normalize(actual).split(' ');
    const table=Array.from({length:target.length+1},()=>Array(entered.length+1).fill(0));
    for(let i=1;i<=target.length;i++)for(let j=1;j<=entered.length;j++){
      table[i][j]=target[i-1]===entered[j-1]?table[i-1][j-1]+1:Math.max(table[i-1][j],table[i][j-1]);
    }
    let i=target.length,j=entered.length;
    const missing=[],extra=[];
    while(i||j){
      if(i&&j&&target[i-1]===entered[j-1]){i--;j--;}
      else if(i&&(!j||table[i-1][j]>=table[i][j-1]))missing.unshift(target[--i]);
      else extra.unshift(entered[--j]);
    }
    return {correct:normalize(expected)===normalize(actual),matched:table[target.length][entered.length],
      count:target.length,missing,extra};
  }
  function videoId(value){
    const raw=value.trim();
    if(/^[A-Za-z0-9_-]{11}$/.test(raw))return raw;
    try{
      const url=new URL(raw);
      if(url.protocol!=='https:'&&url.protocol!=='http:')return null;
      let id;
      if(url.hostname==='youtu.be')id=url.pathname.slice(1).split('/')[0];
      else if(['youtube.com','www.youtube.com','m.youtube.com','www.youtube-nocookie.com'].includes(url.hostname)){
        id=url.pathname==='/watch'?url.searchParams.get('v'):url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1];
      }
      return /^[A-Za-z0-9_-]{11}$/.test(id||'')?id:null;
    }catch{return null;}
  }
  function restore(){
    try{
      const raw=JSON.parse(localStorage.getItem(storageKey));
      if(!raw||typeof raw!=='object')return;
      state=fresh();
      state.custom=Array.isArray(raw.custom)?raw.custom.filter(song=>typeof song.id==='string'&&song.id.startsWith('custom-')&&
        typeof song.title==='string'&&song.title.length<=80&&videoId(song.video)===song.video&&Array.isArray(song.lines)&&
        song.lines.length>0&&song.lines.length<=20&&song.lines.every(line=>typeof line.text==='string'&&line.text.length<=500)): [];
      state.song=allSongs().some(song=>song.id===raw.song)?raw.song:'coffee';
      state.line=Number.isInteger(raw.line)&&raw.line>=0&&raw.line<selected().lines.length?raw.line:0;
      if(raw.answers&&typeof raw.answers==='object'&&!Array.isArray(raw.answers)){
        const keys=new Set(allSongs().flatMap(song=>song.lines.map((_,i)=>song.id+'.'+i)));
        for(const [key,entry] of Object.entries(raw.answers)){
          if(!keys.has(key)||!entry||typeof entry!=='object'||typeof entry.draft!=='string'||entry.draft.length>800)continue;
          if(entry.graded && (typeof entry.answer!=='string'||entry.answer.length>800||typeof entry.correct!=='boolean'))continue;
          state.answers[key]={draft:entry.draft,answer:entry.answer,correct:entry.correct,graded:!!entry.graded,
            lastLogged:typeof entry.lastLogged==='string'?entry.lastLogged.slice(0,1000):''};
        }
      }
      state.start=Number.isInteger(raw.start)&&raw.start>=0&&raw.start<=86400?raw.start:0;
      state.end=Number.isInteger(raw.end)&&raw.end>=0&&raw.end<=86400?raw.end:0;
    }catch{state=fresh();}
  }
  function save(){
    try{localStorage.setItem(storageKey,JSON.stringify(state));return true;}
    catch{$('listenSaveStatus').textContent='기록을 저장할 수 없어 이번 탭에서 이어갑니다.';return false;}
  }
  function link(label,url){
    const a=document.createElement('a');a.textContent=label;a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;
  }
  function close(){
    if(!host)return;
    $('listenPlayer').replaceChildren();playerLoaded=false;
    $('listenPlay').textContent='YouTube 플레이어 열기';
  }
  function drawOptions(){
    $('listenSong').replaceChildren(...allSongs().map(song=>new Option(song.title+(song.custom?' · 내 자료':''),song.id)));
    $('listenSong').value=selected().id;
  }
  function draw(){
    const song=selected(),line=song.lines[state.line],saved=state.answers[itemKey()];
    $('listenSong').value=song.id;
    $('listenTitle').textContent=song.title;
    $('listenLevel').textContent=song.level;
    $('listenDescription').textContent=song.description;
    $('listenOrder').textContent='첫 절 · '+(state.line+1)+'번째 구절';
    if(song.custom)$('listenOrder').textContent='내 자료 · '+(state.line+1)+'번째 구절';
    $('listenCount').textContent=(state.line+1)+' / '+song.lines.length;
    $('listenPrev').disabled=state.line===0;$('listenNext').disabled=state.line===song.lines.length-1;
    $('listenStart').value=state.start;$('listenEnd').value=state.end||'';
    $('listenDelete').hidden=!song.custom;
    $('listenOriginal').replaceChildren(link('YouTube에서 듣기','https://www.youtube.com/watch?v='+song.video));
    $('listenCredit').replaceChildren();
    if(song.custom){
      $('listenCredit').append(document.createTextNode('직접 등록한 받아쓰기 자료 · 이 브라우저에 저장됩니다.'));
    }else{
      $('listenCredit').append(document.createTextNode(song.title+' — '+song.artist+' · '),
        link(song.license,song.licenseUrl),document.createTextNode(' · 첫 절 가사 발췌, 구두점 정리, 한국어 학습 힌트 추가.'));
    }
    $('listenTranscript').value=saved?.draft||'';
    $('listenCheck').disabled=!!saved?.graded;
    $('listenTranscript').disabled=!!saved?.graded;
    $('listenFeedback').hidden=!saved?.graded;
    $('listenAgain').hidden=!saved?.graded;
    $('listenPracticeStatus').textContent='';
    if(saved?.graded)feedback(line,saved.answer);
    $('listenHint').textContent=line.tip||'입력한 원문과 들리는 단어의 순서를 비교하세요.';
    const correct=song.lines.filter((_,index)=>state.answers[song.id+'.'+index]?.correct).length;
    $('listenLearned').textContent=correct+' / '+song.lines.length+' 구절 익힘';
    $('listenProgress').value=correct;$('listenProgress').max=song.lines.length;
  }
  function feedback(line,answer){
    const result=compare(line.text,answer);
    $('listenVerdict').textContent=result.correct?'모든 단어를 순서대로 들었어요!':result.matched+' / '+result.count+'단어 일치 · 빠진 소리를 다시 들어 보세요.';
    $('listenFeedback').classList.toggle('success',result.correct);
    $('listenAnswer').textContent=line.text;
    $('listenMissing').textContent=result.missing.length?'확인할 단어 · '+result.missing.join(' · '):'';
    $('listenExtra').textContent=result.extra.length?'내 답에서 다시 확인 · '+result.extra.join(' · '):'';
    $('listenTip').textContent=line.tip||'원문을 보며 구절을 따라 말한 뒤 다시 들어 보세요.';
  }
  function loadPlayer(){
    const start=Number($('listenStart').value),end=Number($('listenEnd').value)||0;
    if(!Number.isInteger(start)||start<0||start>86400||!Number.isInteger(end)||end<0||end>86400||(end&&end<=start)){
      $('listenPlayerStatus').textContent='시작은 0 이상의 초, 끝은 시작보다 큰 초로 입력하세요.';return;
    }
    state.start=start;state.end=end;save();
    const url=new URL('https://www.youtube-nocookie.com/embed/'+selected().video);
    url.searchParams.set('start',start);url.searchParams.set('playsinline','1');url.searchParams.set('rel','0');
    if(end)url.searchParams.set('end',end);
    const frame=document.createElement('iframe');
    frame.src=url;frame.title=selected().title+' · 공식 YouTube 플레이어';
    frame.allow='encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;
    frame.referrerPolicy='strict-origin-when-cross-origin';
    $('listenPlayer').replaceChildren(frame);playerLoaded=true;
    $('listenPlay').textContent='설정한 구간 다시 열기';
    $('listenPlayerStatus').textContent='재생 버튼을 누르고 자막(CC)을 끈 뒤 받아써 보세요. 속도는 YouTube 설정에서 바꿀 수 있어요.';
  }
  function submit(event){
    event.preventDefault();
    const key=itemKey(),answer=$('listenTranscript').value.trim(),line=selected().lines[state.line];
    if(state.answers[key]?.graded)return;
    if(!normalize(answer)){$('listenPracticeStatus').textContent='들린 영어 단어를 입력하세요.';return;}
    const result=compare(line.text,answer),old=state.answers[key]||{};
    const normalized=normalize(answer);
    state.answers[key]={draft:answer,answer,correct:result.correct,graded:true,lastLogged:normalized};
    save();
    if(old.lastLogged!==normalized)window.LearningLog?.record({
      mode:'listening',language:'en',key,label:selected().title+' · 구절 '+(state.line+1),correct:result.correct,
      source:selected().title
    });
    draw();
    $('listenFeedback').scrollIntoView({block:'nearest'});
  }
  function move(delta){
    const next=state.line+delta;
    if(next<0||next>=selected().lines.length)return;
    state.line=next;save();draw();
  }
  function add(event){
    event.preventDefault();
    const id=videoId($('listenUrl').value),title=$('listenCustomTitle').value.trim();
    const lines=$('listenCustomText').value.split(/\r?\n/).map(text=>text.trim()).filter(Boolean);
    if(!id||!title||title.length>80||!lines.length||lines.length>20||lines.some(text=>text.length>500||!normalize(text))){
      $('listenAddStatus').textContent='YouTube 주소, 제목, 영어 구절을 확인하세요. 줄마다 한 구절씩 최대 20개를 입력할 수 있어요.';return;
    }
    if(!$('listenRights').checked){$('listenAddStatus').textContent='사용할 수 있는 가사 또는 직접 작성한 원문인지 확인해 주세요.';return;}
    if(state.custom.length>=10){$('listenAddStatus').textContent='내 자료는 최대 10개입니다. 이전 자료를 삭제한 뒤 등록하세요.';return;}
    const song={id:'custom-'+crypto.randomUUID(),video:id,title,artist:'내 자료',custom:true,
      level:'직접 등록',description:'아래에서 구간을 정하고, 등록한 순서대로 받아쓰기를 연습하세요.',
      lines:lines.map(text=>({text}))};
    state.custom.push(song);state.song=song.id;state.line=0;state.start=0;state.end=0;
    close();save();drawOptions();draw();
    $('listenAddForm').reset();$('listenAddStatus').textContent='등록했어요.';$('listenCustomPanel').open=false;
  }
  function review(key){
    const match=/^(.+)\.(\d+)$/.exec(key||'');
    const song=match&&allSongs().find(s=>s.id===match[1]);
    if(!song||+match[2]>=song.lines.length)return;
    state.song=song.id;state.line=+match[2];
    const result=state.answers[itemKey()];if(result){result.graded=false;result.draft='';}
    close();save();drawOptions();draw();
  }
  function mount(container){
    if(host)return;
    host=container;
    host.innerHTML=`
      <section class="listenHeading"><div><p>소리에서 문장으로</p><h1>Listening</h1></div><span>영어 노래 받아쓰기</span></section>
      <section class="listenLayout">
        <section class="listenMedia">
          <label for="listenSong">듣고 싶은 노래</label><select id="listenSong"></select>
          <div class="listenSongHead"><h2 id="listenTitle"></h2><span id="listenLevel"></span></div>
          <p id="listenDescription"></p>
          <div id="listenPlayer" class="listenPlayer"></div>
          <div class="listenPlayerActions"><button id="listenPlay" type="button" class="primary">YouTube 플레이어 열기</button><span id="listenOriginal"></span></div>
          <details class="listenRange"><summary>구간 정하기</summary><p>노래를 들으며 원하는 시작·끝을 초 단위로 정하세요. 기본 구간은 곡 전체입니다.</p><div><label>시작 <input id="listenStart" type="number" min="0" max="86400" value="0"> 초</label><label>끝 <input id="listenEnd" type="number" min="0" max="86400" placeholder="곡 끝"> 초</label></div></details>
          <p id="listenPlayerStatus" role="status">플레이어를 열면 YouTube에 연결됩니다. 영상이 재생되지 않으면 ‘YouTube에서 듣기’를 이용하세요.</p>
          <p id="listenCredit"></p>
          <button id="listenDelete" class="outline" type="button" hidden>이 내 자료 삭제</button>
        </section>
        <section class="listenPractice">
          <div class="listenQuestionHead"><h2 id="listenOrder"></h2><span id="listenCount"></span></div>
          <p>해당 구절을 듣고 영어로 적어 보세요. 대소문자와 구두점은 자유롭게 입력해도 됩니다.</p>
          <form id="listenAnswerForm"><label for="listenTranscript">내가 들은 구절</label><textarea id="listenTranscript" rows="4" maxlength="800" lang="en" spellcheck="false" autocomplete="off" placeholder="들은 단어부터 적어 보세요."></textarea><button id="listenCheck" class="primary" type="submit">받아쓰기 확인</button></form>
          <p id="listenPracticeStatus" role="status"></p>
          <details class="listenHint"><summary>듣기 힌트</summary><p id="listenHint"></p></details>
          <section id="listenFeedback" class="listenFeedback" hidden aria-live="polite"><strong id="listenVerdict"></strong><p id="listenAnswer" lang="en"></p><p id="listenMissing"></p><p id="listenExtra"></p><p id="listenTip"></p></section>
          <button id="listenAgain" class="outline" type="button" hidden>다시 듣고 풀기</button>
          <div class="listenNavigation"><button id="listenPrev" class="outline" type="button">이전 구절</button><button id="listenNext" class="primary" type="button">다음 구절</button></div>
          <div class="listenProgressLabel"><span id="listenLearned"></span><button id="listenReview" type="button">틀린 구절부터</button></div><progress id="listenProgress" value="0" max="4"></progress>
          <p id="listenSaveStatus" role="status"></p>
        </section>
      </section>
      <details id="listenCustomPanel" class="listenCustom"><summary>내 YouTube 영상으로 연습하기</summary>
        <form id="listenAddForm"><label for="listenUrl">YouTube 주소</label><input id="listenUrl" type="url" placeholder="https://www.youtube.com/watch?v=…" required>
        <label for="listenCustomTitle">자료 제목</label><input id="listenCustomTitle" maxlength="80" required>
        <label for="listenCustomText">받아쓸 원문 · 한 줄에 한 구절</label><textarea id="listenCustomText" rows="5" maxlength="10000" required></textarea>
        <label class="listenRights"><input id="listenRights" type="checkbox" required> 직접 작성했거나 학습에 사용할 권한이 있는 원문입니다.</label>
        <button type="submit" class="primary">내 연습 자료 저장</button><p id="listenAddStatus" role="status"></p></form>
      </details>
      <details class="listenLegal"><summary>노래의 이용 조건과 출처</summary><p>기본 3곡은 작곡가 Josh Woodward의 공식 채널에서 Creative Commons Attribution 이용 허락과 가사를 확인했습니다. 곡명·창작자·원문 링크를 표시하고 짧은 발췌를 받아쓰기 문제로 구성했습니다. 유튜브의 ‘무료 음악’이나 ‘저작권 없음’이라는 제목만으로 가사 재배포 허락을 판단할 수는 없습니다.</p><p>공식 설명에는 라이선스 버전이 명시되어 있지 않아 원문의 Attribution 표기를 유지했습니다. 이용 조건을 확인한 근거는 아래 자료에 기록했습니다.</p><a href="notices/listening-sources.txt" target="_blank" rel="noopener">곡별 이용 허락과 확인 자료</a></details>
    `;
    restore();drawOptions();draw();
    $('listenSong').onchange=()=>{
      close();state.song=$('listenSong').value;state.line=0;state.start=0;state.end=0;
      save();draw();
    };
    $('listenPlay').onclick=loadPlayer;
    $('listenAnswerForm').onsubmit=submit;
    $('listenTranscript').oninput=()=>{
      const old=state.answers[itemKey()]||{};
      state.answers[itemKey()]={...old,draft:$('listenTranscript').value};save();
    };
    $('listenPrev').onclick=()=>move(-1);$('listenNext').onclick=()=>move(1);
    $('listenAgain').onclick=()=>{
      const entry=state.answers[itemKey()];
      if(entry){entry.graded=false;entry.draft='';save();draw();$('listenTranscript').focus();}
    };
    $('listenReview').onclick=()=>{
      const index=selected().lines.findIndex((_,i)=>state.answers[selected().id+'.'+i]?.correct===false);
      if(index<0){$('listenPracticeStatus').textContent='이 노래에서 복습할 오답이 아직 없어요.';return;}
      review(selected().id+'.'+index);$('listenTranscript').focus();
    };
    $('listenAddForm').onsubmit=add;
    $('listenDelete').onclick=()=>{
      const song=selected();
      if(!song.custom||!confirm('이 영상의 받아쓰기 자료와 기록을 삭제할까요?'))return;
      state.custom=state.custom.filter(s=>s.id!==song.id);
      for(const key of Object.keys(state.answers))if(key.startsWith(song.id+'.'))delete state.answers[key];
      state.song='coffee';state.line=0;state.start=0;state.end=0;close();save();drawOptions();draw();
    };
    observer=new MutationObserver(()=>{if(host.hidden&&playerLoaded)close();});
    observer.observe(host,{attributes:true,attributeFilter:['hidden']});
  }
  function reset(){state=fresh();try{localStorage.removeItem(storageKey);}catch{}if(host){close();drawOptions();draw();}}
  return {mount,open(){if(host)draw();},close,review,reset,normalize,compare,videoId};
})();
if(typeof module!=='undefined')module.exports=ListeningStudy;
