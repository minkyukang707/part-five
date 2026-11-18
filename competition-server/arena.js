const LANGUAGES=['en','ja','es','tr'];
const MIN_ANSWER_MS=500,ROUND_MS=90000,COUNTDOWN_MS=3000;
class ApiError extends Error{constructor(status,message){super(message);this.status=status;}}
const fail=(status,message)=>{throw new ApiError(status,message);};
const randomToken=()=>{const bytes=crypto.getRandomValues(new Uint8Array(32));return btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');};
const digest=async value=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))].map(n=>n.toString(16).padStart(2,'0')).join('');
const rows=result=>result.results||[];
const shuffle=items=>{const result=[...items];for(let i=result.length-1;i>0;i--){const bits=crypto.getRandomValues(new Uint32Array(1))[0],j=bits%(i+1);[result[i],result[j]]=[result[j],result[i]];}return result;};
function code(){const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';return [...crypto.getRandomValues(new Uint8Array(8))].map(n=>alphabet[n%alphabet.length]).join('');}
function prepareQuestions(bank,language){
  const sets=bank[language],grammar=shuffle(sets.grammar),word=shuffle(sets.word),n=Math.min(60,grammar.length,word.length),out=[];
  for(let i=0;i<n;i++)for(const q of [grammar[i],word[i]]){
    const indices=shuffle([0,1,2,3]);out.push({...q,options:indices.map(index=>q.options[index]),answer:indices.indexOf(q.answer)});
  }
  return out;
}
async function bodyOf(request){
  if(!request.body)return{};
  const reader=request.body.getReader();let size=0,text='';const decoder=new TextDecoder();
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>8192){await reader.cancel();fail(413,'요청이 너무 큽니다.');}text+=decoder.decode(value,{stream:true});}
  text+=decoder.decode();try{const value=JSON.parse(text||'{}');if(!value||Array.isArray(value)||typeof value!=='object')throw Error();return value;}catch{fail(400,'올바른 JSON 요청이 필요합니다.');}
}
export function createArena({bank,clock=Date.now}){
  const query=(db,sql,...args)=>db.prepare(sql).bind(...args);
  async function rate(db,bucket,limit,period,now){
    const result=await query(db,`INSERT INTO rate_limits(bucket,count,resets_at) VALUES(?,1,?)
      ON CONFLICT(bucket) DO UPDATE SET count=CASE WHEN resets_at<=? THEN 1 ELSE count+1 END,
      resets_at=CASE WHEN resets_at<=? THEN ? ELSE resets_at END WHERE resets_at<=? OR count<? RETURNING count`,bucket,now+period,now,now,now+period,now,limit).all();
    if(!rows(result).length)fail(429,'요청이 많습니다. 잠시 후 다시 시도하세요.');
  }
  async function finalize(db,roomId,now){
    await db.batch([
      query(db,`UPDATE rooms SET status='finished' WHERE id=? AND status='active' AND ends_at<=?`,roomId,now),
      query(db,`INSERT OR IGNORE INTO results(room_id,player_id,language,correct,attempts,outcome,finished_at)
        SELECT r.id,p.player_id,r.language,p.correct,p.attempts,
        CASE WHEN p.correct>op.correct THEN 'win' WHEN p.correct=op.correct THEN 'draw' ELSE 'loss' END,r.ends_at
        FROM rooms r JOIN room_players p ON p.room_id=r.id JOIN room_players op ON op.room_id=r.id AND op.player_id<>p.player_id
        WHERE r.id=? AND r.status='finished' AND EXISTS(SELECT 1 FROM guests g WHERE g.id=p.player_id AND g.expires_at>0)`,roomId),
      query(db,`UPDATE rooms SET status='cancelled' WHERE id=? AND status='waiting' AND expires_at<=?`,roomId,now),
      query(db,`DELETE FROM active_players WHERE room_id=? AND EXISTS(SELECT 1 FROM rooms WHERE id=? AND status IN('finished','cancelled'))`,roomId,roomId)
    ]);
  }
  async function sweep(db,now){
    // Set-based maintenance keeps request cost bounded even after many abandoned rooms.
    await db.batch([
      query(db,`UPDATE rooms SET status='finished' WHERE status='active' AND ends_at<=?`,now),
      query(db,`INSERT OR IGNORE INTO results(room_id,player_id,language,correct,attempts,outcome,finished_at)
        SELECT r.id,p.player_id,r.language,p.correct,p.attempts,
        CASE WHEN p.correct>op.correct THEN 'win' WHEN p.correct=op.correct THEN 'draw' ELSE 'loss' END,r.ends_at
        FROM rooms r JOIN room_players p ON p.room_id=r.id JOIN room_players op ON op.room_id=r.id AND op.player_id<>p.player_id
        WHERE r.status='finished' AND EXISTS(SELECT 1 FROM guests g WHERE g.id=p.player_id AND g.expires_at>0)
        AND NOT EXISTS(SELECT 1 FROM results x WHERE x.room_id=r.id AND x.player_id=p.player_id)`),
      query(db,`UPDATE rooms SET status='cancelled' WHERE status='waiting' AND expires_at<=?`,now),
      query(db,`DELETE FROM active_players WHERE room_id IN(SELECT id FROM rooms WHERE status IN('finished','cancelled'))`),
      query(db,'DELETE FROM rate_limits WHERE resets_at<?',now-86400000)
    ]);
  }
  async function roomView(db,roomId,playerId,now){
    now=clock();
    await finalize(db,roomId,now);
    const room=await query(db,'SELECT * FROM rooms WHERE id=?',roomId).first();
    if(!room)fail(404,'경기를 찾을 수 없습니다.');
    if(room.host_id!==playerId&&room.guest_id!==playerId)fail(403,'이 경기의 참가자가 아닙니다.');
    const players=rows(await query(db,`SELECT p.player_id AS id,g.name,p.cursor,p.correct,p.attempts,p.nonce FROM room_players p JOIN guests g ON g.id=p.player_id WHERE p.room_id=? ORDER BY p.player_id=? DESC`,roomId,room.host_id).all());
    const me=players.find(p=>p.id===playerId);let question=null;
    if(room.status==='active'&&now>=room.starts_at&&now<room.ends_at){
      const q=await query(db,'SELECT idx,kind,prompt,hint,options FROM questions WHERE room_id=? AND idx=?',roomId,me.cursor).first();
      if(q)question={...q,options:JSON.parse(q.options),nonce:me.nonce};
    }
    const results=room.status==='finished'?rows(await query(db,'SELECT player_id AS id,outcome,correct,attempts FROM results WHERE room_id=?',roomId).all()):[];
    return{id:room.id,code:room.code,language:room.language,status:room.status,startsAt:room.starts_at,endsAt:room.ends_at,expiresAt:room.expires_at,serverNow:clock(),me:playerId,
      players:players.map(p=>({id:p.id,name:p.name,correct:p.correct,attempts:p.attempts,score:p.correct*10})),question,results,questionCount:(await query(db,'SELECT COUNT(*) AS n FROM questions WHERE room_id=?',roomId).first()).n};
  }
  async function route(request,env,now){
    const db=env.DB;if(!db)fail(503,'경쟁 데이터베이스가 아직 연결되지 않았습니다.');
    const url=new URL(request.url),path=url.pathname.replace(/^\/api\/?/,'/').replace(/\/$/,'')||'/';
    if(request.method==='GET'&&path==='/health')return{ok:true,service:'part-five-arena',version:1,languages:LANGUAGES,roundSeconds:90,serverNow:now};
    const ip=await digest(env.CLIENT_IP||request.headers.get('CF-Connecting-IP')||'unknown');
    await rate(db,'requests:'+ip,360,60000,now);
    if(request.method==='POST'&&path==='/session'){
      await rate(db,'session:'+ip,20,3600000,now);
      const body=await bodyOf(request),name=String(body.name||'').trim().normalize('NFC');
      if(!/^[\p{L}\p{N} ._-]{2,20}$/u.test(name))fail(400,'이름은 문자·숫자·공백 2~20자로 입력하세요.');
      const token=randomToken(),id=crypto.randomUUID();
      await query(db,'INSERT INTO guests(id,token_hash,name,created_at,expires_at) VALUES(?,?,?,?,?)',id,await digest(token),name,now,now+30*86400000).run();
      return{token,player:{id,name},expiresAt:now+30*86400000};
    }
    if(request.method==='GET'&&path==='/leaderboard'){
      const language=url.searchParams.get('language');if(!LANGUAGES.includes(language))fail(400,'지원하는 언어를 선택하세요.');
      await sweep(db,now);
      const list=rows(await query(db,`SELECT g.id,g.name,COUNT(*) AS matches,SUM(r.outcome='win') AS wins,SUM(r.outcome='draw') AS draws,
        SUM(r.correct) AS correct,SUM(r.attempts) AS attempts,MAX(r.correct)*10 AS bestScore
        FROM results r JOIN guests g ON g.id=r.player_id WHERE r.language=? GROUP BY g.id,g.name
        ORDER BY wins DESC,bestScore DESC,correct DESC,matches ASC,g.id ASC LIMIT 50`,language).all());
      return{language,serverNow:now,entries:list.map((p,i)=>({...p,rank:i+1})),order:'승수 → 최고 점수 → 누적 정답'};
    }
    const bearer=request.headers.get('Authorization')||'';
    if(!/^Bearer [A-Za-z0-9_-]{43}$/.test(bearer))fail(401,'경쟁 프로필을 먼저 연결하세요.');
    const player=await query(db,'SELECT id,name,expires_at FROM guests WHERE token_hash=? AND expires_at>?',await digest(bearer.slice(7)),now).first();
    if(!player)fail(401,'경쟁 프로필이 만료되었습니다. 다시 연결하세요.');
    await rate(db,'player:'+player.id,180,60000,now);
    if(request.method==='GET'&&path==='/session'){
      const active=await query(db,'SELECT room_id FROM active_players WHERE player_id=?',player.id).first();
      return{player:{id:player.id,name:player.name},room:active?await roomView(db,active.room_id,player.id,now):null};
    }
    if(request.method==='DELETE'&&path==='/session'){
      now=clock();await sweep(db,now);
      // Keep the participation check inside the transaction, so joining and deletion cannot race.
      const result=await db.batch([
        query(db,`UPDATE guests SET name='삭제된 참가자',expires_at=0 WHERE id=? AND expires_at>?
          AND NOT EXISTS(SELECT 1 FROM active_players WHERE player_id=?) RETURNING id`,player.id,now,player.id),
        query(db,`DELETE FROM results WHERE player_id=? AND EXISTS(SELECT 1 FROM guests WHERE id=? AND expires_at=0)`,player.id,player.id)
      ]);
      if(!rows(result[0]).length)fail(409,'진행 중인 경기는 종료된 뒤, 대기 중인 초대는 취소한 뒤 삭제해 주세요.');
      return{deleted:true};
    }
    if(request.method==='POST'&&path==='/rooms'){
      const body=await bodyOf(request),language=body.language;if(!LANGUAGES.includes(language))fail(400,'지원하는 언어를 선택하세요.');
      await sweep(db,now);await rate(db,'create:'+player.id,15,3600000,now);
      if(await query(db,'SELECT 1 AS active FROM active_players WHERE player_id=?',player.id).first())fail(409,'이미 참가 중인 경기가 있습니다.');
      const id=crypto.randomUUID(),invite=code(),questions=prepareQuestions(bank,language),expires=now+15*60000;
      const statements=[query(db,`INSERT INTO rooms(id,code,language,host_id,status,created_at,expires_at)
        SELECT ?,?,?,?,'waiting',?,? FROM guests WHERE id=? AND expires_at>?`,id,invite,language,player.id,now,expires,player.id,now),
        query(db,'INSERT INTO room_players(room_id,player_id,nonce) VALUES(?,?,?)',id,player.id,randomToken()),
        query(db,'INSERT INTO active_players(player_id,room_id,expires_at) VALUES(?,?,?)',player.id,id,expires)];
      // One JSON insert keeps the complete question set atomic with a small batch.
      statements.push(query(db,`INSERT INTO questions(room_id,idx,kind,prompt,hint,options,answer,explanation)
        SELECT ?,CAST(j.key AS INTEGER),json_extract(j.value,'$.kind'),json_extract(j.value,'$.prompt'),json_extract(j.value,'$.hint'),json_extract(j.value,'$.options'),json_extract(j.value,'$.answer'),json_extract(j.value,'$.explanation') FROM json_each(?) j`,id,JSON.stringify(questions)));
      try{await db.batch(statements);}catch{fail(409,'경기 생성 중 다른 요청과 겹쳤습니다. 진행 중인 경기를 확인하세요.');}
      return{room:await roomView(db,id,player.id,now)};
    }
    if(request.method==='POST'&&path==='/rooms/join'){
      const body=await bodyOf(request),invite=String(body.code||'').toUpperCase().replace(/[ -]/g,''),language=body.language;
      if(!/^[A-Z2-9]{8}$/.test(invite)||!LANGUAGES.includes(language))fail(400,'8자리 초대 코드와 언어를 확인하세요.');
      await sweep(db,now);await rate(db,'join:'+player.id,20,60000,now);
      const existing=await query(db,'SELECT id,guest_id,status,language FROM rooms WHERE code=?',invite).first();
      if(existing?.guest_id===player.id)return{room:await roomView(db,existing.id,player.id,now)};
      if(existing&&existing.language!==language)fail(409,'선택한 언어와 초대받은 경기의 언어가 다릅니다.');
      if(await query(db,'SELECT 1 AS active FROM active_players WHERE player_id=?',player.id).first())fail(409,'이미 참가 중인 경기가 있습니다.');
      now=clock();const starts=now+COUNTDOWN_MS,ends=starts+ROUND_MS;
      let batch;
      try{batch=await db.batch([
        query(db,`UPDATE rooms SET guest_id=?,status='active',starts_at=?,ends_at=? WHERE code=? AND language=? AND status='waiting' AND host_id<>? AND expires_at>?
          AND EXISTS(SELECT 1 FROM guests WHERE id=? AND expires_at>?) RETURNING id`,player.id,starts,ends,invite,language,player.id,now,player.id,now),
        query(db,`INSERT OR IGNORE INTO room_players(room_id,player_id,nonce) SELECT id,?,? FROM rooms WHERE code=? AND guest_id=? AND status='active'`,player.id,randomToken(),invite,player.id),
        query(db,`INSERT INTO active_players(player_id,room_id,expires_at) SELECT ?,id,? FROM rooms WHERE code=? AND guest_id=? AND status='active'`,player.id,ends,invite,player.id),
        query(db,`UPDATE active_players SET expires_at=? WHERE room_id=(SELECT id FROM rooms WHERE code=? AND guest_id=?)`,ends,invite,player.id)
      ]);}catch{fail(409,'동시에 다른 경기에 참가했거나 이미 시작된 경기입니다.');}
      const id=rows(batch[0])[0]?.id;if(!id)fail(409,'초대 코드가 만료되었거나 이미 시작된 경기입니다.');
      return{room:await roomView(db,id,player.id,now)};
    }
    const match=path.match(/^\/rooms\/([a-f0-9-]{36})(?:\/(answer|cancel))?$/);
    if(match){
      const [,id,action]=match;
      if(request.method==='GET'&&!action)return{room:await roomView(db,id,player.id,now)};
      if(request.method==='POST'&&action==='cancel'){
        await db.batch([query(db,`UPDATE rooms SET status='cancelled' WHERE id=? AND host_id=? AND status='waiting'`,id,player.id),query(db,`DELETE FROM active_players WHERE room_id=? AND EXISTS(SELECT 1 FROM rooms WHERE id=? AND status='cancelled')`,id,id)]);
        return{room:await roomView(db,id,player.id,now)};
      }
      if(request.method==='POST'&&action==='answer'){
        const body=await bodyOf(request);now=clock();if(typeof body.nonce!=='string'||!Number.isInteger(body.choice)||body.choice<0||body.choice>3)fail(400,'문항과 보기를 확인하세요.');
        const receipt=await query(db,'SELECT correct,answer,explanation,accepted_at FROM receipts WHERE room_id=? AND player_id=? AND nonce=?',id,player.id,body.nonce).first();
        if(receipt)return{receipt:{...receipt,correct:!!receipt.correct,duplicate:true},room:await roomView(db,id,player.id,now)};
        const p=await query(db,`SELECT p.*,r.status,r.starts_at,r.ends_at FROM room_players p JOIN rooms r ON r.id=p.room_id WHERE p.room_id=? AND p.player_id=?`,id,player.id).first();
        if(!p)fail(403,'이 경기의 참가자가 아닙니다.');
        if(p.status!=='active'||now>=p.ends_at){await finalize(db,id,now);fail(409,'경기가 종료되었거나 아직 상대가 들어오지 않았습니다.');}
        if(now<p.starts_at)fail(425,'시작 카운트다운이 끝난 뒤 답하세요.');
        if(p.nonce!==body.nonce)fail(409,'이미 채점된 문항입니다. 현재 문항을 다시 확인하세요.');
        if(p.last_answer_at&&now-p.last_answer_at<MIN_ANSWER_MS)fail(429,'다음 문제를 읽고 다시 답하세요.');
        const q=await query(db,'SELECT answer,explanation FROM questions WHERE room_id=? AND idx=?',id,p.cursor).first();if(!q)fail(409,'준비된 문제를 모두 풀었습니다. 종료 후 결과를 확인하세요.');
        const ok=body.choice===q.answer?1:0,nextNonce=randomToken();
        // Body transfer and asynchronous reads never extend the server deadline.
        now=clock();
        if(now>=p.ends_at){await finalize(db,id,now);fail(409,'경기가 종료되었습니다.');}
        const result=await db.batch([
          query(db,`UPDATE room_players SET cursor=cursor+1,attempts=attempts+1,correct=correct+?,last_answer_at=?,last_nonce=nonce,nonce=?
            WHERE room_id=? AND player_id=? AND cursor=? AND nonce=? AND (last_answer_at=0 OR last_answer_at<=?)
            AND EXISTS(SELECT 1 FROM rooms WHERE id=? AND status='active' AND starts_at<=? AND ends_at>?) RETURNING cursor,correct,attempts`,ok,now,nextNonce,id,player.id,p.cursor,body.nonce,now-MIN_ANSWER_MS,id,now,now),
          query(db,`INSERT OR IGNORE INTO receipts(room_id,player_id,nonce,correct,answer,explanation,accepted_at)
            SELECT ?,?,?,?,?,?,? FROM room_players WHERE room_id=? AND player_id=? AND last_nonce=? AND cursor=?`,id,player.id,body.nonce,ok,q.answer,q.explanation,now,id,player.id,body.nonce,p.cursor+1)
        ]);
        const accepted=await query(db,'SELECT correct,answer,explanation,accepted_at FROM receipts WHERE room_id=? AND player_id=? AND nonce=?',id,player.id,body.nonce).first();
        if(!accepted)fail(409,'문항이 변경되었거나 경기가 끝났습니다. 다시 연결하세요.');
        return{receipt:{...accepted,correct:!!accepted.correct,duplicate:!rows(result[0]).length},room:await roomView(db,id,player.id,now)};
      }
    }
    fail(404,'지원하지 않는 경쟁 API입니다.');
  }
  return{
    async fetch(request,env){
      const origin=request.headers.get('Origin'),allowed=(env.ALLOWED_ORIGINS||'https://minkyukang707.github.io').split(',').map(s=>s.trim());
      const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Vary':'Origin'};
      if(origin&&allowed.includes(origin)){headers['Access-Control-Allow-Origin']=origin;headers['Access-Control-Allow-Headers']='Authorization, Content-Type';headers['Access-Control-Allow-Methods']='GET, POST, DELETE, OPTIONS';}
      if(origin&&!allowed.includes(origin))return new Response(JSON.stringify({error:'허용되지 않은 웹 주소입니다.'}),{status:403,headers});
      if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
      try{return new Response(JSON.stringify(await route(request,env,clock())),{headers});}
      catch(error){if(!(error instanceof ApiError))console.error('arena request failed',error);return new Response(JSON.stringify({error:error instanceof ApiError?error.message:'서버에서 요청을 처리하지 못했습니다. 잠시 후 다시 시도하세요.'}),{status:error.status||500,headers});}
    }
  };
}
