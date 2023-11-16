import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CommunityView from "@/views/CommunityView.vue";
import ExchangeView from "@/views/ExchangeView.vue";
import InterestView from "@/views/InterestView.vue";
import MapView from "@/views/MapView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/community",
      name: "community",
      component: CommunityView,
    },
    {
      path: "/exchange",
      name: "exchange",
      component: ExchangeView,
    },
    {
      path: "/interest",
      name: "interest",
      component: InterestView,
    },
    {
      path: "/map",
      name: "map",
      component: MapView,
    },
  ],
});

export default router;
