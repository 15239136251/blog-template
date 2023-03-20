// 路由
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import pageRouter from './page/index'
import viewsRouter from './views/index'

const routes: Array<RouteRecordRaw> = [  
    ...pageRouter,
    ...viewsRouter
]
const router = createRouter({  
    history: createWebHistory(),  
    routes
})
export default router