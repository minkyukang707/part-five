'use strict';
// A visible-time study phase shared by all four vocabulary courses.
const WordPreview=(()=>{
  function create(){
    let id=null,remaining=8000,phase='study',paused=false,box,form,meaning,last=0,timer;
    const visible=()=>box&&box.getClientRects().length&&window.StudyLocale?.ready()&&!document.hidden;
    function paint(){
      if(!box)return;
      box.dataset.phase=phase;form.hidden=phase!=='quiz';
      box.querySelector('[data-preview=meaning]').textContent=phase==='study'?meaning:'뜻을 가렸어요. 기억나는 뜻을 입력해 보세요.';
      box.querySelector('[data-preview=title]').textContent=phase==='study'?'① 뜻 익히기':'② 기억 퀴즈';
      box.querySelector('[data-preview=time]').textContent=phase==='study'?(paused?'읽는 중 · 시간 멈춤':Math.ceil(remaining/1000)+'초 후 뜻을 가려요'):'생각할 시간은 충분해요';
      const control=box.querySelector('button');control.hidden=phase!=='study';control.textContent=paused?'학습 시간 계속':'천천히 읽기';
      const meter=box.querySelector('progress');meter.value=remaining;meter.hidden=phase!=='study';
    }
    function stop(){clearInterval(timer);timer=null;}
    function tick(){
      const now=performance.now(),elapsed=now-last;last=now;
      if(phase!=='study'||!visible()||paused)return;
      remaining=Math.max(0,remaining-Math.min(elapsed,300));
      if(!remaining){phase='quiz';stop();paint();form.querySelector('input')?.focus({preventScroll:true});return;}
      paint();
    }
    function bind(target,answerForm,token,text){
      box=target;form=answerForm;meaning=text;box.hidden=false;
      if(token!==id){id=token;remaining=8000;phase='study';paused=false;}
      box.classList.add('wordPreview');
      box.innerHTML='<div class="previewTop"><strong data-preview="title"></strong><span data-preview="time"></span></div><p data-preview="meaning"></p><progress max="8000" aria-label="뜻을 공부할 남은 시간"></progress><button type="button" class="outline"></button>';
      box.querySelector('button').onclick=()=>{paused=!paused;last=performance.now();paint();};
      stop();last=performance.now();if(phase==='study')timer=setInterval(tick,100);paint();
    }
    return {bind,ready:()=>phase==='quiz',hide(){stop();if(box)box.hidden=true;},reset(){stop();id=null;phase='study';},focus(){if(phase==='study')box?.querySelector('button')?.focus({preventScroll:true});else form?.querySelector('input')?.focus({preventScroll:true});}};
  }
  return {create};
})();
