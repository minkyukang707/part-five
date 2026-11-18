import test from 'node:test';
import assert from 'node:assert/strict';
import {createArena} from './arena.js';
import {LocalD1} from './local-db.mjs';
import bank from './bank.js';
function setup(){
  const db=new LocalD1();let now=1800000000000;const app=createArena({bank,clock:()=>now});
  async function api(path,{method='GET',token,body,origin='https://minkyukang707.github.io'}={}){
    const response=await app.fetch(new Request('https://arena.test/api'+path,{method,headers:{Origin:origin,...(token?{Authorization:'Bearer '+token}:{}),...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})}),{DB:db});
    return{status:response.status,headers:response.headers,data:response.status===204?null:await response.json()};
  }
  const session=async name=>(await api('/session',{method:'POST',body:{name}})).data;
  return{db,app,api,session,tick:ms=>now+=ms,now:()=>now};
}

async function activeMatch(h){
  const host=await h.session('Host'),guest=await h.session('Guest');
  const created=(await h.api('/rooms',{method:'POST',token:host.token,body:{language:'en'}})).data.room;
  const joined=(await h.api('/rooms/join',{method:'POST',token:guest.token,body:{code:created.code,language:'en'}})).data.room;
  h.tick(joined.startsAt-h.now());
  const room=(await h.api('/rooms/'+created.id,{token:host.token})).data.room;
  const choice=h.db.sqlite.prepare('SELECT answer FROM questions WHERE room_id=? AND idx=0').get(room.id).answer;
  return{host,room,choice};
}

test('answer body completed after the deadline cannot score',async()=>{
  const h=setup();try{
    const {host,room,choice}=await activeMatch(h);h.tick(room.endsAt-h.now()-1);
    let controller,reading;const bodyRead=new Promise(resolve=>reading=resolve);
    const body=new ReadableStream({pull(c){controller=c;reading();return new Promise(()=>{});}},{highWaterMark:0});
    const pending=h.app.fetch(new Request('https://arena.test/api/rooms/'+room.id+'/answer',{
      method:'POST',duplex:'half',headers:{Authorization:'Bearer '+host.token},body
    }),{DB:h.db});
    await bodyRead;h.tick(1001);
    controller.enqueue(new TextEncoder().encode(JSON.stringify({nonce:room.question.nonce,choice})));controller.close();
    assert.equal((await pending).status,409);
    assert.equal(h.db.sqlite.prepare('SELECT attempts FROM room_players WHERE room_id=? AND player_id=?').get(room.id,host.player.id).attempts,0);
  }finally{h.db.close();}
});

test('deadline reached during the question read cannot score',async()=>{
  const h=setup();try{
    const {host,room,choice}=await activeMatch(h);h.tick(room.endsAt-h.now()-1);
    const prepare=h.db.prepare.bind(h.db);
    h.db.prepare=sql=>{
      const statement=prepare(sql),bind=statement.bind.bind(statement);
      statement.bind=(...args)=>{
        const bound=bind(...args),first=bound.first.bind(bound);
        if(sql.startsWith('SELECT answer,explanation'))bound.first=async()=>{const row=await first();h.tick(1001);return row;};
        return bound;
      };return statement;
    };
    const answer=await h.api('/rooms/'+room.id+'/answer',{method:'POST',token:host.token,body:{nonce:room.question.nonce,choice}});
    assert.equal(answer.status,409);
    assert.equal(h.db.sqlite.prepare('SELECT attempts FROM room_players WHERE room_id=? AND player_id=?').get(room.id,host.player.id).attempts,0);
  }finally{h.db.close();}
});

