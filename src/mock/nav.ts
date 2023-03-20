const uname = {
    creater: 'root',
    creationdate: new Date(),
    modifier: 'root',
    modifieddate: new Date(),
    isactive: 'Y'
}

const list = [{
    id: 1,
    name: '视频文章',
    code: 'spwz',
    path: '/home/article/1',
    ...uname
}, {
    id: 2,
    name: '随意聊聊',
    code: 'syll',
    path: '/home/article/2',
    ...uname
}]
const nav = [
    /* getNav */
    {
        url: '/blog-tab/list',
        type: 'get',
        response: () => {
            return {
                code: 100,
                message: '操作成功！',
                data: [...list]
            }
        }
    }
]

export default nav