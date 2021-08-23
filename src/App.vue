<template>
  <div id="app">
    <top-bar />
    <bottom-box/>
    <tab-bar />
  </div>
</template>

<script>
import TabBar from "@/components/tabbar/TabBar.vue";
import TopBar from "./components/topbar/TopBar.vue";
import BottomBox from './components/bottombox/BottomBox.vue';

export default {
  name: "app",
  components: { TabBar, TopBar, BottomBox },
};
</script>

<style>
@import url("./assets/css/normalize.css");
:root {
  --highlight-color: #c5b5f0;
  --highlight-deep-color: #276eda;
}
</style>
