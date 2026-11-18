'use strict';
const CompetitionStudy=(()=>{
  const key='partfive.competition.v1',names={en:'영어',ja:'일본어',es:'스페인어',tr:'터키어'};
  let host,mounted=false,visible=false,session={},room=null,busy=false,pollTimer,clockTimer,networkOK=false,polling=false,boardLanguage='',lastBoard=0,lifecycle=0;
  const $=id=>document.getElementById(id);
  const language=()=>typeof StudyLocale!=='undefined'?StudyLocale.current():'en';
  function endpoint(){
    try{const u=new URL(window.COMPETITION_CONFIG?.apiBase||'');if(u.protocol!=='https:'&&!(['127.0.0.1','localhost'].includes(u.hostname)&&u.protocol==='http:'))return'';return u.href.replace(/\/$/,'');}catch{return'';}
  }
  function save(){try{localStorage.setItem(key,JSON.stringify(session));}catch{$('arenaStorage').hidden=false;}}
  function restore(){try{const value=JSON.parse(localStorage.getItem(key));if(value?.api===endpoint()&&/^[A-Za-z0-9_-]{43}$/.test(value.token)&&typeof value.player?.id==='string')session=value;}catch{}}
  function message(text,error=false){$('arenaStatus').textContent=text;$('arenaStatus').classList.toggle('arenaError',error);}
  async function api(path,{method='GET',body,auth=true}={}){
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);
    try{
      const response=await fetch(endpoint()+path,{method,headers:{...(body?{'Content-Type':'application/json'}:{}),...(auth&&session.token?{Authorization:'Bearer '+session.token}:{})},...(body?{body:JSON.stringify(body)}:{}),signal:controller.signal,credentials:'omit',cache:'no-store'});
      let result;try{result=await response.json();}catch{throw Error('경쟁 서버에 연결하지 못했습니다. 잠시 후 다시 시도하세요.');}
      if(!response.ok){if(response.status===401){session={};room=null;save();drawSession();drawRoom();}const error=Error(result.error||'연결을 다시 확인해 주세요.');error.status=response.status;throw error;}
      networkOK=true;return result;
    }catch(error){if(!error.status)networkOK=false;throw error.name==='AbortError'?Error('연결이 지연되고 있어요. 다시 확인해 주세요.'):error;}finally{clearTimeout(timer);}
  }
  function node(tag,text,cls){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;}
  function drawSession(){
    $('arenaIdentity').hidden=!session.player;$('arenaConnectForm').hidden=!!session.player;
    $('arenaIdentityName').textContent=session.player?.name||'';
    $('arenaCreate').disabled=busy||!session.token||!!room&&['waiting','active'].includes(room.status);
    $('arenaJoin').disabled=$('arenaCreate').disabled;
    $('arenaDisconnect').disabled=!!room&&['waiting','active'].includes(room.status);
    $('arenaDeleteAccount').disabled=busy;
  }
  function drawClock(){
    if(!room)return;
    const now=Date.now()+(room.clockOffset||0);
    const pending=room.status==='active'&&now<room.startsAt;
    const remain=room.status==='active'?Math.max(0,Math.ceil(((pending?room.startsAt:room.endsAt)-now)/1000)):0;
    $('arenaTimer').textContent=room.status==='waiting'?'초대 중':pending?remain+'초 후 시작':room.status==='active'?remain+'초':room.status==='finished'?'경기 종료':'초대 취소';
    $('arenaTimeProgress').value=room.status==='active'?Math.max(0,Math.min(90,(room.endsAt-now)/1000)):room.status==='waiting'?90:0;
    if(room.status==='active'&&!remain&&!pending)$('arenaRoundNote').textContent='서버에서 최종 결과를 확인하고 있습니다.';
  }
  function applyRoom(next){
    if(!next)return;
    if(room?.id===next.id){
      const count=r=>r.players.reduce((n,p)=>n+p.attempts,0),rank={waiting:0,active:1,finished:2,cancelled:2};
      if(count(next)<count(room)||rank[next.status]<rank[room.status])return;
    }
    const finished=next.status==='finished'&&room?.status!=='finished';
    room={...next,clockOffset:next.serverNow-Date.now()};session.roomId=room.id;save();drawRoom();
    if(finished)void leaderboard(true);
  }
  function drawRoom(){
    $('arenaRoom').hidden=!room;$('arenaLobby').hidden=!!room&&['waiting','active'].includes(room.status);drawSession();if(!room)return;
    $('arenaMatchLanguage').textContent=names[room.language]+' · 90초';
    $('arenaInvite').hidden=room.status!=='waiting';$('arenaCode').textContent=room.code;
    $('arenaCopy').disabled=room.status!=='waiting';$('arenaCancel').hidden=room.status!=='waiting';
    $('arenaPlayers').replaceChildren(...room.players.map(p=>{
      const card=node('div',undefined,p.id===room.me?'arenaPlayer me':'arenaPlayer');
      card.append(node('span',p.name+(p.id===room.me?' · 나':'')),node('strong',p.score+'점'),node('small',p.correct+'정답 / '+p.attempts+'문제'));return card;
    }));
    if(room.players.length===1)$('arenaPlayers').append(node('div','친구가 들어오면 시작해요','arenaPlayer waiting'));
    const q=room.question;$('arenaQuestion').hidden=!q;
    if(q){
      $('arenaQuestionLabel').textContent=(q.kind==='grammar'?'문법':'단어')+' · '+(q.idx+1)+'번째 문제';
      $('arenaPrompt').textContent=q.prompt;$('arenaPrompt').lang=room.language;$('arenaHint').textContent=q.hint;
      // Replacing only when the nonce changes preserves keyboard focus during score polling.
      if($('arenaChoices').dataset.nonce!==q.nonce){
        $('arenaChoices').dataset.nonce=q.nonce;
        $('arenaChoices').replaceChildren(...q.options.map((option,index)=>{const button=node('button',undefined,'arenaChoice');button.type='button';button.append(node('span',String(index+1)),node('strong',option));button.onclick=()=>answer(index,q);return button;}));
      }
      $('arenaChoices').querySelectorAll('button').forEach(b=>b.disabled=busy);
    }
    $('arenaResult').hidden=room.status!=='finished';
    if(room.status==='finished'){
      const mine=room.results.find(p=>p.id===room.me),title={win:'승리했어요!',draw:'멋진 무승부예요.',loss:'한 번 더 도전해 봐요.'};
      $('arenaResultTitle').textContent=title[mine?.outcome]||'경기를 마쳤어요.';
      $('arenaResultDetail').textContent=(mine?.correct||0)+'개 정답 · '+(mine?.attempts||0)+'개 도전. '+names[room.language]+' 리더보드에 반영했습니다.';
    }
    $('arenaRoundNote').textContent=room.status==='waiting'?'초대 코드를 받은 친구가 같은 언어로 들어오면 3초 후 시작합니다.':room.status==='active'?(q?'정답마다 10점. 문법과 단어가 번갈아 나오며 두 사람의 문제 순서는 같아요.':Date.now()+room.clockOffset<room.startsAt?'잠시 후 두 사람에게 같은 첫 문제가 열립니다.':'준비된 문제를 모두 풀었어요. 종료 시각까지 상대의 결과를 기다립니다.'):room.status==='cancelled'?'이 초대는 종료되었습니다. 새 방을 만들 수 있어요.':'끝까지 도전한 기록이 남았어요.';
    drawClock();
  }
  async function connect(event){
    event.preventDefault();if(busy||!endpoint())return;busy=true;$('arenaConnect').disabled=true;
    try{const result=await api('/session',{method:'POST',body:{name:$('arenaName').value.trim()},auth:false});session={...result,api:endpoint()};save();message('연결됐어요. 방을 만들거나 친구의 코드를 입력하세요.');drawSession();}
    catch(error){message(error.message,true);}finally{busy=false;$('arenaConnect').disabled=false;drawSession();}
  }
  async function createRoom(){
    if(busy)return;busy=true;drawSession();$('arenaFeedback').hidden=true;
    try{const result=await api('/rooms',{method:'POST',body:{language:language()}});applyRoom(result.room);message('초대 코드를 친구에게 보내세요.');}
    catch(error){message(error.message,true);await sync().catch(()=>{});}finally{busy=false;drawSession();}
  }
  async function join(event){
    event.preventDefault();if(busy)return;busy=true;drawSession();$('arenaFeedback').hidden=true;
    try{const result=await api('/rooms/join',{method:'POST',body:{code:$('arenaJoinCode').value,language:language()}});applyRoom(result.room);message('상대와 연결됐어요. 곧 시작합니다.');}
    catch(error){message(error.message,true);await sync().catch(()=>{});}finally{busy=false;drawSession();}
  }
  async function answer(choice,q){
    if(busy||room?.question?.nonce!==q.nonce)return;busy=true;drawRoom();
    try{
      const result=await api('/rooms/'+room.id+'/answer',{method:'POST',body:{nonce:q.nonce,choice}});
      $('arenaFeedback').hidden=false;$('arenaVerdict').textContent=result.receipt.correct?'정답 · +10점':'오답 · 정답: '+q.options[result.receipt.answer];
      $('arenaExplanation').textContent=result.receipt.explanation;applyRoom(result.room);message('다음 문제에 도전하세요.');
    }catch(error){message(error.message,true);await sync().catch(()=>{});}finally{busy=false;drawRoom();}
  }
  async function sync(){
    if(!session.token)return;
    const result=await api(room?'/rooms/'+room.id:'/session');
    if(result.player){session.player=result.player;save();}
    if(result.room)applyRoom(result.room);else{room=null;session.roomId=null;save();drawRoom();}
    drawSession();
  }
  async function leaderboard(force=false){
    const lang=language();if(!endpoint()||!force&&boardLanguage===lang&&Date.now()-lastBoard<10000)return;
    try{
      const result=await api('/leaderboard?language='+encodeURIComponent(lang),{auth:false});if(language()!==lang)return;
      boardLanguage=lang;lastBoard=Date.now();$('arenaBoardLanguage').textContent=names[lang];
      $('arenaBoardRows').replaceChildren(...result.entries.map(entry=>{
        const row=node('tr');if(entry.id===session.player?.id)row.className='arenaMyRank';
        for(const value of [entry.rank,entry.name,entry.wins+'승',entry.matches+'전',entry.bestScore+'점'])row.append(node('td',value));return row;
      }));
      $('arenaEmptyBoard').hidden=!!result.entries.length;$('arenaBoardTable').hidden=!result.entries.length;$('arenaBoardNote').textContent='완료된 경기만 집계 · '+result.order;
    }catch(error){$('arenaBoardNote').textContent='순위를 불러오지 못했어요. '+error.message;}
  }
  async function refresh(){
    if(polling||!visible||!endpoint())return;polling=true;
    try{
      if(session.token)await sync();else await api('/health',{auth:false});
      if(!room||!['waiting','active'].includes(room.status))await leaderboard();
    }catch(error){message(error.message,true);}finally{polling=false;}
  }
  function close(){visible=false;lifecycle++;clearInterval(pollTimer);clearInterval(clockTimer);}
  async function open(){
    if(!mounted)return;close();visible=true;const run=lifecycle;
    $('arenaLanguage').textContent=names[language()]||'언어 선택';$('arenaBoardLanguage').textContent=names[language()]||'';
    $('arenaUnavailable').hidden=!!endpoint();$('arenaOnline').hidden=!endpoint();if(!endpoint())return;
    restore();drawSession();void leaderboard(true);await refresh();
    if(!visible||run!==lifecycle)return;pollTimer=setInterval(()=>void refresh(),1000);clockTimer=setInterval(drawClock,150);
  }
  function mount(element){
    if(mounted)return;mounted=true;host=element;host.classList.add('competitionPage','extensionPage');
    host.innerHTML=`<section class="arenaHero"><div><p class="eyebrow">함께 성장하는 90초</p><h1>친구와 문법·단어 대결</h1><p>같은 언어, 같은 문제. 더 많이 떠올린 사람이 승리해요.</p></div><span id="arenaLanguage" class="arenaLanguage"></span></section>
      <section id="arenaUnavailable" class="arenaCard"><h2>온라인 경기 준비 중</h2><p>초대와 점수를 서로 공유하려면 경쟁 서버가 연결되어야 합니다. 기존 공부는 그대로 이용할 수 있어요.</p></section>
      <div id="arenaOnline" hidden><div class="arenaColumns"><section class="arenaMain">
        <section class="arenaCard arenaIdentityCard"><form id="arenaConnectForm"><label for="arenaName">경기에 표시할 이름</label><div class="arenaInline"><input id="arenaName" minlength="2" maxlength="20" autocomplete="nickname" required><button id="arenaConnect" class="primary">이 이름으로 참가</button></div><p class="muted">이 이름과 경기 기록은 공개 순위에 표시됩니다. 이 브라우저에 참가 정보를 저장해요.</p></form><div id="arenaIdentity" hidden><p><strong id="arenaIdentityName"></strong> 님, 오늘도 함께 도전해요.</p><div class="arenaIdentityActions"><button id="arenaDisconnect" class="outline" type="button">이 기기 참가 정보 지우기</button><button id="arenaDeleteAccount" class="outline" type="button">공개 경기 기록 삭제</button></div></div></section>
        <section id="arenaLobby" class="arenaCard"><h2>90초 경기 시작하기</h2><button id="arenaCreate" class="primary" type="button">초대할 방 만들기</button><p class="arenaOr">친구에게 받은 코드가 있다면</p><form id="arenaJoinForm" class="arenaInline"><label class="arenaCodeLabel" for="arenaJoinCode">초대 코드<input id="arenaJoinCode" maxlength="10" minlength="8" autocomplete="off" autocapitalize="characters" placeholder="ABCD2345" required></label><button id="arenaJoin" class="outline">참가하기</button></form><p class="muted">문법·단어 혼합 · 정답마다 10점 · 장비·캐릭터 레벨과 무관한 공통 조건</p></section>
        <section id="arenaRoom" class="arenaCard" hidden><div class="arenaRoundTop"><span id="arenaMatchLanguage"></span><strong id="arenaTimer"></strong></div><progress id="arenaTimeProgress" max="90" value="90" aria-label="경기 남은 시간"></progress><div id="arenaInvite"><p>친구에게 이 코드를 보내세요</p><strong id="arenaCode"></strong><div class="arenaInline"><button id="arenaCopy" class="primary" type="button">초대 링크 복사</button><button id="arenaCancel" class="outline" type="button">초대 취소</button></div></div><div id="arenaPlayers"></div><p id="arenaRoundNote" class="muted"></p>
          <section id="arenaQuestion" hidden><p id="arenaQuestionLabel" class="eyebrow"></p><p id="arenaHint" class="muted"></p><h2 id="arenaPrompt" tabindex="-1"></h2><div id="arenaChoices"></div></section>
          <aside id="arenaFeedback" aria-live="polite" hidden><strong id="arenaVerdict"></strong><details><summary>직전 문제 해설</summary><p id="arenaExplanation"></p></details></aside>
          <section id="arenaResult" hidden><h2 id="arenaResultTitle"></h2><p id="arenaResultDetail"></p></section></section>
        <p id="arenaStatus" role="status"></p><p id="arenaStorage" class="muted" hidden>브라우저에 참가 정보를 저장할 수 없어 이번 탭에서만 유지됩니다.</p><button id="arenaReconnect" type="button" class="outline">연결 다시 확인</button>
      </section><aside class="arenaCard arenaBoard"><div class="arenaBoardHeading"><h2><span id="arenaBoardLanguage"></span> 리더보드</h2><button id="arenaBoardRefresh" class="outline" type="button" aria-label="리더보드 새로고침">↻</button></div><p id="arenaEmptyBoard" class="muted">아직 완료된 경기가 없어요. 첫 기록을 남겨 보세요.</p><div class="arenaTableWrap"><table id="arenaBoardTable" hidden><thead><tr><th>순위</th><th>이름</th><th>승리</th><th>경기</th><th>최고</th></tr></thead><tbody id="arenaBoardRows"></tbody></table></div><p id="arenaBoardNote" class="muted"></p><details><summary>경기 기록 안내</summary><p class="muted">점수와 90초 제한은 공유 서버에서 판단합니다. 참가 정보는 이 브라우저에서 30일 동안 유지됩니다. 만료되거나 저장 정보를 지우면 새 참가자로 시작하며 이전 순위 기록은 공개 목록에 남습니다. 여러 기기에서 쓰는 계정 로그인은 아직 지원하지 않습니다.</p></details></aside></div></div>`;
    let defaultName='루미';try{defaultName=JSON.parse(localStorage.getItem('partfive.character.v1'))?.name||defaultName;}catch{}$('arenaName').value=defaultName.length<2?defaultName+' 용사':defaultName;
    try{const invitation=new URL(location.href).searchParams.get('room');if(invitation&&/^[A-Z2-9]{8}$/i.test(invitation))$('arenaJoinCode').value=invitation.toUpperCase();}catch{}
    $('arenaConnectForm').onsubmit=connect;$('arenaCreate').onclick=createRoom;$('arenaJoinForm').onsubmit=join;
    $('arenaBoardRefresh').onclick=()=>void leaderboard(true);$('arenaReconnect').onclick=()=>void refresh();
    $('arenaDisconnect').onclick=()=>{session={};room=null;save();drawSession();drawRoom();message('이 브라우저의 참가 정보를 지웠어요. 공개 경기 결과는 서버에 남습니다.');};
    $('arenaDeleteAccount').onclick=async()=>{
      if(busy||!confirm('내 모든 언어의 공개 경기 결과와 닉네임을 삭제할까요? 상대방의 기록은 유지되며 이 참가 정보는 다시 사용할 수 없습니다.'))return;
      busy=true;drawSession();
      try{await api('/session',{method:'DELETE'});session={};room=null;save();drawSession();drawRoom();message('모든 언어의 공개 경기 기록과 닉네임을 삭제했어요.');await leaderboard(true);}
      catch(error){message(error.message,true);}finally{busy=false;drawSession();}
    };
    $('arenaCopy').onclick=async()=>{try{const url=new URL(location.href);url.searchParams.set('room',room.code);url.searchParams.set('language',room.language);await navigator.clipboard.writeText(url.href);message('초대 링크를 복사했어요.');}catch{message('초대 코드 '+room.code+'를 친구에게 전달해 주세요.');}};
    $('arenaCancel').onclick=async()=>{try{applyRoom((await api('/rooms/'+room.id+'/cancel',{method:'POST',body:{}})).room);message('초대를 취소했어요.');}catch(error){message(error.message,true);}};
    new MutationObserver(()=>{if(host.hidden)close();}).observe(host,{attributes:true,attributeFilter:['hidden']});
    window.addEventListener('partfive:language',()=>{if(visible)void open();});
    restore();drawSession();
  }
  return{mount,open,close};
})();
