'use strict';
(()=>{
  let mode;
  try{mode=localStorage.getItem('partfive.theme.v1');}catch{}
  document.documentElement.dataset.theme=mode==='light'?'light':'dark';
})();
