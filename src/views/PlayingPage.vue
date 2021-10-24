<template>
  <transition name="el-zoom-in-bottom">
    <div class="playing-song-page" :style="animationStyle">
      <div class="large-album-img">
        <img
          :src="currentMusicInfo.picUrl"
          alt=""
          :style="isPlay ? palyStyle : pauseStyle"
        />
      </div>

      <div class="contral-box">
        <div
          class="progress-box"
          ref="progressBox"
          @click="setSongDot"
          @touchstart="songDotTouchStart"
          @touchmove="songDotTouchMove"
          @touchend="songDotTouchEnd"
        >
          <div class="progress-bar">
            <div
              class="progressed"
              :style="{
                width:
                  duration === null ? 0 : (currentTime / duration) * 100 + '%',
              }"
            ></div>
          </div>
          <div
            class="slider-dot"
            :style="{
              'margin-left':
                (duration === null ? 0 : (currentTime / duration) * 100) + '%',
            }"
          >
            <div class="breath-dot"></div>
          </div>
        </div>

        <div class="below-progress-box">
          <div class="time-box">{{ showTime }}</div>
          <!-- <div class="speed-box">
          <div
            class="speed-text-box"
            tabindex="0"
            @click="isShowSpeedOptions = true"
            @blur="hideSpeedOptions"
          >
            <div class="speed-text">{{ speedText }}</div>
            <img src="@/assets/arrow-up.svg" />
          </div>
          <div class="speed-options-box" v-show="isShowSpeedOptions">
            <div class="speed-option" @click="changeSpeed(2, '2x')">2.0x</div>
            <div class="speed-option" @click="changeSpeed(1.5, '1.5x')">
              1.5x
            </div>
            <div class="speed-option" @click="changeSpeed(1.25, '1.25x')">
              1.25x
            </div>
            <div class="speed-option" @click="changeSpeed(1, '1.0x')">1.0x</div>
            <div class="speed-option" @click="changeSpeed(0.75, '0.75x')">
              0.75x
            </div>
            <div class="speed-option" @click="changeSpeed(0.5, '0.5x')">
              0.5x
            </div>
          </div>
        </div> -->

          <div class="volume-box">
            <img src="../assets/img/PlayingPage/音量.svg" />
            <div class="volume-percentage">{{ parseInt(volume) }}</div>
            <div
              class="volume-adjust-box"
              @click="setVolumeDot"
              @touchmove="volumeDotMove"
              @touchend="volumeDotTouchEnd"
              ref="volumeAdjustBox"
            >
              <div class="volume-adjust-bar">
                <div
                  class="volume-progressed"
                  :style="{ width: volume + 'px' }"
                ></div>
              </div>
              <div class="slider-dot" :style="{ 'margin-left': volume + 'px' }">
                <div class="breath-dot"></div>
              </div>
            </div>
          </div>

          <div class="below-volume-box">
            <div class="play-mode-box" @click="isShow = !isShow">
              <img src="../assets/img/PlayingPage/顺序播放.svg" />
              <div class="mode-options-box" v-show="isShow">
                <div class="mode-option active">
                  <img src="../assets/img/PlayingPage/顺序播放.svg" />
                  <div class="mode-option-text">顺序播放</div>
                </div>
                <div class="mode-option">
                  <img src="../assets/img/PlayingPage/循环播放.svg" />
                  <div class="mode-option-text">单曲循环</div>
                </div>
                <div class="mode-option">
                  <img src="../assets/img/PlayingPage/循环播放.svg" />
                  <div class="mode-option-text">列表循环</div>
                </div>
                <div class="mode-option">
                  <img src="../assets/img/PlayingPage/随机播放.svg" />
                  <div class="mode-option-text">随机播放</div>
                </div>
              </div>
            </div>
            <div class="play-contral-box">
              <div class="previous-song">
                <img
                  src="../assets/img/PlayingPage/previous.svg"
                  width="40px"
                />
              </div>
              <div class="palying-or-paused" @click.stop="playClick">
                <img :src="isPlay ? pauseImg : playImg" width="40px" />
              </div>
              <div class="next-song" @click.stop="nextSong">
                <img src="../assets/img/PlayingPage/next.svg" width="40px" />
              </div>
            </div>
            <div class="playing-page-mark-box">
              <img src="../assets/img/PlayingPage/mark.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      playImg: require("../assets/img/bottombox/播放.svg"),
      pauseImg: require("../assets/img/bottombox/停止.svg"),
      palyStyle: "animation: albumRotate 15s linear infinite running",
      pauseStyle: "animation: albumRotate 15s linear infinite paused",
      animationStyle: {},
      currentVolume: null,
      isShow: false,
    };
  },
  computed: {
    ...mapState({
      audio: "audio",
      isPlay: "isPlay",
      volume: "volume",
      duration: "duration",
      currentTime: "currentTime",
      currentIndex: "currentIndex",
      currentList: "currentList",
    }),
    ...mapGetters(["currentMusicInfo"]),
    showTime() {
      //实时显示歌曲播放时间进度
      var current_m = Math.floor(this.currentTime / 60);
      var current_s = parseInt(this.currentTime % 60);
      var duration_m = Math.floor(this.duration / 60);
      var duration_s = parseInt(this.duration % 60);

      current_m += "";
      current_s += "";
      duration_m += "";
      duration_s += "";

      current_m = current_m.length == 1 ? "0" + current_m : current_m;
      current_s = current_s.length == 1 ? "0" + current_s : current_s;
      duration_m = duration_m.length == 1 ? "0" + duration_m : duration_m;
      duration_s = duration_s.length == 1 ? "0" + duration_s : duration_s;

      return current_m + ":" + current_s + "/" + duration_m + ":" + duration_s;
    },
  },
  methods: {
    setSongDot(e) {
      //   https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
      let offset = e.x - this.$refs.progressBox.getBoundingClientRect().left;
      let totalLength =
        this.$refs.progressBox.getBoundingClientRect().right -
        this.$refs.progressBox.getBoundingClientRect().left;
      let currentTime = (offset / totalLength) * this.audio.duration;
      this.audio.currentTime = currentTime;
      // this.audio.volume = this.volume / 100;
      this.audio.play();
    },
    songDotTouchStart(e) {
      this.audio.volume = 0;
    },

    songDotTouchMove(e) {
      var offset =
        e.touches[0].pageX -
        this.$refs.progressBox.getBoundingClientRect().left;
      var totalLength =
        this.$refs.progressBox.getBoundingClientRect().right -
        this.$refs.progressBox.getBoundingClientRect().left;
      var currentTime = (offset / totalLength) * this.audio.duration;
      console.log(totalLength);

      this.audio.currentTime = currentTime;
      this.audio.play();
    },
    songDotTouchEnd(e) {
      this.audio.volume = this.volume / 100;
    },
    setVolumeDot(e) {
      var offset =
        e.x - this.$refs.volumeAdjustBox.getBoundingClientRect().left;
      if (offset < 0) {
        offset = 0;
      }
      if (offset > 100) {
        offset = 100;
      }
      this.currentVolume = offset;
      this.audio.volume = this.currentVolume / 100;
      this.$store.commit("sendAudioVolume", this.currentVolume);
      //   localStorage.setItem("volume", this.volume.toString());
    },
    volumeDotMove(e) {
      var offset =
        e.touches[0].pageX -
        this.$refs.volumeAdjustBox.getBoundingClientRect().left;
      if (offset < 0) {
        offset = 0;
      }
      if (offset > 100) {
        offset = 100;
      }
      this.currentVolume = offset;
      this.audio.volume = this.currentVolume / 100;
      this.$store.commit("sendAudioVolume", this.currentVolume);
    },

    volumeDotTouchEnd() {
      //   localStorage.setItem("volume", this.volume.toString());
      this.$store.commit("sendAudioVolume", this.currentVolume);
    },
    playClick() {
      if (this.audio.src != "") {
        if (this.isPlay) {
          this.audio.pause();
          this.$store.commit("changeAudioPlay", false);
        } else {
          this.audio.play();
          this.$store.commit("changeAudioPlay", true);
        }
      }
    },
    nextSong() {
      this.$store.commit("changeAudioPlay", false);

      if (this.currentIndex < this.currentList.length) {
        this.$store.state.currentIndex++;

        this.$store.dispatch("getMusicDetail", {
          musicItem: this.currentList[this.currentIndex],
          index: this.currentIndex,
        });

        this.$store.dispatch("getMusiclyric", {
          id: this.currentList[this.currentIndex].id,
        });
      }
    },
  },
  activated() {
    this.animationStyle = {
      animation: "slideUp 0.5s linear forwards",
    };
  },
  deactivated() {
    this.animationStyle = {};
  },
};
</script>

