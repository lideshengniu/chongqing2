<template>
  <mars-pannel :visible="true" right="100" top="50"  >
    <a-space irection="horizontal" align="center">
      <mars-button @click="opentable()">远程勘查</mars-button>
    </a-space>

  </mars-pannel>
</template>
<script setup lang="ts">
import { useWidget } from "@mars/common/store/widget"

const { currentWidget, updateWidget, activate } = useWidget()

const opentable = () => {
// updateWidget("Survey-report", { show: true }
activate("Survey-report")
}
</script>
<style scoped lang='less'>

</style>
