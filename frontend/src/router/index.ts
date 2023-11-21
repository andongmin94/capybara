import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ArticleView from "@/views/ArticleView.vue";

import DetailView from "@/views/DetailView.vue";
import CreateView from "@/views/CreateView.vue";
import ExchangeView from "@/views/ExchangeView.vue";
import InterestView from "@/views/InterestView.vue";
import InterestDetailView from "@/views/InterestDetailView.vue";
import CartView from "@/views/CartView.vue";
import MapView from "@/views/MapView.vue";
import SignUpView from "@/views/SignUpView.vue";
import LogInView from "@/views/LogInView.vue";
import ProfileView from "@/views/ProfileView.vue";
import FindPasswordView from "@/views/FindPasswordView.vue";
import ModifyView from "@/views/ModifyView.vue";
import changePasswordView from "@/views/changePasswordView.vue";
import AlgorithmView from "@/views/AlgorithmView.vue";
import AlgorithmResultView from "@/views/AlgorithmResultView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 메인페이지
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // 커뮤니티
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
