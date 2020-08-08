import Vue from "vue";
import App from "./App.vue";
import "./assets/index.css";
import Element from "element-ui";
import axios from "axios";

// UI Elements library
import locale from "element-ui/lib/locale/lang/en";

//Navigation router
import { router } from "./router/router";

Vue.config.productionTip = false;

const http = axios.create({ baseURL: "https://perot-backend.herokuapp.com/" });

Vue.prototype.$http = http;
Vue.use(Element, { locale });
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
