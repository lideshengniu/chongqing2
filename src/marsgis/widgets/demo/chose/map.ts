import * as mars3d from "mars3d"

const Cesium = mars3d.Cesium
export let map: mars3d.Map // mars3d.Map三维地图对象
export let graphicLayer
const mapOptions = {
  scene: {
    // center: { lat: 28.440007, lng: 119.48322, alt: 424, heading: 282, pitch: -56 },
    fxaa: true, // 不开启抗锯齿，可视域会闪烁
    globe: {
      depthTestAgainstTerrain: true // 不加无法投射到地形上
    }
  }
}
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
// const mapOptions = {
//   scene: {
//     center: { lat: 30.715648, lng: 116.300527, alt: 10727, heading: 3, pitch: -25 }
//   }
// }

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)
  // // graphicLayer = map.
  // map.setSceneOptions(mapOptions.scene)

  // globalNotify("功能和已知问题提示", "(1) 依赖cesium底层接口，少数情况下不够准确", { duration: null })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map.graphicLayer.clear()
  // sightline.remove(true)
  map = null
}
export function getManagerLayer() {
  return graphicLayer
}
