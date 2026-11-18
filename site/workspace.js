'use strict';
(()=>{
  const modules={dashboard:LearningDashboard,materials:PersonalStudy,listening:ListeningStudy,languages:LanguageStudy,competition:CompetitionStudy,minigames:MiniGameStudy};
  for(const [name,study] of Object.entries(modules))study.mount(document.getElementById(name+'Page'));
  document.querySelectorAll('[data-view]').forEach(button=>button.onclick=()=>StudyApp.open(button.dataset.view));
  window.addEventListener('partfive:page',({detail:{mode}})=>{
    for(const [name,study] of Object.entries(modules)){
      document.getElementById(name+'Tab')?.setAttribute('aria-pressed',String(name===mode));
      if(mode===name)study.open?.();
      else study.close?.();
    }
    if(mode==='languages')foreignStudy({detail:{mode:document.getElementById('languagesPage').dataset.mode}});
  });
  const toggle=document.getElementById('themeToggle');
  function label(){const light=document.documentElement.dataset.theme==='light';toggle.textContent=light?'☾ 다크':'☀ 라이트';toggle.setAttribute('aria-label',light?'다크 모드로 변경':'라이트 모드로 변경');document.getElementById('welcomeTheme').textContent=toggle.textContent;}
  toggle.onclick=()=>{
    const mode=document.documentElement.dataset.theme==='light'?'dark':'light';
    document.documentElement.dataset.theme=mode;
    try{localStorage.setItem('partfive.theme.v1',mode);}catch{}
    label();
  };
  document.getElementById('welcomeTheme').onclick=()=>toggle.click();
  label();
  let toastTimer;
  window.addEventListener('partfive:learning',({detail:{item}})=>{
    if(!StudyLocale.ready()||item.language!==StudyLocale.current()||!item.recoveries||item.streak!==1)return;
    const toast=document.getElementById('growthToast');
    toast.textContent='다시 맞혔어요! '+item.label;
    toast.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{toast.hidden=true;},3500);
  });
  function showChooser(){
    Object.values(modules).forEach(study=>study.close?.());
    document.body.dataset.languageReady='false';
    document.getElementById('languageSelectPage').hidden=false;
    for(const code of Object.keys(StudyLocale.names)){
      const stats=code==='en'?StudyApp.englishStats():LanguageStudy.statistics(code);
      const kills=stats.game?.kills||0;
      document.querySelector('[data-language-progress="'+code+'"]').textContent=(stats.total?'누적 '+stats.total+'회 학습':'첫 공부 시작')+' · '+(kills===100?'원정 완료':'몬스터 Lv. '+(kills+1));
    }
    window.scrollTo(0,0);
  }
  function foreignStudy({detail:{mode}}){
    if(StudyLocale.current()==='en'||StudyApp.mode()!=='languages')return;
    const grammar=mode==='grammar';
    document.getElementById('studyTab').setAttribute('aria-pressed',String(grammar));
    document.getElementById('wordsTab').setAttribute('aria-pressed',String(!grammar));
    const slot=document.getElementById('languageBattleSlot');
    if(slot){slot.append(document.getElementById('battle'));slot.hidden=!grammar;}
    if(grammar)Battle.draw(LanguageStudy.getGame());
  }
  window.addEventListener('partfive:language-study',foreignStudy);
  window.addEventListener('partfive:choose-language',showChooser);
  window.addEventListener('partfive:language',({detail:{language}})=>{
    const english=language==='en';
    document.body.dataset.language=language;
    document.body.dataset.languageReady='true';
    document.getElementById('languageSelectPage').hidden=true;
    document.getElementById('activeLanguage').textContent=StudyLocale.names[language];
    document.getElementById('studyNavigation').setAttribute('aria-label',StudyLocale.names[language]+' 학습');
    document.title='Part Five · '+StudyLocale.names[language];
    for(const id of ['reviewTab','listeningTab','writingTab','materialsTab'])document.getElementById(id).hidden=!english;
    if(!english)LanguageStudy.setLanguage(language,'grammar');
    Battle.draw(english?StudyApp.englishStats().game:LanguageStudy.getGame());
    const invitation=new URLSearchParams(location.search);
    StudyApp.open(invitation.has('room')&&invitation.get('language')===language?'competition':'dashboard');
  });
  document.getElementById('chooseLanguage').onclick=()=>StudyLocale.showChooser();
  document.querySelectorAll('.languageCard').forEach(button=>button.onclick=()=>StudyLocale.choose(button.dataset.language));
  showChooser();
})();
