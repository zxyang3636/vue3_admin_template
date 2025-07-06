import type { ApiResponse, PageHelperResponse } from '@/api/type'

interface TradeMark {
  id?: number
  brandName: string
  logoUrl: string
  createTime: string
}

// 品牌分页响应
export type TradeMarkPageResponse = ApiResponse<PageHelperResponse<TradeMark>>
