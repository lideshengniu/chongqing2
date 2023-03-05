import { App } from "vue"
import SvgIcon from "@/components/SvgIcon.vue"
import Hexagonalshape from "@/components/Hexagonalshape.vue"
export default {
  install(app: App) {
    app.component("SvgIcon", SvgIcon)
    app.component("Hexagonalshape", Hexagonalshape)
  }
}
