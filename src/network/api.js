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


export function getNewMusic(limit) {
    return request({
        url: '/personalized/newsong',
        params: {
            limit
        }
    })
}

export class Music {
    constructor(musicInfo) {
        this.name = musicInfo.name,
            this.id = musicInfo.id,
            this.picUrl = musicInfo.picUrl,
            this.songer = musicInfo.song.artists[0].name
        this.musicUrl = null
    }
}


export function getMusicDetail(id) {
    return request({
        url: '/song/url',
        params: {
            id
        }
    })
}


export function getMusiclyric(id) {
    return request({
        url: '/lyric',
        params: {
            id
        }
    })
}


