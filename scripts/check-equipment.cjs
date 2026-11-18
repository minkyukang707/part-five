const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const Game=require('../site/game.js');
for(const kind of ['sword','armor']){
 const g=Game.fromLegacy({},{});g.gold=50000;
 assert.equal(Game.gear[kind].length,10);
 for(let tier=0;tier<10;tier++){
  const file=path.join(__dirname,'../site',Game.gearArt(kind,tier));
  const png=fs.readFileSync(file);assert(png.length>10000);assert.equal(png.readUInt32BE(16)>=512,true,'detailed source art');assert.equal(png[25],6,'RGBA cutout');
  if(!tier)continue;
  const gold=g.gold,hp=g.hp;assert(Game.buy(g,kind));assert.equal(g.gold,gold-Game.gear[kind][tier][1]);assert.equal(g[kind],tier);assert.equal(Game.worn(g,kind),tier);
  if(kind==='armor')assert.equal(g.hp,hp+Game.gear.armor[tier][2]-Game.gear.armor[tier-1][2]);
  assert(Game.valid(JSON.parse(JSON.stringify(g))),'new tiers survive save validation');
 }
 const before=JSON.stringify(g);assert.equal(Game.buy(g,kind),false);assert.equal(JSON.stringify(g),before);
 const stats=[Game.attack(g),Game.maxHp(g),g.gold,g.hp];assert(Game.equipLook(g,kind,0));assert.equal(Game.worn(g,kind),0);assert.deepEqual([Game.attack(g),Game.maxHp(g),g.gold,g.hp],stats,'cosmetics never reduce permanent stats or charge gold');
 assert.equal(Game.equipLook(g,kind,10),false);assert.equal(Game.equipLook(g,'unknown',0),false);
 const legacy={...g,sword:5,armor:5,hp:100};delete legacy.swordLook;delete legacy.armorLook;assert(Game.valid(legacy));assert.equal(Game.worn(legacy,kind),5);
}
const poor=Game.fromLegacy({},{});assert.equal(Game.buy(poor,'sword'),false);assert.equal(Game.equipLook(poor,'armor',1),false);
const down=Game.fromLegacy({},{});down.gold=100;down.hp=0;assert(Game.buy(down,'armor'));assert.equal(down.hp,0,'armor purchase does not revive');assert(Game.revive(down));assert.equal(down.hp,120);
const max=Game.fromLegacy({},{});max.sword=9;max.armor=9;max.hp=Game.maxHp(max);const hits=Array.from({length:10},()=>Game.answer(max,true).damage);assert.equal(hits[9],hits[8]*2);assert(Game.valid(max));
console.log('PASS Equipment: 20 detailed RGBA assets, ten tiers, costs/stats, old/new saves, cosmetics, dead-state purchase and max-gear combo.');
