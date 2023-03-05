import { createRouter, createWebHashHistory, RouteRecord, RouteRecordRaw } from "vue-router"
import layout from "@/views/Layout/index.vue"
const routes: RouteRecordRaw[] = [

  {
    path: "/",
    name: "home",
    component: () => import("@/views/Layout/index.vue"),
    meta: { title: "登录" }
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
