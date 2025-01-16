import "./assets/reset.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/theme/common.scss";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import locale from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus, { locale });
app.mount("#app");
