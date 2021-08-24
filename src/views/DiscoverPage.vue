<template>
  <div class="top-100-page">
    <!-- <el-backtop
      target=".top-100-item-box"
      :bottom="100"
      style="background-color: rgba(255, 255, 255, 0); "
    >
      <img src="../assets/img/DiscoverPage/火箭.svg" width="35px" alt="" />
    </el-backtop> -->

    <div class="top-100-backtop" @click="backTop" v-show="isShowBackTop">
      <img src="../assets/img/DiscoverPage/backtop.svg" width="40px" />
    </div>
    <div class="top-100-title">Top 100</div>
    <div class="top-100-item-box" ref="top100ItemBoxDom">
      <div
        class="top-100-item"
        v-for="(item, index) in top100List"
        :key="index"
        :style="currentIndex == index ? playingSongStyle : ''"
      >
        <img :src="markImgUrl" alt="" class="top-100-mark-img" />
        <!-- <img :src="markedImgUrl" alt="" class="top-100-mark-img" /> -->

        <el-image
          :src="item.picUrl"
          lazy
          class="top-100-album-img"
          :key="index"
          @click="playThisSong(item, index)"
        >
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>

        <!-- <img :src="item.picUrl" class="top-100-album-img" width="100px" /> -->

        <div class="top-100-album-info">
          <div class="top-100-song-name">{{ item.name }}</div>
          <div class="top-100-singer-name">{{ item.songer }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommendMusic, getNewMusic } from "@/network/api";
import { Music } from "@/network/api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      markImgUrl: require("@/assets/img/DiscoverPage/mark.svg"),
      markedImgUrl: require("@/assets/img/DiscoverPage/marked.svg"),
      items: [],
      // items: this.top100List,
      limit: 100,
      isShowBackTop: false,
      scrollerPosition: 0,
      playingSongStyle: {
        transform: "scale(1.1)",
      },
    };
  },
  computed: {
    ...mapState({
      top100List: (state) => state.top100List,
      currentIndex: (state) => state.currentIndex,
    }),
  },
  mounted() {
    //当滑块滑动到一定距离再出现
    this.$refs.top100ItemBoxDom.addEventListener("scroll", () => {
      // console.log(this.$refs.top100ItemBoxDom.scrollTop);
      this.scrollerPosition = this.$refs.top100ItemBoxDom.scrollTop;

      if (this.$refs.top100ItemBoxDom.scrollTop > 600) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
    });

    //更改称全局请求数据保存到
    // this.$store.commit("handleTop100List", 100);
    this.$store.dispatch("getNewMusic", {
      limit: 100,
    });

    //获取歌曲数据
    // getNewMusic(this.limit).then((res) => {
    //   console.log(res);
    //   this.items = res.data.result.map((item) => {
    //     return new Music(item);
    //   });
    //   //   console.log(this.items);
    // });
  },
  methods: {
    backTop() {
      // 原作者直接让其=0，没有动画效果
      // console.log(this.$refs.top100ItemBoxDom.scrollTop);
      //   this.$refs.top100ItemBoxDom.scrollTop = 0;

      // 解决方式来自：https://blog.csdn.net/weixin_41698051/article/details/102836378
      // 实现滚动效果
      // 时间可以填16，或者不填，让其立即执行
      const timeTop = setInterval(() => {
        this.$refs.top100ItemBoxDom.scrollTop -= 30;
        if (this.$refs.top100ItemBoxDom.scrollTop <= 0) {
          clearInterval(timeTop);
        }
      });
    },
    playThisSong(item, index) {
      this.$store.commit("changeCurrentIndex", index);

      this.$store.dispatch("getMusicDetail", { musicItem: item, index: index });
    },
  },
  //     beforeRouteLeave(to, from, next) {
  //     //记下离开时滑块位置
  //     this.scrollerPosition = this.$refs.top100ItemBoxDom.scrollTop
  //     next()
  //   },
  deactivated() {
    //   原作者结合路由来完成记录离开的postion
    //   一个bug，离开的时候scrollTop永远等于0
    // 现在改成放到监听器中赋值
    // this.scrollerPosition = this.$refs.top100ItemBoxDom.scrollTop;
    // console.log("我走了" + this.scrollerPosition);
  },
  activated() {
    this.$refs.top100ItemBoxDom.scrollTop = this.scrollerPosition;
    // console.log("我来了" + this.scrollerPosition);
  },
};
</script>

<style>
.top-100-page {
  width: 100%;
  height: 100%;
}

.top-100-title {
  width: 100%;
  height: 6%;
  line-height: 40px;
  text-align: center;
  font-size: 25px;
  font-weight: bolder;
  /* 自己随便加点 */
  border-radius: 10px;
  box-shadow: 2px 2px 8px 2px rgb(202, 200, 200);
}
.top-100-item-box {
  width: 100%;
  height: 94%;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  transition: all 2s ease-in-out 2s;
}
.top-100-backtop {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 15%;
  right: 3%;
  border-radius: 10px;
  background-color: rgba(241, 22, 22, 0.2);
  z-index: 3;
}
.top-100-backtop:active {
  transform: scale(1.2);
}

.top-100-item {
  width: 30%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: relative;
  transition: transform 0.1s ease-in-out 0.1s;
}
/* .top-100-item:active {
  transform: scale(1.2);
} */
.top-100-album-img {
  border-radius: 20px;
  box-shadow: 2px 2px 10px 3px grey;
  width: 100px;
  height: 100px;
}
/* .top-100-album-img :active {
  transform: scale(1.5);
} */
.top-100-mark-img {
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 30%;
  left: 12%;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 2;
}
.top-100-mark-img:active {
  transform: scale(1.5);
}
.top-100-album-info {
  width: 100%;
}
.top-100-song-name {
  width: 100%;
  margin-top: 5px;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.top-100-singer-name {
  width: 100%;
  margin-top: 5px;
  font-size: 8px;
  text-align: center;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.image-slot {
  text-align: center;
  line-height: 100px;
}
</style>