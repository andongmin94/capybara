import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: "/", name: "home", component: () => import("@/views/HomeView.vue") },
    { path: "/article", name: "article", component: () => import("@/views/articles/ArticleView.vue") },
    { path: "/article/:id", name: "articleDetail", component: () => import("@/views/articles/DetailView.vue") },
    { path: "/create", name: "create", component: () => import("@/views/articles/CreateView.vue") },
    { path: "/exchange", name: "exchange", component: () => import("@/views/etc/ExchangeView.vue") },
    { path: "/interest", name: "interest", component: () => import("@/views/finances/InterestView.vue") },
    { path: "/interestDetail/:id", name: "interestDetail", component: () => import("@/views/finances/InterestDetailView.vue") },
    { path: "/cart", name: "cart", component: () => import("@/views/finances/CartView.vue") },
    { path: "/map", name: "map", component: () => import("@/views/etc/MapView.vue") },
    { path: "/algorithm", name: "algorithm", component: () => import("@/views/algorithm/AlgorithmView.vue") },
    { path: "/algorithmresult", name: "algorithmresult", component: () => import("@/views/algorithm/AlgorithmResultView.vue") },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/accounts/DemoAccountView.vue"),
      props: { section: "signup" },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/accounts/DemoAccountView.vue"),
      props: { section: "login" },
    },
    {
      path: "/profile/:search_username",
      name: "profile",
      component: () => import("@/views/accounts/DemoAccountView.vue"),
      props: { section: "profile" },
    },
    {
      path: "/findpassword",
      name: "findpassword",
      component: () => import("@/views/accounts/DemoAccountView.vue"),
      props: { section: "findpassword" },
    },
    {
      path: "/modify",
      name: "modify",
      component: () => import("@/views/accounts/DemoAccountView.vue"),
      props: { section: "modify" },
    },
    {
      path: "/changepassword",
      name: "changepassword",
      component: () => import("@/views/accounts/DemoAccountView.vue"),
      props: { section: "changepassword" },
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: () => import("@/views/etc/NotFoundView.vue") },
  ],
});

const routeTitles: Record<string, string> = {
  home: "예금상품 탐색과 비교",
  article: "이야기",
  articleDetail: "이야기 상세",
  create: "새 이야기",
  exchange: "환율 계산",
  interest: "예금 상품 탐색",
  interestDetail: "예금 상품 상세",
  cart: "찜한 상품 비교",
  map: "은행 지점 찾기",
  algorithm: "조건으로 상품 찾기",
  algorithmresult: "조건 탐색 결과",
  signup: "회원가입",
  login: "로그인",
  profile: "내 계정",
  findpassword: "비밀번호 찾기",
  modify: "프로필 수정",
  changepassword: "비밀번호 변경",
  NotFound: "페이지를 찾을 수 없음",
};

router.afterEach((to) => {
  const title = routeTitles[String(to.name)] ?? "예금상품 탐색과 비교";
  document.title = `${title} · 카피바라`;
});

export default router;
