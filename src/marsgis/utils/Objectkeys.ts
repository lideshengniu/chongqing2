function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}
function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, "Object")
}
const src: any = {}
function deepMerge <T = any>(target: any = {}):void {

  let key :string
  console.log(target, "target")
  for (key in target) {
    if (isObject(target[key])) {
      deepMerge(target[key])

    } else {

      src[key] = target[key] 
}
  }
  return src
  }
  export { deepMerge }
