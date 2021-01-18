import Vue from "vue";

import "./utils/polyfills";
import "./tailwind/index.css";
import "./assets/demos.css";

import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
