import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ArticleView from "@/views/ArticleView.vue";
import DetailView from "@/views/DetailView.vue";
import CreateView from "@/views/CreateView.vue";
import ExchangeView from "@/views/ExchangeView.vue";
import InterestView from "@/views/InterestView.vue";
import InterestDetailView from "@/views/InterestDetailView.vue";
import MapView from "@/views/MapView.vue";
import SignUpView from "@/views/SignUpView.vue";
import LogInView from "@/views/LogInView.vue";

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
      name: "DetailView",
      component: DetailView,
    },
    {
      path: "/create",
      name: "CreateView",
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
    // 지도
    {
      path: "/map",
      name: "map",
      component: MapView,
    },
    // 회원기능
    {
      path: "/signup",
      name: "SignUpView",
      component: SignUpView,
    },
    {
      path: "/login",
      name: "LogInView",
      component: LogInView,
    },
  ],
});

export default router;