test('expired-room backlog fits the free D1 invocation query budget',async()=>{
  const h=setup();try{
    const owner=await h.session('Owner');
    const insert=h.db.sqlite.prepare("INSERT INTO rooms(id,code,language,host_id,status,created_at,expires_at) VALUES(?,?,?,?,'waiting',?,?)");
    for(let n=0;n<60;n++)insert.run(crypto.randomUUID(),'EXP'+String(n).padStart(5,'0'),'en',owner.player.id,1,2);
    let calls=0;
    const count=()=>{if(++calls>50)throw Error('Too many API requests by single Worker invocation');};
    const prepare=h.db.prepare.bind(h.db),batch=h.db.batch.bind(h.db);
    h.db.prepare=sql=>{
      const statement=prepare(sql),bind=statement.bind.bind(statement);
      statement.bind=(...args)=>{
        const bound=bind(...args);
        for(const method of ['all','first','run']){
          const original=bound[method].bind(bound);bound[method]=async()=>{count();return original();};
        }
        return bound;
      };return statement;
    };
    // D1 counts a batch as one query, regardless of the number of statements.
    h.db.batch=async statements=>{count();return batch(statements);};
    const board=await h.api('/leaderboard?language=en');
    assert.equal(board.status,200);assert(calls<=50);
    assert.equal(h.db.sqlite.prepare("SELECT COUNT(*) AS n FROM rooms WHERE status='cancelled'").get().n,60);
    assert.deepEqual(board.data.entries,[]);
  }finally{h.db.close();}
});
test('90-second shared round, hidden answer, server scoring, idempotency, final leaderboard',async()=>{
  const h=setup();try{
    const a=await h.session('Alpha'),b=await h.session('Beta'),third=await h.session('Gamma');
    const made=await h.api('/rooms',{method:'POST',token:a.token,body:{language:'en'}});assert.equal(made.status,200);const id=made.data.room.id,code=made.data.room.code;
    assert.equal(made.data.room.question,null);
    assert.equal((await h.api('/rooms/'+id,{token:third.token})).status,403);
    assert.equal((await h.api('/rooms/join',{method:'POST',token:b.token,body:{code,language:'ja'}})).status,409);
    const joined=await h.api('/rooms/join',{method:'POST',token:b.token,body:{code,language:'en'}});assert.equal(joined.status,200);assert.equal(joined.data.room.endsAt-joined.data.room.startsAt,90000);assert.equal(joined.data.room.question,null);
    h.tick(3000);
    const ra=(await h.api('/rooms/'+id,{token:a.token})).data.room,rb=(await h.api('/rooms/'+id,{token:b.token})).data.room;
    assert.equal(ra.question.prompt,rb.question.prompt);assert.deepEqual(ra.question.options,rb.question.options);assert.notEqual(ra.question.nonce,rb.question.nonce);
    assert(!('answer'in ra.question));assert(!('explanation'in ra.question));assert(!JSON.stringify(ra).includes('token_hash'));
    const correct=h.db.sqlite.prepare('SELECT answer FROM questions WHERE room_id=? AND idx=0').get(id).answer;
    const post={method:'POST',token:a.token,body:{nonce:ra.question.nonce,choice:correct,score:999999,correct:999999}};
    const responses=await Promise.all([h.api('/rooms/'+id+'/answer',post),h.api('/rooms/'+id+'/answer',post)]);
    assert(responses.every(x=>x.status===200));assert(responses.some(x=>x.data.receipt.duplicate));
    const progress=(await h.api('/rooms/'+id,{token:a.token})).data.room;assert.equal(progress.players.find(p=>p.id===a.player.id).score,10);assert.equal(progress.question.kind,'word');
    const wrong=await h.api('/rooms/'+id+'/answer',{method:'POST',token:b.token,body:{nonce:rb.question.nonce,choice:(correct+1)%4}});assert.equal(wrong.data.receipt.correct,false);
    const forged=await h.api('/rooms/'+id+'/answer',{method:'POST',token:a.token,body:{nonce:'forged',choice:correct}});assert.equal(forged.status,409);
    assert.equal((await h.api('/leaderboard?language=en')).data.entries.length,0,'unfinished rounds never rank');
    h.tick(90000);
    const ended=await Promise.all([h.api('/rooms/'+id,{token:a.token}),h.api('/rooms/'+id,{token:b.token})]);assert(ended.every(x=>x.data.room.status==='finished'));assert.equal(ended[0].data.room.question,null);
    assert.equal(h.db.sqlite.prepare('SELECT COUNT(*) AS n FROM results').get().n,2);
    const rejected=await h.api('/rooms/'+id+'/answer',{method:'POST',token:a.token,body:{nonce:progress.question.nonce,choice:0}});assert.equal(rejected.status,409);
    const board=(await h.api('/leaderboard?language=en')).data.entries;assert.equal(board.length,2);assert.equal(board[0].id,a.player.id);assert.equal(board[0].wins,1);assert.equal(board[0].bestScore,10);assert.equal(board[0].matches,1);
    assert.equal((await h.api('/leaderboard?language=ja')).data.entries.length,0);
  }finally{h.db.close();}
});
test('concurrent join accepts only one opponent; cancel releases host; auth and CORS enforced',async()=>{
  const h=setup();try{
    const a=await h.session('Owner'),b=await h.session('Second'),c=await h.session('Third');
    const room=(await h.api('/rooms',{method:'POST',token:a.token,body:{language:'ja'}})).data.room;
    const attempts=await Promise.all([b,c].map(p=>h.api('/rooms/join',{method:'POST',token:p.token,body:{code:room.code,language:'ja'}})));
    assert.deepEqual(attempts.map(x=>x.status).sort(),[200,409]);
    assert.equal(h.db.sqlite.prepare('SELECT COUNT(*) AS n FROM room_players WHERE room_id=?').get(room.id).n,2);
    const next=await h.api('/rooms',{method:'POST',token:a.token,body:{language:'ja'}});assert.equal(next.status,409);
    assert.equal((await h.api('/rooms',{method:'POST',body:{language:'en'}})).status,401);
    assert.equal((await h.api('/health',{origin:'https://evil.test'})).status,403);
    assert.equal((await h.api('/health',{method:'OPTIONS'})).status,204);
    h.tick(93000);await h.api('/leaderboard?language=ja');
    const fresh=(await h.api('/rooms',{method:'POST',token:a.token,body:{language:'tr'}})).data.room;
    const cancelled=await h.api('/rooms/'+fresh.id+'/cancel',{method:'POST',token:a.token,body:{}});assert.equal(cancelled.data.room.status,'cancelled');
    assert.equal((await h.api('/rooms',{method:'POST',token:a.token,body:{language:'es'}})).status,200);
  }finally{h.db.close();}
});
test('four languages alternate validated grammar and vocabulary; guest token stored only hashed',async()=>{
  const h=setup();try{
    for(const language of ['en','ja','es','tr']){
      const a=await h.session('Player '+language);const room=(await h.api('/rooms',{method:'POST',token:a.token,body:{language}})).data.room;
      const questions=h.db.sqlite.prepare('SELECT * FROM questions WHERE room_id=? ORDER BY idx').all(room.id);assert(questions.length>=80);
      questions.forEach((q,i)=>{assert.equal(q.kind,i%2?'word':'grammar');assert.equal(new Set(JSON.parse(q.options)).size,4);assert(q.answer>=0&&q.answer<4);});
      const stored=h.db.sqlite.prepare('SELECT token_hash FROM guests WHERE id=?').get(a.player.id);assert.notEqual(stored.token_hash,a.token);assert.equal(stored.token_hash.length,64);
    }
  }finally{h.db.close();}
});

