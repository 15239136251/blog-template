// store/home.ts
import REQ from '@/api/request'
import { defineStore } from 'pinia'

export interface Article {
    id: number
    tabId: number
    tabName: string
    title: string
    articleIntroduce: string
    viewCount: number
    image: string
    creater: string
    creationdate: string
    modifier: string
    modifieddate: string
}

export const useHomeStore = defineStore('home', {
    state: () => {
        const articlelist: Article[] = []
        return {
            tags: [
                {
                    key: 1,
                    type: "success",
                    text: "4年工作经验",
                },
                {
                    key: 2,
                    type: "",
                    text: "可乐人柱力",
                },
                {
                    key: 3,
                    type: "info",
                    text: "即将秃头",
                },
                {
                    key: 4,
                    type: "warning",
                    text: "擅长做梦",
                },
                {
                    key: 5,
                    type: "danger",
                    text: "想一夜暴富",
                }
            ],
            icons: [
                {
                    key: 1,
                    href: "https://gitee.com/usual_practice/personal-blog---vue20",
                    icon: "iconfont icon-github",
                    text: '代码仓库',
                    value: 'Gitee'
                },
                {
                    key: 2,
                    text: "手机号",
                    icon: "iconfont icon-shouji",
                    value: '15239136251'
                },
                {
                    key: 3,
                    text: "QQ",
                    icon: "iconfont icon-qq",
                    value: '2532281393'
                },
                {
                    key: 4,
                    text: "WeChat",
                    icon: "iconfont icon-weixin-copy",
                    value: 'qq2532281393'
                }
            ],
            articlelist: articlelist
        }
    },
    actions: {
        /**
         * 描述
         * @date 2023-03-06
         * @param {any} params:{title?: string, id?: number, tabId?: number}
         * @returns {any}
         */
        getArticleList(params: {title?: string, id?: number, tabId?: number} = {}) {
            console.log("🚀 ~ file: home.ts:82 ~ getArticleList ~ params:", params)
            let dataUrl = ``
            if (params) {
                type ParamsType = keyof typeof params
                Object.keys(params).forEach(key => {
                    dataUrl = dataUrl + `${key}=${params[key as ParamsType]}`
                })
            }
            REQ({
                url: '/blog-article/list?' + dataUrl,
                method: 'GET',
                data: {},
                baseURL: ''
            }).then((res: any) => {
                this.articlelist = res
            })
        }
    },
    getters: {
        getterArticleList(): Article[] {
            return this.articlelist
        }
    }
})