<template>
  <mars-pannel :visible="visible" title="我的弹窗" width="800" right="120" top="150" bottom="40" zIndex="100">
    <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rule" @finish="finish">
      <a-row :size="size" type="flex" justify="center" :gutter="[0, 16]">
        <a-col :span="8"
          ><a-form-item label="名称" name="name"><a-input style="width: 150px" v-model:value="formState.name" /></a-form-item
        ></a-col>
        <a-col :span="8"
          ><a-form-item label="类型" name="type"><a-input style="width: 150px" v-model:value="formState.type" /></a-form-item
        ></a-col>
      </a-row>
      <a-row :size="size" type="flex" justify="center" :gutter="[0, 16]">
        <a-col :span="8"
          ><a-form-item label="位置信息" name="geographicInfo"><a-input style="width: 120px" v-model:value="formState.geographicInfo" /></a-form-item
        ></a-col>
        <a-col :span="8"
          ><a-form-item label="中心经度" name="centerLongitude"
            ><a-input style="width: 140px" v-model:value="formState.centerLongitude" /></a-form-item
        ></a-col>
        <a-col :span="8"
          ><a-form-item label="中心维度" name="centerLatitude"><a-input style="width: 120px" v-model:value="formState.centerLatitude" /></a-form-item
        ></a-col>
        <!-- <a-col :span="3"><a-button>标出点位</a-button></a-col> -->
      </a-row>
      <a-form-item label="地物信息全局" name="groundFeatureUrl">
        <a-row :size="size" style="height: 70px" type="flex" justify="center" :gutter="[0, 16]"
          ><a-col :span="8">
            <a-upload list-type="picture" :file-list="fileList" :multiple="false" @remove="handleRemove" :before-upload="berforeUploads">
              <a-button> upload </a-button></a-upload
            >
          </a-col></a-row
        >
      </a-form-item>
      <a-form-item label="地物信息(单独地物)">
        <a-row :size="size" type="flex" justify="center" :gutter="[15, 16]" style="height: 70px"
          ><a-col :span="8">
            <a-form-item label="变形破坏的建构筑物" :name="['groundFeature', 'anomalous']"
              ><a-input style="width: 200px" v-model:value="formState.groundFeature.anomalous" /></a-form-item></a-col
        ></a-row>
        <a-row :size="size" type="flex" justify="space-around" :gutter="[0, 16]" style="height: 50px">
          <a-col :span="8"
            ><a-form-item label="人工护坡" :name="['groundFeature', 'artificial']"
              ><a-input style="width: 140px" v-model:value="formState.groundFeature.artificial" /></a-form-item
          ></a-col>
          <a-col :span="8"
            ><a-form-item label="梯田" :name="['groundFeature', 'terrace']"
              ><a-input style="width: 140px" v-model:value="formState.groundFeature.terrace" /></a-form-item></a-col></a-row
      ></a-form-item>
      <a-form-item label="坡度(°)">
        <a-row :size="size" type="flex" justify="center" :gutter="[0, 16]"
          ><a-col :span="8"
            ><a-form-item label="单一坡度" :name="['slopeInfo', 'slope']"
              ><a-input style="width: 140px" v-model:value="formState.slopeInfo.slope" /></a-form-item
          ></a-col>
          <a-col :span="8"
            ><a-form-item label="多种坡度" :name="['slopeInfo', 'multipleSlopes']"
              ><a-upload list-type="picture" :file-list="multipleSlopes" @remove="handleRemultipleSlopes" :before-upload="beforeslopesUpload">
                <a-button>
                  <upload-outlined></upload-outlined>
                  Click to Upload
                </a-button>
              </a-upload></a-form-item
            ></a-col
          ></a-row
        ></a-form-item
      >
      <a-form-item label="坡向(°)">
        <a-row :size="size" type="flex" justify="center" :gutter="[0, 16]"
          ><a-col :span="8"
            ><a-form-item label="单一坡向" :name="['slopeInfo', 'singleAspect']"
              ><a-input style="width: 140px" v-model:value="formState.slopeInfo.singleAspect" /></a-form-item
          ></a-col>
          <a-col :span="8"
            ><a-form-item label="多种坡向" :name="['slopeInfo', 'multipleSlopeDirections']">
              <!-- <a-input style="width: 140px" v-model:value="formState.slopeInfo.multipleSlopeDirections" /> -->
              <a-upload list-type="picture" :file-list="allaspect" @remove="handleRemoveallaspect" :before-upload="beforeaspectUpload">
                <a-button>
                  <upload-outlined></upload-outlined>
                  Click to Upload
                </a-button>
              </a-upload>
            </a-form-item></a-col
          >
        </a-row></a-form-item
      >
      <a-form-item label="范围">
        <a-space :size="15">
          <a-row :size="size" type="flex" justify="space-around" :gutter="[30, 16]"
            ><a-col :span="8"
              ><a-form-item label="前缘高程" :name="['range', 'frontHeight']"
                ><a-input style="width: 100px" v-model:value="formState.range.frontHeight" /></a-form-item
            ></a-col>
            <a-col :span="10"
              ><a-form-item label="后缘高程" :name="['range', 'rearHeight']"
                ><a-input style="width: 100px" v-model:value="formState.range.rearHeight" /></a-form-item
            ></a-col>
          </a-row>

          <a-row :size="size" type="flex" justify="space-around" :gutter="[0, 16]"
            ><a-col :span="15"
              ><a-form-item label="前缘宽度" :name="['range', 'frontWidth']"
                ><a-input style="width: 100px" v-model:value="formState.range.frontWidth" /></a-form-item
            ></a-col>
            <a-col :span="8"
              ><a-form-item label="后缘宽度" :name="['range', 'rearWidth']"
                ><a-input style="width: 100px" v-model:value="formState.range.rearWidth" /></a-form-item
            ></a-col>
          </a-row>
        </a-space>
        <a-row>
          <a-col :span="8"
            ><a-form-item label="前后缘高程差" :name="['range', 'diff']"
              ><a-input style="width: 100px" v-model:value="formState.range.diff" /></a-form-item
          ></a-col>
          <a-col :span="8"
            ><a-form-item label="范围" :name="['range', 'area']"><a-input style="width: 100px" v-model:value="formState.range.area" /></a-form-item
          ></a-col>
        </a-row>
        <a-row>
          <a-col :span="6" style="border: 3px solid black; text-align: center">位置/坐标</a-col>
          <a-col :span="6" style="border: 3px solid black">经度(°)</a-col>
          <a-col :span="6" style="border: 3px solid black">纬度(°)</a-col>
          <a-col :span="6" style="border: 3px solid black">高程(m)</a-col></a-row
        >
        <a-row :size="size" type="flex" justify="center" :gutter="[0, 16]"
          ><a-col :span="6">西北角</a-col>
          <a-col :span="6"
            ><a-form-item :name="['coordinate', 'northwestCorner', 'longitude']"
              ><a-input style="width: 140px" v-model:value="formState.coordinate.northwestCorner.longitude" /></a-form-item
          ></a-col>
          <a-col :span="6"
            ><a-form-item :name="['coordinate', 'northwestCorner', 'latitude']"
              ><a-input style="width: 140px" v-model:value="formState.coordinate.northwestCorner.latitude" /></a-form-item
          ></a-col>
          <a-col :span="6"
            ><a-form-item :name="['coordinate', 'northwestCorner', 'height']"
              ><a-input style="width: 140px" v-model:value="formState.coordinate.northwestCorner.height" /></a-form-item
          ></a-col>
        </a-row>
        <a-row :size="size" type="flex" justify="center" :gutter="[0, 16]"
          ><a-col :span="6">东北角</a-col>
          <a-col :span="6"
            ><a-form-item :name="['coordinate', 'northwestCorner', 'longitude']"
              ><a-input style="width: 140px" v-model:value="formState.coordinate.northeastCorner.longitude" /></a-form-item
          ></a-col>
          <a-col :span="6"
            ><a-form-item :name="['coordinate', 'northwestCorner', 'latitude']"
              ><a-input style="width: 140px" v-model:value="formState.coordinate.northeastCorner.latitude" /></a-form-item
          ></a-col>
          <a-col :span="6"
            ><a-form-item :name="['coordinate', 'northwestCorner', 'height']"
              ><a-input style="width: 140px" v-model:value="formState.coordinate.northeastCorner.height" /></a-form-item
          ></a-col>
        </a-row>
        <a-row :size="size" type="flex" justify="center" :gutter="[0, 16]"
          ><a-col :span="6">西南角</a-col>
          <a-col :span="6"
            ><a-form-item :name="['coordinate', 'southwestCorner', 'longitude']"
              ><a-input style="width: 140px" v-model:value="formState.coordinate.southwestCorner.longitude" /></a-form-item
          ></a-col>
          <a-col :span="6"
            ><a-form-item :name="['coordinate', 'southwestCorner', 'latitude']"
              ><a-input style="width: 140px" v-model:value="formState.coordinate.southwestCorner.latitude" /></a-form-item
          ></a-col>
          <a-col :span="6"
            ><a-form-item :name="['coordinate', 'southwestCorner', 'height']"
              ><a-input style="width: 140px" v-model:value="formState.coordinate.southwestCorner.height" /></a-form-item
          ></a-col>
        </a-row>
        <a-row :size="size" type="flex" justify="center" :gutter="[0, 16]"
          ><a-col :span="6">东南角</a-col>
          <a-col :span="6"
            ><a-form-item :name="['coordinate', 'southeastCorner', 'longitude']"
              ><a-input style="width: 140px" v-model:value="formState.coordinate.southeastCorner.longitude" /></a-form-item
          ></a-col>
          <a-col :span="6"
            ><a-form-item :name="['coordinate', 'southeastCorner', 'latitude']"
              ><a-input style="width: 140px" v-model:value="formState.coordinate.southeastCorner.latitude" /></a-form-item
          ></a-col>
          <a-col :span="6"
            ><a-form-item :name="['coordinate', 'southeastCorner', 'height']"
              ><a-input style="width: 140px" v-model:value="formState.coordinate.southeastCorner.height" /></a-form-item
          ></a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="地质环境条件" name="geology" :wrapper-col="{ span: 5, offset: 5 }"
        ><a-input style="width: 350px" v-model:value="formState.geology"
      /></a-form-item>

      <a-form-item label="kml" name="fileUrl" :wrapper-col="{ span: 5, offset: 5 }">
        <!-- <a-input style="width: 350px" v-model:value="formState.coordinate.fileUrl" /> -->
        <!-- <a-upload></a-upload> -->
        <a-upload :file-list="kmls" @remove="handleKml" :before-upload="beforekmlUpload" name="file">
          <a-button>
            <upload-outlined></upload-outlined>
            Click to Upload
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 10 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px" @click="resetForm">Cancel</a-button>
      </a-form-item>
    </a-form></mars-pannel
  >
