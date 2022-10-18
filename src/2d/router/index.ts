import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('@/2d/components/views/homePage.vue')
    }
]
const routers = createRouter({
    history: createWebHashHistory(),
    routes,
})
routers.beforeEach((to, from, next) => {
    next()
})
export default routers
