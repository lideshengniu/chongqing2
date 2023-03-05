import axios, { AxiosRequestConfig } from "axios"

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
})
request.interceptors.request.use((config) => {
  return config
}, function(error) {
  return Promise.reject(error)
})
const isRefreshing = false
request.interceptors.response.use(function(response) {
  const status = response.data.status
  if (!status || status === 200) {
    return response
  }

}, function (error) {
  return Promise.reject(error)
})
export default <T=any>(config:AxiosRequestConfig) => {
  return request(config).then(res => {
    return (res.data.data || res.data) as T
  })
}