</template>
<script lang="ts" setup>
import type { PropType } from "vue"
import { ref, reactive, markRaw, computed, nextTick, UnwrapRef, Ref, useAttrs, toRaw } from "vue"
import { useWidget } from "@mars/common/store/widget"
import useStore from "@/store"
import { AllForm } from "@/api/types/prospecting"
import { queryForms, addPhoto, addkml } from "@/api/prospecting"

import { beforeUpdates, handleRemoves } from "@/utils/UploadPhoto"
import { file } from "@babel/types"
import rules from "./rule"
const { activate, disable, isActivate, updateWidget, currentWidget } = useWidget()
const visible: Ref<boolean> = ref(false)
const { useForm, useForms } = useStore()
const size = ref("default")
const labelCol = ref({ span: 0 })
const wrapperCol = ref({ span: 0 })
const formRef = ref()
interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: string
  url?: string
  preview?: string
  originFileObj?: any
  file?: string | Blob
}
// interface EmitsType {
//   (e: "update:data", value: []): void
//   (e: "update:visible", value: boolean): void
//   (e: "show", value: boolean): void
//   (e: "adminId", value: number): number
// }
const formState: Ref<AllForm> = ref({
  name: "0",
  id: "" || undefined,
  type: "0",
  geographicInfo: "", // 位置信息
  centerLongitude: 0, // 中心经度
  centerLatitude: 0, // 中心维度
  groundFeatureUrl: "",
  groundFeature: {
    // 地物信息(单独地物)
    artificial: "0", // 人工护坡
    anomalous: "0", // 被破坏的
    terrace: "0" // 梯田
  },
  slopeInfo: {
    slope: "0", // 单一坡度
    multipleSlopes: "0", // 多种坡度
    singleAspect: "0", // 单一坡向
    multipleSlopeDirections: "0" // 多种坡向
  },
  range: {
    frontHeight: 0, // 前缘高程
    rearHeight: 0, // 后缘高程
    frontWidth: 0, // 前缘宽度
    rearWidth: 0, // 后缘宽度
    diff: 0, // 前后缘高程差
    area: 0 // 范围
  },
  coordinate: {
    northwestCorner: {
      longitude: "0",
      latitude: "0",
      height: "0"
    },
    northeastCorner: {
      longitude: "0",
      latitude: "0",
      height: "0"
    },
    southwestCorner: {
      longitude: "0",
      latitude: "0",
      height: "0"
    },
    southeastCorner: {
      longitude: "0",
      latitude: "0",
      height: "0"
    },
    fileUrl: "0" // kml
  },
  geology: "0"
})
const rule = rules as any
// 获取groundFeatureUrl 的图片<FileItem[]>
const fileList = ref([])
const berforeUploads = async (file) => {
  formState.value.groundFeatureUrl = await beforeUpdates(file, fileList)
  return false
}

