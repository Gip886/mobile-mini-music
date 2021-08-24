<template>
  <div class="bottom-box">
    <div class="bottom-box-album-img">
      <img
        :src="getPicUrl"
        :style="haveStarted === true ? albumImgStyle : ''"
      />
    </div>
    <div class="current-song-info">{{ currentMusicInfo.name }}</div>
    <div class="bottom-box-playing-or-paused">
      <img src="../../assets/img/bottombox/播放.svg" alt="" />
    </div>
    <audio id="audio" src="" autoplay></audio>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      defaultAlbumImgUrl: require("@/assets/img/bottombox/default-album-img.jpg"),
    };
  },
  computed: {
    ...mapState({
      audio: (state) => state.audio,
      currentIndex: "currentIndex",
      haveStarted: "haveStarted",
      getPicUrl: function (state) {
        if (state.currentIndex != null) {
          return state.top100List[state.currentIndex].picUrl;
        } else {
          return this.defaultAlbumImgUrl;
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