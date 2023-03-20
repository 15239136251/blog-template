import Mock from 'mockjs'
import nav from './nav'
const mocks: any[] = [...nav]

// 设置延迟时间
Mock.setup({
    timeout: 20
})

// typing
interface MockParams {
    url: string
    type: string
    data?: any
    params?: any
    response(options?: any): Record<string, unknown>
}

export function mockXHR() {
    let i: MockParams
    for (i of mocks) {
        console.log("🚀 ~ file: index.ts:22 ~ mockXHR ~ i", i)
        Mock.mock(new RegExp(i.url), i.type || 'get', i.response)
    }
}