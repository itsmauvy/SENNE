const PRODUCTS = [
  {
    id: "hair-mist",
    name: "헤어 미스트",
    subtitle: "Hair Perfume Mist · Light & Floral",
    category: "hair",
    price: 28000,
    volume: "30ml / 1.01 fl.oz",
    images: [
      "assets/hair mist png.png",
      "assets/hair mist left.jpg",
    ],
    description:
      "가볍게 뿌리는 헤어 퍼퓸 미스트. 모발 위에 부드럽게 정착해 움직일 때마다 은은하게 퍼지는 잔향을 남깁니다. 알코올 프리 포뮬라로 두피와 모발에 자극 없이 사용할 수 있습니다.",
    details: [
      { label: "향 노트", value: "탑 — 화이트 뮤스크 · 미들 — 로즈, 재스민 · 베이스 — 샌달우드" },
      { label: "용량", value: "30ml / 1.01 fl.oz" },
      { label: "주요 성분", value: "알코올 프리, 식물성 글리세린, 히알루론산" },
      { label: "사용법", value: "모발 전체 또는 두피에서 15cm 이상 거리를 두고 뿌려주세요." },
    ],
  },
  {
    id: "hair-oil",
    name: "헤어 오일",
    subtitle: "Hair Oil · Argan & Camellia",
    category: "hair",
    price: 32000,
    volume: "50ml / 1.7 fl.oz",
    images: [
      "assets/hair oil png.png",
      "assets/hair oil left.jpg",
      "assets/hair oil img.jpg",
    ],
    description:
      "아르간 오일과 동백 오일을 주성분으로, 모발에 윤기와 결을 되돌려주는 데일리 헤어 오일. 가볍고 산뜻하게 흡수되어 끈적임 없이 마무리됩니다.",
    details: [
      { label: "향 노트", value: "클린 우디, 카멜리아 플로럴" },
      { label: "용량", value: "50ml / 1.7 fl.oz" },
      { label: "주요 성분", value: "아르간 오일, 동백 오일, 비타민 E" },
      { label: "사용법", value: "손바닥에 1-2펌프 덜어 모발 중간부터 끝에 고루 발라주세요." },
    ],
  },
  {
    id: "hair-mask",
    name: "리페어 헤어 마스크",
    subtitle: "Repair Hair Mask · Intensive Care",
    category: "hair",
    price: 38000,
    volume: "200ml / 6.7 fl.oz",
    images: [
      "assets/senne hair mask png.png",
      "assets/senne hair mask card hover.jpg",
    ],
    description:
      "물기를 머금은 모발에 깊은 영양과 차분한 윤기를 남기는 집중 케어 마스크. 손상된 모발 구조를 안에서부터 채워 부드럽고 탄탄한 결로 마무리합니다.",
    details: [
      { label: "향 노트", value: "미들 — 재스민, 로즈 · 베이스 — 앰버, 머스크" },
      { label: "용량", value: "200ml / 6.7 fl.oz" },
      { label: "주요 성분", value: "케라틴 프로틴, 판테놀, 히알루론산, 아르간 오일" },
      { label: "사용법", value: "샴푸 후 물기를 제거하고 모발 전체에 적당량 바른 후 3-5분 후 헹궈주세요." },
    ],
  },
  {
    id: "body-wash",
    name: "센느 바디 워시",
    subtitle: "Body Wash · Daily Cleanser",
    category: "body",
    price: 34000,
    volume: "250ml / 8.4 fl.oz",
    images: [
      "assets/senne body wash png.png",
    ],
    description:
      "부드러운 거품과 잔잔한 향으로 하루의 긴장을 씻어내는 데일리 바디 클렌저. 피부 자극을 최소화한 저자극 계면활성제를 사용하여 세정 후에도 촉촉함이 남습니다.",
    details: [
      { label: "향 노트", value: "탑 — 그린 시트러스 · 미들 — 화이트 머스크 · 베이스 — 샌달우드" },
      { label: "용량", value: "250ml / 8.4 fl.oz" },
      { label: "주요 성분", value: "코코베타인, 글리세린, 알로에 베라" },
      { label: "사용법", value: "적당량을 손 또는 샤워볼에 덜어 거품을 낸 후 세정하세요." },
    ],
  },
  {
    id: "body-lotion",
    name: "센느 바디 로션",
    subtitle: "Body Lotion · Musk & Moisture",
    category: "body",
    price: 36000,
    volume: "200ml / 6.7 fl.oz",
    volumes: [
      { label: "50ml", price: 18000 },
      { label: "300ml", price: 52000 },
    ],
    images: [
      "assets/body lotion png.png",
      "assets/body-lotion.jpg",
    ],
    description:
      "산뜻하게 스며드는 보습감과 은은한 머스크 노트로 마무리하는 바디 로션. 가벼운 텍스처로 금방 흡수되어 끈적임 없이 온종일 촉촉함을 유지합니다.",
    details: [
      { label: "향 노트", value: "탑 — 베르가못 · 미들 — 화이트 머스크 · 베이스 — 카시미어 우드" },
      { label: "용량", value: "200ml / 6.7 fl.oz" },
      { label: "주요 성분", value: "시어버터, 히알루론산, 나이아신아마이드" },
      { label: "사용법", value: "샤워 후 물기가 약간 남은 상태에서 전신에 골고루 발라주세요." },
    ],
  },
  {
    id: "hand-cream-white-tea",
    name: "핸드 크림 화이트 티",
    subtitle: "Hand Cream · White Tea",
    category: "hand-cream",
    price: 26000,
    volume: "50ml / 1.7 fl.oz",
    images: [
      "assets/hand cream white tea png.png",
      "assets/hand cream white tea img.jpg",
      "assets/hand cream card hover.jpg",
    ],
    description:
      "건조한 손끝에 산뜻하게 스며드는 보습감과 맑은 화이트 티 노트. 끈적이지 않는 가벼운 텍스처로 언제 어디서나 편리하게 사용할 수 있습니다.",
    details: [
      { label: "향 노트", value: "탑 — 그린 티 · 미들 — 화이트 머스크, 재스민 · 베이스 — 시더우드" },
      { label: "용량", value: "50ml / 1.7 fl.oz" },
      { label: "주요 성분", value: "시어버터, 글리세린, 그린 티 추출물" },
      { label: "사용법", value: "손에 적당량을 덜어 손등과 손가락 사이까지 골고루 발라주세요." },
    ],
  },
  {
    id: "hand-cream-bergamot",
    name: "핸드 크림 베르가못",
    subtitle: "Hand Cream · Bergamot",
    category: "hand-cream",
    price: 26000,
    volume: "50ml / 1.7 fl.oz",
    images: [
      "assets/hand cream bergamot png.png",
      "assets/hand cream bergamot img.jpg",
      "assets/hand cream card hover.jpg",
    ],
    description:
      "상쾌한 시트러스로 시작해 머스크로 가라앉는 산뜻한 베르가못 핸드 크림. 맑고 가벼운 향이 기분을 환기시켜 줍니다.",
    details: [
      { label: "향 노트", value: "탑 — 베르가못 · 미들 — 네롤리 · 베이스 — 앰버 머스크" },
      { label: "용량", value: "50ml / 1.7 fl.oz" },
      { label: "주요 성분", value: "시어버터, 글리세린, 베르가못 오일" },
      { label: "사용법", value: "손에 적당량을 덜어 손등과 손가락 사이까지 골고루 발라주세요." },
    ],
  },
  {
    id: "hand-cream-sandalwood",
    name: "핸드 크림 샌달우드",
    subtitle: "Hand Cream · Sandalwood",
    category: "hand-cream",
    price: 26000,
    volume: "50ml / 1.7 fl.oz",
    images: [
      "assets/hand cream sandalwood.png",
      "assets/hand cream sandalwood img.jpg",
    ],
    description:
      "따뜻한 샌달우드가 오래 머무는, 차분한 무드의 핸드 크림. 깊이 있는 우디 향이 마음을 안정시켜 줍니다.",
    details: [
      { label: "향 노트", value: "탑 — 스파이시 우드 · 미들 — 샌달우드 · 베이스 — 바닐라 앰버" },
      { label: "용량", value: "50ml / 1.7 fl.oz" },
      { label: "주요 성분", value: "시어버터, 글리세린, 샌달우드 오일" },
      { label: "사용법", value: "손에 적당량을 덜어 손등과 손가락 사이까지 골고루 발라주세요." },
    ],
  },
  {
    id: "scented-candle",
    name: "센티드 캔들",
    subtitle: "Scented Candle · Sandalwood & White Tea",
    category: "home",
    price: 42000,
    volume: "200g / 7.0 oz · 약 40시간",
    images: [
      "assets/scented candle png.png",
      "assets/scented candle left.jpg",
    ],
    description:
      "샌달우드 & 화이트 티. 공간을 천천히 데우는 따뜻한 향의 캔들. 대두 왁스와 코튼 심지를 사용해 그을음 없이 깨끗하게 연소합니다.",
    details: [
      { label: "향 노트", value: "탑 — 그린 티 · 미들 — 재스민 · 베이스 — 샌달우드, 앰버" },
      { label: "용량", value: "200g / 7.0 oz" },
      { label: "연소 시간", value: "약 40시간" },
      { label: "사용법", value: "처음 사용 시 2시간 이상 태워 왁스 풀을 형성하세요. 심지는 항상 5mm로 다듬어 사용하세요." },
    ],
  },
  {
    id: "reed-diffuser",
    name: "리드 디퓨저",
    subtitle: "Reed Diffuser · Ambient Fragrance",
    category: "home",
    price: 38000,
    volume: "100ml · 약 2-3개월",
    images: [
      "assets/diffuser png.png",
      "assets/diffuser.jpg",
    ],
    description:
      "은은하게 퍼지는 잔향으로 공간의 결을 잡아주는 리드 디퓨저. 합성 착색료와 합성 보존제를 사용하지 않은 클린 포뮬라로 만들었습니다.",
    details: [
      { label: "향 노트", value: "탑 — 그레이프프루트 · 미들 — 화이트 머스크 · 베이스 — 시더우드" },
      { label: "용량", value: "100ml" },
      { label: "지속 시간", value: "약 2-3개월 (리드 스틱 8개 포함)" },
      { label: "사용법", value: "리드 스틱을 병에 꽂아 세워두세요. 향이 약해지면 스틱을 뒤집어 주세요." },
    ],
  },
  {
    id: "room-mist",
    name: "룸 미스트",
    subtitle: "Room Mist · Linen & Calm",
    category: "home",
    price: 30000,
    volume: "100ml / 3.4 fl.oz",
    images: [
      "assets/room mist png.png",
      "assets/room-mist.jpg",
    ],
    description:
      "침구와 커튼 위로 가볍게, 잠들기 전 공간을 정돈하는 룸 미스트. 은은한 린넨 향이 긴장을 풀고 편안한 수면 환경을 만들어줍니다.",
    details: [
      { label: "향 노트", value: "탑 — 라벤더 · 미들 — 린넨 머스크 · 베이스 — 화이트 우드" },
      { label: "용량", value: "100ml / 3.4 fl.oz" },
      { label: "주요 성분", value: "알코올, 정제수, 향료 (IFRA 인증)" },
      { label: "사용법", value: "침구, 커튼, 공간에 20-30cm 거리를 두고 뿌려주세요." },
    ],
  },
];
