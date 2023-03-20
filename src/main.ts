import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

/* 引入ElementPlus组件 */
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'element-plus/theme-chalk/display.css'
/* 引入ElementPlus/icons-vue */
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
/* 引入iconfont */
import "./assets/fontsize/iconfont.css"
/* 引入接口调用 */
import REQ from './api/request'
/* 引入pinia */
import * as Pinia from 'pinia'
/* 引入路由 */
import router from '@/router/index'
/* 引入 markdown.css */
import './markdown.css'
/* 
    引入自定义的mockXHR
    因为mockXHR不是默认导出的：export default{}
    所以引入时需要加大括号，这种可以引入多个
*/
// import { mockXHR } from '@/mock'
/* 判断开发环境 */
// if (import.meta.env.VITE_USER_NODE_ENV === 'mock') {
//     mockXHR()
// }

const app = createApp(App)
const pinia = Pinia.createPinia()

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus).use(pinia).use(router).provide('REQ', REQ).mount('#app')