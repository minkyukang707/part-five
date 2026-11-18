const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const root=path.join(__dirname,'..'),site=path.join(root,'site'),dist=path.join(root,'dist');
fs.mkdirSync(dist,{recursive:true});
fs.cpSync(site,dist,{recursive:true});
function list(dir){
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
    const item=path.join(dir,entry.name);
    return entry.isDirectory()?list(item):[path.relative(site,item).split(path.sep).join('/')];
  });
}
const files=list(site).sort().filter(name=>!name.startsWith('library/'));
const template=fs.readFileSync(path.join(__dirname,'sw-template.js'),'utf8');
const digest=crypto.createHash('sha256').update(template);
for(const file of files){digest.update(file);digest.update(fs.readFileSync(path.join(site,file)));}
const worker=template.replace('__RELEASE__',digest.digest('hex').slice(0,16))
  .replace('/*ASSETS*/[]',JSON.stringify(files.filter(f=>!f.endsWith('.wasm'))))
  .replace('/*PRECACHE*/[]',JSON.stringify(files.filter(f=>!f.endsWith('.wasm')&&!f.startsWith('vendor/pdfjs/'))));
fs.writeFileSync(path.join(dist,'sw.js'),worker);
fs.writeFileSync(path.join(dist,'.nojekyll'),'');
console.log('Built '+files.length+' application assets.');
