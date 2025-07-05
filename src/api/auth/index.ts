import request from '@/utils/request'
import type { ApiResponse } from '../type'

// 管理接口地址
enum API {
  GET_PUBLIC_KEY = '/auth/getPublicKey',
}

export const getPublicKey = () => request.get<any, ApiResponse>(API.GET_PUBLIC_KEY)
