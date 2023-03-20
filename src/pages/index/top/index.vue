<template>
    <div class="h-full bg-white relative flex w-full">
        <div class="top-container bg-white">
            <!-- Logo -->
            <div class="logo">
                <router-link to="/home/index">
                    <img src="/img/logo.png" alt="">
                </router-link>
            </div>
            <div class="input bg-white">
                <el-select v-model="articleSelect" @change="handleChange" placeholder="请输入文章名" filterable remote
                    reserve-keyword :remote-method="remoteMethod" :loading="loading">
                    <el-option v-for="article in options" :label="article.title" :value="article.id"
                        :key="article.id"></el-option>
                </el-select>
            </div>
            <el-menu :default-active="activeIndex" class="menu" mode="horizontal" @select="handleSelect">
                <el-menu-item :index="nav.id" v-for="nav in navs" :key="nav.id">{{ nav.name }}</el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNavsStore } from '@/store/navs'
import { useHomeStore } from '@/store/home'
import { Article } from '@/store/home';
import { toRefs, ref, Ref } from 'vue'
import REQ from '@/api/request';
import router from '@/router';
const navsStore = useNavsStore()
const { navs } = toRefs(navsStore)
const { getNavList } = navsStore

const homeStore = useHomeStore()
const { getArticleList } = homeStore

const options: Ref<Article[]> = ref([])
const articleSelect = ref('')
const loading = ref(false)
const activeIndex = ref(-1)

const remoteMethod = (query: string) => {
    if (query) {
        loading.value = true
        REQ({
            url: '/blog-article/list?title=' + query,
            method: 'GET',
            baseURL: ''
        }).then((res: any) => {
            options.value = res
            loading.value = false
        }).finally(() => {
            loading.value = false
        })
    } else {
        options.value = []
    }
}
const handleChange = (e: any) => {
    console.log("🚀 ~ file: index.vue:28 ~ handleChange ~ e:", e)
}
const handleSelect = (e: any) => {
    console.log("🚀 ~ file: index.vue:26 ~ handleSelect ~ e:", e)
    let params = {}
    if (e === -1) {
        params = {}
        router.push('/home/index')
    } else {
        params = { tabId: e }
    }
    getArticleList(params)
}

getNavList()
</script>

<style scoped lang="scss">
.top-container {
    width: 1200px;
    margin: 0 auto;
    display: flex;

    .logo {
        width: 270px;
        height: 100%;
    }

    .input {
        width: 200px;
        line-height: 60px;
        height: 100%;
    }

    .menu {
        width: 730px;
    }
}

@media screen and (max-width: 1470px) {
    // .logo {
    //     display: none;
    // }
}
</style>