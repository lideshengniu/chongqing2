import * as mars3d from "mars3d"
import { $alert as globalAlert } from "@mars/components/mars-ui/index"
// import { TerrainType } from "mars3d"
import { Console } from "console"
// import { TerrainType } from "mars3d"
export let map // mars3d.Map三维地图对象
export let graphicLayer
const Cesium = mars3d.Cesium
// 事件对象，用于抛出事件给面板
export const eventTarget = new mars3d.BaseClass()
console.log("LayerType", mars3d.LayerType)
const mapOptions = {
  scene: {
    // center: { lat: 28.440007, lng: 119.48322, alt: 424, heading: 282, pitch: -56 },
    fxaa: true, // 不开启抗锯齿，可视域会闪烁
    globe: {
      depthTestAgainstTerrain: true // 不加无法投射到地形上
    }
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  // globalNotify("已知问题提示", `(1) 平面上视域内可能存在锯齿。(2) 视角变化时可能有锯齿抖动。`)mars3d.LngLatPoint.fromCartesian()
  console.log(map.camera.direction, "camera")
  map.setSceneOptions(mapOptions.scene)
  // map.terrainProvider = mars3d.LayerUtil.createTerrainProvider({
  //   // eslint-disable-next-line no-undef
  //   type: "xyz",
  //   url: "http://localhost:9003/terrain/2n9T5jux"
  // })
  // 添加参考三维模型
  // const tiles3dLayer = new mars3d.layer.TilesetLayer({
  //   url: "//data.mars3d.cn/3dtiles/qx-shequ/tileset.json",
  //   position: { alt: 11.5 },
  //   maximumScreenSpaceError: 1,
  //   maximumMemoryUsage: 1024,
  //   dynamicScreenSpaceError: true,
  //   cullWithChildrenBounds: false,
  //   luminanceAtZenith: 0.6
  // })
  // map.addLayer(tiles3dLayer)

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 加一些演示数据
  // addDemoGraphic1()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  graphicLayer.remove(true)
  map = null
}

function addDemoGraphic1() {
  const viewShed = new mars3d.graphic.ViewShed({
    position: [119.480878, 28.440286, 149],
    style: {
      angle: 60,
      angle2: 45,
      distance: 80,
      heading: 44,
      pitch: -12,
      addHeight: 0.5
    }
  })
  graphicLayer.addGraphic(viewShed)
}

// 添加可视域
export function startDrawGraphic() {
  // 开始绘制
  graphicLayer.startDraw({
    type: "viewShed",
    style: {
      angle: 60,
      angle2: 45,
      distance: 80,
      heading: 44,
      pitch: -12
      // addHeight: 0.5 // 在坐标点增加的高度值，规避遮挡，效果更友好
    }
  })
}
// 方案下的绘制
export function start3DrawGraphic({ data }) {
  console.log(data, "datadata")
  // 开始绘制
  graphicLayer.startDraw({
    type: "viewShed",
    style: {
      angle: data.style.angle1,
      angle2: data.style.angle2,
      distance: 80,
      heading: 44,
      pitch: -12
      // addHeight: 0.5 // 在坐标点增加的高度值，规避遮挡，效果更友好
    }
  })
}
// 文件添加
export function addDrawGraphic(graphicLayer, position, name) {
  const graphic = new mars3d.graphic.ViewShed({
    position: position,
    style: {
      angle: 60,
      angle2: 45,
      distance: 2000,
      heading: 44,
      pitch: -12,
      addHeight: 10 // 在坐标点增加的高度值，规避遮挡，效果更友好
    },
    name: `${name}`
  })
  graphicLayer.addGraphic(graphic)
  console.log(name, "iiiiiiiiiii")
}
// 标签
export function addDemoGraphic(graphicLayer, position, i) {
  const graphic = new mars3d.graphic.DivBoderLabel({
    position: position,
    style: {
      text: `point${i}`,
      font_size: 15,
      font_family: "微软雅黑",
      color: "#ccc",
      boderColor: "#15d1f2",
      clampToGround: true
    },
    attr: { remark: "示例6" }
  })
  graphicLayer.addGraphic(graphic)
}
// 生成演示数据(测试数据量)
export function addRandomGraphicByCount(count) {
  graphicLayer.clear()
  graphicLayer.enabledEvent = false // 关闭事件，大数据addGraphic时影响加载时间

  const bbox = [116.984788, 31.625909, 117.484068, 32.021504]
  const result = mars3d.PolyUtil.getGridPoints(bbox, count, 30)
  console.log("生成的测试网格坐标", result)

  for (let j = 0; j < result.points.length; ++j) {
    const position = result.points[j]
    const index = j + 1

    const graphic = new mars3d.graphic.ViewShed({
      position: position,
      style: {
        angle: 60,
        angle2: 45,
        distance: 1880,
        heading: 44,
        pitch: -12,
        addHeight: 2
      },
      attr: { index: index }
    })
    graphicLayer.addGraphic(graphic)
  }

  graphicLayer.enabledEvent = true // 恢复事件
  return result.points.length
}

// 属性编辑
let selectedView
export function getGraphic(graphicId) {
  selectedView = graphicLayer.getGraphicById(graphicId)
  return selectedView
}

export function selCamera() {
  if (!selectedView) {
    return
  }

  map.graphicLayer.startDraw({
    type: "point",
    success: (graphic) => {
      const point = graphic.point
      graphic.remove() // 删除绘制的点

      selectedView.position = point
    }
  })
}

// 修改水平角度
export function onChangeAngle(value) {
  if (selectedView) {
    selectedView.angle = value
  }
}

// 修改垂直角度
export function onChangeAngle2(value) {
  if (selectedView) {
    selectedView.angle2 = value
  }
}

// 修改投射距离
export function onChangeDistance(value) {
  if (selectedView) {
    selectedView.distance = value
  }
}
export function onChangeaddHeight(value) {
  if (selectedView) {
    selectedView.addHeight = value
  }
}
// 修改四周距离 value 修改后的数值
export function onChangeHeading(value) {
  if (selectedView) {
    selectedView.heading = value
  }
}

//  修改俯仰角数值   value 修改后的数值
export function onChangePitch(value) {
  if (selectedView) {
    selectedView.pitch = value
  }
}

//   线框是否显示   isCheckde 修改后的数值
export function showFrustum(isCheckde) {
  if (selectedView) {
    selectedView.showFrustum = isCheckde
  }
}

// 修改视频的透明度   opacity 透明度数值
export function onChangeOpacity(opacity) {
  if (selectedView) {
    selectedView.opacity = opacity
  }
}

// 四周视角选点
export function onClickSelView() {
  if (!selectedView) {
    return
  }

  map.graphicLayer.startDraw({
    type: "point",
    success: (graphic) => {
      const point = graphic.point
      graphic.remove() // 删除绘制的点

      selectedView.targetPosition = point
    }
  })
}
export function getManagerLayer() {
  return graphicLayer
}
// 不需要的
export function startDrawGraphic2() {
  graphicLayer.startDraw({
    type: "fineArrowYW",
    style: {
      color: "#ff0000",
      opacity: 0.6,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      clampToGround: true
    }
  })
}
export function bindLayerPopup() {
  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic.attr || {}
    attr["类型"] = event.graphic.type
    attr["来源"] = "我是layer上绑定的Popup"
    attr["备注"] = "我支持鼠标交互"

    return mars3d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr: attr })
  })
}
export function bindLayerContextMenu() {
  graphicLayer.bindContextMenu([
    {
      text: "开始编辑对象",
      icon: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.hasEdit) {
          return false
        }
        return !graphic.isEditing
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayer.startEditing(graphic)
        }
      }
    },
    {
      text: "停止编辑对象",
      icon: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.hasEdit) {
          return false
        }
        return graphic.isEditing
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphic.stopEditing()
        }
      }
    },
    {
      text: "删除对象",
      icon: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic || graphic.isDestroy) {
          return false
        } else {
          return true
        }
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        const parent = graphic.parent // 右击是编辑点时
        graphicLayer.removeGraphic(graphic)
        if (parent) {
          graphicLayer.removeGraphic(parent)
        }
      }
    },
    {
      text: "计算周长",
      icon: "fa fa-medium",
      callback: (e) => {
        const graphic = e.graphic
        const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
        globalAlert("该对象的周长为:" + strDis)
      }
    },
    {
      text: "计算面积",
      icon: "fa fa-reorder",
      callback: (e) => {
        const graphic = e.graphic
        const strArea = mars3d.MeasureUtil.formatArea(graphic.area)
        globalAlert("该对象的面积为:" + strArea)
      }
    }
  ])
}
// 选择不同的方案
export function onchoose({ data }: any) {
  if (selectedView) {
    console.log("xxxs", data)
    selectedView.angle = data.style.angle1
    selectedView.angle2 = data.style.angle2
  }
}
