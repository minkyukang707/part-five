'use strict';
const STUDY_PATTERNS = [
 {
  "topic": "agreement",
  "label": "주어와 동사의 수일치",
  "id": "agreement-1",
  "stem": "The list of {0} ____ updated {1}.",
  "meaning": "{0} 목록은 {1} 갱신됩니다.",
  "answers": [
   "is",
   "are",
   "be",
   "being"
  ],
  "why": "동사의 수를 결정하는 주어는 of 뒤의 복수 명사가 아니라 단수 명사 list입니다. 단수 주어와 짝을 이루는 is를 골라 is updated를 완성합니다.",
  "slots": [
   [
    [
     "approved suppliers",
     "승인된 공급업체"
    ],
    [
     "emergency contacts",
     "비상 연락처"
    ],
    [
     "available courses",
     "수강 가능한 강좌"
    ]
   ],
   [
    [
     "each quarter",
     "분기마다"
    ],
    [
     "every Friday",
     "금요일마다"
    ],
    [
     "twice a year",
     "연 2회"
    ]
   ]
  ]
 },
 {
  "topic": "agreement",
  "label": "주어와 동사의 수일치",
  "id": "agreement-2",
  "stem": "The {0} for the {1} ____ available on the staff portal.",
  "meaning": "{1}에 필요한 {0}은 직원 포털에서 확인할 수 있습니다.",
  "answers": [
   "are",
   "is",
   "be",
   "being"
  ],
  "why": "for로 시작하는 구를 잠시 빼면 The … are available이 남습니다. 주어인 {0}는 복수이므로 are가 맞습니다.",
  "slots": [
   [
    [
     "instructions",
     "지침"
    ],
    [
     "guidelines",
     "가이드라인"
    ],
    [
     "forms",
     "서식"
    ]
   ],
   [
    [
     "annual review",
     "연례 평가"
    ],
    [
     "safety inspection",
     "안전 점검"
    ],
    [
     "orientation session",
     "신입 교육"
    ]
   ]
  ]
 },
 {
  "topic": "agreement",
  "label": "주어와 동사의 수일치",
  "id": "agreement-3",
  "stem": "Each of the {0} ____ a separate {1}.",
  "meaning": "{0} 하나하나에 별도의 {1} 항목이 있습니다.",
  "answers": [
   "contains",
   "contain",
   "containing",
   "to contain"
  ],
  "why": "Each of 뒤에 복수 명사가 와도 주어의 중심은 '각각'을 뜻하는 Each입니다. 현재형 동사에 -s를 붙여 contains로 씁니다.",
  "slots": [
   [
    [
     "reports",
     "보고서"
    ],
    [
     "proposals",
     "제안서"
    ],
    [
     "manuals",
     "안내서"
    ]
   ],
   [
    [
     "summary",
     "요약"
    ],
    [
     "appendix",
     "부록"
    ],
    [
     "index",
     "색인"
    ]
   ]
  ]
 },
 {
  "topic": "agreement",
  "label": "주어와 동사의 수일치",
  "id": "agreement-4",
  "stem": "The number of {0} ____ risen since {1}.",
  "meaning": "{1} 이후 {0} 건수가 증가했습니다.",
  "answers": [
   "has",
   "have",
   "having",
   "to have"
  ],
  "why": "The number of는 '~의 수'라는 단수 주어입니다. risen은 rise의 과거분사이므로 단수 현재완료인 has risen을 만듭니다.",
  "slots": [
   [
    [
     "online orders",
     "온라인 주문"
    ],
    [
     "support requests",
     "지원 요청"
    ],
    [
     "late deliveries",
     "배송 지연"
    ]
   ],
   [
    [
     "January",
     "1월"
    ],
    [
     "the policy change",
     "정책 변경"
    ],
    [
     "the launch",
     "출시"
    ]
   ]
  ]
 },
 {
  "topic": "voice",
  "label": "능동태와 수동태",
  "id": "voice-1",
  "stem": "All {0} must ____ by the {1} before payment is issued.",
  "meaning": "모든 {0}에 대해 대금 지급 전에 {1}의 승인을 받아야 합니다.",
  "answers": [
   "be approved",
   "approve",
   "be approving",
   "have approved"
  ],
  "why": "승인을 받는 대상이 주어이고, by 뒤에 승인 주체가 나옵니다. 조동사 must 뒤에 수동형 be approved를 넣습니다.",
  "slots": [
   [
    [
     "invoices",
     "송장"
    ],
    [
     "expense claims",
     "경비 청구서"
    ],
    [
     "purchase orders",
     "구매 주문서"
    ]
   ],
   [
    [
     "finance director",
     "재무 이사"
    ],
    [
     "department head",
     "부서장"
    ],
    [
     "accounting manager",
     "회계 관리자"
    ]
   ]
  ]
 },
 {
  "topic": "voice",
  "label": "능동태와 수동태",
  "id": "voice-2",
  "stem": "The {0} will ____ the {1} before the doors open.",
  "meaning": "개장 전에 {0} 담당자가 {1} 상태를 점검할 예정입니다.",
  "answers": [
   "inspect",
   "be inspected",
   "inspecting",
   "inspection"
  ],
  "why": "주어인 담당자가 직접 점검하고, 빈칸 뒤의 the {1}가 점검 대상입니다. will 다음에는 능동형 동사원형 inspect가 옵니다.",
  "slots": [
   [
    [
     "technician",
     "기술"
    ],
    [
     "supervisor",
     "현장 관리"
    ],
    [
     "electrician",
     "전기"
    ]
   ],
   [
    [
     "stage lights",
     "무대 조명"
    ],
    [
     "backup generator",
     "예비 발전기"
    ],
    [
     "alarm system",
     "경보 장치"
    ]
   ]
  ]
 },
 {
  "topic": "voice",
  "label": "능동태와 수동태",
  "id": "voice-3",
  "stem": "The {0} is being ____ by a designer ahead of {1}.",
  "meaning": "{1}에 앞서 디자이너가 {0}의 디자인을 개편하고 있습니다.",
  "answers": [
   "revised",
   "revise",
   "revising",
   "revision"
  ],
  "why": "is being 뒤에는 과거분사가 와서 '지금 개편되고 있다'는 진행형 수동태가 됩니다. by a designer가 작업 주체를 알려 줍니다.",
  "slots": [
   [
    [
     "product catalog",
     "제품 카탈로그"
    ],
    [
     "visitor guide",
     "방문객 안내서"
    ],
    [
     "company brochure",
     "회사 소개서"
    ]
   ],
   [
    [
     "the exhibition",
     "전시회"
    ],
    [
     "the annual meeting",
     "연례 회의"
    ],
    [
     "the open house",
     "공개 행사"
    ]
   ]
  ]
 },
 {
  "topic": "voice",
  "label": "능동태와 수동태",
  "id": "voice-4",
  "stem": "Once the {0} has been ____, the {1} can begin work.",
  "meaning": "{0} 승인 절차가 끝나면 {1} 측에서 작업을 시작할 수 있습니다.",
  "answers": [
   "authorized",
   "authorize",
   "authorizing",
   "authorization"
  ],
  "why": "has been과 빈칸을 합쳐 '승인이 완료되었다'는 현재완료 수동태를 만듭니다. authorize의 과거분사 authorized가 필요합니다.",
  "slots": [
   [
    [
     "budget",
     "예산"
    ],
    [
     "expenditure",
     "지출"
    ],
    [
     "payment",
     "대금 지급"
    ]
   ],
   [
    [
     "contractor",
     "외부 업체"
    ],
    [
     "project team",
     "프로젝트팀"
    ],
    [
     "consultant",
     "컨설턴트"
    ]
   ]
  ]
 },
 {
  "topic": "tense",
  "label": "시제와 시간 표현",
  "id": "tense-1",
  "stem": "The {0} ____ its final report {1}.",
  "meaning": "{0}에서 {1} 최종 보고서를 제출했습니다.",
  "answers": [
   "submitted",
   "will submit",
   "has submitted",
   "is submitting"
  ],
  "why": "{1}는 이미 끝난 특정 과거 시점을 가리킵니다. 그때 완료된 제출 행위는 단순과거 submitted로 표현합니다.",
  "slots": [
   [
    [
     "audit team",
     "감사팀"
    ],
    [
     "review board",
     "심의 위원회"
    ],
    [
     "research unit",
     "연구 부서"
    ]
   ],
   [
    [
     "last Friday",
     "지난 금요일"
    ],
    [
     "two weeks ago",
     "2주 전"
    ],
    [
     "yesterday afternoon",
     "어제 오후"
    ]
   ]
  ]
 },
 {
  "topic": "tense",
  "label": "시제와 시간 표현",
  "id": "tense-2",
  "stem": "Since {0}, the company ____ three new {1}.",
  "meaning": "{0} 이후 지금까지 회사는 새 {1} 세 곳을 열었습니다.",
  "answers": [
   "has opened",
   "will open",
   "is opening",
   "open"
  ],
  "why": "Since가 과거의 시작점을 제시하고 세 곳을 열었다는 결과가 현재까지 이어집니다. 단수 주어 the company에는 현재완료 has opened가 맞습니다.",
  "slots": [
   [
    [
     "January",
     "1월"
    ],
    [
     "the merger",
     "합병"
    ],
    [
     "the start of the year",
     "연초"
    ]
   ],
   [
    [
     "branches",
     "지점"
    ],
    [
     "warehouses",
     "창고"
    ],
    [
     "training centers",
     "교육 센터"
    ]
   ]
  ]
 },
 {
  "topic": "tense",
  "label": "시제와 시간 표현",
  "id": "tense-3",
  "stem": "By the time the {0} arrived yesterday, the {1} ____ already ended.",
  "meaning": "어제 {0} 측이 도착했을 때는 {1} 행사가 이미 끝난 뒤였습니다.",
  "answers": [
   "had",
   "has",
   "is",
   "will"
  ],
  "why": "도착한 사건(arrived)보다 끝난 사건이 먼저입니다. 두 과거 사건 중 앞선 일을 had already ended로 표시합니다.",
  "slots": [
   [
    [
     "delegation",
     "대표단"
    ],
    [
     "inspector",
     "점검 담당자"
    ],
    [
     "photographer",
     "사진작가"
    ]
   ],
   [
    [
     "ceremony",
     "기념식"
    ],
    [
     "briefing",
     "브리핑"
    ],
    [
     "presentation",
     "발표"
    ]
   ]
  ]
 },
 {
  "topic": "tense",
  "label": "시제와 시간 표현",
  "id": "tense-4",
  "stem": "At this time yesterday, the {0} ____ still interviewing candidates for the {1} position.",
  "meaning": "어제 이 시각에도 {0}에서는 {1} 직무 지원자들을 면접하고 있었습니다.",
  "answers": [
   "was",
   "is",
   "will be",
   "has been"
  ],
  "why": "At this time yesterday는 어제의 특정 순간입니다. 그때 진행 중이던 면접이므로 과거진행형 was interviewing을 씁니다.",
  "slots": [
   [
    [
     "hiring manager",
     "채용 담당자"
    ],
    [
     "director",
     "이사"
    ],
    [
     "recruiter",
     "인사 담당자"
    ]
   ],
   [
    [
     "analyst",
     "분석가"
    ],
    [
     "coordinator",
     "코디네이터"
    ],
    [
     "designer",
     "디자이너"
    ]
   ]
  ]
 },
 {
  "topic": "modifier",
  "label": "형용사와 부사",
  "id": "modifier-1",
  "stem": "The {0} examined the {1} ____ before signing it.",
  "meaning": "{0} 측에서 서명 전에 {1} 내용을 꼼꼼히 검토했습니다.",
  "answers": [
   "carefully",
   "careful",
   "care",
   "carefulness"
  ],
  "why": "어떤 방식으로 검토했는지 설명하는 자리입니다. 동사 examined를 꾸밀 수 있는 부사 carefully가 알맞습니다.",
  "slots": [
   [
    [
     "manager",
     "관리자"
    ],
    [
     "client",
     "고객"
    ],
    [
     "director",
     "이사"
    ]
   ],
   [
    [
     "lease",
     "임대차 계약서"
    ],
    [
     "agreement",
     "합의서"
    ],
    [
     "contract",
     "계약서"
    ]
   ]
  ]
 },
 {
  "topic": "modifier",
  "label": "형용사와 부사",
  "id": "modifier-2",
  "stem": "The instructions for {0} are remarkably ____.",
  "meaning": "{0} 절차에 관한 지침은 놀랄 만큼 명확합니다.",
  "answers": [
   "clear",
   "clearly",
   "clarity",
   "clarify"
  ],
  "why": "are 뒤에서 주어 instructions의 성질을 설명할 형용사가 필요합니다. remarkably는 그 형용사를 꾸미므로 clear가 맞습니다.",
  "slots": [
   [
    [
     "registering online",
     "온라인 등록"
    ],
    [
     "filing a claim",
     "보상 청구"
    ],
    [
     "requesting a refund",
     "환불 신청"
    ]
   ]
  ]
 },
 {
  "topic": "modifier",
  "label": "형용사와 부사",
  "id": "modifier-3",
  "stem": "The {0} is ____ equipped to handle {1}.",
  "meaning": "{0}에는 {1}에 대응할 수 있는 전용 장비가 갖춰져 있습니다.",
  "answers": [
   "specially",
   "special",
   "specialty",
   "specialize"
  ],
  "why": "분사 equipped를 꾸미며 '특별히 장비를 갖춘'이라는 뜻을 만드는 부사는 specially입니다.",
  "slots": [
   [
    [
     "facility",
     "시설"
    ],
    [
     "service center",
     "서비스 센터"
    ],
    [
     "laboratory",
     "실험실"
    ]
   ],
   [
    [
     "fragile items",
     "파손되기 쉬운 물품"
    ],
    [
     "sensitive materials",
     "민감한 자재"
    ],
    [
     "delicate components",
     "정밀 부품"
    ]
   ]
  ]
 },
 {
  "topic": "modifier",
  "label": "형용사와 부사",
  "id": "modifier-4",
  "stem": "Please keep the {0} ____ while the {1} is in progress.",
  "meaning": "{1} 진행 중에는 {0}에 물건을 두지 마세요.",
  "answers": [
   "clear",
   "clearly",
   "clarity",
   "clearing"
  ],
  "why": "keep + 목적어 + 형용사는 '목적어를 어떤 상태로 유지하다'라는 구조입니다. 통로가 비어 있는 상태를 표현하므로 clear가 들어갑니다.",
  "slots": [
   [
    [
     "aisle",
     "통로"
    ],
    [
     "entrance",
     "출입구"
    ],
    [
     "walkway",
     "보행로"
    ]
   ],
   [
    [
     "inspection",
     "점검"
    ],
    [
     "repair",
     "보수 작업"
    ],
    [
     "delivery",
     "납품"
    ]
   ]
  ]
 },
 {
  "topic": "noun",
  "label": "명사 자리와 어형",
  "id": "noun-1",
  "stem": "Written ____ from the {0} is required before {1}.",
  "meaning": "{1} 전에는 {0}의 서면 승인이 필요합니다.",
  "answers": [
   "approval",
   "approve",
   "approves",
   "approved"
  ],
  "why": "Written이 꾸미는 말이면서 is required의 주어가 될 명사가 필요합니다. approve의 명사형인 approval은 '승인'을 뜻합니다.",
  "slots": [
   [
    [
     "supervisor",
     "관리자"
    ],
    [
     "owner",
     "소유주"
    ],
    [
     "director",
     "이사"
    ]
   ],
   [
    [
     "installation",
     "설치"
    ],
    [
     "publication",
     "발행"
    ],
    [
     "construction",
     "시공"
    ]
   ]
  ]
 },
 {
  "topic": "noun",
  "label": "명사 자리와 어형",
  "id": "noun-2",
  "stem": "The {0} made a valuable ____ to the {1}.",
  "meaning": "{0} 측에서 {1}에 값진 기여를 했습니다.",
  "answers": [
   "contribution",
   "contribute",
   "contributory",
   "contributed"
  ],
  "why": "관사 a와 형용사 valuable 다음에는 단수 명사가 필요합니다. make a contribution to는 '~에 기여하다'라는 표현입니다.",
  "slots": [
   [
    [
     "consultant",
     "컨설턴트"
    ],
    [
     "volunteer",
     "자원봉사자"
    ],
    [
     "researcher",
     "연구원"
    ]
   ],
   [
    [
     "project",
     "프로젝트"
    ],
    [
     "discussion",
     "토론"
    ],
    [
     "campaign",
     "캠페인"
    ]
   ]
  ]
 },
 {
  "topic": "noun",
  "label": "명사 자리와 어형",
  "id": "noun-3",
  "stem": "The {0} announced the ____ of its {1}.",
  "meaning": "{0} 측에서 {1} 확장 계획을 발표했습니다.",
  "answers": [
   "expansion",
   "expand",
   "expansive",
   "expansively"
  ],
  "why": "the와 of 사이에는 '확장'이라는 뜻의 명사가 와야 합니다. 동사 expand의 명사형은 expansion입니다.",
  "slots": [
   [
    [
     "retailer",
     "유통업체"
    ],
    [
     "company",
     "회사"
    ],
    [
     "manufacturer",
     "제조업체"
    ]
   ],
   [
    [
     "distribution network",
     "유통망"
    ],
    [
     "repair service",
     "수리 서비스"
    ],
    [
     "training program",
     "교육 프로그램"
    ]
   ]
  ]
 },
 {
  "topic": "noun",
  "label": "명사 자리와 어형",
  "id": "noun-4",
  "stem": "Thank you for your ____ during the {0}.",
  "meaning": "{0} 기간 동안 기다려 주셔서 감사합니다.",
  "answers": [
   "patience",
   "patiently",
   "be patient",
   "more patiently"
  ],
  "why": "소유격 your 뒤에서 '기다려 주신 인내'라는 의미를 완성하는 명사는 patience입니다. patiently는 행동의 방식을 나타내는 부사입니다.",
  "slots": [
   [
    [
     "renovation",
     "개보수"
    ],
    [
     "system upgrade",
     "시스템 업그레이드"
    ],
    [
     "temporary closure",
     "임시 휴업"
    ]
   ]
  ]
 },
 {
  "topic": "link",
  "label": "접속사와 전치사",
  "id": "link-1",
  "stem": "____ the {0} was delayed, the {1} started on time.",
  "meaning": "{0} 일정이 지연되었지만 {1} 행사는 제시간에 시작했습니다.",
  "answers": [
   "Although",
   "Despite",
   "During",
   "Because of"
  ],
  "why": "the {0} was delayed는 주어와 동사가 있는 절입니다. 두 사실이 대조되므로 '~했지만'을 뜻하는 접속사 Although가 맞습니다. Despite 뒤에는 명사구가 옵니다.",
  "slots": [
   [
    [
     "delivery",
     "배송"
    ],
    [
     "flight",
     "항공편"
    ],
    [
     "shipment",
     "화물 운송"
    ]
   ],
   [
    [
     "workshop",
     "워크숍"
    ],
    [
     "reception",
     "환영회"
    ],
    [
     "conference",
     "회의"
    ]
   ]
  ]
 },
 {
  "topic": "link",
  "label": "접속사와 전치사",
  "id": "link-2",
  "stem": "____ heavy {0}, all {1} arrived on schedule.",
  "meaning": "심한 {0}에도 불구하고 모든 {1}의 도착 시각은 예정대로였습니다.",
  "answers": [
   "Despite",
   "Although",
   "Even though",
   "Whereas"
  ],
  "why": "heavy {0}는 주어와 동사가 있는 절이 아니라 명사구입니다. 예상과 다른 결과를 소개하는 전치사 Despite가 알맞습니다.",
  "slots": [
   [
    [
     "traffic",
     "교통 혼잡"
    ],
    [
     "rain",
     "비"
    ],
    [
     "fog",
     "안개"
    ]
   ],
   [
    [
     "shuttles",
     "셔틀버스"
    ],
    [
     "delegates",
     "대표단 구성원"
    ],
    [
     "guests",
     "초청객"
    ]
   ]
  ]
 },
 {
  "topic": "link",
  "label": "접속사와 전치사",
  "id": "link-3",
  "stem": "The {0} was postponed ____ the {1} was unavailable.",
  "meaning": "{1} 측이 참석할 수 없어서 {0} 일정이 연기됐습니다.",
  "answers": [
   "because",
   "because of",
   "due to",
   "owing to"
  ],
  "why": "빈칸 다음에 주어 the {1}와 동사 was가 모두 있습니다. 이유를 나타내는 절을 이끄는 것은 접속사 because입니다.",
  "slots": [
   [
    [
     "hearing",
     "청문회"
    ],
    [
     "interview",
     "인터뷰"
    ],
    [
     "meeting",
     "회의"
    ]
   ],
   [
    [
     "interpreter",
     "통역사"
    ],
    [
     "chairperson",
     "의장"
    ],
    [
     "company representative",
     "회사 대표"
    ]
   ]
  ]
 },
 {
  "topic": "link",
  "label": "접속사와 전치사",
  "id": "link-4",
  "stem": "Please remain seated ____ the {0} has come to a complete stop.",
  "meaning": "{0} 운행이 완전히 멈출 때까지 자리에 앉아 계세요.",
  "answers": [
   "until",
   "during",
   "throughout",
   "despite"
  ],
  "why": "빈칸 뒤는 주어와 동사가 있는 절입니다. 앉아 있어야 하는 시간의 끝을 나타내는 접속사 until이 적절합니다.",
  "slots": [
   [
    [
     "shuttle",
     "셔틀버스"
    ],
    [
     "train",
     "열차"
    ],
    [
     "tram",
     "트램"
    ]
   ]
  ]
 },
 {
  "topic": "relative",
  "label": "관계대명사",
  "id": "relative-1",
  "stem": "The {0} ____ office is on the {1} floor will lead the briefing.",
  "meaning": "{1}에 사무실을 둔 {0} 브리핑을 진행합니다.",
  "answers": [
   "whose",
   "who",
   "whom",
   "which"
  ],
  "why": "뒤의 office는 앞에 나온 사람의 사무실입니다. 사람과 사무실의 소유 관계를 연결하고 명사 office 앞에 설 수 있는 whose가 맞습니다.",
  "slots": [
   [
    [
     "coordinator",
     "코디네이터가"
    ],
    [
     "consultant",
     "컨설턴트가"
    ],
    [
     "supervisor",
     "관리자가"
    ]
   ],
   [
    [
     "second",
     "2층"
    ],
    [
     "third",
     "3층"
    ],
    [
     "fifth",
     "5층"
    ]
   ]
  ]
 },
 {
  "topic": "relative",
  "label": "관계대명사",
  "id": "relative-2",
  "stem": "Employees ____ wish to attend the {0} should contact the {1}.",
  "meaning": "{0} 참석을 원하는 직원은 {1} 측에 연락해야 합니다.",
  "answers": [
   "who",
   "whom",
   "whose",
   "which"
  ],
  "why": "선행사 Employees는 사람이고, wish 앞에는 주어가 비어 있습니다. 주격 관계대명사 who가 뒤 절의 주어 역할을 합니다.",
  "slots": [
   [
    [
     "seminar",
     "세미나"
    ],
    [
     "briefing",
     "브리핑"
    ],
    [
     "workshop",
     "워크숍"
    ]
   ],
   [
    [
     "organizer",
     "주최자"
    ],
    [
     "coordinator",
     "코디네이터"
    ],
    [
     "training office",
     "교육 담당 부서"
    ]
   ]
  ]
 },
 {
  "topic": "relative",
  "label": "관계대명사",
  "id": "relative-3",
  "stem": "The {0}, ____ was renovated {1}, is now open to visitors.",
  "meaning": "{1}에 보수한 {0} 시설이 현재 방문객에게 개방되어 있습니다.",
  "answers": [
   "which",
   "who",
   "whose",
   "where"
  ],
  "why": "쉼표 사이의 절에서 was renovated의 주어가 필요합니다. 앞의 시설을 받아 주어가 되는 관계대명사는 which입니다. where는 장소 부사라서 이 자리를 채울 수 없습니다.",
  "slots": [
   [
    [
     "gallery",
     "전시장"
    ],
    [
     "library",
     "도서관"
    ],
    [
     "auditorium",
     "강당"
    ]
   ],
   [
    [
     "last spring",
     "지난봄"
    ],
    [
     "last winter",
     "지난겨울"
    ],
    [
     "in March",
     "3월"
    ]
   ]
  ]
 },
 {
  "topic": "relative",
  "label": "관계대명사",
  "id": "relative-4",
  "stem": "The {0} to ____ the {1} was addressed has retired.",
  "meaning": "{1}의 수신인이었던 {0} 퇴직했습니다.",
  "answers": [
   "whom",
   "whose",
   "which",
   "whoever"
  ],
  "why": "address A to B는 'A를 B 앞으로 보내다'라는 뜻입니다. 전치사 to의 목적어이고 사람을 가리키는 관계대명사이므로 whom이 맞습니다.",
  "slots": [
   [
    [
     "director",
     "이사가"
    ],
    [
     "manager",
     "관리자가"
    ],
    [
     "coordinator",
     "코디네이터가"
    ]
   ],
   [
    [
     "letter",
     "편지"
    ],
    [
     "invitation",
     "초대장"
    ],
    [
     "notice",
     "통지서"
    ]
   ]
  ]
 },
 {
  "topic": "complement",
  "label": "동명사와 부정사",
  "id": "complement-1",
  "stem": "The {0} agreed ____ the {1} before Friday.",
  "meaning": "{0} 측에서 금요일 전에 {1} 내용을 검토하기로 했습니다.",
  "answers": [
   "to review",
   "reviewing",
   "review",
   "reviewed"
  ],
  "why": "agree는 앞으로 하기로 한 행동을 to부정사로 연결합니다. '검토하기로 합의했다'는 agreed to review입니다.",
  "slots": [
   [
    [
     "supplier",
     "공급업체"
    ],
    [
     "manager",
     "관리자"
    ],
    [
     "consultant",
     "컨설턴트"
    ]
   ],
   [
    [
     "proposal",
     "제안서"
    ],
    [
     "contract",
     "계약서"
    ],
    [
     "estimate",
     "견적서"
    ]
   ]
  ]
 },
 {
  "topic": "complement",
  "label": "동명사와 부정사",
  "id": "complement-2",
  "stem": "The {0} suggested ____ the {1} until Monday.",
  "meaning": "{0} 측에서 {1} 일정을 월요일까지 미루자고 제안했습니다.",
  "answers": [
   "postponing",
   "to postpone",
   "postpone",
   "postpones"
  ],
  "why": "suggest 다음에 제안하는 행동을 바로 붙일 때는 동명사(-ing)를 씁니다. suggested postponing은 '미루자고 제안했다'는 뜻입니다.",
  "slots": [
   [
    [
     "chairperson",
     "의장"
    ],
    [
     "organizer",
     "주최자"
    ],
    [
     "supervisor",
     "관리자"
    ]
   ],
   [
    [
     "vote",
     "표결"
    ],
    [
     "launch",
     "출시"
    ],
    [
     "inspection",
     "점검"
    ]
   ]
  ]
 },
 {
  "topic": "complement",
  "label": "동명사와 부정사",
  "id": "complement-3",
  "stem": "We look forward to ____ your {0} {1}.",
  "meaning": "{1} 귀사의 {0} 자료를 받아 보기를 기대합니다.",
  "answers": [
   "receiving",
   "receive",
   "received",
   "receives"
  ],
  "why": "look forward to의 to는 전치사입니다. 뒤에 동작이 오면 명사 역할을 하는 동명사 receiving을 씁니다.",
  "slots": [
   [
    [
     "proposal",
     "제안"
    ],
    [
     "application",
     "신청"
    ],
    [
     "estimate",
     "견적"
    ]
   ],
   [
    [
     "next week",
     "다음 주"
    ],
    [
     "tomorrow",
     "내일"
    ],
    [
     "this Friday",
     "이번 금요일"
    ]
   ]
  ]
 },
 {
  "topic": "complement",
  "label": "동명사와 부정사",
  "id": "complement-4",
  "stem": "Visitors to the {0} should avoid ____ the {1}.",
  "meaning": "{0} 방문객은 {1} 접촉을 삼가야 합니다.",
  "answers": [
   "touching",
   "to touch",
   "touch",
   "touched"
  ],
  "why": "avoid는 피해야 할 행동을 동명사로 받습니다. '만지는 것을 피하다'는 avoid touching입니다.",
  "slots": [
   [
    [
     "laboratory",
     "실험실"
    ],
    [
     "workshop",
     "작업장"
    ],
    [
     "exhibition hall",
     "전시장"
    ]
   ],
   [
    [
     "equipment",
     "장비"
    ],
    [
     "instruments",
     "기기"
    ],
    [
     "displays",
     "전시물"
    ]
   ]
  ]
 },
 {
  "topic": "collocation",
  "label": "동사·형용사와 전치사",
  "id": "collocation-1",
  "stem": "The {0} is responsible ____ updating the {1}.",
  "meaning": "{0} 측에서 {1} 정보 갱신을 담당합니다.",
  "answers": [
   "for",
   "to",
   "at",
   "of"
  ],
  "why": "책임지는 일을 말할 때는 be responsible for를 씁니다. 전치사 for 뒤에는 담당 업무인 updating the {1}가 이어집니다.",
  "slots": [
   [
    [
     "coordinator",
     "코디네이터"
    ],
    [
     "assistant",
     "보조 담당자"
    ],
    [
     "supervisor",
     "관리자"
    ]
   ],
   [
    [
     "schedule",
     "일정표"
    ],
    [
     "directory",
     "연락처 목록"
    ],
    [
     "website",
     "웹사이트"
    ]
   ]
  ]
 },
 {
  "topic": "collocation",
  "label": "동사·형용사와 전치사",
  "id": "collocation-2",
  "stem": "All {0} must comply ____ the new {1}.",
  "meaning": "모든 {0}에서는 새로운 {1} 규정을 준수해야 합니다.",
  "answers": [
   "with",
   "at",
   "from",
   "over"
  ],
  "why": "comply는 규정이나 요구 사항을 따를 때 전치사 with와 짝을 이룹니다. '~을 준수하다'는 comply with입니다.",
  "slots": [
   [
    [
     "branches",
     "지점"
    ],
    [
     "departments",
     "부서"
    ],
    [
     "contractors",
     "외주 업체"
    ]
   ],
   [
    [
     "safety rules",
     "안전"
    ],
    [
     "reporting requirements",
     "보고"
    ],
    [
     "quality standards",
     "품질"
    ]
   ]
  ]
 },
 {
  "topic": "collocation",
  "label": "동사·형용사와 전치사",
  "id": "collocation-3",
  "stem": "The {0} specializes ____ the design of {1}.",
  "meaning": "{0} 측의 전문 분야는 {1} 설계입니다.",
  "answers": [
   "in",
   "of",
   "at",
   "for"
  ],
  "why": "전문 분야를 나타낼 때는 specialize in을 씁니다. 여기서 전문 분야는 the design of {1}입니다.",
  "slots": [
   [
    [
     "firm",
     "회사"
    ],
    [
     "consultant",
     "컨설턴트"
    ],
    [
     "studio",
     "스튜디오"
    ]
   ],
   [
    [
     "office furniture",
     "사무용 가구"
    ],
    [
     "lighting systems",
     "조명 시스템"
    ],
    [
     "retail spaces",
     "매장 공간"
    ]
   ]
  ]
 },
 {
  "topic": "collocation",
  "label": "동사·형용사와 전치사",
  "id": "collocation-4",
  "stem": "Access ____ the {0} is restricted to {1}.",
  "meaning": "{0} 출입은 {1}만 가능합니다.",
  "answers": [
   "to",
   "at",
   "from",
   "of"
  ],
  "why": "명사 access 뒤에서 접근 대상을 밝히는 전치사는 to입니다. access to the {0} 전체가 문장의 주어가 됩니다.",
  "slots": [
   [
    [
     "archive",
     "기록 보관소"
    ],
    [
     "server room",
     "서버실"
    ],
    [
     "storage area",
     "보관 구역"
    ]
   ],
   [
    [
     "authorized employees",
     "승인된 직원"
    ],
    [
     "maintenance personnel",
     "유지보수 인력"
    ],
    [
     "security staff",
     "보안 직원"
    ]
   ]
  ]
 },
 {
  "topic": "conditional",
  "label": "가정법과 조건 표현",
  "id": "conditional-1",
  "stem": "If the {0} had arrived {1}, we ____ the deadline yesterday.",
  "meaning": "{0} 도착이 {1} 이루어졌다면 어제 마감 시한을 지켰을 것입니다.",
  "answers": [
   "would have met",
   "will meet",
   "are meeting",
   "meet"
  ],
  "why": "if절의 had arrived는 실제와 다른 과거를 가정합니다. 어제의 가상 결과를 나타낼 때는 would have + 과거분사(met)를 씁니다.",
  "slots": [
   [
    [
     "shipment",
     "화물"
    ],
    [
     "permit",
     "허가서"
    ],
    [
     "equipment",
     "장비"
    ]
   ],
   [
    [
     "on time",
     "제때"
    ],
    [
     "a day earlier",
     "하루 일찍"
    ],
    [
     "as scheduled",
     "예정대로"
    ]
   ]
  ]
 },
 {
  "topic": "conditional",
  "label": "가정법과 조건 표현",
  "id": "conditional-2",
  "stem": "Had the {0} been approved {1}, work ____ last month.",
  "meaning": "{0} 승인이 {1} 이루어졌다면 지난달에 작업이 시작됐을 것입니다.",
  "answers": [
   "would have started",
   "will start",
   "starts",
   "is starting"
  ],
  "why": "문두의 Had the … been approved는 If the … had been approved에서 if를 생략한 도치입니다. 과거에 실현되지 않은 결과는 would have started로 표현합니다.",
  "slots": [
   [
    [
     "proposal",
     "제안서"
    ],
    [
     "budget",
     "예산"
    ],
    [
     "permit",
     "허가"
    ]
   ],
   [
    [
     "sooner",
     "더 일찍"
    ],
    [
     "in time",
     "제때"
    ],
    [
     "without delay",
     "지체 없이"
    ]
   ]
  ]
 },
 {
  "topic": "conditional",
  "label": "가정법과 조건 표현",
  "id": "conditional-3",
  "stem": "Should you ____ any {0} about the {1}, please contact us.",
  "meaning": "{1}에 대해 {0} 사항이 있으면 연락해 주세요.",
  "answers": [
   "have",
   "had",
   "having",
   "has"
  ],
  "why": "Should you …는 If you should …를 도치한 정중한 조건 표현입니다. 조동사 should의 주어 you 뒤에는 동사원형 have가 필요합니다.",
  "slots": [
   [
    [
     "questions",
     "문의"
    ],
    [
     "concerns",
     "우려"
    ],
    [
     "doubts",
     "의문"
    ]
   ],
   [
    [
     "policy",
     "정책"
    ],
    [
     "agreement",
     "합의서"
    ],
    [
     "schedule",
     "일정"
    ]
   ]
  ]
 },
 {
  "topic": "conditional",
  "label": "가정법과 조건 표현",
  "id": "conditional-4",
  "stem": "If the {0} were larger, it ____ enough space for {1}.",
  "meaning": "{0} 규모가 더 크다면 {1} 공간이 충분할 것입니다.",
  "answers": [
   "would provide",
   "has provided",
   "providing",
   "provides"
  ],
  "why": "If … were larger는 현재 상황과 다른 가정입니다. 그 가정에서 가능한 결과는 would + 동사원형인 would provide로 나타냅니다.",
  "slots": [
   [
    [
     "hall",
     "강당"
    ],
    [
     "venue",
     "행사장"
    ],
    [
     "building",
     "건물"
    ]
   ],
   [
    [
     "another exhibit",
     "전시물 한 점을 더 놓을"
    ],
    [
     "additional seating",
     "좌석을 추가할"
    ],
    [
     "a second stage",
     "무대를 하나 더 설치할"
    ]
   ]
  ]
 },
 {
  "id": "negative-inversion-1",
  "topic": "negative-inversion",
  "label": "부정어 도치",
  "why": "문두의 부정 표현이 절 전체를 수식하면 조동사가 주어 앞으로 이동합니다. 나머지 동사의 형태와 시점도 함께 확인하세요.",
  "genre": "news",
  "stem": "Never before ____ a space telescope detected the signal with such clarity.",
  "meaning": "그전까지 우주 망원경이 그처럼 선명하게 신호를 포착한 적은 없었다.",
  "answers": [
   "had",
   "having",
   "does",
   "was"
  ],
  "slots": []
 },
 {
  "id": "negative-inversion-2",
  "topic": "negative-inversion",
  "label": "부정어 도치",
  "why": "문두의 부정 표현이 절 전체를 수식하면 조동사가 주어 앞으로 이동합니다. 나머지 동사의 형태와 시점도 함께 확인하세요.",
  "genre": "research",
  "stem": "Rarely ____ these two species appear together in the same sample.",
  "meaning": "이 두 종이 같은 표본에서 함께 나타나는 일은 드물다.",
  "answers": [
   "do",
   "are",
   "have",
   "were"
  ],
  "slots": []
 },
 {
  "id": "negative-inversion-3",
  "topic": "negative-inversion",
  "label": "부정어 도치",
  "why": "문두의 부정 표현이 절 전체를 수식하면 조동사가 주어 앞으로 이동합니다. 나머지 동사의 형태와 시점도 함께 확인하세요.",
  "genre": "work",
  "stem": "Under no circumstances ____ visitors to enter this room without an escort.",
  "meaning": "어떠한 경우에도 방문객은 안내자 없이 이 방에 들어가서는 안 된다.",
  "answers": [
   "are",
   "do",
   "have",
   "being"
  ],
  "slots": []
 },
 {
  "id": "cleft-1",
  "topic": "cleft",
  "label": "It 강조구문",
  "why": "It is 또는 It was 뒤에 강조할 성분을 두고 that절로 나머지를 연결합니다. 강조구문을 풀어도 원래 문장이 성립합니다.",
  "genre": "news",
  "stem": "It was the sudden drop in pressure ____ first alerted the crew to the leak.",
  "meaning": "승무원이 누출을 처음 알아차린 계기는 갑작스러운 압력 저하였다.",
  "answers": [
   "that",
   "what",
   "whose",
   "whom"
  ],
  "slots": []
 },
 {
  "id": "cleft-2",
  "topic": "cleft",
  "label": "It 강조구문",
  "why": "It is 또는 It was 뒤에 강조할 성분을 두고 that절로 나머지를 연결합니다. 강조구문을 풀어도 원래 문장이 성립합니다.",
  "genre": "news",
  "stem": "It was carbon dioxide ____ the Webb telescope detected in the atmosphere of the exoplanet WASP-39 b.",
  "meaning": "웹 망원경이 외계 행성 WASP-39 b의 대기에서 검출한 것은 이산화탄소였다.",
  "answers": [
   "that",
   "whose",
   "what",
   "whom"
  ],
  "reference": "NASA · Webb 관측 발표 · https://science.nasa.gov/missions/webb/nasas-webb-detects-carbon-dioxide-in-exoplanet-atmosphere/",
  "slots": []
 },
 {
  "id": "cleft-3",
  "topic": "cleft",
  "label": "It 강조구문",
  "why": "It is 또는 It was 뒤에 강조할 성분을 두고 that절로 나머지를 연결합니다. 강조구문을 풀어도 원래 문장이 성립합니다.",
  "genre": "research",
  "stem": "It is the spacing between observations ____ determines the temporal resolution.",
  "meaning": "시간 해상도를 결정하는 것은 관측 사이의 간격이다.",
  "answers": [
   "that",
   "whom",
   "of which",
   "what"
  ],
  "slots": []
 },
 {
  "id": "cleft-4",
  "topic": "cleft",
  "label": "It 강조구문",
  "why": "It is 또는 It was 뒤에 강조할 성분을 두고 that절로 나머지를 연결합니다. 강조구문을 풀어도 원래 문장이 성립합니다.",
  "genre": "work",
  "stem": "It was only after the final inspection ____ the hotel reopened its east wing.",
  "meaning": "호텔이 동관을 다시 연 것은 최종 점검이 끝난 뒤였다.",
  "answers": [
   "that",
   "what",
   "whose",
   "which"
  ],
  "slots": []
 },
 {
  "id": "fused-relative-1",
  "topic": "fused-relative",
  "label": "선행사를 포함하는 what절",
  "why": "what은 ‘~하는 것’으로 선행사와 관계대명사 역할을 함께 합니다. 뒤 절에서 주어나 목적어 한 자리가 비어 있는지 보세요.",
  "genre": "research",
  "stem": "____ the researchers could not explain was the sudden reversal of the trend.",
  "meaning": "연구진이 설명하지 못한 것은 추세가 갑자기 뒤집힌 일이었다.",
  "answers": [
   "What",
   "That",
   "Whether",
   "During"
  ],
  "slots": []
 },
 {
  "id": "fused-relative-2",
  "topic": "fused-relative",
  "label": "선행사를 포함하는 what절",
  "why": "what은 ‘~하는 것’으로 선행사와 관계대명사 역할을 함께 합니다. 뒤 절에서 주어나 목적어 한 자리가 비어 있는지 보세요.",
  "genre": "news",
  "stem": "The new map shows exactly ____ the old survey left out.",
  "meaning": "새 지도는 이전 조사에서 누락한 내용을 정확히 보여 준다.",
  "answers": [
   "what",
   "that",
   "whether",
   "whose"
  ],
  "slots": []
 },
 {
  "id": "fused-relative-3",
  "topic": "fused-relative",
  "label": "선행사를 포함하는 what절",
  "why": "what은 ‘~하는 것’으로 선행사와 관계대명사 역할을 함께 합니다. 뒤 절에서 주어나 목적어 한 자리가 비어 있는지 보세요.",
  "genre": "work",
  "stem": "The warranty covers only ____ is listed on the original receipt.",
  "meaning": "보증은 원래 영수증에 기재된 것만 대상으로 한다.",
  "answers": [
   "what",
   "which of",
   "whose",
   "whether"
  ],
  "slots": []
 },
 {
  "id": "mandative-1",
  "topic": "mandative",
  "label": "요구·권고의 가정법 현재",
  "why": "요구·권고를 나타내는 동사의 that절에서는 주어의 인칭과 무관하게 동사원형을 쓸 수 있습니다. 수동이라면 be와 과거분사가 필요합니다.",
  "genre": "research",
  "stem": "The ethics board recommended that each participant ____ a copy of the consent form.",
  "meaning": "윤리위원회는 참여자마다 동의서 사본을 보관할 것을 권고했다.",
  "answers": [
   "retain",
   "retaining",
   "to retain",
   "retention"
  ],
  "slots": []
 },
 {
  "id": "mandative-2",
  "topic": "mandative",
  "label": "요구·권고의 가정법 현재",
  "why": "요구·권고를 나타내는 동사의 that절에서는 주어의 인칭과 무관하게 동사원형을 쓸 수 있습니다. 수동이라면 be와 과거분사가 필요합니다.",
  "genre": "news",
  "stem": "The new ordinance requires that every emergency exit ____ clearly marked.",
  "meaning": "새 조례는 모든 비상구를 명확히 표시하도록 요구한다.",
  "answers": [
   "be",
   "being",
   "to be",
   "has"
  ],
  "slots": []
 },
 {
  "id": "mandative-3",
  "topic": "mandative",
  "label": "요구·권고의 가정법 현재",
  "why": "요구·권고를 나타내는 동사의 that절에서는 주어의 인칭과 무관하게 동사원형을 쓸 수 있습니다. 수동이라면 be와 과거분사가 필요합니다.",
  "genre": "work",
  "stem": "The union insisted that the company ____ the omitted overtime payments immediately.",
  "meaning": "노조는 회사가 누락된 초과근무 수당을 즉시 복원할 것을 요구했다.",
  "answers": [
   "restore",
   "restoring",
   "to restore",
   "restoration"
  ],
  "slots": []
 },
 {
  "id": "perfect-participle-1",
  "topic": "perfect-participle",
  "label": "완료분사구문",
  "why": "주절보다 앞서 끝난 동작은 having + 과거분사로 표현할 수 있습니다. 분사구문의 행위자가 주절 주어와 같은지도 확인하세요.",
  "genre": "research",
  "stem": "Having ____ the outliers, the analysts reran the model.",
  "meaning": "분석가들은 이상값을 제거한 뒤 모형을 다시 실행했다.",
  "answers": [
   "removed",
   "remove",
   "removing",
   "removes"
  ],
  "slots": []
 },
 {
  "id": "perfect-participle-2",
  "topic": "perfect-participle",
  "label": "완료분사구문",
  "why": "주절보다 앞서 끝난 동작은 having + 과거분사로 표현할 수 있습니다. 분사구문의 행위자가 주절 주어와 같은지도 확인하세요.",
  "genre": "news",
  "stem": "Having ____ the distress call, the coast guard dispatched a rescue boat.",
  "meaning": "해안 경비대는 조난 신호를 들은 뒤 구조정을 파견했다.",
  "answers": [
   "heard",
   "hear",
   "hearing",
   "hears"
  ],
  "slots": []
 },
 {
  "id": "perfect-participle-3",
  "topic": "perfect-participle",
  "label": "완료분사구문",
  "why": "주절보다 앞서 끝난 동작은 having + 과거분사로 표현할 수 있습니다. 분사구문의 행위자가 주절 주어와 같은지도 확인하세요.",
  "genre": "work",
  "stem": "Having ____ all bids, the committee invited two vendors to present.",
  "meaning": "위원회는 모든 입찰서를 검토한 뒤 두 업체에 발표를 요청했다.",
  "answers": [
   "reviewed",
   "review",
   "reviews",
   "reviewing"
  ],
  "slots": []
 },
 {
  "id": "reduced-passive-1",
  "topic": "reduced-passive",
  "label": "수동 관계절 축약",
  "why": "명사 뒤에서 ‘~된’이라는 수동 의미를 덧붙일 때 관계대명사와 be동사를 생략하고 과거분사를 남길 수 있습니다.",
  "genre": "research",
  "stem": "Only samples ____ under sterile conditions were included in the analysis.",
  "meaning": "멸균 조건에서 채취한 표본만 분석에 포함됐다.",
  "answers": [
   "collected",
   "collect",
   "collects",
   "to collecting"
  ],
  "slots": []
 },
 {
  "id": "reduced-passive-2",
  "topic": "reduced-passive",
  "label": "수동 관계절 축약",
  "why": "명사 뒤에서 ‘~된’이라는 수동 의미를 덧붙일 때 관계대명사와 be동사를 생략하고 과거분사를 남길 수 있습니다.",
  "genre": "news",
  "stem": "The photographs ____ by the inspection crew show cracks along the pier.",
  "meaning": "점검반이 촬영한 사진에는 부두를 따라 난 균열이 보인다.",
  "answers": [
   "taken",
   "taking",
   "took",
   "takes"
  ],
  "slots": []
 },
 {
  "id": "reduced-passive-3",
  "topic": "reduced-passive",
  "label": "수동 관계절 축약",
  "why": "명사 뒤에서 ‘~된’이라는 수동 의미를 덧붙일 때 관계대명사와 be동사를 생략하고 과거분사를 남길 수 있습니다.",
  "genre": "work",
  "stem": "Invoices ____ after the cutoff will appear on next month's statement.",
  "meaning": "마감 뒤에 접수된 청구서는 다음 달 명세서에 표시된다.",
  "answers": [
   "received",
   "receive",
   "receiving them",
   "receives"
  ],
  "slots": []
 },
 {
  "id": "prep-relative-1",
  "topic": "prep-relative",
  "label": "전치사와 관계대명사",
  "why": "전치사 뒤에서 사물을 선행사로 받는 관계대명사는 which입니다. 뒤 절에서 전치사구가 어떤 역할을 하는지 확인하세요.",
  "genre": "research",
  "stem": "The conditions under ____ the alloy fractures remain uncertain.",
  "meaning": "그 합금이 어떤 조건에서 파손되는지는 아직 확실하지 않다.",
  "answers": [
   "which",
   "that",
   "what",
   "whose"
  ],
  "slots": []
 },
 {
  "id": "prep-relative-2",
  "topic": "prep-relative",
  "label": "전치사와 관계대명사",
  "why": "전치사 뒤에서 사물을 선행사로 받는 관계대명사는 which입니다. 뒤 절에서 전치사구가 어떤 역할을 하는지 확인하세요.",
  "genre": "research",
  "stem": "Seoul was the city in ____ researchers compared temperatures at seventeen sites to study the cooling effect of urban forests.",
  "meaning": "연구진이 도시 숲의 냉각 효과를 알아보기 위해 열일곱 지점의 기온을 비교한 도시는 서울이었다.",
  "answers": [
   "which",
   "that",
   "what",
   "whose"
  ],
  "reference": "PLOS ONE · 서울 도시 숲의 냉각 효과 · https://doi.org/10.1371/journal.pone.0288774",
  "slots": []
 },
 {
  "id": "prep-relative-3",
  "topic": "prep-relative",
  "label": "전치사와 관계대명사",
  "why": "전치사 뒤에서 사물을 선행사로 받는 관계대명사는 which입니다. 뒤 절에서 전치사구가 어떤 역할을 하는지 확인하세요.",
  "genre": "news",
  "stem": "The port from ____ the relief shipment departed reopened on Monday.",
  "meaning": "구호 물자가 출발한 항구는 월요일에 다시 문을 열었다.",
  "answers": [
   "which",
   "that",
   "where",
   "what"
  ],
  "slots": []
 },
 {
  "id": "prep-relative-4",
  "topic": "prep-relative",
  "label": "전치사와 관계대명사",
  "why": "전치사 뒤에서 사물을 선행사로 받는 관계대명사는 which입니다. 뒤 절에서 전치사구가 어떤 역할을 하는지 확인하세요.",
  "genre": "work",
  "stem": "The platform through ____ staff submit travel claims is being upgraded.",
  "meaning": "직원들이 출장비를 신청하는 플랫폼은 업그레이드 중이다.",
  "answers": [
   "which",
   "what",
   "that",
   "when"
  ],
  "slots": []
 },
 {
  "id": "sentential-relative-1",
  "topic": "sentential-relative",
  "label": "앞 절 전체를 받는 which",
  "why": "쉼표 뒤 which는 앞 절 전체의 사건이나 사실을 받아 그 결과를 설명할 수 있습니다. 뒤 동사에는 주어가 필요합니다.",
  "genre": "news",
  "stem": "The storm forced both ferries to turn back, ____ left the island without a delivery that day.",
  "meaning": "폭풍 때문에 여객선 두 척이 모두 회항했고, 그 결과 그날 섬에는 물자가 도착하지 않았다.",
  "answers": [
   "which",
   "that",
   "what",
   "where"
  ],
  "slots": []
 },
 {
  "id": "sentential-relative-2",
  "topic": "sentential-relative",
  "label": "앞 절 전체를 받는 which",
  "why": "쉼표 뒤 which는 앞 절 전체의 사건이나 사실을 받아 그 결과를 설명할 수 있습니다. 뒤 동사에는 주어가 필요합니다.",
  "genre": "research",
  "stem": "Several sensors failed at once, ____ made the estimate less precise.",
  "meaning": "여러 센서가 동시에 고장 나 추정치의 정밀도가 떨어졌다.",
  "answers": [
   "which",
   "whose",
   "what",
   "where"
  ],
  "slots": []
 },
 {
  "id": "sentential-relative-3",
  "topic": "sentential-relative",
  "label": "앞 절 전체를 받는 which",
  "why": "쉼표 뒤 which는 앞 절 전체의 사건이나 사실을 받아 그 결과를 설명할 수 있습니다. 뒤 동사에는 주어가 필요합니다.",
  "genre": "work",
  "stem": "The client extended the deadline, ____ gave us time to repeat the audit.",
  "meaning": "고객이 기한을 연장해 준 덕분에 감사를 다시 실시할 시간이 생겼다.",
  "answers": [
   "which",
   "that",
   "what",
   "when"
  ],
  "slots": []
 },
 {
  "id": "indirect-question-1",
  "topic": "indirect-question",
  "label": "간접의문문의 어순",
  "why": "의문사가 이끄는 간접의문문에서는 주어가 동사보다 먼저 옵니다. 직접의문문의 도치나 불필요한 do를 다시 쓰지 않습니다.",
  "genre": "research",
  "stem": "The survey was designed to determine how often ____ during the dry season.",
  "meaning": "그 조사는 건기에 강바닥이 얼마나 자주 마르는지 알아보도록 설계됐다.",
  "answers": [
   "the riverbed dries out",
   "does the riverbed dry out",
   "dries out the riverbed",
   "the riverbed drying out"
  ],
  "slots": []
 },
 {
  "id": "indirect-question-2",
  "topic": "indirect-question",
  "label": "간접의문문의 어순",
  "why": "의문사가 이끄는 간접의문문에서는 주어가 동사보다 먼저 옵니다. 직접의문문의 도치나 불필요한 do를 다시 쓰지 않습니다.",
  "genre": "news",
  "stem": "Residents asked when ____ after the inspection.",
  "meaning": "주민들은 점검 뒤 다리가 언제 다시 열릴지 물었다.",
  "answers": [
   "the bridge would reopen",
   "would the bridge reopen",
   "would reopen the bridge",
   "reopen the bridge would"
  ],
  "slots": []
 },
 {
  "id": "indirect-question-3",
  "topic": "indirect-question",
  "label": "간접의문문의 어순",
  "why": "의문사가 이끄는 간접의문문에서는 주어가 동사보다 먼저 옵니다. 직접의문문의 도치나 불필요한 do를 다시 쓰지 않습니다.",
  "genre": "work",
  "stem": "Please explain why ____ before the order was canceled.",
  "meaning": "주문이 취소되기 전에 수수료가 부과된 이유를 설명해 주세요.",
  "answers": [
   "the fee was charged",
   "was the fee charged",
   "charged was the fee",
   "the fee charging"
  ],
  "slots": []
 },
 {
  "id": "whether-1",
  "topic": "whether",
  "label": "whether와 선택 명사절",
  "why": "전치사의 목적어로 ‘~인지 아닌지’를 나타내거나 to부정사 앞에서 선택을 나타낼 때 whether를 씁니다.",
  "genre": "research",
  "stem": "The inference depends on ____ the two groups were comparable at baseline.",
  "meaning": "그 추론은 두 집단이 시작 시점에 비교 가능한 상태였는지에 달려 있다.",
  "answers": [
   "whether",
   "unless",
   "despite",
   "whereas"
  ],
  "slots": []
 },
 {
  "id": "whether-2",
  "topic": "whether",
  "label": "whether와 선택 명사절",
  "why": "전치사의 목적어로 ‘~인지 아닌지’를 나타내거나 to부정사 앞에서 선택을 나타낼 때 whether를 씁니다.",
  "genre": "work",
  "stem": "The trustees must decide ____ to renew the lease or purchase the building.",
  "meaning": "수탁자들은 임대 계약을 갱신할지 건물을 매입할지 결정해야 한다.",
  "answers": [
   "whether",
   "if",
   "unless",
   "even"
  ],
  "slots": []
 },
 {
  "id": "whether-3",
  "topic": "whether",
  "label": "whether와 선택 명사절",
  "why": "전치사의 목적어로 ‘~인지 아닌지’를 나타내거나 to부정사 앞에서 선택을 나타낼 때 whether를 씁니다.",
  "genre": "news",
  "stem": "The debate over ____ to relocate the station is still open.",
  "meaning": "역을 이전할지를 둘러싼 논의는 아직 진행 중이다.",
  "answers": [
   "whether",
   "if",
   "though",
   "as"
  ],
  "slots": []
 },
 {
  "id": "double-comparative-1",
  "topic": "double-comparative",
  "label": "the 비교급, the 비교급",
  "why": "서로 연동해 변하는 두 값을 표현할 때 두 절에 각각 the + 비교급을 둡니다.",
  "genre": "research",
  "stem": "The narrower the confidence interval, ____ precise the estimate is.",
  "meaning": "신뢰구간이 좁을수록 추정치는 더 정밀하다.",
  "answers": [
   "the more",
   "most",
   "as much",
   "more than"
  ],
  "slots": []
 },
 {
  "id": "double-comparative-2",
  "topic": "double-comparative",
  "label": "the 비교급, the 비교급",
  "why": "서로 연동해 변하는 두 값을 표현할 때 두 절에 각각 the + 비교급을 둡니다.",
  "genre": "news",
  "stem": "The farther the smoke travels, ____ its source is to locate.",
  "meaning": "연기가 멀리 퍼질수록 그 근원지를 찾기 어렵다.",
  "answers": [
   "the harder",
   "hardest",
   "as hard",
   "more hardly"
  ],
  "slots": []
 },
 {
  "id": "double-comparative-3",
  "topic": "double-comparative",
  "label": "the 비교급, the 비교급",
  "why": "서로 연동해 변하는 두 값을 표현할 때 두 절에 각각 the + 비교급을 둡니다.",
  "genre": "work",
  "stem": "The earlier we receive the specifications, ____ we can prepare a quotation.",
  "meaning": "우리가 사양서를 일찍 받을수록 견적서를 더 빨리 준비할 수 있다.",
  "answers": [
   "the sooner",
   "soonest",
   "as soon",
   "sooner than"
  ],
  "slots": []
 },
 {
  "id": "multiples-1",
  "topic": "multiples",
  "label": "배수와 동등 비교",
  "why": "배수 표현 뒤에 as + 형용사·부사 또는 수량 표현 + as를 놓아 비교합니다. 셀 수 있는 명사에는 many를 씁니다.",
  "genre": "research",
  "stem": "The revised instrument detected twice ____ particles as the prototype.",
  "meaning": "개량한 기기는 시제품보다 두 배 많은 입자를 검출했다.",
  "answers": [
   "as many",
   "as much",
   "more than",
   "most"
  ],
  "slots": []
 },
 {
  "id": "multiples-2",
  "topic": "multiples",
  "label": "배수와 동등 비교",
  "why": "배수 표현 뒤에 as + 형용사·부사 또는 수량 표현 + as를 놓아 비교합니다. 셀 수 있는 명사에는 many를 씁니다.",
  "genre": "news",
  "stem": "The replacement reservoir holds three times as much water ____ the old one.",
  "meaning": "새 저수지는 기존 저수지의 세 배에 해당하는 물을 저장한다.",
  "answers": [
   "as",
   "than",
   "that",
   "for"
  ],
  "slots": []
 },
 {
  "id": "multiples-3",
  "topic": "multiples",
  "label": "배수와 동등 비교",
  "why": "배수 표현 뒤에 as + 형용사·부사 또는 수량 표현 + as를 놓아 비교합니다. 셀 수 있는 명사에는 many를 씁니다.",
  "genre": "work",
  "stem": "The express service is nearly twice as expensive ____ standard delivery.",
  "meaning": "특급 배송 요금은 일반 배송 요금의 거의 두 배다.",
  "answers": [
   "as",
   "than",
   "to",
   "of"
  ],
  "slots": []
 },
 {
  "id": "countability-1",
  "topic": "countability",
  "label": "가산·불가산 수량 표현",
  "why": "복수로 셀 수 있는 명사에는 many나 fewer, 불가산명사에는 much나 less를 씁니다. 주변의 명사가 무엇인지 먼저 확인하세요.",
  "genre": "research",
  "stem": "How ____ equipment can the mobile laboratory carry?",
  "meaning": "이동식 실험실은 장비를 얼마나 실을 수 있을까?",
  "answers": [
   "much",
   "many",
   "few",
   "several"
  ],
  "slots": []
 },
 {
  "id": "countability-2",
  "topic": "countability",
  "label": "가산·불가산 수량 표현",
  "why": "복수로 셀 수 있는 명사에는 many나 fewer, 불가산명사에는 much나 less를 씁니다. 주변의 명사가 무엇인지 먼저 확인하세요.",
  "genre": "news",
  "stem": "The redesigned junction recorded ____ collisions than it did last winter.",
  "meaning": "재설계한 교차로에서는 지난겨울보다 충돌 사고가 적게 기록됐다.",
  "answers": [
   "fewer",
   "fewest",
   "a little",
   "much"
  ],
  "slots": []
 },
 {
  "id": "countability-3",
  "topic": "countability",
  "label": "가산·불가산 수량 표현",
  "why": "복수로 셀 수 있는 명사에는 many나 fewer, 불가산명사에는 much나 less를 씁니다. 주변의 명사가 무엇인지 먼저 확인하세요.",
  "genre": "work",
  "stem": "The revised instructions leave very ____ room for misunderstanding.",
  "meaning": "개정한 지침은 오해의 여지를 거의 남기지 않는다.",
  "answers": [
   "little",
   "few",
   "many",
   "several"
  ],
  "slots": []
 },
 {
  "id": "distributive-1",
  "topic": "distributive",
  "label": "each·every와 개별 한정",
  "why": "each와 every는 집단의 구성원을 하나씩 봅니다. each of 뒤에는 복수 집단이 오고, every 바로 뒤에는 보통 단수 명사를 둡니다.",
  "genre": "research",
  "stem": "Each ____ the samples was assigned a numeric code.",
  "meaning": "각 표본에 숫자 코드를 부여했다.",
  "answers": [
   "of",
   "to",
   "from",
   "for"
  ],
  "slots": []
 },
 {
  "id": "distributive-2",
  "topic": "distributive",
  "label": "each·every와 개별 한정",
  "why": "each와 every는 집단의 구성원을 하나씩 봅니다. each of 뒤에는 복수 집단이 오고, every 바로 뒤에는 보통 단수 명사를 둡니다.",
  "genre": "news",
  "stem": "Every ____ entering the harbor must report its position.",
  "meaning": "항구에 들어오는 모든 선박은 위치를 보고해야 한다.",
  "answers": [
   "vessel",
   "vessels",
   "of vessels",
   "vessels are"
  ],
  "slots": []
 },
 {
  "id": "distributive-3",
  "topic": "distributive",
  "label": "each·every와 개별 한정",
  "why": "each와 every는 집단의 구성원을 하나씩 봅니다. each of 뒤에는 복수 집단이 오고, every 바로 뒤에는 보통 단수 명사를 둡니다.",
  "genre": "work",
  "stem": "The technician checked each ____ before reconnecting the printer.",
  "meaning": "기술자는 프린터를 다시 연결하기 전에 케이블을 하나씩 점검했다.",
  "answers": [
   "cable",
   "cables",
   "of cable",
   "cables were"
  ],
  "slots": []
 },
 {
  "id": "reflexive-1",
  "topic": "reflexive",
  "label": "재귀대명사의 재귀·강조 용법",
  "why": "같은 사람이나 사물이 동작의 주체와 대상이 되거나, 직접 했음을 강조할 때 주어의 인칭·수에 맞는 재귀대명사를 씁니다.",
  "genre": "research",
  "stem": "To avoid outside influence, the reviewers verified the calculations ____.",
  "meaning": "외부 영향을 피하려고 검토자들이 직접 계산을 확인했다.",
  "answers": [
   "themselves",
   "their",
   "themself is",
   "theirs"
  ],
  "slots": []
 },
 {
  "id": "reflexive-2",
  "topic": "reflexive",
  "label": "재귀대명사의 재귀·강조 용법",
  "why": "같은 사람이나 사물이 동작의 주체와 대상이 되거나, 직접 했음을 강조할 때 주어의 인칭·수에 맞는 재귀대명사를 씁니다.",
  "genre": "work",
  "stem": "The director introduced ____ to the new staff before the briefing began.",
  "meaning": "브리핑이 시작되기 전 그 여성 이사는 신입 직원들에게 자신을 소개했다.",
  "answers": [
   "herself",
   "hers",
   "she",
   "her own is"
  ],
  "slots": []
 },
 {
  "id": "reflexive-3",
  "topic": "reflexive",
  "label": "재귀대명사의 재귀·강조 용법",
  "why": "같은 사람이나 사물이 동작의 주체와 대상이 되거나, 직접 했음을 강조할 때 주어의 인칭·수에 맞는 재귀대명사를 씁니다.",
  "genre": "news",
  "stem": "The autonomous rover can right ____ after a minor fall.",
  "meaning": "자율 주행 탐사차는 가볍게 넘어져도 스스로 자세를 바로잡을 수 있다.",
  "answers": [
   "itself",
   "its",
   "it is",
   "itself is"
  ],
  "slots": []
 },
 {
  "id": "independent-possessive-1",
  "topic": "independent-possessive",
  "label": "소유대명사와 소유격 한정사",
  "why": "뒤에 명사가 있으면 their, our 같은 한정사를 씁니다. 명사구 전체를 대신하는 자리에는 theirs, ours 같은 소유대명사가 옵니다.",
  "genre": "work",
  "stem": "Our team submitted its bid on Monday, but the other bidders submitted ____ on Friday.",
  "meaning": "우리 팀은 월요일에, 다른 입찰자들은 금요일에 각자의 입찰서를 제출했다.",
  "answers": [
   "theirs",
   "their",
   "they",
   "themselves are"
  ],
  "slots": []
 },
 {
  "id": "independent-possessive-2",
  "topic": "independent-possessive",
  "label": "소유대명사와 소유격 한정사",
  "why": "뒤에 명사가 있으면 their, our 같은 한정사를 씁니다. 명사구 전체를 대신하는 자리에는 theirs, ours 같은 소유대명사가 옵니다.",
  "genre": "research",
  "stem": "Our results differ from ____ because the two studies sampled different seasons.",
  "meaning": "두 연구가 서로 다른 계절에 표본을 수집해 우리 연구 결과와 그들의 연구 결과가 다르다.",
  "answers": [
   "theirs",
   "their",
   "they",
   "them are"
  ],
  "slots": []
 },
 {
  "id": "independent-possessive-3",
  "topic": "independent-possessive",
  "label": "소유대명사와 소유격 한정사",
  "why": "뒤에 명사가 있으면 their, our 같은 한정사를 씁니다. 명사구 전체를 대신하는 자리에는 theirs, ours 같은 소유대명사가 옵니다.",
  "genre": "news",
  "stem": "The neighboring district lends us buses whenever ____ are undergoing repairs.",
  "meaning": "인근 지역은 우리 버스가 수리를 받을 때마다 버스를 빌려준다.",
  "answers": [
   "ours",
   "our",
   "us",
   "we"
  ],
  "slots": []
 },
 {
  "id": "partitive-relative-1",
  "topic": "partitive-relative",
  "label": "수량사 + of whom·which",
  "why": "쉼표 뒤에서 앞 집단의 일부를 고르는 관계절입니다. 사람을 받으면 of whom, 사물을 받으면 of which를 씁니다.",
  "genre": "news",
  "stem": "Four experts testified, two of ____ had inspected the damaged tunnel.",
  "meaning": "전문가 네 명이 증언했고, 그중 두 명은 손상된 터널을 점검한 적이 있었다.",
  "answers": [
   "whom",
   "which",
   "whose",
   "that"
  ],
  "slots": []
 },
 {
  "id": "partitive-relative-2",
  "topic": "partitive-relative",
  "label": "수량사 + of whom·which",
  "why": "쉼표 뒤에서 앞 집단의 일부를 고르는 관계절입니다. 사람을 받으면 of whom, 사물을 받으면 of which를 씁니다.",
  "genre": "research",
  "stem": "The archive contains twelve maps, only three of ____ show the original shoreline.",
  "meaning": "기록 보관소의 지도 열두 장 가운데 세 장만이 원래 해안선을 보여 준다.",
  "answers": [
   "which",
   "whom",
   "that",
   "who"
  ],
  "slots": []
 },
 {
  "id": "partitive-relative-3",
  "topic": "partitive-relative",
  "label": "수량사 + of whom·which",
  "why": "쉼표 뒤에서 앞 집단의 일부를 고르는 관계절입니다. 사람을 받으면 of whom, 사물을 받으면 of which를 씁니다.",
  "genre": "work",
  "stem": "The manager interviewed six applicants, all of ____ held valid licenses.",
  "meaning": "관리자가 면접한 지원자 여섯 명은 모두 유효한 면허를 가지고 있었다.",
  "answers": [
   "whom",
   "whose",
   "that",
   "which"
  ],
  "slots": []
 },
 {
  "id": "parallel-1",
  "topic": "parallel",
  "label": "병렬 구조",
  "why": "and나 or가 같은 지위의 표현을 연결할 때 앞뒤 문법 형태를 맞춥니다. 공통으로 걸리는 동사나 전치사가 있는지 살펴보세요.",
  "genre": "research",
  "stem": "The protocol involves collecting soil, measuring moisture, and ____ the results.",
  "meaning": "그 절차에는 흙 채취, 수분 측정, 결과 기록이 포함된다.",
  "answers": [
   "recording",
   "record",
   "to record",
   "recorded"
  ],
  "slots": []
 },
 {
  "id": "parallel-2",
  "topic": "parallel",
  "label": "병렬 구조",
  "why": "and나 or가 같은 지위의 표현을 연결할 때 앞뒤 문법 형태를 맞춥니다. 공통으로 걸리는 동사나 전치사가 있는지 살펴보세요.",
  "genre": "news",
  "stem": "The crews were responsible for clearing debris and ____ power lines.",
  "meaning": "작업반은 잔해를 치우고 전선을 수리하는 일을 맡았다.",
  "answers": [
   "repairing",
   "repair",
   "to repair",
   "repaired"
  ],
  "slots": []
 },
 {
  "id": "parallel-3",
  "topic": "parallel",
  "label": "병렬 구조",
  "why": "and나 or가 같은 지위의 표현을 연결할 때 앞뒤 문법 형태를 맞춥니다. 공통으로 걸리는 동사나 전치사가 있는지 살펴보세요.",
  "genre": "work",
  "stem": "The new interface lets staff search, sort, and ____ archived orders.",
  "meaning": "새 인터페이스로 직원들은 보관된 주문을 검색하고 정렬하고 내보낼 수 있다.",
  "answers": [
   "export",
   "exports",
   "exported",
   "exporting"
  ],
  "slots": []
 },
 {
  "id": "causative-1",
  "topic": "causative",
  "label": "사역 구문 have·get + 목적어 + 과거분사",
  "why": "서비스나 작업을 남에게 맡겨 대상이 그 작업을 받는 경우, 목적어 뒤에 과거분사를 둡니다.",
  "genre": "work",
  "stem": "We had the faulty meter ____ by a licensed electrician yesterday.",
  "meaning": "우리는 어제 자격을 갖춘 전기 기술자에게 고장 난 계량기를 교체하도록 맡겼다.",
  "answers": [
   "replaced",
   "replace",
   "replacing",
   "replaces"
  ],
  "slots": []
 },
 {
  "id": "causative-2",
  "topic": "causative",
  "label": "사역 구문 have·get + 목적어 + 과거분사",
  "why": "서비스나 작업을 남에게 맡겨 대상이 그 작업을 받는 경우, 목적어 뒤에 과거분사를 둡니다.",
  "genre": "research",
  "stem": "The lab got its reference weights ____ by an independent service.",
  "meaning": "실험실은 독립 기관을 통해 기준 분동의 교정을 받았다.",
  "answers": [
   "calibrated",
   "calibrate",
   "calibrates",
   "to calibrating"
  ],
  "slots": []
 },
 {
  "id": "causative-3",
  "topic": "causative",
  "label": "사역 구문 have·get + 목적어 + 과거분사",
  "why": "서비스나 작업을 남에게 맡겨 대상이 그 작업을 받는 경우, 목적어 뒤에 과거분사를 둡니다.",
  "genre": "news",
  "stem": "The council had the warning signs ____ into three languages.",
  "meaning": "시의회는 경고 표지판을 세 개 언어로 번역하도록 했다.",
  "answers": [
   "translated",
   "translate",
   "translates",
   "translation"
  ],
  "slots": []
 },
 {
  "id": "modal-perfect-1",
  "topic": "modal-perfect",
  "label": "조동사 완료형의 추론·유감",
  "why": "과거 사건에 대한 추론이나 유감을 나타낼 때 조동사 + have + 과거분사를 씁니다. 조동사 자체의 의미도 문맥과 맞아야 합니다.",
  "genre": "research",
  "stem": "The sealed container is empty; the gas must ____ through a tiny crack overnight.",
  "meaning": "밀폐 용기가 비어 있으니 밤사이 작은 균열로 기체가 빠져나간 것이 틀림없다.",
  "answers": [
   "have escaped",
   "has escaped",
   "escaping",
   "have escape"
  ],
  "slots": []
 },
 {
  "id": "modal-perfect-2",
  "topic": "modal-perfect",
  "label": "조동사 완료형의 추론·유감",
  "why": "과거 사건에 대한 추론이나 유감을 나타낼 때 조동사 + have + 과거분사를 씁니다. 조동사 자체의 의미도 문맥과 맞아야 합니다.",
  "genre": "work",
  "stem": "We should ____ the address before the parcel went out yesterday.",
  "meaning": "우리는 어제 소포가 나가기 전에 주소를 확인했어야 했다.",
  "answers": [
   "have checked",
   "had checking",
   "checked to",
   "have check"
  ],
  "slots": []
 },
 {
  "id": "modal-perfect-3",
  "topic": "modal-perfect",
  "label": "조동사 완료형의 추론·유감",
  "why": "과거 사건에 대한 추론이나 유감을 나타낼 때 조동사 + have + 과거분사를 씁니다. 조동사 자체의 의미도 문맥과 맞아야 합니다.",
  "genre": "news",
  "stem": "The ferry could not ____ before dawn: its engines were still being repaired at sunrise.",
  "meaning": "해 뜰 때까지 엔진을 수리 중이었으므로 여객선이 동트기 전에 떠났을 리가 없다.",
  "answers": [
   "have departed",
   "has departed",
   "departing",
   "have depart"
  ],
  "slots": []
 },
 {
  "id": "past-habit-1",
  "topic": "past-habit",
  "label": "used to로 나타내는 과거 습관",
  "why": "과거의 습관이나 상태를 표현하는 used to 뒤에는 동사원형이 옵니다. be used to 뒤에서 ‘익숙하다’를 표현하는 구조와 구분하세요.",
  "genre": "news",
  "stem": "Before the new line opened, the last bus used to ____ at nine.",
  "meaning": "새 노선 개통 전에는 막차가 아홉 시에 출발하곤 했다.",
  "answers": [
   "leave",
   "leaving",
   "left",
   "leaves"
  ],
  "slots": []
 },
 {
  "id": "past-habit-2",
  "topic": "past-habit",
  "label": "used to로 나타내는 과거 습관",
  "why": "과거의 습관이나 상태를 표현하는 used to 뒤에는 동사원형이 옵니다. be used to 뒤에서 ‘익숙하다’를 표현하는 구조와 구분하세요.",
  "genre": "research",
  "stem": "These instruments used to ____ an entire room, but modern ones fit on a desk.",
  "meaning": "이 장비들은 예전에 방 하나를 전부 차지했지만 최신 장비는 책상 위에 들어간다.",
  "answers": [
   "occupy",
   "occupying",
   "occupied",
   "occupies"
  ],
  "slots": []
 },
 {
  "id": "past-habit-3",
  "topic": "past-habit",
  "label": "used to로 나타내는 과거 습관",
  "why": "과거의 습관이나 상태를 표현하는 used to 뒤에는 동사원형이 옵니다. be used to 뒤에서 ‘익숙하다’를 표현하는 구조와 구분하세요.",
  "genre": "work",
  "stem": "Before the merger, clients used to ____ their bills in person.",
  "meaning": "합병 전에는 고객들이 방문해서 요금을 내곤 했다.",
  "answers": [
   "pay",
   "paying",
   "paid",
   "pays"
  ],
  "slots": []
 },
 {
  "id": "accustomed-1",
  "topic": "accustomed",
  "label": "be accustomed to·be used to 뒤의 동명사",
  "why": "‘~에 익숙하다’의 to는 전치사입니다. 뒤의 동작은 명사 역할을 하는 -ing형으로 표현합니다.",
  "genre": "research",
  "stem": "Polar researchers are accustomed to ____ for weeks without fresh supplies.",
  "meaning": "극지 연구자들은 새 보급품 없이 몇 주간 일하는 데 익숙하다.",
  "answers": [
   "working",
   "work",
   "worked",
   "works"
  ],
  "slots": []
 },
 {
  "id": "accustomed-2",
  "topic": "accustomed",
  "label": "be accustomed to·be used to 뒤의 동명사",
  "why": "‘~에 익숙하다’의 to는 전치사입니다. 뒤의 동작은 명사 역할을 하는 -ing형으로 표현합니다.",
  "genre": "work",
  "stem": "Our dispatchers are accustomed to ____ several routes at once during rush hour.",
  "meaning": "우리 배차 담당자들은 혼잡 시간대에 여러 노선을 동시에 관리하는 데 익숙하다.",
  "answers": [
   "managing",
   "manage",
   "managed",
   "manages"
  ],
  "slots": []
 },
 {
  "id": "accustomed-3",
  "topic": "accustomed",
  "label": "be accustomed to·be used to 뒤의 동명사",
  "why": "‘~에 익숙하다’의 to는 전치사입니다. 뒤의 동작은 명사 역할을 하는 -ing형으로 표현합니다.",
  "genre": "news",
  "stem": "The rescue dogs soon became accustomed to ____ near helicopters.",
  "meaning": "구조견들은 곧 헬리콥터 근처에서 수색하는 데 익숙해졌다.",
  "answers": [
   "searching",
   "search",
   "searched",
   "searches"
  ],
  "slots": []
 },
 {
  "id": "future-perfect-1",
  "topic": "future-perfect",
  "label": "미래완료",
  "why": "미래의 기준 시점까지 완료될 일을 돌아보는 구조는 will have + 과거분사입니다. by the time과 by + 시점이 단서가 됩니다.",
  "genre": "research",
  "stem": "By the time the symposium begins, the team will have ____ the final analysis.",
  "meaning": "학술회의가 시작될 때쯤이면 연구팀은 최종 분석을 끝냈을 것이다.",
  "answers": [
   "completed",
   "complete",
   "completing",
   "completes"
  ],
  "slots": []
 },
 {
  "id": "future-perfect-2",
  "topic": "future-perfect",
  "label": "미래완료",
  "why": "미래의 기준 시점까지 완료될 일을 돌아보는 구조는 will have + 과거분사입니다. by the time과 by + 시점이 단서가 됩니다.",
  "genre": "news",
  "stem": "By next June, the ferry will ____ carried passengers for a full century.",
  "meaning": "내년 6월이면 그 여객선은 만 100년 동안 승객을 실어 나른 셈이 된다.",
  "answers": [
   "have",
   "has",
   "having",
   "been"
  ],
  "slots": []
 },
 {
  "id": "future-perfect-3",
  "topic": "future-perfect",
  "label": "미래완료",
  "why": "미래의 기준 시점까지 완료될 일을 돌아보는 구조는 will have + 과거분사입니다. by the time과 by + 시점이 단서가 됩니다.",
  "genre": "work",
  "stem": "By the time you start, we will have ____ all of the old terminals.",
  "meaning": "당신이 근무를 시작할 때쯤이면 우리는 기존 단말기를 모두 교체했을 것이다.",
  "answers": [
   "replaced",
   "replacing",
   "replace",
   "replaces"
  ],
  "slots": []
 },
 {
  "id": "time-clause-1",
  "topic": "time-clause",
  "label": "미래 시간 부사절의 현재형",
  "why": "when, until, once 등이 미래의 시점을 이끄는 시간 부사절에는 보통 현재형을 씁니다.",
  "genre": "work",
  "stem": "We will release the funds as soon as the bank ____ the transfer.",
  "meaning": "은행이 송금을 확인하는 대로 자금을 풀겠습니다.",
  "answers": [
   "confirms",
   "will confirm",
   "confirming",
   "to confirm"
  ],
  "slots": []
 },
 {
  "id": "time-clause-2",
  "topic": "time-clause",
  "label": "미래 시간 부사절의 현재형",
  "why": "when, until, once 등이 미래의 시점을 이끄는 시간 부사절에는 보통 현재형을 씁니다.",
  "genre": "research",
  "stem": "The team will begin sampling once the tide ____ its lowest point tomorrow.",
  "meaning": "내일 조수가 가장 낮은 지점에 이르면 연구팀은 시료 채취를 시작할 것이다.",
  "answers": [
   "reaches",
   "will reach",
   "reaching",
   "to reach"
  ],
  "slots": []
 },
 {
  "id": "time-clause-3",
  "topic": "time-clause",
  "label": "미래 시간 부사절의 현재형",
  "why": "when, until, once 등이 미래의 시점을 이끄는 시간 부사절에는 보통 현재형을 씁니다.",
  "genre": "news",
  "stem": "The station will remain closed until the last bus ____ the terminal tonight.",
  "meaning": "오늘 밤 막차가 터미널을 떠날 때까지 역은 폐쇄 상태를 유지한다.",
  "answers": [
   "leaves",
   "will leave",
   "leaving",
   "to leave"
  ],
  "slots": []
 },
 {
  "id": "past-wish-1",
  "topic": "past-wish",
  "label": "wish·if only와 과거 사실의 반대",
  "why": "이미 지나간 일에 대한 아쉬움을 나타내면 wish나 if only 뒤에 과거완료 had + 과거분사를 씁니다.",
  "genre": "research",
  "stem": "The team lost its only copy and now wishes it ____ backed up the data beforehand.",
  "meaning": "연구팀은 유일한 사본을 잃고 이제야 데이터를 미리 백업해 두었더라면 하고 아쉬워한다.",
  "answers": [
   "had",
   "has",
   "would",
   "was"
  ],
  "slots": []
 },
 {
  "id": "past-wish-2",
  "topic": "past-wish",
  "label": "wish·if only와 과거 사실의 반대",
  "why": "이미 지나간 일에 대한 아쉬움을 나타내면 wish나 if only 뒤에 과거완료 had + 과거분사를 씁니다.",
  "genre": "work",
  "stem": "If only we had ____ the cancellation notice before boarding yesterday!",
  "meaning": "어제 탑승하기 전에 취소 안내를 보았더라면 좋았을 텐데!",
  "answers": [
   "seen",
   "saw",
   "see",
   "seeing"
  ],
  "slots": []
 },
 {
  "id": "past-wish-3",
  "topic": "past-wish",
  "label": "wish·if only와 과거 사실의 반대",
  "why": "이미 지나간 일에 대한 아쉬움을 나타내면 wish나 if only 뒤에 과거완료 had + 과거분사를 씁니다.",
  "genre": "news",
  "stem": "The reporter wishes she had ____ the spelling before the first edition went to press.",
  "meaning": "기자는 초판이 인쇄되기 전에 철자를 확인했더라면 좋았을 것이라고 생각한다.",
  "answers": [
   "checked",
   "check",
   "checks",
   "checking"
  ],
  "slots": []
 },
 {
  "id": "degree-result-1",
  "topic": "degree-result",
  "label": "so·such와 결과절",
  "why": "so는 주로 형용사나 부사를 꾸미고, such는 명사구 앞에 놓입니다. 뒤의 that절이 정도에 따른 결과를 나타냅니다.",
  "genre": "research",
  "stem": "The noise was ____ intense that the faint signal disappeared entirely.",
  "meaning": "잡음이 너무 강해 희미한 신호가 완전히 사라졌다.",
  "answers": [
   "so",
   "such",
   "many",
   "much of"
  ],
  "slots": []
 },
 {
  "id": "degree-result-2",
  "topic": "degree-result",
  "label": "so·such와 결과절",
  "why": "so는 주로 형용사나 부사를 꾸미고, such는 명사구 앞에 놓입니다. 뒤의 that절이 정도에 따른 결과를 나타냅니다.",
  "genre": "news",
  "stem": "It was ____ a severe storm that all crossings were suspended.",
  "meaning": "폭풍이 워낙 거세 모든 선박의 횡단 운항이 중단됐다.",
  "answers": [
   "such",
   "so",
   "too",
   "very"
  ],
  "slots": []
 },
 {
  "id": "degree-result-3",
  "topic": "degree-result",
  "label": "so·such와 결과절",
  "why": "so는 주로 형용사나 부사를 꾸미고, such는 명사구 앞에 놓입니다. 뒤의 that절이 정도에 따른 결과를 나타냅니다.",
  "genre": "work",
  "stem": "The supplier gave ____ detailed instructions that no installation visit was necessary.",
  "meaning": "공급업체가 매우 상세한 지침을 줘서 설치 기사가 방문할 필요가 없었다.",
  "answers": [
   "such",
   "so",
   "too",
   "much"
  ],
  "slots": []
 },
 {
  "id": "enough-1",
  "topic": "enough",
  "label": "enough의 위치·보충 부정사",
  "why": "enough는 형용사 뒤 또는 명사 앞에 놓입니다. 충분해서 가능한 동작은 to부정사로 연결할 수 있습니다.",
  "genre": "research",
  "stem": "The recording was clear ____ to distinguish the two bird calls.",
  "meaning": "녹음은 두 새소리를 구별할 수 있을 만큼 선명했다.",
  "answers": [
   "enough",
   "too",
   "such",
   "many"
  ],
  "slots": []
 },
 {
  "id": "enough-2",
  "topic": "enough",
  "label": "enough의 위치·보충 부정사",
  "why": "enough는 형용사 뒤 또는 명사 앞에 놓입니다. 충분해서 가능한 동작은 to부정사로 연결할 수 있습니다.",
  "genre": "news",
  "stem": "The water was shallow enough ____ the stranded boat on foot.",
  "meaning": "물이 충분히 얕아 좌초된 배까지 걸어갈 수 있었다.",
  "answers": [
   "to reach",
   "reaching",
   "reached",
   "reach to"
  ],
  "slots": []
 },
 {
  "id": "enough-3",
  "topic": "enough",
  "label": "enough의 위치·보충 부정사",
  "why": "enough는 형용사 뒤 또는 명사 앞에 놓입니다. 충분해서 가능한 동작은 to부정사로 연결할 수 있습니다.",
  "genre": "work",
  "stem": "The file is small ____ to attach to a single email.",
  "meaning": "파일 크기가 작아 이메일 한 통에 첨부할 수 있다.",
  "answers": [
   "enough",
   "such",
   "too much",
   "as many"
  ],
  "slots": []
 },
 {
  "id": "substitution-1",
  "topic": "substitution",
  "label": "비교에서 반복 명사를 대신하는 that·those",
  "why": "비교 대상의 명사를 되풀이하지 않을 때 단수·불가산 명사는 that, 복수 명사는 those로 대신합니다.",
  "genre": "research",
  "stem": "The density of this alloy is lower than ____ of pure copper.",
  "meaning": "이 합금의 밀도는 순수 구리의 밀도보다 낮다.",
  "answers": [
   "that",
   "those",
   "these",
   "the ones"
  ],
  "slots": []
 },
 {
  "id": "substitution-2",
  "topic": "substitution",
  "label": "비교에서 반복 명사를 대신하는 that·those",
  "why": "비교 대상의 명사를 되풀이하지 않을 때 단수·불가산 명사는 that, 복수 명사는 those로 대신합니다.",
  "genre": "news",
  "stem": "The monthly fares on the new route are higher than ____ on the old route.",
  "meaning": "새 노선의 월 요금은 이전 노선 요금보다 높다.",
  "answers": [
   "those",
   "that",
   "this",
   "it"
  ],
  "slots": []
 },
 {
  "id": "substitution-3",
  "topic": "substitution",
  "label": "비교에서 반복 명사를 대신하는 that·those",
  "why": "비교 대상의 명사를 되풀이하지 않을 때 단수·불가산 명사는 that, 복수 명사는 those로 대신합니다.",
  "genre": "work",
  "stem": "The warranty period for the motor is longer than ____ for the battery.",
  "meaning": "모터의 보증 기간은 배터리의 보증 기간보다 길다.",
  "answers": [
   "that",
   "those",
   "these",
   "them"
  ],
  "slots": []
 },
 {
  "id": "concessive-degree-1",
  "topic": "concessive-degree",
  "label": "however·no matter how 양보절",
  "why": "‘얼마나 ~하든’이라는 뜻은 however 또는 no matter how 뒤에 형용사·부사, 주어와 동사를 차례로 두어 표현합니다.",
  "genre": "research",
  "stem": "____ small the measured effect is, it still needs an uncertainty estimate.",
  "meaning": "측정한 효과가 아무리 작아도 불확실성 추정치는 필요하다.",
  "answers": [
   "However",
   "Despite",
   "Although that",
   "Whereas the"
  ],
  "slots": []
 },
 {
  "id": "concessive-degree-2",
  "topic": "concessive-degree",
  "label": "however·no matter how 양보절",
  "why": "‘얼마나 ~하든’이라는 뜻은 however 또는 no matter how 뒤에 형용사·부사, 주어와 동사를 차례로 두어 표현합니다.",
  "genre": "work",
  "stem": "No matter ____ carefully the crates are packed, each one must be inspected.",
  "meaning": "상자를 아무리 신중하게 포장해도 하나씩 점검해야 한다.",
  "answers": [
   "how",
   "what",
   "which",
   "whose"
  ],
  "slots": []
 },
 {
  "id": "concessive-degree-3",
  "topic": "concessive-degree",
  "label": "however·no matter how 양보절",
  "why": "‘얼마나 ~하든’이라는 뜻은 however 또는 no matter how 뒤에 형용사·부사, 주어와 동사를 차례로 두어 표현합니다.",
  "genre": "news",
  "stem": "____ distant the storm may seem, the warning applies to the entire bay.",
  "meaning": "폭풍이 아무리 멀게 느껴지더라도 경보는 만 전체에 적용된다.",
  "answers": [
   "However",
   "Whatever",
   "Despite",
   "Which"
  ],
  "slots": []
 },
 {
  "id": "negative-addition-1",
  "topic": "negative-addition",
  "label": "neither·nor 뒤의 동의 도치",
  "why": "앞의 부정 진술에 ‘~도 그렇지 않다’를 덧붙일 때 neither 또는 nor + 조동사 + 주어 순서를 씁니다.",
  "genre": "research",
  "stem": "The first model did not converge, and neither ____ the second.",
  "meaning": "첫 번째 모형이 수렴하지 않았고 두 번째도 마찬가지였다.",
  "answers": [
   "did",
   "was converging",
   "had been",
   "is being"
  ],
  "slots": []
 },
 {
  "id": "negative-addition-2",
  "topic": "negative-addition",
  "label": "neither·nor 뒤의 동의 도치",
  "why": "앞의 부정 진술에 ‘~도 그렇지 않다’를 덧붙일 때 neither 또는 nor + 조동사 + 주어 순서를 씁니다.",
  "genre": "news",
  "stem": "The south gate has not reopened, nor ____ the north gate.",
  "meaning": "남문은 아직 다시 열리지 않았고 북문도 마찬가지다.",
  "answers": [
   "has",
   "does",
   "is being",
   "have"
  ],
  "slots": []
 },
 {
  "id": "negative-addition-3",
  "topic": "negative-addition",
  "label": "neither·nor 뒤의 동의 도치",
  "why": "앞의 부정 진술에 ‘~도 그렇지 않다’를 덧붙일 때 neither 또는 nor + 조동사 + 주어 순서를 씁니다.",
  "genre": "work",
  "stem": "Our old printer cannot scan documents, and neither ____ the spare one.",
  "meaning": "기존 프린터는 문서를 스캔할 수 없고 예비 프린터도 마찬가지다.",
  "answers": [
   "can",
   "has",
   "was",
   "do"
  ],
  "slots": []
 },
 {
  "id": "passive-infinitive-1",
  "topic": "passive-infinitive",
  "label": "수동 부정사·완료 수동 부정사",
  "why": "to부정사의 주체가 행위를 받는 대상이면 to be + 과거분사를 씁니다. 이미 끝난 일이라면 to have been + 과거분사가 가능합니다.",
  "genre": "research",
  "stem": "For the sample to be ____ in the trial, its origin must be documented.",
  "meaning": "시료가 시험에 포함되려면 출처를 기록해야 한다.",
  "answers": [
   "included",
   "include",
   "including",
   "includes"
  ],
  "slots": []
 },
 {
  "id": "passive-infinitive-2",
  "topic": "passive-infinitive",
  "label": "수동 부정사·완료 수동 부정사",
  "why": "to부정사의 주체가 행위를 받는 대상이면 to be + 과거분사를 씁니다. 이미 끝난 일이라면 to have been + 과거분사가 가능합니다.",
  "genre": "news",
  "stem": "The missing manuscript is believed to have been ____ abroad in the 1930s.",
  "meaning": "사라진 원고는 1930년대에 해외로 반출된 것으로 여겨진다.",
  "answers": [
   "taken",
   "take",
   "taking",
   "took"
  ],
  "slots": []
 },
 {
  "id": "passive-infinitive-3",
  "topic": "passive-infinitive",
  "label": "수동 부정사·완료 수동 부정사",
  "why": "to부정사의 주체가 행위를 받는 대상이면 to be + 과거분사를 씁니다. 이미 끝난 일이라면 to have been + 과거분사가 가능합니다.",
  "genre": "work",
  "stem": "The labels need to ____ attached before the cartons are loaded.",
  "meaning": "상자를 싣기 전에 라벨이 부착되어 있어야 한다.",
  "answers": [
   "be",
   "being",
   "have",
   "been"
  ],
  "slots": []
 },
 {
  "id": "appositive-1",
  "topic": "appositive",
  "label": "동격·내용절 that",
  "why": "명사 뒤에 그 사실·주장·가정의 내용을 완전한 절로 제시할 때 that을 씁니다. 뒤 절에는 필수 성분이 이미 갖춰져 있습니다.",
  "genre": "research",
  "stem": "The analysis rests on the assumption ____ all sensors respond at the same rate.",
  "meaning": "이 분석은 모든 센서가 같은 속도로 반응한다는 가정에 기초한다.",
  "answers": [
   "that",
   "whose",
   "what",
   "of which"
  ],
  "slots": []
 },
 {
  "id": "appositive-2",
  "topic": "appositive",
  "label": "동격·내용절 that",
  "why": "명사 뒤에 그 사실·주장·가정의 내용을 완전한 절로 제시할 때 that을 씁니다. 뒤 절에는 필수 성분이 이미 갖춰져 있습니다.",
  "genre": "news",
  "stem": "The announcement confirmed the fact ____ the library would remain open during repairs.",
  "meaning": "공지문은 보수 기간에도 도서관이 계속 문을 연다는 사실을 확인했다.",
  "answers": [
   "that",
   "which of",
   "whose",
   "what"
  ],
  "slots": []
 },
 {
  "id": "appositive-3",
  "topic": "appositive",
  "label": "동격·내용절 that",
  "why": "명사 뒤에 그 사실·주장·가정의 내용을 완전한 절로 제시할 때 that을 씁니다. 뒤 절에는 필수 성분이 이미 갖춰져 있습니다.",
  "genre": "work",
  "stem": "The contract contains a provision ____ the buyer may inspect the goods before payment.",
  "meaning": "계약에는 구매자가 지급 전에 물품을 점검할 수 있다는 조항이 있다.",
  "answers": [
   "that",
   "what",
   "whose",
   "which of"
  ],
  "slots": []
 },
 {
  "id": "purpose-1",
  "topic": "purpose",
  "label": "목적의 so that·in order to",
  "why": "목적을 나타낼 때 so that은 주어와 동사가 있는 절을, in order to는 동사원형을 이끕니다.",
  "genre": "research",
  "stem": "The measurements were repeated in order ____ random error.",
  "meaning": "무작위 오차를 줄이기 위해 측정을 반복했다.",
  "answers": [
   "to reduce",
   "reducing",
   "reduced",
   "that reduce"
  ],
  "slots": []
 },
 {
  "id": "purpose-2",
  "topic": "purpose",
  "label": "목적의 so that·in order to",
  "why": "목적을 나타낼 때 so that은 주어와 동사가 있는 절을, in order to는 동사원형을 이끕니다.",
  "genre": "news",
  "stem": "The city posted signs in two languages so ____ visitors could find the shelter.",
  "meaning": "방문객들이 대피소를 찾을 수 있도록 시는 두 언어로 표지판을 세웠다.",
  "answers": [
   "that",
   "as to",
   "because of",
   "for"
  ],
  "slots": []
 },
 {
  "id": "purpose-3",
  "topic": "purpose",
  "label": "목적의 so that·in order to",
  "why": "목적을 나타낼 때 so that은 주어와 동사가 있는 절을, in order to는 동사원형을 이끕니다.",
  "genre": "work",
  "stem": "We reserved a larger room in order ____ all the delegates comfortably.",
  "meaning": "모든 대표가 편안하게 앉을 수 있도록 더 큰 회의실을 예약했다.",
  "answers": [
   "to seat",
   "seating",
   "seated",
   "that seating"
  ],
  "slots": []
 },
 {
  "id": "absolute-with-1",
  "topic": "absolute-with",
  "label": "with + 명사 + 분사 구문",
  "why": "with 뒤에 명사와 그 상태를 설명하는 분사를 두어 배경을 덧붙일 수 있습니다. 명사와 분사의 관계가 능동인지 수동인지 확인하세요.",
  "genre": "research",
  "stem": "With all identifiers ____ from the files, the analysts began the blinded review.",
  "meaning": "파일에서 모든 식별자를 삭제한 상태에서 분석가들이 눈가림 검토를 시작했다.",
  "answers": [
   "removed",
   "remove",
   "removes",
   "to removing"
  ],
  "slots": []
 },
 {
  "id": "absolute-with-2",
  "topic": "absolute-with",
  "label": "with + 명사 + 분사 구문",
  "why": "with 뒤에 명사와 그 상태를 설명하는 분사를 두어 배경을 덧붙일 수 있습니다. 명사와 분사의 관계가 능동인지 수동인지 확인하세요.",
  "genre": "news",
  "stem": "With floodwater ____ rapidly overnight, crews moved the barriers uphill.",
  "meaning": "밤사이 홍수가 빠르게 불어나 작업반은 방벽을 더 높은 곳으로 옮겼다.",
  "answers": [
   "rising",
   "risen by",
   "to rising",
   "rises"
  ],
  "slots": []
 },
 {
  "id": "absolute-with-3",
  "topic": "absolute-with",
  "label": "with + 명사 + 분사 구문",
  "why": "with 뒤에 명사와 그 상태를 설명하는 분사를 두어 배경을 덧붙일 수 있습니다. 명사와 분사의 관계가 능동인지 수동인지 확인하세요.",
  "genre": "work",
  "stem": "With both conference rooms ____ for the afternoon, we moved the interview online.",
  "meaning": "오후에 회의실 두 곳이 모두 예약된 상태여서 면접을 온라인으로 옮겼다.",
  "answers": [
   "booked",
   "book",
   "books",
   "to booking"
  ],
  "slots": []
 },
 {
  "id": "inverted-condition-1",
  "topic": "inverted-condition",
  "label": "if 생략 조건절의 도치",
  "why": "if를 생략한 조건절은 had, were 또는 should를 주어 앞으로 옮길 수 있습니다. 과거 사실과 반대면 Had + 주어 + 과거분사, 가능성이 낮은 가정이면 Were + 주어 + to부정사, 미래의 만일을 대비하면 Should + 주어 + 동사원형을 씁니다.",
  "genre": "research",
  "stem": "____ the researchers included only paved sites, they would have missed the cooling effect of urban woodlands.",
  "meaning": "연구진이 포장된 곳만 포함했다면 도시 숲의 냉각 효과를 놓쳤을 것이다.",
  "answers": [
   "Had",
   "Were",
   "Should",
   "Having"
  ],
  "slots": []
 },
 {
  "id": "inverted-condition-2",
  "topic": "inverted-condition",
  "label": "if 생략 조건절의 도치",
  "why": "if를 생략한 조건절은 had, were 또는 should를 주어 앞으로 옮길 수 있습니다. 과거 사실과 반대면 Had + 주어 + 과거분사, 가능성이 낮은 가정이면 Were + 주어 + to부정사, 미래의 만일을 대비하면 Should + 주어 + 동사원형을 씁니다.",
  "genre": "news",
  "stem": "____ the telescope to detect the same signal again, astronomers would request a longer observation.",
  "meaning": "망원경이 같은 신호를 다시 포착한다면 천문학자들은 더 긴 관측을 요청할 것이다.",
  "answers": [
   "Were",
   "Had",
   "Should",
   "Would"
  ],
  "slots": []
 },
 {
  "id": "inverted-condition-3",
  "topic": "inverted-condition",
  "label": "if 생략 조건절의 도치",
  "why": "if를 생략한 조건절은 had, were 또는 should를 주어 앞으로 옮길 수 있습니다. 과거 사실과 반대면 Had + 주어 + 과거분사, 가능성이 낮은 가정이면 Were + 주어 + to부정사, 미래의 만일을 대비하면 Should + 주어 + 동사원형을 씁니다.",
  "genre": "work",
  "stem": "____ your flight be delayed, please call the hotel before midnight.",
  "meaning": "혹시 비행기가 지연되면 자정 전에 호텔에 전화해 주세요.",
  "answers": [
   "Should",
   "Had",
   "Were",
   "Unless"
  ],
  "slots": []
 },
 {
  "topic": "complement",
  "stem": "I hope that she will ____ me.",
  "answers": [
   "help",
   "helping",
   "helps",
   "to help"
  ],
  "why": "조동사 바로 뒤의 본동사는 주어의 수와 관계없이 원형으로 씁니다.",
  "original": "I hope that she will help me.",
  "meaning": "나는 그녀가 날 도와주길 바란다.",
  "id": "corpus-314450",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #314450 (CK) & #11104603 (intertime)",
  "label": "동명사와 부정사",
  "slots": []
 },
 {
  "topic": "complement",
  "stem": "Do you think we could ____ that?",
  "answers": [
   "do",
   "doing",
   "does",
   "to do"
  ],
  "why": "조동사 바로 뒤의 본동사는 주어의 수와 관계없이 원형으로 씁니다.",
  "original": "Do you think we could do that?",
  "meaning": "우리가 그걸 할 수 있다 생각해?",
  "id": "corpus-6261569",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #6261569 (CK) & #9571695 (rtyu1120)",
  "label": "동명사와 부정사",
  "slots": []
 },
 {
  "topic": "voice",
  "stem": "A full moon can ____ seen tonight.",
  "answers": [
   "be",
   "being",
   "been",
   "is"
  ],
  "why": "주어가 동작의 대상이므로 조동사 뒤에 수동형 be + 과거분사가 옵니다. 조동사 바로 다음 자리는 원형 be입니다.",
  "original": "A full moon can be seen tonight.",
  "meaning": "오늘밤엔 보름달을 볼 수 있어.",
  "id": "corpus-243395",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #243395 (CK) & #8365765 (Eunhee)",
  "label": "능동태와 수동태",
  "slots": []
 },
 {
  "topic": "complement",
  "stem": "How did you know Tom would ____?",
  "answers": [
   "help",
   "helping",
   "helps",
   "to help"
  ],
  "why": "조동사 바로 뒤의 본동사는 주어의 수와 관계없이 원형으로 씁니다.",
  "original": "How did you know Tom would help?",
  "meaning": "톰이 도와주리라는 것을 어떻게 알았니?",
  "id": "corpus-5791115",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #5791115 (CK) & #7497226 (raining211)",
  "label": "동명사와 부정사",
  "slots": []
 },
 {
  "topic": "complement",
  "stem": "I decided ____ go abroad to study.",
  "answers": [
   "to",
   "of",
   "for",
   "with"
  ],
  "why": "앞 동사에 이어지는 행동을 to부정사로 연결합니다. 다음에 동사원형이 있으므로 to가 필요합니다.",
  "original": "I decided to go abroad to study.",
  "meaning": "난 공부하러 외국에 가기로 결심했어.",
  "id": "corpus-930016",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #930016 (CM) & #8365856 (Eunhee)",
  "label": "동명사와 부정사",
  "slots": []
 },
 {
  "topic": "complement",
  "stem": "I didn't know where I should ____.",
  "answers": [
   "go",
   "going",
   "goes",
   "to go"
  ],
  "why": "조동사 바로 뒤의 본동사는 주어의 수와 관계없이 원형으로 씁니다.",
  "original": "I didn't know where I should go.",
  "meaning": "어디로 가야할지 몰랐다.",
  "id": "corpus-6257519",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #6257519 (CK) & #8549578 (okja)",
  "label": "동명사와 부정사",
  "slots": []
 },
 {
  "topic": "complement",
  "stem": "I didn't know you would ____ that.",
  "answers": [
   "do",
   "doing",
   "does",
   "to do"
  ],
  "why": "조동사 바로 뒤의 본동사는 주어의 수와 관계없이 원형으로 씁니다.",
  "original": "I didn't know you would do that.",
  "meaning": "네가 그걸 할 줄은 몰랐어.",
  "id": "corpus-7519979",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #7519979 (CK) & #8366767 (Eunhee)",
  "label": "동명사와 부정사",
  "slots": []
 },
 {
  "topic": "complement",
  "stem": "I think Tom should ____ on a diet.",
  "answers": [
   "go",
   "going",
   "goes",
   "to go"
  ],
  "why": "조동사 바로 뒤의 본동사는 주어의 수와 관계없이 원형으로 씁니다.",
  "original": "I think Tom should go on a diet.",
  "meaning": "톰은 다이어트를 해야할 것 같아.",
  "id": "corpus-3330585",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #3330585 (CK) & #8358266 (Eunhee)",
  "label": "동명사와 부정사",
  "slots": []
 },
 {
  "topic": "voice",
  "stem": "The tower can ____ seen from here.",
  "answers": [
   "be",
   "being",
   "been",
   "is"
  ],
  "why": "주어가 동작의 대상이므로 조동사 뒤에 수동형 be + 과거분사가 옵니다. 조동사 바로 다음 자리는 원형 be입니다.",
  "original": "The tower can be seen from here.",
  "meaning": "여기에서 타워가 보여.",
  "id": "corpus-44771",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #44771 (CK) & #13250565 (qiwiwi)",
  "label": "능동태와 수동태",
  "slots": []
 },
 {
  "topic": "complement",
  "stem": "Tom has decided ____ go to Boston.",
  "answers": [
   "to",
   "of",
   "for",
   "with"
  ],
  "why": "앞 동사에 이어지는 행동을 to부정사로 연결합니다. 다음에 동사원형이 있으므로 to가 필요합니다.",
  "original": "Tom has decided to go to Boston.",
  "meaning": "톰은 보스턴에 가기로 결정했다.",
  "id": "corpus-4700710",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #4700710 (CK) & #8044392 (yesjustryan)",
  "label": "동명사와 부정사",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "We'll need a lot more ____ this.",
  "answers": [
   "than",
   "as",
   "that",
   "so"
  ],
  "why": "비교급 more 또는 less 뒤에서 비교 대상을 이끄는 말은 than입니다.",
  "original": "We'll need a lot more than this.",
  "meaning": "우리는 이것보다 더 많이 필요할거야",
  "id": "corpus-9688040",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #9688040 (CK) & #9694248 (ST_Young)",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "I love you more ____ you love me.",
  "answers": [
   "than",
   "as",
   "that",
   "so"
  ],
  "why": "비교급 more 또는 less 뒤에서 비교 대상을 이끄는 말은 than입니다.",
  "original": "I love you more than you love me.",
  "meaning": "난 당신이 날 사랑하는 것보다 더 당신을 사랑한다.",
  "id": "corpus-17829",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #17829 (lazycat) & #11104652 (intertime)",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "I wonder if Tom has already ____.",
  "answers": [
   "left",
   "leave",
   "leaving",
   "leaves"
  ],
  "why": "have, has 또는 had 다음에는 과거분사를 써서 완료형을 만듭니다.",
  "original": "I wonder if Tom has already left.",
  "meaning": "Tom이 이미 떠난 건지 궁금해요.",
  "id": "corpus-6337045",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #6337045 (CK) & #10728083 (younglitto)",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "Tom has ____ bitten by his horse.",
  "answers": [
   "been",
   "be",
   "being",
   "is"
  ],
  "why": "완료형의 조동사 have, has, had 뒤에는 과거분사가 옵니다. be의 과거분사형은 been입니다.",
  "original": "Tom has been bitten by his horse.",
  "meaning": "톰은 자기 말한테 물렸어.",
  "id": "corpus-7543484",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #7543484 (CK) & #8365126 (Eunhee)",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "Tom has ____ sleeping in his car.",
  "answers": [
   "been",
   "be",
   "being",
   "is"
  ],
  "why": "완료형의 조동사 have, has, had 뒤에는 과거분사가 옵니다. be의 과거분사형은 been입니다.",
  "original": "Tom has been sleeping in his car.",
  "meaning": "톰은 자기 차에서 자고 있었어.",
  "id": "corpus-6664520",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #6664520 (CK) & #8357775 (Eunhee)",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "Tom has ____ trying to help Mary.",
  "answers": [
   "been",
   "be",
   "being",
   "is"
  ],
  "why": "완료형의 조동사 have, has, had 뒤에는 과거분사가 옵니다. be의 과거분사형은 been입니다.",
  "original": "Tom has been trying to help Mary.",
  "meaning": "톰은 메리를 도우려고 애써왔다.",
  "id": "corpus-6272251",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #6272251 (CK) & #7500614 (raining211)",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "complement",
  "stem": "I know Tom knows I should ____ that.",
  "answers": [
   "do",
   "doing",
   "does",
   "to do"
  ],
  "why": "조동사 바로 뒤의 본동사는 주어의 수와 관계없이 원형으로 씁니다.",
  "original": "I know Tom knows I should do that.",
  "meaning": "나는 톰이 내가 그렇게 해야한다는 것을 안다는 것을 안다.",
  "id": "corpus-7518951",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #7518951 (CK) & #9689606 (ST_Young)",
  "label": "동명사와 부정사",
  "slots": []
 },
 {
  "topic": "complement",
  "stem": "Only time will ____ ease the pain.",
  "answers": [
   "help",
   "helping",
   "helps",
   "to help"
  ],
  "why": "조동사 바로 뒤의 본동사는 주어의 수와 관계없이 원형으로 씁니다.",
  "original": "Only time will help ease the pain.",
  "meaning": "오직 시간만이 고통을 낫게 한다.",
  "id": "corpus-9744457",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #9744457 (CK) & #13118413 (romzzo)",
  "label": "동명사와 부정사",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "She cannot have ____ such a thing.",
  "answers": [
   "done",
   "do",
   "doing",
   "does"
  ],
  "why": "have, has 또는 had 다음에는 과거분사를 써서 완료형을 만듭니다.",
  "original": "She cannot have done such a thing.",
  "meaning": "그녀가 그런 일을 했을 리가 없다.",
  "id": "corpus-308074",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #308074 (CK) & #3675006 (okja)",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "complement",
  "stem": "Tom will ____ out sooner or later.",
  "answers": [
   "find",
   "finding",
   "finds",
   "to find"
  ],
  "why": "조동사 바로 뒤의 본동사는 주어의 수와 관계없이 원형으로 씁니다.",
  "original": "Tom will find out sooner or later.",
  "meaning": "톰은 곧 알거에요.",
  "id": "corpus-2641805",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #2641805 (CK) & #3684979 (ssuss32)",
  "label": "동명사와 부정사",
  "slots": []
 },
 {
  "topic": "complement",
  "stem": "I don't know if I should ____ or not.",
  "answers": [
   "go",
   "going",
   "goes",
   "to go"
  ],
  "why": "조동사 바로 뒤의 본동사는 주어의 수와 관계없이 원형으로 씁니다.",
  "original": "I don't know if I should go or not.",
  "meaning": "내가 가야할지 말아야할지 모르겠다.",
  "id": "corpus-2361243",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #2361243 (CK) & #13118843 (romzzo)",
  "label": "동명사와 부정사",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "I thanked him for what he had ____.",
  "answers": [
   "done",
   "do",
   "doing",
   "does"
  ],
  "why": "have, has 또는 had 다음에는 과거분사를 써서 완료형을 만듭니다.",
  "original": "I thanked him for what he had done.",
  "meaning": "나는 그의 행동에 감사를 표했다.",
  "id": "corpus-259959",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #259959 (CK) & #11105875 (intertime)",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "Tom has ____ rather busy these days.",
  "answers": [
   "been",
   "be",
   "being",
   "is"
  ],
  "why": "완료형의 조동사 have, has, had 뒤에는 과거분사가 옵니다. be의 과거분사형은 been입니다.",
  "original": "Tom has been rather busy these days.",
  "meaning": "톰은 요즘 들어 꽤 바빴다.",
  "id": "corpus-6254152",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #6254152 (CK) & #6820066 (yesjustryan)",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "As soon ____ he arrives, I'll tell him.",
  "answers": [
   "as",
   "than",
   "that",
   "so"
  ],
  "why": "as soon as는 뒤 절의 일이 일어나자마자 다른 일이 이어짐을 나타냅니다.",
  "original": "As soon as he arrives, I'll tell him.",
  "meaning": "그가 도착하자마자, 내가 그에게 말할거야.",
  "id": "corpus-2264689",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #2264689 (_undertoad) & #13692031 (hahahhhhhhihk)",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "modifier",
  "stem": "I don't think Tom is ____ to do that.",
  "answers": [
   "able",
   "ability",
   "ably",
   "abilities"
  ],
  "why": "be 뒤에는 주어의 상태를 설명하는 형용사가 필요합니다. be able to 다음에 동사원형을 붙여 능력을 나타냅니다.",
  "original": "I don't think Tom is able to do that.",
  "meaning": "난 톰이 저런걸 할 수 있으리라고 생각하지 않아.",
  "id": "corpus-6244281",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #6244281 (CK) & #8358627 (Eunhee)",
  "label": "형용사와 부사",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "In spite ____ everything, Tom is happy.",
  "answers": [
   "of",
   "to",
   "by",
   "from"
  ],
  "why": "in spite of 뒤에 명사구가 이어져 어떤 상황에도 불구하고 일어난 일을 나타냅니다.",
  "original": "In spite of everything, Tom is happy.",
  "meaning": "어찌 됐던 간에, 톰은 행복하다.",
  "id": "corpus-7335526",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #7335526 (shekitten) & #11105199 (intertime)",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "My mom likes my brother more ____ me.",
  "answers": [
   "than",
   "as",
   "that",
   "so"
  ],
  "why": "비교급 more 또는 less 뒤에서 비교 대상을 이끄는 말은 than입니다.",
  "original": "My mom likes my brother more than me.",
  "meaning": "우리 엄마는 나보다 동생을 더 좋아해.",
  "id": "corpus-3419611",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #3419611 (Hybrid) & #8358408 (Eunhee)",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "Tom told Mary what John had ____ him.",
  "answers": [
   "told",
   "tell",
   "telling",
   "tells"
  ],
  "why": "have, has 또는 had 다음에는 과거분사를 써서 완료형을 만듭니다.",
  "original": "Tom told Mary what John had told him.",
  "meaning": "톰은 존이 말한 것을 메리한테 말했다.",
  "id": "corpus-2539347",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #2539347 (CK) & #3684922 (intertime)",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "I wonder whether Tom has already ____.",
  "answers": [
   "left",
   "leave",
   "leaving",
   "leaves"
  ],
  "why": "have, has 또는 had 다음에는 과거분사를 써서 완료형을 만듭니다.",
  "original": "I wonder whether Tom has already left.",
  "meaning": "Tom이 이미 떠난 건지 궁금해요.",
  "id": "corpus-6337044",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #6337044 (CK) & #10728083 (younglitto)",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "Tom has ____ a few words in French.",
  "answers": [
   "learned",
   "learn",
   "learning",
   "learns"
  ],
  "why": "have, has 또는 had 다음에는 과거분사를 써서 완료형을 만듭니다.",
  "original": "Tom has learned a few words in French.",
  "meaning": "톰은 프랑스어를 몇 마디 배웠어.",
  "id": "corpus-8412793",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #8412793 (CK) & #8417361 (Eunhee)",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "Tom will be here in less ____ an hour.",
  "answers": [
   "than",
   "as",
   "that",
   "so"
  ],
  "why": "비교급 more 또는 less 뒤에서 비교 대상을 이끄는 말은 than입니다.",
  "original": "Tom will be here in less than an hour.",
  "meaning": "톰은 한시간 안에 여기로 올 것 같아.",
  "id": "corpus-3171095",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #3171095 (CK) & #8358608 (Eunhee)",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "Everybody here except me has ____ that.",
  "answers": [
   "done",
   "do",
   "doing",
   "does"
  ],
  "why": "have, has 또는 had 다음에는 과거분사를 써서 완료형을 만듭니다.",
  "original": "Everybody here except me has done that.",
  "meaning": "나 빼고 여기에 있는 사람 모두 그것을 했다. (한 적이 있다.)",
  "id": "corpus-6222690",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #6222690 (CK) & #7500613 (raining211)",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "I'll leave as soon ____ it stops raining.",
  "answers": [
   "as",
   "than",
   "that",
   "so"
  ],
  "why": "as soon as는 뒤 절의 일이 일어나자마자 다른 일이 이어짐을 나타냅니다.",
  "original": "I'll leave as soon as it stops raining.",
  "meaning": "비가 그치자마자 바로 떠날 거야.",
  "id": "corpus-8530104",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #8530104 (CK) & #8533691 (Eunhee)",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "Tom said that Mary has never ____ that.",
  "answers": [
   "done",
   "do",
   "doing",
   "does"
  ],
  "why": "have, has 또는 had 다음에는 과거분사를 써서 완료형을 만듭니다.",
  "original": "Tom said that Mary has never done that.",
  "meaning": "톰이 말하길 메리는 저런 것을 한번도 한 적이 없대.",
  "id": "corpus-6435226",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #6435226 (CK) & #8357724 (Eunhee)",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "noun",
  "stem": "What is the ____ between A and B?",
  "answers": [
   "difference",
   "differ",
   "different",
   "differently"
  ],
  "why": "관사나 소유격이 이끄는 명사구의 중심어 자리입니다. 보기 중 명사 difference가 문장에 맞습니다.",
  "original": "What is the difference between A and B?",
  "meaning": "A와 B의 차이가 뭐예요?",
  "id": "corpus-72257",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #72257 (CK) & #3746370 (rainbow4us)",
  "label": "명사 자리와 어형",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "I want to get out here as soon ____ I can.",
  "answers": [
   "as",
   "than",
   "that",
   "so"
  ],
  "why": "as soon as는 뒤 절의 일이 일어나자마자 다른 일이 이어짐을 나타냅니다.",
  "original": "I want to get out here as soon as I can.",
  "meaning": "될 수 있는 한 여기서 빠져나가고 싶어.",
  "id": "corpus-3594737",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #3594737 (CK) & #8366850 (Eunhee)",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "collocation",
  "stem": "A soccer team consists ____ eleven players.",
  "answers": [
   "of",
   "for",
   "by",
   "onto"
  ],
  "why": "무엇으로 구성되는지 열거할 때 consist of를 씁니다.",
  "original": "A soccer team consists of eleven players.",
  "meaning": "축구는 11멍의 선수로 팀이 구성된다.",
  "id": "corpus-54124",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #54124 (CK) & #13151249 (SN_H)",
  "label": "동사·형용사와 전치사",
  "slots": []
 },
 {
  "topic": "modifier",
  "stem": "I assure you Tom will be ____ safe.",
  "answers": [
   "completely",
   "complete",
   "completion",
   "completes"
  ],
  "why": "뒤의 형용사가 나타내는 성질의 정도를 꾸미는 자리이므로 부사 completely가 알맞습니다.",
  "original": "I assure you Tom will be completely safe.",
  "meaning": "톰은 진짜 안전할 거라니까.",
  "id": "corpus-3238984",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #3238984 (CK) & #8361884 (Eunhee)",
  "label": "형용사와 부사",
  "slots": []
 },
 {
  "topic": "modifier",
  "stem": "Tom was ____ to buy everything he needed.",
  "answers": [
   "able",
   "ability",
   "ably",
   "abilities"
  ],
  "why": "be 뒤에는 주어의 상태를 설명하는 형용사가 필요합니다. be able to 다음에 동사원형을 붙여 능력을 나타냅니다.",
  "original": "Tom was able to buy everything he needed.",
  "meaning": "톰은 그가 필요했던 모든 것을 살 수 있었다.",
  "id": "corpus-6132423",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #6132423 (CK) & #11597089 (cherryband)",
  "label": "형용사와 부사",
  "slots": []
 },
 {
  "topic": "collocation",
  "stem": "A football team consists ____ eleven players.",
  "answers": [
   "of",
   "for",
   "by",
   "onto"
  ],
  "why": "무엇으로 구성되는지 열거할 때 consist of를 씁니다.",
  "original": "A football team consists of eleven players.",
  "meaning": "축구는 11멍의 선수로 팀이 구성된다.",
  "id": "corpus-34340",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #34340 (CM) & #13151249 (SN_H)",
  "label": "동사·형용사와 전치사",
  "slots": []
 },
 {
  "topic": "modifier",
  "stem": "I was ____ to swim well when I was a child.",
  "answers": [
   "able",
   "ability",
   "ably",
   "abilities"
  ],
  "why": "be 뒤에는 주어의 상태를 설명하는 형용사가 필요합니다. be able to 다음에 동사원형을 붙여 능력을 나타냅니다.",
  "original": "I was able to swim well when I was a child.",
  "meaning": "나는 내가 어릴 때 수영을 잘할 수 있었다.",
  "id": "corpus-487903",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #487903 (CK) & #13118508 (romzzo)",
  "label": "형용사와 부사",
  "slots": []
 },
 {
  "topic": "collocation",
  "stem": "I'm actually very interested ____ doing that.",
  "answers": [
   "in",
   "of",
   "from",
   "onto"
  ],
  "why": "관심 분야 앞에는 interested in을 씁니다.",
  "original": "I'm actually very interested in doing that.",
  "meaning": "난 사실 그걸 하는 것에 관심이 많아.",
  "id": "corpus-7134484",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #7134484 (CK) & #8362190 (Eunhee)",
  "label": "동사·형용사와 전치사",
  "slots": []
 },
 {
  "topic": "collocation",
  "stem": "I'm not very interested ____ learning French.",
  "answers": [
   "in",
   "of",
   "from",
   "onto"
  ],
  "why": "관심 분야 앞에는 interested in을 씁니다.",
  "original": "I'm not very interested in learning French.",
  "meaning": "프랑스어 배우는 것은 그다지 관심 없어.",
  "id": "corpus-6743545",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #6743545 (CK) & #8363793 (Eunhee)",
  "label": "동사·형용사와 전치사",
  "slots": []
 },
 {
  "topic": "purpose",
  "stem": "We used the computer in order ____ save time.",
  "answers": [
   "to",
   "of",
   "than",
   "with"
  ],
  "why": "목적을 나타내는 in order to 뒤에는 동사원형이 옵니다.",
  "original": "We used the computer in order to save time.",
  "meaning": "우린 시간을 아끼기 위해서 컴퓨터를 썼어.",
  "id": "corpus-263062",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #263062 (jakov) & #8364889 (Eunhee)",
  "label": "목적의 so that·in order to",
  "slots": []
 },
 {
  "topic": "collocation",
  "stem": "Genes consist ____ a specific sequence of DNA.",
  "answers": [
   "of",
   "for",
   "by",
   "onto"
  ],
  "why": "무엇으로 구성되는지 열거할 때 consist of를 씁니다.",
  "original": "Genes consist of a specific sequence of DNA.",
  "meaning": "유전자는 DNA 특유의 배열로 구성되어 있어.",
  "id": "corpus-681063",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #681063 (Source_VOA) & #8365278 (Eunhee)",
  "label": "동사·형용사와 전치사",
  "slots": []
 },
 {
  "topic": "purpose",
  "stem": "I worked hard in order ____ support my family.",
  "answers": [
   "to",
   "of",
   "than",
   "with"
  ],
  "why": "목적을 나타내는 in order to 뒤에는 동사원형이 옵니다.",
  "original": "I worked hard in order to support my family.",
  "meaning": "나는 가족을 먹여 살리기 위해 열심히 일했다.",
  "id": "corpus-256523",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #256523 (CK) & #11105449 (intertime)",
  "label": "목적의 so that·in order to",
  "slots": []
 },
 {
  "topic": "modifier",
  "stem": "Tom was ____ to buy everything that he needed.",
  "answers": [
   "able",
   "ability",
   "ably",
   "abilities"
  ],
  "why": "be 뒤에는 주어의 상태를 설명하는 형용사가 필요합니다. be able to 다음에 동사원형을 붙여 능력을 나타냅니다.",
  "original": "Tom was able to buy everything that he needed.",
  "meaning": "톰은 그가 필요했던 모든 것을 살 수 있었다.",
  "id": "corpus-7510451",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #7510451 (CK) & #11597089 (cherryband)",
  "label": "형용사와 부사",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "Tom washes his hands more ____ thirty times a day.",
  "answers": [
   "than",
   "as",
   "that",
   "so"
  ],
  "why": "비교급 more 또는 less 뒤에서 비교 대상을 이끄는 말은 than입니다.",
  "original": "Tom washes his hands more than thirty times a day.",
  "meaning": "톰은 하루에 삼십 번 이상 손을 씻어.",
  "id": "corpus-8524945",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #8524945 (CK) & #8533958 (Eunhee)",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "modifier",
  "stem": "I thought I'd be ____ to do what you asked me to do.",
  "answers": [
   "able",
   "ability",
   "ably",
   "abilities"
  ],
  "why": "be 뒤에는 주어의 상태를 설명하는 형용사가 필요합니다. be able to 다음에 동사원형을 붙여 능력을 나타냅니다.",
  "original": "I thought I'd be able to do what you asked me to do.",
  "meaning": "부탁하신 걸 할 수 있을 거라고 생각했어요.",
  "id": "corpus-6231624",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #6231624 (CK) & #13074752 (Uwe)",
  "label": "형용사와 부사",
  "slots": []
 },
 {
  "topic": "modifier",
  "stem": "I want to be ____ to play the violin as well as Tom.",
  "answers": [
   "able",
   "ability",
   "ably",
   "abilities"
  ],
  "why": "be 뒤에는 주어의 상태를 설명하는 형용사가 필요합니다. be able to 다음에 동사원형을 붙여 능력을 나타냅니다.",
  "original": "I want to be able to play the violin as well as Tom.",
  "meaning": "톰처럼 바이올린을 연주할 수 있으면 좋겠어.",
  "id": "corpus-8517254",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #8517254 (CK) & #8533960 (Eunhee)",
  "label": "형용사와 부사",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "There are more ____ six billion people in the world.",
  "answers": [
   "than",
   "as",
   "that",
   "so"
  ],
  "why": "비교급 more 또는 less 뒤에서 비교 대상을 이끄는 말은 than입니다.",
  "original": "There are more than six billion people in the world.",
  "meaning": "지구상의 인구는 60억 이상이야.",
  "id": "corpus-682478",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #682478 (Source_VOA) & #4751821 (kimhkng)",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "modifier",
  "stem": "Working in such conditions was ____ difficult.",
  "answers": [
   "especially",
   "especial",
   "specialty",
   "specialize"
  ],
  "why": "뒤의 형용사가 나타내는 성질의 정도를 꾸미는 자리이므로 부사 especially가 알맞습니다.",
  "original": "Working in such conditions was especially difficult.",
  "meaning": "저런 상태에서 일하는 것은 특히 어려운 일이었다.",
  "id": "corpus-6029328",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #6029328 (Huskion) & #8354000 (Eunhee)",
  "label": "형용사와 부사",
  "slots": []
 },
 {
  "topic": "collocation",
  "stem": "A human body consists ____ a countless number of cells.",
  "answers": [
   "of",
   "for",
   "by",
   "onto"
  ],
  "why": "무엇으로 구성되는지 열거할 때 consist of를 씁니다.",
  "original": "A human body consists of a countless number of cells.",
  "meaning": "인간의 몸은 수많은 세포들로 구성되어 있어.",
  "id": "corpus-270630",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #270630 (CM) & #8361856 (Eunhee)",
  "label": "동사·형용사와 전치사",
  "slots": []
 },
 {
  "topic": "collocation",
  "stem": "The atmosphere mostly consists ____ nitrogen and oxygen.",
  "answers": [
   "of",
   "for",
   "by",
   "onto"
  ],
  "why": "무엇으로 구성되는지 열거할 때 consist of를 씁니다.",
  "original": "The atmosphere mostly consists of nitrogen and oxygen.",
  "meaning": "대기는 대부분 질소와 산소로 구성되어 있어.",
  "id": "corpus-1578594",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #1578594 (CM) & #8365281 (Eunhee)",
  "label": "동사·형용사와 전치사",
  "slots": []
 },
 {
  "topic": "noun",
  "stem": "What's the ____ between religion and philosophy?",
  "answers": [
   "difference",
   "differ",
   "different",
   "differently"
  ],
  "why": "관사나 소유격이 이끄는 명사구의 중심어 자리입니다. 보기 중 명사 difference가 문장에 맞습니다.",
  "original": "What's the difference between religion and philosophy?",
  "meaning": "종교와 철학의 차이점은 무엇입니까?",
  "id": "corpus-2921288",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #2921288 (AlanF_US) & #6829690 (yesjustryan)",
  "label": "명사 자리와 어형",
  "slots": []
 },
 {
  "topic": "modifier",
  "stem": "I thought that I'd be ____ to do what you asked me to do.",
  "answers": [
   "able",
   "ability",
   "ably",
   "abilities"
  ],
  "why": "be 뒤에는 주어의 상태를 설명하는 형용사가 필요합니다. be able to 다음에 동사원형을 붙여 능력을 나타냅니다.",
  "original": "I thought that I'd be able to do what you asked me to do.",
  "meaning": "부탁하신 걸 할 수 있을 거라고 생각했어요.",
  "id": "corpus-7174343",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #7174343 (CK) & #13074752 (Uwe)",
  "label": "형용사와 부사",
  "slots": []
 },
 {
  "topic": "modal-perfect",
  "stem": "I can smell Mary's perfume. She must ____ been here earlier.",
  "answers": [
   "have",
   "had",
   "having",
   "has"
  ],
  "why": "과거 일에 대한 가능성이나 추론을 나타내는 조동사 완료형입니다. 조동사 뒤에는 have + 과거분사를 씁니다.",
  "original": "I can smell Mary's perfume. She must have been here earlier.",
  "meaning": "나는 메리의 향수 냄새를 맡을 수 있다. 그녀는 좀 전에 여기에 있었음에 틀림없다.",
  "id": "corpus-2301338",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #2301338 (CK) & #5526659 (raining211)",
  "label": "조동사 완료형의 추론·유감",
  "slots": []
 },
 {
  "topic": "collocation",
  "stem": "Strictly speaking, Chinese consists ____ hundreds of dialects.",
  "answers": [
   "of",
   "for",
   "by",
   "onto"
  ],
  "why": "무엇으로 구성되는지 열거할 때 consist of를 씁니다.",
  "original": "Strictly speaking, Chinese consists of hundreds of dialects.",
  "meaning": "엄밀히 말하자면, 중국어는 수백 개의 방언들로 구성되어 있어.",
  "id": "corpus-239509",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #239509 (Dejo) & #8365279 (Eunhee)",
  "label": "동사·형용사와 전치사",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "More ____ a third of the world population lives near a coast.",
  "answers": [
   "than",
   "as",
   "that",
   "so"
  ],
  "why": "비교급 more 또는 less 뒤에서 비교 대상을 이끄는 말은 than입니다.",
  "original": "More than a third of the world population lives near a coast.",
  "meaning": "세계 인구의 3분의 1 이상이 해안 근처에 살고 있습니다.",
  "id": "corpus-518301",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #518301 (darinmex) & #12401409 (gratified3539)",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "modifier",
  "stem": "Thanks to his bold decision, he was ____ to ride out the crisis.",
  "answers": [
   "able",
   "ability",
   "ably",
   "abilities"
  ],
  "why": "be 뒤에는 주어의 상태를 설명하는 형용사가 필요합니다. be able to 다음에 동사원형을 붙여 능력을 나타냅니다.",
  "original": "Thanks to his bold decision, he was able to ride out the crisis.",
  "meaning": "그의 대담한 결의 덕분에 위기를 극복할 수 있었다.",
  "id": "corpus-287119",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #287119 (CM) & #13248436 (qiwiwi)",
  "label": "형용사와 부사",
  "slots": []
 },
 {
  "topic": "modifier",
  "stem": "Fortunately I was ____ to finish my work without any serious errors.",
  "answers": [
   "able",
   "ability",
   "ably",
   "abilities"
  ],
  "why": "be 뒤에는 주어의 상태를 설명하는 형용사가 필요합니다. be able to 다음에 동사원형을 붙여 능력을 나타냅니다.",
  "original": "Fortunately I was able to finish my work without any serious errors.",
  "meaning": "운좋게도 나는 어떤 중대한 오류도 없이 일을 끝마칠 수 있었어.",
  "id": "corpus-240775",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #240775 (CM) & #8363491 (Eunhee)",
  "label": "형용사와 부사",
  "slots": []
 },
 {
  "topic": "modifier",
  "stem": "I think it's a shame that some foreign language teachers were ____ to graduate from college without ever having studied with a native speaker.",
  "answers": [
   "able",
   "ability",
   "ably",
   "abilities"
  ],
  "why": "be 뒤에는 주어의 상태를 설명하는 형용사가 필요합니다. be able to 다음에 동사원형을 붙여 능력을 나타냅니다.",
  "original": "I think it's a shame that some foreign language teachers were able to graduate from college without ever having studied with a native speaker.",
  "meaning": "몇몇 외국어 선생님이 한 번도 원어민과 공부해본 적도 없으면서 대학을 나올 수 있었다는 건 창피한 일인 것 같아.",
  "id": "corpus-953635",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #953635 (CK) & #8384140 (Eunhee)",
  "label": "형용사와 부사",
  "slots": []
 },
 {
  "topic": "collocation",
  "stem": "He is in charge ____ the class.",
  "answers": [
   "of",
   "from",
   "by",
   "into"
  ],
  "why": "in charge of는 어떤 일이나 조직을 담당한다는 뜻입니다. 담당 대상 앞에 of를 씁니다.",
  "original": "He is in charge of the class.",
  "meaning": "",
  "id": "corpus-283092",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #283092 (CK)",
  "label": "동사·형용사와 전치사",
  "slots": []
 },
 {
  "topic": "purpose",
  "stem": "I ran in order ____ be on time.",
  "answers": [
   "to",
   "of",
   "than",
   "with"
  ],
  "why": "목적을 나타내는 in order to 뒤에는 동사원형이 옵니다.",
  "original": "I ran in order to be on time.",
  "meaning": "",
  "id": "corpus-1276134",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #1276134 (CK)",
  "label": "목적의 so that·in order to",
  "slots": []
 },
 {
  "topic": "voice",
  "stem": "The work must ____ done by Tom.",
  "answers": [
   "be",
   "being",
   "been",
   "is"
  ],
  "why": "주어가 동작의 대상이므로 조동사 뒤에 수동형 be + 과거분사가 옵니다. 조동사 바로 다음 자리는 원형 be입니다.",
  "original": "The work must be done by Tom.",
  "meaning": "",
  "id": "corpus-47650",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #47650 (CK)",
  "label": "능동태와 수동태",
  "slots": []
 },
 {
  "topic": "purpose",
  "stem": "We need plants in order ____ live.",
  "answers": [
   "to",
   "of",
   "than",
   "with"
  ],
  "why": "목적을 나타내는 in order to 뒤에는 동사원형이 옵니다.",
  "original": "We need plants in order to live.",
  "meaning": "",
  "id": "corpus-247275",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #247275 (CK)",
  "label": "목적의 so that·in order to",
  "slots": []
 },
 {
  "topic": "purpose",
  "stem": "Tom did that in order ____ survive.",
  "answers": [
   "to",
   "of",
   "than",
   "with"
  ],
  "why": "목적을 나타내는 in order to 뒤에는 동사원형이 옵니다.",
  "original": "Tom did that in order to survive.",
  "meaning": "",
  "id": "corpus-6222253",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #6222253 (CK)",
  "label": "목적의 so that·in order to",
  "slots": []
 },
 {
  "topic": "collocation",
  "stem": "Tom is in charge ____ this project.",
  "answers": [
   "of",
   "from",
   "by",
   "into"
  ],
  "why": "in charge of는 어떤 일이나 조직을 담당한다는 뜻입니다. 담당 대상 앞에 of를 씁니다.",
  "original": "Tom is in charge of this project.",
  "meaning": "",
  "id": "corpus-5791309",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #5791309 (CK)",
  "label": "동사·형용사와 전치사",
  "slots": []
 },
 {
  "topic": "collocation",
  "stem": "I guess it depends ____ the weather.",
  "answers": [
   "on",
   "of",
   "into",
   "across"
  ],
  "why": "depend on은 뒤에 나오는 대상에 의존하거나 결과가 그 대상에 달려 있다는 뜻입니다.",
  "original": "I guess it depends on the weather.",
  "meaning": "",
  "id": "corpus-278891",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #278891 (CK)",
  "label": "동사·형용사와 전치사",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "I spend money as soon ____ I get it.",
  "answers": [
   "as",
   "than",
   "that",
   "so"
  ],
  "why": "as soon as는 뒤 절의 일이 일어나자마자 다른 일이 이어짐을 나타냅니다.",
  "original": "I spend money as soon as I get it.",
  "meaning": "",
  "id": "corpus-281910",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #281910 (CK)",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "noun",
  "stem": "Do you have an ____ with him?",
  "answers": [
   "appointment",
   "appoint",
   "appointed",
   "appointing"
  ],
  "why": "관사나 소유격이 이끄는 명사구의 중심어 자리입니다. 보기 중 명사 appointment가 문장에 맞습니다.",
  "original": "Do you have an appointment with him?",
  "meaning": "",
  "id": "corpus-63888",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #63888 (CK)",
  "label": "명사 자리와 어형",
  "slots": []
 },
 {
  "topic": "purpose",
  "stem": "I had to shout in order ____ be heard.",
  "answers": [
   "to",
   "of",
   "than",
   "with"
  ],
  "why": "목적을 나타내는 in order to 뒤에는 동사원형이 옵니다.",
  "original": "I had to shout in order to be heard.",
  "meaning": "",
  "id": "corpus-3732668",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #3732668 (CK)",
  "label": "목적의 so that·in order to",
  "slots": []
 },
 {
  "topic": "voice",
  "stem": "The meeting will ____ held next month.",
  "answers": [
   "be",
   "being",
   "been",
   "is"
  ],
  "why": "주어가 동작의 대상이므로 조동사 뒤에 수동형 be + 과거분사가 옵니다. 조동사 바로 다음 자리는 원형 be입니다.",
  "original": "The meeting will be held next month.",
  "meaning": "",
  "id": "corpus-22476",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #22476 (CK)",
  "label": "능동태와 수동태",
  "slots": []
 },
 {
  "topic": "modal-perfect",
  "stem": "You must ____ been working too hard.",
  "answers": [
   "have",
   "had",
   "having",
   "has"
  ],
  "why": "과거 일에 대한 가능성이나 추론을 나타내는 조동사 완료형입니다. 조동사 뒤에는 have + 과거분사를 씁니다.",
  "original": "You must have been working too hard.",
  "meaning": "",
  "id": "corpus-63345",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #63345 (CK)",
  "label": "조동사 완료형의 추론·유감",
  "slots": []
 },
 {
  "topic": "collocation",
  "stem": "I'm in charge ____ the book department.",
  "answers": [
   "of",
   "from",
   "by",
   "into"
  ],
  "why": "in charge of는 어떤 일이나 조직을 담당한다는 뜻입니다. 담당 대상 앞에 of를 씁니다.",
  "original": "I'm in charge of the book department.",
  "meaning": "",
  "id": "corpus-258593",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #258593 (CK)",
  "label": "동사·형용사와 전치사",
  "slots": []
 },
 {
  "topic": "purpose",
  "stem": "We use words in order ____ communicate.",
  "answers": [
   "to",
   "of",
   "than",
   "with"
  ],
  "why": "목적을 나타내는 in order to 뒤에는 동사원형이 옵니다.",
  "original": "We use words in order to communicate.",
  "meaning": "",
  "id": "corpus-28215",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #28215 (CK)",
  "label": "목적의 so that·in order to",
  "slots": []
 },
 {
  "topic": "noun",
  "stem": "I have an ____ with him at six.",
  "answers": [
   "appointment",
   "appoint",
   "appointed",
   "appointing"
  ],
  "why": "관사나 소유격이 이끄는 명사구의 중심어 자리입니다. 보기 중 명사 appointment가 문장에 맞습니다.",
  "original": "I have an appointment with him at six.",
  "meaning": "",
  "id": "corpus-72436",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #72436 (CK)",
  "label": "명사 자리와 어형",
  "slots": []
 },
 {
  "topic": "noun",
  "stem": "I have an ____ with the doctor.",
  "answers": [
   "appointment",
   "appoint",
   "appointed",
   "appointing"
  ],
  "why": "관사나 소유격이 이끄는 명사구의 중심어 자리입니다. 보기 중 명사 appointment가 문장에 맞습니다.",
  "original": "I have an appointment with the doctor.",
  "meaning": "",
  "id": "corpus-436657",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #436657 (lukaszpp)",
  "label": "명사 자리와 어형",
  "slots": []
 },
 {
  "topic": "noun",
  "stem": "I have an ____ to dine with Tom.",
  "answers": [
   "appointment",
   "appoint",
   "appointed",
   "appointing"
  ],
  "why": "관사나 소유격이 이끄는 명사구의 중심어 자리입니다. 보기 중 명사 appointment가 문장에 맞습니다.",
  "original": "I have an appointment to dine with Tom.",
  "meaning": "",
  "id": "corpus-10550222",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #10550222 (CK)",
  "label": "명사 자리와 어형",
  "slots": []
 },
 {
  "topic": "noun",
  "stem": "I have an ____ with him at noon.",
  "answers": [
   "appointment",
   "appoint",
   "appointed",
   "appointing"
  ],
  "why": "관사나 소유격이 이끄는 명사구의 중심어 자리입니다. 보기 중 명사 appointment가 문장에 맞습니다.",
  "original": "I have an appointment with him at noon.",
  "meaning": "",
  "id": "corpus-277573",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #277573 (CK)",
  "label": "명사 자리와 어형",
  "slots": []
 },
 {
  "topic": "purpose",
  "stem": "I moved nearer in order ____ hear better.",
  "answers": [
   "to",
   "of",
   "than",
   "with"
  ],
  "why": "목적을 나타내는 in order to 뒤에는 동사원형이 옵니다.",
  "original": "I moved nearer in order to hear better.",
  "meaning": "",
  "id": "corpus-255807",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #255807 (CM)",
  "label": "목적의 so that·in order to",
  "slots": []
 },
 {
  "topic": "voice",
  "stem": "Tell me where the meeting will ____ held.",
  "answers": [
   "be",
   "being",
   "been",
   "is"
  ],
  "why": "주어가 동작의 대상이므로 조동사 뒤에 수동형 be + 과거분사가 옵니다. 조동사 바로 다음 자리는 원형 be입니다.",
  "original": "Tell me where the meeting will be held.",
  "meaning": "",
  "id": "corpus-38175",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #38175 (CK)",
  "label": "능동태와 수동태",
  "slots": []
 },
 {
  "topic": "voice",
  "stem": "The work must ____ completed by tomorrow.",
  "answers": [
   "be",
   "being",
   "been",
   "is"
  ],
  "why": "주어가 동작의 대상이므로 조동사 뒤에 수동형 be + 과거분사가 옵니다. 조동사 바로 다음 자리는 원형 be입니다.",
  "original": "The work must be completed by tomorrow.",
  "meaning": "",
  "id": "corpus-374490",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #374490 (CK)",
  "label": "능동태와 수동태",
  "slots": []
 },
 {
  "topic": "purpose",
  "stem": "What should I do in order ____ save time?",
  "answers": [
   "to",
   "of",
   "than",
   "with"
  ],
  "why": "목적을 나타내는 in order to 뒤에는 동사원형이 옵니다.",
  "original": "What should I do in order to save time?",
  "meaning": "",
  "id": "corpus-1416179",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #1416179 (CK)",
  "label": "목적의 so that·in order to",
  "slots": []
 },
 {
  "topic": "voice",
  "stem": "The meeting will ____ held this afternoon.",
  "answers": [
   "be",
   "being",
   "been",
   "is"
  ],
  "why": "주어가 동작의 대상이므로 조동사 뒤에 수동형 be + 과거분사가 옵니다. 조동사 바로 다음 자리는 원형 be입니다.",
  "original": "The meeting will be held this afternoon.",
  "meaning": "",
  "id": "corpus-22490",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #22490 (CK)",
  "label": "능동태와 수동태",
  "slots": []
 },
 {
  "topic": "purpose",
  "stem": "I came early in order ____ get a good seat.",
  "answers": [
   "to",
   "of",
   "than",
   "with"
  ],
  "why": "목적을 나타내는 in order to 뒤에는 동사원형이 옵니다.",
  "original": "I came early in order to get a good seat.",
  "meaning": "",
  "id": "corpus-325852",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #325852 (Zifre)",
  "label": "목적의 so that·in order to",
  "slots": []
 },
 {
  "topic": "purpose",
  "stem": "He studied hard in order ____ pass the test.",
  "answers": [
   "to",
   "of",
   "than",
   "with"
  ],
  "why": "목적을 나타내는 in order to 뒤에는 동사원형이 옵니다.",
  "original": "He studied hard in order to pass the test.",
  "meaning": "",
  "id": "corpus-298254",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #298254 (CK)",
  "label": "목적의 so that·in order to",
  "slots": []
 },
 {
  "topic": "noun",
  "stem": "I have an ____ to meet him at 5:30.",
  "answers": [
   "appointment",
   "appoint",
   "appointed",
   "appointing"
  ],
  "why": "관사나 소유격이 이끄는 명사구의 중심어 자리입니다. 보기 중 명사 appointment가 문장에 맞습니다.",
  "original": "I have an appointment to meet him at 5:30.",
  "meaning": "",
  "id": "corpus-13539225",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #13539225 (CK)",
  "label": "명사 자리와 어형",
  "slots": []
 },
 {
  "topic": "purpose",
  "stem": "I went home in order ____ change my clothes.",
  "answers": [
   "to",
   "of",
   "than",
   "with"
  ],
  "why": "목적을 나타내는 in order to 뒤에는 동사원형이 옵니다.",
  "original": "I went home in order to change my clothes.",
  "meaning": "",
  "id": "corpus-259435",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #259435 (CK)",
  "label": "목적의 so that·in order to",
  "slots": []
 },
 {
  "topic": "noun",
  "stem": "You need an ____ for that hospital.",
  "answers": [
   "appointment",
   "appoint",
   "appointed",
   "appointing"
  ],
  "why": "관사나 소유격이 이끄는 명사구의 중심어 자리입니다. 보기 중 명사 appointment가 문장에 맞습니다.",
  "original": "You need an appointment for that hospital.",
  "meaning": "",
  "id": "corpus-67843",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #67843 (CK)",
  "label": "명사 자리와 어형",
  "slots": []
 },
 {
  "topic": "voice",
  "stem": "The goods will ____ delivered free of charge.",
  "answers": [
   "be",
   "being",
   "been",
   "is"
  ],
  "why": "주어가 동작의 대상이므로 조동사 뒤에 수동형 be + 과거분사가 옵니다. 조동사 바로 다음 자리는 원형 be입니다.",
  "original": "The goods will be delivered free of charge.",
  "meaning": "",
  "id": "corpus-46560",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #46560 (CM)",
  "label": "능동태와 수동태",
  "slots": []
 },
 {
  "topic": "noun",
  "stem": "Could I change my ____ to 10:30 a.m.?",
  "answers": [
   "appointment",
   "appoint",
   "appointed",
   "appointing"
  ],
  "why": "관사나 소유격이 이끄는 명사구의 중심어 자리입니다. 보기 중 명사 appointment가 문장에 맞습니다.",
  "original": "Could I change my appointment to 10:30 a.m.?",
  "meaning": "",
  "id": "corpus-324192",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #324192 (CK)",
  "label": "명사 자리와 어형",
  "slots": []
 },
 {
  "topic": "passive-infinitive",
  "stem": "When is your new book going to ____ published?",
  "answers": [
   "be",
   "been",
   "being",
   "is"
  ],
  "why": "부정사의 주체가 뒤 동작을 받습니다. to와 과거분사 사이에 be가 필요합니다.",
  "original": "When is your new book going to be published?",
  "meaning": "",
  "id": "corpus-12308109",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #12308109 (ddnktr)",
  "label": "수동 부정사·완료 수동 부정사",
  "slots": []
 },
 {
  "topic": "noun",
  "stem": "I have an ____ with my uncle tomorrow.",
  "answers": [
   "appointment",
   "appoint",
   "appointed",
   "appointing"
  ],
  "why": "관사나 소유격이 이끄는 명사구의 중심어 자리입니다. 보기 중 명사 appointment가 문장에 맞습니다.",
  "original": "I have an appointment with my uncle tomorrow.",
  "meaning": "",
  "id": "corpus-323060",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #323060 (belgavox)",
  "label": "명사 자리와 어형",
  "slots": []
 },
 {
  "topic": "noun",
  "stem": "I skipped out on my ____ with my boss.",
  "answers": [
   "appointment",
   "appoint",
   "appointed",
   "appointing"
  ],
  "why": "관사나 소유격이 이끄는 명사구의 중심어 자리입니다. 보기 중 명사 appointment가 문장에 맞습니다.",
  "original": "I skipped out on my appointment with my boss.",
  "meaning": "",
  "id": "corpus-268308",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #268308 (CK)",
  "label": "명사 자리와 어형",
  "slots": []
 },
 {
  "topic": "voice",
  "stem": "Please tell me where the meeting will ____ held.",
  "answers": [
   "be",
   "being",
   "been",
   "is"
  ],
  "why": "주어가 동작의 대상이므로 조동사 뒤에 수동형 be + 과거분사가 옵니다. 조동사 바로 다음 자리는 원형 be입니다.",
  "original": "Please tell me where the meeting will be held.",
  "meaning": "",
  "id": "corpus-12805791",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #12805791 (CK)",
  "label": "능동태와 수동태",
  "slots": []
 },
 {
  "topic": "future-perfect",
  "stem": "I will ____ spent all this money in three months.",
  "answers": [
   "have",
   "has",
   "had",
   "having"
  ],
  "why": "미래의 한 시점까지 끝나거나 이어질 일을 will have + 과거분사로 나타냅니다.",
  "original": "I will have spent all this money in three months.",
  "meaning": "",
  "id": "corpus-72726",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #72726 (CK)",
  "label": "미래완료",
  "slots": []
 },
 {
  "topic": "voice",
  "stem": "Your shipment should ____ delivered within 24 hours.",
  "answers": [
   "be",
   "being",
   "been",
   "is"
  ],
  "why": "주어가 동작의 대상이므로 조동사 뒤에 수동형 be + 과거분사가 옵니다. 조동사 바로 다음 자리는 원형 be입니다.",
  "original": "Your shipment should be delivered within 24 hours.",
  "meaning": "",
  "id": "corpus-10298691",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #10298691 (CK)",
  "label": "능동태와 수동태",
  "slots": []
 },
 {
  "topic": "passive-infinitive",
  "stem": "This problem needs to ____ considered more carefully.",
  "answers": [
   "be",
   "been",
   "being",
   "is"
  ],
  "why": "부정사의 주체가 뒤 동작을 받습니다. to와 과거분사 사이에 be가 필요합니다.",
  "original": "This problem needs to be considered more carefully.",
  "meaning": "",
  "id": "corpus-12870183",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #12870183 (CK)",
  "label": "수동 부정사·완료 수동 부정사",
  "slots": []
 },
 {
  "topic": "modal-perfect",
  "stem": "You should ____ been more careful in money matters.",
  "answers": [
   "have",
   "had",
   "having",
   "has"
  ],
  "why": "과거 일에 대한 가능성이나 추론을 나타내는 조동사 완료형입니다. 조동사 뒤에는 have + 과거분사를 씁니다.",
  "original": "You should have been more careful in money matters.",
  "meaning": "",
  "id": "corpus-69481",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #69481 (CM)",
  "label": "조동사 완료형의 추론·유감",
  "slots": []
 },
 {
  "topic": "conditional",
  "stem": "If I had had more money, I would ____ bought the pen.",
  "answers": [
   "have",
   "has",
   "had",
   "having"
  ],
  "why": "과거에 가능했을 결과를 나타내는 would have + 과거분사 구조입니다. 조동사 would 뒤에는 have의 원형을 씁니다.",
  "original": "If I had had more money, I would have bought the pen.",
  "meaning": "",
  "id": "corpus-31108",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #31108 (CK)",
  "label": "가정법과 조건 표현",
  "slots": []
 },
 {
  "topic": "accustomed",
  "stem": "She is accustomed ____ doing her homework before dinner.",
  "answers": [
   "to",
   "for",
   "than",
   "by"
  ],
  "why": "be accustomed to는 무엇에 익숙하다는 뜻입니다. 이때 to는 전치사라서 뒤에 동명사가 올 수 있습니다.",
  "original": "She is accustomed to doing her homework before dinner.",
  "meaning": "",
  "id": "corpus-317311",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #317311 (CK)",
  "label": "be accustomed to·be used to 뒤의 동명사",
  "slots": []
 },
 {
  "topic": "conditional",
  "stem": "If I had had enough money, I would ____ bought the bag.",
  "answers": [
   "have",
   "has",
   "had",
   "having"
  ],
  "why": "과거에 가능했을 결과를 나타내는 would have + 과거분사 구조입니다. 조동사 would 뒤에는 have의 원형을 씁니다.",
  "original": "If I had had enough money, I would have bought the bag.",
  "meaning": "",
  "id": "corpus-30952",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #30952 (CK)",
  "label": "가정법과 조건 표현",
  "slots": []
 },
 {
  "topic": "voice",
  "stem": "Your shipment should ____ delivered within twenty-four hours.",
  "answers": [
   "be",
   "being",
   "been",
   "is"
  ],
  "why": "주어가 동작의 대상이므로 조동사 뒤에 수동형 be + 과거분사가 옵니다. 조동사 바로 다음 자리는 원형 be입니다.",
  "original": "Your shipment should be delivered within twenty-four hours.",
  "meaning": "",
  "id": "corpus-10298692",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #10298692 (CK)",
  "label": "능동태와 수동태",
  "slots": []
 },
 {
  "topic": "relative",
  "stem": "This book is for students ____ native language is not Japanese.",
  "answers": [
   "whose",
   "whom",
   "who",
   "where"
  ],
  "why": "뒤 명사와 앞 선행사의 소유 관계를 나타내므로 소유격 관계대명사 whose가 맞습니다.",
  "original": "This book is for students whose native language is not Japanese.",
  "meaning": "",
  "id": "corpus-56868",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #56868 (CK)",
  "label": "관계대명사",
  "slots": []
 },
 {
  "topic": "voice",
  "stem": "A working man should ____ paid in proportion to his skill, not his age.",
  "answers": [
   "be",
   "being",
   "been",
   "is"
  ],
  "why": "주어가 동작의 대상이므로 조동사 뒤에 수동형 be + 과거분사가 옵니다. 조동사 바로 다음 자리는 원형 be입니다.",
  "original": "A working man should be paid in proportion to his skill, not his age.",
  "meaning": "",
  "id": "corpus-326347",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #326347 (CM)",
  "label": "능동태와 수동태",
  "slots": []
 },
 {
  "topic": "passive-infinitive",
  "stem": "The new school building is expected to ____ completed by spring next year.",
  "answers": [
   "be",
   "been",
   "being",
   "is"
  ],
  "why": "부정사의 주체가 뒤 동작을 받습니다. to와 과거분사 사이에 be가 필요합니다.",
  "original": "The new school building is expected to be completed by spring next year.",
  "meaning": "",
  "id": "corpus-269284",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #269284 (CK)",
  "label": "수동 부정사·완료 수동 부정사",
  "slots": []
 },
 {
  "topic": "future-perfect",
  "stem": "My sister will ____ been studying English for ten years when she graduates from her college.",
  "answers": [
   "have",
   "has",
   "had",
   "having"
  ],
  "why": "미래의 한 시점까지 끝나거나 이어질 일을 will have + 과거분사로 나타냅니다.",
  "original": "My sister will have been studying English for ten years when she graduates from her college.",
  "meaning": "",
  "id": "corpus-250971",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #250971 (CM)",
  "label": "미래완료",
  "slots": []
 },
 {
  "topic": "future-perfect",
  "stem": "I will ____ finished the work by noon.",
  "answers": [
   "have",
   "has",
   "had",
   "having"
  ],
  "why": "미래의 한 시점까지 끝나거나 이어질 일을 will have + 과거분사로 나타냅니다.",
  "original": "I will have finished the work by noon.",
  "meaning": "",
  "id": "corpus-47623",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #47623 (CK)",
  "label": "미래완료",
  "slots": []
 },
 {
  "topic": "passive-infinitive",
  "stem": "I'd like to ____ considered for the job.",
  "answers": [
   "be",
   "been",
   "being",
   "is"
  ],
  "why": "부정사의 주체가 뒤 동작을 받습니다. to와 과거분사 사이에 be가 필요합니다.",
  "original": "I'd like to be considered for the job.",
  "meaning": "",
  "id": "corpus-1936530",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #1936530 (CK)",
  "label": "수동 부정사·완료 수동 부정사",
  "slots": []
 },
 {
  "topic": "accustomed",
  "stem": "Tom isn't accustomed ____ working at night.",
  "answers": [
   "to",
   "for",
   "than",
   "by"
  ],
  "why": "be accustomed to는 무엇에 익숙하다는 뜻입니다. 이때 to는 전치사라서 뒤에 동명사가 올 수 있습니다.",
  "original": "Tom isn't accustomed to working at night.",
  "meaning": "",
  "id": "corpus-5660745",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #5660745 (CK)",
  "label": "be accustomed to·be used to 뒤의 동명사",
  "slots": []
 },
 {
  "topic": "future-perfect",
  "stem": "I will ____ finished the work by next week.",
  "answers": [
   "have",
   "has",
   "had",
   "having"
  ],
  "why": "미래의 한 시점까지 끝나거나 이어질 일을 will have + 과거분사로 나타냅니다.",
  "original": "I will have finished the work by next week.",
  "meaning": "",
  "id": "corpus-262143",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #262143 (CK)",
  "label": "미래완료",
  "slots": []
 },
 {
  "topic": "future-perfect",
  "stem": "I will ____ finished the work before you return.",
  "answers": [
   "have",
   "has",
   "had",
   "having"
  ],
  "why": "미래의 한 시점까지 끝나거나 이어질 일을 will have + 과거분사로 나타냅니다.",
  "original": "I will have finished the work before you return.",
  "meaning": "",
  "id": "corpus-17892",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #17892 (CK)",
  "label": "미래완료",
  "slots": []
 },
 {
  "topic": "conditional",
  "stem": "I would ____ bought that car if I'd had the money.",
  "answers": [
   "have",
   "has",
   "had",
   "having"
  ],
  "why": "과거에 가능했을 결과를 나타내는 would have + 과거분사 구조입니다. 조동사 would 뒤에는 have의 원형을 씁니다.",
  "original": "I would have bought that car if I'd had the money.",
  "meaning": "",
  "id": "corpus-2520055",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #2520055 (CK)",
  "label": "가정법과 조건 표현",
  "slots": []
 },
 {
  "topic": "future-perfect",
  "stem": "I will ____ finished the work by seven this evening.",
  "answers": [
   "have",
   "has",
   "had",
   "having"
  ],
  "why": "미래의 한 시점까지 끝나거나 이어질 일을 will have + 과거분사로 나타냅니다.",
  "original": "I will have finished the work by seven this evening.",
  "meaning": "",
  "id": "corpus-243316",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #243316 (CK)",
  "label": "미래완료",
  "slots": []
 },
 {
  "topic": "future-perfect",
  "stem": "The meeting will ____ finished by the time we get there.",
  "answers": [
   "have",
   "has",
   "had",
   "having"
  ],
  "why": "미래의 한 시점까지 끝나거나 이어질 일을 will have + 과거분사로 나타냅니다.",
  "original": "The meeting will have finished by the time we get there.",
  "meaning": "",
  "id": "corpus-247188",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #247188 (CK)",
  "label": "미래완료",
  "slots": []
 },
 {
  "topic": "modal-perfect",
  "stem": "I entered the museum through the wrong gate. I should ____ been more careful.",
  "answers": [
   "have",
   "had",
   "having",
   "has"
  ],
  "why": "과거 일에 대한 가능성이나 추론을 나타내는 조동사 완료형입니다. 조동사 뒤에는 have + 과거분사를 씁니다.",
  "original": "I entered the museum through the wrong gate. I should have been more careful.",
  "meaning": "",
  "id": "corpus-259914",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #259914 (CK)",
  "label": "조동사 완료형의 추론·유감",
  "slots": []
 },
 {
  "topic": "substitution",
  "stem": "The population of London is much greater than ____ of any other British city.",
  "answers": [
   "that",
   "what",
   "whose",
   "whom"
  ],
  "why": "비교 대상인 명사를 되풀이하지 않기 위해 that of를 씁니다. that은 앞의 단수·불가산 명사를 대신합니다.",
  "original": "The population of London is much greater than that of any other British city.",
  "meaning": "",
  "id": "corpus-29283",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #29283 (CK)",
  "label": "비교에서 반복 명사를 대신하는 that·those",
  "slots": []
 },
 {
  "topic": "whether",
  "stem": "Our whole case hinges on ____ the government's actions were constitutional or not.",
  "answers": [
   "whether",
   "if",
   "unless",
   "despite"
  ],
  "why": "전치사 뒤에서 어떤 일이 성립하는지를 나타내는 명사절은 whether로 이끕니다.",
  "original": "Our whole case hinges on whether the government's actions were constitutional or not.",
  "meaning": "",
  "id": "corpus-629395",
  "genre": "work",
  "credit": "CC-BY 2.0 (France) Attribution: tatoeba.org #629395 (darinmex)",
  "label": "whether와 선택 명사절",
  "slots": []
 },
 {
  "topic": "collocation",
  "stem": "Synthetic energy carriers can connect renewable-energy-rich potential production regions with distant demand centers, but the emergence of trade depends ____ total supply costs.",
  "answers": [
   "on",
   "of",
   "into",
   "across"
  ],
  "why": "depend on은 뒤에 나오는 대상에 의존하거나 결과가 그 대상에 달려 있다는 뜻입니다.",
  "original": "Synthetic energy carriers can connect renewable-energy-rich potential production regions with distant demand centers, but the emergence of trade depends on total supply costs.",
  "meaning": "",
  "id": "web-5a9ff91ce43b54ce518f7c9c",
  "genre": "research",
  "credit": "Langenmayr U, Schuler J, Slednev V, Fichtner W. · Mapping Future Energy Journeys Through Modeling the Global Transport of Synthetic Energy Carriers. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13743743",
  "label": "동사·형용사와 전치사",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "While equilibrium Grotthuss diffusion has ____ widely studied, its response under strong electric fields remains difficult to resolve because simulations must capture both chemical reactivity and induced polarization over long time scales.",
  "answers": [
   "been",
   "be",
   "being",
   "is"
  ],
  "why": "완료형의 조동사 have, has, had 뒤에는 과거분사가 옵니다. be의 과거분사형은 been입니다.",
  "original": "While equilibrium Grotthuss diffusion has been widely studied, its response under strong electric fields remains difficult to resolve because simulations must capture both chemical reactivity and induced polarization over long time scales.",
  "meaning": "",
  "id": "web-8ef7e730ff5580ebe685754c",
  "genre": "research",
  "credit": "van Hees A, Zhang ZY, Andersson L, Zhang C. · Field-Driven Proton Transport in Water Revealed by Machine Learning Molecular Dynamics. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13720274",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "collocation",
  "stem": "We also demonstrate that the diffusion of mode-selective temperature, quantified via the variance of the H-O-H bond angle or O-H bond length, depends ____ the cavity frequency, which we rationalize using an analytical model.",
  "answers": [
   "on",
   "of",
   "into",
   "across"
  ],
  "why": "depend on은 뒤에 나오는 대상에 의존하거나 결과가 그 대상에 달려 있다는 뜻입니다.",
  "original": "We also demonstrate that the diffusion of mode-selective temperature, quantified via the variance of the H-O-H bond angle or O-H bond length, depends on the cavity frequency, which we rationalize using an analytical model.",
  "meaning": "",
  "id": "web-58ca844cc7104bd741cd282e",
  "genre": "research",
  "credit": "Wickramasinghe S, Fowler M, Groenhof G, Mandal A. · Mode-Selective and Anharmonicity-Dependent Energy Transport in Cavity-Coupled Water. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13693502",
  "label": "동사·형용사와 전치사",
  "slots": []
 },
 {
  "topic": "collocation",
  "stem": "Ionic conductivity and diffusivity depend ____ complex, coupled interactions between polymer structure, chemistry, and ion dynamics.",
  "answers": [
   "on",
   "of",
   "into",
   "across"
  ],
  "why": "depend on은 뒤에 나오는 대상에 의존하거나 결과가 그 대상에 달려 있다는 뜻입니다.",
  "original": "Ionic conductivity and diffusivity depend on complex, coupled interactions between polymer structure, chemistry, and ion dynamics.",
  "meaning": "",
  "id": "web-23f182d91243ae4e0862ffea",
  "genre": "research",
  "credit": "Ganesh S, Paupst T, Nath P, Lele AD. · Machine Learning Prediction of Transport Properties in Amorphous Polymer Electrolytes Using Chemically Informed Structural Descriptors. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13737027",
  "label": "동사·형용사와 전치사",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "Yet grapevine biodiversity has never ____ systematically explored at the metabolome scale, despite its importance for chemotaxonomy, breeding, and sustainable viticulture.",
  "answers": [
   "been",
   "be",
   "being",
   "is"
  ],
  "why": "완료형의 조동사 have, has, had 뒤에는 과거분사가 옵니다. be의 과거분사형은 been입니다.",
  "original": "Yet grapevine biodiversity has never been systematically explored at the metabolome scale, despite its importance for chemotaxonomy, breeding, and sustainable viticulture.",
  "meaning": "",
  "id": "web-31c41312ea876eb3ba357553",
  "genre": "research",
  "credit": "Arapitsas P, Franceschi P, Garcia-Aloy M, Vrhovsek U, Narduzzi L, Masuero D, Stefanini M, Bettinelli P, Grando MS, Emanuelli F, Wehrens R, Theodoridis G, Mattivi F. · A Metabolome Atlas of Grape Biodiversity. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13573557",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "Deployment risk is governed by latent geometry and local representational support rather ____ domain labels alone.",
  "answers": [
   "than",
   "as",
   "so",
   "that"
  ],
  "why": "rather than은 두 가지 선택이나 행동을 비교할 때 씁니다.",
  "original": "Deployment risk is governed by latent geometry and local representational support rather than domain labels alone.",
  "meaning": "",
  "id": "web-70c6aa73d52c4c9bd95b0100",
  "genre": "research",
  "credit": "Enninful HRNB, Khan MA. · Reliable machine learning deployment across domains in electrochemical energy storage materials. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13503088",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "Markerless tumor tracking (MTT) using single-energy (SE) kilovoltage (kV) imaging has ____ proposed as a technique for lung tumor motion management.",
  "answers": [
   "been",
   "be",
   "being",
   "is"
  ],
  "why": "완료형의 조동사 have, has, had 뒤에는 과거분사가 옵니다. be의 과거분사형은 been입니다.",
  "original": "Markerless tumor tracking (MTT) using single-energy (SE) kilovoltage (kV) imaging has been proposed as a technique for lung tumor motion management.",
  "meaning": "",
  "id": "web-2bce2c2c069e5716d20a2be9",
  "genre": "research",
  "credit": "Nguyen H, Luce J, Zhu L, Lehmann M, Kang H, Harkenrider MM, Roeske JC. · Evaluation of the reliability of markerless tumor tracking with single-energy and dual-energy imaging using machine learning. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13239570",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "The distribution of diversity in function of climate has ____ largely studied in plants and animals, leading to a large body of literature on macroecological rules applied to large geographic scales.",
  "answers": [
   "been",
   "be",
   "being",
   "is"
  ],
  "why": "완료형의 조동사 have, has, had 뒤에는 과거분사가 옵니다. be의 과거분사형은 been입니다.",
  "original": "The distribution of diversity in function of climate has been largely studied in plants and animals, leading to a large body of literature on macroecological rules applied to large geographic scales.",
  "meaning": "",
  "id": "web-1caa381bfae37c8f79b55e8d",
  "genre": "research",
  "credit": "ElKhouri-Vidarte N, Useros F, Lara E. · Beneath the Cedars: Exploring the Water-Energy Balance on Arcellinida Biodiversity in Lebanon's Cedar Forests. · Europe PMC · CC BY · https://europepmc.org/articles/PMC12812088",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "modifier",
  "stem": "Ultimately, this data-driven approach provides a ____ accurate and efficient alternative to traditional measurements, offering profound practical significance for the rapid in silico screening and targeted formulation design of energetic materials.",
  "answers": [
   "highly",
   "high",
   "height",
   "heighten"
  ],
  "why": "뒤의 형용사가 나타내는 성질의 정도를 꾸미는 자리이므로 부사 highly가 알맞습니다.",
  "original": "Ultimately, this data-driven approach provides a highly accurate and efficient alternative to traditional measurements, offering profound practical significance for the rapid in silico screening and targeted formulation design of energetic materials.",
  "meaning": "",
  "id": "web-ab9b63518af448354de7809e",
  "genre": "research",
  "credit": "Deng M, Hassan R, Baghban A. · Machine learning innovations for reliable gurney energy estimation in energetic materials. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13378357",
  "label": "형용사와 부사",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "This review therefore focuses on the conversion of theoretical energy into practically deliverable full-cell energy rather ____ providing a broad survey of all high-energy lithium-metal battery chemistries.",
  "answers": [
   "than",
   "as",
   "so",
   "that"
  ],
  "why": "rather than은 두 가지 선택이나 행동을 비교할 때 씁니다.",
  "original": "This review therefore focuses on the conversion of theoretical energy into practically deliverable full-cell energy rather than providing a broad survey of all high-energy lithium-metal battery chemistries.",
  "meaning": "",
  "id": "web-a1f1145ae08afb0b81474854",
  "genre": "research",
  "credit": "Liu X, Yin B, Wang G, Wu H, Ren X. · From theoretical energy to practical utilization: interfacial stability, transport kinetics, and cell-level design in high-energy lithium-metal batteries. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13314845",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "Overall, knowledge gaps are influenced by variables related to sites' accessibility rather ____ ecological appeal across both metrics.",
  "answers": [
   "than",
   "as",
   "so",
   "that"
  ],
  "why": "rather than은 두 가지 선택이나 행동을 비교할 때 씁니다.",
  "original": "Overall, knowledge gaps are influenced by variables related to sites' accessibility rather than ecological appeal across both metrics.",
  "meaning": "",
  "id": "web-1db9db71277856a8e2e32665",
  "genre": "research",
  "credit": "Guery A, Alard D. · Identifying knowledge gaps in a biodiversity database and their spatial determinants. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13712723",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "voice",
  "stem": "It is demonstrated that the methodology can ____ used to compensate for image reconstruction artifacts caused by the stochastic noise.",
  "answers": [
   "be",
   "being",
   "been",
   "is"
  ],
  "why": "주어가 동작의 대상이므로 조동사 뒤에 수동형 be + 과거분사가 옵니다. 조동사 바로 다음 자리는 원형 be입니다.",
  "original": "It is demonstrated that the methodology can be used to compensate for image reconstruction artifacts caused by the stochastic noise.",
  "meaning": "",
  "id": "web-1219bf97254342a53befc5af",
  "genre": "research",
  "credit": "Kangasniemi J, Mozumder M, Hauptmann A, Tarvainen T. · Machine-learning-enhanced image reconstruction in optical tomography using the Monte Carlo method for light transport. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13533593",
  "label": "능동태와 수동태",
  "slots": []
 },
 {
  "topic": "noun",
  "stem": "Spiking Neural Networks (SNNs) provide a promising alternative for energy-efficient inference, but their ____ to CVGL still faces two challenges that remain insufficiently addressed.",
  "answers": [
   "application",
   "apply",
   "applicable",
   "applicably"
  ],
  "why": "관사나 소유격이 이끄는 명사구의 중심어 자리입니다. 보기 중 명사 application가 문장에 맞습니다.",
  "original": "Spiking Neural Networks (SNNs) provide a promising alternative for energy-efficient inference, but their application to CVGL still faces two challenges that remain insufficiently addressed.",
  "meaning": "",
  "id": "web-0b0a0003c3d4c9cc1fe3633f",
  "genre": "research",
  "credit": "Wang X, Su Y, Fan Y, Zhang W, Li M. · Directional Spike Feature Learning with Progressive Reweighting for Energy-Efficient Cross-View Geo-Localization. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13568223",
  "label": "명사 자리와 어형",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "Depending on the primary objective-such as maximizing carbon sequestration or protecting threatened species-and within the boundaries of budget limitations, different spatial priorities have ____ identified at global and regional scales.",
  "answers": [
   "been",
   "be",
   "being",
   "is"
  ],
  "why": "완료형의 조동사 have, has, had 뒤에는 과거분사가 옵니다. be의 과거분사형은 been입니다.",
  "original": "Depending on the primary objective-such as maximizing carbon sequestration or protecting threatened species-and within the boundaries of budget limitations, different spatial priorities have been identified at global and regional scales.",
  "meaning": "",
  "id": "web-2eec9917bb007badbf9836ee",
  "genre": "research",
  "credit": "Silvestro D, Goria S, Rau EP, de Lima RAF, Groom B, Jacobsson P, Sterner T, Antonelli A. · Using Artificial Intelligence to Optimize Ecological Restoration for Climate and Biodiversity. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13747821",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "collocation",
  "stem": "Biodiversity responses may depend ____ the impact trajectory of a given community; thus, not controlling for these differences could produce a misleading mixture of trends even if all communities degraded or recovered.",
  "answers": [
   "on",
   "of",
   "into",
   "across"
  ],
  "why": "depend on은 뒤에 나오는 대상에 의존하거나 결과가 그 대상에 달려 있다는 뜻입니다.",
  "original": "Biodiversity responses may depend on the impact trajectory of a given community; thus, not controlling for these differences could produce a misleading mixture of trends even if all communities degraded or recovered.",
  "meaning": "",
  "id": "web-8b037dd998bf23b54e2f546a",
  "genre": "research",
  "credit": "Sinclair JS, Cortés-Guzmán D, Aroviita J, Baker NJ, Barešová L, Bradley C, Cañedo-Argüelles M, Cunillera-Montcusí D, Feeley HB, Ferréol M, Floury M, Forio MAE, Goethals P, González-Ferreras AM, Huttunen KL, Karaouzas I, Larrañaga A, Moe SJ, Moulinec A, Osadčaja D, Pařil P, Peredo Arce A, Polášek M, Straka M, Vannevel R, Wilkes M, Haase P. · Broad-scale evaluations of biodiversity change need reference comparisons. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13715692",
  "label": "동사·형용사와 전치사",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "DNA mismatch repair deficiency in CRC, evidenced by the presence of microsatellite instability (MSI), has ____ consistently associated with a favorable prognosis, and may be related to certain aspects of the microbiome.",
  "answers": [
   "been",
   "be",
   "being",
   "is"
  ],
  "why": "완료형의 조동사 have, has, had 뒤에는 과거분사가 옵니다. be의 과거분사형은 been입니다.",
  "original": "DNA mismatch repair deficiency in CRC, evidenced by the presence of microsatellite instability (MSI), has been consistently associated with a favorable prognosis, and may be related to certain aspects of the microbiome.",
  "meaning": "",
  "id": "web-5c153b8904cdae7b1f5ae74d",
  "genre": "research",
  "credit": "Mendall C, Hullar MAJ, Curtis KR, Hill CM, Thomas CE, Ma N, Randolph TW, Malen RC, Reedy AM, LaBrie S, Potter JD, Ogino S, Newcomb PA, Phipps AI. · Tumor microbial biodiversity and microsatellite instability in colorectal cancer. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13614546",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "noun",
  "stem": "The ____ of an alternating current to the materials revealed conductivity consistent with the thermally activated hopping mechanism and the correlated barrier hopping model.",
  "answers": [
   "application",
   "apply",
   "applicable",
   "applicably"
  ],
  "why": "관사나 소유격이 이끄는 명사구의 중심어 자리입니다. 보기 중 명사 application가 문장에 맞습니다.",
  "original": "The application of an alternating current to the materials revealed conductivity consistent with the thermally activated hopping mechanism and the correlated barrier hopping model.",
  "meaning": "",
  "id": "web-a63cd5d8ea9ec2e4660d8bc7",
  "genre": "research",
  "credit": "Kadian N, Salih M, Kumari R, Korpal S, Dalal J, Ibrahim ABM. · Dielectric polarization and charge transport in Gd-doped Fe<sub>3</sub>O<sub>4</sub> nanocrystals for energy storage and electronic devices. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13618065",
  "label": "명사 자리와 어형",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "Population sizes of globally non-threatened species were more ____ double those of globally threatened species.",
  "answers": [
   "than",
   "as",
   "that",
   "so"
  ],
  "why": "비교급 more 또는 less 뒤에서 비교 대상을 이끄는 말은 than입니다.",
  "original": "Population sizes of globally non-threatened species were more than double those of globally threatened species.",
  "meaning": "",
  "id": "web-6d782f0f3d6de6b37156f0ac",
  "genre": "research",
  "credit": "Lennon JJ, Pernetta AP, White RL, Crooks N. · Taking stock: Can captive species contribute to biodiversity conservation? · Europe PMC · CC BY · https://europepmc.org/articles/PMC13489450",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "Field-effect transistors based on TOPSe-treated 1L-WSe 2 exhibited more ____ a two-fold increase in current and mobility, in conjunction with a transition from p-type to n-type conduction.",
  "answers": [
   "than",
   "as",
   "that",
   "so"
  ],
  "why": "비교급 more 또는 less 뒤에서 비교 대상을 이끄는 말은 than입니다.",
  "original": "Field-effect transistors based on TOPSe-treated 1L-WSe 2 exhibited more than a two-fold increase in current and mobility, in conjunction with a transition from p-type to n-type conduction.",
  "meaning": "",
  "id": "web-7fc0b6ebb3f7cc9a8c9f1e67",
  "genre": "research",
  "credit": "Park DY, Kim T, Kim B, Park N, Bang S, Lee D, Choi D, Kim DH, Yoo J, Lee SM, Yu YJ, Jo J, Song J, Ko H, Won YS, Jeong T, Yun SJ, Kim KK, Kim DW, Sung J, Jeong MS. · Flattening Energy Puddles for Enhanced Charge Transport in Wrinkled WSe<sub>2</sub>. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13181510",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "The rapid development of wearable health tools has ____ it possible to continuously monitor physiological conditions for preventive care.",
  "answers": [
   "made",
   "make",
   "making",
   "makes"
  ],
  "why": "have, has 또는 had 다음에는 과거분사를 써서 완료형을 만듭니다.",
  "original": "The rapid development of wearable health tools has made it possible to continuously monitor physiological conditions for preventive care.",
  "meaning": "",
  "id": "web-3fb2d4c1a76a7e0cb3a9f87b",
  "genre": "research",
  "credit": "S R, Khekare G, Kumar Y, Soni G. · Quantifying energy and accuracy trade-offs of federated learning on wearable health devices. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13220697",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "link",
  "stem": "Warming changed the composition of plant communities, particularly through species turnover rather ____ in the nestedness component, suggesting that warming leads to novel species assemblages.",
  "answers": [
   "than",
   "as",
   "so",
   "that"
  ],
  "why": "rather than은 두 가지 선택이나 행동을 비교할 때 씁니다.",
  "original": "Warming changed the composition of plant communities, particularly through species turnover rather than in the nestedness component, suggesting that warming leads to novel species assemblages.",
  "meaning": "",
  "id": "web-382c2ce380140603c111f28b",
  "genre": "research",
  "credit": "Korell L, Andrzejak M, Chase JM, Harpole WS, Knight TM. · Synthesis of scale-dependent plant biodiversity change in climate warming experiments. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13597150",
  "label": "접속사와 전치사",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "A total of 44 actinomycete-derived natural products, comprising both structurally elucidated and putatively identified compounds, have ____ reported in previous studies.",
  "answers": [
   "been",
   "be",
   "being",
   "is"
  ],
  "why": "완료형의 조동사 have, has, had 뒤에는 과거분사가 옵니다. be의 과거분사형은 been입니다.",
  "original": "A total of 44 actinomycete-derived natural products, comprising both structurally elucidated and putatively identified compounds, have been reported in previous studies.",
  "meaning": "",
  "id": "web-db05adb51777fde2e3797b54",
  "genre": "research",
  "credit": "Karissa E, Purwaningtyas WE, Akinniyi GA, Kim H, Yang I. · Biodiversity and Natural Product Potential of Indonesian Actinomycetes. · Europe PMC · CC BY · https://europepmc.org/articles/PMC13442426",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "modal-perfect",
  "stem": "As such, these types of deposits are prime targets for understanding Mars’ hydrological history, as several of these environments could ____ been capable of supporting life.",
  "answers": [
   "have",
   "had",
   "having",
   "has"
  ],
  "why": "과거 일에 대한 가능성이나 추론을 나타내는 조동사 완료형입니다. 조동사 뒤에는 have + 과거분사를 씁니다.",
  "original": "As such, these types of deposits are prime targets for understanding Mars’ hydrological history, as several of these environments could have been capable of supporting life.",
  "meaning": "",
  "id": "web-d80580daee6236bae7f49aa8",
  "genre": "news",
  "credit": "NASA · Perseverance Update: The Ghostly Rocks of ‘Idubi’ — Bright Remnants of Aqueous Systems from Long Ago · https://science.nasa.gov/blog/perseverance-update-the-ghostly-rocks-of-idubi-bright-remnants-of-aqueous-systems-from-long-ago/",
  "label": "조동사 완료형의 추론·유감",
  "slots": []
 },
 {
  "topic": "tense",
  "stem": "Mirandy has grown up with NASA as a constant presence, and his path to becoming a civil servant at NASA’s Stennis Space Center near Bay St. Louis, Mississippi, has ____ decades in the making.",
  "answers": [
   "been",
   "be",
   "being",
   "is"
  ],
  "why": "완료형의 조동사 have, has, had 뒤에는 과거분사가 옵니다. be의 과거분사형은 been입니다.",
  "original": "Mirandy has grown up with NASA as a constant presence, and his path to becoming a civil servant at NASA’s Stennis Space Center near Bay St. Louis, Mississippi, has been decades in the making.",
  "meaning": "",
  "id": "web-5e47d829610a40a727b3e5bf",
  "genre": "news",
  "credit": "NASA · LaToya Dean · Contractor to Civil Servant: NASA Welcomes Jim Mirandy · https://www.nasa.gov/centers-and-facilities/stennis/contractor-to-civil-servant-jim-mirandy/",
  "label": "시제와 시간 표현",
  "slots": []
 },
 {
  "topic": "collocation",
  "stem": "In 1988, the glaciers covered about 4.31 square kilometers (1.66 square miles), according ____ Donaldi Permana, a climate scientist at the Indonesian Agency for Meteorology, Climatology, and Geophysics (BMKG).",
  "answers": [
   "to",
   "by",
   "of",
   "for"
  ],
  "why": "어떤 정보나 기준에 따른다는 표현은 according to입니다.",
  "original": "In 1988, the glaciers covered about 4.31 square kilometers (1.66 square miles), according to Donaldi Permana, a climate scientist at the Indonesian Agency for Meteorology, Climatology, and Geophysics (BMKG).",
  "meaning": "",
  "id": "web-8254ca5d970889438a093376",
  "genre": "news",
  "credit": "NASA · The Last Ice on Puncak Jaya · https://science.nasa.gov/earth/earth-observatory/the-last-ice-on-puncak-jaya/",
  "label": "동사·형용사와 전치사",
  "slots": []
 }
];
