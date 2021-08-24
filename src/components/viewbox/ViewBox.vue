<template>
  <div class="view-box">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.view-box {
  position: fixed;
  width: 100%;
  top: 50px;
  bottom: 100px;
  overflow-x: hidden;
}
</style>