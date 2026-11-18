'use strict';
const MiniGameEngine=(()=>{
  const segmenter=typeof Intl.Segmenter==='function'?new Intl.Segmenter(undefined,{granularity:'grapheme'}):null;
  const letters=text=>segmenter?Array.from(segmenter.segment(text.normalize('NFC')),s=>s.segment):Array.from(text.normalize('NFC'));
  const shuffle=(items,rng=Math.random)=>{const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
  function words(rows){
    const seenWords=new Set(),seenMeanings=new Set();
    return rows.flatMap(row=>{
      const word=String(row.word||row.w||'').normalize('NFC');
      const meaning=String(row.meanings?.[0]||row.main||'').split(/[,;/]/)[0].trim();
      if(!word||!/[가-힣]/u.test(meaning)||meaning.length>22||word.length>24||seenWords.has(word)||seenMeanings.has(meaning))return [];
      seenWords.add(word);seenMeanings.add(meaning);
      return [{key:row.key||word,word,meaning}];
    });
  }
  function tiles(word,rng=Math.random){
    const original=letters(word).map((text,id)=>({text,id}));
    let result=shuffle(original,rng);
    if(result.map(t=>t.text).join('')===word&&new Set(original.map(t=>t.text)).size>1){
      const other=result.findIndex(t=>t.text!==result[0].text);[result[0],result[other]]=[result[other],result[0]];
    }
    return result;
  }
  function line(start,end,size){
    const r1=Math.floor(start/size),c1=start%size,r2=Math.floor(end/size),c2=end%size;
    const dr=r2-r1,dc=c2-c1;
    if(dr!==0&&dc!==0&&Math.abs(dr)!==Math.abs(dc))return [];
    return Array.from({length:Math.max(Math.abs(dr),Math.abs(dc))+1},(_,i)=>(r1+i*Math.sign(dr))*size+c1+i*Math.sign(dc));
  }
  function grid(pool,count=4,size=7,rng=Math.random){
    const cells=Array(size*size).fill(''),placed=[];
    const directions=[[0,1],[1,0],[1,1],[1,-1],[0,-1],[-1,0],[-1,-1],[-1,1]];
    for(const word of shuffle(pool.filter(w=>letters(w.word).length>=2&&letters(w.word).length<=size&&!/\s/.test(w.word)),rng)){
      const chars=letters(word.word),starts=shuffle(Array.from({length:size*size},(_,i)=>i),rng);
      let position;
      for(const start of starts){
        for(const [dr,dc] of shuffle(directions,rng)){
          const r=Math.floor(start/size),c=start%size,er=r+dr*(chars.length-1),ec=c+dc*(chars.length-1);
          if(er<0||er>=size||ec<0||ec>=size)continue;
          const path=chars.map((_,i)=>(r+dr*i)*size+c+dc*i);
          if(path.every((index,i)=>!cells[index]||cells[index]===chars[i])){position=path;break;}
        }
        if(position)break;
      }
      if(!position)continue;
      position.forEach((index,i)=>cells[index]=chars[i]);placed.push({...word,path:position});
      if(placed.length===count)break;
    }
    const alphabet=[...new Set(placed.flatMap(w=>letters(w.word)))];
    return {size,words:placed,cells:cells.map(c=>c||alphabet[Math.floor(rng()*alphabet.length)]||'a')};
  }
  function options(word,pool,rng=Math.random){return shuffle([word,...shuffle(pool.filter(w=>w.meaning!==word.meaning),rng).slice(0,2)],rng);}
  const score=(correct,attempts)=>Math.max(0,correct*100-Math.max(0,attempts-correct)*15);
  const stars=(correct,attempts)=>!correct?0:correct/Math.max(attempts,1)>=.9?3:correct/Math.max(attempts,1)>=.65?2:1;
  return {letters,shuffle,words,tiles,line,grid,options,score,stars};
})();
if(typeof module!=='undefined')module.exports=MiniGameEngine;
