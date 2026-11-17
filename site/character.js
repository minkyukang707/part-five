'use strict';
(() => {
  const key = 'partfive.character.v1';
  const fallback = {name:'루미', gender:'male'};
  const get = id => document.getElementById(id);
  const dialog = get('profileDialog');
  const form = get('profileForm');
  const input = get('heroNameInput');
  const open = get('profileOpen');
  let saved;

  function read() {
    try {
      const entry = JSON.parse(localStorage.getItem(key));
      if (typeof entry?.name === 'string' && entry.name.trim() && entry.name.length <= 16 &&
          ['male','female'].includes(entry.gender)) return entry;
    } catch { /* The default character also works with restricted browser storage. */ }
    return null;
  }
  function draw() {
    const {name,gender} = saved || fallback;
    const sprite = gender === 'female' ? 'arena/knight-female.png' : 'arena/knight.png';
    get('heroBase').src = sprite;
    get('navAvatar').src = sprite;
    get('playerName').textContent = name;
    get('hero').setAttribute('aria-label','플레이어 '+name);
    get('profileLabel').textContent = saved ? name : '캐릭터 설정';
    open.setAttribute('aria-label','캐릭터 설정 · '+name);
    open.title = '캐릭터 설정 · '+name;
  }
  open.addEventListener('click',()=>{
    const profile = saved || fallback;
    input.value = profile.name;
    input.setCustomValidity('');
    form.elements.gender.value = profile.gender;
    form.querySelectorAll('.previewArmor').forEach(img=>img.src=get('heroArmor').src);
    form.querySelectorAll('.previewSword').forEach(img=>img.src=get('heroSword').src);
    get('profileStatus').textContent = '';
    dialog.showModal();
  });
  input.addEventListener('input',()=>input.setCustomValidity(''));
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const name = input.value.trim(), gender = form.elements.gender.value;
    if (!name || name.length>16) {
      input.setCustomValidity('이름을 1~16자로 입력하세요.');
      input.reportValidity();
      return;
    }
    if (!['male','female'].includes(gender)) return;
    saved = {name,gender};
    draw();
    try { localStorage.setItem(key,JSON.stringify(saved)); }
    catch { get('profileStatus').textContent='이번 탭에 적용했어요. 브라우저가 저장을 허용하면 다음 방문에도 유지됩니다.';return; }
    dialog.close();
  });
  window.addEventListener('storage',event=>{
    if(event.key===key || event.key===null){saved=read();draw();}
  });
  saved=read();draw();
})();
