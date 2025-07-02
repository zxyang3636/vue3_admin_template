// 同意管理用户相关接口

import request from '@/utils/request'
import type { loginForm, loginResponse, userResponseData } from './type'

// 管理接口地址
enum API {
  LOGIN_URL = '/user/login',
  USER_INFO_URL = '/user/info',
}

// 暴露请求函数

export const reqLogin = (data: loginForm) => request.post<any, loginResponse>(API.LOGIN_URL, data)

export const reqUserInfo = () => request.get<any, userResponseData>(API.USER_INFO_URL)
