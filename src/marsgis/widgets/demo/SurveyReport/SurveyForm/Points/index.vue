<template>
  <mars-dialog title="点位查询" width="750" left="50" bottom="20">
    <a-card>
      <a-table :columns="columns" :data-source="TableDatas" :rowSelection="rowSelection" rowKey="id">
        <template v-slot:bodyCell="{ column, record }">
          <template v-if="column.dataIndex == 'action'">
            <a-space direction="horizontal" style="width: 150px">
              <mars-button type="link">
                <mars-icon icon="move-one" color="#f2f2f2" class="icon-vertical-a" @click="flyto(record)" />
              </mars-button>
            </a-space>
          </template> </template
      ></a-table>
    </a-card>
  </mars-dialog>
</template>
<script lang="ts" setup>
import useStore from "@/store"
import * as mapWork from "./map"
import useLifecycle from "@mars/common/uses/use-lifecycle"
// 开启内部生命周期
useLifecycle(mapWork)
// 获取仓库
const { useForms } = useStore()
console.log(useForms.AllTableData, "useForms.AllTableData")
// table 数据
const TableDatas = ref([])
TableDatas.value = useForms.AllTableData
watch(
  () => useForms.AllTableData,
  (newVal, oldVal) => {
    // TableDatas.value.map((item) => {
    //   mapWork.addPoint(mapWork.graphicLayer, item.position, item.id)
    //   console.log(mapWork.graphicLayer, item.position, item.id, "mapWork.graphicLayer, item.position, item.id")
    //   return item
    // })
  }
)

const columns = [
  { title: "唯一标识", width: 0, dataIndex: "id", key: "id", ellipsis: true },
  { title: "名称", width: 100, dataIndex: "name", key: "id" },
  { title: "位置", width: 100, dataIndex: "position", key: "id" },
  { title: "操作", width: 100, dataIndex: "action", key: "id" }
]
type TableType = {
  id: string
  name: string
  position: number[]
}
interface TableItem {
  id: string
  name: string
}
// 选择 隐藏和显示的 key
const rowKeys = ref<string[]>()
rowKeys.value = TableDatas.value.map((item) => item.id)
// table rowSelection
const rowSelection = ref({
  hideSelectAll: true,
  hideDefaultSelections: true,
  selectedRowKeys: rowKeys,
  onChange: (selectedRowKeys: string[]) => {
    rowKeys.value = selectedRowKeys
  },
  onSelect: (record: TableItem, selected: boolean) => {
    mapWork.showHideArea(record.id, selected)
  }
})
// 定位到点
const flyto = (record) => {
  console.log("key", record)
  mapWork.flytoGraphic(record.id)
}
</script>
<style scoped lang="less"></style>
