const fs = require('node:fs');
const path = require('node:path');
const {papers,news,paperUrl} = require('./articles.cjs');
const {readPack} = require('./corpus.cjs');
const {dir,merge,write} = require('./library.cjs');
const stateFile=path.join(__dirname,'feeds.json');
const languages=['kor','jpn','fra','deu','spa','ita','por','rus'];

async function download(url) {
  const response=await fetch(url,{signal:AbortSignal.timeout(60000)});
  if(!response.ok)throw Error('HTTP '+response.status);
  const chunks=[];let bytes=0;
  for await(const chunk of response.body){
    bytes+=chunk.length;
    if(bytes>55*1024*1024)throw Error('Source file too large');
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
async function run(){
  const state=JSON.parse(fs.readFileSync(stateFile,'utf8'));
  const lang=languages[state.language % languages.length];
  let questions=JSON.parse(fs.readFileSync(path.join(dir,'questions.json'),'utf8'));
  const sources=[
    ['Europe PMC',async()=>{const p=papers(await download(paperUrl(state.cursor)));state.cursor=p.cursor===state.cursor?'*':p.cursor;return p.rows;}],
    ['NASA',async()=>news(await download('https://www.nasa.gov/news-release/feed/')).rows],
    ['Tatoeba '+lang,async()=>readPack(await download('https://www.manythings.org/anki/'+lang+'-eng.zip'),lang)]
  ];
  let success=0;
  for(const [name,read] of sources){
    try{const rows=await read(),before=questions.length;questions=merge(questions,rows);success++;
      console.log(name+' added '+(questions.length-before));}
    catch(error){console.warn(name+': '+error.message);}
  }
  if(!success)throw Error('All sources unavailable. The previous library is preserved.');
  state.language=(state.language+1)%languages.length;
  write(questions);fs.writeFileSync(stateFile,JSON.stringify(state)+'\n');
  console.log(questions.length+' unique online questions');
}
run().catch(e=>{console.error(e.message);process.exitCode=1;});
