// 品牌管理 接口

import request from '@/utils/request'
import type { TradeMarkPageResponse } from './type'

enum API {
  TRADEMARKS_URL = '/product/getProductList/',
}

export const reqTrademarkList = (pageNum: number, pageSize: number) =>
  request.get<any, TradeMarkPageResponse>(API.TRADEMARKS_URL + `${pageNum}/${pageSize}`)
