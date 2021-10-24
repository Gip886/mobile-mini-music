import { getNewMusic, getMusicDetail, getMusiclyric } from "@/network/api";
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
            musicItem.musicUrl = res.data.data[0].url
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

            musicItem.musicUrl = null
            let send = {
                musicItem: musicItem,
                index: index
            }
            commit('handleMusicData', send)

        })
    },


    loadMore({ commit }, { limit }) {
        getNewMusic(limit).then(res => {
            let newMusic = res.data.result.map((item) => {
                return new Music(item);
            });
            commit('handLoadMore', newMusic)
        }).catch(err => {
            Message.error({
                message: '数据请求失败！',
                showClose: true
            })
            console.log(err)
        })
    },



    getMusiclyric({ commit }, { id }) {

        getMusiclyric(id).then(res => {
            // console.log(res);
            // 处理歌词
            var lyricText = res.data.lrc.lyric
            var lyricTextArr = lyricText.split('\n')

            //去掉前面五个没用的歌词
            // lyricTextArr.splice(0, 5)

            //清除上一首的歌词
            // state.lyricTextArr = []

            var lyric = []
            //将歌词与时间分离
            lyricTextArr.forEach(eachLine => {
                var t = eachLine.substring(eachLine.indexOf("[") + 1, eachLine.indexOf("]"))
                var lyricTextLineObj = {
                    time: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(2),
                    text: eachLine.substring(eachLine.indexOf("]") + 1, eachLine.length)
                }

                //   state.lyricTextArr.push(lyricTextLineObj)
                lyric.push(lyricTextLineObj)

            })
            commit('handMusiclyric', lyric)

        }).catch(err => {
            Message.error({
                message: '歌词数据请求失败！',
                showClose: true
            })
            console.log(err)
        })
    }

}

export default actions
