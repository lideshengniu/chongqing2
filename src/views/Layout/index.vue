<template>
  <div class="common-layout" ref="homeref">
    <div class="common-header">
      <LayoutHead></LayoutHead>
    </div>
    <Mars class="mars"></Mars>
  </div>
</template>
<script lang="ts" setup>
import LayoutHead from "./Components/Head/index.vue"
import Mars from "@mars/views/index.vue"
// const configUrl = `${process.env.BASE_URL}config/config.json`
</script>
<style scoped lang="less">
.common-layout {
  width: 100%;
  height: 100vh;
  background-color: #000;

  .common-header {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 40px;
    // background-color: rgba(54, 133, 169, 0.19);
    // filter: blur(5px);
    // border-bottom: 4.5px solid #000;
  }

  .mars {
    width: 100%;
    height: 100vh !important;
  }
}

// @import "./index.less";
</style>
