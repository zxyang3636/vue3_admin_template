// 添加通用响应类型

/**
 * @description 统一响应数据结构
 */
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp: number
  success: boolean
  fail: boolean
}
