import type { ApiResponse } from '@/api/type'
import request from '@/utils/request'
import type { Attribute, AttributeResponse, CategoryResponse } from './type'

// 管理接口地址
enum API {
  ONE_LEVEL_CATEGORY_URL = '/attr/getFirstLevelCategory',
  SECOND_LEVEL_CATEGORY_URL = '/attr/getSecondLevelCategory',
  THIRD_LEVEL_CATEGORY_URL = '/attr/getThirdLevelCategory',
  GET_ATTRIBUTE_INFO = '/attr/getAttributeInfo',
  SAVA_OR_UPDATE = '/attr/updateOrSaveAttribute',
  DEL_ATTRIBUTE = '/attr/del',
}

// 暴露请求函数

export const reqOnelevel = () => request.get<any, CategoryResponse>(API.ONE_LEVEL_CATEGORY_URL)

export const reqSecondlevel = (id: string) =>
  request.get<any, CategoryResponse>(API.SECOND_LEVEL_CATEGORY_URL + `/${id}`)

export const reqThirdlevel = (id: string) =>
  request.get<any, CategoryResponse>(API.THIRD_LEVEL_CATEGORY_URL + `/${id}`)

/**
 * 获取属性信息
 * @param id
 * @returns
 */
export const getAttributeInfo = (id: string) =>
  request.get<any, AttributeResponse>(API.GET_ATTRIBUTE_INFO + `/${id}`)

export const updateOrSaveAttribute = (data: Attribute) =>
  request.post<any, any>(API.SAVA_OR_UPDATE, data, { showSuccessMessage: true })

export const delAttribute = (attributeKeysId: string) =>
  request.delete<any, any>(`${API.DEL_ATTRIBUTE}/${attributeKeysId}`, { showSuccessMessage: true })
