<template>
  <div class="bottom-box" @click="showPlayingPage">
    <div class="bottom-box-album-img">
      <img
        :src="
          currentMusicInfo.picUrl == null
            ? defaultAlbumImgUrl
            : currentMusicInfo.picUrl
        "
        :style="isPlay == true ? palyStyle : pauseStyle"
      />
    </div>
    <div class="current-song-info">{{ currentMusicInfo.name }}</div>
    <div class="bottom-box-playing-or-paused">
      <img :src="isPlay ? pauseImg : playImg" alt="" @click.stop="playClick" />
    </div>
    <audio id="audio" :src="currentMusicItem.musicUrl" autoplay></audio>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      defaultAlbumImgUrl: require("@/assets/img/bottombox/default-album-img.jpg"),
      palyStyle: "animation: albumRotate 15s linear infinite running",
      pauseStyle: "animation: albumRotate 15s linear infinite paused",
      playImg: require("../../assets/img/bottombox/播放.svg"),
      pauseImg: require("../../assets/img/bottombox/停止.svg"),
    };
  },
  computed: {
    ...mapState({
      isPlay: "isPlay",
      audio: (state) => state.audio,
      currentIndex: "currentIndex",
      currentList: "currentList",
      // getPicUrl: function (state) {
      //   if (state.currentIndex != null) {
      //     return state.top100List[state.currentIndex].picUrl;
      //   } else {
      //     return this.defaultAlbumImgUrl;
      //   }
      // },
      currentMusicItem: (state) => {
        if (state.currentMusicItem != null) {
          return state.currentMusicItem;
        } else {
          return {};
        }
      },
    }),
    // currentMusicInfo() {
    //   if (this.$store.getters.currentMusicInfo != null) {
    //     return this.$store.getters.currentMusicInfo;
    //   } else {
    //     return {};
    //   }
    // },
    ...mapGetters(["currentMusicInfo"]),
  },
  mounted() {
    var audio = document.querySelector("#audio");

    // 将audio发送到vuex前先设置一下，不然默认最大音量受不了
    // if (localStorage.hasOwnProperty("volume")) {
    //   audio.volume = parseInt(localStorage.getItem("volume")) / 100;
    // } else {
    //   audio.volume = 0.2;
    // }

    audio.volume = 0.8;

    //将audio发送到vuex，方便其他组件操作audio
    this.$store.commit("sendAudio", audio);

    this.$store.commit("sendAudioVolume", 80);

    this.addAudioEventListeners();
  },
  methods: {
    addAudioEventListeners() {
      this.audio.addEventListener("canplay", this.getDuration);
      this.audio.addEventListener("timeupdate", this.getCurrentTime);
      this.audio.addEventListener("ended", this.autoPlayNextSong);
    },
    getDuration() {
      let duration = this.audio.duration;
      // console.log(this.duration);
      this.$store.commit("sendDuration", duration);
      // 适应下bug
      this.audio.play();
      this.$store.commit("changeAudioPlay", true);
    },
    getCurrentTime() {
      let currentTime = this.audio.currentTime;
      this.$store.commit("sendCurrentTime", currentTime);
    },
    autoPlayNextSong() {
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
    showPlayingPage() {
      if (this.$route.path != "/playing") {
        this.$router.push("/playing");
      }
    },
  },
};
</script>

<style>
.bottom-box {
  display: flex;
  justify-content: space-between;
  width: 98%;
  height: 50px;
  position: fixed;
  left: 2%;
  right: 2%;
  bottom: 50px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 25px;
}
.bottom-box-album-img > img {
  width: 50px;
  /* height: 50px; */
  border-radius: 50%;
}
@keyframes albumRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.current-song-info {
  height: 50px;
  line-height: 50px;
  text-align: center;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.bottom-box-playing-or-paused {
  width: 30px;
  height: 30px;
  margin-top: 8px;
  margin-right: 10px;
  border: 2px solid #e0d7f0;
  border-radius: 50%;
}
.bottom-box-playing-or-paused > img {
  width: 30px;
}
</style>