const handleRemove = (file: FileItem) => {
  handleRemoves(file, fileList, formState, "groundFeatureUrl")
}
// ---------------------------------------
// 获取多方向的图片
const allaspect = ref([])
const beforeaspectUpload = async (file) => {
  formState.value.slopeInfo.multipleSlopeDirections = await beforeUpdates(file, allaspect)
  return false
}
const handleRemoveallaspect = (file: FileItem) => {
  handleRemoves(file, allaspect, formState, "multipleSlopeDirections")
}
// 多角度图片上传
const multipleSlopes = ref([])
const beforeslopesUpload = async (file) => {
  formState.value.slopeInfo.multipleSlopes = await beforeUpdates(file, multipleSlopes)
}
const handleRemultipleSlopes = (file: FileItem) => {
  handleRemoves(file, multipleSlopes, formState, "multipleSlopes")
  console.log(formState.value.slopeInfo.multipleSlopes, "fileList2")
}
// 上传kml
const kmls = ref([])
const beforekmlUpload = async (file) => {
  console.log(file, "45454545")
  const data = await addkml(file)

  formState.value.coordinate.fileUrl = data.replace("http://localhost:15130/", "http://1.14.72.127/")
  if (kmls.value.length === 1) {
    kmls.value = [
      {
        uid: "-1",
        name: `${file.name}.kml`,
        status: "done",
        url: data.replace("http://localhost:15130/", "http://1.14.72.127/")
      }
    ]
  } else {
    kmls.value.push({
      uid: "-1",
      name: `${file.name}.kml`,
      status: "done",
      url: data.replace("http://localhost:15130/", "http://1.14.72.127/")
    })
  }
  console.log(formState.value.coordinate.fileUrl, "formState.value.coordinate.fileUrl")
  // getFile(formState.value.coordinate.fileUrl, "hh")
  // formState.value.coordinate.fileUrl = await beforeUpdates(file, kmls)
}

