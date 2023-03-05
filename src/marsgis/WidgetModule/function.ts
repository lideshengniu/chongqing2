import { Widget } from "@mars/common/store/widget"

const FunctionModule: Widget[] = [
  {
    component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/Function/index.vue"))),
    name: "FunctionAll",
    autoDisable: true
  },
  // 根据表单订点位 SurverForm子功能
  {
    component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/SurveyReport/SurveyForm/Points/index.vue"))),
    name: "Surveypoints",
    autoDisable: true
  }
]

export default FunctionModule
