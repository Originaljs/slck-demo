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
];
const routers = createRouter({
  history: createWebHashHistory(),
  routes,
});
routers.beforeEach((to, from, next) => {
  next();
});
export default routers;
