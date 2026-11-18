// Extend the original program-drawn 48 x 44 sprites with the same palette/grid.
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib');
const out=path.join(__dirname,'../site/arena/pixel-gear');fs.mkdirSync(out,{recursive:true});
const palettes=[['#a77f54','#eac592'],['#bf7447','#ffd39b'],['#829aa8','#e0eff0'],['#6888a7','#eff8f8'],['#5aadb9','#c4fff9'],['#c79b53','#fff0b4'],['#ce786f','#ffe0b0'],['#9b85c4','#eadcff'],['#65b8a6','#ddfff0'],['#e5b45f','#fff5c9']];
const ink='#293443';
function canvas(w,h){
 const bytes=Buffer.alloc(w*h*4);
 const point=(x,y,color)=>{x=Math.round(x);y=Math.round(y);if(x<0||y<0||x>=w||y>=h)return;const p=(y*w+x)*4;for(let i=0;i<3;i++)bytes[p+i]=parseInt(color.slice(1+i*2,3+i*2),16);bytes[p+3]=255;};
 const line=(a,b,color)=>{let [x,y]=a,[xx,yy]=b;const dx=Math.abs(xx-x),dy=-Math.abs(yy-y),sx=x<xx?1:-1,sy=y<yy?1:-1;let e=dx+dy;for(;;){point(x,y,color);if(x===xx&&y===yy)break;const k=2*e;if(k>=dy){e+=dy;x+=sx;}if(k<=dx){e+=dx;y+=sy;}}};
 const poly=(pts,color,edge=ink)=>{for(let y=0;y<h;y++)for(let x=0;x<w;x++){let inside=false;for(let i=0,j=pts.length-1;i<pts.length;j=i++){const [a,b]=pts[i],[c,d]=pts[j];if((b>y)!==(d>y)&&x<(c-a)*(y-b)/(d-b)+a)inside=!inside;}if(inside)point(x,y,color);}pts.forEach((p,i)=>line(p,pts[(i+1)%pts.length],edge));};
 const rect=(x,y,ww,hh,color)=>{for(let yy=y;yy<y+hh;yy++)for(let xx=x;xx<x+ww;xx++)point(xx,yy,color);};
 const star=(x,y,color)=>{point(x,y,color);point(x-1,y,color);point(x+1,y,color);point(x,y-1,color);point(x,y+1,color);};
 function save(name){
  const crc=b=>{let c=0xffffffff;for(const n of b){c^=n;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0);}return (c^0xffffffff)>>>0;};
  const chunk=(type,data)=>{const t=Buffer.from(type),b=Buffer.alloc(data.length+12);b.writeUInt32BE(data.length);t.copy(b,4);data.copy(b,8);b.writeUInt32BE(crc(Buffer.concat([t,data])),b.length-4);return b;};
  const header=Buffer.alloc(13);header.writeUInt32BE(w);header.writeUInt32BE(h,4);header[8]=8;header[9]=6;
  const rows=Buffer.alloc((w*4+1)*h);for(let y=0;y<h;y++)bytes.copy(rows,y*(w*4+1)+1,y*w*4,(y+1)*w*4);
  fs.writeFileSync(path.join(out,name),Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',header),chunk('IDAT',zlib.deflateSync(rows)),chunk('IEND',Buffer.alloc(0))]));
 }
 return {point,line,poly,rect,star,save};
}
for(let tier=0;tier<10;tier++){
 const [metal,shine]=palettes[tier];
 if(tier>=6){
  const s=canvas(48,44);
  const blade=tier===8?[[32,24],[38,16],[39,9],[44,5],[45,10],[42,15],[35,25]]:tier===7?[[32,25],[33,20],[40,12],[40,8],[44,10],[44,14],[40,20],[35,25]]:[[32,25],[31,21],[40,11],[43,7],[45,12],[42,18],[35,26]];
  s.poly(blade,metal);s.line([34,22],[42,12],shine);s.line([30,23],[36,27],ink);s.line([30,22],[36,26],'#f0c176');s.line([31,25],[28,29],'#725049');s.point(28,29,shine);s.star(41,15,shine);if(tier===9){s.star(37,7,shine);s.star(46,18,shine);}s.save('sword-'+tier+'.png');
  const a=canvas(48,44);a.poly([[17,21],[21,22],[26,21],[26,28],[22,30],[16,28]],metal);a.line([18,22],[21,24],shine);a.line([21,24],[24,23],shine);a.poly([[12,21],[17,20],[20,22],[19,29],[16,32],[12,28]],metal);a.line([14,23],[14,28],shine);a.star(16,25,shine);a.rect(20,26,3,2,'#f2ce7c');if(tier>=8){a.rect(11,21,2,2,shine);a.rect(26,21,2,2,shine);}a.save('armor-'+tier+'.png');
 }
 const sword=canvas(32,32);
 sword.poly(tier===8?[[13,21],[14,12],[11,9],[16,2],[21,9],[18,12],[18,21]]:tier===7?[[13,22],[13,12],[17,7],[18,3],[21,6],[20,11],[17,15],[17,22]]:[[13,22],[13,9],[16,3],[19,9],[19,22]],metal);
 sword.line([15,10],[15,20],shine);sword.rect(10,21,12,3,ink);sword.rect(11,21,10,2,'#efc678');sword.rect(14,24,4,5,ink);sword.rect(15,24,2,4,'#88624e');sword.rect(14,28,4,2,shine);if(tier>=5)sword.star(24,8,shine);if(tier>=8)sword.star(7,16,shine);sword.save('sword-icon-'+tier+'.png');
 const armor=canvas(32,32);armor.poly([[8,7],[12,6],[14,9],[18,9],[20,6],[24,7],[28,13],[24,16],[22,14],[23,26],[9,26],[10,14],[8,16],[4,13]],tier?metal:'#55968a');armor.line([11,11],[13,14],shine);armor.line([13,14],[20,11],shine);armor.rect(10,22,13,3,'#735442');armor.rect(15,22,3,3,'#efc678');if(tier>=4)armor.star(16,17,shine);else armor.rect(15,16,3,3,shine);if(tier>=8){armor.star(4,4,shine);armor.star(27,23,shine);}armor.save('armor-icon-'+tier+'.png');
}
console.log('Built 8 original-grid equipment layers and 20 cute pixel shop icons.');
