<template>
  <mars-dialog :visible="true" left="500" top="15" width="450px" title="数据分析">
    <a-space irection="horizontal">
      <span class="mars-pannel-item-label">视域分析:</span>
      <mars-button @click="Intervisibility()">通视分析</mars-button>
      <mars-button @click="openviewshed()">可视域分析</mars-button>
      <!-- <mars-button @click="3">清除</mars-button> -->
    </a-space>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">数据导出:</span>

        <a-upload
          :multiple="false"
          name="file"
          accept="json,geojson,kml"
          :file-list="fileList"
          :showUploadList="false"
          :supportServerRender="true"
          :beforeUpload="() => false"
          @change="onClickImpFile"
        >
          <mars-button title="打开GeoJSON">
            <mars-icon icon="folder-open" class="icon-vertical-a" />
            打开
          </mars-button>
        </a-upload>

        <mars-button @click="expGeoJSONFile" title="保存GeoJSON">
          <mars-icon icon="save-one" class="icon-vertical-a" />
          导出GeoJSON
        </mars-button>

        <mars-button @click="expJSONFile" title="导出构造参数Json"> 导出构造JSON </mars-button>
      </a-space>
    </div>
  </mars-dialog>

  <!-- <location-to /> -->
</template>

<script setup lang="ts">
import { useWidget } from "@mars/common/store/widget"
import * as kgUtil from "kml-geojson"
import { ref, reactive, onMounted, markRaw } from "vue"
import * as mapWork from "./map"
import * as mars3d from "mars3d"
import * as turf from "@turf/turf"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import { $alert, $message, $showLoading, $hideLoading } from "@mars/components/mars-ui/index"
useLifecycle(mapWork)
const { activate } = useWidget()
const openviewshed = () => {
  activate("viewshed")
}
function getManagerLayer() {
  if (mapWork.getManagerLayer) {
    return mapWork.getManagerLayer()
  }
  return mapWork.graphicLayer
}
const Intervisibility = () => {
  activate("Intervisibility")
}
const expJSONFile = () => {
  const graphicLayer = getManagerLayer()

  if (graphicLayer.length === 0) {
    $message("当前没有标注任何数据，无需保存！")
    return
  }
  const geojson = graphicLayer.toJSON()
  mars3d.Util.downloadFile("矢量数据构造参数.json", JSON.stringify(geojson))
}
// 保存geojson
const expGeoJSONFile = () => {
  const graphicLayer = getManagerLayer()

  if (graphicLayer.length === 0) {
    $message("当前没有标注任何数据，无需保存！")
    return
  }
  const geojson = graphicLayer.toGeoJSON()
  mars3d.Util.downloadFile("矢量数据GeoJSON.json", JSON.stringify(geojson))
}
const filess = ref(0)
const onClickImpFile = (info: any) => {
  filess.value++
  const graphicLayer = getManagerLayer()
  const item = info.file
  const fileName = item.name
  const fileType = fileName?.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase()

  if (fileType === "json" || fileType === "geojson") {
    const reader = new FileReader()
    reader.readAsText(item, "UTF-8")
    reader.onloadend = function (e) {
      const geojson = JSON.parse(this.result as string)
      console.log("打开了json文件", geojson)

      if (geojson.type === "graphic" && geojson.data) {
        graphicLayer.addGraphic(geojson.data)
        graphicLayer.flyTo()
      } else {
        graphicLayer.loadGeoJSON(geojson, { flyTo: true })
      }
    }
  } else if (fileType === "kml") {
    const reader = new FileReader()
    reader.readAsText(item, "UTF-8")
    reader.onloadend = function (e) {
      const strkml = e.target.result
      console.log(strkml, "strkml")
      const reg = /<coordinates>(.*?)<\/coordinates>/g
      const res = reg.exec(strkml as string)
      console.log(res, "ressssss")
      // const positions = res[1].split(" ")
      const arr = []
      // for (let i = 0; i < positions.length - 1; i++) {
      //   const graphicLayer = getManagerLayer()
      //   const element = positions[i]
      //   const arr1 = element.split(",")
      //   const arr2 = [Number(arr1[0]), Number(arr1[1])]
      //   // mapWork.addDrawGraphic(graphicLayer, arr2, `文件${filess.value}:${i}`)
      //   mapWork.addDemoGraphic(graphicLayer, arr2, i)
      //   // arr.push(arr1)
      //   console.log(arr2, "arr1")
      // }
      console.log(res, "strkml")
      kgUtil.toGeoJSON(strkml).then((geojson) => {
        console.log("kml2geojson转换结果为", geojson)
        geojson = simplifyGeoJSON(geojson)
        console.log(geojson, "geojson")
        graphicLayer.loadGeoJSON(geojson, {
          flyTo: true,
          style: {
            clampToGround: true
          }
          // show: true
        })
      })
    }
  } else if (fileType === "kmz") {
    // 加载input文件控件的二进制流

    kgUtil.toGeoJSON(item).then((geojson) => {
      console.log("kmz2geojson", geojson)

      graphicLayer.loadGeoJSON(geojson, {
        flyTo: true
      })
    })
  } else {
    $message("暂不支持 " + fileType + " 文件类型的数据！")
  }
}
function simplifyGeoJSON(geojson) {
  try {
    geojson = turf.simplify(geojson, { tolerance: 0.000001, highQuality: true, mutate: true })
  } catch (e) {
    //
  }
  return geojson
}
const fileList = ref([])
</script>

<style scoped lang="less">
// .ant-space {
//   display: grid;
// }
</style>
