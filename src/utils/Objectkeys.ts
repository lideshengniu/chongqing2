import { UpOne } from "@icon-park/svg"

function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}
function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, "Object")
}
const src: any = {}
function deepMerge <T = any>(target: any = {},
  upname = " "):void {
  let key :string
  console.log("targetss123", upname)
  for (key in target) {
    if (isObject(target[key])) {
      deepMerge(target[key], key)

    } else {
      if (upname === "northeastCorner" || upname === "northwestCorner" || upname === "southwestCorner" || upname === "southeastCorner") {
        console.log(key + upname)
        src[upname + key] = target[key]
} else { src[key] = target[key] }

}
  }
  return src
  }
  export { deepMerge }
