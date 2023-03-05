<template>
  <KeepAlive>
    <div :style="{ height: 100 + '%' }">
      <MainView />
    </div>
  </KeepAlive>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue"
import MainView from "@mars/components/mars-work/main-view.vue"

const height = ref(100)

onMounted(() => {
  height.value = document.body.clientHeight - 80
})

window.onresize = function () {
  height.value = document.body.clientHeight - 80
}
</script>
<style lang="less"></style>
