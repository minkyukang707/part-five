'use strict';
const FRENCH_COURSE=(()=>{
  const words=typeof FRENCH_WORDS!=='undefined'?FRENCH_WORDS:require('./french-vocabulary.js');
  const questions=typeof FRENCH_QUESTIONS!=='undefined'?FRENCH_QUESTIONS:require('./french-questions.js');
  return {
    name:'프랑스어',native:'Français',voice:'fr-FR',language:'fr',
    stages:['첫 문장','일상 표현','경험과 계획','논리와 의견','정교한 표현'],
    guide:'프랑스어는 철자와 소리가 일대일로 대응하지 않습니다. é·è·ê·ç 같은 부호도 글자의 일부입니다. 단어 끝 자음이 묵음인 경우가 많지만 예외가 있고, 모음 앞의 연음도 문법 환경에 따라 달라집니다. 명사는 un/une 또는 le/la와 함께 익히고, l’만으로 성을 판단하지 마세요. 스피커 버튼으로 프랑스어 음성을 들어 보세요. 기기에 프랑스어 음성이 있어야 읽기가 지원됩니다.',
    sources:[['TV5MONDE · 프랑스어 학습','https://apprendre.tv5monde.com/fr'],['OQLF · 프랑스어 문법','https://vitrinelinguistique.oqlf.gouv.qc.ca/la-grammaire'],['프랑스어 단어 출처·선별 기준','notices/french-vocabulary.txt'],['프랑스어 문장 구성·참고 자료','notices/french-questions.txt']],
    genres:{all:'전체 주제',daily:'일상',travel:'여행',school:'학교',sport:'운동',food:'음식·쇼핑',work:'직장·사회',health:'건강·자연',culture:'문화·취미',general:'종합'},
    words,questions
  };
})();
if(typeof LANGUAGE_COURSES!=='undefined')LANGUAGE_COURSES.fr=FRENCH_COURSE;
if(typeof module!=='undefined')module.exports=FRENCH_COURSE;
