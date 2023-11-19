import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import App from "@/App.vue";
import router from "@/router";
import "@/assets/index.css";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

app.component("QuillEditor", QuillEditor);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.mount("#app");
