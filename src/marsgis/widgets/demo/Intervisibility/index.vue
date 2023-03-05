<template>
  <mars-dialog :visible="true" left="10" top="300">
    <a-space>
      <mars-button @click="drawLine">通视分析</mars-button>
      <mars-button @click="drawCircle">圆形通视分析</mars-button>
      <mars-button @click="clearAll">清除</mars-button>
    </a-space>
  </mars-dialog>

  <!-- <location-to /> -->
</template>

<script setup lang="ts">
// import LocationTo from "@mars/components/mars-sample/location-to.vue"
import * as mapWork from "./map.js"
import useLifecycle from "@mars/common/uses/use-lifecycle"
useLifecycle(mapWork)
// 通视分析
const drawLine = () => {
  mapWork.drawLine()
}
// 圆形通视分析
const drawCircle = () => {
  mapWork.drawCircle()
}

// 清除
const clearAll = () => {
  mapWork.clearAll()
}
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
