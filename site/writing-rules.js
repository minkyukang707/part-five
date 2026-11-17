'use strict';
// Learner-facing rules supplement Harper with Korean explanations and register advice.
// A replacement is offered only when the matched phrase can be edited in isolation.
const fixes=[
  [/\bdiscuss(?:ed|es|ing)? about\b/gi,'동사의 목적어','discuss는 주제를 바로 목적어로 받습니다. about을 빼면 의도한 뜻을 유지할 수 있습니다.',s=>s.replace(/ about$/i,'')],
  [/\bdepend(?:s|ed|ing)? of\b/gi,'동사와 전치사','무엇에 달려 있다는 뜻은 depend on으로 연결합니다.',s=>s.replace(/ of$/i,' on')],
  [/\bparticipat(e|es|ed|ing) to (?:the|a|an|this|our)\b/gi,'동사와 전치사','행사나 활동에 참여한다는 뜻이면 participate in을 씁니다.',s=>s.replace(/ to /i,' in ')],
  [/\baccording to me\b/gi,'의견 표현','자기 의견을 소개할 때는 in my view가 자연스럽습니다. according to는 주로 다른 출처를 소개합니다.','in my view'],
  [/\binformations\b/gi,'불가산명사','information은 일반적으로 복수 -s를 붙이지 않습니다. 여러 건을 셀 때는 pieces of information을 고려하세요.','information'],
  [/\b(?:an|a) useful (?:information|advice)\b/gi,'관사와 수량','information과 advice는 불가산명사입니다. 한 가지라는 뜻을 살리려면 a useful piece of를 씁니다.',s=>s.replace(/^(an|a) useful /i,'a useful piece of ')],
  [/\badvices\b/gi,'불가산명사','조언이라는 명사는 advice로 씁니다. 조언 여러 개를 강조하려면 pieces of advice를 쓰세요.','advice'],
  [/\b(?:equipments|feedbacks)\b/gi,'불가산명사','일반적인 업무 문맥에서 장비와 의견을 통칭할 때 복수 -s를 붙이지 않습니다.',s=>s.slice(0,-1)],
  [/\b(?:should|could|must|might|will) to (?:be|go|reduce|provide|improve|make|consider|increase|send|change|discuss|have|take|use|do|review|study|work|attend)\b/gi,'조동사 뒤의 형태','조동사 바로 뒤에는 to 없이 동사원형이 옵니다.',s=>s.replace(/ to /i,' ')],
  [/\b(?:more better|more easier|more cheaper|more faster)\b/gi,'중복 비교급','이미 비교급인 단어 앞에 more를 붙여 비교를 두 번 표시했습니다.',s=>s.replace(/^more /i,'')],
  [/\b(?:despite of|in despite of)\b/gi,'양보 표현','despite 뒤에 명사구가 바로 옵니다. of를 살리려면 in spite of를 쓸 수 있습니다.','despite'],
  [/\beven although\b/gi,'양보절','강한 양보는 even though, 보통 양보는 although로 나타냅니다.','even though'],
  [/\b(?:is|are|was|were) consist(?:ed)? of\b/gi,'태의 선택','구성을 설명하는 consist of는 능동형입니다. 현재·과거와 주어의 수를 유지하세요.',s=>({is:'consists of',are:'consist of',was:'consisted of',were:'consisted of'}[s.split(' ')[0].toLowerCase()])],
  [/\b(?:I am agree|we are agree|they are agree)\b/gi,'동사 선택','agree 자체가 동사입니다. 앞의 be동사를 빼면 동의한다는 뜻이 됩니다.',s=>s.replace(/ (am|are) /i,' ')],
  [/\b(?:I|we|they) (?:did not|didn't|didn’t) (?:went|sent|made|had|took|saw|received|agreed)\b/gi,'과거 부정문','시제는 did가 담당합니다. 본동사를 원형으로 바꾸세요.',s=>s.replace(/\w+$/,v=>({went:'go',sent:'send',made:'make',had:'have',took:'take',saw:'see',received:'receive',agreed:'agree'}[v.toLowerCase()]))],
  [/\blook(?:ing)? forward to (?:hear|meet|receive|see|discuss)\b/gi,'전치사 to 뒤의 동명사','look forward to의 to는 전치사입니다. 뒤에 이어지는 행동을 -ing형으로 쓰세요.',s=>s.replace(/\w+$/,v=>({hear:'hearing',meet:'meeting',receive:'receiving',see:'seeing',discuss:'discussing'}[v.toLowerCase()]))],
  [/\b(?:could|would) (?:you|we) (?:to )?(?:please )?(?:sends|confirms|provides)\b/gi,'요청문의 동사원형','Could/Would + 주어 뒤에는 동사원형을 씁니다.',s=>s.replace(/ to /i,' ').slice(0,-1)],
  [/\b(?:the|our|this) (?:evidence|information|equipment|feedback) (?:are|were)\b/gi,'주어와 동사의 일치','이 문장에서 중심 명사는 단수 취급하는 불가산명사입니다.',s=>s.replace(/(are|were)$/i,v=>v.toLowerCase()==='are'?'is':'was')],
  [/\bone of the (?:reason|student|problem|option|benefit)\b/gi,'부분을 나타내는 표현','여러 대상 중 하나이므로 one of the 뒤의 집단 명사는 복수형을 씁니다.',s=>s+'s'],
  [/\bthe number of (?:students|employees|participants|requests|visitors) (?:are|have)\b/gi,'주어의 중심 명사','the number가 주어의 중심이어서 단수 동사가 필요합니다.',s=>s.replace(/(are|have)$/i,v=>v.toLowerCase()==='are'?'is':'has')],
  [/\b(?:less people|less employees|less students)\b/gi,'셀 수 있는 수량','사람 수를 비교하는 격식 있는 글에서는 fewer + 복수명사를 씁니다.',s=>s.replace(/^less/i,'fewer')],
  [/\b(?:do|does|did|doing) (?:a|the|this) decision\b/gi,'자연스러운 어휘 결합','결정을 내린다는 뜻은 make a decision입니다. 시제와 주어에 맞게 동사만 바꾸세요.',s=>s.replace(/^\w+/,v=>({do:'make',does:'makes',did:'made',doing:'making'}[v.toLowerCase()]))],
  [/\b(?:make|makes|made|making) (?:a research|research on)\b/gi,'연구를 수행하는 표현','연구를 수행할 때는 conduct research가 자연스럽습니다. research는 여기서 불가산명사입니다.',s=>s.replace(/^\w+/,v=>({make:'conduct',makes:'conducts',made:'conducted',making:'conducting'}[v.toLowerCase()])).replace(/ a research/i,' research')],
  [/\bstrong rain\b/gi,'강도를 나타내는 어휘','비의 양이나 강도를 말할 때 heavy rain이라는 결합이 자연스럽습니다.','heavy rain'],
  [/\bhighly agree\b/gi,'강조 부사의 선택','동의하는 정도를 강조할 때 strongly agree를 씁니다.','strongly agree'],
  [/\b(?:this|a single|one) criteria\b/gi,'학술 명사의 수','판단 기준 하나는 criterion, 여러 기준은 criteria입니다. 앞의 한정사는 단수를 가리킵니다.',s=>s.replace(/criteria$/i,'criterion')],
  [/\b(?:several|multiple|these) criterion\b/gi,'학술 명사의 수','앞 표현이 여러 기준을 가리키므로 criterion의 복수형 criteria가 필요합니다.',s=>s.replace(/criterion$/i,'criteria')],
  [/\b(?:a positive|a negative|an adverse|a measurable) affect on\b/gi,'affect와 effect','어떤 대상에 미치는 효과를 명사로 쓰는 자리입니다. 이 의미에는 effect on이 맞습니다.',s=>s.replace(/ affect on$/i,' effect on')],
  [/\b(?:moreover|furthermore) and moreover\b/gi,'연결어 중복','같은 추가 관계를 한 번만 표시하면 읽기 쉽습니다.','moreover'],
  [/\b(?:on the other hands|in the other hand)\b/gi,'대조 연결 표현','두 측면을 대비할 때는 on the other hand를 씁니다.','on the other hand']
];

// These are recognizable combinations with a communicative function, not a list of
// long words to count. A learner can use ordinary vocabulary precisely as well.
const precise=[
  ['비용·자원',/\b(?:allocat(?:e|es|ed|ing) (?:limited |more |additional )?(?:funds|resources|time)|prioriti[sz](?:e|es|ed|ing) (?:repairs|access|training|safety)|incur(?:s|red|ring)? (?:an? |additional )?(?:fee|costs?|charge)|offset(?:s|ting)? (?:the |higher |additional )?costs?)\b/gi,'배분·우선순위·비용 발생 중 어떤 행동인지 구체적으로 표현했습니다.'],
  ['업무 요청',/\b(?:revised? invoices?|corrected invoices?|itemi[sz]ed (?:invoice|bill)|outstanding balance|billing discrepancy|payment deadline|processing fees?|waiv(?:e|ed|ing) (?:the |a )?(?:fee|charge)|confirm(?:ing)? (?:receipt|availability))\b/gi,'업무 상대가 확인할 서류·금액·일정을 특정하는 표현입니다.'],
  ['계획 실행',/\b(?:trial period|pilot (?:program|scheme|study)|alternative arrangements?|interim (?:measure|solution)|temporary access|staff coverage|phased (?:implementation|rollout)|implementation costs?)\b/gi,'조치의 범위나 시행 단계를 나타내는 명사구입니다.'],
  ['측정·자료',/\b(?:sample size|selection bias|response bias|voluntary (?:survey|sample)|representative sample|control group|baseline (?:data|level|measurement)|response rate|margin of error|comparison group|daytime preferences)\b/gi,'자료의 성격이나 연구 설계를 구체적으로 지칭했습니다.'],
  ['근거 해석',/\b(?:associated with|correlat(?:es?|ed) with|consistent with|account(?:s|ed)? for (?:the |this )?(?:difference|variation|decline)|distinguish between|plausible explanation|alternative explanation|causal (?:claim|link|relationship))\b/gi,'자료가 뒷받침하는 관계나 해석의 범위를 표현했습니다.'],
  ['정책·영향',/\b(?:disproportionate(?:ly)? (?:impact|affect\w*)|unintended consequences?|financial (?:burden|incentive)|equitable access|barriers? to (?:entry|access)|waiting times?|peak hours?|public transit|within walking distance|shift workers?)\b/gi,'정책의 효과를 받는 집단·시간·조건을 구체화했습니다.'],
  ['위험·비교',/\b(?:mitigat(?:e|es|ed|ing) (?:the |potential )?(?:risks?|impact)|weigh(?:s|ed|ing)? (?:the )?(?:costs|benefits)|trade-offs?|opportunity costs?|long-term (?:benefits?|costs?|effects?)|short-term (?:savings|gains)|underlying (?:cause|assumption))\b/gi,'서로 다른 효과나 위험을 구분하는 표현입니다.'],
  ['변화의 크기',/\b(?:fell|rose|declined|increased|decreased|dropped|grew|reduced) by (?:about |nearly |approximately )?(?:\d+(?:\.\d+)?(?:\s?(?:%|percent)|\b)|half|a third|a quarter)\b/gi,'변화의 방향과 크기를 함께 제시했습니다.'],
  ['실무의 명확성',/\b(?:delivery date|tracking number|ground.floor (?:room|access)|written confirmation|order number|backup plan|next steps|lead time|response times?|security updates?|peer review|individual contribution)\b/gi,'쉽게 이해할 수 있고 상대가 행동으로 옮기기 쉬운 구체적인 표현입니다.']
];
const style=[
  [/\beconomical (?:growth|recession|inequality|development)\b/gi,'economic과 economical','경제 현상에 관한 뜻이라면 economic growth처럼 economic을 씁니다. economical은 비용·연료 등을 절약한다는 뜻입니다.'],
  [/\badapt(?:ed|ing)? (?:a new policy|the new policy)\b/gi,'adopt와 adapt','새 정책을 채택했다면 adopt, 기존 정책을 상황에 맞게 바꾸었다면 adapt가 알맞습니다. 어떤 작업을 했는지 확인하세요.'],
  [/\bstatistically significant\b/gi,'통계 용어의 근거','통계 검정에 근거한 표현인지 확인하세요. 일상적으로 눈에 띄는 차이라는 뜻이라면 noticeable이나 관측값이 어울립니다.'],
  [/\b(?:a |the )?big difference\b/gi,'차이의 크기와 기준','두 집단의 수치 차이라면 a substantial difference나 실제 차이값을, 관점의 차이라면 a clear distinction을 고려하세요. 통계 검정을 하지 않았다면 statistically significant라는 표현은 피하는 편이 정확합니다.'],
  [/\b(?:get|got|getting) (?:some |more )?information\b/gi,'정보를 얻는 방법','직접 수집했다면 collect information, 기관에 요청해 받았다면 obtain records처럼 방법과 대상을 밝힐 수 있습니다.'],
  [/\b(?:fix|solve) (?:the |this |a )?problem\b/gi,'해결한 범위','문제를 완전히 해결했다면 resolve the issue, 부정적 영향만 줄였다면 mitigate the impact가 어울립니다. fix도 실무 이메일에서 자연스럽습니다.'],
  [/\b(?:a |the )?lot of (?:people|students|money|time)\b/gi,'범위 구체화','대략적인 양이 중요한지, 특정 집단이나 금액이 중요한지 판단해 보세요. 알고 있는 수치가 있다면 그 수치를 쓰는 편이 더 정확합니다.'],
  [/\b(?:ameliorat(?:e|es|ed|ing)|mitigat(?:e|es|ed|ing)) (?:the |a )?(?:profits?|advantages?|benefits?)\b/gi,'고급 동사의 의미 선택','ameliorate는 나쁜 상태의 개선, mitigate는 부정적 효과의 완화를 뜻합니다. 이익을 늘린다는 의도라면 increase profits나 expand the benefits를 고려하세요.'],
  [/\b(?:exacerbat(?:e|es|ed|ing)) (?:the |a )?(?:benefits?|advantages?|success)\b/gi,'고급 동사의 방향','exacerbate는 문제를 악화시킨다는 의미입니다. 긍정적 효과를 강화한다는 뜻이라면 enhance the benefits처럼 쓰세요.'],
  [/\b(?:good|bad|nice|great) (?:thing|stuff|things)\b/gi,'막연한 평가','무엇이 좋은지 드러내세요. 비용이 줄었다면 lower costs, 시간이 줄었다면 shorter waits처럼 기준을 써 보세요.'],
  [/\b(?:do|does|did) (?:many|some|a lot of) things\b/gi,'포괄적인 동사','수행한 일을 하나 골라 동사와 목적어로 표현해 보세요. 예를 들어 일정을 조정했다면 revised the schedule입니다.'],
  [/\bvery (?:good|bad|important|big)\b/gi,'강조의 근거','very가 강조하는 기준을 한 가지 제시해 보세요. 규모라면 수치, 중요성이라면 어떤 결정에 영향을 주는지가 단서가 됩니다.'],
  [/\b(?:utili[sz](?:e|es|ed|ing) (?:a pen|a pencil|the bus)|at this point in time|in the event that|due to the fact that)\b/gi,'간결성','격식이 필요한 글에서도 뜻이 같다면 짧게 쓸 수 있습니다. 각각 use, now, if, because와 비교해 보세요.'],
  [/\b(?:stuff|kinda|sorta|gonna|wanna)\b/gi,'격식과 독자','업무 상대나 수업 토론에 어울리는 표현인지 검토하세요. 사물을 뜻하는 stuff는 실제 대상의 이름으로 구체화할 수 있습니다.'],
  [/\b(?:always proves?|proves? (?:beyond (?:all |any )?doubt|conclusively)|definitely proves?|everyone (?:knows|agrees))\b/gi,'단정의 강도','제시한 자료로 예외까지 배제할 수 있는지 보세요. 관찰에 그친다면 suggests 또는 is consistent with로 범위를 좁힐 수 있습니다.']
].map(([pattern,label,why])=>[label,pattern,why]);
const moves={
  cause:{label:'원인과 결과',cue:/\b(?:because|as a result of|due to|led to|resulted in|as a result)\b/i,why:'이유나 결과를 설명하는 표현입니다. 원인과 결과의 방향이 의도와 맞는지 확인하세요.',tip:'무슨 일이 있었는지 먼저 쓰고 because 뒤에 구체적인 원인을 연결해 보세요.'},
  contrast:{label:'비교와 대조',cue:/\b(?:whereas|unlike|in contrast|compared (?:with|to)|(?:more|fewer|less|higher|lower|shorter|longer)\b[^.!?]{0,45}\bthan)\b/i,why:'두 대상을 대조하는 형태입니다. 동일한 기준으로 비교하면 차이가 분명해집니다.',tip:'두 대상을 같은 기준으로 비교하고 whereas 또는 than으로 차이를 드러내 보세요.'},
  condition:{label:'조건과 결과',cue:/\b(?:provided that|as long as|unless)\b|\bif\b[^.!?]{3,95}(?:,|\b(?:would|could|will|can)\b)|\b(?:would|could|will|can)\b[^.!?]{3,95}\bif\b/i,why:'결론이 적용되는 조건을 표현했습니다. 조건이 달라질 때 무엇이 바뀌는지도 살펴보세요.',tip:'정책이나 제안이 언제 유효한지 if 또는 unless가 이끄는 절로 한정해 보세요.'},
  hedge:{label:'추론의 강도 조절',cue:/\b(?:(?:may|might|could) (?:not |also |partly )?(?:reflect|indicate|suggest|explain|represent|help|reduce|lead|result|affect|increase|have|depend|be)|suggest(?:s|ed)? that|appears? to|likely to|associated with|consistent with|does not (?:prove|establish))\b/i,why:'가능성 또는 연관성을 나타내는 표현입니다. 근거가 허용하는 강도로 주장했는지 확인하세요.',tip:'관측한 사실과 해석을 나누고, 해석에는 may reflect나 suggests that을 고려해 보세요.'},
  sequence:{label:'시간의 선후',cue:/\b(?:after|before|once|until|by the time|had (?:tested|checked|finished|completed))\b/i,why:'사건의 시점이나 순서를 나타냈습니다. 독자가 먼저 일어난 일을 찾을 수 있는지 보세요.',tip:'두 사건의 순서를 after 또는 before로 명확히 하세요. 먼저 끝난 일을 강조할 때는 과거완료도 가능합니다.'},
  request:{label:'요청과 어조',cue:/\b(?:could you|would you|would it be possible|would (?:greatly )?appreciate|please (?:confirm|send|let|advise|provide|consider)|may I)\b/i,why:'상대에게 행동을 요청하는 표현입니다. 무엇을 언제까지 해 달라는지 목적어와 시점도 확인하세요.',tip:'상대가 할 일을 하나 정하고 Could you + 동사원형으로 요청해 보세요.'},
  concession:{label:'양보와 반론',cue:/\b(?:although|even though|admittedly|despite|while it is true|nevertheless|however)\b/i,why:'다른 관점이나 제약을 인정하는 신호입니다. 이어지는 문장이 자신의 핵심 판단으로 돌아오는지 확인하세요.',tip:'상대 주장 중 인정할 한 지점을 먼저 쓰고, 그럼에도 자신의 결론이 성립하는 이유를 덧붙여 보세요.'},
  counterfactual:{label:'도치 조건절',cue:/^(?:Had (?:we|I|they|the \w+) (?:been|known|taken|seen|[a-z]+ed)|Were (?:we|I|they|the \w+) to \w+|Should (?:you|we|they) (?:need|require|encounter|have))\b/i,why:'if를 생략한 조건절의 어순입니다. 과거 사실을 바꾸어 가정했다면 결과절의 would have + 과거분사와 시점이 맞는지 보세요.'},
  modalPast:{label:'과거에 대한 추론·가정',cue:/\b(?:would|might|could|should|must) have (?:been|made|known|taken|gone|led|seen|risen|fallen|[a-z]+ed)\b/i,why:'조동사 완료형으로 과거의 결과나 가능성을 표현했습니다. would, might, must가 나타내는 확신의 정도가 의도와 맞는지 확인하세요.'},
  relative:{label:'관계절로 정보 덧붙이기',cue:/,\s*(?:which|who|whose)\s+\w+|\b(?:under|through|during|within) which\b/i,why:'앞의 대상이나 사건에 설명을 더하는 구조입니다. 어느 명사나 사건을 가리키는지 독자가 바로 찾을 수 있나요?'},
  participle:{label:'완료 분사구문',cue:/^Having (?:been \w+|seen|taken|found|made|[a-z]+ed)\b/i,why:'주절보다 먼저 끝난 일을 압축했습니다. 콤마 뒤 주어가 앞 동작도 수행할 수 있는지 확인하세요.'},
  mandative:{label:'제안·요구를 담은 that절',cue:/\b(?:recommend|suggest|request|insist)(?:s|ed)? that (?:the \w+|each \w+|he|she|it) (?:be|have|receive|submit|consider|attend|provide|review)\b/i,why:'제안이나 요구를 나타내는 that절에서 동사원형을 사용했습니다. 사실을 보고하는 문장인지 행동을 요청하는 문장인지 구분해 보세요.'},
  passive:{label:'절차를 설명하는 수동태',cue:/\b(?:were|was|is|are|been) (?:randomly |independently |carefully )?(?:assigned|collected|measured|recorded|selected|tested|approved|revised|allocated|surveyed)\b/i,why:'측정·처리된 대상을 앞세웠습니다. 방법 설명에는 유용하고, 책임 주체가 중요한 이메일이라면 누가 했는지도 밝혀 보세요.'},
  paired:{label:'대응하는 병렬 구조',cue:/\b(?:not only\b[^.!?]{2,85}\bbut also|either\b[^.!?]{2,70}\bor|neither\b[^.!?]{2,70}\bnor)\b/i,why:'두 항목을 짝지었습니다. 두 부분이 모두 명사구인지, 또는 모두 동사구인지 비교해 보세요.'}
};
const academic=[
  ['가능성과 실행','feasible|feasibility|viable|viability|practicable|sustainable|sustainability|implement(?:s|ed|ing|ation)?|constraint[s]?|logistical|contingenc(?:y|ies)|prerequisites?','실행 가능성을 나타낸다면 시간·예산·규정 중 판단 기준을 밝혀 보세요.'],
  ['자원과 우선순위','allocat(?:e|es|ed|ing|ion)|redistribut(?:e|es|ed|ing|ion)|prioriti[sz](?:e|es|ed|ing|ation)|expenditure[s]?|subsid(?:y|ies|ize|ise)|incentives?|procurement|reimburse(?:ment|ments|d)?|discrepanc(?:y|ies)','누가 무엇을 배분하거나 부담하는지 덧붙이면 업무 표현이 명확해집니다.'],
  ['자료와 검증','empirical|hypothes(?:is|es)|methodolog(?:y|ical)|quantif(?:y|ies|ied)|corroborat(?:e|es|ed|ing|ion)|replicat(?:e|es|ed|ion)|validit(?:y|ies)|representative|systematic|criterion|criteria|variables?|prevalence','측정 대상이나 근거를 함께 쓰면 연구 어휘가 실제 주장에 기여합니다.'],
  ['변화와 영향','mitigat(?:e|es|ed|ing|ion)|exacerbat(?:e|es|ed|ing|ion)|alleviat(?:e|es|ed|ing|ion)|ameliorat(?:e|es|ed|ing)|accelerat(?:e|es|ed|ion)|deteriorat(?:e|es|ed|ion)|fluctuat(?:e|es|ed|ion|ions)|displace(?:d|ment)?|stabili[sz](?:e|es|ed|ation)|detrimental','무엇이 변하는지, 그 변화가 긍정적인지 부정적인지 목적어와 대조해 보세요.'],
  ['논증과 해석','plausib(?:le|ility)|infer(?:ence|red|ring)?|implication[s]?|distinguish(?:es|ed|ing)?|interpret(?:s|ed|ation)?|attribut(?:e|es|ed|ion)|substantiate(?:s|d)?|underlying|assumption[s]?|acknowledg(?:e|es|ed|ing)|tentative(?:ly)?','추론인지 확인된 사실인지 구분하고, 그 해석의 근거를 붙여 보세요.'],
  ['범위와 공정성','disproportionate(?:ly)?|equitable|inequitable|equity|accessib(?:le|ility)|vulnerab(?:le|ility)|inclusive|demographic[s]?|distributional|marginalized|marginalised|autonomy|accountability','어떤 집단이나 상황에 적용하는 말인지 명시하면 추상적인 주장이 구체화됩니다.'],
  ['비교와 규모','substantial(?:ly)?|negligible|incremental(?:ly)?|comparable|relative(?:ly)?|predominant(?:ly)?|proportion(?:al|ally)?|magnitude|threshold[s]?|aggregate|notable|notably|markedly','비교 기준이나 출발점을 적으면 정도를 나타내는 표현을 해석하기 쉽습니다.']
].map(([label,words,tip])=>[label,new RegExp('\\b(?:'+words+')\\b','gi'),tip]);
export {fixes,precise,style,moves,academic};
