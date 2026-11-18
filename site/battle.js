'use strict';
const Battle=(()=>{
  const $=id=>document.getElementById(id);
  const colors=['green','blue','red','yellow','dark','white'];
  const shapes='ABCDEF',eyes=['cute_dark','blue','red','angry_blue','yellow'];
  const horns=['ear_round','antenna_small','horn_large'];
  const regions=['이끼숲','산호초','잿빛 골짜기','햇살 초원','별빛 동굴','눈꽃 고개','달빛 습지','바람 언덕','호박빛 사막','구름 정원'];
  const names=['북슬이','물방울','도토리뿔','통통발','눈동이','방울귀','반달뿔','솜털이','둥근발','군주'];
  const scenes=['moss','coral','volcano','meadow','crystal','snow','swamp','wind','desert','sky','bamboo','autumn','coast','canyon','terraces','ruins','rain','aurora','stars','castle','paris','rome','petra','taj-mahal','great-wall','machu-picchu','giza','angkor-wat','kyoto','cappadocia','barcelona','santorini','skogafoss','grand-canyon','new-york','sydney','rio','venice','seoul','matterhorn'];
  let painted=0,timer,actionAnimations=[];
  function appearance(lv){
    const n=lv-1,color=colors[n%6],shape=shapes[(Math.floor(n/6)+n)%6];
    const detail='detail_'+color+'_'+horns[(n+Math.floor(n/18))%3],limb=n%2?'B':'A';
    const parts=[['leg left','leg_'+color+limb],['leg right','leg_'+color+limb],['arm left','arm_'+color+limb],['arm right','arm_'+color+limb],['crest left',detail],['crest right',detail],['body','body_'+color+shape],['eye left','eye_'+eyes[(n+Math.floor(n/36))%5]],['eye right','eye_'+eyes[(n+Math.floor(n/36))%5]],['mouth','mouth'+'ABCDEFGHIJ'[n%10]]];
    $('creature').replaceChildren(...parts.map(([part,file])=>{
      const image=document.createElement('img');
      image.className=part;image.alt='';image.draggable=false;image.src='monsters/'+file+'.png';return image;
    }));
    painted=lv;
  }
  function cancelFx(){
    clearTimeout(timer);
    actionAnimations.forEach(a=>a.cancel());actionAnimations=[];
    $('enemySprite').querySelectorAll('.splitHalf').forEach(n=>n.remove());
    $('battleFx').replaceChildren();$('killFlag').hidden=true;
    $('creature').style.visibility='';$('enemySprite').hidden=false;
  }
  function animate(node,frames,options){actionAnimations.push(node.animate(frames,options));}
  function split(){
    for(const side of [-1,1]){
      const half=document.createElement('div');half.className='splitHalf';half.style.left='0';half.style.top='0';
      const copy=$('creature').cloneNode(true);copy.removeAttribute('id');copy.style.visibility='';
      copy.style.clipPath=side===-1?'polygon(0 0,57% 0,47% 48%,53% 61%,42% 100%,0 100%)':'polygon(57% 0,100% 0,100% 100%,42% 100%,53% 61%,47% 48%)';
      half.append(copy);$('enemySprite').append(half);
      animate(half,[{transform:'translate(0,0)'},{transform:'translate('+side*17+'px,-11px) rotate('+side*15+'deg)',offset:.34},{transform:'translate('+side*40+'px,38px) rotate('+side*56+'deg)',opacity:0}],{duration:710,fill:'forwards',easing:'ease-in'});
    }
    $('creature').style.visibility='hidden';
    const enemy=$('enemySprite').getBoundingClientRect(),field=$('battleFx').getBoundingClientRect();
    const x=enemy.left-field.left+enemy.width*.5,y=enemy.top-field.top+enemy.height*.52;
    for(let i=0;i<22;i++){
      const p=document.createElement('i');p.className='slimeDrop';p.style.left=x+'px';p.style.top=y+'px';$('battleFx').append(p);
      const angle=2*Math.PI*i/22,dist=25+Math.random()*40,dx=Math.cos(angle)*dist,dy=Math.sin(angle)*dist;
      animate(p,[{transform:'scale(.6)'},{transform:'translate('+dx+'px,'+(dy-12)+'px) scale(1.1)',offset:.48},{transform:'translate('+dx*1.3+'px,'+(dy+27)+'px) scale(.45)',opacity:0}],{duration:640+Math.random()*120,fill:'forwards'});
    }
    const slash=document.createElement('i');slash.className='strike';slash.style.left=(x-30)+'px';slash.style.top=y+'px';$('battleFx').append(slash);
    animate(slash,[{opacity:0,transform:'rotate(-43deg) scaleX(.1)'},{opacity:1,offset:.3},{opacity:0,transform:'rotate(-43deg) scaleX(1.3)'}],{duration:230,fill:'forwards'});
  }
  function message(g,event){
    if(event?.kind==='kill')return (g.right===10?'10연속 결정타! ':'')+event.damage+' 피해 · '+(Game.boss(event.level)?'보스':'몬스터')+' 처치! +'+event.gold+' G · 내 현재·최대 체력 +10';
    if(event?.kind==='miss')return '오답! 내 체력 −10 · '+(event.healed?'몬스터 +'+event.healed+' HP':'몬스터 체력 가득');
    if(event?.kind==='hit')return (g.right===10?'10연속 결정타! ':'명중! ')+'몬스터 −'+event.damage+' HP';
    if(g.kills===100)return '100레벨 보스 격파! 모든 전투를 마쳤어요.';
    if(g.hp===0)return '쓰러졌어요. 재도전하면 같은 상대와 다시 싸워요.';
    return '다음 정답의 피해 '+Game.damage(Game.attack(g),g.right+1,g.ninthDamage,g.tenthBase);
  }
  function enemyHud(g,lv,hp){
    const index=(lv-1)%scenes.length;
    const scene='arena/scenes/'+String(index+1).padStart(2,'0')+'-'+scenes[index]+'.webp';
    if($('field').dataset.scene!==scene){
      $('field').dataset.scene=scene;
      $('field').style.backgroundImage='url("'+scene+'")';
    }
    if(painted!==lv)appearance(lv);
    const max=Game.monsterMax(lv,g.difficulty);
    $('battle').classList.toggle('boss',Game.boss(lv));
    $('battleLevel').textContent=(Game.boss(lv)?'BOSS · ':'')+'Lv. '+String(lv).padStart(2,'0')+' / 100';
    $('monsterName').textContent=regions[Math.floor((lv-1)/10)]+' '+names[(lv-1)%10];
    $('hpBar').max=max;$('hpBar').value=hp;$('hpValue').textContent=hp+' / '+max+' HP';
    const chapter=Math.ceil(lv/10);
    $('chapterNumber').textContent='구역 '+String(chapter).padStart(2,'0')+' / 10';
    $('chapterName').textContent=regions[chapter-1]+' 원정';
    $('bossGoal').textContent=g.kills===100?'마지막 보스 격파':'보스 Lv. '+chapter*10;
    const route=$('routeSteps');
    if(route.dataset.chapter!==String(chapter)){
      route.dataset.chapter=chapter;
      route.replaceChildren(...Array.from({length:10},(_,i)=>{
        const step=document.createElement('li');
        step.textContent=(chapter-1)*10+i+1;
        return step;
      }));
    }
    for(const step of route.children){
      const n=Number(step.textContent);
      step.classList.toggle('passed',n<=g.kills);
      step.classList.toggle('current',n===lv && n>g.kills);
      step.setAttribute('aria-label',n+'레벨 · '+(n<=g.kills?'처치 완료':n===lv?'전투 중':'미도달'));
    }
  }
  function draw(g,event=null,notice=''){
    cancelFx();
    const killed=event?.kind==='kill',lv=killed?event.level:Game.level(g);
    enemyHud(g,lv,killed?0:Game.currentMonster(g));
    const max=Game.maxHp(g);$('playerHp').textContent=g.hp+' / '+max+' HP';$('playerBar').max=max;$('playerBar').value=g.hp;
    $('heroSword').src='arena/sword-'+g.sword+'.png';$('heroArmor').src='arena/armor-'+g.armor+'.png';
    $('hero').classList.toggle('down',g.hp===0);
    $('power').textContent='공격 '+Game.attack(g);$('chain').textContent=g.wrong?'연속 오답 '+g.wrong:'연속 정답 '+g.right;
    $('wallet').textContent=g.gold.toLocaleString()+' G';$('difficulty').value=g.difficulty;
    $('battleMessage').textContent=notice||message(g,event);$('revive').hidden=g.hp!==0;
    const phrase=g.kills===100?'':Game.taunt(g.wrong);
    $('taunt').textContent=phrase;$('taunt').hidden=!phrase;
    const motion=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(event&&motion){
      const attacker=event.kind==='miss'?$('enemySprite'):$('hero'),direction=event.kind==='miss'?-1:1;
      animate(attacker,[{translate:'0 0'},{translate:direction*16+'px -4px',offset:.4},{translate:'0 0'}],{duration:330,easing:'ease-out'});
      const number=document.createElement('b');
      number.className='floatingHit '+(event.kind==='miss'?'heroLoss':'');
      number.textContent='−'+(event.kind==='miss'?10:event.damage);
      $('battleFx').append(number);
      animate(number,[{opacity:0,translate:'0 5px',scale:.7},{opacity:1,translate:'0 -8px',scale:1.2,offset:.25},{opacity:0,translate:'0 -30px',scale:1}],{duration:760,fill:'forwards'});
    }
    if(killed){
      $('killFlag').textContent=g.kills===100?'마지막 보스 격파':Game.boss(lv)?'보스 격파':'처치!';$('killFlag').hidden=false;
      if(motion)split();else $('creature').style.visibility='hidden';
      timer=setTimeout(()=>{
        cancelFx();enemyHud(g,Game.level(g),Game.currentMonster(g));$('enemySprite').hidden=g.kills===100;
        if(g.kills===100){$('killFlag').textContent='100레벨 클리어';$('killFlag').hidden=false;}
      },motion?810:380);
    }else if(g.kills===100){
      $('enemySprite').hidden=true;$('killFlag').textContent='100레벨 클리어';$('killFlag').hidden=false;
    }else if(event && motion){
      const target=event.kind==='hit'?$('creature'):$('hero');
      animate(target,[{translate:'0 0'},{translate:'5px 0',opacity:.65},{translate:'-4px 0'},{translate:'0 0'}],{duration:260});
    }
  }
  function shop(g,buy){
    $('shopGold').textContent=g.gold.toLocaleString()+' G';
    $('merch').replaceChildren(...Object.entries(Game.gear).map(([kind,tiers])=>{
      const tier=g[kind],current=tiers[tier],next=tiers[tier+1],stat=kind==='sword'?'공격력':'최대 체력';
      const card=document.createElement('section');card.className='stock';
      const category=document.createElement('small');category.textContent=(kind==='sword'?'무기':'방어구')+' · 착용 중 '+current[0];
      const name=document.createElement('h3');name.textContent=next?next[0]:current[0];
      const desc=document.createElement('p');
      desc.textContent=next?'구매 즉시 착용 · '+stat+' 영구 +'+(next[2]-current[2]):'최고 단계 장비를 착용 중입니다.';
      const art=document.createElement('img');art.src='arena/'+kind+'-'+(next?tier+1:tier)+'.png';art.alt=next?next[0]:current[0];art.className='shopGearArt';
      card.append(category,art,name,desc);
      if(next){
        const footer=document.createElement('div');footer.className='stockFoot';
        const diff=document.createElement('span');diff.textContent=g.gold<next[1]?(next[1]-g.gold)+' G 부족':'구매 가능';
        const button=document.createElement('button');button.type='button';button.className='primary';button.id='buy-'+kind;
        button.textContent='구매 · '+next[1]+' G';button.disabled=g.gold<next[1];
        button.onclick=e=>{if(e.detail<=1&&g[kind]===tier)buy(kind);};
        footer.append(diff,button);card.append(footer);
      }
      return card;
    }));
  }
  return {draw,shop,message};
})();
