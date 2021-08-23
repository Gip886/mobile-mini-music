<template>
  <div class="top-box">
    <div class="back-or-forward">
      <img
        src="../../assets/img/topbar/返回.svg"
        alt=""
        width="20px"
        @click="goBack"
      />
      <img
        src="../../assets/img/topbar/前进.svg"
        alt=""
        width="20px"
        @click="goForward"
      />
    </div>
    <div class="input-box">
      <input
        type="text"
        class="search-input"
        v-model.trim="searchText"
        @change="searchSong"
        @keyup.enter="inputBlur"
        placeholder="搜索音乐"
      />
      <div class="search-history-box" v-show="isShowSearchHistory">
        <div class="serach-history-item">
          <div class="serach-history-block">
            <div class="search-history-block-text">默认text</div>
            <div class="delete-this-search-text">
              <img src="../../assets/img/topbar/删除.svg" width="20px" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="app-icon">
      <img src="../../assets/img/logo.svg" alt="" width="30px" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      searchHistoryArr: [],
      isShowSearchHistory: false,
      isDeletingSearchText: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goForward() {
      this.$router.go(1);
    },
    inputBlur() {
      // 使输入框失去焦点
      document.querySelector(".search-input").blur();
    //   this.$message('nihao')
    },
    searchSong() {
      this.isShowSearchHistory = false;
      if (this.searchText !== "") {
        // 防止空格输入也可以搜索
        this.router.push("/search");
        this.$store.commit("handleSearchSong", this.searchText);
        // 等待重构中


      }
    },
  },
};
</script>

<style scoped>
.top-box {
  width: 100%;
  height: 50px;
  position: fixed;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 100;
}
.back-or-forward {
  height: 20px;
}
.back-or-forward img {
  border-radius: 6px;
}
.back-or-forward img:active {
  transform: scale(1.5);
}
.back-or-forward img:nth-child(2) {
  margin-left: 10px;
}
.input-box {
  width: 50%;
  height: 30px;
}
.search-input {
  border: none;
  width: 98%;
  height: 30px;
  position: relative;
  padding-left: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}
.search-input:focus {
  outline: 0;
  box-shadow: 0 0 5px var(--highlight-deep-color);
  background-color: rgba(255, 255, 255, 0.6);
}
.search-history-box {
  width: 51%;
  max-height: 100px;
  position: absolute;
  margin-top: 2px;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 5px var(--highlight-deep-color);
}
.search-history-item {
  height: 20px;
  float: left;
  margin-left: 5px;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 0 5px var(--highlight-deep-color);
}
.search-history-item:last-child {
  margin-bottom: 10px;
}

.search-history-item:active {
  transform: scale(1.2);
}

.search-history-block-text {
  float: left;
  margin-left: 5px;
  line-height: 20px;
  font-size: 14px;
}
.delete-this-search-text {
  width: 20px;
  height: 20px;
  float: left;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.delete-this-search-text:active {
  transform: scale(1.5);
}

.app-icon {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>