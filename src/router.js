import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  mode: "history",
  routes: [
    {
      name: "app",
      path: "/",
      component: () => import("@/view/Application")
    },
    {
      name: "orders",
      path: "/orders",
      component: () => import("@/view/Orders")
    }
  ]
});
