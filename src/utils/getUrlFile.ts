import * as kgUtil from "kml-geojson"
import * as turf from "@turf/turf"
import { resolve } from "path"
function simplifyGeoJSON(geojson) {
  try {
    geojson = turf.simplify(geojson, { tolerance: 0.000001, highQuality: true, mutate: true })
  } catch (e) {
    //
  }
  return geojson
}
export async function getFile(url, fileName) {
  // 通过 url 获取到 File
  function getFileFromUrl(url, fileName) {
    return new Promise((resolve, reject) => {
      let blob = null
      const xhr = new XMLHttpRequest()
      xhr.open("GET", url)
      // 这里设置接收的响应体类型(试了不设置也正常)
      // xhr.setRequestHeader("Accept", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
      xhr.responseType = "blob"
      // 加载时处理(异步)
      xhr.onload = () => {
        // 获取返回结果
        blob = xhr.response
        console.log("blob:", blob[0])
        let file
        if (blob.type === "application/vnd.google-earth.kml+xml") {
          file = new File([blob], fileName, { type: blob.type })
        }
        // 返回结果
        resolve(file)
      }
      xhr.onerror = (e) => {
        reject(e)
      }
      // 发送
      xhr.send()
    })
  }
  const file = (await getFileFromUrl(url, fileName)) as any
  const reader = new FileReader()

  reader.readAsText(file, "UTF-8")
  reader.onloadend = (e) => {
    console.log(e.target.result, " e.target.result")
    const strkml = e.target.result
    console.log(strkml, "strkml")
    const reg = /<coordinates>(.*?)<\/coordinates>/g
    const res = reg.exec(strkml as string)
    // console.log(res, " e.target.result")

    kgUtil.toGeoJSON(strkml).then((geojson) => {
      console.log("kml2geojson转换结果为", geojson)
      geojson = geojson.features[0].geometry.coordinates
      console.log(geojson[0], "***")
      return geojson[0]
    })
  }
}
