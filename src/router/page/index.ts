import { RouteRecordRaw } from 'vue-router'
const pages: Array<RouteRecordRaw> = [
    {
        path: '/404',
        name: '404',
        component: () => import( '@/components/error-page/404.vue'),
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false
        }
    },
    {
        path: '/',
        name: '首页',
        redirect: '/home/index'
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    }
]
export default pages