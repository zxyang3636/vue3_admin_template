// 品牌管理 接口

import request from '@/utils/request'
import type { TradeMarkPageResponse, TradeMark } from './type'

enum API {
  TRADEMARKS_URL = '/brand/getProductList/',
  INSERT_TRADEMARK = '/brand/insertTrademark',
  UPDATE_TRADEMARK = '/brand/updateTrademark',
  DELETE_TRADEMARK = '/brand/deleteTrademark/',
}

/**
 * 获取品牌列表
 * @param pageNum 页码
 * @param pageSize 页大小
 */
export const reqTrademarkList = (pageNum: number, pageSize: number) =>
  request.get<any, TradeMarkPageResponse>(API.TRADEMARKS_URL + `${pageNum}/${pageSize}`)

/**
 * 品牌新增或修改
 * @param data TradeMark
 */
export const reqTrademarkUpdate = (data: TradeMark) => {
  // 新增或修改
  if (data.id) {
    // 修改
    request.put<any, any>(API.UPDATE_TRADEMARK, data, {
      showSuccessMessage: true,
      successMessage: '修改成功',
    })
  } else {
    request.post<any, any>(API.INSERT_TRADEMARK, data, {
      showSuccessMessage: true,
      successMessage: '新增成功',
    })
  }
}

/**
 * 品牌删除
 * @param id 品牌id
 */
export const reqTrademarkDelete = (id: number) =>
  request.delete<any, any>(API.DELETE_TRADEMARK + id, {
    showSuccessMessage: true,
    successMessage: '删除成功',
  })