'use strict';
const PersonalStudy = (() => {
  const database = 'partfive-materials-v1';
  const limits = {bytes:20*1024*1024, pages:200, characters:600000, documents:30, questions:1200};
  const languages = {en:'영어',ja:'일본어',es:'스페인어',tr:'터키어'};
  const stopWords = {
    en:new Set('the and that this with from into have been were they their them your for you is are was has had not but can will would could should does did its our all any more some than then when where what which who also very'.split(' ')),
    es:new Set('el la de en un que los las una unos unas del con por para como pero sus esta este esto son ser hay fue más muy'.split(' ')),
    tr:new Set('bir bu şu ve ile ama için gibi daha çok var yok olan olarak veya değil'.split(' ')),
    ja:new Set(['です','ます','でした','ました','いる','ある','する','こと','もの','それ','これ','その','この','から','まで','ため'])
  };
  const grammar = [
    [/\bin charge (of)\b/i,'연어 · in charge of','in charge of는 맡고 있는 일이나 대상을 연결합니다.'],
    [/\bresponsible (for)\b/i,'연어 · responsible for','책임지는 대상은 responsible for 뒤에 놓습니다.'],
    [/\binterested (in)\b/i,'연어 · interested in','관심 분야는 interested in 뒤에 놓습니다.'],
    [/\baccording (to)\b/i,'연어 · according to','정보의 출처나 기준은 according to 뒤에 놓습니다.'],
    [/\bin order (to)\b/i,'목적 · in order to','in order to 뒤에 동사원형을 붙여 목적을 나타냅니다.'],
    [/\bin spite (of)\b/i,'양보 · in spite of','in spite of 뒤에는 명사구가 이어집니다.'],
    [/\bconsist(?:s|ed)? (of)\b/i,'연어 · consist of','전체를 구성하는 요소는 consist of 뒤에 나옵니다.'],
    [/\bparticipat(?:e|es|ed|ing) (in)\b/i,'연어 · participate in','참여하는 활동은 participate in 뒤에 나옵니다.'],
    [/\bas soon (as)\b/i,'시간 · as soon as','as soon as는 뒤 사건이 일어나자마자 이어지는 일을 연결합니다.'],
    [/\b(?:has|have|had) (?:already |just |never |recently )?(been)\b/i,'완료형 · have been','완료형 have, has, had 다음에 be의 과거분사 been이 옵니다.'],
    [/\b(?:may|might|must|could|should) (have) (?:been|caused|led|occurred|affected|contributed)\b/i,'조동사 완료형','조동사 뒤의 have + 과거분사는 과거 일에 대한 추론이나 가능성을 나타냅니다.'],
    [/\b(?:must|should|will|can|could) (be) (?:used|held|given|taken|seen|made|found|sent|published|completed|considered)\b/i,'조동사 수동태','조동사 뒤에서 be + 과거분사가 수동 의미를 나타냅니다.']
  ].map(([pattern,label,why])=>({pattern:new RegExp(pattern.source,pattern.flags+'d'),label,why}));
  let host, documents=[], current=null, mounted=false, busy=false, operation=0, pdfTask=null;
  let dbPromise, ready=Promise.resolve(), writeQueue=Promise.resolve(), memoryOnly=false;
  const $ = id => host.querySelector('#'+id);
  const node = (tag,text,cls) => {const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
  const normal = (s,language) => s.normalize('NFKC').trim().replace(/[’‘]/g,"'").toLocaleLowerCase(language);
  function rememberCurrent(){try{localStorage.setItem('partfive.materials.selected',current.id);}catch{}}
  const tokens = (text,language) => [...new Intl.Segmenter(language,{granularity:'word'}).segment(text)].filter(w=>w.isWordLike && /\p{L}/u.test(w.segment));
  function buildQuestions(text,language) {
    const frequency=new Map(), segments=[];
    for(const piece of new Intl.Segmenter(language,{granularity:'sentence'}).segment(text)) {
      for(const section of piece.segment.split(/\n{2,}/)) {
        const sentence=section.replace(/\s+/g,' ').trim();
        if(sentence.length<12 || sentence.length>480)continue;
        const words=tokens(sentence,language);
        if(words.length<5)continue;
        for(const word of words){const key=normal(word.segment,language);if(!stopWords[language].has(key)&&key.length>1)frequency.set(key,(frequency.get(key)||0)+1);}
        segments.push({sentence,words});
      }
    }
    const questions=[],seen=new Set();
    for(const {sentence,words} of segments){
      const targets=[];
      if(language==='en')for(const rule of grammar){
        const match=rule.pattern.exec(sentence);
        if(match){const [start,end]=match.indices[1];targets.push({start,end,answer:sentence.slice(start,end),label:rule.label,why:rule.why});break;}
      }
      const candidates=words.filter(w=>w.segment.length>1 && !stopWords[language].has(normal(w.segment,language)));
      candidates.sort((a,b)=>(frequency.get(normal(b.segment,language))||0)-(frequency.get(normal(a.segment,language))||0)||b.segment.length-a.segment.length);
      for(const word of candidates.slice(0,2))targets.push({start:word.index,end:word.index+word.segment.length,answer:word.segment,label:'원문 어휘 · '+word.segment,why:'원문에서 이 자리에 쓰인 표현을 복원합니다. 앞뒤 표현과 함께 다시 읽고 기억해 보세요.'});
      for(const target of targets){
        const identity=sentence+'\n'+target.start;
        if(seen.has(identity))continue;
        seen.add(identity);
        questions.push({...target,original:sentence,before:sentence.slice(0,target.start),after:sentence.slice(target.end)});
        if(questions.length===limits.questions)break;
      }
      if(questions.length===limits.questions)break;
    }
    return {questions,frequency:[...frequency].sort((a,b)=>b[1]-a[1]).slice(0,24)};
  }
  const initialProgress=()=>({index:0,order:null,round:0,marks:{},result:null,attempts:0,correct:0});
  function connect(){
    return dbPromise??=new Promise((resolve,reject)=>{
      const request=indexedDB.open(database,1);
      request.onupgradeneeded=()=>request.result.createObjectStore('documents',{keyPath:'id'});
      request.onsuccess=()=>{const db=request.result;db.onversionchange=()=>db.close();resolve(db);};
      request.onerror=()=>reject(request.error);
      request.onblocked=()=>reject(Error('다른 탭에서 자료함을 닫고 다시 시도하세요.'));
    });
  }
  async function transaction(mode,run){
    const db=await connect();
    return new Promise((resolve,reject)=>{
      const tx=db.transaction('documents',mode);let result;
      const request=run(tx.objectStore('documents'));
      if(request)request.onsuccess=()=>{result=request.result;};
      tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||Error('저장 중단'));
    });
  }
  function save(document){
    const copy=structuredClone(document);
    writeQueue=writeQueue.catch(()=>{}).then(()=>transaction('readwrite',store=>store.put(copy)));
    return writeQueue;
  }
  function saveProgress(){
    if(!current)return;
    save(current).then(()=>{memoryOnly=false;}).catch(()=>{
      memoryOnly=true;status('브라우저에 저장할 수 없어 이번 탭에서만 학습 기록을 유지합니다.','warning');
    });
  }
  function status(message,kind=''){$('materialStatus').textContent=message;$('materialStatus').dataset.kind=kind;}
  function setBusy(value){
    busy=value;
    for(const id of ['materialImport','materialFile','materialLanguage','materialTitle','materialText'])$(id).disabled=value;
    $('materialCancel').hidden=!value;
  }
  async function pdfText(file,token){
    const pdfjs=await import('./vendor/pdfjs/pdf.mjs');
    if(token!==operation)throw Error('취소됨');
    pdfjs.GlobalWorkerOptions.workerSrc=new URL('./vendor/pdfjs/pdf.worker.mjs',document.baseURI).href;
    const bytes=new Uint8Array(await file.arrayBuffer());
    if(token!==operation)throw Error('취소됨');
    const task=pdfjs.getDocument({data:bytes,isEvalSupported:false,useSystemFonts:true,disableFontFace:true,
      cMapUrl:new URL('./vendor/pdfjs/cmaps/',document.baseURI).href,cMapPacked:true,
      standardFontDataUrl:new URL('./vendor/pdfjs/standard_fonts/',document.baseURI).href});
    pdfTask=task;
    task.onPassword=()=>{void task.destroy();status('암호를 해제한 PDF 파일을 선택해 주세요.','warning');};
    try{
      const pdf=await task.promise;
      if(pdf.numPages>limits.pages)throw Error('한 번에 200쪽까지 읽을 수 있어요. 공부할 부분을 나누어 올려 주세요.');
      const sections=[];let length=0,empty=0;
      for(let page=1;page<=pdf.numPages;page++){
        if(token!==operation)throw Error('취소됨');
        status('PDF 글자 읽는 중 · '+page+' / '+pdf.numPages+'쪽');
        const p=await pdf.getPage(page),content=await p.getTextContent();
        let text='',lastY=null;
        for(const item of content.items){
          if(typeof item.str!=='string')continue;
          const y=item.transform?.[5];
          if(lastY!==null && y!==undefined && Math.abs(y-lastY)>Math.max(2,(item.height||10)*.7))text+='\n';
          text+=item.str+(item.hasEOL?'\n':' ');lastY=y;
        }
        p.cleanup();text=text.replace(/([A-Za-z])-\n([a-z])/g,'$1$2').replace(/(?<![.!?。！？\n])\n(?!\n)/g,' ');
        if(text.trim().length<8)empty++;
        sections.push(text);length+=text.length;
        if(length>limits.characters)throw Error('읽은 글자가 60만 자를 넘었어요. 파일을 나누어 올려 주세요.');
      }
      if(empty===pdf.numPages)throw Error('이 PDF에서 글자를 찾지 못했어요. 이미지 PDF는 OCR로 텍스트를 추출한 뒤 올리거나 본문을 붙여 넣어 주세요.');
      return {text:sections.join('\n\n'),note:empty?'글자가 없는 '+empty+'쪽은 문제 생성에서 제외했습니다.':''};
    }finally{await task.destroy().catch(()=>{});if(pdfTask===task)pdfTask=null;}
  }
  async function importSource(event){
    event.preventDefault();if(busy)return;
    if(documents.length>=limits.documents){status('자료를 30개까지 보관할 수 있어요. 읽은 자료를 삭제한 뒤 추가하세요.','warning');return;}
    const token=++operation,file=$('materialFile').files[0],language=$('materialLanguage').value;
    let text=$('materialText').value, note='', title=$('materialTitle').value.trim();
    setBusy(true);status('자료를 읽고 있어요…');
    try{
      if(file){
        if(file.size>limits.bytes)throw Error('20 MB 이하의 파일을 선택하세요.');
        if(/\.pdf$/i.test(file.name))({text,note}=await pdfText(file,token));
        else if(/\.(?:txt|md|text)$/i.test(file.name)){text=await file.text();if(text.includes('\u0000'))throw Error('UTF-8 텍스트 파일로 저장한 뒤 다시 올려 주세요.');}
        else throw Error('PDF, TXT 또는 MD 파일을 선택하세요.');
        title ||= file.name.replace(/\.[^.]+$/,'');
      }
      text=text.replace(/\u0000/g,'').trim();
      if(token!==operation)return;
      if(!text)throw Error('공부할 본문을 붙여 넣거나 파일을 선택해 주세요.');
      if(text.length>limits.characters)throw Error('한 자료당 60만 자까지 읽을 수 있어요. 본문을 나누어 주세요.');
      await new Promise(resolve=>setTimeout(resolve,0));
      const built=buildQuestions(text,language);
      if(token!==operation)return;
      if(!built.questions.length)throw Error('연습할 문장을 찾지 못했어요. 선택한 언어의 본문을 2~3문장 이상 넣어 주세요.');
      const document={id:crypto.randomUUID(),title:(title||'나의 읽기 자료').slice(0,100),language,text,...built,
        created:Date.now(),progress:initialProgress(),note};
      $('materialCancel').disabled=true;
      try{await save(document);memoryOnly=false;}
      catch{memoryOnly=true;}
      if(token!==operation)return;
      documents.unshift(document);current=document;rememberCurrent();
      $('materialFile').value='';$('materialText').value='';$('materialTitle').value='';
      drawShelf();drawStudy();
      status(built.questions.length.toLocaleString()+'개 원문 복원 문제를 만들었어요.'+(built.questions.length===limits.questions?' 본문의 앞부분부터 최대 1,200개를 골랐어요. 뒷부분을 더 연습하려면 나누어 추가하세요.':'')+(note?' '+note:'')+(memoryOnly?' 이 탭에서만 보관됩니다.':''));
    }catch(error){if(token===operation)status(error.name==='PasswordException'?'암호를 해제한 PDF 파일을 선택해 주세요.':error.message,'warning');}
    finally{if(token===operation){setBusy(false);$('materialCancel').disabled=false;}}
  }
  function drawShelf(){
    const shelf=$('materialShelf');shelf.replaceChildren();
    $('materialCount').textContent=documents.length+'개 자료';
    if(!documents.length){shelf.append(node('p','논문·뉴스·소설에서 공부할 부분을 추가해 보세요.','materialMuted'));return;}
    for(const doc of documents){
      const row=node('div',undefined,'materialSource');
      const select=node('button',undefined,'materialSelect');select.type='button';select.setAttribute('aria-pressed',String(current?.id===doc.id));
      select.append(node('strong',doc.title),node('small',languages[doc.language]+' · '+doc.questions.length+'문제 · 완료 '+Object.keys(doc.progress.marks).length));
      select.onclick=()=>{current=doc;rememberCurrent();drawShelf();drawStudy();};
      const remove=node('button','삭제','materialDelete');remove.type='button';remove.setAttribute('aria-label',doc.title+' 삭제');
      remove.onclick=()=>{
        const prompt=node('div',undefined,'materialDeleteConfirm');
        prompt.append(node('p','이 자료와 자료별 학습 기록을 삭제할까요?'));
        const yes=node('button','자료 삭제','outline'),no=node('button','취소','outline');
        yes.type=no.type='button';
        yes.onclick=async()=>{yes.disabled=true;try{
          await writeQueue.catch(()=>{});await transaction('readwrite',store=>store.delete(doc.id));
          documents=documents.filter(d=>d.id!==doc.id);if(current?.id===doc.id)current=documents[0]||null;drawShelf();drawStudy();status('자료를 삭제했어요.');
        }catch{yes.disabled=false;status('자료를 삭제하지 못했어요. 다시 시도하세요.','warning');}};
        no.onclick=drawShelf;prompt.append(yes,no);row.replaceChildren(prompt);
      };
      row.append(select,remove);shelf.append(row);
    }
  }
  function queue(){return current.progress.order||current.questions.map((_,i)=>i);}
  function question(){return current?.questions[queue()[current.progress.index]];}
  function drawStudy(){
    $('materialStudy').hidden=!current;
    if(!current)return;
    const progress=current.progress,order=queue(),q=question();
    $('materialSourceTitle').textContent=current.title;
    $('materialProgress').textContent=Math.min(progress.index,order.length)+' / '+order.length;
    $('materialMeter').max=order.length;$('materialMeter').value=progress.index;
    $('materialMode').textContent=progress.order?'선택한 문장 복습':'원문 복원';
    $('materialOriginalText').textContent=current.text;
    $('materialOriginal').open=false;
    $('materialQuiz').hidden=!q;$('materialDone').hidden=!!q;
    const misses=Object.values(progress.marks).filter(v=>!v).length;
    $('materialSummary').textContent='이 자료에서 '+Object.keys(progress.marks).length+'개 문제를 풀었어요. 다시 볼 표현 '+misses+'개';
    $('materialRetry').disabled=misses===0;
    const frequent=$('materialKeywords');frequent.replaceChildren(...current.frequency.map(([word,count])=>{
      const b=node('button',word+' · '+count,'materialWord');b.type='button';b.onclick=()=>{
        const indices=current.questions.flatMap((item,i)=>normal(item.answer,current.language)===word?[i]:[]);
        if(!indices.length){status('이 단어가 빈칸인 문제는 아직 없어요. 원문에서 해당 표현을 찾아 읽어 보세요.');return;}
        progress.order=indices;progress.index=0;progress.result=null;progress.round++;saveProgress();drawStudy();
      };return b;
    }));
    if(!q)return;
    $('materialSentence').lang=current.language;
    const gap=node('span','_____','materialBlank');gap.setAttribute('aria-label','빈칸');
    $('materialSentence').replaceChildren(document.createTextNode(q.before),gap,document.createTextNode(q.after));
    $('materialCue').textContent=q.label.startsWith('원문 어휘')?'첫 글자 '+[...q.answer][0]+' · '+[...q.answer].length+'글자':q.label;
    $('materialAnswer').lang=current.language;$('materialAnswer').value=progress.result?.answer||'';
    $('materialAnswer').disabled=!!progress.result;$('materialCheck').disabled=!!progress.result;
    $('materialFeedback').hidden=!progress.result;$('materialNext').hidden=!progress.result;
    if(progress.result)showResult(q,progress.result);
    else{$('materialFeedback').replaceChildren();$('materialAnswer').focus({preventScroll:true});}
  }
  function showResult(q,result){
    const area=$('materialFeedback');area.replaceChildren();area.classList.toggle('materialMiss',!result.ok);
    area.append(node('strong',result.ok?'원문을 기억했어요!':'원문 표현 · '+q.answer),node('p',q.why),node('p',q.original,'materialQuotation'));
    area.lastChild.lang=current.language;
    if(!result.ok)area.append(node('small','입력한 답 · '+(result.answer||'모름')));
  }
  function check(event){
    event.preventDefault();if(!current||current.progress.result||!question())return;
    const answer=$('materialAnswer').value.trim();if(!answer){$('materialAnswer').reportValidity();return;}
    const q=question(),p=current.progress,index=queue()[p.index],ok=normal(answer,current.language)===normal(q.answer,current.language);
    p.result={answer,ok};p.marks[index]=ok;p.attempts++;if(ok)p.correct++;
    saveProgress();drawShelf();drawStudy();
    window.LearningLog?.record({mode:'materials',language:current.language,key:current.id+':'+index,label:q.label,correct:ok,source:current.title});
  }
  function mount(element){
    if(mounted)return PersonalStudy;mounted=true;host=element;
    host.classList.add('materialsPage');
    host.innerHTML=`<section class="sheet materialInput"><div class="sheethead"><h1>내 자료로 공부</h1><span class="count" id="materialCount"></span></div>
      <p class="materialIntro">읽고 싶은 글에서 문장과 단어를 골라 연습해요. 추가한 본문과 기록은 이 브라우저에 저장됩니다.</p>
      <form id="materialImportForm"><div class="materialFields"><label>자료 이름<input id="materialTitle" maxlength="100" placeholder="논문·기사·소설 제목"></label>
      <label>본문 언어<select id="materialLanguage"><option value="en">영어</option><option value="ja">일본어</option><option value="es">스페인어</option><option value="tr">터키어</option></select></label></div>
      <label class="materialFileLabel">파일 선택<input id="materialFile" type="file" accept=".pdf,.txt,.text,.md,application/pdf,text/plain,text/markdown"></label>
      <small class="materialMuted">PDF·TXT·MD · 20 MB, PDF 200쪽까지 · 텍스트 파일은 UTF-8</small>
      <label for="materialText" class="materialPasteLabel">또는 본문 붙여 넣기</label><textarea id="materialText" maxlength="600000" rows="5" placeholder="공부할 글을 붙여 넣으세요. 웹 기사는 본문을 복사해 넣을 수 있어요."></textarea>
      <p class="materialMuted">선택한 파일을 먼저 읽습니다. 파일이 없으면 붙여 넣은 본문을 사용합니다.</p>
      <div class="materialActions"><button id="materialCancel" type="button" class="outline" hidden>읽기 취소</button><button id="materialImport" type="submit" class="primary">자료 추가하고 공부하기</button></div></form>
      <p id="materialStatus" role="status"></p><div id="materialShelf"></div></section>
      <section id="materialStudy" class="sheet" hidden><div class="sheethead"><h2 id="materialSourceTitle"></h2><span id="materialProgress" class="count"></span></div>
      <progress id="materialMeter" value="0" max="1" aria-label="자료 학습 진도"></progress>
      <div class="materialStudyNav"><span id="materialMode"></span><button id="materialAll" type="button" class="outline">전체 문장</button><button id="materialRetry" type="button" class="outline">틀린 표현 복습</button></div>
      <div id="materialQuiz"><p class="materialMuted">빈칸에 쓰였던 원문 표현을 입력하세요. 기억나지 않으면 ‘모름’을 입력해요.</p>
      <p id="materialSentence"></p><p id="materialCue"></p><form id="materialAnswerForm"><div class="entry"><input id="materialAnswer" autocomplete="off" spellcheck="false" maxlength="120" required aria-label="원문 빈칸 답"><button id="materialCheck" class="primary">채점</button></div></form>
      <div id="materialFeedback" hidden aria-live="polite"></div><button id="materialNext" type="button" class="primary" hidden>다음 표현 →</button></div>
      <div id="materialDone" hidden><h2>선택한 문장을 모두 연습했어요.</h2><p id="materialSummary"></p></div>
      <details class="materialDetails"><summary>자주 나온 단어로 연습</summary><div id="materialKeywords"></div></details>
      <details id="materialOriginal" class="materialDetails"><summary>원문 읽기</summary><p class="materialMuted">PDF의 표·여러 단·각주는 글자 추출 순서가 달라질 수 있어요. 원본과 비교하며 읽어 주세요.</p><pre id="materialOriginalText"></pre></details></section>`;
    $('materialImportForm').onsubmit=importSource;
    $('materialAnswerForm').onsubmit=check;
    $('materialAnswer').addEventListener('keydown',event=>{if(event.key==='Enter'&&(event.isComposing||event.keyCode===229))event.preventDefault();});
    $('materialCancel').onclick=()=>{operation++;void pdfTask?.destroy().catch(()=>{});setBusy(false);status('자료 읽기를 취소했어요.');};
    $('materialNext').onclick=()=>{if(!current?.progress.result)return;current.progress.index++;current.progress.result=null;saveProgress();drawStudy();};
    $('materialAll').onclick=()=>{if(!current)return;Object.assign(current.progress,{index:0,order:null,result:null,round:current.progress.round+1});saveProgress();drawStudy();};
    $('materialRetry').onclick=()=>{if(!current)return;const p=current.progress;const order=Object.keys(p.marks).filter(k=>!p.marks[k]).map(Number);if(!order.length)return;Object.assign(p,{index:0,order,result:null,round:p.round+1});saveProgress();drawStudy();};
    ready=transaction('readonly',store=>store.getAll()).then(rows=>{
      documents=rows.filter(d=>d&&languages[d.language]&&typeof d.text==='string'&&Array.isArray(d.questions)&&d.progress?.marks).sort((a,b)=>b.created-a.created);
      let selected;try{selected=localStorage.getItem('partfive.materials.selected');}catch{}
      current=documents.find(d=>d.id===selected)||documents[0]||null;drawShelf();drawStudy();
    }).catch(()=>{memoryOnly=true;drawShelf();status('자료함 저장소를 열지 못했어요. 이번 탭에서 자료를 추가하고 공부할 수 있습니다.','warning');});
    return PersonalStudy;
  }
  function open(){if(host&&current)drawStudy();}
  async function review(key){
    await ready;
    if(typeof key!=='string')return false;
    const split=key.lastIndexOf(':'),id=key.slice(0,split),index=Number(key.slice(split+1));
    const item=documents.find(d=>d.id===id);
    if(!item||!Number.isSafeInteger(index)||index<0||index>=item.questions.length)return false;
    current=item;rememberCurrent();
    Object.assign(current.progress,{index:0,order:[index],result:null,round:current.progress.round+1});
    saveProgress();drawShelf();drawStudy();return true;
  }
  async function resetProgress(){
    await writeQueue.catch(()=>{});
    const rows=await transaction('readonly',store=>store.getAll());
    for(const row of rows){row.progress=initialProgress();await transaction('readwrite',store=>store.put(row));}
    documents.forEach(d=>{d.progress=initialProgress();});if(host){drawShelf();drawStudy();}
  }
  return {mount,open,review,resetProgress,buildQuestions};
})();
if(typeof module!=='undefined')module.exports=PersonalStudy;
