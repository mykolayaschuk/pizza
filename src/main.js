import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VeeValidate from "vee-validate";
import { ValidationProvider } from "vee-validate";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VeeValidate, { fieldsBagName: "veeFields" });

Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
