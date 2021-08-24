import { getNewMusic } from "@/network/api";
import { Message } from 'element-ui';
import { Music } from "@/network/api";



const mutations = {

    //修改专辑图片样式，使专辑图片开始转动
    albumRotateRunning(state) {
        state.albumImgStyle = {
            'animation': 'albumRotate 20s linear infinite running'
        }
    },

    //修改专辑图片样式，使专辑图片暂停转动（保持已转动的角度）
    albumRotatePaused(state) {
        state.albumImgStyle = {
            'animation': 'albumRotate 20s linear infinite paused'
        }
    },

    // 处理音乐数据的状态改变
    handleTop100List(state, newMusic) {
        state.top100List = newMusic
    },

    // 更改当前选中音乐
    changeCurrentIndex(state, index) {
        state.currentIndex = index
    },

    //将查到的音乐url保存起来
    handleMusicData(state, res) {
        let musicItem = res.musicItem
        let index = res.index

        state[index] = musicItem
    }

}

export default mutations