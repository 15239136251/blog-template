// store/navs.ts
import { defineStore } from 'pinia'
import REQ from '@/api/request'

export interface Nav {
    id: number
    name: string
    code: string
    path: string
}

export const useNavsStore = defineStore('navs', {
    state: () => {
        const navlist: Nav[] = []
        return {
            navlist: navlist
        }
    },
    actions: {
        getNavList() {
            REQ({
                url: '/blog-tab/list',
                baseURL: '',
                method: 'POST'
            }).then((res: any) => {
                this.navlist = res
                this.navlist.unshift({
                    id: -1,
                    name: '首页',
                    code: 'sy',
                    path: '/home'
                })
            })
        }
    },
    getters: {
        navs(): Nav[] {
            return this.navlist
        }
    }
})