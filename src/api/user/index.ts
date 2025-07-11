// 同意管理用户相关接口

import request from '@/utils/request'
import type { loginForm, LoginResponse, UserInfoResponse, RefreshRequest } from './type'

// 管理接口地址
enum API {
  LOGIN_URL = '/user/login',
  USER_INFO_URL = '/user/info',
  USER_LOGOUT_URL = '/user/logout',
  REFRESH_TOKEN_URL = '/user/refresh',
  TEST_AA_URL = '/user/test',
}

// 暴露请求函数

export const reqLogin = (data: loginForm) =>
  request.post<any, LoginResponse>(API.LOGIN_URL, data, {
    showSuccessMessage: true,
    successMessage: '登录成功',
  })

export const reqUserInfo = () => request.get<any, UserInfoResponse>(API.USER_INFO_URL)

export const reqUserLogout = () =>
  request.post<any, any>(API.USER_LOGOUT_URL, null, {
    showSuccessMessage: false,
    successMessage: '退出成功',
  })

export const reqRefreshToken = (data: RefreshRequest) =>
  request.post<any, LoginResponse>(API.REFRESH_TOKEN_URL, data)

export const testAA = () =>
  request.get<any, any>(API.TEST_AA_URL, {
    showSuccessMessage: true,
    successMessage: '测试成功',
  })
