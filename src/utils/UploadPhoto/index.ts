import useStore from "@/store"
import { AllForm } from "@/api/types/prospecting"
import { Ref } from "vue"
const { useForms } = useStore()
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
export const beforeUpdates = async (file: FileItem, fileList: Ref<FileItem[]> = ref([])) => {
  const data: string = await useForms.addphote(file)
  // console.log(data, "*/*/*/")
  data.replace("http://localhost:15130/", "http://1.14.72.127/")
  fileList.value.push({
    uid: "-1",
    name: `${file.name}.png`,
    status: "done",
    url: data.replace("http://localhost:15130/", "http://1.14.72.127/")
  })
  return data.replace("http://localhost:15130/", "http://1.14.72.127/")
}

export const handleRemoves = (file: FileItem, fileList: Ref<FileItem[]> = ref([]), form: Ref<AllForm>, name: string) => {
  const index = fileList.value.indexOf(file)
  const newFileList = fileList.value.slice()
  newFileList.splice(index, 1)
  fileList.value = newFileList
  console.log(fileList.value)
  switch (name) {
    case "multipleSlopeDirections":
      form.value.slopeInfo.multipleSlopeDirections = ""
      break
    case "multipleSlopes":
      form.value.slopeInfo.multipleSlopes = ""
      break
    case "groundFeatureUrl":
      form.value.groundFeatureUrl = ""
      break
  }
}
