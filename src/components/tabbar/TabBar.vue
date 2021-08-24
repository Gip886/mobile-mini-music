<template>
  <div class="tab-bar">
    <router-link class="router-link" tag="div" to="/discover">
      <img
        src="../../assets/img/tabbat/发现.svg"
        alt=""
        class="tab-bar-item-icon"
      />
      <div class="tab-bar-item-text">发现</div>
    </router-link>
    <router-link class="router-link" tag="div" to="/445">
      <img
        src="../../assets/img/tabbat/搜索.svg"
        alt=""
        class="tab-bar-item-icon"
      />
      <div class="tab-bar-item-text">搜索</div>
    </router-link>
    <router-link class="router-link" tag="div" to="/456">
      <img
        src="../../assets/img/tabbat/喜欢.svg"
        alt=""
        class="tab-bar-item-icon"
      />
      <div class="tab-bar-item-text">喜欢</div>
    </router-link>
    <router-link class="router-link" tag="div" to="/123">
      <img
        src="../../assets/img/tabbat/歌词.svg"
        alt=""
        class="tab-bar-item-icon"
      />
      <div class="tab-bar-item-text">歌词</div>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.tab-bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: space-evenly;
  .router-link {
    text-decoration: none;
  }
  .router-link-active {
    color: var(--highlight-deep-color);
    transform: scale(1.15);
  }
  .tab-bar-item-icon {
    width: 20px;
    height: 20px;
    margin-left: 15px;
    margin-top: 5px;
    vertical-align: middle;
  }
  .tab-bar-item-text {
    width: 50px;
    height: 25px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
  }
}
</style>
