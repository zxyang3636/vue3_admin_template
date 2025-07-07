import type { ApiResponse, PageHelperResponse } from '@/api/type'

export interface TradeMark {
  id?: number | null
  brandName: string
  logoUrl: string
  createTime?: string
}

// 品牌分页响应
export type TradeMarkPageResponse = ApiResponse<PageHelperResponse<TradeMark>>
