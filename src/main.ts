import { createApp } from "vue"

import App from "./App.vue"
// import { store } from "@/store"
import router from "./router"
import store from "@mars/widget-store"
import "nprogress/nprogress.css"
import Components from "./components/index"
import NProgress from "nprogress"
import "virtual:svg-icons-register"
import { createPinia } from "pinia"
import { injectState, key } from "@mars/common/store/widget"
import MarsUIInstall from "./marsgis/install/index"
import "./styles/index.less"
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 300, // 速度
  showSpinner: false, // 是否显示加载条的小圆圈
  trickleSpeed: 200, // 自动递增间隔
  minimum: 1 // 最小百分比
})
const Piniastore = createPinia()
const app = createApp(App)
// app.use(MYUI)

app.use(Components)
app.use(router)
app.use(MarsUIInstall)
app.use(injectState(store), key)
app.use(Piniastore)
app.mount("#app")
