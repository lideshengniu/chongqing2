<template>
  <mars-dialog class="mainss" title="我的弹窗" right="500" top="40" bottom="400" v-bind="attrs" :visible="visible" width="700">
    <a-card title="添加信息" style="width: auto; opacity: 0.9">
      <template #extra>
        <mars-button class="small-btn" @click="addForm()">新添加表单</mars-button
        ><mars-button class="small-btn" @click="openpoint()">打开位置查询表</mars-button></template
      >
    </a-card>
    <a-card>
      <a-table :columns="columns" :data-source="TableDatas">
        <template v-slot:bodyCell="{ column, record }">
          <template v-if="column.dataIndex == 'action'">
            <a-space direction="horizontal" style="width: 150px">
              <mars-button class="small-btn" @click="showForm(record)">修改</mars-button>
              <mars-button class="small-btn" @click="handleExportExcel(record)"> 导出表格</mars-button>
              <mars-button class="small-btn" @click="deleteForm(record)"> 删除</mars-button>
              <a-modal ref="alertModal" title="是否删除" v-model:visible="visibleAlert" :confirm-loading="confirmLoading" @ok="handleOk(record)">
                <p>{{ modalText }}</p>
              </a-modal>
            </a-space>
          </template>
        </template>
      </a-table></a-card
    >
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, useAttrs, Ref, watch } from "vue"
import * as mapWork from "./map"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import { useWidget } from "@mars/common/store/widget"
import surveryForm from "./SurveyForm/surveyForm.vue"
// 表格
import { AllForm } from "@/api/types/prospecting"
import { deleteForms } from "@/api/prospecting"
import useStore from "@/store"
import { jsonToExcel } from "@/utils/export-to-excel"

// 获得 表单
const attrs = useAttrs()
const { useForm, useForms } = useStore()
const TableDatas = ref([])
onMounted(() => {
  useForms.getform()
})
watch(
  () => useForms.AllTableData,
  (newVal, oldVal) => {
    nextTick(() => {
      TableDatas.value = newVal
    })

    console.log(newVal, "neww")
  }
)
const visibleAlert = ref<boolean>(false)
const confirmLoading = ref<boolean>(false)
const modalText = ref<string>("Content of the modal")
const alertModal = ref()
const handleOk = async (record) => {
  modalText.value = "The modal will be closed after two seconds"
  confirmLoading.value = true
  deleteForms(record.id)
}

const visible: Ref<boolean> = ref(true)
const columns = [
  { title: "唯一标识", width: 0, dataIndex: "id", key: "id", ellipsis: true },
  { title: "名称", width: 100, dataIndex: "name", key: "name" },
  { title: "类型", width: 100, dataIndex: "type", key: "type" },
  {
    title: "操作1",
    width: 100,
    dataIndex: "action",
    key: "action"
  }
]
interface DataItem {
  key: string
  name: string
  age: number
  address: string
}
const { currentWidget, updateWidget, activate } = useWidget()
useLifecycle(mapWork)

const couter = ref(10)
onMounted(() => {
  setTimeout(() => {
    couter.value = 100
  }, 2000)
})
const showForm = (record) => {
  console.log(record.id, "ID")
  updateWidget("surveyForm", { id: record.id, show: true })
}
const addForm = () => {
  updateWidget("surveyForm", { show: true, id: undefined })
}
const openpoint = () => {
  activate("Surveypoints")
}
const handleExportExcel = async (record) => {
  console.log(record, "ss/////////")
  const Data: AllForm = await useForms.queryforms(record.id)
  console.log(Data, "datass22//")

  jsonToExcel({
    data: Data as any,
    header: {
      id: "编号",
      name: "名称",
      type: "类型",
      geographicInfo: "地理位置",
      centerLongitude: "中心精度",
      centerLatitude: "中心维度",
      groundFeatureUrl: "地物信息(全局)",
      artificial: "变形破坏的建构筑物",
      anomalous: "人工护坡",
      terrace: "梯田",
      slope: "第一坡度",
      multipleSlopes: "多种坡度",
      singleAspect: "单一坡向",
      multipleSlopeDirections: "多种坡向",
      frontHeight: "前缘高程",
      rearHeight: "后缘高程",
      frontWidth: "前缘宽度",
      rearWidth: "后缘宽度",
      diff: "前后缘高度差",
      area: "面积",
      northwestCornerlongitude: "西北(经度)",
      northwestCornerlatitude: "西北(维度)",
      northwestCornerheight: "西北(高程)",
      //
      northeastCornerlongitude: "东北(经度)",
      northeastCornerlatitude: "东北(维度)",
      northeastCornerheight: "东北(高程)",
      //
      southwestCornerlongitude: "西南(经度)",
      southwestCornerlatitude: "西南(维度)",
      southwestCornerheight: "西南(高程)",
      //
      southeastCornerlongitude: "东南(经度)",
      southeastCornerlatitude: "东南(维度)",
      southeastCornerheight: "东南(高程)",
      geology: "地质环境条件",
      fileUrl: "kml/ovobj"
    },
    fileName: "测试.xlsx",
    bookType: "xlsx"
  })
}
// 删除

const deleteForm = async (record) => {
  visibleAlert.value = true
  console.log(alertModal.value, "@@@@@@@")
}
</script>
<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<style lang="less">
.mainss {
  position: relative;

  .Forms {
    position: absolute;
    width: 500px;
    height: 500px;
    left: -100px;
    background-color: red !important;
  }
}
</style>
