import { getNewMusic, getMusicDetail } from "@/network/api";
import { Music } from "@/network/api";
import { Message } from 'element-ui';


const actions = {
    // 请求最新的音乐数据，完成后直接提交改变状态
    getNewMusic({ commit }, { limit = 20 }) {
        getNewMusic(limit).then(res => {
            let newMusic = res.data.result.map((item) => {
                return new Music(item);
            });
            commit('handleTop100List', newMusic)
        }).catch(err => {
            Message.error({
                message: '数据请求失败！',
                showClose: true
            })
            console.log(err)
        })
    },

    // 获取音乐音频数据
    getMusicDetail({ commit }, { musicItem, index }) {
        getMusicDetail(musicItem.id).then(res => {
            musicItem.musicUrl = res.data.url
            let send = {
                musicItem: musicItem,
                index: index
            }
            commit('handleMusicData', send)
        }).catch(err => {
            Message.error({
                message: '数据请求失败！',
                showClose: true
            })
            console.log(err)
        })
    }
}

export default actions
