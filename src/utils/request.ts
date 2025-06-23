// axios二次封装
import axios from 'axios'
import { ElMessage } from 'element-plus'

let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径带上/api
  timeout: 5000,
})

//请求拦截器
request.interceptors.request.use((config) => {
  //获取token,在请求头携带
  const token = localStorage.getItem('Authorization')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let msg: string = ''
    let status: number = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器错误'
        break
      default:
        msg = '未知错误'
        break
    }
    ElMessage.error(msg)
    return Promise.reject(error)
  },
)

export default request