<style scoped>
@keyframes albumRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.playing-song-page {
  width: 100%;
  height: 100%;
  position: relative;
}
.playing-song-page:active {
  animation: slideUp 0.5s linear forwards;
}

.large-album-img > img {
  width: 80%;
  height: 80%;
  margin-top: 10%;
  margin-left: 10%;
  border-radius: 50%;
  box-shadow: 0 0 10px var(--highlight-deep-color);
}

.contral-box {
  width: 90%;
  height: 100px;
  position: absolute;
  margin-left: 5%;
  bottom: 2%;
}

.progress-box {
  width: 100%;
  height: 12px;
}

.progress-bar {
  width: 100%;
  height: 2px;
  margin-top: 5px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.1);
}

.progressed {
  height: 100%;
  background-color: var(--highlight-color);
}

.slider-dot {
  width: 12px;
  height: 12px;
  position: absolute;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 10px var(--highlight-deep-color);
}

.slider-dot:active {
  transform: scale(1.5);
}

.breath-dot {
  width: 6px;
  height: 6px;
  margin-top: 3px;
  margin-left: 3px;
  border-radius: 50%;
  background-color: var(--highlight-deep-color);
}

.below-progress-box {
  width: 100%;
  height: 20px;
  margin-top: 10px;
}

.time-box {
  width: 80px;
  height: 20px;
  float: left;
  font-size: 13px;
  line-height: 20px;
}

