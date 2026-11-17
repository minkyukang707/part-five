'use strict';
const {createHash}=require('node:crypto');
const {questionFromText}=require('./corpus.cjs');
const segmenter=new Intl.Segmenter('en',{granularity:'sentence'});
const entities={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' ',rsquo:'’',lsquo:'‘',ldquo:'“',rdquo:'”',ndash:'–',mdash:'—'};
function plain(html){
  return html.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/<[^>]+>/g,' ')
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi,(_,s)=>{
      if(!s.startsWith('#'))return entities[s]||' ';
      const n=s[1]==='x'?parseInt(s.slice(2),16):Number(s.slice(1));
      return n>0&&n<=0x10ffff?String.fromCodePoint(n):' ';
    }).replace(/\s+/g,' ').replace(/\s+([.,;:)])/g,'$1').replace(/\(\s+/g,'(').trim();
}
function oneArticle(blocks,genre,credit,url){
  for(const block of blocks){
    const protectedText=plain(block).replace(/\b(?:U\.S\.|U\.K\.|St\.|Dr\.|Mr\.|Mrs\.|Ms\.|e\.g\.|i\.e\.)/g,m=>m.replaceAll('.','\uE000'));
    for(const {segment} of segmenter.segment(protectedText)){
      const sentence=segment.trim().replaceAll('\uE000','.'),count=sentence.split(/\s+/).length;
      if(count<8||count>38||sentence.length>250||!/^[A-Z].*\.$/.test(sentence))continue;
      if(/https?:|www\.|\[|\]|[“”"]|copyright|photo credit|click here|learn more|image credit|image has been cropped|<|>|(?:email|contact) us/i.test(sentence))continue;
      const q=questionFromText(sentence);
      if(q){
        const id='web-'+createHash('sha256').update(url+'\n'+q.stem).digest('hex').slice(0,24);
        return {...q,id,genre,credit:credit+' · '+url};
      }
    }
  }
}
function papers(bytes){
  const data=JSON.parse(bytes.toString('utf8'));
  if(!Array.isArray(data.resultList?.result))throw Error('논문 자료 형식 오류');
  const rows=[];
  for(const article of data.resultList.result){
    if(article.license!=='cc by'||!article.abstractText||!article.authorString||!article.title||!article.pmcid)continue;
    const url='https://europepmc.org/articles/'+encodeURIComponent(article.pmcid);
    const q=oneArticle([article.abstractText.replace(/<\/?(?:title|h[1-6])[^>]*>[^<]{0,50}<\/(?:title|h[1-6])>/gi,' ')],'research',article.authorString+' · '+plain(article.title)+' · Europe PMC · CC BY',url);
    if(q)rows.push(q);
  }
  return {rows,cursor:data.nextCursorMark||'*'};
}
function news(bytes){
  const xml=bytes.toString('utf8');
  if(!xml.includes('<channel>'))throw Error('뉴스 자료 형식 오류');
  const rows=[];
  for(const [,item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)){
    const url=item.match(/<link>(https:\/\/(?:www|science)\.nasa\.gov\/[^<]+)<\/link>/)?.[1];
    if(!url||/apod|photojournal|image-article/.test(url))continue;
    const title=plain(item.match(/<title>([\s\S]*?)<\/title>/)?.[1]||'');
    const author=plain(item.match(/<dc:creator>([\s\S]*?)<\/dc:creator>/)?.[1]||'');
    const html=item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/)?.[1]||'';
    const paragraphs=[...html.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi)].map(m=>m[1]).filter(p=>!/<(?:svg|img|iframe|script|nav)\b/i.test(p)&&!/[“”"]/.test(plain(p)));
    const q=oneArticle(paragraphs,'news',['NASA',author,title].filter(Boolean).join(' · '),url);
    if(q)rows.push(q);
  }
  return {rows};
}
function paperUrl(cursor='*'){
  const query='OPEN_ACCESS:y AND HAS_ABSTRACT:y AND LICENSE:"cc by" AND (TITLE:biodiversity OR TITLE:energy OR TITLE:learning OR TITLE:transport)';
  return 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?'+new URLSearchParams({format:'json',resultType:'core',pageSize:'60',query,cursorMark:cursor});
}
module.exports={papers,news,paperUrl};