test('authenticated deletion removes only own all-language results, invalidates token, and cannot be replayed back into rankings',async()=>{
  const h=setup();try{
    const a=await h.session('Delete me'),b=await h.session('Keep opponent'),roomIds=[];
    assert.equal((await h.api('/session',{method:'DELETE'})).status,401);
    for(const language of ['en','ja','es','tr']){
      const room=(await h.api('/rooms',{method:'POST',token:a.token,body:{language}})).data.room;roomIds.push(room.id);
      assert.equal((await h.api('/session',{method:'DELETE',token:a.token})).status,409,'waiting host must cancel first');
      const joined=(await h.api('/rooms/join',{method:'POST',token:b.token,body:{code:room.code,language}})).data.room;
      assert.equal((await h.api('/session',{method:'DELETE',token:b.token})).status,409,'active player must finish first');
      h.tick(joined.endsAt-h.now());await h.api('/rooms/'+room.id,{token:a.token});
    }
    assert.equal(h.db.sqlite.prepare('SELECT COUNT(*) AS n FROM results').get().n,8);
    const deleted=await h.api('/session',{method:'DELETE',token:a.token});assert.equal(deleted.status,200);assert.equal(deleted.data.deleted,true);
    assert.equal((await h.api('/session',{token:a.token})).status,401);
    assert.equal((await h.api('/session',{method:'DELETE',token:a.token})).status,401);
    const guest=h.db.sqlite.prepare('SELECT name,expires_at FROM guests WHERE id=?').get(a.player.id);assert.equal(guest.name,'삭제된 참가자');assert.equal(guest.expires_at,0);
    for(const id of roomIds){const replay=await h.api('/rooms/'+id,{token:b.token});assert.equal(replay.status,200);assert(replay.data.room.players.some(p=>p.name==='삭제된 참가자'));}
    for(const language of ['en','ja','es','tr']){const entries=(await h.api('/leaderboard?language='+language)).data.entries;assert.equal(entries.length,1);assert.equal(entries[0].id,b.player.id);assert.equal(entries[0].matches,1);}
    assert.equal(h.db.sqlite.prepare('SELECT COUNT(*) AS n FROM results WHERE player_id=?').get(a.player.id).n,0,'room reads and leaderboard sweeps cannot resurrect deleted results');
    assert.equal((await h.api('/session',{method:'DELETE',token:b.token})).status,200);
    for(const language of ['en','ja','es','tr'])assert.equal((await h.api('/leaderboard?language='+language)).data.entries.length,0);
    const c=await h.session('Race me');
    const race=await Promise.all([h.api('/session',{method:'DELETE',token:c.token}),h.api('/rooms',{method:'POST',token:c.token,body:{language:'en'}})]);
    assert(!(race[0].status===200&&race[1].status===200),'creation and deletion cannot both succeed');
    assert(race.some(result=>result.status===200));
  }finally{h.db.close();}
});
