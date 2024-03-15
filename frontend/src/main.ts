import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/router";
import "@/assets/index.css";

/**
 * 전역 상태와 라우터를 등록한 뒤 카피바라의 루트 컴포넌트를 마운트한다.
 * 실제 데이터 공급자 선택은 API 경계에서 처리하므로 진입점은 실행 모드를 알지 않는다.
 */
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
