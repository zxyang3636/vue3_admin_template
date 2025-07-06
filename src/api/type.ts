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

/**
 * @description PageHelper 返回的分页结构
 */
export interface PageHelperResponse<T = any> {
  list: T[] // 当前页数据
  total: number // 总记录数
  pageNum: number // 当前页码
  pageSize: number // 每页数量
  size: number // 当前页实际大小
  pages: number // 总页数
  isFirstPage: boolean
  isLastPage: boolean
  hasPreviousPage: boolean
  hasNextPage: boolean
  navigatepageNums: number[] // 页码导航数组
  prePage: number // 上一页
  nextPage: number // 下一页
  navigateFirstPage: number // 导航首页
  navigateLastPage: number // 导航尾页
}
