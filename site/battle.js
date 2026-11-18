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
    $('heroSword').src=Game.gearArt('sword',Game.worn(g,'sword'));$('heroArmor').src=Game.gearArt('armor',Game.worn(g,'armor'));
    $('hero').dataset.rarity=Math.max(Game.worn(g,'sword'),Game.worn(g,'armor'));
    $('hero').setAttribute('aria-label',$('playerName').textContent+' · '+Game.gear.sword[Game.worn(g,'sword')][0]+' · '+Game.gear.armor[Game.worn(g,'armor')][0]);
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
  let shopKind='sword';
  const el=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;};
  function shop(g,buy,equip){
    $('shopGold').textContent=g.gold.toLocaleString()+' G';
    const host=$('merch');host.replaceChildren();
    const preview=el('section',undefined,'shopPreview'),figure=el('div',undefined,'gearDoll');
    const head=el('img');head.src=$('heroBase').src;head.className='dollBase';head.alt='';
    const armor=el('img');armor.src=Game.gearArt('armor',Game.worn(g,'armor'));armor.className='dollArmor';armor.alt='';
    const sword=el('img');sword.src=Game.gearArt('sword',Game.worn(g,'sword'));sword.className='dollSword';sword.alt='';
    figure.append(head,armor,sword);figure.setAttribute('role','img');figure.setAttribute('aria-label','현재 착용 모습');
    const summary=el('div');summary.append(el('small','작은 모험가의 장비함'),el('h3',$('playerName').textContent+'의 장비실'),el('strong','공격 '+Game.attack(g)+' · 최대 체력 '+Game.maxHp(g)),el('p',Game.gear.sword[Game.worn(g,'sword')][0]+' / '+Game.gear.armor[Game.worn(g,'armor')][0]),el('p','구매하면 즉시 착용합니다. 보유한 장비로 외형을 바꿔도 최고 능력치는 유지됩니다.','shopHelp'));
    preview.append(figure,summary);host.append(preview);
    const tabs=el('div',undefined,'gearTabs');tabs.setAttribute('role','group');tabs.setAttribute('aria-label','장비 종류');
    for(const [kind,label]of [['sword','무기'],['armor','방어구']]){
      const tab=el('button',label+' '+(g[kind]+1)+' / '+Game.gear[kind].length);tab.type='button';tab.dataset.gearTab=kind;tab.setAttribute('aria-pressed',String(shopKind===kind));tab.onclick=()=>{shopKind=kind;shop(g,buy,equip);host.querySelector('[data-gear-tab='+kind+']').focus();};tabs.append(tab);
    }
    host.append(tabs,el('p','각 종류는 순서대로 구매합니다. 표시 가격은 해당 단계의 구매 비용입니다.','shopHelp'));
    const grid=el('div',undefined,'gearGrid'),kind=shopKind,tiers=Game.gear[kind],owned=g[kind],wearing=Game.worn(g,kind),stat=kind==='sword'?'공격력':'최대 체력';
    tiers.forEach((item,tier)=>{
      const [name,price,bonus]=item,card=el('section',undefined,'stock gearCard');card.dataset.tier=tier;card.dataset.kind=kind;
      if(tier===wearing)card.classList.add('equipped');
      const label=el('small',String(tier).padStart(2,'0')+' · '+Game.rarity(tier),'gearRarity');
      const art=el('img');art.src=Game.gearIcon(kind,tier);art.alt=name;art.className='shopGearArt';art.loading='lazy';art.decoding='async';
      card.append(label,art,el('h3',name),el('strong',stat+' +'+bonus,'gearBonus'));
      const button=el('button');button.type='button';button.dataset.gearAction=kind;button.dataset.tier=tier;
      if(tier<=owned){button.textContent=tier===wearing?'착용 중':'외형 장착';button.disabled=tier===wearing;button.className='outline';button.onclick=()=>equip(kind,tier);card.append(el('p','보유 장비 · 추가 비용 없음'));}
      else{
        card.append(el('p',price.toLocaleString()+' G','gearPrice'));
        if(tier===owned+1){button.id='buy-'+kind;button.textContent=g.gold>=price?'구매하고 장착':(price-g.gold).toLocaleString()+' G 부족';button.disabled=g.gold<price;button.className='primary';button.onclick=e=>{if(e.detail<=1&&g[kind]===owned)buy(kind);};card.append(el('p','지금 구매하면 '+stat+' +'+(bonus-tiers[owned][2])));}
        else{button.textContent=tiers[tier-1][0]+' 구매 후';button.disabled=true;button.className='outline';}
      }
      card.append(button);grid.append(card);
    });host.append(grid);
  }
  return {draw,shop,message};
})();
