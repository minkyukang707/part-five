'use strict';
window.StudyLocale=(()=>{
  const names={en:'영어',ja:'일본어',es:'스페인어',tr:'터키어'};
  let language='en',selected=false;
  try{
    const previous=localStorage.getItem('partfive.language');
    if(Object.hasOwn(names,previous))language=previous;
  }catch{}
  function choose(code){
    if(!Object.hasOwn(names,code))return;
    language=code;selected=true;
    try{localStorage.setItem('partfive.language',code);}catch{}
    window.dispatchEvent(new CustomEvent('partfive:language',{detail:{language:code}}));
  }
  function showChooser(){
    selected=false;
    window.dispatchEvent(new Event('partfive:choose-language'));
  }
  return {current:()=>language,ready:()=>selected,names,choose,showChooser};
})();
