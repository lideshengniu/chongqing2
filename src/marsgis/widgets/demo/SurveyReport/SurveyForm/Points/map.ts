import * as mars3d from "mars3d"
import useStore from "@/store"
import { getFile } from "@/utils/getUrlFile"
import { useWidget } from "@mars/common/store/widget"
const { useForms } = useStore()
const { currentWidget, updateWidget, activate } = useWidget()
const datas = useForms.AllTableData
let map: mars3d.Map
const Cesium = mars3d.Cesium
export let graphicLayer
export function onMounted(mapInstance: mars3d.Map): void {
  map = mapInstance // 记录map
  graphicLayer = new mars3d.layer.GraphicLayer()

  map.addLayer(graphicLayer)
  graphicLayer.on(mars3d.EventType.click, (data) => {
    console.log(data, "id")
    const id = data.graphic.options.id
    updateWidget("surveyForm", { id: `${id}`, show: true })
  })

  datas.map(async (item) => {
    const items = JSON.parse(JSON.stringify(item))
    const id = items.id
    console.log(items.coordinate.fileUrl, "****item")
    const positions = await getFile(items.coordinate.fileUrl, "KML")
    console.log(positions, "positions")
    console.log(items.id, "item")
    // addPoint(graphicLayer, position, item.id)
    return item
  })
}
// 释放当前业务
export function onUnmounted(): void {
  graphicLayer.clear()
  map.graphicLayer.clear()
  map = null
}
// 标记点位
export function addPoint(graphicLayer, positions: number[], id) {
  const graphic = new mars3d.graphic.PolylineEntity({
    positions: positions,
    style: {
      radii: new Cesium.Cartesian3(30.0, 20.0, 15.0),
      innerRadii: new Cesium.Cartesian3(30.0, 30.0, 35.0),
      maximumConeDegree: 90,
      color: Cesium.Color.RED.withAlpha(0.3),
      outline: true,
      outlineColor: "rgba(255,255,255,0.5)",
      clampToGround: true
    },
    show: true,
    id: id

    // attr: { id }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
  console.log(graphic.id, "idddddddddddd")
  graphic.fire(mars3d.EventType.click, { id })
}
export function flytoGraphic(id) {
  const graphic = graphicLayer.getGraphicById(id)
  console.log(graphic, "grap")
  map.flyToGraphic(graphic, { radius: 12000 })
}
export function showHideArea(id, selected) {
  const graphic = graphicLayer.getGraphicById(id)
  if (selected) {
    graphic.show = true
  } else {
    graphic.show = false
  }
}
