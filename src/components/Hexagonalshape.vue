<template>
  <div class="boxs"></div>
</template>
<script lang='ts' setup>
import fsize from "@/utils/echartfont"
type Props = {
  width: number
  left: number
  degree: string
  color: string
}
const props = withDefaults(defineProps<Props>(), { width: 0, left: 0, degree: "0deg", color: "rgb(0, 255, 149)" })
console.log(props.width, "sasd")
const left = ref(fsize(props.left) + "px")
const width = ref(fsize(props.width) + "px")
</script>
<style scoped lang='less'>
.boxs {
  // top: 30px;
  position: absolute;
  width: v-bind("width");
  height: 20px;
  border-left: 5px solid;
  border-right: 5px solid;
  border-color: v-bind("props.color");
  // border-color: rgb(92, 228, 224);
  left: v-bind("left");
  transform: rotate(v-bind("props.degree"));
  z-index: -1;
}
</style>
