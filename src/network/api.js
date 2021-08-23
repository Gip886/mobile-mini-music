import { request } from './request';

export function getTopList() {
    return request({
        url: "/toplist"
    })
}


// 推荐新音乐
// limit: 取出数量 , 默认为 10 (不支持 offset)
export function getRecommendMusic(limit) {
    return request({
        url: "/toplist",
        params: {
            limit
        }
    })
}