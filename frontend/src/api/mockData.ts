import type {
  Article,
  BankBranch,
  Comment,
  CurrencyQuote,
  DemoUser,
  DepositOption,
  DepositProduct,
  PublicUser,
} from "./types";

export const demoPublicUser: PublicUser = {
  id: 101,
  username: "calm_capybara",
  nickname: "느긋한카피",
};

export const demoUser: DemoUser = {
  ...demoPublicUser,
  email: "capy@example.test",
};

export const publicDemoUsers: PublicUser[] = [
  demoPublicUser,
  {
    id: 102,
    username: "wave_otter",
    nickname: "물결수달",
  },
  {
    id: 103,
    username: "sunny_quokka",
    nickname: "햇살쿼카",
  },
];

export const mockProducts: DepositProduct[] = [
  {
    id: 1,
    dcls_month: "202311",
    fin_prdt_cd: "CAPY-REST-12",
    kor_co_nm: "카피은행",
    fin_prdt_nm: "느긋한 첫 예금",
    etc_note: "처음 목돈을 맡기는 사용자가 기간과 금리를 한눈에 비교하도록 구성한 예금입니다.",
    join_deny: 1,
    join_member: "만 19세 이상 개인",
    join_way: "모바일·영업점",
    spcl_cnd: "모바일 알림 동의 시 우대금리 적용",
  },
  {
    id: 2,
    dcls_month: "202311",
    fin_prdt_cd: "SLOW-STEP-24",
    kor_co_nm: "느긋저축은행",
    fin_prdt_nm: "한걸음 정기예금",
    etc_note: "중기 저축 목표에 맞춰 12개월과 24개월 옵션을 제공하는 가상 상품입니다.",
    join_deny: 1,
    join_member: "개인 및 개인사업자",
    join_way: "모바일",
    spcl_cnd: "첫 거래 및 자동이체 등록 시 우대",
  },
  {
    id: 3,
    dcls_month: "202311",
    fin_prdt_cd: "SUN-PICNIC-06",
    kor_co_nm: "햇살은행",
    fin_prdt_nm: "햇살 피크닉 예금",
    etc_note: "짧은 기간 동안 자금을 운용하는 흐름을 확인할 수 있는 단기형 가상 상품입니다.",
    join_deny: 1,
    join_member: "실명의 개인",
    join_way: "모바일·인터넷",
    spcl_cnd: "종이 통장 미발행 시 우대",
  },
  {
    id: 4,
    dcls_month: "202311",
    fin_prdt_cd: "WAVE-PLUS-36",
    kor_co_nm: "물결은행",
    fin_prdt_nm: "잔잔한 물결 예금",
    etc_note: "장기 저축 목표와 최고 우대금리 비교를 체험하기 위한 가상 상품입니다.",
    join_deny: 1,
    join_member: "만 18세 이상 개인",
    join_way: "영업점·인터넷",
    spcl_cnd: "급여이체 및 장기 거래 시 우대",
  },
  {
    id: 5,
    dcls_month: "202311",
    fin_prdt_cd: "CAPY-FLEX-06",
    kor_co_nm: "카피은행",
    fin_prdt_nm: "가벼운 쉼표 예금",
    etc_note: "6개월 옵션과 간단한 비대면 가입 흐름을 살펴보는 가상 상품입니다.",
    join_deny: 1,
    join_member: "실명의 개인",
    join_way: "모바일",
    spcl_cnd: "비대면 신규 가입 시 우대",
  },
  {
    id: 6,
    dcls_month: "202311",
    fin_prdt_cd: "SLOW-TOGETHER-12",
    kor_co_nm: "느긋저축은행",
    fin_prdt_nm: "천천히 함께 예금",
    etc_note: "기본금리와 우대금리의 차이를 비교하기 쉽게 만든 12개월 가상 상품입니다.",
    join_deny: 1,
    join_member: "개인",
    join_way: "영업점",
    spcl_cnd: "예금 상담 완료 시 우대",
  },
  {
    id: 7,
    dcls_month: "202311",
    fin_prdt_cd: "SUN-GROW-24",
    kor_co_nm: "햇살은행",
    fin_prdt_nm: "차곡차곡 성장 예금",
    etc_note: "목표 기간을 24개월로 설정한 사용자를 위한 탐색 흐름을 보여주는 가상 상품입니다.",
    join_deny: 1,
    join_member: "개인 및 임의단체",
    join_way: "모바일·영업점",
    spcl_cnd: "오픈뱅킹 등록 시 우대",
  },
  {
    id: 8,
    dcls_month: "202311",
    fin_prdt_cd: "WAVE-DAILY-12",
    kor_co_nm: "물결은행",
    fin_prdt_nm: "매일의 여유 예금",
    etc_note: "온라인 가입 편의성을 우선해 결과를 정렬할 때 확인할 수 있는 가상 상품입니다.",
    join_deny: 1,
    join_member: "개인",
    join_way: "모바일·인터넷",
    spcl_cnd: "앱 로그인 및 마케팅 미동의 유지 시에도 기본금리 제공",
  },
];

