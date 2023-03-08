<template>
  <mars-pannel :visible="true" left="10" top="200" width="170">
    <a-card title="功能" :bordered="false">
      <a-space direction="vertical">
        <mars-button style="width: 100%" @click="BasciFunction()">基本功能</mars-button>
        <mars-button style="width: 100%" @click="VisualFunction()">可视分析相关</mars-button>
        <mars-button style="width: 100%" @click="RemoteExploration()">远程勘查</mars-button>

        <!-- <mars-button >图层上绑定</mars-button>
      <mars-button >图层上解绑</mars-button>

      <mars-button >Graphic上绑定</mars-button>
      <mars-button >Graphic上解绑</mars-button> -->
      </a-space>
    </a-card>
  </mars-pannel>
</template>
<script lang="ts" setup>
import { useWidget } from "@mars/common/store/widget"
const { activate } = useWidget()
const BasciFunction = () => {
  activate("measure")
}
const VisualFunction = () => {
  activate("chose")
}
const RemoteExploration = () => {
  activate("Survey-report")
}
</script>
<style scoped lang="less">
:deep(.ant-card-head-title) {
  font: 35px solid;
}
</style>
