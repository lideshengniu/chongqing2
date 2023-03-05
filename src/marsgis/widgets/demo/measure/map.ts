import * as mars3d from "mars3d"

import { $hideLoading, $showLoading } from "@mars/components/mars-ui/mars-loading"
export let map
const Cesium = mars3d.Cesium
let measure
const compassoptions = {
  top: "150px",
  left: "5px"
}

export function onMounted(mapInstance) {
  map = mapInstance
  // const compass = new mars3d.control.Compass({
  //   top: "150px",
  //   left: "5px"
  // })
  console.log("compasscompass")
  // map.addControl(compass)
  addMeasure()
  // map.controls.compass({
  //   top: "150px",
  //   left: "5px"
  // })
}
export function onUnmounted() {
  map = null
}
function addMeasure() {
  measure = new mars3d.thing.Measure({
    label: {
      hasEdit: true,
      color: "#ffffff",
      font_family: "楷体",
      font_size: 20,
      background: true,
      backgroundColor: "red"
    }
  })
  map.addThing(measure)
  // 异步事情开始时
  measure.on(mars3d.EventType.start, function (e) {
    console.log("开始异步分析", e)
    $showLoading()
  })
  measure.on(mars3d.EventType.end, function (e) {
    console.log("完成异步分析", e)
    $hideLoading()
  })
}
// 控制鼠标只取模型上的点，忽略地形上的点的拾取
export function onlyPickModelPosition(val) {
  map.onlyPickModelPosition = val
}
export function removeAll() {
  measure.clear()
}
export function measureLength() {
  measure.distance({
    showAddText: true,
    label: {
      type: "div",
      updateText: function (text, graphic) {
        console.log(graphic, "xxxxxx")
        graphic.html = `<div class="marsGreenGradientPnl" >${text}</div>`
      },
      html: `<div class="marsGreenGradientPnl" ></div>`,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.TOP
    }
  })
}
export function measureSurfaceLength() {
  measure.distanceSurface({
    showAddText: true
    // unit: 'm', //支持传入指定计量单位
    // style: {
    //   color: '#ffff00',
    //   width: 3,
    //   clampToGround: true //是否贴地
    // }
  })
}
// 水平面积
export function measureArea() {
  measure.area({
    // style: {
    //   color: '#00fff2',
    //   opacity: 0.4,
    //   outline: true,
    //   outlineColor: '#fafa5a',
    //   outlineWidth: 1,
    //   clampToGround: false //贴地
    // }
  })
}
// 贴地面积
export function measureSurfaceeArea() {
  measure.areaSurface({
    style: {
      color: "#ffff00"
    },
    splitNum: 10 // step插值分割的个数
  })
}
// 高度差
export function measureHeight() {
  measure.height()
}

// 三角测量
export function measureTriangleHeight() {
  measure.heightTriangle()
}

// 方位角
export function measureAngle() {
  measure.angle()
}

// 坐标测量
export function measurePoint() {
  measure.point()
}
