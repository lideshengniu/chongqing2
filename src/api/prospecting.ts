import request from "@/utils/request"
import { AllForm } from "./types/prospecting"
export const getForms = () => {
  return request<AllForm[]>({
    method: "GET",
    url: "/form/all"
  })
}
export const queryForms = (id) => {
  return request<AllForm>({
    method: "POST",
    url: "/form/find",
    data: { id }
  })
}
export const addForms = (data) => {
  return request({
    method: "POST",
    url: "/form/add",
    data
  })
}
export const deleteForms = (id) => {
  return request({
    method: "POST",
    url: "/form/delete",
    data: { id }
  })
}
export const addPhoto = (data) => {
  const formdata = new FormData()
  // data.append("name", "upload")
  console.log(data, "--data")
  formdata.append("file", data)
  // for (const k in params) {
  //   data.append(k, params[k])
  // }
  return request({
    method: "POST",
    url: "/form/upload",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8;"
    },
    data: formdata
  })
}
export const addkml = (data) => {
  const formdata = new FormData()
  // data.append("name", "upload")
  console.log(data, "--data")
  formdata.append("file", data)
  // for (const k in params) {
  //   data.append(k, params[k])
  // }
  return request({
    method: "POST",
    url: "/form/upload",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8;"
    },
    data: formdata
  })
}
export const updata = (data) => {
  return request({
    method: "POST",
    url: "/form/update",
    data: data
  })
}
