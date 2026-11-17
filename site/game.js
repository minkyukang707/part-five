'use strict';
const Game=(()=>{
  const difficultyNames=['입문','쉬움','보통','어려움','도전'];
  const factors=[.7,.85,1,1.25,1.55];
  const gear={
    sword:[['연습용 검',0,0],['청동검',20,5],['강철검',70,10],['기사검',160,18],['서리검',350,28],['별빛검',650,42]],
    armor:[['여행자의 옷',0,0],['가죽 갑옷',20,20],['사슬 갑옷',70,50],['철판 갑옷',160,90],['수호 갑옷',350,150],['별빛 갑옷',650,240]]
  };
  function baseHp(level){return 10*(3+Math.ceil(100*Math.expm1((level-1)*Math.log1p(.01))-1e-9));}
  const boss=level=>level%10===0;
  function monsterMax(level,difficulty){
    if(boss(level))return 2*monsterMax(level-1,difficulty);
    return 5*Math.round(baseHp(level)*factors[difficulty-1]/5);
  }
  const level=g=>Math.min(100,g.kills+1);
  const maxHp=g=>100+10*g.kills+gear.armor[g.armor][2];
  const attack=g=>10+gear.sword[g.sword][2];
  const reward=lv=>(20+(lv-1)*5)*(boss(lv)?2:1);
  function currentMonster(g){
    if(g.kills===100)return 0;
    return Math.ceil(g.monsterHp*monsterMax(level(g),g.difficulty)/g.hpScale);
  }
  function damage(base,streak,ninthDamage=0,tenthBase=base){
    if(streak===10 && ninthDamage>0)return 2*ninthDamage;
    if(streak>10 && ninthDamage>0)return 2*ninthDamage+5*(streak-10)+base-tenthBase;
    if(streak>=10)return 2*(base+35)+5*(streak-10);
    return base+5*Math.max(0,streak-2);
  }
  function taunt(misses){
    if(misses>=10)return '공부를 하지 않는다는 건 알고있었지만...';
    if(misses>=5)return '이렇게 틀리시면 곤란해요 ㅠㅠㅠㅠ';
    if(misses>=3)return '기못하넼ㅋㅋㅋ';
    return '';
  }
  function fromLegacy(grammar,words){
    const count=(record,key)=>Number.isSafeInteger(record?.[key])&&record[key]>=0?record[key]:0;
    let remaining=10*Math.max(0,count(grammar,'battleHits')+count(words,'battleHits')-count(grammar,'battleHeals')-count(words,'battleHeals'));
    const g={version:1,kills:0,hp:100,monsterHp:30,hpScale:30,difficulty:3,gold:0,sword:0,armor:0,right:0,wrong:0,ninthDamage:0};
    while(g.kills<100 && remaining>=baseHp(g.kills+1)){
      remaining-=baseHp(g.kills+1);g.kills++;g.gold+=reward(g.kills);
    }
    const lv=level(g);g.hpScale=monsterMax(lv,3);
    g.monsterHp=g.kills===100?0:Math.ceil(g.hpScale*(baseHp(lv)-remaining)/baseHp(lv));
    g.hp=maxHp(g);
    return g;
  }
  function valid(g){
    const range=(n,min,max)=>Number.isSafeInteger(n)&&n>=min&&n<=max;
    return g?.version===1 && range(g.difficulty,1,5) && range(g.kills,0,100) && range(g.sword,0,5) && range(g.armor,0,5) &&
      range(g.gold,0,Number.MAX_SAFE_INTEGER) && range(g.right,0,Number.MAX_SAFE_INTEGER) && range(g.wrong,0,Number.MAX_SAFE_INTEGER) &&
      !(g.right&&g.wrong) && range(g.ninthDamage,0,1000) && range(g.hp,0,maxHp(g)) && range(g.hpScale,1,10000) &&
      range(g.monsterHp,g.kills===100?0:1,g.kills===100?0:g.hpScale);
  }
  function answer(g,correct){
    if(g.hp===0 || g.kills===100)return null;
    const lv=level(g),hp=currentMonster(g);
    g.hpScale=monsterMax(lv,g.difficulty);
    if(!correct){
      g.right=0;g.ninthDamage=0;g.wrong++;g.hp=Math.max(0,g.hp-10);g.monsterHp=Math.min(g.hpScale,hp+10);
      return {kind:'miss',level:lv,healed:g.monsterHp-hp};
    }
    g.wrong=0;g.right++;
    const amount=damage(attack(g),g.right,g.ninthDamage,g.tenthBase);
    if(g.right===9)g.ninthDamage=amount;
    if(g.right===10)g.tenthBase=attack(g);
    g.monsterHp=Math.max(0,hp-amount);
    if(g.monsterHp)return {kind:'hit',level:lv,damage:amount};
    const gold=reward(lv);g.kills++;g.gold+=gold;g.hp+=10;
    if(g.kills<100){g.hpScale=monsterMax(level(g),g.difficulty);g.monsterHp=g.hpScale;}
    return {kind:'kill',level:lv,damage:amount,gold};
  }
  function buy(g,kind){
    if(!Object.hasOwn(gear,kind))return false;
    const tier=g[kind],next=gear[kind][tier+1];
    if(!next||g.gold<next[1])return false;
    g.gold-=next[1];g[kind]++;
    if(kind==='armor'&&g.hp>0)g.hp+=next[2]-gear.armor[tier][2];
    return true;
  }
  function revive(g){
    if(g.hp!==0||g.kills===100)return false;
    g.hp=maxHp(g);g.right=0;g.wrong=0;g.ninthDamage=0;
    g.hpScale=monsterMax(level(g),g.difficulty);g.monsterHp=g.hpScale;return true;
  }
  return {difficultyNames,gear,baseHp,boss,monsterMax,level,maxHp,attack,reward,currentMonster,damage,taunt,fromLegacy,valid,answer,buy,revive};
})();
if(typeof module!=='undefined')module.exports=Game;
