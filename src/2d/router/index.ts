import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("@/2d/components/views/homePage.vue"),
  },
  {
    path: "/first",
    component: () => import("@/2d/components/views/FirstPage.vue"),
  },
  {
    path: "/second",
    component: () => import("@/2d/components/views/SecondPage.vue"),
  },
  {
    path: "/thirdly",
    component: () => import("@/2d/components/views/SwitchLine.vue"),
  },
];
const routers = createRouter({
  history: createWebHashHistory(),
  routes,
});
routers.beforeEach((to, from, next) => {
  next();
});
export default routers;
