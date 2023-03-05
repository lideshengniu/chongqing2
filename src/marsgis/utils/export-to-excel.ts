
import xlsx from "xlsx"
import { deepMerge } from "./Objectkeys"
// function is(val: unknown, type: string) {
//   return toString.call(val) === `[object ${type}]`
// }
// function isObject(val: any): val is Record<any, any> {
//   return val !== null && is(val, "Object")
// }
// const src: any = {}
// function deepMerge<T = any>(src: any = {}, target: any = {}):void {
// let key :string
// console.log(target, "target")
// for (key in target) {
//   if (isObject(target[key])) {
//     deepMerge(src, target[key])

//     // const Objects = target[key]
//     //   for (key in Objects) {
//     //      src[key] = Objects[key]
//     //   }
//   } else { src[key] = target[key] }
// }
// // return src
// }


export const jsonToExcel = (options:{
    data:any[]
    header:Record<string, string>
    fileName:string
    bookType:xlsx.BookType
}) => { // 1、创建一个工作簿 workbook
  const wb = xlsx.utils.book_new()
  // 2、创建工作表 worksheet

  if (options.header) {

    console.log(options, "pp")
    // options.data = options.data.map(item => {
      // const obj: Record<string, any> = {}

const o = JSON.parse(JSON.stringify(options.data))
   console.log(o, "obj1")
    const src = deepMerge(o)

      // return obj

    // })
    const obj: Record<string, any> = {}
    for (const key in options.header) {
      if (options.header[key]) {
        obj[options.header[key]] = src[key]
      } else {
        obj[key] = src[key]
      }

    }
    console.log(obj, "objobjobj")
    options.data = [obj]
  }

  const ws = xlsx.utils.json_to_sheet(options.data)

  // 3. 把工作表放到工作簿中
  xlsx.utils.book_append_sheet(wb, ws)

  // 4、生成数据保存
  xlsx.writeFile(wb, options.fileName, {
    bookType: options.bookType || "xlsx"
  })
}
