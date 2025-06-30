// axios二次封装
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import useUserStore from '@/store/modules/user'
import router from '@/router'

let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径带上/api
  timeout: 5000,
})

// 定义后端返回的数据结构
interface Result<T = any> {
  code: number
  message: string
  data: T
  timestamp: number
}

// 扩展请求配置（就是在原有axios配置基础上增加自定义选项）
interface RequestConfig extends AxiosRequestConfig {
  showError?: boolean // 是否显示错误提示，默认true
  showSuccess?: boolean // 是否显示成功提示，默认false
  successMessage?: string // 自定义成功提示信息
}

//请求拦截器
request.interceptors.request.use((config) => {
  let useUser = useUserStore()
  //获取token,在请求头携带
  const token = useUser.token
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

//响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<Result>) => {
    const { data } = response
    const config = response.config as RequestConfig
    // 处理后端返回的Result结构
    if (data.code === 200) {
      // 成功情况 - 显示成功提示
      if (config.showSuccess || config.successMessage) {
        ElMessage.success(config.successMessage || data.message || '操作成功')
      }
      // console.log('请求成功', data.data)
      return data.data
    } else {
      // 业务错误处理
      handleBusinessError(data, config)
      return Promise.reject({
        code: data.code,
        message: data.message,
      })
    }
  },
  (error) => {
    const { response, config } = error

    // 处理HTTP状态码错误
    if (response) {
      handleHttpError(response, config)
    } else {
      // 网络错误
      if (config.showError !== false) {
        ElMessage.error('网络连接异常，请检查网络')
      }
    }

    return Promise.reject(error)
  },
)

// 处理业务错误（后端返回的错误码）
const handleBusinessError = (data: Result, config: RequestConfig) => {
  switch (data.code) {
    case 401:
    case 4001: // Token过期
    case 4002: // Token无效
      handleTokenError(data.message)
      break

    case 403:
    case 3001: // 权限不足
      if (config.showError !== false) {
        ElMessage.error(data.message || '无权限访问')
      }
      break

    default:
      if (config.showError !== false) {
        ElMessage.error(data.message || '操作失败')
      }
  }
}

// 处理HTTP错误（网络状态码错误）
const handleHttpError = (response: any, config: RequestConfig) => {
  const status = response.status
  let message = ''

  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 401:
      message = '未授权，请重新登录'
      handleTokenError(message)
      return
    case 403:
      message = '拒绝访问'
      break
    case 404:
      message = '请求地址不存在'
      break
    case 500:
      message = '服务器内部错误'
      break
    case 502:
      message = '网关错误'
      break
    case 503:
      message = '服务不可用'
      break
    default:
      message = `连接错误${status}`
  }

  if (config.showError !== false) {
    ElMessage.error(message)
  }
}

// 处理Token错误
const handleTokenError = (_message: string) => {
  const userStore = useUserStore()

  ElMessageBox.confirm('登录状态已过期，请重新登录', '系统提示', {
    confirmButtonText: '重新登录',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    userStore.userLogout()
    router.push('/login')
  })
}

export default request
