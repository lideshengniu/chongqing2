import router from "@/router"
import NProgress from "nprogress"
import useStore from "@/store"
import { ElMessage, ElNotification } from "element-plus"
const WhiteForm = ["/login"]
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  const { users } = useStore()
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  // 判断是否登录
  if (users.token) {
    // 如果登陆了···
    if (to.path.toLocaleLowerCase() === "/login") {
      //   next('/');
      ElNotification({
        title: "提示",
        message: "您已经登陆过啦~",
        type: "warning"
      })
      return "/"
    }
    next()
  } else {
    // 判断是否在白名单中 就允许进入
    // toLowerCase() 不管大小写
    if (WhiteForm.includes(to.path.toLowerCase())) {
      next()
    } else {
      // 如果没有登录
      ElNotification({
        title: "提示",
        message: "您还没有登录，请先登录！",
        type: "error"
      })
      next("/login")
    }
  }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})