const optionSeed: Array<[number, number, number]> = [
  [6, 2.2, 2.5],
  [12, 2.7, 3.1],
  [24, 2.9, 3.4],
  [36, 3.0, 3.6],
];

export const mockOptions: DepositOption[] = mockProducts.flatMap((product, productIndex) => {
  const availableTerms = productIndex % 3 === 0 ? optionSeed : optionSeed.slice(0, 3);
  return availableTerms.map(([term, baseRate, bonusRate], optionIndex) => ({
    id: product.id * 10 + optionIndex + 1,
    dcls_month: product.dcls_month,
    product: product.id,
    fin_prdt_cd: product.fin_prdt_cd,
    intr_rate_type_nm: "단리",
    intr_rate: Number((baseRate + (productIndex % 4) * 0.08).toFixed(2)),
    intr_rate2: Number((bonusRate + (productIndex % 3) * 0.1).toFixed(2)),
    save_trm: term,
  }));
});

export const initialArticles: Article[] = [
  {
    id: 1,
    user: publicDemoUsers[1],
    title: "12개월과 24개월, 어떻게 비교하고 있나요?",
    content: "기간을 먼저 정한 뒤 같은 조건의 기본금리와 우대금리를 나란히 살펴보니 비교가 한결 쉬웠어요.",
    image: null,
    created_at: "2023-11-23T09:30:00+09:00",
    updated_at: "2023-11-23T09:30:00+09:00",
    like_users: [101, 103],
  },
  {
    id: 2,
    user: publicDemoUsers[2],
    title: "비대면 가입 가능한 상품만 모아봤어요",
    content: "상품 탐색에서 온라인 가입을 선택하면 해당 조건과 가까운 상품부터 볼 수 있네요. 실제 가입 전에는 각 금융회사 안내를 꼭 확인해야 해요.",
    image: null,
    created_at: "2023-11-22T15:10:00+09:00",
    updated_at: "2023-11-22T16:00:00+09:00",
    like_users: [102],
  },
  {
    id: 3,
    user: demoPublicUser,
    title: "찜 목록은 새로고침해도 남아 있어요",
    content: "관심 있는 기간 옵션을 찜해 두면 상품끼리 다시 비교하기 편합니다. 이 데모에서는 브라우저에만 저장돼요.",
    image: null,
    created_at: "2023-11-21T11:20:00+09:00",
    updated_at: "2023-11-21T11:20:00+09:00",
    like_users: [102, 103],
  },
];

export const initialComments: Comment[] = [
  {
    id: 1,
    user: demoPublicUser,
    article: 1,
    parent_comment: null,
    content: "저도 기간 필터를 먼저 적용해 봤어요. 후보가 줄어서 보기 좋았습니다.",
    created_at: "2023-11-23T10:12:00+09:00",
    updated_at: "2023-11-23T10:12:00+09:00",
    like_users: [],
  },
  {
    id: 2,
    user: publicDemoUsers[2],
    article: 1,
    parent_comment: null,
    content: "가입 방식도 함께 확인하면 선택 기준이 더 분명해져요.",
    created_at: "2023-11-23T10:44:00+09:00",
    updated_at: "2023-11-23T10:44:00+09:00",
    like_users: [101],
  },
];

export const mockQuotes: CurrencyQuote[] = [
  { code: "KRW", name: "대한민국 원", wonPerUnit: 1, unit: 1 },
  { code: "USD", name: "미국 달러", wonPerUnit: 1300, unit: 1 },
  { code: "JPY", name: "일본 엔", wonPerUnit: 900, unit: 100 },
  { code: "EUR", name: "유로", wonPerUnit: 1400, unit: 1 },
  { code: "CNY", name: "중국 위안", wonPerUnit: 180, unit: 1 },
];

export const mockBranches: BankBranch[] = [
  { id: 1, bank: "카피은행", province: "서울특별시", city: "물결구", name: "카피은행 느린강점", address: "서울특별시 물결구 느린강로 12", hours: "09:00–16:00", x: 28, y: 35 },
  { id: 2, bank: "느긋저축은행", province: "서울특별시", city: "나루구", name: "느긋저축은행 나루점", address: "서울특별시 나루구 쉼표길 24", hours: "09:30–15:30", x: 57, y: 50 },
  { id: 3, bank: "햇살은행", province: "부산광역시", city: "파도구", name: "햇살은행 파도점", address: "부산광역시 파도구 햇살로 7", hours: "09:00–16:00", x: 72, y: 67 },
  { id: 4, bank: "물결은행", province: "대전광역시", city: "온천구", name: "물결은행 온천점", address: "대전광역시 온천구 포근길 31", hours: "09:00–16:00", x: 43, y: 76 },
  { id: 5, bank: "카피은행", province: "부산광역시", city: "파도구", name: "카피은행 조약돌점", address: "부산광역시 파도구 조약돌로 19", hours: "10:00–17:00", x: 78, y: 30 },
  { id: 6, bank: "햇살은행", province: "서울특별시", city: "물결구", name: "햇살은행 산책점", address: "서울특별시 물결구 산책로 3", hours: "09:00–16:00", x: 36, y: 58 },
];
