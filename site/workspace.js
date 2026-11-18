'use strict';
(()=>{
  const modules={dashboard:LearningDashboard,materials:PersonalStudy,listening:ListeningStudy,languages:LanguageStudy};
  for(const [name,study] of Object.entries(modules))study.mount(document.getElementById(name+'Page'));
  document.querySelectorAll('[data-view]').forEach(button=>button.onclick=()=>StudyApp.open(button.dataset.view));
  window.addEventListener('partfive:page',({detail:{mode}})=>{
    for(const [name,study] of Object.entries(modules)){
      document.getElementById(name+'Tab').setAttribute('aria-pressed',String(name===mode));
      if(mode===name)study.open?.();
      else study.close?.();
    }
  });
  const toggle=document.getElementById('themeToggle');
  function label(){const light=document.documentElement.dataset.theme==='light';toggle.textContent=light?'☾ 다크':'☀ 라이트';toggle.setAttribute('aria-label',light?'다크 모드로 변경':'라이트 모드로 변경');}
  toggle.onclick=()=>{
    const mode=document.documentElement.dataset.theme==='light'?'dark':'light';
    document.documentElement.dataset.theme=mode;
    try{localStorage.setItem('partfive.theme.v1',mode);}catch{}
    label();
  };
  label();
  let toastTimer;
  window.addEventListener('partfive:learning',({detail:{item}})=>{
    if(!item.recoveries||item.streak!==1)return;
    const toast=document.getElementById('growthToast');
    toast.textContent='다시 맞혔어요! '+item.label;
    toast.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{toast.hidden=true;},3500);
  });
  try{
    const mode=localStorage.getItem('partfive.tab');
    if(Object.hasOwn(modules,mode))StudyApp.open(mode);
  }catch{}
})();
