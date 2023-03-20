<!--
 * @Author: qu.hb@sungeon.com qu.hb@sungeon.com
 * @Date: 2023-03-05 16:48:24
 * @LastEditors: qu.hb@sungeon.com qu.hb@sungeon.com
 * @LastEditTime: 2023-03-13 13:31:59
 * @FilePath: \my-vue3-blog\src\pages\index\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="flex flex-col w-screen h-screen">
        <!-- 顶部导航栏 -->
        <div class="w-screen h-16">
            <top></top>
        </div>
        <!-- 内容区域 -->
        <div class="overflow-y-auto" style="height: calc(100% - 1.25rem);">
            <keep-alive>
                <router-view class="" v-if="$route.meta.keepAlive" />
            </keep-alive>
            <router-view class="" v-if="!$route.meta.keepAlive" />
        </div>
        <!-- 底部信息栏 -->
        <div class="w-screen h-10 text-xs">
            <div class="h-5 bg-none">
                <input type="text" class="h-5 ml-1 px-1 bg-none text-white" style="background-color: transparent; border: 0;" v-model="navInputVal" @keydown="navEnter">
            </div>
            <div class="h-5 bg-gray-300 flex items-center justify-center">
                <a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2023002542号-1</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import REQ from '@/api/request';
import router from '@/router';
import { useNavsStore } from '@/store/navs'
import { ElMessage } from 'element-plus';
import { toRefs, ref } from 'vue'
import top from './top/index.vue'
const navsStore = useNavsStore()
const { navs } = toRefs(navsStore)
console.log("🚀 ~ file: index.vue:31 ~ navs:", navs.value)

const navInputVal = ref('')
const articleId = ref(-1)
const navEnter = (e: any) => {
    if (e.keyCode === 13) {
        console.log('回车', navInputVal.value)
        /* 判断是路由地址还是文章标题 */
        if (navInputVal.value[0] === '/') {
            router.push(navInputVal.value)
        } else {
            REQ({
                url: '/blog-article/list?title=' + navInputVal.value,
                method: 'GET',
                baseURL: ''
            }).then((res: any) => {
                /* 跳转到第一个的详情里面 */
                if (res[0]) {
                    articleId.value = res[0].id || -1
                    router.replace(`/article/${articleId.value}`)
                } else {
                    ElMessage.error('没有当前文章：' + navInputVal.value)
                }
            }).finally(() => {
                navInputVal.value = ''
    
            })
        }
    }
}
</script>

<style scoped lang="scss"></style>