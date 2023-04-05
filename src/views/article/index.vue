<template>
    <div class="container">
        <div class="article-left">
            <el-card>
                <div class="pb-2 border border-solid border-gray-400 border-t-0 border-x-0">
                    <h1 class="text-center text-2xl font-bold">{{ detail.title }}</h1>
                    <div class="flex items-center justify-between mt-2">
                        <div>
                            <span class="text-gray-400">分类：</span>
                            <span class="font-bold">{{ detail.tabName }}</span>
                        </div>
                        <div>
                            <span class="text-gray-400">发布时间：</span>
                            <span class="font-bold">{{ detail.creationdate }}</span>
                        </div>
                        <div>
                            <span class="text-gray-400">浏览数：</span>
                            <span class="font-bold">{{ detail.viewCount }}</span>
                        </div>
                    </div>
                </div>
                <!-- 简介 -->
                <div class="mt-3">
                    <div class="w-full" v-if="detail.image">
                        <img class="w-full" :src="detail.image" alt="">
                    </div>
                    <div class="mt-3" v-html="detail.articleIntroduce"></div>
                </div>
                <!-- 内容 -->
                <div class="mt-3 markdown-body" v-html="detail.articleContent"></div>
            </el-card>
        </div>
        <div class="article-right">
            <el-card>
                <!-- 头像 -->
                <div class="avatar">
                    <img src="/img/avatar.jpg" alt="">
                </div>
                <div class="mt-1">
                    <p class="text-blue-300">屈海斌</p>
                    <p class="text-sm mt-1">一名前端程序员</p>
                </div>
                <!-- 标签化信息 -->
                <div>
                    <el-tag class="tag mt-1" :type="tag.type" v-for="(tag, index) in tags" :key="index + tag['key'] + ''"
                        size="mini">{{ tag.text }}</el-tag>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, toRefs, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHomeStore } from '@/store/home'
import REQ from '@/api/request';

const homeStore = useHomeStore()
const { tags } = toRefs(homeStore)

const router = useRouter()
const id = ref(router.currentRoute.value.params.id)
const detail: Ref<ArticleDetail> = ref({
    articleContent: '',
    articleIntroduce: '',
    creationdate: '',
    id: -1,
    tabId: -1,
    tabName: '',
    title: '',
    viewCount: 0,
})

interface ArticleDetail {
    articleContent: string
    articleIntroduce: string
    creationdate: string
    id: number
    tabId: number
    tabName: string
    title: string
    viewCount: number
    image?: string
}

const getArticleDetail = () => {
    REQ({
        url: '/blog-article/id/' + id.value,
        method: 'GET'
    }).then((res: any) => {
        detail.value = res
        console.log("🚀 ~ file: index.vue:68 ~ getArticleDetail ~ detail.value:", detail.value)
    })
}
getArticleDetail()
</script>

<style scoped lang="scss">
.container {
    width: 1200px;
    margin: 0 auto;
    margin-top: 1.25rem;
    display: flex;

    .article-left {
        width: 840px;
        margin-right: 20px;
    }

    .article-right {
        width: 340px;
        text-align: center;

        .avatar {
            display: flex;
            justify-items: center;
            justify-content: center;

            img {
                border: 1px solid #ccc;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                overflow: hidden;
            }
        }

        .tag {
            margin-top: 5px;
            margin-right: 5px;
        }
    }
}
</style>