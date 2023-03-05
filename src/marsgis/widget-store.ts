/**
 * index页面的widget配置
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2022-02-19
 */
import { defineAsyncComponent, markRaw } from "vue"
import { WidgetState } from "@mars/common/store/widget"
import { StoreOptions } from "vuex"
import FunctionModule from "./WidgetModule/function"
const store: StoreOptions<WidgetState> = {
  state: {
    widgets: [
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/query-poi/index.vue"))),
        name: "query-poi",
        autoDisable: true
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/toolbar/index.vue"))),
        name: "toolbar",
        autoDisable: true
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-basemap/index.vue"))),
        name: "manage-basemap",
        group: "manage"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/index.vue"))),
        name: "manage-layers",
        group: "manage",
        disableOther: ["roamLine"]
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/layer-tree.vue"))),
        name: "layer-tree"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/layer-picture-heatmap.vue"))),
        name: "layer-picture-heatmap"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/layer-picture-guihua.vue"))),
        name: "layer-picture-guihua"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/location-point/index.vue"))),
        name: "location-point",
        group: "tools"
      },
      // 通视
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/view-shed/index.vue"))),
        name: "viewshed",
        group: "chose1"
      },
      // 测量
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/measure/index.vue"))),
        name: "measure",
        group: "measure"
      },

      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/Intervisibility/index.vue"))),
        name: "Intervisibility",
        group: "chose1"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/my-dialog/index.vue"))),
        name: "myDialog",
        group: "myDialog"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/chose/index.vue"))),
        name: "chose"
        // group: "chose"
        // "Intervisibility", "viewshed"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/SurveyReport/index.vue"))),
        name: "Survey-report"
        // group: "chose"
        // "Intervisibility", "viewshed"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@/marsgis/widgets/demo/SurveyReport/SurveyForm/surveyForm.vue"))),
        name: "surveyForm"

        // group: "chose"
        // "Intervisibility", "viewshed"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/SurveyReport/RemoteExploration/index.vue"))),
        name: "RemoteExploration"
        // group: "chose"
        // "Intervisibility", "viewshed"
      },
      ...FunctionModule
    ],
    openAtStart: ["query-poi", "toolbar", "surveyForm", "FunctionAll"]
  }
}

export default store
