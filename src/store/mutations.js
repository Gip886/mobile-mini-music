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
    changeCurrentIndex(state, playload) {
        switch (playload.page) {
            case 'DiscoverPage':
                state.currentList = state.top100List
                state.currentIndex = playload.currentIndex
                break
        }
        // state.currentIndex = index
    },

    //将查到的音乐url保存起来
    handleMusicData(state, res) {
        let musicItem = res.musicItem
        // let index = res.index

        // state[index] = musicItem

        // 当前播放音乐item
        state.currentMusicItem = musicItem
        //  更改播放器播放状态
        state.isPlay = true

    },


    sendAudio(state, audio) {
        state.audio = audio
    },

    sendAudioVolume(state, volume) {
        state.volume = volume
    },

    sendCurrentTime(state, currentTime) {
        state.currentTime = currentTime
    },

    sendDuration(state, duration) {
        state.duration = duration
    },

    changeAudioPlay(state, flag) {
        state.isPlay = flag
    },

    handLoadMore(state, moreMuscics) {
        state.top100List = state.top100List.concat(moreMuscics)
    },

    handMusiclyric(state, lyricTextArr) {
        state.lyricTextArr = lyricTextArr
    }


}

export default mutations