const handleKml = (file) => {
  handleRemoves(file, kmls, formState, "x")
}
// const show: Ref<boolean> = ref(false)
function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}
// 提交
const onSubmit = async () => {
  formRef.value
    .validate()
    .then(() => {
      if (formState.value.id) {
        console.log(JSON.stringify(formState.value), "heihei")
        useForms.updatas(JSON.parse(JSON.stringify(formState.value)))
      } else {
        useForms.addforms(JSON.parse(JSON.stringify(formState.value)))
      }
      const o = JSON.parse(JSON.stringify(formState.value))
      formRef.value.resetFields()
      visible.value = false
    })
    .finally(async () => {
      await useForms.getform()
      if (isActivate("Surveypoints")) {
        disable("Surveypoints")
      }
    })
    .catch((error) => {
      console.log("error", error)
    })
}
// 修改和增加
currentWidget.onUpdate(async ({ id, show }) => {
  visible.value = show
  console.log(id, "id")

  if (id || id === 0) {
    const tabledatas = await queryForms(id)
    fileList.value = [
      {
        uid: "-1",
        name: "xxx.png",
        status: "done",
        url: tabledatas.groundFeatureUrl
      }
    ]

    multipleSlopes.value = [
      {
        uid: "-1",
        name: "xxx.png",
        status: "done",
        url: tabledatas.slopeInfo.multipleSlopes
      }
    ]
    allaspect.value = [
      {
        uid: "-1",
        name: "xxx.png",
        status: "done",
        url: tabledatas.slopeInfo.multipleSlopeDirections
      }
    ]
    kmls.value = [
      {
        uid: "-1",
        name: "xxx.kml",
        status: "done",
        url: formState.value.coordinate.fileUrl
      }
    ]

    // delete tabledatas.id
    console.log(tabledatas, "tabledatas")
    formState.value = tabledatas
  } else {
    fileList.value = []
    multipleSlopes.value = []
    allaspect.value = []
    kmls.value = []
    formState.value = {
      name: "0",
      id: undefined,
      type: "0",
      geographicInfo: "", // 位置信息
      centerLongitude: 0, // 中心经度
      centerLatitude: 0, // 中心维度
      groundFeatureUrl: "",
      groundFeature: {
        // 地物信息(单独地物)
        artificial: "0", // 人工护坡
        anomalous: "0", // 被破坏的
        terrace: "0" // 梯田
      },
      slopeInfo: {
        slope: "0", // 单一坡度
        multipleSlopes: "0", // 多种坡度
        singleAspect: "0", // 单一坡向
        multipleSlopeDirections: "0" // 多种坡向
      },
      range: {
        frontHeight: 0, // 前缘高程
        rearHeight: 0, // 后缘高程
        frontWidth: 0, // 前缘宽度
        rearWidth: 0, // 后缘宽度
        diff: 0, // 前后缘高程差
        area: 0 // 范围
      },
      coordinate: {
        northwestCorner: {
          longitude: "0",
          latitude: "0",
          height: "0"
        },
        northeastCorner: {
          longitude: "0",
          latitude: "0",
          height: "0"
        },
        southwestCorner: {
          longitude: "0",
          latitude: "0",
          height: "0"
        },
        southeastCorner: {
          longitude: "0",
          latitude: "0",
          height: "0"
        },

        fileUrl: "0" // kml
      },
      geology: "0"
    }
  }
})
const finish = () => {
  alert("nihao")
}

// 重置表单
const resetForm = () => {
  formRef.value.resetFields()
  visible.value = false
}
</script>
<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<style scoped lang="less">
.ss {
  width: 100%;
  // background-color: red;
  height: 100%;
}
:deep(.ant-button) {
  background: rgba(18, 127, 224, 0.93);
}
</style>
