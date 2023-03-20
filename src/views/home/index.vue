<template>
  <div class="home-article">
    <!-- 左侧首页文章列表 -->
    <div class="home-article-left">
      <el-card v-if="articlelist.length === 0">
        <el-empty description="Not Data" />
      </el-card>
      <el-card class="mb-2" v-for="article in articlelist" :key="article.id">
        <!-- 标题 -->
        <h1 class="cursor-pointer text-xl hover:text-blue-400" @click="goto(article.id)">{{ article.title }}</h1>
        <!-- 基本信息 -->
        <div class="flex items-center text-sm text-gray-400 mt-1">
          <el-tag class="mr-1 flex items-center" v-show="article.viewCount">观看人数：{{ article.viewCount }}</el-tag>
          <span class="mr-2 flex items-center">
            <el-icon class="mr-1"><Calendar /></el-icon>
            {{ article.creationdate }}
          </span>
          <span class="mr-2 flex items-center">
            <!-- <i class="el-icon-folder" style="margin-right: 5px"></i> -->
            <el-icon class="mr-1"><Folder /></el-icon>
            <span>{{ article.tabName }}</span>
          </span>
          <span class="mr-2 flex items-center">
            <el-icon class="mr-1"><Star /></el-icon> 0 人
          </span>
        </div>
        <!-- 简介 -->
        <div class="my-1 text-gray-600">
          <div v-html="article.articleIntroduce"></div>
        </div>
        <!-- 更多按钮 -->
        <el-button class="mt-1" type="info" size="small" plain @click="goto(article.id)">Read more</el-button>
      </el-card>
    </div>
    <!-- 右侧简介 -->
    <div class="home-article-right">
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
      <!-- 社交账号 -->
      <el-card class="mt-5">
        <div class="pb-1 border-x-0 border-t-0 border border-solid mb-1">WE MEDIA</div>
        <div class="" v-for="icon in icons" :key="icon.key">
          <div v-if="icon.href" class="flex items-center justify-between">
            <div>
              <i style="font-size: 24px;" :class="icon.icon"></i>
            </div>
            <div class="text-sm ml-2 text-gray-400">
              {{ icon.text }}
            </div>
            <a class="text-sm ml-2 text-gray-400 w-28 bg-gray-200 rounded p-1" :href="icon.href" target="_Blank">{{
              icon.value }}</a>
          </div>
          <div v-else class="flex items-center justify-between">
            <div>
              <i style="font-size: 24px;" :class="icon.icon"></i>
            </div>
            <div class="text-sm ml-2 text-gray-400">
              {{ icon.text }}
            </div>
            <div class="text-sm ml-2 text-gray-400 w-28 bg-gray-200 rounded p-1">{{ icon.value }}</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useHomeStore } from '@/store/home'
import router from '@/router'
const homeStore = useHomeStore()
const { tags, icons, articlelist } = toRefs(homeStore)
const { getArticleList } = homeStore

const goto = (id: number) => {
  router.push(`/article/${id}`)
}

getArticleList()
</script>

<style scoped lang="scss">
.home-article {
  width: 1200px;
  margin: 0 auto;
  margin-top: 1.25rem;
  display: flex;

  .home-article-left {
    width: 840px;
    margin-right: 20px;
  }

  .home-article-right {
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
