<template>
  <div id="app">
    <div class="app-background" :style="getBgStyle"></div>
    <div class="app-background-above">
      <top-bar />
      <view-box />
      <bottom-box />
      <tab-bar />
    </div>
  </div>
</template>

<script>
import TabBar from "@/components/tabbar/TabBar.vue";
import TopBar from "./components/topbar/TopBar.vue";
import BottomBox from "./components/bottombox/BottomBox.vue";
import ViewBox from "./components/viewbox/ViewBox.vue";

import { mapState } from "vuex";

export default {
  name: "app",
  components: { TabBar, TopBar, BottomBox, ViewBox },
  data() {
    return {
      defaultAlbumImgUrl: require("./assets/img/bottombox/default-album-img.jpg"),
      albumImgUrl: null,
      bgStyle: {},
    };
  },
  computed: {
    ...mapState({
      currentList: (state) => state.currentList,
      currentIndex: (state) => state.currentIndex,
    }),
    getBgStyle() {
      //刚启动和歌曲没有专辑图片时，使用默认专辑图片作为背景
      if (this.currentList[this.currentIndex] == null) {
        this.albumImgUrl = this.defaultAlbumImgUrl;
        console.log(this.albumImgUrl);
      } else {
        this.albumImgUrl = this.currentList[this.currentIndex].picUrl;
      }

      this.bgStyle = {
        "background-image": "url(" + this.albumImgUrl + ")",
      };

      //请求图片需要时间，背景会短暂变成白色形成闪烁
      //所以延迟背景图片改变，给出请求背景图片（专辑图片）的时间
      // setTimeout(() => {
      //   this.bgStyle = {
      //     "background-image": "url(" + this.albumImgUrl + ")",
      //   };
      // }, 1500);

      return this.bgStyle;
    },
  },
  methods: {},
};
</script>

<style>
@import url("./assets/css/normalize.css");
:root {
  --highlight-color: #c5b5f0;
  --highlight-deep-color: #276eda;
}

#app {
  width: 100vw;
  height: 100vh;
  position: relative;
  -webkit-user-select: none;
}
.app-background {
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url("./assets/img/bottombox/default-album-img.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: blur(150px);
}
.app-background-above {
  width: 100%;
  height: 100%;
  position: absolute;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgb(214 112 112 / 40%);
}

::-webkit-scrollbar-track {
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
