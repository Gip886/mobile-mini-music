<template>
  <div id="app">
    <top-bar />
    <view-box />
    <bottom-box />
    <tab-bar />
  </div>
</template>

<script>
import TabBar from "@/components/tabbar/TabBar.vue";
import TopBar from "./components/topbar/TopBar.vue";
import BottomBox from "./components/bottombox/BottomBox.vue";
import ViewBox from "./components/viewbox/ViewBox.vue";

export default {
  name: "app",
  components: { TabBar, TopBar, BottomBox, ViewBox },
};
</script>

<style>
@import url("./assets/css/normalize.css");
:root {
  --highlight-color: #c5b5f0;
  --highlight-deep-color: #276eda;
}
</style>
