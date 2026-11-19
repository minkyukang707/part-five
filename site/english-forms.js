'use strict';
// Authored Part 5 exercises: pronoun choice is supplied by context, not inferred from an animal or a name.
(()=>{
  const rows=[
    ['person-agreement','인칭·수와 대명사','en-person-i','Right now, I ____ waiting for the next train.',['am','is','are','be'],'지금 저는 다음 열차를 기다리고 있습니다.','I의 현재 be동사는 am입니다. 성별이 아니라 1인칭 단수에 따른 형태입니다.'],
    ['person-agreement','인칭·수와 대명사','en-person-female-pet','This is Mina, our female dog. She ____ sleeping now.',['is','are','am','be'],'이 아이는 우리 암컷 강아지 미나입니다. 지금 자고 있습니다.','친숙한 동물의 성별을 알면 she를 쓸 수 있습니다. she는 3인칭 단수이므로 is입니다. 동물이라고 항상 it만 써야 하는 것은 아닙니다.'],
    ['person-agreement','인칭·수와 대명사','en-person-male-pet','This is Milo, our male dog. He ____ hungry.',['is','are','am','being'],'이 아이는 우리 수컷 강아지 마일로입니다. 배가 고픕니다.','동물에도 he를 쓸 수 있습니다. he와 she의 동사 일치는 같아서 둘 다 is입니다.'],
    ['person-agreement','인칭·수와 대명사','en-person-unknown-they','An applicant is waiting outside. They ____ asking for you now.',['are','is','am','be'],'지원자 한 명이 밖에서 기다리며 지금 당신을 찾고 있습니다.','성별을 특정하지 않은 한 사람을 단수 they로 받을 수 있습니다. 한 사람이어도 they are로 일치합니다.'],
    ['person-agreement','인칭·수와 대명사','en-person-they-have','Our team leader uses they/them pronouns. They ____ prepared the agenda.',['have','has','having','to have'],'우리 팀장은 they/them 대명사를 사용합니다. 팀장은 의제를 준비했습니다.','한 사람을 가리키는 they도 have와 결합합니다. 실제 대상의 수와 대명사가 요구하는 동사형을 구별합니다.'],
    ['person-agreement','인칭·수와 대명사','en-person-animal-it','A bird is on the fence. It ____ looking at the garden.',['is','are','am','be'],'새 한 마리가 울타리 위에서 정원을 보고 있습니다.','성별을 특정하지 않은 동물에 it을 흔히 씁니다. it의 3인칭 단수 be동사는 is입니다.'],
    ['irregular-forms','불규칙 동사·복수','en-forms-written','The visitor has ____ her name on the form.',['written','wrote','write','writing'],'방문객은 서식에 이름을 적었습니다.','has 뒤에는 과거형 wrote가 아니라 과거분사 written입니다. write–wrote–written을 한 묶음으로 익힙니다.'],
    ['irregular-forms','불규칙 동사·복수','en-forms-did-leave','Did she ____ the office before noon yesterday?',['leave','left','leaves','leaving'],'그녀는 어제 정오 전에 사무실을 떠났나요?','과거를 나타내는 did가 이미 있으므로 본동사는 원형 leave입니다. 주어가 she여도 leaves를 쓰지 않습니다.'],
    ['irregular-forms','불규칙 동사·복수','en-forms-children','The two ____ are waiting with their parents.',['children','child','childs','childes'],'아이 두 명이 부모님과 기다리고 있습니다.','child의 일반적인 복수는 children입니다. two에 맞는 복수 명사를 고릅니다.'],
    ['irregular-forms','불규칙 동사·복수','en-forms-feet','The nurse examined both ____ after the hike.',['feet','foot','foots','feets'],'간호사는 하이킹 후 양쪽 발을 검사했습니다.','both 뒤에는 복수가 필요하며 foot의 신체 부위 복수형은 feet입니다.'],
    ['irregular-forms','불규칙 동사·복수','en-forms-seen','He has already ____ these documents.',['seen','saw','see','seeing'],'그는 이미 이 문서들을 보았습니다.','has 뒤에는 see의 과거분사 seen이 필요합니다. 과거형 saw와 구별하세요.'],
    ['irregular-forms','불규칙 동사·복수','en-forms-met','She ____ the director at the conference yesterday.',['met','meet','meets','meeting'],'그녀는 어제 학회에서 책임자를 만났습니다.','yesterday의 완료된 과거 사건이며 meet의 과거형은 met입니다. 성별에 따라 과거형을 바꾸지 않습니다.']
  ];
  for(const [topic,label,id,stem,answers,meaning,why] of rows)STUDY_PATTERNS.push({topic,label,id,stem,answers,meaning,why,slots:[],genre:'work'});
})();
