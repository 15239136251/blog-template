import { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/pages/index/index.vue')
const views: Array<RouteRecordRaw> = [
    {
        path: '/home',
        component: Layout,
        redirect: "/home/index",
        meta: {keepAlive: true},
        children: [
            {
                path: "index",
                name: "首页",
                meta: {keepAlive: true},
                component: () =>
                    import("@/views/home/index.vue")
            }
        ]
    },
    {
        path: '/article',
        component: Layout,
        meta: {keepAlive: true},
        children: [
            {
                path: ":id",
                name: "文章详情",
                meta: {keepAlive: false},
                component: () =>
                    import("@/views/article/index.vue")
            }
        ]
    }
]
export default views