.speed-box {
  width: 58px;
  height: 20px;
  position: relative;
  float: left;
}

.speed-text-box {
  width: 56px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid var(--highlight-deep-color);
}

.speed-text-box:focus {
  outline: none;
}

.speed-text {
  width: 30px;
  height: 20px;
  float: left;
  margin-left: 4px;
  line-height: 20px;
  text-align: center;
  font-size: 13px;
}

.speed-text-box img {
  width: 14px;
  height: 14px;
  margin-top: 3px;
  margin-left: 3px;
}

.speed-options-box {
  position: absolute;
  width: 56px;
  height: 165px;
  margin-top: -190px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 0 10px var(--highlight-deep-color);
}

.speed-option {
  width: 50px;
  height: 20px;
  margin-left: 3px;
  margin-top: 5px;
  line-height: 20px;
  text-align: center;
  border-radius: 5px;
}

.speed-option:first-child {
  margin-top: 10px;
}

.speed-option:active {
  transform: scale(1.1);
}

.volume-box {
  width: 156px;
  height: 20px;
  position: relative;
  float: right;
}

.volume-box img {
  width: 20px;
  height: 20px;
  float: left;
}

.volume-box img:active {
  transform: scale(1.5);
}

.volume-percentage {
  width: 36px;
  height: 20px;
  float: left;
  line-height: 20px;
  text-align: center;
  font-size: 10px;
}

.volume-adjust-box {
  width: 100px;
  height: 12px;
  margin-top: 4px;
  float: right;
}

.volume-adjust-bar {
  width: 100px;
  height: 2px;
  margin-top: 5px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.1);
}

.volume-progressed {
  height: 100%;
  background-color: var(--highlight-color);
}

.below-volume-box {
  width: 100%;
  height: 50px;
  margin-top: 8px;
  display: flex;
  justify-content: space-evenly;
}

.play-mode-box {
  width: 30px;
  height: 20px;
  margin-top: 15px;
  position: relative;
  float: left;
}

.play-mode-box > img {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  float: left;
}

.play-mode-box > img:focus {
  outline: none;
}

.mode-options-box {
  width: 100px;
  height: 115px;
  position: absolute;
  margin-top: -120px;
  margin-left: -35px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 10px var(--highlight-deep-color);
}

.mode-option {
  width: 80px;
  height: 20px;
  margin-top: 5px;
  margin-left: 10px;
  border-radius: 5px;
}
.mode-option.active {
  background-color: #bdc3c7;
}

.mode-option:active {
  transform: scale(1.1);
}

.mode-option:first-child {
  margin-top: 10px;
}

.mode-option img {
  width: 20px;
  height: 20px;
  float: left;
  border-radius: 5px 0 0 5px;
}

.mode-option-text {
  width: 60px;
  height: 20px;
  float: left;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  border-radius: 0 5px 5px 0;
}

.play-contral-box {
  width: 50%;
  height: 50px;
  float: left;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.previous-song {
  width: 40px;
  height: 40px;
  float: left;
}

.previous-song:active {
  transform: scale(1.5);
}

.palying-or-paused {
  width: 40px;
  height: 40px;
  border: 2px solid #9a79d2;
  border-radius: 50%;
  float: left;
}

.palying-or-paused:active {
  transform: scale(1.3);
}

.next-song {
  width: 40px;
  height: 40px;
  float: left;
}

.next-song:active {
  transform: scale(1.5);
}

.playing-page-mark-box {
  width: 30px;
  height: 30px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.playing-page-mark-box > img {
  width: 20px;
  height: 20px;
}

.playing-page-mark-box > img:active {
  transform: scale(1.5);
}
</style>