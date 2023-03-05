<template>
  <div class="container">
    <div class="container2">
      <ul class="left">
        <li class="word"><span class="title">可视域分析功能软件</span></li>
        <ul class="function">
          <li class="functions">
            <!-- <span>综合分析示例</span> -->
            <!-- <div class="styles"></div> -->
          </li>
          <li class="functions">
            <!-- <span>监测分析示例</span> -->
            <!-- <div class="styles"></div> -->
            <ul class="monitor">
              <!-- <li @click="OpenPoints">沉降明显处</li> -->
            </ul>
          </li>
          <li class="functions">
            <!-- <span>其他功能示例</span> -->

            <!-- <div class="styles"></div> -->
          </li>
        </ul>

        <li class="style1"></li>
        <li class="style2"></li>
        <li class="style3"></li>
      </ul>
      <ul class="right">
        <li class="wheather">
          <div class="word">
            <span class="chinese">中文</span>
          </div>
          <div class="icons">
            <SvgIcon name="ArrowDown" class="icon-svg"></SvgIcon>
            <SvgIcon name="cloudy" class="icon-cloudy"></SvgIcon>
          </div>
        </li>
        <li class="date">
          <div class="day">
            <span class="datess">{{ date }}</span>
          </div>
          <!-- <div class="time"><span v-text="Seconds"></span></div> -->
        </li>
        <li class="user">
          <SvgIcon name="person" class="icon-person"></SvgIcon>
          <span class="person">admin</span>
          <SvgIcon name="ArrowDown" class="Down"></SvgIcon>
          <div class="userdata">
            <li>个人中心</li>
            <li>修改密码</li>
            <li @click="leave()">退出登录</li>
          </div>
        </li>
      </ul>
    </div>
    <!-- <a-modal v-model="centerDialogVisible" title="是否退出" center class="note">
      <span class="message"> 你是否确定要退出？ </span>
      <template #footer>
        <span class="dialog-footer">
          <a-button @click="centerDialogVisible = false">取消</a-button>
          <a-button type="primary" @click="firm()"> 确认 </a-button>
        </span>
      </template>
    </a-modal> -->
    <a-modal v-model="centerDialogVisible" title="是否退出"  @ok="firm()" ok-text="确认"
      cancel-text="取消">
      <template #footer>
        <span class="dialog-footer">
          <a-button @click="centerDialogVisible = false">取消</a-button>
          <a-button type="primary" @click="firm()"> 确认 </a-button>
        </span>
      </template>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { Ref } from "vue"
import { getMonthDays, getSeconds } from "@/utils/date"
import { useWidget } from "@mars/common/store/widget"
const { activate } = useWidget()
const router = useRouter()
const route = useRoute()
const date: Ref<string> = ref<string>("")
setInterval(() => {
  date.value = getMonthDays()
}, 1000)
// const dates = computed(() => {
//   setTimeout(() => {
//     getMonthDays()
//   }, 1000)

// })
const Seconds: Ref<string> = ref<string>(getSeconds())
console.log(date.value)
// 退出登录
const centerDialogVisible = ref(false)
const leave = () => {
  centerDialogVisible.value = true
}
const firm = () => {
  router.push("./login")
}
// 打开 dangerous points
const OpenPoints = () => {
  activate("danger-points")
}
</script>
<style scoped lang="less">
@import "./index.less";
</style>
