import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ArticleView from "@/views/articles/ArticleView.vue";
import DetailView from "@/views/articles/DetailView.vue";
import CreateView from "@/views/articles/CreateView.vue";
import ExchangeView from "@/views/etc/ExchangeView.vue";
import InterestView from "@/views/finances/InterestView.vue";
import InterestDetailView from "@/views/finances/InterestDetailView.vue";
import CartView from "@/views/finances/CartView.vue";
import MapView from "@/views/etc/MapView.vue";
import SignUpView from "@/views/accounts/SignUpView.vue";
import LogInView from "@/views/accounts/LogInView.vue";
import ProfileView from "@/views/accounts/ProfileView.vue";
import FindPasswordView from "@/views/accounts/FindPasswordView.vue";
import ModifyView from "@/views/accounts/ModifyView.vue";
import changePasswordView from "@/views/accounts/ChangePasswordView.vue";
import AlgorithmView from "@/views/algorithm/AlgorithmView.vue";
import AlgorithmResultView from "@/views/algorithm/AlgorithmResultView.vue";
import NotFoundView from "@/views/etc/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 메인페이지
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // 게시글
    {
      path: "/article",
      name: "article",
      component: ArticleView,
    },
    {
      path: "/article/:id",
      name: "articleDetail",
      component: DetailView,
    },
    {
      path: "/create",
      name: "create",
      component: CreateView,
    },
    // 환율
    {
      path: "/exchange",
      name: "exchange",
      component: ExchangeView,
    },
    // 금리 비교
    {
      path: "/interest",
      name: "interest",
      component: InterestView,
    },
    {
      path: "/interestDetail/:id",
      name: "interestDetail",
      component: InterestDetailView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    // 지도
    {
      path: "/map",
      name: "map",
      component: MapView,
    },
    // 회원기능
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },
    {
      path: "/login",
      name: "login",
      component: LogInView,
    },
    {
      path: "/profile/:search_username",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/findpassword",
      name: "findpassword",
      component: FindPasswordView,
    },
    {
      path: "/modify",
      name: "modify",
      component: ModifyView,
    },
    {
      path: "/changepassword",
      name: "changepassword",
      component: changePasswordView,
    },
    // 알고리즘
    {
      path: "/algorithm",
      name: "algorithm",
      component: AlgorithmView,
    },
    {
      path: "/algorithmresult",
      name: "algorithmresult",
      component: AlgorithmResultView,
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
  ],
});

export default router;
