// axios二次封装
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import useUserStore from '@/store/modules/user'
import router from '@/router'
import { reqRefreshToken } from '@/api/user'
import type { loginResponse } from '@/api/user/type'
import { SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, REMOVE_TOKEN } from './token'

let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径带上/api
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// 定义后端返回的数据结构
interface Result<T = any> {
  code: number
  message: string
  data: T
  timestamp: number
}

//请求拦截器
request.interceptors.request.use((config) => {
  let useUser = useUserStore()
  //获取token,在请求头携带
  const token = useUser.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

//响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<Result>) => {
    const { data } = response
    // 处理后端返回的Result结构
    if (data.code === 200) {
      // 成功情况 - 显示成功提示
      // ElMessage.success(data.message || '操作成功')
      // console.log('请求成功', data.data)
      return data.data
    } else {
      // 业务错误处理
      const result = handleBusinessError(data, response.config)
      if (result !== undefined && result !== null) {
        return result // 如果是token刷新成功后的重试请求，直接返回结果
      }
      return Promise.reject({
        code: data.code,
        message: data.message,
        data: data.data,
      })
    }
  },
  (error) => {
    const { response } = error

    // 处理HTTP状态码错误
    if (response) {
      handleHttpError(response)
    } else {
      // 网络错误
      ElMessage.error('网络连接异常，请检查网络')
    }

    return Promise.reject(error)
  },
)

// 处理业务错误（后端返回的错误码）
const handleBusinessError = (data: Result, config: AxiosRequestConfig) => {
  switch (data.code) {
    case 401:
    case 4001: // Token过期
    case 4002: // Token无效
      handleTokenError(data.message, config)
      break

    case 403:
    case 3001: // 权限不足
      ElMessage.error(data.message || '无权限访问')
      break

    default:
      ElMessage.error(data.message || '操作失败')
  }
}

// 处理HTTP错误（网络状态码错误）
const handleHttpError = (response: any) => {
  const status = response.status
  let message = ''

  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 401:
      message = '未授权，请重新登录'
      handleTokenError(message, response.config)
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

  ElMessage.error(message)
}

// 处理Token错误
const handleTokenError = async (_message: string, originalConfig: AxiosRequestConfig) => {
  const userStore = useUserStore()

  // 避免刷新token的请求被重复拦截
  if (originalConfig.url?.includes('/user/refresh')) {
    userStore.accessToken = ''
    userStore.refreshToken = ''
    REMOVE_TOKEN()
    router.push('/login')
    return Promise.reject(new Error('Refresh token failed'))
  }

  // 如果没有refreshToken，直接跳转登录
  if (!userStore.refreshToken) {
    userStore.accessToken = ''
    userStore.refreshToken = ''
    REMOVE_TOKEN()
    router.push('/login')
    return Promise.reject(new Error('No refresh token'))
  }

  // 如果正在刷新token，将请求加入队列
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject, config: originalConfig })
    })
  }

  // 开始刷新token
  isRefreshing = true

  try {
    const userVO: loginResponse = await reqRefreshToken({
      refreshToken: userStore.refreshToken as string,
    })

    // 更新token
    userStore.accessToken = userVO.accessToken as string
    userStore.refreshToken = userVO.refreshToken as string
    SET_ACCESS_TOKEN(userVO.accessToken as string)
    SET_REFRESH_TOKEN(userVO.refreshToken as string)

    // 处理队列中的请求（传入新token）
    processQueue(null, userVO.accessToken as string)

    // 重试原始请求
    if (originalConfig.headers) {
      originalConfig.headers.Authorization = `Bearer ${userVO.accessToken}`
    }

    return request(originalConfig)
  } catch (error) {
    // 刷新失败，清除所有token并跳转登录
    userStore.accessToken = ''
    userStore.refreshToken = ''
    REMOVE_TOKEN()

    // 处理队列中的请求（传入错误）
    processQueue(error, null)
    ElMessage.error('请重新登录')
    router.push('/login')
    return Promise.reject(error)
  } finally {
    isRefreshing = false
  }
}

// Token刷新相关状态管理
let isRefreshing = false // 是否正在刷新token
let failedQueue: Array<{
  resolve: (value?: any) => void
  reject: (reason?: any) => void
  config: AxiosRequestConfig
}> = [] // 失败请求队列

// 处理队列中的请求
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error)
    } else {
      // 更新请求头中的token
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // 重新发起请求
      resolve(request(config))
    }
  })

  failedQueue = []
}

export default request
